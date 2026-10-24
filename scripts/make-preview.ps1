<#
.SYNOPSIS
  Builds the hover-card media for a project: a short silent clip and two webp posters.

.DESCRIPTION
  Reads scripts/previews.json and writes, for each entry:
    public/previews/<slug>.mp4        4-6 s, H.264, 720x404, no audio, under -MaxMegabytes
    public/previews/<slug>-720.webp   poster (first frame of the clip), used by the hover card
    public/previews/<slug>-1440.webp  same poster, used on the detail page
  Image entries (no video) only get the two posters. An optional "crop"
  (ffmpeg crop "w:h:x:y", in source pixels) is applied before framing to 16:9.

  Sources (YouTube links or direct video URLs) are downloaded once into .cache/previews/
  (gitignored) and reused. To use a file you exported yourself, save it as
  .cache/previews/<slug>.mp4 and run the script again.

  Needs yt-dlp and ffmpeg:
    winget install --id yt-dlp.yt-dlp -e
    winget install --id Gyan.FFmpeg -e

  This script is unsigned. Where the execution policy is AllSigned or
  RemoteSigned, run it through a one-off bypass instead of changing the policy:
    powershell -ExecutionPolicy Bypass -File .\scripts\make-preview.ps1 -Slug scentory

.EXAMPLE
  ./scripts/make-preview.ps1 -Slug scentory
  Regenerates one project from the manifest.

.EXAMPLE
  ./scripts/make-preview.ps1 -All
  Regenerates every project.

.EXAMPLE
  ./scripts/make-preview.ps1 -Slug scentory -ContactSheet
  Writes .cache/previews/scentory-sheet.jpg, a grid of frames, to pick a new "start".
#>
[CmdletBinding(DefaultParameterSetName = 'One')]
param(
  [Parameter(ParameterSetName = 'One', Mandatory = $true)]
  [string] $Slug,

  [Parameter(ParameterSetName = 'All', Mandatory = $true)]
  [switch] $All,

  [Parameter(ParameterSetName = 'One')]
  [switch] $ContactSheet,

  [double] $MaxMegabytes = 1.5
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$cache = Join-Path $root '.cache\previews'
$out = Join-Path $root 'public\previews'
New-Item -ItemType Directory -Force -Path $cache, $out | Out-Null

$manifest = Get-Content -Raw -Encoding UTF8 (Join-Path $PSScriptRoot 'previews.json') | ConvertFrom-Json

function Assert-Tool([string] $Name, [string] $WingetId) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    # A fresh winget install only reaches new shells; pick it up in this one too.
    $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
                [Environment]::GetEnvironmentVariable('Path', 'User')
  }
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is not installed. Run: winget install --id $WingetId -e"
  }
}

# Runs a native tool and fails on a non-zero exit code. Native tools write
# progress to stderr, which must not count as an error by itself.
function Invoke-Tool([string] $Exe, [string[]] $Arguments) {
  $previous = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    & $Exe @Arguments
    $code = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previous
  }
  if ($code -ne 0) { throw "$Exe exited with code $code" }
}

function Get-Source($Entry) {
  $cached = Get-ChildItem -Path $cache -File -ErrorAction SilentlyContinue |
    Where-Object { $_.BaseName -eq $Entry.slug -and $_.Extension -match '^\.(mp4|webm|mkv|mov|png|jpe?g|webp)$' } |
    Select-Object -First 1
  if ($cached) { return $cached.FullName }

  if ($Entry.source -notmatch '^https?://') {
    $path = Join-Path $root $Entry.source
    if (-not (Test-Path $path)) { throw "Source for '$($Entry.slug)' not found: $path" }
    return (Resolve-Path $path).Path
  }

  Assert-Tool 'yt-dlp' 'yt-dlp.yt-dlp'
  $template = Join-Path $cache "$($Entry.slug).%(ext)s"
  try {
    Invoke-Tool 'yt-dlp' @('--quiet', '--no-warnings', '--no-playlist',
      '-f', 'bv*[height<=1080][ext=mp4]/bv*[height<=1080]/b',
      '-o', $template, $Entry.source)
  } catch {
    throw "Could not download $($Entry.source). Export the video from YouTube Studio, " +
          "save it as .cache/previews/$($Entry.slug).mp4 and run this again."
  }
  $file = Get-ChildItem -Path $cache -File | Where-Object { $_.BaseName -eq $Entry.slug } | Select-Object -First 1
  if (-not $file) { throw "yt-dlp finished but no file for '$($Entry.slug)' is in $cache" }
  return $file.FullName
}

function Get-Duration([string] $Path) {
  $text = & ffprobe -v error -show_entries format=duration -of 'default=nw=1:nk=1' $Path
  return [double]::Parse($text.Trim(), [Globalization.CultureInfo]::InvariantCulture)
}

function Format-Seconds([double] $Value) {
  return $Value.ToString('0.###', [Globalization.CultureInfo]::InvariantCulture)
}

# 16:9 frame at the given width, rounded down to an even height (H.264 and WebP need it).
function Get-FrameFilter([int] $Width, [string] $Crop) {
  $height = [int]([Math]::Floor($Width * 9 / 32) * 2)
  $prefix = if ($Crop) { "crop=$Crop," } else { '' }
  return "${prefix}scale=${Width}:${height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${Width}:${height}"
}

function New-Posters([string] $Source, [string] $SlugName, $At, [string] $Crop) {
  foreach ($width in 720, 1440) {
    $arguments = @('-hide_banner', '-loglevel', 'error', '-y')
    if ($null -ne $At) { $arguments += @('-ss', (Format-Seconds $At)) }
    $arguments += @('-i', $Source, '-frames:v', '1',
      '-vf', (Get-FrameFilter $width $Crop),
      '-c:v', 'libwebp', '-quality', '80',
      (Join-Path $out "$SlugName-$width.webp"))
    Invoke-Tool 'ffmpeg' $arguments
  }
}

function Build-Preview($Entry) {
  Assert-Tool 'ffmpeg' 'Gyan.FFmpeg'
  $source = Get-Source $Entry
  $name = $Entry.slug

  if ($Entry.kind -eq 'image') {
    New-Posters $source $name $null $Entry.crop
    Write-Host ("{0}: posters only (image source)" -f $name)
    return
  }

  if ($ContactSheet) {
    # One tile per interval seconds, 6 columns, at most 48 tiles.
    $length = Get-Duration $source
    $interval = [Math]::Max(1, [Math]::Ceiling($length / 48))
    $sheet = Join-Path $cache "$name-sheet.jpg"
    Invoke-Tool 'ffmpeg' @('-hide_banner', '-loglevel', 'error', '-y', '-i', $source,
      '-vf', "fps=1/$interval,scale=320:-2,tile=6x8", '-frames:v', '1', '-q:v', '3', $sheet)
    Write-Host ("{0}: {1} s long. Tile n (from 0, row by row) starts at n x {2} s. Sheet: {3}" -f $name, [int]$length, $interval, $sheet)
    return
  }

  if ($null -eq $Entry.start) { throw "'$name' has no start yet. Run with -ContactSheet and set start in previews.json." }
  $start = [double]$Entry.start
  $duration = if ($Entry.duration) { [double]$Entry.duration } else { 5 }
  $clip = Join-Path $out "$name.mp4"

  # Re-encode at a lower quality until the clip fits the size budget.
  $crf = 23
  do {
    Invoke-Tool 'ffmpeg' @('-hide_banner', '-loglevel', 'error', '-y',
      '-ss', (Format-Seconds $start), '-t', (Format-Seconds $duration), '-i', $source,
      '-an', '-vf', ((Get-FrameFilter 720 $Entry.crop) + ',fps=30'),
      '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', "$crf",
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', $clip)
    $megabytes = (Get-Item $clip).Length / 1MB
    $crf += 2
  } while ($megabytes -gt $MaxMegabytes -and $crf -le 40)

  # The poster is the clip's first frame, so the fade from poster to video is seamless.
  New-Posters $source $name ($start + 0.05) $Entry.crop
  Write-Host ("{0}: clip {1:N2} MB (crf {2}), posters written" -f $name, $megabytes, ($crf - 2))
}

$entries = if ($All) { $manifest.previews } else { $manifest.previews | Where-Object { $_.slug -eq $Slug } }
if (-not $entries) { throw "No entry for '$Slug' in scripts/previews.json" }
foreach ($entry in $entries) { Build-Preview $entry }

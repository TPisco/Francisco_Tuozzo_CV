const EMBED_BASE = "https://www.youtube-nocookie.com/embed/";

/**
 * Normalizes common YouTube URLs into a privacy-enhanced (no-cookie) iframe src.
 * Returns null when the URL is missing or not a recognized YouTube link.
 */
export function getYouTubeEmbedUrl(url?: string): string | null {
  const id = getYouTubeId(url);
  return id ? `${EMBED_BASE}${id}` : null;
}

function getYouTubeId(url?: string): string | null {
  if (!url?.trim()) return null;

  try {
    const parsed = new URL(url.trim());

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }

    if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "m.youtube.com" ||
      parsed.hostname === "www.youtube-nocookie.com"
    ) {
      const pathMatch = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
      if (pathMatch?.[1]) return pathMatch[1];

      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

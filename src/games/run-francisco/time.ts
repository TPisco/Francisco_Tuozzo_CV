/** Seconds as m:ss.cc, cut (not rounded) so the clock never shows a time you haven't reached. */
export function formatTime(seconds: number): string {
  const hundredths = Math.floor(seconds * 100 + 1e-6);
  const minutes = Math.floor(hundredths / 6000);
  const rest = hundredths % 6000;
  const secs = Math.floor(rest / 100);
  const cents = rest % 100;
  return `${minutes}:${String(secs).padStart(2, "0")}.${String(cents).padStart(2, "0")}`;
}

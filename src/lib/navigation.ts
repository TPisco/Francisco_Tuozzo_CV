/** The three top-level pages, switched with the pill in the navbar. */
export type Tab = "work" | "info" | "play";

export const tabs: Tab[] = ["work", "info", "play"];

export const tabPaths: Record<Tab, string> = {
  work: "/",
  info: "/info",
  play: "/play",
};

/**
 * Which tab a URL belongs to. Case studies live under Work and games under
 * Play; anything outside the pages (a 404, say) highlights none.
 */
export function getActiveTab(pathname: string): Tab | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/" || path.startsWith("/projects/")) return "work";
  if (path === "/info") return "info";
  if (path === "/play" || path.startsWith("/play/")) return "play";
  return null;
}

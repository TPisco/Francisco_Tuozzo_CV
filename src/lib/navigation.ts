/** The two top-level pages, switched with the pill in the navbar. */
export type Tab = "work" | "info";

export const tabPaths: Record<Tab, string> = {
  work: "/",
  info: "/info",
};

/**
 * Which tab a URL belongs to. Case studies live under Work; anything outside
 * both pages (a 404, say) highlights neither.
 */
export function getActiveTab(pathname: string): Tab | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/" || path.startsWith("/projects/")) return "work";
  if (path === "/info") return "info";
  return null;
}

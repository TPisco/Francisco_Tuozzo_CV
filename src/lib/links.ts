/**
 * The text shown for a link, derived from the link itself so the two can't
 * disagree: "https://www.github.com/me/" reads "github.com/me", a mailto reads
 * as the address.
 */
export function linkLabel(href: string): string {
  return href
    .replace(/^mailto:/, "")
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/+$/, "");
}

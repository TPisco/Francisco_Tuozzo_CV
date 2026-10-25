/** Fills `{key}` placeholders in a translated string: fill("Level {n}", { n: 2 }) → "Level 2". */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

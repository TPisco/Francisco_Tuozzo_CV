/** Every leaf's path, list indices included, e.g. "projects.items.vert.detail.features.3". */
export function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry, i) => keyPaths(entry, `${prefix}${i}.`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, entry]) => keyPaths(entry, `${prefix}${key}.`));
  }
  return [prefix.slice(0, -1)];
}

/** Paths of the strings that are empty or only whitespace. */
export function emptyStrings(value: unknown): string[] {
  return keyPaths(value).filter((path) => {
    const leaf = path.split(".").reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], value);
    return typeof leaf === "string" && leaf.trim() === "";
  });
}

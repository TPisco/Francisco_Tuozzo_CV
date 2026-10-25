export function ProjectTechPills({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((item) => (
        <li
          key={item}
          className="rounded-full border border-ink/10 bg-shell px-3 py-1 text-xs font-medium text-ink-soft"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

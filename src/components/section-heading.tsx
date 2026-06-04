import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{lead}</p>
        ) : null}
      </div>
    </Reveal>
  );
}

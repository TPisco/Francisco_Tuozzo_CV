import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal>
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.035em] [text-wrap:balance]">
          {title}
        </h2>
        {lead ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{lead}</p> : null}
      </div>
    </Reveal>
  );
}

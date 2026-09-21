import React from "react";
import { Quote } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";

const ACCENTS = ["#2E63F6", "#7C5CFC", "#12805C", "#E85C4A"];

function initials(name = "") {
  return name
    .replace(/[^a-zA-Z. ]/g, "")
    .split(/[. ]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function TestimonialCard({ item, index }) {
  const accent = ACCENTS[index % ACCENTS.length];
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-lg)] md:p-7">
      <Quote className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/85">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        >
          {initials(item.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink">{item.name}</p>
          <p className="truncate text-xs text-muted">{item.role}</p>
        </div>
        <span className="shrink-0 rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          {item.country}
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const t = data.testimonials;
  const featured = t.items.find((x) => x.featured) ?? t.items[0];
  const rest = t.items.filter((x) => x !== featured);

  return (
    <section id="testimonials" className="relative bg-surface-2/60 py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={t.label} heading={t.heading} sub={t.sub} />

        <div className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-2">
          <Reveal y={22} className="h-full">
            <TestimonialCard item={featured} index={0} />
          </Reveal>
          <div className="grid gap-5">
            {rest.map((item, i) => (
              <Reveal key={item.name} y={22} delay={0.08 * (i + 1)} className="h-full">
                <TestimonialCard item={item} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

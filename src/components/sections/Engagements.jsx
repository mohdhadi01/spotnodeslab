import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { useScrollTo } from "../../lib/useScrollTo";
import { prefillMessage } from "../../lib/schedule";

export function Engagements() {
  const scrollTo = useScrollTo();

  const choose = (item) => {
    prefillMessage(item.cta.prefill);
    scrollTo(item.cta.href);
  };

  return (
    <section id="engagements" className="relative bg-surface-2/60 py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.engagements.label} heading={data.engagements.heading} sub={data.engagements.sub} />

        <div className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-3">
          {data.engagements.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} y={24} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 ${
                  item.featured
                    ? "border-2 border-accent bg-surface shadow-[var(--shadow-card-lg)]"
                    : "border border-line bg-surface shadow-[var(--shadow-card)]"
                }`}
              >
                {item.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    Most popular
                  </span>
                )}

                <p className="label-mono">{item.priceNote}</p>
                <h3 className="mt-2.5 text-2xl font-medium tracking-tight text-ink">{item.name}</h3>
                <p className="mt-1.5 text-sm font-medium text-muted">{item.for}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                        <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => choose(item)}
                  className={`group mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-colors duration-300 ${
                    item.featured
                      ? "bg-accent text-white hover:bg-accent-strong"
                      : "border border-line-strong text-ink hover:border-accent hover:bg-accent-soft hover:text-accent-strong"
                  }`}
                >
                  {item.cta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal y={14} className="mt-8">
          <p className="text-center text-xs text-faint">
            Every engagement includes direct access to the engineers, weekly demos and full code ownership.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

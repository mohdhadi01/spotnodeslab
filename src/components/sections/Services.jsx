import React from "react";
import { ArrowUpRight, Gamepad2, Globe, Smartphone, TrendingUp } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { useScrollTo } from "../../lib/useScrollTo";

const ICONS = { globe: Globe, smartphone: Smartphone, gamepad: Gamepad2, trending: TrendingUp };

export function Services() {
  const scrollTo = useScrollTo();

  return (
    <section id="services" className="relative bg-surface-2/60 py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.services.label} heading={data.services.heading} sub={data.services.sub} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14">
          {data.services.items.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Globe;
            return (
              <Reveal key={service.id} delay={i * 0.07} y={22} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[var(--shadow-card-lg)] md:p-7">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </div>

                  <h3 className="mt-5 text-xl font-medium tracking-tight text-ink">{service.title}</h3>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {service.tagline}
                  </p>
                  <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {service.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {service.representative && (
                    <button
                      onClick={() => scrollTo("#work")}
                      className="group/link mt-5 inline-flex w-fit items-center gap-1.5 border-t border-line pt-4 text-xs font-bold text-ink"
                    >
                      <span className="u-underline">Seen in {service.representative}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover/link:rotate-45" />
                    </button>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

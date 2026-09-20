import React from "react";
import { ArrowDown } from "lucide-react";
import data from "../../data/site.json";
import { Reveal } from "../ui/Reveal";
import { useScrollTo } from "../../lib/useScrollTo";

export function CtaBand() {
  const scrollTo = useScrollTo();
  return (
    <section className="bg-bg py-10 md:py-14">
      <div className="container-x">
        <Reveal y={22}>
          <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-12 text-center md:py-16">
            <div className="mesh-glow absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="bg-dots absolute inset-0 opacity-20" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-h2 mx-auto max-w-xl font-medium text-white">{data.ctaBand.heading}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                {data.ctaBand.sub}
              </p>
              <button
                onClick={() => scrollTo(data.ctaBand.cta.href)}
                className="group mx-auto mt-7 flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-base font-bold text-accent-strong transition-all duration-300 hover:scale-[1.03] hover:bg-ink hover:text-white"
              >
                {data.ctaBand.cta.label}
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

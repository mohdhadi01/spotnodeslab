import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { EASE } from "../../lib/motion";

function StepCard({ step, index, active, setActive }) {
  return (
    <motion.div
      onViewportEnter={() => setActive(index)}
      viewport={{ margin: "-45% 0px -45% 0px" }}
      className={`rounded-2xl border p-6 transition-all duration-500 md:p-8 ${
        active
          ? "border-accent/30 bg-surface shadow-[var(--shadow-card-lg)]"
          : "border-line bg-surface/60 shadow-[var(--shadow-card)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-medium transition-colors duration-500 ${
            active ? "bg-accent text-white" : "bg-surface-2 text-muted"
          }`}
        >
          {step.num}
        </span>
        <h3 className="text-xl font-medium tracking-tight text-ink md:text-2xl">{step.title}</h3>
      </div>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-[15px]">{step.description}</p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5">
        <Check className="h-3.5 w-3.5 text-accent" strokeWidth={3} />
        <span className="text-xs font-bold text-accent-strong">You get: {step.youGet}</span>
      </div>
    </motion.div>
  );
}

export function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="relative bg-bg py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.process.label} heading={data.process.heading} sub={data.process.sub} />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-16">
          {/* Sticky indicator */}
          <div className="hidden md:col-span-4 md:block">
            <div className="sticky top-28">
              <p className="label-mono">Step</p>
              <div className="relative mt-2 h-[7.5rem] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={active}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="block font-display text-[7.5rem] font-medium leading-none tracking-tight text-ink"
                  >
                    {data.process.steps[active].num}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-4 flex gap-2">
                {data.process.steps.map((s, i) => (
                  <span
                    key={s.num}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? "w-8 bg-accent" : "w-1.5 bg-line-strong"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-6 max-w-[26ch] text-sm leading-relaxed text-faint">
                {data.process.steps[active].title} · {data.process.steps[active].youGet.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-5 md:col-span-8">
            {data.process.steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} active={active === i} setActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

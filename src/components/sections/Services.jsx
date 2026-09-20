import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { EASE } from "../../lib/motion";
import { useScrollTo } from "../../lib/useScrollTo";

export function Services() {
  const [openId, setOpenId] = useState(data.services.items[0]?.id ?? null);
  const [hoveredId, setHoveredId] = useState(null);
  const scrollTo = useScrollTo();

  return (
    <section id="services" className="relative bg-surface-2 py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.services.label} heading={data.services.heading} sub={data.services.sub} />

        <div className="mt-10 border-b border-line md:mt-14">
          {data.services.items.map((service) => {
            const open = openId === service.id;
            const dimmed = hoveredId !== null && hoveredId !== service.id;
            return (
              <div
                key={service.id}
                className="border-t border-line transition-opacity duration-500"
                style={{ opacity: dimmed ? 0.35 : 1 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  onClick={() => setOpenId(open ? null : service.id)}
                  aria-expanded={open}
                  className="group flex w-full items-center gap-5 py-6 text-left md:gap-10 md:py-7"
                >
                  <span className="font-mono text-xs text-faint transition-colors duration-300 group-hover:text-accent">
                    {service.index}
                  </span>
                  <span
                    className={`flex-1 font-display text-2xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-1.5 md:text-4xl ${
                      open ? "text-ink" : "text-ink/70"
                    }`}
                  >
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 md:h-11 md:w-11 ${
                      open
                        ? "border-accent bg-accent text-white"
                        : "border-line-strong text-muted group-hover:border-ink/30 group-hover:text-ink"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 pl-9 pr-2 md:grid-cols-12 md:gap-10 md:pl-[4rem]">
                        <p className="max-w-md leading-relaxed text-muted md:col-span-6">
                          {service.description}
                        </p>
                        <div className="md:col-span-6">
                          <div className="flex flex-wrap gap-1.5">
                            {service.stack.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          {service.representative && (
                            <button
                              onClick={() => scrollTo(service.representative.href)}
                              className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink"
                            >
                              <span className="u-underline">Seen in {service.representative.label}</span>
                              <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:rotate-45" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

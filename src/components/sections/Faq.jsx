import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { EASE } from "../../lib/motion";

export function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="relative bg-surface-2/60 py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.faq.label} heading={data.faq.heading} sub={data.faq.sub} />

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 md:mt-14">
          {data.faq.items.map((item, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={item.q} delay={i * 0.05} y={16}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-surface transition-colors duration-300 ${
                    open ? "border-accent/30" : "border-line"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-bold text-ink md:text-lg">{item.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        open ? "border-accent bg-accent text-white" : "border-line text-muted"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

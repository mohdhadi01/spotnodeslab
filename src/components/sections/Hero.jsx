import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import data from "../../data/site.json";
import { NodeField } from "../ui/NodeField";
import { Magnetic } from "../ui/Magnetic";
import { Marquee } from "../ui/Marquee";
import { EASE } from "../../lib/motion";
import { useScrollTo } from "../../lib/useScrollTo";

export function Hero({ ready }) {
  const scrollTo = useScrollTo();
  const show = ready;

  const line = (i) => ({
    initial: { y: "110%" },
    animate: show ? { y: "0%" } : { y: "110%" },
    transition: { duration: 0.9, delay: 0.05 + i * 0.1, ease: EASE },
  });
  const fade = (i) => ({
    initial: { opacity: 0, y: 18 },
    animate: show ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay: 0.3 + i * 0.08, ease: EASE },
  });
  const pop = (i) => ({
    initial: { opacity: 0, y: 26, scale: 0.96 },
    animate: show ? { opacity: 1, y: 0, scale: 1 } : {},
    transition: { duration: 0.85, delay: 0.35 + i * 0.14, ease: EASE },
  });

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_35%,black,transparent)]" />
        <NodeField className="absolute inset-0 h-full w-full opacity-70" />
      </div>

      <div className="container-x relative z-10 grid flex-1 items-center gap-12 pb-8 pt-28 md:gap-8 md:pt-32 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p {...fade(0)} className="label-mono flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {data.hero.eyebrow}
            <span className="hidden font-normal normal-case tracking-normal text-faint md:inline">
              · {data.hero.location}
            </span>
          </motion.p>

          <h1 className="text-display mt-6 text-ink">
            {data.hero.headline.map((segments, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span {...line(i)} className="block will-change-transform">
                  {segments.map((s, j) =>
                    s.serif ? (
                      <em key={j} className="serif-accent pr-[0.04em] text-accent">
                        {s.t}
                      </em>
                    ) : (
                      <span key={j}>{s.t}</span>
                    )
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...fade(1)} className="text-lead mt-6 max-w-xl text-muted">
            {data.hero.sub}
          </motion.p>

          <motion.div {...fade(2)} className="mt-8 flex flex-wrap items-center gap-3.5">
            <Magnetic>
              <button
                onClick={() => scrollTo(data.hero.ctas.primary.href)}
                className="group flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-white transition-colors duration-300 hover:bg-accent-strong"
              >
                {data.hero.ctas.primary.label}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <button
              onClick={() => scrollTo(data.hero.ctas.secondary.href)}
              className="group flex items-center gap-2.5 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-ink transition-colors duration-300 hover:border-ink/30 hover:bg-surface"
            >
              {data.hero.ctas.secondary.label}
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </motion.div>

          <motion.p
            {...fade(3)}
            className="mt-10 flex items-center gap-2.5 border-t border-line pt-6 text-sm text-muted"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            {data.hero.availability}
          </motion.p>
        </div>

        {/* Product collage */}
        <div className="relative hidden h-[440px] select-none lg:col-span-5 lg:block xl:h-[480px]">
          <motion.div {...pop(0)} className="absolute left-0 top-10 w-[78%]">
            <div className="frame rotate-[-2deg] p-1.5">
              <img
                src={data.hero.visual.main}
                alt={data.hero.visual.mainAlt}
                className="w-full rounded-lg object-cover"
              />
            </div>
          </motion.div>
          <motion.div {...pop(1)} className="absolute right-0 top-0 w-[46%]">
            <div className="frame animate-float-soft rotate-[2.5deg] p-1.5 [animation-delay:0.6s]">
              <img
                src={data.hero.visual.float1}
                alt={data.hero.visual.float1Alt}
                className="w-full rounded-lg object-cover"
              />
            </div>
          </motion.div>
          <motion.div {...pop(2)} className="absolute bottom-0 right-6 w-[52%]">
            <div className="frame animate-float-soft rotate-[1.5deg] p-1.5 [animation-delay:2.2s]">
              <img
                src={data.hero.visual.float2}
                alt={data.hero.visual.float2Alt}
                className="w-full rounded-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Capability marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="relative z-10 border-y border-line bg-surface/70 py-3.5 backdrop-blur-sm"
      >
        <Marquee items={data.hero.marquee} duration={40} />
      </motion.div>
    </section>
  );
}

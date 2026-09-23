import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, CalendarClock, ChevronRight, Clock } from "lucide-react";
import data from "../../data/site.json";
import { NodeField } from "../ui/NodeField";
import { Magnetic } from "../ui/Magnetic";
import { Marquee } from "../ui/Marquee";
import { LogoMark } from "../ui/LogoMark";
import { EASE } from "../../lib/motion";
import { useScrollTo } from "../../lib/useScrollTo";
import { nextOpenDays, requestSlot } from "../../lib/schedule";

function AvailabilityCard({ ready }) {
  const scrollTo = useScrollTo();
  const cfg = data.hero.card;
  const days = nextOpenDays(3, true);
  const openings = days.map((d) => ({ ...d, slot: "10:00" }));

  const pop = (i) => ({
    initial: { opacity: 0, y: 24, scale: 0.97 },
    animate: ready ? { opacity: 1, y: 0, scale: 1 } : {},
    transition: { duration: 0.8, delay: 0.4 + i * 0.12, ease: EASE },
  });

  return (
    <div className="relative">
      {/* soft glow behind card (gradient only: a blur layer here is expensive to scroll) */}
      <div className="mesh-glow absolute -inset-6 rounded-[2.5rem] opacity-80" aria-hidden="true" />

      <motion.div {...pop(0)} className="card relative overflow-hidden p-6">
        <div className="flex items-center gap-3.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <CalendarClock className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-medium tracking-tight text-ink">{cfg.title}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <Clock className="h-3 w-3" />
              {cfg.length}
            </p>
          </div>
        </div>

        <div className="my-5 border-t border-line" />

        <p className="label-mono">Next openings</p>
        <div className="mt-3 flex flex-col gap-2">
          {openings.map((o, i) => (
            <motion.button
              key={o.iso}
              {...pop(i + 1)}
              onClick={() => {
                requestSlot({ iso: o.iso, slot: o.slot });
                scrollTo("#connect");
              }}
              className="group flex items-center justify-between rounded-xl border border-line bg-bg px-4 py-3 text-left transition-all duration-300 hover:border-accent hover:bg-accent-soft"
            >
              <span className="text-sm font-bold text-ink">
                {o.full} <span className="font-medium text-muted">· {o.slot}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
            </motion.button>
          ))}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-faint">{cfg.note}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{cfg.timezone}</p>
          <button
            onClick={() => {
              scrollTo("#connect");
            }}
            className="group flex items-center gap-1 text-xs font-bold text-accent"
          >
            {cfg.cta}
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>

      {/* floating reply-time chip */}
      <motion.div
        {...pop(3)}
        className="animate-float-soft absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 shadow-[var(--shadow-card-lg)] sm:flex"
      >
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#12805c]" />
        <span className="text-xs font-bold text-ink">Replies within 2 days</span>
      </motion.div>
    </div>
  );
}

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

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,black,transparent)]" />
        <NodeField className="absolute inset-0 h-full w-full opacity-60" />
      </div>

      <div className="container-x relative z-10 grid items-center gap-14 pb-14 pt-32 md:pt-36 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent-soft px-4 py-2"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            <span className="text-xs font-bold tracking-wide text-accent-strong">{data.hero.badge}</span>
          </motion.p>

          <h1 className="text-display mt-6 text-ink">
            {data.hero.headline.map((segments, i) => (
              <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span {...line(i)} className="block will-change-transform">
                  {segments.map((s, j) =>
                    s.mark ? (
                      <span key={j} className="text-mark">
                        {s.t}
                      </span>
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
                className="group flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-white shadow-[0_8px_24px_-8px_var(--color-accent-ring)] transition-all duration-300 hover:bg-accent-strong"
              >
                {data.hero.ctas.primary.label}
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
            <button
              onClick={() => scrollTo(data.hero.ctas.secondary.href)}
              className="group flex items-center gap-2.5 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-ink transition-colors duration-300 hover:border-ink/30 hover:bg-surface"
            >
              {data.hero.ctas.secondary.label}
            </button>
          </motion.div>

          {/* Stat chips */}
          <motion.div {...fade(3)} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {data.hero.stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl font-medium tracking-tight text-ink">{s.value}</span>
                <span className="text-xs font-medium text-muted">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Availability card */}
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-md lg:ml-auto lg:mr-0">
            <AvailabilityCard ready={ready} />
          </div>
        </div>
      </div>

      {/* Proof marquee */}
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

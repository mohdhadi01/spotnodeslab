import React from "react";
import { motion } from "framer-motion";
import { EASE } from "../../lib/motion";

/**
 * Scroll-triggered fade-up reveal.
 */
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div", once = true }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline renderer driven by data:
 * lines: [[{ t: "Work that " }, { t: "shipped", mark: true }, { t: "." }]]
 * Each line wipes in from below with a mask.
 * The observer sits on the parent (never fully clipped) and stagger-propagates
 * to the masked lines — observing the lines themselves would deadlock, since a
 * line at y:112% is fully hidden by its overflow-hidden wrapper.
 */
export function Headline({ lines, className = "", as = "h2", delay = 0, stagger = 0.12 }) {
  const Tag = motion[as] ?? motion.h2;
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const lineVariant = {
    hidden: { y: "112%" },
    show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
  };
  const renderSegment = (s, j) => {
    if (s.mark) return <span key={j} className="text-mark">{s.t}</span>;
    if (s.serif) return <em key={j} className="serif-accent pr-[0.04em]">{s.t}</em>;
    return <span key={j}>{s.t}</span>;
  };
  return (
    <Tag
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      className={className}
    >
      {lines.map((segments, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={lineVariant} className="block will-change-transform">
            {segments.map(renderSegment)}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Section header: mono label + big data-driven headline + optional sub copy.
 */
export function SectionIntro({ label, heading, sub, className = "" }) {
  return (
    <div className={`flex flex-col gap-6 md:gap-8 ${className}`}>
      <Reveal y={16}>
        <p className="label-mono flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {label}
        </p>
      </Reveal>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <Headline
          lines={heading}
          className="text-h2 md:col-span-7"
        />
        {sub && (
          <Reveal delay={0.25} className="md:col-span-5">
            <p className="text-paper-dim max-w-md text-base leading-relaxed md:ml-auto md:text-right">
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

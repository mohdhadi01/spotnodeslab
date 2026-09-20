import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";

/* ——— Word-by-word scrubbed manifesto ——— */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

function ScrubParagraph({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

/* ——— Count-up stat ——— */
function Stat({ value, suffix, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const numRef = useRef(null);

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const controls = animate(0, value, {
      duration: 1.5,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = Math.round(v);
      },
    });
    return () => controls.stop();
  }, [inView, value, index]);

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
      <p className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
        <span ref={numRef}>0</span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2.5 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}

export function Studio() {
  return (
    <section id="studio" className="relative bg-surface-2 py-16 md:py-24">
      <div className="container-x flex flex-col gap-12 md:gap-16">
        <SectionIntro label={data.studio.label} heading={data.studio.heading} />

        {/* Manifesto */}
        <ScrubParagraph
          text={data.studio.manifesto}
          className="max-w-3xl font-display text-xl font-medium leading-relaxed tracking-tight text-ink md:text-3xl md:leading-snug"
        />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {data.studio.stats.map((s, i) => (
            <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} />
          ))}
        </div>

        {/* Principles */}
        <div className="grid gap-6 md:grid-cols-3">
          {data.studio.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} y={20}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 className="mt-3.5 text-lg font-medium tracking-tight text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Leadership */}
        <div>
          <Reveal y={14}>
            <p className="label-mono">{data.studio.teamLabel}</p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {data.studio.team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1} y={22}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-lg)] sm:flex-row">
                  <div className="relative w-full shrink-0 overflow-hidden bg-surface-2 sm:w-[42%]">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="h-56 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-full"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-medium tracking-tight text-ink">{member.name}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      {member.role}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{member.bio}</p>

                    <p className="mt-4 border-t border-line pt-4 text-xs font-medium text-faint">
                      {member.highlight}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={member.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-bold text-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
                      >
                        <Download className="h-3 w-3" />
                        Résumé
                      </a>
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-bold text-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
                      >
                        Portfolio
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

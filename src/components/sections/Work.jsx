import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ExternalLink, Github, Play, Smartphone, X } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { EASE } from "../../lib/motion";

const LINK_ICONS = { live: ExternalLink, play: Play, github: Github, app: Smartphone };

function ProjectCard({ project, onOpen }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <Reveal y={26} className="h-full">
      <article
        ref={ref}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-lg)]"
        data-cursor="view"
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
        aria-label={`Open ${project.title} case study`}
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
          <motion.img
            src={project.image}
            alt={`${project.title} interface`}
            loading="lazy"
            style={{ y }}
            className="h-full w-full scale-[1.09] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.13]"
          />
          <span
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ink/85 font-mono text-xs text-white backdrop-blur-md"
            aria-hidden="true"
          >
            {project.index}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="label-mono flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
            {project.category}
          </p>
          <h3 className="mt-3 flex items-baseline justify-between text-2xl font-medium tracking-tight text-ink">
            {project.title}
            <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CaseModal({ project, onClose }) {
  const lenis = useLenis();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-end justify-center p-0 md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative grid max-h-[92svh] w-full max-w-4xl grid-rows-[auto_1fr] overflow-hidden rounded-t-2xl border border-line bg-surface shadow-[var(--shadow-card-lg)] md:grid-cols-5 md:grid-rows-1 md:rounded-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/90 text-ink backdrop-blur-md transition-colors hover:bg-surface-2"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-48 overflow-hidden border-b border-line bg-surface-2 md:col-span-2 md:h-auto md:border-b-0 md:border-r">
          <img
            src={project.image}
            alt={`${project.title} interface`}
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div data-lenis-prevent className="flex flex-col overflow-y-auto p-6 md:col-span-3 md:p-8">
          <p className="label-mono flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
            {project.category}
          </p>
          <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink">{project.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

          <p className="label-mono mt-7 mb-3">What it does</p>
          <ul className="flex flex-col gap-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-2.5 border-t border-line pt-6">
            {project.links.map((l) => {
              const Icon = LINK_ICONS[l.type] ?? ExternalLink;
              return (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-accent"
                >
                  {l.label}
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="work" className="relative bg-bg py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.work.label} heading={data.work.heading} sub={data.work.sub} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:gap-6">
          {data.work.featured.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>

        {/* Archive */}
        <div className="mt-12 md:mt-16">
          <Reveal y={14}>
            <p className="label-mono">{data.work.archiveLabel}</p>
          </Reveal>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {data.work.archive.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} y={14} className="h-full">
                <div className="flex h-full flex-col justify-between gap-5 bg-surface p-5 transition-colors duration-300 hover:bg-surface-2 md:p-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-lg font-medium tracking-tight text-ink">{item.title}</h4>
                      <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    </div>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{item.summary}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {item.tech.map((t) => (
                        <span key={t} className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {item.links.map((l) => {
                        const Icon = LINK_ICONS[l.type] ?? ExternalLink;
                        return (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-bold text-muted transition-colors duration-300 hover:border-ink/30 hover:text-ink"
                          >
                            <Icon className="h-3 w-3" />
                            {l.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <CaseModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

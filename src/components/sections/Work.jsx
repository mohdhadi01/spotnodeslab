import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Lock, MoveHorizontal, Play, Smartphone, X } from "lucide-react";
import { useLenis } from "lenis/react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { EASE } from "../../lib/motion";

const LINK_ICONS = { live: ExternalLink, play: Play, github: Github, app: Smartphone };

function BrowserFrame({ project, children }) {
  return (
    <div className="browser-frame">
      <div className="browser-chrome">
        <span className="browser-dot bg-[#FF5F57]" />
        <span className="browser-dot bg-[#FEBC2E]" />
        <span className="browser-dot bg-[#28C840]" />
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-surface px-2.5 py-1">
          <Lock className="h-2.5 w-2.5 shrink-0 text-faint" />
          <span className="truncate font-mono text-[10px] text-muted">{project.siteUrl}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

function CaseModal({ project, onClose }) {
  const lenis = useLenis();

  React.useEffect(() => {
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

        <div className="relative h-48 overflow-hidden border-b border-line bg-surface-2 p-3 md:col-span-2 md:h-auto md:border-b-0 md:border-r md:p-4">
          <div className="h-full w-full">
            <BrowserFrame project={project}>
              <img
                src={project.image}
                alt={`${project.title} interface`}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </BrowserFrame>
          </div>
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

function GalleryCard({ project, onOpen }) {
  return (
    <article
      className="group w-[82vw] max-w-[520px] shrink-0 cursor-pointer snap-start sm:w-[520px]"
      data-cursor="drag"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      aria-label={`Open ${project.title} case study`}
    >
      <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <BrowserFrame project={project}>
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
            <img
              src={project.image}
              alt={`${project.title} interface`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </BrowserFrame>

        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <div className="flex items-start gap-3.5">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-medium text-white"
              style={{ backgroundColor: project.accent }}
              aria-hidden="true"
            >
              {project.index}
            </span>
            <div>
              <h3 className="text-xl font-medium tracking-tight text-ink">{project.title}</h3>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-faint">
                {project.category}
              </p>
            </div>
          </div>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-2.5 px-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      </div>
    </article>
  );
}

export function Work() {
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(0);
  const scrollerRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el || e.pointerType === "touch") return; // touch scrolls natively
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.classList.add("cursor-grabbing");
  };
  const onPointerMove = (e) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    const el = scrollerRef.current;
    drag.current.down = false;
    el?.classList.remove("cursor-grabbing");
  };
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section id="work" className="relative bg-bg py-16 md:py-24">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <SectionIntro label={data.work.label} heading={data.work.heading} sub={data.work.sub} className="flex-1" />
          <Reveal y={14} className="hidden shrink-0 pb-2 md:block">
            <p className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-muted shadow-[var(--shadow-card)]">
              <MoveHorizontal className="h-3.5 w-3.5 text-accent" />
              {data.work.hint}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Drag scroller */}
      <div className="relative mt-10 md:mt-14">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 md:px-8 [mask-image:linear-gradient(90deg,transparent,black_3%,black_97%,transparent)]"
        >
          {data.work.featured.map((project) => (
            <GalleryCard key={project.id} project={project} onOpen={setSelected} />
          ))}
          {/* end card: CTA */}
          <div className="flex w-[70vw] max-w-[380px] shrink-0 snap-start items-center pl-2">
            <button
              onClick={() => document.querySelector("#connect")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex w-full flex-col gap-2.5 rounded-2xl border border-accent/25 bg-accent-soft p-7 text-left transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              <span className="font-display text-2xl font-medium tracking-tight text-ink group-hover:text-white">
                Your project here?
              </span>
              <span className="text-sm text-muted group-hover:text-white/80">
                Book a free intro call and let's scope it together.
              </span>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:text-white">
                Start now
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </button>
          </div>
        </div>

        {/* progress */}
        <div className="container-x mt-6">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-150"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Archive */}
      <div className="container-x mt-12 md:mt-16">
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

      <AnimatePresence>
        {selected && <CaseModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

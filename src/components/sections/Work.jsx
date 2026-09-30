import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Lock, Play, Smartphone, X } from "lucide-react";
import { useLenis } from "lenis/react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { EASE } from "../../lib/motion";

const LINK_ICONS = { live: ExternalLink, play: Play, github: Github, app: Smartphone };

/* ————— Device frames ————— */

function BrowserFrame({ project, children }) {
  return (
    <div className="browser-frame h-full w-full">
      <div className="browser-chrome">
        <span className="browser-dot bg-[#FF5F57]" />
        <span className="browser-dot bg-[#FEBC2E]" />
        <span className="browser-dot bg-[#28C840]" />
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-surface px-2.5 py-1">
          <Lock className="h-2.5 w-2.5 shrink-0 text-faint" />
          <span className="truncate font-mono text-[10px] text-muted">{project.siteUrl}</span>
        </span>
      </div>
      <div className="relative h-[calc(100%-2.4rem)] overflow-hidden bg-surface-2">{children}</div>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto h-full w-auto aspect-[9/17]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-line bg-surface shadow-[var(--shadow-card)]">
        <div className="relative flex items-center justify-between bg-surface-2/70 px-4 pb-0.5 pt-1.5">
          <span className="font-mono text-[8px] font-bold text-ink/60">9:41</span>
          <span className="absolute left-1/2 top-1 h-3 w-12 -translate-x-1/2 rounded-full bg-ink/90" aria-hidden="true" />
          <span className="flex h-1.5 w-5 items-center rounded-[2px] border border-ink/25 p-[1px]" aria-hidden="true">
            <span className="h-full w-3/4 rounded-[1px] bg-ink/45" />
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden bg-surface-2">{children}</div>
      </div>
    </div>
  );
}

/* ————— Screenshot with blueprint fallback —————
   Until real screenshots land in /public/images, missing shots render as a
   tinted abstract wireframe (project accent + category), never a broken img. */

const WIRE_PATTERNS = ["bars", "rows", "grid", "split"];

/* Landscape wireframe for web products (inside a browser frame). */
function BrowserWirefill({ project }) {
  const pattern = WIRE_PATTERNS[Number(project.index) % WIRE_PATTERNS.length];
  const a = project.accent;
  const soft = `${a}1A`;
  const mid = `${a}33`;
  const bar = (h, w) => <span className="rounded-full" style={{ height: h, width: w, background: mid }} />;

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-[7%]"
      style={{ background: `linear-gradient(160deg, ${soft}, transparent 65%)` }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-[4%]">
        <span className="rounded-md" style={{ width: "12%", aspectRatio: "1", background: a, opacity: 0.85 }} />
        {bar("7%", "32%")}
        <div className="ml-auto flex gap-[3%]">{bar("7%", "9%")}{bar("7%", "9%")}</div>
      </div>

      {pattern === "bars" && (
        <div className="flex h-[48%] items-end gap-[3.5%]">
          {[38, 62, 48, 80, 58, 92, 44].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md"
              style={{ height: `${h}%`, background: i % 3 === 1 ? a : mid, opacity: i % 3 === 1 ? 0.75 : 1 }}
            />
          ))}
        </div>
      )}
      {pattern === "rows" && (
        <div className="flex h-[48%] flex-col justify-center gap-[8%]">
          {[82, 64, 74, 46].map((w, i) => (
            <span key={i} className="rounded-full" style={{ height: "10%", width: `${w}%`, background: i === 0 ? a : mid, opacity: i === 0 ? 0.7 : 1 }} />
          ))}
        </div>
      )}
      {pattern === "grid" && (
        <div className="grid h-[48%] grid-cols-3 grid-rows-2 gap-[5%]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="rounded-md" style={{ background: i === 4 ? a : mid, opacity: i === 4 ? 0.75 : 1 }} />
          ))}
        </div>
      )}
      {pattern === "split" && (
        <div className="flex h-[48%] gap-[5%]">
          <div className="flex w-[34%] flex-col gap-[12%] rounded-md" style={{ background: soft }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="mx-auto rounded-full" style={{ height: "8%", width: "60%", background: mid }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col justify-between rounded-md p-[6%]" style={{ background: soft }}>
            {bar("12%", "70%")}
            <span className="rounded-md" style={{ height: "56%", width: "100%", background: a, opacity: 0.35 }} />
            {bar("10%", "45%")}
          </div>
        </div>
      )}

      <div className="flex items-center gap-[3%]">
        {bar("7%", "18%")}{bar("7%", "12%")}
      </div>
    </div>
  );
}

/* Portrait app-style wireframe for mobile products (inside the phone frame). */
function PhoneWirefill({ project }) {
  const a = project.accent;
  const soft = `${a}14`;
  const mid = `${a}30`;
  const bar = (h, w, extra = {}) => (
    <span className="rounded-full" style={{ height: h, width: w, background: mid, ...extra }} />
  );

  return (
    <div className="flex h-full w-full flex-col gap-[4%] p-[7%]" style={{ background: `linear-gradient(170deg, ${soft}, transparent 70%)` }} aria-hidden="true">
      {/* app header */}
      <div className="flex items-center gap-[4%]">
        <span className="rounded-full" style={{ width: "11%", aspectRatio: "1", background: a, opacity: 0.85 }} />
        <div className="flex flex-col gap-[5%]" style={{ width: "34%" }}>
          {bar("8%", "100%")}
          {bar("7%", "62%")}
        </div>
        <span className="ml-auto rounded-full" style={{ width: "9%", aspectRatio: "1", background: mid }} />
      </div>

      {/* hero card */}
      <div className="flex flex-col justify-between rounded-xl p-[6%]" style={{ background: a, opacity: 0.9, height: "22%" }}>
        <span className="rounded-full" style={{ height: "12%", width: "44%", background: "rgba(255,255,255,0.45)" }} />
        <span className="rounded-full" style={{ height: "18%", width: "66%", background: "rgba(255,255,255,0.85)" }} />
      </div>

      {/* section label */}
      {bar("5%", "38%")}

      {/* list rows */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-[4%]">
          <span className="shrink-0 rounded-lg" style={{ width: "12%", aspectRatio: "1", background: i === 0 ? a : mid }} />
          <div className="flex flex-1 flex-col gap-[6%]">
            {bar("8%", i % 2 ? "72%" : "88%")}
            {bar("7%", "46%")}
          </div>
        </div>
      ))}

      {/* bottom tab bar */}
      <div className="mt-auto flex items-center justify-around rounded-xl border-t pt-[4%]" style={{ borderColor: `${a}1F` }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="rounded-full" style={{ width: "9%", aspectRatio: "1", background: i === 0 ? a : mid }} />
        ))}
      </div>
    </div>
  );
}

function Shot({ src, alt, project, variant = "browser", className = "" }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  if (failed) {
    return variant === "phone" ? <PhoneWirefill project={project} /> : <BrowserWirefill project={project} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/**
 * Phone projects always render inside the phone mockup; when their portrait
 * `phoneImage` is missing they show the portrait app wireframe instead.
 */
function isPhoneProject(project) {
  return project.device === "phone";
}

/* ————— Case modal ————— */

function CaseModal({ project, onClose }) {
  const lenis = useLenis();
  const isPhone = isPhoneProject(project);

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

        <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-line bg-surface-2 p-3 md:col-span-2 md:h-auto md:border-b-0 md:border-r md:p-4">
          {isPhone ? (
            <div className="h-full py-2">
              <PhoneFrame>
                <Shot
                  src={project.phoneImage}
                  alt={`${project.title} app screen`}
                  project={project}
                  variant="phone"
                  className="h-full w-full object-cover object-top"
                />
              </PhoneFrame>
            </div>
          ) : (
            <div className="h-full w-full">
              <BrowserFrame project={project}>
                <Shot
                  src={project.image}
                  alt={`${project.title} interface`}
                  project={project}
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </BrowserFrame>
            </div>
          )}
        </div>

        <div data-lenis-prevent className="flex flex-col overflow-y-auto p-6 md:col-span-3 md:p-8">
          <p className="label-mono flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
            {project.category}
            {project.timeline && <span className="normal-case tracking-normal">· {project.timeline}</span>}
          </p>
          <h3 className="mt-3 text-3xl font-medium tracking-tight text-ink">{project.title}</h3>
          {project.status && (
            <p
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold"
              style={{ background: `${project.accent}14`, color: project.accent }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
              {project.status}
            </p>
          )}
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

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {project.links?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2.5 border-t border-line pt-6">
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
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ————— Grid card ————— */

function PlatformChip({ platform }) {
  const labels = { mobile: "Mobile", web: "Web", web3: "Web3" };
  return (
    <span className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
      {labels[platform] ?? platform}
    </span>
  );
}

function ProjectCard({ project, onOpen }) {
  const isPhone = isPhoneProject(project);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-lg)]"
      data-cursor="view"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      aria-label={`Open ${project.title} case study`}
    >
      {/* Visual — device-appropriate (web: browser mockup, app: phone mockup) */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
        {isPhone ? (
          <div
            className="absolute inset-0 flex items-center justify-center p-[8%]"
            style={{ background: `linear-gradient(150deg, ${project.accent}16, transparent 62%)` }}
          >
            <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
              <PhoneFrame>
                <Shot
                  src={project.phoneImage}
                  alt={`${project.title} app screen`}
                  project={project}
                  variant="phone"
                  className="h-full w-full object-cover object-top"
                />
              </PhoneFrame>
            </div>
          </div>
        ) : (
          <BrowserFrame project={project}>
            <Shot
              src={project.image}
              alt={`${project.title} interface`}
              project={project}
              variant="browser"
              className="h-full w-full object-cover object-top will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </BrowserFrame>
        )}

        {/* index (bottom-left, clear of the browser chrome) + status (top-right) */}
        <span
          className="absolute bottom-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg font-mono text-[11px] font-medium text-white shadow-[var(--shadow-card)]"
          style={{ backgroundColor: project.accent }}
          aria-hidden="true"
        >
          {project.index}
        </span>
        {project.status && (
          <span
            className="absolute right-3 top-3 z-10 inline-flex max-w-[75%] items-center gap-1.5 truncate rounded-full px-3 py-1.5 text-[11px] font-bold backdrop-blur-sm"
            style={{ background: `${project.accent}E6`, color: "#fff" }}
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-white" />
            <span className="truncate">{project.status}</span>
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-medium tracking-tight text-ink md:text-xl">{project.title}</h3>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-faint">
              {project.category}
            </p>
          </div>
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted line-clamp-2">{project.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line pt-3.5">
          {project.platforms.map((pl) => (
            <PlatformChip key={pl} platform={pl} />
          ))}
          <span className="mx-1 h-3 w-px bg-line" />
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            {project.tech.slice(0, 3).join(" · ")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ————— "More from the lab": independent builds + earlier client work,
   merged into one grid so counts stay even and the block reads as one ————— */

function MoreGrid({ items, label }) {
  const odd = items.length % 2 === 1;
  return (
    <div className="mt-14 md:mt-20">
      <Reveal y={14}>
        <p className="label-mono">{label}</p>
      </Reveal>
      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.04} y={14} className="h-full">
            <div className="flex h-full flex-col justify-between gap-5 bg-surface p-5 transition-colors duration-300 hover:bg-surface-2 md:p-6">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-lg font-medium tracking-tight text-ink">{item.title}</h4>
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </div>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{item.summary}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {item.group && (
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] ${
                      item.group === "Independent build"
                        ? "bg-accent-soft text-accent-strong"
                        : "bg-surface-2 text-muted"
                    }`}
                  >
                    {item.group}
                  </span>
                )}
                {item.tech.map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                    {t}
                  </span>
                ))}
                {item.links?.length > 0 && (
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
                )}
              </div>
            </div>
          </Reveal>
        ))}

        {/* graceful filler when the count is odd */}
        {odd && (
          <Reveal y={14} delay={items.length * 0.04} className="h-full">
            <button
              onClick={() => document.querySelector("#connect")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex h-full w-full flex-col items-start justify-center gap-2 bg-bg p-5 text-left md:p-6"
            >
              <span className="font-display text-lg font-medium tracking-tight text-ink">
                Your project in this list?
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-accent">
                Book a free intro call
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </button>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/* ————— Section ————— */

export function Work() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const c = { all: data.work.featured.length };
    for (const p of data.work.featured) {
      for (const pl of p.platforms ?? []) c[pl] = (c[pl] ?? 0) + 1;
    }
    return c;
  }, []);

  const visible = useMemo(() => {
    if (filter === "all") return data.work.featured;
    return data.work.featured.filter((p) => (p.platforms ?? []).includes(filter));
  }, [filter]);

  return (
    <section id="work" className="relative bg-bg py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.work.label} heading={data.work.heading} sub={data.work.sub} />

        {/* Platform filter */}
        <Reveal y={14} className="mt-8 md:mt-10">
          <div
            role="tablist"
            aria-label="Filter projects by platform"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
          >
            {data.work.filters.map((f) => {
              const active = filter === f.id;
              const n = counts[f.id] ?? 0;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4.5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    active
                      ? "border-ink bg-ink text-white shadow-[var(--shadow-card)]"
                      : "border-line bg-surface text-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {f.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                      active ? "bg-white/15 text-white" : "bg-surface-2 text-faint"
                    }`}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Filterable grid */}
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:gap-5 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </AnimatePresence>

          {/* CTA card, always last */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex"
          >
            <button
              onClick={() => document.querySelector("#connect")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex w-full flex-col justify-between gap-6 rounded-2xl border border-accent/25 bg-accent-soft p-6 text-left transition-colors duration-300 hover:bg-accent hover:text-white md:p-7"
            >
              <span className="font-display text-2xl font-medium tracking-tight text-ink group-hover:text-white">
                Your project here?
              </span>
              <span className="flex flex-col gap-2">
                <span className="text-sm text-muted group-hover:text-white/80">
                  Book a free intro call and let's scope it together.
                </span>
                <span className="inline-flex w-fit items-center gap-2 text-sm font-bold text-accent group-hover:text-white">
                  Start now
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </span>
            </button>
          </motion.div>
        </motion.div>

        <MoreGrid items={data.work.more} label={data.work.moreLabel} />

        {/* Side engineering */}
        <div className="mt-14 md:mt-20">
          <Reveal y={14}>
            <p className="label-mono">{data.work.sideLabel}</p>
          </Reveal>
          <div className="mt-5 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
            {data.work.sideEngineering.map((s, i) => (
              <Reveal key={s.title} y={10} delay={i * 0.04}>
                <div className="flex flex-col gap-1 px-5 py-4 transition-colors duration-300 hover:bg-surface-2 sm:flex-row sm:items-baseline sm:gap-6 md:px-6">
                  <span className="w-fit shrink-0 text-sm font-bold text-ink sm:w-[16rem]">{s.title}</span>
                  <span className="font-mono text-xs leading-relaxed text-muted">{s.note}</span>
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

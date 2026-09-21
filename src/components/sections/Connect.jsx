import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  CalendarRange,
  Check,
  Github,
  Loader2,
  Mail,
  MessageCircle,
} from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { EASE } from "../../lib/motion";
import { nextOpenDays } from "../../lib/schedule";

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint focus:outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent-soft disabled:opacity-50";

async function postToSheet(payload) {
  const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
  if (!scriptUrl) throw new Error("Missing VITE_GOOGLE_APPS_SCRIPT_URL in .env");
  const body = new URLSearchParams(payload);
  await fetch(scriptUrl, { method: "POST", mode: "no-cors", body });
}

/* ————— Scheduler card ————— */
function Scheduler() {
  const cfg = data.connect.schedule;
  const days = nextOpenDays(cfg.daysAhead, cfg.skipWeekend);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");

  useEffect(() => {
    const onSelect = (e) => {
      const idx = days.findIndex((d) => d.iso === e.detail.iso);
      if (idx >= 0) setDayIdx(idx);
      setSlot(e.detail.slot);
    };
    window.addEventListener("sn:select-slot", onSelect);
    return () => window.removeEventListener("sn:select-slot", onSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!slot) {
      setError(cfg.form.pickBoth);
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please add your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      await postToSheet({
        type: "schedule-call",
        name: form.name,
        email: form.email,
        message: `${form.note || "(not provided)"}\nSlot: ${days[dayIdx].full}, ${slot} ${cfg.timezone}`,
        slot: `${days[dayIdx].iso} ${slot}`,
      });
      setStatus("done");
    } catch {
      setError("Could not send. Please try again or email us directly.");
      setStatus("idle");
    }
  };

  return (
    <div className="card flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center gap-3.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <CalendarRange className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-medium tracking-tight text-ink">{cfg.title}</h3>
          <p className="text-xs text-muted">{cfg.length}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-8 flex flex-1 flex-col items-center justify-center rounded-xl border border-[#12805c]/25 bg-[#12805c]/5 p-8 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12805c] text-white">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
            <p className="mt-4 text-sm font-bold text-ink">{cfg.form.sent}</p>
            <p className="mt-1.5 text-xs text-muted">
              {days[dayIdx].full} · {slot} {cfg.timezone}
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setSlot(null);
                setForm({ name: "", email: "", note: "" });
              }}
              className="mt-5 text-xs font-bold text-accent u-underline"
            >
              Book another slot
            </button>
          </motion.div>
        ) : (
          <motion.div key="picker" className="mt-6 flex flex-1 flex-col">
            {/* Day picker */}
            <p className="label-mono">1 · Pick a day</p>
            <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
              {days.slice(0, 10).map((d, i) => (
                <button
                  key={d.iso}
                  onClick={() => setDayIdx(i)}
                  className={`flex w-[4.2rem] shrink-0 flex-col items-center rounded-xl border py-2.5 transition-all duration-300 ${
                    dayIdx === i
                      ? "border-accent bg-accent text-white shadow-[0_6px_16px_-6px_var(--color-accent-ring)]"
                      : "border-line bg-bg text-ink hover:border-accent/50"
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase ${dayIdx === i ? "text-white/75" : "text-faint"}`}>
                    {d.weekday}
                  </span>
                  <span className="font-display text-lg font-medium leading-tight">{d.dayNum}</span>
                  <span className={`text-[10px] ${dayIdx === i ? "text-white/75" : "text-faint"}`}>{d.month}</span>
                </button>
              ))}
            </div>

            {/* Slot picker */}
            <p className="label-mono mt-5">2 · Pick a time</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {cfg.slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`rounded-xl border py-2.5 text-sm font-bold transition-all duration-300 ${
                    slot === s
                      ? "border-accent bg-accent text-white shadow-[0_6px_16px_-6px_var(--color-accent-ring)]"
                      : "border-line bg-bg text-ink hover:border-accent/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-faint">All times in {cfg.timezone}</p>

            {/* Details */}
            <p className="label-mono mt-5">3 · Your details</p>
            <form onSubmit={submit} className="mt-3 flex flex-col gap-2.5">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <input
                  aria-label={cfg.form.name}
                  placeholder={cfg.form.name}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  disabled={status === "loading"}
                  className={field}
                />
                <input
                  aria-label={cfg.form.email}
                  type="email"
                  placeholder={cfg.form.email}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  disabled={status === "loading"}
                  className={field}
                />
              </div>
              <input
                aria-label={cfg.form.note}
                placeholder={cfg.form.note}
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                disabled={status === "loading"}
                className={field}
              />

              {error && <p className="text-xs font-medium text-[#d92d20]">{error}</p>}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileTap={{ scale: 0.98 }}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-accent-strong disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    {cfg.form.sending} <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {cfg.form.submit}
                    <CalendarCheck className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ————— Message card ————— */
function MessageCard() {
  const t = data.connect.message.form;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onPrefill = (e) => {
      setForm((f) => ({ ...f, message: e.detail.text }));
      setStatus("idle");
    };
    window.addEventListener("sn:prefill-message", onPrefill);
    return () => window.removeEventListener("sn:prefill-message", onPrefill);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setError(t.errorFields);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setError(t.errorEmail);
      return;
    }
    setStatus("loading");
    try {
      await postToSheet({ type: "message", name: form.name, email: form.email, message: form.message });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setError(err?.message || t.errorGeneric);
    }
  };

  return (
    <div className="card flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center gap-3.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Mail className="h-5 w-5" />
        </span>
        <h3 className="font-display text-lg font-medium tracking-tight text-ink">{data.connect.message.title}</h3>
      </div>

      <form onSubmit={submit} className="mt-6 flex flex-1 flex-col gap-2.5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <input
            id="c-name"
            aria-label={t.name}
            placeholder={t.name}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            disabled={status === "loading"}
            className={field}
            autoComplete="name"
          />
          <input
            id="c-email"
            aria-label={t.email}
            type="email"
            placeholder={t.email}
            value={form.email}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }));
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading"}
            className={field}
            autoComplete="email"
          />
        </div>
        <textarea
          id="c-message"
          aria-label={t.message}
          rows={5}
          placeholder={t.message}
          value={form.message}
          onChange={(e) => {
            setForm((f) => ({ ...f, message: e.target.value }));
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          className={`${field} resize-none flex-1`}
        />

        {status === "error" && (
          <p className="text-xs font-medium text-[#d92d20]" role="alert">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileTap={{ scale: 0.98 }}
          className={`mt-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-colors duration-300 disabled:opacity-60 ${
            status === "success" ? "bg-[#12805c] text-white" : "bg-ink text-white hover:bg-accent"
          }`}
        >
          {(status === "idle" || status === "error") && t.submit}
          {status === "loading" && (
            <>
              {t.sending} <Loader2 className="h-4 w-4 animate-spin" />
            </>
          )}
          {status === "success" && (
            <>
              {t.sent} <Check className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}

/* ————— Direct channels ————— */
function DirectLinks() {
  const d = data.connect.direct;
  const socials = d.socials?.filter((s) => s.url) ?? [];
  return (
    <Reveal y={16}>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-6 py-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`mailto:${d.email}`}
            className="flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-xs font-bold text-ink transition-colors duration-300 hover:border-accent hover:text-accent-strong"
          >
            <Mail className="h-3.5 w-3.5 text-accent" />
            {d.email}
          </a>
          {d.whatsapp && (
            <a
              href={`https://wa.me/${d.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-xs font-bold text-ink transition-colors duration-300 hover:border-accent hover:text-accent-strong"
            >
              <MessageCircle className="h-3.5 w-3.5 text-accent" />
              {d.whatsappLabel}
            </a>
          )}
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-xs font-bold text-ink transition-colors duration-300 hover:border-accent hover:text-accent-strong"
            >
              <Github className="h-3.5 w-3.5 text-accent" />
              {s.label}
            </a>
          ))}
        </div>
        <p className="flex items-center gap-2 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#12805c]" />
          {d.responseNote}
        </p>
      </div>
    </Reveal>
  );
}

export function Connect() {
  return (
    <section id="connect" className="relative bg-bg py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.connect.label} heading={data.connect.heading} sub={data.connect.sub} />

        <div className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-2">
          <Reveal y={22} className="h-full">
            <Scheduler />
          </Reveal>
          <Reveal y={22} delay={0.1} className="h-full">
            <MessageCard />
          </Reveal>
        </div>

        <div className="mt-5">
          <DirectLinks />
        </div>
      </div>
    </section>
  );
}

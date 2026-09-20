import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { Magnetic } from "../ui/Magnetic";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const t = data.contact.form;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMsg(t.errorFields);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setErrorMsg(t.errorEmail);
      return;
    }

    setStatus("loading");
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
      if (!scriptUrl) throw new Error("Missing VITE_GOOGLE_APPS_SCRIPT_URL in .env");

      const payload = new URLSearchParams();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("message", formData.message);

      await fetch(scriptUrl, { method: "POST", mode: "no-cors", body: payload });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMsg(error?.message || t.errorGeneric);
    }
  };

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-ink placeholder:text-faint focus:outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent-soft disabled:opacity-50";

  return (
    <section id="contact" className="relative bg-bg py-16 md:py-24">
      <div className="container-x">
        <SectionIntro label={data.contact.label} heading={data.contact.heading} sub={data.contact.sub} />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          {/* Form */}
          <Reveal y={22} className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="label-mono">
                    {t.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    autoComplete="name"
                    className={field}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="label-mono">
                    {t.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    autoComplete="email"
                    className={field}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="label-mono">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className={`${field} resize-none`}
                />
              </div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-sm font-medium text-[#d92d20]"
                    role="alert"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-6 flex items-center gap-5">
                <Magnetic>
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2.5 rounded-full px-7 py-3.5 text-base font-bold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                      status === "success"
                        ? "bg-[#12805c] text-white"
                        : "bg-accent text-white hover:bg-accent-strong"
                    }`}
                  >
                    {status === "idle" && (
                      <>
                        {t.submit}
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                    {status === "loading" && (
                      <>
                        {t.sending}
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    )}
                    {status === "success" && (
                      <>
                        {t.sent}
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </Magnetic>
              </div>
            </form>
          </Reveal>

          {/* Direct channels */}
          <Reveal y={22} delay={0.12} className="md:col-span-5">
            <div className="flex h-full flex-col justify-between gap-10 rounded-2xl border border-line bg-ink p-6 text-white md:p-8">
              <div>
                <p className="label-mono mb-3 !text-white/40">Prefer email?</p>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="u-underline font-display text-xl font-medium tracking-tight md:text-2xl"
                >
                  {data.contact.email}
                </a>
              </div>

              <div>
                <p className="label-mono mb-3 !text-white/40">Elsewhere</p>
                <ul className="flex flex-col gap-2.5">
                  {data.contact.socials
                    .filter((s) => s.url)
                    .map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
                        >
                          <span className="u-underline">{s.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <p className="flex items-center gap-2.5 text-sm text-white/70">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                {data.hero.availability}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

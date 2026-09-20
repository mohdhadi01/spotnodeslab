import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import data from "../../data/site.json";
import { LogoMark } from "../ui/LogoMark";
import { useScrollTo } from "../../lib/useScrollTo";

function IstClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums">{time} IST</span>;
}

/* Footer sits on ink for a confident close to the light page. */
export function Footer() {
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();
  const socials = data.contact.socials.filter((s) => s.url);

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container-x flex flex-col gap-14 pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-5 w-5 text-white" />
              <span className="font-display text-lg font-medium">{data.brand.name}</span>
            </div>
            <p className="mt-5 max-w-xs text-lg leading-relaxed text-white/60">
              {data.footer.tagline}
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-white/50">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              {data.hero.availability}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="label-mono mb-5 !text-white/40">Sitemap</p>
            <ul className="flex flex-col gap-3">
              {data.nav.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="u-underline text-sm text-white/60 hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label-mono mb-5 !text-white/40">Connect</p>
            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-white/60 hover:text-white"
                  >
                    <span className="u-underline">{s.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="u-underline text-sm text-white/60 hover:text-white"
                >
                  {data.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label-mono mb-5 !text-white/40">Studio time</p>
            <p className="text-sm text-white/60">{data.footer.location}</p>
            <p className="mt-3 text-sm text-white/60">
              <IstClock />
            </p>
          </div>
        </div>

        {/* Wordmark */}
        <div
          aria-hidden="true"
          className="select-none whitespace-nowrap font-display text-[11.5vw] font-semibold leading-[0.9] tracking-tight text-white/[0.07]"
        >
          {data.brand.name}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {data.brand.name}. All rights reserved.
          </p>
          <p className="hidden md:block">{data.brand.descriptor}</p>
          <button
            onClick={() => scrollTo("#top")}
            className="group flex items-center gap-2 text-white/60 hover:text-white"
          >
            {data.footer.backToTop}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-accent group-hover:bg-accent">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

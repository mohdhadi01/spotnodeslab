import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, CalendarRange } from "lucide-react";
import data from "../../data/site.json";
import { LogoMark } from "../ui/LogoMark";
import { Magnetic } from "../ui/Magnetic";
import { EASE } from "../../lib/motion";
import { useScrollTo } from "../../lib/useScrollTo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const scrollTo = useScrollTo();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    setTimeout(() => scrollTo(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/85 backdrop-blur-md shadow-[0_1px_12px_rgba(16,19,25,0.04)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-[68px]">
          <button
            onClick={() => go("#top")}
            className="group flex items-center gap-2.5"
            aria-label="SpotNodes: back to top"
          >
            <LogoMark className="h-5 w-5 text-ink transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-display text-lg font-medium tracking-tight text-ink">
              {data.brand.name}
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {data.nav.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                className="u-underline text-sm font-medium text-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <button
                onClick={() => go("#contact")}
                className="group flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-accent-strong"
              >
                Book a call
                <CalendarRange className="h-4 w-4" />
              </button>
            </Magnetic>

            {/* Burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-ink transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-ink transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-[95] flex flex-col justify-between bg-surface px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col">
              {data.nav.map((item, i) => (
                <div key={item.label} className="overflow-hidden border-b border-line">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.55, delay: 0.12 + i * 0.06, ease: EASE }}
                    onClick={() => go(item.href)}
                    className="flex w-full items-baseline justify-between py-4 text-left"
                  >
                    <span className="font-display text-3xl font-medium tracking-tight text-ink">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </motion.button>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <p className="flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                {data.hero.availability}
              </p>
              <button
                onClick={() => go("#contact")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-base font-bold text-white"
              >
                Book a free call <CalendarRange className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

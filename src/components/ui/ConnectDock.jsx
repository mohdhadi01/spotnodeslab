import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarRange, Mail, MessageCircle, X } from "lucide-react";
import data from "../../data/site.json";
import { EASE } from "../../lib/motion";
import { useScrollTo } from "../../lib/useScrollTo";

/**
 * Floating connect dock — one tap to schedule a call, open WhatsApp or email.
 * Present on every screen, collapsed to a single FAB.
 */
export function ConnectDock() {
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();
  const whatsapp = data.connect.direct.whatsapp;

  const actions = [
    {
      label: "Book a free call",
      icon: CalendarRange,
      onClick: () => {
        setOpen(false);
        scrollTo("#connect");
      },
    },
    ...(whatsapp
      ? [
          {
            label: "WhatsApp us",
            icon: MessageCircle,
            href: `https://wa.me/${whatsapp}`,
          },
        ]
      : []),
    {
      label: "Email us",
      icon: Mail,
      href: `mailto:${data.connect.direct.email}`,
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[115] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-col gap-2"
          >
            {actions.map((a) => {
              const Icon = a.icon;
              const inner = (
                <>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-ink">{a.label}</span>
                </>
              );
              return a.href ? (
                <a
                  key={a.label}
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface py-2.5 pl-2.5 pr-5 shadow-[var(--shadow-card-lg)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {inner}
                </a>
              ) : (
                <button
                  key={a.label}
                  onClick={a.onClick}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface py-2.5 pl-2.5 pr-5 shadow-[var(--shadow-card-lg)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {inner}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close connect menu" : "Open connect menu"}
        whileTap={{ scale: 0.92 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_32px_-8px_var(--color-accent-ring)] transition-colors duration-300 hover:bg-accent-strong"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3, ease: EASE }}>
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5.5 w-5.5" />}
        </motion.span>
      </motion.button>
    </div>
  );
}

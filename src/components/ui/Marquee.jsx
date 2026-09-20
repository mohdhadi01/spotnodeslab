import React from "react";

/**
 * Infinite marquee — items duplicated twice, translated -50%.
 * Items: [{ label }] or strings; separator is a small node dot (brand motif).
 */
export function Marquee({ items = [], className = "", duration = 36 }) {
  const list = [...items, ...items];
  return (
    <div className={`group overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {list.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.22em] text-muted">
              {typeof item === "string" ? item : item.label}
            </span>
            <span className="mx-8 inline-block h-1.5 w-1.5 rounded-full bg-accent/40 md:mx-12" />
          </span>
        ))}
      </div>
    </div>
  );
}

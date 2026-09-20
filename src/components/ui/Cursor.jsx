import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor — a precise dot with a lagging ring.
 * Ring expands over interactive elements; over [data-cursor="view"]
 * targets it becomes a "View" badge (for case-study imagery).
 * Disabled on touch devices.
 */
export function Cursor() {
  const [enabled] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hovering, setHovering] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target;
      const view = t.closest?.('[data-cursor="view"]');
      const interactive = t.closest?.("a, button, [role='button'], input, textarea, label, summary");
      setViewing(Boolean(view));
      setHovering(Boolean(interactive) && !view);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-ink"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      {/* Ring / View badge */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[119] flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: viewing ? 84 : hovering ? 52 : 34,
          height: viewing ? 84 : hovering ? 52 : 34,
          borderColor: viewing ? "rgba(46,107,255,0)" : "rgba(16,19,25,0.28)",
          backgroundColor: viewing ? "rgba(46,107,255,0.95)" : "rgba(46,107,255,0)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-opacity duration-200"
          style={{ opacity: viewing ? 1 : 0 }}
        >
          View
        </span>
      </motion.div>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../../lib/motion";

const FULL_MS = 1400;
const QUICK_MS = 450;

/**
 * Session preloader: wordmark + percentage counter + hairline progress,
 * exits as a lifting curtain. Full version on first visit per session,
 * a quick fade afterwards.
 */
export function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const rafRef = useRef(0);
  const full = !sessionStorage.getItem("sn-visited");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const dur = full ? FULL_MS : QUICK_MS;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("sn-visited", "1");
        setFinished(true);
        onDone?.();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {!finished && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg px-6 pb-8 pt-8 md:px-10"
          exit={{ y: full ? "-100%" : 0, opacity: full ? 1 : 0 }}
          transition={{ duration: full ? 0.85 : 0.4, ease: EASE }}
        >
          <div className="flex items-center justify-between">
            <p className="label-mono">SpotNodes</p>
            <p className="label-mono">Software Engineering Studio</p>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-h2 font-display leading-[1.05] text-ink"
              >
                We design, build &amp; ship <span className="text-mark">products</span>.
              </motion.p>
            </div>
            <p className="font-mono text-sm tabular-nums text-faint md:text-base">
              {String(progress).padStart(3, "0")}%
            </p>
          </div>

          <div
            className="absolute bottom-0 left-0 h-[2px] bg-accent"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

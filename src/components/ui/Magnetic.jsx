import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Magnetic hover — element is gently pulled toward the cursor.
 * Wraps any children; inert on touch devices.
 */
export function Magnetic({ children, strength = 0.28, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.35)" });

    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      xTo((e.clientX - (left + width / 2)) * strength);
      yTo((e.clientY - (top + height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

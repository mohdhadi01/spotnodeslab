import { useLenis } from "lenis/react";

/**
 * Smooth-scrolls to an in-page anchor through Lenis (with header offset),
 * falling back to native scrolling when Lenis isn't mounted.
 */
export function useScrollTo() {
  const lenis = useLenis();
  return (href) => {
    if (!href || !href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -64, duration: 1.5 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
}

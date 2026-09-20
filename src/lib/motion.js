// Shared motion presets — one consistent easing language across the site.
export const EASE = [0.16, 1, 0.3, 1]; // expo-out

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.9, ease: EASE },
};

export const staggerParent = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
};

export const staggerChild = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.8, ease: EASE },
};

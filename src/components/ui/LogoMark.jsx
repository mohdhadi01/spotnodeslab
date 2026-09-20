import React from "react";

/** Abstract SpotNodes mark — nodes finding each other. */
export function LogoMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4.5 4.5 18M12 4.5 19.5 18M4.5 18 12 19.8 19.5 18M12 4.5v15.3"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.1"
      />
      <circle cx="12" cy="4.5" r="2" fill="currentColor" />
      <circle cx="4.5" cy="18" r="2" fill="currentColor" />
      <circle cx="19.5" cy="18" r="2" fill="currentColor" />
      <circle cx="12" cy="19.8" r="1.6" fill="#2E6BFF" />
    </svg>
  );
}

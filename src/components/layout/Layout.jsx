import React from "react";
import { ReactLenis } from "lenis/react";
import { Cursor } from "../ui/Cursor";

export const Layout = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11, // snappier than 0.09: less drift after you stop
        smoothWheel: true,
        syncTouch: false, // native touch scrolling = smooth on mobile
        touchMultiplier: 1.6,
      }}
    >
      <div className="relative flex min-h-screen w-full flex-col bg-bg">
        <Cursor />
        {children}
      </div>
    </ReactLenis>
  );
};

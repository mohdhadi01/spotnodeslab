import React from "react";
import { ReactLenis } from "lenis/react";
import { Cursor } from "../ui/Cursor";

export const Layout = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="relative flex min-h-screen w-full flex-col bg-bg">
        <Cursor />
        {children}
      </div>
    </ReactLenis>
  );
};

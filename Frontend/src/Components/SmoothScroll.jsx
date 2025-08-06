import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0, // 🐢 Increase duration for slower, smoother scroll
      easing: (t) => t * (2 - t), // ✨ smoother than easeOutExpo
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.5, // ✋ bit more responsive on touch
      direction: "vertical",
      gestureOrientation: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;

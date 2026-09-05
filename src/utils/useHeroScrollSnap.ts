import { useEffect, type RefObject } from "react";

/**
 * Scroll to content layer smoothly
 */
export function scrollToContentLayer(): void {
  const el = document.getElementById("content-layer");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Smooth Scroll-Driven Visual Interpolation (Attio / ci.fedu.vn clean aesthetic):
 * - Non-blocking ({ passive: true }), native 60-120fps GPU transitions.
 * - On desktop: As user scrolls, Hero fades out smoothly and hides cleanly when scrolled past.
 * - On mobile (< 768px): Disabled so mobile uses 100% native fluid scroll.
 * - ZERO gesture hijacking (no wheel/touch trapping) to eliminate "đè code lên nhau" sensation.
 */
export function useHeroScrollTransition(
  heroContentRef: RefObject<HTMLDivElement | null>,
  contentLayerRef: RefObject<HTMLDivElement | null>,
  demoCardRef?: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    // Only apply layer visual interpolation on desktop screens
    if (typeof window === "undefined" || window.innerWidth <= 768) {
      if (heroContentRef.current) {
        heroContentRef.current.style.opacity = "1";
        heroContentRef.current.style.transform = "none";
        heroContentRef.current.style.visibility = "visible";
        heroContentRef.current.style.pointerEvents = "auto";
      }
      return;
    }

    let ticking = false;

    const handleVisualScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const contentEl = contentLayerRef.current;
          const targetY = contentEl ? contentEl.offsetTop : Math.min(window.innerHeight * 0.7, 600);
          const range = Math.max(targetY, 320);
          const progress = Math.min(Math.max(scrollY / range, 0), 1);

          // Hero Section: scale down, fade out, hide completely when scrolled past
          if (heroContentRef.current) {
            if (progress >= 0.7 || scrollY > 300) {
              heroContentRef.current.style.opacity = "0";
              heroContentRef.current.style.visibility = "hidden";
              heroContentRef.current.style.pointerEvents = "none";
            } else {
              const opacity = Math.max(0, 1 - progress * 1.5);
              const scale = 1 - progress * 0.06; // 1.0 -> 0.94
              const translateY = -progress * 40; // Parallax up

              heroContentRef.current.style.visibility = "visible";
              heroContentRef.current.style.opacity = `${opacity}`;
              heroContentRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
              heroContentRef.current.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
            }
          }

          // Content Layer: Dynamic shadow intensity
          if (contentLayerRef.current) {
            const shadowIntensity = 0.08 + progress * 0.16;
            contentLayerRef.current.style.boxShadow = `0 -25px 60px -10px rgba(0, 0, 0, ${shadowIntensity}), 0 -2px 12px rgba(0, 0, 0, 0.04)`;
          }

          // Demo Video Card reveal
          if (demoCardRef?.current) {
            const cardProgress = Math.min(Math.max((scrollY - 40) / (range - 40), 0), 1);
            const cardScale = 0.96 + cardProgress * 0.04; // 0.96 -> 1.0
            const cardOpacity = 0.7 + cardProgress * 0.3; // 0.7 -> 1.0

            demoCardRef.current.style.transform = `scale(${cardScale})`;
            demoCardRef.current.style.opacity = `${cardOpacity}`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleVisualScroll, { passive: true });
    handleVisualScroll();

    return () => {
      window.removeEventListener("scroll", handleVisualScroll);
    };
  }, [heroContentRef, contentLayerRef, demoCardRef]);
}

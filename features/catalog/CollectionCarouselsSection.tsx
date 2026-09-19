"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import CollectionCarouselRow from "./CollectionCarouselRow";
import { ENRICHED_SHOWCASE_PRODUCTS } from "./showcaseData";

interface SectionConfig {
  id: string;
  title: string;
  bengaliTitle: string;
  categoryKey: string;
  viewMoreHref: string;
}

const SECTIONS: SectionConfig[] = [
  {
    id: "new-arrival",
    title: "WHAT'S NEW",
    bengaliTitle: "নতুন আগমন",
    categoryKey: "new-arrival",
    viewMoreHref: "/collections?filter=new-arrivals",
  },
  {
    id: "best-seller",
    title: "BEST SELLERS",
    bengaliTitle: "সেরা বিক্রিত সম্ভার",
    categoryKey: "best-seller",
    viewMoreHref: "/collections?filter=best-seller",
  },
  {
    id: "back-in-stock",
    title: "BACK IN STOCK",
    bengaliTitle: "পুনরায় স্টকে এসেছে",
    categoryKey: "back-in-stock",
    viewMoreHref: "/collections?filter=back-in-stock",
  },
  {
    id: "upcoming",
    title: "UPCOMING EDITIONS",
    bengaliTitle: "আসন্ন কালেকশন",
    categoryKey: "upcoming",
    viewMoreHref: "/collections?filter=upcoming",
  },
];

export default function CollectionCarouselsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Continuous smooth progress 0.0 to 1.0 through the 260vh track
  const [smoothProgress, setSmoothProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = true;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolledDistance = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolledDistance / totalScrollableDistance));
    };

    // Continuous 60fps/120fps LERP Loop (Physics coefficient 0.14 for ultra-smooth inertia)
    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.14;
        setSmoothProgress(currentProgress);
      } else if (currentProgress !== targetProgress) {
        currentProgress = targetProgress;
        setSmoothProgress(currentProgress);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    renderLoop();

    return () => {
      isRunning = false;
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Calibrated smootherStep windows for 1-flick physical deck navigation (Matching SS 1 & SS 4)
  const deckStates = useMemo(() => {
    const p = smoothProgress;

    // Quintic smootherstep (6x^5 - 15x^4 + 10x^3) for butter-smooth acceleration & deceleration
    const smootherStep = (min: number, max: number, val: number) => {
      const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
      return x * x * x * (x * (x * 6 - 15) + 10);
    };

    // Transition 0 -> 1 (0.06 to 0.34)
    const t01 = smootherStep(0.06, 0.34, p);
    // Transition 1 -> 2 (0.39 to 0.67)
    const t12 = smootherStep(0.39, 0.67, p);
    // Transition 2 -> 3 (0.72 to 1.00)
    const t23 = smootherStep(0.72, 1.00, p);

    return [
      // Deck 0: Pure solid 100% opacity, stationary at base (zero bleaching/fading to white, matching SS 1 & SS 4)
      {
        translateY: 0,
        opacity: 1,
        zIndex: 10,
        isTop: p < 0.35,
      },
      // Deck 1: Pure solid 100% opacity, physically slides up over Deck 0 (Matching SS 1 & SS 4)
      {
        translateY: (1 - t01) * 100,
        opacity: t01 > 0 ? 1 : 0,
        zIndex: 20,
        isTop: p >= 0.35 && p < 0.68,
      },
      // Deck 2: Pure solid 100% opacity, physically slides up over Deck 1 (Matching SS 1 & SS 4)
      {
        translateY: (1 - t12) * 100,
        opacity: t12 > 0 ? 1 : 0,
        zIndex: 30,
        isTop: p >= 0.68 && p < 0.95,
      },
      // Deck 3: Pure solid 100% opacity, physically slides up over Deck 2 (Matching SS 1 & SS 4)
      {
        translateY: (1 - t23) * 100,
        opacity: t23 > 0 ? 1 : 0,
        zIndex: 40,
        isTop: p >= 0.95,
      },
    ];
  }, [smoothProgress]);

  return (
    <section
      ref={containerRef}
      id="deck-sections"
      data-deck-carousel="true"
      className="relative h-[260vh] bg-white dark:bg-[#0C120E]"
    >
      {/* Pinned Viewport Stage: Locks seamlessly during 260vh scroll */}
      <div className="sticky top-[68px] sm:top-[76px] h-[calc(100vh-68px)] sm:h-[calc(100vh-76px)] max-h-[880px] w-full overflow-hidden bg-white dark:bg-[#0C120E] flex flex-col justify-center">
        
        {/* Subtle Right-Side Step Progress Dots for orientation */}
        <div className="absolute top-4 right-4 sm:right-8 z-50 flex items-center gap-1.5 bg-black/5 dark:bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full pointer-events-none">
          {SECTIONS.map((sec, i) => {
            const activeIdx = smoothProgress < 0.35 ? 0 : smoothProgress < 0.68 ? 1 : smoothProgress < 0.95 ? 2 : 3;
            const isActive = activeIdx === i;
            return (
              <span
                key={sec.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-5 bg-black dark:bg-[#D4AF37]"
                    : "w-1.5 bg-black/30 dark:bg-white/30"
                }`}
                title={sec.title}
              />
            );
          })}
        </div>

        {/* 4 Overlapping Hardware-Accelerated Deck Layers with Opaque Occlusion */}
        {SECTIONS.map((sec, idx) => {
          const products = ENRICHED_SHOWCASE_PRODUCTS[sec.categoryKey] || [];
          const state = deckStates[idx];

          return (
            <div
              key={sec.id}
              id={`deck-${sec.id}`}
              className="absolute inset-0 w-full h-full flex flex-col justify-center bg-white dark:bg-[#0C120E] shadow-[0_-20px_40px_rgba(0,0,0,0.10)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.5)] transition-shadow"
              style={{
                zIndex: state.zIndex,
                transform: `translate3d(0, ${state.translateY}%, 0)`,
                opacity: state.opacity,
                willChange: "transform, opacity",
                pointerEvents: state.isTop ? "auto" : "none",
              }}
            >
              {/* Harmonized Single Outer Container matching FeaturedCategoriesGrid */}
              <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
                <CollectionCarouselRow
                  title={sec.title}
                  bengaliTitle={sec.bengaliTitle}
                  products={products}
                  viewMoreHref={sec.viewMoreHref}
                  isActive={state.isTop}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

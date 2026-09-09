"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useMoreDrawer } from "@/features/navigation";

export default function ScrollToTop() {
  const { isMoreDrawerOpen } = useMoreDrawer();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setIsVisible(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Mathematically perfect circle centered at (25, 25) with radius 21
  const radius = 21;
  const circumference = 2 * Math.PI * radius; // ~131.95
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <aside
      aria-label="Scroll to top of page"
      className={`fixed bottom-20 md:bottom-8 left-5 sm:left-6 z-40 transition-all duration-300 ${
        isVisible && !isMoreDrawerOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        type="button"
        className="group relative w-[52px] h-[52px] rounded-full shadow-luxury hover:shadow-luxury-hover flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none select-none"
        aria-label={`Scroll to top (Page is ${Math.round(scrollProgress)}% scrolled)`}
        title={`Scroll to top (${Math.round(scrollProgress)}%)`}
      >
        {/* All-in-one SVG: Perfectly Concentric Background, Track, and Progress Stroke */}
        <svg
          className="w-[52px] h-[52px] pointer-events-none block overflow-visible"
          viewBox="0 0 50 50"
        >
          {/* Inner Solid Card Disc */}
          <circle
            cx="25"
            cy="25"
            r="24"
            className="fill-brand-linen-dark transition-colors duration-300"
          />

          {/* Neutral Background Border Track */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            className="stroke-brand-sand/70 fill-none"
            strokeWidth="2.5"
          />

          {/* Active Progress Filling Ring (Rotated around 25, 25) */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            className="stroke-brand-gold fill-none transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 25 25)"
          />
        </svg>

        {/* Dead-Center Up Arrow Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ChevronUp className="w-5 h-5 text-brand-charcoal group-hover:text-brand-gold group-hover:-translate-y-0.5 transition-all duration-200 stroke-[2.2]" />
        </div>

        {/* Floating Percentage Tooltip on Hover */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-linen-dark text-brand-charcoal text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border border-brand-sand opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap">
          {Math.round(scrollProgress)}%
        </span>
      </button>
    </aside>
  );
}

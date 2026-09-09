"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-pillows",
    name: "PILLOWS & CUSHIONS",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    href: "/collections",
  },
  {
    id: "cat-curtains",
    name: "BESPOKE CURTAINS",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    href: "/curtains",
  },
  {
    id: "cat-quilts",
    name: "HERITAGE QUILTS",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    href: "/quilts",
  },
  {
    id: "cat-shawls",
    name: "FINE SHAWLS",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    href: "/shawls",
  },
  {
    id: "cat-cases",
    name: "PILLOW CASES",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    href: "/collections?category=linen",
  },
  {
    id: "cat-velvet",
    name: "VELVET EDITIONS",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    href: "/collections?category=velvet",
  },
];

export default function FeaturedCategoriesMarquee() {
  const L = CATEGORIES.length;
  // Triplicate array for smooth circular infinite carousel
  const items = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  const [currentIndex, setCurrentIndex] = useState(L); // start at the middle set (index 6)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive desktop detection
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Re-enable smooth transition after silent teleport
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Seamless infinite wrapping on transition end
  const handleTransitionEnd = () => {
    if (currentIndex >= 2 * L) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - L);
    } else if (currentIndex < L) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + L);
    }
  };

  // Auto-advance every 4 seconds (right-to-left)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext(); // swipe left -> advance next
      } else {
        handlePrev(); // swipe right -> go back
      }
    }
    setIsPaused(false);
  };

  // Calculation for centering:
  // Mobile: 1 card in middle (72vw width), 14vw offset on left -> ~12-14% peek on both sides
  // Desktop: 2 cards in middle (each calc(38% - 12px)), 12% offset on left -> ~12% peek on both sides
  const transformStyle = isDesktop
    ? `translateX(calc(12% - ${currentIndex} * (38% + 12px)))`
    : `translateX(calc(14vw - ${currentIndex} * (72vw + 16px)))`;

  return (
    <section
      className="py-10 sm:py-16 bg-brand-linen border-b border-brand-sand overflow-hidden relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer Carousel Viewport */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left Arrow Button (Matching ScrollToTop button style and colors) */}
        <button
          onClick={handlePrev}
          type="button"
          className="group absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-luxury hover:shadow-luxury-hover flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-brand-linen-dark border-2 border-brand-sand/80 dark:border-brand-sand/40 hover:border-brand-gold select-none"
          aria-label="Previous category"
          title="Previous category"
        >
          <ChevronLeft className="w-5 h-5 text-brand-charcoal group-hover:text-brand-gold stroke-[2.2] transition-colors" />
        </button>

        {/* Right Arrow Button (Matching ScrollToTop button style and colors) */}
        <button
          onClick={handleNext}
          type="button"
          className="group absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-luxury hover:shadow-luxury-hover flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-brand-linen-dark border-2 border-brand-sand/80 dark:border-brand-sand/40 hover:border-brand-gold select-none"
          aria-label="Next category"
          title="Next category"
        >
          <ChevronRight className="w-5 h-5 text-brand-charcoal group-hover:text-brand-gold stroke-[2.2] transition-colors" />
        </button>

        {/* Carousel Sliding Track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: transformStyle,
            transition: isTransitioning
              ? "transform 750ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
            gap: isDesktop ? "24px" : "16px",
          }}
          className="flex items-center will-change-transform py-2"
        >
          {items.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={item.href}
              className={`relative shrink-0 overflow-hidden group/card transition-all duration-300 shadow-luxury hover:shadow-luxury-hover border border-brand-sand/80 hover:border-brand-gold/60 ${
                isDesktop
                  ? "w-[calc(38%-12px)] aspect-[4/3] sm:aspect-[5/4]"
                  : "w-[72vw] aspect-[4/3]"
              }`}
            >
              {/* Category Imagery */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 72vw, 38vw"
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                priority={idx >= L && idx < L + 2}
              />

              {/* Bottom Subtle Gradient for Tag Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover/card:opacity-30 transition-opacity duration-300 pointer-events-none" />

              {/* Floating Bottom Center Tag (Exact Style of Reference Image) */}
              <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#0E1410]/95 backdrop-blur-md px-6 py-2.5 sm:px-8 sm:py-3 shadow-md border border-stone-200/80 dark:border-stone-800 pointer-events-none group-hover/card:border-brand-gold/80 transition-all duration-300">
                <span className="font-jost text-xs sm:text-sm font-semibold tracking-[0.22em] text-stone-900 dark:text-stone-100 group-hover/card:text-brand-gold uppercase transition-colors whitespace-nowrap block text-center">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

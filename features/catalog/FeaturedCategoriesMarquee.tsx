"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/features/navigation";

interface CategoryItem {
  id: string;
  name: string;
  bengaliName: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-bags",
    name: "Bags",
    bengaliName: "ব্যাগস",
    image: "/categories/bags.jpg",
    href: "/collections?category=bags",
  },
  {
    id: "cat-pillows",
    name: "Modern Throw Pillows",
    bengaliName: "মডার্ন থ্রো পিলোস",
    image: "/categories/modern-throw-pillows.jpg",
    href: "/collections",
  },
  {
    id: "cat-quilts",
    name: "Kantha Quilts",
    bengaliName: "কাঁথা কুইল্টস",
    image: "/categories/kantha-quilts.jpg",
    href: "/quilts",
  },
  {
    id: "cat-curtains",
    name: "Bespoke Curtains",
    bengaliName: "কাস্টম পর্দা",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    href: "/curtains",
  },
  {
    id: "cat-shawls",
    name: "Fine Shawls",
    bengaliName: "প্রিমিয়াম শাল",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop",
    href: "/shawls",
  },
  {
    id: "cat-velvet",
    name: "Italian Velvet",
    bengaliName: "ইতালীয় ভেলভেট",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    href: "/collections?category=velvet",
  },
];

export default function FeaturedCategoriesMarquee() {
  const { isBangla } = useLanguage();
  const L = CATEGORIES.length;

  // Triplicate array for smooth circular infinite sliding
  const items = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  const [currentIndex, setCurrentIndex] = useState(L); // Start at middle set (index 6)
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

  // Re-enable transition after silent teleport
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Seamless infinite loop wrapping
  const handleTransitionEnd = () => {
    if (currentIndex >= 2 * L) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - L);
    } else if (currentIndex < L) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + L);
    }
  };

  // Auto-advance every 5 seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
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

  // Exact 3 cards visible on desktop with 24px gap:
  // Each card width = (100% - 48px) / 3
  // Step distance = (100% - 48px) / 3 + 24px
  const transformStyle = isDesktop
    ? `translateX(calc(-1 * ${currentIndex} * ((100% - 48px) / 3 + 24px)))`
    : `translateX(calc(11vw - ${currentIndex} * (78vw + 16px)))`;

  // Active item index (0 to L-1) for pagination dots
  const activeDotIndex = ((currentIndex % L) + L) % L;

  return (
    <section
      className="py-14 sm:py-20 bg-white dark:bg-[#0E1410] border-b border-stone-200/60 dark:border-stone-800/60 transition-colors duration-300 relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Left Arrow Button (Matching Screenshot 2 - Gold Circular Ring) */}
        <button
          onClick={handlePrev}
          type="button"
          className="absolute -left-2 sm:left-1 md:-left-5 top-[38%] -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-brand-gold/90 text-brand-gold bg-white/90 dark:bg-[#0E1410]/90 backdrop-blur-md flex items-center justify-center hover:bg-brand-gold hover:text-[#0E1410] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous category"
          title="Previous category"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2] -ml-0.5" />
        </button>

        {/* Right Arrow Button (Matching Screenshot 2 - Clean Ring) */}
        <button
          onClick={handleNext}
          type="button"
          className="absolute -right-2 sm:right-1 md:-right-5 top-[38%] -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-stone-300 dark:border-white/30 text-stone-700 dark:text-stone-200 bg-white/90 dark:bg-[#0E1410]/90 backdrop-blur-md flex items-center justify-center hover:border-brand-gold hover:bg-brand-gold hover:text-[#0E1410] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next category"
          title="Next category"
        >
          <ChevronRight className="w-5 h-5 stroke-[2] -mr-0.5" />
        </button>

        {/* Carousel Viewport (Frameless Photography Viewport) */}
        <div className="w-full overflow-hidden">
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: transformStyle,
              transition: isTransitioning
                ? "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
              gap: isDesktop ? "24px" : "16px",
            }}
            className="flex items-start will-change-transform py-2"
          >
            {items.map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={item.href}
                className={`group block shrink-0 select-none cursor-pointer border-none bg-transparent shadow-none ${
                  isDesktop
                    ? "w-[calc((100%-48px)/3)]"
                    : "w-[78vw]"
                }`}
              >
                {/* Pure Frameless Clean Photography Viewport (NO border, NO outer box, NO container frame) */}
                <div className="relative aspect-[10/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 border-none shadow-none">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 78vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    priority={idx >= L && idx < L + 3}
                  />
                </div>

                {/* Centered Clean Typography Below Image (matching user reference screenshot) */}
                <div className="pt-4 pb-1 text-center">
                  <h3 className="font-jost text-base sm:text-lg font-medium text-stone-800 dark:text-stone-200 group-hover:text-brand-gold transition-colors duration-300 tracking-wide">
                    {isBangla ? item.bengaliName : item.name}
                  </h3>
                  {/* Subtle expanding gold hairline accent on hover */}
                  <div className="w-0 group-hover:w-8 h-[1px] bg-brand-gold mx-auto mt-2 transition-all duration-300 ease-out" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Minimalist Progress Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat, dIdx) => {
            const isActive = dIdx === activeDotIndex;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(L + dIdx);
                }}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-7 h-1.5 bg-brand-gold rounded-full"
                    : "w-1.5 h-1.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-500 rounded-full"
                }`}
                aria-label={`Go to ${cat.name}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

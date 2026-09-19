"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  ShoppingBag,
  Eye,
  Check,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import { Product } from "./products";
import { SHOWCASE_TABS, ENRICHED_SHOWCASE_PRODUCTS, ShowcaseTab } from "./showcaseData";
import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import { useLanguage } from "@/features/navigation";

export default function CuratedShowcaseSlider() {
  const { isBangla } = useLanguage();
  const { addToCart, setQuickViewProduct } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active Tab State (Default: Best Seller)
  const [activeTabId, setActiveTabId] = useState<ShowcaseTab["id"]>("best-seller");
  const activeTab = useMemo(
    () => SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0],
    [activeTabId]
  );

  // Active Products for Current Tab
  const products = useMemo(() => {
    return ENRICHED_SHOWCASE_PRODUCTS[activeTabId] || [];
  }, [activeTabId]);

  const L = products.length;

  // Triplicate list for smooth circular infinite scroll
  const triplicatedItems = useMemo(() => {
    if (L === 0) return [];
    return [...products, ...products, ...products];
  }, [products, L]);

  // Carousel Index State
  const [currentIndex, setCurrentIndex] = useState(L); // Start at middle set
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track Expanded Interactive "+" Pill for SS 5 (Product ID or null)
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [addedAnimId, setAddedAnimId] = useState<string | null>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detect Desktop Viewport
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Reset Carousel Index when switching Tabs
  const handleTabChange = (newTabId: ShowcaseTab["id"]) => {
    if (newTabId === activeTabId) return;
    setExpandedProductId(null);
    setIsTransitioning(false);
    setActiveTabId(newTabId);
    const newLength = ENRICHED_SHOWCASE_PRODUCTS[newTabId]?.length || 4;
    setCurrentIndex(newLength);
    setTimeout(() => {
      setIsTransitioning(true);
    }, 40);
  };

  // Step Controls
  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Teleport wrap-around after transition ends
  const handleTransitionEnd = () => {
    if (L === 0) return;
    if (currentIndex >= 2 * L) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - L);
    } else if (currentIndex < L) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + L);
    }
  };

  // Re-enable transition after teleport
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-scroll: "aktu pore pore auto right theke left e jabe" (every 4.2 seconds)
  useEffect(() => {
    // If paused, or if user is interacting with the "+" popup pill, freeze auto-scroll
    if (isPaused || expandedProductId !== null || L === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, expandedProductId, L, currentIndex]);

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
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext(); // swipe left -> next
      else handlePrev(); // swipe right -> prev
    }
    setIsPaused(false);
  };

  // Transform calculation:
  // Desktop: 3.2 cards visible (card width = 29.5vw + 24px gap)
  // Mobile: 1.15 cards visible with peek affordance
  const transformStyle = isDesktop
    ? `translateX(calc(-1 * ${currentIndex} * (29.5vw + 24px)))`
    : `translateX(calc(6vw - ${currentIndex} * (82vw + 16px)))`;

  const activeDotIndex = L > 0 ? ((currentIndex % L) + L) % L : 0;

  // Handle Quick Add from the SS 5 Popover Card
  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    setAddedAnimId(product.id);
    setTimeout(() => {
      setAddedAnimId(null);
      setExpandedProductId(null);
    }, 1200);
  };

  return (
    <section
      id="atelier-showcase"
      className="w-full bg-[#FAF7F2] dark:bg-[#0A0E0B] border-y border-stone-200/80 dark:border-stone-800/80 py-16 sm:py-24 transition-colors duration-300 relative select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Header & 5-Tab Deck (Full-Bleed Stage Header - SS 3 & SS 4) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Curatorial Sub-Eyebrow */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/70 dark:border-stone-800/70 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[10.5px] uppercase tracking-[0.25em] font-semibold text-stone-600 dark:text-stone-300">
              {isBangla ? "অ্যাটেলিয়ার কিউরেটেড কালেকশন" : "ATELIER CURATED SHOWCASE"}
            </span>
          </div>

          <Link
            href="/collections"
            className="group text-[11px] uppercase tracking-[0.18em] font-semibold text-stone-700 dark:text-stone-300 hover:text-brand-gold dark:hover:text-brand-gold flex items-center gap-1.5 transition-colors"
          >
            <span>{isBangla ? "সম্পূর্ণ আর্কাইভ দেখুন" : "View Entire Archive"}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 5-Tab Switcher Bar (Matching SS 3 & SS 4 Request) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2">
          {SHOWCASE_TABS.map((tab, idx) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center gap-2.5 cursor-pointer shrink-0 rounded-full border ${
                  isActive
                    ? "bg-[#0E1410] text-[#FAF7F2] border-[#0E1410] dark:bg-brand-gold dark:text-[#0E1410] dark:border-brand-gold shadow-md scale-105"
                    : "bg-white/90 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-brand-gold/60 hover:text-stone-900 dark:hover:text-white shadow-xs"
                }`}
              >
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em]">
                  {isBangla ? tab.bengaliLabel : tab.label}
                </span>

                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/25 dark:bg-black/25 text-white dark:text-black font-bold"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                  }`}
                >
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Description */}
        <p className="text-center text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-4 max-w-xl mx-auto italic font-brandon">
          {isBangla ? activeTab.bengaliTagline : activeTab.tagline}
        </p>
      </div>

      {/* 2. Full-Bleed Carousel Viewport */}
      <div className="relative w-full overflow-hidden">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 dark:bg-[#141C16]/95 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 backdrop-blur-md flex items-center justify-center hover:bg-[#0E1410] hover:text-white dark:hover:bg-brand-gold dark:hover:text-[#0E1410] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5 stroke-[2]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          type="button"
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 dark:bg-[#141C16]/95 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 backdrop-blur-md flex items-center justify-center hover:bg-[#0E1410] hover:text-white dark:hover:bg-brand-gold dark:hover:text-[#0E1410] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5 stroke-[2]" />
        </button>

        {/* Product Cards Track with Butter-Smooth Hardware Acceleration */}
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: transformStyle,
            transition: isTransitioning
              ? "transform 750ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
            willChange: "transform",
          }}
          className="flex items-stretch gap-4 sm:gap-6 pl-4 sm:pl-10"
        >
          {triplicatedItems.map((product, index) => {
            const isPillExpanded = expandedProductId === product.id;

            return (
              <div
                key={`${product.id}-${index}`}
                onMouseEnter={() => setExpandedProductId(product.id)}
                onMouseLeave={() => setExpandedProductId(null)}
                className="w-[82vw] sm:w-[46vw] lg:w-[24vw] xl:w-[23.5vw] shrink-0 group relative aspect-[3/4] sm:aspect-[4/5] bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 hover:border-brand-gold/80 transition-all duration-500 shadow-sm hover:shadow-2xl overflow-hidden cursor-pointer select-none"
              >
                {/* Pure Photography Fill */}
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 48vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Bottom-Left Hotspot & Minimal Popover Bar */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 pointer-events-auto">
                  {!isPillExpanded ? (
                    /* Default State: Sleek Frosted Plus Button at Bottom-Left */
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedProductId(product.id);
                      }}
                      className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-110"
                      title="View Details"
                      aria-label="View details"
                    >
                      <Plus className="w-4 h-4 stroke-[2]" />
                    </button>
                  ) : (
                    /* Expanded State: Horizontal Minimal Luxury Popover with ✕ at Bottom-Left */
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="w-full p-2.5 sm:p-3 bg-white text-stone-900 shadow-[0_12px_40px_rgba(0,0,0,0.28)] border border-stone-200/90 rounded-xs flex items-center justify-between gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 select-none"
                    >
                      {/* Bottom-Left Cross (✕) Button in exact position of the + */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedProductId(null);
                        }}
                        className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center shrink-0 rotate-45 transition-transform duration-300 shadow-sm cursor-pointer"
                        title="Close details"
                        aria-label="Close"
                      >
                        <Plus className="w-4 h-4 stroke-[2]" />
                      </button>

                      {/* Product Title (opens new product page on click) & Price */}
                      <div className="flex-1 min-w-0 pr-1">
                        <Link
                          href={`/product/${product.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-brandon text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.05em] text-stone-950 hover:text-brand-gold transition-colors line-clamp-1 block leading-snug"
                          title={`Open ${product.name} in new page`}
                        >
                          {product.name}
                        </Link>
                        <span className="font-sans text-xs sm:text-[12.5px] font-bold text-stone-900 tracking-normal block pt-0.5">
                          Tk {product.price.toLocaleString("en-BD")}
                        </span>
                      </div>

                      {/* Wishlist Heart Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                          isInWishlist(product.id)
                            ? "bg-rose-50 border-rose-200 text-rose-600"
                            : "border-stone-200 hover:border-brand-gold text-stone-600 hover:text-rose-600"
                        }`}
                        title={isInWishlist(product.id) ? "Remove from Wishlist" : "Save to Wishlist"}
                        aria-label="Save to Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isInWishlist(product.id) ? "fill-rose-600 stroke-rose-600 text-rose-600" : ""
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Luxury Progress & Pagination Indicator */}
      <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
        {products.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(L + idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              activeDotIndex === idx
                ? "w-8 bg-[#0E1410] dark:bg-brand-gold"
                : "w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* 4. Centered [ VIEW MORE ] Button (Matching Aarong SS 4) */}
      <div className="text-center mt-8 sm:mt-10">
        <Link
          href="/collections"
          className="inline-flex items-center justify-center px-12 py-3.5 bg-black hover:bg-stone-800 text-white dark:bg-brand-gold dark:text-[#0E1410] font-brandon text-xs uppercase tracking-[0.25em] font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md select-none"
        >
          {isBangla ? "আরও দেখুন" : "VIEW MORE"}
        </Link>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, X, Heart } from "lucide-react";
import { Product } from "./products";
import { useWishlist } from "@/features/wishlist";
import { useLanguage } from "@/features/navigation";

interface CollectionCarouselRowProps {
  title: string;
  bengaliTitle: string;
  products: Product[];
  viewMoreHref: string;
  isActive?: boolean;
}

const CollectionCarouselRow = React.memo(function CollectionCarouselRow({
  title,
  bengaliTitle,
  products,
  viewMoreHref,
  isActive = true,
}: CollectionCarouselRowProps) {
  const { isBangla } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  // Safe guard: minimum 4 products
  const pool = useMemo(() => {
    if (products.length >= 4) return products;
    // Pad if fewer than 4
    return [...products, ...products, ...products, ...products].slice(0, 8);
  }, [products]);

  // Current indices of the 4 visible slots: [slot0, slot1, slot2, slot3]
  const [slotIndices, setSlotIndices] = useState<[number, number, number, number]>([0, 1, 2, 3]);
  // Track which slots are currently fading out/in for smooth crossfade
  const [fadingSlots, setFadingSlots] = useState<boolean[]>([false, false, false, false]);
  
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepRef = useRef(0);

  // Sync paused state when user hovers or interacts with product card
  useEffect(() => {
    isPausedRef.current = isHovered || activeProductId !== null;
  }, [isHovered, activeProductId]);

  // Perform smooth crossfade swap on specified slot indices
  const swapSlots = useCallback((targetSlots: number[], nextProductIndices: number[]) => {
    // 1. Begin fade out on target slots
    setFadingSlots((prev) => {
      const next = [...prev];
      targetSlots.forEach((s) => (next[s] = true));
      return next;
    });

    // 2. Midpoint: swap product data when transparent
    setTimeout(() => {
      setSlotIndices((prev) => {
        const next = [...prev] as [number, number, number, number];
        targetSlots.forEach((slotIdx, i) => {
          next[slotIdx] = nextProductIndices[i] % pool.length;
        });
        return next;
      });

      // 3. Fade back in
      setTimeout(() => {
        setFadingSlots([false, false, false, false]);
      }, 50);
    }, 320);
  }, [pool.length]);

  // 7.5-Second Paced Fair Rotation Engine:
  // Every 7.5 seconds, swaps 2 slots with bench items.
  // In 60 seconds (8 intervals), every single product in the 8-item pool is guaranteed
  // to be prominently featured multiple times!
  useEffect(() => {
    if (!isActive || pool.length <= 4) return;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;

      stepRef.current += 1;
      const step = stepRef.current;

      if (step % 2 === 1) {
        // Swap slots 0 and 1
        const offset = ((Math.floor(step / 2) * 2 + 4) % pool.length);
        const next0 = offset;
        const next1 = (offset + 1) % pool.length;
        swapSlots([0, 1], [next0, next1]);
      } else {
        // Swap slots 2 and 3
        const offset = ((Math.floor(step / 2) * 2 + 4) % pool.length);
        const next2 = offset;
        const next3 = (offset + 1) % pool.length;
        swapSlots([2, 3], [next2, next3]);
      }
    }, 7500);

    return () => clearInterval(timer);
  }, [isActive, pool.length, swapSlots]);

  // Manual navigation controls (Left / Right chevrons)
  const handleManualNav = useCallback((direction: "left" | "right") => {
    // Pause auto-rotation briefly on user click
    isPausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = isHovered || activeProductId !== null;
    }, 5000);

    if (direction === "right") {
      stepRef.current += 1;
      // Cycle slots forward by 2
      const base = (slotIndices[0] + 2) % pool.length;
      swapSlots([0, 1, 2, 3], [
        base,
        (base + 1) % pool.length,
        (base + 2) % pool.length,
        (base + 3) % pool.length,
      ]);
    } else {
      stepRef.current = Math.max(0, stepRef.current - 1);
      // Cycle slots backward by 2
      const base = (slotIndices[0] - 2 + pool.length) % pool.length;
      swapSlots([0, 1, 2, 3], [
        base,
        (base + 1) % pool.length,
        (base + 2) % pool.length,
        (base + 3) % pool.length,
      ]);
    }
  }, [slotIndices, pool.length, swapSlots, isHovered, activeProductId]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-8 sm:py-12 border-b border-stone-200/60 dark:border-stone-800/60 last:border-b-0 select-none"
    >
      {/* 1. Centered Minimal Header Title (Matching SS 1) */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-brandon font-medium text-2xl sm:text-3xl lg:text-[30px] tracking-[0.08em] sm:tracking-[0.10em] text-stone-900 dark:text-stone-100 uppercase">
          {isBangla ? bengaliTitle : title}
        </h2>
      </div>

      {/* 2. Fixed 4-Card Showcase Viewport with Floating Chevrons */}
      <div className="relative group/carousel w-full">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleManualNav("left")}
          className="absolute -left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-white/95 dark:bg-stone-900/95 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-stone-800 dark:text-stone-100 hover:text-[#0E1410] dark:hover:text-[#0E1410] rounded-full shadow-xl border border-stone-200/80 dark:border-stone-700/80 hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
          title="Previous pieces"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleManualNav("right")}
          className="absolute -right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-white/95 dark:bg-stone-900/95 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-stone-800 dark:text-stone-100 hover:text-[#0E1410] dark:hover:text-[#0E1410] rounded-full shadow-xl border border-stone-200/80 dark:border-stone-700/80 hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
          title="Next pieces"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Fixed 4-Card Responsive Grid matching FeaturedCategoriesGrid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 py-2">
          {slotIndices.map((productIdx, slot) => {
            const product = pool[productIdx] || pool[0];
            const isCardOpen = activeProductId === `${product.id}-${slot}`;
            const isSlotFading = fadingSlots[slot];

            return (
              <div
                key={`slot-${slot}`}
                onMouseLeave={() => setActiveProductId(null)}
                className={`relative aspect-[4/5] bg-stone-100 dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer group block ${
                  isSlotFading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
                }`}
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "400ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Pure Photography Fill */}
                <Link href={`/product/${product.id}`} className="absolute inset-0 block">
                  <Image
                    src={product.primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    priority={slot < 4}
                  />

                  {/* Subtle Gradient Veil at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </Link>

                {/* Bottom-Left Interactive Hotspot & Popover Bar (Matching SS 2 & SS 4) */}
                <div className="absolute bottom-4 left-4 z-20">
                  {!isCardOpen ? (
                    /* Default: Circular Diagonal Arrow ↗ Button at Bottom-Left (Matching SS 4) */
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveProductId(`${product.id}-${slot}`);
                      }}
                      className="w-10 h-10 rounded-full bg-[#111111]/85 hover:bg-[#D4AF37] text-white hover:text-[#0E1410] border border-white/20 hover:border-[#D4AF37] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer backdrop-blur-xs hover:shadow-[0_4px_18px_rgba(212,175,55,0.4)]"
                      title="Quick preview"
                      aria-label="Quick preview"
                    >
                      <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                    </button>
                  ) : (
                    /* Expanded: Popover Card positioned so bottom-left ✕ aligns precisely on the ↗ button */
                    <div
                      style={{ bottom: "-14px", left: "-14px" }}
                      className="absolute bg-white dark:bg-[#151E17] text-stone-900 dark:text-stone-100 border border-stone-200/90 dark:border-stone-700/90 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.30)] p-3.5 min-w-[225px] max-w-[260px] animate-in fade-in zoom-in-95 duration-150 select-none text-left cursor-pointer outline-none focus:outline-none z-30"
                    >
                      {/* Row 1: Product Name — HERO (1-line truncation with ellipsis, matching SS 3) */}
                      <Link
                        href={`/product/${product.id}`}
                        className="font-brandon font-bold text-[14px] sm:text-[14.5px] uppercase tracking-[0.05em] leading-tight text-[#111111] dark:text-[#F5F5F0] hover:text-[#D4AF37] transition-colors truncate max-w-[215px] block"
                        title={product.name}
                      >
                        {product.name}
                      </Link>

                      {/* Row 2: Price — UNIFIED LUXURY STANDARD (Matching Tk prefix font weight, size & color) */}
                      <div className="mt-1 flex items-baseline font-sans font-medium text-[13px] sm:text-[13.5px] text-stone-800 dark:text-stone-200 tracking-tight tabular-nums">
                        <span>Tk&nbsp;{product.price.toLocaleString("en-BD")}</span>
                      </div>

                      {/* Row 3: Bottom Actions: Bottom-Left ✕ overlaying original ↗ coordinate & Bottom-Right Wishlist Heart */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/90 flex items-center justify-between">
                        {/* ✕ Close Button: EXACT same coordinate as closed ↗ with Gilded Champagne (#D4AF37) Hover */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveProductId(null);
                          }}
                          className="w-10 h-10 rounded-full bg-stone-100 hover:bg-[#D4AF37] text-stone-700 hover:text-[#0E1410] dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-[#D4AF37] dark:hover:text-[#0E1410] flex items-center justify-center transition-all duration-200 cursor-pointer outline-none hover:shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
                          title="Close details"
                          aria-label="Close"
                        >
                          <X className="w-4.5 h-4.5 stroke-[2.2]" />
                        </button>

                        {/* Wishlist Heart Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="w-10 h-10 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition-colors cursor-pointer hover:scale-105 active:scale-95 outline-none"
                          title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                          aria-label="Wishlist"
                        >
                          <Heart
                            className={`w-4.5 h-4.5 transition-colors ${
                              isInWishlist(product.id)
                                ? "text-rose-500 fill-rose-500"
                                : "text-stone-500 hover:text-[#D4AF37]"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Centered VIEW MORE Solid Black Button with Gilded Champagne (#D4AF37) Hover */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href={viewMoreHref}
          className="inline-block bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#0E1410] dark:bg-stone-900 dark:hover:bg-[#D4AF37] dark:text-stone-100 dark:hover:text-[#0E1410] border border-black hover:border-[#D4AF37] dark:border-stone-800 dark:hover:border-[#D4AF37] font-brandon text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] px-8 sm:px-10 py-3 sm:py-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md hover:shadow-[0_4px_22px_rgba(212,175,55,0.35)] cursor-pointer"
        >
          {isBangla ? "আরও দেখুন" : "VIEW MORE"}
        </Link>
      </div>
    </div>
  );
});

export default CollectionCarouselRow;

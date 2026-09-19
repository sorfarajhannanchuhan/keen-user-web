"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface FeaturedCategory {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  href: string;
}

export const FEATURED_CATEGORIES: FeaturedCategory[] = [
  // Line 1: 4 Categories (Curated Luxury Textile Photography)
  {
    id: "cat-sashiko",
    name: "SASHIKO",
    subtitle: "Japanese Geometric Running-Stitch",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop",
    href: "/collections?category=sashiko",
  },
  {
    id: "cat-patchwork",
    name: "PATCHWORK",
    subtitle: "Hand-Pieced Artisanal Textile Collage",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    href: "/collections?category=patchwork",
  },
  {
    id: "cat-one-line-art",
    name: "ONE LINE ART",
    subtitle: "Continuous Contour Line Embroidery",
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1200&auto=format&fit=crop",
    href: "/collections?category=one-line-art",
  },
  {
    id: "cat-solid-pattern",
    name: "SOLID PATTERN",
    subtitle: "Stone-Washed Pure Flax Linen",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1200&auto=format&fit=crop",
    href: "/collections?category=solid-pattern",
  },
  // Line 2: 3 Categories (Centered on desktop, uniform card widths)
  {
    id: "cat-wall-hanging",
    name: "WALL HANGING",
    subtitle: "Architectural Woven Fiber Tapestry",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    href: "/collections?category=wall-hanging",
  },
  {
    id: "cat-curtain",
    name: "CURTAIN",
    subtitle: "Sheer Linen & Acoustic Velvet Drapery",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    href: "/curtains",
  },
  {
    id: "cat-kantha-quilts",
    name: "KANTHA QUILTS",
    subtitle: "Hand-Stitched Bengal Heirloom Quilts",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200&auto=format&fit=crop",
    href: "/quilts",
  },
];

export default function FeaturedCategoriesGrid() {

  const line1Items = FEATURED_CATEGORIES.slice(0, 4);
  const line2Items = FEATURED_CATEGORIES.slice(4, 7);

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-[#0E1410] border-b border-stone-200/60 dark:border-stone-800/60 transition-colors duration-300 select-none">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean Title Case Featured Categories without eyebrow or divider */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-brandon text-2xl sm:text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-normal sm:font-medium tracking-tight">
            Featured Categories
          </h2>
        </div>

        {/* 1st Line: 4 Categories (Sashiko, Patchwork, One Line Art, Solid Pattern) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {line1Items.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("keen-category-change"));
                }
              }}
              className="group relative block w-full aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-900 border-none shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer select-none"
            >
              {/* Curated Textile Photography - Balanced 4:5 Portrait */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                priority={idx < 2}
              />

              {/* Subtle Gradient Veil for Button Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

              {/* Centered Floating White Pill Button (Matching SS 4) */}
              <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center z-10 pointer-events-none">
                <span className="bg-white text-stone-900 font-brandon text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase px-5 sm:px-7 py-2.5 sm:py-3 shadow-md group-hover:bg-brand-gold group-hover:text-[#0E1410] transition-all duration-300 pointer-events-auto">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 2nd Line: 3 Categories (Wall Hanging, Curtain, Kantha Quilts) */}
        {/* Centered on desktop, matching Row 1 width and gap */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-4 sm:mt-5">
          {line2Items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("keen-category-change"));
                }
              }}
              className="group relative block w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3*1.25rem)/4)] shrink-0 aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-900 border-none shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer select-none"
            >
              {/* Curated Textile Photography - Balanced 4:5 Portrait */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />

              {/* Subtle Gradient Veil for Button Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

              {/* Centered Floating White Pill Button (Matching SS 4) */}
              <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center z-10 pointer-events-none">
                <span className="bg-white text-stone-900 font-brandon text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase px-5 sm:px-7 py-2.5 sm:py-3 shadow-md group-hover:bg-brand-gold group-hover:text-[#0E1410] transition-all duration-300 pointer-events-auto">
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

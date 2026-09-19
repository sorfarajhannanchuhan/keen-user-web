"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "./products";
import ProductCard from "./ProductCard";

interface CategoryTab {
  id: string;
  key: string;
  name: string;
  href: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "sashiko", key: "sashiko", name: "SASHIKO", href: "/collections?category=sashiko" },
  { id: "patchwork", key: "patchwork", name: "PATCHWORK", href: "/collections?category=patchwork" },
  { id: "one-line-art", key: "one-line-art", name: "ONE LINE ART", href: "/collections?category=one-line-art" },
  { id: "solid-pattern", key: "solid-pattern", name: "SOLID PATTERN", href: "/collections?category=solid-pattern" },
  { id: "wall-hanging", key: "wall-hanging", name: "WALL HANGING", href: "/collections?category=wall-hanging" },
  { id: "curtains", key: "curtains", name: "CURTAINS", href: "/curtains" },
  { id: "quilts", key: "quilts", name: "KANTHA QUILTS", href: "/quilts" },
];

export default function CategoryProductShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("sashiko");

  // Filter products by active category pillar
  const displayedProducts = useMemo(() => {
    let matches = PRODUCTS.filter((p) => {
      if (activeCategory === "sashiko") {
        return (
          p.name.toLowerCase().includes("sashiko") ||
          p.name.toLowerCase().includes("geometric") ||
          (p.category === "embroidered" && !p.name.toLowerCase().includes("line"))
        );
      }
      if (activeCategory === "patchwork") {
        return (
          p.category === "patchwork" ||
          p.name.toLowerCase().includes("patchwork") ||
          p.name.toLowerCase().includes("boro")
        );
      }
      if (activeCategory === "one-line-art") {
        return (
          p.name.toLowerCase().includes("line") ||
          p.name.toLowerCase().includes("contour") ||
          p.name.toLowerCase().includes("silhouette")
        );
      }
      if (activeCategory === "solid-pattern") {
        return (
          p.category === "linen" ||
          p.name.toLowerCase().includes("marais") ||
          p.name.toLowerCase().includes("flax") ||
          p.name.toLowerCase().includes("velvet")
        );
      }
      if (activeCategory === "wall-hanging") {
        return (
          p.category === "wall-hanging" ||
          p.name.toLowerCase().includes("tapestry") ||
          p.name.toLowerCase().includes("hanging") ||
          p.id.includes("upcoming-01")
        );
      }
      if (activeCategory === "curtains") {
        return (
          p.category === "curtains" ||
          p.name.toLowerCase().includes("curtain") ||
          p.name.toLowerCase().includes("drape") ||
          p.id.includes("upcoming-01")
        );
      }
      if (activeCategory === "quilts") {
        return (
          p.category === "quilts" ||
          p.name.toLowerCase().includes("quilt") ||
          p.name.toLowerCase().includes("kantha") ||
          p.id.includes("upcoming-02")
        );
      }
      return true;
    });

    // Fallback: If less than 4 items, backfill with curated catalog products
    if (matches.length < 4) {
      const remaining = PRODUCTS.filter((p) => !matches.some((m) => m.id === p.id));
      matches = [...matches, ...remaining];
    }

    return matches.slice(0, 4);
  }, [activeCategory]);

  const activeTab = CATEGORY_TABS.find((t) => t.id === activeCategory) || CATEGORY_TABS[0];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F6] dark:bg-[#0C120E] border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Editorial Kicker & Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[#C5A059] dark:text-[#D4AF37] font-semibold block mb-2">
            CURATED BY CRAFT
          </span>
          <h2 className="font-brandon text-2xl sm:text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-medium tracking-tight uppercase">
            Category Collections
          </h2>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-300 rounded-full whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? "bg-[#111111] dark:bg-[#D4AF37] text-white dark:text-[#0E1410] shadow-sm scale-105"
                    : "bg-white dark:bg-[#151E17] text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:border-brand-gold hover:text-brand-gold"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* 4-Column Product Grid (Clean Minimalist Cards: Name -> Price) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer CTA: Explore All Pieces in Category */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href={activeTab.href}
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 border border-stone-300 dark:border-stone-700 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] bg-white dark:bg-[#141B16] text-stone-850 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white text-xs uppercase tracking-[0.2em] font-bold shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <span>
              Explore All {activeTab.name} Pieces
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#C5A059] dark:text-[#D4AF37]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LOOKBOOK_ARRANGEMENTS, RoomType, calculateArrangementPricing } from "@/features/catalog/lookbookData";
import AtelierBreadcrumbs from "@/features/navigation/AtelierBreadcrumbs";

export default function LookbookCatalogPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | RoomType>("all");

  const filterTabs: { key: "all" | RoomType; label: string; count: number }[] = [
    { key: "all", label: "All Spaces", count: LOOKBOOK_ARRANGEMENTS.length },
    { key: "living-room", label: "Living Room", count: LOOKBOOK_ARRANGEMENTS.filter(a => a.roomType === "living-room").length },
    { key: "bedroom", label: "Master Bedroom", count: LOOKBOOK_ARRANGEMENTS.filter(a => a.roomType === "bedroom").length },
    { key: "reading-nook", label: "Reading Nook", count: LOOKBOOK_ARRANGEMENTS.filter(a => a.roomType === "reading-nook").length },
    { key: "sunroom", label: "Verandah & Dining", count: LOOKBOOK_ARRANGEMENTS.filter(a => a.roomType === "sunroom").length },
  ];

  const filteredArrangements = useMemo(() => {
    if (activeFilter === "all") return LOOKBOOK_ARRANGEMENTS;
    return LOOKBOOK_ARRANGEMENTS.filter(a => a.roomType === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0E1410] text-[#111111] dark:text-[#F5F5F0] transition-colors duration-300">
      
      {/* 1. Breadcrumbs */}
      <AtelierBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Curated Lookbook" },
        ]}
        backHref="/"
        backLabel="Back to Home"
      />

      {/* 2. Editorial Header */}
      <header className="py-14 sm:py-20 border-b border-[#EAE6DE] dark:border-[#263124] text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-[10.5px] font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3" />
            <span>EDITORIAL ARCHIVE • VOLUME IV</span>
          </div>

          <h1 className="font-brandon text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] dark:text-white uppercase">
            Curated Living Spaces
          </h1>

          <p className="font-sans text-xs sm:text-[13px] text-[#666666] dark:text-[#A0A89F] max-w-xl mx-auto font-normal leading-relaxed">
            Inspiration from our design studio on layering artisanal textiles, textures, and proportions for an effortlessly elevated home sanctuary.
          </p>
        </div>

        {/* Space Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 sm:px-5 py-2 text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#111111] text-white dark:bg-[#D4AF37] dark:text-[#0E1410] shadow-sm"
                    : "bg-white dark:bg-[#161F17] text-[#555555] dark:text-[#9BA59A] border border-[#E5E0D8] dark:border-[#2C362B] hover:border-[#111111] dark:hover:border-[#D4AF37]"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-60 font-sans font-normal">({tab.count})</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 3. Lookbook Grid */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredArrangements.map((arrangement) => {
            const { products, bundlePrice } = calculateArrangementPricing(arrangement);

            return (
              <article
                key={arrangement.id}
                className="group bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Lifestyle Photography Card */}
                  <Link
                    href={`/lookbook/${arrangement.slug}`}
                    className="relative aspect-[4/5] block overflow-hidden bg-[#F5F2EB] dark:bg-[#1C251D]"
                  >
                    <Image
                      src={arrangement.heroImage}
                      alt={arrangement.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />

                    {/* Top Room Type & Pieces Tag */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.2em] bg-[#111111]/85 text-white backdrop-blur-xs">
                        {arrangement.roomTypeLabel}
                      </span>
                      <span className="px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] bg-white/90 dark:bg-[#161F17]/90 text-[#111111] dark:text-[#F5F5F0] backdrop-blur-xs">
                        {products.length} Pieces Styled
                      </span>
                    </div>

                    {/* Palette Chips Overlay at Bottom */}
                    <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 p-1.5 bg-black/40 backdrop-blur-xs rounded-full">
                      {arrangement.paletteColors.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          title={color.name}
                          className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 space-y-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] block">
                      {arrangement.paletteTitle}
                    </span>

                    <h2 className="font-brandon text-xl sm:text-[22px] font-semibold text-[#111111] dark:text-white leading-snug">
                      <Link
                        href={`/lookbook/${arrangement.slug}`}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        {arrangement.title}
                      </Link>
                    </h2>

                    <p className="font-sans text-xs text-[#666666] dark:text-[#9BA59A] leading-relaxed line-clamp-2">
                      {arrangement.stylingTip}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-4 border-t border-[#EAE6DE] dark:border-[#263124] bg-[#FAF9F5]/60 dark:bg-[#111712]/60 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#888888] dark:text-[#8E998B] block">
                      Complete Room Set
                    </span>
                    <span className="font-sans font-bold text-[13.5px] text-[#111111] dark:text-white">
                      From Tk {bundlePrice.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/lookbook/${arrangement.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-bold text-[#111111] dark:text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors"
                  >
                    <span>View Room Set</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

    </div>
  );
}

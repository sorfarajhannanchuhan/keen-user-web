"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/features/navigation";

export default function DualCollectionBanners() {
  const { isBangla } = useLanguage();

  return (
    <section className="py-6 sm:py-8 bg-[#FBF9F5] dark:bg-[#0E1410] transition-colors duration-300 select-none">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          
          {/* Card 1: Combo Deals Option (Matching SS 2) */}
          <Link
            href="/collections?category=combo"
            className="group relative block w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900 border-none shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            {/* High-Resolution Curated Combo Photography */}
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
              alt="Artisanal Living Room Combo Deals"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />

            {/* Subtle Gradient Veil for Button Legibility */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

            {/* Centered White Rectangular Button at Bottom (Matching SS 2 & SS 4) */}
            <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center z-10 pointer-events-none">
              <span className="bg-white text-stone-900 text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase px-6 sm:px-8 py-2.5 sm:py-3 shadow-md group-hover:bg-brand-gold group-hover:text-[#0E1410] transition-all duration-300 pointer-events-auto">
                {isBangla ? "কিউরেটেড রুম কম্বো: ২০% পর্যন্ত ছাড়" : "THE LIVING COMBO CURATION: SAVE UP TO 20%"}
              </span>
            </div>
          </Link>

          {/* Card 2: Archive Sale Option (Matching SS 2) */}
          <Link
            href="/collections?filter=back-in-stock"
            className="group relative block w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900 border-none shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            {/* High-Resolution Artisanal Rolled Textiles & Quilts Photography */}
            <Image
              src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1600&auto=format&fit=crop"
              alt="Heirloom Archive Sale Textiles"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />

            {/* Subtle Gradient Veil for Button Legibility */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

            {/* Centered White Rectangular Button at Bottom (Matching SS 2 & SS 4) */}
            <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center z-10 pointer-events-none">
              <span className="bg-white text-stone-900 text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase px-6 sm:px-8 py-2.5 sm:py-3 shadow-md group-hover:bg-brand-gold group-hover:text-[#0E1410] transition-all duration-300 pointer-events-auto">
                {isBangla ? "আর্কাইভ রিলিজ: ৫০% পর্যন্ত ছাড়" : "THE ARCHIVE RELEASE: UP TO 50% OFF"}
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

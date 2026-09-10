"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
];

export default function FeaturedCategoriesMarquee() {
  const { isBangla } = useLanguage();

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-[#0E1410] border-b border-stone-200/60 dark:border-stone-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {CATEGORIES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block select-none cursor-pointer border-none bg-transparent shadow-none"
            >
              {/* Pure Frameless Clean Photography Viewport (NO border, NO outer box, NO container frame) */}
              <div className="relative aspect-[10/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 border-none shadow-none">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
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
    </section>
  );
}

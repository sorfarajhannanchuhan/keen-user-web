"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Moon, Sun, Sparkles, ArrowUpRight, Eye, ShoppingBag } from "lucide-react";
import { useTheme } from "@/features/navigation";

interface ColorItem {
  name: string;
  bengaliName: string;
  hex: string;
  rgb: string;
  role: string;
  description: string;
  usage: string;
  isDark?: boolean;
}

const BRAND_PALETTE: { category: string; items: ColorItem[] }[] = [
  {
    category: "১. মূল ক্যানভাস ও ব্যাকগ্রাউন্ড (Core Foundations)",
    items: [
      {
        name: "Tuscan Olive Noir",
        bengaliName: "টাস্কান অলিভ নোয়ার (ডার্ক ক্যানভাস)",
        hex: "#0E1410",
        rgb: "rgb(14, 20, 16)",
        role: "Primary Dark Canvas",
        description: "কৃত্রিম প্লাস্টিক কালো নয়, গভীর প্রাচীন জলপাই পাতার অন্ধকার আভা।",
        usage: "ডার্ক মোডের মূল ব্যাকগ্রাউন্ড, হেডার ও ফুটার।",
        isDark: true,
      },
      {
        name: "Atelier Forest Slate",
        bengaliName: "অ্যাটেলিয়ার ফরেস্ট স্লেট (কার্ড সারফেস)",
        hex: "#151E17",
        rgb: "rgb(21, 30, 23)",
        role: "Dark Card Surface",
        description: "ডার্ক ক্যানভাসে প্রোডাক্ট কার্ড ও ড্রয়ারকে ভাসমান আভিজাত্য দেয়।",
        usage: "প্রোডাক্ট কার্ড, কার্ট ড্রয়ার, সার্চ ড্রপডাউন।",
        isDark: true,
      },
      {
        name: "Belgian Linen Oatmeal",
        bengaliName: "বেলজিয়ান লিনেন ওটমিল (লাইট ক্যানভাস)",
        hex: "#F8F6F0",
        rgb: "rgb(248, 246, 240)",
        role: "Primary Light Canvas",
        description: "স্টোন-ওয়াশড বেলজিয়ান লিনেন ও খাঁটি কাঁচা সুতার অর্গানিক প্রশান্তিময় অফ-হোয়াইট।",
        usage: "লাইট মোডের মূল ব্যাকগ্রাউন্ড ও নেগেটিভ স্পেস।",
        isDark: false,
      },
    ],
  },
  {
    category: "২. সিগনেচার লাক্সারি অ্যাকসেন্ট (Luxury Accents)",
    items: [
      {
        name: "Atelier Champagne Gold",
        bengaliName: "শ্যাম্পেন গোল্ড / অ্যান্টিক গোল্ড (হোভার ও অ্যাকশন)",
        hex: "#C5A059",
        rgb: "rgb(197, 160, 89)",
        role: "Signature Action Accent",
        description: "আভিজাত্য ও রাজকীয় স্পর্শ। প্রতিটি বাটনে মাউস কার্সর নিলেই এই রঙে রূপ নেয়।",
        usage: "বাটন হোভার, মনোগ্রাম লোগো, অ্যারো বাটন, গোল্ড অ্যাক্টিভ রিবন।",
        isDark: false,
      },
      {
        name: "Gilded Champagne (Light)",
        bengaliName: "গিল্ডেড শ্যাম্পেন লাইট",
        hex: "#D4AF37",
        rgb: "rgb(212, 175, 55)",
        role: "Secondary Metallic Accent",
        description: "উজ্জ্বল শ্যাম্পেন গোল্ড শেড, যা আইকন ও ডিভাইডারে ঝলমল করে।",
        usage: "আইব্রো ব্যাজ, তারা আইকন, বর্ডার অ্যাকসেন্ট।",
        isDark: false,
      },
      {
        name: "Nakshi Terracotta",
        bengaliName: "নকশিকাঁথা টেরাকোটা (প্রাইস ও ফোকাস)",
        hex: "#993D2C",
        rgb: "rgb(153, 61, 44)",
        role: "Artisanal Commercial Accent",
        description: "বাংলার পোড়ামাটি ও প্রাচীন নকশিকাঁথার সুতার উষ্ণ আবেগঘন ঐতিহ্যবাহী লালচে শেড।",
        usage: "প্রোডাক্টের প্রাইস ট্যাগ (লাইট মোড), স্পেশাল প্রমো ব্যাজ।",
        isDark: true,
      },
      {
        name: "Nakshi Terracotta Glow",
        bengaliName: "টেরাকোটা গ্লো (ডার্ক মোড প্রাইস)",
        hex: "#E07A5F",
        rgb: "rgb(224, 122, 95)",
        role: "Dark Mode Price Accent",
        description: "ডার্ক ব্যাকগ্রাউন্ডের ওপর অসম্ভব হাই-কন্ট্রাস্টে জলজল করা উষ্ণ টেরাকোটা প্রাইস।",
        usage: "ডার্ক মোডে প্রোডাক্টের প্রাইস ও নোটিফিকেশন।",
        isDark: false,
      },
      {
        name: "Antiqued Leaf Olive",
        bengaliName: "অ্যান্টিকড লিফ অলিভ",
        hex: "#3F4D38",
        rgb: "rgb(63, 77, 56)",
        role: "Botanical Heritage Accent",
        description: "প্রাকৃতিক রঞ্জন ও ভেষজ অর্গানিক রঙের সাথে সেতুবন্ধন।",
        usage: "টপ অ্যানাউন্সমেন্ট বার, ক্রাফটম্যানশিপ স্টোরি সেকশন।",
        isDark: true,
      },
    ],
  },
  {
    category: "৩. স্ট্রাকচার ও টাইপোগ্রাফি নিউট্রালস (Structure & Neutrals)",
    items: [
      {
        name: "Raw Flax Sand",
        bengaliName: "র' ফ্ল্যাক্স স্যান্ড (বর্ডার)",
        hex: "#E2DDD5",
        rgb: "rgb(226, 221, 213)",
        role: "Subtle Border Line",
        description: "সুতির মতো সূক্ষ্ম বর্ডার, যা চোখকে ক্লান্ত না করে মার্জিত ফ্রেম দেয়।",
        usage: "কার্ড বর্ডার, ডিভাইডার, সেপারেটর।",
        isDark: false,
      },
      {
        name: "Architectural Deep Charcoal",
        bengaliName: "ডিপ চারকোল (প্রধান টেক্সট)",
        hex: "#162018",
        rgb: "rgb(22, 32, 24)",
        role: "Primary Text Color",
        description: "লাইট মোডে পড়ার সুবিধার জন্য গভীর চারকোল ফরেস্ট টেক্সট।",
        usage: "টাইটেল, হেডলাইন, মেইন বডি টেক্সট।",
        isDark: true,
      },
      {
        name: "Soft Lichen Slate",
        bengaliName: "সফট লাইকেন স্লেট (সাব-টেক্সট)",
        hex: "#556253",
        rgb: "rgb(85, 98, 83)",
        role: "Secondary Text Color",
        description: "সাবটাইটেল ও মেটাডেটা লেখার শান্ত রঙ।",
        usage: "ডাইমেনশন, ফ্যাব্রিক ডিসক্রিপশন, সাব-হেডার।",
        isDark: true,
      },
    ],
  },
];

export default function PalettePage() {
  const { theme, toggleTheme } = useTheme();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] dark:bg-[#0E1410] text-[#162018] dark:text-[#F5F5F0] transition-colors duration-500 py-12 px-4 sm:px-8 lg:px-16">
      
      {/* Top Header Ribbon */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-stone-300 dark:border-stone-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-300 hover:text-[#C5A059] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        {/* Live Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-xs hover:border-[#C5A059] transition-all cursor-pointer text-xs font-semibold uppercase tracking-wider"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-4 h-4 text-[#C5A059]" />
              <span>Switch to Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-stone-700" />
              <span>Switch to Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Page Title & Intro */}
      <div className="max-w-6xl mx-auto pt-12 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C5A059]/15 border border-[#C5A059]/40 rounded-full text-[#993D2C] dark:text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>KEEN CHIT Atelier Visual Identity</span>
        </div>

        <h1 className="font-brandon text-4xl sm:text-5xl lg:text-6xl uppercase tracking-[0.08em] font-medium text-stone-950 dark:text-white">
          Official Brand Color Palette
        </h1>
        <p className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          বেলজিয়ান ফ্ল্যাক্স লিনেন, ইতালিয়ান ভেলভেট এবং বাংলার প্রাচীন নকশিকাঁথার আত্মাকে ধারণ করে তৈরি আমাদের এক্সক্লুসিভ লাইভ কালার সিস্টেম।
        </p>
      </div>

      {/* Color Swatch Grids */}
      <div className="max-w-6xl mx-auto space-y-16">
        {BRAND_PALETTE.map((section, sIdx) => (
          <div key={sIdx} className="space-y-6">
            <h2 className="font-brandon text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-stone-900 dark:text-stone-100 border-l-4 border-[#C5A059] pl-3.5">
              {section.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((color, cIdx) => {
                const isCopied = copiedHex === color.hex;

                return (
                  <div
                    key={cIdx}
                    className="bg-white dark:bg-[#151E17] rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Swatch Preview Block */}
                    <div
                      className="h-36 sm:h-40 w-full relative flex items-end justify-between p-4 transition-transform duration-300"
                      style={{ backgroundColor: color.hex }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      
                      <span className="relative z-10 font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-black/60 text-white backdrop-blur-md">
                        {color.hex}
                      </span>

                      <button
                        onClick={() => copyToClipboard(color.hex)}
                        className="relative z-10 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/90 text-stone-900 hover:bg-[#C5A059] hover:text-[#0E1410] transition-all cursor-pointer shadow-md"
                        title="Copy HEX Code"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Color Metadata Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-brandon font-bold text-lg uppercase tracking-[0.05em] text-stone-950 dark:text-white">
                            {color.name}
                          </h3>
                        </div>
                        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
                          {color.bengaliName}
                        </p>
                      </div>

                      <div className="space-y-2 text-xs font-sans border-t border-stone-100 dark:border-stone-800/80 pt-3">
                        <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                          {color.description}
                        </p>
                        <div className="bg-stone-100 dark:bg-[#0E1410] p-2.5 rounded-lg border border-stone-200/60 dark:border-stone-800">
                          <span className="font-bold text-stone-900 dark:text-stone-200 block text-[11px] uppercase tracking-wider mb-0.5">
                            ব্যবহার ক্ষেত্র:
                          </span>
                          <span className="text-stone-600 dark:text-stone-400">
                            {color.usage}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-stone-400 dark:text-stone-500 border-t border-stone-100 dark:border-stone-800/50">
                        <span>{color.rgb}</span>
                        <span className="uppercase text-[10px] tracking-widest text-[#C5A059] font-bold">
                          {color.role}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Live Interactive Button Showcase */}
        <div className="pt-10 border-t border-stone-300 dark:border-stone-800 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-brandon text-2xl sm:text-3xl font-bold uppercase tracking-[0.08em] text-stone-950 dark:text-white">
              Live Interactive Button & Hover Test
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              নিচের বাটনগুলোতে আপনার মাউস নিয়ে যান (Hover করুন)। লক্ষ্য করুন কিভাবে সাধারণ আর্কিটেকচারাল স্লেট রঙ থেকে মুহূর্তের মধ্যে আমাদের সিগনেচার <strong>Champagne Gold (#C5A059)</strong> রঙে রূপ নেয়!
            </p>
          </div>

          <div className="bg-white dark:bg-[#151E17] p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* Quick View Button */}
            <button
              className="bg-[#141B16] dark:bg-[#18221B] hover:bg-[#C5A059] dark:hover:bg-[#C5A059] text-[#D8C7A8] hover:text-[#0E1410] dark:text-stone-200 dark:hover:text-[#0E1410] text-xs uppercase tracking-[0.2em] font-bold py-3.5 px-6 flex items-center justify-center gap-2.5 border border-stone-800 hover:border-[#C5A059] dark:border-stone-700/80 dark:hover:border-[#C5A059] shadow-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group"
            >
              <Eye className="w-4 h-4 text-[#C5A059] group-hover:text-[#0E1410] transition-colors" />
              <span>QUICK VIEW</span>
            </button>

            {/* Add to Bag Button */}
            <button
              className="bg-[#141B16] dark:bg-[#18221B] hover:bg-[#C5A059] dark:hover:bg-[#C5A059] text-white hover:text-[#0E1410] dark:text-stone-200 dark:hover:text-[#0E1410] h-12 px-7 flex items-center justify-center gap-2.5 shadow-lg border border-white/10 hover:border-[#C5A059] dark:border-stone-700/80 dark:hover:border-[#C5A059] text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-white group-hover:text-[#0E1410] transition-colors stroke-[2.2]" />
              <span>ADD TO BAG</span>
            </button>

            {/* Circular Diagonal Arrow Button */}
            <button
              className="w-12 h-12 rounded-full bg-stone-900/85 hover:bg-[#C5A059] text-white hover:text-[#0E1410] border border-white/20 hover:border-[#C5A059] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
              title="Interactive Arrow"
            >
              <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Footer Back Home CTA */}
        <div className="text-center pt-8 pb-12">
          <Link
            href="/"
            className="inline-block bg-black hover:bg-[#C5A059] text-white hover:text-[#0E1410] font-brandon text-xs font-bold uppercase tracking-[0.25em] px-10 py-4 shadow-xl transition-all duration-300"
          >
            ← RETURN TO STOREFRONT
          </Link>
        </div>

      </div>

    </div>
  );
}

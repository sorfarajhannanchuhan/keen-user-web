"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const isBn = language === "bn";

  return (
    <div className="relative flex items-center bg-stone-200/80 dark:bg-stone-800/90 p-[2.5px] rounded-full border border-stone-300/80 dark:border-stone-700/70 shadow-2xs select-none">
      {/* Smooth Sliding Active Indicator Pill */}
      <div
        className={`absolute top-[2.5px] bottom-[2.5px] w-[27px] rounded-full bg-brand-gold shadow-xs transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none ${
          isBn ? "left-[2.5px]" : "left-[calc(100%-29.5px)]"
        }`}
      />

      <button
        type="button"
        onClick={() => setLanguage("bn")}
        className={`relative z-10 w-[27px] py-0.5 text-[10px] tracking-wider rounded-full text-center transition-colors duration-300 cursor-pointer font-bold ${
          isBn
            ? "text-[#0E1410]"
            : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
        }`}
        title="বাংলা ভাষায় দেখুন"
        aria-label="Switch to Bengali"
      >
        BN
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`relative z-10 w-[27px] py-0.5 text-[10px] tracking-wider rounded-full text-center transition-colors duration-300 cursor-pointer font-bold ${
          !isBn
            ? "text-[#0E1410]"
            : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
        }`}
        title="View in English"
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}

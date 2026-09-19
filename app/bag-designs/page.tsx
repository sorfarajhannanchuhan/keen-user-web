"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, Moon, Sun, Download, ZoomIn, ZoomOut, Eye, Layers } from "lucide-react";

interface BagIconProps {
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

// 1. The Modern Architectural Tote (Toteme / The Row Inspired)
function BagIcon1({ className = "w-5 h-5", strokeWidth = 1.75, style }: BagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <rect x="4" y="8" width="16" height="13" rx="2" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

// 2. The Parisian Flared Shopper (Aarong / Celine / Net-A-Porter Inspired)
function BagIcon2({ className = "w-5 h-5", strokeWidth = 1.75, style }: BagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M5 8h14l-1.5 13H6.5L5 8z" />
      <path d="M9 11a3 3 0 0 0 6 0" />
      <path d="M8.5 8V5.5a3.5 3.5 0 0 1 7 0V8" />
    </svg>
  );
}

// 3. The Atelier Tailored Handbag (With Fine Stitch Line & Fold)
function BagIcon3({ className = "w-5 h-5", strokeWidth = 1.75, style }: BagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M4.5 8.5h15l-1 12.5h-13l-1-12.5z" />
      <path d="M4.8 12.5h14.4" strokeDasharray="1.5 1.5" />
      <path d="M9 8.5V5.5a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

// 4. The Ribbon-Tied Boutique Gift Bag (Diptyque / Atelier Gifting Inspired)
function BagIcon4({ className = "w-5 h-5", strokeWidth = 1.75, style }: BagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <rect x="4.5" y="8" width="15" height="13" rx="1.5" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
      <path d="M12 9.5v2.5" />
    </svg>
  );
}

// 5. The Organic Cutout Linen Tote (Japandi / Cultiver / Artisanal Inspired)
function BagIcon5({ className = "w-5 h-5", strokeWidth = 1.75, style }: BagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5l-1.2 11.5a2 2 0 0 1-2 1.5H6.7a2 2 0 0 1-2-1.5L3.5 8a1.5 1.5 0 0 1 1.5-1.5z" />
      <rect x="9" y="9.5" width="6" height="3" rx="1.5" />
    </svg>
  );
}

const SVG_STRINGS: Record<number, string> = {
  1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="13" rx="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>`,
  2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.5 13H6.5L5 8z"/><path d="M9 11a3 3 0 0 0 6 0"/><path d="M8.5 8V5.5a3.5 3.5 0 0 1 7 0V8"/></svg>`,
  3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 8.5h15l-1 12.5h-13l-1-12.5z"/><path d="M4.8 12.5h14.4" stroke-dasharray="1.5 1.5"/><path d="M9 8.5V5.5a3 3 0 0 1 6 0v3"/></svg>`,
  4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="8" width="15" height="13" rx="1.5"/><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2"/><circle cx="12" cy="8" r="1.5" fill="#111111"/><path d="M12 9.5v2.5"/></svg>`,
  5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5l-1.2 11.5a2 2 0 0 1-2 1.5H6.7a2 2 0 0 1-2-1.5L3.5 8a1.5 1.5 0 0 1 1.5-1.5z"/><rect x="9" y="9.5" width="6" height="3" rx="1.5"/></svg>`
};

export default function BagDesignsPage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<number | null>(2);
  const [zoomLevel, setZoomLevel] = useState<number>(120); // Zoom in px: 32px to 240px
  const [activeTab, setActiveTab] = useState<number>(2);

  React.useEffect(() => {
    const isRootDark = document.documentElement.classList.contains("dark");
    setIsDark(isRootDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const DESIGNS = [
    {
      id: 1,
      name: "Option 1: Modern Architectural Tote",
      nameBn: "অপশন ১: আধুনিক আর্কিটেকচারাল টোট",
      inspiration: "Toteme • The Row • Minimalist Living",
      description:
        "নিচের দিকে মৃদু বাঁকানো কোণা এবং উঁচুতে তোলা সিঙ্গেল আর্চ হ্যান্ডেল। সমসাময়িক, মিনিমালিস্ট ও শান্ত রূপ।",
      Component: BagIcon1,
      bestFor: "Clean minimalist interiors, Scandinavian & Japandi living aesthetics",
    },
    {
      id: 2,
      name: "Option 2: Parisian Flared Shopper",
      nameBn: "অপশন ২: প্যারিসিয়ান ফ্লেয়ার্ড শপার (সেরা পছন্দ)",
      inspiration: "Aarong • Celine • Net-A-Porter",
      description:
        "দুই পাশে ডানা ছড়ানো ট্রাপিজয়েড বডি, ডাবল কার্ভড হ্যান্ডেল ও ভেতরের ড্রেপ লাইন। দেখলেই খাঁটি লাক্সারি ফ্যাশন ও প্রিমিয়াম শপিংয়ের তৃপ্তি মেলে।",
      Component: BagIcon2,
      bestFor: "Artisanal textile fashion, heirloom quilts, and lifestyle luxury",
      isRecommended: true,
    },
    {
      id: 3,
      name: "Option 3: Atelier Tailored Bag with Stitch Line",
      nameBn: "অপশন ৩: অ্যাটেলিয়ার টেইলর্ড ব্যাগ (নকশি সেলাই রেখাসহ)",
      inspiration: "Bespoke Tailoring • Bengal Nakshi • Loro Piana",
      description:
        "ব্যাগের মুখের নিচের দিকে সূক্ষ্ম ড্যাশ সেলাই রেখা (Handcrafted stitch line), যা ঐতিহ্যবাহী সুঁই-সুতার কাজের আভিজাত্য ফুটিয়ে তোলে।",
      Component: BagIcon3,
      bestFor: "Nakshi embroidery focus, handcrafted textiles, and heritage craftsmanship",
    },
    {
      id: 4,
      name: "Option 4: Boutique Gift Bag with Ribbon Seal",
      nameBn: "অপশন ৪: বুটিক গিফট ব্যাগ (রিবন সিল মোহরসহ)",
      inspiration: "Diptyque • Jo Malone • Luxury White-Glove Gifting",
      description:
        "স্ট্রাকচার্ড শপিং ব্যাগ যার মাঝখানে রয়েছে আকর্ষণীয় রিবন ড্রপ ও সিল মোহর। বিশেষ উপহার দেওয়ার প্রিমিয়াম অনুভূতি তৈরি করে।",
      Component: BagIcon4,
      bestFor: "Gift-oriented home decor, luxury stationery, and wedding registries",
    },
    {
      id: 5,
      name: "Option 5: Organic Cutout Linen Tote",
      nameBn: "অপশন ৫: অর্গানিক কাটআউট লিনেন টোট",
      inspiration: "Cultiver • Zara Home Atelier • Pure Organic Living",
      description:
        "বাঁকানো অর্গানিক বেইজ এবং ব্যাগের বডির ভেতরেই খোদাই করা পিল-আকৃতির কাটআউট হাতল। কাঁচা লিনেন ও বোহেমিয়ান জীবনযাত্রার রূপ।",
      Component: BagIcon5,
      bestFor: "Organic Belgian flax, stonewashed linen, and relaxed comfort",
    },
  ];

  const handleDownloadSVG = (id: number, name: string) => {
    const svgData = SVG_STRINGS[id];
    if (!svgData) return;
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `keen-chit-bag-option-${id}-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = (id: number, name: string) => {
    const svgData = SVG_STRINGS[id];
    if (!svgData) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Clear with transparent or subtle off-white background
      ctx.fillStyle = "#FAF8F5";
      ctx.fillRect(0, 0, 1024, 1024);
      // Draw icon centered with 120px padding
      ctx.drawImage(img, 128, 128, 768, 768);
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `keen-chit-bag-option-${id}-1024px.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const activeDesign = DESIGNS.find((d) => d.id === activeTab) || DESIGNS[1];

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-[#0E1410] text-[#F5F5F0]" : "bg-[#FAF8F5] text-[#111111]"}`}>
      {/* Top Header */}
      <header className="border-b border-[#E8E4DC] dark:border-[#1E291C] px-6 py-4 flex items-center justify-between sticky top-0 bg-[#FAF8F5]/90 dark:bg-[#0E1410]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          <span className="text-[#C5A059]">•</span>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
            Ultra-HD Studio & Zoom Inspector
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-medium tracking-wider"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-stone-700" />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#9E7D3B] dark:text-[#E2C37B] text-[11px] font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KEEN CHIT Atelier Iconography</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-brandon font-bold uppercase tracking-[0.06em] text-[#111111] dark:text-[#FFFFFF]">
            Bespoke Luxury Bag Designs
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            এখানে ৫টি ডিজাইনের প্রতিটি স্ট্রোক ও কার্ভ খুব কাছ থেকে দেখার জন্য <strong>ইন্টারেক্টিভ জুম কন্ট্রোল</strong>, <strong>ভেক্টর গ্রিড ইন্সপেক্টর</strong> এবং সরাসরি <strong>Ultra-HD 1024px PNG ও SVG ডাউনলোড</strong> অপশন দেওয়া হয়েছে।
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MASTER ZOOM & INSPECTION STUDIO (MACRO LENS) */}
        {/* ========================================================================= */}
        <section className="bg-white dark:bg-[#141D15] rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-bold">
                <Eye className="w-4 h-4" />
                <span>Macro Studio & Detail Inspector</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-brandon font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-white mt-1">
                {activeDesign.nameBn}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {activeDesign.inspiration}
              </p>
            </div>

            {/* Quick Option Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-xl border border-stone-200 dark:border-stone-800">
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveTab(d.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === d.id
                      ? "bg-[#111111] text-white dark:bg-[#C5A059] dark:text-[#0E1410] shadow-sm"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  Option {d.id}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Zoom Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-50 dark:bg-stone-900/60 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <ZoomOut className="w-4 h-4 text-stone-500" />
              <input
                type="range"
                min="36"
                max="220"
                step="4"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-48 sm:w-64 accent-[#C5A059] cursor-pointer"
              />
              <ZoomIn className="w-4 h-4 text-stone-500" />
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md text-stone-800 dark:text-stone-200">
                {zoomLevel}px ({Math.round((zoomLevel / 24) * 100)}% Zoom)
              </span>
            </div>

            {/* Preset Scale Buttons */}
            <div className="flex items-center gap-1.5">
              {[
                { label: "1X (24px)", val: 24 },
                { label: "2X (48px)", val: 48 },
                { label: "4X (96px)", val: 96 },
                { label: "6X (144px)", val: 144 },
                { label: "8X (192px)", val: 192 },
              ].map((p) => (
                <button
                  key={p.val}
                  onClick={() => setZoomLevel(p.val)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors border ${
                    zoomLevel === p.val
                      ? "border-[#C5A059] bg-[#C5A059]/15 text-[#9E7D3B] dark:text-[#E2C37B]"
                      : "border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-600 dark:text-stone-400"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Direct Instant Download Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownloadPNG(activeTab, activeDesign.name)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>1024px PNG</span>
              </button>
              <button
                onClick={() => handleDownloadSVG(activeTab, activeDesign.name)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Vector SVG</span>
              </button>
            </div>
          </div>

          {/* Central Stage: Vector Grid Canvas with Ultra Close-Up Icon */}
          <div className="relative w-full h-80 sm:h-96 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#F9F8F6] dark:bg-[#0B100C] flex items-center justify-center overflow-hidden">
            {/* Blueprint Grid Pattern */}
            <div
              className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #999 1px, transparent 1px), linear-gradient(to bottom, #999 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* The Active Icon Rendered at Exact Dynamic Zoom Pixel Dimensions */}
            <div className="relative z-10 transition-all duration-150 flex flex-col items-center gap-3">
              <div
                className="text-stone-900 dark:text-[#FAF8F5] transition-all duration-150 flex items-center justify-center filter drop-shadow-sm"
                style={{ width: `${zoomLevel}px`, height: `${zoomLevel}px` }}
              >
                <activeDesign.Component
                  className="w-full h-full"
                  strokeWidth={1.75}
                />
              </div>
              <div className="bg-black/80 dark:bg-white/90 text-white dark:text-black text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                Scale: {zoomLevel} × {zoomLevel} px
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5 BESPOKE OPTIONS GRID (SIDE-BY-SIDE CARDS WITH DOWNLOAD BUTTONS) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-brandon font-bold uppercase tracking-[0.06em] text-stone-900 dark:text-white">
              All 5 Options Comparison Cards
            </h3>
            <span className="text-xs text-stone-500">
              প্রতিটি কার্ডে জুম ভিউ এবং ডাউনলোড বাটন সংযুক্ত রয়েছে
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DESIGNS.map((design) => {
              const isSelected = selectedDesign === design.id;
              const IconComponent = design.Component;

              return (
                <div
                  key={design.id}
                  className={`relative rounded-2xl p-6 sm:p-7 border-2 transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border-[#C5A059] bg-white dark:bg-[#151F16] shadow-xl ring-2 ring-[#C5A059]/20"
                      : "border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-[#111912] hover:border-stone-400 dark:hover:border-stone-700"
                  }`}
                >
                  {/* Top Header info */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {design.isRecommended && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C5A059] text-[#0E1410] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 shadow-sm">
                            ★ Recommended Benchmark
                          </span>
                        )}
                        <h4 className="text-lg sm:text-xl font-brandon font-bold uppercase tracking-[0.05em] text-[#111111] dark:text-[#FFFFFF]">
                          {design.name}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                          {design.inspiration}
                        </p>
                      </div>

                      {/* Select Checkmark Pill */}
                      <button
                        onClick={() => setSelectedDesign(design.id)}
                        className={`p-1.5 rounded-full border transition-all ${
                          isSelected
                            ? "bg-[#C5A059] border-[#C5A059] text-white"
                            : "border-stone-300 dark:border-stone-700 text-transparent hover:border-stone-400"
                        }`}
                        title="Click to select this design"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                    {/* Scale Previews Stage */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-stone-50 dark:bg-[#0B100C] border border-stone-200 dark:border-stone-800/80 items-center justify-items-center text-center">
                      {/* 1. Header Scale */}
                      <div className="space-y-1.5 flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold">
                          Navbar (22px)
                        </span>
                        <div className="relative inline-block text-stone-900 dark:text-[#FAF8F5]">
                          <IconComponent className="w-[22px] h-[22px]" strokeWidth={1.8} />
                          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#C5A059] text-[#0E1410] rounded-full text-[9px] font-bold flex items-center justify-center font-sans">
                            2
                          </span>
                        </div>
                      </div>

                      {/* 2. Large Scale (Macro 56px) */}
                      <div className="space-y-1.5 flex flex-col items-center border-x border-stone-200 dark:border-stone-800 px-4">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold">
                          Zoom (56px)
                        </span>
                        <div className="text-stone-900 dark:text-[#FAF8F5]">
                          <IconComponent className="w-14 h-14" strokeWidth={1.75} />
                        </div>
                      </div>

                      {/* 3. Card Button Scale */}
                      <div className="space-y-1.5 flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold">
                          Card Pill
                        </span>
                        <div className="w-8 h-8 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center shadow-sm">
                          <IconComponent className="w-4 h-4" strokeWidth={1.8} />
                        </div>
                      </div>
                    </div>

                    {/* Descriptions */}
                    <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed">
                      {design.description}
                    </p>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      <strong className="text-stone-800 dark:text-stone-200">Best For:</strong> {design.bestFor}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setActiveTab(design.id);
                        setZoomLevel(160);
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:underline"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Inspect in Studio</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadPNG(design.id, design.name)}
                        className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                        title="Download 1024px PNG"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedDesign(design.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                          isSelected
                            ? "bg-[#C5A059] text-[#0E1410] shadow"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                        }`}
                      >
                        {isSelected ? "Selected Choice ✓" : "Choose This"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

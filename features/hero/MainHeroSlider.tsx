"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/features/navigation";

interface HeroSlide {
  id: string;
  title: string;
  bengaliTitle: string;
  subtitle: string;
  bengaliSubtitle: string;
  ctaText: string;
  bengaliCtaText: string;
  href: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-tactile-poetry",
    title: "Tactile Poetry For Mindful Living",
    bengaliTitle: "শান্ত জীবনের জন্য স্পর্শের নান্দনিকতা",
    subtitle: "Stone-Washed Belgian Linen • Master Needlework",
    bengaliSubtitle: "খাঁটি বেলজিয়ান লিনেন • ঐতিহ্যবাহী হস্তশিল্প নকশিকাঁথা",
    ctaText: "EXPLORE CUSHIONS ARCHIVE",
    bengaliCtaText: "কুশন কালেকশন দেখুন",
    href: "/collections",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "slide-woven-sanctuary",
    title: "Woven Sanctuary: Architecture in Soft Form",
    bengaliTitle: "বোনা প্রশান্তি: স্নিগ্ধ রূপের স্থাপত্য",
    subtitle: "Organic Belgian Flax • Sculptural Earth Tones",
    bengaliSubtitle: "প্রাকৃতিক বেলজিয়ান লিনেন • মাটির উষ্ণ রঙ",
    ctaText: "EXPLORE THE SANCTUARY",
    bengaliCtaText: "স্যাঙ্কচুয়ারি কালেকশন দেখুন",
    href: "/collections",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "slide-heirloom-whispers",
    title: "Heirloom Whispers: Generational Stitches",
    bengaliTitle: "ঐতিহ্যের পদধ্বনি: শতাব্দীর সুঁই-সুতোর কারুকাজ",
    subtitle: "Bengal Hand-Embroidered Nakshi & Pure Khadi",
    bengaliSubtitle: "বাংলার ঐতিহ্যবাহী নকশিকাঁথা ও খাঁটি খাদি",
    ctaText: "DISCOVER HEIRLOOMS",
    bengaliCtaText: "হেরিটেজ দেখুন",
    href: "/quilts",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2400&auto=format&fit=crop",
  },
];

export default function MainHeroSlider() {
  const { isBangla } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  // Auto-slide every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slideCount]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setIsPaused(false);
  };

  return (
    <section
      className="-mt-[92px] md:-mt-[138px] relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[92vh] w-full flex items-center justify-center bg-[#0E1410] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-7000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
            {/* Invisible Contrast: Top gradient scrim protects floating navbar while 90% of photo shines in natural daylight */}
            <div className="absolute top-0 inset-x-0 h-40 sm:h-48 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none z-10" />
            {/* Feather-light ambient scrim: preserves natural sunlight and authentic textile dyes without glare */}
            <div className="absolute inset-0 bg-black/10 sm:bg-black/15 pointer-events-none" />
          </div>
        );
      })}

      {/* Left Navigation Arrow (Refined Frosted Glass Ring) */}
      <button
        onClick={prevSlide}
        type="button"
        className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-black text-white border border-white/40 hover:border-white flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Previous hero slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
      </button>

      {/* Right Navigation Arrow (Refined Frosted Glass Ring) */}
      <button
        onClick={nextSlide}
        type="button"
        className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-black text-white border border-white/40 hover:border-white flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Next hero slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
      </button>

      {/* Center Minimalist Typography & CTA (Aarong / The Citizenry Standard) */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-2xl mx-auto pt-28 sm:pt-32 md:pt-40 pb-12 animate-in fade-in zoom-in-95 duration-700">
        <div key={HERO_SLIDES[currentSlide].id} className="space-y-3 sm:space-y-4">
          
          {/* Main Title (Aarong-Style Minimal Poetry with Optical Glyph Drop-Shadow) */}
          <h1 className="font-jost text-3xl sm:text-5xl lg:text-6xl text-white font-normal sm:font-medium tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            {isBangla
              ? HERO_SLIDES[currentSlide].bengaliTitle
              : HERO_SLIDES[currentSlide].title}
          </h1>

          {/* Minimal 1-Line Subtitle */}
          <p className="font-sans text-xs sm:text-sm text-stone-100 font-light tracking-[0.24em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.80)]">
            {isBangla
              ? HERO_SLIDES[currentSlide].bengaliSubtitle
              : HERO_SLIDES[currentSlide].subtitle}
          </p>

          {/* Crisp High-Contrast Button (Bespoke Tuscan Olive Charcoal & Gold Hover) */}
          <div className="pt-4 sm:pt-5">
            <Link
              href={HERO_SLIDES[currentSlide].href}
              className="inline-block bg-[#161F15] hover:bg-[#1B2418] text-[#F7F5F0] hover:text-[#D4AF37] px-9 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-[12.5px] uppercase tracking-[0.26em] font-bold transition-all duration-300 shadow-[0_12px_32px_rgba(22,31,21,0.6)] hover:scale-105 active:scale-95 cursor-pointer font-jost border border-[#161F15] hover:border-[#C5A059]/70"
            >
              {isBangla
                ? HERO_SLIDES[currentSlide].bengaliCtaText
                : HERO_SLIDES[currentSlide].ctaText}
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Minimal Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 cursor-pointer ${
              idx === currentSlide
                ? "w-8 h-1 bg-white rounded-full"
                : "w-2 h-1 bg-white/40 hover:bg-white/70 rounded-full"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

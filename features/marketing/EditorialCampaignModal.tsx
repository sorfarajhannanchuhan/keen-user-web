"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Sparkles } from "lucide-react";
import { useCart } from "@/features/cart";
import { useLanguage } from "@/features/navigation";
import { ATELIER_CAMPAIGN_DATA } from "./campaign-data";

const COOLDOWN_DAYS = 7;
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "keen_campaign_poster_dismissed";

export default function EditorialCampaignModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { applyCoupon, appliedCoupon } = useCart();
  const { isBangla } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [showPill, setShowPill] = useState(false);

  const isCouponAlreadyApplied = appliedCoupon === ATELIER_CAMPAIGN_DATA.couponCode;

  useEffect(() => {
    // Check if preview mode is forced via URL query (?campaign=preview or ?popup=true)
    const isForcePreview =
      searchParams.get("campaign") === "preview" ||
      searchParams.get("popup") === "true";

    if (isForcePreview) {
      const timer = setTimeout(() => setIsOpen(true), 400);
      return () => clearTimeout(timer);
    }

    // Check if dismissed within the 7-day cooldown window
    let isSuppressed = false;
    try {
      const lastDismissed = localStorage.getItem(STORAGE_KEY);
      if (lastDismissed) {
        const timePassed = Date.now() - parseInt(lastDismissed, 10);
        if (timePassed < COOLDOWN_MS) {
          isSuppressed = true;
        }
      }
    } catch (e) {}

    if (isSuppressed) {
      // Do NOT interrupt the user with the large popup; show the discreet privilege pill instead
      setShowPill(true);
      return;
    }

    // Standard Luxury Pacing: 3.5s breathing delay after landing
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Handle Escape key to dismiss smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (err) {}
    setIsOpen(false);
    setShowPill(true); // Gracefully collapse into the persistent privilege pill
  }, []);

  const handleOpenCampaign = () => {
    // Silently and automatically activate the 10% privilege in user cart
    applyCoupon(ATELIER_CAMPAIGN_DATA.couponCode);

    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (err) {}

    setIsOpen(false);
    setShowPill(false);
    router.push("/campaign");
  };

  const handlePillClick = () => {
    setShowPill(false);
    setIsOpen(true);
  };

  return (
    <>
      {/* 1. Subtle Persistent Floating Privilege Pill (When modal is closed & coupon not yet applied) */}
      {!isOpen && showPill && !isCouponAlreadyApplied && (
        <aside
          aria-label="Atelier Privilege Offer"
          className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-500 select-none"
        >
          <button
            onClick={handlePillClick}
            className="group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#161F15]/95 hover:bg-[#1B2418] text-[#F7F5F0] hover:text-white border border-[#C5A059]/40 hover:border-[#C5A059] rounded-full shadow-[0_10px_30px_rgba(14,20,16,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-jost text-[11px] sm:text-xs tracking-[0.18em] uppercase font-semibold text-brand-gold">
              {isBangla ? "১০% বিশেষ প্রিভিলেজ" : "10% Welcome Courtesy"}
            </span>
          </button>
        </aside>
      )}

      {/* 2. Main Full-Bleed Editorial Campaign Poster Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-300"
        >
          {/* Dimmed Translucent Backdrop in Brand Tuscan Olive Noir */}
          <div
            onClick={handleDismiss}
            className="fixed inset-0 bg-[#0E1410]/80 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label="Close modal backdrop"
          />

          {/* Main Campaign Poster Card */}
          <div className="relative z-10 w-full max-w-[860px] aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9.5] overflow-hidden shadow-[0_30px_90px_rgba(14,20,16,0.9)] border border-[#C5A059]/30 group cursor-pointer select-none">
            {/* Full-Bleed High-Resolution Campaign Photography */}
            <div onClick={handleOpenCampaign} className="absolute inset-0">
              <Image
                src={ATELIER_CAMPAIGN_DATA.heroPosterImage}
                alt="KEEN CHIT Atelier Campaign"
                fill
                priority
                sizes="(max-width: 900px) 96vw, 860px"
                className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />

              {/* Cinematic Vignette Overlay: Preserves natural warmth & textures */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1410]/85 via-black/25 to-[#0E1410]/40 pointer-events-none" />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* Minimal Hairline Top-Right Close Button '✕' in Brand Palette */}
            <button
              onClick={handleDismiss}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#161F15]/70 hover:bg-[#1B2418] text-[#E6DEC8] hover:text-[#D4AF37] border border-[#C5A059]/30 hover:border-[#C5A059]/70 flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
              aria-label="Close campaign poster"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>

            {/* Poster Content: Centered Artistic Typography & Minimal Linen Ecru CTA */}
            <div
              onClick={handleOpenCampaign}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-10 pointer-events-auto"
            >
              {/* Subtle Atelier Eyebrow */}
              <span className="font-jost text-[10px] sm:text-[11.5px] uppercase tracking-[0.32em] text-brand-gold font-semibold mb-2 sm:mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-brand-gold animate-pulse" />
                {isBangla ? ATELIER_CAMPAIGN_DATA.bengaliEyebrow : ATELIER_CAMPAIGN_DATA.eyebrow}
              </span>

              {/* Central High-Impact Artistic Campaign Typography */}
              <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.08] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] mb-2 sm:mb-3">
                {isBangla ? "স্পর্শের কবিতা" : ATELIER_CAMPAIGN_DATA.scriptTitle}
              </h2>

              {/* Minimal 3-Word Tactile Note */}
              <p className="font-sans text-xs sm:text-sm text-stone-200 font-light tracking-[0.16em] uppercase mb-6 sm:mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                {isBangla ? "খাঁটি লিনেন • ঐতিহ্যবাহী সূচিকর্ম" : "Pure Flax • Master Needlework"}
              </p>

              {/* Minimalist Belgian Linen Ecru CTA Button with Brand Palette */}
              <div className="inline-block">
                <button
                  onClick={handleOpenCampaign}
                  className="bg-[#F7F5F0] hover:bg-[#C5A059] text-[#161F15] hover:text-[#0E1410] font-jost text-xs sm:text-sm font-bold tracking-[0.24em] uppercase px-9 sm:px-12 py-3 sm:py-3.5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#C5A059]/40"
                >
                  {isBangla ? "কালেকশন দেখুন" : "SHOP NOW"}
                </button>
              </div>

              {/* Subtle Welcome Courtesy Microcopy */}
              <span className="mt-4 text-[10px] sm:text-[11px] text-[#E6DEC8]/90 font-sans tracking-widest uppercase drop-shadow-md">
                {isBangla ? "অর্ডার করলেই থাকছে ১০% বিশেষ প্রিভিলেজ • কোড KEEN10" : "Includes 10% Welcome Courtesy • Code KEEN10"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

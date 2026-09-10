"use client";

import React, { useState } from "react";
import { Sparkles, Check, Copy, ArrowRight } from "lucide-react";
import { useCart } from "@/features/cart";
import { useLanguage } from "@/features/navigation";
import { ATELIER_CAMPAIGN_DATA } from "./campaign-data";

export default function CampaignPrivilegeBanner() {
  const { appliedCoupon, applyCoupon, setIsCartOpen } = useCart();
  const { isBangla } = useLanguage();
  const [copied, setCopied] = useState(false);

  const isActivated = appliedCoupon === ATELIER_CAMPAIGN_DATA.couponCode;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(ATELIER_CAMPAIGN_DATA.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  const handleEnsureApplied = () => {
    applyCoupon(ATELIER_CAMPAIGN_DATA.couponCode);
    setIsCartOpen(true);
  };

  return (
    <div className="w-full bg-[#111713] text-stone-100 border-y border-brand-gold/30 py-3 px-4 sm:px-6 select-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left: Privilege Status */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="font-jost text-xs sm:text-sm tracking-[0.14em] uppercase font-semibold text-stone-200">
              {isBangla
                ? "১০% আটেলিয়ার ওয়েলকাম প্রিভিলেজ সক্রিয় হয়েছে"
                : "Atelier Welcome Privilege Activated"}
            </span>
          </div>
        </div>

        {/* Right: Code & Bag Actions */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/50 border border-brand-gold/40 text-[11px] font-mono tracking-wider text-brand-gold">
            <span>{ATELIER_CAMPAIGN_DATA.couponCode}</span>
            <button
              onClick={handleCopy}
              className="hover:text-white transition-colors cursor-pointer ml-1"
              title="Copy Privilege Code"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <button
            onClick={handleEnsureApplied}
            className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-gold hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{isBangla ? "ব্যাগ দেখুন" : "View In Bag"}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
}

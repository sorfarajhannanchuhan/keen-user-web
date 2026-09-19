"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  ChevronRight,
  Heart,
  User,
  PhoneCall,
} from "lucide-react";
import { useMoreDrawer } from "./MoreDrawerContext";
import { useWishlist } from "@/features/wishlist";
import { useLanguage } from "./LanguageContext";
import ThemeToggle from "./ThemeToggle";
import SignInModal from "./SignInModal";

export default function MoreDrawer() {
  const { isMoreDrawerOpen, setIsMoreDrawerOpen } = useMoreDrawer();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { language } = useLanguage();
  const isBangla = language === "bn";
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMoreDrawerOpen) {
        setIsMoreDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMoreDrawerOpen, setIsMoreDrawerOpen]);

  return (
    <>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />

      {/* Root Backdrop & Drawer Wrapper */}
      <div
        className={`fixed inset-0 z-[90] transition-[visibility,opacity] ${
          isMoreDrawerOpen
            ? "visible opacity-100 pointer-events-auto duration-400"
            : "invisible opacity-0 pointer-events-none duration-320 delay-320"
        }`}
        aria-modal="true"
        role="dialog"
      >
        {/* Soft, luxury backdrop overlay */}
        <div
          onClick={() => setIsMoreDrawerOpen(false)}
          className={`absolute inset-0 bg-black/40 dark:bg-black/65 backdrop-blur-[3px] transition-opacity cursor-pointer ${
            isMoreDrawerOpen
              ? "opacity-100 duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              : "opacity-0 duration-300 ease-in"
          }`}
          aria-hidden="true"
        />

        {/* Drawer Panel: Butter-Smooth Right-to-Left Slide */}
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[88vw] sm:w-[380px] md:w-[420px] max-w-[460px] bg-white dark:bg-[#0C120E] border-l border-stone-200/90 dark:border-stone-800/90 h-full shadow-[-25px_0_60px_rgba(0,0,0,0.28)] flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform transform-gpu will-change-transform z-[95] ${
            isMoreDrawerOpen
              ? "translate-x-0 duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              : "translate-x-full duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          }`}
          style={{
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Top Section & Content */}
          <div>
            {/* Minimalist Drawer Header */}
            <div className="p-5 sm:p-6 bg-stone-50/90 dark:bg-[#101712]/90 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.7)] animate-pulse" />
                <span className="font-brandon text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 tracking-[0.16em] uppercase">
                  KEEN CHIT
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMoreDrawerOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                aria-label="Close Drawer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5 stroke-[1.75]" />
              </button>
            </div>

            {/* Navigation Body */}
            <div className="p-5 sm:p-7 space-y-7">

              {/* 1. SIGNATURE COLLECTIONS */}
              <div>
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-brand-gold font-bold block pb-2 mb-3 border-b border-stone-200/80 dark:border-stone-800/80">
                  {isBangla ? "আর্টিসানাল কালেকশন" : "COLLECTIONS"}
                </span>

                <div className="flex flex-col space-y-0.5">
                  <Link
                    href="/collections?category=sashiko"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "শাশিকো এমব্রয়ডারি" : "Sashiko Embroidery"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/collections?category=patchwork"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "আর্টিসানাল প্যাচওয়ার্ক" : "Artisanal Patchwork"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/collections?category=one-line-art"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "ওয়ান লাইন আর্ট" : "One Line Silhouette Art"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/collections?category=solid-pattern"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "সলিড বেলজিয়ান লিনেন" : "Solid Belgian Linen"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/collections?category=wall-hanging"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "ওয়াল হ্যাঙ্গিংস" : "Wall Hangings"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/curtains"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "কার্টেনস" : "Bespoke Curtains"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/quilts"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "বেঙ্গল কাঁথা কুইল্টস" : "Bengal Kantha Quilts"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/collections?filter=new-arrivals"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2.5 px-1.5 text-stone-850 dark:text-stone-150 hover:text-brand-gold dark:hover:text-brand-gold transition-colors font-brandon text-[14px] sm:text-[14.5px] font-medium tracking-[0.1em] uppercase flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <span>{isBangla ? "নতুন আগমন" : "New Arrivals"}</span>
                      <span className="text-[8.5px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-brand-gold/20 text-brand-gold border border-brand-gold/30 rounded-xs">
                        NEW
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>

              {/* 2. ATELIER SERVICES & DISCOVERY */}
              <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800/80 space-y-1">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-gold font-bold block pb-2 mb-2">
                  {isBangla ? "বিশেষায়িত সেবা" : "ATELIER SERVICES"}
                </span>

                <div className="flex flex-col space-y-1">
                  <a
                    href="https://wa.me/8801700000000?text=Hello%20Keen%20Chit,%20I%20would%20like%20to%20consult%20on%20bespoke%20curtain%20sizing%20and%20materials."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1 text-stone-650 dark:text-stone-350 hover:text-brand-gold transition-colors font-brandon text-[13.5px] font-medium tracking-[0.08em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "কার্টেন সাইজিং কনসালটেশন" : "Curtain Sizing Consultation"}</span>
                    <span className="text-[8.5px] uppercase tracking-wider font-semibold text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-2 py-0.5 rounded-xs">
                      VIP
                    </span>
                  </a>

                  <Link
                    href="/care-guide"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2 px-1 text-stone-650 dark:text-stone-350 hover:text-brand-gold transition-colors font-brandon text-[13.5px] font-medium tracking-[0.08em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "ফেব্রিক কেয়ার ও সংরক্ষণ" : "Fabric Care Guide"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="py-2 px-1 text-stone-650 dark:text-stone-350 hover:text-brand-gold transition-colors font-brandon text-[13.5px] font-medium tracking-[0.08em] uppercase flex items-center justify-between group"
                  >
                    <span>{isBangla ? "আমাদের কারিগর গল্প" : "Artisan Heritage Story"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>

              {/* 3. CLIENT PORTAL */}
              <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800/80 space-y-1">
                <button
                  onClick={() => {
                    setIsMoreDrawerOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-2 px-1 text-stone-650 dark:text-stone-350 hover:text-brand-gold transition-colors font-brandon text-[13.5px] font-medium tracking-[0.08em] uppercase cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-rose-500/80 group-hover:text-rose-500 transition-colors" />
                    <span>{isBangla ? "সংরক্ষিত উইশলিস্ট" : "Saved Wishlist"}</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full">
                    {wishlistCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMoreDrawerOpen(false);
                    setIsSignInModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-2 px-1 text-stone-650 dark:text-stone-350 hover:text-brand-gold transition-colors font-brandon text-[13.5px] font-medium tracking-[0.08em] uppercase cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-brand-gold/80 group-hover:text-brand-gold transition-colors" />
                    <span>{isBangla ? "ক্লায়েন্ট সাইন ইন" : "Client Account / Sign In"}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-350 dark:text-stone-600 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

            </div>
          </div>

          {/* Bottom Actions: WhatsApp Concierge & Theme Mode */}
          <div className="p-5 sm:p-6 bg-stone-50/90 dark:bg-[#101712]/90 backdrop-blur-sm border-t border-stone-200 dark:border-stone-800 space-y-4">
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#3F4D38] hover:bg-[#323E2D] text-[#F8F6F0] py-3 text-xs uppercase tracking-widest font-bold shadow-sm transition-all group cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
              <span>VIP WhatsApp Concierge</span>
            </a>

            <div className="flex items-center justify-between pt-1 border-t border-stone-200/60 dark:border-stone-800/60 text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium">Theme Mode</span>
              <ThemeToggle showLabel />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

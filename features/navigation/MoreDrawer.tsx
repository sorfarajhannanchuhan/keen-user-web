"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, X, ArrowRight, Heart, User, PhoneCall, ShieldCheck } from "lucide-react";
import { useMoreDrawer } from "./MoreDrawerContext";
import { useWishlist } from "@/features/wishlist";
import ThemeToggle from "./ThemeToggle";
import SignInModal from "./SignInModal";

export default function MoreDrawer() {
  const { isMoreDrawerOpen, setIsMoreDrawerOpen } = useMoreDrawer();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
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

      {/* ====================================================================
          "MORE" ATELIER SIDE DRAWER (Root Level)
          - Silky smooth right-to-left slide transition
          - ZERO dark blur or scaling on the website canvas!
          - Sits cleanly on z-[80] above all content
          ==================================================================== */}
      <div
        className={`fixed inset-0 z-[80] transition-opacity duration-500 ${
          isMoreDrawerOpen
            ? "pointer-events-auto opacity-100 visible"
            : "pointer-events-none opacity-0 invisible delay-500"
        }`}
      >
        {/* Soft, luxury backdrop overlay (website remains stable and fully visible beneath) */}
        <div
          className={`absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-[3.5px] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
            isMoreDrawerOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMoreDrawerOpen(false)}
        />

        {/* Drawer Panel: Glides smoothly from right edge */}
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[88vw] sm:w-[420px] md:w-[440px] lg:w-[32vw] max-w-[500px] bg-white dark:bg-[#0C120E] border-l border-stone-200/90 dark:border-stone-800 h-full shadow-[-30px_0_70px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform z-[85] ${
            isMoreDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div>
            <div className="p-5 sm:p-6 bg-stone-50/80 dark:bg-[#101712] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-brand-gold" />
                <span className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                  Atelier Menu & Collections
                </span>
              </div>
              <button
                onClick={() => setIsMoreDrawerOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-full border border-stone-200 dark:border-stone-700 hover:border-brand-gold hover:rotate-90 transition-all duration-300 cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Collections Navigation - Title-Based */}
            <div className="p-5 sm:p-6 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold block pb-2 mb-1 border-b border-stone-200/80 dark:border-stone-800/80">
                  Signature Archive
                </span>

                <div className="flex flex-col divide-y divide-stone-100 dark:divide-stone-900/80">
                  <Link
                    href="/collections"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-stone-800 dark:text-stone-100 hover:text-brand-gold dark:hover:text-brand-gold hover:pl-3 transition-all group font-serif text-base"
                  >
                    <span>Luxury Cushions</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/curtains"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-stone-800 dark:text-stone-100 hover:text-brand-gold dark:hover:text-brand-gold hover:pl-3 transition-all group font-serif text-base"
                  >
                    <span>Bespoke Curtains</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/quilts"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-stone-800 dark:text-stone-100 hover:text-brand-gold dark:hover:text-brand-gold hover:pl-3 transition-all group font-serif text-base"
                  >
                    <span>Quilts & Katha</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/shawls"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-stone-800 dark:text-stone-100 hover:text-brand-gold dark:hover:text-brand-gold hover:pl-3 transition-all group font-serif text-base"
                  >
                    <span>Shal & Chador</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/care-guide"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-stone-800 dark:text-stone-100 hover:text-brand-gold dark:hover:text-brand-gold hover:pl-3 transition-all group font-serif text-base"
                  >
                    <span>Fabric Care Guide</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-stone-800 dark:text-stone-100 hover:text-brand-gold dark:hover:text-brand-gold hover:pl-3 transition-all group font-serif text-base"
                  >
                    <span>Our Atelier Story</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-brand-gold hover:text-brand-gold hover:pl-3 transition-all group font-serif text-base font-semibold"
                  >
                    <span>Bespoke Inquiries</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              {/* Client Quick Services - Title Based */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold block pb-2 mb-1">
                  Client Services
                </span>

                <button
                  onClick={() => {
                    setIsMoreDrawerOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-3 px-2 text-stone-700 dark:text-stone-200 hover:text-brand-gold transition-colors text-sm font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>My Saved Wishlist ({wishlistCount})</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </button>

                <button
                  onClick={() => {
                    setIsMoreDrawerOpen(false);
                    setIsSignInModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-3 px-2 text-stone-700 dark:text-stone-200 hover:text-brand-gold transition-colors text-sm font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-brand-gold" />
                    <span>Sign In / Client Account</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </button>

                <Link
                  href="/shipping"
                  onClick={() => setIsMoreDrawerOpen(false)}
                  className="flex items-center justify-between py-3 px-2 text-stone-700 dark:text-stone-200 hover:text-brand-gold transition-colors text-sm font-medium"
                >
                  <span>Complimentary Shipping</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>

                <div className="flex items-center justify-between py-3 px-2 text-stone-700 dark:text-stone-200 text-sm font-medium border-t border-stone-100 dark:border-stone-900 pt-3">
                  <span>Display Mode</span>
                  <ThemeToggle showLabel />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-5 sm:p-6 bg-stone-50/80 dark:bg-[#101712] border-t border-stone-200 dark:border-stone-800 space-y-3">
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#3F4D38] hover:bg-[#323E2D] text-[#F8F6F0] border border-[#3F4D38] hover:border-brand-gold py-3 text-xs uppercase tracking-widest font-bold shadow-luxury transition-all group cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
              <span>VIP WhatsApp Concierge</span>
            </a>
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <Link
                href="/admin"
                onClick={() => setIsMoreDrawerOpen(false)}
                className="hover:text-brand-gold transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>Admin Portal</span>
              </Link>
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

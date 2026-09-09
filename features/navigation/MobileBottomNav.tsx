"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, Search, User } from "lucide-react";
import { useCart } from "@/features/cart";
import { useMoreDrawer } from "./MoreDrawerContext";
import SearchModal from "./SearchModal";
import SignInModal from "./SignInModal";

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const { totalItems, setIsCartOpen } = useCart();
  const { isMoreDrawerOpen, setIsMoreDrawerOpen } = useMoreDrawer();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <>
      {/* Search Modal Triggered by Bottom Bar */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />

      {/* ====================================================================
          FIXED MOBILE BOTTOM NAVIGATION BAR (Matching Reference Image)
          - Height ~62px
          - Fixed at bottom: 0
          - Z-Index 40
          - Smoothly slips down out of sight when More Drawer is active
          - Items: HOME, MENU, CART (with badge), SEARCH, ACCOUNT
          ==================================================================== */}
      <nav
        aria-label="Mobile Navigation"
        className={`fixed bottom-0 inset-x-0 z-40 bg-white/98 dark:bg-[#111713]/98 backdrop-blur-xl border-t border-stone-200/90 dark:border-stone-800/90 py-1.5 px-3 flex items-center justify-around md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] select-none transition-all duration-300 ${
          isMoreDrawerOpen ? "opacity-0 pointer-events-none translate-y-8" : "opacity-100 translate-y-0"
        }`}
      >
        {/* 1. HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors ${
            pathname === "/" ? "text-brand-gold font-semibold" : "text-brand-charcoal-muted hover:text-brand-charcoal"
          }`}
        >
          <Home className="w-5 h-5 mb-0.5 stroke-[1.8]" />
          <span className="text-[9px] uppercase tracking-wider font-medium">Home</span>
        </Link>

        {/* 2. MENU */}
        <button
          onClick={() => setIsMoreDrawerOpen(true)}
          type="button"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-brand-charcoal-muted hover:text-brand-charcoal transition-colors cursor-pointer"
        >
          <LayoutGrid className="w-5 h-5 mb-0.5 stroke-[1.8]" />
          <span className="text-[9px] uppercase tracking-wider font-medium">Menu</span>
        </button>

        {/* 3. CART (With Badge) */}
        <button
          onClick={() => setIsCartOpen(true)}
          type="button"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-brand-charcoal-muted hover:text-brand-charcoal transition-colors relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-brand-gold text-[#0E1410] text-[9px] font-bold font-sans w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm border border-white dark:border-[#111713] leading-none">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[9px] uppercase tracking-wider font-medium">Cart</span>
        </button>

        {/* 4. SEARCH */}
        <button
          onClick={() => setIsSearchOpen(true)}
          type="button"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-brand-charcoal-muted hover:text-brand-charcoal transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5 mb-0.5 stroke-[1.8]" />
          <span className="text-[9px] uppercase tracking-wider font-medium">Search</span>
        </button>

        {/* 5. ACCOUNT */}
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors ${
            pathname.startsWith("/admin")
              ? "text-brand-gold font-semibold"
              : "text-brand-charcoal-muted hover:text-brand-charcoal"
          }`}
        >
          <User className="w-5 h-5 mb-0.5 stroke-[1.8]" />
          <span className="text-[9px] uppercase tracking-wider font-medium">Account</span>
        </Link>
      </nav>
    </>
  );
}

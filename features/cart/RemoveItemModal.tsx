"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "./CartContext";

export default function RemoveItemModal() {
  const { deleteModalState, confirmRemoveFromCart, cancelRemoveFromCart } = useCart();
  const { isOpen, item } = deleteModalState;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        cancelRemoveFromCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, cancelRemoveFromCart]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[3px] animate-fadeIn"
      onClick={cancelRemoveFromCart}
    >
      <div
        className="relative w-full max-w-md transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button at Top-Right Corner */}
        <button
          onClick={cancelRemoveFromCart}
          aria-label="Close confirmation"
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#141B15] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-stone-800 dark:text-stone-200 hover:text-[#0E1410] dark:hover:text-[#0E1410] border border-stone-200 dark:border-stone-700 shadow-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>

        <div className="w-full bg-white dark:bg-[#141B15] text-[#111111] dark:text-[#F5F5F0] border border-[#E5E0D8] dark:border-[#2C362B] shadow-2xl p-6 sm:p-7 font-brandon">
          {/* Prompt Text (SS 3 Layout) */}
          <p className="text-[15px] sm:text-[15.5px] text-[#222222] dark:text-[#EAE6DE] font-medium leading-relaxed mt-1 mb-6 font-brandon">
            Are you sure you would like to remove this item from the shopping bag?
          </p>

        {/* Action Buttons (SS 3 Layout) */}
        <div className="flex items-center justify-start gap-3 font-brandon">
          <button
            onClick={cancelRemoveFromCart}
            className="px-7 py-2.5 text-[12px] font-bold tracking-[0.14em] uppercase border border-[#111111] dark:border-[#4B5E45] text-[#111111] dark:text-[#E2E8E0] hover:bg-[#F2EFE9] dark:hover:bg-[#1F2920] transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={confirmRemoveFromCart}
            className="px-8 py-2.5 text-[12px] font-bold tracking-[0.14em] uppercase bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#0E1410] dark:bg-[#EAE6DE] dark:text-[#111111] dark:hover:bg-[#D4AF37] transition-all"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

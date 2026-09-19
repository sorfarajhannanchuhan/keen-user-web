"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useCart } from "./CartContext";
import { getSkuForProduct, getPriceForSize } from "@/features/catalog/products";

export default function AddedToBagModal() {
  const router = useRouter();
  const { addedModalState, setAddedModalState } = useCart();
  const { isOpen, item } = addedModalState;

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setAddedModalState({ isOpen: false, item: null });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setAddedModalState]);

  if (!isOpen || !item) return null;

  const { product, selectedSize, quantity } = item;
  const unitPrice = getPriceForSize(product.price, selectedSize);
  const itemSubtotal = unitPrice * quantity;
  const sku = getSkuForProduct(product, selectedSize);

  const handleClose = () => {
    setAddedModalState({ isOpen: false, item: null });
  };

  const handleGoToBag = () => {
    setAddedModalState({ isOpen: false, item: null });
    router.push("/cart");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-[4px] animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button at Top-Right Corner (Matching SS 2 & SS 3) */}
        <button
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#141B15] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-stone-800 dark:text-stone-200 hover:text-[#0E1410] dark:hover:text-[#0E1410] border border-stone-200 dark:border-stone-700 shadow-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Modal Card */}
        <div className="w-full bg-white dark:bg-[#141B15] text-[#111111] dark:text-[#F5F5F0] border border-[#E5E0D8] dark:border-[#2C362B] shadow-2xl overflow-hidden font-brandon">
          {/* Body Content (Aarong SS 2 & SS 3 Mature Benchmark) */}
          <div className="p-6 sm:p-8">
            <h3 className="font-brandon text-[17px] sm:text-[18px] font-bold text-[#111111] dark:text-white tracking-tight mb-5 sm:mb-6">
              Product successfully added to your bag.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-7 items-start">
              {/* Product Thumbnail (Clean 4:5 Portrait) */}
              <div className="sm:col-span-5 relative aspect-[4/5] bg-[#F7F5F0] dark:bg-[#1A221B] border border-[#EAE6DE] dark:border-[#263124] overflow-hidden">
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-cover"
                />
              </div>

              {/* Product Meta: Unified Brandon Grotesque, Consistent 14.5px Scale */}
              <div className="sm:col-span-7 space-y-2.5 font-brandon text-[14px] sm:text-[14.5px] leading-relaxed">
                <div>
                  <span className="font-bold text-[#111111] dark:text-white">Product Name: </span>
                  <span className="font-normal text-[#222222] dark:text-[#E2E8E0]">{product.name}</span>
                </div>

                <div>
                  <span className="font-bold text-[#111111] dark:text-white">SKU: </span>
                  <span className="font-normal text-[#222222] dark:text-[#E2E8E0]">{sku}</span>
                </div>

                {selectedSize && (
                  <div>
                    <span className="font-bold text-[#111111] dark:text-white">Size: </span>
                    <span className="font-normal text-[#222222] dark:text-[#E2E8E0]">{selectedSize}</span>
                  </div>
                )}

                <div>
                  <span className="font-bold text-[#111111] dark:text-white">Quantity: </span>
                  <span className="font-normal text-[#222222] dark:text-[#E2E8E0]">{quantity}</span>
                </div>

                <div>
                  <span className="font-bold text-[#111111] dark:text-white">Unit Price: </span>
                  <span className="font-normal text-[#222222] dark:text-[#E2E8E0]">
                    Tk {unitPrice.toLocaleString()}.00
                  </span>
                </div>

                <div>
                  <span className="font-bold text-[#111111] dark:text-white">SubTotal: </span>
                  <span className="font-normal text-[#111111] dark:text-white">
                    Tk {itemSubtotal.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Symmetrical, high-contrast Brandon Grotesque buttons */}
          <div className="border-t border-[#EAE6DE] dark:border-[#263124] px-6 sm:px-8 py-5 bg-[#FAF9F5] dark:bg-[#111712] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-brandon">
            <button
              onClick={handleClose}
              className="w-full sm:flex-1 py-3.5 text-[12px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase bg-[#111111] hover:bg-[#252525] text-white transition-all text-center cursor-pointer active:scale-[0.99]"
            >
              CONTINUE SHOPPING
            </button>

            <button
              onClick={handleGoToBag}
              className="w-full sm:flex-1 py-3.5 text-[12px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#0E1410] transition-all text-center cursor-pointer shadow-sm active:scale-[0.99]"
            >
              GO TO BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

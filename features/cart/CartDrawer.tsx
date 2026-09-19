"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    requestRemoveFromCart,
    subtotal,
    totalItems,
  } = useCart();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleViewBagDetails = () => {
    setIsCartOpen(false);
    router.push("/cart");
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Flyout Panel (SS 5 Streamlined Luxury Layout) */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[380px] sm:max-w-[400px] bg-white dark:bg-[#141B15] text-[#111111] dark:text-[#F5F5F0] shadow-2xl border-l border-[#E5E0D8] dark:border-[#263124] flex flex-col justify-between">
          
          {/* Top Header (SS 5 Layout) */}
          <div className="px-6 py-5 border-b border-[#EAE6DE] dark:border-[#263124] flex items-center justify-between">
            <h2 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.14em] text-[#111111] dark:text-[#F5F5F0]">
              SHOPPING BAG {totalItems > 0 && <span className="font-normal text-[#777777] dark:text-[#9BA59A]">({totalItems})</span>}
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#666666] hover:text-[#111111] dark:text-[#9BA59A] dark:hover:text-white transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>

          {/* Bag Items Feed */}
          <div className="flex-1 overflow-y-auto px-6 py-5 divide-y divide-[#EAE6DE] dark:divide-[#263124]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF9F5] dark:bg-[#1C251E] flex items-center justify-center text-[#999999] dark:text-[#7A8578]">
                  <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-medium text-[#222222] dark:text-[#E2E8E0]">
                    Your shopping bag is empty.
                  </p>
                  <p className="text-[12px] text-[#777777] dark:text-[#8E998B]">
                    Discover artisanal heirlooms tailored for your sanctuary.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 text-[11px] font-bold tracking-[0.16em] uppercase bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#0E1410] dark:bg-[#EAE6DE] dark:text-[#111111] dark:hover:bg-[#D4AF37] transition-all"
                >
                  START EXPLORING
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                    className="py-5 flex gap-4 items-start relative group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-20 sm:w-20 sm:h-24 bg-[#F7F5F0] dark:bg-[#1A221B] border border-[#EAE6DE] dark:border-[#263124] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Short Details (SS 5 Benchmark) */}
                    <div className="flex-1 min-w-0 pr-8">
                      <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-[#111111] dark:text-[#FFFFFF] leading-snug line-clamp-2 mb-1">
                        {item.product.name}
                      </h4>

                      {item.selectedSize && (
                        <p className="text-[11.5px] text-[#666666] dark:text-[#9BA59A] mb-1">
                          Size: {item.selectedSize}
                        </p>
                      )}

                      {/* Clean Understated Quantity Text */}
                      <p className="text-[12px] text-[#555555] dark:text-[#A0A89F] mb-1.5 font-medium">
                        Qty: {item.quantity}
                      </p>

                      {/* Unified Price */}
                      <p className="text-[13.5px] font-sans font-medium text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                        Tk {itemTotal.toLocaleString()}
                      </p>
                    </div>

                    {/* Dustbin Icon (SS 5 Benchmark) */}
                    <button
                      onClick={() =>
                        requestRemoveFromCart(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor.name,
                          item.product.name
                        )
                      }
                      className="absolute right-0 bottom-5 p-1.5 text-[#888888] hover:text-[#DC2626] dark:text-[#8E998B] dark:hover:text-[#F87171] transition-colors"
                      aria-label={`Remove ${item.product.name}`}
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.75]" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Subtotal & Actions (SS 5 Layout) */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EAE6DE] dark:border-[#263124] bg-[#FAF9F5] dark:bg-[#111712] space-y-4">
              {/* Subtotal Box */}
              <div className="flex items-center justify-between py-2 text-[14px]">
                <span className="font-bold tracking-[0.06em] text-[#111111] dark:text-[#F5F5F0] uppercase">
                  SUBTOTAL :
                </span>
                <span className="font-sans font-semibold text-[15px] text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                  Tk {subtotal.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons (SS 5 Benchmark with SS 2 Gold) */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleViewBagDetails}
                  className="w-full py-3.5 text-[12px] font-bold tracking-[0.16em] uppercase border border-[#111111] dark:border-[#4B5E45] text-[#111111] dark:text-[#E2E8E0] bg-white dark:bg-transparent hover:bg-[#111111] hover:text-white dark:hover:bg-[#1E281F] transition-all duration-300"
                >
                  VIEW BAG DETAILS
                </button>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 text-[12px] font-bold tracking-[0.16em] uppercase bg-[#D4AF37] hover:bg-[#E5C04E] text-[#0E1410] dark:bg-[#D4AF37] dark:hover:bg-[#E5C04E] dark:text-[#0E1410] transition-all duration-300 shadow-md font-sans active:scale-[0.99]"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

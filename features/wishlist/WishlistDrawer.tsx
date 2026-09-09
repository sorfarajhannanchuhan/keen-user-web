"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "./WishlistContext";
import { useCart } from "@/features/cart";

export default function WishlistDrawer() {
  const { wishlist, wishlistCount, removeFromWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart, setQuickViewProduct } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setIsWishlistOpen(false)} />

      {/* Drawer Container: 85% width on mobile, ~32% on laptop/desktop */}
      <div className="relative w-[85vw] sm:w-[420px] md:w-[440px] lg:w-[32vw] max-w-[520px] bg-brand-linen-dark border-l border-brand-sand h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 z-10">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-brand-linen border-b border-brand-sand flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-brand-gold fill-brand-gold" />
            <h3 className="font-serif text-base sm:text-lg font-medium text-brand-charcoal">
              My Saved Wishlist ({wishlistCount})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-brand-charcoal-muted hover:text-brand-charcoal rounded-full border border-brand-sand hover:border-brand-gold transition-colors cursor-pointer"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-linen flex items-center justify-center border border-brand-sand">
                <Heart className="w-7 h-7 text-brand-gold/60" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base text-brand-charcoal font-normal">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs text-brand-charcoal-muted max-w-xs mx-auto">
                  Save your favorite artisanal linen, velvet, or embroidered cushions to view them anytime.
                </p>
              </div>
              <Link
                href="/collections"
                onClick={() => setIsWishlistOpen(false)}
                className="inline-flex items-center gap-2 bg-brand-gold text-[#0E1410] px-5 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-brand-gold-hover transition-colors shadow-md"
              >
                <span>Explore Permanent Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex gap-3 p-3 bg-brand-linen border border-brand-sand hover:border-brand-gold/60 transition-all shadow-xs"
                >
                  {/* Image */}
                  <div
                    onClick={() => {
                      setQuickViewProduct(item);
                      setIsWishlistOpen(false);
                    }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 bg-brand-linen-dark shrink-0 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={item.primaryImage}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            setQuickViewProduct(item);
                            setIsWishlistOpen(false);
                          }}
                          className="font-brandon-text font-bold uppercase tracking-[0.04em] text-sm text-brand-charcoal hover:text-brand-gold line-clamp-1 cursor-pointer"
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-stone-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-brand-charcoal-muted uppercase tracking-wider block">
                        {item.fabric.split(" ")[0]} • {item.sizes[0]}
                      </span>
                      <span className="font-sans text-sm font-semibold text-brand-gold mt-1 block">
                        ৳{item.price.toLocaleString("en-BD")}
                      </span>
                    </div>

                    {/* Quick Move to Bag */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          addToCart(item, item.sizes[0], item.colors[0], 1);
                          removeFromWishlist(item.id);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] text-[10px] uppercase tracking-wider font-bold py-1.5 px-2 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 sm:p-5 bg-brand-linen border-t border-brand-sand space-y-2">
            <Link
              href="/collections"
              onClick={() => setIsWishlistOpen(false)}
              className="w-full block text-center border border-brand-sand hover:border-brand-gold text-brand-charcoal py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-brand-sand/30 transition-colors"
            >
              Continue Browsing
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

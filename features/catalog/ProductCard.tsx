"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, ShoppingBag, Check, Heart } from "lucide-react";
import { Product } from "./products";
import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import { useFrontendContent } from "@/features/appearance";
import { useLanguage } from "@/features/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setQuickViewProduct } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { content } = useFrontendContent();
  const { t, isBangla } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const isFavorited = isInWishlist(product.id);

  // Bengali badge translation helper
  const getDisplayBadge = (badge?: string) => {
    if (!badge) return null;
    if (!isBangla) return badge;
    if (badge.toLowerCase().includes("best")) return "সেরা বিক্রিত";
    if (badge.toLowerCase().includes("new")) return "নতুন কালেকশন";
    if (badge.toLowerCase().includes("signature")) return "সিগনেচার";
    return badge;
  };

  return (
    <div
      className="group flex flex-col bg-brand-linen-dark border border-brand-sand hover:border-brand-gold/80 transition-all duration-300 hover:shadow-luxury-hover shadow-luxury"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-brand-linen/40 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        {/* Primary Image */}
        <Image
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.primaryImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Badges & Wishlist Action */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className={`backdrop-blur-md text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 shadow-sm ${
              product.badge.includes("Best")
                ? "bg-[#3F4D38] text-brand-gold border border-brand-gold/60 shadow-md"
                : "bg-[#3F4D38]/90 text-[#F8F6F0] border border-white/20"
            }`}>
              {getDisplayBadge(product.badge)}
            </span>
          ) : <div />}
          
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="w-7 h-7 rounded-full bg-brand-linen/95 dark:bg-[#0E1410]/95 backdrop-blur-md border border-brand-sand hover:border-brand-gold flex items-center justify-center text-brand-charcoal hover:text-brand-gold transition-all shadow-sm cursor-pointer hover:scale-110 active:scale-95"
              title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
              aria-label="Wishlist"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isFavorited ? "text-rose-500 fill-rose-500" : "text-brand-charcoal hover:text-brand-gold"
                }`}
              />
            </button>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#3F4D38] dark:text-brand-gold bg-[#3F4D38]/10 dark:bg-[#3F4D38]/40 px-2 py-0.5 border border-[#3F4D38]/25 dark:border-brand-gold/30 backdrop-blur-md">
              {product.fabric.split(" ")[0]}
            </span>
          </div>
        </div>

        {/* Bottom Scrim / Gradient for guaranteed high-contrast readability on any product photo */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0 pointer-events-auto z-10">
          {/* Quick View Button (Left/Center) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="group/qv flex-1 bg-[#121A14]/90 hover:bg-brand-gold text-[#F8F6F0] hover:text-[#0E1410] text-[11px] uppercase tracking-[0.18em] font-semibold py-2.5 px-3 flex items-center justify-center gap-2 backdrop-blur-md border border-white/25 hover:border-brand-gold shadow-lg transition-all duration-200 cursor-pointer"
            title="Open Quick View"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-brand-gold group-hover/qv:text-[#0E1410] transition-colors" />
            <span>{t("quickView")}</span>
          </button>
          
          {/* Add to Bag Button (Right) */}
          <button
            onClick={handleQuickAdd}
            className="bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] p-2.5 shadow-lg border border-brand-gold/60 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            title="Add directly to bag"
            aria-label="Add to bag"
          >
            {addedAnim ? (
              <Check className="w-4 h-4 text-emerald-950 font-bold" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section - Matching User Reference Screenshot */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-2.5 bg-brand-linen-dark">
        <div className="space-y-1">
          {/* Title: Brandon Text Bold Uppercase with balanced micro-bold and 5% letter spacing */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-brandon-text font-bold text-[14px] sm:text-[14.5px] uppercase tracking-[0.05em] text-stone-900 dark:text-stone-100 hover:text-brand-gold cursor-pointer transition-colors leading-[1.3] line-clamp-2 max-w-[220px] sm:max-w-[245px] [-webkit-text-stroke:0.18px_currentColor] dark:[-webkit-text-stroke:0.10px_currentColor]"
          >
            {product.name}
          </h3>

          {/* Subtitle: Fabric / Promo Note (Warm Cognac / Camel) */}
          <div className="font-sans text-[12px] sm:text-[12.5px] text-[#996c49] dark:text-[#E5B586] font-medium tracking-normal pt-0.5">
            {product.originalPrice && product.originalPrice > product.price
              ? (content?.products?.bundlePromoText ||
                (isBangla ? `কম্বো সেটে ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% ছাড়` : `Bundle and Save ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`))
              : (content?.products?.fabricBadgeDefault || (isBangla ? "হাতে বোনা আভিজাত্য" : "Handcrafted Artisan Weave"))}
          </div>

          {/* Pricing Line: From in muted sans, ৳ and price in terracotta bold sans */}
          <div className="flex items-baseline gap-1.5 pt-1 font-sans">
            <span className="text-xs sm:text-[13px] text-stone-500 dark:text-stone-400 font-normal">
              {content?.products?.pricePrefix || t("priceFromPrefix")}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-[13px] text-stone-400 dark:text-stone-500 line-through font-normal">
                ৳{product.originalPrice.toLocaleString("en-BD")}
              </span>
            )}
            <span className="text-base sm:text-lg font-semibold text-[#993D2C] dark:text-[#E07A5F]">
              ৳{product.price.toLocaleString("en-BD")}
            </span>
          </div>
        </div>

        {/* Color Swatches - Exact match with reference screenshot */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-brand-sand/50">
          {product.colors.map((col, idx) => {
            const isSelected = selectedColor.name === col.name;
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(col);
                }}
                className={`w-[19px] h-[19px] flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? "border border-stone-800 dark:border-stone-200 p-[2px]"
                    : "border border-transparent hover:scale-105"
                }`}
                title={col.name}
                aria-label={col.name}
              >
                <span
                  className="w-full h-full block"
                  style={{ backgroundColor: col.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

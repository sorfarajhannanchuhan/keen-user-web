"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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


  return (
    <div
      className="group flex flex-col bg-white dark:bg-[#0E1410] border border-stone-200/90 dark:border-stone-800/90 hover:border-brand-gold transition-all duration-300 hover:shadow-2xl shadow-md relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area with Direct Navigation to /product/[id] */}
      <div
        className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-[#162019] cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        {/* Base Primary Image */}
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Secondary Image for Smooth 1-Time Cross-Fade Hover (Matching SS 4) */}
        {product.secondaryImage && (
          <Image
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
          />
        )}

        {/* Top-Left SS 3 Style Badge (e.g. BEST SELLER) */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] sm:text-[10.5px] font-bold tracking-widest px-2.5 py-1 uppercase shadow-md inline-block">
              {isBangla ? "বেস্ট সেলার" : "BEST SELLER"}
            </span>
          </div>
        )}

        {/* Top Wishlist Action Only (Matching User SS 5 Directive) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black backdrop-blur-md border border-white/20 hover:border-brand-gold flex items-center justify-center text-white transition-all shadow-md cursor-pointer hover:scale-110 active:scale-95"
            title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? "text-rose-500 fill-rose-500" : "text-white hover:text-brand-gold"
              }`}
            />
          </button>
        </div>

        {/* Subtle Dark Gradient at Bottom on Hover */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick Action Overlay on Hover - Black Normal with Gilded Champagne (#D4AF37) Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0 pointer-events-auto z-20">
          {/* Quick View Button (Left) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#0E1410] text-[11px] uppercase tracking-[0.2em] font-bold py-2.5 px-3 flex items-center justify-center gap-2 border border-black/40 hover:border-[#D4AF37] shadow-xl hover:shadow-[0_4px_22px_rgba(212,175,55,0.35)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group/qv"
            title="Quick View"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37] group-hover/qv:text-[#0E1410] transition-colors" />
            <span>{isBangla ? t("quickView") : "QUICK VIEW"}</span>
          </button>

          {/* Add to Bag Button (Right - Square Button) */}
          <button
            onClick={handleQuickAdd}
            className="bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#0E1410] w-10 h-10 flex items-center justify-center shadow-xl border border-white/10 hover:border-[#D4AF37] hover:shadow-[0_4px_22px_rgba(212,175,55,0.35)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:scale-105 active:scale-95 shrink-0 group/add"
            title="Add directly to bag"
            aria-label="Add to bag"
          >
            {addedAnim ? (
              <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-950 font-bold" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-white group-hover/add:text-[#0E1410] transition-colors stroke-[2.2]" />
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section - High Contrast Minimal Luxury */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white dark:bg-[#0E1410] border-t border-stone-100 dark:border-stone-800/80">
        <div>
          {/* Title: Brandon Grotesque Bold Uppercase with Eye-Catching Scale (Matching SS 1) */}
          <Link
            href={`/product/${product.id}`}
            title={product.name}
            className="font-brandon font-bold text-[15.5px] sm:text-[16px] uppercase tracking-[0.08em] text-[#111111] dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] cursor-pointer transition-colors leading-[1.3] line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Subtle Craft Tagline (Restoring SS 1 & SS 3 Visual Balance) */}
          {product.tagline && (
            <p className="text-xs text-[#C87A65] dark:text-[#C5A059] font-medium line-clamp-1 mt-1 tracking-wide">
              {product.tagline}
            </p>
          )}

          {/* Pricing Line: Direct after title & tagline with refined vertical spacing */}
          <div className="flex items-baseline gap-1.5 mt-2 font-sans">
            <span className="text-xs sm:text-[13px] text-stone-500 dark:text-stone-400 font-normal">
              {content?.products?.pricePrefix || (isBangla ? "শুরু" : "From")}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs sm:text-[13px] text-stone-400 dark:text-stone-500 line-through font-normal mr-1">
                ৳{product.originalPrice.toLocaleString("en-BD")}
              </span>
            )}
            <span className="text-base sm:text-lg font-semibold text-[#111111] dark:text-[#F5F5F0]">
              ৳{product.price.toLocaleString("en-BD")}
            </span>
          </div>
        </div>

        {/* Color Swatches - Crisp Squares with Thin Active Ring */}
        <div className="flex items-center gap-2 pt-3 mt-2 border-t border-stone-200/80 dark:border-stone-700/60">
          {product.colors.map((col, idx) => {
            const isSelected = selectedColor.name === col.name;
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(col);
                }}
                className={`w-[18px] h-[18px] flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? "border border-stone-900 dark:border-white p-[2px]"
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


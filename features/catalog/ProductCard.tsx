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

  // Primary Badge (Top-Left)
  const getPrimaryBadge = () => {
    if (product.badge) {
      if (product.badge.toLowerCase().includes("best")) return "🔥 BEST SELLING";
      if (product.badge.toLowerCase().includes("artisan") || product.badge.toLowerCase().includes("master")) return "MASTER ARTISAN";
      return product.badge.toUpperCase();
    }
    if (product.isBestSeller) return "🔥 BEST SELLING";
    return null;
  };

  // Secondary Badge (Top-Right)
  const getSecondaryBadge = () => {
    if (product.id === "kc-cushion-01" || product.name.toLowerCase().includes("marais")) return "100%";
    if (product.id === "kc-cushion-02" || product.name.toLowerCase().includes("nakshi")) return "HANDSPUN";
    if (product.id === "kc-cushion-03" || product.name.toLowerCase().includes("sienna")) return "ULTRA-DENSE";
    if (product.fabric.toLowerCase().includes("waffle")) return "380 GSM";
    if (product.fabric.toLowerCase().includes("silk")) return "RAW SILK";
    if (product.fabric.toLowerCase().includes("patchwork")) return "BESPOKE";
    return product.fabric.split(" ")[0].toUpperCase();
  };

  // Subtitle
  const getSubtitle = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return isBangla ? "কম্বো অফার: ১০% ছাড়" : "Bundle and Save 10%";
    }
    if (product.category === "velvet" || product.name.toLowerCase().includes("velvet")) {
      return isBangla ? "হাতে বোনা আভিজাত্য" : "Handcrafted Artisan Weave";
    }
    return isBangla ? "হাতে বোনা আভিজাত্য" : "Handcrafted Artisan Weave";
  };

  const primaryBadge = getPrimaryBadge();
  const secondaryBadge = getSecondaryBadge();

  return (
    <div
      className="group flex flex-col bg-[#0E1410] border border-stone-800/90 hover:border-brand-gold transition-all duration-300 hover:shadow-2xl shadow-lg relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div
        className="relative aspect-square overflow-hidden bg-[#162019] cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Primary Image */}
        <Image
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Badges & Wishlist Action */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {primaryBadge ? (
            <span className="backdrop-blur-md text-[9.5px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 bg-[#142017]/90 text-brand-gold border border-brand-gold/40 shadow-sm">
              {primaryBadge}
            </span>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Dark Circular Heart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="w-7 h-7 rounded-full bg-black/80 hover:bg-black backdrop-blur-md border border-white/25 hover:border-brand-gold flex items-center justify-center text-white transition-all shadow-md cursor-pointer hover:scale-110 active:scale-95"
              title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
              aria-label="Wishlist"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isFavorited ? "text-rose-500 fill-rose-500" : "text-white hover:text-brand-gold"
                }`}
              />
            </button>

            {/* Secondary Fabric / Quality Pill */}
            {secondaryBadge && (
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#141C16] bg-[#8C7E52] px-2 py-0.5 border border-[#A69768]/50 shadow-sm">
                {secondaryBadge}
              </span>
            )}
          </div>
        </div>

        {/* Subtle Dark Gradient at Bottom on Hover */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick Action Overlay on Hover - Matching User Reference Screenshot */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0 pointer-events-auto z-20">
          {/* Quick View Button (Left) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-[#141B16] hover:bg-black text-[#D8C7A8] hover:text-white text-[11px] uppercase tracking-[0.2em] font-bold py-2.5 px-3 flex items-center justify-center gap-2 border border-stone-800 shadow-xl transition-all duration-200 cursor-pointer"
            title="Quick View"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-brand-gold" />
            <span>{isBangla ? t("quickView") : "QUICK VIEW"}</span>
          </button>

          {/* Add to Bag Button (Right - Square Gold Button) */}
          <button
            onClick={handleQuickAdd}
            className="bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] w-10 h-10 flex items-center justify-center shadow-xl border border-brand-gold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            title="Add directly to bag"
            aria-label="Add to bag"
          >
            {addedAnim ? (
              <Check className="w-4 h-4 text-emerald-950 font-bold" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-[#0E1410] stroke-[2.2]" />
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section - Exact Match with Reference Screenshot */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#0E1410]">
        <div className="space-y-1">
          {/* Title: Jost Bold Uppercase Crisp White */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-jost font-bold text-[14px] sm:text-[14.5px] uppercase tracking-[0.05em] text-white hover:text-brand-gold cursor-pointer transition-colors leading-[1.3] line-clamp-2 max-w-[260px]"
          >
            {product.name}
          </h3>

          {/* Subtitle: Warm Terracotta/Amber Promo Note */}
          <div className="font-sans text-[12px] sm:text-[12.5px] text-[#E07A5F] font-medium tracking-normal pt-0.5">
            {getSubtitle()}
          </div>

          {/* Pricing Line: "From" in muted gray, original in strikethrough, active in bold terracotta */}
          <div className="flex items-baseline gap-1.5 pt-1.5 font-sans">
            <span className="text-xs sm:text-[13px] text-stone-400 font-normal">
              {content?.products?.pricePrefix || (isBangla ? "শুরু" : "From")}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs sm:text-[13px] text-stone-500 line-through font-normal mr-1">
                ৳{product.originalPrice.toLocaleString("en-BD")}
              </span>
            )}
            <span className="text-base sm:text-lg font-bold text-[#FF5C35]">
              ৳{product.price.toLocaleString("en-BD")}
            </span>
          </div>
        </div>

        {/* Color Swatches - Crisp Squares with Thin White Active Ring */}
        <div className="flex items-center gap-2 pt-3 mt-2 border-t border-stone-700/60">
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
                    ? "border border-white p-[2px]"
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


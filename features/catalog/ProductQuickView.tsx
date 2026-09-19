"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, Heart, ArrowRight, Minus, Plus, Clock } from "lucide-react";
import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import { useLanguage } from "@/features/navigation";
import {
  ProductColor,
  getPriceForSize,
  getOriginalPriceForSize,
  STANDARD_SIZES,
} from "./products";

export default function ProductQuickView() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isBangla } = useLanguage();
  const product = quickViewProduct;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const effectiveSizes = product?.sizes && product.sizes.length >= 2 ? product.sizes : STANDARD_SIZES;

  // Sync state when product opens
  useEffect(() => {
    if (product) {
      const sizes = product.sizes && product.sizes.length >= 2 ? product.sizes : STANDARD_SIZES;
      setSelectedImage(product.primaryImage);
      setSelectedSize(sizes.includes('18" × 18"') ? '18" × 18"' : sizes[0]);
      setSelectedColor(product.colors?.[0] || null);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuickViewProduct(null);
      }
    };
    if (product) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [product, setQuickViewProduct]);

  if (!product || !selectedColor) return null;

  const currentPrice = getPriceForSize(product.price, selectedSize);
  const currentOriginalPrice = getOriginalPriceForSize(product.originalPrice, selectedSize);

  const isOutOfStock = !product.inStock || (typeof product.stock === "number" && product.stock <= 0);
  const isLowStock = typeof product.stock === "number" && product.stock > 0 && product.stock <= 3;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(
      {
        ...product,
        price: currentPrice,
        originalPrice: currentOriginalPrice,
      },
      selectedSize,
      selectedColor,
      quantity
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const isDiscounted = Boolean(currentOriginalPrice && currentOriginalPrice > currentPrice);
  const discountPercent = isDiscounted
    ? Math.round((((currentOriginalPrice || 0) - currentPrice) / (currentOriginalPrice || 1)) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative w-full max-w-3xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button at Top-Right Corner (Matching SS 2 & SS 3) */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#141B15] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-stone-800 dark:text-stone-200 hover:text-[#0E1410] dark:hover:text-[#0E1410] border border-stone-200 dark:border-stone-700 shadow-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>

        <div className="w-full bg-white dark:bg-[#121813] border border-[#E2DDD5] dark:border-[#2B3826] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Image with Pinned Wishlist Heart */}
            <div className="relative aspect-square md:aspect-auto md:h-full min-h-[320px] md:min-h-[460px] bg-[#F8F6F0] dark:bg-[#151E17] flex flex-col justify-between p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[#E2DDD5] dark:border-[#2B3826]">
              {/* Main Product Visual */}
              <div className="relative w-full flex-1 aspect-square overflow-hidden bg-stone-100 dark:bg-[#0E1410]">
                {/* Wishlist Heart Button (Cleanly Pinned inside Image Frame) */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-[#E2DDD5] dark:border-stone-700/80 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 group cursor-pointer"
                  title={
                    isInWishlist(product.id)
                      ? isBangla
                        ? "উইশলিস্ট থেকে সরান"
                        : "Remove from wishlist"
                      : isBangla
                      ? "উইশলিস্টে যোগ করুন"
                      : "Add to wishlist"
                  }
                  aria-label="Toggle Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isInWishlist(product.id)
                        ? "text-rose-500 fill-rose-500"
                        : "text-stone-600 dark:text-stone-300 group-hover:text-rose-500"
                    }`}
                  />
                </button>

                <Image
                  src={selectedImage || product.primaryImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover transition-opacity duration-300"
                />
              </div>

            {/* Secondary Image Thumbnails (Only rendered when available) */}
            {product.secondaryImage && (
              <div className="flex items-center gap-2 pt-3">
                <button
                  onClick={() => setSelectedImage(product.primaryImage)}
                  className={`relative w-12 h-12 overflow-hidden border transition-all duration-200 cursor-pointer ${
                    selectedImage === product.primaryImage
                      ? "border-[#D4AF37] ring-1 ring-[#D4AF37]"
                      : "border-[#E2DDD5] dark:border-stone-700 opacity-60 hover:opacity-100"
                  }`}
                  aria-label="Primary image view"
                >
                  <Image src={product.primaryImage} alt="Main view" fill className="object-cover" />
                </button>
                <button
                  onClick={() => setSelectedImage(product.secondaryImage)}
                  className={`relative w-12 h-12 overflow-hidden border transition-all duration-200 cursor-pointer ${
                    selectedImage === product.secondaryImage
                      ? "border-[#D4AF37] ring-1 ring-[#D4AF37]"
                      : "border-[#E2DDD5] dark:border-stone-700 opacity-60 hover:opacity-100"
                  }`}
                  aria-label="Secondary image view"
                >
                  <Image src={product.secondaryImage} alt="Styled view" fill className="object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Essentials & Purchasing Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-[#121813]">
            <div className="space-y-5">
              {/* Category & Low Stock Indicator */}
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-stone-400 dark:text-stone-500">
                <span>{product.category}</span>
                {isLowStock && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAF6EE] dark:bg-[#1E251C] border border-[#E6DEC8] dark:border-[#384632] text-[#B38A38] dark:text-[#D4AF37] text-[10.5px] font-semibold tracking-wide normal-case shadow-xs">
                    <Clock className="w-2.5 h-2.5 stroke-[2]" />
                    <span>{isBangla ? `স্টকে মাত্র ${product.stock} টি আছে` : `${product.stock} in stock`}</span>
                  </span>
                )}
              </div>

              {/* Prominent, Eye-Catching Title matching SS 1 */}
              <div>
                <h3 className="font-brandon font-bold text-2xl sm:text-3xl text-[#111111] dark:text-white uppercase tracking-[0.07em] leading-tight">
                  {product.name}
                </h3>
                {product.tagline && (
                  <p className="text-xs sm:text-[13px] font-medium text-[#C87A65] dark:text-[#C5A059] tracking-wide mt-1">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* Prominent Pricing Row - Architectural Deep Black (#111111 in light, #F5F5F0 in dark) */}
              <div className="flex items-baseline gap-2.5 font-sans pt-0.5">
                <span className="text-2xl sm:text-[26px] font-semibold text-[#111111] dark:text-[#F5F5F0] transition-all">
                  ৳{currentPrice.toLocaleString("en-BD")}
                </span>
                {isDiscounted && (
                  <>
                    <span className="text-sm text-stone-400 dark:text-stone-500 line-through font-normal transition-all">
                      ৳{currentOriginalPrice?.toLocaleString("en-BD")}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059] dark:text-[#D4AF37] bg-[#C5A059]/10 dark:bg-[#D4AF37]/15 px-2 py-0.5 border border-[#C5A059]/30">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Minimal Circular Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="text-stone-500 dark:text-stone-400 font-medium">
                      {isBangla ? "রঙ" : "Color"}:
                    </span>
                    <span className="font-medium text-stone-900 dark:text-stone-200">
                      {selectedColor.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`relative w-7 h-7 rounded-full transition-transform duration-200 flex items-center justify-center cursor-pointer ${
                            isSelected ? "scale-110" : "hover:scale-105 opacity-85 hover:opacity-100"
                          }`}
                          aria-label={`Select color ${color.name}`}
                          title={color.name}
                        >
                          <span
                            className="w-full h-full rounded-full border border-black/15 dark:border-white/20 shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          />
                          {isSelected && (
                            <span className="absolute -inset-1 rounded-full border-2 border-[#D4AF37] pointer-events-none" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dimension Selector (16*16, 18*18, 20*20) */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-stone-500 dark:text-stone-400 font-medium">
                    {isBangla ? "সাইজ নির্বাচন করুন" : "Select Dimension"}:
                  </span>
                  <span className="font-mono text-[10px] text-[#C5A059] dark:text-[#D4AF37] font-semibold">
                    {selectedSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {effectiveSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs tracking-wider transition-all duration-200 font-medium cursor-pointer ${
                          isSelected
                            ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm border border-stone-900 dark:border-stone-100"
                            : "bg-transparent text-stone-700 dark:text-stone-300 border border-[#E2DDD5] dark:border-[#2B3826] hover:border-stone-400 dark:hover:border-stone-600"
                        }`}
                      >
                        {size} {size.includes("16") ? "(-৳200)" : size.includes("20") ? "(+৳300)" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions: Tactile Stepper & Two Distinct Buttons */}
            <div className="pt-6 mt-6 border-t border-[#E2DDD5] dark:border-[#2B3826] space-y-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Quantity Stepper (- 1 +) */}
                <div className="flex items-center border border-[#E2DDD5] dark:border-[#2B3826] bg-[#F8F6F0] dark:bg-[#1A241D] h-11 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-full flex items-center justify-center text-stone-800 hover:text-black dark:text-stone-200 dark:hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-stone-900 dark:text-stone-100 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-full flex items-center justify-center text-stone-800 hover:text-black dark:text-stone-200 dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Primary CTA: ADD TO BAG - Black Normal with Gilded Champagne (#D4AF37) Hover, or disabled when Out of Stock */}
                <button
                  onClick={handleAdd}
                  disabled={isOutOfStock || addedSuccess}
                  className={`flex-1 h-11 px-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] ${
                    isOutOfStock
                      ? "bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border border-stone-300 dark:border-stone-700 cursor-not-allowed"
                      : "bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#0E1410] dark:bg-[#1B241C] dark:hover:bg-[#D4AF37] dark:text-stone-100 dark:hover:text-[#0E1410] border border-black hover:border-[#D4AF37] dark:border-stone-700/80 dark:hover:border-[#D4AF37] hover:shadow-[0_4px_22px_rgba(212,175,55,0.35)] cursor-pointer"
                  }`}
                >
                  {isOutOfStock ? (
                    <span>{isBangla ? "স্টক শেষ" : "OUT OF STOCK"}</span>
                  ) : addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-950 font-bold" />
                      <span>{isBangla ? "ব্যাগে যোগ হয়েছে" : "Added to Bag"}</span>
                    </>
                  ) : (
                    <span>{isBangla ? "ব্যাগে যোগ করুন" : "Add to Bag"}</span>
                  )}
                </button>
              </div>

              {/* Secondary CTA: VIEW DETAILS */}
              <Link
                href={`/product/${product.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="w-full border border-stone-300 dark:border-stone-700 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] text-stone-800 dark:text-stone-200 hover:text-[#0E1410] dark:hover:text-[#0E1410] hover:bg-[#D4AF37]/15 dark:hover:bg-[#D4AF37]/20 h-10 px-4 text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{isBangla ? "বিস্তারিত দেখুন" : "View Details"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

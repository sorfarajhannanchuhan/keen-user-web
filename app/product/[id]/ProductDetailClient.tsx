"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Share2,
  MessageCircle,
  Sparkles,
  Minus,
  Plus,
  Clock,
  Handshake,
} from "lucide-react";
import {
  Product,
  PRODUCTS,
  getPriceForSize,
  getOriginalPriceForSize,
  getSkuForProduct,
  STANDARD_SIZES,
} from "@/features/catalog/products";
import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import AtelierBreadcrumbs from "@/features/navigation/AtelierBreadcrumbs";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Effective 3 standard sizes (16*16, 18*18, 20*20)
  const effectiveSizes = product.sizes && product.sizes.length >= 2 ? product.sizes : STANDARD_SIZES;
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState(
    effectiveSizes.includes('18" × 18"') ? '18" × 18"' : effectiveSizes[0] || '18" × 18"'
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: "Artisan Natural", hex: "#E6DEC8" });
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic price & SKU derived from selectedSize
  const currentPrice = getPriceForSize(product.price, selectedSize);
  const currentOriginalPrice = getOriginalPriceForSize(product.originalPrice, selectedSize);
  const currentSku = getSkuForProduct(product, selectedSize);

  // Accordion toggle states (Matching SS 5 default: details open)
  const [expandedTab, setExpandedTab] = useState<string | null>("details");

  const similarScrollRef = useRef<HTMLDivElement>(null);
  const alsoLikeScrollRef = useRef<HTMLDivElement>(null);

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = !product.inStock || (typeof product.stock === "number" && product.stock <= 0);
  const isLowStock = typeof product.stock === "number" && product.stock > 0 && product.stock <= 3;

  // Similar products (same category or embroidery style, excluding current)
  const similarProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.fabric.includes("Flax") || p.fabric.includes("Cotton")));
    if (list.length < 4) {
      const remaining = PRODUCTS.filter((p) => p.id !== product.id && !list.some((item) => item.id === p.id));
      list = [...list, ...remaining];
    }
    return list.slice(0, 6);
  }, [product]);

  // "You May Also Like" products (complementary cushions, bolsters, and combo sets)
  const youMayAlsoLikeProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
    if (list.length < 4) {
      const remaining = PRODUCTS.filter((p) => p.id !== product.id && !list.some((item) => item.id === p.id));
      list = [...list, ...remaining];
    }
    return list.slice(0, 6);
  }, [product]);

  const handleAddToCart = () => {
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
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello KEEN CHIT Atelier! I am inquiring about "${product.name}" (SKU: ${currentSku}, Size: ${selectedSize}, Qty: ${quantity}, Price: Tk ${(currentPrice * quantity).toLocaleString("en-BD")}). Could you assist me with delivery details?`
    );
    window.open(`https://wa.me/8801700000000?text=${text}`, "_blank");
  };

  const handleScrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const cardWidth = ref.current.firstElementChild?.clientWidth || 300;
      ref.current.scrollBy({
        left: direction === "left" ? -(cardWidth + 16) : (cardWidth + 16),
        behavior: "smooth",
      });
    }
  };

  // Human-readable category breadcrumb label
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "linen": return "Pure Belgian Linen";
      case "velvet": return "Italian Velvet";
      case "embroidered": return "Bengal Nakshi Kantha";
      case "silk": return "Rajshahi Mulberry Silk";
      case "patchwork": return "Artisanal Patchwork";
      case "combo": return "Living Room Combos";
      default: return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0E0B] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      
      {/* 1. Breadcrumbs Matching SS 4 (With Smart Ellipsis Truncation & Back Navigation) */}
      <AtelierBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: getCategoryLabel(product.category), href: `/collections?category=${product.category}` },
          { label: product.name },
        ]}
        backHref="/collections"
        backLabel="Back to Archive"
        maxChars={24}
      />

      {/* ========================================================================= */}
      {/* 2. Main Product Details Section Matching SS 4 */}
      {/* ========================================================================= */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Product Photography Gallery (7 cols on Desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] w-full bg-stone-100 dark:bg-stone-900 overflow-hidden shadow-xs border border-stone-200/70 dark:border-stone-800">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              {/* Wishlist Heart on Image Top-Right */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFavorited ? "fill-rose-600 stroke-rose-600 text-rose-600" : "text-stone-700 dark:text-stone-200"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {product.secondaryImage && (
              <div className="flex items-center gap-3 pt-1">
                {[product.primaryImage, product.secondaryImage].map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 overflow-hidden border transition-all cursor-pointer ${
                      selectedImage === img ? "border-stone-900 dark:border-white shadow-xs" : "border-stone-200 dark:border-stone-800 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Price, Quantity, Accordions, Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Clean Title */}
            <div>
              <h1 className="font-brandon text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-white leading-[1.25]">
                {product.name}
              </h1>
            </div>

            {/* Price (Dynamically scales with size: 16*16, 18*18, 20*20) */}
            <div className="pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-2xl sm:text-[28px] font-bold text-stone-900 dark:text-white transition-all duration-200">
                  ৳{currentPrice.toLocaleString("en-BD")}
                </span>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <span className="font-sans text-base text-stone-400 line-through transition-all duration-200">
                    ৳{currentOriginalPrice.toLocaleString("en-BD")}
                  </span>
                )}
              </div>
            </div>

            {/* Visual Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-brandon text-[11px] uppercase tracking-[0.16em] font-semibold text-stone-500 dark:text-stone-400">
                    Color
                  </span>
                  <span className="font-sans font-medium text-stone-900 dark:text-stone-200">
                    {selectedColor?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((col, idx) => {
                    const isSelected = selectedColor?.name === col.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(col)}
                        className={`w-7 h-7 flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-2 border-stone-900 dark:border-white p-[2px] shadow-xs"
                            : "border border-stone-300/80 dark:border-stone-700 hover:scale-105"
                        }`}
                        title={col.name}
                        aria-label={`Select ${col.name}`}
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
            )}

            {/* SKU (Dynamically changes with size: 16, 18, 20) & Low-Stock Urgency Alert */}
            <div className="flex items-center justify-between pt-1 pb-0.5">
              <span className="font-brandon text-[11px] uppercase tracking-[0.16em] font-semibold text-stone-500 dark:text-stone-400">
                SKU: <span className="font-mono text-stone-800 dark:text-stone-200 font-medium transition-all duration-200">{currentSku}</span>
              </span>

              {/* SS 5 Luxury Champagne Styled Low-Stock Urgency Alert */}
              {isLowStock && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6EE] dark:bg-[#1B2418] border border-[#C5A059]/30 dark:border-[#C5A059]/40 text-[#9E7A2E] dark:text-[#D4AF37] text-[11px] font-semibold tracking-wider uppercase shadow-xs">
                  <Clock className="w-3.5 h-3.5 stroke-[2.2] text-[#C5A059]" />
                  <span>
                    Only {product.stock} Left In Stock
                  </span>
                </div>
              )}
            </div>

            {/* Side-by-Side: Quantity & Size Selector */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              {/* Left: Quantity Stepper */}
              <div className="space-y-1.5">
                <label className="font-brandon text-[11px] uppercase tracking-[0.16em] font-semibold text-stone-500 dark:text-stone-400 block">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-stone-200 dark:border-stone-800 bg-[#FAF9F7] dark:bg-stone-900/60 w-full justify-between h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-full flex items-center justify-center text-stone-800 hover:text-black dark:text-stone-200 dark:hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer border-r border-stone-200/80 dark:border-stone-800"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <span className="flex-1 text-center text-sm font-semibold text-stone-900 dark:text-white font-sans">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full flex items-center justify-center text-stone-800 hover:text-black dark:text-stone-200 dark:hover:text-white transition-colors cursor-pointer border-l border-stone-200/80 dark:border-stone-800"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Right: Size Dropdown (16*16, 18*18, 20*20 with live price hints) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-brandon text-[11px] uppercase tracking-[0.16em] font-semibold text-stone-500 dark:text-stone-400 block">
                    Size
                  </label>
                  <span className="font-mono text-[10px] text-[#C5A059] dark:text-[#D4AF37] font-semibold">
                    {selectedSize}
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full h-11 px-3.5 pr-8 border border-stone-200 dark:border-stone-800 bg-[#FAF9F7] dark:bg-stone-900/60 text-xs font-medium text-stone-800 dark:text-stone-200 appearance-none focus:outline-none focus:border-brand-gold cursor-pointer transition-colors"
                  >
                    {effectiveSizes.map((s) => (
                      <option key={s} value={s}>
                        {s} {s.includes("16") ? "(-৳200)" : s.includes("20") ? "(+৳300)" : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* Primary Action Buttons (Immediately Below Selectors for Pure UX Flow) */}
            {/* ===================================================================== */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center gap-2.5">
                {/* Main ADD TO BAG Button - Black Normal with Gilded Champagne (#D4AF37) Hover, or disabled when Out of Stock */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isAdded}
                  className={`flex-1 h-12 text-xs uppercase tracking-[0.22em] font-bold flex items-center justify-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOutOfStock
                      ? "bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border border-stone-300 dark:border-stone-700 cursor-not-allowed"
                      : "bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#0E1410] dark:bg-[#1B241C] dark:hover:bg-[#D4AF37] dark:text-stone-100 dark:hover:text-[#0E1410] border border-black hover:border-[#D4AF37] dark:border-stone-700 dark:hover:border-[#D4AF37] shadow-md hover:shadow-[0_4px_25px_rgba(212,175,55,0.35)] active:scale-[0.99] cursor-pointer"
                  }`}
                >
                  {isOutOfStock ? (
                    <span>OUT OF STOCK</span>
                  ) : isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <span>ADD TO BAG</span>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors cursor-pointer ${
                    isFavorited
                      ? "border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-600"
                      : "border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-[#FAF9F7] dark:bg-stone-900/60 text-stone-700 dark:text-stone-300"
                  }`}
                  title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-600" : ""}`} />
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-12 h-12 border border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-[#FAF9F7] dark:bg-stone-900/60 flex items-center justify-center text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
                  title="Share product link"
                  aria-label="Share"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Refined Secondary Action: WhatsApp Concierge Inquiries (No competing dark block) */}
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full h-11 bg-transparent hover:bg-stone-50 dark:hover:bg-stone-900/40 text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white text-[11px] uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border border-stone-300/90 dark:border-stone-700 hover:border-brand-gold"
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-gold" />
                <span>ORDER VIA WHATSAPP CONCIERGE</span>
              </button>
            </div>

            {/* 4 Bespoke Craftsmanship Trust Badges (Enlarged to match SS 4 scale) */}
            <div className="pt-6 pb-4 border-t border-stone-200/80 dark:border-stone-800/80">
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
                {/* 1. Handmade */}
                <div className="flex flex-col items-center gap-2.5 group cursor-default">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#111111]/90 hover:bg-[#1B2418] dark:bg-[#182119] dark:hover:bg-[#202C22] border border-[#C5A059]/40 dark:border-[#C5A059]/50 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 sm:w-8 sm:h-8">
                      <path d="M30 8L12 28L9 31" />
                      <circle cx="28" cy="10" r="1.5" fill="currentColor" />
                      <path d="M28 10C21 3 10 7 10 15C10 21 21 21 26 17" />
                    </svg>
                  </div>
                  <span className="font-sans text-[11px] sm:text-[12px] font-medium text-stone-800 dark:text-stone-200 leading-tight">
                    Handmade
                  </span>
                </div>

                {/* 2. Fair Trade Verified */}
                <div className="flex flex-col items-center gap-2.5 group cursor-default">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#111111]/90 hover:bg-[#1B2418] dark:bg-[#182119] dark:hover:bg-[#202C22] border border-[#C5A059]/40 dark:border-[#C5A059]/50 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                    <Handshake className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                  </div>
                  <span className="font-sans text-[11px] sm:text-[12px] font-medium text-stone-800 dark:text-stone-200 leading-tight">
                    Fair Trade Verified
                  </span>
                </div>

                {/* 3. Made by Women */}
                <div className="flex flex-col items-center gap-2.5 group cursor-default">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#111111]/90 hover:bg-[#1B2418] dark:bg-[#182119] dark:hover:bg-[#202C22] border border-[#C5A059]/40 dark:border-[#C5A059]/50 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 sm:w-8 sm:h-8">
                      <circle cx="20" cy="15" r="7" />
                      <line x1="20" y1="22" x2="20" y2="33" />
                      <line x1="14" y1="28" x2="26" y2="28" />
                    </svg>
                  </div>
                  <span className="font-sans text-[11px] sm:text-[12px] font-medium text-stone-800 dark:text-stone-200 leading-tight">
                    Made by Women
                  </span>
                </div>

                {/* 4. Sustainable Materials */}
                <div className="flex flex-col items-center gap-2.5 group cursor-default">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#111111]/90 hover:bg-[#1B2418] dark:bg-[#182119] dark:hover:bg-[#202C22] border border-[#C5A059]/40 dark:border-[#C5A059]/50 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 sm:w-8 sm:h-8">
                      <path d="M12 14A13 13 0 0 1 31 16" />
                      <polyline points="28 13 32 16 29 20" />
                      <path d="M28 26A13 13 0 0 1 9 24" />
                      <polyline points="12 27 8 24 11 20" />
                      <path d="M17 21a3 3 0 0 1 6 0c1 0 2 1 2 2.5a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 15 23.5c0-1.5 1-2.5 2-2.5z" />
                    </svg>
                  </div>
                  <span className="font-sans text-[11px] sm:text-[12px] font-medium text-stone-800 dark:text-stone-200 leading-tight">
                    Sustainable Materials
                  </span>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* Accordion / Details Section (Below Action Bar) */}
            {/* ===================================================================== */}
            <div className="border-t border-stone-200/80 dark:border-stone-800/80 divide-y divide-stone-200/70 dark:divide-stone-800/70 text-xs sm:text-[13px] pt-1">
              
              {/* 1. Story Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "story" ? null : "story")}
                  className="w-full py-3.5 flex items-center justify-between text-left text-stone-900 dark:text-stone-100 font-medium hover:text-brand-gold dark:hover:text-brand-gold cursor-pointer"
                >
                  <span className="font-medium text-sm">Story</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${expandedTab === "story" ? "rotate-180" : ""}`} />
                </button>
                {expandedTab === "story" && (
                  <div className="pb-4 text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed space-y-2 animate-in fade-in">
                    <p>{product.tagline}. Designed as an architectural sanctuary piece for modern living spaces.</p>
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* 2. Product Details Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "details" ? null : "details")}
                  className="w-full py-3.5 flex items-center justify-between text-left text-stone-900 dark:text-stone-100 font-medium hover:text-brand-gold dark:hover:text-brand-gold cursor-pointer"
                >
                  <span className="font-medium text-sm">Product Details</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${expandedTab === "details" ? "rotate-180" : ""}`} />
                </button>
                {expandedTab === "details" && (
                  <div className="pb-4 space-y-2 animate-in fade-in">
                    {/* Measurements Row */}
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] dark:bg-stone-800/40 rounded text-xs">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-stone-900 dark:text-stone-100">MEASUREMENTS</span>
                      <span className="text-stone-600 dark:text-stone-300 text-right">{product.sizes.join(", ")}</span>
                    </div>

                    {/* Materials Row */}
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] dark:bg-stone-800/40 rounded text-xs">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-stone-900 dark:text-stone-100">MATERIALS</span>
                      <span className="text-stone-600 dark:text-stone-300 text-right">{product.fabric}</span>
                    </div>

                    {/* Colors Row */}
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] dark:bg-stone-800/40 rounded text-xs">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-stone-900 dark:text-stone-100">COLORS</span>
                      <span className="text-stone-600 dark:text-stone-300 text-right">{product.colors.map(c => c.name).join(", ")}</span>
                    </div>

                    {/* Origin Row */}
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] dark:bg-stone-800/40 rounded text-xs">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-stone-900 dark:text-stone-100">ORIGIN</span>
                      <span className="text-stone-600 dark:text-stone-300 text-right">Bengal Artisanal Atelier</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. About The Artisan Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "artisan" ? null : "artisan")}
                  className="w-full py-3.5 flex items-center justify-between text-left text-stone-900 dark:text-stone-100 font-medium hover:text-brand-gold dark:hover:text-brand-gold cursor-pointer"
                >
                  <span className="font-medium text-sm">About The Artisan</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${expandedTab === "artisan" ? "rotate-180" : ""}`} />
                </button>
                {expandedTab === "artisan" && (
                  <div className="pb-4 text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed space-y-2 animate-in fade-in">
                    <p>Handcrafted by generational artisans in rural Bengal, preserving traditional Nakshi needlework and handloom flax weaving. Over 40 hours of patient craftsmanship are invested into every single creation.</p>
                  </div>
                )}
              </div>

              {/* 4. Care Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "care" ? null : "care")}
                  className="w-full py-3.5 flex items-center justify-between text-left text-stone-900 dark:text-stone-100 font-medium hover:text-brand-gold dark:hover:text-brand-gold cursor-pointer"
                >
                  <span className="font-medium text-sm">Care</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${expandedTab === "care" ? "rotate-180" : ""}`} />
                </button>
                {expandedTab === "care" && (
                  <div className="pb-4 text-xs text-stone-600 dark:text-stone-400 space-y-1.5 animate-in fade-in">
                    {product.careInstructions.map((inst, i) => (
                      <p key={i}>• {inst}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Shipping & Returns Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "shipping" ? null : "shipping")}
                  className="w-full py-3.5 flex items-center justify-between text-left text-stone-900 dark:text-stone-100 font-medium hover:text-brand-gold dark:hover:text-brand-gold cursor-pointer"
                >
                  <span className="font-medium text-sm">Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${expandedTab === "shipping" ? "rotate-180" : ""}`} />
                </button>
                {expandedTab === "shipping" && (
                  <div className="pb-4 text-xs text-stone-600 dark:text-stone-400 space-y-1.5 animate-in fade-in">
                    <p>• Complimentary White-Glove delivery in Dhaka (24h) and across Bangladesh (48h).</p>
                    <p>• Hassle-free 7-day atelier exchange privilege for complete peace of mind.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SIMILAR PRODUCTS Section Matching SS 5 */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 border-t border-stone-200/70 dark:border-stone-800/70 bg-[#FAF9F7] dark:bg-[#0C120E] select-none">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-brandon font-semibold text-xl sm:text-2xl tracking-[0.14em] text-stone-900 dark:text-stone-100 uppercase">
              SIMILAR PRODUCTS
            </h2>
          </div>

          {/* Carousel with < and > Chevrons (Matching SS 5) */}
          <div className="relative group/carousel">
            
            {/* Left Chevron */}
            <button
              onClick={() => handleScrollRow(similarScrollRef, "left")}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 dark:bg-stone-900/90 rounded-full shadow-md border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-stone-800 dark:text-stone-200" />
            </button>

            {/* Right Chevron */}
            <button
              onClick={() => handleScrollRow(similarScrollRef, "right")}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 dark:bg-stone-900/90 rounded-full shadow-md border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-stone-800 dark:text-stone-200" />
            </button>

            {/* 4-Card Track (Matching SS 5) */}
            <div
              ref={similarScrollRef}
              className="flex items-center gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2"
            >
              {similarProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="w-[78vw] sm:w-[46vw] lg:w-[calc((100%-3*1.25rem)/4)] shrink-0 snap-start group block relative aspect-[3/4] sm:aspect-[4/5] bg-stone-100 dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <Image
                    src={item.primaryImage}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  {/* Top-Right Wishlist Heart (Matching SS 5) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(item.id) ? "fill-rose-600 stroke-rose-600 text-rose-600" : "text-stone-700 dark:text-stone-300"
                      }`}
                    />
                  </button>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. YOU MAY ALSO LIKE Section (Underneath Similar Products per user request) */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 border-t border-stone-200/70 dark:border-stone-800/70 bg-white dark:bg-[#0A0E0B] select-none">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-brandon font-semibold text-xl sm:text-2xl tracking-[0.14em] text-stone-900 dark:text-stone-100 uppercase">
              YOU MAY ALSO LIKE
            </h2>
          </div>

          {/* Carousel with < and > Chevrons (Matching SS 5 UI Model) */}
          <div className="relative group/carousel">
            
            {/* Left Chevron */}
            <button
              onClick={() => handleScrollRow(alsoLikeScrollRef, "left")}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 dark:bg-stone-900/90 rounded-full shadow-md border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-stone-800 dark:text-stone-200" />
            </button>

            {/* Right Chevron */}
            <button
              onClick={() => handleScrollRow(alsoLikeScrollRef, "right")}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 dark:bg-stone-900/90 rounded-full shadow-md border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-stone-800 dark:text-stone-200" />
            </button>

            {/* 4-Card Track */}
            <div
              ref={alsoLikeScrollRef}
              className="flex items-center gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2"
            >
              {youMayAlsoLikeProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="w-[78vw] sm:w-[46vw] lg:w-[calc((100%-3*1.25rem)/4)] shrink-0 snap-start group block relative aspect-[3/4] sm:aspect-[4/5] bg-stone-100 dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <Image
                    src={item.primaryImage}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  {/* Top-Right Wishlist Heart */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(item.id) ? "fill-rose-600 stroke-rose-600 text-rose-600" : "text-stone-700 dark:text-stone-300"
                      }`}
                    />
                  </button>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
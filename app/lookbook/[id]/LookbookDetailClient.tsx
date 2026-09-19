"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ShoppingBag,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Share2,
  MessageCircle,
  Layers,
  Palette,
  ShieldCheck,
} from "lucide-react";
import {
  LookbookArrangement,
  LOOKBOOK_ARRANGEMENTS,
  calculateArrangementPricing,
} from "@/features/catalog/lookbookData";
import { Product } from "@/features/catalog/products";
import { useCart } from "@/features/cart";
import AtelierBreadcrumbs from "@/features/navigation/AtelierBreadcrumbs";

interface Props {
  arrangement: LookbookArrangement;
}

export default function LookbookDetailClient({ arrangement }: Props) {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(arrangement.heroImage);
  const [expandedTab, setExpandedTab] = useState<string | null>("pieces"); // Default open: pieces list
  const [isBundleAdded, setIsBundleAdded] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const { products, originalTotal, bundlePrice, discountAmount } = useMemo(
    () => calculateArrangementPricing(arrangement),
    [arrangement]
  );

  // Recommendations: Other arrangements in the same or complementary room types
  const similarArrangements = useMemo(() => {
    return LOOKBOOK_ARRANGEMENTS.filter((a) => a.id !== arrangement.id).slice(0, 3);
  }, [arrangement]);

  const handleAddPiece = (product: Product) => {
    addToCart(product, product.sizes[0] || "18 x 18", product.colors[0], 1);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleAddCompleteBundle = () => {
    products.forEach((product) => {
      addToCart(product, product.sizes[0] || "18 x 18", product.colors[0], 1);
    });
    setIsBundleAdded(true);
    setTimeout(() => setIsBundleAdded(false), 2500);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsAppOrder = () => {
    const piecesList = products.map((p, i) => `${i + 1}. ${p.name} (${p.sizes[0] || "18\"×18\""})`).join("\n");
    const text = encodeURIComponent(
      `Hello KEEN CHIT! I would like to order the complete "${arrangement.title}" room set (${arrangement.code}).\n\nIncluded Pieces:\n${piecesList}\n\nTotal: Tk ${bundlePrice.toLocaleString()} (Set Savings Applied)\n\nPlease confirm availability and delivery to my address.`
    );
    window.open(`https://wa.me/8801700000000?text=${text}`, "_blank");
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hello KEEN CHIT! I am interested in the "${arrangement.title}" arrangement (${arrangement.code}). Could you assist with styling or custom dimensions?`
    );
    window.open(`https://wa.me/8801700000000?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0E1410] text-[#111111] dark:text-[#F5F5F0] transition-colors duration-300">
      
      {/* 1. Breadcrumbs with Ellipsis Truncation and Back to Lookbook */}
      <AtelierBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Lookbook", href: "/lookbook" },
          { label: arrangement.roomTypeLabel, href: "/lookbook" },
          { label: arrangement.title },
        ]}
        backHref="/lookbook"
        backLabel="Back to Lookbook"
        maxChars={24}
      />

      {/* 2. Main Arrangement Showcase (2 Columns) */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Visual Gallery (7 Cols on Desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] w-full bg-[#F5F2EB] dark:bg-[#1A231C] overflow-hidden shadow-sm border border-[#EAE6DE] dark:border-[#263124]">
              <Image
                src={selectedImage}
                alt={arrangement.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
              />

              {/* Room Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] bg-[#111111]/85 text-white backdrop-blur-xs">
                  {arrangement.roomTypeLabel} • {arrangement.code}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {arrangement.secondaryImages.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {[arrangement.heroImage, ...arrangement.secondaryImages].map((img, idx) => {
                  const isSelected = selectedImage === img;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 overflow-hidden border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#111111] dark:border-[#D4AF37] ring-2 ring-[#D4AF37]/50"
                          : "border-[#E5E0D8] dark:border-[#2C362B] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${arrangement.title} angle ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Narrative, Accordions & One-Click Purchase (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header / Eyebrow */}
            <div className="space-y-2 border-b border-[#EAE6DE] dark:border-[#263124] pb-5">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] uppercase font-bold tracking-[0.25em] text-[#D4AF37]">
                  {arrangement.roomTypeLabel} ARRANGEMENT
                </span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#777777] dark:text-[#9BA59A] hover:text-[#111111] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                </button>
              </div>

              <h1 className="font-brandon text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111111] dark:text-white leading-tight">
                {arrangement.title}
              </h1>

              {/* Palette Swatches */}
              <div className="pt-3 flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#555555] dark:text-[#8E998B]">
                  Palette:
                </span>
                <div className="flex items-center gap-2">
                  {arrangement.paletteColors.map((col, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 group relative">
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 dark:border-white/20 shadow-xs"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-[10.5px] text-[#444444] dark:text-[#CCCCCC] hidden sm:inline font-sans">
                        {col.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Room Set Pricing Box */}
            <div className="bg-[#FAF9F5] dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-5 sm:p-6 space-y-4">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777] dark:text-[#8E998B] block">
                    Complete Room Set ({products.length} Pieces)
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans font-bold text-2xl sm:text-3xl text-[#111111] dark:text-white tabular-nums">
                      Tk {bundlePrice.toLocaleString()}
                    </span>
                    <span className="font-sans text-sm text-[#888888] line-through tabular-nums">
                      Tk {originalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Clear, Dignified Set Savings Tag */}
                <span className="text-[11px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                  Set Savings: Save {arrangement.bundleDiscountPercent}%
                </span>
              </div>

              {/* 1-Click Add Entire Set CTA */}
              <button
                type="button"
                onClick={handleAddCompleteBundle}
                className="w-full py-4 text-[12px] font-bold tracking-[0.2em] uppercase bg-[#D4AF37] hover:bg-[#E5C04E] text-[#0E1410] dark:bg-[#D4AF37] dark:hover:bg-[#E5C04E] dark:text-[#0E1410] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md font-sans active:scale-[0.99] cursor-pointer"
              >
                {isBundleAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>ROOM SET ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD COMPLETE ROOM SET TO BAG</span>
                  </>
                )}
              </button>
            </div>

            {/* =================================================================== */}
            {/* ACCORDIONS SECTION (Minimalist Luxury) */}
            {/* =================================================================== */}
            <div className="border-t border-[#EAE6DE] dark:border-[#263124] divide-y divide-[#EAE6DE] dark:divide-[#263124]">
              
              {/* 1. Pieces in this Arrangement (Enlarged 4:5 Thumbnails & Zero Noise) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "pieces" ? null : "pieces")}
                  className="w-full py-3.5 flex items-center justify-between text-left text-[#111111] dark:text-[#F5F5F0] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className="font-brandon text-sm uppercase tracking-[0.14em] font-semibold">
                    Pieces in this Arrangement ({products.length})
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                      expandedTab === "pieces" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedTab === "pieces" && (
                  <div className="pb-4 pt-1 space-y-3 animate-in fade-in duration-300">
                    <div className="space-y-3">
                      {products.map((item) => {
                        const isThisAdded = Boolean(addedItemMap[item.id]);

                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3.5 bg-[#FAF9F5] dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all group"
                          >
                            {/* Product Media + Details */}
                            <div className="flex items-center gap-4 min-w-0">
                              {/* Significantly Enlarged Thumbnail: 88x104px (4:5 Ratio) showcasing textile weave */}
                              <Link
                                href={`/product/${item.id}`}
                                className="relative w-20 h-24 sm:w-22 sm:h-26 flex-shrink-0 overflow-hidden bg-[#EBE7DF] dark:bg-[#1C251D] border border-black/5 dark:border-white/5 block"
                              >
                                <Image
                                  src={item.primaryImage}
                                  alt={item.name}
                                  fill
                                  sizes="96px"
                                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                />
                              </Link>

                              {/* Clean Typography Hierarchy */}
                              <div className="space-y-1 min-w-0 pr-2">
                                <Link
                                  href={`/product/${item.id}`}
                                  className="font-brandon font-medium text-[14px] sm:text-[15px] text-[#111111] dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors line-clamp-1 tracking-wide block"
                                >
                                  {item.name}
                                </Link>
                                <div className="font-sans text-[11.5px] text-[#777777] dark:text-[#8E998B]">
                                  Size: {item.sizes[0] || "18\" × 18\""}
                                </div>
                                <div className="font-sans font-semibold text-sm text-[#111111] dark:text-white pt-0.5 tabular-nums">
                                  Tk {item.price.toLocaleString()}
                                </div>
                              </div>
                            </div>

                            {/* Single Tactile Quick-Add Action (No Cluttered Double Buttons) */}
                            <div className="flex-shrink-0 pl-2">
                              <button
                                type="button"
                                onClick={() => handleAddPiece(item)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                                  isThisAdded
                                    ? "bg-[#10B981] text-white scale-105"
                                    : "border border-[#D5D0C5] dark:border-[#354334] text-[#111111] dark:text-[#E2E8E0] hover:bg-[#111111] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#0E1410] active:scale-95 shadow-xs"
                                }`}
                                title={isThisAdded ? "Piece added" : `Add ${item.name} to bag`}
                                aria-label={`Add ${item.name} to bag`}
                              >
                                {isThisAdded ? (
                                  <Check className="w-4 h-4 stroke-[2.5]" />
                                ) : (
                                  <ShoppingBag className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Room Code (Matching SS 3) */}
              <div className="py-3 flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#111111] dark:text-[#F5F5F0]">
                  Product Code
                </span>
                <span className="font-mono text-[12px] text-[#777777] dark:text-[#9BA59A]">
                  {arrangement.code}
                </span>
              </div>

              {/* 3. Story Accordion (Matching SS 3) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "story" ? null : "story")}
                  className="w-full py-3 flex items-center justify-between text-left text-[#111111] dark:text-[#F5F5F0] font-semibold hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className="text-[13.5px]">Story</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                      expandedTab === "story" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedTab === "story" && (
                  <div className="pb-4 text-xs text-[#555555] dark:text-[#A0A89F] leading-relaxed space-y-2 animate-in fade-in">
                    <p>{arrangement.conceptStory}</p>
                    <p className="italic text-[#888888]">
                      &ldquo;{arrangement.tagline}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* 4. Product Details / Styling Guide (Matching SS 3) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "details" ? null : "details")}
                  className="w-full py-3 flex items-center justify-between text-left text-[#111111] dark:text-[#F5F5F0] font-semibold hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className="text-[13.5px]">Product Details</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                      expandedTab === "details" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedTab === "details" && (
                  <div className="pb-4 text-xs text-[#555555] dark:text-[#A0A89F] space-y-1.5 animate-in fade-in">
                    <p className="font-bold text-[#111111] dark:text-white uppercase tracking-wider text-[11px] mb-1">
                      Proportions & Placement
                    </p>
                    {arrangement.proportionsGuide.map((guide, idx) => (
                      <p key={idx}>• {guide}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. About The Artisan (Matching SS 3) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "artisan" ? null : "artisan")}
                  className="w-full py-3 flex items-center justify-between text-left text-[#111111] dark:text-[#F5F5F0] font-semibold hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className="text-[13.5px]">About The Artisan</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                      expandedTab === "artisan" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedTab === "artisan" && (
                  <div className="pb-4 text-xs text-[#555555] dark:text-[#A0A89F] leading-relaxed space-y-2 animate-in fade-in">
                    <p>{arrangement.artisanProvenance}</p>
                    <p>
                      Every piece in our Curated Lookbook is made in small, ethically managed atelier batches ensuring generational heritage preservation.
                    </p>
                  </div>
                )}
              </div>

              {/* 6. Care (Matching SS 3) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "care" ? null : "care")}
                  className="w-full py-3 flex items-center justify-between text-left text-[#111111] dark:text-[#F5F5F0] font-semibold hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className="text-[13.5px]">Care</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                      expandedTab === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedTab === "care" && (
                  <div className="pb-4 text-xs text-[#555555] dark:text-[#A0A89F] space-y-1.5 animate-in fade-in">
                    <p>• Dry clean recommended for embroidered silk and Italian velvet pieces.</p>
                    <p>• Pure Belgian linen covers can be machine-washed on delicate cold cycle.</p>
                    <p>• Avoid harsh direct midday sunlight to maintain rich botanical dye longevity.</p>
                  </div>
                )}
              </div>

              {/* 7. Shipping & Returns (Matching SS 3) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setExpandedTab(expandedTab === "shipping" ? null : "shipping")}
                  className="w-full py-3 flex items-center justify-between text-left text-[#111111] dark:text-[#F5F5F0] font-semibold hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className="text-[13.5px]">Shipping & Returns</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                      expandedTab === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedTab === "shipping" && (
                  <div className="pb-4 text-xs text-[#555555] dark:text-[#A0A89F] space-y-1.5 animate-in fade-in">
                    <p>• Complimentary white-glove home delivery on all curated room arrangements across Bangladesh.</p>
                    <p>• Express 24-48h dispatch available within Dhaka City.</p>
                    <p>• 7-day atelier exchange policy for undamaged items in original keepsake packaging.</p>
                  </div>
                )}
              </div>

            </div>

            {/* WhatsApp Order & Styling Assistance */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 bg-[#162018] hover:bg-[#202C22] text-white text-[12px] uppercase tracking-[0.16em] font-bold flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer border border-stone-800 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>ORDER THIS ROOM ON WHATSAPP</span>
              </button>

              <div className="text-center pt-0.5">
                <button
                  type="button"
                  onClick={handleWhatsAppConsult}
                  className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-brand-gold dark:hover:text-brand-gold transition-colors tracking-wide underline cursor-pointer font-sans"
                >
                  Need custom sizing or in-home styling? Chat with our stylist →
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 3. "YOU MAY ALSO LIKE" / SIMILAR ARRANGEMENTS */}
      <section className="py-16 sm:py-24 border-t border-[#EAE6DE] dark:border-[#263124] bg-[#FAF9F5] dark:bg-[#0B100C]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE6DE] dark:border-[#263124]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-1">
                COMPLEMENTARY SPACES
              </span>
              <h2 className="font-brandon text-2xl sm:text-3xl font-semibold uppercase text-[#111111] dark:text-white">
                You May Also Like
              </h2>
            </div>

            <Link
              href="/lookbook"
              className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#111111] dark:text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
            >
              <span>View All Combos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarArrangements.map((similar) => {
              const { bundlePrice } = calculateArrangementPricing(similar);

              return (
                <article
                  key={similar.id}
                  className="group bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <Link
                    href={`/lookbook/${similar.slug}`}
                    className="relative aspect-[4/3] block overflow-hidden bg-[#F5F2EB] dark:bg-[#1C251D]"
                  >
                    <Image
                      src={similar.heroImage}
                      alt={similar.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] bg-[#111111]/85 text-white">
                        {similar.roomTypeLabel}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 space-y-2">
                    <span className="text-[9.5px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] block">
                      {similar.paletteTitle}
                    </span>
                    <h3 className="font-brandon text-lg font-semibold text-[#111111] dark:text-white">
                      <Link href={`/lookbook/${similar.slug}`} className="hover:text-[#D4AF37] transition-colors">
                        {similar.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-xs text-[#666666] dark:text-[#9BA59A] line-clamp-2">
                      {similar.stylingTip}
                    </p>
                  </div>

                  <div className="px-5 py-3 border-t border-[#EAE6DE] dark:border-[#263124] flex items-center justify-between">
                    <span className="font-sans font-bold text-xs text-[#111111] dark:text-white">
                      From Tk {bundlePrice.toLocaleString()}
                    </span>
                    <Link
                      href={`/lookbook/${similar.slug}`}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors"
                    >
                      Explore →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}

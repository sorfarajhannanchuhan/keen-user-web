"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Gift,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { useCart, GiftWrapOption } from "@/features/cart";
import { PRODUCTS, Product } from "@/features/catalog";

// Curated gift wrapping options matching SS 4 & luxury atelier guidelines
const GIFT_WRAP_OPTIONS: GiftWrapOption[] = [
  {
    id: "complimentary-atelier",
    name: "Signature Atelier Box",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    description: "Complimentary rigid linen keepsake box, embossed butter paper, cotton twill ribbon.",
  },
  {
    id: "botanical-gold-foil",
    name: "Botanical Gold Foil Wrap",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    description: "Hand-pressed golden foil botanical paper with pure wax seal emblem.",
  },
  {
    id: "heritage-jamdani",
    name: "Heritage Bengal Jamdani Wrap",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop",
    description: "Hand-block artisanal Jamdani heirloom motif wrap with silk ribbon.",
  },
  {
    id: "french-toile",
    name: "Vintage French Toile Wrap",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=600&auto=format&fit=crop",
    description: "Monochrome architectural pastoral textile print with grosgrain tie.",
  },
];

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    totalItems,
    subtotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    requestRemoveFromCart,
    giftWrapOption,
    setGiftWrapOption,
    giftNote,
    setGiftNote,
    giftWrapPrice,
    grandTotal,
    addToCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Recommendations: Curate 4 items distinct from current cart
  const recommendations: Product[] = PRODUCTS.filter(
    (p) => !cart.some((c) => c.product.id === p.id)
  ).slice(0, 4);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMsg({ text: res.message });
      setCouponCode("");
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  const FREE_SHIPPING_THRESHOLD = 3000;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 100;
  const finalTotal = grandTotal + shippingFee;

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0E1410] text-[#111111] dark:text-[#F5F5F0] transition-colors py-8 sm:py-12">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header / Breadcrumb (SS 4 Layout) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#EAE6DE] dark:border-[#263124] pb-4 mb-8 sm:mb-10">
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-[#111111] dark:text-[#FFFFFF]">
            MY BAG <span className="font-normal text-[#666666] dark:text-[#9BA59A]">({totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"})</span>
          </h1>
          <div className="text-[12.5px] text-[#777777] dark:text-[#A0A89F] mt-2 sm:mt-0 font-medium">
            <span>White-Glove Atelier Packing Guaranteed</span>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="py-20 text-center max-w-md mx-auto space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#F5F2EB] dark:bg-[#1A231C] flex items-center justify-center text-[#888888] dark:text-[#7A8578]">
              <ShoppingBag className="w-9 h-9 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold uppercase tracking-[0.12em] text-[#111111] dark:text-white">
                Your Bag is Currently Empty
              </h2>
              <p className="text-[14px] text-[#666666] dark:text-[#9BA59A] leading-relaxed">
                Explore our heirloom collection of Belgian linen, Italian velvet, and master needlework.
              </p>
            </div>
            <Link
              href="/"
              className="inline-block px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#0E1410] dark:bg-[#EAE6DE] dark:text-[#111111] dark:hover:bg-[#D4AF37] transition-all"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (Items List + Gift Wrap Module + Recommendations) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Items Table / Feed */}
              <div className="divide-y divide-[#EAE6DE] dark:divide-[#263124] border-b border-[#EAE6DE] dark:border-[#263124]">
                {cart.map((item, index) => {
                  const lineSubtotal = item.product.price * item.quantity;
                  return (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                      className="py-6 sm:py-8 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-28 h-36 sm:w-32 sm:h-40 bg-[#F5F2EB] dark:bg-[#1A231C] border border-[#EAE6DE] dark:border-[#263124] flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info & Controls (SS 4 Benchmark) */}
                      <div className="flex-1 flex flex-col justify-between self-stretch">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                          <div className="space-y-1">
                            <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#111111] dark:text-[#FFFFFF] leading-snug">
                              {item.product.name}
                            </h3>
                            <div className="flex items-center gap-3 text-[12px] text-[#555555] dark:text-[#9BA59A]">
                              <span className="text-[#10B981] dark:text-[#34D399] font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] dark:bg-[#34D399]"></span>
                                In Stock
                              </span>
                              {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                              {item.selectedColor && <span>• Color: {item.selectedColor.name}</span>}
                            </div>
                          </div>

                          {/* Line Price (SS 4 Layout) */}
                          <div className="text-right">
                            <span className="text-[15px] sm:text-[16px] font-sans font-medium text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                              Tk {lineSubtotal.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Stepper & Removal Row (SS 4 Benchmark) */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F2EFE9] dark:border-[#1E271F]">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#D5D0C6] dark:border-[#384836] bg-white dark:bg-[#151D16]">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor.name,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-stone-800 hover:text-black dark:text-stone-200 dark:hover:text-white transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                            <span className="w-10 text-center font-sans font-medium text-[13px] text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor.name,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-stone-800 hover:text-black dark:text-stone-200 dark:hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                          </div>

                          {/* Actions: Gift Wrap Indicator + Dustbin Remove Icon (SS 4 + SS 3 Benchmark) */}
                          <div className="flex items-center gap-4 text-[12.5px]">
                            <span className="text-[#555555] dark:text-[#9BA59A] flex items-center gap-1.5">
                              <Gift className="w-3.5 h-3.5" />
                              <span>Gift Wrap Available</span>
                            </span>

                            <span className="text-[#D5D0C6] dark:text-[#384836]">|</span>

                            <button
                              onClick={() =>
                                requestRemoveFromCart(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor.name,
                                  item.product.name
                                )
                              }
                              className="p-1.5 text-[#777777] hover:text-[#DC2626] dark:text-[#9BA59A] dark:hover:text-[#F87171] transition-colors flex items-center gap-1.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4 stroke-[1.75]" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ATELIER GIFT PACKAGING MODULE (SS 4 Benchmark) */}
              <div className="bg-[#F8F6F0] dark:bg-[#131A14] border border-[#EAE6DE] dark:border-[#263124] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#EAE6DE] dark:border-[#263124] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#111111] text-white dark:bg-[#EAE6DE] dark:text-[#111111] flex items-center justify-center">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.14em] text-[#111111] dark:text-white">
                        Atelier Gift Packaging
                      </h3>
                      <p className="text-[12px] text-[#666666] dark:text-[#9BA59A]">
                        Complimentary signature keepsake boxing with bespoke wrap upgrades.
                      </p>
                    </div>
                  </div>
                  {giftWrapOption && (
                    <span className="text-[11.5px] font-semibold text-[#111111] dark:text-[#D4AF37] uppercase tracking-wider">
                      Selected: {giftWrapOption.name} ({giftWrapOption.price === 0 ? "Free" : `+Tk ${giftWrapOption.price}`})
                    </span>
                  )}
                </div>

                {/* How We Pack Showcase Hero */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-white dark:bg-[#182019] p-4 border border-[#E5E0D8] dark:border-[#2C362B]">
                  <div className="sm:col-span-4 relative aspect-[16/10] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop"
                      alt="Signature Atelier Packaging"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="sm:col-span-8 space-y-1.5 text-[12.5px] leading-relaxed">
                    <p className="font-bold text-[#111111] dark:text-white uppercase tracking-wider text-[11.5px]">
                      Our Signature Packing Standard
                    </p>
                    <p className="text-[#555555] dark:text-[#9BA59A]">
                      Every Keen Chit creation is nestled inside tissue, tied with cotton twill ribbon, and sealed with our wax insignia inside a rigid keepsake linen box.
                    </p>
                  </div>
                </div>

                {/* Wrapping Paper Selector (SS 4 Layout) */}
                <div className="space-y-3">
                  <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#111111] dark:text-[#E2E8E0]">
                    Select a Wrapping Paper Below
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {GIFT_WRAP_OPTIONS.map((wrap) => {
                      const isSelected = giftWrapOption?.id === wrap.id;
                      return (
                        <div
                          key={wrap.id}
                          onClick={() => setGiftWrapOption(wrap)}
                          className={`cursor-pointer group relative p-2.5 border transition-all ${
                            isSelected
                              ? "border-[#111111] dark:border-[#D4AF37] bg-white dark:bg-[#1E281F] shadow-sm ring-1 ring-[#111111] dark:ring-[#D4AF37]"
                              : "border-[#E5E0D8] dark:border-[#2C362B] bg-white/70 dark:bg-[#161E17] hover:border-[#111111] dark:hover:border-[#9BA59A]"
                          }`}
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden mb-2 bg-[#F5F2EB] dark:bg-[#1A231C]">
                            <Image
                              src={wrap.image}
                              alt={wrap.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#111111] dark:bg-[#D4AF37] text-white dark:text-[#111111] flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                          <p className="text-[11.5px] font-semibold text-[#111111] dark:text-[#F5F5F0] leading-tight line-clamp-1">
                            {wrap.name}
                          </p>
                          <p className="text-[11px] font-sans font-medium text-[#666666] dark:text-[#A0A89F] mt-0.5">
                            {wrap.price === 0 ? "Complimentary" : `+Tk ${wrap.price}`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Handwritten Calligraphy Note */}
                <div className="space-y-2 pt-2">
                  <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#111111] dark:text-[#E2E8E0]">
                    Personalized Handwritten Gift Note (Optional)
                  </label>
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    rows={2}
                    maxLength={180}
                    placeholder="Write your bespoke message to be handwritten in gold ink on cotton cardstock..."
                    className="w-full text-[13px] p-3 bg-white dark:bg-[#151D16] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] placeholder-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37] resize-none"
                  />
                  <p className="text-[11px] text-[#777777] dark:text-[#8E998B] text-right">
                    {giftNote.length}/180 characters
                  </p>
                </div>
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] border-b border-[#111111] dark:border-[#D4AF37] pb-1 text-[#111111] dark:text-[#F5F5F0] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
                >
                  ← CONTINUE SHOPPING
                </Link>
              </div>

              {/* "YOU MAY ALSO LIKE" SECTION (Homepage 4-Card Matching Style) */}
              <div className="pt-8 space-y-6 border-t border-[#EAE6DE] dark:border-[#263124]">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-[0.14em] text-[#111111] dark:text-[#FFFFFF]">
                    YOU MAY ALSO LIKE
                  </h3>
                  <span className="text-[12px] text-[#777777] dark:text-[#8E998B]">
                    Complementary Atelier Pairings
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="group flex flex-col bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F2EB] dark:bg-[#1A231C]">
                        <Image
                          src={rec.primaryImage}
                          alt={rec.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <button
                            onClick={() => addToCart(rec, rec.sizes[0] || '18" × 18"', rec.colors[0], 1, false)}
                            className="w-full py-2 bg-white text-[#111111] text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#111111] hover:text-white transition-all shadow-md"
                          >
                            + ADD TO BAG
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3.5 space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#777777] dark:text-[#8E998B] line-clamp-1">
                          {rec.category}
                        </p>
                        <h4 className="text-[12.5px] font-semibold text-[#111111] dark:text-[#FFFFFF] truncate">
                          {rec.name}
                        </h4>
                        <p className="text-[13px] font-sans font-medium text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                          Tk {rec.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Sticky Order Summary - SS 4 Benchmark) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
              {/* Quick Top Checkout Button (SS 2 Gold) */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-3.5 text-[12.5px] font-bold tracking-[0.18em] uppercase bg-[#D4AF37] hover:bg-[#E5C04E] text-[#0E1410] dark:bg-[#D4AF37] dark:hover:bg-[#E5C04E] dark:text-[#0E1410] transition-all duration-300 shadow-md font-sans active:scale-[0.99]"
              >
                CHECKOUT
              </button>

              <div className="bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-6 sm:p-7 space-y-6 shadow-sm">
                <h2 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.16em] text-[#111111] dark:text-[#F5F5F0] border-b border-[#EAE6DE] dark:border-[#263124] pb-4">
                  ORDER SUMMARY
                </h2>

                {/* Privilege Voucher Input */}
                <div className="space-y-2">
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Apply Voucher / Gift Card"
                      className="flex-1 text-[12.5px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] placeholder-[#888888] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase border border-[#111111] dark:border-[#4B5E45] text-[#111111] dark:text-[#E2E8E0] hover:bg-[#111111] hover:text-white dark:hover:bg-[#1E281F] transition-all"
                    >
                      APPLY
                    </button>
                  </form>

                  {couponMsg && (
                    <p
                      className={`text-[11.5px] ${
                        couponMsg.isError
                          ? "text-[#DC2626] dark:text-[#F87171]"
                          : "text-[#10B981] dark:text-[#34D399]"
                      }`}
                    >
                      {couponMsg.text}
                    </p>
                  )}

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-[11.5px] bg-[#FAF9F5] dark:bg-[#182119] p-2 border border-[#E5E0D8] dark:border-[#2C362B]">
                      <span className="font-mono text-[#111111] dark:text-[#D4AF37] font-medium">
                        ✨ {appliedCoupon} (10% Courtesy)
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-[#888888] hover:text-[#DC2626] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Itemized Calculations (SS 4 Layout) */}
                <div className="space-y-3.5 text-[13.5px] border-t border-[#EAE6DE] dark:border-[#263124] pt-5">
                  <div className="flex justify-between items-center text-[#555555] dark:text-[#A0A89F]">
                    <span>Subtotal</span>
                    <span className="font-sans font-medium text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                      Tk {subtotal.toLocaleString()}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-[#10B981] dark:text-[#34D399]">
                      <span>Privilege Courtesy</span>
                      <span className="font-sans font-medium tabular-nums">
                        -Tk {discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[#555555] dark:text-[#A0A89F]">
                    <span className="flex items-center gap-1.5">
                      Gift Packaging
                      {giftWrapOption && <span className="text-[11px]">({giftWrapOption.name})</span>}
                    </span>
                    <span className="font-sans font-medium text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                      {giftWrapPrice === 0 ? "Complimentary" : `Tk ${giftWrapPrice.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[#555555] dark:text-[#A0A89F]">
                      <span>Shipping</span>
                      <span className="font-sans font-medium text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                        {isFreeShipping ? "FREE" : `Tk ${shippingFee.toLocaleString()}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777777] dark:text-[#8E998B] leading-tight">
                      Standard Shipping: within 3-4 days inside Dhaka and 4-7 days outside Dhaka
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[#555555] dark:text-[#A0A89F]">
                    <span>VAT (15% Included)</span>
                    <span className="font-sans font-medium text-[#111111] dark:text-[#F5F5F0] tabular-nums">
                      Included
                    </span>
                  </div>

                  {/* Grand Total */}
                  <div className="flex justify-between items-baseline pt-4 border-t border-[#EAE6DE] dark:border-[#263124]">
                    <span className="text-[15px] font-bold uppercase tracking-[0.08em] text-[#111111] dark:text-white">
                      Total
                    </span>
                    <span className="font-sans font-bold text-xl text-[#111111] dark:text-white tabular-nums">
                      Tk {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Delivery Option Notice (SS 4 Benchmark) */}
                <div className="bg-[#FAF9F5] dark:bg-[#182119] p-3.5 border border-[#E5E0D8] dark:border-[#2C362B] text-[12px] text-[#555555] dark:text-[#A0A89F] leading-relaxed">
                  <p className="font-medium text-[#111111] dark:text-[#E2E8E0] mb-0.5">
                    Express Delivery Available
                  </p>
                  Express delivery within 24 to 48 hours available for Dhaka City. Select option on next screen.
                </div>

                {/* Primary Proceed CTA (SS 2 Gold) */}
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 text-[12.5px] font-bold tracking-[0.18em] uppercase bg-[#D4AF37] hover:bg-[#E5C04E] text-[#0E1410] dark:bg-[#D4AF37] dark:hover:bg-[#E5C04E] dark:text-[#0E1410] transition-all duration-300 flex items-center justify-center gap-2 shadow-md font-sans active:scale-[0.99]"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

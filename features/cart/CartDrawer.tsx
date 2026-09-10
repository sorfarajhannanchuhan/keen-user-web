"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Truck, Sparkles } from "lucide-react";
import { useCart } from "./CartContext";
import { useLanguage } from "@/features/navigation";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { t, isBangla } = useLanguage();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError?: boolean } | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">("inside");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [assignedOrderNumber, setAssignedOrderNumber] = useState("");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3000;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryCharge = isFreeShipping ? 0 : deliveryArea === "inside" ? 80 : 150;
  const grandTotal = Math.max(0, subtotal - discountAmount) + deliveryCharge;

  // Build WhatsApp order message
  const generateWhatsAppUrl = () => {
    let message = `Hello KEEN CHIT Atelier,%0A%0AI would like to place an order:%0A`;
    cart.forEach((item, idx) => {
      message += `%0A${idx + 1}. ${encodeURIComponent(item.product.name)}%0A   - Size: ${encodeURIComponent(item.selectedSize)}%0A   - Color: ${encodeURIComponent(item.selectedColor.name)}%0A   - Quantity: ${item.quantity}%0A   - Price: ৳${(item.product.price * item.quantity).toLocaleString()}%0A`;
    });
    message += `%0ASubtotal: ৳${subtotal.toLocaleString()}%0A`;
    if (appliedCoupon && discountAmount > 0) {
      message += `Atelier Privilege Voucher (${appliedCoupon}): -৳${discountAmount.toLocaleString()}%0A`;
    }
    message += `Delivery: ${deliveryCharge === 0 ? "Free White-Glove" : `৳${deliveryCharge}`}%0A`;
    message += `Estimated Total: ৳${grandTotal.toLocaleString()}%0A`;
    if (customerName) message += `Customer Name: ${encodeURIComponent(customerName)}%0A`;
    if (customerPhone) message += `Phone: ${encodeURIComponent(customerPhone)}%0A`;
    if (customerAddress) message += `Address: ${encodeURIComponent(customerAddress)}%0A`;
    message += `%0APlease confirm my order. Thank you!`;

    return `https://wa.me/8801700000000?text=${message}`;
  };

  const handleCompleteCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const orderItems = cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        size: item.selectedSize,
        color: item.selectedColor.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerAddress,
          deliveryArea,
          subtotal,
          deliveryCharge,
          totalAmount: grandTotal,
          paymentMethod: "Cash on Delivery",
          items: orderItems,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAssignedOrderNumber(data.orderNumber || "KC-ORDER-CONFIRMED");
      }
    } catch (err) {
      console.error("Failed to save order to database:", err);
    } finally {
      setIsSubmittingOrder(false);
      setOrderPlaced(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-linen shadow-2xl flex flex-col border-l border-brand-sand text-brand-charcoal">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-brand-sand flex items-center justify-between bg-brand-linen-dark">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <h3 className="font-jost text-xl font-semibold text-brand-charcoal uppercase tracking-wider">
                {t("cartTitle")} ({totalItems})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="bg-brand-linen-dark px-6 py-3 border-b border-brand-sand text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBangla ? "আপনি সারা বাংলাদেশে ফ্রি হোম ডেলিভারির জন্য যোগ্য!" : "You qualify for Complimentary Delivery across Bangladesh!"}</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-stone-300">
                  <span>
                    {isBangla
                      ? `আর ৳${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} যোগ করলেই ফ্রি ডেলিভারি!`
                      : `Add ৳${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more for free delivery`}
                  </span>
                  <span className="text-brand-gold font-semibold">{Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%</span>
                </div>
                <div className="w-full bg-[#233026] h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-gold h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h4 className="font-jost text-xl text-brand-charcoal font-medium">
                  {t("cartEmpty")}
                </h4>
                <p className="text-xs text-brand-charcoal-muted mt-1 max-w-xs font-normal">
                  {isBangla
                    ? "আপনার পছন্দের লিনেন ও ভেলভেট কুশন নির্বাচন করে ঘর সাজানো শুরু করুন।"
                    : "Explore our artisanal linen & velvet cushion edits to begin curating your living space."}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-3 bg-brand-gold text-[#0E1410] text-xs uppercase tracking-widest font-bold hover:bg-brand-gold-hover transition-colors font-jost cursor-pointer"
                >
                  {isBangla ? "কুশন কালেকশন দেখুন" : "Explore Cushion Edit"}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  className="flex gap-4 pb-4 border-b border-brand-sand group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-brand-linen-dark/80 shrink-0 border border-brand-sand overflow-hidden">
                    <Image
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h5 className="font-brandon-text text-base text-brand-charcoal font-bold leading-snug">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="text-stone-400 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                        <span>{isBangla ? "সাইজ" : "Size"}: {item.selectedSize}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-stone-600"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-brand-sand bg-brand-linen-dark">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          className="p-1 hover:bg-stone-800 text-stone-300 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-brand-charcoal">
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
                          className="p-1 hover:bg-stone-800 text-stone-300 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-sans text-sm font-semibold text-brand-gold">
                        ৳{(item.product.price * item.quantity).toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Options */}
          {cart.length > 0 && (
            <div className="p-6 bg-brand-linen-dark border-t border-brand-sand space-y-4">
              <div className="space-y-2 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span className="font-sans">{t("cartSubtotal")}</span>
                  <span className="font-sans text-base font-semibold text-brand-charcoal">
                    ৳{subtotal.toLocaleString("en-BD")}
                  </span>
                </div>

                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-[#E07A5F] font-medium">
                    <span>{isBangla ? `প্রিভিলেজ ছাড় (${appliedCoupon})` : `Privilege Courtesy (${appliedCoupon})`}</span>
                    <span>-৳{discountAmount.toLocaleString("en-BD")}</span>
                  </div>
                )}

                <div className="flex justify-between text-[11px]">
                  <span>{t("cartDelivery")}</span>
                  <span>{isFreeShipping ? t("cartDeliveryFree") : (isBangla ? "অর্ডার কনফার্ম করার সময় নির্ধারিত হবে" : "Calculated at checkout (৳80 - ৳150)")}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-brand-sand/50 font-semibold text-sm text-brand-charcoal">
                  <span>{isBangla ? "সর্বমোট" : "Estimated Total"}</span>
                  <span className="text-brand-gold font-sans text-base">
                    ৳{grandTotal.toLocaleString("en-BD")}
                  </span>
                </div>
              </div>

              {/* Atelier Privilege / Coupon Section */}
              <div className="pt-2 border-t border-brand-sand/40">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 bg-brand-gold/10 border border-brand-gold/40 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      <span className="font-semibold text-brand-gold font-mono">{appliedCoupon}</span>
                      <span className="text-stone-300 text-[11px]">(10% Privilege Applied)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#E07A5F]">-৳{discountAmount.toLocaleString("en-BD")}</span>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-red-400 p-0.5"
                        title="Remove coupon"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder={isBangla ? "ভাউচার কোড (e.g. KEEN10)" : "Privilege Code (e.g. KEEN10)"}
                        className="flex-1 bg-black/40 border border-brand-sand/60 px-2.5 py-1.5 text-xs text-white placeholder-stone-400 uppercase font-mono focus:border-brand-gold focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!couponInput.trim()) return;
                          const res = applyCoupon(couponInput);
                          setCouponMsg({ text: res.message, isError: !res.success });
                          if (res.success) setCouponInput("");
                          setTimeout(() => setCouponMsg(null), 3000);
                        }}
                        className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] text-[11px] uppercase font-bold tracking-wider cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMsg && (
                      <div className={`text-[10.5px] ${couponMsg.isError ? "text-red-400" : "text-emerald-400"}`}>
                        {couponMsg.text}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                {/* Instant WhatsApp Order */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-sm"
                >
                  <span>{t("cartCheckoutWhatsApp")}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Direct Checkout */}
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] py-3.5 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-luxury cursor-pointer"
                >
                  <span>{isBangla ? "অর্ডার কনফার্ম করতে এগিয়ে যান" : "Proceed to Delivery & Payment"}</span>
                </button>
              </div>

              {/* 3 Luxury Trust Badges */}
              <div className="pt-2 border-t border-brand-sand/60 grid grid-cols-3 gap-2 text-center select-none">
                <div className="flex flex-col items-center justify-center p-1.5 rounded-sm bg-brand-linen/40 dark:bg-stone-900/40 border border-brand-sand/40">
                  <Truck className="w-3.5 h-3.5 text-brand-gold mb-1" />
                  <span className="text-[9.5px] font-sans text-stone-600 dark:text-stone-300 font-medium leading-tight">
                    {isBangla ? "সারাদেশে ক্যাশ অন ডেলিভারি" : "Cash on Delivery"}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-1.5 rounded-sm bg-brand-linen/40 dark:bg-stone-900/40 border border-brand-sand/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold mb-1" />
                  <span className="text-[9.5px] font-sans text-stone-600 dark:text-stone-300 font-medium leading-tight">
                    {isBangla ? "৭ দিনের কোয়ালিটি গ্যারান্টি" : "Quality Guarantee"}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-1.5 rounded-sm bg-brand-linen/40 dark:bg-stone-900/40 border border-brand-sand/40">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold mb-1" />
                  <span className="text-[9.5px] font-sans text-stone-600 dark:text-stone-300 font-medium leading-tight">
                    {isBangla ? "১০০% খাঁটি ফেব্রিক" : "100% Pure Fibers"}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-linen-dark max-w-lg w-full p-6 sm:p-8 border border-brand-sand shadow-2xl relative max-h-[90vh] overflow-y-auto text-brand-charcoal">
            <button
              onClick={() => {
                setCheckoutModalOpen(false);
                setOrderPlaced(false);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {orderPlaced ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-jost text-2xl text-brand-charcoal font-medium">
                  Thank You, Your Order is Confirmed!
                </h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto font-sans">
                  Our concierge will contact you at <strong>{customerPhone}</strong> within a few hours to schedule your white-glove delivery.
                </p>
                <div className="p-4 bg-brand-linen-dark border border-brand-sand text-left text-xs space-y-1.5 my-4 font-sans">
                  {assignedOrderNumber && (
                    <div className="flex items-center justify-between pb-1.5 border-b border-brand-sand">
                      <span className="font-semibold text-stone-300">Order Reference:</span>
                      <span className="font-mono font-bold text-xs text-brand-gold bg-black/60 px-2 py-0.5 border border-brand-sand">{assignedOrderNumber}</span>
                    </div>
                  )}
                  <div className="font-semibold text-brand-gold pt-1">Delivery Summary:</div>
                  <div>Recipient: {customerName}</div>
                  <div>Address: {customerAddress}</div>
                  <div>Estimated Total: ৳{grandTotal.toLocaleString("en-BD")} (Cash on Delivery)</div>
                </div>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setIsCartOpen(false);
                    setOrderPlaced(false);
                  }}
                  className="px-8 py-3 bg-brand-gold text-[#0E1410] text-xs uppercase tracking-widest font-bold hover:bg-brand-gold-hover font-jost"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <form onSubmit={handleCompleteCheckout} className="space-y-5">
                <div>
                  <span className="font-jost text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-1">
                    KEEN CHIT ATELIER CONCIERGE
                  </span>
                  <h3 className="font-jost text-2xl text-brand-charcoal font-medium">
                    Delivery Details
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Ahmed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-brand-linen-dark/80 border border-brand-sand px-3 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01700-000000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-brand-linen-dark/80 border border-brand-sand px-3 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House, Road, Area (e.g. House 14, Road 7, Gulshan-2, Dhaka)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-brand-linen-dark/80 border border-brand-sand px-3 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                      Delivery Destination
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryArea("inside")}
                        className={`p-3 text-left border ${
                          deliveryArea === "inside"
                            ? "border-[#D4AF37] bg-[#1E1E24]"
                            : "border-brand-sand bg-brand-linen-dark"
                        }`}
                      >
                        <div className="font-semibold text-white">Inside Dhaka</div>
                        <div className="text-[11px] text-stone-400">
                          {isFreeShipping ? "Free" : "৳80 (1-2 Days)"}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryArea("outside")}
                        className={`p-3 text-left border ${
                          deliveryArea === "outside"
                            ? "border-[#D4AF37] bg-[#1E1E24]"
                            : "border-brand-sand bg-brand-linen-dark"
                        }`}
                      >
                        <div className="font-semibold text-white">Outside Dhaka</div>
                        <div className="text-[11px] text-stone-400">
                          {isFreeShipping ? "Free" : "৳150 (2-4 Days)"}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-linen-dark border border-brand-sand space-y-1.5">
                    <div className="flex justify-between text-stone-300">
                      <span>Subtotal:</span>
                      <span>৳{subtotal.toLocaleString("en-BD")}</span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Delivery Charge:</span>
                      <span>{deliveryCharge === 0 ? "FREE" : `৳${deliveryCharge}`}</span>
                    </div>
                    <div className="flex justify-between font-sans text-base font-bold text-brand-gold pt-1 border-t border-brand-sand">
                      <span>Total Due (Cash on Delivery):</span>
                      <span>৳{grandTotal.toLocaleString("en-BD")}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className="w-full bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] py-3.5 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-luxury disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingOrder ? "Confirming..." : "Confirm Order via Cash on Delivery"}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

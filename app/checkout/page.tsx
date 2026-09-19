"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  ArrowLeft,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  ShoppingBag,
  Gift,
  HelpCircle,
} from "lucide-react";
import { useCart } from "@/features/cart";

const BANGLADESH_DISTRICTS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Gazipur",
  "Narayanganj",
  "Bogra",
  "Cox's Bazar",
  "Jessore",
  "Feni",
  "Brahmanbaria",
  "Tangail",
  "Dinajpur",
  "Kushtia",
  "Pabna",
  "Faridpur",
  "Noakhali",
  "Jamalpur",
  "Manikganj",
  "Munshiganj",
  "Narsingdi",
  "Sunamganj",
  "Habiganj",
  "Moulvibazar",
  "Natore",
  "Naogaon",
  "Chapainawabganj",
  "Sirajganj",
  "Joypurhat",
  "Bagerhat",
  "Satkhira",
  "Jhenaidah",
  "Magura",
  "Narail",
  "Chuadanga",
  "Meherpur",
  "Patuakhali",
  "Bhola",
  "Pirojpur",
  "Jhalokati",
  "Barguna",
  "Panchagarh",
  "Thakurgaon",
  "Nilphamari",
  "Lalmonirhat",
  "Kurigram",
  "Gaibandha",
  "Sherpur",
  "Netrokona",
  "Kishoreganj",
  "Gopalganj",
  "Madaripur",
  "Rajbari",
  "Shariatpur",
  "Chandpur",
  "Lakshmipur",
  "Khagrachhari",
  "Rangamati",
  "Bandarban",
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discountAmount,
    appliedCoupon,
    giftWrapOption,
    giftNote,
    giftWrapPrice,
    grandTotal,
    clearCart,
  } = useCart();

  // Form State
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [cityThana, setCityThana] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Delivery Speed
  const [shippingSpeed, setShippingSpeed] = useState<"standard" | "express">("standard");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "card" | "bank">("cod");
  const [trxId, setTrxId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  // Agreement & Submitting
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const FREE_SHIPPING_THRESHOLD = 3000;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const standardShippingFee = isFreeShipping ? 0 : 100;
  const expressShippingFee = 160;
  const activeShippingFee = shippingSpeed === "express" ? expressShippingFee : standardShippingFee;
  const checkoutTotal = grandTotal + activeShippingFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!fullName.trim()) {
      setValidationError("Please enter your full name.");
      return;
    }
    if (!phoneNumber.trim()) {
      setValidationError("Please enter a valid phone number for courier delivery.");
      return;
    }
    if (!streetAddress.trim()) {
      setValidationError("Please enter your street address / house details.");
      return;
    }
    if (paymentMethod === "bkash" && !trxId.trim()) {
      setValidationError("Please enter the bKash/Nagad Transaction ID (TrxID) after completing payment.");
      return;
    }
    if (!agreedTerms) {
      setValidationError("Please accept the terms and conditions to proceed.");
      return;
    }

    setIsSubmitting(true);

    const generatedOrderNumber = `KC-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderPayload = {
      orderNumber: generatedOrderNumber,
      customerName: fullName.trim(),
      customerPhone: phoneNumber.trim(),
      customerEmail: email.trim() || undefined,
      customerAddress: `${streetAddress.trim()}${apartment ? `, ${apartment.trim()}` : ""}, ${cityThana ? `${cityThana.trim()}, ` : ""}${district}${postalCode ? ` - ${postalCode.trim()}` : ""}`,
      deliveryArea: district.toLowerCase() === "dhaka" ? "inside" : "outside",
      shippingSpeed: shippingSpeed === "express" ? "Express (24-48h)" : "Standard (3-5 days)",
      subtotal,
      deliveryCharge: activeShippingFee,
      discountAmount,
      appliedCoupon,
      giftWrap: giftWrapOption ? { name: giftWrapOption.name, price: giftWrapOption.price, note: giftNote } : null,
      totalAmount: checkoutTotal,
      paymentMethod:
        paymentMethod === "cod"
          ? "Cash on Delivery"
          : paymentMethod === "bkash"
          ? `bKash / Nagad (TrxID: ${trxId})`
          : paymentMethod === "card"
          ? "Credit / Debit Card"
          : "Direct Bank Wire",
      notes: orderNotes.trim() || "",
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        size: item.selectedSize,
        color: item.selectedColor.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      // Post to local API route
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.warn("Could not sync with /api/orders, keeping local confirmation", err);
    }

    setConfirmedOrderNumber(generatedOrderNumber);
    setOrderSuccess(true);
    clearCart();
    setIsSubmitting(false);
  };

  // ORDER SUCCESS CONFIRMATION VIEW
  if (orderSuccess) {
    const waText = encodeURIComponent(
      `Hello KEEN CHIT Atelier,%0A%0AMy order ${confirmedOrderNumber} has been placed.%0ACustomer: ${fullName}%0APhone: ${phoneNumber}%0ATotal: ৳${checkoutTotal.toLocaleString()}%0A%0APlease confirm my order.`
    );
    const waUrl = `https://wa.me/8801700000000?text=${waText}`;

    return (
      <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0E1410] text-[#111111] dark:text-[#F5F5F0] py-16 px-4">
        <div className="max-w-xl mx-auto bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-8 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F0] dark:bg-[#1C251D] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#888888] dark:text-[#9BA59A]">
              ATELIER ORDER CONFIRMED
            </p>
            <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-[#111111] dark:text-white">
              Thank You, {fullName}
            </h1>
            <p className="text-[14px] text-[#555555] dark:text-[#A0A89F] leading-relaxed">
              Your bespoke order has been recorded. Our master artisans are preparing your pieces for white-glove packaging.
            </p>
          </div>

          <div className="bg-[#FAF9F5] dark:bg-[#182119] p-4 border border-[#E5E0D8] dark:border-[#2C362B] text-[13px] text-left space-y-2">
            <div className="flex justify-between border-b border-[#EAE6DE] dark:border-[#263124] pb-2">
              <span className="text-[#666666] dark:text-[#9BA59A]">Order Number:</span>
              <span className="font-mono font-bold text-[#111111] dark:text-white">{confirmedOrderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE6DE] dark:border-[#263124] pb-2">
              <span className="text-[#666666] dark:text-[#9BA59A]">Payment Method:</span>
              <span className="font-medium text-[#111111] dark:text-white">
                {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#EAE6DE] dark:border-[#263124] pb-2">
              <span className="text-[#666666] dark:text-[#9BA59A]">Estimated Delivery:</span>
              <span className="font-medium text-[#111111] dark:text-white">
                {shippingSpeed === "express" ? "24 to 48 Hours" : "3 to 5 Business Days"}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold text-[#111111] dark:text-white">Total Amount:</span>
              <span className="font-sans font-bold text-[15px] text-[#111111] dark:text-white">
                Tk {checkoutTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Direct WhatsApp Concierge Button */}
          <div className="space-y-3 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 text-[12px] font-bold tracking-[0.16em] uppercase bg-[#1B2418] text-white hover:bg-[#D4AF37] hover:text-[#0E1410] transition-all"
            >
              CONFIRM VIA WHATSAPP CONCIERGE
            </a>

            <Link
              href="/"
              className="block w-full py-3 text-[12px] font-bold tracking-[0.16em] uppercase border border-[#111111] dark:border-[#4B5E45] text-[#111111] dark:text-[#E2E8E0] hover:bg-[#FAF9F5] dark:hover:bg-[#1C251D] transition-all"
            >
              RETURN TO HOME SANCTUARY
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // REDIRECT TO CART IF EMPTY
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0E1410] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <ShoppingBag className="w-12 h-12 mx-auto text-[#888888]" />
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Your shopping bag is empty
          </h2>
          <p className="text-[13px] text-[#666666] dark:text-[#9BA59A]">
            Please add items to your shopping bag before proceeding to checkout.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 text-[11.5px] font-bold uppercase tracking-widest bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#0E1410] transition-all"
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#0E1410] text-[#111111] dark:text-[#F5F5F0] transition-colors py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Distraction-Free Header */}
        <div className="flex items-center justify-between border-b border-[#EAE6DE] dark:border-[#263124] pb-5 mb-8 sm:mb-12">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#666666] hover:text-[#111111] dark:text-[#9BA59A] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO BAG</span>
          </Link>

          <div className="text-center">
            <span className="text-[15px] sm:text-[17px] font-bold tracking-[0.22em] uppercase text-[#111111] dark:text-white">
              KEEN CHIT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#666666] dark:text-[#9BA59A] uppercase">
            <Lock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>256-BIT SSL SECURE</span>
          </div>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="mb-6 p-4 bg-[#FEE2E2] dark:bg-[#451A1A] border border-[#FCA5A5] dark:border-[#7F1D1D] text-[#B91C1C] dark:text-[#FCA5A5] text-[13px] font-medium flex items-center justify-between animate-shake">
            <span>{validationError}</span>
            <button onClick={() => setValidationError(null)} className="text-[12px] underline ml-4">
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Shipping & Payment Flow */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Contact & Delivery Address */}
            <div className="bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#EAE6DE] dark:border-[#263124] pb-4">
                <span className="w-7 h-7 rounded-full bg-[#111111] text-white dark:bg-[#EAE6DE] dark:text-[#111111] text-[12px] font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.16em] text-[#111111] dark:text-white">
                  SHIPPING & DELIVERY ADDRESS
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    Full Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tanzim Ahmed"
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    Phone Number (BD +880) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="01700-000000"
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanzim@example.com"
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    Street Address & House Details <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="House 24, Road 11, Block D, Banani"
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    Apartment / Suite / Floor (Optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Apt 4B, 4th Floor"
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    District <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  >
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    City / Thana
                  </label>
                  <input
                    type="text"
                    value={cityThana}
                    onChange={(e) => setCityThana(e.target.value)}
                    placeholder="e.g. Gulshan / Dhanmondi"
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="1213"
                    className="w-full text-[13px] px-3.5 py-2.5 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] text-[#111111] dark:text-[#F5F5F0] focus:outline-none focus:border-[#111111] dark:focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Speed Selector */}
            <div className="bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#EAE6DE] dark:border-[#263124] pb-4">
                <span className="w-7 h-7 rounded-full bg-[#111111] text-white dark:bg-[#EAE6DE] dark:text-[#111111] text-[12px] font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.16em] text-[#111111] dark:text-white">
                  DELIVERY SPEED & LOGISTICS
                </h2>
              </div>

              <div className="space-y-3">
                {/* Standard Shipping */}
                <label
                  onClick={() => setShippingSpeed("standard")}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                    shippingSpeed === "standard"
                      ? "border-[#111111] dark:border-[#D4AF37] bg-[#FAF9F5] dark:bg-[#182119] ring-1 ring-[#111111] dark:ring-[#D4AF37]"
                      : "border-[#E5E0D8] dark:border-[#2C362B] hover:border-[#111111]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingSpeed"
                      checked={shippingSpeed === "standard"}
                      onChange={() => setShippingSpeed("standard")}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-[13.5px] font-bold text-[#111111] dark:text-white">
                        Standard White-Glove Atelier Shipping
                      </p>
                      <p className="text-[12px] text-[#666666] dark:text-[#9BA59A]">
                        3–4 business days inside Dhaka, 4–7 days across Bangladesh
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] font-sans font-medium text-[#111111] dark:text-white tabular-nums">
                    {isFreeShipping ? "FREE" : "Tk 100"}
                  </span>
                </label>

                {/* Express Shipping (Dhaka City) */}
                <label
                  onClick={() => setShippingSpeed("express")}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                    shippingSpeed === "express"
                      ? "border-[#111111] dark:border-[#D4AF37] bg-[#FAF9F5] dark:bg-[#182119] ring-1 ring-[#111111] dark:ring-[#D4AF37]"
                      : "border-[#E5E0D8] dark:border-[#2C362B] hover:border-[#111111]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingSpeed"
                      checked={shippingSpeed === "express"}
                      onChange={() => setShippingSpeed("express")}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-[13.5px] font-bold text-[#111111] dark:text-white flex items-center gap-2">
                        <span>Express Atelier Delivery</span>
                        <span className="text-[10.5px] bg-[#111111] text-white dark:bg-[#D4AF37] dark:text-[#111111] px-1.5 py-0.5 rounded-none font-bold uppercase tracking-widest">
                          Dhaka City
                        </span>
                      </p>
                      <p className="text-[12px] text-[#666666] dark:text-[#9BA59A]">
                        Priority dispatch within 24 to 48 hours for immediate interior installations
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] font-sans font-medium text-[#111111] dark:text-white tabular-nums">
                    Tk 160
                  </span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#EAE6DE] dark:border-[#263124] pb-4">
                <span className="w-7 h-7 rounded-full bg-[#111111] text-white dark:bg-[#EAE6DE] dark:text-[#111111] text-[12px] font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.16em] text-[#111111] dark:text-white">
                  PAYMENT GATEWAY
                </h2>
              </div>

              <div className="space-y-3.5">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`block p-4 border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#111111] dark:border-[#D4AF37] bg-[#FAF9F5] dark:bg-[#182119] ring-1 ring-[#111111] dark:ring-[#D4AF37]"
                      : "border-[#E5E0D8] dark:border-[#2C362B] hover:border-[#111111]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <span className="text-[13.5px] font-bold text-[#111111] dark:text-white">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <Banknote className="w-5 h-5 text-[#666666] dark:text-[#9BA59A]" />
                  </div>
                  {paymentMethod === "cod" && (
                    <p className="text-[12px] text-[#666666] dark:text-[#9BA59A] mt-2.5 pl-6 leading-relaxed">
                      Pay with cash upon white-glove doorstep inspection by our dedicated courier.
                    </p>
                  )}
                </label>

                {/* bKash / Nagad Instant Mobile Banking */}
                <label
                  onClick={() => setPaymentMethod("bkash")}
                  className={`block p-4 border cursor-pointer transition-all ${
                    paymentMethod === "bkash"
                      ? "border-[#111111] dark:border-[#D4AF37] bg-[#FAF9F5] dark:bg-[#182119] ring-1 ring-[#111111] dark:ring-[#D4AF37]"
                      : "border-[#E5E0D8] dark:border-[#2C362B] hover:border-[#111111]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "bkash"}
                        onChange={() => setPaymentMethod("bkash")}
                      />
                      <span className="text-[13.5px] font-bold text-[#111111] dark:text-white">
                        bKash / Nagad Instant Mobile Pay
                      </span>
                    </div>
                    <Smartphone className="w-5 h-5 text-[#E11D48]" />
                  </div>

                  {paymentMethod === "bkash" && (
                    <div className="mt-4 pl-6 space-y-3 text-[12.5px] border-t border-[#EAE6DE] dark:border-[#263124] pt-3">
                      <div className="bg-white dark:bg-[#141B15] p-3 border border-[#E5E0D8] dark:border-[#2C362B] space-y-1">
                        <p className="font-semibold text-[#111111] dark:text-white">
                          Atelier Merchant Number: <span className="font-mono text-[#D4AF37]">01700-000000</span>
                        </p>
                        <p className="text-[#666666] dark:text-[#9BA59A] text-[11.5px]">
                          Please Send Money or Make Payment to the number above and enter your Transaction ID below:
                        </p>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] dark:text-[#D5DDD2] mb-1">
                          Transaction ID (TrxID) <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          type="text"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          placeholder="e.g. 9J83KL4P"
                          className="w-full text-[13px] px-3.5 py-2 bg-white dark:bg-[#141B15] border border-[#D5D0C6] dark:border-[#384836] font-mono uppercase focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* Credit / Debit Card */}
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`block p-4 border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-[#111111] dark:border-[#D4AF37] bg-[#FAF9F5] dark:bg-[#182119] ring-1 ring-[#111111] dark:ring-[#D4AF37]"
                      : "border-[#E5E0D8] dark:border-[#2C362B] hover:border-[#111111]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <span className="text-[13.5px] font-bold text-[#111111] dark:text-white">
                        Debit / Credit Card (Visa, MasterCard, AMEX)
                      </span>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#666666] dark:text-[#9BA59A]" />
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-4 pl-6 space-y-3 border-t border-[#EAE6DE] dark:border-[#263124] pt-3 text-[12.5px]">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Name on card"
                          className="w-full text-[13px] px-3.5 py-2 bg-white dark:bg-[#141B15] border border-[#D5D0C6] dark:border-[#384836] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4242 •••• •••• 4242"
                            className="w-full text-[13px] px-3.5 py-2 bg-white dark:bg-[#141B15] border border-[#D5D0C6] dark:border-[#384836] font-mono focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            Expires (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full text-[13px] px-3.5 py-2 bg-white dark:bg-[#141B15] border border-[#D5D0C6] dark:border-[#384836] font-mono focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="•••"
                            className="w-full text-[13px] px-3.5 py-2 bg-white dark:bg-[#141B15] border border-[#D5D0C6] dark:border-[#384836] font-mono focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Step 4: Terms & Delivery Note */}
            <div className="bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#333333] dark:text-[#D5DDD2]">
                  Special Delivery Instructions (Optional)
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={2}
                  placeholder="Gate code, reception drop-off instructions, or concierge timing preferences..."
                  className="w-full text-[13px] p-3 bg-[#FAF9F5] dark:bg-[#182119] border border-[#D5D0C6] dark:border-[#384836] resize-none focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-[12px] text-[#555555] dark:text-[#9BA59A] leading-relaxed">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    I have read and agree to the KEEN CHIT Atelier Terms of Service and White-Glove Care & Inspection Policy.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Review */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-[#141B15] border border-[#EAE6DE] dark:border-[#263124] p-6 sm:p-7 shadow-sm space-y-6">
              <h2 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.16em] text-[#111111] dark:text-white border-b border-[#EAE6DE] dark:border-[#263124] pb-4">
                ORDER REVIEW ({cart.length} {cart.length === 1 ? "PIECE" : "PIECES"})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-[#EAE6DE] dark:divide-[#263124] max-h-64 overflow-y-auto pr-1">
                {cart.map((item, index) => (
                  <div key={index} className="py-3 flex gap-3.5 items-center">
                    <div className="relative w-14 h-16 bg-[#F5F2EB] dark:bg-[#1A231C] border border-[#EAE6DE] dark:border-[#263124] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12.5px] font-semibold text-[#111111] dark:text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#666666] dark:text-[#9BA59A]">
                        Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ""}
                      </p>
                    </div>
                    <span className="font-sans font-medium text-[13px] text-[#111111] dark:text-white tabular-nums">
                      Tk {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Gift Wrap Recap */}
              {giftWrapOption && (
                <div className="bg-[#FAF9F5] dark:bg-[#182119] p-3 border border-[#E5E0D8] dark:border-[#2C362B] text-[12px] space-y-1">
                  <div className="flex justify-between items-center font-semibold text-[#111111] dark:text-white">
                    <span className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5" />
                      Gift Packaging: {giftWrapOption.name}
                    </span>
                    <span>{giftWrapPrice === 0 ? "Complimentary" : `Tk ${giftWrapPrice}`}</span>
                  </div>
                  {giftNote && (
                    <p className="text-[11px] text-[#666666] dark:text-[#9BA59A] italic truncate">
                      "{giftNote}"
                    </p>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 text-[13.5px] border-t border-[#EAE6DE] dark:border-[#263124] pt-4">
                <div className="flex justify-between text-[#555555] dark:text-[#A0A89F]">
                  <span>Subtotal</span>
                  <span className="font-sans font-medium text-[#111111] dark:text-white tabular-nums">
                    Tk {subtotal.toLocaleString()}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#10B981] dark:text-[#34D399]">
                    <span>Privilege Courtesy</span>
                    <span className="font-sans font-medium tabular-nums">
                      -Tk {discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#555555] dark:text-[#A0A89F]">
                  <span>Gift Packaging</span>
                  <span className="font-sans font-medium text-[#111111] dark:text-white tabular-nums">
                    {giftWrapPrice === 0 ? "Complimentary" : `Tk ${giftWrapPrice.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#555555] dark:text-[#A0A89F]">
                  <span>Delivery ({shippingSpeed === "express" ? "Express" : "Standard"})</span>
                  <span className="font-sans font-medium text-[#111111] dark:text-white tabular-nums">
                    {activeShippingFee === 0 ? "FREE" : `Tk ${activeShippingFee.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#555555] dark:text-[#A0A89F]">
                  <span>VAT (15% Included)</span>
                  <span className="font-sans font-medium text-[#111111] dark:text-white tabular-nums">
                    Included
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-[#EAE6DE] dark:border-[#263124]">
                  <span className="text-[15px] font-bold uppercase tracking-[0.08em] text-[#111111] dark:text-white">
                    Total
                  </span>
                  <span className="font-sans font-bold text-2xl text-[#111111] dark:text-white tabular-nums">
                    Tk {checkoutTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA (SS 2 Gold) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-[12.5px] font-bold tracking-[0.18em] uppercase bg-[#D4AF37] hover:bg-[#E5C04E] text-[#0E1410] dark:bg-[#D4AF37] dark:hover:bg-[#E5C04E] dark:text-[#0E1410] transition-all duration-300 disabled:opacity-50 shadow-md font-sans active:scale-[0.99]"
              >
                {isSubmitting ? "PROCESSING ATELIER ORDER..." : `PLACE ORDER — Tk ${checkoutTotal.toLocaleString()}`}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11.5px] text-[#777777] dark:text-[#8E998B]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>KEEN CHIT Atelier Quality Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

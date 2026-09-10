"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, Check, Copy, ArrowRight, MessageSquare, Mail, Gift, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/features/navigation";
import { useCart } from "@/features/cart";

export default function MarketingCampaignModal() {
  const { isBangla } = useLanguage();
  const { applyCoupon, setIsCartOpen } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [contactValue, setContactValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Triggering logic: 3.5s delay on initial visit or force via ?popup=true
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const forceOpen = params.get("popup") === "true" || params.get("modal") === "preview" || params.get("offer") === "10";

    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    const dismissedTime = localStorage.getItem("keenchit_campaign_modal_dismissed");
    const converted = localStorage.getItem("keenchit_campaign_modal_converted");

    if (converted) return; // User already claimed

    if (dismissedTime) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedTime, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return; // Suppress for 7 days
      }
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem("keenchit_campaign_modal_dismissed", Date.now().toString());
    } catch (e) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        localStorage.setItem("keenchit_campaign_modal_converted", "true");
        localStorage.setItem(
          "keenchit_subscriber_info",
          JSON.stringify({
            name: nameValue || "Atelier Guest",
            channel,
            contact: contactValue,
            claimedAt: new Date().toISOString(),
          })
        );
      } catch (e) {}

      // Auto-apply KEEN10 coupon to cart context
      applyCoupon("KEEN10");

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleCopyAndApply = () => {
    applyCoupon("KEEN10");
    if (navigator.clipboard) {
      navigator.clipboard.writeText("KEEN10");
    }
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setIsOpen(false);
      setIsCartOpen(true);
    }, 1200);
  };

  const handleExploreShop = () => {
    setIsOpen(false);
    const collectionEl = document.getElementById("collection");
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal Card Container */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-3xl bg-[#0E1410] border border-brand-sand/50 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[92vh] md:max-h-[580px] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Right Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white hover:text-brand-gold border border-white/20 hover:border-brand-gold flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side / Top Banner: Editorial Visual */}
        <div className="relative w-full md:w-5/12 h-44 sm:h-52 md:h-auto shrink-0 bg-[#141B16] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
            alt="KEEN CHIT Atelier Living Room"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover scale-105 filter brightness-90 contrast-105"
          />
          {/* Subtle atmospheric gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1410] via-transparent to-black/30 md:bg-gradient-to-r md:from-transparent md:to-[#0E1410]/95" />

          {/* Floating Pill on image */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/75 backdrop-blur-md text-brand-gold text-[9.5px] uppercase tracking-[0.2em] font-bold border border-brand-gold/40 shadow-md">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              <span>THE ATELIER REGISTER</span>
            </span>
          </div>

          {/* Bottom quote on image (desktop only) */}
          <div className="hidden md:block absolute bottom-6 left-6 right-6 text-left z-10">
            <p className="text-[12px] text-stone-200 font-serif italic leading-relaxed">
              &ldquo;Mindful tactile comfort sculpted from organic Belgian flax and pure Bengal needlework.&rdquo;
            </p>
            <div className="text-[10px] text-brand-gold font-jost uppercase tracking-[0.2em] pt-1 font-semibold">
              KEEN CHIT • DHAKA
            </div>
          </div>
        </div>

        {/* Right Side: Form & Value Proposition */}
        <div className="flex-1 p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#0E1410] text-stone-100">
          {!isSuccess ? (
            /* STEP 1: LEAD CAPTURE FORM */
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold mb-1">
                  <Gift className="w-3.5 h-3.5" />
                  <span>{isBangla ? "এক্সক্লুসিভ ওয়েলকাম প্রিভিলেজ" : "EXCLUSIVE WELCOME PRIVILEGE"}</span>
                </div>
                <h3 className="font-jost text-2xl sm:text-3xl font-medium text-white tracking-tight leading-tight">
                  {isBangla ? "অভিজাত গৃহসজ্জার বিশেষ আমন্ত্রণ।" : "An Invitation to Refined Living."}
                </h3>
                <p className="font-sans text-xs text-stone-300 font-normal leading-relaxed mt-2">
                  {isBangla
                    ? "আমাদের প্রাইভেট সার্কেলে যুক্ত হোন। আপনার প্রথম হস্তশিল্প কুশন বা পর্দা অর্ডারে উপভোগ করুন ১০% ওয়েলকাম প্রিভিলেজ এবং লিমিটেড টেক্সটাইল ড্রপের আগাম আমন্ত্রণ।"
                    : "Enter our circle of textile connoisseurs. Enjoy an exclusive 10% welcome privilege on your first artisanal cushion or drape order, alongside private previews of limited fabric drops."}
                </p>
              </div>

              {/* Offer Highlight Box */}
              <div className="p-2.5 bg-black/50 border border-brand-sand/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold text-xs">
                    %
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
                      {isBangla ? "১০% বিশেষ ছাড় কোড" : "10% Welcome Courtesy Voucher"}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {isBangla ? "সকল কালেকশনের উপর প্রযোজ্য" : "Valid across all cushions & bespoke curtains"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    applyCoupon("KEEN10");
                    setIsSuccess(true);
                  }}
                  className="font-mono text-xs font-bold text-[#E07A5F] hover:text-white bg-[#E07A5F]/15 hover:bg-[#E07A5F]/30 px-2.5 py-1 border border-[#E07A5F]/40 cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
                  title="Click to claim directly"
                >
                  <span>KEEN10</span>
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                </button>
              </div>

              {/* Channel Selector Toggle */}
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setChannel("whatsapp")}
                    className={`flex-1 py-1.5 px-3 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      channel === "whatsapp"
                        ? "bg-[#1B2920] text-brand-gold border-brand-gold shadow-sm"
                        : "bg-black/30 text-stone-400 border-stone-800 hover:text-stone-200"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp / Phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel("email")}
                    className={`flex-1 py-1.5 px-3 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      channel === "email"
                        ? "bg-[#1B2920] text-brand-gold border-brand-gold shadow-sm"
                        : "bg-black/30 text-stone-400 border-stone-800 hover:text-stone-200"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Email Newsletter</span>
                  </button>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div>
                    <input
                      type={channel === "whatsapp" ? "tel" : "email"}
                      required
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={
                        channel === "whatsapp"
                          ? isBangla ? "আপনার হোয়াটসঅ্যাপ নম্বর (যেমন: 01700-000000)" : "WhatsApp / Mobile (e.g. 01700-000000)"
                          : isBangla ? "আপনার ইমেইল ঠিকানা দিন" : "Enter your email address"
                      }
                      className="w-full bg-black/60 border border-stone-700/80 focus:border-brand-gold px-3.5 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-luxury transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{isBangla ? "প্রসেস হচ্ছে..." : "Preparing Invitation..."}</span>
                    ) : (
                      <>
                        <span>{isBangla ? "১০% প্রিভিলেজ গ্রহণ করুন" : "CLAIM 10% PRIVILEGE"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Guarantee / Dismiss links */}
              <div className="pt-2 flex flex-col items-center gap-1.5 text-center">
                <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                  <ShieldCheck className="w-3 h-3 text-brand-gold" />
                  <span>{isBangla ? "কোনো স্প্যাম নয়। আপনার তথ্য সম্পূর্ণ নিরাপদ।" : "Strictly private. We never share your contact."}</span>
                </div>
                <button
                  onClick={handleClose}
                  className="text-[11px] text-stone-400 hover:text-stone-200 hover:underline transition-colors mt-1 cursor-pointer"
                >
                  {isBangla ? "ছাড় ছাড়া ব্রাউজিং চালিয়ে যান →" : "Continue exploring without discount →"}
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: INSTANT SUCCESS & 1-CLICK APPLY */
            <div className="space-y-5 text-center py-4 my-auto">
              <div className="w-12 h-12 rounded-full bg-brand-gold/15 border border-brand-gold flex items-center justify-center mx-auto text-brand-gold">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <span className="font-jost text-[10px] uppercase tracking-[0.28em] text-brand-gold font-bold block mb-1">
                  {isBangla ? "আমন্ত্রণ সফল হয়েছে" : "WELCOME TO THE ATELIER"}
                </span>
                <h3 className="font-jost text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  {isBangla ? "আপনার ১০% ভাউচার সক্রিয় হয়েছে!" : "Your 10% Privilege is Unlocked!"}
                </h3>
                <p className="text-xs text-stone-300 font-sans max-w-sm mx-auto mt-2 leading-relaxed">
                  {isBangla
                    ? "আপনার প্রথম অর্ডারের জন্য কোডটি প্রস্তুত। নিচের বাটনে ক্লিক করলে কোডটি সরাসরি আপনার শপিং ব্যাগে যুক্ত হয়ে যাবে।"
                    : "Your personal welcome courtesy has been generated. Click below to copy and automatically apply it to your shopping bag."}
                </p>
              </div>

              {/* Revealed Code Box */}
              <div className="p-4 bg-black/60 border border-brand-gold/60 max-w-xs mx-auto flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-jost">
                    Voucher Code
                  </span>
                  <span className="font-mono text-xl font-bold tracking-widest text-brand-gold">
                    KEEN10
                  </span>
                </div>
                <button
                  onClick={handleCopyAndApply}
                  className="px-3 py-1.5 bg-brand-gold/20 hover:bg-brand-gold text-brand-gold hover:text-[#0E1410] text-[11px] uppercase tracking-wider font-semibold border border-brand-gold/50 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? "Applied!" : "Copy"}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 max-w-xs mx-auto pt-2">
                <button
                  onClick={handleCopyAndApply}
                  className="w-full py-3 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-luxury transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{isCopied ? "APPLIED TO BAG!" : "APPLY TO SHOPPING BAG"}</span>
                </button>

                <button
                  onClick={handleExploreShop}
                  className="w-full py-2.5 bg-black/40 hover:bg-black text-stone-300 hover:text-white border border-stone-700 hover:border-brand-gold text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer"
                >
                  {isBangla ? "কুশন কালেকশন দেখুন" : "EXPLORE CUSHIONS ARCHIVE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

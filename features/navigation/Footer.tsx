"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { useFrontendContent } from "@/features/appearance";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const { content } = useFrontendContent();
  const { t, isBangla } = useLanguage();
  const footer = content?.footer;
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() || phone.trim()) {
      setSubscribed(true);
      setEmail("");
      setPhone("");
    }
  };

  return (
    <footer
      style={{ backgroundColor: footer?.bgColor || "#121A14" }}
      className="text-[#EAE4DC] pt-14 md:pt-20 pb-12 border-t border-[#233026]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Editorial Box */}
        <div id="newsletter" className="pb-12 mb-14 border-b border-[#233026]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Clean Headline & Minimal Subtext (Gold Kicker Removed) */}
            <div className="lg:col-span-5 space-y-2">
              <h3 className="font-brandon text-2xl sm:text-3xl font-medium text-white tracking-wide">
                {isBangla ? t("footerNewsletterHeadline") : (footer?.newsletterHeadline || t("footerNewsletterHeadline"))}
              </h3>
              <p className="font-sans text-xs text-stone-400 font-normal leading-relaxed">
                {isBangla ? t("footerNewsletterSubtext") : (footer?.newsletterSubtext || t("footerNewsletterSubtext"))}
              </p>
            </div>

            {/* Right: Dual Subscribe (Email & Phone) */}
            <div className="lg:col-span-7">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 bg-[#18231B] border border-brand-gold/40 text-stone-200 text-xs font-sans">
                  <Check className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>
                    {isBangla
                      ? `কীন চিট অ্যাটেলিয়ারে আপনাকে স্বাগতম। আপনার ১০% প্রিভিলেজ কোড: ${footer?.privilegeCode || "KEEN10"}`
                      : `Welcome to the Keen Chit Atelier. Your 10% privilege code is ${footer?.privilegeCode || "KEEN10"}.`}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder={isBangla ? "ইমেইল অ্যাড্রেস" : "Email address"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#18231B] border border-[#2B3A2E] px-3.5 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-brand-gold font-sans transition-colors"
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      placeholder={isBangla ? "মোবাইল নম্বর (+৮৮০...)" : "Phone number (+880...)"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#18231B] border border-[#2B3A2E] px-3.5 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-brand-gold font-sans transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-brandon bg-[#D4AF37] hover:bg-[#E5C04E] text-[#0E1410] px-7 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all shrink-0 cursor-pointer shadow-md active:scale-95"
                  >
                    {isBangla ? "যুক্ত হোন" : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Editorial Links Grid (Minimal & Clean) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-14 border-b border-stone-800/80">
          
          {/* Brand Col (2 cols span) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 min-w-[32px] min-h-[32px] overflow-hidden rounded-full border border-brand-gold/40 shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="KEEN CHIT Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-brandon text-xl tracking-[0.22em] font-semibold text-white uppercase">
                KEEN CHIT
              </span>
            </div>

            <p className="font-sans text-xs text-stone-400 font-normal leading-relaxed max-w-sm">
              {isBangla
                ? "খাঁটি অর্গানিক ফ্লাক্স লিনেন, ফাইন ভেলভেট এবং বাংলার ঐতিহ্যবাহী সূচিকর্মে বোনা আধুনিক গৃহ সম্ভার।"
                : "Pure organic European flax linen, double-pile velvet, and heirloom Bengal needlework woven for modern sanctuaries."}
            </p>

            <div className="flex items-center space-x-3.5 pt-1 text-stone-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="mailto:atelier@keenchit.com" className="hover:text-brand-gold transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-2.5">
            <h4 className="font-brandon text-xs uppercase tracking-[0.22em] text-white font-semibold">
              {isBangla ? "কালেকশনসমূহ" : "Collections"}
            </h4>
            <ul className="space-y-2 font-sans text-xs text-stone-400 font-normal">
              <li><Link href="/collections?category=linen" className="hover:text-brand-gold transition-colors">{isBangla ? "বেলজিয়ান লিনেন" : "Belgian Linen Edit"}</Link></li>
              <li><Link href="/collections?category=embroidered" className="hover:text-brand-gold transition-colors">{isBangla ? "নকশী এমব্রয়ডারি" : "Nakshi Needlecraft"}</Link></li>
              <li><Link href="/collections?category=velvet" className="hover:text-brand-gold transition-colors">{isBangla ? "ইতালিয়ান ভেলভেট" : "Matte Italian Velvet"}</Link></li>
              <li><Link href="/collections?category=silk" className="hover:text-brand-gold transition-colors">{isBangla ? "মালবেরি সিল্ক" : "Raw Mulberry Silk"}</Link></li>
              <li><Link href="/lookbook" className="hover:text-brand-gold transition-colors">{isBangla ? "লুকবুক রুম কম্বো" : "Curated Lookbook"}</Link></li>
            </ul>
          </div>

          {/* Column 3: The Atelier */}
          <div className="space-y-2.5">
            <h4 className="font-brandon text-xs uppercase tracking-[0.22em] text-white font-semibold">
              {isBangla ? "অ্যাটেলিয়ার" : "The Atelier"}
            </h4>
            <ul className="space-y-2 font-sans text-xs text-stone-400 font-normal">
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">{isBangla ? "কারুশিল্প ও দর্শন" : "Philosophy & Artisans"}</Link></li>
              <li><Link href="/care-guide" className="hover:text-brand-gold transition-colors">{isBangla ? "ফ্যাব্রিক কেয়ার গাইড" : "Fabric Laundering Guide"}</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">{isBangla ? "কাস্টম সাইজ অর্ডার" : "Bespoke Custom Sizes"}</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-gold transition-colors">{isBangla ? "হোম ডেলিভারি" : "White-Glove Shipping"}</Link></li>
            </ul>
          </div>

          {/* Column 4: Concierge & Care */}
          <div className="space-y-2.5">
            <h4 className="font-brandon text-xs uppercase tracking-[0.22em] text-white font-semibold">
              {isBangla ? "কনসিয়ার্জ" : "Concierge"}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <a
                  href={`https://wa.me/${footer?.whatsappNumber || "8801700000000"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-gold-hover hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-brand-gold shrink-0" />
                  <span>{isBangla ? t("footerWhatsAppLabel") : (footer?.whatsappLabel || t("footerWhatsAppLabel"))}</span>
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">{isBangla ? "স্টুডিও অ্যাপয়েন্টমেন্ট" : "Studio Appointments"}</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-gold transition-colors">{isBangla ? "৭ দিনের এক্সচেঞ্জ" : "7-Day Atelier Returns"}</Link></li>
              <li className="text-stone-500 pt-1 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                <span>{isBangla ? t("footerStudioLocation") : (footer?.studioLocation || t("footerStudioLocation"))}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Privacy & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} KEEN CHIT Atelier. {t("footerRights")}</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-stone-400 transition-colors">{isBangla ? "গোপনীয়তা নীতি" : "Privacy Policy"}</Link>
            <Link href="/terms" className="hover:text-stone-400 transition-colors">{isBangla ? "ব্যবহারের শর্তাবলী" : "Terms of Service"}</Link>
            <Link href="/care-guide" className="hover:text-stone-400 transition-colors">{isBangla ? "কেয়ার গাইড" : "Care Guide"}</Link>
            <Link href="/contact" className="hover:text-stone-400 transition-colors">{isBangla ? "যোগাযোগ" : "Bespoke Inquiries"}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

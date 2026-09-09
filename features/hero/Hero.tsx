"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Scissors } from "lucide-react";
import { useAppearance, useFrontendContent } from "@/features/appearance";
import { useTheme, useLanguage } from "@/features/navigation";

export default function Hero() {
  const { theme } = useTheme();
  const { getBarStyles } = useAppearance();
  const { content } = useFrontendContent();
  const { t, isBangla } = useLanguage();
  const isDark = theme === "dark";
  const heroInfoStyles = getBarStyles("heroInfoBar", true);

  const heroImageSrc =
    content?.hero?.image && !content.hero.image.includes("1618221195710")
      ? content.hero.image
      : "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop";
  const posX = content?.hero?.imagePositionX ?? 50;
  const posY = content?.hero?.imagePositionY ?? 50;
  const zoom = content?.hero?.imageZoom ?? 100;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] xl:min-h-screen w-full flex items-center bg-[#0E1410] border-b border-brand-sand overflow-hidden">
      {/* Full-Bleed Background Image with Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImageSrc}
          alt="KEEN CHIT Atelier Minimalist Living Room"
          style={{
            objectPosition: `${posX}% ${posY}%`,
            transform: `scale(${zoom / 100})`,
            transformOrigin: `${posX}% ${posY}%`,
          }}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Double Gradient Overlay */}
        {/* Left-to-right gradient: ensures text readability on left while right side room is visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/20 sm:to-black/5 pointer-events-none" />

        {/* Bottom gradient: seamlessly merges with page canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1410] via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Content Container - Aligned towards Left Side */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-28 flex items-center justify-between relative z-10">
        <div className="max-w-2xl text-left space-y-6 sm:space-y-8 z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0E1410]/80 backdrop-blur-md text-brand-gold text-[11px] uppercase tracking-[0.25em] font-semibold border border-brand-sand">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{isBangla ? t("heroBadge") : "THE 2026 ATELIER COLLECTION"}</span>
          </div>

          {/* Headline */}
          <h1 className="font-jost text-4xl sm:text-6xl lg:text-7xl text-white font-normal sm:font-medium leading-[1.12] tracking-tight">
            {isBangla ? (
              <>
                {t("heroHeadlinePrefix")} <br />
                <span className="italic font-normal text-stone-200">{t("heroHeadlineEmphasis")}</span>
              </>
            ) : (
              <>
                Tactile Poetry For <br />
                <span className="italic font-normal text-stone-200">Mindful Living.</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-xl">
            {isBangla ? (
              t("heroSubtext")
            ) : (
              "Sculpted from stone-washed Belgian flax linen, double-pile Italian velvet, and ancient Bengal Nakshi needlework. Designed to bring character, warmth, and enduring beauty to your sanctuary."
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href={content?.hero?.primaryCtaLink || "/collections"}
              className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] px-8 py-4 text-xs uppercase tracking-[0.22em] font-bold transition-all duration-300 group shadow-luxury hover:shadow-luxury-hover cursor-pointer font-jost"
            >
              <span>{isBangla ? t("heroPrimaryCta") : "EXPLORE CUSHIONS ARCHIVE"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0E1410]" />
            </Link>

            <Link
              href={content?.hero?.secondaryCtaLink && content.hero.secondaryCtaLink !== "/#craftsmanship" ? content.hero.secondaryCtaLink : "/curtains"}
              className="inline-flex items-center justify-center gap-2.5 bg-[#0E1410]/75 hover:bg-[#0E1410] text-white hover:text-brand-gold px-7 py-4 text-xs uppercase tracking-[0.22em] font-semibold border border-brand-sand hover:border-brand-gold backdrop-blur-md transition-all duration-300 font-jost group"
            >
              <Scissors className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover:rotate-12" />
              <span>{isBangla ? "বেস্পোক কার্টেন কনফিগার করুন" : "CONFIGURE BESPOKE CURTAINS"}</span>
            </Link>
          </div>

          {/* Bottom Info Metrics (aligned on the left) */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-6 sm:gap-8 max-w-xl">
            <div>
              <span className="block font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-gold font-semibold">
                {isBangla ? "উৎস" : "ORIGIN"}
              </span>
              <span className="block font-sans text-xs sm:text-sm text-stone-200 font-medium mt-1">
                {isBangla ? "বেলজিয়ান ফ্ল্যাক্স ও সিল্ক" : "Belgian Flax & Silk"}
              </span>
            </div>
            <div>
              <span className="block font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-gold font-semibold">
                {isBangla ? "কারুকাজ" : "NEEDLEWORK"}
              </span>
              <span className="block font-sans text-xs sm:text-sm text-stone-200 font-medium mt-1">
                {isBangla ? "৪০+ ঘণ্টা হস্তশিল্প" : "40+ Hours Artisan"}
              </span>
            </div>
            <div>
              <span className="block font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-gold font-semibold">
                {isBangla ? "ডেলিভারি" : "DELIVERY"}
              </span>
              <span className="block font-sans text-xs sm:text-sm text-stone-200 font-medium mt-1">
                {isBangla ? "হোয়াইট-গ্লাভ ২৪–৪৮ ঘণ্টা" : "White-Glove 24–48h"}
              </span>
            </div>
          </div>
        </div>

        {/* Floating tag on bottom right: subtle luxury tag */}
        <Link
          href={content?.hero?.featuredItemLink || "/collections"}
          style={heroInfoStyles.style}
          className={`hidden lg:flex absolute bottom-8 sm:bottom-12 right-6 sm:right-12 lg:right-16 xl:right-20 ${heroInfoStyles.className} items-center gap-4 px-5 py-3.5 bg-[#0E1410]/80 hover:bg-[#0E1410] backdrop-blur-md border border-white/15 hover:border-brand-gold transition-all duration-300 group shadow-2xl z-10 select-none`}
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold block font-sans">
              {isBangla ? t("heroFeaturedSetBadge") : (content?.hero?.featuredItemBadge || "FEATURED LIVING SET")}
            </span>
            <span className="font-jost text-sm text-stone-100 font-medium tracking-wide group-hover:text-brand-gold transition-colors block">
              {isBangla ? t("heroFeaturedSetTitle") : (content?.hero?.featuredItemTitle || "The Marais Belgian Linen & Velvet Pair")}
            </span>
          </div>
          <div className="pl-4 border-l border-white/15 shrink-0">
            <span className="font-sans text-xs sm:text-sm font-semibold text-brand-gold block">
              {t("priceFromPrefix")} ৳{(content?.hero?.featuredItemPrice || 2450).toLocaleString("en-BD")}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

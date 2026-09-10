"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Scissors, ShieldCheck, Leaf, Feather } from "lucide-react";
import { PRODUCTS, ProductCard } from "@/features/catalog";
import { useLanguage } from "@/features/navigation";
import { ATELIER_CAMPAIGN_DATA, CampaignPrivilegeBanner } from "@/features/marketing";

export default function CampaignPage() {
  const { isBangla } = useLanguage();

  // Curate campaign capsule products
  const capsuleProducts = PRODUCTS.filter((p) =>
    ATELIER_CAMPAIGN_DATA.capsuleProductIds.includes(p.id)
  );

  return (
    <div className="bg-white dark:bg-[#0E1410] min-h-screen text-stone-900 dark:text-stone-100 transition-colors duration-300">
      
      {/* 1. Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-brand-gold transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBangla ? "হোম-এ ফিরুন" : "Return to Home"}</span>
        </Link>
      </div>

      {/* 2. Full-Bleed Luxury Campaign Hero */}
      <section className="relative w-full aspect-[16/8] sm:aspect-[16/7] md:aspect-[21/9] min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src={ATELIER_CAMPAIGN_DATA.heroPosterImage}
          alt="KEEN CHIT Atelier Campaign"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0E1410]/75 backdrop-blur-md text-brand-gold text-[10.5px] uppercase tracking-[0.28em] font-semibold border border-brand-sand">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>
              {isBangla ? ATELIER_CAMPAIGN_DATA.bengaliEyebrow : ATELIER_CAMPAIGN_DATA.eyebrow}
            </span>
          </div>

          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl font-normal leading-tight tracking-tight drop-shadow-xl">
            {isBangla ? "স্পর্শের কবিতা" : ATELIER_CAMPAIGN_DATA.scriptTitle}
          </h1>

          <p className="font-sans text-xs sm:text-sm text-stone-200 font-light tracking-[0.12em] uppercase max-w-xl mx-auto drop-shadow-md">
            {isBangla ? "খাঁটি লিনেন • ইতালীয় ভেলভেট • নকশি সূচিকর্ম" : "Belgian Flax • Italian Velvet • Nakshi Needlework"}
          </p>
        </div>
      </section>

      {/* 3. Automatic 10% Privilege Banner */}
      <CampaignPrivilegeBanner />

      {/* 4. Editorial Manifesto (Minimal 2-sentence atelier note) */}
      <section className="py-14 sm:py-20 border-b border-stone-200/60 dark:border-stone-800/60 bg-stone-50/50 dark:bg-[#121914]">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <span className="font-jost text-[11px] uppercase tracking-[0.32em] text-brand-gold font-semibold block">
            {isBangla ? "আটেলিয়ার ম্যানিফেস্টো" : "ATELIER MANIFESTO"}
          </span>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-800 dark:text-stone-100 font-normal leading-relaxed">
            "{isBangla ? ATELIER_CAMPAIGN_DATA.bengaliLeadCopy : ATELIER_CAMPAIGN_DATA.leadCopy}"
          </p>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto pt-2" />
        </div>
      </section>

      {/* 5. Curated Campaign Capsule Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-jost text-[11px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-2">
            {isBangla ? "ক্যাম্পেইন কালেকশন" : "CAPSULE EDITIONS"}
          </span>
          <h2 className="font-jost text-3xl sm:text-4xl font-medium tracking-tight">
            {isBangla ? "নির্বাচিত আটেলিয়ার ক্রিয়েশন" : "Curated Campaign Pieces"}
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4 mb-4" />
          <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
            {isBangla
              ? "প্রতিটি পিসে স্বয়ংক্রিয়ভাবে ১০% ওয়েলকাম ডিসকাউন্ট প্রযোজ্য।"
              : "Every piece includes your complimentary 10% welcome courtesy privilege applied at bag."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {capsuleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Architectural Lookbook Vignettes */}
      <section className="py-16 sm:py-24 bg-stone-50 dark:bg-[#0B100C] border-y border-stone-200/60 dark:border-stone-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="font-jost text-[11px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-2">
              {isBangla ? "ইন্টেরিয়র লুকবুক" : "STYLED INTERIORS"}
            </span>
            <h2 className="font-jost text-3xl sm:text-4xl font-medium tracking-tight">
              {isBangla ? "আর্কিটেকচারাল স্টাইলিং ভিনিয়েট" : "Curated Room Arrangements"}
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ATELIER_CAMPAIGN_DATA.vignettes.map((vig) => (
              <div
                key={vig.id}
                className="group bg-white dark:bg-[#121814] border border-stone-200/80 dark:border-stone-800 flex flex-col overflow-hidden shadow-xs hover:border-brand-gold/60 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <Image
                    src={vig.image}
                    alt={vig.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-brand-gold font-semibold block mb-1">
                      {vig.palette}
                    </span>
                    <h3 className="font-jost text-lg font-semibold text-stone-900 dark:text-stone-100">
                      {isBangla ? vig.bengaliTitle : vig.title}
                    </h3>
                    <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light mt-2 leading-relaxed">
                      {isBangla ? vig.bengaliDescription : vig.description}
                    </p>
                  </div>

                  <Link
                    href={vig.linkedCategory}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-stone-900 dark:text-stone-200 hover:text-brand-gold transition-colors pt-2 border-t border-stone-100 dark:border-stone-800"
                  >
                    <span>{isBangla ? "এই স্টাইল দেখুন" : "Explore Style"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Craftsmanship & Materiality Pillars */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 border border-stone-200/70 dark:border-stone-800 text-center space-y-3">
            <Leaf className="w-6 h-6 text-brand-gold mx-auto" />
            <h4 className="font-jost text-base font-semibold uppercase tracking-wider">
              {isBangla ? "১০০% খাঁটি বেলজিয়ান লিনেন" : "100% Belgian Organic Flax"}
            </h4>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              {isBangla
                ? "ইউরোপীয় সার্টিফাইড অর্গানিক ফ্ল্যাক্স থেকে বোনা যা ধোয়ার সাথে আরও নরম ও মার্জিত হয়।"
                : "Certified long-staple European flax, stone-washed for enduring softness and tactile breathability."}
            </p>
          </div>

          <div className="p-6 border border-stone-200/70 dark:border-stone-800 text-center space-y-3">
            <Scissors className="w-6 h-6 text-brand-gold mx-auto" />
            <h4 className="font-jost text-base font-semibold uppercase tracking-wider">
              {isBangla ? "ঐতিহ্যবাহী নকশি সূচিকর্ম" : "Ancestral Bengal Needlework"}
            </h4>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              {isBangla
                ? "জামালপুরের অভিজ্ঞ নারী কারিগরদের ৪০+ ঘণ্টার নিপুণ হাতের কাজের সেলাই।"
                : "Each piece translates heirloom botanical motifs with 40+ hours of patient hand-embroidery."}
            </p>
          </div>

          <div className="p-6 border border-stone-200/70 dark:border-stone-800 text-center space-y-3">
            <Feather className="w-6 h-6 text-brand-gold mx-auto" />
            <h4 className="font-jost text-base font-semibold uppercase tracking-wider">
              {isBangla ? "প্রিমিয়াম হাইপোঅ্যালার্জেনিক ইনার" : "Plush Hypoallergenic Inners"}
            </h4>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              {isBangla
                ? "প্রতিটি কুশন কভারের সাথে হাই-লফট মাইক্রোফাইবার ইনার অন্তর্ভুক্ত।"
                : "Includes our high-loft microfiber cushion pad that holds the coveted designer karate chop."}
            </p>
          </div>

        </div>

        {/* Catalog Outro Button */}
        <div className="mt-14 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-[#0E1410] dark:bg-stone-100 text-white dark:text-[#0E1410] font-jost text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 shadow-luxury hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-[#0E1410] transition-colors"
          >
            <span>{isBangla ? "সম্পূর্ণ আর্কাইভ দেখুন (২৪টি পিস)" : "Explore Full Archive (24 Creations)"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}

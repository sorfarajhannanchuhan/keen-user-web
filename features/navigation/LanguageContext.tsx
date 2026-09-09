"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "bn";

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;

  // Announcement Bar
  announcementText: string;
  announcementBadge: string;

  // Nav categories
  navCushions: string;
  navCurtains: string;
  navQuilts: string;
  navShawls: string;
  navAbout: string;
  navContact: string;

  // Search
  searchPlaceholder: string;
  searchFeatured: string;
  popularSearchesTitle: string;
  cardNewArrivalTitle: string;
  cardNewArrivalBadge: string;
  cardNewArrivalDesc: string;
  cardBackInStockTitle: string;
  cardBackInStockBadge: string;
  cardBackInStockDesc: string;
  cardUpcomingTitle: string;
  cardUpcomingBadge: string;
  cardUpcomingDesc: string;

  // Quick filters / popular search tags
  tagPatchwork: string;
  tagCombo: string;
  tagBestSeller: string;
  tagBelgianLinen: string;
  tagItalianVelvet: string;
  tagNakshiKantha: string;

  // Hero section
  heroBadge: string;
  heroHeadlinePrefix: string;
  heroHeadlineEmphasis: string;
  heroSubtext: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroFeaturedSetBadge: string;
  heroFeaturedSetTitle: string;

  // Catalog & Product Card
  catalogArchiveTag: string;
  catalogTitle: string;
  catalogSubtext: string;
  filterAll: string;
  filterLinen: string;
  filterVelvet: string;
  filterEmbroidered: string;
  filterSilk: string;
  filterBestSellers: string;
  sortBy: string;
  priceFromPrefix: string;
  bundlePromoText: string;
  quickView: string;
  addToBag: string;
  inStock: string;
  freeShippingNote: string;

  // Story & Philosophy
  philosophyTag: string;
  storyHeadline: string;
  storySubtext: string;
  promiseBadge: string;
  promiseQuote: string;
  promiseAuthor: string;
  readAtelierStory: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;

  // Cart Slideover
  cartTitle: string;
  cartEmpty: string;
  cartSubtotal: string;
  cartDelivery: string;
  cartDeliveryFree: string;
  cartTotal: string;
  cartPrivilegePrompt: string;
  cartCheckoutWhatsApp: string;
  cartFreeShippingProgress: string;

  // Footer
  footerNewsletterTag: string;
  footerNewsletterHeadline: string;
  footerNewsletterSubtext: string;
  footerPrivilegeCode: string;
  footerWhatsAppLabel: string;
  footerStudioLabel: string;
  footerStudioLocation: string;
  footerRights: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandName: "KEEN CHIT",
    brandTagline: "Artisanal Living & Textiles",

    announcementText: "COMPLIMENTARY WHITE-GLOVE DELIVERY ON ORDERS OVER ৳3,000 ACROSS BANGLADESH",
    announcementBadge: "COMPLIMENTARY",

    navCushions: "Luxury Cushions",
    navCurtains: "Bespoke Curtains",
    navQuilts: "Quilts & Katha",
    navShawls: "Shal & Chador",
    navAbout: "Our Atelier",
    navContact: "Concierge",

    searchPlaceholder: "Search cushions, fabrics, velvet, linen...",
    searchFeatured: "Curated Highlights",
    popularSearchesTitle: "Popular Searches",
    cardNewArrivalTitle: "The 2026 Atelier Cushion Edit",
    cardNewArrivalBadge: "NEW ARRIVAL",
    cardNewArrivalDesc: "Stone-washed flax & double-pile Italian velvet",
    cardBackInStockTitle: "Nakshi Heritage Needlework Pillow",
    cardBackInStockBadge: "BACK IN STOCK",
    cardBackInStockDesc: "Restocked in limited hand-stitched batches",
    cardUpcomingTitle: "Cascading Flax Linen Panels",
    cardUpcomingBadge: "UPCOMING",
    cardUpcomingDesc: "Bespoke ceiling-to-floor drape collection",

    tagPatchwork: "Patchwork Cushions",
    tagCombo: "Bespoke Combos",
    tagBestSeller: "Best Sellers",
    tagBelgianLinen: "Belgian Linen",
    tagItalianVelvet: "Italian Velvet",
    tagNakshiKantha: "Nakshi Kantha",

    heroBadge: "NEW LUXURY ARRIVALS",
    heroHeadlinePrefix: "Architectural Linen.",
    heroHeadlineEmphasis: "Tactile Warmth.",
    heroSubtext:
      "Meticulously tailored from stone-washed Belgian flax, double-pile Italian velvet, and heritage Nakshi threadwork. Designed to transform modern living spaces into calm, tactile sanctuaries.",
    heroPrimaryCta: "Shop Cushions",
    heroSecondaryCta: "Our Craftsmanship",
    heroFeaturedSetBadge: "FEATURED LIVING SET",
    heroFeaturedSetTitle: "The Marais Belgian Linen & Velvet Pair",

    catalogArchiveTag: "THE PERMANENT ARCHIVE",
    catalogTitle: "Signature Cushion Collection",
    catalogSubtext:
      "Crafted in strictly limited atelier batches. Each cushion includes our bespoke down-alternative hypoallergenic inner pad.",
    filterAll: "All Pieces",
    filterLinen: "Belgian Linen",
    filterVelvet: "Italian Velvet",
    filterEmbroidered: "Nakshi Embroidered",
    filterSilk: "Mulberry Silk",
    filterBestSellers: "Best Sellers",
    sortBy: "Sort",
    priceFromPrefix: "From",
    bundlePromoText: "Bundle and Save 10%",
    quickView: "Quick View",
    addToBag: "Add to Bag",
    inStock: "In Stock",
    freeShippingNote: "Free White-Glove Delivery in BD",

    philosophyTag: "OUR PHILOSOPHY",
    storyHeadline: "Crafted Without Compromise,\nRooted in Heritage.",
    storySubtext:
      "At KEEN CHIT, we believe your sanctuary deserves objects made with patience and devotion. In a world saturated with synthetic, fleeting decor, our pieces celebrate the organic warmth of pure natural fibers and human touch.",
    promiseBadge: "OUR PROMISE",
    promiseQuote: "“We don’t produce bulk accessories; we create living room heirlooms that age with dignity.”",
    promiseAuthor: "— Keen Chit Atelier Master Tailor",
    readAtelierStory: "Read The Full Atelier Story",
    pillar1Title: "100% Pure Flax & Silk",
    pillar1Desc: "Only certified organic European linen, Bengal mulberry silk, and handloom khadi cotton touch our cutting tables.",
    pillar2Title: "Empowering Artisans",
    pillar2Desc: "Every hand-stitched Nakshi needlework motif directly supports traditional women craftspeople with dignified living wages.",
    pillar3Title: "Architectural Tailoring",
    pillar3Desc: "Concealed Japanese brass zippers, reinforced interlocking French seams, and perfectly plumb square corners.",
    pillar4Title: "Plush Hypoallergenic Inners",
    pillar4Desc: "Included with every cover: premium high-loft microfiber or duck-feather blend that holds that coveted designer karate chop.",

    cartTitle: "Your Shopping Bag",
    cartEmpty: "Your bag is currently empty.",
    cartSubtotal: "Subtotal",
    cartDelivery: "White-Glove Delivery",
    cartDeliveryFree: "FREE",
    cartTotal: "Estimated Total",
    cartPrivilegePrompt: "Have a bespoke privilege code?",
    cartCheckoutWhatsApp: "Order via WhatsApp Concierge",
    cartFreeShippingProgress: "away from Free White-Glove Delivery",

    footerNewsletterTag: "THE PRIVATE ATELIER REGISTER",
    footerNewsletterHeadline: "Receive Private Invitations to Limited Fabric Drops",
    footerNewsletterSubtext:
      "Join our circle of connoisseurs. Enjoy a 10% bespoke privilege code on your first cushion order and early access to upcoming Curtains and Nakshi Katha releases.",
    footerPrivilegeCode: "KEEN10",
    footerWhatsAppLabel: "WhatsApp Atelier Concierge",
    footerStudioLabel: "Design Studio & Showroom",
    footerStudioLocation: "Gulshan-2, Dhaka, Bangladesh",
    footerRights: "All rights reserved. Dedicated to artisanal heritage.",
  },

  bn: {
    brandName: "KEEN CHIT",
    brandTagline: "অভিজাত টেক্সটাইল ও হস্তশিল্প সম্ভার",

    announcementText: "বাংলাদেশ জুড়ে ৩,০০০ টাকার বেশি অর্ডারে ফ্রি হোম ডেলিভারি",
    announcementBadge: "ফ্রি ডেলিভারি",

    navCushions: "লাক্সারি কুশন",
    navCurtains: "পর্দা কালেকশন",
    navQuilts: "নকশী কাঁথা ও লেপ",
    navShawls: "শাল ও চাদর",
    navAbout: "আমাদের গল্প",
    navContact: "যোগাযোগ",

    searchPlaceholder: "কুশন, লিনেন, ভেলভেট, সিল্ক খুঁজুন...",
    searchFeatured: "বিশেষ কালেকশন",
    popularSearchesTitle: "জনপ্রিয় সার্চসমূহ",
    cardNewArrivalTitle: "২০২৬ অ্যাটেলিয়ার কুশন কালেকশন",
    cardNewArrivalBadge: "নতুন আগমন",
    cardNewArrivalDesc: "ইউরোপিয়ান স্টোন-ওয়াশড লিনেন ও ইতালিয়ান ভেলভেট",
    cardBackInStockTitle: "নকশী হেরিটেজ হ্যান্ড-এমব্রয়ডারি পিলো",
    cardBackInStockBadge: "পুনরায় স্টকে",
    cardBackInStockDesc: "সীমিত ব্যাচে হাতে বোনা ঐতিহ্যবাহী কালেকশন",
    cardUpcomingTitle: "ক্যাসকেডিং ফ্লাক্স লিনেন ড্রেপস",
    cardUpcomingBadge: "শীঘ্রই আসছে",
    cardUpcomingDesc: "সিলিং-টু-ফ্লোর প্রিমিয়াম ড্র্যাপারি সিরিজ",

    tagPatchwork: "প্যাচওয়ার্ক কুশন",
    tagCombo: "কম্বো সেট অফার",
    tagBestSeller: "সেরা বিক্রিত",
    tagBelgianLinen: "বেলজিয়ান লিনেন",
    tagItalianVelvet: "ইতালিয়ান ভেলভেট",
    tagNakshiKantha: "নকশী কাঁথা",

    heroBadge: "নতুন বিলাসবহুল সংগ্রহ",
    heroHeadlinePrefix: "অভিজাত বেলজিয়ান লিনেন।",
    heroHeadlineEmphasis: "কোমল স্পর্শ ও উষ্ণতা।",
    heroSubtext:
      "ইউরোপিয়ান অর্গানিক লিনেন, ইতালিয়ান ডাবল-পাইল ভেলভেট এবং বাংলার ঐতিহ্যবাহী নকশী সুঁই-সুতার নিপুণ কারুকাজে তৈরি। আপনার বসার ঘরকে স্নিগ্ধ ও আরামদায়ক রূপ দিতে কিউরেটেড কালেকশন।",
    heroPrimaryCta: "কুশন কালেকশন দেখুন",
    heroSecondaryCta: "আমাদের কারুশিল্প",
    heroFeaturedSetBadge: "বিশেষ লিভিং সেট",
    heroFeaturedSetTitle: "মারাইস বেলজিয়ান লিনেন ও ভেলভেট সেট",

    catalogArchiveTag: "স্থায়ী সংগ্রহশালা",
    catalogTitle: "সিগনেচার কুশন কালেকশন",
    catalogSubtext:
      "অত্যন্ত সীমিত অ্যাটেলিয়ার ব্যাচে তৈরি। প্রতিটি কুশনের সাথে পাচ্ছেন প্রিমিয়াম ডাউন-অল্টারনেটিভ হাইপোঅ্যালার্জেনিক ইনার প্যাড।",
    filterAll: "সব কুশন",
    filterLinen: "বেলজিয়ান লিনেন",
    filterVelvet: "ইতালিয়ান ভেলভেট",
    filterEmbroidered: "নকশী কারুকাজ",
    filterSilk: "তুত সিল্ক",
    filterBestSellers: "সেরা বিক্রিত",
    sortBy: "সাজান",
    priceFromPrefix: "মূল্য",
    bundlePromoText: "কম্বো সেটে ১০% ছাড়",
    quickView: "একনজরে দেখুন",
    addToBag: "ব্যাগে যোগ করুন",
    inStock: "স্টকে আছে",
    freeShippingNote: "পুরো বাংলাদেশে ফ্রি হোম ডেলিভারি",

    philosophyTag: "আমাদের দর্শন ও ঐতিহ্য",
    storyHeadline: "আপসহীন কারুশিল্প,\nঐতিহ্যের মেলবন্ধন।",
    storySubtext:
      "KEEN CHIT-এ আমরা বিশ্বাস করি আপনার মনের মতো ঘরের জন্য প্রয়োজন পরম ধৈর্য ও মমতায় তৈরি একেকটি অনুষঙ্গ। কৃত্রিম পণ্যের ভিড়ে আমাদের সৃষ্টি প্রকৃতির খাঁটি ফাইবার ও কারিগরের হাতের জাদুর জয়গান গায়।",
    promiseBadge: "আমাদের অঙ্গীকার",
    promiseQuote: "“আমরা কেবল ঘর সাজানোর জিনিস বানাই না; তৈরি করি পারিবারিক স্মারক যা বংশপরম্পরায় টিকে থাকে।”",
    promiseAuthor: "— কীন চিট মাস্টার কারিগর",
    readAtelierStory: "পুরো কারুশিল্পের গল্প পড়ুন",
    pillar1Title: "১০০% খাঁটি লিনেন ও সিল্ক",
    pillar1Desc: "সার্টিফাইড অর্গানিক ইউরোপিয়ান লিনেন, বেঙ্গল মালবেরি সিল্ক এবং ঐতিহ্যবাহী তাঁতের খাদি তুলা ছাড়া অন্য কিছু আমাদের কাটিং টেবিলে স্থান পায় না।",
    pillar2Title: "নারী কারিগরদের ক্ষমতায়ন",
    pillar2Desc: "প্রতিটি নকশী কাঁথা সূচিকর্মের মাধ্যমে গ্রামীণ নারী কারিগররা সরাসরি সম্মানজনক জীবিকা ও আত্মমর্যাদা লাভ করেন।",
    pillar3Title: "নিখুঁত দর্জিবিদ্যা ও স্থায়িত্ব",
    pillar3Desc: "গোপন জাপানি ব্রাস জিপার, শক্তিশালী ফ্রেঞ্চ সিম এবং পারফেক্ট সমকোণী কোণা দীর্ঘস্থায়িত্ব নিশ্চিত করে।",
    pillar4Title: "আরামদায়ক হাইপোঅ্যালার্জেনিক ইনার",
    pillar4Desc: "প্রতিটি কাভারের সাথে অন্তর্ভুক্ত: প্রিমিয়াম মাইক্রোফাইবার ইনার প্যাড যা ডিজাইনার শেপ সবসময় ধরে রাখে।",

    cartTitle: "আপনার শপিং ব্যাগ",
    cartEmpty: "আপনার শপিং ব্যাগটি বর্তমানে খালি।",
    cartSubtotal: "সাবটোটাল",
    cartDelivery: "হোম ডেলিভারি",
    cartDeliveryFree: "সম্পূর্ণ ফ্রি",
    cartTotal: "সর্বমোট প্রদেয়",
    cartPrivilegePrompt: "ডিসকাউন্ট কুপন কোড আছে?",
    cartCheckoutWhatsApp: "হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন",
    cartFreeShippingProgress: "টাকার কেনাকাটা করলেই ফ্রি ডেলিভারি!",

    footerNewsletterTag: "এক্সক্লুসিভ অ্যাটেলিয়ার সার্কেল",
    footerNewsletterHeadline: "নতুন ফ্যাব্রিক রিলিজ ও বিশেষ অফারের আমন্ত্রণ পান",
    footerNewsletterSubtext:
      "আমাদের সার্কেলে যুক্ত হোন। প্রথম কুশন অর্ডারে উপভোগ করুন ১০% ছাড় এবং আসন্ন পর্দা ও নকশী কাঁথার আগাম নোটিফিকেশন।",
    footerPrivilegeCode: "KEEN10",
    footerWhatsAppLabel: "হোয়াটসঅ্যাপে সরাসরি যোগাযোগ",
    footerStudioLabel: "ডিজাইন স্টুডিও ও শোরুম",
    footerStudioLocation: "গুলশান-২, ঢাকা, বাংলাদেশ",
    footerRights: "সর্বস্বত্ব সংরক্ষিত। ঐতিহ্যবাহী হস্তশিল্পের প্রতি নিবেদিত।",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof Translations) => string;
  isBangla: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => TRANSLATIONS.en[key] || "",
  isBangla: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      localStorage.removeItem("keen_lang");
      setLanguageState("en");
      document.documentElement.lang = "en";
      document.documentElement.setAttribute("data-lang", "en");
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("keen_lang", lang);
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
    } catch (e) {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "bn" : "en";
    setLanguage(next);
  };

  const t = (key: keyof Translations): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS.en[key] || "";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isBangla: language === "bn",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

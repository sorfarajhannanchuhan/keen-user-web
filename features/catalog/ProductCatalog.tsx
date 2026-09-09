"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PRODUCTS, CATEGORIES } from "./products";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/features/navigation";

export default function ProductCatalog() {
  const { t, isBangla } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "bestseller" | "lowToHigh" | "highToLow">("featured");
  const [urlSearchTerm, setUrlSearchTerm] = useState<string | null>(null);

  // Read URL search / filter params safely on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const search = params.get("search");
      const filter = params.get("filter");

      if (search) {
        setUrlSearchTerm(search);
        setActiveCategory("all");
      } else if (filter) {
        if (filter === "new-arrivals") {
          setUrlSearchTerm("New Arrival");
        } else if (filter === "back-in-stock") {
          setUrlSearchTerm("Back in Stock");
        } else if (filter === "best-seller" || filter === "best-sellers") {
          setActiveCategory("best-seller");
        } else if (filter === "patchwork") {
          setActiveCategory("patchwork");
        } else if (filter === "combo") {
          setActiveCategory("combo");
        }
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by text search if present from URL
    if (urlSearchTerm) {
      const q = urlSearchTerm.toLowerCase();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
        );
      });
    }

    if (activeCategory === "best-seller") {
      list = list.filter((p) => p.isBestSeller || p.badge?.includes("Best"));
    } else if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === "bestseller") {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (sortBy === "lowToHigh") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [activeCategory, sortBy, urlSearchTerm]);

  // Translate category names when in Bengali
  const localizedCategories = useMemo(() => {
    return CATEGORIES.map((cat) => {
      let name = cat.name;
      if (isBangla) {
        if (cat.id === "all") name = t("filterAll");
        else if (cat.id === "best-seller") name = t("tagBestSeller");
        else if (cat.id === "patchwork") name = t("tagPatchwork");
        else if (cat.id === "combo") name = t("tagCombo");
        else if (cat.id === "linen") name = t("tagBelgianLinen");
        else if (cat.id === "embroidered") name = t("tagNakshiKantha");
        else if (cat.id === "velvet") name = t("tagItalianVelvet");
        else if (cat.id === "silk") name = "তুত সিল্ক";
      }
      return { ...cat, name };
    });
  }, [isBangla, t]);

  return (
    <section id="collection" className="py-16 md:py-24 bg-brand-linen border-b border-brand-sand transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-brand-sand">
          <div>
            <span className="font-jost text-[11px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-2">
              {t("catalogArchiveTag")}
            </span>
            <h2 className="font-jost text-3xl sm:text-4xl text-brand-charcoal font-medium">
              {t("catalogTitle")}
            </h2>
          </div>

          <p className="font-sans text-xs text-brand-charcoal-muted max-w-sm mt-3 md:mt-0 font-normal leading-relaxed">
            {t("catalogSubtext")}
          </p>
        </div>

        {/* Active Search Filter Banner */}
        {urlSearchTerm && (
          <div className="mb-6 p-3 bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-between gap-3 text-xs text-brand-charcoal animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>
                {isBangla ? "ফিল্টার করা ফলাফল:" : "Showing curated results for:"}{" "}
                <strong className="text-brand-gold font-semibold">"{urlSearchTerm}"</strong> ({filteredProducts.length}{" "}
                {isBangla ? "টি প্রোডাক্ট" : "items"})
              </span>
            </div>
            <button
              onClick={() => {
                setUrlSearchTerm(null);
                if (typeof window !== "undefined") {
                  window.history.replaceState({}, "", window.location.pathname);
                }
              }}
              className="px-2.5 py-1 text-[11px] font-semibold text-brand-charcoal hover:text-brand-gold flex items-center gap-1 border border-brand-sand bg-brand-linen hover:border-brand-gold transition-colors cursor-pointer"
            >
              <span>{isBangla ? "ফিল্টার মুছুন" : "Clear Filter"}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
            {localizedCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (urlSearchTerm) {
                    setUrlSearchTerm(null);
                    if (typeof window !== "undefined") {
                      window.history.replaceState({}, "", window.location.pathname);
                    }
                  }
                }}
                className={`text-xs uppercase tracking-wider px-4 py-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id && !urlSearchTerm
                    ? "bg-brand-gold text-[#0E1410] font-bold shadow-md"
                    : "bg-brand-linen-dark text-brand-charcoal-muted hover:text-brand-charcoal hover:bg-brand-sand/50 border border-brand-sand"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-brand-charcoal-muted">
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold" />
            <span className="uppercase tracking-wider text-[11px] text-brand-charcoal-muted">
              {t("sortBy")}:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-brand-linen-dark text-brand-charcoal font-medium text-xs border border-brand-sand px-3 py-1.5 focus:outline-none focus:border-brand-gold cursor-pointer uppercase tracking-wider"
            >
              <option value="featured">{isBangla ? "অ্যাটেলিয়ার কিউরেটেড" : "Atelier Curation"}</option>
              <option value="bestseller">{isBangla ? "🔥 সেরা বিক্রিত" : "🔥 Best Selling"}</option>
              <option value="lowToHigh">{isBangla ? "মূল্য: কম থেকে বেশি" : "Price: Low to High"}</option>
              <option value="highToLow">{isBangla ? "মূল্য: বেশি থেকে কম" : "Price: High to Low"}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-brand-linen-dark border border-brand-sand p-8">
            <p className="font-jost text-lg text-brand-charcoal">
              {isBangla ? "এই ক্যাটাগরিতে কোনো কুশন পাওয়া যায়নি।" : "No handcrafted pieces matched your criteria."}
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setUrlSearchTerm(null);
                if (typeof window !== "undefined") {
                  window.history.replaceState({}, "", window.location.pathname);
                }
              }}
              className="px-4 py-2 text-xs uppercase tracking-widest bg-brand-gold text-[#0E1410] font-bold shadow-md hover:bg-brand-gold-hover transition-colors cursor-pointer"
            >
              {isBangla ? "সকল কালেকশন দেখুন" : "View All Cushions"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Footnote about bespoke sizes */}
        <div className="mt-16 text-center p-8 bg-brand-linen-dark border border-brand-sand max-w-3xl mx-auto space-y-2 shadow-luxury">
          <h4 className="font-jost text-xl text-brand-charcoal font-semibold">
            {isBangla ? "কাস্টম সাইজ বা ইন্টেরিয়র ডিজাইনার বাল্ক অর্ডার প্রয়োজন?" : "Need Bespoke Dimensions or Interior Designer Bulk Orders?"}
          </h4>
          <p className="font-sans text-xs text-brand-charcoal-muted max-w-xl mx-auto font-normal leading-relaxed">
            {isBangla
              ? "আমাদের অ্যাটেলিয়ার আপনার পছন্দের সাইজ (২৪\"×২৪\", ফ্রেঞ্চ ম্যাট্রেস কুশন, বোলস্টার) অনুযায়ী তৈরি করে দেয়।"
              : "Our atelier crafts custom sizes (24\"×24\", French Mattress cushions, custom bolster rolls) for architectural residential projects."}
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20would%20like%20to%20inquire%20about%20bespoke%20dimensions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-brand-charcoal hover:text-brand-gold border-b border-brand-charcoal pb-0.5"
            >
              {isBangla ? "অ্যাটেলিয়ার কনসিয়ার্জের সাথে হোয়াটসঅ্যাপে কথা বলুন →" : "Consult with our Atelier Concierge →"}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

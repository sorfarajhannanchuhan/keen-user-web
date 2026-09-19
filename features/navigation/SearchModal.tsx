"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/features/catalog";
import { useCart } from "@/features/cart";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function SearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setQuickViewProduct } = useCart();

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialQuery]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.fabric?.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const handlePillClick = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#121A15] border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cushion archive, fabrics, collections..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mr-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          {!query.trim() ? (
            <div className="space-y-4">
              {/* 1. Popular Searches (At the TOP) */}
              <div className="pb-3 border-b border-brand-sand">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-2">
                  Popular Searches:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handlePillClick("/collections?search=Patchwork")}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                  >
                    Patchwork Cushions
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePillClick("/collections?search=Combo")}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                  >
                    Bespoke Combos
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePillClick("/collections?filter=best-seller")}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                  >
                    Best Sellers
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePillClick("/collections?search=Linen")}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                  >
                    Belgian Linen
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePillClick("/collections?search=Velvet")}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                  >
                    Italian Velvet
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePillClick("/collections?search=Kantha")}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                  >
                    Nakshi Kantha
                  </button>
                </div>
              </div>

              {/* 2. Curated Highlights: Exactly 3 Attractive Discovery Cards */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-semibold block mb-2">
                  Curated Collections
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Card 1: New Arrival */}
                  <Link
                    href="/collections?filter=new-arrivals"
                    onClick={onClose}
                    className="group block relative overflow-hidden bg-stone-50 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 p-2 hover:border-brand-gold/60 transition-all shadow-2xs"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop"
                        alt="The 2026 Atelier Cushion Edit"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-brand-gold text-[#0E1410] text-[8.5px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm">
                          NEW ARRIVAL
                        </span>
                      </div>
                    </div>
                    <h5 className="font-brandon text-xs font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors line-clamp-1">
                      The 2026 Atelier Cushion Edit
                    </h5>
                    <p className="font-sans text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                      Stone-washed flax & double-pile Italian velvet
                    </p>
                  </Link>

                  {/* Card 2: Back in Stock */}
                  <Link
                    href="/collections?filter=back-in-stock"
                    onClick={onClose}
                    className="group block relative overflow-hidden bg-stone-50 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 p-2 hover:border-brand-gold/60 transition-all shadow-2xs"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
                        alt="Nakshi Heritage Needlework Pillow"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#3F4D38] text-brand-gold text-[8.5px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm border border-brand-gold/40">
                          BACK IN STOCK
                        </span>
                      </div>
                    </div>
                    <h5 className="font-brandon text-xs font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors line-clamp-1">
                      Nakshi Heritage Needlework Pillow
                    </h5>
                    <p className="font-sans text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                      Restocked in limited hand-stitched batches
                    </p>
                  </Link>

                  {/* Card 3: Upcoming */}
                  <Link
                    href="/curtains"
                    onClick={onClose}
                    className="group block relative overflow-hidden bg-stone-50 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 p-2 hover:border-brand-gold/60 transition-all shadow-2xs"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                        alt="Cascading Flax Linen Panels"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-stone-900/90 text-stone-200 text-[8.5px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm border border-stone-700">
                          UPCOMING
                        </span>
                      </div>
                    </div>
                    <h5 className="font-brandon text-xs font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors line-clamp-1">
                      Cascading Flax Linen Panels
                    </h5>
                    <p className="font-sans text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                      Bespoke ceiling-to-floor drape collection
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Search Results Matches */
            <div>
              {searchResults.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm font-brandon text-brand-charcoal">
                    {`No matching handcrafted pieces found for "${query}"`}
                  </p>
                  <p className="text-xs text-brand-charcoal-muted max-w-sm mx-auto">
                    Try searching for Linen, Velvet, Quilt, or Curtain
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {searchResults.map((product: Product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between gap-2.5 p-2 bg-brand-linen/60 hover:bg-brand-linen border border-brand-sand hover:border-brand-gold/70 transition-all cursor-pointer shadow-2xs"
                      onClick={() => {
                        setQuickViewProduct(product);
                        onClose();
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-11 h-11 bg-stone-200 dark:bg-stone-800 shrink-0 overflow-hidden">
                          <Image
                            src={product.primaryImage}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-brandon text-xs font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors truncate">
                            {product.name}
                          </h5>
                          <span className="text-[9px] text-stone-400 dark:text-stone-500 block truncate">
                            {product.fabric || product.tagline}
                          </span>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-semibold text-brand-gold shrink-0 ml-1">
                        ৳{product.price.toLocaleString("en-BD")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="pt-3 mt-3 border-t border-brand-sand text-center">
                  <Link
                    href={`/collections?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-brand-gold font-bold hover:underline"
                  >
                    <span>{`View All ${searchResults.length} Products`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

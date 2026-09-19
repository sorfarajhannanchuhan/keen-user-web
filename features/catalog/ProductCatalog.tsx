"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PRODUCTS, CATEGORIES } from "./products";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, Sparkles, X, ChevronDown, Check } from "lucide-react";

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "bestseller" | "lowToHigh" | "highToLow">("featured");
  const [urlSearchTerm, setUrlSearchTerm] = useState<string | null>(null);
  const [urlFilter, setUrlFilter] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Dropdown states for SS 2 filter pills
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isMaterialDropdownOpen, setIsMaterialDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Close all filter dropdowns
  const closeAllDropdowns = () => {
    setIsColorDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setIsMaterialDropdownOpen(false);
    setIsSizeDropdownOpen(false);
    setIsSortDropdownOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filter-pill-dropdown")) {
        closeAllDropdowns();
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Read URL search / filter params reactively on client
  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const search = params.get("search");
      const filter = params.get("filter");
      const cat = params.get("category");

      if (search) {
        setUrlSearchTerm(search);
        setActiveCategory("all");
      } else if (filter) {
        setUrlFilter(filter);
        if (filter === "new-arrivals") {
          setUrlSearchTerm("New Arrival");
        } else if (filter === "back-in-stock") {
          setUrlSearchTerm("Back in Stock");
        } else if (filter === "best-seller" || filter === "best-sellers") {
          setActiveCategory("best-seller");
        }
      } else {
        setUrlFilter(null);
        setUrlSearchTerm(null);
      }

      if (cat) {
        setActiveCategory(cat.toLowerCase());
      } else if (!filter && !search) {
        setActiveCategory("all");
      }
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("keen-category-change", handleUrlChange);
    const interval = setInterval(handleUrlChange, 200);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("keen-category-change", handleUrlChange);
      clearInterval(interval);
    };
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by URL filter param (New Arrivals / Back in Stock)
    if (urlFilter === "new-arrivals") {
      list = list.filter((p) => p.featured || p.badge?.toLowerCase().includes("new") || p.id.includes("01") || p.id.includes("03") || p.id.includes("07"));
    } else if (urlFilter === "back-in-stock") {
      list = list.filter((p) => p.inStock && (p.isBestSeller || p.badge?.toLowerCase().includes("best") || p.id.includes("02") || p.id.includes("04") || p.id.includes("06")));
    } else if (urlSearchTerm) {
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

    // Filter by Category
    if (activeCategory === "best-seller") {
      list = list.filter((p) => p.isBestSeller || p.badge?.includes("Best"));
    } else if (activeCategory === "sashiko") {
      list = list.filter((p) => p.category === "embroidered" || p.name.toLowerCase().includes("sashiko") || p.name.toLowerCase().includes("kantha") || p.name.toLowerCase().includes("geometric"));
    } else if (activeCategory === "patchwork") {
      list = list.filter((p) => p.category === "patchwork" || p.name.toLowerCase().includes("patchwork") || p.name.toLowerCase().includes("boro"));
    } else if (activeCategory === "one-line-art") {
      list = list.filter((p) => p.name.toLowerCase().includes("line") || p.name.toLowerCase().includes("minimalist") || p.category === "embroidered");
    } else if (activeCategory === "solid-pattern") {
      list = list.filter((p) => p.category === "linen" || p.name.toLowerCase().includes("marais") || p.name.toLowerCase().includes("avignon") || p.name.toLowerCase().includes("flax"));
    } else if (activeCategory === "wall-hanging") {
      list = list.filter((p) => p.category === "patchwork" || p.name.toLowerCase().includes("tapestry") || p.category === "embroidered");
    } else if (activeCategory === "curtains") {
      list = list.filter((p) => p.category === "curtains" || p.name.toLowerCase().includes("curtain") || p.name.toLowerCase().includes("drape"));
    } else if (activeCategory === "quilts") {
      list = list.filter((p) => p.category === "quilts" || p.name.toLowerCase().includes("quilt") || p.name.toLowerCase().includes("comforter"));
    } else if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter by Color
    if (selectedColor !== "all") {
      list = list.filter((p) =>
        p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    // Filter by Type
    if (selectedType !== "all") {
      list = list.filter((p) => p.category.toLowerCase() === selectedType.toLowerCase());
    }

    // Filter by Material
    if (selectedMaterial !== "all") {
      list = list.filter((p) =>
        p.fabric.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
    }

    // Filter by Size
    if (selectedSize !== "all") {
      list = list.filter((p) => p.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase())));
    }

    // Sorting
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
  }, [activeCategory, selectedColor, selectedType, selectedMaterial, selectedSize, sortBy, urlSearchTerm, urlFilter]);

  // Dynamic editorial title & subtitle matching benchmark
  const { pageTitle, pageSubtitle } = useMemo(() => {
    if (urlFilter === "new-arrivals") {
      return {
        pageTitle: "NEW ARRIVALS",
        pageSubtitle: "Fresh seasonal drops. Pure stone-washed Belgian linen, lustrous silk, and intricate artisanal needlework handcrafted for mindful living.",
      };
    }
    if (urlFilter === "back-in-stock") {
      return {
        pageTitle: "BACK IN STOCK",
        pageSubtitle: "Our most-coveted heirloom editions, restocked in strictly limited artisan quantities.",
      };
    }
    if (activeCategory === "best-seller") {
      return {
        pageTitle: "BEST SELLERS",
        pageSubtitle: "Architectural comfort statements and enduring favorites cherished by sanctuaries and interior designers worldwide.",
      };
    }
    if (activeCategory === "sashiko") {
      return {
        pageTitle: "SASHIKO ARCHIVE",
        pageSubtitle: "Geometric running-stitch patterns rooted in heritage discipline, handcrafted for subtle modern living.",
      };
    }
    if (activeCategory === "patchwork") {
      return {
        pageTitle: "PATCHWORK ARCHIVE",
        pageSubtitle: "Hand-pieced vintage linen and indigo-dyed remnant swatches celebrating textural harmony and wabi-sabi elegance.",
      };
    }
    if (activeCategory === "one-line-art") {
      return {
        pageTitle: "ONE LINE ART ARCHIVE",
        pageSubtitle: "Continuous contour line embroidery merging contemporary art with traditional needlework.",
      };
    }
    if (activeCategory === "solid-pattern") {
      return {
        pageTitle: "SOLID PATTERN ARCHIVE",
        pageSubtitle: "Pure stone-washed Belgian flax linen and tactile textures in calming earthy mineral tones.",
      };
    }
    if (activeCategory === "wall-hanging") {
      return {
        pageTitle: "WALL HANGING ARCHIVE",
        pageSubtitle: "Architectural fiber art tapestries bringing warmth, acoustic depth, and artisanal presence to statement walls.",
      };
    }
    if (activeCategory === "curtains") {
      return {
        pageTitle: "BESPOKE DRAPERY COLLECTION",
        pageSubtitle: "Ceiling-to-floor Belgian flax drapes filtering natural daylight with quiet warmth.",
      };
    }
    if (activeCategory === "quilts") {
      return {
        pageTitle: "HEIRLOOM KANTHA QUILTS",
        pageSubtitle: "Generational master needlework stitched onto pure Mulberry silk and unbleached cotton.",
      };
    }
    if (activeCategory !== "all") {
      const catObj = CATEGORIES.find((c) => c.id === activeCategory);
      const name = catObj ? catObj.name.toUpperCase() : activeCategory.toUpperCase();
      return {
        pageTitle: `${name} COLLECTION`,
        pageSubtitle: "Durable flax. Luxe velvet. Sculpted needlework. Living accents handcrafted to blend form and mindful function.",
      };
    }

    // Authentic Atelier Default for KEEN CHIT (No more "Baskets & Accents" placeholder)
    return {
      pageTitle: "ARTISANAL LIVING & TEXTILES",
      pageSubtitle: "Stone-washed Belgian flax, dense Italian velvet, and ancient Nakshi needlework handcrafted for mindful sanctuaries.",
    };
  }, [urlFilter, activeCategory]);

  const clearAllFilters = () => {
    setActiveCategory("all");
    setSelectedColor("all");
    setSelectedType("all");
    setSelectedMaterial("all");
    setSelectedSize("all");
    setUrlSearchTerm(null);
    setUrlFilter(null);
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  const hasActiveFilters =
    activeCategory !== "all" ||
    selectedColor !== "all" ||
    selectedType !== "all" ||
    selectedMaterial !== "all" ||
    selectedSize !== "all" ||
    urlSearchTerm ||
    urlFilter;

  return (
    <section id="collection" className="py-8 md:py-14 bg-[#FBF9F5] dark:bg-[#0E1410] border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SS 2 Benchmark Utility Bar: Filters | Color ⌵ | Type ⌵ | Material ⌵ | Size ⌵ | 45 Products ----------- Sort By ⌵ */}
        {/* ========================================================================= */}
        <div className="bg-[#F5F5F3] dark:bg-[#141A16] border-y border-stone-200/70 dark:border-stone-800/70 py-2.5 px-4 sm:px-6 mb-8 flex flex-wrap items-center justify-between gap-3 sm:gap-4 select-none rounded-xs">
          
          {/* Left Controls: Filters Label, Multi Dropdown Pills (Color, Type, Material, Size), Count */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            
            {/* Filters Label (Clean crisp text matching SS 2) */}
            <span className="text-[13px] font-medium text-stone-700 dark:text-stone-300 mr-1">
              Filters
            </span>

            {/* Pill 1: Color Dropdown (Matching SS 2) */}
            <div className="relative inline-block filter-pill-dropdown">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsColorDropdownOpen(!isColorDropdownOpen);
                  setIsTypeDropdownOpen(false);
                  setIsMaterialDropdownOpen(false);
                  setIsSizeDropdownOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-stone-900 border text-[12.5px] font-medium transition-all cursor-pointer shadow-xs rounded-xs ${
                  selectedColor !== "all"
                    ? "border-brand-gold text-brand-gold font-semibold"
                    : "border-stone-200/90 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-500"
                }`}
              >
                <span>
                  {selectedColor === "all" ? "Color" : selectedColor}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isColorDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isColorDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl z-40 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  {[
                    { id: "all", label: "All Colors" },
                    { id: "Oatmeal", label: "Oatmeal Beige" },
                    { id: "Terracotta", label: "Warm Terracotta" },
                    { id: "Olive", label: "Muted Olive / Sage" },
                    { id: "Charcoal", label: "Midnight Charcoal" },
                    { id: "Jade", label: "Deep Forest Jade" },
                    { id: "Amber", label: "Warm Amber Ochre" },
                    { id: "Lavender", label: "French Lavender" },
                    { id: "Indigo", label: "Fermented Indigo" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c.id);
                        setIsColorDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer ${
                        selectedColor === c.id ? "font-semibold text-brand-gold" : "text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span>{c.label}</span>
                      {selectedColor === c.id && <Check className="w-3.5 h-3.5 text-brand-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pill 2: Type / Category Dropdown (Matching SS 2) */}
            <div className="relative inline-block filter-pill-dropdown">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTypeDropdownOpen(!isTypeDropdownOpen);
                  setIsColorDropdownOpen(false);
                  setIsMaterialDropdownOpen(false);
                  setIsSizeDropdownOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-stone-900 border text-[12.5px] font-medium transition-all cursor-pointer shadow-xs rounded-xs ${
                  selectedType !== "all"
                    ? "border-brand-gold text-brand-gold font-semibold"
                    : "border-stone-200/90 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-500"
                }`}
              >
                <span>
                  {selectedType === "all" ? "Type" : selectedType.toUpperCase()}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isTypeDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isTypeDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl z-40 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  {[
                    { id: "all", label: "All Types" },
                    { id: "linen", label: "Belgian Linen Cushions" },
                    { id: "velvet", label: "Italian Velvet Cushions" },
                    { id: "embroidered", label: "Hand-Embroidered Nakshi" },
                    { id: "patchwork", label: "Artisanal Patchwork" },
                    { id: "silk", label: "Mulberry Silk Bolsters" },
                    { id: "curtains", label: "Flax Linen Drapes" },
                    { id: "quilts", label: "Silk Kantha Quilts" },
                  ].map((tItem) => (
                    <button
                      key={tItem.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(tItem.id);
                        setIsTypeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer ${
                        selectedType === tItem.id ? "font-semibold text-brand-gold" : "text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span>{tItem.label}</span>
                      {selectedType === tItem.id && <Check className="w-3.5 h-3.5 text-brand-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pill 3: Material Dropdown (Matching SS 2) */}
            <div className="relative inline-block filter-pill-dropdown">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaterialDropdownOpen(!isMaterialDropdownOpen);
                  setIsColorDropdownOpen(false);
                  setIsTypeDropdownOpen(false);
                  setIsSizeDropdownOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-stone-900 border text-[12.5px] font-medium transition-all cursor-pointer shadow-xs rounded-xs ${
                  selectedMaterial !== "all"
                    ? "border-brand-gold text-brand-gold font-semibold"
                    : "border-stone-200/90 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-500"
                }`}
              >
                <span>
                  {selectedMaterial === "all" ? "Material" : selectedMaterial}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isMaterialDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isMaterialDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-56 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl z-40 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  {[
                    { id: "all", label: "All Materials" },
                    { id: "Linen", label: "100% European Flax Linen" },
                    { id: "Velvet", label: "Como Double-Pile Velvet" },
                    { id: "Khadi", label: "Handspun Khadi Cotton" },
                    { id: "Silk", label: "Rajshahi Mulberry Silk" },
                    { id: "Bouclé", label: "Wool & Cotton Bouclé" },
                    { id: "Zari", label: "Handloom Muslin & Zari" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setSelectedMaterial(m.id);
                        setIsMaterialDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer ${
                        selectedMaterial === m.id ? "font-semibold text-brand-gold" : "text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span>{m.label}</span>
                      {selectedMaterial === m.id && <Check className="w-3.5 h-3.5 text-brand-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pill 4: Size Dropdown (Matching SS 2) */}
            <div className="relative inline-block filter-pill-dropdown">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSizeDropdownOpen(!isSizeDropdownOpen);
                  setIsColorDropdownOpen(false);
                  setIsTypeDropdownOpen(false);
                  setIsMaterialDropdownOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-stone-900 border text-[12.5px] font-medium transition-all cursor-pointer shadow-xs rounded-xs ${
                  selectedSize !== "all"
                    ? "border-brand-gold text-brand-gold font-semibold"
                    : "border-stone-200/90 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-500"
                }`}
              >
                <span>
                  {selectedSize === "all" ? "Size" : selectedSize}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isSizeDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isSizeDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl z-40 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  {[
                    { id: "all", label: "All Sizes" },
                    { id: "18", label: "18\" × 18\" (45cm)" },
                    { id: "20", label: "20\" × 20\" (50cm)" },
                    { id: "22", label: "22\" × 22\" (55cm)" },
                    { id: "lumbar", label: "14\" × 24\" Lumbar" },
                    { id: "bolster", label: "8\" × 24\" Bolster" },
                  ].map((sz) => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz.id);
                        setIsSizeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer ${
                        selectedSize === sz.id ? "font-semibold text-brand-gold" : "text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      <span>{sz.label}</span>
                      {selectedSize === sz.id && <Check className="w-3.5 h-3.5 text-brand-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters Chip (Appears if any filter active) */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] font-semibold text-red-700 dark:text-red-400 hover:underline cursor-pointer uppercase tracking-wider ml-1"
              >
                Reset ✕
              </button>
            )}

            {/* Dynamic Product Count (Matching SS 2: e.g. "45 Products") */}
            <span className="text-stone-500 dark:text-stone-400 text-xs sm:text-[13px] font-normal tracking-wide ml-1 sm:ml-2">
              {filteredProducts.length} Products
            </span>
          </div>

          {/* Right Controls: Sort By Dropdown (No wide gap, tight 6px gap with down arrow) */}
          <div className="relative inline-block filter-pill-dropdown ml-auto shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsSortDropdownOpen(!isSortDropdownOpen);
                setIsColorDropdownOpen(false);
                setIsTypeDropdownOpen(false);
                setIsMaterialDropdownOpen(false);
                setIsSizeDropdownOpen(false);
              }}
              className="inline-flex items-center gap-1.5 text-stone-800 dark:text-stone-200 hover:text-brand-gold dark:hover:text-brand-gold text-xs sm:text-[13px] font-medium transition-colors cursor-pointer select-none tracking-wide"
            >
              <span>Sort By</span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isSortDropdownOpen ? "rotate-180 text-brand-gold" : ""}`} />
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl z-40 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                {[
                  { id: "featured", label: "Atelier Curated" },
                  { id: "bestseller", label: "Best Selling" },
                  { id: "lowToHigh", label: "Price: Low to High" },
                  { id: "highToLow", label: "Price: High to Low" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSortBy(s.id as any);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer ${
                      sortBy === s.id ? "font-semibold text-brand-gold" : "text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    <span>{s.label}</span>
                    {sortBy === s.id && <Check className="w-3.5 h-3.5 text-brand-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Collapsible Filter Panel (Appears when "Filters" is clicked) */}
        {/* ========================================================================= */}
        {isFilterPanelOpen && (
          <div className="mb-8 p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-900 dark:text-stone-100">
                Select Category
              </span>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", name: "All Collections" },
                { id: "sashiko", name: "Sashiko" },
                { id: "patchwork", name: "Patchwork" },
                { id: "one-line-art", name: "One Line Art" },
                { id: "solid-pattern", name: "Solid Pattern" },
                { id: "best-seller", name: "Best Sellers" },
                { id: "linen", name: "Belgian Linen" },
                { id: "velvet", name: "Italian Velvet" },
                { id: "embroidered", name: "Bengal Nakshi" },
                { id: "silk", name: "Matka Silk" },
                { id: "combo", name: "Artisan Combos" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (urlFilter) setUrlFilter(null);
                    if (urlSearchTerm) setUrlSearchTerm(null);
                  }}
                  className={`text-xs uppercase tracking-wider px-3.5 py-1.5 transition-all cursor-pointer border ${
                    activeCategory === cat.id
                      ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold border-stone-900 dark:border-white shadow-xs"
                      : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-brand-gold"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Active Filter Chips Bar */}
        {/* ========================================================================= */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium text-[11px] uppercase tracking-wider mr-1">
              Active Filters:
            </span>

            {urlFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-gold/15 text-stone-900 dark:text-brand-gold border border-brand-gold/40 font-semibold uppercase tracking-wider text-[10.5px]">
                <span>{urlFilter.replace("-", " ")}</span>
                <button onClick={() => setUrlFilter(null)} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeCategory !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium uppercase tracking-wider text-[10.5px]">
                <span>Category: {activeCategory}</span>
                <button onClick={() => setActiveCategory("all")} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSize !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium uppercase tracking-wider text-[10.5px]">
                <span>Size: {selectedSize}</span>
                <button onClick={() => setSelectedSize("all")} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {urlSearchTerm && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-[10.5px]">
                <span>Search: "{urlSearchTerm}"</span>
                <button onClick={() => setUrlSearchTerm(null)} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="ml-2 text-[11px] uppercase tracking-wider font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 underline underline-offset-2 cursor-pointer transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SS 3 Editorial Header Title & 1-Line Poetic Subtitle */}
        {/* ========================================================================= */}
        <div className="mb-8">
          <h1 className="font-brandon font-bold text-2xl sm:text-3xl lg:text-[32px] tracking-[0.06em] text-stone-900 dark:text-stone-100 uppercase">
            {pageTitle}
          </h1>
          <p className="font-sans text-xs sm:text-[13.5px] text-stone-600 dark:text-stone-300 font-normal mt-2.5 max-w-4xl leading-relaxed">
            {pageSubtitle}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3-Column Luxury Product Grid (Matching SS 3 & SS 4) */}
        {/* ========================================================================= */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white dark:bg-[#121A15] border border-stone-200 dark:border-stone-800 p-8 shadow-xs">
            <p className="font-brandon text-lg text-stone-800 dark:text-stone-200">
              No handcrafted pieces matched your criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 text-xs uppercase tracking-widest bg-stone-900 dark:bg-brand-gold text-white dark:text-[#0E1410] font-bold shadow-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              View All Cushions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bespoke Atelier Stationery Commission Card (SS 1 Transformed) */}
        <div className="mt-20 sm:mt-24 max-w-3xl mx-auto relative bg-[#FAF8F5] dark:bg-[#131B15] border border-[#E2DDD5]/90 dark:border-[#263328] p-8 sm:p-12 text-center shadow-xs select-none">
          {/* Inner Artisanal Hairline Inset Border (Deckled Stationery Edge) */}
          <div className="absolute inset-2 border border-[#D4AF37]/25 dark:border-[#D4AF37]/20 pointer-events-none" />

          <div className="relative z-10 space-y-3">
            {/* Micro Hot-Stamped Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37]">
              <span>✦</span>
              <span>ATELIER COMMISSIONS & TRADE</span>
              <span>✦</span>
            </div>

            {/* Elegant Heading */}
            <h4 className="font-brandon text-xl sm:text-2xl text-stone-900 dark:text-stone-100 font-medium tracking-wide">
              Architectural Dimensions & Bespoke Commissions
            </h4>

            {/* Editorial Subtext */}
            <p className="font-sans text-[12px] sm:text-[12.5px] text-stone-600 dark:text-stone-400 max-w-xl mx-auto font-normal leading-relaxed">
              From 24&quot;×24&quot; European scale to hand-tufted French daybed cushions and custom bolster rolls, our master tailors craft to your exact architectural specifications.
            </p>

            {/* Concierge Action Link */}
            <div className="pt-3">
              <a
                href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20would%20like%20to%20consult%20on%20bespoke%20dimensions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-bold text-stone-900 dark:text-stone-100 hover:text-brand-gold pb-1 border-b border-brand-gold/60 hover:border-brand-gold transition-all duration-300 group cursor-pointer"
              >
                <span>Consult with our Atelier Concierge</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, Sparkles, Search, ArrowRight, Phone, ChevronDown } from "lucide-react";
import { useCart } from "@/features/cart";
import { PRODUCTS } from "@/features/catalog";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import { useAppearance } from "@/features/appearance";
import { useFrontendContent } from "@/features/appearance";
import { useMoreDrawer } from "./MoreDrawerContext";
import SearchModal from "./SearchModal";
import SignInModal from "./SignInModal";

interface MegaMenuConfig {
  columns: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  featured: {
    badge: string;
    title: string;
    subtitle: string;
    image: string;
    href: string;
    ctaText: string;
  }[];
}

const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  cushions: {
    columns: [
      {
        title: "Signature Materials",
        links: [
          { label: "Stone-Washed Belgian Flax", href: "/collections" },
          { label: "Double-Pile Italian Velvet", href: "/collections" },
          { label: "Bengal Nakshi Hand-Embroidered", href: "/collections" },
          { label: "Mulberry Raw Silk Bolsters", href: "/collections" },
          { label: "Handloomed Khadi Covers", href: "/collections" },
          { label: "Shop All Cushions →", href: "/collections" },
        ],
      },
      {
        title: "Atelier Curations",
        links: [
          { label: "Living Room Dual Palettes", href: "/collections" },
          { label: "Lumbar & Bolster Silhouettes", href: "/collections" },
          { label: "Bespoke Sizing & Custom Inserts", href: "/contact" },
          { label: "Warm Ochre & Earth Neutrals", href: "/collections" },
          { label: "Deep Emerald & Jewel Tones", href: "/collections" },
        ],
      },
    ],
    featured: [
      {
        badge: "NEW ARRIVAL",
        title: "The 2026 Atelier Cushion Edit",
        subtitle: "Stone-washed flax & double-pile Italian velvet",
        image:
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
        href: "/collections?filter=new-arrivals",
        ctaText: "Explore New Arrivals →",
      },
      {
        badge: "BACK IN STOCK",
        title: "Nakshi Heritage Needlework Pillow",
        subtitle: "40+ hours artisan stitching, restocked in limited batches",
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
        href: "/collections?filter=back-in-stock",
        ctaText: "Shop Restocked Heirlooms →",
      },
    ],
  },
  curtains: {
    columns: [
      {
        title: "Bespoke Drapery",
        links: [
          { label: "Pure Belgian Linen Drapes", href: "/curtains" },
          { label: "Blackout Acoustic Velvet", href: "/curtains" },
          { label: "Handwoven Muslin Sheers", href: "/curtains" },
          { label: "Solid Brass Curtain Rods", href: "/curtains" },
          { label: "Shop All Curtains →", href: "/curtains" },
        ],
      },
      {
        title: "Window Styling",
        links: [
          { label: "Complimentary Sizing Guide", href: "/curtains" },
          { label: "Floor-to-Ceiling Puddle Drops", href: "/curtains" },
          { label: "Dual Layer Day & Night Panels", href: "/curtains" },
          { label: "Order Fabric Swatch Kit", href: "/contact" },
        ],
      },
    ],
    featured: [
      {
        badge: "NEW ARRIVAL",
        title: "Cascading Flax Linen Panels",
        subtitle: "Natural light diffusion tailored to your ceiling height",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
        href: "/curtains",
        ctaText: "Discover New Drapes →",
      },
      {
        badge: "BACK IN STOCK",
        title: "Emerald Matte Velvet Drapes",
        subtitle: "Acoustic dampening with brushed bronze grommets",
        image:
          "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?q=80&w=800&auto=format&fit=crop",
        href: "/curtains",
        ctaText: "Explore Velvet Drapery →",
      },
    ],
  },
  quilts: {
    columns: [
      {
        title: "Heirloom Bedding",
        links: [
          { label: "Bengal Nakshi Kantha Quilts", href: "/quilts" },
          { label: "Pure European Linen Duvets", href: "/quilts" },
          { label: "Hand-Quilted Winter Razai", href: "/quilts" },
          { label: "Muslin Summer Throws", href: "/quilts" },
          { label: "Shop All Quilts & Bedding →", href: "/quilts" },
        ],
      },
      {
        title: "Artisanal Techniques",
        links: [
          { label: "Master Artisan Needlework", href: "/about" },
          { label: "Organic Vegetable Dyed Khadi", href: "/quilts" },
          { label: "Reversible Dual Tone Quilts", href: "/quilts" },
          { label: "Care & Preservation Guide", href: "/care-guide" },
        ],
      },
    ],
    featured: [
      {
        badge: "NEW ARRIVAL",
        title: "Rajshahi Gold Leaf Kantha Quilt",
        subtitle: "Traditional running stitch on mulberry unbleached silk",
        image:
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
        href: "/quilts",
        ctaText: "View Masterpiece Quilt →",
      },
      {
        badge: "BACK IN STOCK",
        title: "Washed Linen Heavy Bedspread",
        subtitle: "Relaxed vintage drape in Belgian stone oatmeal",
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
        href: "/quilts",
        ctaText: "Shop Linen Coverlet →",
      },
    ],
  },
  shawls: {
    columns: [
      {
        title: "Handloom Wraps",
        links: [
          { label: "Pure Cashmere Pashmina", href: "/shawls" },
          { label: "Hand-Spun Khadi Chadors", href: "/shawls" },
          { label: "Silk Embroidered Shawls", href: "/shawls" },
          { label: "Merino Wool Travel Wraps", href: "/shawls" },
          { label: "Shop All Shawls & Wraps →", href: "/shawls" },
        ],
      },
      {
        title: "Styling & Occasions",
        links: [
          { label: "Winter Wedding Collection", href: "/shawls" },
          { label: "Unisex Minimalist Wraps", href: "/shawls" },
          { label: "Bespoke Monogramming", href: "/contact" },
          { label: "Luxury Gift Packaging", href: "/shawls" },
        ],
      },
    ],
    featured: [
      {
        badge: "NEW ARRIVAL",
        title: "Pure Cashmere Hand-Loomed Chador",
        subtitle: "Whisper-light warmth in timeless oatmeal & graphite",
        image:
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
        href: "/shawls",
        ctaText: "Shop New Wraps →",
      },
      {
        badge: "BACK IN STOCK",
        title: "Artisan Silk Nakshi Stole",
        subtitle: "Rajshahi raw silk with dense floral needlework border",
        image:
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
        href: "/shawls",
        ctaText: "Shop Restocked Shawls →",
      },
    ],
  },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide consumer navbar entirely on admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { getBarStyles } = useAppearance();
  const headerStyles = getBarStyles("header", isDark);
  const announcementStyles = getBarStyles("announcementBar", isDark);
  const searchDropdownStyles = getBarStyles("searchDropdown", isDark);

  const { totalItems, setIsCartOpen, setQuickViewProduct } = useCart();
  const { isMoreDrawerOpen, setIsMoreDrawerOpen } = useMoreDrawer();
  const { content } = useFrontendContent();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // Language Context
  const { t, isBangla } = useLanguage();

  // Dynamic Navigation Categories
  const navCategories = useMemo(() => {
    if (content?.navigation && content.navigation.length > 0) {
      return content.navigation
        .filter((item) => item.isVisible !== false)
        .map((item) => ({
          key: item.key,
          name: item.name,
          href: item.href,
        }));
    }
    return [
      { key: "cushions", name: t("navCushions"), href: "/collections" },
      { key: "curtains", name: t("navCurtains"), href: "/curtains" },
      { key: "quilts", name: t("navQuilts"), href: "/quilts" },
      { key: "shawls", name: t("navShawls"), href: "/shawls" },
      { key: "care-guide", name: isBangla ? "কেয়ার গাইড" : "Care Guide", href: "/care-guide" },
      { key: "about", name: t("navAbout"), href: "/about" },
      { key: "concierge", name: isBangla ? "কনসিয়ার্জ" : "Concierge", href: "/contact" },
    ];
  }, [content?.navigation, t, isBangla]);

  const currentMegaMenus = content?.megaMenus || MEGA_MENUS;

  // Compact Minimalist Inline Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Navigation active, hover, and single sliding indicator state
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navContainerRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Identify active page key based on current URL path
  const activePageKey = useMemo(() => {
    if (!pathname) return null;
    const match = navCategories.find((cat) => {
      if (cat.href === "/") {
        return pathname === "/";
      }
      return pathname === cat.href || pathname.startsWith(cat.href + "/");
    });
    return match ? match.key : null;
  }, [pathname, navCategories]);

  // Recalculate single smooth sliding underline indicator position
  const updateIndicator = useCallback(() => {
    const targetKey = hoveredKey || activePageKey;
    if (!targetKey) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const itemEl = navItemRefs.current[targetKey];
    const containerEl = navContainerRef.current;
    if (itemEl && containerEl) {
      const itemRect = itemEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const left = itemRect.left - containerRect.left;
      const width = itemRect.width;
      setIndicatorStyle({
        left,
        width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredKey, activePageKey]);

  useEffect(() => {
    updateIndicator();
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        updateIndicator();
      });
    }
  }, [updateIndicator, navCategories]);

  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };
    window.addEventListener("resize", handleResize);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        updateIndicator();
      });
    }
    const timer1 = setTimeout(updateIndicator, 60);
    const timer2 = setTimeout(updateIndicator, 250);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [updateIndicator]);

  // On route change: immediately close mega menu and search dropdown without lag
  useEffect(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setActiveMegaMenu(null);
    setHoveredKey(null);
    setIsSearchDropdownOpen(false);
  }, [pathname]);

  const handleMouseEnterMenu = (key: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setHoveredKey(key);
    setActiveMegaMenu(key);
  };

  const handleMouseLeaveMenu = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    // Instantly glide back to active page key with smooth physics
    setHoveredKey(null);
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const handleCategoryClick = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setActiveMegaMenu(null);
    setHoveredKey(null);
  };

  // Close search dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Top bars container ref & dynamic heights for GPU transform slide
  const topBarsRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const [collapseOffset, setCollapseOffset] = useState(96);
  const [announcementHeight, setAnnouncementHeight] = useState(36);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(() => {
      if (topBarsRef.current) {
        setCollapseOffset(topBarsRef.current.offsetHeight);
      }
      if (announcementRef.current) {
        setAnnouncementHeight(announcementRef.current.offsetHeight);
      }
    });

    if (topBarsRef.current) ro.observe(topBarsRef.current);
    if (announcementRef.current) ro.observe(announcementRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
    };
  }, []);

  // Scroll tracking: Detect scroll direction and top threshold
  // - At top (scrollY <= 30): All 3 bars shown, floating glassmorphic over hero on homepage
  // - Scrolling down: Collapse top 2 bars, Category Bar (Bar 3) remains sticky at top
  // - Scrolling up: Smoothly slide down / reveal the full 3-bar header (Screenshot 2)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    if (typeof window !== "undefined") {
      setIsAtTop(window.scrollY <= 30);
      lastScrollYRef.current = window.scrollY;
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const lastScrollY = lastScrollYRef.current;
          const deltaY = currentScrollY - lastScrollY;

          // Top boundary threshold
          if (currentScrollY <= 30) {
            setIsAtTop(true);
            setScrollDirection("up");
          } else {
            setIsAtTop(false);
            // Require > 6px scroll movement to prevent micro-bounce jitter
            if (deltaY > 6) {
              setScrollDirection("down");
            } else if (deltaY < -6) {
              setScrollDirection("up");
            }
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When scrolling DOWN (scrollDirection === "down" and !isAtTop), collapse top 2 bars
  // When scrolling UP (scrollDirection === "up") OR at top, restore all 3 bars smoothly!
  // If search dropdown is open, keep uncollapsed
  const isCollapsed = !isAtTop && scrollDirection === "down" && !isSearchDropdownOpen;
  const isFloatingOverHero = isAtTop && pathname === "/";

  // Filter products based on search input
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handlePopularSearchClick = (term: string, href: string) => {
    setIsSearchDropdownOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Mobile Drawer */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />

      {/* Background Website Subtle Blur Backdrop (10-20% blur) when search is open */}
      {isSearchDropdownOpen && (
        <div
          onClick={() => setIsSearchDropdownOpen(false)}
          className="fixed inset-0 z-40 bg-black/25 dark:bg-black/45 backdrop-blur-[2.5px] transition-all duration-300 animate-in fade-in"
          aria-label="Close search overlay"
        />
      )}

      {/* Sticky 3-Bar Navigation Architecture (GPU Accelerated Transform Translation) */}
      <div
        className={`sticky top-0 ${
          isSearchDropdownOpen ? "z-50" : "z-40"
        } w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform`}
        style={{
          transform: isCollapsed
            ? isMobile
              ? `translateY(-${announcementHeight}px)`
              : `translateY(-${collapseOffset}px)`
            : "translateY(0px)",
        }}
      >
        {/* Top Collapsible Region (Bar 1: Announcement Bar + Bar 2: Brand Logo Bar) */}
        <div ref={topBarsRef} className="w-full">
          {/* Bar 1: Top Announcement Bar (Solid Tuscan Olive matching Screenshot 4, zero cloudy gray haze) */}
          <div
            ref={announcementRef}
            style={announcementStyles.style}
            className={`w-full text-[11px] sm:text-xs tracking-widest uppercase font-medium select-none shadow-xs z-50 py-2 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${announcementStyles.className}`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
              {/* 1. Left: WhatsApp Direct Concierge Contact */}
              <a
                href={`https://wa.me/${(content?.footer?.whatsappNumber || "+880 1700-000000").replace(/[^0-9]/g, "") || "8801700000000"}?text=Hello%20KEEN%20CHIT%20Atelier,%20I%20would%20like%20concierge%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-stone-300 hover:text-brand-gold transition-colors tracking-wider text-[11px] cursor-pointer group shrink-0"
                title="Contact Dhaka Concierge on WhatsApp"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover:scale-110 shrink-0" />
                <span className="text-stone-400 group-hover:text-brand-gold transition-colors font-normal">
                  {isBangla ? "ঢাকা কনসিয়ার্জ:" : "Dhaka Concierge:"}
                </span>
                <span className="font-semibold text-stone-200 group-hover:text-brand-gold transition-colors font-sans">
                  {content?.footer?.whatsappNumber || "+880 1700-000000"}
                </span>
              </a>

              {/* 2. Center: Delivery Announcement ONLY */}
              <div className="flex-1 flex items-center justify-center gap-2 text-center">
                <Sparkles className="w-3 h-3 text-brand-gold animate-pulse shrink-0" />
                <span className="font-semibold text-stone-100 truncate sm:overflow-visible">
                  {(isBangla ? t("announcementBadge") : (content?.announcement?.promoBadge || "COMPLIMENTARY")) && (
                    <span className="text-brand-gold mr-1.5 font-bold tracking-wider">
                      [{isBangla ? t("announcementBadge") : (content?.announcement?.promoBadge || "COMPLIMENTARY")}]
                    </span>
                  )}
                  {isBangla
                    ? (t("announcementText") || "৩,০০০ টাকার বেশি অর্ডারে সারা বাংলাদেশে কমপ্লিমেন্টারি হোম ডেলিভারি")
                    : (content?.announcement?.text || "Complimentary White-Glove Delivery on all orders above ৳3,000")}
                </span>
              </div>

              {/* 3. Right: BDT Currency Only (Other currencies removed) */}
              <div className="hidden md:flex items-center gap-1 text-stone-200 text-[11px] tracking-widest font-medium shrink-0 relative group select-none cursor-default">
                <span className="text-brand-gold font-bold">৳</span>
                <span className="text-stone-200 font-semibold tracking-wider">BDT</span>
                <ChevronDown className="w-3 h-3 text-stone-400 ml-0.5 transition-transform group-hover:rotate-180" />
                
                {/* Active BDT Badge Tooltip */}
                <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block bg-[#0E1410] border border-stone-800 text-[10.5px] text-stone-300 py-2 px-3 shadow-2xl z-50 whitespace-nowrap">
                  <div className="flex items-center gap-2 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-stone-100 font-semibold">BDT (৳)</span>
                    <span className="text-stone-400">• Bangladeshi Taka (Atelier Standard)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop for Desktop Search Dropdown to blur full website 10-20% */}
          {isSearchDropdownOpen && (
            <div
              onClick={() => setIsSearchDropdownOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[3.5px] z-40 transition-opacity duration-300"
              aria-hidden="true"
            />
          )}

          {/* Bar 2: Main Luxury Brand Logo & Utility Bar */}
          <div
            style={isFloatingOverHero ? undefined : headerStyles.style}
            className={`w-full border-b transition-all duration-300 ${
              isSearchDropdownOpen ? "relative z-50" : "relative z-20"
            } ${
              isFloatingOverHero
                ? "bg-black/25 backdrop-blur-md border-white/10 text-white shadow-none"
                : isCollapsed
                ? "shadow-md bg-brand-linen/95 dark:bg-[#0E1410]/95 backdrop-blur-md border-stone-200/80 dark:border-stone-800/80"
                : "shadow-xs bg-brand-linen/95 dark:bg-[#0E1410]/95 backdrop-blur-md border-stone-200/60 dark:border-stone-800/60"
            } ${!isFloatingOverHero ? headerStyles.className : ""}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`flex items-center justify-between gap-3 lg:gap-6 py-2 md:py-2.5 ${
                  isSearchDropdownOpen ? "relative z-50" : "relative z-20"
                }`}
              >
            
            {/* 1. LEFT COLUMN: Brand Logo & Title */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 border border-brand-sand overflow-hidden rounded-full shadow-2xs group-hover:border-brand-gold transition-colors">
                  <Image
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=200&auto=format&fit=crop"
                    alt="KEEN CHIT Artisan Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`font-brandon text-xl sm:text-2xl font-semibold tracking-[0.22em] uppercase group-hover:text-brand-gold transition-colors leading-none ${
                    isFloatingOverHero ? "text-white" : "text-brand-charcoal"
                  }`}>
                    KEEN CHIT
                  </span>
                  <span className={`font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.32em] font-normal mt-1 transition-colors ${
                    isFloatingOverHero ? "text-stone-300" : "text-brand-charcoal-muted"
                  }`}>
                    {t("brandTagline")}
                  </span>
                </div>
              </Link>
            </div>

            {/* 2. CENTER COLUMN: Compact, Simple & Refined Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 items-center justify-center px-2 lg:px-4">
              <div
                ref={searchContainerRef}
                className={`relative w-full max-w-[240px] lg:max-w-[280px] xl:max-w-[320px] ${
                  isSearchDropdownOpen ? "z-50" : "z-20"
                }`}
              >
                {/* Minimalist Single-Line Search Bar Input (Clean & Blank) */}
                <div
                  onClick={() => setIsSearchDropdownOpen(true)}
                  className={`w-full flex items-center border-b pb-1 px-1 transition-all group cursor-text ${
                    isSearchDropdownOpen
                      ? "border-brand-gold relative z-50"
                      : isFloatingOverHero
                      ? "border-white/30 focus-within:border-brand-gold"
                      : "border-stone-300/80 dark:border-stone-700/80 focus-within:border-brand-gold"
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-brand-gold shrink-0 mr-2 transition-transform group-focus-within:scale-110" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchDropdownOpen(true);
                    }}
                    onFocus={() => setIsSearchDropdownOpen(true)}
                    onClick={() => setIsSearchDropdownOpen(true)}
                    placeholder=""
                    autoComplete="off"
                    spellCheck="false"
                    className={`w-full bg-transparent text-xs tracking-wide focus:outline-none placeholder:text-transparent cursor-text ${
                      isFloatingOverHero ? "text-white placeholder:text-stone-300" : "text-brand-charcoal dark:text-stone-100"
                    }`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5 ml-1 transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Rich Discovery & Search Dropdown Overlay */}
                {isSearchDropdownOpen && (
                  <div
                    style={searchDropdownStyles.style}
                    className={`absolute top-full left-1/2 -translate-x-1/2 w-[92vw] sm:w-[620px] md:w-[700px] lg:w-[820px] max-w-[850px] mt-2.5 border border-stone-200 dark:border-stone-800 shadow-[0_30px_70px_rgba(0,0,0,0.22)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.85)] p-4 sm:p-5 z-50 rounded-sm bg-white dark:bg-[#121914] text-stone-900 dark:text-stone-100 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 opacity-100 select-none ${searchDropdownStyles.className}`}
                  >
                    {/* Header: Title + Simple Close Icon (No ESC clutter) */}
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200/70 dark:border-stone-800">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-brand-gold font-bold">
                        {searchQuery.trim()
                          ? `${isBangla ? "অনুসন্ধানের ফলাফল" : "Search Matches"} (${searchResults.length})`
                          : t("searchFeatured")}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsSearchDropdownOpen(false)}
                        className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 p-1 transition-colors cursor-pointer"
                        title="Close"
                        aria-label="Close search dropdown"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Discovery View when search input is empty */}
                    {!searchQuery.trim() ? (
                      <div className="space-y-4">
                        {/* 1. Popular Searches Section (At the TOP above Curated Highlights) */}
                        <div className="pb-3 border-b border-stone-200/70 dark:border-stone-800">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold shrink-0">
                              {t("popularSearchesTitle")}:
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <button
                                type="button"
                                onClick={() => handlePopularSearchClick(t("tagPatchwork"), "/collections?search=Patchwork")}
                                className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                              >
                                {t("tagPatchwork")}
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePopularSearchClick(t("tagCombo"), "/collections?search=Combo")}
                                className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                              >
                                {t("tagCombo")}
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePopularSearchClick(t("tagBestSeller"), "/collections?filter=best-seller")}
                                className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                              >
                                {t("tagBestSeller")}
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePopularSearchClick(t("tagBelgianLinen"), "/collections?search=Linen")}
                                className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                              >
                                {t("tagBelgianLinen")}
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePopularSearchClick(t("tagItalianVelvet"), "/collections?search=Velvet")}
                                className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                              >
                                {t("tagItalianVelvet")}
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePopularSearchClick(t("tagNakshiKantha"), "/collections?search=Kantha")}
                                className="text-[11px] px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-brand-gold hover:text-[#0E1410] dark:hover:bg-brand-gold dark:hover:text-[#0E1410] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full transition-all cursor-pointer font-medium"
                              >
                                {t("tagNakshiKantha")}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 2. Curated Highlights: Exactly 3 Attractive Discovery Cards */}
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-semibold block mb-2.5">
                            {isBangla ? "কিউরেটেড কালেকশন" : "Curated Collections"}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            
                            {/* Card 1: New Arrival */}
                            <Link
                              href="/collections?filter=new-arrivals"
                              onClick={() => setIsSearchDropdownOpen(false)}
                              className="group block relative overflow-hidden bg-white dark:bg-[#161F18] border border-stone-200 dark:border-stone-800 p-2.5 hover:border-brand-gold/60 transition-all shadow-xs hover:shadow-md"
                            >
                              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                                <Image
                                  src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop"
                                  alt={t("cardNewArrivalTitle")}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2">
                                  <span className="bg-brand-gold text-[#0E1410] text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm">
                                    {t("cardNewArrivalBadge")}
                                  </span>
                                </div>
                              </div>
                              <h5 className="font-jost text-xs sm:text-sm font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors line-clamp-1">
                                {t("cardNewArrivalTitle")}
                              </h5>
                              <p className="font-sans text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                                {t("cardNewArrivalDesc")}
                              </p>
                            </Link>

                            {/* Card 2: Back in Stock */}
                            <Link
                              href="/collections?filter=back-in-stock"
                              onClick={() => setIsSearchDropdownOpen(false)}
                              className="group block relative overflow-hidden bg-white dark:bg-[#161F18] border border-stone-200 dark:border-stone-800 p-2.5 hover:border-brand-gold/60 transition-all shadow-xs hover:shadow-md"
                            >
                              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                                <Image
                                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
                                  alt={t("cardBackInStockTitle")}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2">
                                  <span className="bg-[#3F4D38] text-brand-gold text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm border border-brand-gold/40">
                                    {t("cardBackInStockBadge")}
                                  </span>
                                </div>
                              </div>
                              <h5 className="font-jost text-xs sm:text-sm font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors line-clamp-1">
                                {t("cardBackInStockTitle")}
                              </h5>
                              <p className="font-sans text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                                {t("cardBackInStockDesc")}
                              </p>
                            </Link>

                            {/* Card 3: Upcoming */}
                            <Link
                              href="/curtains"
                              onClick={() => setIsSearchDropdownOpen(false)}
                              className="group block relative overflow-hidden bg-white dark:bg-[#161F18] border border-stone-200 dark:border-stone-800 p-2.5 hover:border-brand-gold/60 transition-all shadow-xs hover:shadow-md"
                            >
                              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-2">
                                <Image
                                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                                  alt={t("cardUpcomingTitle")}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2">
                                  <span className="bg-stone-900/90 text-stone-200 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm border border-stone-700">
                                    {t("cardUpcomingBadge")}
                                  </span>
                                </div>
                              </div>
                              <h5 className="font-jost text-xs sm:text-sm font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors line-clamp-1">
                                {t("cardUpcomingTitle")}
                              </h5>
                              <p className="font-sans text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                                {t("cardUpcomingDesc")}
                              </p>
                            </Link>

                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Live Results View */
                      <div>
                        {searchResults.length === 0 ? (
                          <div className="py-6 text-center space-y-1">
                            <p className="text-xs font-serif text-stone-800 dark:text-stone-200">
                              {isBangla ? `"${searchQuery}" এর জন্য কোনো প্রোডাক্ট পাওয়া যায়নি` : `No pieces found for "${searchQuery}"`}
                            </p>
                            <p className="text-[10px] text-stone-400">
                              {isBangla ? "Linen, Velvet, বা Silk দিয়ে খুঁজে দেখতে পারেন" : "Try searching for Linen, Velvet, or Silk"}
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {searchResults.slice(0, 6).map((product) => (
                              <div
                                key={product.id}
                                onClick={() => {
                                  setQuickViewProduct(product);
                                  setIsSearchDropdownOpen(false);
                                }}
                                className="group/item flex items-center justify-between gap-2.5 p-2 bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800/90 border border-stone-200/70 dark:border-stone-800 transition-all cursor-pointer shadow-2xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="relative w-11 h-11 bg-stone-200 dark:bg-stone-800 shrink-0 overflow-hidden">
                                    <Image
                                      src={product.primaryImage}
                                      alt={product.name}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover/item:scale-105"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className="font-jost text-xs font-bold uppercase tracking-[0.04em] text-stone-900 dark:text-stone-100 group-hover/item:text-brand-gold transition-colors truncate">
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

                        {searchResults.length > 6 && (
                          <Link
                            href={`/collections?search=${encodeURIComponent(searchQuery)}`}
                            onClick={() => setIsSearchDropdownOpen(false)}
                            className="block text-center text-[10px] uppercase tracking-widest text-brand-gold hover:text-brand-gold-hover font-semibold pt-2.5 mt-2.5 border-t border-stone-200/70 dark:border-stone-800"
                          >
                            {isBangla ? `সবগুলো (${searchResults.length}) ফলাফল দেখুন →` : `View All ${searchResults.length} Products →`}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 3. RIGHT COLUMN: Actions (LanguageToggle, ThemeToggle, Bag) */}
            <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 shrink-0">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className={`md:hidden p-2 hover:text-brand-gold cursor-pointer transition-colors ${
                  isFloatingOverHero ? "text-white" : "text-stone-700 dark:text-stone-200"
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-brand-gold" />
              </button>

              {/* Light / Dark Mode Toggle */}
              <ThemeToggle />

              {/* Cart / Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 hover:text-brand-gold transition-colors group flex items-center justify-center cursor-pointer ${
                  isFloatingOverHero ? "text-white" : "text-stone-700 dark:text-stone-200"
                }`}
                aria-label="View Shopping Bag"
                title={`Shopping Bag (${totalItems} items)`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-brand-gold transition-transform group-hover:scale-110" />
                  <span
                    className="absolute -top-1 -right-1.5 text-[9.5px] w-4 h-4 min-w-[16px] rounded-full flex items-center justify-center font-bold font-sans transition-all bg-brand-gold text-[#0E1410] shadow-sm border border-[#F8F6F0] dark:border-[#141A16] select-none leading-none"
                  >
                    {totalItems}
                  </span>
                </div>
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMoreDrawerOpen(!isMoreDrawerOpen)}
                className={`p-2 hover:text-brand-gold md:hidden cursor-pointer ${
                  isFloatingOverHero ? "text-white" : "text-stone-700 dark:text-stone-200"
                }`}
                aria-label="Toggle navigation menu"
              >
                {isMoreDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

      {/* Bar 3: Option Bar (Category Navigation Strip & Hover Mega-Menu - Floating directly over Hero with 100% transparency) */}
      <header
        style={isFloatingOverHero ? undefined : headerStyles.style}
        className={`relative z-10 w-full transition-all duration-300 hidden md:block ${
          isSearchDropdownOpen ? "blur-[2.5px] opacity-75 pointer-events-none" : "blur-none opacity-100"
        } ${
          isFloatingOverHero
            ? "bg-transparent border-b border-transparent shadow-none"
            : isCollapsed
            ? "shadow-md bg-white/95 dark:bg-[#0E1410]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300"
            : "shadow-xs bg-white/90 dark:bg-[#0E1410]/90 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60 text-stone-700 dark:text-stone-300"
        } ${!isFloatingOverHero ? headerStyles.className : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative z-10 transition-all duration-300 ${
              isSearchDropdownOpen ? "opacity-80" : "opacity-100"
            }`}
          >
            <nav
              ref={navContainerRef}
              onMouseLeave={handleMouseLeaveMenu}
              className={`relative flex items-center justify-center gap-6 lg:gap-8 text-[11.5px] uppercase tracking-[0.18em] py-2.5 font-medium select-none transition-colors duration-300 ${
                isFloatingOverHero ? "text-white" : "text-stone-700 dark:text-stone-300"
              }`}
            >
              {navCategories.map((cat) => {
                const isCurrentPage = activePageKey === cat.key;
                const isHovered = hoveredKey === cat.key;
                const hasSubmenu = ["cushions", "curtains", "quilts", "shawls"].includes(cat.key);

                return (
                  <div
                    key={cat.key}
                    onMouseEnter={() => handleMouseEnterMenu(cat.key)}
                    className="relative py-1 cursor-pointer group"
                  >
                    <Link
                      href={cat.href}
                      onClick={handleCategoryClick}
                      className={`inline-flex items-center gap-1.5 transition-colors duration-200 py-1 ${
                        isHovered
                          ? "text-brand-gold font-semibold"
                          : isCurrentPage
                          ? "text-brand-gold font-bold"
                          : isFloatingOverHero
                          ? "text-white hover:text-brand-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]"
                          : "text-stone-700 dark:text-stone-300 hover:text-brand-gold"
                      }`}
                    >
                      {/* Name text span with exact ref measurement */}
                      <span
                        ref={(el) => {
                          navItemRefs.current[cat.key] = el;
                        }}
                        className="whitespace-nowrap inline-block"
                      >
                        {cat.name}
                      </span>
                      {hasSubmenu && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            isHovered
                              ? "rotate-180 text-brand-gold"
                              : isFloatingOverHero
                              ? "text-white/90 group-hover:text-brand-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                              : "text-stone-400 group-hover:text-brand-gold"
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}

              {/* Single Smooth Sliding Underline Indicator Bar (Glides effortlessly, matching exact text width of option name) */}
              <span
                aria-hidden="true"
                className={`absolute bottom-0.5 left-0 m-0 h-[2px] bg-brand-gold rounded-full pointer-events-none will-change-transform ${
                  isMounted
                    ? "transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    : "transition-none"
                } ${indicatorStyle.opacity > 0 ? "opacity-100" : "opacity-0"}`}
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            </nav>

            {/* Editorial Mega-Menu Dropdown Panel on Hover */}
            {activeMegaMenu && currentMegaMenus[activeMegaMenu] && (
              <div
                onMouseEnter={() => {
                  if (megaMenuTimeoutRef.current) {
                    clearTimeout(megaMenuTimeoutRef.current);
                    megaMenuTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleMouseLeaveMenu}
                className="absolute left-0 right-0 top-full pt-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
              >
                <div className="bg-white dark:bg-[#0C120E] border border-stone-200 dark:border-stone-800 shadow-[0_30px_70px_rgba(0,0,0,0.22)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.85)] p-6 lg:p-8">
                  <div className="grid grid-cols-12 gap-6 lg:gap-8">
                    {/* Left Columns: Sub-categories and Atelier Curations */}
                    <div className="col-span-5 grid grid-cols-2 gap-6 border-r border-stone-200/80 dark:border-stone-800/80 pr-6">
                      {currentMegaMenus[activeMegaMenu].columns.map((col, idx) => (
                        <div key={idx} className="space-y-3">
                          <span className="font-jost text-sm font-semibold tracking-wider text-stone-900 dark:text-stone-100 uppercase block pb-1 border-b border-stone-100 dark:border-stone-800">
                            {col.title}
                          </span>
                          <ul className="space-y-2.5">
                            {col.links.map((link, lIdx) => (
                              <li key={lIdx}>
                                <Link
                                  href={link.href}
                                  onClick={handleCategoryClick}
                                  className="text-xs text-stone-600 dark:text-stone-400 hover:text-brand-gold dark:hover:text-brand-gold transition-colors block py-0.5"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Right Columns: Exactly 2 Editorial Feature Cards */}
                    <div className="col-span-7 grid grid-cols-2 gap-5">
                      {currentMegaMenus[activeMegaMenu].featured.map((item, fIdx) => (
                        <Link
                          key={fIdx}
                          href={item.href}
                          onClick={handleCategoryClick}
                          className="group block relative overflow-hidden bg-stone-50 dark:bg-[#111813] border border-stone-200/80 dark:border-stone-800 p-2.5 hover:border-brand-gold/60 transition-all shadow-sm hover:shadow-md"
                        >
                          <div className="relative aspect-[16/11] overflow-hidden bg-stone-200 dark:bg-stone-800 mb-3">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                            <div className="absolute top-3 left-3">
                              <span className="bg-brand-gold text-[#0E1410] text-[9.5px] uppercase tracking-widest font-bold px-2.5 py-1 shadow-md">
                                {item.badge}
                              </span>
                            </div>
                          </div>
                          <h4 className="font-jost text-sm lg:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors uppercase tracking-wide">
                            {item.title}
                          </h4>
                          <p className="font-sans text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
                            {item.subtitle}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-widest text-brand-gold font-semibold mt-2 group-hover:underline">
                            <span>{item.ctaText}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      </div>
    </>
  );
}

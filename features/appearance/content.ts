/**
 * ============================================================================
 * KEEN CHIT - Feature: Appearance / Content (Data & Types)
 * ============================================================================
 */

export interface AnnouncementContent {
  text: string;
  promoBadge: string;
  freeShippingThreshold: number;
  transparency: number;
  shadePreset: string;
  customColorLight: string;
  customColorDark: string;
}

export interface HeaderContent {
  transparency: number;
  blur: boolean;
  shadePreset: string;
  customColorLight: string;
  customColorDark: string;
}

export interface HeroContent {
  badge: string;
  headlinePrefix: string;
  headlineEmphasis: string;
  subtext: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  featuredItemTitle: string;
  featuredItemBadge: string;
  featuredItemPrice: number;
  featuredItemLink: string;
  infoBarTransparency: number;
  infoBarShade: string;
  infoBarCustomColor: string;
  image?: string;
  imagePositionX?: number;
  imagePositionY?: number;
  imageZoom?: number;
  frameAspectRatio?: string;
}

export interface NavigationItem {
  id: string;
  key: string;
  name: string;
  href: string;
  isVisible: boolean;
}

export interface MegaMenuCard {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  ctaText: string;
}

export interface MegaMenuColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  featured: MegaMenuCard[];
}

export interface ProductDisplayContent {
  bundlePromoText: string;
  defaultDiscountPercent: number;
  pricePrefix: string;
  sizesLabel: string;
  fabricBadgeDefault: string;
}

export interface StoryContent {
  philosophyTag: string;
  headline: string;
  subtext: string;
  promiseBadge: string;
  promiseQuote: string;
  promiseAuthor: string;
  sectionBgColor: string;
}

export interface FooterContent {
  newsletterTag: string;
  newsletterHeadline: string;
  newsletterSubtext: string;
  privilegeCode: string;
  whatsappNumber: string;
  whatsappLabel?: string;
  studioLocation?: string;
  bgColor: string;
}

export interface BrandColors {
  gold: string;
  olive: string;
  terracotta: string;
  linenLight: string;
  linenDark: string;
}

export interface AnalyticsConfig {
  ga4MeasurementId?: string;
  isGa4Enabled?: boolean;
  trackPurchases?: boolean;
  trackCartEvents?: boolean;
}

export interface FrontendContent {
  announcement: AnnouncementContent;
  header: HeaderContent;
  hero: HeroContent;
  products: ProductDisplayContent;
  story?: StoryContent;
  craftsmanshipStory?: StoryContent;
  footer: FooterContent;
  brandColors?: BrandColors;
  navigation?: NavigationItem[];
  megaMenus?: Record<string, MegaMenuConfig>;
  analytics?: AnalyticsConfig;
  updatedAt?: string;
}

export const DEFAULT_FRONTEND_CONTENT: FrontendContent = {
  announcement: {
    text: "COMPLIMENTARY WHITE-GLOVE DELIVERY ON ORDERS OVER ৳3,000 ACROSS BANGLADESH",
    promoBadge: "COMPLIMENTARY",
    freeShippingThreshold: 3000,
    transparency: 100,
    shadePreset: "olive",
    customColorLight: "#3F4D38",
    customColorDark: "#1B2418",
  },
  header: {
    transparency: 94,
    blur: true,
    shadePreset: "linen",
    customColorLight: "#F8F6F0",
    customColorDark: "#0E1410",
  },
  hero: {
    badge: "NEW LUXURY ARRIVALS",
    headlinePrefix: "Architectural Linen.",
    headlineEmphasis: "Tactile Warmth.",
    subtext: "Meticulously tailored from stone-washed Belgian flax, double-pile Italian velvet, and heritage Nakshi threadwork. Designed to transform modern living spaces into calm, tactile sanctuaries.",
    primaryCtaText: "Shop Cushions",
    primaryCtaLink: "/collections",
    secondaryCtaText: "Our Craftsmanship",
    secondaryCtaLink: "/#craftsmanship",
    featuredItemTitle: "The Marais Belgian Linen & Velvet Pair",
    featuredItemBadge: "FEATURED LIVING SET",
    featuredItemPrice: 2450,
    featuredItemLink: "/collections",
    infoBarTransparency: 80,
    infoBarShade: "linen",
    infoBarCustomColor: "#F8F6F0",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    imagePositionX: 50,
    imagePositionY: 50,
    imageZoom: 100,
    frameAspectRatio: "4/5",
  },
  products: {
    bundlePromoText: "Bundle and Save 10%",
    defaultDiscountPercent: 10,
    pricePrefix: "From",
    sizesLabel: "Multiple Sizes",
    fabricBadgeDefault: "Handcrafted Artisan Weave",
  },
  story: {
    philosophyTag: "HERITAGE & DESIGN INTEGRITY",
    headline: "Heirloom craftsmanship woven for modern sanctuaries.",
    subtext: "Every Keen Chit cushion is an architectural statement of comfort. Woven in strictly limited atelier batches using certified organic European flax and centuries-old Bengal needlecraft.",
    promiseBadge: "40+ HOURS NEEDLEWORK",
    promiseQuote: "True luxury lives in the invisible stitches, honest tactile fibers, and quiet patience behind every creation.",
    promiseAuthor: "The Keen Chit Atelier Collective",
    sectionBgColor: "#121A14",
  },
  craftsmanshipStory: {
    philosophyTag: "HERITAGE & DESIGN INTEGRITY",
    headline: "Heirloom craftsmanship woven for modern sanctuaries.",
    subtext: "Every Keen Chit cushion is an architectural statement of comfort. Woven in strictly limited atelier batches using certified organic European flax and centuries-old Bengal needlecraft.",
    promiseBadge: "40+ HOURS NEEDLEWORK",
    promiseQuote: "True luxury lives in the invisible stitches, honest tactile fibers, and quiet patience behind every creation.",
    promiseAuthor: "The Keen Chit Atelier Collective",
    sectionBgColor: "#121A14",
  },
  footer: {
    newsletterTag: "THE PRIVATE ATELIER REGISTER",
    newsletterHeadline: "Receive Private Invitations to Limited Fabric Drops",
    newsletterSubtext: "Join our circle of connoisseurs. Enjoy a 10% bespoke privilege code on your first cushion order and early access to upcoming Curtains and Nakshi Katha releases.",
    privilegeCode: "KEEN10",
    whatsappNumber: "+880 1700-000000",
    bgColor: "#121A14",
  },
  brandColors: {
    gold: "#D4AF37",
    olive: "#3F4D38",
    terracotta: "#993D2C",
    linenLight: "#F8F6F0",
    linenDark: "#0E1410",
  },
  navigation: [
    { id: "nav-1", key: "cushions", name: "LUXURY CUSHIONS", href: "/collections", isVisible: true },
    { id: "nav-2", key: "curtains", name: "BESPOKE CURTAINS", href: "/curtains", isVisible: true },
    { id: "nav-3", key: "quilts", name: "QUILTS & KATHA", href: "/quilts", isVisible: true },
    { id: "nav-4", key: "shawls", name: "SHAL & CHADOR", href: "/shawls", isVisible: true },
    { id: "nav-5", key: "care-guide", name: "CARE GUIDE", href: "/care-guide", isVisible: true },
    { id: "nav-6", key: "about", name: "OUR ATELIER", href: "/about", isVisible: true },
    { id: "nav-7", key: "concierge", name: "CONCIERGE", href: "/contact", isVisible: true },
  ],
  megaMenus: {
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
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
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
          title: "Artisan Wraps",
          links: [
            { label: "Pure Kashmiri Cashmere", href: "/shawls" },
            { label: "Mulberry Silk Embroidered Stoles", href: "/shawls" },
            { label: "Handspun Khadi Winter Shawls", href: "/shawls" },
            { label: "Bespoke Monogramming", href: "/contact" },
            { label: "Shop All Shawls & Wraps →", href: "/shawls" },
          ],
        },
        {
          title: "Styling & Care",
          links: [
            { label: "Draping & Layering Guide", href: "/care-guide" },
            { label: "Natural Moth Protection & Storage", href: "/care-guide" },
            { label: "Complimentary Silk Gift Box", href: "/contact" },
          ],
        },
      ],
      featured: [
        {
          badge: "BESPOKE EDITION",
          title: "Heritage Handspun Cashmere Chador",
          subtitle: "Spun by master spinners in the Kashmir valley",
          image:
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
          href: "/shawls",
          ctaText: "Discover Pure Cashmere →",
        },
        {
          badge: "RESTOCKED",
          title: "Artisan Silk Nakshi Stole",
          subtitle: "Rajshahi raw silk with dense floral needlework border",
          image:
            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
          href: "/shawls",
          ctaText: "Shop Restocked Shawls →",
        },
      ],
    },
  },
  analytics: {
    ga4MeasurementId: "",
    isGa4Enabled: false,
    trackPurchases: true,
    trackCartEvents: true,
  },
  updatedAt: new Date().toISOString(),
};

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
    philosophyTag: "OUR PHILOSOPHY",
    headline: "Crafted Without Compromise,\nRooted in Heritage.",
    subtext: "At KEEN CHIT, we believe your sanctuary deserves objects made with patience and devotion. In a world saturated with synthetic, fleeting decor, our pieces celebrate the organic warmth of pure natural fibers and human touch.",
    promiseBadge: "40+ HOURS NEEDLEWORK",
    promiseQuote: "True luxury lives in the invisible stitches, honest tactile fibers, and quiet patience behind every creation.",
    promiseAuthor: "The Keen Chit Atelier Collective",
    sectionBgColor: "#2B3826",
  },
  craftsmanshipStory: {
    philosophyTag: "OUR PHILOSOPHY",
    headline: "Crafted Without Compromise,\nRooted in Heritage.",
    subtext: "At KEEN CHIT, we believe your sanctuary deserves objects made with patience and devotion. In a world saturated with synthetic, fleeting decor, our pieces celebrate the organic warmth of pure natural fibers and human touch.",
    promiseBadge: "40+ HOURS NEEDLEWORK",
    promiseQuote: "True luxury lives in the invisible stitches, honest tactile fibers, and quiet patience behind every creation.",
    promiseAuthor: "The Keen Chit Atelier Collective",
    sectionBgColor: "#2B3826",
  },
  footer: {
    newsletterTag: "",
    newsletterHeadline: "Receive Private Invitations to Limited Fabric Drops",
    newsletterSubtext: "Enjoy 10% courtesy on your first order and priority access to limited atelier releases.",
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
    { id: "nav-1", key: "sashiko", name: "SASHIKO", href: "/collections?category=sashiko", isVisible: true },
    { id: "nav-2", key: "patchwork", name: "PATCHWORK", href: "/collections?category=patchwork", isVisible: true },
    { id: "nav-3", key: "one-line-art", name: "ONE LINE ART", href: "/collections?category=one-line-art", isVisible: true },
    { id: "nav-4", key: "solid-pattern", name: "SOLID PATTERN", href: "/collections?category=solid-pattern", isVisible: true },
    { id: "nav-5", key: "wall-hanging", name: "WALL HANGING", href: "/collections?category=wall-hanging", isVisible: true },
    { id: "nav-6", key: "curtains", name: "CURTAIN", href: "/curtains", isVisible: true },
    { id: "nav-7", key: "quilts", name: "KANTHA QUILTS", href: "/quilts", isVisible: true },
  ],
  megaMenus: {
    sashiko: {
      columns: [
        {
          title: "Sashiko Techniques",
          links: [
            { label: "Hitomezashi Single-Stitch", href: "/collections?category=sashiko" },
            { label: "Moyozashi Patterned Threadwork", href: "/collections?category=sashiko" },
            { label: "Kogin-Zashi Indigo Weaves", href: "/collections?category=sashiko" },
            { label: "Geometric Diamond Grids", href: "/collections?category=sashiko" },
            { label: "Shop All Sashiko →", href: "/collections?category=sashiko" },
          ],
        },
        {
          title: "Artisan Styling",
          links: [
            { label: "Japandi Living Room Accents", href: "/collections?category=sashiko" },
            { label: "Architectural Lumbar Cushions", href: "/collections?category=sashiko" },
            { label: "Bespoke Inlay Commissions", href: "/contact" },
            { label: "Indigo & Bone Monochrome", href: "/collections?category=sashiko" },
          ],
        },
      ],
      featured: [
        {
          badge: "NEW ARRIVAL",
          title: "Geometric Running-Stitch Cushion",
          subtitle: "Natural indigo organic cotton with precision hand-sewn lines",
          image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=sashiko",
          ctaText: "Discover Sashiko →",
        },
        {
          badge: "ATELIER EDIT",
          title: "Hitomezashi Accent Lumbar",
          subtitle: "Over 35 hours of rhythmic Japanese geometric threadwork",
          image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=sashiko",
          ctaText: "Explore Collection →",
        },
      ],
    },
    patchwork: {
      columns: [
        {
          title: "Artisanal Assemblage",
          links: [
            { label: "Belgian Flax & Silk Collage", href: "/collections?category=patchwork" },
            { label: "Wabi-Sabi Boro Remnants", href: "/collections?category=patchwork" },
            { label: "Handspun Khadi Piecing", href: "/collections?category=patchwork" },
            { label: "Earth-Dyed Linen Inlays", href: "/collections?category=patchwork" },
            { label: "Shop All Patchwork →", href: "/collections?category=patchwork" },
          ],
        },
        {
          title: "Living Room Styling",
          links: [
            { label: "Tone-on-Tone Palettes", href: "/collections?category=patchwork" },
            { label: "Textile Fragment Storytelling", href: "/about" },
            { label: "Limited Studio Batches", href: "/collections?category=patchwork" },
          ],
        },
      ],
      featured: [
        {
          badge: "LIMITED EDITION",
          title: "The Boro Artisanal Collage Cushion",
          subtitle: "Hand-pieced vintage linen and indigo-dyed remnant squares",
          image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=patchwork",
          ctaText: "Explore Patchwork →",
        },
        {
          badge: "STUDIO DROP",
          title: "Terracotta & Flax Assemblage",
          subtitle: "Warm stone-washed raw silk and organic flax collage",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=patchwork",
          ctaText: "View Pieces →",
        },
      ],
    },
    "one-line-art": {
      columns: [
        {
          title: "Continuous Contour",
          links: [
            { label: "Minimalist Botanical Contours", href: "/collections?category=one-line-art" },
            { label: "Modern Silhouette Threadwork", href: "/collections?category=one-line-art" },
            { label: "Monochrome Black on Oatmeal", href: "/collections?category=one-line-art" },
            { label: "Organic Line Cushions", href: "/collections?category=one-line-art" },
            { label: "Shop All One Line Art →", href: "/collections?category=one-line-art" },
          ],
        },
        {
          title: "Interior Aesthetic",
          links: [
            { label: "Japandi & Scandinavian Decor", href: "/collections?category=one-line-art" },
            { label: "Gallery Wall Cushion Pairings", href: "/collections?category=one-line-art" },
            { label: "Care for Fine Line Embroidery", href: "/care-guide" },
          ],
        },
      ],
      featured: [
        {
          badge: "SIGNATURE DESIGN",
          title: "Minimalist Silhouette Contour Cushion",
          subtitle: "Single uninterrupted thread contour on unbleached Belgian linen",
          image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=one-line-art",
          ctaText: "Explore Line Art →",
        },
        {
          badge: "CURATOR'S CHOICE",
          title: "Abstract Flora Line Threadwork",
          subtitle: "Sculptural continuous thread lines on stone-washed canvas",
          image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=one-line-art",
          ctaText: "Shop Collection →",
        },
      ],
    },
    "solid-pattern": {
      columns: [
        {
          title: "Pure Natural Flax",
          links: [
            { label: "Stone-Washed Belgian Linen", href: "/collections?category=solid-pattern" },
            { label: "Heavy Tactile Waffle Weaves", href: "/collections?category=solid-pattern" },
            { label: "Frayed Raw Border Cushions", href: "/collections?category=solid-pattern" },
            { label: "Double-Pile Italian Velvet", href: "/collections?category=solid-pattern" },
            { label: "Shop All Solid Patterns →", href: "/collections?category=solid-pattern" },
          ],
        },
        {
          title: "Atelier Palettes",
          links: [
            { label: "Oatmeal & Bone White", href: "/collections?category=solid-pattern" },
            { label: "Warm Terracotta & Clay", href: "/collections?category=solid-pattern" },
            { label: "Muted Forest Olive", href: "/collections?category=solid-pattern" },
            { label: "Midnight Cypress Noir", href: "/collections?category=solid-pattern" },
          ],
        },
      ],
      featured: [
        {
          badge: "BESTSELLER",
          title: "The Marais Pure Belgian Flax",
          subtitle: "Pre-washed with natural pumice stones for unmatched tactile softness",
          image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=solid-pattern",
          ctaText: "Discover Solid Linen →",
        },
        {
          badge: "NEW ARRIVAL",
          title: "Avignon Tactile Honeycomb Flax",
          subtitle: "380 GSM deep 3D waffle weave with unbleached organic yarn",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=solid-pattern",
          ctaText: "Shop Waffle Weave →",
        },
      ],
    },
    "wall-hanging": {
      columns: [
        {
          title: "Architectural Tapestry",
          links: [
            { label: "Handwoven Fiber Art Murals", href: "/collections?category=wall-hanging" },
            { label: "Textured Linen & Wool Weaves", href: "/collections?category=wall-hanging" },
            { label: "Solid Brass Hanging Rods", href: "/collections?category=wall-hanging" },
            { label: "Bespoke Wall Installations", href: "/contact" },
            { label: "Shop All Wall Hangings →", href: "/collections?category=wall-hanging" },
          ],
        },
        {
          title: "Installation & Spaces",
          links: [
            { label: "Foyer & Staircase Tapestries", href: "/collections?category=wall-hanging" },
            { label: "Acoustic Wall Fiber Panels", href: "/collections?category=wall-hanging" },
            { label: "Living Room Art Direction", href: "/about" },
          ],
        },
      ],
      featured: [
        {
          badge: "ARCHITECTURAL ART",
          title: "The Woven Sanctuary Tapestry",
          subtitle: "Hand-spun unbleached wool and natural linen fiber mural",
          image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=wall-hanging",
          ctaText: "Explore Tapestries →",
        },
        {
          badge: "NEW IN ATELIER",
          title: "Sculptural Woven Wall Scroll",
          subtitle: "Textural contrast with brushed solid brass mounting bar",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
          href: "/collections?category=wall-hanging",
          ctaText: "View Fiber Art →",
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

/**
 * ============================================================================
 * KEEN CHIT - Feature: Catalog / Products (Data & Types)
 * ============================================================================
 */

export interface ProductColor {
  name: string; // Color name, e.g. 'Oatmeal Beige'
  hex: string;  // Color hex code, e.g. '#D5CCC0'
}

export interface Product {
  id: string;                                           // Unique ID
  name: string;                                         // Product name
  tagline: string;                                      // Short tagline
  price: number;                                        // Price in BDT
  originalPrice?: number;                               // Original price if discounted
  category: "linen" | "velvet" | "embroidered" | "silk" | "patchwork" | "combo" | string;
  fabric: string;                                       // Fabric description
  threadCount?: string;                                 // Thread count
  closure: string;                                      // Closure / zipper style
  fillOption: string;                                   // Cushion insert option
  sizes: string[];                                      // Available sizes
  colors: ProductColor[];                               // Available color variants
  primaryImage: string;                                 // Primary image
  secondaryImage: string;                               // Hover / alternate image
  description: string;                                  // Full description
  careInstructions: string[];                           // Care instructions
  dimensions: string;                                   // Dimensions
  inStock: boolean;                                     // In stock flag
  stock?: number;                                       // Available inventory count
  featured?: boolean;                                   // Featured collection flag
  isBestSeller?: boolean;                               // Best seller badge flag
  badge?: string;                                       // Special badge
}

export interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

/** Standard cushion size options requested by user */
export const STANDARD_SIZES = ['16" × 16"', '18" × 18"', '20" × 20"'];

/**
 * Calculates dynamic price scaling according to selected size:
 * - 16" × 16": Base price - ৳200 (compact format)
 * - 18" × 18": Standard base price
 * - 20" × 20": Base price + ৳300 (generous format)
 */
export function getPriceForSize(basePrice: number, size?: string): number {
  if (!size) return basePrice;
  if (size.includes("16")) {
    return Math.max(500, basePrice - 200);
  }
  if (size.includes("20")) {
    return basePrice + 300;
  }
  return basePrice;
}

export function getOriginalPriceForSize(originalPrice: number | undefined, size?: string): number | undefined {
  if (!originalPrice) return undefined;
  if (!size) return originalPrice;
  if (size.includes("16")) {
    return Math.max(600, originalPrice - 200);
  }
  if (size.includes("20")) {
    return originalPrice + 300;
  }
  return originalPrice;
}

/**
 * Generates dynamic SKU based on product code and selected size:
 * - 16" × 16": KC-2026-N-01-16
 * - 18" × 18": KC-2026-N-01-18
 * - 20" × 20": KC-2026-N-01-20
 */
export function getSkuForProduct(product: Product, size?: string): string {
  const numMatch = product.id.match(/\d+$/);
  const cleanId = numMatch ? numMatch[0].padStart(2, "0") : product.id.slice(-4).toUpperCase();
  const sizeTag = size?.includes("16") ? "16" : size?.includes("20") ? "20" : "18";
  return `KC-2026-N-${cleanId}-${sizeTag}`;
}

export const PRODUCTS: Product[] = [
  {
    id: "kc-cushion-01",
    name: "The Marais Belgian Linen",
    tagline: "Stone-washed pure organic flax with raw frayed borders",
    price: 2450,
    originalPrice: 2850,
    category: "linen",
    fabric: "100% Belgian Organic Flax Linen",
    threadCount: "240 GSM heavy-weight weave",
    closure: "Concealed Japanese YKK Brass Zipper",
    fillOption: "Microfiber Plush or Duck Down Insert",
    sizes: STANDARD_SIZES,
    colors: [
      { name: "Oatmeal Beige", hex: "#E3DAC9" },
      { name: "Warm Terracotta", hex: "#B86B52" },
      { name: "Muted Olive", hex: "#7E846B" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    description: "Woven in small artisanal batches from long-staple European flax, the Marais Linen Cushion exudes effortless organic refinement. Pre-washed with natural pumice stones to achieve an exceptionally soft hand-feel that becomes softer and more characterful with every laundering.",
    careInstructions: [
      "Gentle machine wash on cold cycle using pH-neutral detergent",
      "Line dry in shade to preserve natural fiber tensile strength",
      "Warm steam iron while slightly damp if a crisper look is desired",
    ],
    dimensions: "Available in Square and Lumbar formats",
    inStock: true,
    stock: 2,
    featured: true,
    isBestSeller: true,
    badge: "🔥 Best Selling",
  },
  {
    id: "kc-cushion-02",
    name: "Nakshi Heritage Floral Cushion",
    tagline: "Intricate hand-embroidered artisanal threadwork",
    price: 3800,
    originalPrice: 4200,
    category: "embroidered",
    fabric: "Handspun Khadi Cotton with Silk Embroidery Threads",
    closure: "Hand-turned mother-of-pearl button closure",
    fillOption: "Dense Hypoallergenic Microfiber Cushion Pad Included",
    sizes: ["18\" × 18\"", "20\" × 20\""],
    colors: [
      { name: "Champagne Ivory", hex: "#F3EDE2" },
      { name: "Midnight Charcoal", hex: "#23201E" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "Honoring centuries-old rural Bengal needlecraft traditions, each Nakshi Floral cushion requires over forty hours of patient hand-embroidery. Skilled women artisans in Jamalpur translate heirloom botanical motifs using lustrous mulberry silk thread onto heavy unbleached cotton khadi.",
    careInstructions: [
      "Strictly dry clean only to safeguard delicate silk stitchwork",
      "Do not steam or iron directly over raised embroidery",
      "Store in breathable cotton protective covers when out of rotation",
    ],
    dimensions: "18\" × 18\" (45cm × 45cm) & 20\" × 20\" (50cm × 50cm)",
    inStock: true,
    featured: true,
    isBestSeller: false,
    badge: "Master Artisan",
  },
  {
    id: "kc-cushion-03",
    name: "Sienna Heavy Matte Velvet",
    tagline: "Ultra-heavy Italian matte velvet with piped contrast trim",
    price: 2950,
    category: "velvet",
    fabric: "Ultra-dense Italian Cotton-backed Matte Velvet",
    closure: "Invisible zip at lower base selvedge",
    fillOption: "Hungarian Goose Feather or Recycled Polyfill",
    sizes: ["18\" × 18\"", "22\" × 22\""],
    colors: [
      { name: "Deep Forest Jade", hex: "#1F342B" },
      { name: "Burnt Ochre Terracotta", hex: "#9E4733" },
      { name: "Midnight Cypress Noir", hex: "#141A16" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "A masterclass in tactile luxury. Our Sienna Velvet Cushion is loomed in Como, Italy, with a dense, non-crushable matte pile that captures natural light with subtle, velvety depth. Finished with an architectural 4mm self-piped border.",
    careInstructions: [
      "Professional dry cleaning recommended",
      "Brush pile gently with soft natural bristle garment brush",
      "Spot clean immediately with clean damp cloth (dab, never rub)",
    ],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    isBestSeller: true,
    badge: "🔥 Best Selling",
  },
  {
    id: "kc-cushion-04",
    name: "Avignon Heavy Waffle Linen",
    tagline: "Deep tactile honeycomb weave in organic unbleached yarn",
    price: 2600,
    originalPrice: 3100,
    category: "linen",
    fabric: "380 GSM Heavy Organic Waffle Weave Linen",
    closure: "Concealed bottom zip closure",
    fillOption: "Microfiber Cushion Insert Included",
    sizes: ["20\" × 20\"", "16\" × 26\" (Lumbar)"],
    colors: [
      { name: "Raw Ecru Flax", hex: "#D9D0C1" },
      { name: "Smoked Sage", hex: "#8A9483" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    description: "Celebrated for its sculptural depth and textural richness, the Avignon features an oversized honeycomb waffle texture woven from thick European flax. Exceptionally breathable yet substantial, it adds grounding tactile contrast to leather and smooth linen sofas.",
    careInstructions: [
      "Machine wash gentle at 30°C",
      "Air dry flat to maintain 3D honeycomb structure",
      "Do not iron to retain natural three-dimensional waffle relief",
    ],
    dimensions: "20\" × 20\" (50cm × 50cm)",
    inStock: true,
    featured: false,
    isBestSeller: false,
  },
  {
    id: "kc-cushion-05",
    name: "The Rajshahi Raw Silk Bolster",
    tagline: "Loom-spun indigenous mulberry silk with subtle slub texture",
    price: 3400,
    originalPrice: 3900,
    category: "silk",
    fabric: "100% Indigenous Handloom Mulberry Matka Silk",
    closure: "Envelope closure with hand-tied grosgrain silk ribbons",
    fillOption: "Contoured High-Resilience Cylinder Foam & Down Core",
    sizes: ["8\" × 24\" (Bolster)"],
    colors: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Antique Pearl", hex: "#EDE8DC" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop",
    description: "Crafted from hand-reeled Matka silk by master weavers along the banks of the Padma in Rajshahi. The natural slubbed texture of the raw silk yarn gives each cylindrical bolster an organic, imperfect luxury that reflects light with subdued warmth.",
    careInstructions: [
      "Specialist dry cleaning recommended",
      "Avoid direct prolonged exposure to intense sunlight",
      "Iron on low reverse side with pressing cloth",
    ],
    dimensions: "8\" Diameter × 24\" Length (20cm × 60cm)",
    inStock: true,
    featured: false,
    isBestSeller: true,
    badge: "🔥 Best Selling",
  },
  {
    id: "kc-cushion-06",
    name: "Geometric Kantha Minimalist",
    tagline: "Contemporary architectural line-stitch on dense handloom",
    price: 3100,
    originalPrice: 3500,
    category: "embroidered",
    fabric: "Handwoven Cotton Canvas with Contrast Cotton Stitching",
    closure: "Concealed antique brass zipper",
    fillOption: "Dense Hypoallergenic Microfiber Cushion Pad Included",
    sizes: ["18\" × 18\"", "20\" × 20\""],
    colors: [
      { name: "Charcoal & Bone", hex: "#2A2725" },
      { name: "Bone White & Tan", hex: "#E8E2D5" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "A modern reinterpretation of traditional Kantha stitching. Instead of intricate florals, this piece features bold linear grids and rhythmic dashed running stitches created entirely by hand. Perfectly bridges heritage artistry with Japandi and Bauhaus interior aesthetics.",
    careInstructions: [
      "Hand wash gently in cool water",
      "Lay flat to dry out of direct sun",
      "Warm iron inside out",
    ],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    isBestSeller: false,
    badge: "Modern Heritage",
  },
  {
    id: "kc-cushion-07",
    name: "The Boro Artisanal Patchwork",
    tagline: "Hand-pieced vintage linen and indigo-dyed remnant squares",
    price: 3600,
    category: "patchwork",
    fabric: "Reclaimed Belgian Linen, Handspun Khadi & Organic Cotton",
    closure: "Concealed YKK zipper on reverse ecru linen panel",
    fillOption: "Ultra-Dense Microfiber Insert Included",
    sizes: ["18\" × 18\""],
    colors: [
      { name: "Wabi-Sabi Indigo & Linen", hex: "#2D3E4E" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "Inspired by the Japanese philosophy of mottainai and the Bengal kantha tradition of repurposing beloved textiles. Each cushion cover is uniquely composed from tailored swatches of stone-washed linen and naturally fermented indigo-dyed khadi.",
    careInstructions: [
      "Dry clean or cold gentle hand wash",
      "Do not wring or tumble dry",
    ],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    badge: "Bespoke Patchwork",
  },
  {
    id: "kc-cushion-08",
    name: "The Atelier Linen & Velvet Combo Set",
    tagline: "Curated 2-piece luxury living room suite: Marais Belgian flax + Sienna velvet pair",
    price: 4850,
    originalPrice: 5400,
    category: "combo",
    fabric: "Belgian Flax Linen & Italian Double-Pile Velvet Pair",
    closure: "Concealed brass zippers on both cushions",
    fillOption: "Two Ultra-Plush Hypoallergenic Cushion Pads Included",
    sizes: ["Set of 2: 20\" × 20\""],
    colors: [
      { name: "Oatmeal & Forest Jade", hex: "#1F342B" },
      { name: "Terracotta & Espresso", hex: "#3D2B1F" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    description: "Our designer-recommended duo: one stone-washed European flax cushion paired with a sumptuous Italian matte velvet cushion. Instantly elevates modern living room sectionals.",
    careInstructions: [
      "Professional dry cleaning recommended for velvet",
      "Gentle cold cycle wash for linen cover",
    ],
    dimensions: "Two 20\" × 20\" (50cm × 50cm) Cushions",
    inStock: true,
    featured: true,
    isBestSeller: true,
    badge: "🔥 Best Selling Combo",
  },
  {
    id: "kc-cushion-ss5-sage",
    name: "Sage Green Printed Pure Flax Cushion",
    tagline: "Stone-washed Belgian flax with artisanal botanical block print",
    price: 2750,
    originalPrice: 3200,
    category: "linen",
    fabric: "100% Organic European Flax Linen",
    threadCount: "260 GSM heavy stone-wash",
    closure: "Concealed Antique Brass YKK Zipper",
    fillOption: "Microfiber Plush or Duck Down Insert",
    sizes: ["18\" × 18\"", "20\" × 20\"", "14\" × 24\" (Lumbar)"],
    colors: [
      { name: "Sage Botanical Green", hex: "#7E846B" },
      { name: "Oatmeal Beige", hex: "#E3DAC9" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    description: "As featured in our SS editorial edit. Woven from certified European organic flax and stone-washed to achieve an irresistibly soft, lived-in feel with delicate botanical sage motifs.",
    careInstructions: ["Gentle cold machine wash", "Line dry in shade", "Warm steam iron"],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    badge: "NEW ARRIVAL",
  },
  {
    id: "kc-cushion-09",
    name: "Cascading Belgian Drape Cushion",
    tagline: "Double-flanged pure organic flax in French Lavender",
    price: 2850,
    originalPrice: 3300,
    category: "linen",
    fabric: "European Long-Staple Flax Linen",
    closure: "Concealed YKK zipper",
    fillOption: "Dense Hypoallergenic Microfiber Pad",
    sizes: ["20\" × 20\""],
    colors: [{ name: "French Lavender Grey", hex: "#9E99A3" }],
    primaryImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "Elegantly tailored with a 1.5-inch raw-edge tailored flange. The French Lavender hue imparts tranquility to master bedroom suites.",
    careInstructions: ["Machine wash cold gentle", "Air dry flat"],
    dimensions: "20\" × 20\" (50cm × 50cm)",
    inStock: true,
    featured: true,
    badge: "NEW ARRIVAL",
  },
  {
    id: "kc-cushion-10",
    name: "Nordic Loom Textured Bouclé",
    tagline: "Sculptural heavy bouclé yarn with organic slub texture",
    price: 3200,
    originalPrice: 3750,
    category: "boucle",
    fabric: "Heavy Textured Wool & Cotton Bouclé",
    closure: "Concealed bottom zipper",
    fillOption: "High-Loft Feather Blend Insert Included",
    sizes: ["18\" × 18\"", "22\" × 22\""],
    colors: [{ name: "Alabaster Ecru", hex: "#EAE6DF" }],
    primaryImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    description: "Tactile depth with an architectural, cloud-like texture. Woven from chunky bouclé loops that bring Scandinavian hygge warmth to leather armchairs.",
    careInstructions: ["Spot clean only with damp cloth", "Professional dry cleaning"],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    badge: "NEW ARRIVAL",
  },
  {
    id: "kc-cushion-11",
    name: "Jaipur Block-Printed Botanical Cushion",
    tagline: "Hand-carved teakwood block print with mineral vegetable dyes",
    price: 3100,
    originalPrice: 3600,
    category: "embroidered",
    fabric: "100% Handloom Cotton Cambric",
    closure: "Mother-of-pearl buttons",
    fillOption: "Microfiber Pad Included",
    sizes: ["18\" × 18\""],
    colors: [{ name: "Indigo & Ochre", hex: "#2B3A42" }],
    primaryImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "A beloved heritage favorite restored after being sold out for 4 months. Printed by fourth-generation block printing artisans using natural indigo vat dyes.",
    careInstructions: ["Dry clean or hand wash cold with mild detergent"],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: false,
    badge: "RESTOCKED",
  },
  {
    id: "kc-cushion-12",
    name: "Monochrome One-Line Art Cushion",
    tagline: "Minimalist continuous contour line embroidery on flax",
    price: 2900,
    originalPrice: 3400,
    category: "embroidered",
    fabric: "Dense European Flax Linen with Black Silk Embroidery",
    closure: "Concealed bottom zip",
    fillOption: "Plush Feather Blend Insert",
    sizes: ["18\" × 18\"", "20\" × 20\""],
    colors: [{ name: "Bone & Charcoal", hex: "#EBE6DD" }],
    primaryImage: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "Contemporary one-line contour portrait hand-stitched with silk thread. An architectural statement piece for gallery-inspired living areas.",
    careInstructions: ["Gentle dry clean only"],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    badge: "ONE LINE ART",
  },
  {
    id: "kc-cushion-13",
    name: "Ochre Yellow Velvet Sanctuary Pillow",
    tagline: "Luminous golden-amber Italian velvet accent piece",
    price: 3300,
    originalPrice: 3800,
    category: "velvet",
    fabric: "100% Como Woven Cotton Velvet Pile",
    closure: "Concealed brass zip",
    fillOption: "Plush Feather Down Insert Included",
    sizes: ["18\" × 18\"", "22\" × 22\""],
    colors: [{ name: "Warm Amber Ochre", hex: "#D49B24" }],
    primaryImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    description: "Bathed in sunlight, this rich ochre velvet pillow captures warm light and reflects subtle golden tones. As seen in our modern atelier living room edit.",
    careInstructions: ["Professional velvet dry clean"],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    badge: "🔥 Best Selling",
  },
  {
    id: "kc-cushion-14",
    name: "Hypoallergenic Cloud Loft Bedding Pillow",
    tagline: "Ultra-breathable micro-denier down alternative pillow",
    price: 2200,
    originalPrice: 2600,
    category: "pillow",
    fabric: "300 Thread Count Organic Cotton Percale Shell",
    closure: "Double-needle piped edge",
    fillOption: "Air-Blown Gel Microfiber Core",
    sizes: ["Standard (20\" × 26\")", "King (20\" × 36\")"],
    colors: [{ name: "Pure Cloud White", hex: "#FAF9F6" }],
    primaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1000&auto=format&fit=crop",
    description: "Engineered for pure restorative slumber. Silky soft down-alternative gel clusters contour gently to cervical curvature without retaining excess heat.",
    careInstructions: ["Machine wash warm", "Tumble dry low with dryer balls"],
    dimensions: "Standard & King Sizes Available",
    inStock: true,
    featured: false,
    badge: "BEDDING ESSENTIAL",
  },
  {
    id: "kc-cushion-15",
    name: "Mid-Century Teak & Rattan Accent Cushion",
    tagline: "Geometric textural weave tailored for cane lounge chairs",
    price: 2950,
    category: "linen",
    fabric: "Heavy Flax and Jute Textured Weave",
    closure: "Concealed YKK Zipper",
    fillOption: "Firm High-Density Foam & Poly Core",
    sizes: ["20\" × 20\""],
    colors: [{ name: "Natural Flax & Charcoal", hex: "#C8BEAE" }],
    primaryImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    description: "Designed specifically to complement mid-century rattan furniture, media credenzas, and natural wool carpets. Earthy, robust, and timeless.",
    careInstructions: ["Spot clean with mild soapy water", "Air dry"],
    dimensions: "20\" × 20\" (50cm × 50cm)",
    inStock: true,
    featured: true,
    badge: "NEW ARRIVAL",
  },
  {
    id: "kc-upcoming-01",
    name: "Cascading Flax Linen Curtain Panels",
    tagline: "Bespoke ceiling-to-floor drape collection with brass rings",
    price: 5200,
    originalPrice: 6200,
    category: "curtains",
    fabric: "Pure Heavy European Flax Linen 320 GSM",
    closure: "Hand-pleated header with solid brass grommets",
    fillOption: "Unlined semi-sheer daylight drape",
    sizes: ["50\" × 96\"", "50\" × 108\" (Ceiling-to-Floor)"],
    colors: [
      { name: "Raw Ecru Flax", hex: "#D9D0C1" },
      { name: "Smoked Sage", hex: "#8A9483" },
    ],
    primaryImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    description: "Coming Autumn 2026. Made to measure floor-skimming drapes that filter natural daylight with soft warmth, bringing architectural scale to sanctuaries.",
    careInstructions: ["Professional dry cleaning recommended"],
    dimensions: "Custom lengths available on request",
    inStock: true,
    featured: true,
    badge: "PREVIEW",
  },
  {
    id: "kc-upcoming-02",
    name: "Heirloom Kantha Silk Bed Quilt",
    tagline: "Hand-stitched vintage Mulberry silk with organic cotton core",
    price: 8500,
    originalPrice: 9800,
    category: "quilts",
    fabric: "100% Pure Rajshahi Mulberry Silk & Khadi Cotton",
    closure: "Bound silk selvedge",
    fillOption: "Fluffy pure cotton batt",
    sizes: ["Queen (90\" × 100\")", "King (108\" × 100\")"],
    colors: [{ name: "Vintage Rose & Pearl", hex: "#C48A80" }],
    primaryImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop",
    description: "Over 90 hours of hand needlework. Each quilt tells a generational craft story, combining antique silk remnants with micro-running kantha stitches.",
    careInstructions: ["Specialist dry clean only"],
    dimensions: "Queen / King sizes",
    inStock: true,
    featured: true,
    badge: "PREVIEW",
  },
  {
    id: "kc-upcoming-03",
    name: "The Royal Jamdani Loom Cushion",
    tagline: "Fine muslin weave with genuine gold and silver zari motifs",
    price: 4600,
    originalPrice: 5200,
    category: "embroidered",
    fabric: "Fine Handloom Muslin with Metallic Zari",
    closure: "Concealed silk zipper",
    fillOption: "Down Insert Included",
    sizes: ["18\" × 18\""],
    colors: [{ name: "Ivory & Fine Gold", hex: "#E8DEC8" }],
    primaryImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    description: "UNESCO Intangible Cultural Heritage. Jamdani motifs woven by hand directly on the loom using supplementary weft technique.",
    careInstructions: ["Museum-grade dry clean only"],
    dimensions: "18\" × 18\" (45cm × 45cm)",
    inStock: true,
    featured: true,
    badge: "PREVIEW",
  },
  {
    id: "kc-upcoming-04",
    name: "Woven Jute & Recycled Linen Tapestry",
    tagline: "Architectural wall tapestry hand-loomed in Jessore",
    price: 6800,
    category: "patchwork",
    fabric: "Golden Bengal Jute Fiber & Belgian Linen",
    closure: "Handmade Teakwood hanging rod included",
    fillOption: "Wall hanging tapestry (no insert required)",
    sizes: ["36\" × 54\" (Wall Hanging)"],
    colors: [{ name: "Raw Golden Jute & Bleached Flax", hex: "#BFA980" }],
    primaryImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    description: "A monumental fiber art piece bringing warmth, acoustic dampening, and artisanal presence to living room statement walls.",
    careInstructions: ["Dust gently with soft brush or vacuum with low-suction nozzle"],
    dimensions: "36\" Width × 54\" Drop (90cm × 137cm)",
    inStock: true,
    featured: false,
    badge: "WALL HANGING",
  },
  {
    id: "kc-limited-01",
    name: "Imperial Velvet Gold Zari Bolster",
    tagline: "Loomed Italian double-pile velvet with hand-twisted metallic cord",
    price: 4950,
    category: "velvet",
    fabric: "Italian Matte Velvet & Zari Cord Trim",
    closure: "Concealed end zip",
    fillOption: "Cylindrical Foam & Down Core",
    sizes: ["8\" × 26\""],
    colors: [{ name: "Deep Emerald & Gold", hex: "#17382B" }],
    primaryImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    description: "Numbered Atelier Release of 25 cushions only. Crafted with double-pile Como velvet and gilded hand-braided zari rope piping.",
    careInstructions: ["Specialist dry clean only"],
    dimensions: "8\" × 26\" (20cm × 66cm)",
    inStock: true,
    featured: true,
    badge: "LIMITED RUN (25)",
  },
  {
    id: "kc-limited-02",
    name: "Heritage Handspun Indigo Khadi Pillow",
    tagline: "Naturally fermented wild indigo dye on hand-carded khadi cotton",
    price: 3800,
    category: "patchwork",
    fabric: "100% Handspun Indigo Khadi",
    closure: "Hand-turned bone buttons",
    fillOption: "Hypoallergenic Microfiber Included",
    sizes: ["20\" × 20\""],
    colors: [{ name: "Fermented Indigo", hex: "#233342" }],
    primaryImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    description: "Naturally dyed in small earthen vats; no synthetic chemicals used. Woven on traditional pit-looms in rural Kushtia.",
    careInstructions: ["Cold gentle hand wash with mild soap"],
    dimensions: "20\" × 20\" (50cm × 50cm)",
    inStock: true,
    featured: true,
    badge: "LIMITED RUN (15)",
  },
];

export const CATEGORIES: CategoryItem[] = [
  { id: "all", name: "All Cushions", count: 22 },
  { id: "best-seller", name: "🔥 Best Selling", count: 6 },
  { id: "linen", name: "Belgian Linen", count: 6 },
  { id: "embroidered", name: "Nakshi & Embroidered", count: 5 },
  { id: "velvet", name: "Italian Velvet", count: 4 },
  { id: "sashiko", name: "Sashiko & Geometric", count: 3 },
  { id: "patchwork", name: "Patchwork & Boro", count: 4 },
  { id: "silk", name: "Raw Mulberry Silk", count: 2 },
  { id: "curtains", name: "Bespoke Curtains", count: 2 },
  { id: "quilts", name: "Heirloom Quilts", count: 2 },
  { id: "combo", name: "Curated Sets", count: 1 },
];

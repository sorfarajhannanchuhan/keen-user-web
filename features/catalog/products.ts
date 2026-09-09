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
  featured?: boolean;                                   // Featured collection flag
  isBestSeller?: boolean;                               // Best seller badge flag
  badge?: string;                                       // Special badge
}

export interface CategoryItem {
  id: string;
  name: string;
  count: number;
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
    sizes: ["18\" × 18\"", "20\" × 20\"", "14\" × 24\" (Lumbar)"],
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
];

export const CATEGORIES: CategoryItem[] = [
  { id: "all", name: "All Cushions", count: 8 },
  { id: "best-seller", name: "🔥 Best Selling", count: 4 },
  { id: "patchwork", name: "Patchwork Cushions", count: 1 },
  { id: "combo", name: "Bespoke Combos", count: 1 },
  { id: "linen", name: "Belgian Linen", count: 2 },
  { id: "embroidered", name: "Nakshi & Embroidered", count: 3 },
  { id: "velvet", name: "Italian Velvet", count: 2 },
  { id: "silk", name: "Raw Mulberry Silk", count: 1 },
];

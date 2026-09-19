import { PRODUCTS, Product } from "./products";

export type RoomType = "living-room" | "bedroom" | "reading-nook" | "sunroom";

export interface PaletteColor {
  name: string;
  hex: string;
}

export interface LookbookArrangement {
  id: string;
  slug: string;
  title: string;
  roomType: RoomType;
  roomTypeLabel: string;
  code: string;
  paletteTitle: string;
  paletteColors: PaletteColor[];
  heroImage: string;
  secondaryImages: string[];
  tagline: string;
  stylingTip: string;
  conceptStory: string;
  proportionsGuide: string[];
  artisanProvenance: string;
  productIds: string[]; // references real IDs in PRODUCTS
  bundleDiscountPercent: number; // e.g. 10%
}

export const LOOKBOOK_ARRANGEMENTS: LookbookArrangement[] = [
  {
    id: "japandi-minimalist-setting",
    slug: "japandi-minimalist-setting",
    title: "The Minimalist Japandi Setting",
    roomType: "living-room",
    roomTypeLabel: "Living Room",
    code: "KC-ROOM-2026-JPND-01",
    paletteTitle: "Warm Ecru • Muted Moss • Flax Linen",
    paletteColors: [
      { name: "Warm Ecru", hex: "#EBE5DA" },
      { name: "Muted Moss", hex: "#5C6A53" },
      { name: "Raw Flax", hex: "#C7BEAF" },
      { name: "Charcoal Slag", hex: "#222521" },
    ],
    heroImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "Wabi-sabi stillness grounded in unbleached natural fibers and sculptural negative space.",
    stylingTip: "Pair two 20\" Avignon Waffles in the corners with a 14\"×24\" Marais Lumbar in the center.",
    conceptStory: "Inspired by Japanese wabi-sabi philosophy fused with Scandinavian functionalism. This arrangement anchors modern architectural sofas with deep, organic textures. The unbleached stone-washed linen cushions soften rigid sofa angles while earthy moss tones evoke tranquil botanical courtyards.",
    proportionsGuide: [
      "Corner Anchors: Place two 20\" × 20\" textured waffle cushions in opposite sofa corners.",
      "Center Horizon: Layer one 14\" × 24\" lumbar cushion horizontally in the visual center for spine support.",
      "Negative Space: Leave at least 40% of sofa seating unoccupied to maintain clean architectural breathing room.",
    ],
    artisanProvenance: "Stone-washed European flax woven in historical linen mills, hand-finished with raw frayed edges and concealed YKK brass closures.",
    productIds: ["kc-cushion-01", "kc-cushion-04", "kc-cushion-03"],
    bundleDiscountPercent: 10,
  },
  {
    id: "heritage-salon-living",
    slug: "heritage-salon-living",
    title: "The Heritage Salon",
    roomType: "living-room",
    roomTypeLabel: "Living Room",
    code: "KC-ROOM-2026-HERIT-02",
    paletteTitle: "Ivory Silk • Nakshi Embroidery • Espresso Velvet",
    paletteColors: [
      { name: "Champagne Ivory", hex: "#F3EDE2" },
      { name: "Mulberry Silk", hex: "#8F6744" },
      { name: "Espresso Noir", hex: "#1C1917" },
      { name: "Atelier Gold", hex: "#D4AF37" },
    ],
    heroImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "Centuries-old Bengal needlework paired with Italian cotton velvet for dramatic salon prestige.",
    stylingTip: "Layer the Nakshi Floral cushion against the deep Bronze Matte Velvet for rich textural contrast.",
    conceptStory: "Designed for grand reception rooms and heritage drawing salons. This setup celebrates authentic Bengal needlecraft against opulent Como velvet. The luminous silk stitchwork catches ambient evening light, turning cushions into conversational art objects.",
    proportionsGuide: [
      "Primary Statement: Centrally position the 20\" Nakshi Floral cushion on formal wingbacks or central sectionals.",
      "Flanking Backdrops: Back with deep matte velvet cushions in forest or espresso to amplify embroidery depth.",
      "Lighting Harmony: Position near warm 2700K ambient lamps to illuminate subtle silk sheen.",
    ],
    artisanProvenance: "Over 40 hours of patient Nakshi needlework executed by generational women artisans in Jamalpur, backed with Como Italian cotton-velvet.",
    productIds: ["kc-cushion-02", "kc-cushion-03", "kc-cushion-05"],
    bundleDiscountPercent: 10,
  },
  {
    id: "warm-earth-contemporary",
    slug: "warm-earth-contemporary",
    title: "Warm Earth Contemporary",
    roomType: "living-room",
    roomTypeLabel: "Living Room",
    code: "KC-ROOM-2026-EARTH-03",
    paletteTitle: "Terracotta Linen • Charcoal Accent • Oatmeal",
    paletteColors: [
      { name: "Terracotta Clay", hex: "#B86B52" },
      { name: "Oatmeal Natural", hex: "#E3DAC9" },
      { name: "Obsidian Charcoal", hex: "#1C1F1B" },
      { name: "Warm Amber", hex: "#C59B4B" },
    ],
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "Sun-drenched Mediterranean warmth meeting relaxed European stone-washed flax.",
    stylingTip: "Contrast relaxed stone-washed flax against structured architectural leather or boucle sofas.",
    conceptStory: "Warm earth tones invite unhurried relaxation. By juxtaposing mineral terracotta linen with oatmeal waffle weave, this contemporary living room setting fosters an intimate, grounded domestic sanctuary.",
    proportionsGuide: [
      "Tonal Triad: Alternate terracotta with oatmeal cushions across the sectional length.",
      "Texture Play: Pair smooth stone-washed flax directly adjacent to tactile deep waffle weave.",
      "Throw Pairing: Drape a pure linen throw diagonally over the chaise lounge.",
    ],
    artisanProvenance: "Stone-washed flax colored with eco-certified botanical dyes and handcrafted brass zipper closures.",
    productIds: ["kc-cushion-01", "kc-cushion-04", "kc-cushion-06"],
    bundleDiscountPercent: 10,
  },
  {
    id: "serene-linen-master-bedroom",
    slug: "serene-linen-master-bedroom",
    title: "The Serene Linen Master Sanctuary",
    roomType: "bedroom",
    roomTypeLabel: "Master Bedroom",
    code: "KC-ROOM-2026-BED-04",
    paletteTitle: "Bleached Ecru • French Taupe • Alabaster",
    paletteColors: [
      { name: "Bleached Ecru", hex: "#F5F2EB" },
      { name: "French Taupe", hex: "#A89F91" },
      { name: "Alabaster White", hex: "#FFFFFF" },
      { name: "Slate Mist", hex: "#7E857B" },
    ],
    heroImage: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "A cloud-like hotel suite layering tactile linen cushions, kantha quilts, and feather-soft drapes.",
    stylingTip: "Stack two 22\" pillows behind your bed shams, finished with a central lumbar cushion in oatmeal flax.",
    conceptStory: "The bedroom should be an acoustic and visual sanctuary. Pure Belgian flax cushions regulate temperature naturally, softening morning light and creating an unhurried, restorative sleeping environment.",
    proportionsGuide: [
      "Headboard Horizon: Lean two 22\" square foundation cushions against the headboard.",
      "Accent Layer: Place two 18\" decorative cushions directly in front.",
      "Crowning Lumbar: Finish with a single 14\" × 24\" lumbar nestled in the center.",
    ],
    artisanProvenance: "Pure Belgian organic flax linen and hypoallergenic RDS down inserts.",
    productIds: ["kc-cushion-01", "kc-cushion-04", "kc-cushion-02"],
    bundleDiscountPercent: 10,
  },
  {
    id: "botanical-nakshi-boudoir",
    slug: "botanical-nakshi-boudoir",
    title: "Heirloom Botanical Boudoir",
    roomType: "bedroom",
    roomTypeLabel: "Master Bedroom",
    code: "KC-ROOM-2026-BED-05",
    paletteTitle: "Mulberry Khadi • Heritage Ochre • Linen Sand",
    paletteColors: [
      { name: "Mulberry Khadi", hex: "#EBE3D5" },
      { name: "Heritage Ochre", hex: "#C49A45" },
      { name: "Forest Moss", hex: "#48583E" },
    ],
    heroImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "Vintage floral embroidery whispering stories of ancestral Bengal needlework.",
    stylingTip: "Pair with ivory sheets and a folded heirloom kantha quilt along the foot of the bed.",
    conceptStory: "Centuries of storytelling woven into bedtime comfort. The handspun khadi base absorbs ambient humidity while the raised floral motifs provide an unforgettable tactile sensation to touch.",
    proportionsGuide: [
      "Symmetry: Flank bedside reading lamps with matching embroidered pieces.",
      "Foot of Bed: Anchor with a folded Kantha quilt matching the embroidery tones.",
    ],
    artisanProvenance: "Handspun Bengal khadi embroidered with pure silk thread by master needlework cooperatives.",
    productIds: ["kc-cushion-02", "kc-cushion-05", "kc-cushion-01"],
    bundleDiscountPercent: 10,
  },
  {
    id: "scholars-monochrome-nook",
    slug: "scholars-monochrome-nook",
    title: "The Scholar's Reading Nook",
    roomType: "reading-nook",
    roomTypeLabel: "Reading Nook",
    code: "KC-ROOM-2026-NOOK-06",
    paletteTitle: "Indigo Dye • Raw Khadi • Walnut Charcoal",
    paletteColors: [
      { name: "Natural Indigo", hex: "#2B3D54" },
      { name: "Bleached Khadi", hex: "#F2EDE4" },
      { name: "Charcoal Slag", hex: "#1A1D1A" },
    ],
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "Deep natural indigo and handspun cotton tailored for focused contemplation and solitary reading.",
    stylingTip: "A single lumbar support cushion in an architectural leather armchair creates an instant focus corner.",
    conceptStory: "Dedicated to intellectual retreat. Indigo-dyed khadi cushions offer resilient ergonomic lumbar support for hours spent reading or writing in natural window light.",
    proportionsGuide: [
      "Single Statement: One 14\" × 24\" lumbar cushion positioned precisely at lower back level.",
      "Complementary Throw: Draped neatly over the armchair armrest.",
    ],
    artisanProvenance: "Naturally dyed with plant-based Bengal indigo vat dyes on heavy pit-loom handspun cotton.",
    productIds: ["kc-cushion-06", "kc-cushion-01", "kc-cushion-03"],
    bundleDiscountPercent: 10,
  },
  {
    id: "solstice-sunroom-verandah",
    slug: "solstice-sunroom-verandah",
    title: "The Solstice Verandah Lounge",
    roomType: "sunroom",
    roomTypeLabel: "Verandah & Dining",
    code: "KC-ROOM-2026-SUN-07",
    paletteTitle: "Golden Hour Flax • Cane Rattan • Sage Lichen",
    paletteColors: [
      { name: "Sunlit Flax", hex: "#DFC286" },
      { name: "Rattan Cane", hex: "#C7A774" },
      { name: "Sage Lichen", hex: "#7A8A74" },
    ],
    heroImage: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "Breezy cross-ventilation, organic cane furniture, and sun-resistant natural linen cushions.",
    stylingTip: "Pair loose-fitting linen cushion covers with natural rattan chairs for breezy indoor-outdoor living.",
    conceptStory: "Bringing nature indoors. Breathable European flax dissipates heat instantly during warm afternoons, allowing natural breezes to rustle through stone-washed textures.",
    proportionsGuide: [
      "Chair Seating: Fitted 18\" square cushions on cane armchairs.",
      "Window Seat: Continuous bench cushioned with layered waffle linen bolsters.",
    ],
    artisanProvenance: "Natural unbleached linen with UV-stabilized organic flax fibers.",
    productIds: ["kc-cushion-04", "kc-cushion-01", "kc-cushion-03"],
    bundleDiscountPercent: 10,
  },
  {
    id: "terracotta-flax-salon",
    slug: "terracotta-flax-salon",
    title: "Terracotta & Natural Flax Atelier",
    roomType: "living-room",
    roomTypeLabel: "Living Room",
    code: "KC-ROOM-2026-ATEL-08",
    paletteTitle: "Raw Flax • Terracotta Clay • Midnight Olive",
    paletteColors: [
      { name: "Raw Flax", hex: "#D8CFBC" },
      { name: "Terracotta Clay", hex: "#B8654A" },
      { name: "Midnight Olive", hex: "#2C3827" },
    ],
    heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
    ],
    tagline: "An earthy, sculptural living room arrangement honoring architectural ceramics and linen drapery.",
    stylingTip: "Mix warm terracotta cushions with deep midnight velvet against pale neutral plaster walls.",
    conceptStory: "A harmonious dialogue between warm earthenware and soft stone-washed linen. Every cushion in this setup adds a layer of quiet luxury, framing intimate living room conversations.",
    proportionsGuide: [
      "Contrast Depth: Flank pale linen sofas with deep midnight velvet anchors.",
      "Warm Center: Place terracotta cushions in direct sunlight for radiant warmth.",
    ],
    artisanProvenance: "Heavy stone-washed European flax tailored with architectural 4mm self-piped seams.",
    productIds: ["kc-cushion-03", "kc-cushion-01", "kc-cushion-04"],
    bundleDiscountPercent: 10,
  },
];

/**
 * Helper to fetch products for a given arrangement
 */
export function getProductsForArrangement(arrangement: LookbookArrangement): Product[] {
  return arrangement.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Calculate total price and bundle price for an arrangement
 */
export function calculateArrangementPricing(arrangement: LookbookArrangement) {
  const products = getProductsForArrangement(arrangement);
  const originalTotal = products.reduce((sum, p) => sum + p.price, 0);
  const discountAmount = Math.round((originalTotal * (arrangement.bundleDiscountPercent || 0)) / 100);
  const bundlePrice = originalTotal - discountAmount;
  return { products, originalTotal, bundlePrice, discountAmount };
}

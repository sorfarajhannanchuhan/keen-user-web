/**
 * ============================================================================
 * KEEN CHIT - Feature: Marketing (Campaign Data & Constants)
 * ============================================================================
 */

export interface CampaignVignette {
  id: string;
  title: string;
  palette: string;
  description: string;
  image: string;
  linkedCategory: string;
}

export interface CampaignManifesto {
  eyebrow: string;
  headline: string;
  scriptTitle: string;
  leadCopy: string;
  couponCode: string;
  discountPercentage: number;
  heroPosterImage: string;
  capsuleProductIds: string[];
  vignettes: CampaignVignette[];
}

export const ATELIER_CAMPAIGN_DATA: CampaignManifesto = {
  eyebrow: "THE 2026 ATELIER CAPSULE",
  headline: "Tactile Poetry For Mindful Living",
  scriptTitle: "Tactile Poetry",
  leadCopy:
    "A deliberate return to raw materiality. Handwoven organic Belgian flax, Italian double-pile velvet, and ancestral Bengal needlework designed for living spaces of calm distinction.",
  couponCode: "KEEN10",
  discountPercentage: 10,
  heroPosterImage:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop",
  capsuleProductIds: [
    "kc-cushion-01", // The Marais Belgian Linen
    "kc-cushion-02", // Nakshi Heritage Floral
    "kc-cushion-03", // Sienna Heavy Matte Velvet
    "kc-cushion-04", // Avignon Heavy Waffle Linen
    "kc-cushion-05", // Jamdani Weave Contemporary
    "kc-cushion-06", // Como Raw Silk Bolster
  ],
  vignettes: [
    {
      id: "vignette-1",
      title: "The Monochromatic Japandi Sanctuary",
      palette: "Warm Ecru • Muted Moss • Flax Linen",
      description:
        "Layer oversized pre-washed Avignon waffle cushions with relaxed neutral flax for an earthy, understated retreat.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      linkedCategory: "/collections?category=linen",
    },
    {
      id: "vignette-2",
      title: "The Heritage Salon",
      palette: "Ivory Silk • Nakshi Embroidery • Espresso Velvet",
      description:
        "Pair centuries-old Bengal Nakshi needlecraft against deep architectural velvet for a dialogue between heritage and modernity.",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop",
      linkedCategory: "/collections?category=embroidered",
    },
    {
      id: "vignette-3",
      title: "The Earth Contemporary Living Room",
      palette: "Terracotta Linen • Charcoal Accent • Oatmeal",
      description:
        "Contrast rich organic terracotta tones against tactile bouclé and sculptural timber accents.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      linkedCategory: "/collections?category=velvet",
    },
  ],
};

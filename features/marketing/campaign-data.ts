/**
 * ============================================================================
 * KEEN CHIT - Feature: Marketing (Campaign Data & Constants)
 * ============================================================================
 */

export interface CampaignVignette {
  id: string;
  title: string;
  bengaliTitle: string;
  palette: string;
  description: string;
  bengaliDescription: string;
  image: string;
  linkedCategory: string;
}

export interface CampaignManifesto {
  eyebrow: string;
  bengaliEyebrow: string;
  headline: string;
  bengaliHeadline: string;
  scriptTitle: string;
  leadCopy: string;
  bengaliLeadCopy: string;
  couponCode: string;
  discountPercentage: number;
  heroPosterImage: string;
  capsuleProductIds: string[];
  vignettes: CampaignVignette[];
}

export const ATELIER_CAMPAIGN_DATA: CampaignManifesto = {
  eyebrow: "THE 2026 ATELIER CAPSULE",
  bengaliEyebrow: "আটেলিয়ার কালেকশন ২০২৬",
  headline: "Tactile Poetry For Mindful Living",
  bengaliHeadline: "শান্ত জীবনের জন্য স্পর্শের নান্দনিকতা",
  scriptTitle: "Tactile Poetry",
  leadCopy:
    "A deliberate return to raw materiality. Handwoven organic Belgian flax, Italian double-pile velvet, and ancestral Bengal needlework designed for living spaces of calm distinction.",
  bengaliLeadCopy:
    "প্রাকৃতিক উপাদানের অকৃত্রিম উষ্ণতায় ফিরে আসার এক শৈল্পিক প্রয়াস। খাঁটি বেলজিয়ান লিনেন, ইতালীয় ভেলভেট এবং বাংলার ঐতিহ্যবাহী সূচিকর্মে সাজানো শান্ত ও আভিজাত্যময় জীবনযাত্রা।",
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
      bengaliTitle: "মোনোক্রোমাটিক জাপান্ডি স্যাঙ্কচুয়ারি",
      palette: "Warm Ecru • Muted Moss • Flax Linen",
      description:
        "Layer oversized pre-washed Avignon waffle cushions with relaxed neutral flax for an earthy, understated retreat.",
      bengaliDescription:
        "শান্ত ও প্রাকৃতিক আবহের জন্য ওভাটমিল ওয়াক্স লিনেনের সাথে ডাবল-পাইল কুশনের মৃদু লেয়ারিং।",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      linkedCategory: "/collections?category=linen",
    },
    {
      id: "vignette-2",
      title: "The Heritage Salon",
      bengaliTitle: "দ্য হেরিটেজ সেলুন",
      palette: "Ivory Silk • Nakshi Embroidery • Espresso Velvet",
      description:
        "Pair centuries-old Bengal Nakshi needlecraft against deep architectural velvet for a dialogue between heritage and modernity.",
      bengaliDescription:
        "ঐতিহ্যবাহী বাংলার নকশি কাঁথা সুতোর কারুকাজ এবং ইতালীয় ভেলভেটের আভিজাত্যময় বৈসাদৃশ্য।",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop",
      linkedCategory: "/collections?category=embroidered",
    },
    {
      id: "vignette-3",
      title: "The Earth Contemporary Living Room",
      bengaliTitle: "আর্থ কনটেম্পোরারি লিভিং রুম",
      palette: "Terracotta Linen • Charcoal Accent • Oatmeal",
      description:
        "Contrast rich organic terracotta tones against tactile bouclé and sculptural timber accents.",
      bengaliDescription:
        "উষ্ণ পোড়ামাটির শেড এবং কাঠকয়লার গভীর টোনে সজ্জিত আধুনিক ড্রয়িং স্পেস।",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      linkedCategory: "/collections?category=velvet",
    },
  ],
};

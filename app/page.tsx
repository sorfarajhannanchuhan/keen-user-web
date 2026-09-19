import { MainHeroSlider } from "@/features/hero";
import {
  FeaturedCategoriesGrid,
  DualCollectionBanners,
  CollectionCarouselsSection,
  CategoryProductShowcase,
} from "@/features/catalog";
import { CraftsmanshipStory, Lookbook } from "@/features/atelier-story";

export default function Home() {
  return (
    <>
      {/* 1. Main Hero Slider: Tactile Poetry, Woven Sanctuary & Heirloom Whispers */}
      <MainHeroSlider />

      {/* 2. Featured Categories: 7 Curated Categories (4 on Line 1, 3 on Line 2 centered - SS 5) */}
      <FeaturedCategoriesGrid />

      {/* 3. Dual Minimalist Banners: Combo Deals & Archive Sale (SS 2) */}
      <DualCollectionBanners />

      {/* 4. Aarong-Style Pure-Image Collection Carousels with Hotspot Popovers (SS 1) */}
      <CollectionCarouselsSection />

      {/* 5. Category-Wise Curated Showcase (Replacing flat product dump - SS 5) */}
      <CategoryProductShowcase />
      <CraftsmanshipStory />
      <Lookbook />
    </>
  );
}

import { MainHeroSlider } from "@/features/hero";
import { FeaturedCategoriesMarquee, CollectionBanners, ProductCatalog } from "@/features/catalog";
import { CraftsmanshipStory, Lookbook } from "@/features/atelier-story";

export default function Home() {
  return (
    <>
      {/* 1. Main Hero Slider: Tactile Poetry, Woven Sanctuary & Heirloom Whispers */}
      <MainHeroSlider />

      {/* 2. Featured Categories Marquee: 3 frameless cards with circular arrows */}
      <FeaturedCategoriesMarquee />

      {/* 4. Curated Collection Banners, Catalog & Storytelling */}
      <CollectionBanners />
      <ProductCatalog />
      <CraftsmanshipStory />
      <Lookbook />
    </>
  );
}

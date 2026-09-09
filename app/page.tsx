import Hero from "@/features/hero";
import { FeaturedCategoriesMarquee, CollectionBanners, ProductCatalog } from "@/features/catalog";
import { CraftsmanshipStory, Lookbook } from "@/features/atelier-story";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategoriesMarquee />
      <CollectionBanners />
      <ProductCatalog />
      <CraftsmanshipStory />
      <Lookbook />
    </>
  );
}

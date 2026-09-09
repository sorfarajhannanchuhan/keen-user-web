# KEEN CHIT — Luxury Artisanal Home Textiles Storefront

The official customer-facing luxury e-commerce storefront for **KEEN CHIT** (কীন চিত), crafted with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## 🏛️ Architecture: Feature-Based Modular System
Organized into domain-driven modules under `features/`:
- `features/hero/`: Full-bleed luxury hero with left-aligned editorial copy
- `features/navigation/`: 3-tier header, mobile nav, search, theme/language context, footer
- `features/catalog/`: Cushion archive catalog, filter pills, product card, quick view, fabric marquee
- `features/cart/`: Slide-out shopping bag, live count badge, free shipping tracker
- `features/wishlist/`: Wishlist drawer & context
- `features/atelier-story/`: Craftsmanship philosophy (4 pillars) & living room lookbook
- `features/chat-concierge/`: Aura AI floating chat concierge widget
- `features/appearance/`: Visual styling context & CMS content provider
- `features/utilities/`: ScrollToTop progress circle, ScrollReveal, AppCanvas

## 🚀 Running Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

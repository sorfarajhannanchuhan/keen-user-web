import type { Metadata } from "next";
import "./globals.css";
import {
  LanguageProvider,
  ThemeProvider,
  MoreDrawerProvider,
  Navbar,
  Footer,
  MobileBottomNav,
  MoreDrawer,
} from "@/features/navigation";
import { CartProvider, CartDrawer } from "@/features/cart";
import { WishlistProvider, WishlistDrawer } from "@/features/wishlist";
import { ProductQuickView } from "@/features/catalog";
import AuraChatWidget from "@/features/chat-concierge";
import { ScrollToTop, AppCanvas, GoogleAnalytics } from "@/features/utilities";
import { AppearanceProvider, FrontendContentProvider } from "@/features/appearance";


export const metadata: Metadata = {
  title: "KEEN CHIT | Artisanal Home Textiles & Luxury Cushions",
  description:
    "Handcrafted luxury cushions tailored from organic European flax linen, Italian double-pile velvet, and master Bengal needlework. Elevated living for refined modern homes.",
  keywords: [
    "Keen Chit",
    "Luxury Cushions Bangladesh",
    "Belgian Linen Cushions",
    "Nakshi Kantha Cushion",
    "Handmade Home Decor Dhaka",
    "Velvet Throw Pillows",
    "Artisanal Textiles",
  ],
  openGraph: {
    title: "KEEN CHIT | Artisanal Home Textiles & Luxury Cushions",
    description:
      "Handcrafted luxury cushions tailored from organic European flax linen, Italian double-pile velvet, and master Bengal needlework.",
    url: "https://keenchit.com",
    siteName: "KEEN CHIT",
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('keen_theme');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-brand-linen text-brand-charcoal selection:bg-brand-gold selection:text-[#0E1410] min-h-screen flex flex-col">
        <LanguageProvider>
          <ThemeProvider>
            <AppearanceProvider>
              <FrontendContentProvider>
                <GoogleAnalytics />
                <CartProvider>
                  <WishlistProvider>
                    <MoreDrawerProvider>
                      <AppCanvas>
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                      </AppCanvas>
                      <MoreDrawer />
                      <CartDrawer />
                      <WishlistDrawer />
                      <ProductQuickView />
                      <ScrollToTop />
                      <AuraChatWidget position="bottom-right" />
                      <MobileBottomNav />
                    </MoreDrawerProvider>
                  </WishlistProvider>
                </CartProvider>
              </FrontendContentProvider>
            </AppearanceProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

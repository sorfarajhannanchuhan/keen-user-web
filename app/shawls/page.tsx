import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, Feather } from "lucide-react";

export const metadata: Metadata = {
  title: "Fine Cashmere Shawls & Winter Chador | KEEN CHIT Atelier",
  description:
    "Handspun pure cashmere shawls, pashmina chadors, and fine handloom merino wool crafted for timeless winter elegance.",
};

export default function ShawlsPage() {
  const SHAWLS = [
    {
      name: "The Sovereign Charcoal Cashmere Chador",
      subtitle: "Ultra-fine Grade-A Himalayan cashmere with hand-twisted fringed selvedge",
      fiber: "100% Pure Long-Staple Cashmere (14 Microns)",
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
      dimensions: "100\" × 50\" (Full Chador Wrap)",
      price: "৳14,500",
      badge: "Winter Masterpiece",
    },
    {
      name: "Natural Sandalwood Pashmina Shawl",
      subtitle: "Undyed raw ivory cashmere with whisper-soft tactile hand-feel",
      fiber: "Organic Handspun Pashmina Yarn",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
      dimensions: "80\" × 40\" (Shawl Format)",
      price: "৳11,800",
      badge: "Limited Drop",
    },
    {
      name: "Heritage Gilded Selvedge Merino Chador",
      subtitle: "Dense winter merino wool accented with subtle antique gold thread borders",
      fiber: "Fine Australian Merino & Metallic Thread",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
      dimensions: "95\" × 48\" (Traditional Cut)",
      price: "৳8,900",
      badge: "Classic Essential",
    },
  ];

  return (
    <div className="bg-brand-linen min-h-screen py-16 md:py-24 border-b border-brand-sand text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-brand-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-linen-dark text-brand-gold text-[11px] uppercase tracking-[0.25em] font-semibold border border-brand-sand">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>THE WINTER ATELIER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal font-normal leading-tight">
            Fine Cashmere Shawls & Royal Chador.
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-2xl">
            A celebration of winter warmth, understated dignity, and centuries-old weaving mastery. Featherlight on the shoulders, deeply insulating against the cool evening air, and tailored for lifelong heirloom wear.
          </p>
        </div>

        {/* Shawls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {SHAWLS.map((shawl, idx) => (
            <div key={idx} className="bg-brand-linen-dark border border-brand-sand shadow-sm flex flex-col group hover:border-[#D4AF37]/50 transition-all">
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-linen-dark/80">
                <Image
                  src={idx === 2 ? "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1000&auto=format&fit=crop" : shawl.image}
                  alt={shawl.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1410]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 bg-brand-linen-dark/90 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold text-brand-gold border border-brand-sand">
                  {shawl.badge}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {shawl.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3 text-xs text-stone-400 font-light">
                  <p className="leading-relaxed">{shawl.subtitle}</p>
                  
                  <div className="p-3 bg-brand-linen-dark/80 border border-brand-sand space-y-1 text-[11px] text-stone-300">
                    <div><strong className="text-brand-gold">Fiber Grade:</strong> {shawl.fiber}</div>
                    <div><strong className="text-brand-gold">Dimensions:</strong> {shawl.dimensions}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-sand flex items-center justify-between">
                  <span className="font-serif text-base font-semibold text-brand-gold">
                    {shawl.price}
                  </span>
                  <a
                    href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20am%20interested%20in%20your%20Winter%20Chador%20collection."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider font-semibold text-stone-300 hover:text-brand-gold flex items-center gap-1"
                  >
                    <span>Reserve via WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Box Packaging */}
        <div className="p-8 sm:p-12 bg-brand-linen text-brand-charcoal border border-brand-sand grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold block">
              HERITAGE PRESENTATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-charcoal">
              Arrives in Handcrafted Hardboard Keepsake Boxes
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-xl leading-relaxed">
              Every chador is folded in cedarwood-infused archival tissue and presented in an embossed matte gold gift box. Suitable for prestigious family heirlooms and wedding gift registries.
            </p>
          </div>

          <div className="lg:col-span-4">
            <a
              href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20would%20like%20to%20inquire%20about%20wedding%20gift%20shawl%20orders."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block py-4 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] text-center text-xs uppercase tracking-[0.2em] font-bold transition-colors shadow-luxury"
            >
              Consult Winter Concierge
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

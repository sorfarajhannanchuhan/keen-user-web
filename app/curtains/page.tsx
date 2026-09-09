import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Check, Scissors, Ruler, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Bespoke Curtains & Architectural Drapery | KEEN CHIT Atelier",
  description:
    "Tailored luxury curtains crafted from pure Belgian flax linen, thermal blackout linings, and handloom raw silk. Made to measure in Dhaka.",
};

export default function CurtainsPage() {
  const STYLES = [
    {
      name: "Belgian Sheer Flax",
      tagline: "Airy, sunlight-filtering organic weave with natural slub",
      weight: "160 GSM Sheer Linen",
      lining: "Unlined for ethereal ambient diffusion",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
      pleats: "French Triple Pinch Pleat or Ripple Fold",
      estimatedPrice: "From ৳4,800 per panel (84\" drop)",
    },
    {
      name: "Aura Heavyweight Blackout Linen",
      tagline: "Dense stone-washed European linen backed with 100% room darkening lining",
      weight: "320 GSM Heavy Flax + Thermal Lining",
      lining: "Triple-pass acoustic & thermal blackout",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
      pleats: "Deep Tailored Double Pinch Pleat",
      estimatedPrice: "From ৳7,500 per panel (96\" drop)",
    },
    {
      name: "Raw Mulberry Silk Drapery",
      tagline: "Lustrous handloom silk with hand-rolled hems for formal master salons",
      weight: "Pure Tussar & Mulberry Silk Weave",
      lining: "Cotton sateen interlining for rich body",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
      pleats: "Architectural Goblet Pleat",
      estimatedPrice: "From ৳9,200 per panel (108\" drop)",
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
            <span>THE DRAPERY ATELIER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal font-normal leading-tight">
            Bespoke Curtains & Architectural Drapery.
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-2xl">
            Meticulously tailored to your room&apos;s exact floor-to-ceiling dimensions. Crafted from pure stone-washed Belgian flax, thermal blackout backings, and rich raw silk weaves to create acoustic warmth and effortless sophistication.
          </p>
        </div>

        {/* 3 Curtain Editions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {STYLES.map((style, idx) => (
            <div key={idx} className="bg-brand-linen-dark border border-brand-sand shadow-sm flex flex-col group hover:border-[#D4AF37]/50 transition-all">
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-linen-dark/80">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1410]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold block">
                    {style.weight}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {style.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3 text-xs text-stone-400 font-light">
                  <p className="leading-relaxed">{style.tagline}</p>
                  
                  <div className="p-3 bg-brand-linen-dark/80 border border-brand-sand space-y-1.5 text-[11px] text-stone-300">
                    <div><strong className="text-brand-gold">Lining:</strong> {style.lining}</div>
                    <div><strong className="text-brand-gold">Heading Styles:</strong> {style.pleats}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-sand flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-brand-gold">
                    {style.estimatedPrice}
                  </span>
                  <a
                    href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20am%20interested%20in%20your%20Bespoke%20Curtains."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider font-semibold text-stone-300 hover:text-brand-gold flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Measurement & Consultation Callout */}
        <div className="p-8 sm:p-12 bg-brand-linen text-brand-charcoal border border-brand-sand grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold block">
              COMPLIMENTARY RESIDENTIAL CONSULTATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-charcoal">
              Schedule In-Home Measurement & Fabric Swatch Viewing
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-xl leading-relaxed">
              Our drapery specialist will visit your residence in Dhaka (Gulshan, Banani, Baridhara, Dhanmondi, Uttara) with physical fabric sample books to measure your window spans with laser precision.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20would%20like%20to%20book%20an%20in-home%20curtain%20measurement%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] text-center text-xs uppercase tracking-[0.2em] font-bold transition-colors"
            >
              Book Measurement Visit
            </a>
            <Link
              href="/contact?type=curtains"
              className="px-6 py-4 bg-brand-linen-dark border border-brand-sand hover:border-[#D4AF37] text-center text-xs uppercase tracking-[0.2em] font-medium text-stone-300 hover:text-white transition-colors"
            >
              Request Swatch Kit
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

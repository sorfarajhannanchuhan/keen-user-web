import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Heirloom Quilts & Nakshi Kantha | KEEN CHIT Atelier",
  description:
    "Hand-stitched Nakshi Kantha bedspreads, organic linen quilts, and heritage muslin layers handcrafted by master Bengal artisans.",
};

export default function QuiltsPage() {
  const QUILTS = [
    {
      name: "The Jamalpur Heritage Nakshi Quilt",
      subtitle: "Multi-layered vintage muslin with delicate geometric running stitches",
      craftTime: "80+ Hours of Master Hand-Stitching",
      fabric: "100% Handloom Cotton & Organic Muslin",
      image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop",
      dimensions: "King (96\" × 104\") • Queen (88\" × 92\")",
      price: "From ৳12,500",
    },
    {
      name: "Belgian Linen Channel-Stitch Quilt",
      subtitle: "Pre-washed European flax filled with ultra-light hypoallergenic microfiber",
      craftTime: "Tailored French Seams & Bound Edges",
      fabric: "100% Organic Belgian Flax Linen",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
      dimensions: "King (96\" × 104\") • Bed Runner (30\" × 96\")",
      price: "From ৳9,800",
    },
    {
      name: "Gilded Silk & Muslin Coverlet",
      subtitle: "Dense brass thread Kantha running across midnight charcoal handspun cotton",
      craftTime: "Limited Edition Collector Piece",
      fabric: "Muslin Core with Metallic Gilded Thread",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
      dimensions: "Grand King (108\" × 108\")",
      price: "From ৳16,000",
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
            <span>THE BEDDING & KANTHA ARCHIVE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal font-normal leading-tight">
            Heirloom Quilts & Nakshi Kantha.
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-2xl">
            Reimagining Bengal&apos;s ancient quilting heritage for the refined contemporary bedroom. Each piece is composed of multiple gossamer-soft muslin layers, sewn with rhythm and patience by master needlecraft artisans.
          </p>
        </div>

        {/* Quilts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {QUILTS.map((quilt, idx) => (
            <div key={idx} className="bg-brand-linen-dark border border-brand-sand shadow-sm flex flex-col group hover:border-[#D4AF37]/50 transition-all">
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-linen-dark/80">
                <Image
                  src={quilt.image}
                  alt={quilt.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1410]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold block">
                    {quilt.craftTime}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {quilt.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3 text-xs text-stone-400 font-light">
                  <p className="leading-relaxed">{quilt.subtitle}</p>
                  
                  <div className="p-3 bg-brand-linen-dark/80 border border-brand-sand space-y-1 text-[11px] text-stone-300">
                    <div><strong className="text-brand-gold">Fabric:</strong> {quilt.fabric}</div>
                    <div><strong className="text-brand-gold">Dimensions:</strong> {quilt.dimensions}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-sand flex items-center justify-between">
                  <span className="font-serif text-base font-semibold text-brand-gold">
                    {quilt.price}
                  </span>
                  <a
                    href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20am%20interested%20in%20your%20Heirloom%20Quilts."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider font-semibold text-stone-300 hover:text-brand-gold flex items-center gap-1"
                  >
                    <span>Reserve Piece</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="p-8 sm:p-12 bg-brand-linen-dark border border-brand-sand grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block">
              THE ARTISAN GUILD
            </span>
            <h2 className="font-serif text-3xl text-brand-charcoal font-normal">
              Every Stitch Tells an Unhurried Story
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              Unlike factory automated quilts, our Nakshi kanthas are held in bamboo frames by generational needlewomen. They take over two months to complete a single grand king spread, ensuring that every knot and tension line holds together for decades.
            </p>
          </div>

          <div className="space-y-3 text-xs text-stone-300">
            <div className="flex items-center gap-2 font-medium text-brand-charcoal">
              <Check className="w-4 h-4 text-brand-gold" />
              <span>100% Breathable for Bangladesh&apos;s Tropical Climate</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-brand-charcoal">
              <Check className="w-4 h-4 text-brand-gold" />
              <span>Pre-washed with Organic Natural Enzymes</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-brand-charcoal">
              <Check className="w-4 h-4 text-brand-gold" />
              <span>Signed & Numbered Certificate of Artisan Authenticity</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

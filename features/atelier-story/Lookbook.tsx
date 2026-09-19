import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ScrollReveal from "@/features/utilities/ScrollReveal";

export default function Lookbook() {
  const LOOKS = [
    {
      slug: "japandi-minimalist-setting",
      title: "The Minimalist Japandi Setting",
      palette: "Warm Ecru • Muted Moss • Flax Linen",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      tip: "Pair two 20\" Avignon Waffles in the corners with a 14\"×24\" Marais Lumbar in the center.",
    },
    {
      slug: "heritage-salon-living",
      title: "The Heritage Salon",
      palette: "Ivory Silk • Nakshi Embroidery • Espresso Velvet",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
      tip: "Layer the Nakshi Floral cushion against the deep Bronze Matte Velvet for rich textural contrast.",
    },
    {
      slug: "warm-earth-contemporary",
      title: "Warm Earth Contemporary",
      palette: "Terracotta Linen • Charcoal Accent • Oatmeal",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      tip: "Contrast relaxed stone-washed flax against structured architectural leather or boucle sofas.",
    },
  ];

  return (
    <section id="lookbook" className="py-20 md:py-28 bg-brand-linen border-b border-brand-sand transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal direction="up" distance={30} duration={700}>
          {/* Clean Editorial Header (Top Link Removed for Quiet Luxury) */}
          <div className="mb-12 text-center md:text-left">
            <span className="font-brandon text-[11px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-2">
              CURATED INTERIORS
            </span>
            <h2 className="font-brandon text-3xl sm:text-4xl text-brand-charcoal font-medium">
              The Living Room Lookbook
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKS.map((look, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 160}
              distance={45}
              duration={800}
              direction="up"
              className="h-full"
            >
              <div className="group bg-brand-linen-dark border border-brand-sand overflow-hidden shadow-luxury flex flex-col hover:border-brand-gold/50 transition-all h-full">
                <Link href={`/lookbook/${look.slug}`} className="relative aspect-[4/5] overflow-hidden block">
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="font-brandon text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold block">
                      {look.palette}
                    </span>
                    <h3 className="font-brandon text-xl text-brand-charcoal font-semibold">
                      <Link href={`/lookbook/${look.slug}`} className="hover:text-brand-gold transition-colors">
                        {look.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-xs text-brand-charcoal-muted font-normal leading-relaxed pt-1">
                      {look.tip}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-sand">
                    <Link
                      href={`/lookbook/${look.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors"
                    >
                      <span>Shop This Arrangement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Centered 'VIEW MORE' Button below the 3 Lookbook Cards (SS 2 Benchmark) */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/lookbook"
            className="inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#0E1410] dark:bg-[#1B241C] dark:hover:bg-[#D4AF37] dark:text-stone-100 dark:hover:text-[#0E1410] border border-stone-800 hover:border-[#D4AF37] text-[12px] uppercase tracking-[0.24em] font-bold transition-all duration-300 shadow-md hover:shadow-[0_4px_25px_rgba(212,175,55,0.35)] active:scale-[0.99] font-sans group"
          >
            <span>VIEW COMPLETE LOOKBOOK (8 SPACES)</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}

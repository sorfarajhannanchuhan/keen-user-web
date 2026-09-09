import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import ScrollReveal from "@/features/utilities/ScrollReveal";

interface CollectionCardProps {
  title: string;
  subtitle: string;
  fabricNote: string;
  image: string;
  link: string;
  tag?: string;
}

const COLLECTIONS: CollectionCardProps[] = [
  {
    title: "Belgian Linen Series",
    subtitle: "Pre-washed natural flax in earthy, calming neutrals",
    fabricNote: "100% European Flax • Stone-Washed",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    link: "/collections?category=linen",
    tag: "ESSENTIAL",
  },
  {
    title: "Nakshi Needlecraft",
    subtitle: "Centuries-old artisanal embroidery with modern minimalism",
    fabricNote: "Khadi Canvas • Silk Floss Stitching",
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=800&auto=format&fit=crop",
    link: "/collections?category=embroidered",
    tag: "ARTISANAL",
  },
  {
    title: "Matte Italian Velvet",
    subtitle: "Heavy, opulent double-pile velvet with tailored piping",
    fabricNote: "480 GSM Cotton Velvet • Piped Seams",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
    link: "/collections?category=velvet",
    tag: "COUTURE",
  },
];

export default function CollectionBanners() {
  return (
    <section className="py-16 md:py-24 bg-brand-linen border-b border-brand-sand transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="font-jost text-[11px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-2">
              FABRIC WORLDS
            </span>
            <h2 className="font-jost text-3xl sm:text-4xl text-brand-charcoal font-medium">
              Curated by Tactile Sensation
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4 mb-4" />
            <p className="font-sans text-sm text-brand-charcoal-muted font-normal">
              Every cushion begins with an obsession over tactile feel—from the cool breathability of organic flax to the opulent weight of double-pile velvet.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 160}
              distance={45}
              duration={800}
              direction="up"
              className="h-full"
            >
              <Link
                href={col.link}
                className="group relative block overflow-hidden bg-brand-linen-dark border border-brand-sand shadow-luxury transition-all duration-500 hover:shadow-luxury-hover hover:border-brand-gold/50 h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {col.tag && (
                    <div className="absolute top-4 left-4 bg-white/98 dark:bg-[#111713]/98 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-gold border border-stone-200/90 dark:border-stone-800/90 shadow-sm">
                      {col.tag}
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                    <span className="font-jost text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium block">
                      {col.fabricNote}
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="font-jost text-2xl font-semibold group-hover:text-brand-gold transition-colors text-white">
                        {col.title}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all group-hover:bg-brand-gold group-hover:text-[#0E1410]">
                        <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0E1410] transition-colors" />
                      </div>
                    </div>
                    <p className="font-sans text-xs text-stone-300 font-normal line-clamp-1">
                      {col.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Expansion Teaser Banner - Exactly as Screenshot 2 */}
        <ScrollReveal delay={200} distance={35} duration={800} direction="up">
          <div className="mt-12 p-8 bg-white/98 dark:bg-[#111713]/98 backdrop-blur-md border border-stone-200/90 dark:border-stone-800/90 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="font-jost text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-brand-gold font-bold block">
                COMING SOON TO THE KEEN CHIT ATELIER
              </span>
              <h4 className="font-jost text-xl sm:text-2xl lg:text-[26px] text-stone-900 dark:text-stone-100 font-medium tracking-tight">
                Bespoke Curtains, Heritage Quilts, Nakshi Katha & Fine Cashmere Shawls
              </h4>
              <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
                We are carefully sourcing master weaves across the country. Join our private register for early preview access.
              </p>
            </div>
            <a
              href="#newsletter"
              className="font-jost whitespace-nowrap px-6 py-3 bg-brand-gold text-[#0E1410] text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-gold-hover transition-colors shadow-md cursor-pointer"
            >
              Get VIP Preview
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

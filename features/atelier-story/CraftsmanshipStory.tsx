"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Feather, ShieldCheck, HeartHandshake, Leaf, ArrowRight } from "lucide-react";
import ScrollReveal from "@/features/utilities/ScrollReveal";
import { useFrontendContent } from "@/features/appearance";

export default function CraftsmanshipStory() {
  const { content } = useFrontendContent();
  const story = content?.craftsmanshipStory || content?.story;

  return (
    <section
      id="story"
      style={{ backgroundColor: story?.sectionBgColor || "#141C16" }}
      className="py-20 md:py-28 text-[#F8F6F0] border-b border-[#233026] relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="up" distance={45} duration={850}>
              <div className="relative aspect-[4/5] overflow-hidden shadow-luxury border border-brand-gold/40">
                <Image
                  src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1000&auto=format&fit=crop"
                  alt="KEEN CHIT Artisan Weaver handcrafting raw textile"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#141C16]/20" />
              </div>
            </ScrollReveal>

            {/* Overlapping Detail Card - Rich Atelier Olive Glass */}
            <ScrollReveal direction="up" distance={30} duration={850} delay={220} className="absolute -bottom-8 -right-4 sm:-right-8 z-10">
              <div className="bg-[#0E1410]/95 backdrop-blur-md p-6 max-w-xs shadow-2xl border border-brand-gold/40 text-[#F8F6F0] transition-colors">
                <span className="font-brandon text-[10px] uppercase tracking-[0.25em] text-[#DFCA74] font-bold block mb-1">
                  {story?.promiseBadge || "AN ARTISANAL PROMISE"}
                </span>
                <p className="font-sans text-base sm:text-lg text-white italic font-normal leading-relaxed">
                  {story?.promiseQuote || "\"A single piece can take over forty hours of needlework. We refuse to compromise.\""}
                </p>
                <span className="font-sans text-[11px] text-[#CFC7BA] block mt-2">
                  {story?.promiseAuthor || "Master Needlework Artisan, Bengal"}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Storytelling & Pillars */}
          <ScrollReveal direction="up" distance={35} duration={800} delay={150} className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="font-brandon text-[11px] uppercase tracking-[0.3em] text-[#DFCA74] font-semibold block">
                {story?.philosophyTag || "THE ART OF MINDFUL LIVING"}
              </span>
              <h2 className="font-brandon text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight whitespace-pre-line">
                {story?.headline || "Slow Textiles.\nQuiet Architecture."}
              </h2>
              <div className="w-16 h-[1.5px] bg-brand-gold/70 my-4" />
              <p className="font-sans text-sm text-[#DDD7CE] font-normal leading-relaxed">
                {story?.subtext || "At KEEN CHIT, our atelier rejects the urgency of disposable home decor. Every cushion is an architectural composition—woven from pure Belgian flax, balanced with double-pile velvet, and finished with heritage Nakshi needlework."}
              </p>
            </div>

            {/* 4 Brand Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 border-l-2 border-brand-gold pl-4">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-brand-gold" />
                  <h4 className="font-brandon text-base text-white font-semibold">
                    Pure Organic Flax
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#D5CEC2] font-normal leading-relaxed">
                  Sourced directly from generational mills in Flanders, stone-washed for authentic drape.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-brand-gold pl-4">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-brand-gold" />
                  <h4 className="font-brandon text-base text-white font-semibold">
                    Fair Trade Artisans
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#D5CEC2] font-normal leading-relaxed">
                  Ensuring living wages, artistic autonomy, and generational dignity for craftswomen.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-brand-gold pl-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <h4 className="font-brandon text-base text-white font-semibold">
                    Tailored Durability
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#D5CEC2] font-normal leading-relaxed">
                  Reinforced double seams, concealed YKK brass closures, and bespoke sizing resilience.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-brand-gold pl-4">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-brand-gold" />
                  <h4 className="font-brandon text-base text-white font-semibold">
                    Sensory Luxury
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#D5CEC2] font-normal leading-relaxed">
                  Hypoallergenic feather-touch down-alternative inners designed for restorative lounging.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="font-brandon inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold hover:text-white border-b border-brand-gold pb-1 transition-colors"
              >
                <span>Explore Our Atelier Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

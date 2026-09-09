import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, HeartHandshake, Leaf, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/features/utilities";

export const metadata: Metadata = {
  title: "Our Story & Atelier | KEEN CHIT",
  description: "The story of KEEN CHIT — handcrafted luxury home textiles, authentic materials, and master artisans.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-linen min-h-screen py-16 md:py-24 border-b border-brand-sand text-brand-charcoal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-brand-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-jost text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold block">
            THE ATELIER PROVENANCE
          </span>
          <h1 className="font-jost text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal font-medium leading-tight">
            The Soul of Slow Living & Tactile Poetry.
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-4" />
          <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-normal leading-relaxed">
            Founded on the conviction that a living space should feel like an intentional sanctuary, KEEN CHIT bridges centuries-old Bengal textile craftsmanship with quiet contemporary luxury.
          </p>
        </div>

        {/* Editorial Photo Collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-center">
          <ScrollReveal direction="up" distance={40} duration={850}>
            <div className="relative aspect-[4/5] bg-brand-linen-dark/80 shadow-luxury border-4 border-brand-sand overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
                alt="Raw silk and natural linen loom"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={35} duration={850} delay={150}>
            <div className="flex flex-col justify-center space-y-6">
              <span className="font-jost text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block">
                OUR GENESIS
              </span>
              <h2 className="font-jost text-3xl sm:text-4xl text-brand-charcoal font-medium leading-snug">
                Why We Refuse Bulk Mass Production
              </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
              In a modern world flooded with synthetic polyester cushion covers that lose their shape within weeks, KEEN CHIT was born out of a desire for enduring substance. 
            </p>
            <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
              We traveled to artisan clusters across Bengal and selected only long-staple European flax, double-pile cotton velvet, and heritage handloom khadi. Each cushion is individually cut, tailored with concealed Japanese brass zippers, and hand-finished with meticulous precision.
            </p>
          </div>
        </ScrollReveal>
      </div>

        {/* 3 Core Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-brand-linen-dark border border-brand-sand space-y-3">
            <Leaf className="w-5 h-5 text-brand-gold" />
            <h3 className="font-jost text-xl text-brand-charcoal font-semibold">100% Honest Fibers</h3>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-normal leading-relaxed">
              No polyester blends or artificial coatings. Only certified organic flax, pure mulberry silk, and natural cotton that breathe and soften with age.
            </p>
          </div>

          <div className="p-8 bg-brand-linen-dark border border-brand-sand space-y-3">
            <HeartHandshake className="w-5 h-5 text-brand-gold" />
            <h3 className="font-jost text-xl text-brand-charcoal font-semibold">Master Artisan Dignity</h3>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-normal leading-relaxed">
              Every embroidered Nakshi motif is hand-stitched by skilled craftswomen who receive fair living compensation and complete creative respect.
            </p>
          </div>

          <div className="p-8 bg-brand-linen-dark border border-brand-sand space-y-3">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <h3 className="font-jost text-xl text-brand-charcoal font-semibold">Heirloom Durability</h3>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-normal leading-relaxed">
              French seams, reinforced piping, and dense upholstery weights ensure that every cushion withstands daily living and retains its poise.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-10 bg-brand-linen-dark border border-brand-sand text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="font-jost text-3xl text-brand-charcoal font-medium">
            Experience the Atelier Collection
          </h3>
          <p className="font-sans text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto font-normal">
            Discover pieces designed to bring warmth, texture, and character to your home.
          </p>
          <div className="pt-2">
            <Link
              href="/collections"
              className="font-jost inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-luxury"
            >
              <span>Explore Cushion Catalog</span>
              <ArrowRight className="w-4 h-4 text-[#0E1410]" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

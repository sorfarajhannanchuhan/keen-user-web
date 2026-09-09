import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, Sun, Wind, Droplets, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Fabric Laundering & Care Guide | KEEN CHIT Atelier",
  description: "Comprehensive guide to caring for organic linen, Italian velvet, raw silk, and Nakshi needlework cushions.",
};

export default function CareGuidePage() {
  return (
    <div className="bg-brand-linen min-h-screen py-16 md:py-24 border-b border-brand-sand text-brand-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Header */}
        <div className="border-b border-brand-sand pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-2">
            ATELIER PRESERVATION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-charcoal font-normal">
            Fabric & Laundering Guide
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 max-w-xl font-light leading-relaxed">
            Every piece crafted by KEEN CHIT is built from authentic natural fibers intended to age gracefully over decades. Follow these recommendations to preserve hand-feel, structural drape, and embroidery luster.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="space-y-12">
          
          {/* Section 1: Belgian Flax Linen */}
          <div className="p-6 sm:p-8 bg-brand-linen-dark border border-brand-sand space-y-4">
            <div className="flex items-center justify-between border-b border-brand-sand pb-3">
              <h2 className="font-serif text-2xl text-brand-charcoal font-normal">
                1. Organic Belgian Flax Linen
              </h2>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#1E1E24] border border-brand-sand text-brand-gold font-semibold">
                Washable Natural Fiber
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Pure flax linen possesses extraordinary tensile strength and becomes noticeably softer and more supple with each laundering cycle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="space-y-1 bg-brand-linen-dark/80 p-3 border border-brand-sand">
                <div className="font-semibold text-brand-charcoal flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Washing</span>
                </div>
                <p className="text-stone-400 font-light">
                  Machine wash cold on delicate cycle. Use mild, pH-neutral liquid detergent. Avoid bleach or fabric softeners.
                </p>
              </div>

              <div className="space-y-1 bg-brand-linen-dark/80 p-3 border border-brand-sand">
                <div className="font-semibold text-brand-charcoal flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Drying</span>
                </div>
                <p className="text-stone-400 font-light">
                  Line dry flat in open shade. Avoid harsh direct sun exposure. Tumble dry on low for a relaxed organic wrinkle.
                </p>
              </div>

              <div className="space-y-1 bg-brand-linen-dark/80 p-3 border border-brand-sand">
                <div className="font-semibold text-brand-charcoal flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Ironing</span>
                </div>
                <p className="text-stone-400 font-light">
                  Warm steam iron while the fabric is slightly damp if a crisp tailored look is desired.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Matte Italian Velvet */}
          <div className="p-6 sm:p-8 bg-brand-linen-dark border border-brand-sand space-y-4">
            <div className="flex items-center justify-between border-b border-brand-sand pb-3">
              <h2 className="font-serif text-2xl text-brand-charcoal font-normal">
                2. Italian Matte Cotton Velvet
              </h2>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#1E1E24] border border-brand-sand text-brand-gold font-semibold">
                Specialist Dry Clean Only
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Our 480 GSM velvet features a deep, plush pile. To preserve its matte luxury finish:
            </p>

            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-stone-400 font-light pl-2">
              <li><strong>Dry Cleaning:</strong> Entrust exclusively to experienced professional dry cleaners. Do not water-wash or submerge.</li>
              <li><strong>Pile Restoration:</strong> If pile becomes flattened, hold a handheld garment steamer 6 inches away and gently brush upwards with a soft-bristle velvet brush.</li>
              <li><strong>Spills:</strong> Blot immediately with a dry, clean microfiber cloth. Never rub or press vigorously.</li>
            </ul>
          </div>

          {/* Section 3: Nakshi Needlework & Raw Silk */}
          <div className="p-6 sm:p-8 bg-brand-linen-dark border border-brand-sand space-y-4">
            <div className="flex items-center justify-between border-b border-brand-sand pb-3">
              <h2 className="font-serif text-2xl text-brand-charcoal font-normal">
                3. Hand-Embroidered Nakshi & Silk Floss
              </h2>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#1E1E24] border border-brand-sand text-brand-gold font-semibold">
                Delicate Heirloom Care
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Featuring hundreds of hours of fine silk running stitches on artisanal khadi canvas:
            </p>

            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-stone-400 font-light pl-2">
              <li>Professional delicate dry clean is strongly recommended to protect thread tension and dye purity.</li>
              <li>If spot cleaning is necessary, use cold water and a dab of gentle soap on a cotton swab.</li>
              <li>Always iron on the <strong>reverse side</strong> using low heat with a clean cotton pressing towel placed between the iron and the embroidery.</li>
            </ul>
          </div>

          {/* Section 4: How to Karate Chop & Fluff Cushions */}
          <div className="p-6 sm:p-8 bg-brand-linen-dark border border-brand-sand space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-normal">
                How to Style & Fluff: The Designer &ldquo;Karate Chop&rdquo;
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              All KEEN CHIT cushions include high-density down-alternative or duck-feather inners that respond beautifully to shaping:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-stone-400 font-light pl-2">
              <li>Hold opposite diagonal corners of the cushion and firmly push them together 2-3 times to distribute the filling evenly.</li>
              <li>Set the cushion upright on your sofa or chair.</li>
              <li>Use the side of your hand to gently press down in the center of the top edge to create the elegant designer indentation (&ldquo;karate chop&rdquo;).</li>
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
}

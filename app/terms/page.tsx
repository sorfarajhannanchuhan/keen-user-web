import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | KEEN CHIT Atelier",
  description: "Terms and conditions of acquisition, bespoke orders, and client service at KEEN CHIT.",
};

export default function TermsPage() {
  return (
    <div className="bg-brand-linen min-h-screen py-16 md:py-24 border-b border-brand-sand text-brand-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
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
            CLIENT AGREEMENT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-charcoal font-normal">
            Terms of Service
          </h1>
          <p className="text-xs text-stone-400 mt-2 font-light">
            Effective Date: March 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              1. Artisanal Nature of Our Creations
            </h2>
            <p>
              Each piece produced by <strong>KEEN CHIT</strong> is crafted by hand using organic natural fibers (including stone-washed European flax linen, raw silk, and artisanal handspun khadi). Slight variations in weave texture, slubbing, and embroidery needle tension are natural hallmarks of handloom and artisan handcraft, not defects. They attest to the authentic craftsmanship of your piece.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              2. Orders & Order Acceptance
            </h2>
            <p>
              Orders placed online or via our WhatsApp Concierge desk constitute an offer to purchase. An order is formally accepted when our atelier issues an official confirmation and schedules dispatch. We reserve the right to limit order quantities due to limited artisan batch availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              3. Pricing & Currency
            </h2>
            <p>
              All prices displayed on our platform are denominated in Bangladeshi Taka (BDT ৳) and are inclusive of standard applicable taxes. Prices are subject to adjustment for custom bespoke dimensions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              4. Bespoke & Custom Tailoring
            </h2>
            <p>
              Custom dimension cushions, custom drapery orders, and bespoke embroidered pieces require a 50% non-refundable deposit prior to commencing cutting. Bespoke items are tailored to client specification and are not eligible for standard return unless defective.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              5. Intellectual Property
            </h2>
            <p>
              All textile motifs, photographic imagery, brand emblems, and visual assets associated with &ldquo;KEEN CHIT&rdquo; are the exclusive intellectual property of the brand and may not be reproduced without written authorization.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PackageCheck, Truck, RotateCcw, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "White-Glove Shipping & Returns | KEEN CHIT Atelier",
  description: "National white-glove delivery, zero-plastic luxury packaging, and hassle-free 7-day exchange policy.",
};

export default function ShippingPage() {
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
            CONCIERGE LOGISTICS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-charcoal font-normal">
            Shipping, Packaging & Returns
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 max-w-xl font-light leading-relaxed">
            Every KEEN CHIT order is inspected by hand, wrapped in reusable unbleached linen dust covers, and dispatched with white-glove care.
          </p>
        </div>

        {/* 3 Main Pillars */}
        <div className="space-y-12">
          
          {/* Delivery Rates & Timelines */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-brand-charcoal font-normal flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-gold" />
              <span>National Delivery Tariffs & Timelines</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-brand-linen-dark border border-brand-sand space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-brand-gold font-bold block">
                  INSIDE DHAKA METROPOLITAN
                </span>
                <h3 className="font-serif text-xl text-brand-charcoal font-medium">
                  ৳80 Standard • FREE above ৳3,000
                </h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Delivered within <strong>24 to 48 hours</strong> via our dedicated courier team. Same-day urgent studio pickup available upon request from our Gulshan-2 design atelier.
                </p>
              </div>

              <div className="p-6 bg-brand-linen-dark border border-brand-sand space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-brand-gold font-bold block">
                  ALL DISTRICTS ACROSS BANGLADESH
                </span>
                <h3 className="font-serif text-xl text-brand-charcoal font-medium">
                  ৳150 Standard • FREE above ৳3,000
                </h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Delivered within <strong>48 to 96 hours</strong> (Chittagong, Sylhet, Rajshahi, Khulna, and all 64 districts) via insured priority express logistics.
                </p>
              </div>
            </div>
          </section>

          {/* Sustainable White-Glove Packaging */}
          <section className="p-6 sm:p-8 bg-brand-linen-dark border border-brand-sand space-y-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-brand-gold" />
              <h2 className="font-serif text-2xl text-brand-charcoal font-normal">
                Zero-Plastic Bespoke Packaging
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              We refuse single-use plastic films. Every cushion set arrives in:
            </p>

            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-stone-400 font-light pl-2">
              <li><strong>Reusable Linen Dust Sleeve:</strong> Hand-sewn unbleached cotton/linen storage pouch for off-season preservation.</li>
              <li><strong>Natural Botanical Scent Card:</strong> Lightly infused with organic sandalwood and dried amber to protect textiles during transit.</li>
              <li><strong>Recycled Craft Outer Box:</strong> Sealed with water-activated paper tape.</li>
            </ul>
          </section>

          {/* 7-Day Exchange Policy */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-brand-gold" />
              <h2 className="font-serif text-2xl text-brand-charcoal font-normal">
                7-Day Hassle-Free Exchange Policy
              </h2>
            </div>

            <div className="p-6 bg-brand-linen-dark border border-brand-sand space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              <p>
                We want you to feel complete confidence styling KEEN CHIT pieces in your residence. If the color tone, fabric weight, or dimensions do not harmonize with your living room interior:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-stone-400 pl-2">
                <li>Notify our WhatsApp concierge (+880 1700-000000) within <strong>7 days</strong> of delivery.</li>
                <li>Ensure items are unwashed, unsoiled, and in original packaging with tags intact.</li>
                <li>We will dispatch our courier to collect the exchange item from your doorstep and deliver your preferred replacement.</li>
              </ol>

              <div className="pt-2 text-xs text-brand-gold font-medium">
                <em>* Note: Custom-tailored bespoke dimension cushions are final sale unless a tailoring error occurred.</em>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

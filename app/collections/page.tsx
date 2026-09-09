import React from "react";
import type { Metadata } from "next";
import { ProductCatalog, CollectionBanners } from "@/features/catalog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cushion Collections & Archives | KEEN CHIT Atelier",
  description: "Browse the permanent signature collection of handcrafted Belgian linen, Italian velvet, and Nakshi cushions.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-brand-linen min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-brand-gold transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </Link>
      </div>

      <CollectionBanners />
      <ProductCatalog />
    </div>
  );
}

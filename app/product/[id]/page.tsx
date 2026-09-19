import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/features/catalog/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || "");
  const product =
    PRODUCTS.find((p) => p.id === decodedId) ||
    PRODUCTS.find((p) => p.id.toLowerCase() === decodedId.toLowerCase()) ||
    PRODUCTS[0];

  return {
    title: `${product.name} — Luxury Artisanal Living | KEEN CHIT`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.primaryImage }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || "");
  const product =
    PRODUCTS.find((p) => p.id === decodedId) ||
    PRODUCTS.find((p) => p.id.toLowerCase() === decodedId.toLowerCase()) ||
    PRODUCTS[0];

  return <ProductDetailClient product={product} />;
}
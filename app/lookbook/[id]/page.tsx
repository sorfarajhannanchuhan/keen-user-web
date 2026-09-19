import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOOKBOOK_ARRANGEMENTS } from "@/features/catalog/lookbookData";
import LookbookDetailClient from "./LookbookDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return LOOKBOOK_ARRANGEMENTS.map((a) => ({
    id: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || "");
  const arrangement =
    LOOKBOOK_ARRANGEMENTS.find((a) => a.slug === decodedId) ||
    LOOKBOOK_ARRANGEMENTS.find((a) => a.id === decodedId) ||
    LOOKBOOK_ARRANGEMENTS[0];

  return {
    title: `${arrangement.title} — Curated Lookbook | KEEN CHIT`,
    description: arrangement.tagline,
    openGraph: {
      title: arrangement.title,
      description: arrangement.tagline,
      images: [{ url: arrangement.heroImage }],
    },
  };
}

export default async function LookbookDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || "");
  const arrangement =
    LOOKBOOK_ARRANGEMENTS.find((a) => a.slug === decodedId) ||
    LOOKBOOK_ARRANGEMENTS.find((a) => a.id === decodedId);

  if (!arrangement) {
    notFound();
  }

  return <LookbookDetailClient arrangement={arrangement} />;
}

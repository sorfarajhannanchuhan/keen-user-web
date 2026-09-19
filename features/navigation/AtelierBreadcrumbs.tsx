"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AtelierBreadcrumbsProps {
  items: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  maxChars?: number;
}

export default function AtelierBreadcrumbs({
  items,
  backHref,
  backLabel = "Back to Archive",
  maxChars = 24,
}: AtelierBreadcrumbsProps) {
  const router = useRouter();

  const truncateLabel = (text: string, limit: number) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return `${text.slice(0, limit).trim()}...`;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-stone-200/70 dark:border-stone-800/70 bg-[#FAF9F7] dark:bg-[#0E1410] py-3.5 px-4 sm:px-6 lg:px-12 transition-colors duration-300"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Breadcrumb Links Trail */}
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[11.5px] tracking-[0.06em] text-stone-500 dark:text-stone-400 font-normal">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <span className="text-stone-300 dark:text-stone-700 select-none font-light">/</span>
                )}

                {isLast ? (
                  <span
                    className="text-stone-900 dark:text-stone-100 font-medium"
                    title={item.label}
                    aria-current="page"
                  >
                    <span className="inline sm:hidden">{truncateLabel(item.label, 16)}</span>
                    <span className="hidden sm:inline">{truncateLabel(item.label, maxChars)}</span>
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>

        {/* Back Navigation Action */}
        <div className="hidden sm:flex items-center shrink-0">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] font-medium text-stone-500 dark:text-stone-400 hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2]" />
              <span>{backLabel}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] font-medium text-stone-500 dark:text-stone-400 hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2]" />
              <span>{backLabel || "Back"}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

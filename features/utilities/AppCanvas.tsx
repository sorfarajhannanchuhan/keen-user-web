"use client";

import React from "react";

export default function AppCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-brand-linen text-brand-charcoal">
      {children}
    </div>
  );
}

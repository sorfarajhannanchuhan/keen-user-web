"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  className = "",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-stone-200/50 dark:bg-stone-800/50 animate-pulse ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 p-2 rounded-full border transition-all duration-300 group focus:outline-none ${
        isDark
          ? "bg-brand-linen-dark border-brand-sand text-brand-gold hover:border-[#D4AF37]/60 hover:bg-[#1A241D]"
          : "bg-[#F0ECE1] border-[#E2DDD5] text-[#3F4D38] hover:border-[#3F4D38]/60 hover:bg-[#FFFFFF]"
      } ${className}`}
      aria-label={isDark ? "Switch to Belgian Linen Day mode" : "Switch to Tuscan Olive Noir mode"}
      title={isDark ? "Switch to Belgian Linen (Day)" : "Switch to Olive Noir (Night)"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-brand-gold transition-transform duration-500 group-hover:-rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-[#C5A059] transition-transform duration-500 group-hover:rotate-45" />
        )}
      </div>

      {showLabel && (
        <span className="text-[11px] uppercase tracking-[0.15em] font-medium pr-1">
          {isDark ? "Noir" : "Linen"}
        </span>
      )}
    </button>
  );
}

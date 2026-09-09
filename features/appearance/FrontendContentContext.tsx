"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { FrontendContent, DEFAULT_FRONTEND_CONTENT } from "./content";

interface FrontendContentContextType {
  content: FrontendContent;
  updateContent: (newContent: Partial<FrontendContent>) => Promise<boolean>;
  refreshContent: () => Promise<void>;
  isLoading: boolean;
}

const FrontendContentContext = createContext<FrontendContentContextType>({
  content: DEFAULT_FRONTEND_CONTENT,
  updateContent: async () => false,
  refreshContent: async () => {},
  isLoading: true,
});

const STORAGE_KEY = "keen_frontend_content";

export function FrontendContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<FrontendContent>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          return {
            ...DEFAULT_FRONTEND_CONTENT,
            ...parsed,
            announcement: { ...DEFAULT_FRONTEND_CONTENT.announcement, ...(parsed.announcement || {}) },
            header: { ...DEFAULT_FRONTEND_CONTENT.header, ...(parsed.header || {}) },
            hero: { ...DEFAULT_FRONTEND_CONTENT.hero, ...(parsed.hero || {}) },
            products: { ...DEFAULT_FRONTEND_CONTENT.products, ...(parsed.products || {}) },
            craftsmanshipStory: {
              ...DEFAULT_FRONTEND_CONTENT.craftsmanshipStory,
              ...(parsed.craftsmanshipStory || {}),
            },
            footer: { ...DEFAULT_FRONTEND_CONTENT.footer, ...(parsed.footer || {}) },
            brandColors: { ...DEFAULT_FRONTEND_CONTENT.brandColors, ...(parsed.brandColors || {}) },
            navigation: Array.isArray(parsed.navigation) ? parsed.navigation : DEFAULT_FRONTEND_CONTENT.navigation,
            megaMenus: parsed.megaMenus || DEFAULT_FRONTEND_CONTENT.megaMenus,
            analytics: { ...(DEFAULT_FRONTEND_CONTENT.analytics || {}), ...(parsed.analytics || {}) },
          };
        }
      } catch (e) {}
    }
    return DEFAULT_FRONTEND_CONTENT;
  });

  const [isLoading, setIsLoading] = useState(true);

  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setContent(data);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {}
      }
    } catch (err) {
      console.error("Failed to fetch live frontend content:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const updateContent = async (newContent: Partial<FrontendContent>): Promise<boolean> => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContent),
      });

      if (res.ok) {
        const updated = await res.json();
        setContent(updated);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to update frontend content:", err);
      return false;
    }
  };

  return (
    <FrontendContentContext.Provider value={{ content, updateContent, refreshContent, isLoading }}>
      {children}
    </FrontendContentContext.Provider>
  );
}

export function useFrontendContent() {
  return useContext(FrontendContentContext);
}

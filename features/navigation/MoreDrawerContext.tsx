"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface MoreDrawerContextType {
  isMoreDrawerOpen: boolean;
  setIsMoreDrawerOpen: (open: boolean) => void;
  toggleMoreDrawer: () => void;
}

const MoreDrawerContext = createContext<MoreDrawerContextType>({
  isMoreDrawerOpen: false,
  setIsMoreDrawerOpen: () => {},
  toggleMoreDrawer: () => {},
});

export function MoreDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);

  const toggleMoreDrawer = () => {
    setIsMoreDrawerOpen((prev) => !prev);
  };

  // Lock body scroll when drawer is open and prevent Windows scrollbar shift
  useEffect(() => {
    if (isMoreDrawerOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMoreDrawerOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMoreDrawerOpen) {
        setIsMoreDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMoreDrawerOpen]);

  return (
    <MoreDrawerContext.Provider
      value={{ isMoreDrawerOpen, setIsMoreDrawerOpen, toggleMoreDrawer }}
    >
      {children}
    </MoreDrawerContext.Provider>
  );
}

export function useMoreDrawer() {
  const context = useContext(MoreDrawerContext);
  if (!context) {
    throw new Error("useMoreDrawer must be used within a MoreDrawerProvider");
  }
  return context;
}

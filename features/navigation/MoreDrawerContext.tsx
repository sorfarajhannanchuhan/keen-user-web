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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMoreDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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

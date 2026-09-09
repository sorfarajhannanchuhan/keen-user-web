"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AppearanceSettings,
  DEFAULT_APPEARANCE,
  SHADE_PRESETS,
  BarAppearanceConfig,
} from "./appearance";

interface AppearanceContextType {
  appearance: AppearanceSettings;
  updateAppearance: (newSettings: Partial<AppearanceSettings>) => Promise<boolean>;
  resetAppearance: () => Promise<boolean>;
  getBarStyles: (
    barKey: "header" | "announcementBar" | "heroInfoBar" | "searchDropdown",
    isDark?: boolean
  ) => {
    style: React.CSSProperties;
    className: string;
  };
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "keen_appearance_settings";

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace("#", "").trim();
  if (c.length === 3) {
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(255, 255, 255, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<AppearanceSettings>(DEFAULT_APPEARANCE);

  // Initial load: first from localStorage, then verify with server API
  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        setAppearance(JSON.parse(cached));
      }
    } catch (e) {}

    fetch("/api/appearance")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setAppearance(data);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
          } catch (e) {}
        }
      })
      .catch((err) => console.error("Error fetching appearance:", err));
  }, []);

  const updateAppearance = async (newSettings: Partial<AppearanceSettings>): Promise<boolean> => {
    try {
      const res = await fetch("/api/appearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });

      if (res.ok) {
        const updated = await res.json();
        setAppearance(updated);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to update appearance:", err);
      return false;
    }
  };

  const resetAppearance = async (): Promise<boolean> => {
    return updateAppearance(DEFAULT_APPEARANCE);
  };

  const getBarStyles = (
    barKey: "header" | "announcementBar" | "heroInfoBar" | "searchDropdown",
    isDark: boolean = false
  ) => {
    if (barKey === "searchDropdown") {
      const solidBg = isDark ? "#121914" : "#FFFFFF";
      const solidBorder = isDark ? "rgba(45, 55, 48, 0.9)" : "rgba(226, 221, 213, 0.9)";
      return {
        style: {
          backgroundColor: solidBg,
          borderColor: solidBorder,
          opacity: 1,
        },
        className: "",
      };
    }

    const config: BarAppearanceConfig = appearance[barKey] || DEFAULT_APPEARANCE[barKey];
    const alpha = Math.min(1, Math.max(0.05, config.transparency / 100));

    let hexColor = isDark ? config.customColorDark : config.customColorLight;
    let borderColor = isDark ? "rgba(40, 52, 42, 0.85)" : "rgba(231, 226, 217, 0.85)";

    if (config.shadePreset !== "custom" && SHADE_PRESETS[config.shadePreset]) {
      const preset = SHADE_PRESETS[config.shadePreset];
      hexColor = isDark ? preset.dark : preset.light;
      borderColor = isDark ? preset.borderDark : preset.borderLight;
    }

    const rgbaBg = hexToRgba(hexColor, alpha);

    const style: React.CSSProperties = {
      backgroundColor: rgbaBg,
      borderColor: borderColor,
    };

    if (config.blur && alpha < 1) {
      style.backdropFilter = "blur(20px)";
      style.WebkitBackdropFilter = "blur(20px)";
    }

    return {
      style,
      className: config.blur && alpha < 1 ? "backdrop-blur-xl" : "",
    };
  };

  return (
    <AppearanceContext.Provider
      value={{ appearance, updateAppearance, resetAppearance, getBarStyles }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}

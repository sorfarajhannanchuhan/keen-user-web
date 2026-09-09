/**
 * ============================================================================
 * KEEN CHIT - Feature: Appearance (Data & Types)
 * ============================================================================
 */

export interface BarAppearanceConfig {
  transparency: number; // 0 to 100
  blur: boolean;        // backdrop blur active
  shadePreset: "linen" | "olive" | "white" | "ivory" | "sand" | "noir" | "cypress" | "custom";
  customColorLight: string;
  customColorDark: string;
}

export interface AppearanceSettings {
  header: BarAppearanceConfig;
  announcementBar: BarAppearanceConfig;
  heroInfoBar: BarAppearanceConfig;
  searchDropdown: BarAppearanceConfig;
  updatedAt: string;
}

export const DEFAULT_HEADER_CONFIG: BarAppearanceConfig = {
  transparency: 94,
  blur: true,
  shadePreset: "linen",
  customColorLight: "#F8F6F0",
  customColorDark: "#0E1410",
};

export const DEFAULT_ANNOUNCEMENT_CONFIG: BarAppearanceConfig = {
  transparency: 100,
  blur: false,
  shadePreset: "olive",
  customColorLight: "#3F4D38",
  customColorDark: "#1B2418",
};

export const DEFAULT_HERO_INFO_CONFIG: BarAppearanceConfig = {
  transparency: 80,
  blur: true,
  shadePreset: "linen",
  customColorLight: "#F8F6F0",
  customColorDark: "#0E1410",
};

export const DEFAULT_SEARCH_DROPDOWN_CONFIG: BarAppearanceConfig = {
  transparency: 100,
  blur: false,
  shadePreset: "linen",
  customColorLight: "#FFFFFF",
  customColorDark: "#121914",
};

export const DEFAULT_APPEARANCE: AppearanceSettings = {
  header: DEFAULT_HEADER_CONFIG,
  announcementBar: DEFAULT_ANNOUNCEMENT_CONFIG,
  heroInfoBar: DEFAULT_HERO_INFO_CONFIG,
  searchDropdown: DEFAULT_SEARCH_DROPDOWN_CONFIG,
  updatedAt: new Date().toISOString(),
};

export const SHADE_PRESETS: Record<
  string,
  { name: string; light: string; dark: string; borderLight: string; borderDark: string }
> = {
  linen: {
    name: "Belgian Linen Oatmeal",
    light: "#F8F6F0",
    dark: "#0E1410",
    borderLight: "#E2DDD5",
    borderDark: "#233026",
  },
  olive: {
    name: "Tuscan Olive",
    light: "#3F4D38",
    dark: "#0E1410",
    borderLight: "#2F3B2A",
    borderDark: "#233026",
  },
  ivory: {
    name: "Soft Tuscan Ivory",
    light: "#FBF8F2",
    dark: "#111713",
    borderLight: "#ECE6DA",
    borderDark: "#222D24",
  },
  sand: {
    name: "Golden Desert Sand",
    light: "#F5F0E6",
    dark: "#171F19",
    borderLight: "#E5DDD0",
    borderDark: "#2B3A2E",
  },
  white: {
    name: "Pure Crisp White",
    light: "#FFFFFF",
    dark: "#0E1410",
    borderLight: "#E7E5E4",
    borderDark: "#29362B",
  },
  cypress: {
    name: "Deep Cypress Noir",
    light: "#141A16",
    dark: "#080C0A",
    borderLight: "#28352A",
    borderDark: "#1B241C",
  },
  noir: {
    name: "Carbon Espresso Noir",
    light: "#191512",
    dark: "#0E0C0A",
    borderLight: "#2E2620",
    borderDark: "#1E1815",
  },
};

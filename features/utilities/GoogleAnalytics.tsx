"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFrontendContent } from "@/features/appearance";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Google Analytics 4 (GA4) Enterprise Injection
 * Dynamically mounts official Google gtag.js upon enabling in Admin Panel.
 * Automatically tracks pageviews across route transitions.
 * Strictly excludes administrative sessions (/admin).
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const { content } = useFrontendContent();
  const analytics = content?.analytics;

  const isEnabled = Boolean(analytics?.isGa4Enabled);
  const measurementId = analytics?.ga4MeasurementId?.trim() || "";

  useEffect(() => {
    // 1. Never track inside the Admin Panel
    if (pathname?.startsWith("/admin")) return;

    // 2. Do nothing if GA4 is disabled or measurement ID is unset
    if (!isEnabled || !measurementId) return;

    // 3. Inject official gtag.js library if not already in document
    const scriptId = "keen-ga4-gtag";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.async = true;
      scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(scriptTag);

      // Initialize dataLayer and gtag caller
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
    }

    // 4. Send pageview event on initial mount and route change
    if (typeof window.gtag === "function") {
      window.gtag("config", measurementId, {
        page_path: pathname || window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [isEnabled, measurementId, pathname]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const clientToSection: Record<string, string> = {
  gmail: "gmail",
  outlook: "outlook-web",
  "outlook-desktop": "outlook-desktop",
  thunderbird: "thunderbird",
  "apple-mail": "apple-mail",
};

export default function ClientScrollAnchor() {
  const searchParams = useSearchParams();
  const client = searchParams.get("client");

  useEffect(() => {
    if (!client) return;
    const sectionId = clientToSection[client] ?? client;
    // Defer until the browser has finished painting the full page layout.
    // Without this, sections near the bottom scroll to the wrong position
    // because the page height isn't final yet at React hydration time.
    const timer = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, [client]);

  return null;
}

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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [client]);

  return null;
}

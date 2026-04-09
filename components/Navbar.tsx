"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = {
  t: Dictionary["nav"];
  lang: string;
};

export default function Navbar({ t, lang }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const otherLang = lang === "en" ? "fr" : "en";
  const otherPath = pathname === "/" ? `/${otherLang}` : pathname.replace(`/${lang}`, `/${otherLang}`);

  const navLinks = [
    { label: t.features, href: "#features" },
    { label: t.pricing, href: "#pricing" },
    { label: t.performance, href: "#performance" },
    { label: t.faq, href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">zapia</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + language switcher */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={otherPath}
              className="text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors uppercase"
            >
              {otherLang}
            </Link>
            <a
              href="mailto:contact@zapia.fr"
              className="text-sm font-semibold px-4 py-2 rounded-lg gradient-bg text-white hover:opacity-90 transition-opacity"
            >
              {t.getstarted}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </header>

      {/* Mobile menu — full-screen overlay, rendered outside <header> so it covers the whole viewport */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col">
          {/* Top bar with logo + close button */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">zapia</span>
            </a>
            <button
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href={otherPath}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              {otherLang === "en" ? "🇬🇧 English" : "🇫🇷 Français"}
            </Link>
            <a
              href="mailto:contact@zapia.fr"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl font-semibold text-sm gradient-bg text-white text-center hover:opacity-90 transition-opacity"
            >
              {t.getstarted}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

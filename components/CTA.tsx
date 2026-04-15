"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["cta"] };

export default function CTA({ t }: Props) {
  const handleStart = () => {
    window.dispatchEvent(new CustomEvent("start-onboarding"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"
        />

        <h2 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
          {t.headline}
          <br />
          <span className="gradient-text">{t.headline_highlight}</span>
        </h2>
        <p className="relative text-lg text-slate-400 mb-10 max-w-xl mx-auto">
          {t.sub}
        </p>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white gradient-bg shadow-xl shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all text-base"
          >
            {t.button}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.trust_moneyback}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span aria-hidden>🇫🇷</span>
            <span>{t.trust_france}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

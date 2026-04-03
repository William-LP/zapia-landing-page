"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["pricing"] };

export default function Pricing({ t }: Props) {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            {t.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.headline}{" "}
            <span className="gradient-text">{t.headline_highlight}</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">{t.sub}</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!annual ? "text-slate-900" : "text-slate-400"}`}>
            {t.toggle_monthly}
          </span>
          <button
            type="button"
            onClick={() => setAnnual((prev) => !prev)}
            className="relative inline-flex h-7 w-12 items-center rounded-full focus:outline-none transition-all duration-200"
            style={annual ? { background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%)" } : { background: "#e2e8f0" }}
            aria-label="Toggle billing period"
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                annual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-slate-900" : "text-slate-400"}`}>
            {t.toggle_annual}
          </span>
          {annual && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
              {t.badge_savings}
            </span>
          )}
        </div>

        {/* Cards */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          {/* Hosting card */}
          <div className="relative flex flex-col rounded-2xl p-8 gradient-bg text-white shadow-2xl shadow-indigo-500/30 card-hover">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">
                {annual ? t.plan_annual_title : t.plan_monthly_title}
              </h3>
              <p className="text-sm text-indigo-200">
                {annual ? t.plan_annual_desc : t.plan_monthly_desc}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-1">
                <span
                  className="text-6xl font-extrabold text-white leading-none"
                  style={{ letterSpacing: "-3px" }}
                >
                  {annual ? "99" : "9.99"}€
                </span>
                <span className="text-sm text-indigo-200 pb-1">
                  /{annual ? "year" : "month"}
                </span>
              </div>
              {annual && (
                <p className="text-xs text-indigo-300 mt-2">{t.savings_note}</p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {t.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-cyan-300" />
                  <span className="text-indigo-100">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="block text-center py-3 px-6 rounded-xl font-semibold text-sm bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg transition-all"
            >
              {t.cta}
            </a>
          </div>

          {/* Custom website card */}
          <div className="relative flex flex-col rounded-2xl p-8 bg-slate-900 border border-slate-700 text-white card-hover">
            <div className="mb-6">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold mb-3">
                {t.custom_badge}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">{t.custom_title}</h3>
              <p className="text-sm text-slate-400">{t.custom_desc}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-white leading-none">
                  {t.custom_price}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{t.custom_sub}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {t.custom_features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-violet-400" />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="block text-center py-3 px-6 rounded-xl font-semibold text-sm border border-slate-600 text-white hover:bg-slate-800 transition-all"
            >
              {t.custom_cta}
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-10">
          {t.footer_text}{" "}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            {t.footer_link}
          </a>
        </p>
      </div>
    </section>
  );
}

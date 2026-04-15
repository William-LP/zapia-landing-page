"use client";

import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["pricing"] };

export default function Pricing({ t }: Props) {
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

        {/* Feature price list */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-10">
          {t.price_items.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-6 py-4 ${
                i < t.price_items.length - 1 ? "border-b border-slate-100" : ""
              } ${item.comingSoon ? "bg-slate-50" : "bg-white"}`}
            >
              <span className={`text-sm font-medium ${item.comingSoon ? "text-slate-400" : "text-slate-700"}`}>
                {item.label}
              </span>
              {item.comingSoon ? (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium border border-slate-200">
                  {t.coming_soon}
                </span>
              ) : (
                <span className="text-sm font-semibold text-slate-900">{item.price}</span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => { window.dispatchEvent(new CustomEvent("start-onboarding")); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-opacity"
          >
            {t.cta_label}
          </button>
        </div>
      </div>
    </section>
  );
}

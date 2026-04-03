import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["hero"] };

export default function Hero({ t }: Props) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Background gradient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 animate-fade-in-up-delay-1">
          {t.headline}{" "}
          <span className="gradient-text">{t.headline_highlight}</span>
          {t.headline_end && (
            <>
              <br className="hidden sm:block" /> {t.headline_end}
            </>
          )}
        </h1>

        {/* Subheading */}
        <p className="text-center text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up-delay-2">
          {t.sub}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up-delay-3">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all"
          >
            {t.cta_primary}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
          >
            {t.cta_secondary}
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 mb-16 animate-fade-in-up-delay-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.trust_moneyback}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "99.9%", label: t.stat_uptime },
            { value: "<20ms", label: t.stat_response },
            { value: "150K+", label: t.stat_websites },
            { value: "24/7", label: t.stat_support },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  Zap,
  ShieldCheck,
  Globe,
  Database,
  LifeBuoy,
  RefreshCw,
  Lock,
  BarChart2,
} from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["features"] };

const icons = [Zap, Globe, ShieldCheck, RefreshCw, Database, Lock, BarChart2, LifeBuoy];
const colors = [
  "bg-yellow-500/10 text-yellow-500",
  "bg-cyan-500/10 text-cyan-500",
  "bg-emerald-500/10 text-emerald-500",
  "bg-indigo-500/10 text-indigo-500",
  "bg-violet-500/10 text-violet-500",
  "bg-rose-500/10 text-rose-500",
  "bg-blue-500/10 text-blue-500",
  "bg-orange-500/10 text-orange-500",
];

export default function Features({ t }: Props) {
  return (
    <section id="features" className="py-20 sm:py-28 bg-slate-50">
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
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.sub}</p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((feature, i) => {
            const Icon = icons[i];
            return (
              <div
                key={feature.title}
                className="card-hover bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colors[i]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* France sovereignty strip */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
            <span className="text-xl" aria-hidden>🇫🇷</span>
            <p className="text-sm font-semibold text-slate-700">{t.france_strip.label}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {t.france_strip.items.map((item) => (
              <div key={item.title} className="px-6 py-5">
                <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

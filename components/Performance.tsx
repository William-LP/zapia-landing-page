import { TrendingUp, Server, Globe2, Clock } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["performance"] };

const metricIcons = [Clock, TrendingUp, Server, Globe2];
const metricValues = ["18ms", "99.97%", "NVMe", "30+"];
const metricColors = [
  { text: "text-cyan-400", bg: "bg-cyan-400/10" },
  { text: "text-emerald-400", bg: "bg-emerald-400/10" },
  { text: "text-indigo-400", bg: "bg-indigo-400/10" },
  { text: "text-violet-400", bg: "bg-violet-400/10" },
];

export default function Performance({ t }: Props) {
  return (
    <section id="performance" className="py-20 sm:py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
              {t.badge}
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              {t.headline}
              <br />
              <span className="gradient-text">{t.headline_highlight}</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">{t.sub}</p>
            <ul className="space-y-3 text-slate-300 text-sm">
              {t.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-indigo-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: metrics */}
          <div className="grid grid-cols-2 gap-4">
            {t.metrics.map((m, i) => {
              const Icon = metricIcons[i];
              const { text, bg } = metricColors[i];
              return (
                <div
                  key={m.label}
                  className="card-hover rounded-2xl bg-white/5 border border-white/10 p-6"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}
                  >
                    <Icon className={`w-5 h-5 ${text}`} />
                  </div>
                  <div className={`text-3xl font-extrabold mb-1 ${text}`}>
                    {metricValues[i]}
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {m.label}
                  </div>
                  <div className="text-xs text-slate-400">{m.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

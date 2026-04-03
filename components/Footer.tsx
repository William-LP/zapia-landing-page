import { Zap } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["footer"] };

const categoryKeys = ["Product", "Resources", "Company", "Legal"] as const;

export default function Footer({ t }: Props) {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">zapia</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">{t.tagline}</p>
          </div>

          {/* Link columns */}
          {categoryKeys.map((key) => (
            <div key={key}>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
                {t.categories[key]}
              </h4>
              <ul className="space-y-2.5">
                {t.links[key].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Zapia. {t.copyright}</p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.status}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

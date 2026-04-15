import {
  Globe,
  AtSign,
  Mail,
  HardDrive,
  Video,
  Lock,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["features"] };

// Icon and colour mapped by feature title (order-independent)
const ICON_MAP: Record<string, { Icon: React.ElementType; color: string }> = {
  // EN keys
  "Company website":    { Icon: Globe,       color: "bg-indigo-500/10 text-indigo-500" },
  "Domain name":        { Icon: AtSign,      color: "bg-cyan-500/10 text-cyan-500" },
  "Professional email": { Icon: Mail,        color: "bg-violet-500/10 text-violet-500" },
  "Cloud storage":      { Icon: HardDrive,   color: "bg-blue-500/10 text-blue-500" },
  "Collaboration suite":{ Icon: Video,       color: "bg-emerald-500/10 text-emerald-500" },
  "Business VPN":       { Icon: Lock,        color: "bg-rose-500/10 text-rose-500" },
  "Expert support":     { Icon: LifeBuoy,    color: "bg-orange-500/10 text-orange-500" },
  "Security & backups": { Icon: ShieldCheck, color: "bg-yellow-500/10 text-yellow-500" },
  // FR keys
  "Site web d'entreprise": { Icon: Globe,       color: "bg-indigo-500/10 text-indigo-500" },
  "Nom de domaine":         { Icon: AtSign,      color: "bg-cyan-500/10 text-cyan-500" },
  "Email professionnel":    { Icon: Mail,        color: "bg-violet-500/10 text-violet-500" },
  "Stockage cloud":         { Icon: HardDrive,   color: "bg-blue-500/10 text-blue-500" },
  "Suite collaborative":    { Icon: Video,       color: "bg-emerald-500/10 text-emerald-500" },
  "VPN d'entreprise":       { Icon: Lock,        color: "bg-rose-500/10 text-rose-500" },
  "Support expert":         { Icon: LifeBuoy,    color: "bg-orange-500/10 text-orange-500" },
  "Sécurité & sauvegardes": { Icon: ShieldCheck, color: "bg-yellow-500/10 text-yellow-500" },
};

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

        {/* Feature grid — available first, coming soon last */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((feature) => {
            const mapping = ICON_MAP[feature.title];
            const Icon = mapping?.Icon ?? Globe;
            const color = mapping?.color ?? "bg-indigo-500/10 text-indigo-500";
            return (
              <div
                key={feature.title}
                className={`card-hover bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm relative${feature.comingSoon ? " opacity-60" : ""}`}
              >
                {feature.comingSoon && (
                  <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium border border-slate-200">
                    {t.coming_soon}
                  </span>
                )}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
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
      </div>
    </section>
  );
}

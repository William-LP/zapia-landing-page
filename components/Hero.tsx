"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Globe,
  Mail,
  HardDrive,
  Users,
  Info,
  Zap,
  CheckCircle2,
} from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Step =
  | "welcome"
  | "services"
  | "website_existing"
  | "website_url"
  | "website_build"
  | "domain_existing"
  | "domain_name"
  | "domain_search"
  | "email_count"
  | "cloud_files"
  | "support_info"
  | "review"
  | "contact"
  | "done";

interface OS {
  step: Step;
  history: Step[];
  services: string[];
  answers: Record<string, string | string[]>;
}

interface TrackerItem {
  id: string;
  label: string;
  firstStep: Step;
  allSteps: Step[];
  inactive?: boolean; // service not selected by user
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "zapia_onboarding_v2";

// Services that have follow-up questions (used for nav logic)
const SERVICE_ORDER = [
  "website",
  "email",
  "cloud",
  "support",
] as const;

const S2STEP: Record<string, Step> = {
  website: "website_existing",
  email: "email_count",
  cloud: "cloud_files",
  support: "support_info",
};

// Non-locked services pre-selected when the user hits "Get started"
const DEFAULT_SERVICES = ["website"];



// Coupon codes
const VALID_COUPONS: Record<string, { type: "percent" | "flat"; value: number }> = {
  // ZAPIA10: { type: "percent", value: 10 },  
  REDDIT: { type: "flat", value: 250 },
};

const INIT: OS = { step: "welcome", history: [], services: [], answers: {} };

const DIAL_CODES: { flag: string; country: string; code: string }[] = [
  { flag: "🇫🇷", country: "France", code: "+33" },
  { flag: "🇧🇪", country: "Belgique", code: "+32" },
  { flag: "🇨🇭", country: "Suisse", code: "+41" },
  { flag: "🇱🇺", country: "Luxembourg", code: "+352" },
  { flag: "🇩🇪", country: "Allemagne", code: "+49" },
  { flag: "🇪🇸", country: "Espagne", code: "+34" },
  { flag: "🇮🇹", country: "Italie", code: "+39" },
  { flag: "🇵🇹", country: "Portugal", code: "+351" },
  { flag: "🇳🇱", country: "Pays-Bas", code: "+31" },
  { flag: "🇬🇧", country: "Royaume-Uni", code: "+44" },
  { flag: "🇮🇪", country: "Irlande", code: "+353" },
  { flag: "🇵🇱", country: "Pologne", code: "+48" },
  { flag: "🇸🇪", country: "Suède", code: "+46" },
  { flag: "🇩🇰", country: "Danemark", code: "+45" },
  { flag: "🇳🇴", country: "Norvège", code: "+47" },
  { flag: "🇫🇮", country: "Finlande", code: "+358" },
  { flag: "🇦🇹", country: "Autriche", code: "+43" },
  { flag: "🇨🇿", country: "Tchéquie", code: "+420" },
  { flag: "🇷🇴", country: "Roumanie", code: "+40" },
  { flag: "🇺🇸", country: "États-Unis", code: "+1" },
  { flag: "🇨🇦", country: "Canada", code: "+1" },
  { flag: "🇲🇦", country: "Maroc", code: "+212" },
  { flag: "🇩🇿", country: "Algérie", code: "+213" },
  { flag: "🇹🇳", country: "Tunisie", code: "+216" },
  { flag: "🇸🇳", country: "Sénégal", code: "+221" },
  { flag: "🇨🇮", country: "Côte d'Ivoire", code: "+225" },
  { flag: "🇲🇱", country: "Mali", code: "+223" },
  { flag: "🇧🇷", country: "Brésil", code: "+55" },
  { flag: "🇦🇺", country: "Australie", code: "+61" },
  { flag: "🇯🇵", country: "Japon", code: "+81" },
  { flag: "🇨🇳", country: "Chine", code: "+86" },
  { flag: "🇮🇳", country: "Inde", code: "+91" },
];

// ---------------------------------------------------------------------------
// DialCodeSelect — custom styled country code picker
// ---------------------------------------------------------------------------

function DialCodeSelect({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = DIAL_CODES.find((c) => c.code === value) ?? DIAL_CODES[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-3 text-sm text-white border-r border-white/10 hover:bg-white/5 transition-colors h-full"
      >
        <span>{selected.flag}</span>
        <span className="text-slate-300 font-medium">{selected.code}</span>
        <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-slate-800 border border-white/10 shadow-xl z-50 overflow-y-auto max-h-60">
          {DIAL_CODES.map((c) => (
            <button
              key={`${c.country}-${c.code}`}
              type="button"
              onClick={() => { onChange(c.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-white/8 transition-colors ${c.code === value && c.country === selected.country ? "text-indigo-300" : "text-slate-200"
                }`}
            >
              <span className="text-base">{c.flag}</span>
              <span className="flex-1 truncate">{c.country}</span>
              <span className="text-slate-400 shrink-0">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Module-level sub-components (stable identity → no focus loss on re-render)
// ---------------------------------------------------------------------------

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
    {children}
  </div>
);

const QHead = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="mb-8">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2">
      {title}
    </h2>
    {sub && <p className="text-slate-400 text-sm">{sub}</p>}
  </div>
);

// ---------------------------------------------------------------------------
// Confetti
// ---------------------------------------------------------------------------

const CONFETTI_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#ffffff"];
const CONFETTI_PARTICLES = Array.from({ length: 80 }, (_, i) => {
  const angle = (i / 80) * 360 + (i % 7) * 4.5;
  const dist = 350 + (i % 5) * 120;
  const tx = Math.round(Math.cos((angle * Math.PI) / 180) * dist);
  const ty = Math.round(Math.sin((angle * Math.PI) / 180) * dist);
  return {
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    tx, ty,
    delay: `${(i % 6) * 0.05}s`,
    duration: `${1.6 + (i % 5) * 0.25}s`,
    size: `${7 + (i % 4) * 3}px`,
    round: i % 3 !== 0,
  };
});

// Build one keyframe per particle so we don't need CSS custom properties
const CONFETTI_STYLE = CONFETTI_PARTICLES.map((p) => `
  @keyframes confetti-${p.id} {
    0%   { transform: translate(-50%,-50%) rotate(0deg) scale(1); opacity: 1; }
    70%  { opacity: 1; }
    100% { transform: translate(calc(-50% + ${p.tx}px), calc(-50% + ${p.ty}px)) rotate(720deg) scale(0); opacity: 0; }
  }
`).join("");

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none z-50" aria-hidden>
    <style>{CONFETTI_STYLE}</style>
    {CONFETTI_PARTICLES.map((p) => (
      <div
        key={p.id}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: p.size,
          height: p.size,
          backgroundColor: p.color,
          borderRadius: p.round ? "50%" : "2px",
          animation: `confetti-${p.id} ${p.duration} ${p.delay} cubic-bezier(0.15, 0.8, 0.35, 1) forwards`,
        }}
      />
    ))}
  </div>
);

const InfoBox = ({ title, body }: { title: string; body: string }) => (
  <div className="flex gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
    <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
    <div>
      <p className="text-sm font-semibold text-indigo-300 mb-1">{title}</p>
      <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
    </div>
  </div>
);

interface YesNoGridProps {
  answers: Record<string, string | string[]>;
  answerKey: string;
  yesLabel: string;
  noLabel: string;
  onSelect: (key: string, value: string) => void;
}

const YesNoGrid = ({
  answers,
  answerKey,
  yesLabel,
  noLabel,
  onSelect,
}: YesNoGridProps) => (
  <div className="grid grid-cols-2 gap-3">
    {[
      { value: "yes", label: yesLabel },
      { value: "no", label: noLabel },
    ].map(({ value, label }) => {
      const active = answers[answerKey] === value;
      return (
        <button
          key={value}
          onClick={() => onSelect(answerKey, value)}
          className={`relative flex items-center justify-center gap-2 py-5 px-4 rounded-xl border font-semibold text-sm transition-all duration-200 ${active
            ? "border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/20"
            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:bg-white/8"
            }`}
        >
          {active && (
            <Check className="w-4 h-4 text-indigo-300 animate-check-in shrink-0" />
          )}
          {label}
        </button>
      );
    })}
  </div>
);

interface OptionsGridProps {
  answers: Record<string, string | string[]>;
  answerKey: string;
  opts: { value: string; label: string; sub?: string; locked?: boolean; comingSoon?: string }[];
  columns?: 1 | 2;
  onSelect: (key: string, value: string) => void;
}

const OptionsGrid = ({
  answers,
  answerKey,
  opts,
  columns = 2,
  onSelect,
}: OptionsGridProps) => (
  <div
    className={`grid gap-3 ${columns === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
  >
    {opts.map(({ value, label, sub, locked, comingSoon }) => {
      const active = !locked && answers[answerKey] === value;
      return (
        <button
          key={value}
          onClick={() => !locked && onSelect(answerKey, value)}
          disabled={locked}
          className={`relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${locked
            ? "border-white/5 bg-white/[0.02] opacity-60 cursor-not-allowed"
            : active
              ? "border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/20"
              : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8"
            }`}
        >
          {locked && comingSoon && (
            <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-slate-700/80 text-slate-400 text-[9px] font-semibold uppercase tracking-wide leading-none">
              {comingSoon}
            </span>
          )}
          <div
            className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${active ? "border-indigo-400 bg-indigo-500" : "border-white/20"
              }`}
          >
            {active && (
              <Check className="w-2.5 h-2.5 text-white animate-check-in" />
            )}
          </div>
          <div className="min-w-0 pr-6">
            <p
              className={`text-sm font-semibold ${active ? "text-white" : "text-slate-300"}`}
            >
              {label}
            </p>
            {sub && (
              <p
                className={`text-xs mt-0.5 ${active ? "text-indigo-300" : "text-slate-500"}`}
              >
                {sub}
              </p>
            )}
          </div>
        </button>
      );
    })}
  </div>
);

// ---------------------------------------------------------------------------
// Step tracker components (module-level for stable identity)
// ---------------------------------------------------------------------------

interface StepTrackerProps {
  items: TrackerItem[];
  history: Step[];
  currentStep: Step;
  onJump: (step: Step) => void;
  onActivate: (id: string, firstStep: Step) => void;
}

const StepTracker = ({
  items,
  history,
  currentStep,
  onJump,
  onActivate,
}: StepTrackerProps) => {
  const allServicesDone = items
    .filter((i) => i.id !== "review" && !i.inactive)
    .every((i) => i.allSteps.some((s) => history.includes(s)));
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isCompleted = !item.inactive && item.allSteps.some((s) => history.includes(s));
        const isCurrent = !item.inactive && item.allSteps.includes(currentStep);
        const isReachable = isCompleted || (item.id === "review" && allServicesDone);
        const isClickable = (isReachable && !isCurrent) || !!item.inactive;
        return (
          <button
            key={item.id}
            disabled={!isClickable}
            onClick={() => {
              if (item.inactive) onActivate(item.id, item.firstStep);
              else if (isReachable && !isCurrent) onJump(item.firstStep);
            }}
            className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left w-full transition-all duration-200 ${isCurrent
              ? "bg-indigo-500/15 border border-indigo-500/25 text-white"
              : isCompleted
                ? "border border-transparent text-slate-300 hover:bg-white/8 hover:border-white/10 hover:text-white cursor-pointer"
                : item.inactive
                  ? "border border-dashed border-white/10 text-slate-600 hover:border-white/20 hover:text-slate-400 cursor-pointer"
                  : "text-slate-600 cursor-default"
              }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isCurrent
                ? "border-indigo-400"
                : isCompleted
                  ? "border-indigo-500 bg-indigo-500 group-hover:border-indigo-400 group-hover:bg-indigo-400"
                  : "border-white/10"
                }`}
            >
              {isCompleted ? (
                <Check className="w-3 h-3 text-white" />
              ) : isCurrent ? (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              ) : null}
            </div>
            <span className="truncate text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const MobileStepTracker = ({
  items,
  history,
  currentStep,
  onJump,
  onActivate,
}: StepTrackerProps) => {
  const allServicesDone = items
    .filter((i) => i.id !== "review" && !i.inactive)
    .every((i) => i.allSteps.some((s) => history.includes(s)));
  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => {
        const isCompleted = !item.inactive && item.allSteps.some((s) => history.includes(s));
        const isCurrent = !item.inactive && item.allSteps.includes(currentStep);
        const isReachable = isCompleted || (item.id === "review" && allServicesDone);
        const isClickable = (isReachable && !isCurrent) || !!item.inactive;
        return (
          <button
            key={item.id}
            disabled={!isClickable}
            onClick={() => {
              if (item.inactive) onActivate(item.id, item.firstStep);
              else if (isReachable && !isCurrent) onJump(item.firstStep);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all border ${isCurrent
              ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-300"
              : isCompleted
                ? "bg-white/8 border-white/20 text-slate-300 hover:bg-white/12 hover:text-white cursor-pointer"
                : item.inactive
                  ? "border-dashed border-white/15 text-slate-600 hover:text-slate-400 hover:border-white/25 cursor-pointer"
                  : "border-white/5 text-slate-600 cursor-default"
              }`}
          >
            {isCompleted && (
              <Check className="w-3 h-3 text-indigo-400 shrink-0" />
            )}
            {isCurrent && (
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
            )}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const DOMAIN_RE = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
function isValidDomain(val: string): boolean {
  return DOMAIN_RE.test(val.trim());
}

function nextServiceStep(services: string[], after: string | null): Step {
  const start = after
    ? SERVICE_ORDER.indexOf(after as (typeof SERVICE_ORDER)[number]) + 1
    : 0;
  for (let i = start; i < SERVICE_ORDER.length; i++) {
    if (services.includes(SERVICE_ORDER[i])) return S2STEP[SERVICE_ORDER[i]];
  }
  return "review";
}

function nextStep(
  step: Step,
  answers: Record<string, string | string[]>,
  services: string[],
  history: Step[] = []
): Step {
  switch (step) {
    case "welcome":
      return "services";
    case "services": {
      // Skip services whose first step is already in history (already answered)
      const serviceFirstStep: Partial<Record<string, Step>> = {
        website: "website_existing",
        email: "email_count",
        cloud: "cloud_files",
        support: "support_info",
      };
      const order = SERVICE_ORDER.filter((s) => services.includes(s));
      for (const svc of order) {
        const first = serviceFirstStep[svc];
        if (first && !history.includes(first)) return first;
      }
      return "review";
    }
    case "website_existing":
      return (answers.website_existing as string) === "yes"
        ? "website_url"
        : "website_build";
    case "website_url":
      // Always ask how they want the site handled (migration or new build)
      return "website_build";
    case "website_build":
      if ((answers.website_build as string) === "skip" || (answers.website_existing as string) === "yes") {
        // Not interested or already has a website → skip domain questions
        return nextServiceStep(services, "website");
      }
      // New website → ask about domain
      return "domain_existing";
    case "domain_existing":
      if ((answers.domain_existing as string) !== "no") {
        return "domain_name"; // ask for the domain they already own
      }
      return "domain_search";
    case "domain_name":
    case "domain_search":
      return services.includes("website")
        ? nextServiceStep(services, "website")
        : nextServiceStep(services, "email");
    case "email_count":
      // Ask domain only if website wasn't selected (domain already covered there)
      if (!services.includes("website")) return "domain_existing";
      return nextServiceStep(services, "email");
    case "cloud_files":
      return nextServiceStep(services, "cloud");
    case "support_info":
      return nextServiceStep(services, "support");
    case "review":
      return "contact";
    case "contact":
      return "done";
    default:
      return "done";
  }
}

function computeProgress(
  history: Step[],
  step: Step,
  services: string[],
  answers: Record<string, string | string[]>
): number {
  if (step === "done") return 1;
  if (step === "welcome") return 0;
  let rem = 0;
  let cur: Step = step;
  while (cur !== "done" && rem < 20) {
    cur = nextStep(cur, answers, services);
    rem++;
  }
  const total = history.length + rem;
  return total > 0 ? history.length / total : 0;
}

function buildTrackerItems(
  services: string[],
  t: Dictionary["onboarding"]
): TrackerItem[] {
  const items: TrackerItem[] = [];
  const hasWebsite = services.includes("website");

  items.push({
    id: "website",
    label: t.service_website,
    firstStep: "website_existing",
    allSteps: ["website_existing", "website_url", "website_build", "domain_existing", "domain_name", "domain_search"],
    inactive: !hasWebsite,
  });
  // email, support, cloud are locked (coming soon) — never shown in tracker
  items.push({ id: "review", label: t.review_title, firstStep: "review", allSteps: ["review"] });
  return items;
}

function getTldPrice(domain: string, prices: Record<string, { install: number; renew: number }>): { install: number; renew: number } | null {
  const tld = domain.split(".").pop()?.toLowerCase() ?? "";
  return prices[tld] ?? null;
}

function buildSummary(state: OS, name: string, couponDiscount: { type: "percent" | "flat"; value: number } | null): string {
  const a = state.answers;
  const lines: string[] = [];

  lines.push("Bonjour,");
  lines.push("");
  lines.push("Je viens de remplir le formulaire sur votre site et j'aimerais être recontacté(e) pour démarrer ma configuration.");
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("📋 MES BESOINS");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("");

  if (state.services.includes("website")) {
    if (a.website_existing === "yes") {
      lines.push(`🌐 Site web : j'ai déjà un site existant${a.website_url ? ` (${a.website_url})` : ""}`);
      lines.push(`   → Je souhaite ${a.website_build === "skip" ? "garder mon site tel quel" : "le migrer vers Zapia"}`);
    } else {
      const build = a.website_build === "self" ? "je le construirai moi-même (WordPress)" : a.website_build === "skip" ? "pas intéressé(e) par un site pour l'instant" : "je souhaite que Zapia le crée pour moi";
      lines.push(`🌐 Site web : ${build}`);
    }
    lines.push("");
  }

  if (state.services.includes("website") && a.website_existing !== "yes" && a.website_build !== "skip") {
    if (a.domain_existing === "yes") {
      lines.push(`🔗 Nom de domaine : j'en ai déjà un${a.domain_name ? ` (${a.domain_name})` : ""}`);
    } else if (a.domain_search) {
      lines.push(`🔗 Nom de domaine recherché : ${a.domain_search}`);
    }
    lines.push("");
  }

  if (state.services.includes("email")) {
    const emailMap: Record<string, string> = {
      "1": "1 boîte mail (juste moi)",
      "2-5": "2 à 5 boîtes mail (petite équipe)",
      "6-20": "6 à 20 boîtes mail (équipe en croissance)",
      "20+": "plus de 20 boîtes mail (grande organisation)",
    };
    lines.push(`📧 Email professionnel : ${emailMap[a.email_count as string] ?? a.email_count ?? "à préciser"}`);
    lines.push("");
  }

  if (state.services.includes("cloud")) {
    lines.push(`☁️ Stockage cloud : actuellement j'utilise ${a.cloud_files || "aucune solution particulière"}`);
    lines.push("");
  }

  if (state.services.includes("support")) {
    lines.push(`🛠️ Support technique : ${a.support_needed === "yes" ? "oui, ça m'intéresse" : "non, pas nécessaire"}`);
    lines.push("");
  }

  if (couponDiscount) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("🎟️ CODE PROMO");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`Réduction appliquée : ${couponDiscount.type === "flat" ? `${couponDiscount.value}€` : `${couponDiscount.value}%`}`);
    lines.push("");
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("Dans l'attente de votre retour,");
  lines.push("Bien cordialement");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

type Props = { t: Dictionary["onboarding"] };

export default function Hero({ t }: Props) {
  const [state, setState] = useState<OS>(INIT);
  const [hydrated, setHydrated] = useState(false);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [animKey, setAnimKey] = useState(0);

  // Live TLD prices from OVH public catalog
  const [tldPrices, setTldPrices] = useState<Record<string, { install: number; renew: number }>>();
  const advancing = useRef(false);

  // Domain search state
  const [domainVal, setDomainVal] = useState("");
  const [domainStatus, setDomainStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const domainTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Existing domain / website URL check (verifies the endpoint actually resolves)
  const [existingStatus, setExistingStatus] = useState<
    "idle" | "checking" | "found" | "not_found"
  >("idle");
  const existingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Contact state
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cPhonePrefix, setCPhonePrefix] = useState("+33");
  const [contactMode, setContactMode] = useState<"email" | "phone">("email");

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [couponDiscount, setCouponDiscount] = useState<{ type: "percent" | "flat"; value: number } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [savedPricing, setSavedPricing] = useState<{ recurring: number; once: number } | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle");

  // Fetch live domain prices from OVH public catalog
  useEffect(() => {
    fetch("https://api.ovh.com/v1/order/catalog/public/domain?ovhSubsidiary=FR")
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, { install: number; renew: number }> = {};
        // OVH catalog: plans[], planCode is the TLD directly ("com", "fr", …)
        // pricings[].price is in micro-euros (÷ 1e8 to get €)
        // Only consider mode="create-default" pricings
        const plans: { planCode: string; pricings: { mode: string; capacities: string[]; interval: number; intervalUnit: string; price: number }[] }[] =
          data.plans ?? [];
        for (const plan of plans) {
          const tld = plan.planCode.toLowerCase();
          const createPricings = plan.pricings.filter((p) => p.mode === "create-default");
          const installEntry = createPricings.find((p) => p.capacities.includes("installation"));
          const renewEntry = createPricings.find(
            (p) => p.capacities.length === 1 && p.capacities[0] === "renew"
          );
          if (installEntry && renewEntry) {
            map[tld] = {
              install: +(installEntry.price / 1e8).toFixed(2),
              renew: +(renewEntry.price / 1e8).toFixed(2),
            };
          }
        }
        setTldPrices(map);
      })
      .catch(() => { });
  }, []);

  // Reset to welcome when navbar "Commencer" button is clicked
  useEffect(() => {
    const handler = () => {
      setState(INIT);
      setDomainVal("");
      setCName("");
      setCEmail("");
      setCPhone("");
      setCPhonePrefix("+33");
      setContactMode("email");
      setCouponInput("");
      setCouponDiscount(null);
      setCouponStatus("idle");
      setDir("fwd");
      setAnimKey((k) => k + 1);
    };
    window.addEventListener("start-onboarding", handler);
    return () => window.removeEventListener("start-onboarding", handler);
  }, []);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: OS = JSON.parse(raw);
        setState(saved);
        if (saved.answers.domain_search)
          setDomainVal(saved.answers.domain_search as string);
        if (saved.answers.contact_name)
          setCName(saved.answers.contact_name as string);
        if (saved.answers.contact_email)
          setCEmail(saved.answers.contact_email as string);
      }
    } catch { }
    setHydrated(true);
  }, []);

  // Persist (clear on done so a refresh starts fresh)
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (state.step === "done") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch { }
  }, [state, hydrated]);

  // ---------------------------------------------------------------------------
  // Actions — all useCallback with [] to keep stable references
  // ---------------------------------------------------------------------------

  const advance = useCallback(
    (answerKey?: string, answerValue?: string | string[]) => {
      setState((prev) => {
        const answers =
          answerKey
            ? { ...prev.answers, [answerKey]: answerValue! }
            : prev.answers;
        // Pre-select all non-locked services when leaving the welcome screen
        const services =
          prev.step === "welcome" ? DEFAULT_SERVICES : prev.services;
        const next = nextStep(prev.step, answers, services, prev.history);
        return {
          ...prev,
          step: next,
          history: [...prev.history, prev.step],
          answers,
          services,
        };
      });
      setDir("fwd");
      setAnimKey((k) => k + 1);
    },
    []
  );

  const selectAndAdvance = useCallback((key: string, value: string) => {
    if (advancing.current) return;
    advancing.current = true;
    // Visual feedback first
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }));
    // Then navigate
    setTimeout(() => {
      setState((prev) => {
        const next = nextStep(prev.step, prev.answers, prev.services, prev.history);
        return { ...prev, step: next, history: [...prev.history, prev.step] };
      });
      setDir("fwd");
      setAnimKey((k) => k + 1);
      advancing.current = false;
    }, 340);
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) return prev;
      const hist = [...prev.history];
      const prevStep = hist.pop()!;
      return { ...prev, step: prevStep, history: hist };
    });
    setDir("back");
    setAnimKey((k) => k + 1);
  }, []);

  const jumpToStep = useCallback((targetStep: Step) => {
    setState((prev) => ({ ...prev, step: targetStep }));
    setDir("back");
    setAnimKey((k) => k + 1);
  }, []);

  const activateService = useCallback((serviceId: string, firstStep: Step) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services
        : [...prev.services, serviceId],
      step: firstStep,
    }));
    setDir("fwd");
    setAnimKey((k) => k + 1);
  }, []);

  const toggleService = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  }, []);

  const handleDomainChange = useCallback((val: string) => {
    setDomainVal(val);
    setDomainStatus("idle");
    if (domainTimer.current) clearTimeout(domainTimer.current);
    if (isValidDomain(val)) {
      domainTimer.current = setTimeout(async () => {
        setDomainStatus("checking");
        const name = val.trim();
        try {
          const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(name)}`, {
            headers: { Accept: "application/rdap+json" },
          });
          if (res.ok) {
            setDomainStatus("taken");     // 200 → registered in registry
          } else if (res.status === 404) {
            setDomainStatus("available"); // 404 → not in registry
          } else {
            setDomainStatus("idle");      // unexpected response → reset silently
          }
        } catch {
          setDomainStatus("idle");        // network error → don't assume available
        }
      }, 600);
    }
  }, []);

  const handleExistingCheck = useCallback((rawInput: string) => {
    if (existingTimer.current) clearTimeout(existingTimer.current);
    setExistingStatus("idle");
    // Extract hostname from a URL or plain domain
    let hostname = rawInput.trim();
    try {
      const withScheme = hostname.startsWith("http") ? hostname : `https://${hostname}`;
      hostname = new URL(withScheme).hostname;
    } catch {
      // not a parseable URL yet — use raw input
    }
    if (!isValidDomain(hostname)) return;
    existingTimer.current = setTimeout(async () => {
      setExistingStatus("checking");
      try {
        const res = await fetch(
          `https://dns.google/resolve?name=${encodeURIComponent(hostname)}&type=A`
        );
        const data = await res.json();
        // Status 0 = records found (domain exists), anything else = not found
        setExistingStatus(data.Status === 0 && data.Answer ? "found" : "not_found");
      } catch {
        setExistingStatus("idle"); // network error — don't block the user
      }
    }, 700);
  }, []);

  const handleContactSubmit = useCallback(async () => {
    const value = contactMode === "email" ? cEmail.trim() : `${cPhonePrefix} ${cPhone.trim()}`;
    if (!value) return;

    setSubmitState("loading");

    const appliedCoupon = couponDiscount
      ? Object.entries(VALID_COUPONS).find(
        ([, v]) => v.type === couponDiscount.type && v.value === couponDiscount.value
      )?.[0] ?? null
      : null;

    try {
      const res = await fetch("https://keybpbcfvgidgakbipmy.supabase.co/functions/v1/hyper-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleWJwYmNmdmdpZGdha2JpcG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTAxMTIsImV4cCI6MjA4NjMyNjExMn0.1hkxM68whFNnzk4gJSzA1iJZStGG58iwPFzqX_uh2Ds",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleWJwYmNmdmdpZGdha2JpcG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTAxMTIsImV4cCI6MjA4NjMyNjExMn0.1hkxM68whFNnzk4gJSzA1iJZStGG58iwPFzqX_uh2Ds",
        },
        body: JSON.stringify({
          contact_value: value,
          contact_mode: contactMode,
          services: state.services,
          answers: state.answers,
          coupon_code: appliedCoupon,
          price_recurring: savedPricing?.recurring ?? null,
          price_once: savedPricing?.once ?? null,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      advance("contact_email", value);
    } catch {
      setSubmitState("error");
    }
  }, [contactMode, cEmail, cPhone, cPhonePrefix, cName, couponDiscount, savedPricing, state, advance]);

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  const { step, history, services, answers } = state;

  // Reset existence check when navigating to a new step
  useEffect(() => {
    setExistingStatus("idle");
    if (existingTimer.current) clearTimeout(existingTimer.current);
  }, [step]);

  const progress = computeProgress(history, step, services, answers);
  const showTracker = history.includes("services") && step !== "done" && step !== "welcome";

  const trackerItems = useMemo(
    () => buildTrackerItems(services, t),
    // t is static (server-rendered JSON), only services changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [services]
  );

  const animClass =
    dir === "fwd" ? "animate-slide-right" : "animate-slide-left";

  // ---------------------------------------------------------------------------
  // Step rendering
  // ---------------------------------------------------------------------------

  function renderContent() {
    switch (step) {
      // -----------------------------------------------------------------------
      case "welcome":
        return (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              {t.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {t.welcome_title}{" "}
              <span className="gradient-text">{t.welcome_title_highlight}</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md mx-auto mb-10">
              {t.welcome_sub}
            </p>
            <button
              onClick={() => advance()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white gradient-bg shadow-xl shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all text-lg"
            >
              {t.welcome_cta}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      // -----------------------------------------------------------------------
      case "services": {
        const serviceList = [
          { id: "website", Icon: Globe, label: t.service_website, sub: t.service_website_sub, locked: false },
          { id: "email", Icon: Mail, label: t.service_email, sub: t.service_email_sub, locked: true },
          { id: "collab", Icon: Users, label: t.service_collab, sub: t.service_collab_sub, locked: true },
          { id: "cloud", Icon: HardDrive, label: t.service_cloud, sub: t.service_cloud_sub, locked: true },
        ];
        const count = services.length;
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {t.services_title}
              </h2>
              <p className="text-slate-400 text-sm">{t.services_sub}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {serviceList.map(({ id, Icon, label, sub, locked }) => {
                const sel = services.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => !locked && toggleService(id)}
                    disabled={locked}
                    className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all duration-200 overflow-hidden ${locked
                      ? "border-white/5 bg-white/[0.02] opacity-60 cursor-not-allowed"
                      : sel
                        ? "border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/20"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                      }`}
                  >
                    {/* Coming soon badge */}
                    {locked && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-slate-700/80 text-slate-400 text-[9px] font-semibold uppercase tracking-wide leading-none">
                        {t.coming_soon}
                      </span>
                    )}
                    {/* Selected checkmark */}
                    {sel && !locked && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center animate-check-in">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                    <div
                      className={`p-1.5 rounded-lg shrink-0 transition-all ${locked ? "bg-white/5" : sel ? "bg-indigo-500/25" : "bg-white/5"
                        }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${locked ? "text-slate-600" : sel ? "text-indigo-300" : "text-slate-400"
                          }`}
                      />
                    </div>
                    <div className="w-full min-w-0">
                      <p
                        className={`text-xs font-semibold leading-snug line-clamp-2 ${locked ? "text-slate-500" : sel ? "text-white" : "text-slate-300"
                          }`}
                      >
                        {label}
                      </p>
                      <p
                        className={`text-xs mt-0.5 leading-snug line-clamp-2 ${locked ? "text-slate-600" : sel ? "text-indigo-300" : "text-slate-500"
                          }`}
                      >
                        {sub}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-center">
              <button
                onClick={() => advance()}
                disabled={count === 0}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {count === 0
                  ? t.services_none
                  : `${t.services_cta} · ${count} ${count === 1 ? "service" : "services"}`}
                {count > 0 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      case "website_existing":
        return (
          <CardWrapper>
            <QHead title={t.website_existing_title} />
            <YesNoGrid
              answers={answers}
              answerKey="website_existing"
              yesLabel={t.website_existing_yes}
              noLabel={t.website_existing_no}
              onSelect={selectAndAdvance}
            />
          </CardWrapper>
        );

      // -----------------------------------------------------------------------
      case "website_url": {
        const urlVal = (answers.website_url as string) || "";
        const urlNotFound = existingStatus === "not_found";
        return (
          <CardWrapper>
            <QHead title={t.website_url_title} />
            <input
              type="url"
              value={urlVal}
              onChange={(e) => {
                const v = e.target.value;
                setState((prev) => ({
                  ...prev,
                  answers: { ...prev.answers, website_url: v },
                }));
                handleExistingCheck(v);
              }}
              placeholder={t.website_url_placeholder}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/8 transition-all mb-1 text-sm ${urlNotFound ? "border-amber-500/60 focus:border-amber-500" : "border-white/15 focus:border-indigo-500"
                }`}
              onKeyDown={(e) => e.key === "Enter" && urlVal.trim() && advance("website_url", urlVal)}
              autoFocus
            />
            <p className={`text-xs mb-5 px-1 ${urlNotFound ? "text-amber-400" : "invisible"}`}>
              {t.website_not_found}
            </p>
            <button
              onClick={() => advance("website_url", urlVal)}
              disabled={existingStatus !== "found"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white gradient-bg hover:opacity-90 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {existingStatus === "checking" ? "…" : t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </CardWrapper>
        );
      }

      // -----------------------------------------------------------------------
      case "website_build":
        return (
          <CardWrapper>
            <QHead title={answers.website_existing === "yes" ? t.website_migrate_title : t.website_build_title} />
            <OptionsGrid
              answers={answers}
              answerKey="website_build"
              columns={1}
              opts={[
                { value: "zapia", label: t.website_build_us, sub: t.website_build_us_sub },
                { value: "self", label: t.website_build_self, sub: t.website_build_self_sub, locked: true, comingSoon: t.coming_soon },
              ]}
              onSelect={selectAndAdvance}
            />
          </CardWrapper>
        );

      // -----------------------------------------------------------------------
      case "domain_existing":
        return (
          <CardWrapper>
            <QHead title={t.domain_existing_title} />
            <YesNoGrid
              answers={answers}
              answerKey="domain_existing"
              yesLabel={t.domain_existing_yes}
              noLabel={t.domain_existing_no}
              onSelect={selectAndAdvance}
            />
          </CardWrapper>
        );

      // -----------------------------------------------------------------------
      case "domain_name": {
        const nameVal = (answers.domain_name as string) || "";
        const nameValid = isValidDomain(nameVal);
        const showNameError = nameVal.length > 0 && !nameValid;
        const nameNotFound = nameValid && existingStatus === "not_found";
        const borderClass = showNameError
          ? "border-rose-500/60"
          : nameNotFound
            ? "border-amber-500/60 focus-within:border-amber-500"
            : "border-white/15 focus-within:border-indigo-500";
        const hintText = showNameError ? t.domain_invalid : nameNotFound ? t.domain_not_found : t.domain_invalid;
        const hintColor = showNameError ? "text-rose-400" : "text-amber-400";
        return (
          <CardWrapper>
            <QHead title={t.domain_name_title} />
            <div className={`flex items-center mb-1 rounded-xl bg-white/5 border transition-all text-sm overflow-hidden ${borderClass}`}>
              <span className="pl-4 pr-1 py-3 text-slate-500 shrink-0 select-none pointer-events-none">
                https://
              </span>
              <input
                type="text"
                value={nameVal}
                onChange={(e) => {
                  const v = e.target.value;
                  setState((prev) => ({
                    ...prev,
                    answers: { ...prev.answers, domain_name: v },
                  }));
                  if (isValidDomain(v)) handleExistingCheck(v);
                  else setExistingStatus("idle");
                }}
                placeholder={t.domain_search_placeholder}
                className="flex-1 pr-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none min-w-0"
                onKeyDown={(e) => e.key === "Enter" && nameValid && advance("domain_name", nameVal)}
                autoFocus
              />
              {nameValid && existingStatus === "checking" && (
                <span className="pr-3 text-xs text-slate-400 shrink-0">…</span>
              )}
            </div>
            <p className={`text-xs mb-5 px-1 ${showNameError || nameNotFound ? hintColor : "invisible"}`}>
              {hintText}
            </p>
            <button
              onClick={() => advance("domain_name", nameVal)}
              disabled={existingStatus !== "found"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white gradient-bg hover:opacity-90 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </CardWrapper>
        );
      }

      // -----------------------------------------------------------------------
      case "domain_search": {
        const domainValid = isValidDomain(domainVal);
        const showDomainError = domainVal.length > 0 && !domainValid;
        return (
          <CardWrapper>
            <QHead title={t.domain_search_title} sub={t.domain_search_sub} />
            {/* Input with https:// prefix */}
            <div className={`flex items-center mb-1 rounded-xl bg-white/5 border transition-all text-sm overflow-hidden ${showDomainError ? "border-rose-500/60" : "border-white/15 focus-within:border-indigo-500"
              }`}>
              <span className="pl-4 pr-1 py-3 text-slate-500 shrink-0 select-none pointer-events-none">
                https://
              </span>
              <input
                type="text"
                value={domainVal}
                onChange={(e) => {
                  handleDomainChange(e.target.value);
                  setState((prev) => ({
                    ...prev,
                    answers: { ...prev.answers, domain_search: e.target.value },
                  }));
                }}
                placeholder={t.domain_search_placeholder}
                className="flex-1 pr-3 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none min-w-0"
                onKeyDown={(e) =>
                  e.key === "Enter" && domainValid && advance()
                }
                autoFocus
              />
              {domainVal.length > 0 && domainValid && (
                <span className="pr-3 text-xs font-medium pointer-events-none shrink-0">
                  {domainStatus === "checking" && (
                    <span className="text-slate-400">{t.domain_checking}</span>
                  )}
                  {domainStatus === "available" && (
                    <span className="text-emerald-400">{t.domain_available}</span>
                  )}
                  {domainStatus === "taken" && (
                    <span className="text-rose-400">{t.domain_taken}</span>
                  )}
                </span>
              )}
            </div>
            <p className={`text-xs mb-5 px-1 ${showDomainError ? "text-rose-400" : "invisible"}`}>
              {t.domain_invalid}
            </p>
            <button
              onClick={() => advance("domain_search", domainVal)}
              disabled={!domainValid}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white gradient-bg hover:opacity-90 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </CardWrapper>
        );
      }

      // -----------------------------------------------------------------------
      case "email_count":
        return (
          <CardWrapper>
            <QHead title={t.email_title} sub={t.email_sub} />
            <OptionsGrid
              answers={answers}
              answerKey="email_count"
              opts={[
                { value: "1", label: t.email_opt1, sub: t.email_opt1_sub },
                { value: "2-5", label: t.email_opt2, sub: t.email_opt2_sub },
                { value: "6-20", label: t.email_opt3, sub: t.email_opt3_sub },
                { value: "20+", label: t.email_opt4, sub: t.email_opt4_sub },
              ]}
              onSelect={selectAndAdvance}
            />
          </CardWrapper>
        );

      // -----------------------------------------------------------------------
      case "cloud_files":
        return (
          <CardWrapper>
            <QHead title={t.cloud_title} />
            <OptionsGrid
              answers={answers}
              answerKey="cloud_files"
              opts={[
                { value: "laptop", label: t.cloud_opt1 },
                { value: "google-drive", label: t.cloud_opt2 },
                { value: "dropbox", label: t.cloud_opt3 },
                { value: "onedrive", label: t.cloud_opt4 },
                { value: "other", label: t.cloud_opt5 },
                { value: "none", label: t.cloud_opt6 },
              ]}
              onSelect={selectAndAdvance}
            />
          </CardWrapper>
        );

      // -----------------------------------------------------------------------
      case "support_info":
        return (
          <CardWrapper>
            <QHead title={t.support_title} />
            <InfoBox title={t.support_info_title} body={t.support_info_body} />
            <YesNoGrid
              answers={answers}
              answerKey="support_needed"
              yesLabel={t.support_yes}
              noLabel={t.support_no}
              onSelect={selectAndAdvance}
            />
          </CardWrapper>
        );

      // -----------------------------------------------------------------------
      case "review": {
        // Build line items — all recurring prices are annual
        interface LineItem { label: string; price: number | null; once?: boolean; note?: string; renewPrice?: number | null; recurringPrice?: number | null }
        const items: LineItem[] = [];

        if (services.includes("website") && answers.website_build !== "skip") {
          if (answers.website_build === "zapia")
            items.push({ label: t.review_item_website_build, price: 500, once: true });
          items.push({ label: t.review_item_website_hosting, price: 100 });
        }

        if (services.includes("email"))
          items.push({ label: t.review_item_email, price: 10 });

        const domainSearch = answers.domain_search as string | undefined;
        const domainFlowReached = answers.website_existing !== "yes" && answers.website_build !== "skip";
        if (domainSearch && domainFlowReached && answers.domain_existing !== "yes") {
          const tldData = tldPrices ? getTldPrice(domainSearch, tldPrices) : null;
          items.push({
            label: `${t.review_item_domain_new} (${domainSearch})`,
            price: tldData ? tldData.install : null,
            renewPrice: tldData ? tldData.renew : null,
            recurringPrice: tldData ? tldData.renew : null,
          });
        }

        if (services.includes("support") && answers.support_needed === "yes")
          items.push({ label: t.review_item_support, price: 50 * 12, note: t.review_support_note });

        const recurringTotal = items.filter((i) => !i.once).reduce((s, i) => s + (i.price ?? 0), 0);
        const recurringTooltipTotal = items.filter((i) => !i.once).reduce((s, i) => s + (i.recurringPrice ?? i.price ?? 0), 0);
        const onceTotal = items.filter((i) => i.once).reduce((s, i) => s + (i.price ?? 0), 0);

        // Apply flat discount: once-off items first, then yearly with leftover credit
        let onceDiscount = 0;
        let yearDiscount = 0;
        if (couponDiscount) {
          if (couponDiscount.type === "flat") {
            onceDiscount = Math.min(couponDiscount.value, onceTotal);
            yearDiscount = Math.min(couponDiscount.value - onceDiscount, recurringTotal);
          } else {
            yearDiscount = +(recurringTotal * couponDiscount.value / 100).toFixed(2);
          }
        }
        const discountAmt = +(onceDiscount + yearDiscount).toFixed(2);
        const totalOnce = +(onceTotal - onceDiscount).toFixed(2);
        const total = Math.max(0, +(recurringTotal - yearDiscount).toFixed(2));

        const applyCoupon = () => {
          const code = couponInput.trim().toUpperCase();
          const coupon = VALID_COUPONS[code];
          if (coupon) {
            setCouponDiscount(coupon);
            setCouponStatus("valid");
            if (coupon.type === "flat") {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 6000);
            }
          } else {
            setCouponDiscount(null);
            setCouponStatus("invalid");
          }
        };

        return (
          <div className="w-full max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">{t.review_title}</h2>
              <p className="text-slate-400 text-sm">{t.review_sub}</p>
            </div>

            {/* Price table */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-4">
              <table className="w-full text-sm">
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3.5 text-slate-300">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.label}
                          {item.once && (
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 font-medium shrink-0">
                              {t.review_group_once}
                            </span>
                          )}
                          {item.note && (
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-yellow-500/15 text-yellow-400 font-medium shrink-0">
                              {item.note}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        {item.price === null ? (
                          <span className="relative group inline-flex items-center gap-1 cursor-help">
                            <span className="text-slate-500 text-xs font-normal border-b border-dashed border-slate-600">~10–15€ {t.review_period_year}</span>
                            <svg className="w-3 h-3 text-slate-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                            <span className="pointer-events-none absolute bottom-full right-0 mb-2 w-64 whitespace-normal rounded-xl bg-slate-800 border border-white/10 px-3 py-2.5 text-xs text-slate-300 leading-relaxed shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                              {t.review_domain_price_unknown}
                            </span>
                          </span>
                        ) : (
                          <span className="relative group inline-flex items-center gap-1">
                            <span className="text-white font-semibold">
                              {item.price % 1 === 0 ? item.price : item.price.toFixed(2)}€
                              {!item.once && (
                                <span className="text-slate-500 font-normal ml-1">{t.review_period_year}</span>
                              )}
                            </span>
                            {item.renewPrice != null && (
                              <>
                                <svg className="w-3 h-3 text-slate-600 cursor-help" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                <span className="pointer-events-none absolute bottom-full right-0 mb-2 w-56 whitespace-normal rounded-xl bg-slate-800 border border-white/10 px-3 py-2.5 text-xs text-slate-300 leading-relaxed shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                  {t.review_domain_then_renew} {item.renewPrice % 1 === 0 ? item.renewPrice : item.renewPrice.toFixed(2)}€ {t.review_period_year}
                                </span>
                              </>
                            )}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {discountAmt > 0 && (
                    <tr>
                      <td className="px-5 py-3.5 text-slate-300">
                        <div className="flex items-center gap-2">
                          {t.review_discount}
                          <span className="text-xs px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-semibold shrink-0">
                            {couponInput.trim().toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right text-white font-semibold whitespace-nowrap">
                        −{discountAmt.toFixed(2)}€
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Coupon */}
            {couponStatus !== "valid" && (
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponStatus("idle"); }}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  placeholder={t.review_coupon_placeholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2.5 rounded-xl bg-white/8 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/12 transition-all"
                >
                  {t.review_coupon_apply}
                </button>
              </div>
            )}
            <div className="h-5 mb-2 px-1">
              {couponStatus === "invalid" && (
                <p className="text-rose-400 text-xs">{t.review_coupon_invalid}</p>
              )}
            </div>

            {/* Totals */}
            <div className="rounded-2xl border border-white/10 bg-white/5 mb-6">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-5 py-4 text-white font-bold text-base">
                      <span className="relative group inline-flex items-center gap-1.5 cursor-help">
                        {t.review_total}
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                        <span style={{ zIndex: 9999 }} className="pointer-events-none absolute bottom-full left-0 mb-2 w-64 whitespace-normal rounded-xl bg-slate-800 border border-white/10 px-3 py-2.5 text-xs text-slate-300 leading-relaxed shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-normal">
                          {t.review_total_tooltip_recurring.replace("{amount}", `${(recurringTooltipTotal - yearDiscount).toFixed(2)}€`)}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-white font-bold text-base whitespace-nowrap">
                      {(yearDiscount > 0 || onceDiscount > 0) && (
                        <span className="line-through text-slate-600 mr-2 font-normal text-sm">{(recurringTotal + onceTotal).toFixed(2)}€</span>
                      )}
                      {(total + totalOnce).toFixed(2)}€
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 text-xs text-center mb-6">{t.review_total_note}</p>

            <button
              onClick={() => { setSavedPricing({ recurring: total + totalOnce, once: totalOnce }); advance(); }}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-all"
            >
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      case "contact": {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail.trim());
        const phoneDigits = (cPhone.match(/\d/g) ?? []).length;
        const isValidPhone = phoneDigits === 10;
        const emailDirty = cEmail.length > 0;
        const phoneDirty = cPhone.length > 0;
        const canSubmit = contactMode === "email" ? isValidEmail : isValidPhone;
        return (
          <CardWrapper>
            <QHead title={t.contact_title} sub={t.contact_sub} />
            {/* Mode toggle */}
            <div className="flex gap-2 mb-5">
              {(["email", "phone"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => { setContactMode(mode); setSubmitState("idle"); }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${contactMode === mode
                    ? "border-indigo-500 bg-indigo-500/15 text-indigo-300"
                    : "border-white/10 bg-white/5 text-slate-400 hover:text-slate-300"
                    }`}
                >
                  {mode === "email" ? t.contact_mode_email : t.contact_mode_phone}
                </button>
              ))}
            </div>
            <div className="mb-6">
              {contactMode === "email" ? (
                <div>
                  <input
                    key="email"
                    type="email"
                    value={cEmail}
                    onChange={(e) => setCEmail(e.target.value)}
                    placeholder={t.contact_email_placeholder}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all text-sm ${emailDirty && !isValidEmail ? "border-rose-500/60 focus:border-rose-500" : "border-white/15 focus:border-indigo-500"
                      }`}
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleContactSubmit()}
                  />
                  {emailDirty && !isValidEmail && (
                    <p className="mt-1.5 text-xs text-rose-400">{t.contact_invalid_email}</p>
                  )}
                </div>
              ) : (
                <div>
                  <div className={`flex rounded-xl border bg-white/5 transition-all ${phoneDirty && !isValidPhone ? "border-rose-500/60" : "border-white/15"
                    }`}>
                    <DialCodeSelect value={cPhonePrefix} onChange={setCPhonePrefix} />
                    <input
                      key="phone"
                      type="tel"
                      value={cPhone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "");
                        const formatted = digits.match(/.{1,2}/g)?.join(" ") ?? digits;
                        setCPhone(formatted);
                      }}
                      placeholder={t.contact_phone_placeholder}
                      className="flex-1 min-w-0 px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && handleContactSubmit()}
                    />
                  </div>
                  {phoneDirty && !isValidPhone && (
                    <p className="mt-1.5 text-xs text-rose-400">{t.contact_invalid_phone}</p>
                  )}
                  {cPhonePrefix !== "+33" && (
                    <p className="mt-1.5 text-xs text-slate-500">{t.contact_phone_note}</p>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleContactSubmit}
              disabled={!canSubmit || submitState === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed mb-3"
            >
              {submitState === "loading" ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <>{t.contact_submit}<ArrowRight className="w-4 h-4" /></>
              )}
            </button>
            {submitState === "error" ? (
              <div className="text-center">
                <p className="text-rose-400 text-xs mb-1">{t.contact_error}</p>
                <a
                  href={`mailto:contact@zapia.fr?subject=${encodeURIComponent("Ma demande de configuration — Zapia")}&body=${encodeURIComponent(buildSummary(state, cName, couponDiscount))}`}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                >
                  {t.contact_error_link}
                </a>
              </div>
            ) : (
              <p className="text-center text-xs text-slate-500">{t.contact_privacy}</p>
            )}
          </CardWrapper>
        );
      }

      // -----------------------------------------------------------------------
      case "done":
        return (
          <div className="text-center py-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {t.done_title}
            </h2>
            <p className="text-slate-400 max-w-sm mx-auto mb-8">{t.done_sub}</p>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all"
            >
              {t.done_cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        );

      default:
        return null;
    }
  }

  // ---------------------------------------------------------------------------
  // Guard: skip hydration flash
  // ---------------------------------------------------------------------------

  if (!hydrated) return <div className="min-h-screen bg-slate-950" />;

  return (
    <section className="relative bg-slate-950 overflow-hidden flex flex-col min-h-[calc(100vh-4rem)]">
      {showConfetti && <Confetti />}
      {/* Background gradient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-20 -right-20 w-100 h-100 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-75 rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Progress bar */}
      {step !== "welcome" && (
        <div className="relative z-10 w-full h-0.5 bg-white/10">
          <div
            className="h-full gradient-bg transition-all duration-700 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Mobile step tracker */}
      {showTracker && (
        <div className="relative z-10 lg:hidden mt-3">
          <MobileStepTracker
            items={trackerItems}
            history={history}
            currentStep={step}
            onJump={jumpToStep}
            onActivate={activateService}
          />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="lg:flex lg:items-start lg:gap-10">
            {/* Desktop sidebar tracker — always in DOM, width transitions smoothly */}
            <div
              className={`hidden lg:block shrink-0 overflow-hidden transition-all duration-500 ease-in-out ${showTracker && trackerItems.length > 0 ? "w-48 opacity-100" : "w-0 opacity-0"
                }`}
            >
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-3 px-3 whitespace-nowrap">
                Progress
              </p>
              <StepTracker
                items={trackerItems}
                history={history}
                currentStep={step}
                onJump={jumpToStep}
                onActivate={activateService}
              />
            </div>

            {/* Animated content */}
            <div key={animKey} className={`flex-1 min-w-0 ${animClass}`}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      {history.length > 0 && step !== "done" && (
        <div className="relative z-10 pb-8 flex justify-center">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.back}
          </button>
        </div>
      )}
    </section>
  );
}

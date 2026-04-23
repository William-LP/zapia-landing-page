"use client";

import { useEffect, useRef, useState } from "react";
import {
  Zap,
  Heart,
  Globe,
  Server,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Users,
  MapPin,
  ShieldCheck,
  Sparkles,
  Clock,
} from "lucide-react";
import Link from "next/link";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function ZapiaDesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-white">zapia</span>
          </Link>
          <a
            href="mailto:contact@zapia.fr?subject=Initiative%20Associations%20Chamb%C3%A9riennes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Nous contacter
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-0 overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-indigo-600/15 blur-3xl" />
            <div className="absolute top-20 -right-20 w-100 h-100 rounded-full bg-violet-600/15 blur-3xl" />
          </div>

          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
              <Heart className="w-3.5 h-3.5" />
              Initiative locale · Chambéry
            </div>

            <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Zapia soutient les{" "}
              <span className="gradient-text">associations Chambériennes</span>
            </h1>

            <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Parce que chaque association mérite une présence en ligne, Zapia offre la création de votre site web et l'héberge
              pour seulement{" "}
              <span className="text-white font-semibold">100&nbsp;€ par an</span>.
            </p>

            <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href="mailto:contact@zapia.fr?subject=Initiative%20Associations%20Chamb%C3%A9riennes"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white gradient-bg shadow-xl shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all text-base"
              >
                Déposer votre candidature
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Sans engagement, réponse sous 48&nbsp;h
              </div>
            </div>

            <div className="animate-fade-in-up-delay-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm font-medium mb-16">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Candidatures ouvertes jusqu'au <strong className="text-amber-200">30 mai 2026</strong>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/30 border border-white/10 animate-fade-in-up-delay-3">
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/chambery.jpg"
                alt="Vue panoramique de Chambéry, Savoie"
                className="w-full h-72 sm:h-96 lg:h-120 object-cover"
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                Comment ça marche
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Simple, rapide et sans prise de tête
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Trois étapes suffisent pour donner à votre association la visibilité qu'elle mérite.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageCircle,
                  step: "01",
                  title: "On discute de votre projet",
                  body: "Parlez-nous de votre association, de vos besoins et de vos objectifs. Aucune compétence technique requise — on s'occupe de tout.",
                  delay: 0,
                },
                {
                  icon: Sparkles,
                  step: "02",
                  title: "On crée votre site",
                  body: "Notre équipe conçoit un site web professionnel, moderne et à votre image, entièrement gratuitement.",
                  delay: 120,
                },
                {
                  icon: Server,
                  step: "03",
                  title: "On l'héberge et maintient",
                  body: "Votre site est mis en ligne sur notre infrastructure française pour seulement 100 € par an, tout inclus.",
                  delay: 240,
                },
              ].map(({ icon: Icon, step, title, body, delay }) => (
                <FadeIn key={step} delay={delay}>
                  <div className="card-hover relative bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                    <span className="absolute top-6 right-6 text-6xl font-black text-white/4 select-none leading-none">
                      {step}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Offer details */}
        <section className="py-24 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-200 h-100px rounded-full bg-violet-600/10 blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                  L'offre en détail
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                  Tout ce dont votre association a besoin,{" "}
                  <span className="gradient-text">sans les contraintes</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Nous prenons en charge l'intégralité de la création — design, contenu,
                  développement — et nous hébergeons ensuite votre site sur notre
                  infrastructure 100&nbsp;% française, sécurisée et fiable.
                </p>
                <ul className="space-y-3">
                  {[
                    "Création complète du site web offerte",
                    "Design professionnel sur mesure",
                    "Hébergement inclus à 100 € / an",
                    "Nom de domaine personnalisé",
                    "Certificat HTTPS et sécurité",
                    "Support réactif par email",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={150}>
                <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-white/5 p-8 animate-pulse-glow">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-indigo-600/20 blur-2xl pointer-events-none" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
                      <Heart className="w-3 h-3" />
                      Offre associations
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-1">Création du site</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">0&nbsp;€</span>
                        <span className="text-slate-500 text-sm line-through">500&nbsp;€</span>
                        <span className="text-emerald-400 text-sm font-semibold">offert</span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/10 mb-6" />

                    <div className="mb-8">
                      <p className="text-sm text-slate-400 mb-1">Hébergement annuel</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">100&nbsp;€</span>
                        <span className="text-slate-400 text-sm">/ an</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Soit moins de 8,50&nbsp;€ par mois, tout compris
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <p className="text-xs text-amber-300">
                        Date limite&nbsp;: <span className="font-semibold text-amber-200">30 mai 2026</span>
                      </p>
                    </div>

                    <a
                      href="mailto:contact@zapia.fr?subject=Initiative%20Associations%20Chamb%C3%A9riennes"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-all"
                    >
                      Candidater maintenant
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-12">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                Éligibilité
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Qui peut en bénéficier&nbsp;?
              </h2>
              <p className="text-slate-400">
                Cette initiative est réservée aux associations locales de la région Chambérienne.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Users,
                  title: "Association loi 1901",
                  body: "Votre structure est déclarée en préfecture et dispose d'un numéro SIRET.",
                  delay: 0,
                },
                {
                  icon: MapPin,
                  title: "Basée à Chambéry",
                  body: "Votre siège social ou l'essentiel de votre activité se situe dans l'agglomération Chambérienne.",
                  delay: 100,
                },
                {
                  icon: Clock,
                  title: "Activité régulière",
                  body: "Votre association est active et organise des événements ou des actions régulièrement.",
                  delay: 200,
                },
              ].map(({ icon: Icon, title, body, delay }) => (
                <FadeIn key={title} delay={delay}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center h-full">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div aria-hidden className="absolute left-1/2 -translate-x-1/2 w-175 h-87.5 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
                <Globe className="w-3.5 h-3.5" />
                Engagement local, impact concret
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Votre association mérite{" "}
                <span className="gradient-text">une vraie vitrine</span>
              </h2>

              <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
                Envoyez-nous un email pour nous parler de votre projet. Nous vous répondrons
                sous 48&nbsp;h pour organiser un premier échange.
              </p>

              <a
                href="mailto:contact@zapia.fr?subject=Initiative%20Associations%20Chamb%C3%A9riennes"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-white gradient-bg shadow-xl shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all text-lg mb-6"
              >
                contact@zapia.fr
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Hébergement en France
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" />
                  Soutien au tissu associatif local
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Mise en ligne rapide
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span>© {new Date().getFullYear()} Zapia. Tous droits réservés.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Retour à l'accueil
            </Link>
            <a href="mailto:contact@zapia.fr" className="hover:text-white transition-colors">
              contact@zapia.fr
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

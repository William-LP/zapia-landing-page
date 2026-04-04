import type { Metadata } from "next";
import { hasLocale } from "@/app/[lang]/dictionaries";
import { notFound } from "next/navigation";

const BASE_URL = "https://zapia.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang !== "fr";
  const title = isEn ? "Cookie Policy | Zapia" : "Politique des cookies | Zapia";
  const description = isEn
    ? "Understand how Zapia uses cookies on its website and how to manage your cookie preferences."
    : "Comprenez comment Zapia utilise les cookies sur son site et comment gérer vos préférences.";
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${lang}/cookie-policy`,
      languages: {
        en: `${BASE_URL}/en/cookie-policy`,
        fr: `${BASE_URL}/fr/cookie-policy`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/cookie-policy`,
      siteName: "Zapia",
    },
  };
}

const content = {
  en: {
    title: "Cookie Policy",
    updated: "Last updated: April 3, 2026",
    sections: [
      {
        heading: "What are cookies",
        body: "Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences and understand how you use the service.",
      },
      {
        heading: "Essential cookies",
        body: "These cookies are strictly necessary for the website to function. They enable core features such as authentication, security, and session management. You cannot opt out of these cookies.",
      },
      {
        heading: "Analytics cookies",
        body: "With your consent, we use analytics cookies to understand how visitors interact with our site — which pages are most visited, how long users stay, and where they come from. This helps us improve the service. These cookies do not identify you personally.",
      },
      {
        heading: "Preference cookies",
        body: "These cookies remember your choices (such as your preferred language) so you do not have to re-enter them on every visit.",
      },
      {
        heading: "Third-party cookies",
        body: "We do not serve third-party advertising cookies. Any third-party services we integrate (such as payment processors) may set their own cookies subject to their own privacy policies.",
      },
      {
        heading: "Managing cookies",
        body: "You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing ones. Note that disabling essential cookies may affect the functionality of our services.",
      },
      {
        heading: "Contact",
        body: "Questions about our use of cookies? Email us at contact@zapia.fr.",
      },
    ],
  },
  fr: {
    title: "Politique des cookies",
    updated: "Dernière mise à jour : 3 avril 2026",
    sections: [
      {
        heading: "Qu'est-ce qu'un cookie ?",
        body: "Les cookies sont de petits fichiers texte déposés sur votre appareil lorsque vous visitez un site web. Ils permettent au site de mémoriser vos préférences et de comprendre la façon dont vous utilisez le service.",
      },
      {
        heading: "Cookies essentiels",
        body: "Ces cookies sont strictement nécessaires au fonctionnement du site web. Ils permettent des fonctions essentielles telles que l'authentification, la sécurité et la gestion des sessions. Vous ne pouvez pas refuser ces cookies.",
      },
      {
        heading: "Cookies analytiques",
        body: "Avec votre consentement, nous utilisons des cookies analytiques pour comprendre comment les visiteurs interagissent avec notre site — quelles pages sont les plus consultées, la durée de visite et la provenance des utilisateurs. Ces informations nous aident à améliorer le service. Ces cookies ne vous identifient pas personnellement.",
      },
      {
        heading: "Cookies de préférence",
        body: "Ces cookies mémorisent vos choix (comme la langue préférée) afin que vous n'ayez pas à les ressaisir à chaque visite.",
      },
      {
        heading: "Cookies tiers",
        body: "Nous n'utilisons pas de cookies publicitaires tiers. Les services tiers que nous intégrons (comme les prestataires de paiement) peuvent déposer leurs propres cookies conformément à leurs propres politiques de confidentialité.",
      },
      {
        heading: "Gérer les cookies",
        body: "Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur. La plupart des navigateurs vous permettent de refuser les cookies ou de supprimer ceux qui existent déjà. Notez que la désactivation des cookies essentiels peut affecter le bon fonctionnement de nos services.",
      },
      {
        heading: "Contact",
        body: "Des questions sur notre utilisation des cookies ? Écrivez-nous à contact@zapia.fr.",
      },
    ],
  },
};

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = content[lang as keyof typeof content] ?? content.en;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-extrabold text-white mb-2">{t.title}</h1>
      <p className="text-sm text-slate-500 mb-12">{t.updated}</p>
      <div className="space-y-10">
        {t.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold text-white mb-2">{s.heading}</h2>
            <p className="text-slate-400 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

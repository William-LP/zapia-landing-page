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
  const title = isEn
    ? "Privacy Policy | Zapia"
    : "Politique de confidentialité | Zapia";
  const description = isEn
    ? "Learn how Zapia collects, uses, and protects your personal data in compliance with GDPR and French law."
    : "Découvrez comment Zapia collecte, utilise et protège vos données personnelles conformément au RGPD et au droit français.";
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${lang}/privacy-policy`,
      languages: {
        en: `${BASE_URL}/en/privacy-policy`,
        fr: `${BASE_URL}/fr/privacy-policy`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/privacy-policy`,
      siteName: "Zapia",
    },
  };
}

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: April 3, 2026",
    sections: [
      {
        heading: "Who we are",
        body: "Zapia is a web design, development, and hosting service operated from France. Our contact email is contact@zapia.fr.",
      },
      {
        heading: "Data we collect",
        body: "We collect information you provide directly: name, email address, billing information, and communication history. When you use our services, we also collect technical data such as IP addresses, browser type, and usage logs to ensure service quality and security.",
      },
      {
        heading: "How we use your data",
        body: "Your data is used exclusively to provide and improve our services: account management, billing, customer support, and service performance monitoring. We do not sell, rent, or share your personal data with third parties for marketing purposes.",
      },
      {
        heading: "Data storage and security",
        body: "All data is stored on servers located within the European Union. We use industry-standard encryption (TLS in transit, AES-256 at rest) and access controls to protect your information.",
      },
      {
        heading: "Your rights (GDPR)",
        body: "Under the GDPR, you have the right to access, correct, delete, or export your personal data at any time. You may also object to or restrict certain processing. To exercise any of these rights, contact us at contact@zapia.fr.",
      },
      {
        heading: "Cookies",
        body: "We use essential cookies to operate the service and, with your consent, analytics cookies to understand how our site is used. See our Cookie Policy for details.",
      },
      {
        heading: "Contact",
        body: "For any privacy-related questions or requests, please email contact@zapia.fr.",
      },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 3 avril 2026",
    sections: [
      {
        heading: "Qui sommes-nous",
        body: "Zapia est un service de conception, développement et hébergement web opérant depuis la France. Notre adresse e-mail de contact est contact@zapia.fr.",
      },
      {
        heading: "Données collectées",
        body: "Nous collectons les informations que vous nous fournissez directement : nom, adresse e-mail, informations de facturation et historique des échanges. Lors de l'utilisation de nos services, nous collectons également des données techniques telles que les adresses IP, le type de navigateur et les journaux d'utilisation afin d'assurer la qualité et la sécurité du service.",
      },
      {
        heading: "Utilisation de vos données",
        body: "Vos données sont utilisées exclusivement pour fournir et améliorer nos services : gestion de compte, facturation, support client et surveillance des performances. Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.",
      },
      {
        heading: "Stockage et sécurité des données",
        body: "Toutes les données sont stockées sur des serveurs situés au sein de l'Union européenne. Nous utilisons le chiffrement standard du secteur (TLS en transit, AES-256 au repos) et des contrôles d'accès pour protéger vos informations.",
      },
      {
        heading: "Vos droits (RGPD)",
        body: "En vertu du RGPD, vous disposez à tout moment du droit d'accéder, de corriger, de supprimer ou d'exporter vos données personnelles. Vous pouvez également vous opposer à certains traitements ou en demander la limitation. Pour exercer l'un de ces droits, contactez-nous à contact@zapia.fr.",
      },
      {
        heading: "Cookies",
        body: "Nous utilisons des cookies essentiels au fonctionnement du service et, avec votre consentement, des cookies analytiques pour comprendre l'utilisation de notre site. Consultez notre Politique des cookies pour plus de détails.",
      },
      {
        heading: "Contact",
        body: "Pour toute question ou demande relative à la confidentialité, veuillez écrire à contact@zapia.fr.",
      },
    ],
  },
};

export default async function PrivacyPolicyPage({
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

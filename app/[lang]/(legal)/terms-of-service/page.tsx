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
  const title = isEn ? "Terms of Service | Zapia" : "Conditions d'utilisation | Zapia";
  const description = isEn
    ? "Read Zapia's terms of service governing your use of our web hosting and design services."
    : "Lisez les conditions d'utilisation de Zapia régissant l'utilisation de nos services d'hébergement et de conception web.";
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${lang}/terms-of-service`,
      languages: {
        en: `${BASE_URL}/en/terms-of-service`,
        fr: `${BASE_URL}/fr/terms-of-service`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/terms-of-service`,
      siteName: "Zapia",
    },
  };
}

const content = {
  en: {
    title: "Terms of Service",
    updated: "Last updated: April 3, 2026",
    sections: [
      {
        heading: "Acceptance of terms",
        body: "By using Zapia's services, you agree to these Terms of Service. If you do not agree, please do not use our services.",
      },
      {
        heading: "Services provided",
        body: "Zapia offers web design, development, and hosting services. The specific scope of each engagement is defined in the quote or service agreement provided to you before the start of the project.",
      },
      {
        heading: "Payment",
        body: "Hosting plans are billed monthly or annually as chosen at signup. Custom website projects require a deposit before work begins, with the balance due upon delivery. All prices are in euros and inclusive of VAT where applicable.",
      },
      {
        heading: "Cancellation and refunds",
        body: "Hosting subscriptions may be cancelled at any time. We offer a 30-day money-back guarantee on hosting plans — if you are unsatisfied within 30 days of your first payment, contact us for a full refund. Custom project deposits are non-refundable once work has begun.",
      },
      {
        heading: "Acceptable use",
        body: "You may not use Zapia's infrastructure to host illegal content, spam, malware, or any content that violates applicable law. We reserve the right to suspend or terminate accounts that violate this policy without notice.",
      },
      {
        heading: "Uptime and availability",
        body: "We target 99.9% uptime on all hosting plans. Scheduled maintenance and events beyond our reasonable control are excluded from SLA calculations. Service credits for downtime, if applicable, are issued at our discretion.",
      },
      {
        heading: "Limitation of liability",
        body: "To the maximum extent permitted by law, Zapia's liability for any claim arising from the use of our services is limited to the amount you paid in the three months preceding the claim.",
      },
      {
        heading: "Governing law",
        body: "These terms are governed by French law. Any dispute shall be subject to the exclusive jurisdiction of the courts of France.",
      },
      {
        heading: "Contact",
        body: "Questions about these terms? Email us at contact@zapia.fr.",
      },
    ],
  },
  fr: {
    title: "Conditions d'utilisation",
    updated: "Dernière mise à jour : 3 avril 2026",
    sections: [
      {
        heading: "Acceptation des conditions",
        body: "En utilisant les services de Zapia, vous acceptez les présentes Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
      },
      {
        heading: "Services fournis",
        body: "Zapia propose des services de conception, développement et hébergement web. La portée spécifique de chaque prestation est définie dans le devis ou le contrat de service qui vous est remis avant le début du projet.",
      },
      {
        heading: "Paiement",
        body: "Les offres d'hébergement sont facturées mensuellement ou annuellement selon le choix effectué lors de l'inscription. Les projets de sites web sur mesure nécessitent un acompte avant le démarrage des travaux, le solde étant dû à la livraison. Tous les prix sont en euros, TVA incluse le cas échéant.",
      },
      {
        heading: "Résiliation et remboursements",
        body: "Les abonnements d'hébergement peuvent être résiliés à tout moment. Nous offrons une garantie satisfait ou remboursé de 30 jours sur les offres d'hébergement — si vous n'êtes pas satisfait dans les 30 jours suivant votre premier paiement, contactez-nous pour un remboursement intégral. Les acomptes versés pour des projets sur mesure ne sont pas remboursables une fois les travaux commencés.",
      },
      {
        heading: "Utilisation acceptable",
        body: "Il vous est interdit d'utiliser l'infrastructure de Zapia pour héberger des contenus illégaux, du spam, des logiciels malveillants ou tout contenu contraire à la législation applicable. Nous nous réservons le droit de suspendre ou de résilier sans préavis les comptes qui enfreindraient cette politique.",
      },
      {
        heading: "Disponibilité du service",
        body: "Nous visons une disponibilité de 99,9 % sur toutes nos offres d'hébergement. Les maintenances programmées et les événements indépendants de notre volonté sont exclus du calcul du SLA. Les crédits de service en cas d'interruption, le cas échéant, sont accordés à notre discrétion.",
      },
      {
        heading: "Limitation de responsabilité",
        body: "Dans les limites autorisées par la loi, la responsabilité de Zapia pour toute réclamation découlant de l'utilisation de nos services est limitée au montant que vous avez payé au cours des trois mois précédant la réclamation.",
      },
      {
        heading: "Droit applicable",
        body: "Les présentes conditions sont régies par le droit français. Tout litige sera soumis à la compétence exclusive des juridictions françaises.",
      },
      {
        heading: "Contact",
        body: "Des questions sur ces conditions ? Écrivez-nous à contact@zapia.fr.",
      },
    ],
  },
};

export default async function TermsOfServicePage({
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

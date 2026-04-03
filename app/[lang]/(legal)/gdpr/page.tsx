import { hasLocale } from "@/app/[lang]/dictionaries";
import { notFound } from "next/navigation";

const content = {
  en: {
    title: "GDPR",
    updated: "Last updated: April 3, 2026",
    intro:
      "Zapia is committed to complying with the General Data Protection Regulation (EU) 2016/679 (GDPR). This page summarises your rights as a data subject and how we fulfil our obligations as a data controller.",
    sections: [
      {
        heading: "Legal basis for processing",
        body: "We process your personal data on the following legal bases: (1) Contract performance — processing necessary to provide the services you have subscribed to; (2) Legitimate interests — such as fraud prevention and service security; (3) Consent — for analytics cookies and marketing communications, which you may withdraw at any time.",
      },
      {
        heading: "Your rights",
        body: "Under the GDPR you have the right to: access a copy of the personal data we hold about you; rectify inaccurate data; request erasure ('right to be forgotten') where we have no overriding legal basis to retain it; restrict or object to certain processing activities; receive your data in a portable, machine-readable format; and lodge a complaint with a supervisory authority.",
      },
      {
        heading: "How to exercise your rights",
        body: "Send your request to contact@zapia.fr. We will respond within 30 days. We may ask you to verify your identity before fulfilling the request.",
      },
      {
        heading: "Data retention",
        body: "We retain personal data for as long as your account is active or as required to provide services. Billing and contractual records are kept for the period required by French law (generally 10 years). You may request deletion of non-legally-required data at any time.",
      },
      {
        heading: "International transfers",
        body: "All data is stored and processed within the European Union. We do not transfer personal data outside the EU/EEA.",
      },
      {
        heading: "Data protection contact",
        body: "For any GDPR-related enquiries, contact our data protection point of contact at contact@zapia.fr.",
      },
      {
        heading: "Supervisory authority",
        body: "If you believe we have not addressed your concern adequately, you have the right to lodge a complaint with the CNIL (Commission Nationale de l'Informatique et des Libertés) at cnil.fr.",
      },
    ],
  },
  fr: {
    title: "RGPD",
    updated: "Dernière mise à jour : 3 avril 2026",
    intro:
      "Zapia s'engage à respecter le Règlement général sur la protection des données (UE) 2016/679 (RGPD). Cette page résume vos droits en tant que personne concernée et la manière dont nous remplissons nos obligations en tant que responsable du traitement.",
    sections: [
      {
        heading: "Base légale du traitement",
        body: "Nous traitons vos données personnelles sur les bases légales suivantes : (1) Exécution d'un contrat — traitement nécessaire à la fourniture des services auxquels vous avez souscrit ; (2) Intérêts légitimes — tels que la prévention de la fraude et la sécurité du service ; (3) Consentement — pour les cookies analytiques et les communications marketing, que vous pouvez retirer à tout moment.",
      },
      {
        heading: "Vos droits",
        body: "En vertu du RGPD, vous disposez des droits suivants : accéder à une copie des données personnelles que nous détenons vous concernant ; rectifier des données inexactes ; demander l'effacement (« droit à l'oubli ») lorsque nous n'avons aucune base légale prédominante pour les conserver ; restreindre certaines activités de traitement ou vous y opposer ; recevoir vos données dans un format portable et lisible par machine ; et introduire une réclamation auprès d'une autorité de contrôle.",
      },
      {
        heading: "Comment exercer vos droits",
        body: "Envoyez votre demande à contact@zapia.fr. Nous répondrons dans un délai de 30 jours. Nous pouvons vous demander de vérifier votre identité avant de traiter votre demande.",
      },
      {
        heading: "Conservation des données",
        body: "Nous conservons vos données personnelles aussi longtemps que votre compte est actif ou que cela est nécessaire pour fournir les services. Les données de facturation et les documents contractuels sont conservés pendant la durée requise par la loi française (en général 10 ans). Vous pouvez demander la suppression des données non soumises à une obligation légale de conservation à tout moment.",
      },
      {
        heading: "Transferts internationaux",
        body: "Toutes les données sont stockées et traitées au sein de l'Union européenne. Nous ne transférons pas de données personnelles en dehors de l'UE/EEE.",
      },
      {
        heading: "Contact protection des données",
        body: "Pour toute question relative au RGPD, contactez notre référent protection des données à contact@zapia.fr.",
      },
      {
        heading: "Autorité de contrôle",
        body: "Si vous estimez que nous n'avons pas traité votre préoccupation de manière adéquate, vous avez le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) sur cnil.fr.",
      },
    ],
  },
};

export default async function GdprPage({
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
      <p className="text-sm text-slate-500 mb-6">{t.updated}</p>
      <p className="text-slate-400 leading-relaxed mb-12">{t.intro}</p>
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

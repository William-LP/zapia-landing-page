export type Article = {
  slug: string;
  category: { en: string; fr: string };
  tags: string[];
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  date: string;
  readTime: number;
};

export const articles: Article[] = [
  {
    slug: "why-use-a-professional-domain-email",
    category: { en: "Email", fr: "Email" },
    tags: ["email", "branding", "deliverability"],
    title: {
      en: "Why @yourcompany.com beats @gmail.com for business",
      fr: "Pourquoi @votreentreprise.fr vaut mieux que @gmail.com",
    },
    excerpt: {
      en: "A Gmail address works fine for personal use. For business, it quietly signals that you haven't quite set up shop yet. Here's what changes when you switch to a domain email — and why it matters more than you'd expect.",
      fr: "Une adresse Gmail fonctionne très bien pour un usage personnel. Pour une entreprise, elle signale discrètement que vous n'êtes pas encore tout à fait installé. Voici ce qui change quand vous passez à un email au nom de votre domaine.",
    },
    date: "2025-04-29",
    readTime: 7,
  },
  {
    slug: "how-to-choose-the-right-domain-name",
    category: { en: "Domains", fr: "Domaines" },
    tags: ["domain", "branding", "email"],
    title: {
      en: "How to Choose the Right Domain Name for Your Business",
      fr: "Comment choisir le bon nom de domaine pour votre entreprise",
    },
    excerpt: {
      en: "Your domain name is one of the most permanent decisions you'll make for your business. Get it wrong and you'll either pay to fix it later or live with the consequences. Here's everything you need to check before you buy.",
      fr: "Votre nom de domaine est l'une des décisions les plus durables que vous prendrez pour votre entreprise. Une mauvaise décision vous coûtera cher à corriger — ou vous vivrez avec les conséquences. Voici tout ce qu'il faut vérifier avant d'acheter.",
    },
    date: "2025-04-29",
    readTime: 8,
  },
];

export const allCategories = (lang: "en" | "fr") =>
  Array.from(new Set(articles.map((a) => a.category[lang])));

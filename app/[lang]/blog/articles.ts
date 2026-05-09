export type Article = {
  slug: { en: string; fr: string };
  categories: { en: string; fr: string }[];
  tags: string[];
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  date: string;
  readTime: number;
  coverImage?: string;
};

export const articles: Article[] = [
  {
    slug: {
      en: "why-use-a-professional-domain-email",
      fr: "pourquoi-utiliser-une-adresse-email-professionnelle",
    },
    categories: [{ en: "Email", fr: "Email" }],
    tags: ["email", "branding", "deliverability"],
    title: {
      en: "Why @yourcompany.com beats @gmail.com for business",
      fr: "Pourquoi @votre-entreprise.fr vaut mieux que @gmail.com",
    },
    excerpt: {
      en: "A Gmail address works fine for personal use. For business, it quietly signals that you haven't quite set up shop yet. Here's what changes when you switch to a domain email — and why it matters more than you'd expect.",
      fr: "Une adresse Gmail fonctionne très bien pour un usage personnel. Pour une entreprise, elle signale discrètement que vous n'êtes pas encore tout à fait installé. Voici ce qui change quand vous passez à un email au nom de votre domaine.",
    },
    date: "2025-04-29",
    readTime: 7,
    coverImage: "/blog/why-use-a-professional-domain-email/email pro.png",
  },
  {
    slug: {
      en: "how-to-choose-the-right-domain-name",
      fr: "comment-choisir-son-nom-de-domaine",
    },
    categories: [{ en: "Domains", fr: "Domaines" }],
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
    coverImage: "/blog/how-to-choose-the-right-domain-name/domain-name.png",
  },
  {
    slug: {
      en: "how-to-update-your-email-signature",
      fr: "comment-modifier-votre-signature-email",
    },
    categories: [
      { en: "Email", fr: "Email" },
      { en: "Tutorial", fr: "Tutoriel" },
    ],
    tags: ["email", "signature", "outlook", "gmail", "thunderbird"],
    title: {
      en: "How to update your email signature (Gmail, Outlook, Thunderbird)",
      fr: "Comment modifier sa signature email (Gmail, Outlook, Thunderbird)",
    },
    excerpt: {
      en: "A step-by-step guide to updating your email signature in the most common email clients — no technical knowledge required.",
      fr: "Un guide pas à pas pour modifier votre signature email dans les principaux clients de messagerie — aucune connaissance technique requise.",
    },
    date: "2025-05-01",
    readTime: 6,
  },
  {
    slug: {
      en: "why-use-pdf-over-docx",
      fr: "pourquoi-utiliser-le-pdf-plutot-que-docx",
    },
    categories: [{ en: "Documents", fr: "Bureautique" }],
    tags: ["pdf", "word", "docx", "documents", "printing"],
    title: {
      en: "Why you should send PDFs instead of Word documents",
      fr: "Pourquoi envoyer des PDF plutôt que des documents Word",
    },
    excerpt: {
      en: "Word files look different on every computer. PDFs don't. Here's why PDF is the right format for anything you consider final — and what you risk by sending .docx.",
      fr: "Un fichier Word s'affiche différemment sur chaque ordinateur. Un PDF, non. Voici pourquoi le PDF est le bon format pour tout document finalisé — et ce que vous risquez en envoyant du .docx.",
    },
    date: "2025-05-01",
    readTime: 7,
  },
  {
    slug: {
      en: "how-to-create-a-pdf",
      fr: "comment-creer-un-pdf",
    },
    categories: [{ en: "Documents", fr: "Bureautique" }],
    tags: ["pdf", "documents", "tutorial"],
    title: {
      en: "How to create a PDF from any application",
      fr: "Comment créer un PDF depuis n'importe quelle application",
    },
    excerpt: {
      en: "You don't need special software to create a PDF. Every major platform has a built-in way to export any document, webpage, or image as a PDF — here's how to do it on Windows, macOS, and in the most common apps.",
      fr: "Vous n'avez pas besoin d'un logiciel spécial pour créer un PDF. Chaque plateforme majeure dispose d'un moyen intégré d'exporter n'importe quel document, page web ou image en PDF — voici comment faire sur Windows, macOS et dans les applications les plus courantes.",
    },
    date: "2025-05-02",
    readTime: 5,
  },
  {
    slug: {
      en: "how-to-sign-a-pdf",
      fr: "comment-signer-un-pdf",
    },
    categories: [{ en: "Documents", fr: "Bureautique" }],
    tags: ["pdf", "signature", "documents"],
    title: {
      en: "How to sign a PDF (on any device)",
      fr: "Comment signer un PDF (sur n'importe quel appareil)",
    },
    excerpt: {
      en: "Signing a PDF doesn't require printing it out. Whether you're on a Mac, Windows PC, iPhone, or Android, there's a built-in or free tool that lets you add your signature in under a minute.",
      fr: "Signer un PDF ne nécessite pas de l'imprimer. Que vous soyez sur Mac, PC Windows, iPhone ou Android, il existe un outil intégré ou gratuit qui vous permet d'ajouter votre signature en moins d'une minute.",
    },
    date: "2025-05-02",
    readTime: 6,
  },
];

export const allCategories = (lang: "en" | "fr") =>
  Array.from(
    new Set(articles.flatMap((a) => a.categories.map((c) => c[lang])))
  );

import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ClientScrollAnchor from "@/components/ClientScrollAnchor";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { getDictionary, hasLocale, locales } from "@/app/[lang]/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/app/[lang]/blog/articles";
import DomainNameGuideContent, {
  toc as domainToc,
} from "@/app/[lang]/blog/content/domain-name-guide";
import ProfessionalEmailGuideContent, {
  toc as emailToc,
} from "@/app/[lang]/blog/content/professional-email-guide";
import EmailSignatureGuideContent, {
  toc as signatureToc,
} from "@/app/[lang]/blog/content/email-signature-guide";

const BASE_URL = "https://zapia.fr";

type RelatedArticle = {
  slug: string;
  categories: { en: string; fr: string }[];
  title: { en: string; fr: string };
  readTime: number;
};

const relatedBySlug: Record<string, RelatedArticle[]> = {
  "how-to-choose-the-right-domain-name": [
    {
      slug: "why-use-a-professional-domain-email",
      categories: [{ en: "Email", fr: "Email" }],
      title: {
        en: "Why @yourcompany.com beats @gmail.com for business",
        fr: "Pourquoi @votreentreprise.fr vaut mieux que @gmail.com",
      },
      readTime: 7,
    },
    {
      slug: "how-to-transfer-your-domain-without-losing-seo",
      categories: [{ en: "Domains", fr: "Domaines" }],
      title: {
        en: "How to transfer your domain without losing your SEO",
        fr: "Comment transférer votre domaine sans perdre votre référencement",
      },
      readTime: 6,
    },
    {
      slug: "5-signs-your-website-is-hurting-your-credibility",
      categories: [{ en: "Digital presence", fr: "Présence numérique" }],
      title: {
        en: "5 signs your website is hurting your credibility",
        fr: "5 signes que votre site web nuit à votre crédibilité",
      },
      readTime: 4,
    },
  ],
  "why-use-a-professional-domain-email": [
    {
      slug: "how-to-update-your-email-signature",
      categories: [
        { en: "Email", fr: "Email" },
        { en: "Tutorial", fr: "Tutoriel" },
      ],
      title: {
        en: "How to update your email signature (Gmail, Outlook, Thunderbird)",
        fr: "Comment modifier sa signature email (Gmail, Outlook, Thunderbird)",
      },
      readTime: 6,
    },
    {
      slug: "how-to-choose-the-right-domain-name",
      categories: [{ en: "Domains", fr: "Domaines" }],
      title: {
        en: "How to choose the right domain name for your business",
        fr: "Comment choisir le bon nom de domaine pour votre entreprise",
      },
      readTime: 8,
    },
    {
      slug: "5-signs-your-website-is-hurting-your-credibility",
      categories: [{ en: "Digital presence", fr: "Présence numérique" }],
      title: {
        en: "5 signs your website is hurting your credibility",
        fr: "5 signes que votre site web nuit à votre crédibilité",
      },
      readTime: 4,
    },
  ],
  "how-to-update-your-email-signature": [
    {
      slug: "why-use-a-professional-domain-email",
      categories: [{ en: "Email", fr: "Email" }],
      title: {
        en: "Why @yourcompany.com beats @gmail.com for business",
        fr: "Pourquoi @votreentreprise.fr vaut mieux que @gmail.com",
      },
      readTime: 7,
    },
    {
      slug: "how-to-choose-the-right-domain-name",
      categories: [{ en: "Domains", fr: "Domaines" }],
      title: {
        en: "How to choose the right domain name for your business",
        fr: "Comment choisir le bon nom de domaine pour votre entreprise",
      },
      readTime: 8,
    },
    {
      slug: "how-to-set-up-spf-dkim-records",
      categories: [{ en: "Email", fr: "Email" }],
      title: {
        en: "How to set up SPF and DKIM records for your domain",
        fr: "Comment configurer les enregistrements SPF et DKIM de votre domaine",
      },
      readTime: 7,
    },
  ],
};

const contentMap: Record<
  string,
  {
    component: typeof DomainNameGuideContent;
    toc: typeof domainToc;
  }
> = {
  "how-to-choose-the-right-domain-name": {
    component: DomainNameGuideContent,
    toc: domainToc,
  },
  "why-use-a-professional-domain-email": {
    component: ProfessionalEmailGuideContent,
    toc: emailToc,
  },
  "how-to-update-your-email-signature": {
    component: EmailSignatureGuideContent,
    toc: signatureToc,
  },
};

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    articles.map((a) => ({ lang, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  const url = `${BASE_URL}/${lang}/blog/${slug}`;
  return {
    title: `${article.title[lang]} — Zapia Blog`,
    description: article.excerpt[lang],
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/blog/${slug}`])
      ) as Record<string, string>,
    },
    openGraph: {
      type: "article",
      url,
      title: article.title[lang],
      description: article.excerpt[lang],
      publishedTime: article.date,
      siteName: "Zapia",
    },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const content = contentMap[slug];
  if (!content) notFound();

  const dict = await getDictionary(lang);
  const { component: ArticleContent, toc: articleToc } = content;
  const tocItems = articleToc[lang];
  const related = relatedBySlug[slug] ?? [];

  const formattedDate = new Date(article.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const backLabel = lang === "fr" ? "Retour au blog" : "Back to blog";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Suspense fallback={null}>
        <ClientScrollAnchor />
      </Suspense>
      <Navbar t={dict.nav} lang={lang} />

      {/* Breadcrumb bar */}
      <div className="border-b border-slate-200 bg-slate-50 pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {backLabel}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex gap-12 xl:gap-24 py-12">
          {/* ── Article ─────────────────────────────────────── */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Header */}
            <header className="mb-10 pb-10 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {article.categories.map((cat) => (
                  <span
                    key={cat.en}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium"
                  >
                    {cat[lang]}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}{" "}
                  {lang === "fr" ? "min de lecture" : "min read"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-5">
                {article.title[lang]}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed border-l-2 border-indigo-400 pl-4">
                {article.excerpt[lang]}
              </p>
            </header>

            {/* Content */}
            <ArticleContent lang={lang} />
          </article>

          {/* ── Table of contents (sticky) ──────────────────── */}
          <aside className="hidden xl:block w-52 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {lang === "fr" ? "Sommaire" : "On this page"}
              </p>
              <nav className="flex flex-col gap-0.5">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-slate-500 hover:text-indigo-600 py-1 transition-colors leading-snug"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
              {lang === "fr" ? "Articles liés" : "Related articles"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${lang}/blog/${r.slug}`}
                  className="group flex flex-col gap-3 p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {r.categories.map((cat) => (
                        <span
                          key={cat.en}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium"
                        >
                          {cat[lang]}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-slate-400 shrink-0 ml-2">
                      <Clock className="w-3 h-3" />
                      {r.readTime} {lang === "fr" ? "min" : "min read"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors">
                    {r.title[lang]}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-500 group-hover:text-indigo-600 transition-colors mt-auto">
                    {lang === "fr" ? "Lire l'article" : "Read article"}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer t={dict.footer} lang={lang} />
    </div>
  );
}

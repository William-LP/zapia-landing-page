import type { MetadataRoute } from "next";
import { locales } from "./[lang]/dictionaries";
import { articles } from "./[lang]/blog/articles";

const BASE_URL = "https://zapia.fr";

const legalPages = [
  "privacy-policy",
  "terms-of-service",
  "cookie-policy",
  "gdpr",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}`])),
    },
  }));

  const blogIndexEntries: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${BASE_URL}/${lang}/blog`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/blog`])),
    },
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) => {
    const lastModified = new Date(article.date);
    const alternates = Object.fromEntries(
      locales.map((l) => [l, `${BASE_URL}/${l}/blog/${article.slug[l]}`])
    );
    return locales.map((lang) => ({
      url: `${BASE_URL}/${lang}/blog/${article.slug[lang]}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: alternates },
    }));
  });

  const legalEntries: MetadataRoute.Sitemap = legalPages.flatMap((page) => {
    const pageAlternates = Object.fromEntries(
      locales.map((l) => [l, `${BASE_URL}/${l}/${page}`])
    );
    return locales.map((lang) => ({
      url: `${BASE_URL}/${lang}/${page}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: pageAlternates },
    }));
  });

  return [...homeEntries, ...blogIndexEntries, ...articleEntries, ...legalEntries];
}

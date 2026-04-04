import type { MetadataRoute } from "next";
import { locales } from "./[lang]/dictionaries";

const BASE_URL = "https://zapia.fr";

const legalPages = [
    "privacy-policy",
    "terms-of-service",
    "cookie-policy",
    "gdpr",
];

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const langAlternates = Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}`])
    );

    const homeEntries: MetadataRoute.Sitemap = locales.map((lang) => ({
        url: `${BASE_URL}/${lang}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 1,
        alternates: { languages: langAlternates },
    }));

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

    return [...homeEntries, ...legalEntries];
}

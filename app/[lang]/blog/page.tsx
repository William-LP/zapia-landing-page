import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { getDictionary, hasLocale, locales } from "@/app/[lang]/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogBrowser from "@/components/BlogBrowser";
import { articles, allCategories } from "./articles";

const BASE_URL = "https://zapia.fr";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const url = `${BASE_URL}/${lang}/blog`;

  return {
    title: "Blog — Zapia",
    description: dict.blog.sub,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/blog`])
      ) as Record<string, string>,
    },
    openGraph: {
      type: "website",
      url,
      title: "Blog — Zapia",
      description: dict.blog.sub,
      siteName: "Zapia",
    },
  };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const categories = allCategories(lang);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar t={dict.nav} lang={lang} />

      {/* Page header */}
      <div className="border-b border-slate-200 bg-slate-50 pt-20">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 leading-none">
              {dict.blog.headline}{" "}
              <span className="gradient-text">{dict.blog.headline_highlight}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-lg">
              {dict.blog.sub}
            </p>
          </div>
        </div>
      </div>

      {/* Browser layout */}
      <div className="max-w-screen-2xl mx-auto">
        <BlogBrowser
          articles={articles}
          categories={categories}
          lang={lang}
          t={{
            search_placeholder: dict.blog.search_placeholder,
            all_categories: dict.blog.all_categories,
            read_more: dict.blog.read_more,
            min_read: dict.blog.min_read,
            no_results: dict.blog.no_results,
            no_results_sub: dict.blog.no_results_sub,
            clear_filters: dict.blog.clear_filters,
            results_count: dict.blog.results_count,
            results_count_plural: dict.blog.results_count_plural,
          }}
        />
      </div>

      <Footer t={dict.footer} lang={lang} />
    </div>
  );
}

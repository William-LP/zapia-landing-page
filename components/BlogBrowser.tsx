"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, Clock, X, BookOpen, FileText } from "lucide-react";
import type { Article } from "@/app/[lang]/blog/articles";

type Translations = {
  search_placeholder: string;
  all_categories: string;
  read_more: string;
  min_read: string;
  no_results: string;
  no_results_sub: string;
  clear_filters: string;
  results_count: string;
  results_count_plural: string;
};

type Props = {
  articles: Article[];
  categories: string[];
  lang: "en" | "fr";
  t: Translations;
};

export default function BlogBrowser({ articles, categories, lang, t }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return articles.filter((a) => {
      const matchesCategory =
        !activeCategory ||
        a.categories.some((c) => c[lang] === activeCategory);
      const matchesSearch =
        !q ||
        a.title[lang].toLowerCase().includes(q) ||
        a.excerpt[lang].toLowerCase().includes(q) ||
        a.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        a.categories.some((c) => c[lang].toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [articles, lang, search, activeCategory]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const hasFilters = search.trim() !== "" || activeCategory !== null;

  const resultLabel =
    filtered.length === 1
      ? t.results_count.replace("{n}", "1")
      : t.results_count_plural.replace("{n}", String(filtered.length));

  return (
    <div className="flex gap-0 min-h-[calc(100vh-64px)]">
      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 border-r border-slate-200 bg-slate-50 sticky top-16 self-start h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-6 flex flex-col gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Categories
            </p>
            <nav className="flex flex-col gap-0.5">
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                  activeCategory === null
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{t.all_categories}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-md ${
                    activeCategory === null
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {articles.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = articles.filter((a) =>
                  a.categories.some((c) => c[lang] === cat)
                ).length;
                return (
                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat ? null : cat)
                    }
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                      activeCategory === cat
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-md ${
                        activeCategory === cat
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory(null);
              }}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3 h-3" />
              {t.clear_filters}
            </button>
          )}
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 bg-slate-50">
        {/* Mobile search + filters */}
        <div className="lg:hidden px-4 pt-6 pb-4 flex flex-col gap-3 border-b border-slate-200 bg-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === null
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  : "bg-white text-slate-500 border border-slate-200 hover:text-slate-800"
              }`}
            >
              {t.all_categories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    : "bg-white text-slate-500 border border-slate-200 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results header */}
        <div className="px-6 lg:px-10 pt-8 pb-4 flex items-center justify-between">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            {resultLabel}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              {t.clear_filters}
            </button>
          )}
        </div>

        {/* Articles list */}
        <div className="px-6 lg:px-10 pb-20 flex flex-col gap-4 pt-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-5">
                <BookOpen className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-800 mb-2">
                {t.no_results}
              </p>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                {t.no_results_sub}
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory(null);
                }}
                className="mt-6 text-sm text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                {t.clear_filters}
              </button>
            </div>
          ) : (
            filtered.map((article) => (
              <article
                key={article.slug.en}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 relative cursor-pointer bg-white border border-slate-200 rounded-2xl px-6 py-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
              >
                {/* Left: date + image (desktop) */}
                <div className="hidden sm:flex flex-col items-end gap-3 shrink-0 w-28">
                  <time
                    dateTime={article.date}
                    className="text-xs text-slate-400 text-right leading-relaxed pt-1"
                  >
                    {formatDate(article.date)}
                  </time>
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-100 via-slate-100 to-slate-50 border border-slate-200 overflow-hidden" />
                </div>

                {/* Right: content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {article.categories.map((cat) => (
                      <span
                        key={cat.en}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium"
                      >
                        {cat[lang]}
                      </span>
                    ))}
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {article.readTime} {t.min_read}
                    </span>
                    <time
                      dateTime={article.date}
                      className="sm:hidden text-xs text-slate-400"
                    >
                      {formatDate(article.date)}
                    </time>
                  </div>

                  <h2 className="text-base font-semibold text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                    {article.title[lang]}
                  </h2>

                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {article.excerpt[lang]}
                  </p>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/${lang}/blog/${article.slug[lang]}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors group/link after:absolute after:inset-0 after:content-['']"
                    >
                      {t.read_more}
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                    <div className="flex gap-1.5">
                      {article.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearch(tag)}
                          className="relative z-10 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

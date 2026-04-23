import "./globals.css";
import { Geist } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 — Page introuvable · Zapia",
  description: "Cette page n'existe pas.",
};

export default function NotFound() {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`} style={{ background: "#020617" }}>
      <body className="min-h-full text-white overflow-x-hidden" style={{ background: "#020617", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <main className="relative flex min-h-screen flex-col items-center justify-center px-4">
          {/* Background gradient blobs */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-cyan-600/10 blur-3xl" />
          </div>

          {/* Grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo */}
            <Link href="/" className="mb-12 flex items-center gap-2 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%)" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">zapia</span>
            </Link>

            {/* 404 number */}
            <p
              className="text-8xl sm:text-[10rem] font-extrabold tracking-tighter leading-none mb-4 select-none"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Page introuvable
            </h1>
            <p className="text-slate-400 text-base max-w-sm mb-10 leading-relaxed">
              La page que vous recherchez n&rsquo;existe pas ou a été déplacée.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base shadow-xl shadow-indigo-500/30 hover:opacity-90 hover:scale-105 transition-all"
              style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%)" }}
            >
              Retour à l&rsquo;accueil
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

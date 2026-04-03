import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar t={dict.nav} lang={lang} />
      <main className="bg-slate-950 min-h-screen">{children}</main>
      <Footer t={dict.footer} lang={lang} />
    </>
  );
}

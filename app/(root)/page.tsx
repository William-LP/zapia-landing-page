import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Performance from "@/components/Performance";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getDictionary } from "../[lang]/dictionaries";

export default async function Home() {
  const dict = await getDictionary("fr");

  return (
    <>
      <Navbar t={dict.nav} lang="fr" />
      <main>
        <Hero t={dict.hero} />
        <Features t={dict.features} />
        <Performance t={dict.performance} />
        <Pricing t={dict.pricing} />
        <FAQ t={dict.faq} />
        <CTA t={dict.cta} />
      </main>
      <Footer t={dict.footer} />
    </>
  );
}

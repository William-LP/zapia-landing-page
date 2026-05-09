import Link from "next/link";
import { AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

type Lang = "en" | "fr";

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      {children}
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-slate-900 mt-12 mb-4 leading-snug">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-slate-700 leading-relaxed mb-4 text-[15px]">
      {children}
    </p>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2 mb-6 text-[15px] text-slate-700">{children}</ul>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-3 rounded-xl border p-4 mb-6 text-sm leading-relaxed ${type === "warning"
        ? "bg-amber-50 border-amber-200 text-amber-900"
        : "bg-indigo-50 border-indigo-100 text-indigo-900"
        }`}
    >
      <AlertTriangle
        className={`w-4 h-4 shrink-0 mt-0.5 ${type === "warning" ? "text-amber-500" : "text-indigo-500"
          }`}
      />
      <span>{children}</span>
    </div>
  );
}

function InlineLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500 underline underline-offset-2 transition-colors"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <ExternalLink className="w-3 h-3" />}
    </Link>
  );
}

export const toc = {
  en: [
    { id: "why-it-matters", label: "Why your domain matters" },
    { id: "future-proof", label: "Choose a future-proof name" },
    { id: "short-and-memorable", label: "Keep it short and memorable" },
    { id: "brandability", label: "Brandability over keywords" },
    { id: "tld", label: "Pick the right TLD" },
    { id: "trust-email", label: "Trust & email deliverability" },
    { id: "trademarks", label: "Check trademark conflicts" },
    { id: "social-handles", label: "Secure social handles" },
    { id: "international", label: "Think internationally" },
    { id: "variants", label: "Buy close variants" },
    { id: "availability", label: "Verify availability" },
    { id: "history", label: "Check domain history" },
    { id: "checklist", label: "Final checklist" },
  ],
  fr: [
    { id: "why-it-matters", label: "Pourquoi votre domaine compte" },
    { id: "future-proof", label: "Un nom tourné vers l'avenir" },
    { id: "short-and-memorable", label: "Court et mémorable" },
    { id: "brandability", label: "Marque plutôt que mots-clés" },
    { id: "tld", label: "Choisir la bonne extension" },
    { id: "trust-email", label: "Confiance & délivrabilité email" },
    { id: "trademarks", label: "Vérifier les marques déposées" },
    { id: "social-handles", label: "Réserver vos noms de compte" },
    { id: "international", label: "Penser à l'international" },
    { id: "variants", label: "Acheter les variantes proches" },
    { id: "availability", label: "Vérifier la disponibilité" },
    { id: "history", label: "Vérifier l'historique du domaine" },
    { id: "checklist", label: "Checklist finale" },
  ],
};

export default function DomainNameGuideContent({ lang }: { lang: Lang }) {
  if (lang === "fr") return <ContentFR />;
  return <ContentEN />;
}

function ContentEN() {
  return (
    <div>
      <Section id="why-it-matters">
        <H2>1. Why your domain matters</H2>
        <P>
          Your domain name is often the first thing people see before they know
          anything about your business. It appears on every email you send,
          every business card, every invoice, every ad. Unlike most things in a
          business, it's genuinely hard to change — switching domains means
          losing SEO equity, rebuilding trust, and notifying every platform,
          partner, and customer.
        </P>
        <P>
          Get it right the first time. A few hours of research before buying
          can save you years of regret.
        </P>
      </Section>

      <Section id="future-proof">
        <H2>2. Choose a future-proof name</H2>
        <P>
          The most common mistake founders make is naming their domain after
          something too specific — a city, a technology, a product category, or
          a niche audience. It feels right today, but it quietly traps you.
        </P>
        <Callout type="warning">
          Naming your restaurant <strong>bordeaux-burgers.com</strong> makes
          expansion to Paris awkward. Naming your baby clothing boutique{" "}
          <strong>baby-clothes-shop.com</strong> becomes a liability the day you
          want to sell to older kids or teenagers too.
        </Callout>
        <P>
          Ask yourself: where do I want this business to be in five to ten
          years? If your domain ties you to a location, a tool, or a single
          service, pick something more open. A good domain grows with your
          company, not against it.
        </P>
        <Ul>
          <Li>Avoid city names unless hyper-local is a permanent strategy</Li>
          <Li>
            Avoid names tied to one product or service — what if your offer
            evolves?
          </Li>
          <Li>
            Avoid using your own name if you plan to sell the business one day
            — a buyer won't want a brand built around someone else's identity
          </Li>
          <Li>Avoid trendy buzzwords that may date your brand in a few years</Li>
        </Ul>
      </Section>

      <Section id="short-and-memorable">
        <H2>3. Keep it short and memorable</H2>
        <P>
          Imagine someone hears your domain name mentioned in a podcast or in
          passing. Can they spell it immediately? If not, you've already lost
          traffic.
        </P>
        <Ul>
          <Li>
            Aim for under 15 characters — shorter is almost always better
          </Li>
          <Li>
            Avoid hyphens: they're invisible in conversation and easy to forget
          </Li>
          <Li>
            Avoid numbers: people won't know if it's "4" or "four" or "for"
          </Li>
          <Li>Avoid double letters and unusual spellings</Li>
          <Li>
            Test it: say it out loud — would someone unfamiliar know how to type
            it?
          </Li>
        </Ul>
        <P>
          With voice search and AI assistants increasingly mediating how people
          find businesses, a domain that's easy to say clearly is more valuable
          than ever.
        </P>
      </Section>

      <Section id="brandability">
        <H2>4. Think brandability, not keywords</H2>
        <P>
          A decade ago, owning <em>cheap-plumber-london.com</em> could give you
          a meaningful SEO boost. That era is largely over. Google has
          de-weighted exact-match keyword domains and rewards content quality,
          authority, and trust instead.
        </P>
        <P>
          A memorable, distinctive brand name will outperform a keyword-stuffed
          one over time — because people search for it directly, link to it
          willingly, and remember it. Think <em>zapia.fr</em>, not{" "}
          <em>managed-digital-infrastructure-france.com</em>.
        </P>
        <Callout>
          Short, invented, or abstract brand names are often the most
          defensible and scalable in the long run.
        </Callout>
      </Section>

      <Section id="tld">
        <H2>5. Pick the right TLD</H2>
        <P>
          The TLD is the extension at the end of a domain name — the{" "}
          <em>.com</em>, <em>.fr</em>, <em>.io</em>, and so on. Good news
          first: Google has stated that all TLDs are treated equally for ranking
          purposes. A <em>.io</em>, <em>.co</em>, or{" "}
          <em>.agency</em> domain won't hurt your SEO compared to a{" "}
          <em>.com</em>.
        </P>
        <P>
          The real problem is user trust and usability — not algorithms. When
          most people hear a domain without context, they default to typing{" "}
          <em>.com</em> or their country's TLD (<em>.fr</em>, <em>.de</em>,{" "}
          <em>.co.uk</em>). Anything else creates friction.
        </P>
        <Ul>
          <Li>
            <strong>.com</strong> remains the gold standard globally — when in
            doubt, choose it
          </Li>
          <Li>
            Country TLDs (<strong>.fr</strong>, <strong>.de</strong>,{" "}
            <strong>.co.uk</strong>) signal local credibility and are trusted by
            local audiences
          </Li>
          <Li>
            New gTLDs (<strong>.io</strong>, <strong>.xyz</strong>,{" "}
            <strong>.shop</strong>) are acceptable in tech or startup contexts,
            but carry risk outside those niches
          </Li>
          <Li>
            Avoid exotic TLDs (<strong>.ninja</strong>, <strong>.biz</strong>,{" "}
            <strong>.info</strong>) — they can trigger spam filters and erode
            trust
          </Li>
        </Ul>
      </Section>

      <Section id="trust-email">
        <H2>6. Trust and email deliverability</H2>
        <P>
          Your TLD choice doesn't just affect your website — it directly impacts
          your email reputation. Some mail servers apply stricter filtering to
          unusual TLDs, meaning your proposals, invoices, and onboarding emails
          could silently land in spam.
        </P>
        <P>
          Beyond the TLD, sending business emails from a{" "}
          <em>@gmail.com</em> or <em>@hotmail.com</em> address signals to
          recipients that you're not fully set up as a legitimate business.
          Clients notice. It affects whether they open your email, whether they
          trust your quote, and whether they feel confident paying an invoice
          from an address that doesn't match your company name.
        </P>
        <P>
          We cover this in detail in our article:{" "}
          <InlineLink href="/en/blog/why-use-a-professional-domain-email">
            Why @yourcompany.com beats @gmail.com for business
          </InlineLink>
          .
        </P>
      </Section>

      <Section id="trademarks">
        <H2>7. Check trademark conflicts</H2>
        <P>
          Registering a domain doesn't give you the right to use the name if
          it's already trademarked. Companies have had to rebrand entirely — at
          enormous cost — because they didn't check before launching.
        </P>
        <P>Before buying, run a quick search on:</P>
        <Ul>
          <Li>
            <InlineLink href="https://euipo.europa.eu/eSearch/" external>
              EUIPO
            </InlineLink>{" "}
            for EU trademark conflicts
          </Li>
          <Li>
            <InlineLink href="https://www.inpi.fr" external>
              INPI
            </InlineLink>{" "}
            for France specifically
          </Li>
          <Li>
            <InlineLink href="https://www.uspto.gov/trademarks/search" external>
              USPTO
            </InlineLink>{" "}
            if you plan to operate in the US
          </Li>
        </Ul>
        <P>
          Also check whether a company with the same name already exists and is
          operating in your sector, even without a registered trademark —
          passing-off claims can be costly too.
        </P>
      </Section>

      <Section id="social-handles">
        <H2>8. Secure social media handles</H2>
        <P>
          Before buying a domain, check whether the matching username is
          available on the platforms that matter for your business. Inconsistent
          handles across platforms fragment your brand and make you harder to
          find.
        </P>
        <Ul>
          <Li>LinkedIn (company page)</Li>
          <Li>Instagram</Li>
          <Li>X (formerly Twitter)</Li>
          <Li>TikTok (if relevant to your audience)</Li>
          <Li>GitHub (if you're a tech company)</Li>
          <Li>YouTube</Li>
        </Ul>
        <P>
          If a handle is taken but the domain is free, it's worth reconsidering
          the name — or at minimum, secure what you can before someone else does
          once you go public.
        </P>
      </Section>

      <Section id="international">
        <H2>9. Think internationally</H2>
        <P>
          Even if you're starting locally, consider how your name travels. Some
          words are perfectly neutral in one language and embarrassing or
          offensive in another. Several global brands have learned this the hard
          way — Mitsubishi had to rename their SUV the Pajero to{" "}
          <em>Montero</em> in Spanish-speaking markets, because "pajero" is a
          crude insult in Spanish. Rolls-Royce ran into a similar problem with
          the <em>Silver Mist</em>: "Mist" means manure in German.
        </P>
        <Ul>
          <Li>
            Make sure the name is easy to pronounce in the languages of your
            target markets
          </Li>
          <Li>
            Check for unintended meanings in French, English, Spanish, German,
            or any other relevant language
          </Li>
          <Li>
            Avoid letter combinations that are unpronounceable or ambiguous in
            other alphabets
          </Li>
        </Ul>
      </Section>

      <Section id="variants">
        <H2>10. Buy close variants defensively</H2>
        <P>
          Once you've decided on a name, consider buying the most common
          misspellings and alternative TLDs — especially if your brand name is
          genuinely valuable. This isn't paranoia; domain squatting is a real
          industry.
        </P>
        <Ul>
          <Li>
            If you buy <em>yourcompany.fr</em>, consider also buying{" "}
            <em>yourcompany.com</em>
          </Li>
          <Li>
            Buy obvious misspellings if the domain is hard to spell (and
            consider that a signal to simplify your name)
          </Li>
          <Li>
            Redirect all variants to your main domain — it captures stray
            traffic and prevents competitors from squatting
          </Li>
        </Ul>
        <P>
          Domains typically cost €10–15/year each. A few defensive registrations
          are cheap insurance against a real business risk.
        </P>
      </Section>

      <Section id="availability">
        <H2>11. Verify availability everywhere</H2>
        <P>
          Checking that a domain is available to register is the obvious step —
          but make sure you do it properly. Searching on a registrar's website
          can sometimes trigger domain speculation bots that register the domain
          before you do.
        </P>
        <Callout>
          You can check domain availability directly with our tool:{" "}
          <InlineLink href="#">Zapia domain availability checker</InlineLink> —
          we'll verify instantly whether your domain is free to register.
        </Callout>
        <P>Also check:</P>
        <Ul>
          <Li>
            That the business name itself is available as a company name in your
            country
          </Li>
          <Li>
            That the name isn't already in use by a competitor in your sector,
            even without a domain
          </Li>
        </Ul>
      </Section>

      <Section id="history">
        <H2>12. Check domain history</H2>
        <P>
          Not all available domains are clean. A previously used domain can
          carry spam history, Google penalties, or a backlink profile full of
          shady websites — all of which will affect your new site from day one.
        </P>
        <Ul>
          <Li>
            Check{" "}
            <InlineLink href="https://web.archive.org" external>
              web.archive.org
            </InlineLink>{" "}
            to see what the domain was previously used for
          </Li>
          <Li>
            Use a backlink tool (Ahrefs, Majestic, SEMrush) to assess the
            quality of existing inbound links
          </Li>
          <Li>
            Look up the domain in Google — if it has an existing index, check
            what pages appear
          </Li>
          <Li>
            Check spam blacklists using tools like MXToolbox to verify the
            domain's email reputation
          </Li>
        </Ul>
        <P>
          If the domain has a troubling history, it's almost always better to
          choose a different name than to inherit someone else's problems.
        </P>
      </Section>

      <Section id="checklist">
        <H2>13. Final checklist before buying</H2>
        <P>
          Run through this before committing to any domain:
        </P>
        <Ul>
          <Li>Under 15 characters</Li>
          <Li>Easy to spell after hearing it out loud</Li>
          <Li>No hyphens, numbers, or double letters</Li>
          <Li>Future-proof — not tied to one city, tool, or product</Li>
          <Li>Works as a brand, not just a keyword</Li>
          <Li>
            TLD is trusted by your target audience (.com or country TLD
            preferred)
          </Li>
          <Li>Trademark search is clear in all target markets</Li>
          <Li>Social media handles are available on key platforms</Li>
          <Li>No negative meanings in relevant languages</Li>
          <Li>Close variants and misspellings are available (and ideally bought)</Li>
          <Li>Domain availability confirmed without triggering speculation bots</Li>
          <Li>Domain history is clean — no penalties, spam, or shady links</Li>
          <Li>A professional email at this domain will be possible from day one</Li>
        </Ul>
      </Section>
    </div>
  );
}

function ContentFR() {
  return (
    <div>
      <Section id="why-it-matters">
        <H2>1. Pourquoi votre domaine compte</H2>
        <P>
          Votre nom de domaine est souvent la première chose que les gens voient
          de votre entreprise, avant même de savoir ce que vous faites. Il
          apparaît sur chaque email, chaque carte de visite, chaque facture,
          chaque publicité. Contrairement à la plupart des décisions
          d'entreprise, il est réellement difficile à changer — migrer vers un
          nouveau domaine signifie perdre du capital SEO, reconstruire la
          confiance, et notifier chaque plateforme, partenaire et client.
        </P>
        <P>
          Faites-le bien du premier coup. Quelques heures de recherche avant
          d'acheter peuvent vous éviter des années de regrets.
        </P>
      </Section>

      <Section id="future-proof">
        <H2>2. Choisir un nom tourné vers l'avenir</H2>
        <P>
          L'erreur la plus courante est de nommer son domaine d'après quelque
          chose de trop spécifique — une ville, une technologie, une catégorie
          de produit ou une audience de niche. Ça semble juste aujourd'hui,
          mais ça vous piège silencieusement.
        </P>
        <Callout type="warning">
          Appeler votre restaurant <strong>burgers-bordeaux.fr</strong> rend
          l'expansion à Paris maladroite. Appeler votre boutique{" "}
          <strong>vetements-bebe.fr</strong> devient un handicap le jour où vous
          voulez aussi vendre des vêtements pour enfants plus grands ou des
          ados.
        </Callout>
        <P>
          Demandez-vous : où est-ce que je veux que cette entreprise soit dans
          cinq à dix ans ? Si votre domaine vous lie à un lieu, un outil ou un
          service unique, choisissez quelque chose de plus ouvert. Un bon
          domaine évolue avec votre entreprise, pas contre elle.
        </P>
        <Ul>
          <Li>
            Évitez les noms de ville sauf si l'ancrage local est une stratégie
            permanente
          </Li>
          <Li>
            Évitez les noms de produits trop précis (un plat, une gamme, un
            service spécifique) qui ne vous définiront peut-être plus dans 3 ans
          </Li>
          <Li>
            Évitez d'utiliser votre prénom ou nom si vous envisagez de revendre
            l'entreprise — un repreneur ne voudra pas d'une marque attachée à
            l'identité de quelqu'un d'autre
          </Li>
          <Li>
            Évitez les buzzwords tendance qui peuvent dater votre marque en
            quelques années
          </Li>
        </Ul>
      </Section>

      <Section id="short-and-memorable">
        <H2>3. Court et mémorable</H2>
        <P>
          Imaginez que quelqu'un entende votre nom de domaine dans un podcast ou
          en passant. Peut-il l'orthographier immédiatement ? Sinon, vous avez
          déjà perdu du trafic.
        </P>
        <Ul>
          <Li>
            Visez moins de 15 caractères — plus c'est court, presque toujours
            mieux c'est
          </Li>
          <Li>
            Évitez les tirets : ils sont invisibles à l'oral et faciles à
            oublier
          </Li>
          <Li>
            Évitez les chiffres : on ne saura pas si c'est "4" ou "quatre" ou
            "for"
          </Li>
          <Li>Évitez les lettres doubles et les orthographes inhabituelles</Li>
          <Li>
            Testez-le : dites-le à voix haute — quelqu'un qui ne le connaît pas
            saurait-il le taper ?
          </Li>
        </Ul>
        <P>
          Avec la recherche vocale et les assistants IA qui jouent un rôle
          croissant dans la façon dont les gens trouvent des entreprises, un
          domaine facile à prononcer clairement est plus précieux que jamais.
        </P>
      </Section>

      <Section id="brandability">
        <H2>4. La marque plutôt que les mots-clés</H2>
        <P>
          Il y a dix ans, posséder <em>plombier-pas-cher-paris.fr</em> pouvait
          vous donner un avantage SEO significatif. Cette époque est largement
          révolue. Google a réduit le poids des domaines à correspondance exacte
          de mots-clés et récompense désormais la qualité du contenu, l'autorité
          et la confiance.
        </P>
        <P>
          Un nom de marque mémorable et distinctif surpassera un nom bourré de
          mots-clés sur le long terme.
        </P>
        <Callout>
          Les noms de marque courts, inventés ou abstraits sont souvent les plus
          défendables et évolutifs sur le long terme.
        </Callout>
      </Section>

      <Section id="tld">
        <H2>5. Choisir la bonne extension (TLD)</H2>
        <P>
          Le TLD, c'est l'extension à la fin du nom de domaine — le{" "}
          <em>.com</em>, le <em>.fr</em>, le <em>.io</em>, etc. </P>
        <P> Bonne nouvelle
          d'abord : Google a confirmé que tous les TLD sont traités à égalité
          pour le référencement. Un domaine en{" "}
          <em>.io</em>, <em>.co</em> ou <em>.agency</em> ne pénalisera pas
          votre SEO par rapport à un <em>.com</em>.
        </P>
        <P>
          Le vrai problème, c'est la confiance des utilisateurs et l'ergonomie
          — pas les algorithmes. Quand la plupart des gens entendent un domaine
          sans contexte, ils tapent instinctivement <em>.com</em> ou le TLD de
          leur pays (<em>.fr</em>, <em>.de</em>, <em>.co.uk</em>). Tout autre
          TLD crée des frictions.
        </P>
        <Ul>
          <Li>
            <strong>.com</strong> reste la référence mondiale — dans le doute,
            choisissez-le
          </Li>
          <Li>
            Les TLD nationaux (<strong>.fr</strong>, <strong>.de</strong>,{" "}
            <strong>.co.uk</strong>) signalent une crédibilité locale et sont
            appréciés des audiences locales
          </Li>
          <Li>
            Les nouveaux gTLD (<strong>.io</strong>, <strong>.xyz</strong>,{" "}
            <strong>.shop</strong>) sont acceptables dans des contextes tech ou
            startup, mais risqués en dehors
          </Li>
          <Li>
            Évitez les TLD exotiques (<strong>.ninja</strong>,{" "}
            <strong>.biz</strong>, <strong>.info</strong>) — ils peuvent
            déclencher des filtres anti-spam et éroder la confiance
          </Li>
        </Ul>
      </Section>

      <Section id="trust-email">
        <H2>6. Confiance et délivrabilité email</H2>
        <P>
          Votre choix de TLD n'affecte pas seulement votre site — il impacte
          directement votre réputation email. Certains serveurs de messagerie
          appliquent des filtres plus stricts aux TLD inhabituels, ce qui
          signifie que vos devis, factures et emails d'onboarding pourraient
          silencieusement atterrir dans les spams.
        </P>
        <P>
          Au-delà du TLD, envoyer des emails professionnels depuis une adresse{" "}
          <em>@gmail.com</em> ou <em>@hotmail.com</em> signale à vos
          destinataires que vous n'êtes pas totalement installé en tant
          qu'entreprise sérieuse. Les clients le remarquent. Cela influence
          l'ouverture de vos emails, la confiance envers vos devis, et leur
          sentiment de sécurité au moment de payer une facture envoyée depuis
          une adresse qui ne correspond pas à votre nom d'entreprise.
        </P>
        <P>
          On développe ce sujet en détail dans notre article :{" "}
          <InlineLink href="/fr/blog/pourquoi-utiliser-une-adresse-email-professionnelle">
            Pourquoi @votre-entreprise.fr vaut mieux que @gmail.com
          </InlineLink>
          .
        </P>
      </Section>

      <Section id="trademarks">
        <H2>7. Vérifier les conflits de marques déposées</H2>
        <P>
          Enregistrer un domaine ne vous donne pas le droit d'utiliser ce nom
          s'il est déjà déposé comme marque. Des entreprises ont dû se
          rebrander entièrement — à un coût considérable — parce qu'elles
          n'avaient pas vérifié avant de lancer leur activité.
        </P>
        <P>Avant d'acheter, faites une recherche rapide sur :</P>
        <Ul>
          <Li>
            <InlineLink href="https://euipo.europa.eu/eSearch/" external>
              EUIPO
            </InlineLink>{" "}
            pour les conflits de marques au niveau européen
          </Li>
          <Li>
            <InlineLink href="https://www.inpi.fr" external>
              INPI
            </InlineLink>{" "}
            spécifiquement pour la France
          </Li>
          <Li>
            <InlineLink href="https://www.uspto.gov/trademarks/search" external>
              USPTO
            </InlineLink>{" "}
            si vous prévoyez d'opérer aux États-Unis
          </Li>
        </Ul>
        <P>
          Vérifiez également si une entreprise portant le même nom existe déjà
          et opère dans votre secteur, même sans marque déposée — une action en
          concurrence déloyale peut coûter cher aussi.
        </P>
      </Section>

      <Section id="social-handles">
        <H2>8. Réserver vos noms de compte sur les réseaux sociaux</H2>
        <P>
          Avant d'acheter un domaine, vérifiez si le nom de compte correspondant
          est disponible sur les plateformes importantes pour votre activité. Des
          noms de compte incohérents d'une plateforme à l'autre fragmentent votre
          marque et vous rendent plus difficile à trouver.
        </P>
        <Ul>
          <Li>LinkedIn (page entreprise)</Li>
          <Li>Instagram</Li>
          <Li>X (anciennement Twitter)</Li>
          <Li>TikTok (si pertinent pour votre audience)</Li>
          <Li>GitHub (si vous êtes une entreprise tech)</Li>
          <Li>YouTube</Li>
        </Ul>
        <P>
          Si un nom de compte est déjà pris mais que le domaine est libre, ça
          vaut la peine de reconsidérer le nom — ou au minimum, sécurisez ce que
          vous pouvez avant que quelqu'un d'autre le prenne une fois que vous
          serez visible.
        </P>
      </Section>

      <Section id="international">
        <H2>9. Penser à l'international</H2>
        <P>
          Même si vous démarrez localement, réfléchissez à comment votre nom
          voyage. Certains mots sont parfaitement neutres dans une langue et
          embarrassants ou offensants dans une autre. Plusieurs grandes marques
          l'ont appris à leurs dépens — Mitsubishi a dû renommer son 4x4 Pajero
          en <em>Montero</em> sur les marchés hispanophones, car "pajero" est
          une insulte grossière en espagnol. Rolls-Royce a rencontré un problème
          similaire avec la <em>Silver Mist</em> : "Mist" signifie fumier en
          allemand.
        </P>
        <Ul>
          <Li>
            Assurez-vous que le nom est facile à prononcer dans les langues de
            vos marchés cibles
          </Li>
          <Li>
            Vérifiez les significations involontaires en français, anglais,
            espagnol, allemand ou toute autre langue pertinente
          </Li>
          <Li>
            Évitez les combinaisons de lettres imprononçables ou ambiguës dans
            d'autres alphabets
          </Li>
        </Ul>
      </Section>

      <Section id="variants">
        <H2>10. Acheter les variantes proches à titre défensif</H2>
        <P>
          Une fois votre nom choisi, envisagez d'acheter les fautes
          d'orthographe les plus courantes et les TLD alternatifs — surtout si
          votre nom de marque a une vraie valeur. Ce n'est pas de la paranoïa ;
          le cybersquatting est un vrai phénomène.
        </P>
        <Ul>
          <Li>
            Si vous achetez <em>votre-entreprise.fr</em>, envisagez aussi{" "}
            <em>votre-entreprise.com</em>
          </Li>
          <Li>
            Achetez les fautes d'orthographe évidentes si le domaine est
            difficile à épeler (et considérez ça comme un signal pour simplifier
            votre nom)
          </Li>
          <Li>
            Redirigez toutes les variantes vers votre domaine principal — ça
            capture le trafic égaré et empêche les concurrents de squatter
          </Li>
        </Ul>
        <P>
          Les domaines coûtent généralement 10 à 15 € par an. Quelques
          enregistrements défensifs sont une assurance bon marché contre un
          risque business réel.
        </P>
      </Section>

      <Section id="availability">
        <H2>11. Vérifier la disponibilité partout</H2>
        <P>
          Vérifier qu'un domaine est disponible à l'enregistrement est l'étape
          évidente — mais faites-le correctement. Rechercher sur le site d'un
          registrar peut parfois déclencher des bots spéculatifs qui
          enregistrent le domaine avant vous.
        </P>
        <Callout>
          Vous pouvez vérifier la disponibilité d'un domaine directement avec
          notre outil :{" "}
          <InlineLink href="#">
            Vérificateur de disponibilité de domaine Zapia
          </InlineLink>{" "}
          — nous vous dirons instantanément si votre domaine est libre à
          l'enregistrement.
        </Callout>
        <P>Vérifiez également :</P>
        <Ul>
          <Li>
            Que le nom de l'entreprise est disponible comme dénomination sociale
            dans votre pays
          </Li>
          <Li>
            Que le nom n'est pas déjà utilisé par un concurrent dans votre
            secteur, même sans domaine
          </Li>
        </Ul>
      </Section>

      <Section id="history">
        <H2>12. Vérifier l'historique du domaine</H2>
        <P>
          Tous les domaines disponibles ne sont pas propres. Un domaine
          précédemment utilisé peut avoir un historique de spam, des pénalités
          Google, ou un profil de liens entrants plein de sites douteux — tout
          cela affectera votre nouveau site dès le premier jour.
        </P>
        <Ul>
          <Li>
            Consultez{" "}
            <InlineLink href="https://web.archive.org" external>
              web.archive.org
            </InlineLink>{" "}
            pour voir à quoi le domaine était précédemment utilisé
          </Li>
          <Li>
            Utilisez un outil de backlinks (Ahrefs, Majestic, SEMrush) pour
            évaluer la qualité des liens entrants existants
          </Li>
          <Li>
            Recherchez le domaine sur Google — s'il a un index existant,
            vérifiez quelles pages apparaissent
          </Li>
          <Li>
            Vérifiez les listes noires anti-spam avec des outils comme MXToolbox
            pour contrôler la réputation email du domaine
          </Li>
        </Ul>
        <P>
          Si le domaine a un historique problématique, il vaut presque toujours
          mieux choisir un autre nom plutôt que d'hériter des problèmes de
          quelqu'un d'autre.
        </P>
      </Section>

      <Section id="checklist">
        <H2>13. Checklist finale avant d'acheter</H2>
        <P>Parcourez cette liste avant de valider tout achat de domaine :</P>
        <Ul>
          <Li>Moins de 15 caractères</Li>
          <Li>Facile à épeler après l'avoir entendu à l'oral</Li>
          <Li>Pas de tirets, chiffres ou lettres doubles</Li>
          <Li>
            Tourné vers l'avenir — pas lié à une ville, un outil ou un produit
          </Li>
          <Li>Fonctionne comme une marque, pas seulement comme un mot-clé</Li>
          <Li>
            Le TLD est de confiance pour votre audience cible (.com ou TLD
            national de préférence)
          </Li>
          <Li>
            La recherche de marques déposées est claire dans tous les marchés
            visés
          </Li>
          <Li>
            Les noms de compte sur les réseaux sociaux sont disponibles sur les
            plateformes clés
          </Li>
          <Li>Pas de signification négative dans les langues pertinentes</Li>
          <Li>
            Les variantes proches et fautes d'orthographe sont disponibles (et
            idéalement achetées)
          </Li>
          <Li>
            La disponibilité du domaine a été confirmée sans déclencher de bots
            spéculatifs
          </Li>
          <Li>
            L'historique du domaine est propre — pas de pénalités, spam ou
            liens douteux
          </Li>
          <Li>
            Un email professionnel à ce domaine sera possible dès le premier
            jour
          </Li>
        </Ul>
      </Section>
    </div>
  );
}

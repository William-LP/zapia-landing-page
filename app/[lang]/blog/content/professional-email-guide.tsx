import { CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

type Lang = "en" | "fr";

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24">{children}</section>;
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

function Comparison({
  bad,
  good,
}: {
  bad: string;
  good: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
        <span className="text-lg">✗</span>
        <code className="text-sm font-mono text-red-700">{bad}</code>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
        <span className="text-lg">✓</span>
        <code className="text-sm font-mono text-emerald-700">{good}</code>
      </div>
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
    { id: "first-trust-signal", label: "Your email is a trust signal" },
    { id: "credibility", label: "Professional credibility" },
    { id: "brand-recognition", label: "Better brand recognition" },
    { id: "deliverability", label: "Deliverability & spam trust" },
    { id: "own-your-identity", label: "You own your identity" },
    { id: "team-scaling", label: "Easier team scaling" },
    { id: "security", label: "More secure and manageable" },
    { id: "partnerships", label: "Better for partnerships" },
    { id: "consistency", label: "Consistency across your ecosystem" },
    { id: "impersonation", label: "Prevent impersonation confusion" },
    { id: "long-term-asset", label: "A long-term business asset" },
    { id: "conclusion", label: "Conclusion" },
  ],
  fr: [
    { id: "first-trust-signal", label: "Votre email, premier signal de confiance" },
    { id: "credibility", label: "Crédibilité professionnelle" },
    { id: "brand-recognition", label: "Meilleure reconnaissance de marque" },
    { id: "deliverability", label: "Délivrabilité & confiance anti-spam" },
    { id: "own-your-identity", label: "Vous possédez votre identité" },
    { id: "team-scaling", label: "Montée en charge facilitée" },
    { id: "security", label: "Plus sécurisé et gérable" },
    { id: "partnerships", label: "Meilleur pour les partenariats" },
    { id: "consistency", label: "Cohérence de votre écosystème" },
    { id: "impersonation", label: "Éviter la confusion d'usurpation" },
    { id: "long-term-asset", label: "Un actif commercial à long terme" },
    { id: "conclusion", label: "Conclusion" },
  ],
};

export default function ProfessionalEmailGuideContent({ lang }: { lang: Lang }) {
  if (lang === "fr") return <ContentFR />;
  return <ContentEN />;
}

function ContentEN() {
  return (
    <div>
      <Section id="first-trust-signal">
        <H2>Your email address is your first trust signal</H2>
        <P>
          Before a customer reads your pitch, before they visit your website,
          before they open your proposal — they see your email address. It takes
          a fraction of a second to form a first impression, and that impression
          shapes whether they take you seriously.
        </P>
        <P>
          An email address is not just a delivery mechanism. It's a statement
          about your business. And right now, if you're using a free provider
          for business communication, that statement is working against you.
        </P>
      </Section>

      <Section id="credibility">
        <H2>1. Professional credibility</H2>
        <P>
          The difference between a branded domain email and a free one is
          immediately visible — and the perception gap is enormous.
        </P>
        <Comparison
          bad="yourcompany@gmail.com"
          good="contact@yourcompany.com"
        />
        <P>
          The Gmail address suggests a side project or a very early-stage
          operation. The branded address suggests a real company with real
          infrastructure. That judgment happens automatically, in the time it
          takes to read twelve characters.
        </P>
        <P>
          This matters even more in certain industries. In B2B, healthcare,
          finance, legal services, and any context where you're selling to
          companies rather than consumers, a free email address can be an
          automatic disqualifier. Procurement teams, legal departments, and
          enterprise buyers often won't engage with vendors who can't maintain
          basic professional signals.
        </P>
        <Callout type="warning">
          Agencies, consultants, and freelancers who invoice from a Gmail
          address are quietly flagging that they haven't invested in their own
          business infrastructure — the thing they're selling to others.
        </Callout>
      </Section>

      <Section id="brand-recognition">
        <H2>2. Better brand recognition</H2>
        <P>
          Every email you send is a touchpoint. With a branded domain, every
          touchpoint reinforces your company name. Recipients see{" "}
          <em>hello@yourcompany.com</em> in their inbox, and they see{" "}
          <em>yourcompany</em> again. Over time, this compounds.
        </P>
        <Ul>
          <Li>
            People remember your brand name through repeated exposure — even
            passively, just by receiving your emails
          </Li>
          <Li>
            When they recommend you to someone, they already know your domain —
            which makes finding you easier
          </Li>
          <Li>
            Your email signature becomes a consistent branding element, not just
            contact information
          </Li>
        </Ul>
        <P>
          A Gmail address breaks this chain. It replaces your brand name with
          Google's. Every email reinforces Google, not you.
        </P>
      </Section>

      <Section id="deliverability">
        <H2>3. Deliverability and spam trust</H2>
        <P>
          Email deliverability is more nuanced than most people realise. Gmail
          itself has excellent infrastructure — the issue is not the technical
          quality of delivery, but the trust signals attached to your sender
          identity.
        </P>
        <P>
          When you own a domain and configure it correctly with SPF, DKIM, and
          DMARC records — three authentication standards that prove you are who
          you say you are — your emails carry stronger trust signals with
          receiving mail servers. This directly reduces the chance of landing in
          spam.
        </P>
        <Ul>
          <Li>
            <strong>SPF</strong> tells other servers which IP addresses are
            authorised to send email on behalf of your domain
          </Li>
          <Li>
            <strong>DKIM</strong> adds a cryptographic signature to every email,
            proving it hasn't been tampered with in transit
          </Li>
          <Li>
            <strong>DMARC</strong> defines what should happen if SPF or DKIM
            checks fail — and lets you receive reports on your domain's email
            activity
          </Li>
        </Ul>
        <P>
          Additionally, some corporate mail filters apply stricter rules to
          free email providers when used for outbound business communication.
          Your proposal or invoice may be silently deprioritised simply because
          of where it came from.
        </P>
        <Callout>
          At Zapia, we configure SPF, DKIM, and DMARC as part of every email
          setup — so you get strong deliverability from day one without needing
          to understand the technical details yourself.
        </Callout>
      </Section>

      <Section id="own-your-identity">
        <H2>4. You own your identity</H2>
        <P>
          If your business depends on <em>startupname@gmail.com</em>, you rely
          entirely on a third-party account. Google can lock, suspend, or
          terminate accounts. Policies change. Two-factor recovery fails.
          Things go wrong.
        </P>
        <P>
          With your own domain, your email identity is portable. You can move
          between providers without changing a single customer-facing address:
        </P>
        <Comparison
          bad="Locked to a Gmail account you don't control"
          good="hello@yourcompany.com — move to any provider, anytime"
        />
        <P>
          You can start on Google Workspace, move to Microsoft 365, switch to
          Proton Mail for Business, or any other provider — and your customers
          never notice. The address stays the same. The brand stays intact.
        </P>
      </Section>

      <Section id="team-scaling">
        <H2>5. Easier team scaling</H2>
        <P>
          A Gmail account is a personal account. It doesn't scale gracefully
          as your team grows. A custom domain gives you the ability to create
          structured, role-based addresses from day one:
        </P>
        <Ul>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">support@yourcompany.com</code> — customer service inbox</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">sales@yourcompany.com</code> — inbound leads</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">billing@yourcompany.com</code> — invoicing and payments</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">hiring@yourcompany.com</code> — recruitment</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">hello@yourcompany.com</code> — general contact</Li>
        </Ul>
        <P>
          These addresses can be shared mailboxes, distribution lists, or
          individual inboxes — all managed centrally. When a team member leaves,
          you reassign the address. No knowledge is lost, no thread goes dark,
          no customer ends up emailing someone who no longer works there.
        </P>
      </Section>

      <Section id="security">
        <H2>6. More secure and manageable</H2>
        <P>
          Business email platforms built around your own domain give you
          controls that a personal Gmail account simply doesn't:
        </P>
        <Ul>
          <Li>Centralised access control — add and remove team members instantly</Li>
          <Li>Enforce security policies across the whole organisation</Li>
          <Li>Offboard employees completely — revoke access in one place</Li>
          <Li>Set up aliases without creating full mailboxes</Li>
          <Li>Access audit logs to see who sent what and when</Li>
          <Li>Apply data retention policies for compliance</Li>
        </Ul>
        <P>
          When an employee leaves a company that runs on personal Gmail accounts,
          recovering business-critical email history is often impossible. With a
          managed domain email system, nothing leaves with the person.
        </P>
      </Section>

      <Section id="partnerships">
        <H2>7. Better for partnerships and fundraising</H2>
        <P>
          First impressions in business relationships are hard to reverse.
          Investors, suppliers, and enterprise partners receive hundreds of
          emails. When one of them comes from a free email address, it often
          gets mentally filed under "not yet serious."
        </P>
        <P>
          A domain email signals two things immediately: that you've committed
          to the business enough to set it up properly, and that you understand
          the basics of professional infrastructure. Neither of these is a big
          ask — but not having them raises questions.
        </P>
        <Callout type="warning">
          Several founders have reported VCs and angels asking about their email
          setup in due diligence. It's a small thing, but it shows up.
        </Callout>
      </Section>

      <Section id="consistency">
        <H2>8. Consistency across your ecosystem</H2>
        <P>
          Brand coherence comes from alignment across every touchpoint. When
          your website, your email, and your domain all share the same identity,
          it creates an impression of solidity and intentionality.
        </P>
        <Comparison
          bad="website: yourcompany.com — email: yourcompany@gmail.com"
          good="website: yourcompany.com — email: hello@yourcompany.com"
        />
        <P>
          The mismatched version creates a small but real cognitive friction.
          Customers may wonder whether the email is legitimate, whether the
          person they're speaking to is really from the company, or whether
          they're dealing with a different entity altogether.
        </P>
      </Section>

      <Section id="impersonation">
        <H2>9. Prevent impersonation confusion</H2>
        <P>
          A branded domain email makes it far easier for customers to verify
          they're communicating with you. If all your official communication
          comes from <em>@yourcompany.com</em>, anything that doesn't is
          immediately suspicious.
        </P>
        <Ul>
          <Li>
            Customers can verify your domain against your website — a simple
            trust check that free addresses don't support
          </Li>
          <Li>
            Phishing attempts are easier to spot when the real address is known
            and consistent
          </Li>
          <Li>
            Reduces the chance of customers being deceived by someone impersonating
            your brand via a lookalike free address
          </Li>
        </Ul>
      </Section>

      <Section id="long-term-asset">
        <H2>10. A long-term business asset</H2>
        <P>
          Your domain is not just a technical address. Over time, it accumulates
          trust, reputation, and deliverability history. It becomes part of your
          company's digital identity — and when combined with email, that
          identity extends into every relationship you build.
        </P>
        <P>
          If you ever sell the business, your domain and its associated email
          infrastructure are part of what transfers. A company with an
          established, coherent domain-based email system is simpler to hand
          over and more credible to acquire than one built on scattered personal
          accounts.
        </P>
      </Section>

      <Section id="conclusion">
        <H2>Conclusion</H2>
        <P>
          A professional domain email costs very little — often less than €5 per
          month per mailbox. The trust it creates is disproportionately
          valuable. It signals that you're serious, that you've thought about
          your business infrastructure, and that you treat the people you work
          with as professionals deserve to be treated.
        </P>
        <P>
          If you already have a domain, setting up email is the next logical
          step. If you don't have a domain yet, read our guide on{" "}
          <InlineLink href="/en/blog/how-to-choose-the-right-domain-name">
            how to choose the right domain name for your business
          </InlineLink>{" "}
          — your email address starts there.
        </P>
      </Section>
    </div>
  );
}

function ContentFR() {
  return (
    <div>
      <Section id="first-trust-signal">
        <H2>Votre adresse email est votre premier signal de confiance</H2>
        <P>
          Avant qu'un client lise votre présentation, avant qu'il visite votre
          site, avant qu'il ouvre votre devis — il voit votre adresse email.
          C'est un détail, mais un détail que les gens remarquent.
        </P>
        <P>
          Une adresse email n'est pas seulement un outil de communication. C'est
          une déclaration sur votre entreprise.
        </P>
      </Section>

      <Section id="credibility">
        <H2>1. Crédibilité professionnelle</H2>
        <P>
          La différence entre un email au nom de domaine de votre entreprise et
          une adresse gratuite est immédiatement visible — et l'écart de
          perception est énorme.
        </P>
        <Comparison
          bad="mon-entreprise@gmail.com"
          good="contact@mon-entreprise.com"
        />
        <P>
          L'adresse Gmail évoque un projet secondaire ou une activité très
          embryonnaire. L'adresse au nom de domaine évoque une vraie entreprise
          avec une vraie infrastructure. Ce jugement se forme automatiquement,
          le temps de lire douze caractères.
        </P>
        <P>
          C'est encore plus vrai dans certains secteurs. En B2B, en santé, en
          finance, dans les services juridiques, et dans tout contexte où vous
          vendez à des entreprises plutôt qu'à des particuliers, une adresse
          gratuite peut être un disqualificateur immédiat. Les équipes achats,
          les départements juridiques et les grands comptes refusent souvent
          d'engager des fournisseurs qui ne maintiennent pas ce signal
          professionnel de base.
        </P>
        <Callout type="warning">
          Les agences, consultants et freelances qui facturent depuis une
          adresse Gmail signalent discrètement qu'ils n'ont pas investi dans
          leur propre infrastructure — précisément ce qu'ils vendent à leurs
          clients.
        </Callout>
      </Section>

      <Section id="brand-recognition">
        <H2>2. Meilleure reconnaissance de marque</H2>
        <P>
          Chaque email que vous envoyez est un point de contact. Avec un domaine
          personnalisé, chaque contact renforce votre nom d'entreprise. Vos
          destinataires voient <em>hello@yourcompany.com</em> dans leur boîte, et
          ils voient <em>yourcompany</em> à nouveau. À la longue, cela se cumule.
        </P>
        <Ul>
          <Li>
            Les gens retiennent votre nom de marque par exposition répétée —
            même passivement, en recevant simplement vos emails
          </Li>
          <Li>
            Quand ils vous recommandent à quelqu'un, ils connaissent déjà votre
            domaine — ce qui facilite votre identification
          </Li>
          <Li>
            Votre signature email devient un élément de communication de marque
            cohérent, pas seulement des coordonnées
          </Li>
        </Ul>
        <P>
          Une adresse Gmail brise cette chaîne. Elle remplace votre nom de marque
          par celui de Google. Chaque email renforce Google, pas vous.
        </P>
      </Section>

      <Section id="deliverability">
        <H2>3. Délivrabilité et confiance anti-spam</H2>
        <P>
          La délivrabilité des emails est plus nuancée que la plupart des gens ne
          le pensent. Gmail dispose d'une excellente infrastructure — le problème
          n'est pas la qualité technique de l'acheminement, mais les signaux de
          confiance associés à votre identité d'expéditeur.
        </P>
        <P>
          Lorsque vous possédez un domaine et le configurez correctement avec les
          enregistrements SPF, DKIM et DMARC — trois standards d'authentification
          qui prouvent que vous êtes bien celui que vous prétendez être — vos
          emails portent des signaux de confiance plus forts auprès des serveurs
          de messagerie destinataires. Cela réduit directement le risque
          d'atterrir dans les spams.
        </P>
        <Ul>
          <Li>
            <strong>SPF</strong> indique aux autres serveurs quelles adresses IP
            sont autorisées à envoyer des emails au nom de votre domaine
          </Li>
          <Li>
            <strong>DKIM</strong> ajoute une signature cryptographique à chaque
            email, prouvant qu'il n'a pas été altéré en transit
          </Li>
          <Li>
            <strong>DMARC</strong> définit ce qui doit se passer en cas d'échec
            SPF ou DKIM — et vous permet de recevoir des rapports sur l'activité
            email de votre domaine
          </Li>
        </Ul>
        <P>
          De plus, certains filtres anti-spam d'entreprise appliquent des règles
          plus strictes aux fournisseurs gratuits lorsqu'ils sont utilisés pour
          la communication professionnelle sortante. Votre devis ou votre facture
          peut être silencieusement déprioritisé simplement en raison de son
          origine.
        </P>
        <Callout>
          Chez Zapia, nous configurons SPF, DKIM et DMARC dans chaque mise en
          place d'email — vous bénéficiez ainsi d'une excellente délivrabilité
          dès le premier jour, sans avoir à comprendre les détails techniques
          vous-même.
        </Callout>
      </Section>

      <Section id="own-your-identity">
        <H2>4. Vous possédez votre identité</H2>
        <P>
          Si votre activité dépend de <em>monentreprise@gmail.com</em>, vous
          comptez entièrement sur un compte tiers. Google peut verrouiller,
          suspendre ou supprimer des comptes. Les politiques changent. La
          récupération à deux facteurs échoue. Les imprévus arrivent.
        </P>
        <P>
          Avec votre propre domaine, votre identité email est portable. Vous
          pouvez changer de fournisseur sans modifier une seule adresse
          visible par vos clients :
        </P>
        <Comparison
          bad="Lié à un compte Gmail que vous ne contrôlez pas"
          good="hello@votreentreprise.fr — changez de prestataire quand vous voulez"
        />
        <P>
          Vous pouvez démarrer sur Google Workspace, passer à Microsoft 365,
          migrer vers Proton Mail for Business ou tout autre fournisseur — et
          vos clients ne voient rien. L'adresse reste la même. La marque reste
          intacte.
        </P>
      </Section>

      <Section id="team-scaling">
        <H2>5. Montée en charge facilitée</H2>
        <P>
          Un compte Gmail est un compte personnel. Il ne s'adapte pas facilement
          à la croissance de votre équipe. Un domaine personnalisé vous permet
          de créer des adresses structurées et fonctionnelles dès le départ :
        </P>
        <Ul>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">support@votreentreprise.fr</code> — service client</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">commercial@votreentreprise.fr</code> — leads entrants</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">facturation@votreentreprise.fr</code> — paiements et factures</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">recrutement@votreentreprise.fr</code> — ressources humaines</Li>
          <Li><code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-xs">bonjour@votreentreprise.fr</code> — contact général</Li>
        </Ul>
        <P>
          Ces adresses peuvent être des boîtes partagées, des listes de
          diffusion ou des boîtes individuelles — toutes gérées de manière
          centralisée. Quand un collaborateur part, vous réaffectez l'adresse.
          Aucun historique ne se perd, aucun fil de conversation ne disparaît,
          aucun client ne se retrouve à écrire à quelqu'un qui ne travaille plus
          chez vous.
        </P>
      </Section>

      <Section id="security">
        <H2>6. Plus sécurisé et plus facile à gérer</H2>
        <P>
          Les solutions d'email professionnel construites autour de votre propre
          domaine offrent des contrôles qu'un compte Gmail personnel ne peut tout
          simplement pas fournir :
        </P>
        <Ul>
          <Li>Contrôle d'accès centralisé — ajout et suppression de membres instantanés</Li>
          <Li>Politiques de sécurité applicables à toute l'organisation</Li>
          <Li>Départ d'un employé géré proprement — révocation en un endroit</Li>
          <Li>Création d'alias sans créer de boîtes complètes</Li>
          <Li>Journaux d'audit pour savoir qui a envoyé quoi et quand</Li>
          <Li>Politiques de rétention des données pour la conformité</Li>
        </Ul>
        <P>
          Quand un employé quitte une entreprise qui fonctionne sur des comptes
          Gmail personnels, récupérer l'historique des emails professionnels
          critiques est souvent impossible. Avec un système d'email d'entreprise
          géré, rien ne part avec la personne.
        </P>
      </Section>

      <Section id="partnerships">
        <H2>7. Meilleur pour les partenariats et la levée de fonds</H2>
        <P>
          Les premières impressions dans les relations d'affaires sont difficiles
          à effacer. Les investisseurs, fournisseurs et partenaires reçoivent des
          centaines d'emails. Quand l'un d'eux provient d'une adresse gratuite,
          il est souvent mentalement classé sous "pas encore sérieux".
        </P>
        <P>
          Une adresse email au nom de domaine envoie deux signaux immédiats :
          que vous vous êtes suffisamment engagé dans votre activité pour la
          configurer correctement, et que vous comprenez les bases d'une
          infrastructure professionnelle. Ce n'est pas beaucoup demander — mais
          ne pas l'avoir soulève des questions.
        </P>
        <Callout type="warning">
          Plusieurs fondateurs ont rapporté que des investisseurs et business
          angels leur ont posé des questions sur leur configuration email en due
          diligence. C'est un détail, mais il revient.
        </Callout>
      </Section>

      <Section id="consistency">
        <H2>8. Cohérence de votre écosystème</H2>
        <P>
          La cohérence de marque vient de l'alignement entre tous vos points de
          contact. Quand votre site web, votre email et votre domaine partagent
          la même identité, cela crée une impression de solidité et
          d'intentionnalité.
        </P>
        <Comparison
          bad="site : yourcompany.com — email : yourcompany@gmail.com"
          good="site : yourcompany.com — email : hello@yourcompany.com"
        />
        <P>
          La version incohérente crée une friction cognitive faible mais réelle.
          Les clients peuvent se demander si l'email est légitime, si la personne
          avec qui ils parlent appartient vraiment à l'entreprise, ou s'ils ont
          affaire à une entité différente.
        </P>
      </Section>

      <Section id="impersonation">
        <H2>9. Éviter la confusion liée à l'usurpation d'identité</H2>
        <P>
          Une adresse email au nom de domaine permet à vos clients de vérifier
          beaucoup plus facilement qu'ils communiquent bien avec vous. Si toute
          votre communication officielle provient de <em>@yourcompany.com</em>,
          tout ce qui n'en provient pas est immédiatement suspect.
        </P>
        <Ul>
          <Li>
            Les clients peuvent vérifier votre domaine en le comparant à votre
            site web — une vérification de confiance simple que les adresses
            gratuites ne permettent pas
          </Li>
          <Li>
            Les tentatives de phishing sont plus faciles à repérer quand
            l'adresse réelle est connue et cohérente
          </Li>
          <Li>
            Réduit le risque que des clients soient trompés par quelqu'un qui
            usurpe votre marque via une adresse gratuite ressemblante
          </Li>
        </Ul>
      </Section>

      <Section id="long-term-asset">
        <H2>10. Un actif commercial à long terme</H2>
        <P>
          Votre domaine n'est pas seulement une adresse technique. Avec le temps,
          il accumule de la confiance, de la réputation et un historique de
          délivrabilité. Il devient une partie de l'identité numérique de votre
          entreprise — et, combiné à l'email, cette identité s'étend à chaque
          relation que vous construisez.
        </P>
        <P>
          Si vous vendez un jour votre entreprise, votre domaine et
          l'infrastructure email associée font partie de ce qui se transfère.
          Une entreprise dotée d'un système d'email structuré et cohérent est
          plus facile à transmettre et plus crédible à acquérir qu'une
          organisation bâtie sur des comptes personnels éparpillés.
        </P>
      </Section>

      <Section id="conclusion">
        <H2>Conclusion</H2>
        <P>
          Un email professionnel au nom de votre domaine coûte très peu — souvent
          moins de 5 € par mois par boîte. La confiance qu'il génère est
          disproportionnellement précieuse. Il signale que vous êtes sérieux, que
          vous avez réfléchi à votre infrastructure, et que vous traitez les
          personnes avec qui vous travaillez comme des professionnels méritent
          de l'être.
        </P>
        <P>
          Si vous avez déjà un domaine, mettre en place votre email est la
          prochaine étape logique. Si vous n'avez pas encore de domaine, lisez
          notre guide sur{" "}
          <InlineLink href="/fr/blog/how-to-choose-the-right-domain-name">
            comment choisir le bon nom de domaine pour votre entreprise
          </InlineLink>{" "}
          — votre adresse email commence là.
        </P>
      </Section>
    </div>
  );
}

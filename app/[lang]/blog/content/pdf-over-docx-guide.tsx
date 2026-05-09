import Link from "next/link";
import { AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

type Lang = "en" | "fr";

// ── Primitives ────────────────────────────────────────────────────────────────

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
      className={`flex gap-3 rounded-xl border p-4 mb-6 text-sm leading-relaxed ${
        type === "warning"
          ? "bg-amber-50 border-amber-200 text-amber-900"
          : "bg-indigo-50 border-indigo-100 text-indigo-900"
      }`}
    >
      <AlertTriangle
        className={`w-4 h-4 shrink-0 mt-0.5 ${
          type === "warning" ? "text-amber-500" : "text-indigo-500"
        }`}
      />
      <span>{children}</span>
    </div>
  );
}

function Comparison({ bad, good }: { bad: string; good: string }) {
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

// ── TOC ───────────────────────────────────────────────────────────────────────

export const toc = {
  en: [
    { id: "what-is-pdf", label: "What is PDF?" },
    { id: "looks-identical", label: "Looks identical everywhere" },
    { id: "fonts-embedded", label: "Fonts are embedded" },
    { id: "layout-frozen", label: "Layout never reflows" },
    { id: "no-accidental-edits", label: "No accidental edits" },
    { id: "hidden-metadata", label: "Hidden metadata risk" },
    { id: "no-office-needed", label: "No Office required" },
    { id: "printing", label: "Best for printing" },
    { id: "fill-and-sign", label: "Fill in, sign, initial" },
    { id: "when-docx", label: "When .docx is still right" },
    { id: "conclusion", label: "Conclusion" },
  ],
  fr: [
    { id: "what-is-pdf", label: "Qu'est-ce que le PDF ?" },
    { id: "looks-identical", label: "Identique sur tous les écrans" },
    { id: "fonts-embedded", label: "Polices intégrées" },
    { id: "layout-frozen", label: "Mise en page figée" },
    { id: "no-accidental-edits", label: "Pas de modifications accidentelles" },
    { id: "hidden-metadata", label: "Le risque des métadonnées" },
    { id: "no-office-needed", label: "Pas besoin d'Office" },
    { id: "printing", label: "Idéal pour l'impression" },
    { id: "fill-and-sign", label: "Remplir, signer, parapher" },
    { id: "when-docx", label: "Quand le .docx reste utile" },
    { id: "conclusion", label: "Conclusion" },
  ],
};

// ── Content ───────────────────────────────────────────────────────────────────

function ContentEN() {
  return (
    <>
      <Section id="what-is-pdf">
        <H2>What is PDF, exactly?</H2>
        <P>
          PDF stands for <em>Portable Document Format</em>. It was created by
          Adobe in the early 1990s with one goal: a document that looks exactly
          the same regardless of the software, operating system, or device used
          to open it.
        </P>
        <P>
          In 2008, PDF became an open international standard — <strong>ISO 32000</strong>,
          maintained by the International Organization for Standardization. No
          single company owns it. It's a universal format by design, built to
          outlast any particular software.
        </P>
        <Callout>
          ISO standards exist to ensure reliability, interoperability, and
          longevity. PDF sharing the same framework as standards used in
          aerospace, healthcare, and finance is not a coincidence — it was
          designed to be permanent.
        </Callout>
      </Section>

      <Section id="looks-identical">
        <H2>1. What you see is what they get</H2>
        <P>
          This is the core problem with Word files: a .docx is not a finished
          document — it's a set of instructions that each application interprets
          differently. The same file can look completely different depending on
          the version of Microsoft Office, whether it's opened in LibreOffice or
          Google Docs, and which operating system is running.
        </P>
        <Comparison
          bad="contract.docx — reformatted by recipient's LibreOffice"
          good="contract.pdf — identical on every device"
        />
        <P>
          Table columns that shift, page numbers that move, headers that
          disappear — these aren't rare edge cases. They happen regularly when
          you send a .docx to someone using a different setup. With a PDF, none
          of that is possible.
        </P>
      </Section>

      <Section id="fonts-embedded">
        <H2>2. Fonts are embedded in the file</H2>
        <P>
          When you use a specific font in a Word document and send it, the
          recipient needs that font installed on their machine. If they don't
          have it, their software silently substitutes another — changing
          spacing, line height, and often breaking the layout entirely.
        </P>
        <P>
          PDFs embed the fonts directly inside the file. The document carries
          everything it needs to render itself correctly, regardless of what's
          installed on the receiving end. A document designed with a specific
          typeface arrives exactly as intended.
        </P>
      </Section>

      <Section id="layout-frozen">
        <H2>3. The layout is frozen</H2>
        <P>
          In Word, a single small difference — a slightly different default
          margin, a different printer driver, a different page size — can
          cascade through the entire document. Footnotes shift. Images move.
          Page breaks land in the wrong place. A five-page document becomes six.
        </P>
        <P>
          A PDF is a snapshot. It doesn't adapt to its environment. For any
          document where presentation and precision matter — a proposal, a CV, a
          legal contract — this is not a limitation, it's the entire point.
        </P>
      </Section>

      <Section id="no-accidental-edits">
        <H2>4. It signals that the document is final</H2>
        <P>
          Sending a contract or invoice as a .docx means the recipient can open
          it, change the numbers, and save it — whether intentionally or by
          accident. A PDF makes it immediately clear that the document is done.
          It's the digital equivalent of a printed page.
        </P>
        <Callout type="warning">
          For legally sensitive documents — contracts, quotes, invoices — sending
          a .docx is a credibility risk. It signals that you haven't thought
          through your workflow. A PDF signals professionalism and finality.
        </Callout>
      </Section>

      <Section id="hidden-metadata">
        <H2>5. Word files carry hidden data</H2>
        <P>
          A .docx file is not just the text you see. It silently stores the
          author's name, the company name, revision history, tracked changes,
          and comments — including ones you thought you deleted. This has caused
          real-world embarrassment:
        </P>
        <Ul>
          <Li>
            Legal documents sent with visible tracked changes revealing
            negotiation positions
          </Li>
          <Li>
            Client proposals with internal comments ("is this price too high?")
            left in the file
          </Li>
          <Li>
            Corporate documents leaking employee names and internal tools via
            document metadata
          </Li>
        </Ul>
        <P>
          A PDF exported from a clean document carries none of this. It's what
          you exported, nothing more.
        </P>
      </Section>

      <Section id="no-office-needed">
        <H2>6. No Office licence required</H2>
        <P>
          Every modern device can open a PDF natively: Windows, macOS, iOS,
          Android, and every browser. No app to install, no subscription
          required. Word documents require Microsoft Office or a compatible
          alternative — and those alternatives don't always render .docx files
          faithfully.
        </P>
        <P>
          By sending a PDF, you remove a dependency from the recipient. They
          don't need anything beyond what they already have.
        </P>
      </Section>

      <Section id="printing">
        <H2>7. PDF is the right format for printing</H2>
        <P>
          Because a PDF is fixed, it prints exactly as it looks on screen —
          same margins, same page breaks, same layout, regardless of the printer
          or the OS print settings. With a .docx, the print result depends on
          how the document is rendered locally, which printer driver is active,
          and which paper format is set as default.
        </P>
        <P>
          For anything that will be physically printed — a CV, a contract, a
          menu, a flyer, a presentation handout — PDF is the only format that
          guarantees what comes out of the printer matches what you designed.
          Print shops universally require PDF for exactly this reason.
        </P>
      </Section>

      <Section id="fill-and-sign">
        <H2>8. You can still fill it in, sign it, and add initials</H2>
        <P>
          A common objection to PDF is that it can't be edited. This is no
          longer true. Modern PDF tools let you:
        </P>
        <Ul>
          <Li>Add form fields so the recipient can type directly into the document</Li>
          <Li>Insert a signature zone for electronic signing</Li>
          <Li>Add initial boxes (<em>paraph</em>) on each page</Li>
          <Li>Return the filled document by email — no printing, no scanning</Li>
        </Ul>
        <P>
          A signed PDF returned by email has the same legal standing as a
          wet-ink signature in most jurisdictions — and creates a cleaner paper
          trail.{" "}
          <InlineLink href="/en/blog/how-to-sign-a-pdf">
            Learn how to sign a PDF in our dedicated guide
          </InlineLink>
          .
        </P>
      </Section>

      <Section id="when-docx">
        <H2>9. When .docx is still the right choice</H2>
        <P>
          PDF is the format for finished documents. .docx is the format for
          documents still being worked on. The rule is simple:
        </P>
        <Ul>
          <Li>
            <strong>Use .docx</strong> when collaborating — track changes,
            comments, and co-editing are Word's strengths
          </Li>
          <Li>
            <strong>Use .docx</strong> when sharing a template the recipient is
            expected to fill in and customise
          </Li>
          <Li>
            <strong>Use PDF</strong> for everything you consider final and ready
            to be read, signed, or printed
          </Li>
        </Ul>
        <Callout>
          The workflow that works: draft in Word, collaborate with comments and
          track changes, then export to PDF before sending the final version.
          You get the best of both.
        </Callout>
      </Section>

      <Section id="conclusion">
        <H2>Conclusion</H2>
        <P>
          PDF is not just a convenient format — it's an ISO international
          standard built for permanence, portability, and precision. It
          eliminates rendering problems, protects your layout, hides nothing you
          didn't intend to share, and works on every device without any
          software requirement.
        </P>
        <P>
          For CVs, contracts, invoices, proposals, and anything meant to be
          printed: always send PDF. Keep the .docx for your own working files.
        </P>
        <P>
          Ready to start?{" "}
          <InlineLink href="/en/blog/how-to-create-a-pdf">
            Read our guide on how to create a PDF from any application
          </InlineLink>
          .
        </P>
      </Section>
    </>
  );
}

function ContentFR() {
  return (
    <>
      <Section id="what-is-pdf">
        <H2>Qu'est-ce que le PDF, exactement ?</H2>
        <P>
          PDF signifie <em>Portable Document Format</em>. Il a été créé par
          Adobe au début des années 1990 avec un seul objectif : qu'un document
          s'affiche exactement de la même façon, quel que soit le logiciel, le
          système d'exploitation ou l'appareil utilisé pour l'ouvrir.
        </P>
        <P>
          En 2008, le PDF est devenu une norme internationale ouverte —{" "}
          <strong>ISO 32000</strong>, maintenue par l'Organisation internationale
          de normalisation. Aucune entreprise n'en est propriétaire. C'est un
          format universel par conception, pensé pour traverser le temps.
        </P>
        <Callout>
          Les normes ISO garantissent fiabilité, interopérabilité et pérennité.
          Le PDF partage le même cadre de référence que les standards utilisés
          en aéronautique, en médecine ou en finance — ce n'est pas un hasard.
          Il a été conçu pour durer.
        </Callout>
      </Section>

      <Section id="looks-identical">
        <H2>1. Ce que vous voyez, c'est ce qu'ils reçoivent</H2>
        <P>
          C'est le problème fondamental du fichier Word : un .docx n'est pas un
          document fini — c'est un ensemble d'instructions que chaque logiciel
          interprète à sa façon. Le même fichier peut s'afficher très
          différemment selon la version de Microsoft Office, selon qu'il est
          ouvert avec LibreOffice ou Google Docs, ou selon le système
          d'exploitation.
        </P>
        <Comparison
          bad="contrat.docx — reformaté par le LibreOffice du destinataire"
          good="contrat.pdf — identique sur tous les appareils"
        />
        <P>
          Des colonnes de tableau qui décalent, des numéros de page qui bougent,
          des en-têtes qui disparaissent — ce ne sont pas des cas rares. Cela
          arrive régulièrement dès qu'on envoie un .docx à quelqu'un avec une
          configuration différente. Avec un PDF, rien de tout cela n'est
          possible.
        </P>
      </Section>

      <Section id="fonts-embedded">
        <H2>2. Les polices sont intégrées dans le fichier</H2>
        <P>
          Quand vous utilisez une police spécifique dans un document Word et que
          vous l'envoyez, le destinataire doit avoir cette police installée sur
          sa machine. S'il ne l'a pas, son logiciel en substitue silencieusement
          une autre — modifiant l'espacement, la hauteur de ligne, et souvent
          cassant entièrement la mise en page.
        </P>
        <P>
          Les PDF intègrent les polices directement dans le fichier. Le document
          emporte tout ce dont il a besoin pour s'afficher correctement, quelle
          que soit la configuration du destinataire. Un document conçu avec une
          typographie précise arrive exactement comme prévu.
        </P>
      </Section>

      <Section id="layout-frozen">
        <H2>3. La mise en page est figée</H2>
        <P>
          Dans Word, une petite différence — une marge par défaut légèrement
          différente, un pilote d'imprimante différent, un format de page
          différent — peut se propager dans tout le document. Les notes de bas
          de page se décalent. Les images bougent. Les sauts de page tombent au
          mauvais endroit. Un document de cinq pages en devient six.
        </P>
        <P>
          Un PDF est une capture. Il ne s'adapte pas à son environnement. Pour
          tout document où la présentation et la précision comptent — une
          proposition commerciale, un CV, un contrat — ce n'est pas une
          limitation, c'est précisément l'intérêt.
        </P>
      </Section>

      <Section id="no-accidental-edits">
        <H2>4. Il signale que le document est définitif</H2>
        <P>
          Envoyer un contrat ou une facture en .docx, c'est donner au
          destinataire la possibilité de l'ouvrir, de modifier les chiffres, et
          de le sauvegarder — intentionnellement ou par accident. Un PDF indique
          immédiatement que le document est terminé. C'est l'équivalent numérique
          d'une feuille imprimée.
        </P>
        <Callout type="warning">
          Pour les documents à enjeu juridique — contrats, devis, factures —
          envoyer un .docx est un risque de crédibilité. Cela signale que vous
          n'avez pas structuré votre façon de travailler. Un PDF signale
          professionnalisme et caractère définitif.
        </Callout>
      </Section>

      <Section id="hidden-metadata">
        <H2>5. Les fichiers Word contiennent des données cachées</H2>
        <P>
          Un fichier .docx n'est pas que le texte visible. Il stocke
          silencieusement le nom de l'auteur, le nom de l'entreprise,
          l'historique des modifications, le suivi des modifications et les
          commentaires — y compris ceux que vous pensiez avoir supprimés. Des
          situations gênantes réelles en ont découlé :
        </P>
        <Ul>
          <Li>
            Des documents juridiques envoyés avec des modifications suivies
            visibles révélant les positions de négociation
          </Li>
          <Li>
            Des propositions clients avec des commentaires internes ("ce prix
            est-il trop élevé ?") laissés dans le fichier
          </Li>
          <Li>
            Des documents d'entreprise divulguant des noms d'employés et des
            outils internes via les métadonnées
          </Li>
        </Ul>
        <P>
          Un PDF exporté depuis un document propre ne contient rien de tout
          cela. Il est exactement ce que vous avez exporté, rien de plus.
        </P>
      </Section>

      <Section id="no-office-needed">
        <H2>6. Aucune licence Office requise</H2>
        <P>
          Tous les appareils modernes ouvrent un PDF nativement : Windows,
          macOS, iOS, Android, et tous les navigateurs. Aucune application à
          installer, aucun abonnement requis. Les fichiers Word nécessitent
          Microsoft Office ou une alternative compatible — et ces alternatives
          ne restituent pas toujours fidèlement les fichiers .docx.
        </P>
        <P>
          En envoyant un PDF, vous supprimez une contrainte pour le destinataire.
          Il n'a besoin de rien de plus que ce qu'il possède déjà.
        </P>
      </Section>

      <Section id="printing">
        <H2>7. Le PDF est le bon format pour l'impression</H2>
        <P>
          Parce qu'un PDF est figé, il s'imprime exactement comme il s'affiche
          à l'écran — mêmes marges, mêmes sauts de page, même mise en page,
          quel que soit l'imprimante ou les réglages d'impression du système.
          Avec un .docx, le résultat à l'impression dépend du rendu local du
          document, du pilote d'imprimante actif et du format de papier défini
          par défaut.
        </P>
        <P>
          Pour tout ce qui sera imprimé physiquement — un CV, un contrat, un
          menu, un flyer, un support de présentation — le PDF est le seul format
          qui garantit que ce qui sort de l'imprimante correspond à ce que vous
          avez conçu. Les imprimeurs professionnels l'exigent universellement
          pour cette raison.
        </P>
      </Section>

      <Section id="fill-and-sign">
        <H2>8. On peut quand même le remplir, le signer et le parapher</H2>
        <P>
          L'objection classique au PDF est qu'il n'est pas modifiable. Ce n'est
          plus vrai. Les outils PDF modernes permettent de :
        </P>
        <Ul>
          <Li>
            Ajouter des champs de formulaire pour que le destinataire puisse
            saisir du texte directement
          </Li>
          <Li>Insérer une zone de signature électronique</Li>
          <Li>Ajouter des cases de paraphe sur chaque page</Li>
          <Li>
            Retourner le document rempli par email — sans impression ni
            numérisation
          </Li>
        </Ul>
        <P>
          Un PDF signé retourné par email a la même valeur juridique qu'une
          signature manuscrite dans la plupart des pays — et crée une traçabilité
          plus propre.{" "}
          <InlineLink href="/fr/blog/comment-signer-un-pdf">
            Apprenez à signer un PDF dans notre guide dédié
          </InlineLink>
          .
        </P>
      </Section>

      <Section id="when-docx">
        <H2>9. Quand le .docx reste le bon choix</H2>
        <P>
          Le PDF est le format des documents terminés. Le .docx est le format
          des documents en cours de rédaction. La règle est simple :
        </P>
        <Ul>
          <Li>
            <strong>Utilisez le .docx</strong> pour collaborer — le suivi des
            modifications, les commentaires et la co-rédaction sont les points
            forts de Word
          </Li>
          <Li>
            <strong>Utilisez le .docx</strong> pour partager un modèle que le
            destinataire doit remplir et personnaliser
          </Li>
          <Li>
            <strong>Utilisez le PDF</strong> pour tout document que vous
            considérez comme définitif et prêt à être lu, signé ou imprimé
          </Li>
        </Ul>
        <Callout>
          La méthode qui fonctionne : rédigez sous Word, collaborez avec les
          commentaires et le suivi des modifications, puis exportez en PDF avant
          d'envoyer la version finale. Vous avez le meilleur des deux mondes.
        </Callout>
      </Section>

      <Section id="conclusion">
        <H2>Conclusion</H2>
        <P>
          Le PDF n'est pas qu'un format pratique — c'est une norme
          internationale ISO conçue pour la pérennité, la portabilité et la
          précision. Il élimine les problèmes d'affichage, protège votre mise en
          page, ne laisse filtrer aucune information non désirée, et fonctionne
          sur tous les appareils sans aucune exigence logicielle.
        </P>
        <P>
          Pour les CV, contrats, factures, propositions commerciales, et tout ce
          qui a vocation à être imprimé : envoyez toujours un PDF. Conservez le
          .docx pour vos fichiers de travail.
        </P>
        <P>
          Prêt à commencer ?{" "}
          <InlineLink href="/fr/blog/comment-creer-un-pdf">
            Lisez notre guide pour créer un PDF depuis n'importe quelle
            application
          </InlineLink>
          .
        </P>
      </Section>
    </>
  );
}

export default function PdfOverDocxGuideContent({ lang }: { lang: Lang }) {
  return lang === "fr" ? <ContentFR /> : <ContentEN />;
}

import Link from "next/link";
import { AlertTriangle, CheckCircle } from "lucide-react";

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

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="space-y-3 mb-6 text-[15px] text-slate-700 list-none pl-0">
      {children}
    </ol>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">
        {n}
      </span>
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

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500 underline underline-offset-2 transition-colors"
    >
      {children}
    </Link>
  );
}

// ── TOC ───────────────────────────────────────────────────────────────────────

export const toc = {
  en: [
    { id: "acrobat-reader", label: "Adobe Acrobat Reader" },
    { id: "preview-macos", label: "Preview (macOS)" },
    { id: "web-tools", label: "Web tools" },
    { id: "iphone-ipad", label: "iPhone & iPad" },
    { id: "android", label: "Android" },
    { id: "professional", label: "Professional workflows" },
    { id: "legal-note", label: "Legal note" },
  ],
  fr: [
    { id: "acrobat-reader", label: "Adobe Acrobat Reader" },
    { id: "preview-macos", label: "Aperçu (macOS)" },
    { id: "web-tools", label: "Outils en ligne" },
    { id: "iphone-ipad", label: "iPhone & iPad" },
    { id: "android", label: "Android" },
    { id: "professional", label: "Workflows professionnels" },
    { id: "legal-note", label: "Note juridique" },
  ],
};

// ── Content ───────────────────────────────────────────────────────────────────

function ContentEN() {
  return (
    <>
      <P>
        Signing a PDF electronically takes less time than printing, signing by
        hand, and scanning back. Here's how to do it on every platform — most
        methods are free and built into tools you already have.
      </P>

      <Section id="acrobat-reader">
        <H2>Adobe Acrobat Reader (Windows & macOS)</H2>
        <P>
          Adobe Acrobat Reader is free, widely available, and the most reliable
          PDF signing tool on desktop. It supports signatures, initials, and
          typed text.
        </P>
        <Ol>
          <Step n={1}>Open your PDF in <strong>Adobe Acrobat Reader</strong>.</Step>
          <Step n={2}>
            In the right panel, click <strong>Fill & Sign</strong>. If the panel
            isn't visible, go to <strong>Tools → Fill & Sign</strong>.
          </Step>
          <Step n={3}>
            Click <strong>Sign yourself</strong> → <strong>Add Signature</strong>.
          </Step>
          <Step n={4}>
            Choose how to create your signature:
            <ul className="mt-2 space-y-1 pl-4 list-disc text-slate-600 text-sm">
              <li><strong>Type</strong> your name and Acrobat styles it to look handwritten</li>
              <li><strong>Draw</strong> it with your mouse or trackpad</li>
              <li><strong>Image</strong> — upload a photo of your handwritten signature</li>
            </ul>
          </Step>
          <Step n={5}>Click <strong>Apply</strong>, then click where the signature should appear.</Step>
          <Step n={6}>Save the file with <strong>Ctrl + S</strong> (or Cmd + S on macOS).</Step>
        </Ol>
        <Callout>
          For initials (paraph), use <strong>Add Initials</strong> in the same Fill &amp; Sign panel.
          Place them on each page as needed.
        </Callout>
      </Section>

      <Section id="preview-macos">
        <H2>Preview (macOS — free, built-in)</H2>
        <P>
          Preview is installed on every Mac and can sign PDFs without any extra
          software. It even lets you capture your real signature using the
          camera or your iPhone.
        </P>
        <Ol>
          <Step n={1}>Open the PDF in <strong>Preview</strong>.</Step>
          <Step n={2}>
            Click the <strong>Markup toolbar</strong> icon (a pencil tip) to
            reveal the annotation tools.
          </Step>
          <Step n={3}>
            Click the <strong>Signature button</strong> (it looks like a cursive
            signature) → <strong>Create Signature</strong>.
          </Step>
          <Step n={4}>
            Choose your input method:
            <ul className="mt-2 space-y-1 pl-4 list-disc text-slate-600 text-sm">
              <li><strong>Trackpad</strong> — draw with your finger</li>
              <li><strong>Camera</strong> — sign on white paper, hold it up to the webcam</li>
              <li><strong>iPhone</strong> — draw on your phone's screen, it syncs instantly</li>
            </ul>
          </Step>
          <Step n={5}>Click <strong>Done</strong>, then click where the signature should go.</Step>
          <Step n={6}>Resize and position it, then save with <strong>Cmd + S</strong>.</Step>
        </Ol>
      </Section>

      <Section id="web-tools">
        <H2>Web tools (no install required)</H2>
        <P>
          For occasional signing without installing anything, several reputable
          web tools let you upload, sign, and download a PDF in seconds:
        </P>
        <Ul>
          <Li>
            <strong>Smallpdf</strong> (smallpdf.com) — upload the PDF, draw or
            type your signature, download the signed file. Free for occasional
            use.
          </Li>
          <Li>
            <strong>iLovePDF</strong> (ilovepdf.com) — same workflow, also
            handles multi-page documents well.
          </Li>
          <Li>
            <strong>Adobe online</strong> (acrobat.adobe.com) — free account
            required, but reliable and from the PDF's creator.
          </Li>
        </Ul>
        <Callout type="warning">
          Only use reputable tools for confidential documents. When you upload a
          file to a web service, it leaves your device. Avoid third-party sites
          for contracts containing sensitive financial or personal data.
        </Callout>
      </Section>

      <Section id="iphone-ipad">
        <H2>iPhone & iPad</H2>
        <P>
          iPhones and iPads can sign PDFs natively using the built-in Markup
          tool — no app to install.
        </P>
        <Ol>
          <Step n={1}>
            Open the PDF in the <strong>Files</strong> app, in{" "}
            <strong>Mail</strong>, or in any app that supports Markup.
          </Step>
          <Step n={2}>Tap the <strong>Markup</strong> icon (pencil tip).</Step>
          <Step n={3}>Tap the <strong>+</strong> button → <strong>Signature</strong>.</Step>
          <Step n={4}>Draw your signature with your finger or Apple Pencil.</Step>
          <Step n={5}>Tap <strong>Done</strong>, then drag the signature to the right spot.</Step>
          <Step n={6}>Tap <strong>Done</strong> again to save.</Step>
        </Ol>
        <Callout>
          On iPad with an Apple Pencil, you can also annotate the PDF directly —
          write your signature exactly as you would on paper.
        </Callout>
      </Section>

      <Section id="android">
        <H2>Android</H2>
        <P>
          The free <strong>Adobe Acrobat</strong> app on Android provides the
          same Fill & Sign experience as the desktop version.
        </P>
        <Ol>
          <Step n={1}>Install <strong>Adobe Acrobat</strong> from the Play Store (free).</Step>
          <Step n={2}>Open the PDF in the app.</Step>
          <Step n={3}>Tap the <strong>pencil icon</strong> → <strong>Fill & Sign</strong>.</Step>
          <Step n={4}>Tap <strong>Sign</strong> and draw your signature.</Step>
          <Step n={5}>Tap where the signature should appear, then save the document.</Step>
        </Ol>
      </Section>

      <Section id="professional">
        <H2>Professional workflows</H2>
        <P>
          If you regularly send documents for signature — contracts, NDAs,
          onboarding forms, quotes — a dedicated e-signature platform is worth
          considering. They handle multi-party signing, automatic reminders, and
          legally auditable trails.
        </P>
        <Ul>
          <Li>
            <strong>DocuSign</strong> — the industry standard, legally binding
            in most countries. Widely used for real estate, finance, and legal
            documents.
          </Li>
          <Li>
            <strong>Dropbox Sign (formerly HelloSign)</strong> — simpler
            interface, good integration with Google Drive and Dropbox.
          </Li>
          <Li>
            <strong>Yousign</strong> — French provider, eIDAS-qualified,
            well-suited for European businesses with compliance requirements.
          </Li>
        </Ul>
      </Section>

      <Section id="legal-note">
        <H2>Electronic vs. digital signature — a quick legal note</H2>
        <P>
          It's worth knowing the difference:
        </P>
        <Ul>
          <Li>
            <strong>Electronic signature</strong> — an image of a signature
            placed on a PDF. This is what all the methods above produce. It is
            legally valid for the vast majority of business documents in France
            and across the EU under the eIDAS regulation.
          </Li>
          <Li>
            <strong>Qualified digital signature</strong> — a cryptographic
            signature backed by a certified identity verification. Required for
            a limited set of legal acts (certain real estate transactions,
            company registration filings).
          </Li>
        </Ul>
        <Callout>
          For everyday business documents — contracts, quotes, NDAs, employment
          agreements — an electronic signature is perfectly valid. If you have
          any doubt about a specific document, ask your legal counsel.
        </Callout>
        <P>
          Don't have a PDF to sign yet?{" "}
          <InlineLink href="/en/blog/how-to-create-a-pdf">
            Learn how to create a PDF from any application
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
      <P>
        Signer un PDF électroniquement prend moins de temps qu'imprimer, signer
        à la main et scanner. Voici comment faire sur chaque plateforme — la
        plupart des méthodes sont gratuites et intégrées aux outils que vous
        utilisez déjà.
      </P>

      <Section id="acrobat-reader">
        <H2>Adobe Acrobat Reader (Windows & macOS)</H2>
        <P>
          Adobe Acrobat Reader est gratuit, disponible partout, et l'outil de
          signature PDF le plus fiable sur ordinateur. Il prend en charge les
          signatures, les paraphes et le texte dactylographié.
        </P>
        <Ol>
          <Step n={1}>Ouvrez votre PDF dans <strong>Adobe Acrobat Reader</strong>.</Step>
          <Step n={2}>
            Dans le panneau de droite, cliquez sur <strong>Remplir et signer</strong>.
            Si le panneau n'est pas visible, allez dans{" "}
            <strong>Outils → Remplir et signer</strong>.
          </Step>
          <Step n={3}>
            Cliquez sur <strong>Signer</strong> → <strong>Ajouter une signature</strong>.
          </Step>
          <Step n={4}>
            Choisissez comment créer votre signature :
            <ul className="mt-2 space-y-1 pl-4 list-disc text-slate-600 text-sm">
              <li><strong>Saisir</strong> votre nom et Acrobat lui donne un aspect manuscrit</li>
              <li><strong>Dessiner</strong> avec votre souris ou votre pavé tactile</li>
              <li><strong>Image</strong> — importez une photo de votre signature manuscrite</li>
            </ul>
          </Step>
          <Step n={5}>Cliquez sur <strong>Appliquer</strong>, puis cliquez à l'endroit où la signature doit apparaître.</Step>
          <Step n={6}>Enregistrez le fichier avec <strong>Ctrl + S</strong> (ou Cmd + S sur macOS).</Step>
        </Ol>
        <Callout>
          Pour les paraphes, utilisez <strong>Ajouter des initiales</strong>{" "}
          dans le même panneau Remplir et signer. Placez-les sur chaque page
          selon vos besoins.
        </Callout>
      </Section>

      <Section id="preview-macos">
        <H2>Aperçu (macOS — gratuit, intégré)</H2>
        <P>
          Aperçu est installé sur tous les Mac et peut signer des PDF sans
          aucun logiciel supplémentaire. Il vous permet même de capturer votre
          vraie signature via la caméra ou votre iPhone.
        </P>
        <Ol>
          <Step n={1}>Ouvrez le PDF dans <strong>Aperçu</strong>.</Step>
          <Step n={2}>
            Cliquez sur l'icône de la <strong>barre d'outils Annotation</strong>{" "}
            (pointe de crayon) pour afficher les outils d'annotation.
          </Step>
          <Step n={3}>
            Cliquez sur le <strong>bouton Signature</strong> (il ressemble à une
            signature cursive) → <strong>Créer une signature</strong>.
          </Step>
          <Step n={4}>
            Choisissez votre méthode de saisie :
            <ul className="mt-2 space-y-1 pl-4 list-disc text-slate-600 text-sm">
              <li><strong>Pavé tactile</strong> — dessinez avec votre doigt</li>
              <li><strong>Caméra</strong> — signez sur une feuille blanche, montrez-la à la webcam</li>
              <li><strong>iPhone</strong> — dessinez sur l'écran de votre téléphone, la signature se synchronise instantanément</li>
            </ul>
          </Step>
          <Step n={5}>Cliquez sur <strong>Terminé</strong>, puis cliquez à l'endroit où la signature doit être placée.</Step>
          <Step n={6}>Redimensionnez et positionnez-la, puis enregistrez avec <strong>Cmd + S</strong>.</Step>
        </Ol>
      </Section>

      <Section id="web-tools">
        <H2>Outils en ligne (sans installation)</H2>
        <P>
          Pour une signature occasionnelle sans rien installer, plusieurs outils
          en ligne fiables vous permettent de déposer, signer et télécharger un
          PDF en quelques secondes :
        </P>
        <Ul>
          <Li>
            <strong>Smallpdf</strong> (smallpdf.com) — déposez le PDF, dessinez
            ou saisissez votre signature, téléchargez le fichier signé. Gratuit
            pour un usage occasionnel.
          </Li>
          <Li>
            <strong>iLovePDF</strong> (ilovepdf.com) — même fonctionnement,
            gère aussi très bien les documents multi-pages.
          </Li>
          <Li>
            <strong>Adobe en ligne</strong> (acrobat.adobe.com) — compte gratuit
            requis, mais fiable et proposé par le créateur du format PDF.
          </Li>
        </Ul>
        <Callout type="warning">
          N'utilisez que des outils reconnus pour les documents confidentiels.
          Lorsque vous déposez un fichier sur un service en ligne, il quitte
          votre appareil. Évitez les sites tiers pour les contrats contenant
          des données financières ou personnelles sensibles.
        </Callout>
      </Section>

      <Section id="iphone-ipad">
        <H2>iPhone & iPad</H2>
        <P>
          Les iPhone et iPad peuvent signer des PDF nativement grâce à l'outil
          Annotation intégré — aucune application à installer.
        </P>
        <Ol>
          <Step n={1}>
            Ouvrez le PDF dans l'application <strong>Fichiers</strong>, dans{" "}
            <strong>Mail</strong>, ou dans toute application prenant en charge
            Annotation.
          </Step>
          <Step n={2}>Touchez l'icône <strong>Annotation</strong> (pointe de crayon).</Step>
          <Step n={3}>Touchez le bouton <strong>+</strong> → <strong>Signature</strong>.</Step>
          <Step n={4}>Dessinez votre signature avec votre doigt ou l'Apple Pencil.</Step>
          <Step n={5}>Touchez <strong>Terminé</strong>, puis faites glisser la signature au bon endroit.</Step>
          <Step n={6}>Touchez à nouveau <strong>Terminé</strong> pour enregistrer.</Step>
        </Ol>
        <Callout>
          Sur iPad avec un Apple Pencil, vous pouvez également annoter le PDF
          directement — écrivez votre signature exactement comme vous le feriez
          sur papier.
        </Callout>
      </Section>

      <Section id="android">
        <H2>Android</H2>
        <P>
          L'application gratuite <strong>Adobe Acrobat</strong> sur Android
          propose la même expérience Remplir et signer que la version bureau.
        </P>
        <Ol>
          <Step n={1}>Installez <strong>Adobe Acrobat</strong> depuis le Play Store (gratuit).</Step>
          <Step n={2}>Ouvrez le PDF dans l'application.</Step>
          <Step n={3}>Touchez l'<strong>icône crayon</strong> → <strong>Remplir et signer</strong>.</Step>
          <Step n={4}>Touchez <strong>Signer</strong> et dessinez votre signature.</Step>
          <Step n={5}>Touchez l'endroit où la signature doit apparaître, puis enregistrez le document.</Step>
        </Ol>
      </Section>

      <Section id="professional">
        <H2>Workflows professionnels</H2>
        <P>
          Si vous envoyez régulièrement des documents à signer — contrats, NDA,
          formulaires d'embauche, devis — une plateforme de signature électronique
          dédiée vaut la peine d'être envisagée. Ces outils gèrent la signature
          multi-parties, les relances automatiques et les pistes d'audit
          juridiquement opposables.
        </P>
        <Ul>
          <Li>
            <strong>DocuSign</strong> — la référence du secteur, juridiquement
            opposable dans la plupart des pays. Très utilisé pour l'immobilier,
            la finance et les actes juridiques.
          </Li>
          <Li>
            <strong>Dropbox Sign (anciennement HelloSign)</strong> — interface
            plus simple, bonne intégration avec Google Drive et Dropbox.
          </Li>
          <Li>
            <strong>Yousign</strong> — prestataire français, qualifié eIDAS,
            bien adapté aux entreprises européennes avec des exigences de
            conformité.
          </Li>
        </Ul>
      </Section>

      <Section id="legal-note">
        <H2>Signature électronique vs signature numérique — note juridique</H2>
        <P>Il est utile de connaître la différence :</P>
        <Ul>
          <Li>
            <strong>Signature électronique</strong> — une image de signature
            apposée sur un PDF. C'est ce que produisent toutes les méthodes
            ci-dessus. Elle est juridiquement valide pour la grande majorité
            des documents professionnels en France et dans l'UE dans le cadre
            du règlement eIDAS.
          </Li>
          <Li>
            <strong>Signature numérique qualifiée</strong> — une signature
            cryptographique adossée à une vérification d'identité certifiée.
            Requise pour un nombre limité d'actes juridiques (certaines
            transactions immobilières, dépôts d'immatriculation d'entreprise).
          </Li>
        </Ul>
        <Callout>
          Pour les documents professionnels courants — contrats, devis, NDA,
          contrats de travail — une signature électronique est parfaitement
          valide. En cas de doute sur un document spécifique, consultez votre
          conseil juridique.
        </Callout>
        <P>
          Vous n'avez pas encore de PDF à signer ?{" "}
          <InlineLink href="/fr/blog/comment-creer-un-pdf">
            Apprenez à créer un PDF depuis n'importe quelle application
          </InlineLink>
          .
        </P>
      </Section>
    </>
  );
}

export default function SignPdfGuideContent({ lang }: { lang: Lang }) {
  return lang === "fr" ? <ContentFR /> : <ContentEN />;
}

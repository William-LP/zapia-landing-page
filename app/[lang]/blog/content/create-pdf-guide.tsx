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
    { id: "windows", label: "Windows" },
    { id: "macos", label: "macOS" },
    { id: "word", label: "Microsoft Word" },
    { id: "google-docs", label: "Google Docs" },
    { id: "browser", label: "Any web browser" },
    { id: "libreoffice", label: "LibreOffice" },
    { id: "from-images", label: "From photos or images" },
    { id: "tips", label: "Tips" },
  ],
  fr: [
    { id: "windows", label: "Windows" },
    { id: "macos", label: "macOS" },
    { id: "word", label: "Microsoft Word" },
    { id: "google-docs", label: "Google Docs" },
    { id: "browser", label: "Depuis un navigateur" },
    { id: "libreoffice", label: "LibreOffice" },
    { id: "from-images", label: "Depuis des photos" },
    { id: "tips", label: "Conseils" },
  ],
};

// ── Content ───────────────────────────────────────────────────────────────────

function ContentEN() {
  return (
    <>
      <P>
        Almost every application you already use can export to PDF — no extra
        software needed. Here's how to do it from the most common tools, on
        every platform.
      </P>
      <Callout>
        Not sure why PDF is worth using in the first place?{" "}
        <InlineLink href="/en/blog/why-use-pdf-over-docx">
          Read why PDF beats Word for anything you consider final
        </InlineLink>
        .
      </Callout>

      <Section id="windows">
        <H2>Windows (any application)</H2>
        <P>
          Windows 10 and 11 include a built-in "Microsoft Print to PDF" virtual
          printer. Any application that can print can create a PDF this way —
          no additional software required.
        </P>
        <Ol>
          <Step n={1}>Open the document, image, or webpage you want to save.</Step>
          <Step n={2}>
            Press <strong>Ctrl + P</strong> (or go to File → Print).
          </Step>
          <Step n={3}>
            In the printer list, select{" "}
            <strong>Microsoft Print to PDF</strong>.
          </Step>
          <Step n={4}>Click <strong>Print</strong>.</Step>
          <Step n={5}>
            Choose where to save the file, give it a name, and click{" "}
            <strong>Save</strong>.
          </Step>
        </Ol>
      </Section>

      <Section id="macos">
        <H2>macOS (any application)</H2>
        <P>
          On macOS, every application's print dialog has a built-in PDF export
          option — no extra steps, no third-party software.
        </P>
        <Ol>
          <Step n={1}>Open the document or page you want to save.</Step>
          <Step n={2}>
            Press <strong>Cmd + P</strong> (or File → Print).
          </Step>
          <Step n={3}>
            At the bottom-left of the print dialog, click the{" "}
            <strong>PDF</strong> dropdown button.
          </Step>
          <Step n={4}>Select <strong>Save as PDF…</strong></Step>
          <Step n={5}>Choose a location, give it a name, and click <strong>Save</strong>.</Step>
        </Ol>
        <Callout>
          This works in Safari, Mail, Pages, Numbers, Keynote, Word — any app
          that supports printing on macOS. It's the fastest PDF method on Apple
          devices.
        </Callout>
      </Section>

      <Section id="word">
        <H2>Microsoft Word</H2>
        <P>
          Word has a dedicated export feature that gives you more control than
          printing to PDF.
        </P>
        <Ol>
          <Step n={1}>Open your document in Word.</Step>
          <Step n={2}>Go to <strong>File → Save As</strong>.</Step>
          <Step n={3}>
            Choose the folder where you want to save the file.
          </Step>
          <Step n={4}>
            In the <strong>File Format</strong> (macOS) or{" "}
            <strong>Save as type</strong> (Windows) dropdown, select{" "}
            <strong>PDF</strong>.
          </Step>
          <Step n={5}>Click <strong>Save</strong>.</Step>
        </Ol>
        <P>
          On Windows you can also go to <strong>File → Export → Create PDF/XPS</strong>{" "}
          for additional options like minimum file size or standard quality.
        </P>
      </Section>

      <Section id="google-docs">
        <H2>Google Docs</H2>
        <Ol>
          <Step n={1}>Open your document in Google Docs.</Step>
          <Step n={2}>Go to <strong>File → Download</strong>.</Step>
          <Step n={3}>Select <strong>PDF Document (.pdf)</strong>.</Step>
          <Step n={4}>
            The file is saved to your default downloads folder automatically.
          </Step>
        </Ol>
        <P>
          The same method works in Google Sheets and Google Slides — each
          exports the full document or presentation to a single PDF file.
        </P>
      </Section>

      <Section id="browser">
        <H2>Any web browser</H2>
        <P>
          Saving a webpage as PDF is useful for invoices from supplier portals,
          government documents, order confirmations, or any page you need to
          keep a permanent copy of.
        </P>
        <Ol>
          <Step n={1}>
            Press <strong>Ctrl + P</strong> (Windows) or{" "}
            <strong>Cmd + P</strong> (macOS).
          </Step>
          <Step n={2}>
            In the printer list, choose <strong>Save as PDF</strong> (Chrome,
            Edge) or click the <strong>PDF button</strong> at the bottom-left
            (Safari, Firefox on macOS).
          </Step>
          <Step n={3}>
            Adjust orientation or margins if needed, then click{" "}
            <strong>Save</strong>.
          </Step>
        </Ol>
        <Callout>
          Chrome and Edge also let you remove headers and footers (page URL,
          date) before saving — useful when you want a clean version without
          browser chrome.
        </Callout>
      </Section>

      <Section id="libreoffice">
        <H2>LibreOffice</H2>
        <Ol>
          <Step n={1}>Open your document in LibreOffice Writer, Calc, or Impress.</Step>
          <Step n={2}>Go to <strong>File → Export as PDF…</strong></Step>
          <Step n={3}>
            A dialog lets you adjust quality, compression, password protection,
            and accessibility settings.
          </Step>
          <Step n={4}>Click <strong>Export</strong>, choose a location, then click <strong>Save</strong>.</Step>
        </Ol>
        <P>
          LibreOffice's PDF export offers more advanced options than most tools —
          including the ability to embed fonts manually, set document metadata,
          and restrict printing or copying.
        </P>
      </Section>

      <Section id="from-images">
        <H2>From photos or images</H2>
        <P>
          Need to turn a photo or scanned image into a PDF?
        </P>
        <Ul>
          <Li>
            <strong>Windows:</strong> Open the image in the Photos app → click
            the print icon (or press Ctrl+P) → select Microsoft Print to PDF →
            Save.
          </Li>
          <Li>
            <strong>macOS:</strong> Open in Preview → File → Export as PDF…
          </Li>
          <Li>
            <strong>iPhone:</strong> Open the image in the Photos app → tap
            Share → tap Print → pinch outward on the preview to detach a PDF →
            tap Share to save or send it.
          </Li>
          <Li>
            <strong>Multiple images into one PDF (macOS):</strong> Select all
            images in Finder → right-click → Quick Actions → Create PDF.
          </Li>
        </Ul>
      </Section>

      <Section id="tips">
        <H2>Tips</H2>
        <Ul>
          <Li>
            <strong>Check the result before sending.</strong> Open the exported
            PDF and verify the layout — page breaks, images, and fonts can
            sometimes shift depending on the export settings.
          </Li>
          <Li>
            <strong>For digital sharing:</strong> choose "Screen" or "Web"
            quality to keep the file size small.
          </Li>
          <Li>
            <strong>For printing or archiving:</strong> use "Press" or "High
            quality" to preserve sharpness and detail.
          </Li>
          <Li>
            <strong>Password protection:</strong> LibreOffice and Word let you
            set a password on the exported PDF — useful for sensitive documents.
          </Li>
        </Ul>
        <P>
          Once you have your PDF,{" "}
          <InlineLink href="/en/blog/how-to-sign-a-pdf">
            learn how to sign it electronically
          </InlineLink>{" "}
          without printing a single page.
        </P>
      </Section>
    </>
  );
}

function ContentFR() {
  return (
    <>
      <P>
        Presque toutes les applications que vous utilisez déjà peuvent exporter
        en PDF — sans logiciel supplémentaire. Voici comment procéder depuis les
        outils les plus courants, sur chaque plateforme.
      </P>
      <Callout>
        Vous n'êtes pas encore convaincu de l'utilité du PDF ?{" "}
        <InlineLink href="/fr/blog/pourquoi-utiliser-le-pdf-plutot-que-docx">
          Lisez pourquoi le PDF est supérieur au Word pour tout document
          finalisé
        </InlineLink>
        .
      </Callout>

      <Section id="windows">
        <H2>Windows (depuis n'importe quelle application)</H2>
        <P>
          Windows 10 et 11 incluent une imprimante virtuelle "Microsoft Print to
          PDF" intégrée. Toute application capable d'imprimer peut créer un PDF
          de cette façon — sans logiciel supplémentaire.
        </P>
        <Ol>
          <Step n={1}>
            Ouvrez le document, l'image ou la page web que vous souhaitez
            enregistrer.
          </Step>
          <Step n={2}>
            Appuyez sur <strong>Ctrl + P</strong> (ou Fichier → Imprimer).
          </Step>
          <Step n={3}>
            Dans la liste des imprimantes, sélectionnez{" "}
            <strong>Microsoft Print to PDF</strong>.
          </Step>
          <Step n={4}>Cliquez sur <strong>Imprimer</strong>.</Step>
          <Step n={5}>
            Choisissez l'emplacement d'enregistrement, donnez un nom au fichier
            et cliquez sur <strong>Enregistrer</strong>.
          </Step>
        </Ol>
      </Section>

      <Section id="macos">
        <H2>macOS (depuis n'importe quelle application)</H2>
        <P>
          Sur macOS, la boîte de dialogue d'impression de chaque application
          intègre une option d'export PDF native — aucune étape supplémentaire,
          aucun logiciel tiers.
        </P>
        <Ol>
          <Step n={1}>Ouvrez le document ou la page à enregistrer.</Step>
          <Step n={2}>
            Appuyez sur <strong>Cmd + P</strong> (ou Fichier → Imprimer).
          </Step>
          <Step n={3}>
            En bas à gauche de la boîte d'impression, cliquez sur le bouton
            déroulant <strong>PDF</strong>.
          </Step>
          <Step n={4}>Sélectionnez <strong>Enregistrer au format PDF…</strong></Step>
          <Step n={5}>
            Choisissez un emplacement, donnez un nom et cliquez sur{" "}
            <strong>Enregistrer</strong>.
          </Step>
        </Ol>
        <Callout>
          Cela fonctionne dans Safari, Mail, Pages, Numbers, Keynote, Word —
          toute application qui prend en charge l'impression sur macOS. C'est la
          méthode PDF la plus rapide sur les appareils Apple.
        </Callout>
      </Section>

      <Section id="word">
        <H2>Microsoft Word</H2>
        <P>
          Word dispose d'une fonction d'export dédiée qui offre plus de contrôle
          qu'une impression vers PDF.
        </P>
        <Ol>
          <Step n={1}>Ouvrez votre document dans Word.</Step>
          <Step n={2}>Allez dans <strong>Fichier → Enregistrer sous</strong>.</Step>
          <Step n={3}>Choisissez le dossier de destination.</Step>
          <Step n={4}>
            Dans le menu déroulant <strong>Format de fichier</strong> (macOS) ou{" "}
            <strong>Type</strong> (Windows), sélectionnez <strong>PDF</strong>.
          </Step>
          <Step n={5}>Cliquez sur <strong>Enregistrer</strong>.</Step>
        </Ol>
        <P>
          Sur Windows, vous pouvez aussi aller dans{" "}
          <strong>Fichier → Exporter → Créer un document PDF/XPS</strong> pour
          des options supplémentaires comme la taille de fichier minimale ou la
          qualité standard.
        </P>
      </Section>

      <Section id="google-docs">
        <H2>Google Docs</H2>
        <Ol>
          <Step n={1}>Ouvrez votre document dans Google Docs.</Step>
          <Step n={2}>Allez dans <strong>Fichier → Télécharger</strong>.</Step>
          <Step n={3}>Sélectionnez <strong>Document PDF (.pdf)</strong>.</Step>
          <Step n={4}>
            Le fichier est automatiquement enregistré dans votre dossier de
            téléchargements par défaut.
          </Step>
        </Ol>
        <P>
          La même méthode fonctionne dans Google Sheets et Google Slides — chaque
          application exporte l'intégralité du document en un seul fichier PDF.
        </P>
      </Section>

      <Section id="browser">
        <H2>Depuis un navigateur web</H2>
        <P>
          Enregistrer une page web en PDF est pratique pour les factures de vos
          portails fournisseurs, les documents administratifs, les confirmations
          de commande — toute page dont vous avez besoin de conserver une copie
          permanente.
        </P>
        <Ol>
          <Step n={1}>
            Appuyez sur <strong>Ctrl + P</strong> (Windows) ou{" "}
            <strong>Cmd + P</strong> (macOS).
          </Step>
          <Step n={2}>
            Dans la liste des imprimantes, choisissez{" "}
            <strong>Enregistrer en PDF</strong> (Chrome, Edge) ou cliquez sur
            le bouton <strong>PDF</strong> en bas à gauche (Safari, Firefox
            sur macOS).
          </Step>
          <Step n={3}>
            Ajustez l'orientation ou les marges si nécessaire, puis cliquez sur{" "}
            <strong>Enregistrer</strong>.
          </Step>
        </Ol>
        <Callout>
          Chrome et Edge vous permettent aussi de supprimer les en-têtes et
          pieds de page (URL, date) avant d'enregistrer — utile pour obtenir une
          version propre sans métadonnées du navigateur.
        </Callout>
      </Section>

      <Section id="libreoffice">
        <H2>LibreOffice</H2>
        <Ol>
          <Step n={1}>
            Ouvrez votre document dans LibreOffice Writer, Calc ou Impress.
          </Step>
          <Step n={2}>Allez dans <strong>Fichier → Exporter en PDF…</strong></Step>
          <Step n={3}>
            Une boîte de dialogue vous permet d'ajuster la qualité, la
            compression, la protection par mot de passe et les options
            d'accessibilité.
          </Step>
          <Step n={4}>
            Cliquez sur <strong>Exporter</strong>, choisissez un emplacement,
            puis cliquez sur <strong>Enregistrer</strong>.
          </Step>
        </Ol>
        <P>
          LibreOffice propose des options d'export PDF plus avancées que la
          plupart des outils — dont l'intégration manuelle des polices, la
          définition des métadonnées du document, et la restriction de
          l'impression ou de la copie.
        </P>
      </Section>

      <Section id="from-images">
        <H2>Depuis des photos ou des images</H2>
        <P>Vous devez transformer une photo ou une image scannée en PDF ?</P>
        <Ul>
          <Li>
            <strong>Windows :</strong> ouvrez l'image dans l'application Photos
            → cliquez sur l'icône d'impression (ou Ctrl+P) → sélectionnez
            Microsoft Print to PDF → Enregistrer.
          </Li>
          <Li>
            <strong>macOS :</strong> ouvrez dans Aperçu → Fichier → Exporter au
            format PDF…
          </Li>
          <Li>
            <strong>iPhone :</strong> ouvrez l'image dans Photos → touchez
            Partager → touchez Imprimer → pincez vers l'extérieur sur
            l'aperçu pour détacher un PDF → touchez Partager pour l'enregistrer
            ou l'envoyer.
          </Li>
          <Li>
            <strong>Plusieurs images en un seul PDF (macOS) :</strong>{" "}
            sélectionnez toutes les images dans le Finder → clic droit → Actions
            rapides → Créer un PDF.
          </Li>
        </Ul>
      </Section>

      <Section id="tips">
        <H2>Conseils</H2>
        <Ul>
          <Li>
            <strong>Vérifiez le résultat avant d'envoyer.</strong> Ouvrez le PDF
            exporté et contrôlez la mise en page — les sauts de page, les images
            et les polices peuvent parfois se décaler selon les réglages
            d'export.
          </Li>
          <Li>
            <strong>Pour un partage numérique :</strong> choisissez la qualité
            "Écran" ou "Web" pour réduire la taille du fichier.
          </Li>
          <Li>
            <strong>Pour l'impression ou l'archivage :</strong> utilisez la
            qualité "Impression" ou "Haute qualité" pour préserver la netteté
            et les détails.
          </Li>
          <Li>
            <strong>Protection par mot de passe :</strong> LibreOffice et Word
            permettent de définir un mot de passe sur le PDF exporté — utile
            pour les documents sensibles.
          </Li>
        </Ul>
        <P>
          Une fois votre PDF créé,{" "}
          <InlineLink href="/fr/blog/comment-signer-un-pdf">
            apprenez à le signer électroniquement
          </InlineLink>{" "}
          sans imprimer une seule page.
        </P>
      </Section>
    </>
  );
}

export default function CreatePdfGuideContent({ lang }: { lang: Lang }) {
  return lang === "fr" ? <ContentFR /> : <ContentEN />;
}

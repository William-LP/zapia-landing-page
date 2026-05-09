import Link from "next/link";
import { AlertTriangle, CheckCircle, ImageIcon } from "lucide-react";

type Lang = "en" | "fr";

// ── Primitives ────────────────────────────────────────────────────────────────

function Section({ id, children }: { id: string; children: React.ReactNode }) {
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

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="space-y-3 mb-6 text-[15px] text-slate-700 list-none pl-0">
      {children}
    </ol>
  );
}

function Step({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
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

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500 underline underline-offset-2 transition-colors"
    >
      {children}
    </Link>
  );
}

function Screenshot({ alt, caption }: { alt: string; caption: string }) {
  return (
    <figure className="my-6">
      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center py-10">
        <div className="text-center px-6">
          <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-500">{alt}</p>
          <p className="text-xs text-slate-400 mt-1">Screenshot to be added</p>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-slate-400 text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── TOC ───────────────────────────────────────────────────────────────────────

export const toc = {
  en: [
    { id: "what-to-include", label: "What to include" },
    { id: "gmail", label: "Gmail" },
    { id: "outlook-web", label: "Outlook (web)" },
    { id: "outlook-desktop", label: "Outlook (desktop)" },
    { id: "thunderbird", label: "Thunderbird" },
    { id: "apple-mail", label: "Apple Mail" },
    { id: "tips", label: "Tips for a better signature" },
  ],
  fr: [
    { id: "what-to-include", label: "Que mettre dans sa signature" },
    { id: "gmail", label: "Gmail" },
    { id: "outlook-web", label: "Outlook (web)" },
    { id: "outlook-desktop", label: "Outlook (bureau)" },
    { id: "thunderbird", label: "Thunderbird" },
    { id: "apple-mail", label: "Apple Mail" },
    { id: "tips", label: "Conseils pour une meilleure signature" },
  ],
};

// ── Content ───────────────────────────────────────────────────────────────────

function ContentEN() {
  return (
    <>
      <Section id="what-to-include">
        <H2>What to include in your signature</H2>
        <P>
          Before changing anything, it helps to know what a good signature looks
          like. You don't need much — the goal is to give recipients enough
          information to reach you without cluttering every email you send.
        </P>
        <Ul>
          <Li>Your first and last name</Li>
          <Li>Your job title and company name</Li>
          <Li>A phone number (optional, but useful for clients)</Li>
          <Li>Your website URL</Li>
          <Li>One or two social links at most</Li>
        </Ul>
        <Callout type="warning">
          Keep it under 4–5 lines. A signature that's longer than the email
          itself is a common mistake. Avoid large images, decorative fonts, and
          long legal disclaimers — they often break in other email clients and
          can trigger spam filters.
        </Callout>
      </Section>

      <Section id="gmail">
        <H2>Gmail</H2>
        <P>
          Gmail manages signatures through its settings panel. Here's how to add
          or update yours:
        </P>
        <Ol>
          <Step n={1}>
            Open <strong>Gmail</strong> in your browser and click the{" "}
            <strong>gear icon</strong> in the top-right corner.
          </Step>
          <Step n={2}>
            Click <strong>"See all settings"</strong> at the top of the panel
            that appears.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — gear icon and 'See all settings' link"
          caption="Click the gear icon, then 'See all settings' to open the full settings page."
        />
        <Ol>
          <Step n={3}>
            Stay on the <strong>General</strong> tab and scroll down until you
            find the <strong>Signature</strong> section.
          </Step>
          <Step n={4}>
            Click <strong>"Create new"</strong>, give your signature a name
            (e.g. "Work") and click <strong>Create</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — Signature section on the General settings tab"
          caption="The signature section is found on the General tab, about halfway down the page."
        />
        <Ol>
          <Step n={5}>
            Type your signature in the text box. Use the toolbar to bold your
            name, adjust the font size, or add a clickable link to your website.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — signature editor with formatting toolbar"
          caption="Use the toolbar to format your name in bold and add a hyperlink to your website."
        />
        <Ol>
          <Step n={6}>
            Scroll down a little to <strong>Signature defaults</strong>. Set
            your new signature for both <em>New emails</em> and{" "}
            <em>Replies/forwards</em>.
          </Step>
          <Step n={7}>
            Scroll to the very bottom of the settings page and click{" "}
            <strong>Save Changes</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — Signature defaults and Save Changes button"
          caption="Don't forget to set the signature as default for new emails and replies, then save."
        />
        <Callout>
          Still sending work emails from a @gmail.com address?{" "}
          <InlineLink href="/en/blog/why-use-a-professional-domain-email">
            Here's why switching to a custom domain email makes a difference
          </InlineLink>{" "}
          — it takes less than an hour to set up.
        </Callout>
      </Section>

      <Section id="outlook-web">
        <H2>Outlook (web — Microsoft 365)</H2>
        <P>
          If you use Outlook through a browser (outlook.com or your company's
          Microsoft 365 portal), here's how to update your signature:
        </P>
        <Ol>
          <Step n={1}>
            Sign in to your Outlook account and click the{" "}
            <strong>gear icon</strong> in the top-right corner.
          </Step>
          <Step n={2}>
            At the bottom of the settings panel, click{" "}
            <strong>"View all Outlook settings"</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook web — settings panel with 'View all Outlook settings' link"
          caption="Scroll to the bottom of the settings panel to find the 'View all Outlook settings' link."
        />
        <Ol>
          <Step n={3}>
            Go to <strong>Mail</strong> → <strong>Compose and reply</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook web — Mail > Compose and reply settings"
          caption="Navigate to Mail, then Compose and reply in the left-hand menu."
        />
        <Ol>
          <Step n={4}>
            Under <strong>Email signature</strong>, type your signature in the
            editor. You can format text, add links, and adjust font size using
            the toolbar.
          </Step>
          <Step n={5}>
            Check <strong>"Automatically include my signature on new messages"</strong>{" "}
            and optionally on replies and forwards.
          </Step>
          <Step n={6}>
            Click <strong>Save</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook web — email signature editor and save button"
          caption="Type and format your signature, enable automatic insertion, then click Save."
        />
      </Section>

      <Section id="outlook-desktop">
        <H2>Outlook (desktop — Windows)</H2>
        <P>
          If you use the Outlook desktop app on Windows, the signature settings
          are located in a separate dialog:
        </P>
        <Ol>
          <Step n={1}>
            Open Outlook and click <strong>File</strong> in the top-left corner.
          </Step>
          <Step n={2}>
            Click <strong>Options</strong> near the bottom of the left panel.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook desktop — File menu with Options"
          caption="Go to File, then click Options at the bottom of the left panel."
        />
        <Ol>
          <Step n={3}>
            In the Outlook Options window, select <strong>Mail</strong> on the
            left, then click the <strong>Signatures…</strong> button.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook desktop — Options dialog, Mail section, Signatures button"
          caption="In the Mail section, click the 'Signatures…' button to open the signature manager."
        />
        <Ol>
          <Step n={4}>
            Click <strong>New</strong>, give your signature a name, and
            click <strong>OK</strong>.
          </Step>
          <Step n={5}>
            Type your signature in the large text area at the bottom.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook desktop — signature editor"
          caption="The editor lets you format text, add images, and insert hyperlinks."
        />
        <Ol>
          <Step n={6}>
            Under <strong>Choose default signature</strong>, select your
            signature for <em>New messages</em> and{" "}
            <em>Replies/forwards</em>.
          </Step>
          <Step n={7}>
            Click <strong>OK</strong> to save and close.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook desktop — Choose default signature dropdowns"
          caption="Set your signature as default for new messages and replies, then click OK."
        />
      </Section>

      <Section id="thunderbird">
        <H2>Thunderbird</H2>
        <P>
          Mozilla Thunderbird keeps signature settings inside the account
          settings for each email address:
        </P>
        <Ol>
          <Step n={1}>
            Open Thunderbird. Click the <strong>Menu button</strong> (three
            horizontal lines, top-right) and choose{" "}
            <strong>Account Settings</strong>.
          </Step>
        </Ol>
        <Callout>
          On Windows or Linux you can also go to <strong>Edit</strong> →{" "}
          <strong>Account Settings</strong>. On macOS:{" "}
          <strong>Thunderbird</strong> → <strong>Account Settings</strong>.
        </Callout>
        <Screenshot
          alt="Thunderbird — menu button and Account Settings option"
          caption="Open the menu (top-right) and click Account Settings."
        />
        <Ol>
          <Step n={2}>
            In the left panel, click the email account you want to update.
          </Step>
        </Ol>
        <Screenshot
          alt="Thunderbird — Account Settings with email accounts listed on the left"
          caption="Select the account you want to configure in the left-hand panel."
        />
        <Ol>
          <Step n={3}>
            Check <strong>"Attach this signature"</strong> and type your
            signature in the text box below.
          </Step>
          <Step n={4}>
            If you'd like to use formatting (bold, links), check{" "}
            <strong>"Use HTML"</strong> first — this enables a basic formatting
            toolbar.
          </Step>
          <Step n={5}>
            Click <strong>OK</strong> to save.
          </Step>
        </Ol>
        <Screenshot
          alt="Thunderbird — signature text box with 'Attach this signature' checkbox"
          caption="Check 'Attach this signature', type your text, and enable HTML formatting if needed."
        />
      </Section>

      <Section id="apple-mail">
        <H2>Apple Mail</H2>
        <P>
          On a Mac, Apple Mail has a dedicated Signatures tab in its settings:
        </P>
        <Ol>
          <Step n={1}>
            Open <strong>Mail</strong> and go to the menu bar:{" "}
            <strong>Mail</strong> → <strong>Settings</strong> (or{" "}
            <strong>Preferences</strong> on older macOS versions).
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — Mail menu showing Settings option"
          caption="Open Mail's settings from the Mail menu in the menu bar."
        />
        <Ol>
          <Step n={2}>
            Click the <strong>Signatures</strong> tab.
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — Settings window with Signatures tab selected"
          caption="The Signatures tab is where all your signature configurations live."
        />
        <Ol>
          <Step n={3}>
            Select your email account in the left column, then click the{" "}
            <strong>+</strong> button to create a new signature.
          </Step>
          <Step n={4}>
            Give it a name and type your signature in the right panel.
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — Signatures tab with account, signature name, and signature text columns"
          caption="Select your account on the left, create a signature in the middle, and edit the text on the right."
        />
        <Ol>
          <Step n={5}>
            To set it as the default, drag the signature name from the middle
            column onto your account name in the left column.
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — dragging signature onto account to set as default"
          caption="Drag your signature onto the account name to make it the default for that account."
        />
      </Section>

      <Section id="tips">
        <H2>Tips for a better signature</H2>
        <Ul>
          <Li>
            <strong>Less is more.</strong> Aim for 4 lines or fewer. If it
            takes longer to read than the email itself, trim it.
          </Li>
          <Li>
            <strong>Test on mobile.</strong> Most emails are read on a phone.
            Send yourself a test email and check that it looks clean on a small
            screen.
          </Li>
          <Li>
            <strong>Avoid using images as your main content.</strong> Images
            are often blocked by default or filtered as spam. If you use a
            logo, always include a text fallback.
          </Li>
          <Li>
            <strong>Standardise across your team.</strong> If you have
            employees or collaborators, agree on a shared template so every
            email looks consistent.
          </Li>
          <Li>
            <strong>Keep it up to date.</strong> An old phone number or
            previous job title looks careless. Set a reminder to review your
            signature when anything changes.
          </Li>
        </Ul>
      </Section>
    </>
  );
}

function ContentFR() {
  return (
    <>
      <Section id="what-to-include">
        <H2>Que mettre dans sa signature</H2>
        <P>
          Avant de modifier quoi que ce soit, il est utile de savoir à quoi
          ressemble une bonne signature. Inutile d'en faire trop — l'objectif
          est de donner au destinataire les informations essentielles pour vous
          recontacter, sans alourdir chaque email.
        </P>
        <Ul>
          <Li>Votre prénom et votre nom</Li>
          <Li>Votre titre et le nom de votre entreprise</Li>
          <Li>Un numéro de téléphone (facultatif, mais utile pour vos clients)</Li>
          <Li>L'URL de votre site web</Li>
          <Li>Un ou deux liens vers vos réseaux sociaux au maximum</Li>
        </Ul>
        <Callout type="warning">
          Limitez-vous à 4 ou 5 lignes. Une signature plus longue que l'email
          lui-même est une erreur fréquente. Évitez les images volumineuses, les
          polices décoratives et les longs avertissements légaux — ils s'affichent
          souvent mal dans d'autres clients de messagerie et peuvent déclencher
          des filtres anti-spam.
        </Callout>
      </Section>

      <Section id="gmail">
        <H2>Gmail</H2>
        <P>
          Gmail gère les signatures depuis son panneau de paramètres. Voici
          comment ajouter ou mettre à jour la vôtre :
        </P>
        <Ol>
          <Step n={1}>
            Ouvrez <strong>Gmail</strong> dans votre navigateur et cliquez sur
            l'<strong>icône d'engrenage</strong> en haut à droite.
          </Step>
          <Step n={2}>
            Cliquez sur <strong>"Voir tous les paramètres"</strong> en haut du
            panneau qui apparaît.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — icône d'engrenage et lien 'Voir tous les paramètres'"
          caption="Cliquez sur l'engrenage, puis sur 'Voir tous les paramètres' pour accéder à la page complète."
        />
        <Ol>
          <Step n={3}>
            Restez sur l'onglet <strong>Général</strong> et faites défiler
            jusqu'à la section <strong>Signature</strong>.
          </Step>
          <Step n={4}>
            Cliquez sur <strong>"Créer"</strong>, donnez un nom à votre
            signature (par exemple "Travail") puis cliquez sur{" "}
            <strong>Créer</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — section Signature dans l'onglet Général"
          caption="La section Signature se trouve dans l'onglet Général, environ à mi-chemin de la page."
        />
        <Ol>
          <Step n={5}>
            Tapez votre signature dans la zone de texte. Utilisez la barre
            d'outils pour mettre votre nom en gras, ajuster la taille de police
            ou ajouter un lien cliquable vers votre site.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — éditeur de signature avec barre d'outils de mise en forme"
          caption="Utilisez la barre d'outils pour mettre votre nom en gras et ajouter un lien vers votre site."
        />
        <Ol>
          <Step n={6}>
            Faites défiler légèrement vers le bas jusqu'à{" "}
            <strong>Valeurs par défaut de la signature</strong>. Sélectionnez
            votre nouvelle signature pour les <em>Nouveaux e-mails</em> et les{" "}
            <em>Réponses/transferts</em>.
          </Step>
          <Step n={7}>
            Faites défiler jusqu'en bas de la page et cliquez sur{" "}
            <strong>Enregistrer les modifications</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Gmail — Valeurs par défaut de la signature et bouton Enregistrer"
          caption="N'oubliez pas de définir la signature par défaut pour les nouveaux emails et les réponses, puis sauvegardez."
        />
        <Callout>
          Vous envoyez encore vos emails professionnels depuis une adresse
          @gmail.com ?{" "}
          <InlineLink href="/fr/blog/why-use-a-professional-domain-email">
            Voici pourquoi passer à une adresse au nom de domaine fait la
            différence
          </InlineLink>{" "}
          — la configuration prend moins d'une heure.
        </Callout>
      </Section>

      <Section id="outlook-web">
        <H2>Outlook (web — Microsoft 365)</H2>
        <P>
          Si vous utilisez Outlook depuis un navigateur (outlook.com ou le
          portail Microsoft 365 de votre entreprise), voici comment modifier
          votre signature :
        </P>
        <Ol>
          <Step n={1}>
            Connectez-vous à votre compte Outlook et cliquez sur l'
            <strong>icône d'engrenage</strong> en haut à droite.
          </Step>
          <Step n={2}>
            En bas du panneau de paramètres, cliquez sur{" "}
            <strong>"Afficher tous les paramètres Outlook"</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook web — panneau de paramètres avec le lien 'Afficher tous les paramètres Outlook'"
          caption="Faites défiler jusqu'en bas du panneau pour trouver le lien 'Afficher tous les paramètres Outlook'."
        />
        <Ol>
          <Step n={3}>
            Accédez à <strong>Courrier</strong> →{" "}
            <strong>Écrire et répondre</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook web — paramètres Courrier > Écrire et répondre"
          caption="Naviguez vers Courrier, puis Écrire et répondre dans le menu de gauche."
        />
        <Ol>
          <Step n={4}>
            Sous <strong>Signature électronique</strong>, tapez votre signature
            dans l'éditeur. Vous pouvez mettre en forme le texte, ajouter des
            liens et ajuster la taille de police avec la barre d'outils.
          </Step>
          <Step n={5}>
            Cochez <strong>"Inclure automatiquement ma signature dans les nouveaux messages"</strong>{" "}
            et éventuellement dans les réponses et les transferts.
          </Step>
          <Step n={6}>
            Cliquez sur <strong>Enregistrer</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook web — éditeur de signature et bouton Enregistrer"
          caption="Rédigez et mettez en forme votre signature, activez l'insertion automatique, puis cliquez sur Enregistrer."
        />
      </Section>

      <Section id="outlook-desktop">
        <H2>Outlook (bureau — Windows)</H2>
        <P>
          Si vous utilisez l'application Outlook sur Windows, les paramètres
          de signature se trouvent dans une boîte de dialogue séparée :
        </P>
        <Ol>
          <Step n={1}>
            Ouvrez Outlook et cliquez sur <strong>Fichier</strong> en haut à
            gauche.
          </Step>
          <Step n={2}>
            Cliquez sur <strong>Options</strong> en bas du panneau gauche.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook bureau — menu Fichier avec Options"
          caption="Allez dans Fichier, puis cliquez sur Options en bas du panneau gauche."
        />
        <Ol>
          <Step n={3}>
            Dans la fenêtre Options Outlook, sélectionnez <strong>Courrier</strong>{" "}
            à gauche, puis cliquez sur le bouton <strong>Signatures…</strong>
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook bureau — fenêtre Options, section Courrier, bouton Signatures"
          caption="Dans la section Courrier, cliquez sur le bouton 'Signatures…' pour ouvrir le gestionnaire de signatures."
        />
        <Ol>
          <Step n={4}>
            Cliquez sur <strong>Nouveau</strong>, donnez un nom à votre
            signature, puis cliquez sur <strong>OK</strong>.
          </Step>
          <Step n={5}>
            Tapez votre signature dans la grande zone de texte en bas.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook bureau — éditeur de signature"
          caption="L'éditeur vous permet de mettre en forme le texte, d'ajouter des images et d'insérer des liens."
        />
        <Ol>
          <Step n={6}>
            Sous <strong>Choisir une signature par défaut</strong>, sélectionnez
            votre signature pour les <em>Nouveaux messages</em> et les{" "}
            <em>Réponses/transferts</em>.
          </Step>
          <Step n={7}>
            Cliquez sur <strong>OK</strong> pour enregistrer et fermer.
          </Step>
        </Ol>
        <Screenshot
          alt="Outlook bureau — listes déroulantes Choisir une signature par défaut"
          caption="Définissez votre signature par défaut pour les nouveaux messages et les réponses, puis cliquez sur OK."
        />
      </Section>

      <Section id="thunderbird">
        <H2>Thunderbird</H2>
        <P>
          Mozilla Thunderbird conserve les paramètres de signature dans les
          paramètres de compte de chaque adresse email :
        </P>
        <Ol>
          <Step n={1}>
            Ouvrez Thunderbird. Cliquez sur le <strong>bouton Menu</strong>{" "}
            (trois lignes horizontales, en haut à droite) et choisissez{" "}
            <strong>Paramètres des comptes</strong>.
          </Step>
        </Ol>
        <Callout>
          Sur Windows ou Linux, vous pouvez aussi aller dans{" "}
          <strong>Édition</strong> → <strong>Paramètres des comptes</strong>.
          Sur macOS : <strong>Thunderbird</strong> →{" "}
          <strong>Paramètres des comptes</strong>.
        </Callout>
        <Screenshot
          alt="Thunderbird — bouton Menu et option Paramètres des comptes"
          caption="Ouvrez le menu (en haut à droite) et cliquez sur Paramètres des comptes."
        />
        <Ol>
          <Step n={2}>
            Dans le panneau de gauche, cliquez sur le compte email que vous
            souhaitez modifier.
          </Step>
        </Ol>
        <Screenshot
          alt="Thunderbird — Paramètres des comptes avec la liste des comptes email à gauche"
          caption="Sélectionnez le compte à configurer dans le panneau de gauche."
        />
        <Ol>
          <Step n={3}>
            Cochez <strong>"Utiliser une signature"</strong> et tapez votre
            signature dans la zone de texte.
          </Step>
          <Step n={4}>
            Si vous souhaitez utiliser une mise en forme (gras, liens), cochez{" "}
            <strong>"Utiliser le HTML"</strong> — cela active une barre d'outils
            de mise en forme basique.
          </Step>
          <Step n={5}>
            Cliquez sur <strong>OK</strong> pour enregistrer.
          </Step>
        </Ol>
        <Screenshot
          alt="Thunderbird — zone de texte de signature avec case 'Utiliser une signature'"
          caption="Cochez 'Utiliser une signature', tapez votre texte et activez le HTML si nécessaire."
        />
      </Section>

      <Section id="apple-mail">
        <H2>Apple Mail</H2>
        <P>
          Sur Mac, Apple Mail dispose d'un onglet Signatures dédié dans ses
          réglages :
        </P>
        <Ol>
          <Step n={1}>
            Ouvrez <strong>Mail</strong> et allez dans la barre de menus :{" "}
            <strong>Mail</strong> → <strong>Réglages</strong> (ou{" "}
            <strong>Préférences</strong> sur les anciennes versions de macOS).
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — menu Mail avec l'option Réglages"
          caption="Accédez aux réglages de Mail depuis le menu Mail dans la barre de menus."
        />
        <Ol>
          <Step n={2}>
            Cliquez sur l'onglet <strong>Signatures</strong>.
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — fenêtre Réglages avec l'onglet Signatures sélectionné"
          caption="L'onglet Signatures regroupe toutes vos configurations de signature."
        />
        <Ol>
          <Step n={3}>
            Sélectionnez votre compte email dans la colonne de gauche, puis
            cliquez sur le bouton <strong>+</strong> pour créer une nouvelle
            signature.
          </Step>
          <Step n={4}>
            Donnez-lui un nom et tapez votre signature dans le panneau de droite.
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — onglet Signatures avec les colonnes compte, nom et texte"
          caption="Sélectionnez votre compte à gauche, créez une signature au centre et modifiez le texte à droite."
        />
        <Ol>
          <Step n={5}>
            Pour la définir par défaut, faites glisser le nom de la signature
            depuis la colonne centrale vers le nom de votre compte dans la
            colonne de gauche.
          </Step>
        </Ol>
        <Screenshot
          alt="Apple Mail — glisser une signature sur le compte pour la définir par défaut"
          caption="Faites glisser votre signature sur le nom du compte pour en faire la signature par défaut."
        />
      </Section>

      <Section id="tips">
        <H2>Conseils pour une meilleure signature</H2>
        <Ul>
          <Li>
            <strong>Moins, c'est plus.</strong> Visez 4 lignes maximum. Si la
            signature est plus longue que l'email, raccourcissez-la.
          </Li>
          <Li>
            <strong>Testez sur mobile.</strong> La plupart des emails sont lus
            sur téléphone. Envoyez-vous un email de test et vérifiez que la
            signature s'affiche correctement sur un petit écran.
          </Li>
          <Li>
            <strong>Évitez les images comme contenu principal.</strong> Elles
            sont souvent bloquées par défaut ou filtrées comme spam. Si vous
            utilisez un logo, incluez toujours une alternative en texte.
          </Li>
          <Li>
            <strong>Standardisez au sein de votre équipe.</strong> Si vous
            avez des collaborateurs, définissez un modèle commun pour que
            chaque email ait la même apparence.
          </Li>
          <Li>
            <strong>Maintenez-la à jour.</strong> Un ancien numéro de téléphone
            ou un intitulé de poste dépassé donne une image de négligence.
            Pensez à relire votre signature à chaque changement.
          </Li>
        </Ul>
      </Section>
    </>
  );
}

export default function EmailSignatureGuideContent({ lang }: { lang: Lang }) {
  return lang === "fr" ? <ContentFR /> : <ContentEN />;
}

import { CheckCircle, AlertTriangle } from "lucide-react";

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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-slate-800 mt-6 mb-2 leading-snug">
      {children}
    </h3>
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
  return <ul className="space-y-2 mb-6 text-[15px] text-slate-700">{children}</ul>;
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

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 mb-6 font-mono text-sm text-slate-700 leading-relaxed">
      {children}
    </div>
  );
}

function Swatches({ colors, labels }: { colors: string[]; labels?: string[] }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {colors.map((color, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <div
            className="w-14 h-14 rounded-xl border border-black/10 shadow-sm"
            style={{ background: color }}
          />
          {labels?.[i] && (
            <span className="text-[11px] text-slate-500 font-mono">{labels[i]}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── TOC ───────────────────────────────────────────────────────────────────────

export const toc = {
  en: [
    { id: "color-wheel", label: "The color wheel & HSL" },
    { id: "tints", label: "Tints" },
    { id: "complementary", label: "Complementary" },
    { id: "analogous", label: "Analogous" },
    { id: "triadic", label: "Triadic" },
    { id: "split-complementary", label: "Split-complementary" },
    { id: "how-to-choose", label: "How to choose" },
  ],
  fr: [
    { id: "color-wheel", label: "La roue & le modèle HSL" },
    { id: "tints", label: "Teintes" },
    { id: "complementary", label: "Complémentaire" },
    { id: "analogous", label: "Analogue" },
    { id: "triadic", label: "Triadique" },
    { id: "split-complementary", label: "Complémentaire divisé" },
    { id: "how-to-choose", label: "Comment choisir" },
  ],
};

// ── EN content ────────────────────────────────────────────────────────────────

function ContentEN() {
  return (
    <div className="prose-custom">
      <Section id="color-wheel">
        <H2>The color wheel and the HSL model</H2>
        <P>
          Every color harmony is computed on a <strong>color wheel</strong> — a circular arrangement of hues where neighbouring colors blend into each other. The model behind it is <strong>HSL</strong>: Hue, Saturation, Lightness.
        </P>
        <Ul>
          <Li><strong>Hue</strong> — an angle from 0° to 360°. Red is at 0°, green at 120°, blue at 240°, and the circle closes back at red at 360°.</Li>
          <Li><strong>Saturation</strong> — how vivid the color is, from 0 % (grey) to 100 % (full color).</Li>
          <Li><strong>Lightness</strong> — how bright it is, from 0 % (black) through 50 % (pure color) to 100 % (white).</Li>
        </Ul>
        <P>
          Once you represent color as an angle, computing harmonies becomes simple geometry: rotate by a fixed number of degrees around the wheel. The five harmonies Zapia offers are each a different rotation pattern.
        </P>
        <Callout>
          HSL is not the only model — HSB, LCH and Oklab are more perceptually uniform — but HSL is intuitive and is what CSS, SVG and most design tools expose natively.
        </Callout>
      </Section>

      <Section id="tints">
        <H2>Tints — same hue, different lightness</H2>
        <P>
          A tint palette keeps the hue constant and varies saturation and lightness to produce a range of shades from very light to very dark. It is the most conservative harmony — you are technically staying on a single point of the color wheel and just moving up and down the brightness axis.
        </P>
        <Swatches
          colors={[
            "hsl(220,70%,92%)",
            "hsl(220,70%,78%)",
            "hsl(220,65%,60%)",
            "hsl(220,65%,45%)",
            "hsl(220,65%,30%)",
          ]}
          labels={["100", "300", "500", "700", "900"]}
        />
        <Formula>
          H₂ = H₁ (unchanged)<br />
          S₂ ≈ S₁ (slight adjustments for readability)<br />
          L varies: 90 % → 70 % → 50 % → 35 % → 20 %
        </Formula>
        <H3>Why it feels good</H3>
        <P>
          Tints feel cohesive and safe. The brain groups them as "the same thing at different intensities", so there is no visual tension. They are ideal for backgrounds, states (default, hover, active) and text hierarchies within a single brand color.
        </P>
      </Section>

      <Section id="complementary">
        <H2>Complementary — the color directly opposite</H2>
        <P>
          A complementary color is exactly 180° away on the wheel. If your brand color is blue (220°), its complement is orange (40°).
        </P>
        <Swatches
          colors={["hsl(220,65%,55%)", "hsl(40,80%,55%)"]}
          labels={["Base · 220°", "Complement · 40°"]}
        />
        <Formula>
          H₂ = (H₁ + 180) % 360
        </Formula>
        <H3>Why it feels good</H3>
        <P>
          The human visual system processes color through <strong>opponent channels</strong>: red vs. green, blue vs. yellow. Complementary pairs sit on opposite ends of these channels, creating the maximum possible contrast. This is why the combination feels electric — your eye is stimulated on two opposite channels simultaneously.
        </P>
        <P>
          It is also why, if you stare at a red square for 30 seconds then look at a white wall, you see a cyan afterimage: your red-sensitive cells are fatigued and the green/blue channels fire unbalanced.
        </P>
        <Callout type="warning">
          Full saturation complementary pairs can be tiring at large sizes. In practice, soften one of the two — make the dominant color muted and use the complement as an accent only.
        </Callout>
      </Section>

      <Section id="analogous">
        <H2>Analogous — neighbours on the wheel</H2>
        <P>
          Analogous colors are adjacent on the wheel, typically within ±30° of the base hue. A blue base (220°) gives you cyan-blue (190°) and indigo (250°) as its analogous partners.
        </P>
        <Swatches
          colors={[
            "hsl(190,65%,55%)",
            "hsl(220,65%,55%)",
            "hsl(250,65%,55%)",
          ]}
          labels={["190°", "Base · 220°", "250°"]}
        />
        <Formula>
          H₂ = (H₁ + 30) % 360<br />
          H₃ = (H₁ − 30 + 360) % 360
        </Formula>
        <H3>Why it feels good</H3>
        <P>
          Nature is full of analogous palettes — the gradient of a sunset, the greens of a forest, ocean depths. Because the hues share a common "parent", the eye reads them as a unified family rather than competing colors. Analogous palettes feel calm, natural and approachable. They are excellent for backgrounds, illustrations and UI surfaces where you want warmth without distraction.
        </P>
        <P>
          The trade-off is low contrast between the colors themselves. Always pair an analogous background with a neutral (white, dark grey) for text.
        </P>
      </Section>

      <Section id="triadic">
        <H2>Triadic — three equidistant points</H2>
        <P>
          A triadic palette places three hues exactly 120° apart, forming an equilateral triangle on the color wheel. Starting at blue (220°), you get red-orange (340°) and yellow-green (100°).
        </P>
        <Swatches
          colors={[
            "hsl(220,65%,55%)",
            "hsl(340,65%,55%)",
            "hsl(100,55%,45%)",
          ]}
          labels={["Base · 220°", "340°", "100°"]}
        />
        <Formula>
          H₂ = (H₁ + 120) % 360<br />
          H₃ = (H₁ + 240) % 360
        </Formula>
        <H3>Why it feels good</H3>
        <P>
          Triadic palettes are vibrant and balanced at the same time. Because the three hues are evenly spaced, no single color dominates perceptually — the eye moves between them in a triangular rhythm. Artists and graphic designers often use this scheme for playful, energetic work.
        </P>
        <P>
          In UI, let one color be dominant (60 %), one secondary (30 %), and use the third sparingly as an accent (10 %). This "60-30-10 rule" keeps it lively without becoming chaotic.
        </P>
      </Section>

      <Section id="split-complementary">
        <H2>Split-complementary — the softer opposite</H2>
        <P>
          Split-complementary takes the complement (H + 180°) and splits it ±30°, giving you two colors flanking the direct opposite instead of the opposite itself. For blue (220°), rather than orange (40°) you get red-orange (10°) and yellow-orange (70°).
        </P>
        <Swatches
          colors={[
            "hsl(220,65%,55%)",
            "hsl(10,70%,58%)",
            "hsl(70,65%,48%)",
          ]}
          labels={["Base · 220°", "10°", "70°"]}
        />
        <Formula>
          H₂ = (H₁ + 150) % 360<br />
          H₃ = (H₁ + 210) % 360
        </Formula>
        <H3>Why it feels good</H3>
        <P>
          This is the most versatile harmony. You get almost the same visual tension as complementary — still strong contrast, still a dynamic feel — but the two warm colors are less aggressive against each other. The split removes the "staring contest" between pure opposites.
        </P>
        <P>
          It is particularly good for products that want to feel bold and modern but not harsh. Many successful tech interfaces land here: a dominant cool color with two warm accents that guide attention without clashing.
        </P>
      </Section>

      <Section id="how-to-choose">
        <H2>How to choose the right harmony</H2>
        <Ul>
          <Li><strong>Tints</strong> — start here. Every palette needs a tint scale for states and backgrounds.</Li>
          <Li><strong>Complementary</strong> — use when you need a strong call-to-action that pops against the brand color. Handle with care at large sizes.</Li>
          <Li><strong>Analogous</strong> — ideal for calm, editorial, or nature-inspired interfaces. Pair with a dark neutral for body text.</Li>
          <Li><strong>Triadic</strong> — great for playful or consumer products. Apply the 60-30-10 rule to avoid visual noise.</Li>
          <Li><strong>Split-complementary</strong> — the safe default when you want contrast without tension. Works well for most SaaS and productivity tools.</Li>
        </Ul>
        <P>
          There is no objectively correct harmony — the "right" one is the one that fits the tone of your product and the expectations of your audience. What color theory gives you is a principled starting point so you are not guessing.
        </P>
        <Callout>
          When in doubt, pick a single strong hue, build its tint scale, and add one split-complementary accent for interactive elements. That covers 80 % of UI needs.
        </Callout>
      </Section>
    </div>
  );
}

// ── FR content ────────────────────────────────────────────────────────────────

function ContentFR() {
  return (
    <div className="prose-custom">
      <Section id="color-wheel">
        <H2>La roue chromatique et le modèle HSL</H2>
        <P>
          Toutes les harmonies de couleurs se calculent sur une <strong>roue chromatique</strong> — une disposition circulaire des teintes où les couleurs voisines se fondent les unes dans les autres. Le modèle sous-jacent est <strong>HSL</strong> : Teinte (Hue), Saturation, Luminosité (Lightness).
        </P>
        <Ul>
          <Li><strong>Teinte</strong> — un angle de 0° à 360°. Le rouge est à 0°, le vert à 120°, le bleu à 240°, et le cercle se referme sur le rouge à 360°.</Li>
          <Li><strong>Saturation</strong> — l'intensité de la couleur, de 0 % (gris) à 100 % (couleur pure).</Li>
          <Li><strong>Luminosité</strong> — la clarté, de 0 % (noir) à 50 % (couleur pure) jusqu'à 100 % (blanc).</Li>
        </Ul>
        <P>
          Une fois la couleur représentée comme un angle, calculer les harmonies devient une simple géométrie : faire pivoter d'un nombre fixe de degrés autour de la roue. Les cinq harmonies proposées par Zapia correspondent chacune à un schéma de rotation différent.
        </P>
        <Callout>
          HSL n'est pas le seul modèle — HSB, LCH et Oklab sont plus précis perceptuellement — mais HSL est intuitif et c'est ce qu'exposent nativement CSS, SVG et la plupart des outils de design.
        </Callout>
      </Section>

      <Section id="tints">
        <H2>Teintes — même teinte, luminosité variable</H2>
        <P>
          Une palette de teintes garde la teinte (H) constante et fait varier la saturation et la luminosité pour produire une gamme de nuances allant du très clair au très foncé. C'est l'harmonie la plus conservative — on reste techniquement sur un seul point de la roue et on se déplace uniquement sur l'axe de luminosité.
        </P>
        <Swatches
          colors={[
            "hsl(220,70%,92%)",
            "hsl(220,70%,78%)",
            "hsl(220,65%,60%)",
            "hsl(220,65%,45%)",
            "hsl(220,65%,30%)",
          ]}
          labels={["100", "300", "500", "700", "900"]}
        />
        <Formula>
          H₂ = H₁ (inchangée)<br />
          S₂ ≈ S₁ (légers ajustements pour la lisibilité)<br />
          L varie : 90 % → 70 % → 50 % → 35 % → 20 %
        </Formula>
        <H3>Pourquoi ça fonctionne</H3>
        <P>
          Les teintes donnent une impression de cohérence et de sécurité. Le cerveau les regroupe comme "la même chose à des intensités différentes", sans tension visuelle. Elles sont idéales pour les fonds, les états (normal, survol, actif) et les hiérarchies de texte au sein d'une même couleur de marque.
        </P>
      </Section>

      <Section id="complementary">
        <H2>Complémentaire — la couleur exactement opposée</H2>
        <P>
          Une couleur complémentaire se trouve exactement à 180° sur la roue. Si votre couleur de marque est le bleu (220°), son complémentaire est l'orange (40°).
        </P>
        <Swatches
          colors={["hsl(220,65%,55%)", "hsl(40,80%,55%)"]}
          labels={["Base · 220°", "Complémentaire · 40°"]}
        />
        <Formula>
          H₂ = (H₁ + 180) % 360
        </Formula>
        <H3>Pourquoi ça fonctionne</H3>
        <P>
          Le système visuel humain traite les couleurs par <strong>canaux adversariaux</strong> : rouge contre vert, bleu contre jaune. Les paires complémentaires se trouvent aux extrémités opposées de ces canaux, créant le contraste maximum possible. C'est pourquoi la combinaison semble électrique — l'œil est stimulé simultanément sur deux canaux opposés.
        </P>
        <P>
          C'est également la raison pour laquelle, si vous fixez un carré rouge pendant 30 secondes puis regardez un mur blanc, vous voyez une image rémanente cyan : vos cellules sensibles au rouge sont fatiguées et les canaux vert/bleu s'activent en déséquilibre.
        </P>
        <Callout type="warning">
          Les paires complémentaires à pleine saturation peuvent être fatigantes sur de grandes surfaces. En pratique, atténuez l'une des deux couleurs — rendez la couleur dominante plus douce et utilisez le complémentaire uniquement comme couleur d'accent.
        </Callout>
      </Section>

      <Section id="analogous">
        <H2>Analogue — les voisines sur la roue</H2>
        <P>
          Les couleurs analogues sont adjacentes sur la roue, généralement dans un rayon de ±30° par rapport à la teinte de base. Un bleu de base (220°) donne un cyan-bleu (190°) et un indigo (250°) comme partenaires analogues.
        </P>
        <Swatches
          colors={[
            "hsl(190,65%,55%)",
            "hsl(220,65%,55%)",
            "hsl(250,65%,55%)",
          ]}
          labels={["190°", "Base · 220°", "250°"]}
        />
        <Formula>
          H₂ = (H₁ + 30) % 360<br />
          H₃ = (H₁ − 30 + 360) % 360
        </Formula>
        <H3>Pourquoi ça fonctionne</H3>
        <P>
          La nature regorge de palettes analogues — le dégradé d'un coucher de soleil, les verts d'une forêt, les profondeurs de l'océan. Parce que les teintes partagent une "origine" commune, l'œil les perçoit comme une famille unifiée plutôt que des couleurs en compétition. Les palettes analogues semblent calmes, naturelles et accessibles. Elles conviennent parfaitement aux fonds, illustrations et surfaces d'interface où vous souhaitez de la chaleur sans distraction.
        </P>
        <P>
          La contrepartie est un faible contraste entre les couleurs elles-mêmes. Associez toujours un fond analogue à un neutre (blanc, gris foncé) pour le texte.
        </P>
      </Section>

      <Section id="triadic">
        <H2>Triadique — trois points équidistants</H2>
        <P>
          Une palette triadique place trois teintes exactement à 120° d'intervalle, formant un triangle équilatéral sur la roue chromatique. En partant du bleu (220°), on obtient un rouge-orange (340°) et un jaune-vert (100°).
        </P>
        <Swatches
          colors={[
            "hsl(220,65%,55%)",
            "hsl(340,65%,55%)",
            "hsl(100,55%,45%)",
          ]}
          labels={["Base · 220°", "340°", "100°"]}
        />
        <Formula>
          H₂ = (H₁ + 120) % 360<br />
          H₃ = (H₁ + 240) % 360
        </Formula>
        <H3>Pourquoi ça fonctionne</H3>
        <P>
          Les palettes triadiques sont à la fois vibrantes et équilibrées. Parce que les trois teintes sont régulièrement espacées, aucune ne domine perceptuellement — l'œil se déplace entre elles dans un rythme triangulaire. Les artistes et graphistes utilisent souvent ce schéma pour des créations ludiques et énergiques.
        </P>
        <P>
          En interface, laissez une couleur dominer (60 %), une couleur secondaire (30 %), et utilisez la troisième avec parcimonie comme accent (10 %). Cette règle "60-30-10" maintient la vivacité sans chaos visuel.
        </P>
      </Section>

      <Section id="split-complementary">
        <H2>Complémentaire divisé — l'opposé plus doux</H2>
        <P>
          Le complémentaire divisé prend le complémentaire (H + 180°) et le "divise" de ±30°, donnant deux couleurs flanquant l'opposé direct plutôt que l'opposé lui-même. Pour le bleu (220°), au lieu de l'orange pur (40°), on obtient un rouge-orange (10°) et un jaune-orange (70°).
        </P>
        <Swatches
          colors={[
            "hsl(220,65%,55%)",
            "hsl(10,70%,58%)",
            "hsl(70,65%,48%)",
          ]}
          labels={["Base · 220°", "10°", "70°"]}
        />
        <Formula>
          H₂ = (H₁ + 150) % 360<br />
          H₃ = (H₁ + 210) % 360
        </Formula>
        <H3>Pourquoi ça fonctionne</H3>
        <P>
          C'est l'harmonie la plus polyvalente. On obtient presque la même tension visuelle que le complémentaire — toujours un fort contraste, toujours un aspect dynamique — mais les deux couleurs chaudes sont moins agressives l'une contre l'autre. La division supprime le "bras de fer" entre deux purs opposés.
        </P>
        <P>
          C'est particulièrement adapté aux produits qui veulent paraître audacieux et modernes sans être agressifs. De nombreuses interfaces tech réussies s'y retrouvent : une couleur froide dominante avec deux accents chauds qui guident l'attention sans se heurter.
        </P>
      </Section>

      <Section id="how-to-choose">
        <H2>Comment choisir la bonne harmonie</H2>
        <Ul>
          <Li><strong>Teintes</strong> — commencez ici. Toute palette a besoin d'une gamme de teintes pour les états et les fonds.</Li>
          <Li><strong>Complémentaire</strong> — à utiliser quand vous avez besoin d'un appel à l'action fort qui ressort sur la couleur de marque. À manier avec soin sur de grandes surfaces.</Li>
          <Li><strong>Analogue</strong> — idéal pour les interfaces calmes, éditoriales ou inspirées de la nature. À associer à un neutre foncé pour le corps du texte.</Li>
          <Li><strong>Triadique</strong> — parfait pour les produits ludiques ou grand public. Appliquez la règle 60-30-10 pour éviter le bruit visuel.</Li>
          <Li><strong>Complémentaire divisé</strong> — le choix par défaut quand vous voulez du contraste sans tension. Fonctionne bien pour la plupart des outils SaaS et de productivité.</Li>
        </Ul>
        <P>
          Il n'existe pas d'harmonie objectivement correcte — la "bonne" est celle qui correspond au ton de votre produit et aux attentes de votre audience. Ce que la théorie des couleurs vous offre, c'est un point de départ raisonné pour ne pas avancer à tâtons.
        </P>
        <Callout>
          Dans le doute, choisissez une teinte forte, construisez sa gamme de nuances, et ajoutez un seul accent complémentaire divisé pour les éléments interactifs. Cela couvre 80 % des besoins d'interface.
        </Callout>
      </Section>
    </div>
  );
}

// ── Entry point ───────────────────────────────────────────────────────────────

export default function ColorTheoryGuideContent({ lang }: { lang: Lang }) {
  return lang === "fr" ? <ContentFR /> : <ContentEN />;
}

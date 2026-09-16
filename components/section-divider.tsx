/* Séparateur de section illustré (phase 3 design).
   Vague SVG teintée var(--theme-soft) : le hero « déborde » en douceur sur
   le contenu. Purement décoratif (aria-hidden), 0 image, 0 Ko.
   Sans data-theme sur la page, repli = couleur secondaire du site. */

export function SectionDivider() {
  return (
    <div aria-hidden="true" className="bg-background">
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-10 w-full md:h-14" focusable="false">
        <path
          d="M0,40 C240,64 480,8 720,28 C960,48 1200,16 1440,44 L1440,0 L0,0 Z"
          fill="var(--theme-soft, var(--secondary))"
        />
      </svg>
    </div>
  )
}

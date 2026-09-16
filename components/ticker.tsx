import Link from "next/link"

/* Bandeau défilant des chiffres chocs (phase 2 design).
   - 100 % CSS : sans JS, le bandeau reste lisible (1re moitié visible,
     défilement horizontal si animations réduites).
   - Chaque chiffre est sourcé en bref ; le détail vit sur /chiffres.
   - La 2e moitié (boucle infinie) est masquée aux lecteurs d'écran. */
const ITEMS = [
  { value: "~70 Mt", label: "d'e-déchets (GEM 2024)" },
  { value: "3,4 %", label: "des émissions mondiales (EENM 2025)" },
  { value: "~80 %", label: "vient de la fabrication (ADEME-Arcep 2023)" },
  { value: "415 TWh", label: "pour les datacenters (AIE 2025)" },
  { value: "12 000 L", label: "d'eau par smartphone (ADEME 2023)" },
  { value: "46 %", label: "collectés en France (Eurostat 2024)" },
]

function TickerRow({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item.value} className="flex items-baseline gap-2 whitespace-nowrap text-sm">
          <strong className="text-base font-bold text-theme-ink">{item.value}</strong>
          <span className="text-muted-foreground">{item.label}</span>
          <span aria-hidden="true" className="ml-8 text-theme">
            •
          </span>
        </span>
      ))}
    </div>
  )
}

export function Ticker() {
  return (
    <div className="ticker overflow-hidden border-y border-border bg-secondary/30 py-3" role="marquee" aria-label="Chiffres clés du numérique en bref, détail sur la page Chiffres">
      <Link href="/chiffres" className="ticker-track w-max" aria-label="Voir le détail des chiffres">
        <TickerRow />
        <TickerRow hidden />
      </Link>
    </div>
  )
}

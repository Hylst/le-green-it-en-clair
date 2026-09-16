"use client"

import { useState } from "react"
import { SourceTooltip } from "@/components/source-tooltip"

/* Curseur durée de vie du smartphone (phase 2 design).
   Les 80 kg CO₂e du cycle de vie (ADEME 2025, rappelés plus haut sur la
   page) sont amortis sur 2 à 6 ans : garder son téléphone plus longtemps
   fait chuter son impact annuel. Input range natif : clavier, tactile et
   lecteurs d'écran (sortie annoncée via aria-live) inclus d'office. */
const TOTAL_CO2_KG = 80

export function LifespanSlider() {
  const [years, setYears] = useState(3)
  const perYear = Math.round(TOTAL_CO2_KG / years)

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-2 font-semibold text-foreground">Et si vous le gardiez plus longtemps ?</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Faites glisser le curseur : l'impact annuel du même téléphone chute avec chaque année gagnée.
      </p>
      <label htmlFor="duree-vie-smartphone" className="mb-2 block text-sm font-medium text-foreground">
        Durée de vie : {years} ans
      </label>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-sm text-muted-foreground">2 ans</span>
        <input
          id="duree-vie-smartphone"
          type="range"
          min={2}
          max={6}
          step={1}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full"
        />
        <span aria-hidden="true" className="text-sm text-muted-foreground">6 ans</span>
      </div>
      <p className="mt-4 text-center text-2xl font-bold text-emerald-700 dark:text-emerald-400" aria-live="polite">
        ≈ {perYear} kg CO₂e par an
      </p>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {TOTAL_CO2_KG} kg CO₂e sur le cycle de vie amortis sur {years} ans (la fabrication représente ~75 % des
        impacts)
        <SourceTooltip
          className="ml-1 align-middle"
          source="ADEME, 2025"
          calculation={`80 ÷ ${years} ≈ ${perYear} kg CO₂e/an ; ~75 % des impacts à la fabrication (voir chiffres ci-dessus)`}
        />
      </p>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { SourceTooltip } from "@/components/source-tooltip";

export const PDF_COLORS = {
  primary: [5, 150, 105] as [number, number, number], // emerald-600
  secondary: [16, 185, 129] as [number, number, number], // emerald-500
  text: [30, 41, 59] as [number, number, number], // slate-800
  lightText: [100, 116, 139] as [number, number, number], // slate-500
  bg: [248, 250, 252] as [number, number, number], // slate-50
}

// Bandeau « périmètres » partagé (vague 2, plan outils 09/2026) : les trois outils
// d'estimation ne regardent pas la même chose, on l'annonce pour éviter les fausses
// comparaisons (« le streaming ne compte pas »). N'utilise que des chiffres déjà cités
// dans le code des outils (≈ 195 kg avec les réglages par défaut du calculateur,
// ≈ 330 kg CO₂e/an par internaute, GreenIT EENM 2025) ;
// le streaming et la page web sont formulés sans chiffre.
export function ScopeNote() {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-sm leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Chaque outil a son périmètre, ne comparez pas les résultats entre eux : le calculateur couvre votre vie
        numérique complète (équipements + usages, ≈ 195 kg CO₂e/an avec les réglages par défaut — smartphone,
        portable et TV — à comparer aux ≈ 330 kg de la moyenne mondiale par internaute{" "}
        <SourceTooltip
          source="GreenIT, Étude empreinte numérique mondiale (EENM), 2025"
          calculation="1,8 Gt CO₂e ÷ ~5,35 Md d'internautes ≈ 330 kg CO₂e/an"
        />
        ), le streaming ne compte que l&apos;énergie du réseau, et la page web une seule page hors fabrication.
        L&apos;important, c&apos;est la tendance, pas le chiffre exact.
      </span>
    </p>
  )
}

interface LabeledSliderProps {
  value: number[]
  min: number
  max: number
  step: number
  onValueChange: (value: number[]) => void
  unit?: string
  label: string
  // Diviseur d'affichage des graduations : le slider "appareils par employé"
  // manipule value × 10 (10-50) pour des pas de 0,5, mais affiche 1-5.
  tickDivisor?: number
}

export function LabeledSlider({ value, min, max, step, onValueChange, unit, label, tickDivisor = 1 }: LabeledSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 shrink-0"
          onClick={() => onValueChange([Math.max(min, value[0] - step)])}
          disabled={value[0] <= min}
          aria-label={`Diminuer ${label}`}
        >
          −
        </Button>
        <div className="flex-1 relative pb-6">
          <Slider value={value} onValueChange={onValueChange} min={min} max={max} step={step} aria-label={label} className="my-2" />
          <div className="absolute top-full left-0 w-full flex justify-between text-[10px] text-muted-foreground font-mono -mt-1 select-none pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="flex flex-col items-center gap-1">
                <span className="h-1 w-px bg-border" />
                <span>
                  {Math.round((min + ((max - min) / 4) * i) / tickDivisor)}
                  {unit}
                </span>
              </span>
            ))}
          </div>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 shrink-0"
          onClick={() => onValueChange([Math.min(max, value[0] + step)])}
          disabled={value[0] >= max}
          aria-label={`Augmenter ${label}`}
        >
          +
        </Button>
      </div>
    </div>
  )
}

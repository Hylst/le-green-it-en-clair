// Calcul pur du simulateur de sobriété numérique (aucune source inventée :
// paliers et petits facteurs = hypothèses du site étiquetées ; reconditionné = ADEME 2022 ;
// baseline = GreenIT EENM 2025, 1,8 Gt ÷ ~5,35 Md ≈ 330 kg CO₂e/an).
import { EMPREINTE_NUMERIQUE_MONDIALE_KG_PAR_INTERNAUTE } from "./emission-factors"

export interface SobrietyScenario {
  deviceLifespan: number // années, 2 à 7
  purchaseChoice: "new" | "repair" | "refurb"
  streamingQuality: "4k" | "1080p" | "720p"
  emailCleanup: "never" | "monthly" | "weekly"
  cloudStorage: "keep" | "optimize" | "local"
}

export interface SobrietyPreset {
  id: "sobre" | "standard" | "intensif"
  label: string
  description: string
  scenario: SobrietyScenario
}

export const SOBRIETY_PRESETS: SobrietyPreset[] = [
  {
    id: "sobre",
    label: "Sobre",
    description: "Appareils gardés longtemps, reconditionné, usages légers.",
    scenario: { deviceLifespan: 6, purchaseChoice: "refurb", streamingQuality: "720p", emailCleanup: "weekly", cloudStorage: "local" },
  },
  {
    id: "standard",
    label: "Standard",
    description: "Renouvellement tous les 3 ans, usages moyens.",
    scenario: { deviceLifespan: 3, purchaseChoice: "new", streamingQuality: "1080p", emailCleanup: "monthly", cloudStorage: "optimize" },
  },
  {
    id: "intensif",
    label: "Intensif",
    description: "Renouvellement rapide, 4K, stockage illimité.",
    scenario: { deviceLifespan: 2, purchaseChoice: "new", streamingQuality: "4k", emailCleanup: "never", cloudStorage: "keep" },
  },
]

export const SOBRIETY_BASELINE = EMPREINTE_NUMERIQUE_MONDIALE_KG_PAR_INTERNAUTE

export interface ImpactLine {
  label: string
  effect: string
  origin: string
}

export interface SobrietyImpact {
  baseline: number
  optimized: number
  savings: number
  percentage: number
  lines: ImpactLine[]
}

const HYP = "Hypothèse du site, ordre de grandeur"

export function calculateSobrietyImpact(s: SobrietyScenario): SobrietyImpact {
  let optimized = SOBRIETY_BASELINE
  const lines: ImpactLine[] = [
    { label: "Référence moyenne par internaute", effect: `${SOBRIETY_BASELINE} kg CO₂e/an`, origin: "GreenIT, EENM, 2025 (1,8 Gt ÷ ~5,35 Md)" },
  ]
  let lifespanFactor = 1
  let lifespanLabel = "Moins de 3 ans : pas de réduction"
  if (s.deviceLifespan >= 5) { lifespanFactor = 0.65; lifespanLabel = "5 ans ou plus : × 0,65" }
  else if (s.deviceLifespan >= 4) { lifespanFactor = 0.75; lifespanLabel = "4 ans : × 0,75" }
  else if (s.deviceLifespan >= 3) { lifespanFactor = 0.85; lifespanLabel = "3 ans : × 0,85" }
  optimized *= lifespanFactor
  lines.push({ label: `Durée de vie (${s.deviceLifespan} ans)`, effect: lifespanLabel, origin: HYP })
  let purchaseFactor = 1
  let purchaseLabel = "Neuf : référence"
  let purchaseOrigin = HYP
  if (s.purchaseChoice === "repair") { purchaseFactor = 0.85; purchaseLabel = "Réparer : × 0,85" }
  else if (s.purchaseChoice === "refurb") { purchaseFactor = 0.25; purchaseLabel = "Reconditionné : × 0,25"; purchaseOrigin = "ADEME, 2022" }
  optimized *= purchaseFactor
  lines.push({ label: "En cas de panne ou prochain achat", effect: purchaseLabel, origin: purchaseOrigin })
  let streamFactor = 1
  let streamLabel = "4K/UHD (7 Go/h) : référence"
  if (s.streamingQuality === "1080p") { streamFactor = 0.95; streamLabel = "Full HD (3 Go/h) : × 0,95" }
  else if (s.streamingQuality === "720p") { streamFactor = 0.92; streamLabel = "HD 720p (0,9 Go/h) : × 0,92" }
  optimized *= streamFactor
  lines.push({ label: "Qualité de streaming", effect: streamLabel, origin: HYP })
  let mailFactor = 1
  let mailLabel = "Jamais : pas de réduction"
  if (s.emailCleanup === "monthly") { mailFactor = 0.99; mailLabel = "Mensuel : × 0,99" }
  else if (s.emailCleanup === "weekly") { mailFactor = 0.98; mailLabel = "Hebdomadaire : × 0,98" }
  optimized *= mailFactor
  lines.push({ label: "Nettoyage des e-mails", effect: mailLabel, origin: HYP })
  let cloudFactor = 1
  let cloudLabel = "Tout garder : pas de réduction"
  if (s.cloudStorage === "optimize") { cloudFactor = 0.93; cloudLabel = "Optimisé : × 0,93" }
  else if (s.cloudStorage === "local") { cloudFactor = 0.88; cloudLabel = "Local prioritaire : × 0,88" }
  optimized *= cloudFactor
  lines.push({ label: "Stockage cloud", effect: cloudLabel, origin: HYP })
  const optimizedRounded = Math.round(optimized)
  const savings = Math.round(SOBRIETY_BASELINE - optimized)
  return {
    baseline: SOBRIETY_BASELINE,
    optimized: optimizedRounded,
    savings,
    percentage: Math.round((savings / SOBRIETY_BASELINE) * 100),
    lines,
  }
}

export interface ProjectionPoint {
  year: string
  baseline: number
  optimized: number
}

export function buildProjection(impact: SobrietyImpact): ProjectionPoint[] {
  return Array.from({ length: 6 }, (_, i) => ({
    year: `Année ${i}`,
    baseline: impact.baseline * i,
    optimized: impact.optimized * i,
  }))
}

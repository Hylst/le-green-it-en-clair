"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Smartphone,
  Laptop,
  Tablet,
  Tv,
  Monitor,
  Router,
  Server,
  TrendingDown,
  Wrench,
  ShoppingCart,
  Recycle,
  Plane,
  Car,
  TreePine,
  Check,
  ArrowRight,
} from "lucide-react"
import { ComparisonChart } from "@/components/comparison-chart"
import { SourceTooltip } from "@/components/source-tooltip"
import { ScaleComparison } from "@/components/scale-comparison"
import { LifespanSlider } from "@/components/lifespan-slider"
import { ReadingProgress } from "@/components/reading-progress"
import { RelatedLinks } from "@/components/related-links"
import { PageHero } from "@/components/page-hero"

const caseStudies = [
  {
    id: "smartphone",
    title: "Le Smartphone",
    icon: Smartphone,
    color: "emerald",
    description: "L'appareil le plus personnel et le plus renouvelé",
    stats: {
      co2: "80 kg",
      water: "12 000 L",
      lifespan: "2-3 ans",
      metals: "50+",
    },
  },
  {
    id: "laptop",
    title: "L'Ordinateur Portable",
    icon: Laptop,
    color: "blue",
    description: "Un outil de travail essentiel mais énergivore à produire",
    stats: {
      co2: "193 kg",
      water: "1 500 à 20 000 L",
      lifespan: "4-5 ans",
      metals: "60+",
    },
  },
  {
    id: "tablet",
    title: "La Tablette",
    icon: Tablet,
    color: "purple",
    description: "Un écran tactile entre le smartphone et l'ordinateur",
    stats: {
      co2: "87 kg",
      water: "15 000 L",
      lifespan: "3 ans",
      metals: "à vérifier",
    },
  },
  {
    id: "tv",
    title: "La Télévision Connectée",
    icon: Tv,
    color: "orange",
    description: "Le grand écran du salon, pour la TNT et le streaming",
    stats: {
      co2: "370 kg",
      water: "à vérifier",
      lifespan: "8 ans",
      metals: "à vérifier",
    },
  },
  {
    id: "monitor",
    title: "L'Écran 24\"",
    icon: Monitor,
    color: "indigo",
    description: "Le périphérique qu'on oublie dans le bilan",
    stats: {
      co2: "93 kg",
      water: "18 000 L",
      lifespan: "6 ans",
      metals: "à vérifier",
    },
  },
  {
    id: "box",
    title: "La Box Internet",
    icon: Router,
    color: "cyan",
    description: "Toujours allumée, même quand on ne s'en sert pas",
    stats: {
      co2: "81 kg",
      energy: "80 kWh/an",
      lifespan: "5 ans",
      metals: "à vérifier",
    },
  },
  {
    id: "datacenter",
    title: "Le Datacenter",
    icon: Server,
    color: "teal",
    description: "L'infrastructure invisible qui fait tourner le cloud",
    stats: {
      co2: "Plusieurs tonnes",
      water: "Millions de L",
      lifespan: "3-5 ans",
      servers: "1000+",
    },
  },
]

export default function CasPratiquesPage() {
  const [selectedCase, setSelectedCase] = useState("smartphone")
  const [lifespanYears, setLifespanYears] = useState([3])

  // Calculate impact reduction based on lifespan
  const calculateImpactReduction = (years: number) => {
    const baseYears = 2
    const reduction = ((years - baseYears) / years) * 100
    return Math.round(reduction)
  }

  const impactReduction = calculateImpactReduction(lifespanYears[0])

  return (
    <div data-theme="teal" className="min-h-screen">
      <ReadingProgress />
      <PageHero
        theme="teal"
        image={{ src: "/greenit/images/hero-cas-pratiques.webp", alt: "Balance comparant smartphone et portable avec nuages de CO₂" }}
        title="Cas pratiques et études détaillées"
        intro="Explorez l'impact environnemental concret de vos appareils du quotidien et découvrez comment faire les bons choix."
      />

      {/* Case Study Selection */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => {
              const Icon = study.icon
              const isSelected = selectedCase === study.id
              return (
                <Card
                  key={study.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  className={`group cursor-pointer border-2 p-6 transition-all hover:shadow-lg ${
                    isSelected
                      ? `border-${study.color}-500 bg-${study.color}-50 dark:bg-${study.color}-900/20`
                      : "border-border bg-card hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                  onClick={() => setSelectedCase(study.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelectedCase(study.id)
                    }
                  }}
                >
                  <div
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                      isSelected
                        ? `bg-${study.color}-600 text-white`
                        : `bg-${study.color}-100 text-${study.color}-700 group-hover:bg-${study.color}-600 group-hover:text-white`
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{study.title}</h3>
                  <p className="text-sm text-muted-foreground">{study.description}</p>
                </Card>
              )
            })}
          </div>

          {/* Smartphone Case Study */}
          {selectedCase === "smartphone" && (
            <div className="space-y-8">
              <Card className="border-2 border-emerald-500 p-8 lg:p-12">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
                    <Smartphone className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-foreground">Le Smartphone</h2>
                    <p className="text-lg text-muted-foreground">
                      Un concentré de technologie dans votre poche, mais à quel prix pour la planète ?
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                    <div className="mb-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">80 kg</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">CO₂ émis sur le cycle de vie (dont ~79 kg pour la fabrication, ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                    <div className="mb-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">12 000 L</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">d'eau consommée</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                    <div className="mb-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">50+</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">métaux différents</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                    <div className="mb-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">2-3 ans</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">durée de vie moyenne</div>
                  </div>
                </div>

                <div className="mb-8 grid items-center gap-6 md:grid-cols-2">
                  <LifespanSlider />
                  <div className="overflow-hidden rounded-xl border border-border">
                    <Image
                      src="/greenit/images/comparaison-duree-vie.webp"
                      alt="Deux smartphones, l'un usé et l'autre conservé avec une pousse verte, séparés par un sablier"
                      width={1376}
                      height={768}
                      className="h-auto w-full"
                      quality={85}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Key Facts */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h3 className="mb-3 font-semibold text-foreground">Le saviez-vous ?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400">•</span>
                        <span>
                          <strong>≈ 75 % des impacts (et ~99 % du carbone)</strong> d'un smartphone proviennent de sa fabrication,
                          pas de son utilisation
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400">•</span>
                        <span>
                          Il faut extraire <strong>70 kg de matières premières</strong> pour fabriquer un smartphone de
                          150g
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400">•</span>
                        <span>
                          En France, <strong>62 % des smartphones</strong> sont remplacés alors qu'ils fonctionnent
                          encore (ADEME 2026)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400">•</span>
                        <span>
                          Garder son smartphone <strong>1 an de plus</strong> réduit son impact annuel d'environ un tiers
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <ScaleComparison
                type="co2"
                value={80}
                unit="kg CO₂"
                comparisons={[
                  {
                    icon: Plane,
                    label: "Vol en avion",
                    equivalent: "Paris-Marseille",
                    description: "Plus d'un aller simple pour 1 passager (DGAC)",
                  },
                  {
                    icon: Car,
                    label: "Trajet en voiture",
                    equivalent: "470 km",
                    description: "En voiture thermique essence",
                  },
                  {
                    icon: TreePine,
                    label: "Compensation",
                    equivalent: "4 arbres",
                    description: "Nécessaires pour absorber le CO₂ en 1 an",
                  },
                ]}
              />

              <ComparisonChart
                title="Comparaison des choix d'achat"
                subtitle="Impact CO₂ selon votre décision"
                unit="kg CO₂"
                items={[
                  {
                    label: "Garder l'ancien (0 kg)",
                    value: 0,
                    color: "#047857",
                    icon: Recycle,
                    description: "Le choix le plus écologique : pas de nouvel achat",
                  },
                  {
                    label: "Réparer l'ancien",
                    value: 5,
                    color: "#0f766e",
                    icon: Wrench,
                    description: "Impact minimal : pièces de rechange uniquement",
                  },
                  {
                    label: "Acheter reconditionné",
                    value: 20,
                    color: "#1d4ed8",
                    icon: Recycle,
                    description: "≈ −75 à −90 % d'impact par rapport au neuf (ADEME, 2022)",
                  },
                  {
                    label: "Acheter neuf",
                    value: 80,
                    color: "#b91c1c",
                    icon: ShoppingCart,
                    description: "Impact maximum : fabrication complète",
                  },
                ]}
              />

              {/* Repair vs Buy New */}
              <Card className="border-2 border-border bg-card p-8 lg:p-12">
                <h3 className="mb-6 text-2xl font-bold text-foreground">Réparer ou racheter ?</h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-6 dark:border-emerald-700 dark:bg-emerald-900/20">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
                        <Wrench className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Réparer</h4>
                    </div>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <TrendingDown className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>
                          <strong>Impact réduit :</strong> Évite jusqu'à ~80 kg de CO₂ si cela évite un achat neuf (cycle de vie d'un smartphone, ADEME 2025)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingDown className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>
                          <strong>Coût :</strong> 50-150 € selon la réparation (fourchette indicative)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingDown className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>
                          <strong>Durée :</strong> Prolonge la vie de 1-2 ans
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6 rounded-lg bg-emerald-100 p-4 dark:bg-emerald-900/30">
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                        Recommandé pour : écran cassé, batterie usée, problèmes logiciels
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-600">
                        <ShoppingCart className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Racheter neuf</h4>
                    </div>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-slate-400 dark:text-slate-500">•</span>
                        <span>
                          <strong>Impact élevé :</strong> 80 kg de CO₂ supplémentaires
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-slate-400 dark:text-slate-500">•</span>
                        <span>
                          <strong>Coût :</strong> 300-1 200 € selon le modèle (fourchette indicative)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-slate-400 dark:text-slate-500">•</span>
                        <span>
                          <strong>Ressources :</strong> 70 kg de matières extraites
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6 rounded-lg bg-amber-100 p-4 dark:bg-amber-900/30">
                      <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                        À considérer uniquement si : appareil irréparable ou obsolète
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-blue-50 border-2 border-blue-200 p-6 dark:border-blue-800 dark:bg-blue-900/20">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-200">
                    <Recycle className="h-5 w-5" />
                    Alternative recommandée : le reconditionné
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Un smartphone reconditionné réduit l'impact de <strong>75 à 90 %</strong> par rapport au neuf, tout en
                          coûtant 30-50 % moins cher. C'est le meilleur compromis entre performance et écologie.
                  </p>
                </div>
              </Card>

              {/* Interactive Lifespan Slider */}
              <Card className="border-2 border-border bg-card p-8 lg:p-12">
                <h3 className="mb-6 text-2xl font-bold text-foreground">
                  Simulateur : Durée de vie vs Impact environnemental
                </h3>
                <p className="mb-8 text-muted-foreground">
                  Déplacez le curseur pour voir comment allonger la durée de vie de votre smartphone réduit son impact
                  annuel.
                </p>

                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Durée de vie</span>
                    <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{lifespanYears[0]} ans</span>
                  </div>
                  <Slider
                    value={lifespanYears}
                    onValueChange={setLifespanYears}
                    min={1}
                    max={7}
                    step={1}
                    aria-label="Durée de vie des appareils (années)"
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 an</span>
                    <span>7 ans</span>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Impact CO₂ annuel</div>
                    <div className="mb-4 text-3xl font-bold text-foreground">
                      {Math.round(80 / lifespanYears[0])} kg/an
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-emerald-600 transition-all"
                        style={{ width: `${(80 / lifespanYears[0] / 80) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-6">
                    <div className="mb-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">Réduction d'impact</div>
                    <div className="mb-4 text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                      {impactReduction > 0 ? `-${impactReduction} %` : "0 %"}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {lifespanYears[0] <= 2
                        ? "Garder son appareil plus longtemps réduit nettement l'impact annuel."
                        : lifespanYears[0] <= 4
                          ? "Bonne durée d'usage : l'impact annuel est déjà réduit."
                          : "Durée optimale : l'impact de fabrication est bien amorti."}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Laptop Case Study */}
          {selectedCase === "laptop" && (
            <div className="space-y-8">
              <Card className="border-2 border-blue-500 p-8 lg:p-12">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                    <Laptop className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-foreground">L'Ordinateur Portable</h2>
                    <p className="text-lg text-muted-foreground">
                      Un outil de travail essentiel, mais dont la fabrication a un coût environnemental élevé.
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="mb-1 text-2xl font-bold text-blue-700 dark:text-blue-400">193 kg</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">CO₂ émis sur le cycle de vie</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="mb-1 text-2xl font-bold text-blue-700 dark:text-blue-400">1 500 à 20 000 L</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">d'eau selon la méthode (eau bleue ou empreinte complète)</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="mb-1 text-2xl font-bold text-blue-700 dark:text-blue-400">800 kWh</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">d'énergie pour la production</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="mb-1 text-2xl font-bold text-blue-700 dark:text-blue-400">4-5 ans</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">durée de vie moyenne</div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h3 className="mb-3 font-semibold text-foreground">Points clés</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>
                          <strong>95 % de l'empreinte</strong> vient de la fabrication (182 kg sur 193, ADEME, Impact
                          CO₂ 2025), 5 % seulement pour l'usage et la fin de vie
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>
                          Fabriquer un ordinateur portable émet autant de CO₂ qu'environ{" "}
                          <strong>1 135 km en voiture thermique</strong> (193 ÷ 0,17, ADEME 2023 et ADEME, Impact CO₂
                          2025)
                          <SourceTooltip className="ml-1" source="ADEME, Impact CO₂ 2025 et ADEME 2023" calculation="193 ÷ 0,17 ≈ 1 135 km en voiture thermique" />
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>
                          La production consomme <strong>800 kWh</strong> (ADEME Base Carbone 2023), soit environ 2 mois de
                          consommation électrique d'un foyer français (~4 700 kWh/an)
                          <SourceTooltip className="ml-1" source="ADEME, Base Carbone 2023" calculation="800 ÷ 4 700 × 12 ≈ 2 mois de consommation d'un foyer" />
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>
                          Passer de 4 à 6 ans d'utilisation réduit l'impact annuel de <strong>33 %</strong> (calcul : 1 − 4 ÷ 6)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>
                          La RAM et le stockage sont parfois <strong>upgradables, sur les modèles qui le
                          permettent</strong> (PC fixes, certains portables pro), pour prolonger la durée de vie
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Upgrade vs Replace */}
              <Card className="border-2 border-border bg-card p-8 lg:p-12">
                <h3 className="mb-6 text-2xl font-bold text-foreground">Améliorer ou remplacer ?</h3>
                <div className="mb-6 rounded-xl bg-blue-50 border-2 border-blue-200 p-6 dark:border-blue-800 dark:bg-blue-900/20">
                  <h4 className="mb-4 font-semibold text-blue-900 dark:text-blue-200">Améliorations possibles</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
                      <div className="mb-2 font-semibold text-slate-900 dark:text-slate-100">RAM</div>
                      <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">Augmenter la mémoire vive</p>
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-400">50-150€</div>
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Impact : Très faible</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
                      <div className="mb-2 font-semibold text-slate-900 dark:text-slate-100">SSD</div>
                      <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">Remplacer le disque dur</p>
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-400">60-200€</div>
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Impact : Faible</div>
                    </div>
                    <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
                      <div className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Batterie</div>
                      <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">Changer la batterie</p>
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-400">80-250€</div>
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Impact : Moyen</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-emerald-50 border-2 border-emerald-200 p-6 dark:border-emerald-800 dark:bg-emerald-900/20">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Conseil :</strong> Avant de remplacer votre ordinateur, vérifiez s'il est possible
                    d'améliorer la RAM ou d'installer un SSD. Ces upgrades simples peuvent donner une seconde jeunesse à
                    votre machine pour une fraction du coût et de l'impact d'un achat neuf.
                  </p>
                </div>
              </Card>

              <ScaleComparison
                type="co2"
                value={193}
                unit="kg CO₂"
                comparisons={[
                  {
                    icon: Car,
                    label: "Trajet en voiture",
                    equivalent: "1 135 km",
                    description: "En voiture thermique (0,17 kg CO₂/km, ADEME 2023)",
                  },
                  {
                    icon: TreePine,
                    label: "Compensation",
                    equivalent: "10 arbres",
                    description: "Nécessaires pour absorber le CO₂ en 1 an (≈ 20 kg CO₂/arbre/an, ADEME)",
                  },
                  {
                    icon: Wrench,
                    label: "À réparer",
                    equivalent: "RAM, SSD, batterie",
                    description: "Sur les modèles qui le permettent, pour prolonger la durée de vie",
                  },
                ]}
              />

              <ComparisonChart
                title="Garder ou remplacer ?"
                subtitle="Impact CO₂ annuel selon la durée d'usage (193 kg amortis)"
                unit="kg CO₂/an"
                items={[
                  {
                    label: "Remplacer tous les 4 ans (48 kg/an)",
                    value: 48,
                    color: "#b91c1c",
                    icon: ShoppingCart,
                    description: "193 ÷ 4, le rythme moyen actuel (4-5 ans)",
                  },
                  {
                    label: "Garder 5 ans (39 kg/an)",
                    value: 39,
                    color: "#1d4ed8",
                    icon: Recycle,
                    description: "193 ÷ 5, la durée de référence (ADEME, Impact CO₂ 2025)",
                  },
                  {
                    label: "Garder 6 ans (32 kg/an)",
                    value: 32,
                    color: "#047857",
                    icon: Check,
                    description: "193 ÷ 6, soit un tiers d'impact en moins qu'à 4 ans",
                  },
                ]}
              />
            </div>
          )}

          {/* Tablet Case Study */}
          {selectedCase === "tablet" && (
            <div className="space-y-8">
              <Card className="border-2 border-purple-500 p-8 lg:p-12">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-900/30">
                    <Tablet className="h-8 w-8 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-foreground">La Tablette</h2>
                    <p className="text-lg text-muted-foreground">
                      Un écran tactile entre le smartphone et l'ordinateur, souvent acheté en plus et pas à la place.
                    </p>
                  </div>
                </div>

                <div className="mb-8 overflow-hidden rounded-xl border border-border">
                  <Image
                    src="/greenit/images/tablette-hero.webp"
                    alt="Illustration d'une tablette affichant lecture et visioconférence, entourée de circuits en feuilles"
                    width={1376}
                    height={768}
                    className="h-auto w-full"
                    quality={70}
                    loading="lazy"
                  />
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                    <div className="mb-1 text-2xl font-bold text-purple-700 dark:text-purple-400">87 kg</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">CO₂ émis sur le cycle de vie (dont ~84 kg pour la fabrication, ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                    <div className="mb-1 text-2xl font-bold text-purple-700 dark:text-purple-400">96 %</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">de l'empreinte vient de la fabrication (ADEME, Impact CO₂ 2025)</div>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                    <div className="mb-1 text-2xl font-bold text-purple-700 dark:text-purple-400">10,5"</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">écran LCD, 4,7 Go de RAM, 144 Go de mémoire (hypothèses ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                    <div className="mb-1 text-2xl font-bold text-purple-700 dark:text-purple-400">3 ans</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">durée d'usage de référence (ADEME, Impact CO₂ 2025)</div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h3 className="mb-3 font-semibold text-foreground">Le saviez-vous ?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>
                          <strong>96 % de l'empreinte</strong> d'une tablette vient de sa fabrication (83,9 kg sur 87,1,
                          ADEME, Impact CO₂ 2025)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>
                          Une tablette reconditionnée évite <strong>46 à 80 % d'impact annuel</strong> par rapport au
                          neuf (ADEME, 2022)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>
                          Passer de 2 à 4 ans d'usage <strong>améliore le bilan de 50 %</strong> pour une tablette
                          (ADEME, La face cachée du numérique)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>
                          Souvent <strong>un écran de plus</strong> dans le foyer : mutualiser les usages (lecture,
                          streaming, visio) évite d'empiler les appareils
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <ScaleComparison
                type="co2"
                value={87}
                unit="kg CO₂"
                comparisons={[
                  {
                    icon: Car,
                    label: "Trajet en voiture",
                    equivalent: "512 km",
                    description: "En voiture thermique (87 ÷ 0,17, ADEME 2023)",
                  },
                  {
                    icon: TreePine,
                    label: "Compensation",
                    equivalent: "4 arbres",
                    description: "Nécessaires pour absorber le CO₂ en 1 an (≈ 20 kg CO₂/arbre/an, ADEME)",
                  },
                  {
                    icon: Recycle,
                    label: "Reconditionné",
                    equivalent: "−46 à −80 %",
                    description: "D'impact annuel évité par rapport au neuf (ADEME, 2022)",
                  },
                ]}
              />

              <ComparisonChart
                title="Garder ou remplacer ?"
                subtitle="Impact CO₂ annuel selon la durée d'usage (87 kg amortis)"
                unit="kg CO₂/an"
                items={[
                  {
                    label: "Remplacer tous les 2 ans (44 kg/an)",
                    value: 44,
                    color: "#b91c1c",
                    icon: ShoppingCart,
                    description: "87 ÷ 2, le renouvellement rapide",
                  },
                  {
                    label: "Garder 3 ans (29 kg/an)",
                    value: 29,
                    color: "#1d4ed8",
                    icon: Recycle,
                    description: "87 ÷ 3, la durée de référence (ADEME, Impact CO₂ 2025)",
                  },
                  {
                    label: "Garder 4 ans (22 kg/an)",
                    value: 22,
                    color: "#047857",
                    icon: Check,
                    description: "87 ÷ 4, soit moitié moins qu'à 2 ans",
                  },
                ]}
              />
            </div>
          )}

          {/* Datacenter Case Study */}
          {selectedCase === "datacenter" && (
            <div className="space-y-8">
              <Card className="border-2 border-teal-500 p-8 lg:p-12">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/30">
                    <Server className="h-8 w-8 text-teal-700 dark:text-teal-400" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-foreground">Le Datacenter</h2>
                    <p className="text-lg text-muted-foreground">
                      L'infrastructure invisible qui héberge nos données et fait fonctionner le cloud.
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-teal-50 p-4 dark:bg-teal-900/20">
                    <div className="mb-1 text-2xl font-bold text-teal-700 dark:text-teal-400">1,5 %</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">de l'électricité mondiale (AIE, 2024)</div>
                  </div>
                  <div className="rounded-xl bg-teal-50 p-4 dark:bg-teal-900/20">
                    <div className="mb-1 text-2xl font-bold text-teal-700 dark:text-teal-400">PUE 1,56</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">efficacité moyenne mondiale (Uptime, 2024)</div>
                  </div>
                  <div className="rounded-xl bg-teal-50 p-4 dark:bg-teal-900/20">
                    <div className="mb-1 text-2xl font-bold text-teal-700 dark:text-teal-400">~28 %</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">pour le refroidissement (ordre de grandeur)</div>
                  </div>
                  <div className="rounded-xl bg-teal-50 p-4 dark:bg-teal-900/20">
                    <div className="mb-1 text-2xl font-bold text-teal-700 dark:text-teal-400">3-5 ans</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">durée de vie des serveurs (le bâtiment, lui, dure 10-15 ans)</div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h3 className="mb-3 font-semibold text-foreground">Comprendre les datacenters</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-teal-600 dark:text-teal-400">•</span>
                        <span>
                          Les datacenters consomment <strong>environ 1,5 % de l'électricité mondiale</strong> (AIE,
                          2024), une part en constante augmentation
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-600 dark:text-teal-400">•</span>
                        <span>
                          Le <strong>PUE (Power Usage Effectiveness)</strong> mesure l'efficacité : 1,0 est parfait,
                          1,56 est la moyenne mondiale actuelle (Uptime Institute, 2024)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-600 dark:text-teal-400">•</span>
                        <span>
                          <strong>Environ 28 % de l'électricité</strong> est utilisée pour le refroidissement des
                          serveurs (ordre de grandeur, PUE moyen 1,56)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-600 dark:text-teal-400">•</span>
                        <span>
                          Les datacenters français utilisent majoritairement de l'<strong>énergie nucléaire</strong>,
                          avec une empreinte carbone plus faible
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="border-2 border-border bg-card p-8 lg:p-12">
                <h3 className="mb-6 text-2xl font-bold text-foreground">Cloud vs Serveur local</h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border-2 border-teal-500 bg-teal-50 p-6 dark:border-teal-700 dark:bg-teal-900/20">
                    <h4 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">Cloud mutualisé</h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400"><Check className="h-4 w-4" aria-hidden="true" /></span>
                        <span>
                          <strong>Efficacité :</strong> Meilleure mutualisation des ressources
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400"><Check className="h-4 w-4" aria-hidden="true" /></span>
                        <span>
                          <strong>Optimisation :</strong> Datacenters modernes avec PUE optimisé
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400"><Check className="h-4 w-4" aria-hidden="true" /></span>
                        <span>
                          <strong>Énergie :</strong> Souvent alimentés par des énergies renouvelables
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border-2 border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                    <h4 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">Serveur local</h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500">•</span>
                        <span>
                          <strong>Sous-utilisation :</strong> Taux d'utilisation souvent faible
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500">•</span>
                        <span>
                          <strong>Refroidissement :</strong> Moins efficace que les grands datacenters
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500">•</span>
                        <span>
                          <strong>Maintenance :</strong> Renouvellement matériel plus fréquent
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-blue-50 border-2 border-blue-200 p-6 dark:border-blue-800 dark:bg-blue-900/20">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Verdict :</strong> Pour la plupart des usages, le cloud mutualisé est plus écologique grâce
                    à une meilleure efficacité énergétique et une mutualisation des ressources. Cependant, la sobriété
                    numérique reste essentielle : n'utilisez que les ressources dont vous avez réellement besoin.
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

          {/* TV Case Study */}
          {selectedCase === "tv" && (
            <div className="space-y-8">
              <Card className="border-2 border-orange-500 p-8 lg:p-12">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30">
                    <Tv className="h-8 w-8 text-orange-700 dark:text-orange-400" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-foreground">La Télévision Connectée</h2>
                    <p className="text-lg text-muted-foreground">
                      Le grand écran du salon : le plus lourd du foyer, pour la TNT et le streaming.
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
                    <div className="mb-1 text-2xl font-bold text-orange-700 dark:text-orange-400">370 kg</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">CO₂ émis sur le cycle de vie (dont ~328 kg pour la fabrication, ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
                    <div className="mb-1 text-2xl font-bold text-orange-700 dark:text-orange-400">89 %</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">de l'empreinte vient de la fabrication (ADEME, Impact CO₂ 2025)</div>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
                    <div className="mb-1 text-2xl font-bold text-orange-700 dark:text-orange-400">45-68"</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">mix moyen : 82 % LCD 45 pouces, OLED 53 et 68 pouces (ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
                    <div className="mb-1 text-2xl font-bold text-orange-700 dark:text-orange-400">8 ans</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">durée d'usage de référence (ADEME, Impact CO₂ 2025)</div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h3 className="mb-3 font-semibold text-foreground">Le saviez-vous ?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-orange-600 dark:text-orange-400">•</span>
                        <span>
                          <strong>Une TV vaut 2 portables ou 5 smartphones</strong> en CO₂ sur le cycle de vie
                          (infographie ADEME, Impact CO₂ 2025)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-orange-600 dark:text-orange-400">•</span>
                        <span>
                          L'<strong>indice de durabilité</strong> est obligatoire sur les téléviseurs depuis janvier
                          2025 : comparez les notes avant d'acheter (ADEME, 2025)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-orange-600 dark:text-orange-400">•</span>
                        <span>
                          Le <strong>bonus réparation de 60 €</strong> s'applique aux téléviseurs : faites réparer la
                          dalle ou l'alimentation plutôt que remplacer (grille 2026)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-orange-600 dark:text-orange-400">•</span>
                        <span>
                          Plus l'écran est grand, plus la fabrication pèse : <strong>choisir la taille selon le recul
                          réel</strong> évite le surdimensionnement
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <ScaleComparison
                type="co2"
                value={370}
                unit="kg CO₂"
                comparisons={[
                  {
                    icon: Car,
                    label: "Trajet en voiture",
                    equivalent: "2 176 km",
                    description: "En voiture thermique (370 ÷ 0,17, ADEME 2023)",
                  },
                  {
                    icon: TreePine,
                    label: "Compensation",
                    equivalent: "18 arbres",
                    description: "Nécessaires pour absorber le CO₂ en 1 an (≈ 20 kg CO₂/arbre/an, ADEME)",
                  },
                  {
                    icon: Wrench,
                    label: "À réparer",
                    equivalent: "Bonus 60 €",
                    description: "Bonus réparation pour un téléviseur (grille officielle 2026)",
                  },
                ]}
              />

              <ComparisonChart
                title="Garder ou remplacer ?"
                subtitle="Impact CO₂ annuel selon la durée d'usage (370 kg amortis)"
                unit="kg CO₂/an"
                items={[
                  {
                    label: "Remplacer tous les 5 ans (74 kg/an)",
                    value: 74,
                    color: "#b91c1c",
                    icon: ShoppingCart,
                    description: "370 ÷ 5, le renouvellement pour la dernière technologie",
                  },
                  {
                    label: "Garder 8 ans (46 kg/an)",
                    value: 46,
                    color: "#1d4ed8",
                    icon: Recycle,
                    description: "370 ÷ 8, la durée de référence (ADEME, Impact CO₂ 2025)",
                  },
                  {
                    label: "Garder 10 ans (37 kg/an)",
                    value: 37,
                    color: "#047857",
                    icon: Check,
                    description: "370 ÷ 10, soit moitié moins qu'à 5 ans",
                  },
                ]}
              />
            </div>
          )}

          {/* Monitor Case Study */}
          {selectedCase === "monitor" && (
            <div className="space-y-8">
              <Card className="border-2 border-indigo-500 p-8 lg:p-12">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30">
                    <Monitor className="h-8 w-8 text-indigo-700 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-foreground">L'Écran 24"</h2>
                    <p className="text-lg text-muted-foreground">
                      Le périphérique qu'on oublie dans le bilan : il pèse plus lourd qu'un smartphone.
                    </p>
                  </div>
                </div>

                <div className="mb-8 overflow-hidden rounded-xl border border-border">
                  <Image
                    src="/greenit/images/ecran-hero.webp"
                    alt="Illustration d'un écran de bureau éteint, feuille endormie sur le clavier"
                    width={1376}
                    height={768}
                    className="h-auto w-full"
                    quality={70}
                    loading="lazy"
                  />
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="mb-1 text-2xl font-bold text-indigo-700 dark:text-indigo-400">93 kg</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">CO₂ émis sur le cycle de vie (dont ~66 kg pour la fabrication, ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="mb-1 text-2xl font-bold text-indigo-700 dark:text-indigo-400">71 %</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">de l'empreinte vient de la fabrication (ADEME, Impact CO₂ 2025)</div>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="mb-1 text-2xl font-bold text-indigo-700 dark:text-indigo-400">24"</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">LCD à 98,6 % (hypothèses ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="mb-1 text-2xl font-bold text-indigo-700 dark:text-indigo-400">6 ans</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">durée d'usage de référence (ADEME, Impact CO₂ 2025)</div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h3 className="mb-3 font-semibold text-foreground">Le saviez-vous ?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400">•</span>
                        <span>
                          <strong>L'usage compte pour 29 %</strong> de l'empreinte d'un écran (22,7 kg), bien plus que
                          pour un smartphone : l'éteindre vraiment change la donne (ADEME, Impact CO₂ 2025)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400">•</span>
                        <span>
                          Un <strong>second écran</strong>, c'est un second cycle de vie : 93 kg de plus pour un
                          confort parfois discutable
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400">•</span>
                        <span>
                          La <strong>veille prolongée</strong> consomme pour rien : extinction complète le soir et le
                          week-end
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400">•</span>
                        <span>
                          Passer de 4 à 6 ans d'usage <strong>réduit l'impact annuel d'environ 30 %</strong> (calcul :
                          1 − 4 ÷ 6)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <ScaleComparison
                type="co2"
                value={93}
                unit="kg CO₂"
                comparisons={[
                  {
                    icon: Car,
                    label: "Trajet en voiture",
                    equivalent: "547 km",
                    description: "En voiture thermique (93 ÷ 0,17, ADEME 2023)",
                  },
                  {
                    icon: TreePine,
                    label: "Compensation",
                    equivalent: "5 arbres",
                    description: "Nécessaires pour absorber le CO₂ en 1 an (≈ 20 kg CO₂/arbre/an, ADEME)",
                  },
                  {
                    icon: TrendingDown,
                    label: "À faire durer",
                    equivalent: "−30 %",
                    description: "D'impact annuel en passant de 4 à 6 ans d'usage (1 − 4 ÷ 6)",
                  },
                ]}
              />

              <ComparisonChart
                title="Garder ou remplacer ?"
                subtitle="Impact CO₂ annuel selon la durée d'usage (93 kg amortis)"
                unit="kg CO₂/an"
                items={[
                  {
                    label: "Remplacer tous les 4 ans (23 kg/an)",
                    value: 23,
                    color: "#b91c1c",
                    icon: ShoppingCart,
                    description: "93 ÷ 4, arrondi",
                  },
                  {
                    label: "Garder 6 ans (16 kg/an)",
                    value: 16,
                    color: "#047857",
                    icon: Check,
                    description: "93 ÷ 6 arrondi, la durée de référence (ADEME, Impact CO₂ 2025)",
                  },
                ]}
              />
            </div>
          )}

          {/* Box Case Study */}
          {selectedCase === "box" && (
            <div className="space-y-8">
              <Card className="border-2 border-cyan-500 p-8 lg:p-12">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 dark:bg-cyan-900/30">
                    <Router className="h-8 w-8 text-cyan-700 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-foreground">La Box Internet</h2>
                    <p className="text-lg text-muted-foreground">
                      Toujours allumée, même quand on ne s'en sert pas : ici, c'est l'usage qui pèse.
                    </p>
                  </div>
                </div>

                <div className="mb-8 overflow-hidden rounded-xl border border-border">
                  <Image
                    src="/greenit/images/box-hero.webp"
                    alt="Illustration d'une box internet la nuit, ondes wifi se transformant en feuilles au-dessus du salon"
                    width={1376}
                    height={768}
                    className="h-auto w-full"
                    quality={70}
                    loading="lazy"
                  />
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-900/20">
                    <div className="mb-1 text-2xl font-bold text-cyan-700 dark:text-cyan-400">81 kg</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">CO₂ émis sur le cycle de vie (dont ~61 kg pour la fabrication, ADEME 2025)</div>
                  </div>
                  <div className="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-900/20">
                    <div className="mb-1 text-2xl font-bold text-cyan-700 dark:text-cyan-400">80 kWh/an</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">si elle reste allumée jour et nuit, 9,1 W en continu (Arcep, 2026)</div>
                  </div>
                  <div className="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-900/20">
                    <div className="mb-1 text-2xl font-bold text-cyan-700 dark:text-cyan-400">90 %</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">de sa consommation est invariable, qu'on s'en serve ou non (Arcep, 2026)</div>
                  </div>
                  <div className="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-900/20">
                    <div className="mb-1 text-2xl font-bold text-cyan-700 dark:text-cyan-400">3,4 TWh</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">consommés par le parc français de box et décodeurs en 2024 (Arcep, 2026)</div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h3 className="mb-3 font-semibold text-foreground">Le saviez-vous ?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-cyan-600 dark:text-cyan-400">•</span>
                        <span>
                          <strong>L'éteindre 8 heures par jour économise environ un tiers</strong> de sa consommation
                          sur l'année, soit de l'ordre de 26 kWh par an pour une extinction nocturne (Arcep, 2024)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-600 dark:text-cyan-400">•</span>
                        <span>
                          Le <strong>décodeur TV (7,4 W en moyenne)</strong> mérite le même traitement : éteint quand
                          personne ne regarde (Arcep, 2026)
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-600 dark:text-cyan-400">•</span>
                        <span>
                          Les <strong>box reconditionnées existent</strong> : l'enquête 2026 de l'Arcep leur consacre
                          un chapitre entier. Rendre sa box en bon état, c'est offrir sa seconde vie
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-600 dark:text-cyan-400">•</span>
                        <span>
                          À la maison, le <strong>Wi-Fi consomme 4 à 5 fois moins</strong> que les données mobiles :
                          activez le Wi-Fi automatique à domicile
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <ScaleComparison
                type="co2"
                value={81}
                unit="kg CO₂"
                comparisons={[
                  {
                    icon: Car,
                    label: "Trajet en voiture",
                    equivalent: "476 km",
                    description: "En voiture thermique (81 ÷ 0,17, ADEME 2023)",
                  },
                  {
                    icon: TreePine,
                    label: "Compensation",
                    equivalent: "4 arbres",
                    description: "Nécessaires pour absorber le CO₂ en 1 an (≈ 20 kg CO₂/arbre/an, ADEME)",
                  },
                  {
                    icon: Recycle,
                    label: "Reconditionnée",
                    equivalent: "Chapitre dédié",
                    description: "L'enquête Arcep 2026 consacre un chapitre aux box reconditionnées",
                  },
                ]}
              />

              <Card className="border-2 border-border bg-card p-8 lg:p-12">
                <h3 className="mb-4 text-2xl font-bold text-foreground">Pour aller plus loin</h3>
                <p className="mb-6 text-muted-foreground">
                  Le récit chiffré complet, avec mini calculateur : combien consomme vraiment votre box, et que faire
                  concrètement.
                </p>
                <Button asChild size="lg">
                  <Link href="/blog/que-consomme-vraiment-votre-box">
                    Lire l'article sur la box
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </Card>
            </div>
          )}

          {/* Related Links Section */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <RelatedLinks
            links={[
              {
                href: "/comprendre",
                label: "Comprendre le cycle de vie",
                description: "Visualisez l'impact environnemental à chaque étape du cycle de vie des équipements",
              },
              {
                href: "/agir",
                label: "Comment agir",
                description: "Découvrez les actions concrètes pour réduire votre impact numérique au quotidien",
              },
              {
                href: "/recyclage",
                label: "Recyclage & Réparation",
                description: "Trouvez les points de collecte et acteurs du recyclage près de chez vous",
              },
              {
                href: "/outils",
                label: "Outils interactifs",
                description: "Calculez votre empreinte carbone numérique et simulez vos économies",
              },
            ]}
          />
        </div>
      </section>

      {/* Sources */}
      <section className="border-t border-border bg-background px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Sources</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>ADEME, Impact CO₂ (mise à jour 2025 : 193 kg portable, 87 kg tablette, 370 kg TV, 93 kg écran, 81 kg box, 80 kg smartphone)</span>
            <span>•</span>
            <span>Arcep, Pour un numérique soutenable (2026 : box 9,1 W et 80 kWh/an, 90 % invariable, parc box et décodeurs 3,4 TWh)</span>
            <span>•</span>
            <span>Arcep (2024 : extinction box 8 h par jour, environ un tiers économisé)</span>
            <span>•</span>
            <span>SDES (ministère), infographie smartphone (2025 : 70 kg de matières extraites)</span>
            <span>•</span>
            <span>ADEME - Produits reconditionnés (2022)</span>
            <span>•</span>
            <span>DGAC - Éco-calculateur (équivalences avion)</span>
            <span>•</span>
            <span>AIE - Energy and AI (2025)</span>
            <span>•</span>
            <span>Uptime Institute - Global Data Center Survey (2024)</span>
            <span>•</span>
            <span>Global E-waste Monitor 2024 (ONU)</span>
          </div>
        </div>
      </section>
    </div>
  )
}

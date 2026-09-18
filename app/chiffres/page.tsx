"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp, Globe, MapPin, Zap } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SourceTooltip } from "@/components/source-tooltip"
import { SectionDivider } from "@/components/section-divider"
import { CountUp } from "@/components/count-up"
import { AnimatedDataFlow } from "@/components/animated-data-flow"
import { RelatedLinks } from "@/components/related-links"
import { GrowthAnimation } from "@/components/growth-animation"
import dynamic from "next/dynamic"

import Eco2MixLive from "@/components/eco2mix-live"
import { useChartTheme } from "@/lib/chart-theme"

const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
      <p className="text-slate-500">Chargement de la carte...</p>
    </div>
  ),
})

// Data for E-Waste Evolution
const eWasteData = [
  { year: "2010", monde: 33.8, france: 1.2 },
  { year: "2012", monde: 38.5, france: 1.3 },
  { year: "2014", monde: 41.8, france: 1.35 },
  { year: "2016", monde: 44.7, france: 1.4 },
  { year: "2018", monde: 48.2, france: 1.42 },
  { year: "2019", monde: 53.6, france: 1.45 },
  { year: "2020", monde: 55.3, france: 1.48 },
  { year: "2022", monde: 62.0, france: 1.52 },
  { year: "2024", monde: 68.5, france: 1.58 },
  { year: "2025", monde: 69.8, france: 1.61 },
  { year: "2026", monde: 72.4, france: 1.67 },
];

// Data for CO2 Breakdown by Lifecycle Phase
const co2BreakdownData = [
  { phase: "Extraction", percentage: 15, value: 15, colorKey: "amber" as const },
  { phase: "Fabrication", percentage: 60, value: 60, colorKey: "slate" as const },
  { phase: "Transport", percentage: 5, value: 5, colorKey: "blue" as const },
  { phase: "Usage", percentage: 20, value: 20, colorKey: "emerald" as const },
]

// Data for Device Comparison (CO₂ : ADEME, Impact CO₂, mise à jour 2025 ; énergie/eau : ordres de grandeur 2023)
const deviceComparisonData = [
  { device: "Smartphone", co2: 80, energy: 250, water: 12000 },
  { device: "Tablette", co2: 87, energy: 350, water: 15000 },
  { device: "Ordinateur portable", co2: 193, energy: 800, water: 20000 },
  { device: "Ordinateur fixe (sans écran)", co2: 259, energy: 1200, water: 30000 },
  { device: 'Écran 24"', co2: 93, energy: 600, water: 18000 },
  { device: "Télévision", co2: 370, energy: null, water: null },
  { device: "Box", co2: 81, energy: null, water: null },
]

// Data for Recycling Rates by Country
const recyclingRatesData = [
  { country: "France", rate: 46 },
  { country: "Allemagne", rate: 52 },
  { country: "Suède", rate: 54 },
  { country: "Royaume-Uni", rate: 44 },
  { country: "Espagne", rate: 39 },
  { country: "Italie", rate: 45 },
  { country: "Moyenne UE", rate: 43 },
  { country: "Moyenne mondiale", rate: 22 },
]

// Points de collecte : données d'exemple (chiffres illustratifs, pas des données officielles)
const recyclingPoints = [
  { city: "Paris", lat: 48.8566, lng: 2.3522, points: 245 },
  { city: "Lyon", lat: 45.764, lng: 4.8357, points: 98 },
  { city: "Marseille", lat: 43.2965, lng: 5.3698, points: 112 },
  { city: "Toulouse", lat: 43.6047, lng: 1.4442, points: 87 },
  { city: "Bordeaux", lat: 44.8378, lng: -0.5792, points: 76 },
  { city: "Lille", lat: 50.6292, lng: 3.0573, points: 65 },
  { city: "Nantes", lat: 47.2184, lng: -1.5536, points: 58 },
  { city: "Strasbourg", lat: 48.5734, lng: 7.7521, points: 52 },
]

export default function ChiffresPage() {
  const [selectedMetric, setSelectedMetric] = useState<"co2" | "energy" | "water">("co2")
  const chart = useChartTheme()
  const co2FillByKey: Record<string, string> = {
    amber: chart.amber,
    slate: chart.slate,
    blue: chart.blue,
    emerald: chart.emerald,
  }

  const printPage = () => {
    window.print()
  }

  return (
    <div data-theme="blue" className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <PageHero
        theme="blue"
        image={{ src: "/greenit/images/hero-chiffres.webp", alt: "Globe terrestre en points de données avec courbe de croissance" }}
        badge={{ icon: TrendingUp, label: "Données et statistiques" }}
        title="Les chiffres du numérique en France et dans le monde"
        intro="Visualisez l'impact environnemental du numérique à travers des données récentes et sourcées."
      />

      <SectionDivider />

      {/* Animated Data Flow Visualization */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground lg:text-4xl">Le parcours des données</h2>
          <p className="mb-12 text-center text-lg text-muted-foreground">
            Visualisation du flux de données entre votre appareil et les datacenters
          </p>
          <AnimatedDataFlow />
        </div>
      </section>

      {/* Growth Animation */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <GrowthAnimation />
        </div>
      </section>

      {/* E-Waste Evolution Chart */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Évolution des déchets électroniques</h2>
              <p className="text-muted-foreground">Production mondiale et française d'e-déchets (2010-2026)</p>
            </div>
            <Button variant="outline" onClick={printPage}>
              <Download className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>

          <Card className="lift border-2 border-border bg-background p-6 lg:p-8">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={eWasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis dataKey="year" stroke={chart.tick} />
                <YAxis stroke={chart.tick} label={{ value: "Millions de tonnes", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)"
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="monde"
                  stroke={chart.blue}
                  strokeWidth={3}
                  name="Monde (Mt)"
                  dot={{ fill: chart.blue, r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="france"
                  stroke={chart.emerald}
                  strokeWidth={3}
                  name="France (Mt)"
                  dot={{ fill: chart.emerald, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Analyse :</strong> La production mondiale de déchets électroniques
                <SourceTooltip
                  className="ml-1 align-middle"
                  source="UNITAR-UIT, Global E-waste Monitor 2024"
                  info="Un déchet électronique = tout appareil jeté avec prise ou batterie (smartphone, TV, grille-pain, jouets). Le chiffre = la masse totale des appareils jetés chaque année, estimée depuis les mises sur le marché et les durées de vie (méthode ONU standardisée). Ce n'est ni un cumul d'une année sur l'autre, ni la matière extraite pour les fabriquer (voir MIPS). En 2022 : 62 Mt générées, 22,3 % collectées et recyclées."
                />{" "}
                a doublé en 15 ans, passant
                de 34 Mt en 2010 à 72 Mt début 2026. En France, nous produisons environ 1,6 million de tonnes par an, soit
                24 kg par habitant.
              </p>
            </div>
          </Card>

          <div className="mt-4 text-sm text-muted-foreground">Source : Global E-Waste Monitor, ONU (2024) • ADEME (2023)</div>
        </div>
      </section>

      {/* CO2 Breakdown Pie Chart */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Répartition de l'empreinte carbone</h2>
              <p className="text-muted-foreground">Impact CO₂ par phase du cycle de vie d'un smartphone</p>
            </div>
            <Button variant="outline" onClick={printPage}>
              <Download className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="lift border-2 border-border bg-background p-6 lg:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={co2BreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ phase, percentage }) => `${phase}: ${percentage}%`}
                    outerRadius={120}
                    fill={chart.violet}
                    dataKey="value"
                  >
                    {co2BreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={co2FillByKey[entry.colorKey]} aria-label={`${entry.phase} : ${entry.percentage} %`} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "2px solid var(--border)",
                      borderRadius: "0.5rem",
                      color: "var(--foreground)"
                    }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <div className="flex flex-col justify-center space-y-4">
              {co2BreakdownData.map((item) => (
                <div key={item.phase} className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-lg" style={{ backgroundColor: co2FillByKey[item.colorKey] }} />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-semibold text-foreground">{item.phase}</span>
                      <span className="text-lg font-bold text-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.percentage}%`, backgroundColor: co2FillByKey[item.colorKey] }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Point clé :</strong> La fabrication seule représente 60 % des impacts tous indicateurs ; avec l'extraction (15 %), c'est 75 %. En carbone, la fabrication monte à ~99 % pour un smartphone (ADEME 2025). Garder son
                  smartphone 1 an de plus réduit son impact annuel d'environ un tiers (80 kg sur 2 ans ≈ 40 kg/an,
                  80 kg sur 3 ans ≈ 27 kg/an).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">Source : ADEME-Arcep - Impact environnemental du numérique (2023), tous indicateurs.</div>
        </div>
      </section>

      {/* Device Comparison Chart */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Comparaison par appareil</h2>
              <p className="text-muted-foreground">Impact selon le type d'équipement (cycle de vie pour le CO₂)</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedMetric === "co2" ? "default" : "outline"}
                onClick={() => setSelectedMetric("co2")}
                className={selectedMetric === "co2" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                CO₂ (kg)
              </Button>
              <Button
                variant={selectedMetric === "energy" ? "default" : "outline"}
                onClick={() => setSelectedMetric("energy")}
                className={selectedMetric === "energy" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Énergie (kWh)
              </Button>
              <Button
                variant={selectedMetric === "water" ? "default" : "outline"}
                onClick={() => setSelectedMetric("water")}
                className={selectedMetric === "water" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Eau (L)
              </Button>
            </div>
          </div>

          <Card className="lift border-2 border-border bg-background p-6 lg:p-8">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={deviceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis dataKey="device" stroke={chart.tick} />
                <YAxis stroke={chart.tick} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)"
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar
                  dataKey={selectedMetric}
                  fill={chart.emerald}
                  radius={[8, 8, 0, 0]}
                  name={
                    selectedMetric === "co2" ? "CO₂ (kg)" : selectedMetric === "energy" ? "Énergie (kWh)" : "Eau (L)"
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="mt-4 text-sm text-muted-foreground">CO₂ : ADEME, Impact CO₂ (mise à jour 2025). Énergie et eau : ordres de grandeur (ADEME 2023) : eau de 1 500 L (eau bleue) à plus de 20 000 L (empreinte complète) pour un ordinateur portable selon la méthode. TV et box : CO₂ uniquement, énergie et eau en cours de vérification.</div>
        </div>
      </section>

      {/* Recycling Rates Chart */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Taux de recyclage par pays</h2>
              <p className="text-muted-foreground">Pourcentage de déchets électroniques correctement recyclés</p>
            </div>
            <Button variant="outline" onClick={printPage}>
              <Download className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>

          <Card className="lift border-2 border-border bg-background p-6 lg:p-8">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={recyclingRatesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis type="number" stroke={chart.tick} unit="%" />
                <YAxis dataKey="country" type="category" stroke={chart.tick} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)"
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="rate" fill={chart.teal} radius={[0, 8, 8, 0]} name="Taux de recyclage (%)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 rounded-lg bg-teal-50 dark:bg-teal-900/20 p-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Analyse :</strong> La France collecte 46 % de ses déchets électroniques, soit le double de la
                moyenne mondiale (22,3 % en 2022, collectés et recyclés). Les pays nordiques comme la Suède atteignent
                54 %, montrant qu'il est possible de faire mieux.
              </p>
            </div>
          </Card>

          <div className="mt-4 text-sm text-muted-foreground">
            Source : Global E-Waste Monitor (2024) • Eurostat (2025) • Ecosystem
          </div>
        </div>
      </section>

      {/* Recycling Points Map */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-foreground">Points de collecte en France</h2>
            <p className="text-muted-foreground">Exemple de mise en page avec des chiffres illustratifs, par ville</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Leaflet Map */}
            <div className="h-[400px]">
              <LeafletMap points={recyclingPoints} />
            </div>

            {/* City List */}
            <div className="space-y-3">
              {recyclingPoints.map((point) => (
                <Card key={point.city} className="lift border-2 border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <MapPin className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{point.city}</div>
                        <div className="text-sm text-muted-foreground">
                          {point.lat.toFixed(4)}°N, {Math.abs(point.lng).toFixed(4)}°{point.lng >= 0 ? "E" : "W"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{point.points}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="mt-6 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Chiffres illustratifs : exemple de mise en page, pas des données officielles. Les nombres par
                  ville ci-dessus montrent comment la carte s'affiche.
                </p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Pour trouver un vrai point de collecte près de chez vous, utilisez le site officiel de
                  l'ADEME « Que faire de mes objets » :{" "}
                  <a
                    href="https://quefairedemesdechets.ademe.fr"
                    target="_blank"
                    rel="noopener"
                    className="font-medium underline underline-offset-2"
                  >
                    quefairedemesdechets.ademe.fr
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">Source : Ecosystem • Écologic (2024)</div>
        </div>
      </section>

      {/* Key Stats Summary */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-800 dark:from-emerald-900 dark:to-teal-900 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl">En résumé</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <Globe className="mx-auto mb-4 h-12 w-12 text-emerald-100" />
              <div className="mb-2 text-4xl font-bold text-white">
                <CountUp to={72.4} decimals={1} suffix=" Mt" />
                <SourceTooltip className="ml-1 align-middle text-emerald-50" source="Global E-Waste Monitor 2024 (ONU)" calculation="62 Mt (2022) + 2,6 Mt/an × 4 ans ≈ 72,4 Mt projetés en 2026" />
              </div>
              <p className="text-emerald-50">d'e-déchets projetés dans le monde en 2026</p>
            </div>
            <div className="text-center">
              <Zap className="mx-auto mb-4 h-12 w-12 text-emerald-100" />
              <div className="mb-2 text-4xl font-bold text-white">
                <CountUp to={60} suffix=" %" />
                <SourceTooltip className="ml-1 align-middle text-emerald-50" source="ADEME-Arcep, 2023" calculation="fabrication 60 % + extraction 15 % ≈ 75 % des impacts, dont 60 % pour la seule fabrication" />
              </div>
              <p className="text-emerald-50">des impacts (tous indicateurs) viennent de la fabrication</p>
            </div>
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-12 w-12 text-emerald-100" />
              <div className="mb-2 text-4xl font-bold text-white">
                <CountUp to={46} suffix=" %" />
                <SourceTooltip className="ml-1 align-middle text-emerald-50" source="Eurostat / Ecosystem, 2024" calculation="tonnages collectés ÷ tonnages mis sur le marché" />
              </div>
              <p className="text-emerald-50">taux de collecte en France (Eurostat 2024)</p>
            </div>
            <div className="text-center">
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-emerald-100" />
              <div className="mb-2 text-4xl font-bold text-white">
                <CountUp to={114} prefix="+" suffix=" %" />
                <SourceTooltip className="ml-1 align-middle text-emerald-50" source="Global E-Waste Monitor 2024 (ONU)" calculation="(72,4 − 33,8) ÷ 33,8 ≈ +114 % entre 2010 et 2026" />
              </div>
              <p className="text-emerald-50">d'augmentation des e-déchets depuis 2010</p>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-emerald-50">
            Sources : Global E-waste Monitor 2024 (62 Mt en 2022, +2,6 Mt/an) ; ADEME-Arcep 2023 ; Eurostat 2024
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-24 bg-background">
        <Eco2MixLive variant="full" />
      </section>

      <section className="px-6 py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl">
          <RelatedLinks
            links={[
              {
                href: "/comprendre",
                label: "Comprendre le cycle de vie",
                description: "D'où viennent ces chiffres, phase par phase, et comment les interpréter",
              },
              {
                href: "/outils",
                label: "Calculer votre propre empreinte",
                description: "Estimez votre impact numérique avec les outils interactifs",
              },
              {
                href: "/agir",
                label: "Passer à l'action",
                description: "Les gestes et leviers les plus efficaces pour réduire l'impact",
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Server,
  Zap,
  Droplets,
  Wind,
  Thermometer,
  TrendingDown,
  Globe,
  Leaf,
  ArrowRight,
  Info,
  Sun,
  CheckCircle2,
} from "lucide-react"
import Eco2MixLive from "@/components/eco2mix-live"
import { SectionDivider } from "@/components/section-divider"
import { PageHero } from "@/components/page-hero"
import { CountUp } from "@/components/count-up"
import { Acronym } from "@/components/acronym"
import { SourceTooltip } from "@/components/source-tooltip"
import { useChartTheme } from "@/lib/chart-theme"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Data for energy consumption breakdown (ordre de grandeur, PUE moyen 1,56 : Uptime Institute, 2024)
const energyBreakdownData = [
  { category: "Serveurs", percentage: 64, colorKey: "blue" as const },
  { category: "Refroidissement", percentage: 28, colorKey: "teal" as const },
  { category: "Infrastructure", percentage: 8, colorKey: "slate" as const },
]

// Data for PUE comparison (Uptime Institute, 2024)
const pueComparisonData = [
  { type: "Ancien datacenter", pue: 2.5 },
  { type: "Moyenne mondiale", pue: 1.56 },
  { type: "Moyenne Europe", pue: 1.45 },
  { type: "Datacenter moderne", pue: 1.2 },
  { type: "Datacenter optimal", pue: 1.05 },
]

// Data for cooling methods
const coolingMethods = [
  {
    name: "Refroidissement à air",
    efficiency: "Faible",
    pue: "1.8-2.5",
    description: "Méthode traditionnelle utilisant la climatisation classique",
    color: "amber",
  },
  {
    name: "Free cooling",
    efficiency: "Moyenne",
    pue: "1.3-1.5",
    description: "Utilisation de l'air extérieur quand la température le permet",
    color: "blue",
  },
  {
    name: "Refroidissement liquide",
    efficiency: "Élevée",
    pue: "1.1-1.3",
    description: "Circulation de liquide de refroidissement dans les serveurs",
    color: "teal",
  },
  {
    name: "Immersion",
    efficiency: "Très élevée",
    pue: "1.02-1.1",
    description: "Serveurs immergés dans un liquide diélectrique",
    color: "emerald",
  },
]

export default function DatacentersPage() {
  const [pueValue, setPueValue] = useState([1.5])
  const [serverCount, setServerCount] = useState([100])
  const chart = useChartTheme()
  const energyFillByKey: Record<string, string> = {
    blue: chart.blue,
    teal: chart.teal,
    slate: chart.slate,
  }

  // Calculate energy waste based on PUE
  const calculateWaste = (pue: number) => {
    return Math.round(((pue - 1) / pue) * 100)
  }

  const wastePercentage = calculateWaste(pueValue[0])
  const totalPower = serverCount[0] * 0.5 // Hypothèse : 500 W par serveur
  const wastedPower = totalPower * (pueValue[0] - 1)

  return (
    <div data-theme="cyan" className="min-h-screen bg-background transition-colors duration-300">
      <PageHero
        theme="cyan"
        image={{ src: "/greenit/images/hero-datacenters.webp", alt: "Rangées de serveurs avec flux d'air frais bleus" }}
        badge={{ icon: Server, label: "Datacenters & Cloud" }}
        title="Comprendre l'impact des datacenters"
        intro="Les datacenters sont l'infrastructure invisible du numérique. Découvrez leur fonctionnement, leur impact environnemental et les solutions pour les rendre plus durables."
      />

      <SectionDivider />

      {/* What is a Datacenter */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Qu'est-ce qu'un datacenter ?
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="lift border-2 border-border bg-background p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                  <Server className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Définition</h3>
              </div>
              <p className="mb-4 text-slate-700 dark:text-slate-300">
                Un datacenter (centre de données) est un bâtiment qui héberge des milliers de serveurs informatiques
                fonctionnant 24h/24 pour stocker, traiter et distribuer des données.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                C'est l'infrastructure qui fait fonctionner Internet, le cloud, les applications web, les réseaux
                sociaux, le streaming vidéo, et tous les services numériques que nous utilisons quotidiennement.
              </p>
            </Card>

            <Card className="lift border-2 border-border bg-background p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/30">
                  <Globe className="h-7 w-7 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">En chiffres</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-3xl font-bold text-blue-700 dark:text-blue-400"><CountUp to={1.5} decimals={1} suffix=" %" /></div>
                  <p className="text-sm text-muted-foreground">de l&apos;électricité mondiale (<Acronym title="Agence Internationale de l'Énergie (IEA en anglais) : rapport Energy and AI, avril 2025" glossary="aie">AIE</Acronym>, Energy and AI, avril 2025) <SourceTooltip className="ml-1 align-middle" source="AIE, Energy and AI (avril 2025)" url="https://www.iea.org/reports/energy-and-ai" /></p>
                </div>
                <div>
                  <div className="mb-1 text-3xl font-bold text-teal-700 dark:text-teal-400"><CountUp to={10000} suffix="+" /></div>
                  <p className="text-sm text-muted-foreground">datacenters dans le monde (ordre de grandeur, DataCenterMap)</p>
                </div>
                <div>
                  <div className="mb-1 text-3xl font-bold text-cyan-700 dark:text-cyan-400"><CountUp to={415} suffix=" TWh" /></div>
                  <p className="text-sm text-muted-foreground">consommation annuelle mondiale (<Acronym title="Agence Internationale de l'Énergie (IEA en anglais) : rapport Energy and AI, avril 2025">AIE</Acronym>, Energy and AI, avril 2025) <SourceTooltip className="ml-1 align-middle" source="AIE, Energy and AI (avril 2025)" url="https://www.iea.org/reports/energy-and-ai" /></p>
                </div>
                <div>
                  <div className="mb-1 text-3xl font-bold text-cyan-700 dark:text-cyan-400"><CountUp to={945} prefix="~" suffix=" TWh" /></div>
                  <p className="text-sm text-muted-foreground">
                    projection 2030, scénario central (<Acronym title="Agence Internationale de l'Énergie (IEA en anglais) : rapport Energy and AI, avril 2025">AIE</Acronym>, Energy and AI, 2025) <SourceTooltip className="ml-1 align-middle" source="AIE, Energy and AI (2025)" url="https://www.iea.org/reports/energy-and-ai" />
                  </p>
                </div>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Reporting public obligatoire pour les sites de plus de 500 kW depuis mai 2024 (directive EED refondue).
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Energy Breakdown */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Répartition de la consommation énergétique
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="lift border-2 border-border bg-background p-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={energyBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category}: ${percentage}%`}
                    outerRadius={100}
                    fill={chart.violet}
                    dataKey="percentage"
                  >
                    {energyBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={energyFillByKey[entry.colorKey]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Server className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-foreground">Serveurs (64 %)</h4>
                  <p className="text-sm text-muted-foreground">
                    Calcul, stockage et traitement des données. C'est la charge utile du datacenter.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
                  <Wind className="h-6 w-6 text-teal-700 dark:text-teal-400" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-foreground">Refroidissement (~28 %)</h4>
                  <p className="text-sm text-muted-foreground">
                    Climatisation nécessaire pour évacuer la chaleur produite par les serveurs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Zap className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-foreground">Infrastructure (~8 %)</h4>
                  <p className="text-sm text-muted-foreground">
                    Éclairage, sécurité, onduleurs et autres équipements de support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-1 h-5 w-5 shrink-0 text-blue-700 dark:text-blue-400" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Point clé :</strong> Avec un PUE moyen de 1,56, plus d'un tiers de l'électricité alimente le
                refroidissement et l'infrastructure plutôt que les serveurs (Uptime Institute, 2024). C'est pourquoi
                l'optimisation du refroidissement reste cruciale pour réduire l'impact environnemental des
                datacenters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PUE Explanation */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Le PUE : mesurer l'efficacité énergétique
          </h2>

          <Card className="mb-8 border-2 border-border bg-background p-8 lg:p-12">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                PUE = Power Usage Effectiveness (Efficacité d'utilisation de l'énergie)
              </h3>
              <div className="mx-auto max-w-2xl rounded-xl bg-secondary/30 p-6">
                <p className="mb-4 text-lg text-slate-700 dark:text-slate-300">
                  Le PUE mesure l'efficacité énergétique d'un datacenter en comparant l'énergie totale consommée à
                  l'énergie utilisée par les équipements informatiques.
                </p>
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-4">
                  <p className="text-center text-xl font-bold text-blue-900 dark:text-blue-100">
                    PUE = Énergie totale / Énergie des serveurs
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="mb-4 text-center text-lg font-semibold text-foreground">Interprétation du PUE</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-4 text-center">
                  <div className="mb-2 text-3xl font-bold text-emerald-700 dark:text-emerald-400">1.0</div>
                  <p className="text-sm font-semibold text-foreground">Parfait (théorique)</p>
                  <p className="text-xs text-muted-foreground">100 % de l'énergie pour les serveurs</p>
                </div>
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
                  <div className="mb-2 text-3xl font-bold text-blue-700 dark:text-blue-400">1.5</div>
                  <p className="text-sm font-semibold text-foreground">Bon</p>
                  <p className="text-xs text-muted-foreground">33 % d'énergie perdue</p>
                </div>
                <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
                  <div className="mb-2 text-3xl font-bold text-amber-700 dark:text-amber-400">2.0+</div>
                  <p className="text-sm font-semibold text-foreground">À améliorer</p>
                  <p className="text-xs text-muted-foreground">50 %+ d&apos;énergie perdue</p>
                </div>
              </div>
            </div>

            <div className="mb-8 rounded-xl border-2 border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
              <h4 className="mb-3 text-lg font-semibold text-foreground">Ce que le PUE ne dit pas</h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>
                    <strong>Le carbone du mix :</strong> un PUE parfait alimenté au charbon reste très carboné.
                    Efficacité n&apos;est pas sobriété : la source de l&apos;électricité compte autant que son usage
                    (voir le mix plus haut).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>
                    <strong>L&apos;eau :</strong> le refroidissement consomme aussi de l&apos;eau, que le PUE ignore.
                    C&apos;est l&apos;objet d&apos;un autre indicateur, le{" "}
                    <Acronym
                      title="Water Usage Effectiveness : eau consommée pour le refroidissement des datacenters"
                      glossary="wue"
                    >
                      WUE
                    </Acronym>
                    .
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>
                    <strong>L&apos;utilisation :</strong> des serveurs qui tournent à 15 % de leur capacité gaspillent,
                    même avec un bon PUE. Et la fabrication des serveurs n&apos;entre pas dans le calcul : un PUE
                    flatteur ne dit rien du renouvellement du matériel.
                  </span>
                </li>
              </ul>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pueComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis dataKey="type" stroke={chart.tick} />
                <YAxis stroke={chart.tick} domain={[0, 3]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)"
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="pue" fill={chart.blue} radius={[8, 8, 0, 0]} name="PUE" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Interactive PUE Calculator */}
          <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-700 p-8 lg:p-12">
            <h3 className="mb-6 text-2xl font-bold text-foreground">Simulateur d'efficacité énergétique</h3>
            <p className="mb-8 text-slate-700 dark:text-slate-300">
              Ajustez le PUE et le nombre de serveurs pour voir l'impact sur la consommation et le gaspillage
              énergétique. Hypothèse : 500 W par serveur.
            </p>

            <div className="mb-8 grid gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">PUE du datacenter</span>
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">{pueValue[0].toFixed(2)}</span>
                </div>
                <Slider value={pueValue} onValueChange={setPueValue} min={1.0} max={3.0} step={0.1} aria-label="PUE du datacenter" className="mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1.0 (Optimal)</span>
                  <span>3.0 (Inefficace)</span>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Nombre de serveurs</span>
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">{serverCount[0]}</span>
                </div>
                <Slider
                  value={serverCount}
                  onValueChange={setServerCount}
                  min={10}
                  max={1000}
                  step={10}
                  aria-label="Nombre de serveurs"
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10 serveurs</span>
                  <span>1000 serveurs</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white dark:bg-slate-900 p-6">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Puissance serveurs</div>
                <div className="mb-1 text-3xl font-bold text-foreground">{totalPower.toFixed(0)} kW</div>
                <p className="text-xs text-muted-foreground">Charge utile</p>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900 p-6">
                <div className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">Énergie gaspillée</div>
                <div className="mb-1 text-3xl font-bold text-amber-700 dark:text-amber-400">{wastedPower.toFixed(0)} kW</div>
                <p className="text-xs text-muted-foreground">{wastePercentage}% de perte</p>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900 p-6">
                <div className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">Puissance totale</div>
                <div className="mb-1 text-3xl font-bold text-blue-700 dark:text-blue-400">{(totalPower * pueValue[0]).toFixed(0)} kW</div>
                <p className="text-xs text-muted-foreground">Consommation réelle</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Cooling Methods */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Méthodes de refroidissement
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {coolingMethods.map((method, index) => (
              <Card key={index} className={`lift min-w-0 border-2 border-${method.color}-500 bg-${method.color}-50 dark:bg-${method.color}-900/20 p-6`}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${method.color}-600`}>
                      <Thermometer className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">PUE: {method.pue}</p>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${method.efficiency === "Très élevée"
                      ? "bg-emerald-700 text-white"
                      : method.efficiency === "Élevée"
                        ? "bg-teal-700 text-white"
                        : method.efficiency === "Moyenne"
                          ? "bg-blue-700 text-white"
                          : "bg-amber-700 text-white"
                      }`}
                  >
                    {method.efficiency}
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{method.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-6">
            <div className="flex items-start gap-3">
              <TrendingDown className="mt-1 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Tendance :</strong> Les datacenters modernes adoptent de plus en plus le refroidissement liquide
                et l'immersion, permettant de réduire le PUE de 2,0 à 1,1, soit une économie d'énergie de 45 % (calcul :
                (2,0 − 1,1) ÷ 2,0).
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 p-6">
            <div className="flex items-start gap-3">
              <Droplets className="mt-1 h-5 w-5 shrink-0 text-blue-700 dark:text-blue-400" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Au-delà du PUE : eau et carbone.</strong> Le PUE ne dit rien de l&apos;eau ni du carbone :
                le WUE (litres d&apos;eau par kWh informatique) et le CUE (kg CO₂e par kWh informatique) complètent
                le tableau. Plus de la moitié des exploitants suivent désormais leur consommation d&apos;eau
                <SourceTooltip
                  className="ml-1 align-middle"
                  source="Uptime Institute, Global Data Center Survey 2026"
                  calculation="retour à la hausse du suivi des indicateurs durabilité, dont l'eau (>50 %)"
                  url="https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2026"
                />
                . Un datacenter « efficace » qui assèche une nappe n&apos;est pas un datacenter vert : l&apos;efficacité
                IT réelle (par requête, par inférence) compte autant que les ratios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Management Section */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Gestion intelligente de l'énergie
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="lift border-2 border-border bg-background p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                  <Zap className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Optimisation horaire</h3>
              </div>
              <p className="mb-6 text-slate-700 dark:text-slate-300">
                Les datacenters modernes adaptent leur consommation en fonction de la disponibilité des énergies
                renouvelables et des tarifs électriques.
              </p>
              <div className="space-y-4">
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-foreground">Heures creuses (2h-6h)</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">Optimal</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lancement des tâches intensives (sauvegardes, calculs batch) quand l'énergie éolienne est abondante
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-foreground">Heures pleines (10h-20h)</span>
                    <span className="text-blue-700 dark:text-blue-400 font-bold">Modéré</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Priorisation des services critiques, report des tâches non urgentes
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-foreground">Pics de consommation (18h-20h)</span>
                    <span className="text-amber-700 dark:text-amber-400 font-bold">Réduit</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Réduction volontaire de la charge pour soulager le réseau électrique
                  </p>
                </div>
              </div>
            </Card>

            <Card className="lift border-2 border-border bg-background p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/30">
                  <Wind className="h-7 w-7 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Mix énergétique dynamique</h3>
              </div>
              <p className="mb-6 text-slate-700 dark:text-slate-300">
                Les datacenters peuvent basculer entre différentes sources d'énergie en temps réel selon leur
                disponibilité et leur empreinte carbone.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
                    <Sun className="h-6 w-6 text-yellow-700 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Solaire</span>
                      <span className="text-sm text-muted-foreground">10h-16h</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-full w-[35%] rounded-full bg-yellow-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <Wind className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Éolien</span>
                      <span className="text-sm text-muted-foreground">Variable</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-full w-[45%] rounded-full bg-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
                    <Droplets className="h-6 w-6 text-teal-700 dark:text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Hydraulique</span>
                      <span className="text-sm text-muted-foreground">24h/24</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-full w-[70%] rounded-full bg-teal-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <Zap className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Nucléaire</span>
                      <span className="text-sm text-muted-foreground">24h/24</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-full w-[90%] rounded-full bg-purple-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-200 dark:border-teal-800 p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>En France :</strong> Le mix énergétique bas-carbone (nucléaire ~67 %, hydraulique ~13 %, RTE 2024) donne aux datacenters français une empreinte carbone plusieurs fois inférieure à la moyenne mondiale.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Les bons réflexes côté datacenters */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Datacenters verts : les meilleures pratiques
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="lift border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Récupération de chaleur</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                La chaleur produite par les serveurs peut chauffer des bâtiments, des serres ou des piscines
                municipales. Économie : 20-40 % d'énergie (ordre de grandeur, ADEME 2023).
              </p>
            </Card>

            <Card className="lift border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Server className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Virtualisation poussée</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Un serveur physique peut héberger 10 à 20 machines virtuelles. Taux d'utilisation optimal : 70-80 % au lieu de 10-15 % (Uptime Institute, 2024).
              </p>
            </Card>

            <Card className="lift border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Extinction intelligente</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Les serveurs inutilisés sont automatiquement mis en veille ou éteints. Économie potentielle : 30 % de la consommation (ordre de grandeur, Uptime Institute 2024).
              </p>
            </Card>
          </div>

          <Card className="lift border-2 border-border bg-background p-8">
            <h3 className="mb-6 text-xl font-bold text-foreground">Exemples de datacenters verts en France</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Scaleway (Paris)</h4>
                  <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                    Chiffres communiqués par Scaleway : PUE annoncé d'environ 1,2, refroidissement par air extérieur, électricité d'origine renouvelable et récupération de chaleur pour des logements.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-medium text-white">
                      PUE 1,2
                    </span>
                    <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-medium text-white">
                      100 % renouvelable
                    </span>
                    <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-medium text-white">
                      Récupération chaleur
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">OVHcloud (Roubaix)</h4>
                  <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                    Chiffres publiés par OVHcloud (bilan carbone 2025) : PUE moyen de 1,24 contre 1,56 en moyenne
                    sectorielle, serveurs conçus en interne durant jusqu&apos;à 9 ans, 27 composants réutilisés sur 100.
                    Engagements : −73,4 % d&apos;émissions scopes 1-2 par rapport à 2022, 100 % d&apos;électricité renouvelable
                    sur ses datacenters et trajectoire SBTi depuis 2023. Le scope 3 (fabrication, chaîne
                    d&apos;approvisionnement) représente 90 % du bilan : l&apos;atteinte des objectifs 2025 reste à confirmer
                    dans son rapport annuel.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-medium text-white">PUE moyen 1,24 (2025)</span>
                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-medium text-white">
                      −73,4 % scopes 1-2 vs 2022
                    </span>
                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-medium text-white">
                      Scope 3 : 90 % du bilan
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-600">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Qarnot Computing (Paris)</h4>
                  <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                    Concept annoncé par Qarnot : serveurs-radiateurs installés dans des logements et bureaux, chaleur réutilisée sur place et PUE théorique proche de 1,0 (chiffres de l'entreprise, non audités).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-teal-700 px-3 py-1 text-xs font-medium text-white">PUE théorique ~1,0</span>
                    <span className="rounded-full bg-teal-700 px-3 py-1 text-xs font-medium text-white">
                      100 % chaleur récupérée
                    </span>
                    <span className="rounded-full bg-teal-700 px-3 py-1 text-xs font-medium text-white">
                      Innovation
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-600">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Equinix et Saint-Denis (93)</h4>
                  <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                    Depuis juin 2024, la chaleur du datacenter PA10 (6,6 MW récupérés à 28 °C via pompes à chaleur)
                    alimente la ZAC Saulnier et le Centre Aquatique Olympique : 10 800 MWh visés par an, plus de 75 %
                    d&apos;énergie renouvelable sur le réseau
                    <SourceTooltip
                      className="ml-1 align-middle"
                      source="ENGIE Solutions, Equinix et SMIREC, 2024"
                      calculation="6,6 MW à 28 °C, 10 800 MWh/an visés, investissement 5,7 M€ (ADEME et Région)"
                      url="https://www.engie-solutions.com/fr/references/chaleur-fatale-equinix"
                    />
                    . Une première nationale, devenue obligation légale au-delà de 1 MW depuis octobre 2025 (loi
                    DDADUE n° 2025-391).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-700 px-3 py-1 text-xs font-medium text-white">6,6 MW récupérés</span>
                    <span className="rounded-full bg-orange-700 px-3 py-1 text-xs font-medium text-white">
                      Piscine olympique chauffée
                    </span>
                    <span className="rounded-full bg-orange-700 px-3 py-1 text-xs font-medium text-white">
                      Obligation légale depuis 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* France Specifics */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">Les datacenters en France</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lift border-2 border-border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Zap className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Mix énergétique favorable</h3>
              <p className="text-sm text-muted-foreground">
                La France utilise une électricité majoritairement bas-carbone (nucléaire ~67 %, RTE 2024), avec une empreinte
                carbone plus faible que la moyenne mondiale.
              </p>
            </Card>

            <Card className="lift border-2 border-border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
                <Droplets className="h-6 w-6 text-teal-700 dark:text-teal-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Climat tempéré</h3>
              <p className="text-sm text-muted-foreground">
                Le climat français permet d'utiliser le free cooling une grande partie de l'année, réduisant les besoins
                en climatisation.
              </p>
            </Card>

            <Card className="lift border-2 border-border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <Leaf className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Réglementation stricte</h3>
              <p className="text-sm text-muted-foreground">
                La France impose des normes environnementales strictes pour les nouveaux datacenters, favorisant
                l&apos;efficacité énergétique.
              </p>
            </Card>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground">
            En 2024, les datacenters français ont consommé 2,7 TWh d&apos;électricité, +12 % en un an (Arcep, enquête
            2026). La consommation électrique des centres de données progresse vite : +38 % en 3 ans
            <SourceTooltip
              className="ml-1 align-middle"
              source="Arcep, enquête annuelle « Pour un numérique soutenable », 2026"
              calculation="+38 % en 3 ans pour les centres de données"
              url="https://www.arcep.fr/la-regulation/grands-dossiers-thematiques-transverses/lempreinte-environnementale-du-numerique.html"
            />
            . L&apos;ADEME, avec un périmètre élargi à 352 sites, porte la consommation actuelle à 10 TWh, et RTE
            projette 23 à 28 TWh en 2035 (étude prospective ADEME-RTE, janvier 2026). La demande change
            d&apos;échelle : 28,6 GW de puissance demandée, dont ~18 GW déjà réservés en mai 2026, et un
            raccordement accéléré pour 5 sites de 700 MW à 1 GW — dont le Campus IA de Fouju (240 MW fin 2027,
            jusqu&apos;à 1 400 MW)
            <SourceTooltip
              className="ml-1 align-middle"
              source="RTE, 2026"
              calculation="~18 GW réservés en mai 2026 contre 5 GW fin 2024, fast-track 5 sites, Fouju 240 MW → 1 400 MW"
              url="https://www.rte-france.com/bases-electricite/consommation-electricite/essor-data-centers-france"
            />
            . L&apos;ADEME modélise 5 trajectoires : du tendanciel (×3,7 d&apos;ici 2035, deux tiers à
            l&apos;étranger sur des mix plus carbonés) au frugal (5,7 TWh en 2050). Côté production pilotable, les
            petits réacteurs avancent (permis Natrium en mars 2026, démo Aalo-Crusoe en 2027) avec un horizon
            réaliste de 2030-2034 : en attendant, gaz et batteries.
          </p>
        </div>
      </section>

      {/* Ce qu'on peut en retenir */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 dark:from-teal-900 dark:to-blue-900 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl">
            Bonnes pratiques pour réduire l'impact
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="lift border-2 border-teal-200 dark:border-teal-800 bg-white/95 dark:bg-slate-900/95 p-6">
              <h3 className="mb-4 font-bold text-foreground">Pour les utilisateurs</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Nettoyer régulièrement ses données cloud</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Limiter le stockage de fichiers volumineux</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Privilégier les hébergeurs verts</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Désactiver la synchronisation automatique</span>
                </li>
              </ul>
            </Card>

            <Card className="lift border-2 border-blue-200 dark:border-blue-800 bg-white/95 dark:bg-slate-900/95 p-6">
              <h3 className="mb-4 font-bold text-foreground">Pour les entreprises</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Optimiser l'utilisation des serveurs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Virtualiser et mutualiser les ressources</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Choisir des datacenters avec PUE bas</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Mesurer et monitorer la consommation</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground lg:text-4xl">Agissez pour un cloud plus vert</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Découvrez comment réduire votre empreinte numérique et adoptez les bonnes pratiques au quotidien.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Link href="/agir">
                Voir les actions concrètes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/outils">Calculer mon empreinte</Link>
            </Button>
          </div>
        </div>
      </section>

      <Eco2MixLive variant="datacenter" />

      {/* Sources */}
      <section className="border-t border-border bg-secondary/30 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Sources</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a
              href="https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ADEME - Impact environnemental du numérique (2023)
            </a>
            <span>•</span>
            <a
              href="https://www.iea.org/reports/energy-and-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              AIE - Energy and AI (2025)
            </a>
            <span>•</span>
            <a
              href="https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2024"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Uptime Institute - Global Data Center Survey (2024)
            </a>
            <span>•</span>
            <span>GreenIT.fr - Étude datacenters (2023)</span>
            <span>•</span>
            <a
              href="https://www.rte-france.com/bases-electricite/consommation-electricite/essor-data-centers-france"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              RTE - Les datacenters en chiffres clés (2026)
            </a>
            <span>•</span>
            <a
              href="https://infos.ademe.fr/industrie-production-durable/2026/consommation-electrique-des-data-centers-5-scenarios-pour-demain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ADEME - Prospective datacenters 2024-2060 (2026)
            </a>
            <span>•</span>
            <a
              href="https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Uptime Institute - Global Data Center Survey (2026)
            </a>
            <span>•</span>
            <a
              href="https://www.engie-solutions.com/fr/references/chaleur-fatale-equinix"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ENGIE - Chaleur fatale Equinix Saint-Denis (2024)
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

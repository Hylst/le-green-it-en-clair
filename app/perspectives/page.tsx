"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Leaf,
  Zap,
  Globe,
  Cpu,
  Wind,
  Sun,
  Droplets,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useChartTheme } from "@/lib/chart-theme"
import { PageHero } from "@/components/page-hero"
import { ReadingProgress } from "@/components/reading-progress"

// Projection data for digital carbon footprint
const projectionData = [
  { year: 2020, scenario1: 2.1, scenario2: 2.1, scenario3: 2.1 },
  { year: 2025, scenario1: 2.8, scenario2: 2.5, scenario3: 2.3 },
  { year: 2030, scenario1: 3.9, scenario2: 2.8, scenario3: 2.0 },
  { year: 2035, scenario1: 5.3, scenario2: 3.0, scenario3: 1.5 },
  { year: 2040, scenario1: 7.0, scenario2: 3.2, scenario3: 1.2 },
]

// Renewable energy adoption in datacenters
const renewableAdoptionData = [
  { year: 2020, percentage: 28 },
  { year: 2021, percentage: 32 },
  { year: 2022, percentage: 38 },
  { year: 2023, percentage: 45 },
  { year: 2024, percentage: 52 },
  { year: 2025, percentage: 60 },
]

const opportunities = [
  {
    title: "IA pour l'optimisation énergétique",
    icon: Cpu,
    color: "blue",
    description:
      "L'intelligence artificielle peut réduire la consommation de refroidissement des datacenters de 40 % en optimisant la charge des serveurs (Google, 2016).",
    impact: "Très positif",
  },
  {
    title: "Énergies renouvelables",
    icon: Sun,
    color: "emerald",
    description:
      "De plus en plus de sites fonctionnent à 100 % en électricité renouvelable en équivalent annuel (Google, Microsoft, OVH), sans suffire à décarboner le secteur (AIE, 2024).",
    impact: "Très positif",
  },
  {
    title: "Économie circulaire",
    icon: Leaf,
    color: "teal",
    description:
      "Le reconditionnement et la réparation se démocratisent, portés par la réglementation européenne et le pouvoir d'achat.",
    impact: "Positif",
  },
  {
    title: "Réglementation européenne",
    icon: Globe,
    color: "cyan",
    description:
      "L'UE impose des normes strictes : indice de réparabilité obligatoire, durée de vie minimale, écoconception des logiciels.",
    impact: "Positif",
  },
]

const risks = [
  {
    title: "Explosion de la consommation de données",
    icon: TrendingUp,
    color: "amber",
    description:
      "Le trafic internet augmente d'environ 13 % par an en France (Arcep 2024). Sans action, l'empreinte carbone du numérique pourrait tripler d'ici 2050 (ADEME-Arcep 2023).",
    impact: "Critique",
  },
  {
    title: "IA générative énergivore",
    icon: Zap,
    color: "orange",
    description:
      "Une requête en texte simple consomme environ 0,3 Wh, proche d'une recherche Google ; les usages de raisonnement, d'image ou de vidéo peuvent monter de ×10 à ×100 (Arcep 2026, Epoch AI 2025). La démocratisation de l'IA augmente donc fortement la consommation.",
    impact: "Élevé",
  },
  {
    title: "Obsolescence programmée",
    icon: AlertTriangle,
    color: "red",
    description:
      "Malgré les lois, la durée de vie moyenne des smartphones reste de 2 à 3 ans, avec un changement tous les 3 ans en moyenne (ADEME 2026). Les mises à jour logicielles finissent par ralentir les anciens appareils.",
    impact: "Élevé",
  },
  {
    title: "Raréfaction des métaux",
    icon: Droplets,
    color: "rose",
    description:
      "Les réserves de lithium, cobalt et terres rares sont limitées : le recyclage et la sobriété sont essentiels pour sécuriser les approvisionnements.",
    impact: "Critique",
  },
]

const solutions2030 = [
  {
    category: "Technologies émergentes",
    items: [
      "Serveurs à refroidissement liquide généralisés (PUE < 1.1)",
      "Processeurs ARM ultra-efficaces (environ −50 % de consommation, ordre de grandeur ARM 2023)",
      "Stockage ADN pour l'archivage (durée de vie théorique millénaire)",
      "Réseaux 6G optimisés pour l'efficacité énergétique",
    ],
  },
  {
    category: "Modèles économiques",
    items: [
      "Location longue durée plutôt que propriété",
      "Garantie légale étendue à 10 ans",
      "Bonus-malus sur la durabilité des produits",
      "Consigne sur les appareils électroniques",
    ],
  },
  {
    category: "Comportements",
    items: [
      "Sobriété numérique enseignée dès l'école",
      "Limitation volontaire du streaming HD",
      "Réparation devenue réflexe culturel",
      "Hébergement mutualisé optimisé plutôt que services surdimensionnés",
    ],
  },
]

export default function PerspectivesPage() {
  const chart = useChartTheme()
  return (
    <div data-theme="violet" className="min-h-screen bg-background">
      <ReadingProgress />
      {/* Hero Section */}
      <PageHero
        theme="violet"
        image={{ src: "/greenit/images/hero-perspectives.webp", alt: "Lever de soleil sur une ville verte avec éoliennes et panneaux solaires" }}
        badge={{ icon: Lightbulb, label: "Perspectives & Avenir" }}
        title="L'avenir du numérique responsable"
        intro="Entre opportunités technologiques et risques environnementaux : quel futur pour le Green IT en France et dans le monde ?"
      />

      {/* Scenarios 2040 */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">3 scénarios pour 2040</h2>

          <Card className="mb-8 border-2 border-border p-8 lg:p-12">
            <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
              Projection de l'empreinte carbone du numérique (Gt CO₂eq)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis dataKey="year" stroke={chart.tick} />
                <YAxis stroke={chart.tick} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "2px solid var(--border)", borderRadius: "0.5rem" }}
                />
                <Line
                  type="monotone"
                  dataKey="scenario1"
                  stroke={chart.red}
                  strokeWidth={3}
                  name="Scénario tendanciel"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="scenario2"
                  stroke={chart.amber}
                  strokeWidth={3}
                  name="Scénario modéré"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="scenario3"
                  stroke={chart.emerald}
                  strokeWidth={3}
                  name="Scénario sobre"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              Projection illustrative du site, périmètre mondial (Gt CO₂eq) : les ordres de grandeur sont indicatifs.
              La prospective ADEME-Arcep citée ci-dessous porte sur la France.
            </p>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-2 border-red-500 bg-red-50 dark:bg-red-900/20 p-6 lift">
              <div className="mb-4 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-red-700 dark:text-red-400" />
                <h3 className="text-xl font-bold text-foreground">Scénario tendanciel</h3>
              </div>
              <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">
                <strong>Scénario illustratif : ×3 d'ici 2050</strong> - Si les tendances actuelles se poursuivent, l'empreinte du numérique pourrait tripler d'ici 2050 (ADEME-Arcep 2023).
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>Croissance exponentielle du streaming 8K et VR</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>IA générative omniprésente et énergivore</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>Renouvellement rapide des appareils (2 ans)</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>Datacenters peu optimisés</span>
                </li>
              </ul>
            </Card>

            <Card className="border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-6 lift">
              <div className="mb-4 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-amber-700 dark:text-amber-400" />
                <h3 className="text-xl font-bold text-foreground">Scénario modéré</h3>
              </div>
              <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">
                <strong>Scénario illustratif : +52 % d'ici 2040</strong> - Application partielle des bonnes pratiques et réglementations.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>Datacenters 50 % renouvelables</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>Durée de vie moyenne 4 ans</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>Taux de recyclage 60 %</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>Écoconception logicielle encouragée</span>
                </li>
              </ul>
            </Card>

            <Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-6">
              <div className="mb-4 flex items-center gap-3">
                <TrendingDown className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
                <h3 className="text-xl font-bold text-foreground">Scénario sobre</h3>
              </div>
              <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">
                <strong>Scénario illustratif : -43 % d'ici 2040</strong> - Transformation profonde vers un numérique durable.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Datacenters 100 % renouvelables</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Durée de vie moyenne 7 ans</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Taux de recyclage 90 %</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Sobriété numérique généralisée</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Renewable Energy Adoption */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Transition vers les énergies renouvelables
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 border-border p-8">
              <h3 className="mb-6 text-xl font-semibold text-foreground">
                Adoption des énergies renouvelables dans les datacenters
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={renewableAdoptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                  <XAxis dataKey="year" stroke={chart.tick} />
                  <YAxis stroke={chart.tick} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "2px solid var(--border)", borderRadius: "0.5rem" }}
                  />
                  <Bar dataKey="percentage" fill={chart.emerald} radius={[8, 8, 0, 0]} name="% Renouvelable" />
                </BarChart>
              </ResponsiveContainer>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                Ordre de grandeur illustratif : dans ce scénario, la part du renouvelable progresse d'environ 6 points par an.
              </p>
            </Card>

            <div className="space-y-6">
<Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-6 lift">
                <div className="mb-4 flex items-center gap-3">
                  <Sun className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
                  <h3 className="text-lg font-bold text-foreground">Solaire</h3>
                </div>
                <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
                  Les panneaux solaires sur les toits des datacenters peuvent couvrir 20-30 % des besoins d'un site (ordre de grandeur, ADEME 2023).
                </p>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">30 %</div>
                <p className="text-xs text-muted-foreground">des nouveaux datacenters équipés (illustratif)</p>
              </Card>

              <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Wind className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                  <h3 className="text-lg font-bold text-foreground">Éolien</h3>
                </div>
                <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
                  Les grands acteurs (Google, Microsoft, Amazon) annoncent 100 % d'électricité renouvelable en équivalent annuel (communication d'entreprise, 2024).
                </p>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">100 %</div>
                <p className="text-xs text-muted-foreground">annoncés en équivalent annuel</p>
              </Card>

              <Card className="border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Droplets className="h-8 w-8 text-teal-700 dark:text-teal-400" />
                  <h3 className="text-lg font-bold text-foreground">Hydraulique</h3>
                </div>
                <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
                  Le mix français est bas-carbone à plus de 90 % : nucléaire ~67 %, hydraulique ~13 % (RTE, 2024).
                </p>
                <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">95 %</div>
                <p className="text-xs text-muted-foreground">d'énergie bas-carbone en France (RTE, 2024)</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Opportunités et innovations
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon
              return (
                <Card key={index} className={`min-w-0 border-2 border-${opportunity.color}-500 bg-${opportunity.color}-50 dark:bg-${opportunity.color}-900/20 p-6 lift`}>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${opportunity.color}-600`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{opportunity.title}</h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        opportunity.impact === "Très positif" ? "bg-emerald-700 text-white" : "bg-teal-700 text-white"
                      }`}
                    >
                      {opportunity.impact}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{opportunity.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">Risques et défis</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {risks.map((risk, index) => {
              const Icon = risk.icon
              return (
                <Card key={index} className={`min-w-0 border-2 border-${risk.color}-500 bg-${risk.color}-50 dark:bg-${risk.color}-900/20 p-6 lift`}>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${risk.color}-600`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{risk.title}</h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        risk.impact === "Critique" ? "bg-red-700 text-white" : "bg-orange-700 text-white"
                      }`}
                    >
                      {risk.impact}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{risk.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Solutions 2030 */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">Solutions pour 2030</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {solutions2030.map((solution, index) => (
              <Card key={index} className="border-2 border-border p-6 lift">
                <h3 className="mb-6 text-xl font-bold text-foreground">{solution.category}</h3>
                <ul className="space-y-3">
                  {solution.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Messages */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-800 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl">Messages clés pour l'avenir</h2>
          <div className="space-y-6">
            <Card className="border-2 border-emerald-200 bg-white/95 dark:bg-slate-900/95 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">L'avenir n'est pas écrit</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Nous avons le choix entre un scénario tendanciel (×3 d'ici 2050, ADEME-Arcep 2023) et un scénario de sobriété
                    (scénario illustratif du site). Chaque action compte.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-teal-200 bg-white/95 dark:bg-slate-900/95 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">La technologie n'est pas la solution miracle</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Les innovations (IA, énergies renouvelables) sont nécessaires mais insuffisantes. La sobriété
                    numérique est indispensable.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-blue-200 bg-white/95 dark:bg-slate-900/95 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Agir maintenant pour 2030</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Les 5 prochaines années sont cruciales. Les décisions prises aujourd'hui détermineront la
                    trajectoire jusqu'en 2040.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-cyan-200 bg-white/95 dark:bg-slate-900/95 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-lg font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">La France a un rôle à jouer</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Avec son mix énergétique bas-carbone et sa réglementation avancée, la France peut être un modèle
                    européen du Green IT.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground lg:text-4xl">
            Construisons ensemble un numérique durable
          </h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-300">
            Découvrez comment agir concrètement pour contribuer au scénario sobre et réduire l'impact environnemental du
            numérique.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
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

      {/* Sources */}
      <section className="border-t border-border bg-secondary/30 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Sources</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>The Shift Project : Lean ICT (2018)</span>
            <span>•</span>
            <span>ADEME-Arcep : Prospective 2030-2050 (2023)</span>
            <span>•</span>
            <a
              href="https://www.iea.org/reports/net-zero-roadmap-a-global-pathway-to-keep-the-15-c-goal-in-reach"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              AIE : Net Zero Roadmap (2023)
            </a>
            <span>•</span>
            <a
              href="https://www.greenit.fr/etude-empreinte-environnementale-du-numerique-mondial/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GreenIT : Empreinte environnementale du numérique mondial (2025)
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

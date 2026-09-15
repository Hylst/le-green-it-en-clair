"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SourceTooltip } from "@/components/source-tooltip"
import {
  AlertTriangle,
  TrendingUp,
  Zap,
  Droplets,
  Trash2,
  Factory,
  Globe,
  Cpu,
  Leaf,
  Recycle,
  Shield,
  Users,
  Building2,
  Lightbulb,
  CheckCircle2,
  Clock,
  ArrowRight,
  Smartphone,
  Server,
  Cloud,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Data for e-waste growth
const eWasteGrowthData = [
  { year: 2015, amount: 44.7 },
  { year: 2017, amount: 48.2 },
  { year: 2019, amount: 53.6 },
  { year: 2021, amount: 57.4 },
  { year: 2022, amount: 62.0 },
  { year: 2024, amount: 67.2 },
  { year: 2025, amount: 69.8 },
  { year: 2030, amount: 82.0 },
]

// Data for digital carbon footprint by sector
const carbonBySectorData = [
  { sector: "Équipements", percentage: 79, color: "#ef4444" },
  { sector: "Datacenters", percentage: 16, color: "#f59e0b" },
  { sector: "Réseaux", percentage: 5, color: "#10b981" },
]

// Data for recycling rates by country
const recyclingRatesData = [
  { country: "Norvège", rate: 85 },
  { country: "Suisse", rate: 78 },
  { country: "France", rate: 46 },
  { country: "Allemagne", rate: 68 },
  { country: "Espagne", rate: 42 },
  { country: "Italie", rate: 38 },
]

const mainProblems = [
  {
    title: "Extraction massive de ressources",
    icon: Factory,
    color: "red",
    severity: "Critique",
    stats: "70 kg de matières premières pour 1 smartphone",
    description:
      "L'extraction des métaux rares (lithium, cobalt, terres rares) nécessite des quantités colossales d'eau et d'énergie, détruit des écosystèmes entiers et génère des pollutions toxiques.",
    impacts: [
      "Déforestation et destruction d'habitats naturels",
      "Pollution des nappes phréatiques",
      "Conditions de travail dangereuses dans les mines",
      "Épuisement des ressources non renouvelables",
    ],
    data2025:
      "Bonne nouvelle : la demande en lithium a triplé entre 2017 et 2022 (AIE, Critical Minerals Market Review 2023), et prolonger la vie de nos batteries reste le geste le plus efficace.",
  },
  {
    title: "Déchets électroniques exponentiels",
    icon: Trash2,
    color: "orange",
    severity: "Critique",
    stats: "~70 Mt de e-déchets en 2025 (GEM 2024)",
    description:
      "La production mondiale de déchets électroniques augmente environ 5 fois plus vite que le recyclage : 62 Mt en 2022, environ 69-70 Mt en 2025, 82 Mt projetées en 2030 (+2,6 Mt/an). Seuls 22,3 % ont été collectés et recyclés en 2022, et la trajectoire actuelle ne mènerait qu'à ~20 % en 2030 (Global E-waste Monitor 2024).",
    impacts: [
      "Pollution des sols et de l'eau par métaux lourds",
      "Incinération toxique dans les pays en développement",
      "Perte de ressources précieuses non récupérées",
      "Accumulation dans les décharges sauvages",
    ],
    data2025:
      "En France, chaque habitant produit 24 kg de e-déchets par an, mais seulement 13 kg sont collectés pour recyclage.",
  },
  {
    title: "Consommation énergétique croissante",
    icon: Zap,
    color: "amber",
    severity: "Élevé",
    stats: "3,4 % des émissions mondiales de GES",
    description:
      "Le numérique génère 1,8 Gt CO₂e, soit 3,4 % des émissions mondiales (GreenIT, EENM 2025), et consomme de l'ordre de 10 % de l'électricité mondiale tous usages confondus (à ne pas confondre avec les 1,5 % des seuls datacenters, AIE 2024). Datacenters, réseaux et équipements utilisateurs en sont les principaux postes.",
    impacts: [
      "Émissions de CO₂ en constante augmentation",
      "Stress sur les réseaux électriques",
      "Dépendance aux énergies fossiles",
      "Effet rebond : l'efficacité énergétique est annulée par l'augmentation des usages",
    ],
    data2025:
      "Les datacenters représentent 1,5 % de la consommation électrique mondiale (AIE, 2024). La France en compte de l'ordre de 250, dont une vingtaine de grande taille (France Datacenter).",
  },
  {
    title: "Obsolescence programmée et rapide",
    icon: Clock,
    color: "rose",
    severity: "Élevé",
    stats: "2 à 3 ans de durée de vie moyenne d'un smartphone, changement tous les 3 ans",
    description:
      "Les fabricants conçoivent délibérément des produits avec une durée de vie limitée, par des mises à jour logicielles qui ralentissent les anciens appareils ou des composants non réparables.",
    impacts: [
      "Renouvellement prématuré des équipements",
      "Gaspillage de ressources et d'énergie",
      "Coût financier élevé pour les consommateurs",
      "Culture du jetable plutôt que de la réparation",
    ],
    data2025:
      "62 % des Français renouvellent leur smartphone alors qu'il fonctionne encore (ADEME, 2026). Bonne nouvelle : en 2026, Apple propose 5 à 7 ans de mises à jour, les Pixel et Samsung récents jusqu'à 7 ans, et l'UE impose 5 ans de mises à jour et 7 ans de pièces détachées depuis juin 2025 (règlement 2023/1670).",
  },
  {
    title: "Pollution de l'eau",
    icon: Droplets,
    color: "blue",
    severity: "Élevé",
    stats: "12 000 litres d'eau pour 1 smartphone",
    description:
      "La fabrication des composants électroniques nécessite d'énormes quantités d'eau ultra-pure. Les usines de semi-conducteurs sont parmi les plus grandes consommatrices d'eau industrielle.",
    impacts: [
      "Stress hydrique dans les régions de production",
      "Pollution chimique des eaux usées",
      "Compétition avec l'agriculture et l'eau potable",
      "Assèchement de nappes phréatiques",
    ],
    data2025:
      "Taïwan concentre l'essentiel de la fonderie mondiale (TSMC : environ 67 % en valeur, Counterpoint, T4 2024), une industrie très gourmande en eau ultra-pure.",
  },
  {
    title: "Inégalités sociales et géographiques",
    icon: Globe,
    color: "purple",
    severity: "Élevé",
    stats: "Export illégal réel mais minoritaire (GEM 2024)",
    description:
      "Une partie des déchets électroniques est exportée illégalement vers des pays aux filières fragiles, où le démontage se fait parfois dans des conditions dangereuses. Mais la majorité est traitée localement : allonger la durée de vie et trier reste le geste le plus utile (Global E-waste Monitor 2024).",
    impacts: [
      "Exploitation des travailleurs, y compris des enfants",
      "Pollution concentrée dans les pays du Sud",
      "Problèmes de santé publique (cancers, malformations)",
      "Injustice environnementale globale",
    ],
    data2025:
      "Le Nigeria a importé environ 288 kt d'équipements usagés en 2017 et le Ghana environ 215 kt, dont seule une partie sont de vrais déchets ; les flux illégaux (environ 20 kt/an au Ghana en 2019) existent mais restent minoritaires (Trésor français, Global E-waste Monitor 2024).",
  },
]

const currentTrends = [
  {
    title: "Explosion de l'IA générative",
    icon: Cpu,
    trend: "up",
    impact: "Négatif",
    description:
      "Un prompt texte simple consomme environ 0,3 Wh, soit à peu près autant qu'une recherche web. Les usages gourmands (raisonnement poussé, image, vidéo) peuvent consommer 10 à 100 fois plus : à réserver aux vrais besoins.",
    data: "≈ 0,3 Wh par prompt texte simple (≈ une recherche) ; ×10 à ×100 pour raisonnement/image/vidéo (mesures 2025-2026 : Epoch AI, Altman, Google, Joule)",
  },
  {
    title: "5G et 6G en déploiement",
    icon: Globe,
    trend: "up",
    impact: "Mixte",
    description:
      "Plus efficaces par bit transmis, mais l'augmentation massive du trafic annule les gains (effet rebond).",
    data: "Plus efficace par bit transmis, mais la hausse du trafic peut annuler les gains (effet rebond, Arcep 2024)",
  },
  {
    title: "Cloud computing omniprésent",
    icon: Cloud,
    trend: "up",
    impact: "Mixte",
    description:
      "Centralisation dans des datacenters optimisés, mais augmentation de la dépendance et du trafic réseau.",
    data: "52,7 % des entreprises de l'UE utilisent le cloud en 2025 (Eurostat), contre environ un quart en 2015",
  },
  {
    title: "Marché du reconditionné en croissance",
    icon: Recycle,
    trend: "up",
    impact: "Positif",
    description:
      "Le marché des smartphones reconditionnés progresse chaque année en France, porté par la conscience écologique et le pouvoir d'achat.",
    data: "La France compte parmi les marchés européens les plus dynamiques du reconditionné (ADEME, 2022)",
  },
  {
    title: "Réglementation européenne renforcée",
    icon: Shield,
    trend: "up",
    impact: "Positif",
    description:
      "L'UE impose des normes strictes : indice de réparabilité, durée de vie minimale, chargeurs universels, écoconception logicielle.",
    data: "Indice de réparabilité obligatoire en France depuis 2021 ; l'UE impose depuis 2025 l'étiquette énergie et l'indice de durabilité (règlement 2023/1670)",
  },
  {
    title: "Streaming vidéo en ultra-haute définition",
    icon: TrendingUp,
    trend: "up",
    impact: "Négatif",
    description:
      "Le streaming vidéo représente environ 60 % du trafic internet mondial (Sandvine, 2024). La 4K et 8K multiplient la bande passante nécessaire.",
    data: "1h de streaming 4K = 6 Go vs ~0,7 Go en SD (Kamiya)",
  },
]

const currentSolutions = [
  {
    category: "Économie circulaire",
    icon: Recycle,
    color: "emerald",
    solutions: [
      {
        name: "Reconditionnement professionnel",
        description: "Reconditionneurs professionnels : garantie légale de 2 ans, économie d'environ 75 à 90 % du CO₂ par rapport au neuf (ADEME, 2022)",
        adoption: "Élevée",
      },
      {
        name: "Réparation facilitée",
        description: "Indice de réparabilité, pièces détachées disponibles 10 ans, bonus réparation ADEME",
        adoption: "Moyenne",
      },
      {
        name: "Location longue durée",
        description: "Fairphone, Commown : location avec maintenance incluse, propriété collective",
        adoption: "Faible",
      },
    ],
  },
  {
    category: "Écoconception",
    icon: Leaf,
    color: "teal",
    solutions: [
      {
        name: "Matériaux durables",
        description: "Fairphone : matériaux recyclés, équitables, modulaires, réparables",
        adoption: "Faible",
      },
      {
        name: "Logiciels sobres",
        description: "Écoconception web, applications légères, optimisation du code",
        adoption: "Faible",
      },
      {
        name: "Design modulaire",
        description: "Framework Laptop : composants remplaçables, évolutifs, standardisés",
        adoption: "Faible",
      },
    ],
  },
  {
    category: "Datacenters verts",
    icon: Server,
    color: "blue",
    solutions: [
      {
        name: "Énergies renouvelables",
        description: "Google, Microsoft, OVH : 100% renouvelable, PPA (Power Purchase Agreements)",
        adoption: "Élevée",
      },
      {
        name: "Refroidissement innovant",
        description: "Free cooling, immersion liquide, récupération de chaleur",
        adoption: "Moyenne",
      },
      {
        name: "IA pour l'optimisation",
        description: "DeepMind (Google) : réduction de 40% de la consommation de refroidissement (Google, 2016)",
        adoption: "Moyenne",
      },
    ],
  },
  {
    category: "Réglementation",
    icon: Shield,
    color: "purple",
    solutions: [
      {
        name: "Indice de réparabilité",
        description: "Note /10 obligatoire en France depuis 2021 ; l'UE impose depuis 2025 l'étiquette énergie et l'indice de durabilité (règlement 2023/1670)",
        adoption: "Élevée",
      },
      {
        name: "Droit à la réparation",
        description: "Pièces détachées disponibles, documentation technique accessible",
        adoption: "Moyenne",
      },
      {
        name: "Lutte contre l'obsolescence",
        description: "Sanctions contre l'obsolescence programmée, mises à jour 5 ans et pièces détachées 7 ans imposées par l'UE (règlement 2023/1670)",
        adoption: "Moyenne",
      },
    ],
  },
]

const futureSolutions = [
  {
    category: "Technologies émergentes",
    icon: Lightbulb,
    color: "cyan",
    timeframe: "2025-2030",
    solutions: [
      {
        name: "Processeurs ultra-efficaces",
        description:
          "Puces ARM et RISC-V nouvelle génération : -70% de consommation, architecture neuromorphique inspirée du cerveau (ordre de grandeur, ARM 2023)",
        potential: "Très élevé",
        challenges: "Compatibilité logicielle, coûts de R&D",
      },
      {
        name: "Stockage ADN",
        description:
          "Archivage de données dans l'ADN synthétique : densité annoncée jusqu'à 1 000 fois supérieure, durée de vie théorique millénaire, consommation très faible en phase de stockage (technologie encore expérimentale)",
        potential: "Élevé",
        challenges: "Coût actuel prohibitif, vitesse d'écriture/lecture",
      },
      {
        name: "Informatique quantique",
        description:
          "Résolution de certains problèmes avec une consommation potentiellement très inférieure aux supercalculateurs classiques (avantage encore théorique et dépendant des cas d'usage)",
        potential: "Moyen",
        challenges: "Technologie encore expérimentale, refroidissement cryogénique",
      },
      {
        name: "Matériaux biosourcés",
        description: "Circuits imprimés en champignons, bioplastiques, composants biodégradables",
        potential: "Moyen",
        challenges: "Performances, durabilité, industrialisation",
      },
    ],
  },
  {
    category: "Modèles économiques",
    icon: Users,
    color: "indigo",
    timeframe: "2025-2035",
    solutions: [
      {
        name: "Économie de la fonctionnalité",
        description:
          "Vendre l'usage plutôt que le produit : abonnement avec maintenance, réparation, mise à niveau incluses",
        potential: "Très élevé",
        challenges: "Changement culturel, modèle économique des fabricants",
      },
      {
        name: "Consigne électronique",
        description: "Dépôt remboursable à l'achat, restitution obligatoire en fin de vie pour recyclage garanti",
        potential: "Élevé",
        challenges: "Logistique, montant de la consigne, fraude",
      },
      {
        name: "Garantie légale étendue",
        description: "Passage de 2 à 10 ans de garantie légale, obligation de réparabilité",
        potential: "Élevé",
        challenges: "Résistance des fabricants, coûts",
      },
      {
        name: "Bonus-malus écologique",
        description: "Taxe sur les produits peu durables, subvention pour les produits écoconçus et réparables",
        potential: "Moyen",
        challenges: "Définition des critères, contrôle, acceptabilité",
      },
    ],
  },
  {
    category: "Infrastructures",
    icon: Building2,
    color: "violet",
    timeframe: "2025-2040",
    solutions: [
      {
        name: "Datacenters sous-marins",
        description: "Microsoft Project Natick : refroidissement naturel, énergies marines, fiabilité accrue",
        potential: "Moyen",
        challenges: "Impact sur écosystèmes marins, maintenance, coûts",
      },
      {
        name: "Edge computing généralisé",
        description: "Traitement local des données, réduction du trafic réseau, latence minimale",
        potential: "Élevé",
        challenges: "Sécurité, gestion distribuée, consommation des équipements edge",
      },
      {
        name: "Réseaux 6G sobres",
        description: "Optimisation énergétique native, mise en veille intelligente, efficacité spectrale maximale",
        potential: "Élevé",
        challenges: "Standardisation, déploiement, effet rebond",
      },
      {
        name: "Micro-datacenters urbains",
        description: "Récupération de chaleur pour chauffage urbain, proximité des utilisateurs",
        potential: "Moyen",
        challenges: "Foncier, acceptabilité, rentabilité",
      },
    ],
  },
  {
    category: "Changements comportementaux",
    icon: Users,
    color: "pink",
    timeframe: "2025-2050",
    solutions: [
      {
        name: "Éducation à la sobriété numérique",
        description: "Enseignement dès l'école primaire, formation professionnelle, campagnes de sensibilisation",
        potential: "Très élevé",
        challenges: "Temps long, résistance culturelle",
      },
      {
        name: "Quotas carbone personnels",
        description: "Allocation individuelle d'empreinte numérique, incitation à la sobriété",
        potential: "Faible",
        challenges: "Acceptabilité sociale, contrôle, équité",
      },
      {
        name: "Réparation comme norme culturelle",
        description: "Repair cafés généralisés, valorisation de la réparation, stigmatisation du gaspillage",
        potential: "Élevé",
        challenges: "Changement de mentalité, disponibilité des pièces",
      },
      {
        name: "Limitation volontaire des usages",
        description: "Streaming en SD par défaut, limitation de la 4K/8K, désactivation de l'autoplay",
        potential: "Moyen",
        challenges: "Acceptabilité, pression marketing",
      },
    ],
  },
]

export default function ProblematiquesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-red-950/40 dark:via-orange-950/40 dark:to-amber-950/40 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/30 px-4 py-2 text-sm font-medium text-red-800 dark:text-red-300">
            <AlertTriangle className="h-4 w-4" />
            Problématiques & Solutions
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
            Les défis du numérique et les solutions pour y répondre
          </h1>
          <p className="text-pretty text-lg text-slate-600 dark:text-slate-300 lg:text-xl">
            Comprendre les problématiques environnementales du numérique, analyser les tendances actuelles, et découvrir
            les solutions existantes et à développer pour un avenir durable.
          </p>
        </div>
      </section>

      {/* E-Waste Growth Chart */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
            L'explosion des déchets électroniques
          </h2>
          <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 lg:p-12">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={eWasteGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" label={{ value: "Millions de tonnes", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)"
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="E-déchets (Mt)"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              <strong>+56 % en 10 ans</strong> - 62 Mt en 2022, environ 69-70 Mt en 2025, 82 Mt projetées en 2030
              (+2,6 Mt/an, Global E-waste Monitor 2024).
            </p>
          </Card>
        </div>
      </section>

      {/* Main Problems */}
      <section className="bg-slate-50 dark:bg-slate-900 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
            Les 6 problématiques majeures
          </h2>
          <div className="space-y-8">
            {mainProblems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <Card key={index} className={`border-2 border-${problem.color}-500 bg-white dark:bg-slate-950 p-8`}>
                  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-${problem.color}-600`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{problem.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{problem.description}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold ${problem.severity === "Critique" ? "bg-red-600 text-white" : "bg-orange-600 text-white"
                          }`}
                      >
                        {problem.severity}
                      </span>
                      <span className={`text-2xl font-bold text-${problem.color}-700`}>{problem.stats}</span>
                    </div>
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Impacts environnementaux et sociaux</h4>
                      <ul className="space-y-2">
                        {problem.impacts.map((impact, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 text-${problem.color}-600`} />
                            <span>{impact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold text-slate-900 dark:text-slate-100">Données 2025</h4>
                      <p className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4 text-sm text-slate-700 dark:text-slate-300">{problem.data2025}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Carbon Footprint Breakdown */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
            Répartition de l'empreinte carbone du numérique
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={carbonBySectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ sector, percentage }) => `${sector}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {carbonBySectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
              <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              France, tous impacts, données 2020-2022 (ADEME-Arcep 2023)
            </p>
          </Card>

          <div className="space-y-4">
              <Card className="border-2 border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-700 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-red-700 dark:text-red-400" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Équipements utilisateurs</h3>
                  </div>
                  <span className="text-2xl font-bold text-red-700 dark:text-red-400">
                    79%
                    <SourceTooltip className="ml-1" source="ADEME-Arcep, 2023 (France, tous impacts, 2020-2022)" calculation="équipements utilisateurs : fabrication + usage, soit ~3/4 de l'empreinte" />
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  La fabrication des smartphones, ordinateurs, tablettes, objets connectés représente les 3/4 de
                  l'impact. <strong>C'est là qu'il faut agir en priorité.</strong>
                </p>
              </Card>

              <Card className="border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-amber-700 dark:text-amber-400" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Datacenters</h3>
                  </div>
                  <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                    16%
                    <SourceTooltip className="ml-1" source="ADEME-Arcep, 2023 (France, tous impacts, 2020-2022)" calculation="part des datacenters dans l'empreinte du numérique" />
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Les centres de données consomment beaucoup d'énergie, mais leur efficacité s'améliore. Les efforts
                  portent sur les énergies renouvelables et le refroidissement.
                </p>
              </Card>

              <Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Réseaux</h3>
                  </div>
                  <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    5%
                    <SourceTooltip className="ml-1" source="ADEME-Arcep, 2023 (France, tous impacts, 2020-2022)" calculation="part des réseaux dans l'empreinte du numérique" />
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Les infrastructures réseau (fibre, 4G/5G, routeurs) ont un impact relativement faible mais en
                  croissance avec l'explosion du trafic de données.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Device Lifespan Trends */}
      <section className="bg-slate-50 dark:bg-slate-900 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
            L'obsolescence accélérée des appareils
          </h2>
          <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 lg:p-12">
            <p className="text-center text-base text-slate-700 dark:text-slate-300">
              <strong>62 % des appareils sont renouvelés alors qu'ils fonctionnent encore, et 100 millions dorment dans les tiroirs (ADEME 2026)</strong> - On change de smartphone tous les 3 ans en moyenne. Les mises à jour logicielles et le manque de réparabilité accélèrent ce renouvellement : garder ses appareils plus longtemps et les réparer reste le premier levier.
            </p>
          </Card>
        </div>
      </section>

      {/* Current Trends */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">Tendances actuelles 2025</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentTrends.map((trend, index) => {
              const Icon = trend.icon
              const impactColor = trend.impact === "Positif" ? "emerald" : trend.impact === "Négatif" ? "red" : "amber"
              return (
                <Card key={index} className={`border-2 border-${impactColor}-500 bg-${impactColor}-50 dark:bg-${impactColor}-900/20 dark:border-${impactColor}-700 p-6`}>
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${impactColor}-600`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${trend.impact === "Positif"
                        ? "bg-emerald-600 text-white"
                        : trend.impact === "Négatif"
                          ? "bg-red-600 text-white"
                          : "bg-amber-600 text-white"
                        }`}
                    >
                      {trend.impact}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100">{trend.title}</h3>
                  <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">{trend.description}</p>
                  <div className="rounded-lg bg-white dark:bg-slate-900 p-3">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">{trend.data}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Current Solutions */}
      <section className="bg-slate-50 dark:bg-slate-900 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
            Solutions actuelles déployées
          </h2>
          <div className="space-y-8">
            {currentSolutions.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className={`border-2 border-${category.color}-500 bg-white dark:bg-slate-950 p-8`}>
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-${category.color}-600`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{category.category}</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    {category.solutions.map((solution, idx) => (
                      <div key={idx} className="rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">{solution.name}</h4>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${solution.adoption === "Élevée"
                              ? "bg-emerald-600 text-white"
                              : solution.adoption === "Moyenne"
                                ? "bg-amber-600 text-white"
                                : "bg-slate-600 text-white"
                              }`}
                          >
                            {solution.adoption}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{solution.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recycling Rates */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
            Taux de recyclage en Europe (2025)
          </h2>
          <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 lg:p-12">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={recyclingRatesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" />
                <YAxis dataKey="country" type="category" stroke="#64748b" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)"
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="rate" fill="#10b981" radius={[0, 8, 8, 0]} name="Taux de recyclage (%)" />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-6 text-center text-sm text-slate-600">
              La France collecte et recycle environ 46 % de ses e-déchets, en progrès mais encore loin des leaders
              nordiques. Objectif européen : 65 % de collecte (directive DEEE).
            </p>
          </Card>
        </div>
      </section>

      {/* Future Solutions */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
            Solutions à développer pour l'avenir
          </h2>
          <div className="space-y-8">
            {futureSolutions.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className={`border-2 border-${category.color}-500 bg-white dark:bg-slate-950 p-8`}>
                  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-${category.color}-600`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{category.category}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Horizon : {category.timeframe}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.solutions.map((solution, idx) => (
                      <div key={idx} className="rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">{solution.name}</h4>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${solution.potential === "Très élevé"
                              ? "bg-emerald-600 text-white"
                              : solution.potential === "Élevé"
                                ? "bg-teal-600 text-white"
                                : "bg-blue-600 text-white"
                              }`}
                          >
                            {solution.potential}
                          </span>
                        </div>
                        <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">{solution.description}</p>
                        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/30 p-3">
                          <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">Défis : {solution.challenges}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Messages */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">Messages clés</h2>
          <div className="space-y-6">
            <Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Le problème principal : la fabrication</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    79% de l'impact vient des équipements utilisateurs (France, ADEME-Arcep 2023). Allonger la durée de vie de nos appareils est
                    l'action la plus efficace.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-700 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-teal-700 dark:text-teal-400" />
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Des solutions existent déjà</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Reconditionnement, réparation, écoconception, datacenters verts : de nombreuses solutions sont
                    déployées mais doivent être généralisées.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-blue-700 dark:text-blue-400" />
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">L'innovation ne suffit pas</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Les technologies futures (IA, stockage ADN, processeurs efficaces) sont prometteuses mais la
                    sobriété numérique reste indispensable.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-purple-700 dark:text-purple-400" />
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Agir à tous les niveaux</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Citoyens, entreprises, collectivités, législateurs : chacun a un rôle à jouer pour transformer le
                    numérique.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-800 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">Passez à l'action maintenant</h2>
          <p className="mb-8 text-lg text-emerald-50">
            Découvrez les actions concrètes que vous pouvez mettre en place dès aujourd'hui pour réduire votre impact
            numérique.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-background text-emerald-700 hover:bg-emerald-50 dark:bg-slate-900 dark:text-emerald-400 dark:hover:bg-slate-800 border-none shadow-lg">
              <Link href="/agir">
                Voir les actions concrètes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent dark:border-white/20">
              <Link href="/outils">
                Calculer mon empreinte
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="border-t border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Sources</h3>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span>Global E-Waste Monitor 2024 (ONU)</span>
            <span>•</span>
            <span>AIE - Critical Minerals Market Review 2023</span>
            <span>•</span>
            <span>Epoch AI, Altman, Google, Joule - mesures IA 2025-2026</span>
            <span>•</span>
            <span>Kamiya - streaming SD ~0,7 Go/h</span>
            <span>•</span>
            <span>UE - 5 ans de mises à jour, 7 ans de pièces (règlement 2023/1670)</span>
            <span>•</span>
            <span>ADEME - Impact environnemental du numérique (2023)</span>
            <span>•</span>
            <span>GreenIT.fr - Empreinte environnementale du numérique mondial (2025)</span>
            <span>•</span>
            <span>The Shift Project - Lean ICT (2024)</span>
            <span>•</span>
            <span>IEA - Energy Efficiency 2024</span>
          </div>
        </div>
      </section>
    </div>
  )
}

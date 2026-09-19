"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SourceTooltip } from "@/components/source-tooltip"
import { PageHero } from "@/components/page-hero"
import { SectionDivider } from "@/components/section-divider"
import { Reveal } from "@/components/reveal"
import { ReadingProgress } from "@/components/reading-progress"
import { Acronym } from "@/components/acronym"
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
import { useChartTheme } from "@/lib/chart-theme"

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
  { sector: "Équipements", percentage: 79 },
  { sector: "Datacenters", percentage: 16 },
  { sector: "Réseaux", percentage: 5 },
]

// Data for recycling rates by country (Eurostat / Ecosystem, 2024, même série que /chiffres)
const recyclingRatesData = [
  { country: "France", rate: 46 },
  { country: "Allemagne", rate: 52 },
  { country: "Suède", rate: 54 },
  { country: "Royaume-Uni", rate: 44 },
  { country: "Espagne", rate: 39 },
  { country: "Italie", rate: 45 },
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
    data2025: (
      <>
        Bonne nouvelle : la demande en lithium a triplé entre 2017 et 2022 (
        <Acronym title="Agence Internationale de l'Énergie (IEA en anglais)" glossary="aie">
          AIE
        </Acronym>
        , Critical Minerals Market Review 2023), et prolonger la vie de nos batteries reste le geste le plus
        efficace.
      </>
    ),
  },
  {
    title: "Déchets électroniques exponentiels",
    icon: Trash2,
    color: "orange",
    severity: "Critique",
    stats: (
      <>
        ~70 Mt d&apos;e-déchets en 2025 (
        <Acronym
          title="Global E-waste Monitor : rapport mondial sur les e-déchets, publié par l'UNITAR et l'UIT (édition 2024)"
          glossary="gem"
        >
          GEM
        </Acronym>{" "}
        2024)
      </>
    ),
    description:
      "La production mondiale de déchets électroniques augmente environ 5 fois plus vite que le recyclage : 62 Mt en 2022, environ 69-70 Mt en 2025, 82 Mt projetées en 2030 (+2,6 Mt/an). Seuls 22,3 % ont été collectés et recyclés en 2022, et la trajectoire actuelle ne mènerait qu'à ~20 % en 2030 (Global E-waste Monitor 2024).",
    impacts: [
      "Pollution des sols et de l'eau par métaux lourds",
      "Incinération toxique dans les pays en développement",
      "Perte de ressources précieuses non récupérées",
      "Accumulation dans les décharges sauvages",
    ],
    data2025:
      "En France, chaque habitant produit environ 24 kg de déchets électroniques par an, mais moins de la moitié sont collectés (~46 %, Eurostat 2024).",
  },
  {
    title: "Consommation énergétique croissante",
    icon: Zap,
    color: "amber",
    severity: "Élevé",
    stats: "3,4 % des émissions mondiales de GES",
    description:
      "Le numérique génère 1,8 Gt CO₂e, soit 3,4 % des émissions mondiales (GreenIT, EENM 2025) ; les datacenters seuls ont consommé environ 415 TWh en 2024, soit 1,5 % de l'électricité mondiale (AIE, Energy and AI, avril 2025). Datacenters, réseaux et équipements utilisateurs en sont les principaux postes.",
    impacts: [
      "Émissions de CO₂ en constante augmentation",
      "Stress sur les réseaux électriques",
      "Dépendance aux énergies fossiles",
      "Effet rebond : l'efficacité énergétique est annulée par l'augmentation des usages",
    ],
    data2025: (
      <>
        Les datacenters représentent 1,5 % de la consommation électrique mondiale (
        <Acronym title="Agence Internationale de l'Énergie (IEA en anglais)" glossary="aie">
          AIE
        </Acronym>
        , 2024). La France en compte de l&apos;ordre de 250, dont une vingtaine de grande taille (France
        Datacenter).
      </>
    ),
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
    stats: (
      <>
        Export illégal réel mais minoritaire (
        <Acronym
          title="Global E-waste Monitor : rapport mondial sur les e-déchets, publié par l'UNITAR et l'UIT (édition 2024)"
          glossary="gem"
        >
          GEM
        </Acronym>{" "}
        2024)
      </>
    ),
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
    data: "Indice de réparabilité obligatoire en France depuis 2021 ; indice de durabilité depuis 2025 (TV, lave-linge) ; l'UE impose l'étiquette énergie sur les smartphones depuis juin 2025 (règlement 2023/1669)",
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
        description: "Indice de réparabilité, pièces détachées 7 ans pour les smartphones (UE, 2023/1670), bonus réparation",
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
        description: "Google, Microsoft, OVH : 100 % renouvelable, PPA (Power Purchase Agreements)",
        adoption: "Élevée",
      },
      {
        name: "Refroidissement innovant",
        description: "Free cooling, immersion liquide, récupération de chaleur",
        adoption: "Moyenne",
      },
      {
        name: "IA pour l'optimisation",
        description: "DeepMind (Google) : réduction de 40 % de la consommation de refroidissement (Google, 2016)",
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
        description: "Note /10 obligatoire en France depuis 2021 ; indice de durabilité depuis 2025 (TV, lave-linge) ; étiquette énergie UE sur les smartphones depuis juin 2025 (règlement 2023/1669)",
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
    category: "Efficacité immédiate",
    icon: Cpu,
    color: "cyan",
    timeframe: "2026-2028",
    solutions: [
      {
        name: "IA frugale et inférence efficace",
        description: (
          <>
            Modèles Mixture-of-Experts qui n&apos;activent qu&apos;une fraction de leurs paramètres, quantification
            FP8/INT4, distillation vers des petits modèles spécialisés, exécution locale quand le cloud est inutile
            et ordonnanceurs carbon-aware qui déplacent les jobs non urgents vers les heures et zones à électricité
            décarbonée.
            L&apos;inférence représente jusqu&apos;à 90 % de l&apos;énergie sur le cycle de vie d&apos;un modèle
            <SourceTooltip
              className="ml-1"
              source="How Hungry is AI?, 2025"
              calculation="inférence jusqu'à ~90 % de l'énergie vie entière (entraînement ponctuel, inférence continue)"
            />
            , et les gains combinés peuvent diviser l&apos;énergie par 8 à 20
            <SourceTooltip
              className="ml-1"
              source="Microsoft Research, Joule, avril 2026"
              calculation="modèles + serving + matériel : efficacité par requête ÷8 à ÷20"
              url="https://www.microsoft.com/en-us/research/publication/energy-use-of-ai-inference-efficiency-pathways-and-test-time-scaling"
            />
            .
          </>
        ),
        potential: "Très élevé",
        challenges: "Qualité contre sobriété, envol des usages agentiques et de raisonnement (×13 par requête)",
      },
      {
        name: "Refroidissement liquide généralisé",
        description: (
          <>
            Direct-to-chip et immersion : PUE de 1,02 à 1,1 contre 1,8 à 2,5 pour l&apos;air (fourchettes de la
            page Datacenters). Les installations neuves doivent viser 1,2 ou moins quand le PUE moyen français
            reste de 1,7 (2024)
            <SourceTooltip
              className="ml-1"
              source="ADEME, 2024-2026"
              calculation="PUE moyen France 1,7 en 2024 contre 1,8 en 2016, objectif 1,2 pour le neuf"
              url="https://solutions.acciona-energia.fr/blog/consommation-energie-des-data-centers"
            />
            et les progrès restent lents à cause du parc existant
            <SourceTooltip
              className="ml-1"
              source="Uptime Institute, Global Data Center Survey 2026"
              calculation="PUE en progrès lent : parc ancien conservé, climats chauds, +21 % d'inférence comme moteur de racks denses"
              url="https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2026"
            />
            . Enjeu jumeau : ne pas échanger des kWh contre des litres d&apos;eau.
          </>
        ),
        potential: "Très élevé",
        challenges: "Rénovation du parc existant, arbitrage eau-énergie (WUE)",
      },
      {
        name: "Serveurs sobres : ARM et chiplets",
        description: (
          <>
            Neoverse N2 : +40 % de performance à puissance égale par rapport au N1 (Arm, 2020), N3 : +20 % de
            performance par watt de plus, architectures ARM et RISC-V ; chiplets 2 nm démontrés dès 2023 avec TSMC
            <SourceTooltip
              className="ml-1"
              source="Arm, 2020-2023"
              calculation="N2 +40 % IPC à même puissance, N3 +20 % perf/watt, démonstrateur chiplet 2 nm Socionext-Arm-TSMC 2023"
              url="https://www.arm.com/products/silicon-ip-cpu/neoverse/neoverse-n2"
            />
            . Même service pour nettement moins de watts, avec des DPU qui déchargent réseau et stockage du CPU.
          </>
        ),
        potential: "Très élevé",
        challenges: "Compatibilité logicielle, coûts de R&D",
      },
      {
        name: "Écoconception logicielle mesurée",
        description: (
          <>
            Méthode SCI (Software Carbon Intensity), norme ISO 21031:2024 : un score de carbone par unité
            fonctionnelle, sans compensation possible
            <SourceTooltip
              className="ml-1"
              source="Green Software Foundation, ISO/IEC 21031:2024"
              calculation="SCI = ((E × I) + M) par R : énergie, intensité carbone, embarqué, par unité fonctionnelle"
              url="https://greensoftware.foundation/standards/sci"
            />
            . 7 outils open source côté Boavizta (BoaviztAPI, CloudScanner, e-footprint). Langages et runtimes
            efficaces (Rust, Go, WASM), serverless avec extinction à zéro, cache agressif : le logiciel sobre
            allonge aussi la durée de vie du matériel.
          </>
        ),
        potential: "Élevé",
        challenges: "Adoption par les équipes, mesure systématique",
      },
      {
        name: "Alimentation HVDC et électronique GaN",
        description: (
          <>
            Passage au 800 V continu jusqu&apos;au rack (avec ±400 V) : moins de conversions, câbles plus fins, racks
            de 1 MW et plus. Déploiements dès 2027 (Vertiv, 2026), architecture 800 V NVIDIA (2025), alimentations à
            98 % de rendement
            <SourceTooltip
              className="ml-1"
              source="Vertiv, 2026 ; NVIDIA et Navitas, 2025"
              calculation="sidecars 800 V dès 2027, racks 1 MW+, alim 8,5 kW à 98 %"
              url="https://www.vertiv.com/fr-ca/insights/articles/blog-posts/from-rack-to-data-hall-the-practical-path-to-800-vdc/"
            />
            . Le nitrure de gallium (GaN) et le carbure de silicium (SiC) réduisent les pertes à chaque conversion.
          </>
        ),
        potential: "Élevé",
        challenges: "Standardisation, renouvellement des salles",
      },
      {
        name: "Chaleur fatale, désormais obligatoire",
        description: (
          <>
            À Saint-Denis, le datacenter Equinix (6,6 MW à 28 °C) chauffe la ZAC Saulnier et le Centre Aquatique
            Olympique depuis juin 2024 (10 800 MWh visés)
            <SourceTooltip
              className="ml-1"
              source="ENGIE Solutions, Equinix et SMIREC, 2024"
              calculation="6,6 MW récupérés à 28 °C via pompes à chaleur, 10 800 MWh/an visés"
              url="https://www.engie-solutions.com/fr/references/chaleur-fatale-equinix"
            />
            . Depuis octobre 2025, la loi DDADUE impose la valorisation au-delà de 1 MW. Potentiel national : 4 à
            13 TWh en 2035
            <SourceTooltip
              className="ml-1"
              source="ADEME, prospective datacenters 2024-2060, janvier 2026"
              calculation="4 à 13 TWh de chaleur fatale valorisable en 2035 selon les 5 trajectoires"
              url="https://infos.ademe.fr/industrie-production-durable/2026/consommation-electrique-des-data-centers-5-scenarios-pour-demain"
            />
            .
          </>
        ),
        potential: "Élevé",
        challenges: "Proximité d'un réseau de chaleur, investissements",
      },
    ],
  },
  {
    category: "Industrialisation en cours",
    icon: Building2,
    color: "violet",
    timeframe: "2028-2032",
    solutions: [
      {
        name: "Interconnects optiques (CPO)",
        description: (
          <>
            Optique co-packagée avec la puce : 5 W pour 800 Gb/s, soit 60 à 70 % de moins que les modules classiques
            (Broadcom, 2025).             Commutateurs 51,2 Tb/s déjà en production, 102,4 Tb/s annoncés, marché CPO et optiques proches
            estimé à 39 Md$ en 2030 (TrendForce)
            <SourceTooltip
              className="ml-1"
              source="Broadcom, 2025-2026"
              calculation="5 W/800G mesurés sur Bailly 51,2T, -60 à -70 % contre transceivers DSP"
              url="https://www.broadcom.com/info/optics/cpo"
            />
            .
          </>
        ),
        potential: "Élevé",
        challenges: "Industrialisation, interopérabilité",
      },
      {
        name: "Mémoires sobres et stockage froid",
        description: (
          <>
            MRAM : persistance sans alimentation ni rafraîchissement (Everspin). Verre : 10 000 ans de durée
            démontrée (Microsoft Silica, Nature, 2026)
            <SourceTooltip
              className="ml-1"
              source="Microsoft Research, Nature, février 2026"
              calculation="verre borosilicate courant, 4,84 To par dalle, zéro énergie au repos"
              url="https://www.microsoft.com/en-us/research/blog/project-silicas-advances-in-glass-storage-technology"
            />
            . Bande magnétique et ADN synthétique pour les archives froides : zéro énergie au repos. Déplacer les
            données coûte bien plus cher que calculer : la mémoire sobre, c&apos;est du calcul sobre.
          </>
        ),
        potential: "Élevé",
        challenges: "Densités, coûts, vitesses d'écriture",
      },
      {
        name: "Production sur site et micro-réseaux",
        description: (
          <>
            Micro-datacenters sans eau adossés aux parcs solaires et éoliens : conteneurs de 16 m² opérationnels en
            quelques mois (PoliCloud, 2026, 280 unités en Europe)
            <SourceTooltip
              className="ml-1"
              source="PoliCloud et 20 Minutes, juin 2026"
              calculation="16 m², sans eau, <5 mois, 35 MW et 29 000 GPU pour 280 unités"
              url="https://policloud.com/"
            />
            . Batteries : 20 à 25 GW installés en datacenters en 2030 (AIE, 2026). En France, RTE présélectionne
            5 sites à 700 MW-1 GW en raccordement accéléré
            <SourceTooltip
              className="ml-1"
              source="RTE, 2026"
              calculation="~18 GW réservés en mai 2026 contre 5 GW fin 2024, 5 sites fast-track, Fouju 240 MW → 1 400 MW"
              url="https://www.les-energies-renouvelables.eu/article/actualites/energies/datacenters-ia-electrification-france-rte-856/"
            />
            .
          </>
        ),
        potential: "Élevé",
        challenges: "Foncier, files d'attente de raccordement",
      },
      {
        name: "Stockage longue durée",
        description: (
          <>
            Fer-air : 100 heures de décharge à moins d&apos;un dixième du coût du lithium, avec 30 GWh pour un
            datacenter Google et 12 GWh pour Crusoe (annoncés en 2026 ; livraisons Crusoe dès 2027)
            <SourceTooltip
              className="ml-1"
              source="Form Energy, 2026"
              calculation="100 h à coût système <1/10 du lithium, 300 MW/30 GWh Google Minnesota, 12 GWh Crusoe"
              url="https://formenergy.com/about/"
            />
            . Sodium-ion sans lithium ni cobalt pour le stationnaire (IRENA, 2025), supercondensateurs pour les
            à-coups de puissance des charges IA. Indispensable au 24/7 renouvelable sans crédits carbone douteux.
          </>
        ),
        potential: "Élevé",
        challenges: "Rendement aller-retour, volumes industriels",
      },
      {
        name: "Réseaux nativement sobres",
        description:
          "Fibre et PON, SDN qui éteint les liens inutilisés, 5G Advanced puis 6G avec mise en veille native. Plus efficaces par bit transmis, mais l'explosion du trafic peut annuler les gains : l'effet rebond se pilote (Arcep, 2024).",
        potential: "Moyen",
        challenges: "Standardisation, effet rebond",
      },
    ],
  },
  {
    category: "Ruptures technologiques",
    icon: Lightbulb,
    color: "indigo",
    timeframe: "2032 et au-delà",
    solutions: [
      {
        name: "Calcul photonique",
        description: (
          <>
            Calculer avec la lumière : 160 TOPS/W démontrés sur puce (Taichi, Tsinghua, Science, 2024), jusqu&apos;à
            100 fois l&apos;efficacité des puces IA actuelles
            <SourceTooltip
              className="ml-1"
              source="Tsinghua, Science, avril 2024"
              calculation="160 TOPS/W sur puce, +2 ordres de grandeur contre puces IA"
              url="https://doi.org/10.1126/science.adl1203"
            />
            . D&apos;abord les interconnects, ensuite l&apos;inférence.
          </>
        ),
        potential: "Moyen",
        challenges: "Industrialisation, précision, coûts",
      },
      {
        name: "Neuromorphique et calcul en mémoire",
        description: (
          <>
            Puces à impulsions comme le cerveau : plus de 15 TOPS/W et 100 fois moins d&apos;énergie que GPU sur
            vision et optimisation (Hala Point, Intel, 2024)
            <SourceTooltip
              className="ml-1"
              source="Intel, Hala Point, avril 2024"
              calculation="20 pétaops, >15 TOPS/W, 100× moins d'énergie et 50× plus rapide que CPU/GPU sur inférence et optimisation"
              url="https://www.intel.com/content/www/us/en/newsroom/news/intel-builds-worlds-largest-neuromorphic-system.html"
            />
            ; 120 TOPS/W en analogique
            <SourceTooltip
              className="ml-1"
              source="Mythic et Microchip, mars 2026"
              calculation="120 TOPS/W en inférence analogique en mémoire, ~100× un GPU classique"
            />
            . Idéal pour l&apos;edge et la robotique, en évitant les
            allers-retours entre mémoire et calcul, bien plus coûteux que l&apos;opération elle-même.
          </>
        ),
        potential: "Moyen",
        challenges: "Programmation, périmètre de cas d'usage",
      },
      {
        name: "Spintronique et calcul probabiliste",
        description: (
          <>
            Le spin de l&apos;électron plutôt que sa charge : logique MESO 10 à 100 fois plus efficace que le CMOS
            (Intel et Berkeley, Nature, 2019), encore au stade laboratoire
            <SourceTooltip
              className="ml-1"
              source="Intel et UC Berkeley, Nature, 2019"
              calculation="10 à 100× l'efficacité du CMOS, 5× la densité logique, commutation à ~100 mV visée"
            />
            ; bits probabilistes à 2 fJ par tirage et machine à un million de p-bits (2026)
            <SourceTooltip
              className="ml-1"
              source="Purdue et UC Santa Barbara, 2023-2026"
              calculation="p-bits spintroniques ~2 fJ/bit, machine programmable à 1 M de p-bits en juin 2026"
              url="https://arxiv.org/abs/2606.25313"
            />
            . Une voie d&apos;accélération sans cryogénie.
          </>
        ),
        potential: "Moyen",
        challenges: "Matériaux, endurance, passage à l'échelle",
      },
      {
        name: "SMR co-localisés",
        description: (
          <>
            Petits réacteurs à côté des datacenters : Natrium 345 MW, permis en mars 2026 et chantier ouvert en
            avril pour 2030 (TerraPower)
            <SourceTooltip
              className="ml-1"
              source="NRC et TerraPower, 2026"
              calculation="345 MW sodium + sels fondus → 500 MW en pointe, 1er permis commercial avancé depuis 40 ans"
              url="https://www.terrapower.com/NRC-Approves-Natrium-Reactor-Construction-Permit"
            />
            ; démo Aalo-Crusoe de 50 MWe en 2027, flotte en 2029
            <SourceTooltip
              className="ml-1"
              source="Aalo Atomics et Crusoe, juillet 2026"
              calculation="Aalo-X 10 MWe → Pod 50 MWe (5×10), sodium et air sans eau externe, criticité juillet 2026"
              url="https://www.aalo.com/post/crusoe-and-aalo-atomics-form-strategic-partnership"
            />
            . Horizon réaliste : 2030-2034 ; en attendant, gaz et batteries (AIE).
          </>
        ),
        potential: "Moyen",
        challenges: "Licences, délais, acceptabilité",
      },
      {
        name: "Informatique quantique ciblée",
        description:
          "L'avantage reste théorique et dépend des cas d'usage (refroidissement cryogénique). Mais l'hybridation commence : ordinateur quantique supraconducteur intégré à une usine IA européenne (LUMI-IQ, EuroHPC, 2027-2029, tolérance aux fautes visée en 2030).",
        potential: "Moyen",
        challenges: "Correction d'erreurs, cas d'usage sobres",
      },
    ],
  },
  {
    category: "Modèles économiques",
    icon: Users,
    color: "teal",
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
        description: "Garantie prolongée de 12 mois après réparation (directive UE 2024/1799), obligation de réparabilité",
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
  const chart = useChartTheme()
  const carbonColors = [chart.red, chart.amber, chart.emerald]
  return (
    <div data-theme="red" className="min-h-screen bg-background transition-colors duration-300">
      <ReadingProgress />
      <PageHero
        theme="red"
        image={{ src: "/greenit/images/hero-problematiques.webp", alt: "Smartphone fissuré déversant des déchets électroniques sur une planète fragile" }}
        badge={{ icon: AlertTriangle, label: "Problématiques & Solutions" }}
        title="Les défis du numérique et les solutions pour y répondre"
        intro="Comprendre les problématiques environnementales du numérique, analyser les tendances actuelles, et découvrir les solutions existantes et à développer pour un avenir durable."
      />

      <SectionDivider />

      {/* E-Waste Growth Chart */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            L'explosion des déchets électroniques
          </h2>
          <Card className="border-2 border-border bg-white dark:bg-slate-900 p-8 lg:p-12">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={eWasteGrowthData}>
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
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={chart.red}
                  strokeWidth={3}
                  name="E-déchets (Mt)"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              <strong>+56 % en 10 ans</strong> - 62 Mt en 2022, environ 69-70 Mt en 2025, 82 Mt projetées en 2030
              (+2,6 Mt/an, Global E-waste Monitor 2024).
            </p>
          </Card>
        </div>
      </section>

      {/* Main Problems */}
      <Reveal as="section" className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Les 6 problématiques majeures
          </h2>
          <div className="space-y-8">
            {mainProblems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <Card key={index} className={`border-2 border-${problem.color}-500 bg-background p-8`}>
                  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-${problem.color}-600`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-foreground">{problem.title}</h3>
                        <p className="text-sm text-muted-foreground">{problem.description}</p>
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-col items-end gap-2">
                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold ${problem.severity === "Critique" ? "bg-red-700 text-white" : "bg-orange-700 text-white"
                          }`}
                      >
                        {problem.severity}
                      </span>
                      <span className={`text-2xl font-bold text-${problem.color}-700 dark:text-${problem.color}-400`}>{problem.stats}</span>
                    </div>
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-foreground">Impacts environnementaux et sociaux</h4>
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
                      <h4 className="mb-3 font-semibold text-foreground">Données 2025</h4>
                      <p className="rounded-lg bg-secondary/30 p-4 text-sm text-slate-700 dark:text-slate-300">{problem.data2025}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Carbon Footprint Breakdown */}
      <Reveal as="section" className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Répartition de l'empreinte carbone du numérique
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 border-border bg-white dark:bg-slate-900 p-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={carbonBySectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ sector, percentage }) => `${sector}: ${percentage}%`}
                    outerRadius={100}
                    fill={chart.violet}
                    dataKey="percentage"
                  >
                    {carbonBySectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={carbonColors[index % carbonColors.length]} />
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
                    <h3 className="font-bold text-foreground">Équipements utilisateurs</h3>
                  </div>
                  <span className="text-2xl font-bold text-red-700 dark:text-red-400">
                    79 %
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
                    <h3 className="font-bold text-foreground">Datacenters</h3>
                  </div>
                  <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                    16 %
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
                    <h3 className="font-bold text-foreground">Réseaux</h3>
                  </div>
                  <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    5 %
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
      </Reveal>

      {/* Device Lifespan Trends */}
      <Reveal as="section" className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            L'obsolescence accélérée des appareils
          </h2>
          <Card className="border-2 border-border bg-background p-8 lg:p-12">
            <p className="text-center text-base text-slate-700 dark:text-slate-300">
              <strong>62 % des appareils sont renouvelés alors qu'ils fonctionnent encore, et 100 millions dorment dans les tiroirs (ADEME 2026)</strong> - On change de smartphone tous les 3 ans en moyenne. Les mises à jour logicielles et le manque de réparabilité accélèrent ce renouvellement : garder ses appareils plus longtemps et les réparer reste le premier levier.
            </p>
          </Card>
        </div>
      </Reveal>

      {/* Current Trends */}
      <Reveal as="section" className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">Tendances actuelles 2025</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentTrends.map((trend, index) => {
              const Icon = trend.icon
              const impactColor = trend.impact === "Positif" ? "emerald" : trend.impact === "Négatif" ? "red" : "amber"
              return (
                <Card key={index} className={`border-2 border-${impactColor}-500 bg-${impactColor}-50 dark:bg-${impactColor}-900/20 dark:border-${impactColor}-700 p-6 lift`}>
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${impactColor}-600`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${trend.impact === "Positif"
                        ? "bg-emerald-700 text-white"
                        : trend.impact === "Négatif"
                          ? "bg-red-600 text-white"
                          : "bg-amber-700 text-white"
                        }`}
                    >
                      {trend.impact}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">{trend.title}</h3>
                  <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">{trend.description}</p>
                  <div className="rounded-lg bg-white dark:bg-slate-900 p-3">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">{trend.data}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Current Solutions */}
      <Reveal as="section" className="bg-secondary/30 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Solutions actuelles déployées
          </h2>
          <div className="space-y-8">
            {currentSolutions.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className={`border-2 border-${category.color}-500 bg-background p-8`}>
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-${category.color}-600`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{category.category}</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    {category.solutions.map((solution, idx) => (
                      <div key={idx} className="rounded-lg border-2 border-border bg-secondary/30 p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <h4 className="font-semibold text-foreground">{solution.name}</h4>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${solution.adoption === "Élevée"
                              ? "bg-emerald-700 text-white"
                              : solution.adoption === "Moyenne"
                                ? "bg-amber-700 text-white"
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
      </Reveal>

      {/* Recycling Rates */}
      <Reveal as="section" className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 break-words text-center text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Taux de collecte des déchets électroniques en Europe (Eurostat/Ecosystem, 2024)
          </h2>
          <Card className="border-2 border-border bg-background p-8 lg:p-12">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={recyclingRatesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis type="number" domain={[0, 100]} stroke={chart.tick} />
                <YAxis dataKey="country" type="category" stroke={chart.tick} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)"
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="rate" fill={chart.emerald} radius={[0, 8, 8, 0]} name="Taux de recyclage (%)" />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              La France collecte environ 46 % de ses déchets électroniques, en progrès mais encore loin des leaders
              nordiques. Objectif européen : 65 % de collecte (directive <Acronym title="Déchets d'Équipements Électriques et Électroniques : appareils en fin de vie fonctionnant à l'électricité ou avec piles/batteries" glossary="deee">DEEE</Acronym>).
            </p>
          </Card>
        </div>
      </Reveal>

      {/* Future Solutions */}
      <Reveal as="section" className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Solutions à développer pour l'avenir
          </h2>
          <div className="space-y-8">
            {futureSolutions.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className={`border-2 border-${category.color}-500 bg-background p-8`}>
                  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-${category.color}-600`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{category.category}</h3>
                        <p className="text-sm text-muted-foreground">Horizon : {category.timeframe}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.solutions.map((solution, idx) => (
                      <div key={idx} className="rounded-lg border-2 border-border bg-secondary/30 p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <h4 className="font-semibold text-foreground">{solution.name}</h4>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${solution.potential === "Très élevé"
                              ? "bg-emerald-700 text-white"
                              : solution.potential === "Élevé"
                                ? "bg-teal-700 text-white"
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
      </Reveal>

      {/* Key Messages */}
      <Reveal as="section" className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">Messages clés</h2>
          <div className="space-y-6">
            <Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Le problème principal : la fabrication</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    79 % de l'impact vient des équipements utilisateurs (France, ADEME-Arcep 2023). Allonger la durée de vie de nos appareils est
                    l'action la plus efficace.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-700 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-teal-700 dark:text-teal-400" />
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Des solutions existent déjà</h3>
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
                  <h3 className="mb-2 font-semibold text-foreground">L'innovation ne suffit pas</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Les technologies sobres (IA frugale, photonique, chaleur fatale) sont prometteuses mais la
                    sobriété numérique reste indispensable : les datacenters sont passés de 415 TWh en 2024 et
                    pourraient dépasser 945 TWh en 2030
                    <SourceTooltip
                      className="ml-1"
                      source="AIE, Energy and AI, avril 2025"
                      calculation="415 TWh (1,5 % de l'électricité mondiale) en 2024 → ~945 TWh en 2030, scénario de base"
                      url="https://www.iea.org/reports/energy-and-ai"
                    />
                    . Sans sobriété d&apos;usage et allongement de la durée de vie des serveurs — dont la fabrication
                    concentre l&apos;essentiel de l&apos;empreinte — la tech seule ne décarbone pas (effet rebond).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-purple-700 dark:text-purple-400" />
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Agir à tous les niveaux</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Citoyens, entreprises, collectivités, législateurs : chacun a un rôle à jouer pour transformer le
                    numérique.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Reveal>

      {/* CTA Section */}
      <Reveal as="section" className="texture-dots bg-gradient-to-br from-emerald-700 to-teal-800 px-6 py-16 lg:py-24">
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
      </Reveal>

      {/* Sources */}
      <section className="border-t border-border bg-slate-50 dark:bg-slate-950 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Sources</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a
              href="https://ewastemonitor.info/the-global-e-waste-monitor-2024/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Global E-Waste Monitor 2024 (ONU)
            </a>
            <span>•</span>
            <a
              href="https://www.iea.org/reports/critical-minerals-market-review-2023"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              AIE - Critical Minerals Market Review 2023
            </a>
            <span>•</span>
            <span>Epoch AI, Altman, Google, Joule - mesures IA 2025-2026</span>
            <span>•</span>
            <span>Kamiya - streaming SD ~0,7 Go/h</span>
            <span>•</span>
            <span>UE - 5 ans de mises à jour, 7 ans de pièces (règlement 2023/1670)</span>
            <span>•</span>
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
              href="https://www.greenit.fr/etude-empreinte-environnementale-du-numerique-mondial/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GreenIT.fr - Empreinte environnementale du numérique mondial (2025)
            </a>
            <span>•</span>
            <span>The Shift Project - Lean ICT (2024)</span>
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
              href="https://www.rte-france.com/bases-electricite/consommation-electricite/essor-data-centers-france"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              RTE - Les datacenters en chiffres clés (2026)
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
              href="https://greensoftware.foundation/standards/sci"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Green Software Foundation - SCI, ISO 21031:2024
            </a>
            <span>•</span>
            <a
              href="https://boavizta.org/en/tools"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Boavizta - Outils de mesure open source
            </a>
            <span>•</span>
            <a
              href="https://www.arm.com/products/silicon-ip-cpu/neoverse/neoverse-n2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Arm - Neoverse (2020-2023)
            </a>
            <span>•</span>
            <a
              href="https://www.vertiv.com/fr-ca/insights/articles/blog-posts/from-rack-to-data-hall-the-practical-path-to-800-vdc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Vertiv - 800 VDC (2026)
            </a>
            <span>•</span>
            <a
              href="https://www.broadcom.com/info/optics/cpo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Broadcom - Co-Packaged Optics
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
            <span>•</span>
            <a
              href="https://policloud.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              PoliCloud - Micro-datacenters (2026)
            </a>
            <span>•</span>
            <a
              href="https://formenergy.com/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Form Energy - Batteries fer-air
            </a>
            <span>•</span>
            <a
              href="https://www.terrapower.com/NRC-Approves-Natrium-Reactor-Construction-Permit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              TerraPower - Permis NRC Natrium (2026)
            </a>
            <span>•</span>
            <a
              href="https://www.aalo.com/post/crusoe-and-aalo-atomics-form-strategic-partnership"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Aalo et Crusoe - Partenariat (2026)
            </a>
            <span>•</span>
            <a
              href="https://doi.org/10.1126/science.adl1203"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Taichi photonique, Science (2024)
            </a>
            <span>•</span>
            <a
              href="https://www.microsoft.com/en-us/research/blog/project-silicas-advances-in-glass-storage-technology"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Microsoft - Project Silica, Nature (2026)
            </a>
            <span>•</span>
            <a
              href="https://www.microsoft.com/en-us/research/publication/energy-use-of-ai-inference-efficiency-pathways-and-test-time-scaling"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Microsoft Research - Énergie de l&apos;inférence IA, Joule (2026)
            </a>
            <span>•</span>
            <span>Loi DDADUE n° 2025-391 du 30/04/2025 (chaleur fatale ≥ 1 MW depuis le 01/10/2025)</span>
            <span>•</span>
            <span>Intel et UC Berkeley, logique MESO, Nature (2019) ; Intel Hala Point (2024) ; Mythic (2026)</span>
            <span>•</span>
            <span>IQM et EuroHPC, LUMI-IQ hybride HPC-IA-quantique (2026)</span>
            <span>•</span>
            <a
              href="https://www.iea.org/reports/energy-efficiency-2024"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              IEA - Energy Efficiency 2024
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

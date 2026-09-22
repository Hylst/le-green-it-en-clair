"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Lightbulb, TrendingUp, Database, Smartphone, Recycle, Zap, Gamepad2 } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SectionDivider } from "@/components/section-divider"
import Link from "next/link"

interface Myth {
  id: string
  category: string
  icon: React.ReactNode
  myth: string
  reality: string
  explanation: string
  source: string
  relatedLink?: { label: string; href: string }
}

export default function MythesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [revealedMyths, setRevealedMyths] = useState<Set<string>>(new Set())

  const myths: Myth[] = [
    {
      id: "1",
      category: "Usage",
      icon: <Smartphone className="h-5 w-5" />,
      myth: "Le cloud ne pollue pas, c'est virtuel",
      reality: "Faux - Le cloud repose sur des infrastructures physiques très énergivores",
      explanation:
        "Le cloud n'est pas immatériel : il s'appuie sur des datacenters qui consomment de l'électricité pour fonctionner et se refroidir. Bonne nouvelle : stocker des fichiers pèse très peu. Stocker 1 Go dans le cloud pendant un an émet environ 0,24 g de CO₂e (ADEME, Impact CO₂ / Base Empreinte). Le geste qui compte vraiment, c'est de garder vos appareils le plus longtemps possible : fabriquer un smartphone représente environ 80 kg de CO₂e sur son cycle de vie, soit bien plus que des années de stockage de photos. Le stockage pèse très peu : le levier qui compte reste la durée de vie des appareils.",
      source: "ADEME, Impact CO₂ / Base Empreinte",
      relatedLink: { label: "En savoir plus sur les datacenters", href: "/datacenters" },
    },
    {
      id: "2",
      category: "Usage",
      icon: <Zap className="h-5 w-5" />,
      myth: "La phase d'utilisation est la plus polluante",
      reality: "Faux - La fabrication concentre l'essentiel de l'impact (≈75 % tous indicateurs, ≈99 % du carbone)",
      explanation:
        "Contrairement à l'idée reçue, l'utilisation d'un smartphone ne représente qu'environ 20 % de son impact tous indicateurs (et ~1 % de son empreinte carbone). La fabrication (extraction des minerais, assemblage, transport) compte pour ~75 % des impacts tous indicateurs et ~99 % du carbone (ADEME-Arcep 2023 ; ADEME, Impact CO₂ 2025). C'est pourquoi garder son appareil le plus longtemps possible est le geste le plus efficace.",
      source: "ADEME-Arcep 2023 ; ADEME, Impact CO₂ 2025",
      relatedLink: { label: "Découvrir le cycle de vie", href: "/comprendre" },
    },
    {
      id: "3",
      category: "Recyclage",
      icon: <Recycle className="h-5 w-5" />,
      myth: "Recycler suffit à résoudre le problème",
      reality: "Faux - Seuls 22 % des déchets électroniques ont été collectés et recyclés en 2022",
      explanation:
        "En 2022, 22,3 % des déchets électroniques ont été documentés comme collectés et recyclés à l'échelle mondiale (Global E-waste Monitor 2024). En France, il atteignait 44,2 % en 2023 (Eurostat), loin de l'objectif européen de 65 %. De plus, le recyclage lui-même consomme de l'énergie et ne permet pas de récupérer tous les matériaux. La priorité doit être donnée à la réduction, la réparation et la réutilisation.",
      source: "Global E-waste Monitor 2024, Eurostat 2023",
      relatedLink: { label: "Explorer le recyclage", href: "/recyclage" },
    },
    {
      id: "4",
      category: "Équipement",
      icon: <TrendingUp className="h-5 w-5" />,
      myth: "Les nouveaux appareils sont plus écologiques",
      reality: "Nuancé - Ils sont plus efficaces, mais leur fabrication pollue davantage",
      explanation:
        "Les appareils récents sont effectivement plus économes en énergie à l'usage (processeurs plus efficients, meilleure gestion de la batterie). Cependant, ils utilisent des composants plus complexes et miniaturisés, nécessitant plus de ressources et d'énergie pour leur fabrication. Acheter un appareil neuf émet en moyenne environ 80 kg de CO₂e pour un smartphone (ADEME, Impact CO₂ 2025), contre une réduction de l'ordre de 75 à 90 % pour un appareil reconditionné (ADEME 2022).",
      source: "ADEME, Impact CO₂ 2025 ; ADEME 2022",
      relatedLink: { label: "Comparer neuf vs reconditionné", href: "/cas-pratiques" },
    },
    {
      id: "5",
      category: "Usage",
      icon: <Database className="h-5 w-5" />,
      myth: "Supprimer mes emails réduit significativement mon empreinte",
      reality: "Vrai mais l'impact est minime comparé à d'autres actions",
      explanation:
        "Oui, trier sa boîte mail aide à y voir plus clair. Mais côté climat, le stockage pèse très peu : compter environ 0,24 g de CO₂e par Go et par an (ADEME, Impact CO₂ / Base Empreinte). Garder votre smartphone un an de plus évite bien plus d'émissions que de nettoyer des années d'e-mails. Les actions à fort impact restent prioritaires.",
      source: "ADEME, Impact CO₂ / Base Empreinte",
      relatedLink: { label: "Découvrir les actions efficaces", href: "/agir" },
    },
    {
      id: "6",
      category: "Équipement",
      icon: <Smartphone className="h-5 w-5" />,
      myth: "Mon vieux téléphone consomme plus d'énergie qu'un neuf",
      reality: "Vrai pour l'usage, mais garder l'ancien reste plus écologique",
      explanation:
        "Un smartphone récent consomme un peu moins à l'usage, mais l'écart reste faible à l'échelle du cycle de vie : la fabrication pèse environ 99 % de l'empreinte carbone (ADEME, Impact CO₂ 2025). Il faudrait donc de longues années d'usage pour compenser un nouvel appareil. Conclusion : gardez votre ancien appareil tant qu'il fonctionne.",
      source: "ADEME, Impact CO₂ 2025",
      relatedLink: { label: "Calculer votre impact", href: "/outils" },
    },
    {
      id: "7",
      category: "Usage",
      icon: <Zap className="h-5 w-5" />,
      myth: "Le mode avion permet d'économiser beaucoup d'énergie",
      reality: "Vrai mais l'impact reste limité sur l'empreinte globale",
      explanation:
        "Le mode avion désactive les connexions sans fil (4G/5G, Wi-Fi, Bluetooth) et peut prolonger l'autonomie de la batterie. Mais à l'échelle de votre empreinte, l'économie reste limitée : le geste qui compte vraiment reste de garder votre appareil plus longtemps (ADEME 2026).",
      source: "ADEME 2026",
    },
    {
      id: "8",
      category: "Recyclage",
      icon: <Recycle className="h-5 w-5" />,
      myth: "Les appareils électroniques se dégradent naturellement",
      reality: "Faux - Ils contiennent des matériaux toxiques et non biodégradables",
      explanation:
        "Les équipements électroniques contiennent des métaux lourds (plomb, mercure, cadmium), des plastiques et des composés chimiques qui ne se dégradent pas naturellement. Abandonnés dans la nature, ils polluent les sols et les nappes phréatiques pendant des décennies. C'est pourquoi le recyclage dans des filières spécialisées est obligatoire.",
      source: "Ministère de la Transition écologique (consulté en 2026)",
      relatedLink: { label: "Trouver un point de collecte", href: "/recyclage" },
    },
    {
      id: "9",
      category: "Équipement",
      icon: <TrendingUp className="h-5 w-5" />,
      myth: "Les appareils Apple sont plus écologiques que les autres",
      reality: "Nuancé - Progrès sur le recyclage, mais l'obsolescence reste problématique",
      explanation:
        "Apple a fait des progrès sur les matériaux recyclés et les emballages. Cependant, la réparabilité reste limitée sur plusieurs modèles et le rythme des sorties annuelles pousse au renouvellement. Aucune marque n'est parfaite : l'essentiel est de garder l'appareil longtemps.",
      source: "iFixit (consulté en 2026)",
    },
    {
      id: "10",
      category: "Usage",
      icon: <Database className="h-5 w-5" />,
      myth: "Regarder des vidéos en streaming pollue énormément",
      reality: "Vrai - Mais l'impact dépend beaucoup de la qualité et du réseau",
      explanation:
        "Le streaming vidéo représente une part majeure du trafic internet mondial et consomme beaucoup d'énergie. Une heure de vidéo en HD émet de l'ordre de 50 à 100 g de CO₂ selon les hypothèses ; en 4K, plusieurs centaines de grammes. En définition standard, l'impact est bien plus faible. Astuce : privilégiez le Wi-Fi à la 4G/5G (environ 4 à 5 fois moins d'énergie en streaming) et réduisez la qualité quand le grand écran n'est pas nécessaire.",
      source: "Kamiya 2020, Shift 2019",
      relatedLink: { label: "Découvrir les bonnes pratiques", href: "/agir" },
    },
    {
      id: "11",
      category: "Développement",
      icon: <Lightbulb className="h-5 w-5" />,
      myth: "Le code n'a pas d'impact environnemental",
      reality: "Faux - Un code mal optimisé augmente la consommation d'énergie",
      explanation:
        "Le code inefficace (algorithmes non optimisés, requêtes multiples inutiles, médias lourds) augmente le temps de traitement des serveurs et la consommation des appareils. Un site web optimisé peut réduire fortement sa consommation énergétique. Les développeurs ont un rôle clé dans l'écoconception numérique.",
      source: "GreenIT.fr, RGESN (consultés en 2026)",
      relatedLink: { label: "Guide développeur", href: "/developpement" },
    },
    {
      id: "12",
      category: "Équipement",
      icon: <Smartphone className="h-5 w-5" />,
      myth: "Le reconditionnement est moins fiable que le neuf",
      reality: "Faux - Les appareils reconditionnés sont testés et garantis",
      explanation:
        "Un appareil reconditionné professionnel passe par de nombreux contrôles, remplace les pièces défectueuses et bénéficie de la garantie légale de conformité de 2 ans, comme le neuf. En France, le marché du reconditionné progresse et prouve sa fiabilité.",
      source: "Code de la consommation (garantie 2 ans), ADEME 2022",
      relatedLink: { label: "Comprendre le reconditionné", href: "/cas-pratiques" },
    },
    {
      id: "13",
      category: "Usage",
      icon: <Zap className="h-5 w-5" />,
      myth: "Rallumer une TV consomme plus que la laisser en veille",
      reality: "Faux - Même un démarrage gourmand coûte moins cher que 10 h de veille",
      explanation:
        "Pire cas mesuré : un grand OLED 65 pouces qui démarrerait 1 minute à pleine puissance (environ 150 à 200 W en HDR) consomme environ 3 Wh, moins que les environ 5 Wh de 10 h de veille à 0,5 W (Tom's Guide 2024, Capital 2024). Et en veille connectée (réveil vocal, casting), certains modèles montent à 2 W voire 5 à 14 W en laboratoire (DOE et Pacific Crest 2021) : désactiver ces fonctions rapporte plus que tout le débat extinction/veille.",
      source: "Tom's Guide 2024, Capital 2024, DOE/Pacific Crest 2021",
      relatedLink: { label: "Voir la FAQ sur l'extinction", href: "/faq" },
    },
    {
      id: "14",
      category: "Équipement",
      icon: <Smartphone className="h-5 w-5" />,
      myth: "Éteindre et rallumer use les appareils, mieux vaut laisser en veille",
      reality: "Nuancé - Aucune usure significative, sauf pour les imprimantes jet d'encre",
      explanation:
        "L'électronique moderne supporte très bien les cycles marche/arrêt. Une box en veille profonde consomme moins de 0,3 W (Orange et SoftAtHome 2022) et un PC éteint 0,27 W (ASUS 2022) : éteindre reste gagnant. Seule exception : l'imprimante jet d'encre, qui lance un cycle de nettoyage (donc consomme de l'encre) à chaque rallumage.",
      source: "Orange/SoftAtHome 2022, ASUS ErP 2022, Epson",
      relatedLink: { label: "Découvrir les actions efficaces", href: "/agir" },
    },
    {
      id: "15",
      category: "Usage",
      icon: <Gamepad2 className="h-5 w-5" />,
      myth: "Une console de jeu en veille ne consomme presque rien",
      reality: "Nuancé - Tout dépend du mode veille choisi",
      explanation:
        "En mode économie d'énergie, la console tombe à environ 0,5 W. En démarrage instantané (téléchargements et réveil vocal actifs), elle reste autour de 10 à 15 W, soit l'équivalent d'une ampoule LED allumée en permanence (Microsoft 2023). Le bon réflexe : activer le mode éco dans les réglages.",
      source: "Microsoft 2023",
      relatedLink: { label: "Découvrir les actions efficaces", href: "/agir" },
    },
    {
      id: "16",
      category: "Usage",
      icon: <Database className="h-5 w-5" />,
      myth: "Poser une question à une IA, c'est juste du texte, ça ne pèse rien",
      reality: "Nuancé - Une requête semble légère, mais des milliards de requêtes font une lourde facture",
      explanation:
        "Chaque réponse mobilise des serveurs à processeurs graphiques dans un datacenter, pour répondre comme pour entraîner les modèles. À l'échelle mondiale, la consommation d'électricité liée à l'IA croît rapidement (AIE, Energy and AI 2025). Le réflexe : utiliser l'IA à bon escient, sans culpabiliser pour un usage ponctuel.",
      source: "AIE, Energy and AI 2025",
      relatedLink: { label: "Comprendre les datacenters", href: "/datacenters" },
    },
    {
      id: "17",
      category: "Équipement",
      icon: <Smartphone className="h-5 w-5" />,
      myth: "La 5G est plus efficace, donc elle est forcément plus verte",
      reality: "Nuancé - Le réseau est plus efficace, mais les usages explosent",
      explanation:
        "Transmettre un gigaoctet en 5G demande moins d'énergie qu'en 4G. Mais les nouveaux usages et le renouvellement des mobiles qu'elle entraîne effacent une partie du gain : c'est l'effet rebond (Arcep 2022, ADEME-Arcep 2023). Comme souvent, c'est la durée de vie du téléphone qui pèse le plus.",
      source: "Arcep 2022, ADEME-Arcep 2023",
      relatedLink: { label: "Découvrir le cycle de vie", href: "/comprendre" },
    },
    {
      id: "18",
      category: "Usage",
      icon: <Zap className="h-5 w-5" />,
      myth: "Wi-Fi ou 4G, c'est pareil pour regarder une vidéo",
      reality: "Faux - Le Wi-Fi consomme environ 4 à 5 fois moins d'énergie",
      explanation:
        "Regarder une vidéo en 4G ou 5G mobilise les antennes du réseau mobile, bien plus gourmandes que votre box. Quand c'est possible, privilégiez le Wi-Fi et baissez la définition si le grand écran n'est pas nécessaire (Kamiya 2020, Shift 2019).",
      source: "Kamiya 2020, Shift 2019",
      relatedLink: { label: "Découvrir les bonnes pratiques", href: "/agir" },
    },
    {
      id: "19",
      category: "Recyclage",
      icon: <Recycle className="h-5 w-5" />,
      myth: "Jeter un petit appareil à la poubelle, ce n'est pas grave",
      reality: "Faux - C'est interdit, et il existe des reprises gratuites",
      explanation:
        "Un appareil électrique ne va jamais à la poubelle ni sur la voie publique : c'est interdit et passible d'amende (Service Public 2025). Bonne nouvelle, les solutions sont gratuites : reprise un pour un à l'achat, dépôt sans obligation d'achat dans les magasins de plus de 400 m², déchetteries et points de collecte près de chez vous.",
      source: "Service Public 2025",
      relatedLink: { label: "Explorer le recyclage", href: "/recyclage" },
    },
    {
      id: "20",
      category: "Recyclage",
      icon: <Recycle className="h-5 w-5" />,
      myth: "Trier ses e-déchets ne sert à rien, tout finit mélangé",
      reality: "Faux - Les filières existent et progressent, mais la collecte reste insuffisante",
      explanation:
        "En France, 44,2 % des e-déchets ont été collectés en 2023 (Eurostat), contre 37,5 % en moyenne dans l'UE, encore loin de l'objectif européen de 65 %. Les filières agréées récupèrent cuivre, or et terres rares : avec environ 62 milliards de dollars de matières perdues chaque année dans le monde (Global E-waste Monitor 2024), chaque appareil rapporté compte.",
      source: "Eurostat 2023, Global E-waste Monitor 2024",
      relatedLink: { label: "Explorer le recyclage", href: "/recyclage" },
    },
    {
      id: "21",
      category: "Recyclage",
      icon: <Recycle className="h-5 w-5" />,
      myth: "Donner son vieil appareil, c'est juste déplacer le problème",
      reality: "Nuancé - Le réemploi évite une fabrication neuve, via des structures sérieuses",
      explanation:
        "Un appareil réemployé, c'est une fabrication évitée : environ 80 kg de CO₂e pour un smartphone neuf (ADEME, Impact CO₂ 2025), contre 75 à 90 % d'émissions en moins pour du reconditionné (ADEME 2022). Confiez vos appareils à des structures qui diagnostiquent, réparent et garantissent (Emmaüs, Envie, ressourceries) : ce qui est réparable est revendu, le reste part en filière agréée.",
      source: "ADEME 2022, ADEME Impact CO₂ 2025",
      relatedLink: { label: "Comprendre le reconditionné", href: "/cas-pratiques" },
    },
    {
      id: "22",
      category: "Développement",
      icon: <Database className="h-5 w-5" />,
      myth: "Un site web, c'est immatériel, son poids ne compte pas",
      reality: "Faux - Une page médiane pèse plus de 2 Mo, et chaque octet voyage",
      explanation:
        "La page web médiane pèse environ 2,6 Mo sur ordinateur et 2,3 Mo sur mobile (HTTP Archive, Web Almanac 2024), et chaque octet transféré consomme de l'énergie sur le réseau, dans les datacenters et sur votre appareil. D'où l'éco-conception : images optimisées, scripts limités, pages sobres (RGESN 2024).",
      source: "HTTP Archive 2024, RGESN 2024",
      relatedLink: { label: "Guide développeur", href: "/developpement" },
    },
    {
      id: "23",
      category: "Développement",
      icon: <Lightbulb className="h-5 w-5" />,
      myth: "Choisir un hébergeur vert suffit à régler l'impact du numérique",
      reality: "Nuancé - L'efficacité progresse, mais la consommation totale explose",
      explanation:
        "Les datacenters deviennent plus efficaces, mais leur consommation mondiale atteignait 415 TWh en 2024 et pourrait doubler d'ici 2030, tirée par l'IA (AIE, Energy and AI 2025). Un hébergeur alimenté en électricité décarbonée, c'est bien ; des services sobres et utiles, c'est indispensable (RGESN 2024).",
      source: "AIE 2025, RGESN 2024",
      relatedLink: { label: "Comprendre les datacenters", href: "/datacenters" },
    },
    {
      id: "24",
      category: "Développement",
      icon: <Zap className="h-5 w-5" />,
      myth: "Mettre de l'IA partout, c'est toujours un progrès",
      reality: "Nuancé - Chaque fonctionnalité IA a un coût : elle doit répondre à un vrai besoin",
      explanation:
        "Avant de développer un service, la première question de l'éco-conception est sa raison d'être : une alternative non numérique est-elle préférable (RGESN 2024) ? Avec la croissance rapide de la demande d'électricité liée à l'IA (AIE, Energy and AI 2025), ajouter de l'IA par défaut, c'est consommer par défaut.",
      source: "RGESN 2024, AIE 2025",
      relatedLink: { label: "Guide développeur", href: "/developpement" },
    },
  ]

  const categories = ["all", "Usage", "Équipement", "Recyclage", "Développement"]

  const filteredMyths = selectedCategory === "all" ? myths : myths.filter((m) => m.category === selectedCategory)

  const toggleReveal = (id: string) => {
    const newRevealed = new Set(revealedMyths)
    if (newRevealed.has(id)) {
      newRevealed.delete(id)
    } else {
      newRevealed.add(id)
    }
    setRevealedMyths(newRevealed)
  }

  return (
    <div data-theme="amber" className="min-h-screen bg-secondary/30">
      <PageHero
        theme="amber"
        image={{ src: "/greenit/images/hero-mythes.webp", alt: "Ampoule géante en deux moitiés, ambre interrogative et émeraude végétale" }}
        badge={{ label: "Mythes vs Réalités" }}
        title="Démêlons le vrai du faux"
        intro="Le Green IT est entouré d'idées reçues. Découvrez ce qui est vraiment efficace pour réduire votre impact numérique, avec des données sourcées et à jour."
      />

      <SectionDivider />

      {/* Filter Section */}
      <section className="border-b border-border bg-card px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-medium text-muted-foreground self-center">Filtrer par :</span>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700"
                }
              >
                {cat === "all" ? "Tous les mythes" : cat}
              </Button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {filteredMyths.length} mythe{filteredMyths.length > 1 ? "s" : ""} trouvé
            {filteredMyths.length > 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Myths Grid */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredMyths.map((myth) => {
              const isRevealed = revealedMyths.has(myth.id)
              return (
                <Card
                  key={myth.id}
                  className="overflow-hidden border-2 border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                          {myth.icon}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {myth.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Myth Statement */}
                    <div className="mb-4 rounded-lg bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">Idée reçue</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{myth.myth}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reveal Button */}
                    {!isRevealed && (
                      <Button
                        onClick={() => toggleReveal(myth.id)}
                        variant="outline"
                        className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                      >
                        Découvrir la réalité
                      </Button>
                    )}

                    {/* Reality Section */}
                    {isRevealed && (
                      <div className="space-y-4">
                        <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-1">
                                La réalité
                              </p>
                              <p className="font-semibold text-slate-900 dark:text-slate-100">{myth.reality}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-blue-50 p-4 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Explication</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                {myth.explanation}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">Source : {myth.source}</p>
                        </div>

                        {myth.relatedLink && (
                          <Button asChild variant="link" className="w-full text-emerald-700 dark:text-emerald-400 p-0">
                            <Link href={myth.relatedLink.href}>
                              {myth.relatedLink.label} →
                            </Link>
                          </Button>
                        )}

                        <Button
                          onClick={() => toggleReveal(myth.id)}
                          variant="ghost"
                          size="sm"
                          className="w-full text-muted-foreground"
                        >
                          Masquer
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Vous avez d'autres questions ?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Consultez notre FAQ ou explorez nos ressources pour approfondir vos connaissances sur le Green IT.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/faq">
                Voir la FAQ
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ressources">
                Explorer les ressources
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

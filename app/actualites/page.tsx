"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingUp, ArrowRight, ExternalLink, Newspaper, AlertCircle, Rss } from "lucide-react"
import { RssFeed } from "@/components/rss-feed"
import { PageHero } from "@/components/page-hero"

type NewsCategory = "reglementation" | "innovation" | "tendance" | "etude" | "evenement" | "all"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: NewsCategory
  date: string
  relatedPage?: string
  sourceUrl?: string
  sourceLabel?: string
}

interface VeilleSource {
  source: string
  category: string
  link: string
  blurb: string
}

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all")

  // --- Exemples de mise en page (rédaction du site, PAS des dépêches) ---
  // Ces encarts illustrent le format des futurs dossiers de fond. Ils ne
  // doivent être cités comme des actualités par personne : aucune déclaration
  // n'est attribuée à un organisme réel.
  const newsArticles: NewsArticle[] = [
    {
      id: "1",
      title: "Droit à la réparation : ce qui change vraiment",
      excerpt:
        "La directive européenne 2024/1799 s'applique depuis le 31 juillet 2026 : obligation de réparer, garantie prolongée après réparation, pièces disponibles plusieurs années. Le détail dans notre page réglementation.",
      category: "reglementation",
      date: "Exemple de dossier",
      relatedPage: "/reglementation",
    },
    {
      id: "2",
      title: "Recyclage des e-déchets : où en est la France ?",
      excerpt:
        "Collecte, bonus réparation, reconditionné : les chiffres vérifiés et les ordres de grandeur à retenir, sans les idées reçues.",
      category: "etude",
      date: "Exemple de dossier",
      relatedPage: "/chiffres",
    },
    {
      id: "3",
      title: "Datacenters et IA : démêler le vrai du faux",
      excerpt:
        "L'IA tire la croissance de la consommation électrique des datacenters (Agence internationale de l'énergie, 2025), mais les chiffres qui circulent mélangent souvent tout. On fait le tri.",
      category: "tendance",
      date: "Exemple de dossier",
      relatedPage: "/datacenters",
    },
    {
      id: "4",
      title: "Coder plus sobre : par où commencer ?",
      excerpt:
        "Langages, images, cache, hébergement : les leviers d'éco-conception web qui comptent vraiment, avec des exemples concrets.",
      category: "innovation",
      date: "Exemple de dossier",
      relatedPage: "/developpement",
    },
    {
      id: "5",
      title: "Éco-conception web : les référentiels existants",
      excerpt:
        "Pas de label officiel « site éco-conçu » en France : il existe en revanche des référentiels sérieux (GR491, RGESN, EcoIndex) pour progresser pas à pas.",
      category: "reglementation",
      date: "Exemple de dossier",
      relatedPage: "/developpement",
    },
    {
      id: "6",
      title: "Collectivités : allonger la vie du matériel",
      excerpt:
        "Achat reconditionné, maintenance, réemploi : ce que les collectivités peuvent faire dès maintenant, avec les aides existantes.",
      category: "tendance",
      date: "Exemple de dossier",
      relatedPage: "/fiches-pratiques/collectivites-action",
    },
    {
      id: "7",
      title: "IA générative : ce que dit l'ADEME en 2026",
      excerpt:
        "L'avis de l'ADEME (juillet 2026) chiffre la trajectoire : ~485 TWh de consommation des datacenters mondiaux en 2025, un possible doublement d'ici 2030 et un facteur 3,7 en France d'ici 2035. Décryptage et bons réflexes.",
      category: "etude",
      date: "Exemple de dossier",
      relatedPage: "/fiches-pratiques/ia-generative",
    },
    {
      id: "8",
      title: "France 2030 : un appel à projets pour des datacenters durables",
      excerpt:
        "EcoIDEN, opéré par l'ADEME pour l'État (première relève le 29/10/2026) : soutenir les centres de données exemplaires et l'économie circulaire des équipements numériques. Contexte officiel : le numérique pèse 4,4 % de l'empreinte carbone française en 2022 (29,5 Mt CO₂e), et il faudrait extraire 59 % de métaux en plus en 2050 qu'en 2020 (ADEME).",
      category: "reglementation",
      date: "Exemple de dossier",
      relatedPage: "/datacenters",
      sourceUrl:
        "https://www.ecologie.gouv.fr/presse/france-2030-gouvernement-lance-appel-projets-accelerer-developpement-dequipements-numeriques",
      sourceLabel: "Communiqué officiel (ministères, 31/07/2026)",
    },
  ]

  // --- Veille : flux RSS réels (titres + liens) + annuaire de sources ---
  // Les flux sont chargés côté navigateur ; ceux sans CORS passent par rss2json.com.
  // Seuls titres, dates et liens sont affichés, le contenu reste chez la source.
  const veilleSources: VeilleSource[] = [
    {
      source: "GreenIT.fr",
      category: "Association",
      link: "https://www.greenit.fr",
      blurb: "Le collectif d'experts du numérique responsable : études, benchmarks et publications de référence.",
    },
    {
      source: "ADEME",
      category: "Agence publique",
      link: "https://www.ademe.fr",
      blurb: "L'agence de la transition écologique : guides, données et aides (bonus réparation, Que faire de mes objets).",
    },
    {
      source: "Arcep",
      category: "Régulateur",
      link: "https://www.arcep.fr",
      blurb: "Le régulateur des télécoms : enquêtes annuelles sur l'empreinte environnementale du numérique.",
    },
    {
      source: "The Shift Project",
      category: "Think tank",
      link: "https://theshiftproject.org",
      blurb: "Le think tank de la transition carbone : rapports sur le numérique, l'énergie et le climat.",
    },
    {
      source: "Next",
      category: "Presse indépendante",
      link: "https://next.ink",
      blurb: "Presse tech indépendante : droit du numérique, vie privée, obsolescence.",
    },
  ]

  const categories = [
    { id: "all" as NewsCategory, label: "Toutes", color: "bg-secondary text-secondary-foreground" },
    { id: "reglementation" as NewsCategory, label: "Réglementation", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
    { id: "innovation" as NewsCategory, label: "Innovation", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
    { id: "tendance" as NewsCategory, label: "Tendance", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    { id: "etude" as NewsCategory, label: "Étude", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  ]

  const filteredNews =
    selectedCategory === "all" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  const getCategoryColor = (category: NewsCategory) => {
    const cat = categories.find((c) => c.id === category)
    return cat?.color || "bg-secondary text-secondary-foreground"
  }

  return (
    <div data-theme="amber" className="min-h-screen bg-background transition-colors duration-300">
      <PageHero
        theme="amber"
        image={{ src: "/greenit/images/hero-actualites.webp", alt: "Micro vintage diffusant des ondes qui deviennent des feuilles" }}
        badge={{ icon: TrendingUp, label: "Dossiers & Veille" }}
        title="Dossiers Green IT"
        intro="Dossiers de fond, analyses et veille réglementaire pour comprendre les enjeux du numérique responsable en 2026."
      />

      <div className="px-6 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3 max-w-4xl mx-auto">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong className="font-semibold">Page en reconstruction.</strong> Les encarts « À la une » sont des
                exemples de mise en page rédigés par la rédaction du site, pas des dépêches : ne les citez pas comme
                des actualités. Pour suivre l&apos;actu réelle, ouvrez l&apos;onglet Veille : les derniers titres y
                sont récupérés en direct depuis les flux des sources.
              </p>
            </div>
          </div>

          <Tabs defaultValue="featured" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="featured" className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  À la une
                </TabsTrigger>
                <TabsTrigger value="rss" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Veille
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="featured" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2">
              {/* Filters */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm font-medium text-muted-foreground mr-2">Filtrer par :</span>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid gap-6 lg:grid-cols-2">
                {filteredNews.map((article) => (
                  <Card
                    key={article.id}
                    className="group overflow-hidden border-2 border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getCategoryColor(article.category)} border-0`}>
                          {categories.find((c) => c.id === article.category)?.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Exemple
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>

                    <p className="mb-6 text-muted-foreground leading-relaxed">{article.excerpt}</p>

                    {article.sourceUrl && (
                      <p className="mb-6 text-sm">
                        <a
                          href={article.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {article.sourceLabel ?? "Source officielle"}
                        </a>
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-muted-foreground">La rédaction — exemple illustratif</span>

                      {article.relatedPage && (
                        <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 hover:bg-transparent">
                          <Link href={article.relatedPage}>
                            En savoir plus
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rss" forceMount className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
              <Card className="border-2 border-primary/20 p-6">
                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-foreground">
                    <Rss className="h-5 w-5 text-primary" />
                    Dernières nouvelles (veille RSS)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Titres et liens récupérés en direct depuis les flux des sources, classés du plus récent au plus
                    ancien. Les contenus restent chez leurs auteurs : chaque carte renvoie vers l&apos;article
                    d&apos;origine. Les flux sans CORS passent par le service tiers rss2json.com.
                  </p>
                </div>
                <RssFeed />
              </Card>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card border-2 border-primary/20 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Sources à suivre</h3>
                    <p className="text-sm text-muted-foreground">Avec ou sans flux RSS : consultez ces sites directement pour creuser un sujet.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {veilleSources.map((item) => (
                  <Card key={item.source} className="p-5 border-l-4 border-l-primary hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.source}</Badge>
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{item.blurb}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Visiter le site <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

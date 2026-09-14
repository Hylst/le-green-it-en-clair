"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingUp, ArrowRight, Rss, ExternalLink, Newspaper, AlertCircle } from "lucide-react"

type NewsCategory = "reglementation" | "innovation" | "tendance" | "etude" | "evenement" | "all"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: NewsCategory
  date: string
  relatedPage?: string
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
  ]

  // --- Veille : annuaire de sources externes fiables (aucun flux automatique) ---
  // Pas d'agrégateur RSS sur un site statique : on renvoie vers les sites
  // eux-mêmes, avec une description générique et vraie de chacun.
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
      link: "https://www.nextinpact.com",
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="bg-muted/30 border-b border-border">
        <div className="px-6 py-12 lg:py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              Actualités & Veille
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">Actualités Green IT</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Dossiers de fond, analyses et veille réglementaire pour comprendre les enjeux du numérique responsable en 2026.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3 max-w-4xl mx-auto">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong className="font-semibold">Page en reconstruction.</strong> Les encarts « À la une » sont des
                exemples de mise en page rédigés par la rédaction du site, pas des dépêches : ne les citez pas comme
                des actualités. Pour suivre l&apos;actu réelle, rendez-vous directement sur les sources listées dans
                l&apos;onglet Veille.
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
                  <Rss className="h-4 w-4" />
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

            <TabsContent value="rss" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card border-2 border-primary/20 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <Rss className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Sources à suivre</h3>
                    <p className="text-sm text-muted-foreground">Pas d&apos;agrégateur automatique : consultez ces sites directement, c&apos;est plus fiable.</p>
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

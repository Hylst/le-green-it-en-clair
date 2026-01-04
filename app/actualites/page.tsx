"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, ArrowRight, Filter } from "lucide-react"

type NewsCategory = "reglementation" | "innovation" | "tendance" | "etude" | "evenement" | "all"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: NewsCategory
  date: string
  relatedPage?: string
  source?: string
}

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all")

  const newsArticles: NewsArticle[] = [
    {
      id: "1",
      title: "La directive européenne sur le droit à la réparation entre en vigueur",
      excerpt:
        "À partir de juin 2025, les fabricants d'électronique devront garantir la disponibilité des pièces détachées pendant 10 ans minimum pour les smartphones et tablettes. Une avancée majeure pour l'économie circulaire.",
      category: "reglementation",
      date: "15 janvier 2025",
      relatedPage: "/reglementation",
      source: "Commission Européenne",
    },
    {
      id: "2",
      title: "L'IA générative multiplie par 10 la consommation énergétique des requêtes web",
      excerpt:
        "Une étude récente révèle qu'une requête ChatGPT consomme 10 fois plus d'énergie qu'une recherche Google classique. L'explosion de l'IA pose de nouveaux défis pour le Green IT.",
      category: "etude",
      date: "8 janvier 2025",
      relatedPage: "/problematiques",
      source: "Nature Energy, 2025",
    },
    {
      id: "3",
      title: "Record mondial : 74,7 millions de tonnes de déchets électroniques en 2024",
      excerpt:
        "Le dernier rapport de l'ONU montre une augmentation de 22% des e-déchets en 5 ans. Seulement 22,3% sont correctement recyclés au niveau mondial, un chiffre en baisse.",
      category: "etude",
      date: "3 janvier 2025",
      relatedPage: "/chiffres",
      source: "Global E-Waste Monitor, ONU",
    },
    {
      id: "4",
      title: "La France lance son nouveau label 'Numérique Responsable' pour les entreprises",
      excerpt:
        "Le gouvernement français dévoile un nouveau label pour valoriser les entreprises engagées dans une démarche Green IT. Les critères incluent l'allongement de la durée de vie des équipements et l'écoconception.",
      category: "reglementation",
      date: "20 décembre 2024",
      relatedPage: "/reglementation",
      source: "Ministère de la Transition Écologique",
    },
    {
      id: "5",
      title: "Les datacenters français atteignent un PUE moyen de 1,5",
      excerpt:
        "Grâce aux innovations en refroidissement et au mix énergétique bas carbone, les centres de données français sont parmi les plus efficients d'Europe. OVHcloud et Scaleway montrent l'exemple.",
      category: "innovation",
      date: "18 décembre 2024",
      relatedPage: "/datacenters",
      source: "ADEME",
    },
    {
      id: "6",
      title: "Le marché du reconditionné explose : +35% en 2024",
      excerpt:
        "Les Français plébiscitent de plus en plus les appareils reconditionnés. Le secteur a généré 1,8 milliard d'euros en 2024, porté par une prise de conscience écologique croissante.",
      category: "tendance",
      date: "12 décembre 2024",
      relatedPage: "/recyclage",
      source: "Ecosystem, Back Market",
    },
    {
      id: "7",
      title: "Nouvelle norme ISO 14067 pour mesurer l'empreinte carbone des logiciels",
      excerpt:
        "Une norme internationale vient standardiser le calcul de l'impact environnemental des applications. Elle permettra aux développeurs d'optimiser leurs codes de manière mesurable.",
      category: "innovation",
      date: "5 décembre 2024",
      relatedPage: "/developpement",
      source: "ISO",
    },
    {
      id: "8",
      title: "La 6G déjà en développement : quel impact énergétique ?",
      excerpt:
        "Alors que la 5G continue son déploiement, les laboratoires travaillent sur la 6G. Les experts s'inquiètent d'une consommation énergétique potentiellement multipliée par 100 sans optimisation.",
      category: "tendance",
      date: "28 novembre 2024",
      relatedPage: "/perspectives",
      source: "GreenIT.fr, IEEE",
    },
    {
      id: "9",
      title: "L'indice de durabilité devient obligatoire en France dès mars 2025",
      excerpt:
        "Après l'indice de réparabilité, la France impose l'indice de durabilité pour informer les consommateurs sur la fiabilité et la robustesse des produits électroniques.",
      category: "reglementation",
      date: "15 novembre 2024",
      relatedPage: "/reglementation",
      source: "Journal Officiel",
    },
    {
      id: "10",
      title: "Record de chaleur : des datacenters utilisés pour chauffer des villes",
      excerpt:
        "À Grenoble et Nantes, l'énergie fatale des datacenters est récupérée pour alimenter des réseaux de chaleur urbains. Une initiative qui évite le gaspillage de milliers de MWh.",
      category: "innovation",
      date: "8 novembre 2024",
      relatedPage: "/datacenters",
      source: "Qarnot Computing, Ville de Grenoble",
    },
    {
      id: "11",
      title: "Les métaux rares : une tension géopolitique croissante",
      excerpt:
        "La dépendance aux terres rares pour fabriquer nos smartphones crée des tensions internationales. L'Europe lance un programme pour diversifier ses sources d'approvisionnement.",
      category: "tendance",
      date: "1 novembre 2024",
      relatedPage: "/problematiques",
      source: "Commission Européenne",
    },
    {
      id: "12",
      title: "Green Web Foundation publie son rapport 2024 sur l'internet bas carbone",
      excerpt:
        "Seulement 7% des sites web sont hébergés sur des infrastructures 100% renouvelables. Le rapport identifie les bonnes pratiques pour un web plus sobre.",
      category: "etude",
      date: "25 octobre 2024",
      relatedPage: "/developpement",
      source: "Green Web Foundation",
    },
  ]

  const categories = [
    { id: "all" as NewsCategory, label: "Toutes les actualités", color: "bg-slate-100 text-slate-700" },
    { id: "reglementation" as NewsCategory, label: "Réglementation", color: "bg-indigo-100 text-indigo-700" },
    { id: "innovation" as NewsCategory, label: "Innovation", color: "bg-emerald-100 text-emerald-700" },
    { id: "tendance" as NewsCategory, label: "Tendance", color: "bg-blue-100 text-blue-700" },
    { id: "etude" as NewsCategory, label: "Étude", color: "bg-amber-100 text-amber-700" },
    { id: "evenement" as NewsCategory, label: "Événement", color: "bg-purple-100 text-purple-700" },
  ]

  const filteredNews =
    selectedCategory === "all" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  const getCategoryColor = (category: NewsCategory) => {
    const cat = categories.find((c) => c.id === category)
    return cat?.color || "bg-slate-100 text-slate-700"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
              <TrendingUp className="h-4 w-4" />
              Mis à jour régulièrement
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">Actualités Green IT 2025</h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Restez informé des dernières avancées, réglementations et innovations en matière de numérique responsable.
              Toutes les actualités importantes du Green IT en France et dans le monde.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Filter className="h-4 w-4" />
              Filtrer par :
            </div>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? category.color + " ring-2 ring-offset-2"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category.label}
                {category.id === "all" && ` (${newsArticles.length})`}
                {category.id !== "all" && ` (${newsArticles.filter((a) => a.category === category.id).length})`}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredNews.map((article) => (
              <Card
                key={article.id}
                className="group overflow-hidden border-2 border-slate-200 p-6 transition-all hover:border-blue-500 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Badge className={getCategoryColor(article.category)}>
                    {categories.find((c) => c.id === article.category)?.label}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {article.date}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-blue-700">{article.title}</h3>

                <p className="mb-4 text-slate-600">{article.excerpt}</p>

                {article.source && <p className="mb-4 text-sm italic text-slate-500">Source : {article.source}</p>}

                {article.relatedPage && (
                  <Link href={article.relatedPage}>
                    <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-800">
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-slate-600">Aucune actualité dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-emerald-50 px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Vous souhaitez contribuer ?</h2>
          <p className="mb-6 text-slate-600">
            Vous avez une actualité importante à partager sur le Green IT ? Contactez-nous pour enrichir cette page.
          </p>
          <Link href="mailto:geoffroy.streit@gmail.com">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Proposer une actualité</Button>
          </Link>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">Explorer d'autres sections</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/problematiques">
              <Card className="group h-full border-2 border-slate-200 p-6 transition-all hover:border-emerald-500 hover:shadow-lg">
                <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                  Problématiques & Solutions
                </h3>
                <p className="text-sm text-slate-600">
                  Découvrez les défis environnementaux du numérique et les solutions en cours de déploiement.
                </p>
              </Card>
            </Link>
            <Link href="/perspectives">
              <Card className="group h-full border-2 border-slate-200 p-6 transition-all hover:border-blue-500 hover:shadow-lg">
                <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                  Perspectives d'avenir
                </h3>
                <p className="text-sm text-slate-600">
                  Explorez les scénarios futurs et les innovations qui façonneront le Green IT de demain.
                </p>
              </Card>
            </Link>
            <Link href="/reglementation">
              <Card className="group h-full border-2 border-slate-200 p-6 transition-all hover:border-indigo-500 hover:shadow-lg">
                <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-indigo-700">Réglementation</h3>
                <p className="text-sm text-slate-600">
                  Consultez les normes et lois en vigueur en France et en Europe pour le numérique responsable.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

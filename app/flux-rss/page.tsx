"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rss, ExternalLink, Calendar, RefreshCw, Newspaper } from "lucide-react"

interface RSSFeedItem {
  title: string
  link: string
  description: string
  pubDate: string
  source: string
  category: string
}

export default function FluxRSSPage() {
  const [feedItems, setFeedItems] = useState<RSSFeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simulated RSS feed data from various Green IT sources
  // In production, this would fetch from actual RSS feeds via an API route
  const simulatedFeeds: RSSFeedItem[] = [
    {
      title: "GreenIT.fr : Publication du guide 2025 de l'écoconception des services numériques",
      link: "https://www.greenit.fr",
      description:
        "Le collectif GreenIT.fr publie la nouvelle édition de son guide de référence pour concevoir des services numériques plus sobres. 115 bonnes pratiques actualisées avec les dernières technologies.",
      pubDate: "18 janvier 2025",
      source: "GreenIT.fr",
      category: "Guide",
    },
    {
      title: "ADEME : Étude sur l'impact environnemental du streaming vidéo en France",
      link: "https://www.ademe.fr",
      description:
        "L'ADEME publie une étude détaillée sur l'empreinte carbone du streaming en France. La vidéo représente désormais 60% du trafic internet français, avec un impact de 1,6 MtCO2eq par an.",
      pubDate: "15 janvier 2025",
      source: "ADEME",
      category: "Étude",
    },
    {
      title: "Arcep : Observatoire de l'empreinte environnementale du numérique - édition 2025",
      link: "https://www.arcep.fr",
      description:
        "L'Arcep présente son rapport annuel sur l'impact environnemental du numérique en France. Focus sur la consommation énergétique des réseaux 5G et l'évolution des terminaux.",
      pubDate: "12 janvier 2025",
      source: "Arcep",
      category: "Rapport",
    },
    {
      title: "Institut du Numérique Responsable : Lancement du Mooc Green IT 2025",
      link: "https://www.institut-nr.org",
      description:
        "L'INR lance sa formation en ligne gratuite sur le numérique responsable, mise à jour avec les nouvelles réglementations européennes et les tendances 2025.",
      pubDate: "10 janvier 2025",
      source: "Institut du Numérique Responsable",
      category: "Formation",
    },
    {
      title: "The Shift Project : Impact carbone de la croissance exponentielle de l'IA",
      link: "https://theshiftproject.org",
      description:
        "Le Shift Project alerte sur l'explosion de la consommation énergétique des modèles d'IA générative. Une requête ChatGPT consomme désormais autant d'énergie que 10 recherches Google.",
      pubDate: "8 janvier 2025",
      source: "The Shift Project",
      category: "Analyse",
    },
    {
      title: "Ecosystem : Bilan 2024 de la collecte et du recyclage des DEEE en France",
      link: "https://www.ecosystem.eco",
      description:
        "Ecosystem publie son rapport annuel : 62 millions d'appareils électriques et électroniques collectés en 2024, soit 10 kg par habitant. Le taux de recyclage atteint 85%.",
      pubDate: "5 janvier 2025",
      source: "Ecosystem",
      category: "Bilan",
    },
    {
      title: "Commission Européenne : Nouvelles normes d'efficacité énergétique pour les datacenters",
      link: "https://ec.europa.eu",
      description:
        "Bruxelles adopte de nouvelles exigences pour les centres de données. À partir de 2026, tous les nouveaux datacenters devront afficher un PUE inférieur à 1,4 et utiliser 80% d'énergies renouvelables.",
      pubDate: "3 janvier 2025",
      source: "Commission Européenne",
      category: "Réglementation",
    },
    {
      title: "Ministère de la Transition Écologique : Lancement du label Numérique Responsable",
      link: "https://www.ecologie.gouv.fr",
      description:
        "Le gouvernement lance officiellement le label NR pour valoriser les organisations engagées. 5 niveaux de certification couvrant l'ensemble des enjeux du numérique responsable.",
      pubDate: "28 décembre 2024",
      source: "Ministère Transition Écologique",
      category: "Réglementation",
    },
    {
      title: "Global E-Waste Monitor : Rapport mondial 2024 sur les déchets électroniques",
      link: "https://ewastemonitor.info",
      description:
        "Record historique de 74,7 millions de tonnes d'e-déchets générés en 2024 dans le monde. Seuls 22,3% sont correctement collectés et recyclés, un taux en baisse.",
      pubDate: "20 décembre 2024",
      source: "ONU - Global E-Waste Monitor",
      category: "Rapport",
    },
    {
      title: "Back Market : Le marché du reconditionné dépasse les 2 milliards d'euros en France",
      link: "https://www.backmarket.fr",
      description:
        "Le secteur du reconditionné continue sa croissance avec +38% en 2024. Les smartphones reconditionnés représentent désormais 25% des ventes totales de smartphones en France.",
      pubDate: "15 décembre 2024",
      source: "Back Market",
      category: "Marché",
    },
  ]

  useEffect(() => {
    // Simulate loading RSS feeds
    setTimeout(() => {
      setFeedItems(simulatedFeeds)
      setLoading(false)
    }, 1000)
  }, [])

  const refreshFeeds = () => {
    setLoading(true)
    setTimeout(() => {
      setLastUpdate(new Date())
      setLoading(false)
    }, 1000)
  }

  const rssSources = [
    {
      name: "GreenIT.fr",
      url: "https://www.greenit.fr/feed/",
      description: "Actualités et analyses du numérique responsable",
    },
    { name: "ADEME", url: "https://www.ademe.fr/rss", description: "Études et rapports environnementaux" },
    {
      name: "Arcep",
      url: "https://www.arcep.fr/rss",
      description: "Régulation des télécoms et impact environnemental",
    },
    { name: "INR", url: "https://www.institut-nr.org/feed", description: "Institut du Numérique Responsable" },
    {
      name: "The Shift Project",
      url: "https://theshiftproject.org/feed/",
      description: "Think tank de la transition carbone",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              <Rss className="h-4 w-4" />
              Flux RSS en temps réel
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl dark:text-slate-100">
              Flux d'actualités Green IT
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Suivez en temps réel les dernières publications des sources de référence du numérique responsable en
              France et dans le monde.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <Calendar className="h-4 w-4" />
              Dernière actualisation : {lastUpdate.toLocaleString("fr-FR")}
            </div>
            <Button
              onClick={refreshFeeds}
              disabled={loading}
              variant="outline"
              size="sm"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-900 bg-transparent"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse p-6">
                  <div className="mb-3 h-6 w-32 rounded bg-slate-200 dark:bg-slate-700"></div>
                  <div className="mb-3 h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>
                  <div className="mb-2 h-4 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
                  <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {feedItems.map((item, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-2 border-slate-200 p-6 transition-all hover:border-emerald-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-emerald-600"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3 w-3" />
                      {item.pubDate}
                    </div>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
                    {item.title}
                  </h3>

                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Newspaper className="h-3 w-3" />
                      {item.source}
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Lire l'article
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Sources RSS suivies</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rssSources.map((source) => (
                <Card
                  key={source.name}
                  className="border-2 border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Rss className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{source.name}</h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{source.description}</p>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    S'abonner au flux
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center text-white dark:from-emerald-700 dark:to-teal-700">
            <h2 className="mb-4 text-2xl font-bold">Restez informé en temps réel</h2>
            <p className="mb-6 text-emerald-50">
              Abonnez-vous aux flux RSS de vos sources préférées pour ne rien manquer de l'actualité du numérique
              responsable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50">
                <Rss className="mr-2 h-4 w-4" />
                Configurer mon lecteur RSS
              </Button>
              <Link href="/actualites">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                  Voir toutes les actualités
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

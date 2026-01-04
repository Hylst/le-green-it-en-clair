"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, FileText, BookOpen, Video, Search } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    category: "Guides pratiques",
    icon: FileText,
    color: "emerald",
    items: [
      {
        title: "7 gestes pour un numérique sobre",
        description: "Guide citoyen avec actions concrètes",
        type: "Fiche pratique",
        link: "/fiches-pratiques/gestes-quotidiens",
      },
      {
        title: "Guide d'achat responsable",
        description: "Choisir un appareil avec moins d'impact",
        type: "Fiche pratique",
        link: "/fiches-pratiques/achat-responsable",
      },
      {
        title: "Écoconception web et logicielle",
        description: "Bonnes pratiques pour développeurs",
        type: "Fiche pratique",
        link: "/fiches-pratiques/ecoconception-web",
      },
      {
        title: "Toutes les fiches pratiques",
        description: "Accédez à l'ensemble de nos guides téléchargeables",
        type: "Collection",
        link: "/fiches-pratiques",
      },
    ],
  },
  {
    category: "Rapports et études",
    icon: BookOpen,
    color: "blue",
    items: [
      {
        title: "Impact environnemental du numérique",
        description: "ADEME - Rapport complet 2023",
        type: "PDF",
        size: "8.5 MB",
      },
      {
        title: "Global E-Waste Monitor 2024",
        description: "ONU - Données mondiales",
        type: "PDF",
        size: "12.3 MB",
      },
      {
        title: "Étude GreenIT.fr 2023",
        description: "État des lieux du numérique responsable",
        type: "PDF",
        size: "5.7 MB",
      },
    ],
  },
  {
    category: "Infographies",
    icon: Video,
    color: "teal",
    items: [
      {
        title: "Cycle de vie d'un smartphone",
        description: "Visualisation interactive",
        type: "PNG",
        size: "1.2 MB",
      },
      {
        title: "Répartition impact CO₂",
        description: "Graphique détaillé",
        type: "PNG",
        size: "0.8 MB",
      },
      {
        title: "Carte des points de collecte",
        description: "France métropolitaine",
        type: "PNG",
        size: "2.1 MB",
      },
    ],
  },
]

const externalLinks = [
  {
    name: "ADEME",
    description: "Agence de la transition écologique",
    url: "https://www.ademe.fr",
    category: "Organisme public",
  },
  {
    name: "GreenIT.fr",
    description: "Communauté du numérique responsable",
    url: "https://www.greenit.fr",
    category: "Association",
  },
  {
    name: "Ecosystem",
    description: "Éco-organisme recyclage DEEE",
    url: "https://www.ecosystem.eco",
    category: "Éco-organisme",
  },
  {
    name: "Écologic",
    description: "Éco-organisme DEEE professionnels",
    url: "https://www.ecologic-france.com",
    category: "Éco-organisme",
  },
  {
    name: "Réseau des Ressourceries",
    description: "Réemploi et réduction des déchets",
    url: "https://www.ressourcerie.fr",
    category: "Association",
  },
  {
    name: "Zero Waste France",
    description: "Réduction des déchets",
    url: "https://www.zerowastefrance.org",
    category: "Association",
  },
]

const glossaryData = [
  {
    term: "DEEE",
    definition:
      "Déchets d'Équipements Électriques et Électroniques. Tous les appareils fonctionnant à l'électricité ou avec des piles/batteries en fin de vie.",
    category: "Réglementation",
  },
  {
    term: "REP",
    definition:
      "Responsabilité Élargie du Producteur. Principe selon lequel les fabricants sont responsables de la fin de vie de leurs produits.",
    category: "Réglementation",
  },
  {
    term: "PUE",
    definition:
      "Power Usage Effectiveness. Indicateur d'efficacité énergétique des datacenters. Un PUE de 1.0 est parfait, 2.0 signifie 50% d'énergie gaspillée.",
    category: "Technique",
  },
  {
    term: "Écoconception",
    definition:
      "Approche de conception qui intègre l'environnement dès la conception d'un produit ou service numérique.",
    category: "Pratique",
  },
  {
    term: "Green IT",
    definition:
      "Ensemble des pratiques visant à réduire l'empreinte environnementale du numérique (matériel, logiciel, usage).",
    category: "Général",
  },
  {
    term: "Reconditionné",
    definition:
      "Appareil d'occasion remis en état de fonctionnement, testé et garanti. Réduit l'impact de 75% par rapport au neuf.",
    category: "Matériel",
  },
  {
    term: "Sobriété numérique",
    definition:
      "Démarche qui vise à réduire l'impact environnemental du numérique en modérant nos usages et en optimisant les ressources.",
    category: "Pratique",
  },
  {
    term: "Obsolescence programmée",
    definition:
      "Stratégie visant à réduire volontairement la durée de vie d'un produit pour en accélérer le remplacement. Interdite en France depuis 2015.",
    category: "Réglementation",
  },
  {
    term: "Empreinte carbone",
    definition:
      "Quantité totale de gaz à effet de serre émise directement et indirectement par une activité, un produit ou un service, exprimée en équivalent CO₂.",
    category: "Environnement",
  },
  {
    term: "ACV",
    definition:
      "Analyse du Cycle de Vie. Méthodologie qui évalue l'impact environnemental d'un produit de sa conception à sa fin de vie.",
    category: "Technique",
  },
  {
    term: "CDN",
    definition:
      "Content Delivery Network. Réseau de serveurs distribués géographiquement pour livrer du contenu web plus rapidement et avec moins d'énergie.",
    category: "Technique",
  },
  {
    term: "Lazy Loading",
    definition:
      "Technique de chargement différé des ressources (images, vidéos) uniquement lorsqu'elles sont nécessaires, réduisant la consommation de bande passante.",
    category: "Technique",
  },
  {
    term: "Indice de réparabilité",
    definition:
      "Note sur 10 obligatoire en France depuis 2021, indiquant la facilité de réparation d'un équipement électronique.",
    category: "Réglementation",
  },
  {
    term: "Loi AGEC",
    definition:
      "Loi Anti-Gaspillage pour une Économie Circulaire (2020). Impose l'indice de réparabilité, lutte contre l'obsolescence et favorise le réemploi.",
    category: "Réglementation",
  },
  {
    term: "Loi REEN",
    definition:
      "Loi Réduire l'Empreinte Environnementale du Numérique (2021). Impose aux acteurs du numérique de mesurer et réduire leur impact environnemental.",
    category: "Réglementation",
  },
]

export default function RessourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous")

  const categories = ["Tous", ...Array.from(new Set(glossaryData.map((item) => item.category)))]

  const filteredGlossary = glossaryData.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 px-6 py-16 lg:py-24 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl dark:text-slate-100">
            Ressources et documentation
          </h1>
          <p className="text-pretty text-lg text-slate-600 lg:text-xl dark:text-slate-300">
            Guides pratiques, rapports, infographies et liens utiles pour approfondir vos connaissances sur le Green IT
            et le numérique responsable.
          </p>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl dark:text-slate-100">
            Documents téléchargeables
          </h2>
          <div className="space-y-12">
            {resources.map((category, catIndex) => {
              const Icon = category.icon
              return (
                <div key={catIndex}>
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${category.color}-100 dark:bg-${category.color}-900/30`}
                    >
                      <Icon className={`h-5 w-5 text-${category.color}-700 dark:text-${category.color}-400`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{category.category}</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        className="border-2 border-slate-200 p-6 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                      >
                        <div className="mb-4">
                          <h4 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">{item.title}</h4>
                          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="rounded bg-slate-100 px-2 py-1 font-medium dark:bg-slate-700">
                              {item.type}
                            </span>
                            {item.size && <span>{item.size}</span>}
                          </div>
                        </div>
                        {item.link ? (
                          <Link href={item.link}>
                            <Button
                              size="sm"
                              className={`w-full bg-${category.color}-600 hover:bg-${category.color}-700`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Consulter
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            size="sm"
                            className={`w-full bg-${category.color}-600 hover:bg-${category.color}-700`}
                            disabled
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger (bientôt)
                          </Button>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="bg-slate-50 px-6 py-16 lg:py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl dark:text-slate-100">
            Liens utiles
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {externalLinks.map((link, index) => (
              <Card
                key={index}
                className="border-2 border-slate-200 p-6 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">{link.category}</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">{link.name}</h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{link.description}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Visiter le site
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 lg:text-4xl dark:text-slate-100">
            Glossaire du Green IT
          </h2>
          <p className="mb-12 text-center text-lg text-slate-600 dark:text-slate-300">
            Tous les termes essentiels pour comprendre le numérique responsable
          </p>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Rechercher un terme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredGlossary.map((item, index) => (
              <Card key={index} className="border-2 border-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">{item.term}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{item.definition}</p>
              </Card>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Aucun terme trouvé pour "{searchTerm}". Essayez un autre mot-clé.
              </p>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            {filteredGlossary.length} terme{filteredGlossary.length > 1 ? "s" : ""} affiché
            {filteredGlossary.length > 1 ? "s" : ""} sur {glossaryData.length}
          </div>
        </div>
      </section>
    </div>
  )
}

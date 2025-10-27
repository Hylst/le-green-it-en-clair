"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, FileText, BookOpen, Video } from "lucide-react"

const resources = [
  {
    category: "Guides pratiques",
    icon: FileText,
    color: "emerald",
    items: [
      {
        title: "7 gestes pour un numérique sobre",
        description: "Guide citoyen avec actions concrètes",
        type: "PDF",
        size: "2.5 MB",
      },
      {
        title: "Green IT en entreprise",
        description: "Stratégies et bonnes pratiques",
        type: "PDF",
        size: "4.2 MB",
      },
      {
        title: "Guide du reconditionné",
        description: "Tout savoir sur l'achat reconditionné",
        type: "PDF",
        size: "1.8 MB",
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

export default function RessourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Ressources et documentation
          </h1>
          <p className="text-pretty text-lg text-slate-600 lg:text-xl">
            Guides pratiques, rapports, infographies et liens utiles pour approfondir vos connaissances sur le Green IT
            et le numérique responsable.
          </p>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">Documents téléchargeables</h2>
          <div className="space-y-12">
            {resources.map((category, catIndex) => {
              const Icon = category.icon
              return (
                <div key={catIndex}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${category.color}-100`}>
                      <Icon className={`h-5 w-5 text-${category.color}-700`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{category.category}</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((item, itemIndex) => (
                      <Card key={itemIndex} className="border-2 border-slate-200 p-6 transition-all hover:shadow-lg">
                        <div className="mb-4">
                          <h4 className="mb-2 font-semibold text-slate-900">{item.title}</h4>
                          <p className="mb-3 text-sm text-slate-600">{item.description}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="rounded bg-slate-100 px-2 py-1 font-medium">{item.type}</span>
                            <span>{item.size}</span>
                          </div>
                        </div>
                        <Button size="sm" className={`w-full bg-${category.color}-600 hover:bg-${category.color}-700`}>
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
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
      <section className="bg-slate-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">Liens utiles</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {externalLinks.map((link, index) => (
              <Card key={index} className="border-2 border-slate-200 p-6 transition-all hover:shadow-lg">
                <div className="mb-2 text-xs font-medium text-slate-500">{link.category}</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{link.name}</h3>
                <p className="mb-4 text-sm text-slate-600">{link.description}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Visiter le site
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">Glossaire</h2>
          <div className="space-y-4">
            {[
              {
                term: "DEEE",
                definition:
                  "Déchets d'Équipements Électriques et Électroniques. Tous les appareils fonctionnant à l'électricité ou avec des piles/batteries en fin de vie.",
              },
              {
                term: "REP",
                definition:
                  "Responsabilité Élargie du Producteur. Principe selon lequel les fabricants sont responsables de la fin de vie de leurs produits.",
              },
              {
                term: "PUE",
                definition:
                  "Power Usage Effectiveness. Indicateur d'efficacité énergétique des datacenters. Un PUE de 1.0 est parfait, 2.0 signifie 50% d'énergie gaspillée.",
              },
              {
                term: "Écoconception",
                definition:
                  "Approche de conception qui intègre l'environnement dès la conception d'un produit ou service numérique.",
              },
              {
                term: "Green IT",
                definition:
                  "Ensemble des pratiques visant à réduire l'empreinte environnementale du numérique (matériel, logiciel, usage).",
              },
              {
                term: "Reconditionné",
                definition:
                  "Appareil d'occasion remis en état de fonctionnement, testé et garanti. Réduit l'impact de 75% par rapport au neuf.",
              },
            ].map((item, index) => (
              <Card key={index} className="border-2 border-slate-200 p-6">
                <h3 className="mb-2 font-bold text-slate-900">{item.term}</h3>
                <p className="text-slate-700">{item.definition}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

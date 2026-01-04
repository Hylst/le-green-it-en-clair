"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Search,
  Recycle,
  Building2,
  Users,
  Package,
  CheckCircle2,
  ExternalLink,
  Info,
  Phone,
} from "lucide-react"

const recyclingActors = [
  {
    name: "Ecosystem",
    type: "Éco-organisme",
    icon: Recycle,
    color: "emerald",
    description: "Éco-organisme agréé pour la collecte et le recyclage des équipements électriques et électroniques",
    services: ["15 000+ points de collecte", "Recyclage DEEE", "Sensibilisation"],
    website: "https://www.ecosystem.eco",
    phone: "01 30 57 79 09",
  },
  {
    name: "Écologic",
    type: "Éco-organisme",
    icon: Package,
    color: "blue",
    description: "Éco-organisme spécialisé dans la gestion des DEEE professionnels et ménagers",
    services: ["Collecte professionnelle", "Traitement DEEE", "Reporting RSE"],
    website: "https://www.ecologic-france.com",
    phone: "01 30 57 88 00",
  },
  {
    name: "Réseau des Ressourceries",
    type: "Association",
    icon: Users,
    color: "teal",
    description: "Réseau national de structures de réemploi et de sensibilisation à la réduction des déchets",
    services: ["Réemploi", "Réparation", "Sensibilisation"],
    website: "https://www.ressourcerie.fr",
    phone: "04 67 15 70 85",
  },
  {
    name: "Envie",
    type: "Entreprise solidaire",
    icon: Building2,
    color: "cyan",
    description: "Entreprise d'insertion spécialisée dans le reconditionnement d'équipements électroménagers",
    services: ["Reconditionnement", "Insertion professionnelle", "Vente reconditionné"],
    website: "https://www.envie.org",
    phone: "01 44 85 29 88",
  },
]

const collectionPoints = [
  {
    city: "Paris",
    region: "Île-de-France",
    points: 245,
    types: ["Déchetteries", "Magasins", "Ressourceries"],
  },
  {
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    points: 98,
    types: ["Déchetteries", "Magasins", "Points de collecte"],
  },
  {
    city: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    points: 112,
    types: ["Déchetteries", "Magasins", "Ressourceries"],
  },
  {
    city: "Toulouse",
    region: "Occitanie",
    points: 87,
    types: ["Déchetteries", "Magasins", "Points de collecte"],
  },
  {
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    points: 76,
    types: ["Déchetteries", "Magasins", "Ressourceries"],
  },
  {
    city: "Lille",
    region: "Hauts-de-France",
    points: 65,
    types: ["Déchetteries", "Magasins", "Points de collecte"],
  },
  {
    city: "Nantes",
    region: "Pays de la Loire",
    points: 58,
    types: ["Déchetteries", "Magasins", "Ressourceries"],
  },
  {
    city: "Strasbourg",
    region: "Grand Est",
    points: 52,
    types: ["Déchetteries", "Magasins", "Points de collecte"],
  },
  {
    city: "Rennes",
    region: "Bretagne",
    points: 48,
    types: ["Déchetteries", "Magasins", "Ressourceries"],
  },
  {
    city: "Nice",
    region: "Provence-Alpes-Côte d'Azur",
    points: 43,
    types: ["Déchetteries", "Magasins", "Points de collecte"],
  },
]

const recyclableItems = [
  {
    category: "Petits appareils",
    items: ["Smartphones", "Tablettes", "Téléphones", "Appareils photo", "Consoles portables"],
    icon: "📱",
  },
  {
    category: "Informatique",
    items: ["Ordinateurs portables", "Ordinateurs fixes", "Écrans", "Claviers", "Souris", "Imprimantes"],
    icon: "💻",
  },
  {
    category: "Électroménager",
    items: ["Réfrigérateurs", "Lave-linge", "Lave-vaisselle", "Fours", "Aspirateurs"],
    icon: "🏠",
  },
  {
    category: "Audiovisuel",
    items: ["Téléviseurs", "Chaînes hi-fi", "Lecteurs DVD", "Enceintes", "Casques"],
    icon: "📺",
  },
]

export default function RecyclagePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const filteredCities = collectionPoints.filter(
    (point) =>
      point.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.region.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
            <Recycle className="h-4 w-4" />
            Recyclage & Filières françaises
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Recycler vos équipements électroniques en France
          </h1>
          <p className="text-pretty text-lg text-slate-600 lg:text-xl">
            Découvrez où et comment recycler vos appareils, et les acteurs français engagés dans l'économie circulaire
            du numérique.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 md:grid-cols-4">
            <Card className="border-2 border-emerald-500 bg-emerald-50 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-emerald-700">45%</div>
              <p className="text-sm text-slate-700">Taux de recyclage en France</p>
            </Card>
            <Card className="border-2 border-teal-500 bg-teal-50 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-teal-700">15 000+</div>
              <p className="text-sm text-slate-700">Points de collecte</p>
            </Card>
            <Card className="border-2 border-blue-500 bg-blue-50 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-blue-700">80%</div>
              <p className="text-sm text-slate-700">Métaux récupérables</p>
            </Card>
            <Card className="border-2 border-cyan-500 bg-cyan-50 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-cyan-700">1.5 Mt</div>
              <p className="text-sm text-slate-700">DEEE collectés par an</p>
            </Card>
          </div>
        </div>
      </section>

      {/* REP Explanation */}
      <section className="bg-slate-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">
            La REP : Responsabilité Élargie du Producteur
          </h2>
          <Card className="border-2 border-slate-200 p-8 lg:p-12">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                <Info className="h-7 w-7 text-emerald-700" />
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900">Qu'est-ce que la REP ?</h3>
                <p className="text-lg text-slate-600">
                  La Responsabilité Élargie du Producteur est un principe selon lequel les fabricants et distributeurs
                  sont responsables de la fin de vie de leurs produits.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-emerald-50 p-6">
                <div className="mb-3 text-3xl font-bold text-emerald-700">1</div>
                <h4 className="mb-2 font-semibold text-slate-900">Financement</h4>
                <p className="text-sm text-slate-600">
                  Les producteurs financent la collecte et le recyclage via une éco-contribution
                </p>
              </div>
              <div className="rounded-xl bg-teal-50 p-6">
                <div className="mb-3 text-3xl font-bold text-teal-700">2</div>
                <h4 className="mb-2 font-semibold text-slate-900">Collecte</h4>
                <p className="text-sm text-slate-600">Les éco-organismes organisent la collecte dans toute la France</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-6">
                <div className="mb-3 text-3xl font-bold text-blue-700">3</div>
                <h4 className="mb-2 font-semibold text-slate-900">Traitement</h4>
                <p className="text-sm text-slate-600">
                  Les DEEE sont recyclés et les matériaux récupérés sont réutilisés
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-blue-50 border-2 border-blue-200 p-6">
              <p className="text-slate-700">
                <strong>Résultat :</strong> Grâce à la REP, la France recycle 45% de ses déchets électroniques, soit
                plus du double de la moyenne mondiale (20%). C'est gratuit pour les consommateurs !
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Recycling Actors */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">
            Les acteurs du recyclage en France
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {recyclingActors.map((actor, index) => {
              const Icon = actor.icon
              return (
                <Card key={index} className={`border-2 border-${actor.color}-500 bg-${actor.color}-50 p-6 lg:p-8`}>
                  <div className="mb-6 flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-${actor.color}-600`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-medium text-slate-600">{actor.type}</div>
                      <h3 className="text-xl font-bold text-slate-900">{actor.name}</h3>
                    </div>
                  </div>

                  <p className="mb-6 text-slate-700">{actor.description}</p>

                  <div className="mb-6">
                    <h4 className="mb-3 text-sm font-semibold text-slate-900">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {actor.services.map((service, idx) => (
                        <span
                          key={idx}
                          className={`rounded-full bg-${actor.color}-100 px-3 py-1 text-xs font-medium text-${actor.color}-800`}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-200 pt-4">
                    <a
                      href={actor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm font-medium text-${actor.color}-700 hover:text-${actor.color}-800`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {actor.website.replace("https://", "")}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4" />
                      {actor.phone}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Collection Points Map */}
      <section className="bg-slate-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 lg:text-4xl">
            Trouver un point de collecte près de chez vous
          </h2>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Rechercher une ville ou une région..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-lg"
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Map Placeholder */}
            <Card className="border-2 border-slate-200 p-6 lg:p-8">
              <div className="flex h-[500px] items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="text-center">
                  <MapPin className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
                  <p className="mb-2 text-lg font-semibold text-slate-900">Carte interactive</p>
                  <p className="mb-4 text-sm text-slate-600">Visualisation des 15 000+ points de collecte en France</p>
                  <p className="text-xs text-slate-500">Intégration API Ecosystem à venir</p>
                </div>
              </div>
            </Card>

            {/* City List */}
            <div className="space-y-3">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Principales villes</h3>
              <div className="max-h-[500px] space-y-3 overflow-y-auto">
                {filteredCities.map((point, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer border-2 p-4 transition-all hover:shadow-md ${
                      selectedCity === point.city
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setSelectedCity(point.city)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                          <MapPin className="h-5 w-5 text-emerald-700" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{point.city}</div>
                          <div className="text-sm text-slate-600">{point.region}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-700">{point.points}</div>
                        <div className="text-xs text-slate-600">points</div>
                      </div>
                    </div>
                    {selectedCity === point.city && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                        {point.types.map((type, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-emerald-50 border-2 border-emerald-200 p-4">
                <p className="text-sm text-slate-700">
                  <strong>Astuce :</strong> Vous pouvez aussi rapporter vos anciens appareils directement en magasin
                  lors de l'achat d'un nouvel équipement (reprise 1 pour 1).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Can Be Recycled */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">Que peut-on recycler ?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {recyclableItems.map((category, index) => (
              <Card key={index} className="border-2 border-slate-200 p-6">
                <div className="mb-4 text-4xl">{category.icon}</div>
                <h3 className="mb-4 text-lg font-bold text-slate-900">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 border-2 border-blue-200 p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
              <div>
                <p className="mb-2 font-semibold text-slate-900">Règle générale</p>
                <p className="text-slate-700">
                  Tout appareil fonctionnant à l'électricité ou avec des piles/batteries peut être recyclé. En cas de
                  doute, rapportez-le dans un point de collecte qui saura vous orienter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Prepare */}
      <section className="bg-slate-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">
            Comment préparer vos appareils
          </h2>
          <div className="space-y-4">
            <Card className="border-2 border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">Sauvegarder vos données</h3>
                  <p className="text-sm text-slate-600">
                    Transférez vos photos, documents et fichiers importants sur un autre support avant de vous séparer
                    de votre appareil.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">Effacer vos données personnelles</h3>
                  <p className="text-sm text-slate-600">
                    Réinitialisez votre appareil aux paramètres d'usine pour supprimer toutes vos informations
                    personnelles et comptes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">Retirer les cartes SIM et mémoire</h3>
                  <p className="text-sm text-slate-600">
                    N'oubliez pas de retirer votre carte SIM, carte SD et tout autre accessoire personnel.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-lg font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">Apporter au point de collecte</h3>
                  <p className="text-sm text-slate-600">
                    Déposez votre appareil dans un point de collecte agréé. C'est gratuit et vous contribuez à
                    l'économie circulaire !
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">Prêt à recycler vos appareils ?</h2>
          <p className="mb-8 text-lg text-emerald-50">
            Trouvez le point de collecte le plus proche de chez vous et donnez une seconde vie à vos équipements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
              <MapPin className="mr-2 h-5 w-5" />
              Trouver un point de collecte
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Télécharger le guide
            </Button>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Sources</h3>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <span>Ecosystem - Rapport annuel (2023)</span>
            <span>•</span>
            <span>Écologic - Données collecte (2023)</span>
            <span>•</span>
            <span>ADEME - Filière REP DEEE (2024)</span>
          </div>
        </div>
      </section>
    </div>
  )
}

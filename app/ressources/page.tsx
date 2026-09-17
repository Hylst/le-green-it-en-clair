"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, FileText, BookOpen, Video, Search, Play, ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { VideoEmbed } from "@/components/video-embed"
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
        size: "5 min",
        link: "/fiches-pratiques/gestes-quotidiens",
      },
      {
        title: "Guide d'achat responsable",
        description: "Choisir un appareil avec moins d'impact",
        type: "Fiche pratique",
        size: "10 min",
        link: "/fiches-pratiques/achat-responsable",
      },
      {
        title: "Écoconception web et logicielle",
        description: "Bonnes pratiques pour développeurs",
        type: "Fiche pratique",
        size: "15 min",
        link: "/fiches-pratiques/ecoconception-web",
      },
      {
        title: "Toutes les fiches pratiques",
        description: "Accédez à l'ensemble de nos guides téléchargeables",
        type: "Collection",
        size: "15 fiches",
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
        size: "Étude",
        link: "https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html",
      },
      {
        title: "Global E-Waste Monitor 2024",
        description: "ONU - Données mondiales",
        type: "PDF",
        size: "Rapport",
        link: "https://ewastemonitor.info/",
      },
      {
        title: "Empreinte environnementale du numérique mondial",
        description: "GreenIT - Étude EENM (mise à jour 2025)",
        type: "PDF",
        size: "Étude",
        link: "https://www.greenit.fr/etude-empreinte-environnementale-du-numerique-mondial/",
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
        description: "Le parcours complet en 5 phases, chiffres sourcés",
        type: "PAGE",
        size: "Interactive",
        link: "/comprendre",
      },
      {
        title: "Répartition de l'impact CO₂",
        description: "Graphiques et données sourcées (fabrication, usage, transport)",
        type: "PAGE",
        size: "Interactive",
        link: "/chiffres",
      },
      {
        title: "Carte interactive des points de collecte",
        description: "Carte dynamique France métropolitaine",
        type: "WEB",
        size: "Interactive",
        link: "/recyclage",
      },
    ],
  },
]

/* Vidéos vérifiées à la main le 17/09/2026 : collection « Sobriété numérique »
   (Fondation UVED avec le soutien d’Alt IMPACT, 21 vidéos, mise en ligne le 05/02/2026).
   Licence CC BY-NC-SA (UVED) : attribution obligatoire, rappelée sous chaque vidéo. */
const featuredVideo = {
  title: "Le numérique : des impacts environnementaux multiples",
  author: "Anne-Cécile Orgerie, directrice de recherche au CNRS · 00:08:22",
  duration: "00:08:22",
  pageUrl: "https://www.canal-u.tv/chaines/canal-uved/le-numerique-des-impacts-environnementaux-multiples",
  embedUrl: "https://www.canal-u.tv/chaines/canal-uved/embed/169865?t=0",
  posterUrl: "https://vod.canal-u.tv/videos/2026/01/110133/sobnum_2_orgerie1.jpg",
  license: "Canal-U / UVED, CC BY-NC-SA",
  relatedHref: "/comprendre",
  relatedLabel: "Le cycle de vie, en interactif",
}

const videos = [
  {
    title: "Les données, une matière intangible aux impacts bien concrets !",
    author: "Didier Mallarino, ingénieur de recherche au CNRS",
    duration: "00:09:12",
    date: "23/01/2026",
    pageUrl: "https://www.canal-u.tv/chaines/canal-uved/les-donnees-une-matiere-intangible-aux-impacts-bien-concrets",
    relatedHref: "/fiches-pratiques/emails-cloud",
    relatedLabel: "Fiche e-mails et cloud",
  },
  {
    title: "Comment éco-concevoir un logiciel ?",
    author: "Georges Da Costa, professeur à l’université de Toulouse",
    duration: "00:09:18",
    date: "23/01/2026",
    pageUrl: "https://www.canal-u.tv/chaines/canal-uved/comment-eco-concevoir-un-logiciel",
    relatedHref: "/fiches-pratiques/ecoconception-web",
    relatedLabel: "Fiche écoconception web",
  },
  {
    title: "Les impacts environnementaux de l’intelligence artificielle",
    author: "Anne-Laure Ligozat, professeure à l’ensIIE",
    duration: "00:06:18",
    date: "22/01/2026",
    pageUrl: "https://www.canal-u.tv/chaines/canal-uved/les-impacts-environnementaux-de-l-intelligence-artificielle",
    relatedHref: "/fiches-pratiques/ia-generative",
    relatedLabel: "Fiche IA générative",
  },
  {
    title: "Les enjeux d’un numérique soutenable",
    author: "Benjamin Ninassi, Inria (programme Numérique et environnement)",
    duration: "00:11:00",
    date: "12/01/2026",
    pageUrl: "https://www.canal-u.tv/chaines/canal-uved/les-enjeux-d-un-numerique-soutenable",
    relatedHref: "/par-ou-commencer",
    relatedLabel: "Par où commencer",
  },
  {
    title: "Le droit au service de la sobriété numérique",
    author: "Thomas Le Goff, maître de conférences à Télécom Paris",
    duration: "00:06:12",
    date: "14/01/2026",
    pageUrl: "https://www.canal-u.tv/chaines/canal-uved/le-droit-au-service-de-la-sobriete-numerique",
    relatedHref: "/reglementation",
    relatedLabel: "La réglementation",
  },
]

const externalLinks = [  {
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
    term: "Scope 1, 2, 3",
    definition:
      "Périmètres de comptabilité carbone : scope 1 = émissions directes, scope 2 = énergie achetée, scope 3 = toutes les autres émissions indirectes (achats, déplacements, usage des produits vendus).",
    category: "Méthode",
  },
  {
    term: "Effet rebond",
    definition:
      "Situation où les gains d'efficacité d'une technologie sont annulés par la hausse des usages qu'elle permet (ex. un réseau plus efficace qui transporte beaucoup plus de données).",
    category: "Concept",
  },
  {
    term: "WUE",
    definition:
      "Water Usage Effectiveness. Indicateur de consommation d'eau des datacenters (litres d'eau par kWh consommé par les équipements informatiques).",
    category: "Datacenters",
  },
  {
    term: "EENM",
    definition:
      "Empreinte Environnementale du Numérique Mondial, étude de référence publiée par l'association Green IT (édition 2025 : 3,4 % des émissions mondiales, 1,8 Gt CO₂e).",
    category: "Général",
  },
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
      "Power Usage Effectiveness. Indicateur d'efficacité énergétique des datacenters. Un PUE de 1,0 est parfait ; 2,0 signifie que la moitié de l'énergie consommée part dans le refroidissement et la distribution.",
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
      "Appareil d'occasion remis en état de fonctionnement, testé et garanti. Réduit l'impact d'environ 75 à 90 % par rapport au neuf (ADEME, 2022).",
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
    term: "Indice de durabilité",
    definition:
      "Note sur 10 qui remplace progressivement l'indice de réparabilité : téléviseurs début 2025, lave-linge depuis avril 2025. Il ajoute des critères de fiabilité.",
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
  {
    term: "MIPS",
    definition:
      "Material Input Per Service : méthode qui compte toute la matière mobilisée pour un produit, au-delà de son poids final. Un smartphone de 150 g correspond à environ 70 kg de matières premières (SDES, 2025).",
    category: "Méthode",
  },
  {
    term: "RGESN",
    definition:
      "Référentiel général d'écoconception de services numériques (INR, ANCT). 78 pratiques pour concevoir des services numériques plus sobres, utilisées par les services publics.",
    category: "Pratique",
  },
  {
    term: "GR491",
    definition:
      "Guide de référence de conception responsable de services numériques publié par l'INR : 491 critères pour les équipes projet (gr491.isit-europe.org).",
    category: "Pratique",
  },
  {
    term: "IA frugale",
    definition:
      "Approche de l'intelligence artificielle qui limite les ressources mobilisées (données, calcul, énergie). Cadrée en France par le référentiel AFNOR et le RGESN.",
    category: "Pratique",
  },
  {
    term: "Étiquette énergie UE",
    definition:
      "Étiquette obligatoire sur les smartphones et tablettes vendus dans l'UE depuis juin 2025 (règlement 2023/1669) : efficacité, autonomie, résistance et facilité de réparation.",
    category: "Réglementation",
  },
  {
    term: "CSRD",
    definition:
      "Corporate Sustainability Reporting Directive : directive européenne de reporting de durabilité. Son périmètre a été resserré par l'Omnibus I (2026) : entreprises de plus de 1 000 salariés et 450 M€ de chiffre d'affaires.",
    category: "Réglementation",
  },
  {
    term: "Obsolescence logicielle",
    definition:
      "Fin du support logiciel d'un appareil (mises à jour de sécurité, versions d'OS), qui pousse au renouvellement alors que le matériel fonctionne encore.",
    category: "Réglementation",
  },
  {
    term: "Réemploi",
    definition:
      "Fait de donner une seconde vie à un appareil encore fonctionnel (don, vente d'occasion), sans passer par le recyclage. Avec la réparation, c'est la priorité avant le recyclage : un appareil réemployé évite une fabrication neuve.",
    category: "Pratique",
    link: { label: "Où donner et réparer", href: "/recyclage" },
  },
  {
    term: "Bonus réparation",
    definition:
      "Aide déduite directement de la facture chez un réparateur labellisé QualiRépar : de 10 à 65 € selon l'appareil, dont 25 € pour un smartphone (ADEME).",
    category: "Réglementation",
    link: { label: "Fiche réparer et prolonger", href: "/fiches-pratiques/reparer-prolonger" },
  },
  {
    term: "Free cooling",
    definition:
      "Refroidissement d'un datacenter par l'air extérieur plutôt que par climatisation, quand le climat le permet. Un des leviers qui font baisser le PUE sous 1,3.",
    category: "Datacenters",
    link: { label: "Comprendre le PUE en 5 minutes", href: "/blog/comprendre-le-pue-en-5-minutes" },
  },
  {
    term: "Garantie légale de conformité",
    definition:
      "Garantie de 2 ans qui couvre tout appareil vendu en France, neuf comme reconditionné, avec présomption de défaut pendant 24 mois. Depuis juillet 2026, une réparation sous garantie la prolonge de 12 mois.",
    category: "Réglementation",
    link: { label: "Guide d'achat responsable", href: "/fiches-pratiques/achat-responsable" },
  },
  {
    term: "Taux de collecte",
    definition:
      "Part des e-déchets effectivement collectés pour traitement, par rapport au gisement. En France, environ 46 % (ADEME 2024, Eurostat 2024) : plus de la moitié des appareils en fin de vie échappe encore à la filière.",
    category: "Réglementation",
    link: { label: "Les chiffres en détail", href: "/chiffres" },
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
    <div className="min-h-screen" data-theme="blue">
      <PageHero
        theme="blue"
        image={{ src: "/greenit/images/hero-ressources.webp", alt: "Livre ouvert rayonnant au milieu d'étagères et de documents" }}
        title="Ressources et documentation"
        intro="Guides pratiques, rapports, infographies et liens utiles pour approfondir vos connaissances sur le Green IT et le numérique responsable."
      />

      {/* Downloadable Resources */}
      <section className="px-6 py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            À lire et à consulter
          </h2>
          <div className="space-y-12">
            {resources.map((category, catIndex) => {
              const Icon = category.icon
              return (
                <div key={catIndex}>
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10`}
                    >
                      <Icon className={`h-5 w-5 text-primary`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{category.category}</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        className="border border-border p-6 transition-all hover:shadow-lg bg-card"
                      >
                        <div className="mb-4">
                          <h4 className="mb-2 font-semibold text-card-foreground">{item.title}</h4>
                          <p className="mb-3 text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="rounded bg-secondary px-2 py-1 font-medium">
                              {item.type}
                            </span>
                            {item.size && <span>{item.size}</span>}
                          </div>
                        </div>
                        {typeof item.link === "string" && item.link.length > 0 ? (
                          item.link.startsWith("http") ? (
                            <Button
                              asChild
                                size="sm"
                                className="w-full bg-primary hover:bg-primary/90"
                              >
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Voir le rapport
                              </a>
                            </Button>
                          ) : (
                            <Button
                              asChild
                                size="sm"
                                className="w-full bg-primary hover:bg-primary/90"
                              >
                              <Link href={item.link}>
                                <FileText className="mr-2 h-4 w-4" />
                                Consulter
                              </Link>
                            </Button>
                          )
                        ) : (
                          <Button
                            size="sm"
                            className="w-full bg-muted text-muted-foreground"
                            disabled
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Bientôt disponible
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

      {/* Videos : collection Canal-U vérifiée, lecture au clic */}
      <section className="px-6 py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Vidéos : la sobriété numérique expliquée par des chercheurs
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Collection « Sobriété numérique » (Fondation UVED avec le soutien d’Alt IMPACT, 21 vidéos).
            La lecture ne charge la vidéo qu’au clic. Contenus sous licence CC BY-NC-SA, ils restent
            la propriété de leurs auteurs.
          </p>
          <div className="grid gap-10 lg:grid-cols-2">
            <VideoEmbed
              title={featuredVideo.title}
              author={featuredVideo.author}
              duration={featuredVideo.duration}
              pageUrl={featuredVideo.pageUrl}
              embedUrl={featuredVideo.embedUrl}
              posterUrl={featuredVideo.posterUrl}
              license={featuredVideo.license}
            />
            <div className="flex flex-col justify-center gap-3">
              <Button asChild variant="outline" className="w-fit">
                <Link href={featuredVideo.relatedHref}>
                  <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                  {featuredVideo.relatedLabel}
                </Link>
              </Button>
              <a
                href="https://www.canal-u.tv/chaines/canal-uved/sobriete-numerique"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center text-sm font-semibold text-primary hover:underline"
              >
                Toute la collection sur Canal-U (21 vidéos)
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.pageUrl} className="flex flex-col border border-border bg-card p-6">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {video.duration} · {video.date}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">{video.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{video.author}</p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href={video.pageUrl} target="_blank" rel="noopener noreferrer">
                      Regarder sur Canal-U
                      <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={video.relatedHref}>
                      {video.relatedLabel}
                      <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="bg-secondary/5 px-6 py-16 lg:py-24">        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Liens utiles
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {externalLinks.map((link, index) => (
              <Card
                key={index}
                className="border border-border p-6 transition-all hover:shadow-lg bg-card"
              >
                <div className="mb-2 text-xs font-medium text-muted-foreground">{link.category}</div>
                <h3 className="mb-2 text-lg font-bold text-card-foreground">{link.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{link.description}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                >
                  Visiter le site
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="glossaire" className="px-6 py-16 lg:py-24 bg-background scroll-mt-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground lg:text-4xl">
            Glossaire du Green IT
          </h2>
          <p className="mb-12 text-center text-lg text-muted-foreground">
            Tous les termes essentiels pour comprendre le numérique responsable
          </p>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un terme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border"
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
              <Card
                key={index}
                id={`terme-${item.term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}`}
                className="scroll-mt-16 border border-border p-6 bg-card"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-card-foreground">{item.term}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.definition}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {item.link.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </Card>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Aucun terme trouvé pour "{searchTerm}". Essayez un autre mot-clé.
              </p>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-muted-foreground">
            {filteredGlossary.length} terme{filteredGlossary.length > 1 ? "s" : ""} affiché
            {filteredGlossary.length > 1 ? "s" : ""} sur {glossaryData.length}
          </div>
        </div>
      </section>
    </div>
  )
}

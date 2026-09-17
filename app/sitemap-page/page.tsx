import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, BookOpen, AlertCircle, Zap, FolderOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Plan du site",
  alternates: { canonical: "https://hylst.fr/greenit/sitemap-page" },
  openGraph: pageOpenGraph("Plan du site | Le Green IT en clair", "Plan du site : toutes les pages du Green IT en clair, classées par thème.", "/sitemap-page"),
}

export default function SitemapPage() {
  const siteStructure = [
    {
      category: "Accueil",
      icon: Home,
      pages: [{ href: "/", label: "Page d'accueil", description: "Introduction au Green IT et parcours utilisateurs" }],
    },
    {
      category: "Découvrir",
      icon: BookOpen,
      pages: [
        {
          href: "/comprendre",
          label: "Comprendre le cycle de vie",
          description: "Visualisation interactive du cycle de vie des équipements",
        },
        {
          href: "/problematiques",
          label: "Problématiques & Solutions",
          description: "Enjeux du numérique et solutions disponibles",
        },
        { href: "/chiffres", label: "Chiffres & Données", description: "Statistiques et visualisations interactives" },
        { href: "/cas-pratiques", label: "Cas pratiques", description: "Études de cas détaillées par type d'appareil" },
        { href: "/mythes", label: "Mythes vs Réalités", description: "12 idées reçues passées au crible" },
        { href: "/actualites", label: "Dossiers et veille", description: "Dossiers thématiques, veille RSS et annuaire de sources" },
        { href: "/blog", label: "Blog", description: "Retours d’expérience, calculs expliqués et décryptages" },
        { href: "/blog/premier-audit-green-it-pme", label: "Audit Green IT en PME", description: "La méthode en 4 étapes" },
        { href: "/blog/reconditionne-vs-neuf-le-calcul", label: "Reconditionné ou neuf", description: "Le calcul sans jargon" },
        { href: "/blog/comprendre-le-pue-en-5-minutes", label: "Comprendre le PUE", description: "5 minutes et trois bonnes questions" },
        { href: "/blog/agec-reen-ce-qui-change", label: "AGEC et REEN", description: "Ce qui change pour vous" },
        { href: "/blog/un-an-avec-un-smartphone-reparable", label: "Un an avec un smartphone réparable", description: "Carnet de bord" },
        { href: "/blog/back-market-portrait-reconditionne", label: "Back Market : portrait", description: "Le reconditionné à grande échelle" },
        { href: "/faq", label: "FAQ", description: "Réponses aux questions fréquentes" },
      ],
    },
    {
      category: "Agir",
      icon: Zap,
      pages: [
        {
          href: "/agir",
          label: "Comment agir",
          description: "Guides d'actions pour citoyens, entreprises et collectivités",
        },
        {
          href: "/recyclage",
          label: "Recyclage & Réparation",
          description: "Réseau de points de collecte et acteurs du recyclage",
        },
        { href: "/outils", label: "Outils interactifs", description: "Calculateur d'empreinte, simulateur et quiz" },
        {
          href: "/par-ou-commencer",
          label: "Par où commencer",
          description: "Parcours guidés selon votre profil",
        },
        {
          href: "/fiches-pratiques",
          label: "Fiches pratiques",
          description: "15 fiches détaillées par thème",
        },
        { href: "/fiches-pratiques/gestes-quotidiens", label: "Gestes quotidiens", description: "7 gestes pour un numérique sobre" },
        { href: "/fiches-pratiques/achat-responsable", label: "Achat responsable", description: "Choisir un appareil avec moins d'impact" },
        { href: "/fiches-pratiques/ecoconception-web", label: "Écoconception web", description: "Bonnes pratiques pour développeurs" },
        { href: "/fiches-pratiques/reparer-prolonger", label: "Réparer et prolonger", description: "Entretien et adresses utiles" },
        { href: "/fiches-pratiques/green-it-entreprise", label: "Green IT en entreprise", description: "Plan d'action pour les organisations" },
        { href: "/fiches-pratiques/recyclage-mode-emploi", label: "Recyclage mode d'emploi", description: "Où et comment recycler" },
        { href: "/fiches-pratiques/datacenters-verts", label: "Datacenters et cloud", description: "Choisir ses hébergeurs" },
        { href: "/fiches-pratiques/collectivites-action", label: "Collectivités", description: "Politique numérique responsable territoriale" },
        { href: "/fiches-pratiques/ia-generative", label: "IA générative", description: "Comprendre et limiter l'impact de l'IA" },
        { href: "/fiches-pratiques/streaming-video", label: "Streaming et gaming", description: "Qualité, téléchargement, lecture auto" },
        { href: "/fiches-pratiques/teletravail-visio", label: "Télétravail et visio", description: "Caméra, réseau, poste de travail" },
        { href: "/fiches-pratiques/emails-cloud", label: "E-mails et cloud", description: "Pièces jointes, tri, hébergeurs" },
        { href: "/fiches-pratiques/objets-connectes", label: "Objets connectés", description: "Choisir, sécuriser, faire durer" },
        { href: "/fiches-pratiques/impression-papier", label: "Impression", description: "Imprimer moins, imprimer mieux" },
        { href: "/fiches-pratiques/enfants-ecole", label: "Enfants et écrans", description: "Repères pour toute la famille" },
      ],
    },
    {
      category: "Approfondir",
      icon: AlertCircle,
      pages: [
        { href: "/datacenters", label: "Datacenters verts", description: "Efficacité énergétique et bonnes pratiques" },
        {
          href: "/developpement",
          label: "Développement éco-responsable",
          description: "Guide pour développeurs et concepteurs d'applications",
        },
        { href: "/reglementation", label: "Réglementation", description: "Normes et lois en France et en Europe" },
        {
          href: "/perspectives",
          label: "Perspectives d'avenir",
          description: "Scénarios futurs et solutions à développer",
        },
        { href: "/guide", label: "Guide du numérique responsable", description: "Les bons réflexes au quotidien" },
      ],
    },
    {
      category: "Plus",
      icon: FolderOpen,
      pages: [
        { href: "/ressources", label: "Ressources", description: "Guides, liens utiles et glossaire" },
        {
          href: "/modeles",
          label: "Modèles téléchargeables",
          description: "Charte, politique, audit, plan d'action, achats",
        },
        { href: "/modeles/cahier-charges-achat", label: "Cahier des charges achat", description: "Critères d'achat durable" },
        { href: "/modeles/charte-green-it", label: "Charte Green IT", description: "Engagements à adapter" },
        { href: "/modeles/grille-audit", label: "Grille d'audit", description: "26 critères notés" },
        { href: "/modeles/guide-sensibilisation", label: "Guide de sensibilisation", description: "Kit d'animation" },
        { href: "/modeles/plan-action-dsi", label: "Plan d'action DSI", description: "Feuille de route" },
        { href: "/modeles/politique-numerique", label: "Politique numérique", description: "Cadre et objectifs" },
        { href: "/modeles/tableau-bord-impact", label: "Tableau de bord", description: "Suivi d'impact" },
        { href: "/a-propos", label: "À propos", description: "Mission, valeurs et méthodologie du projet" },
        { href: "/sitemap-page", label: "Plan du site", description: "Cette page" },
        { href: "/mentions-legales", label: "Mentions légales", description: "Éditeur, données et hébergement" },
        { href: "/offline", label: "Page hors ligne", description: "Consultable sans connexion (PWA)" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Plan du site
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Naviguez facilement à travers toutes les sections du site Le Green IT en clair
            </p>
          </div>

          <div className="space-y-6">
            {siteStructure.map((section) => {
              const Icon = section.icon
              return (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.pages.map((page) => (
                        <Link
                          key={page.href}
                          href={page.href}
                          className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-all hover:border-emerald-400 hover:shadow-md"
                        >
                          <div className="font-semibold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400">{page.label}</div>
                          <div className="text-sm text-muted-foreground">{page.description}</div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800">
              <CardContent className="py-6">
                <p className="text-foreground mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                  >
                    <Home className="w-4 h-4" />
                    Retour à l'accueil
                  </Link>
                  <a
                    href="mailto:geoffroy.streit@gmail.com"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-600 px-6 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
                  >
                    Nous contacter
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

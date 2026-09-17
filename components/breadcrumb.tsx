"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import { JsonLd } from "@/components/json-ld"
import { SITE_URL } from "@/lib/metadata"

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbMap: Record<string, string> = {
    "par-ou-commencer": "Par où commencer",
    comprendre: "Comprendre",
    problematiques: "Problématiques",
    mythes: "Mythes vs Réalités",
    reglementation: "Réglementation",
    chiffres: "Chiffres & Données",
    "cas-pratiques": "Cas pratiques",
    agir: "Comment agir",
    datacenters: "Datacenters",
    developpement: "Développement",
    recyclage: "Recyclage",
    perspectives: "Perspectives",
    outils: "Outils",
    ressources: "Ressources",
    "a-propos": "À propos",
    actualites: "Dossiers et veille",
    blog: "Blog",
    "premier-audit-green-it-pme": "Premier audit Green IT en PME",
    "reconditionne-vs-neuf-le-calcul": "Reconditionné ou neuf",
    "comprendre-le-pue-en-5-minutes": "Comprendre le PUE",
    "agec-reen-ce-qui-change": "AGEC et REEN",
    "un-an-avec-un-smartphone-reparable": "Un an avec un smartphone réparable",
    "back-market-portrait-reconditionne": "Back Market : portrait",
    "que-consomme-vraiment-votre-box": "Que consomme votre box ?",
    faq: "FAQ",
    "fiches-pratiques": "Fiches pratiques",
    "sitemap-page": "Plan du site",
    guide: "Guide",
    "mentions-legales": "Mentions légales",
    offline: "Hors-ligne",
    "gestes-quotidiens": "Gestes quotidiens",
    "achat-responsable": "Achat responsable",
    "ecoconception-web": "Écoconception web",
    "reparer-prolonger": "Réparer et prolonger",
    "green-it-entreprise": "Green IT en entreprise",
    "recyclage-mode-emploi": "Recyclage mode d'emploi",
    "datacenters-verts": "Datacenters et cloud",
    "collectivites-action": "Collectivités",
    "plan-action-dsi": "Plan d'action DSI",
    "politique-numerique": "Politique numérique",
    "grille-audit": "Grille d'audit",
    "cahier-charges-achat": "Cahier des charges",
    "guide-sensibilisation": "Guide de sensibilisation",
    "tableau-bord-impact": "Tableau de bord",
    "charte-green-it": "Charte Green IT",
    modeles: "Modèles téléchargeables",
  }

  const items = [
    { name: "Accueil", item: `${SITE_URL}/` },
    ...segments.map((segment, index) => ({
      name: breadcrumbMap[segment] || segment.replace(/-/g, " "),
      item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}/`,
    })),
  ]
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav
        aria-label="Fil d'Ariane"
      >
      <div className="container mx-auto px-4 py-3">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors link-slide"
            >
              <Home className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
          </li>
          {segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`
            const label = breadcrumbMap[segment] || segment.replace(/-/g, " ")
            const isLast = index === segments.length - 1

            return (
              <li key={href} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {isLast ? (
                  <span suppressHydrationWarning className="break-words font-medium text-primary">{label}</span>
                ) : (
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors link-slide"
                  >
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
      </nav>
    </>
  )
}

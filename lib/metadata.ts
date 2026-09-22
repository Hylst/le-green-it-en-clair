import { SITE_URL, SITE_NAME } from "./site"

// Réexportés pour les consommateurs existants (breadcrumb, JSON-LD...) :
// la source unique reste lib/site.ts.
export { SITE_URL, SITE_NAME } from "./site"
export const SITE_DESCRIPTION =
  "Découvrez l'impact environnemental du numérique et adoptez des pratiques responsables. Informations, outils interactifs et ressources pour un Green IT en France."

export function pageOpenGraph(title: string, description: string, path: string) {
  return {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website" as const,
    images: [
      {
        url: `${SITE_URL}/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Le Green IT en clair - Écologie Numérique",
      },
    ],
  }
}

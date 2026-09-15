import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hylst.fr/greenit'
    const routes = [
        '',
        '/comprendre',
        '/agir',
        '/outils',
        '/faq',
        '/a-propos',
        '/actualites',
        '/cas-pratiques',
        '/chiffres',
        '/datacenters',
        '/developpement',
        '/fiches-pratiques',
        '/fiches-pratiques/gestes-quotidiens',
        '/fiches-pratiques/achat-responsable',
        '/fiches-pratiques/ecoconception-web',
        '/fiches-pratiques/reparer-prolonger',
        '/fiches-pratiques/green-it-entreprise',
        '/fiches-pratiques/recyclage-mode-emploi',
        '/fiches-pratiques/datacenters-verts',
        '/fiches-pratiques/collectivites-action',
        '/guide',
        '/mentions-legales',
        '/modeles',
        '/mythes',
        '/par-ou-commencer',
        '/perspectives',
        '/problematiques',
        '/recyclage',
        '/reglementation',
        '/ressources',
        '/sitemap-page',
        '/modeles/cahier-charges-achat',
        '/modeles/charte-green-it',
        '/modeles/grille-audit',
        '/modeles/guide-sensibilisation',
        '/modeles/plan-action-dsi',
        '/modeles/politique-numerique',
        '/modeles/tableau-bord-impact',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}/`,
        lastModified: '2026-09-15',
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}

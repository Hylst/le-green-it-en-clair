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
        '/offline',
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
        lastModified: '2026-09-13',
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}

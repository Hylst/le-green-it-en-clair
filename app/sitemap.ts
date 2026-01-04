import { MetadataRoute } from 'next'

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
        '/flux-rss',
        '/mythes',
        '/par-ou-commencer',
        '/perspectives',
        '/problematiques',
        '/recyclage',
        '/reglementation',
        '/sitemap-page',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}

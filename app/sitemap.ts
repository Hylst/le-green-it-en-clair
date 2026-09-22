import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SITE_ROUTES } from '@/lib/site-structure'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL
    const routes = SITE_ROUTES

    return routes.map((route) => ({
        url: `${baseUrl}${route}/`,
        lastModified: '2026-09-22',
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}

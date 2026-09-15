"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Printer, Share2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/metadata"

interface SheetContentProps {
    sheet: any & { id?: string }
}

export function SheetContent({ sheet }: SheetContentProps) {
    const jsonLd = sheet.id
        ? {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: sheet.title,
              description: sheet.subtitle,
              inLanguage: "fr",
              author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              mainEntityOfPage: `${SITE_URL}/fiches-pratiques/${sheet.id}`,
          }
        : null

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {jsonLd && <JsonLd data={jsonLd} />}
            <article className="px-6 py-12">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 flex items-center justify-between">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/fiches-pratiques">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour aux fiches
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimer / PDF
                        </Button>
                    </div>

                <Card className="mb-8 border-2 border-slate-200 p-8 dark:border-slate-700 dark:bg-slate-800">
                    <div className="mb-4 flex items-center gap-3">
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                            {sheet.target}
                        </Badge>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{sheet.duration}</span>
                    </div>
                    <h1 className="mb-4 text-balance text-3xl font-bold text-slate-900 lg:text-4xl dark:text-slate-100">
                        {sheet.title}
                    </h1>
                    <p className="mb-6 text-pretty text-xl text-slate-600 dark:text-slate-300">{sheet.subtitle}</p>
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <p className="font-semibold text-emerald-800 dark:text-emerald-300">Impact : {sheet.impact}</p>
                    </div>
                </Card>

                <div className="space-y-8">
                    {sheet.sections.map((section: any, index: number) => (
                        <Card
                            key={index}
                            className="border-2 border-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800 print:break-inside-avoid"
                        >
                            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
                            <p className="mb-4 text-slate-700 dark:text-slate-300">{section.content}</p>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Points clés :</h3>
                                <ul className="space-y-2">
                                    {section.tips.map((tip: string, tipIndex: number) => (
                                        <li key={tipIndex} className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="mt-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50 p-6 dark:border-blue-800 dark:from-blue-950 dark:to-teal-950">
                    <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">Ressources complémentaires</h3>
                    <ul className="space-y-2">
                        {sheet.resources.map((resource: string, index: number) => {
                            let label = resource
                            let url: string | null = null
                            const sep = resource.indexOf(" : ")
                            if (sep > 0) {
                                const candidate = resource.slice(sep + 3).trim()
                                if (/^(https?:\/\/|\/)/.test(candidate)) {
                                    label = resource.slice(0, sep)
                                    url = candidate
                                } else if (/^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(candidate)) {
                                    label = resource.slice(0, sep)
                                    url = `https://${candidate}`
                                }
                            }
                            return (
                                <li key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                    {url && url.startsWith("http") ? (
                                        <a href={url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                                            {label}
                                        </a>
                                    ) : url ? (
                                        <Link href={url} className="hover:underline">
                                            {label}
                                        </Link>
                                    ) : (
                                        label
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </Card>

                {sheet.sources?.length > 0 && (
                    <Card className="mt-6 border-2 border-emerald-200 bg-emerald-50/50 p-6 dark:border-emerald-800 dark:bg-emerald-950/30">
                        <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">Sources</h3>
                        <ul className="space-y-2">
                            {sheet.sources.map((source: string, index: number) => (
                                <li key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                    {source}
                                </li>
                            ))}
                        </ul>
                    </Card>
                )}

                <div className="mt-8 flex items-center justify-center gap-4">
                    <Button variant="outline" size="lg" onClick={() => window.print()}>
                        <Printer className="mr-2 h-5 w-5" />
                        Imprimer cette fiche en PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={async () => {
                        try {
                          if (navigator.share) {
                            await navigator.share({ title: sheet.title, text: sheet.title })
                          } else {
                            await navigator.clipboard.writeText(window.location.href)
                          }
                        } catch {
                          // partage annulé ou indisponible, on ne fait rien
                        }
                      }}
                    >
                        <Share2 className="mr-2 h-5 w-5" />
                        Partager
                    </Button>
                </div>
        </div>
            </article >

        <style jsx global>{`
        @media print {
          nav,
          footer,
          button {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
        }
      `}</style>
        </div >
    )
}

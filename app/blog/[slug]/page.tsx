import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { SourceTooltip } from "@/components/source-tooltip"
import { RelatedLinks } from "@/components/related-links"
import { MoreDetails } from "@/components/more-details"
import {
  AuditChecklist,
  AgecTimeline,
  PueMiniCalc,
  ReconditionneCalc,
  ReparableQuiz,
} from "@/components/blog-widgets"
import { JsonLd } from "@/components/json-ld"
import { SITE_NAME, SITE_URL, pageOpenGraph } from "@/lib/metadata"
import { posts, type BlogWidgetKey } from "../posts"

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: "Blog" }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://hylst.fr/greenit/blog/${slug}` },
    openGraph: pageOpenGraph(`${post.title} | Le Green IT en clair`, post.excerpt, `/blog/${slug}`),
  }
}

const WIDGETS: Record<BlogWidgetKey, () => React.JSX.Element> = {
  "audit-checklist": AuditChecklist,
  "reconditionne-calc": ReconditionneCalc,
  "pue-mini-calc": PueMiniCalc,
  "agec-timeline": AgecTimeline,
  "reparable-quiz": ReparableQuiz,
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const Icon = post.icon
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    inLanguage: "fr",
    datePublished: "2026-09-17",
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }

  return (
    <div data-theme="orange" className="min-h-screen bg-background transition-colors duration-300">
      <JsonLd data={jsonLd} />
      <PageHero
        theme="orange"
        image={{ src: post.image, alt: post.imageAlt }}
        badge={{ icon: Icon, label: "Blog" }}
        title={post.title}
        intro={
          <>
            <p>{post.excerpt}</p>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readingTime} de lecture
              </span>
              <span>La rédaction</span>
            </p>
          </>
        }
      />

      <article className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <Button asChild variant="ghost" size="sm" className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Retour au blog
            </Link>
          </Button>

          <Card className="mb-10 border-2 border-theme bg-theme-soft p-6">
            <h2 className="mb-4 text-lg font-bold text-foreground">L’essentiel en 30 secondes</h2>
            <ul className="space-y-2">
              {post.essential.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-theme-ink"
                    aria-hidden="true"
                  />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-balance text-2xl font-bold text-foreground">{section.heading}</h2>
                <div className="space-y-4 leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-theme-ink"
                          aria-hidden="true"
                        />
                        <span className="text-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.fact && (
                  <div className="mt-6 rounded-xl border border-theme bg-theme-soft p-5">
                    <p className="flex items-start justify-between gap-2 text-3xl font-bold text-foreground">
                      <span>{section.fact.value}</span>
                      <SourceTooltip
                        source={section.fact.source}
                        calculation={section.fact.calculation}
                      />
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{section.fact.label}</p>
                  </div>
                )}
                {section.widget &&
                  (() => {
                    const Widget = WIDGETS[section.widget]
                    return (
                      <div className="mt-6">
                        <Widget />
                      </div>
                    )
                  })()}
                {section.details && (
                  <div className="mt-6 space-y-3">
                    {section.details.map((detail) => (
                      <MoreDetails key={detail.title} title={detail.title}>
                        {detail.paragraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </MoreDetails>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <Card className="mt-10 border-2 border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-bold text-foreground">À retenir</h2>
            <ul className="space-y-2">
              {post.takeaway.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-theme-ink" aria-hidden="true" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-8">
            <RelatedLinks links={post.related} />
          </div>

          <Card className="mt-8 border border-border bg-secondary/40 p-6">
            <h2 className="mb-3 text-base font-bold text-foreground">Sources</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {post.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </Card>
        </div>
      </article>
    </div>
  )
}

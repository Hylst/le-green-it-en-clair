import Link from "next/link"
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react"
import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { pageOpenGraph } from "@/lib/metadata"
import { posts } from "./posts"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Retours d’expérience, calculs expliqués et décryptages : le blog du Green IT en clair, avec sources et approfondissements dépliables.",
  alternates: { canonical: "https://hylst.fr/greenit/blog" },
  openGraph: pageOpenGraph(
    "Blog | Le Green IT en clair",
    "Retours d’expérience, calculs expliqués et décryptages du numérique responsable.",
    "/blog"
  ),
}

export default function BlogPage() {
  return (
    <div data-theme="orange" className="min-h-screen bg-background transition-colors duration-300">
      <PageHero
        theme="orange"
        badge={{ icon: Newspaper, label: "Retours d’expérience" }}
        title="Le blog Green IT"
        intro="Des récits concrets, des calculs expliqués pas à pas et des décryptages de la réglementation. Chaque article se lit en quelques minutes, avec ses sources et ses approfondissements à ouvrir au choix."
      />

      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => {
              const Icon = post.icon
              return (
                <Card
                  key={post.slug}
                  className="lift flex flex-col border-2 border-border bg-card p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-theme-soft text-theme-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readingTime} de lecture
                      </span>
                    </div>
                  </div>
                  <h2 className="mb-2 text-balance text-xl font-bold text-foreground">{post.title}</h2>
                  <p className="mb-6 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Button asChild variant="outline" className="w-fit">
                    <Link href={`/blog/${post.slug}`}>
                      Lire l’article
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </Card>
              )
            })}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            Tous les chiffres cités portent leur source et leur année, vérifiables dans l’infobulle qui les
            accompagne. Rédaction du site, relecture des données en septembre 2026.
          </p>
        </div>
      </section>
    </div>
  )
}

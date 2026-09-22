"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, HelpCircle, Search, ExternalLink, ArrowRight, Link2, Check } from "lucide-react"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { PageHero } from "@/components/page-hero"
import { canonical } from "@/lib/site"
import { faqCategories, faqSlug } from "./faq-data"


export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes")
  const [openQuestions, setOpenQuestions] = useState<string[]>([])
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const categories = ["Toutes", ...faqCategories.map((cat) => cat.category)]

  const filteredFAQ = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          (selectedCategory === "Toutes" || cat.category === selectedCategory) &&
          (q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    }))
    .filter((cat) => cat.questions.length > 0)

  const toggleQuestion = (categoryIndex: number, questionIndex: number, slug: string) => {
    const key = `${categoryIndex}-${questionIndex}`
    const willOpen = !openQuestions.includes(key)
    setOpenQuestions((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
    if (willOpen) window.history.replaceState(null, "", `#${slug}`)
    else window.history.replaceState(null, "", window.location.pathname)
  }

  // Lien profond /faq#mon-slug : copié dans le presse-papiers, avec repli.
  const copyQuestionLink = async (slug: string) => {
    const url = `${canonical("/faq")}#${slug}`
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(url)
      else throw new Error("presse-papiers indisponible")
    } catch {
      const area = document.createElement("textarea")
      area.value = url
      document.body.appendChild(area)
      area.select()
      document.execCommand("copy")
      document.body.removeChild(area)
    }
    setCopiedSlug(slug)
    window.setTimeout(() => setCopiedSlug((current) => (current === slug ? null : current)), 2000)
  }

  // Ouverture directe via #ancre (depuis un lien copié ou partagé).
  useEffect(() => {
    const slug = window.location.hash.slice(1)
    if (!slug) return
    for (let catIndex = 0; catIndex < faqCategories.length; catIndex++) {
      const qIndex = faqCategories[catIndex].questions.findIndex((entry) => faqSlug(entry.q) === slug)
      if (qIndex !== -1) {
        setSelectedCategory("Toutes")
        setSearchTerm("")
        setOpenQuestions([`${catIndex}-${qIndex}`])
        window.setTimeout(() => document.getElementById(slug)?.scrollIntoView({ block: "start" }), 100)
        return
      }
    }
  }, [])

  const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0)

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.questions.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      }))
    ),
  }

  return (
    <div data-theme="teal">
      <JsonLd data={faqJsonLd} />
    <div className="min-h-screen bg-secondary/30">
      <PageHero
        theme="teal"
        image={{ src: "/greenit/images/hero-faq.webp", alt: "Bulles de dialogue flottant au-dessus d'un ordinateur portable ouvert" }}
        badge={{ icon: HelpCircle }}
        title="Foire aux questions"
        intro={
          <>
            <p>Toutes les réponses à vos questions sur le Green IT, le numérique responsable et l'écologie numérique.</p>
            <p className="mt-4 text-sm">{totalQuestions} questions répondues</p>
          </>
        }
      />

      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedCategory === category}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory(category)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelectedCategory(category)
                    }
                  }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {filteredFAQ.length === 0 ? (
            <Card className="border-2 border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">
                Aucune question trouvée pour « {searchTerm} ». Essayez un autre mot-clé ou changez de catégorie.
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredFAQ.map((category, catIndex) => (
                <div key={catIndex}>
                  <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-foreground">
                    <div className={`h-2 w-2 rounded-full bg-${category.color}-600 dark:bg-${category.color}-400`} />
                    {category.category}
                    <Badge variant="secondary" className="text-xs">
                      {category.questions.length}
                    </Badge>
                  </h2>
                  <div className="space-y-3">
                    {category.questions.map((item, qIndex) => {
                      const isOpen = openQuestions.includes(`${catIndex}-${qIndex}`)
                      const slug = faqSlug(item.q)
                      return (
                        <Card
                          key={qIndex}
                          id={slug}
                          className="border-2 border-border bg-card overflow-hidden scroll-mt-24 transition-all hover:border-slate-300 dark:hover:border-slate-600"
                        >
                          <button
                            onClick={() => toggleQuestion(catIndex, qIndex, slug)}
                            aria-expanded={isOpen}
                            className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          >
                            <h3 className="flex-1 font-semibold text-foreground">{item.q}</h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="border-t border-border bg-secondary/30 px-6 py-4">
                              {item.display ? (
                                <div className="text-muted-foreground leading-relaxed space-y-3">
                                  <p>{item.display.intro}</p>
                                  <ul className="list-disc space-y-1.5 pl-5">
                                    {item.display.points.map((point, pointIndex) => (
                                      <li key={pointIndex}>{point}</li>
                                    ))}
                                  </ul>
                                  {item.display.outro && <p>{item.display.outro}</p>}
                                </div>
                              ) : (
                                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                              )}
                              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                                {item.link && (
                                  item.link.url.startsWith("http") ? (
                                    <a
                                      href={item.link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                                    >
                                      {item.link.label}
                                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                  ) : (
                                    <Link
                                      href={item.link.url}
                                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                                    >
                                      {item.link.label}
                                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </Link>
                                  )
                                )}
                                <button
                                  type="button"
                                  onClick={() => copyQuestionLink(slug)}
                                  aria-label={`Copier le lien vers la question : ${item.q}`}
                                  aria-live="polite"
                                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                  {copiedSlug === slug ? (
                                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                  ) : (
                                    <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                                  )}
                                  {copiedSlug === slug ? "Lien copié !" : "Copier le lien"}
                                </button>
                              </div>
                            </div>
                          )}
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Card className="mt-12 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 dark:border-emerald-800 dark:from-emerald-950 dark:to-teal-950">
            <h3 className="mb-4 text-xl font-bold text-foreground">
              Vous ne trouvez pas la réponse ?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Consultez nos ressources complètes ou contactez-nous pour obtenir plus d'informations sur le numérique
              responsable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/ressources">Voir les ressources</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/a-propos">Nous contacter</Link>
              </Button>
            </div>
          </Card>

          <Card className="mt-6 border border-border p-6">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Sources principales</h3>
            <p className="text-sm text-muted-foreground">
              ADEME (Base Empreinte, Base Carbone, Impact CO₂), ADEME-Arcep (2023), Global E-waste Monitor 2024 (ONU),
              Eurostat (2024), règlements européens 2023/1670, 2023/1669 et 2024/1799, loi AGEC (2020).
            </p>
          </Card>
        </div>
      </section>
    </div>
    </div>
  )
}

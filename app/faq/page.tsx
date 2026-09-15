"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { faqCategories } from "./faq-data"


export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes")
  const [openQuestions, setOpenQuestions] = useState<string[]>([])

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

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenQuestions((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

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
    <>
      <JsonLd data={faqJsonLd} />
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 px-6 py-16 lg:py-24 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
            <HelpCircle className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl dark:text-slate-100">
            Foire aux questions
          </h1>
          <p className="text-pretty text-lg text-slate-600 lg:text-xl dark:text-slate-300">
            Toutes les réponses à vos questions sur le Green IT, le numérique responsable et l'écologie numérique.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{totalQuestions} questions répondues</p>
        </div>
      </section>

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
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {filteredFAQ.length === 0 ? (
            <Card className="border-2 border-slate-200 p-12 text-center dark:border-slate-700 dark:bg-slate-800">
              <p className="text-slate-600 dark:text-slate-400">
                Aucune question trouvée pour « {searchTerm} ». Essayez un autre mot-clé ou changez de catégorie.
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredFAQ.map((category, catIndex) => (
                <div key={catIndex}>
                  <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
                    <div className={`h-2 w-2 rounded-full bg-${category.color}-600 dark:bg-${category.color}-400`} />
                    {category.category}
                    <Badge variant="secondary" className="text-xs">
                      {category.questions.length}
                    </Badge>
                  </h2>
                  <div className="space-y-3">
                    {category.questions.map((item, qIndex) => {
                      const isOpen = openQuestions.includes(`${catIndex}-${qIndex}`)
                      return (
                        <Card
                          key={qIndex}
                          className="border-2 border-slate-200 overflow-hidden transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                        >
                          <button
                            onClick={() => toggleQuestion(catIndex, qIndex)}
                            className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          >
                            <h3 className="flex-1 font-semibold text-slate-900 dark:text-slate-100">{item.q}</h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50">
                              <p className="text-slate-700 leading-relaxed dark:text-slate-300">{item.a}</p>
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
        </div>
      </section>
    </div>
    </>
  )
}

"use client"

import { useState } from "react"
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react"
import type { QuizQuestion } from "@/components/quiz-green-it-advanced"

export interface ErrorReviewItem {
  question: QuizQuestion
  selectedAnswer: number
  sessionIndex: number
}

export function ErrorReview({ items }: { items: ErrorReviewItem[] }) {
  const [open, setOpen] = useState<number[]>([])

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
        Sans faute, bravo !
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {items.map(({ question, selectedAnswer, sessionIndex }, index) => {
        const expanded = open.includes(index)
        return (
          <div
            key={`${sessionIndex}-${index}`}
            className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600"
          >
            <button
              onClick={() => setOpen(expanded ? open.filter((i) => i !== index) : [...open, index])}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-3 p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <span className="text-sm font-medium text-slate-900 dark:text-gray-100">{question.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {expanded && (
              <div className="space-y-2 border-t border-slate-200 p-3 text-sm dark:border-slate-600">
                <p className="flex items-start gap-2 text-red-700 dark:text-red-400">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {selectedAnswer === -1 ? "Non répondu" : `Votre réponse : ${question.options[selectedAnswer]}`}
                </p>
                <p className="flex items-start gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Bonne réponse : {question.options[question.correctAnswer]}
                </p>
                <p className="text-slate-600 dark:text-gray-300">{question.explanation}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Source : {question.source}
                  {question.sourceUrl ? (
                    <>
                      {" — "}
                      <a
                        href={question.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        Voir le texte officiel (nouvel onglet)
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

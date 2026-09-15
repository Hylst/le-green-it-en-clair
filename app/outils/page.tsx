"use client"

import { useState, type KeyboardEvent } from "react"
import dynamic from "next/dynamic"
import { Calculator, Lightbulb, TrendingUp, Cloud, ClipboardCheck, Globe, Brain } from "lucide-react"

function ToolLoader() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-border bg-card p-12">
      <p className="text-muted-foreground">Chargement de l'outil...</p>
    </div>
  )
}

const CarbonCalculator = dynamic(() => import("@/components/outils/carbon-calculator"), { ssr: false, loading: () => <ToolLoader /> })
const WebsiteCarbonCalculator = dynamic(() => import("@/components/website-carbon-calculator").then((m) => m.WebsiteCarbonCalculator), { ssr: false, loading: () => <ToolLoader /> })
const SobrietySimulator = dynamic(() => import("@/components/outils/sobriety-simulator"), { ssr: false, loading: () => <ToolLoader /> })
const QuizGreenITAdvanced = dynamic(() => import("@/components/quiz-green-it-advanced").then((m) => m.QuizGreenITAdvanced), { ssr: false, loading: () => <ToolLoader /> })
const EnterpriseSimulator = dynamic(() => import("@/components/outils/enterprise-simulator"), { ssr: false, loading: () => <ToolLoader /> })
const CloudComparator = dynamic(() => import("@/components/outils/cloud-comparator"), { ssr: false, loading: () => <ToolLoader /> })
const ITAudit = dynamic(() => import("@/components/outils/it-audit"), { ssr: false, loading: () => <ToolLoader /> })

export default function OutilsPage() {
  const [activeTab, setActiveTab] = useState<
    "calculator" | "simulator" | "quiz" | "website" | "enterprise" | "cloud" | "audit"
  >("calculator")

  // Navigation clavier des onglets (flèches, Home, End) : motif APG tabs
  const onTabListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'))
    const current = tabs.indexOf(document.activeElement as HTMLElement)
    if (current === -1) return
    let next = -1
    if (e.key === "ArrowRight") next = (current + 1) % tabs.length
    else if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = tabs.length - 1
    else return
    e.preventDefault()
    tabs[next].focus()
    tabs[next].click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:bg-gradient-to-b dark:from-green-900 dark:to-gray-900">
      <div className="bg-gradient-to-br from-emerald-700 to-teal-800 px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-950/70 backdrop-blur px-4 py-2 text-sm font-medium text-emerald-50">
              <Lightbulb className="h-4 w-4" />
              Espace Outils Interactifs
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6 text-balance">
              Mesurez, Simulez, Apprenez
            </h1>
            <p className="text-lg text-emerald-50 mb-8 max-w-3xl mx-auto text-pretty">
              Sept outils interactifs pour comprendre votre impact numérique, optimiser vos choix, et évaluer vos
              connaissances sur le Green IT avec des données 2025 sourcées.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12" role="tablist" aria-label="Outils interactifs" onKeyDown={onTabListKeyDown}>
            <button
              role="tab"
              id="onglet-calculator"
              aria-controls="outil-panel"
              tabIndex={activeTab === "calculator" ? 0 : -1}
              aria-selected={activeTab === "calculator"}
              onClick={() => setActiveTab("calculator")}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${activeTab === "calculator"
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 hover:shadow-md"
                }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${activeTab === "calculator"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
                  }`}
              >
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">Empreinte carbone</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">Calculez votre impact personnel</p>
              {activeTab === "calculator" && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-emerald-600 animate-pulse" />
              )}
            </button>

            <button
              role="tab"
              id="onglet-website"
              aria-controls="outil-panel"
              tabIndex={activeTab === "website" ? 0 : -1}
              aria-selected={activeTab === "website"}
              onClick={() => setActiveTab("website")}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${activeTab === "website"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 hover:shadow-md"
                }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${activeTab === "website"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
              >
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">Analyse de site web</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">Impact carbone d'une URL</p>
              {activeTab === "website" && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-blue-600 animate-pulse" />
              )}
            </button>

            <button
              role="tab"
              id="onglet-simulator"
              aria-controls="outil-panel"
              tabIndex={activeTab === "simulator" ? 0 : -1}
              aria-selected={activeTab === "simulator"}
              onClick={() => setActiveTab("simulator")}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${activeTab === "simulator"
                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-lg"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-300 hover:shadow-md"
                }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${activeTab === "simulator"
                  ? "bg-teal-600 text-white"
                  : "bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white"
                  }`}
              >
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">Simulateur sobriété</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">Visualisez vos économies</p>
              {activeTab === "simulator" && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-teal-600 animate-pulse" />
              )}
            </button>

            <button
              role="tab"
              id="onglet-enterprise"
              aria-controls="outil-panel"
              tabIndex={activeTab === "enterprise" ? 0 : -1}
              aria-selected={activeTab === "enterprise"}
              onClick={() => setActiveTab("enterprise")}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${activeTab === "enterprise"
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-300 hover:shadow-md"
                }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${activeTab === "enterprise"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white"
                  }`}
              >
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">Économies entreprise</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">ROI Green IT sur 5 ans</p>
              {activeTab === "enterprise" && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-purple-600 animate-pulse" />
              )}
            </button>

            <button
              role="tab"
              id="onglet-cloud"
              aria-controls="outil-panel"
              tabIndex={activeTab === "cloud" ? 0 : -1}
              aria-selected={activeTab === "cloud"}
              onClick={() => setActiveTab("cloud")}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${activeTab === "cloud"
                ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 shadow-lg"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-cyan-300 hover:shadow-md"
                }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${activeTab === "cloud"
                  ? "bg-cyan-600 text-white"
                  : "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white"
                  }`}
              >
                <Cloud className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">Comparateur cloud</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">Hébergeurs éco-responsables</p>
              {activeTab === "cloud" && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-cyan-600 animate-pulse" />
              )}
            </button>

            <button
              role="tab"
              id="onglet-audit"
              aria-controls="outil-panel"
              tabIndex={activeTab === "audit" ? 0 : -1}
              aria-selected={activeTab === "audit"}
              onClick={() => setActiveTab("audit")}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${activeTab === "audit"
                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-300 hover:shadow-md"
                }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${activeTab === "audit"
                  ? "bg-orange-600 text-white"
                  : "bg-orange-100 text-orange-700 group-hover:bg-orange-600 group-hover:text-white"
                  }`}
              >
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">Audit parc IT</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">Optimisez votre matériel</p>
              {activeTab === "audit" && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-orange-600 animate-pulse" />
              )}
            </button>

            <button
              role="tab"
              id="onglet-quiz"
              aria-controls="outil-panel"
              tabIndex={activeTab === "quiz" ? 0 : -1}
              aria-selected={activeTab === "quiz"}
              onClick={() => setActiveTab("quiz")}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${activeTab === "quiz"
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 hover:shadow-md"
                }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${activeTab === "quiz"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white"
                  }`}
              >
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">Quiz Green IT</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">100 questions interactives</p>
              {activeTab === "quiz" && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </button>
          </div>

          {/* Content */}
          <div role="tabpanel" id="outil-panel" aria-labelledby={`onglet-${activeTab}`}>
          {activeTab === "calculator" && <CarbonCalculator />}
          {activeTab === "website" && <WebsiteCarbonCalculator />}
          {activeTab === "simulator" && <SobrietySimulator />}
          {activeTab === "quiz" && <QuizGreenITAdvanced />}
          {activeTab === "enterprise" && <EnterpriseSimulator />}
          {activeTab === "cloud" && <CloudComparator />}
          {activeTab === "audit" && <ITAudit />}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { CHART_FALLBACKS } from "@/lib/chart-theme";
import { Euro, Lightbulb, Printer, RotateCcw, Wrench, ChevronLeft, ChevronRight, Sprout, Users, Zap, Save, Download, Upload, Trash2, History } from "lucide-react";
import { SourceTooltip } from "@/components/source-tooltip";
import Link from "next/link";
import { SOBRIETY_PRESETS, SOBRIETY_BASELINE, calculateSobrietyImpact, buildProjection } from "@/lib/sobriety-calc";
import type { SobrietyScenario, SobrietyPreset } from "@/lib/sobriety-calc";
import { loadSobriety, saveSobrietyScenario, removeSobrietyScenario, importSobrietyStore } from "@/lib/sobriety-storage";
import type { SobrietyStore } from "@/lib/sobriety-storage";

const STEPS = [
  { n: 1, label: "Votre profil" },
  { n: 2, label: "Vos choix" },
  { n: 3, label: "Résultats" },
] as const

const PRESET_ICONS = { sobre: Sprout, standard: Users, intensif: Zap } as const

export default function SobrietySimulator() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [scenario, setScenario] = useState<SobrietyScenario>({ ...SOBRIETY_PRESETS[2].scenario })
  const [devicePriceInput, setDevicePriceInput] = useState("")
  const stepRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    stepRef.current?.focus()
  }, [step])

  const impact = calculateSobrietyImpact(scenario)
  const projectionData = buildProjection(impact)

  // Volet € (purement additionnel, aucun effet sur les calculs CO₂e ci-dessus) :
  // le CO₂e ne se convertit pas en €, on estime seulement des € évités
  // à partir d'un prix saisi par l'utilisateur.
  const normalizedPrice = devicePriceInput.trim().replace(/\s/g, "").replace(",", ".")
  const parsedPrice = normalizedPrice === "" ? NaN : Number(normalizedPrice)
  const hasValidPrice = Number.isFinite(parsedPrice) && parsedPrice > 0
  const priceTouched = devicePriceInput.trim() !== ""
  const isRepairChoice = scenario.purchaseChoice === "repair"
  const isRefurbChoice = scenario.purchaseChoice === "refurb"
  const refurbSaving = hasValidPrice ? parsedPrice * 0.5 : 0

  const applyPreset = (preset: SobrietyPreset) => {
    setScenario({ ...preset.scenario })
    setStep(2)
  }

  const resetAll = () => {
    setScenario({ ...SOBRIETY_PRESETS[2].scenario })
    setDevicePriceInput("")
    setStep(1)
  }

  const scenarioKey = JSON.stringify(scenario)

  // Historique local (sur l'appareil uniquement, même pattern que l'estimateur)
  const hasAction =
    scenario.deviceLifespan < 5 ||
    scenario.purchaseChoice === "new" ||
    scenario.streamingQuality === "4k" ||
    scenario.emailCleanup === "never" ||
    scenario.cloudStorage === "keep"
  const [sobStore, setSobStore] = useState<SobrietyStore | null>(null)
  const [savedTick, setSavedTick] = useState(false)
  const [importError, setImportError] = useState(false)
  const sobFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSobStore(loadSobriety())
  }, [])

  const presetLabel = SOBRIETY_PRESETS.find((p) => JSON.stringify(p.scenario) === scenarioKey)?.label ?? "Personnalisé"

  const handleSaveScenario = () => {
    setSobStore(
      saveSobrietyScenario({
        name: `${presetLabel} ${new Date().toLocaleDateString("fr-FR")}`,
        date: new Date().toISOString(),
        scenario: { ...scenario },
        percentage: impact.percentage,
        savings: impact.savings,
      })
    )
    setSavedTick(true)
    window.setTimeout(() => setSavedTick(false), 2000)
  }

  const handleResumeScenario = (entryScenario: SobrietyScenario) => {
    setScenario({ ...entryScenario })
    setStep(2)
  }

  const handleExportSobJson = () => {
    if (!sobStore) return
    const blob = new Blob([JSON.stringify(sobStore, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `scenarios-sobriete-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const handleImportSobJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ""
    setImportError(false)
    if (!file) return
    let text = ""
    try {
      text = await file.text()
    } catch {
      setImportError(true)
      return
    }
    const store = importSobrietyStore(text)
    if (!store) {
      setImportError(true)
      return
    }
    setSobStore(store)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
            Simulateur de sobriété numérique
          </CardTitle>
          <CardDescription>
            Visualisez l&apos;impact de vos choix de consommation numérique sur 5 ans (repères 2022-2025 et hypothèses du site)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Stepper */}
          <ol className="flex items-center gap-2 text-xs sm:text-sm" aria-label="Progression du simulateur">
            {STEPS.map((s, i) => {
              const active = step === s.n
              const done = step > s.n
              return (
                <li key={s.n} className="flex flex-1 items-center gap-2 last:flex-none">
                  <button
                    type="button"
                    onClick={() => setStep(s.n)}
                    aria-current={active ? "step" : undefined}
                    aria-label={`Étape ${s.n} : ${s.label}`}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      active
                        ? "border-teal-600 bg-teal-600 text-white"
                        : done
                          ? "border-teal-600 bg-teal-50 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200"
                          : "border-border bg-card text-muted-foreground hover:border-teal-400"
                    }`}
                  >
                    <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full font-bold">
                      {s.n}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && <span aria-hidden="true" className="h-px flex-1 bg-border" />}
                </li>
              )
            })}
          </ol>

          {step === 2 && (
            <p aria-live="polite" className="rounded-lg border border-teal-600/30 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-900 dark:bg-teal-900/20 dark:text-teal-100 md:sticky md:top-2">
              D&apos;après vos choix actuels : −{impact.percentage}{"\u00A0"}% d&apos;impact pour l&apos;instant.
            </p>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h3 ref={stepRef} tabIndex={-1} className="font-poppins text-xl font-semibold text-foreground focus-visible:outline-none">
                Quel profil vous ressemble ?
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {SOBRIETY_PRESETS.map((preset) => {
                  const Icon = PRESET_ICONS[preset.id]
                  const effect = calculateSobrietyImpact(preset.scenario).percentage
                  const selected = scenarioKey === JSON.stringify(preset.scenario)
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      aria-pressed={selected}
                      className={`rounded-xl border-2 p-5 text-left transition-all hover:shadow-md ${
                        selected ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20" : "border-border bg-card hover:border-teal-400"
                      }`}
                    >
                      <Icon className="mb-3 h-8 w-8 text-teal-700 dark:text-teal-300" aria-hidden="true" />
                      <div className="font-poppins text-base font-bold text-foreground">{preset.label}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{preset.description}</p>
                      <p className="mt-3 text-sm font-semibold text-green-700 dark:text-green-300">
                        −{effect}{"\u00A0"}% d&apos;impact (indicatif)
                      </p>
                    </button>
                  )
                })}
              </div>
              <p className="text-sm text-muted-foreground">
                Référence : {SOBRIETY_BASELINE} kg CO₂e/an par internaute{" "}
                <SourceTooltip source="GreenIT, Étude empreinte numérique mondiale (EENM), 2025" calculation="1,8 Gt CO₂e ÷ ~5,35 Md d'internautes ≈ 330 kg CO₂e/an" />.
                Pour partir de votre cas réel, <Link href="/outils#onglet-calculator" className="underline underline-offset-2">calculez votre empreinte</Link>.
                Les presets sont des hypothèses du site, modifiables à l&apos;étape suivante.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 ref={stepRef} tabIndex={-1} className="font-poppins text-xl font-semibold text-foreground focus-visible:outline-none">
                Vos choix
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block text-foreground">
                      Durée de vie de vos appareils: {scenario.deviceLifespan} ans
                    </Label>
                    <Slider
                      value={[scenario.deviceLifespan]}
                      onValueChange={([value]) => setScenario({ ...scenario, deviceLifespan: value })}
                      min={2}
                      max={7}
                      step={1}
                      aria-label="Durée de vie de vos appareils (années)"
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {scenario.deviceLifespan < 3 && "Durée courte : viser 5 ans ou plus réduit nettement l'impact."}
                      {scenario.deviceLifespan >= 3 && scenario.deviceLifespan < 5 && "Durée intermédiaire : 5 ans ou plus font baisser l'impact."}
                      {scenario.deviceLifespan >= 5 && "Durée élevée : l'impact annuel est réduit."}
                    </p>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block text-foreground">
                      En cas de panne ou pour le prochain achat
                    </Label>
                    <RadioGroup
                      value={scenario.purchaseChoice}
                      onValueChange={(value) => setScenario({ ...scenario, purchaseChoice: value as SobrietyScenario["purchaseChoice"] })}
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="new" id="sob-new" />
                        <Label htmlFor="sob-new" className="cursor-pointer flex-1 text-foreground">
                          J&apos;achète du neuf
                          <span className="block text-sm text-muted-foreground">Impact : référence</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="repair" id="sob-repair" />
                        <Label htmlFor="sob-repair" className="cursor-pointer flex-1 text-foreground">
                          Je répare
                          <span className="block text-sm text-green-600 dark:text-green-400">Impact : −15{"\u00A0"}%</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="refurb" id="sob-refurb" />
                        <Label htmlFor="sob-refurb" className="cursor-pointer flex-1 text-foreground">
                          J&apos;achète reconditionné
                          <span className="block text-sm text-green-600 dark:text-green-400">Impact : −75{"\u00A0"}% (*)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="mt-2 text-xs text-muted-foreground">
                      (*) Achat reconditionné : impact du produit réduit d&apos;environ 75{"\u00A0"}% par rapport au neuf (ADEME, 2022 <SourceTooltip source="ADEME, 2022" info="Impact du produit reconditionné réduit d'environ 75 % par rapport au neuf" />).
                    </p>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block text-foreground">
                      Qualité de streaming
                    </Label>
                    <RadioGroup
                      value={scenario.streamingQuality}
                      onValueChange={(value) => setScenario({ ...scenario, streamingQuality: value as SobrietyScenario["streamingQuality"] })}
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="4k" id="sob-4k" />
                        <Label htmlFor="sob-4k" className="cursor-pointer flex-1 text-foreground">
                          4K/UHD
                          <span className="block text-sm text-muted-foreground">7 Go/h</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="1080p" id="sob-1080p" />
                        <Label htmlFor="sob-1080p" className="cursor-pointer flex-1 text-foreground">
                          Full HD (1080p)
                          <span className="block text-sm text-green-600 dark:text-green-400">3 Go/h (−5{"\u00A0"}%)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="720p" id="sob-720p" />
                        <Label htmlFor="sob-720p" className="cursor-pointer flex-1 text-foreground">
                          HD (720p)
                          <span className="block text-sm text-green-600 dark:text-green-400">0,9 Go/h (−8{"\u00A0"}%)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Pourquoi −57{"\u00A0"}% de données ne font que −5{"\u00A0"}% sur le total ? Parce que la fabrication de vos appareils
                      domine l&apos;empreinte, et que les données ne pèsent que via l&apos;énergie du réseau : baisser la
                      qualité aide, garder vos appareils longtemps aide bien plus.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block text-foreground">
                      Nettoyage des emails
                    </Label>
                    <RadioGroup
                      value={scenario.emailCleanup}
                      onValueChange={(value) => setScenario({ ...scenario, emailCleanup: value as SobrietyScenario["emailCleanup"] })}
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="never" id="sob-never" />
                        <Label htmlFor="sob-never" className="cursor-pointer flex-1 text-foreground">
                          Jamais
                          <span className="block text-sm text-muted-foreground">Jamais pour l&apos;instant</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="monthly" id="sob-monthly" />
                        <Label htmlFor="sob-monthly" className="cursor-pointer flex-1 text-foreground">
                          Mensuel
                          <span className="block text-sm text-green-600 dark:text-green-400">−1{"\u00A0"}% d&apos;impact (effet faible)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="weekly" id="sob-weekly" />
                        <Label htmlFor="sob-weekly" className="cursor-pointer flex-1 text-foreground">
                          Hebdomadaire
                          <span className="block text-sm text-green-600 dark:text-green-400">−2{"\u00A0"}% d&apos;impact (effet faible)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block text-foreground">
                      Stockage cloud
                    </Label>
                    <RadioGroup
                      value={scenario.cloudStorage}
                      onValueChange={(value) => setScenario({ ...scenario, cloudStorage: value as SobrietyScenario["cloudStorage"] })}
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="keep" id="sob-keep" />
                        <Label htmlFor="sob-keep" className="cursor-pointer flex-1 text-foreground">
                          Je garde tout
                          <span className="block text-sm text-muted-foreground">Stockage illimité</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="optimize" id="sob-optimize" />
                        <Label htmlFor="sob-optimize" className="cursor-pointer flex-1 text-foreground">
                          J&apos;optimise régulièrement
                          <span className="block text-sm text-green-600 dark:text-green-400">−7{"\u00A0"}% d&apos;impact</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                        <RadioGroupItem value="local" id="sob-local" />
                        <Label htmlFor="sob-local" className="cursor-pointer flex-1 text-foreground">
                          Stockage local prioritaire
                          <span className="block text-sm text-green-600 dark:text-green-400">−12{"\u00A0"}% d&apos;impact</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  <ChevronLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                  Retour au profil
                </Button>
                <Button className="flex-1 bg-teal-600 text-white hover:bg-teal-700" onClick={() => setStep(3)}>
                  Voir mes résultats
                  <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 ref={stepRef} tabIndex={-1} className="font-poppins text-xl font-semibold text-foreground focus-visible:outline-none">
                Impact de vos choix
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg text-center border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Référence moyenne</div>
                  <div className="text-3xl font-bold text-foreground">{impact.baseline}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂e/an</div>
                </div>
                <div className="bg-card p-4 rounded-lg text-center border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Avec sobriété</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{impact.optimized}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂e/an</div>
                </div>
                <div className="bg-card p-4 rounded-lg text-center border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Économie</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">-{impact.percentage}{"\u00A0"}%</div>
                  <div className="text-sm text-muted-foreground">{impact.savings} kg/an</div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-3 text-foreground">Projection sur 5 ans</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_FALLBACKS.grid} />
                    <XAxis dataKey="year" stroke={CHART_FALLBACKS.tick} />
                    <YAxis stroke={CHART_FALLBACKS.tick} />
                    <RechartsTooltip wrapperStyle={{ backgroundColor: "var(--card)" }} />
                    <Legend />
                    <Line type="monotone" dataKey="baseline" stroke={CHART_FALLBACKS.slate} name="Sans changement" strokeWidth={2} />
                    <Line type="monotone" dataKey="optimized" stroke={CHART_FALLBACKS.emerald} name="Avec sobriété" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <table className="sr-only">
                  <caption>Projection des émissions cumulées sur 5 ans, en kg CO₂e</caption>
                  <thead>
                    <tr><th>Année</th><th>Sans changement</th><th>Avec sobriété</th></tr>
                  </thead>
                  <tbody>
                    {projectionData.map((p) => (
                      <tr key={p.year}><td>{p.year}</td><td>{Math.round(p.baseline)}</td><td>{Math.round(p.optimized)}</td></tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-center mt-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.round(impact.savings * 5)} kg CO₂e économisés
                  </div>
                  <div className="text-sm text-muted-foreground">sur 5 ans</div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Projection linéaire simplifiée, hors renouvellements.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Référence : {SOBRIETY_BASELINE} kg CO₂e/an par internaute <SourceTooltip source="GreenIT, Étude empreinte numérique mondiale (EENM), 2025" calculation="1,8 Gt CO₂e ÷ ~5,35 Md d'internautes ≈ 330 kg CO₂e/an" />. Pour partir de votre cas réel, <Link href="/outils#onglet-calculator" className="underline underline-offset-2">calculez votre empreinte</Link>.
                  </p>
                </div>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2 text-foreground">Cela équivaut à :</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {Math.round((impact.savings * 5) / 0.17)} km en voiture économisés <SourceTooltip source="Hypothèse du site (à vérifier)" info="Facteur utilisé par l'outil : 0,17 kg CO₂e/km. Source à vérifier, voir todo.md." /></li>
                  <li>• {Math.round((impact.savings * 5) / 20)} arbres pendant 1 an (20 kg/arbre, ADEME) <SourceTooltip source="Hypothèse du site (à vérifier)" info="Facteur utilisé par l'outil : 20 kg CO₂e/arbre/an. Source à vérifier, voir todo.md." /></li>
                  <li>• {Math.round((impact.savings * 5) / 7)} repas avec bœuf évités (7 kg/repas, ADEME) <SourceTooltip source="Hypothèse du site (à vérifier)" info="Facteur utilisé par l'outil : 7 kg CO₂e/repas. Source à vérifier, voir todo.md." /></li>
                </ul>
              </div>

              <details className="bg-card p-4 rounded-lg border border-border">
                <summary className="cursor-pointer font-semibold text-foreground rounded-sm transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Détail du calcul : d&apos;où vient votre −{impact.percentage}{"\u00A0"}% ?
                </summary>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {impact.lines.map((line) => (
                    <li key={line.label} className="flex flex-col gap-0.5 rounded-lg bg-muted/50 p-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <span className="font-medium text-foreground">{line.label}</span>
                      <span className="sm:text-right">{line.effect} <span className="text-xs">({line.origin})</span></span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">
                  Les facteurs sont multipliés entre eux. « Hypothèse du site » = ordre de grandeur du site, à affiner ;
                  seul le reconditionné (−75{"\u00A0"}%) vient d&apos;une source externe (ADEME, 2022).
                </p>
              </details>

              <details className="bg-card p-4 rounded-lg border border-border">
                <summary className="cursor-pointer font-semibold text-foreground rounded-sm transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Euro className="mr-2 inline h-4 w-4" aria-hidden="true" />
                  Volet € : estimez vos économies
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  Le CO₂e ne se convertit pas en € : ce volet estime seulement des € évités, à partir
                  d&apos;un prix que vous saisissez et de vos choix ci-dessus.
                </p>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="sobriety-device-price" className="text-foreground">
                    Prix de votre appareil neuf (€)
                  </Label>
                  <Input
                    id="sobriety-device-price"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Votre facture, sans les centimes si vous préférez"
                    value={devicePriceInput}
                    onChange={(e) => setDevicePriceInput(e.target.value)}
                    aria-describedby="sobriety-device-price-hint"
                    aria-invalid={priceTouched && !hasValidPrice}
                  />
                  <p id="sobriety-device-price-hint" className="text-xs text-muted-foreground">
                    Saisissez le prix de votre facture, avec une virgule si besoin. Rien n&apos;est pré-rempli.
                  </p>
                </div>
                {!hasValidPrice && !priceTouched && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Indiquez un prix pour estimer vos économies en €.
                  </p>
                )}
                {priceTouched && !hasValidPrice && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Saisissez un montant supérieur à 0 € pour estimer, par exemple le prix de votre facture.
                  </p>
                )}
                {hasValidPrice && isRefurbChoice && (
                  <div className="mt-3 rounded-lg border border-border p-3">
                    <p className="text-sm text-foreground">
                      Économie indicative : ≈ {refurbSaving.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €{" "}
                      <SourceTooltip
                        source="Hypothèse du site (simulateur entreprise)"
                        info="Ordre de grandeur indicatif, même hypothèse que le simulateur entreprise."
                        calculation="prix saisi × 50 % : reconditionné à moitié prix (même hypothèse que le simulateur entreprise)"
                      />
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Soit environ la moitié du prix saisi (50{"\u00A0"}%),
                      bonne nouvelle à compléter en gardant vos appareils longtemps.
                    </p>
                  </div>
                )}
                {hasValidPrice && !isRefurbChoice && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Avec le choix « J&apos;achète reconditionné », cette même saisie donnerait une économie
                    indicative d&apos;environ la moitié du prix (hypothèse du site).
                  </p>
                )}
                {isRepairChoice && (
                  <div className="mt-3 rounded-lg border border-border p-3">
                    <p className="text-sm text-foreground">
                      <Wrench className="mr-2 inline h-4 w-4" aria-hidden="true" />
                      Bonus réparation : 15 à 60 € déduits de votre facture chez un réparateur labellisé QualiRépar{" "}
                      <SourceTooltip
                        source="Ecosystem 2025 et 2026 (bilan 3 ans, 01/2026)"
                        info="Déduit de la facture chez un réparateur labellisé QualiRépar, appareil hors garantie."
                        calculation="15 à 60 € selon l'appareil, 73 équipements ; ~1,9 M de réparations, 33 € d'aide moyenne"
                      />
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Montants révisés chaque année.{" "}
                      <Link href="/recyclage" className="underline underline-offset-2">
                        Voir le détail sur la page recyclage
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </details>

              {/* Actions recommandées */}
              <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-lg mb-3 text-foreground">
                  Actions prioritaires pour vous
                </h4>
                {!hasAction && (
                  <p className="text-sm text-muted-foreground">
                    Vos choix sont déjà sobres, bravo : gardez vos appareils longtemps, c&apos;est le levier qui compte le plus.
                  </p>
                )}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {scenario.deviceLifespan < 5 && (
                    <li>
                      • <strong>Allonger la durée de vie</strong> de vos appareils à 5 ans minimum
                    </li>
                  )}
                  {scenario.purchaseChoice === "new" && (
                    <li>
                      • <strong>Privilégiez la réparation</strong> ou le reconditionné pour vos prochains achats
                    </li>
                  )}
                  {scenario.streamingQuality === "4k" && (
                    <li>
                      • <strong>Réduisez la qualité de streaming</strong> à 1080p (différence invisible sur petit écran)
                    </li>
                  )}
                  {scenario.emailCleanup === "never" && (
                    <li>
                      • <strong>Nettoyez votre boîte mail</strong> mensuellement et désabonnez-vous des newsletters
                    </li>
                  )}
                  {scenario.cloudStorage === "keep" && (
                    <li>
                      • <strong>Optimisez votre stockage cloud</strong> en supprimant les doublons et fichiers inutiles
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                  Modifier mes choix
                </Button>
                <Button
                  className="flex-1 bg-card text-foreground hover:bg-secondary border border-border"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4 mr-2" aria-hidden="true" />
                  Imprimer mon plan d&apos;action
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent text-foreground hover:bg-secondary border border-border"
                  onClick={resetAll}
                >
                  <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Réinitialiser
                </Button>
              </div>

              {/* Historique local : sur votre appareil uniquement */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-1 text-foreground flex items-center gap-2">
                  <History className="h-4 w-4" aria-hidden="true" />
                  Vos scénarios sauvegardés
                </h4>
                <p className="text-xs text-muted-foreground mb-3">Sur votre appareil uniquement, rien n&apos;est envoyé.</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Button variant="outline" onClick={handleSaveScenario}>
                    <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                    Sauvegarder ce scénario
                  </Button>
                  {sobStore && sobStore.scenarios.length > 0 && (
                    <Button variant="outline" onClick={handleExportSobJson}>
                      <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                      Exporter (JSON)
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => sobFileRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" aria-hidden="true" />
                    Importer (JSON)
                  </Button>
                  <input
                    ref={sobFileRef}
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={handleImportSobJson}
                    aria-label="Importer un historique de scénarios (JSON)"
                  />
                </div>
                {savedTick && (
                  <p className="mb-2 text-sm text-green-700 dark:text-green-300">Scénario sauvegardé.</p>
                )}
                {importError && (
                  <p className="mb-2 text-sm text-red-700 dark:text-red-300">
                    Import refusé : ce fichier n&apos;est pas un historique exporté par l&apos;outil.
                  </p>
                )}
                {sobStore && sobStore.scenarios.length > 0 ? (
                  <ul className="space-y-2">
                    {sobStore.scenarios.map((entry) => (
                      <li key={entry.date} className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm">
                          <span className="font-medium text-foreground">{entry.name}</span>{" "}
                          <span className="text-muted-foreground">
                            ({new Date(entry.date).toLocaleDateString("fr-FR")} • −{entry.percentage}{"\u00A0"}%)
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleResumeScenario(entry.scenario)}>
                            Reprendre
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => setSobStore(removeSobrietyScenario(entry.date))} aria-label={`Supprimer le scénario ${entry.name}`}>
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucun scénario sauvegardé pour l&apos;instant.</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        Sources: Base Empreinte / ADEME-Arcep (2024-2025), Shift Project, GreenIT.fr • Calculs basés sur des moyennes mondiales (référence : {SOBRIETY_BASELINE} kg CO₂e/an par internaute, GreenIT 2025)
      </div>
    </div>
  )
}

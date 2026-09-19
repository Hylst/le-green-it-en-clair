"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { CHART_FALLBACKS } from "@/lib/chart-theme";
import { Euro, Lightbulb, Printer, RotateCcw, Wrench } from "lucide-react";
import { SourceTooltip } from "@/components/source-tooltip";
import Link from "next/link";

export default function SobrietySimulator() {
  const [scenario, setScenario] = useState({
    deviceLifespan: 2,
    repairChoice: "new",
    streamingQuality: "4k",
    emailCleanup: "never",
    cloudStorage: "keep",
    deviceType: "new",
  })
  const [devicePriceInput, setDevicePriceInput] = useState("")

  const calculateImpact = () => {
    const baselineImpact = 330 // kg CO₂e/an, ordre de grandeur mondial par internaute (1,8 Gt ÷ ~5,35 Md, Green IT 2025)
    let optimizedImpact = baselineImpact

    // Durée de vie des appareils — hypothèse du site, ordre de grandeur (à vérifier) :
    // allonger la durée de vie fait baisser l'impact annuel amorti, paliers indicatifs.
    // Le seuil « 5 ans ou plus » fait écho au règlement UE 2023/1670 (5 ans de mises à jour,
    // 7 ans de pièces, cité dans le quiz et la réglementation), mais les paliers −15/−25/−35 %
    // ne viennent d'aucune source : ce sont des ordres de grandeur du site.
    if (scenario.deviceLifespan >= 5) optimizedImpact *= 0.65
    else if (scenario.deviceLifespan >= 4) optimizedImpact *= 0.75
    else if (scenario.deviceLifespan >= 3) optimizedImpact *= 0.85

    // Réparation vs remplacement (deux moments distincts : on retient le facteur le plus sobre, sans cumul).
    // « Réparer » (−15 %) : hypothèse du site, ordre de grandeur (à vérifier).
    // « Reconditionné » (−75 %) : ADEME, 2022 (déjà cité dans l'outil, voir notes (*)).
    const repairFactor =
      scenario.repairChoice === "repair" || scenario.deviceType === "repair" ? 0.85 : 1
    const refurbFactor =
      scenario.repairChoice === "refurb" || scenario.deviceType === "refurb" ? 0.25 : 1
    optimizedImpact *= Math.min(repairFactor, refurbFactor)

    // Qualité streaming — hypothèse du site, ordre de grandeur (à vérifier) : les données
    // chutent (7 → 3 → 0,9 Go/h affichés dans l'outil) mais l'effet sur le total reste faible,
    // les données ne pesant que via l'énergie du réseau (voir la note sous le réglage).
    if (scenario.streamingQuality === "720p") optimizedImpact *= 0.92
    else if (scenario.streamingQuality === "1080p") optimizedImpact *= 0.95

    // Nettoyage e-mails — hypothèse du site, ordre de grandeur (à vérifier) : effet
    // volontairement faible, les e-mails pèsent peu dans le total (voir calculateur carbone).
    if (scenario.emailCleanup === "monthly") optimizedImpact *= 0.99
    else if (scenario.emailCleanup === "weekly") optimizedImpact *= 0.98

    // Stockage cloud — hypothèse du site, ordre de grandeur (à vérifier).
    if (scenario.cloudStorage === "optimize") optimizedImpact *= 0.93
    else if (scenario.cloudStorage === "local") optimizedImpact *= 0.88

    return {
      baseline: Math.round(baselineImpact),
      optimized: Math.round(optimizedImpact),
      savings: Math.round(baselineImpact - optimizedImpact),
      percentage: Math.round(((baselineImpact - optimizedImpact) / baselineImpact) * 100),
    }
  }

  const impact = calculateImpact()

  // Volet € (purement additionnel, aucun effet sur les calculs CO₂e ci-dessus) :
  // le CO₂e ne se convertit pas en €, on estime seulement des € évités
  // à partir d'un prix saisi par l'utilisateur.
  const normalizedPrice = devicePriceInput.trim().replace(/\s/g, "").replace(",", ".")
  const parsedPrice = normalizedPrice === "" ? NaN : Number(normalizedPrice)
  const hasValidPrice = Number.isFinite(parsedPrice) && parsedPrice > 0
  const priceTouched = devicePriceInput.trim() !== ""
  const isRepairChoice = scenario.repairChoice === "repair" || scenario.deviceType === "repair"
  const isRefurbChoice = scenario.repairChoice === "refurb" || scenario.deviceType === "refurb"
  const refurbSaving = hasValidPrice ? parsedPrice * 0.5 : 0

  // Projection linéaire simplifiée, hors renouvellements : les valeurs annuelles sont des
  // moyennes amorties, on les cumule telles quelles. Modéliser les pics de renouvellement
  // demanderait un partage fabrication/usage que le simulateur n'a pas : on l'affiche tel
  // quel plutôt que d'inventer des chiffres.
  const projectionData = Array.from({ length: 6 }, (_, i) => ({
    year: `Année ${i}`,
    baseline: impact.baseline * i,
    optimized: impact.optimized * i,
    savings: (impact.baseline - impact.optimized) * i,
  }))

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
            Simulateur de sobriété numérique
          </CardTitle>
          <CardDescription>
            Visualisez l'impact de vos choix de consommation numérique sur 5 ans (repères 2022-2025 et hypothèses du site)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Paramètres */}
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
                  En cas de panne
                </Label>
                <RadioGroup
                  value={scenario.repairChoice}
                  onValueChange={(value) => setScenario({ ...scenario, repairChoice: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="cursor-pointer flex-1 text-foreground">
                      J'achète du neuf
                      <span className="block text-sm text-muted-foreground">Impact : référence</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="repair" id="repair" />
                    <Label htmlFor="repair" className="cursor-pointer flex-1 text-foreground">
                      Je répare
                      <span className="block text-sm text-green-600 dark:text-green-400">Impact : −15 %</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="refurb" id="refurb" />
                    <Label htmlFor="refurb" className="cursor-pointer flex-1 text-foreground">
                      J'achète reconditionné
                      <span className="block text-sm text-green-600 dark:text-green-400">Impact : −75 % (*)</span>
                    </Label>
                  </div>
                </RadioGroup>
                <p className="mt-2 text-xs text-muted-foreground">
                  (*) Achat reconditionné : impact du produit réduit d'environ 75 % par rapport au neuf (ADEME, 2022 <SourceTooltip source="ADEME, 2022" info="Impact du produit reconditionné réduit d'environ 75 % par rapport au neuf" />).
                </p>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block text-foreground">
                  Qualité de streaming
                </Label>
                <RadioGroup
                  value={scenario.streamingQuality}
                  onValueChange={(value) => setScenario({ ...scenario, streamingQuality: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="4k" id="4k" />
                    <Label htmlFor="4k" className="cursor-pointer flex-1 text-foreground">
                      4K/UHD
                      <span className="block text-sm text-muted-foreground">7 Go/h</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="1080p" id="1080p" />
                    <Label htmlFor="1080p" className="cursor-pointer flex-1 text-foreground">
                      Full HD (1080p)
                      <span className="block text-sm text-green-600 dark:text-green-400">3 Go/h (−5 %)</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="720p" id="720p" />
                    <Label htmlFor="720p" className="cursor-pointer flex-1 text-foreground">
                      HD (720p)
                      <span className="block text-sm text-green-600 dark:text-green-400">0,9 Go/h (−8 %)</span>
                    </Label>
                  </div>
                </RadioGroup>
                <p className="mt-2 text-xs text-muted-foreground">
                  Pourquoi −57 % de données ne font que −5 % sur le total ? Parce que la fabrication de vos appareils
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
                  onValueChange={(value) => setScenario({ ...scenario, emailCleanup: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never" className="cursor-pointer flex-1 text-foreground">
                      Jamais
                      <span className="block text-sm text-muted-foreground">Jamais pour l'instant</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer flex-1 text-foreground">
                      Mensuel
                      <span className="block text-sm text-green-600 dark:text-green-400">−1 % d'impact (effet faible)</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="cursor-pointer flex-1 text-foreground">
                      Hebdomadaire
                      <span className="block text-sm text-green-600 dark:text-green-400">−2 % d'impact (effet faible)</span>
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
                  onValueChange={(value) => setScenario({ ...scenario, cloudStorage: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="keep" id="keep" />
                    <Label htmlFor="keep" className="cursor-pointer flex-1 text-foreground">
                      Je garde tout
                      <span className="block text-sm text-muted-foreground">Stockage illimité</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="optimize" id="optimize" />
                    <Label htmlFor="optimize" className="cursor-pointer flex-1 text-foreground">
                      J'optimise régulièrement
                      <span className="block text-sm text-green-600 dark:text-green-400">−7 % d'impact</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="local" id="local" />
                    <Label htmlFor="local" className="cursor-pointer flex-1 text-foreground">
                      Stockage local prioritaire
                      <span className="block text-sm text-green-600 dark:text-green-400">−12 % d'impact</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block text-foreground">
                  Prochain achat
                </Label>
                <RadioGroup
                  value={scenario.deviceType}
                  onValueChange={(value) => setScenario({ ...scenario, deviceType: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="new" id="device-new" />
                    <Label htmlFor="device-new" className="cursor-pointer flex-1 text-foreground">
                      Neuf
                      <span className="block text-sm text-muted-foreground">Impact de référence</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="repair" id="device-repair" />
                    <Label htmlFor="device-repair" className="cursor-pointer flex-1 text-foreground">
                      Réparer l'ancien
                      <span className="block text-sm text-green-600 dark:text-green-400">−15 % d'impact</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                    <RadioGroupItem value="refurb" id="device-refurb" />
                    <Label htmlFor="device-refurb" className="cursor-pointer flex-1 text-foreground">
                      Reconditionné
                      <span className="block text-sm text-green-600 dark:text-green-400">−75 % d'impact (*)</span>
                    </Label>
                  </div>
                </RadioGroup>
                <p className="mt-2 text-xs text-muted-foreground">
                  (*) Reconditionné : impact du produit réduit d'environ 75 % par rapport au neuf (ADEME, 2022 <SourceTooltip source="ADEME, 2022" info="Impact du produit reconditionné réduit d'environ 75 % par rapport au neuf" />).
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  En cas de panne comme pour le prochain achat, on retient votre choix le plus sobre, sans les cumuler.
                </p>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-xl mb-6 text-foreground">Impact de vos choix</h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
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
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">-{impact.percentage}%</div>
                <div className="text-sm text-muted-foreground">{impact.savings} kg/an</div>
              </div>
            </div>

            <div className="bg-card p-4 rounded-lg mb-6 border border-border">
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
                  Référence : 330 kg CO₂e/an par internaute <SourceTooltip source="GreenIT, Étude empreinte numérique mondiale (EENM), 2025" calculation="1,8 Gt CO₂e ÷ ~5,35 Md d'internautes ≈ 330 kg CO₂e/an" />. Pour partir de votre cas réel, <Link href="/outils#onglet-calculator" className="underline underline-offset-2">calculez votre empreinte</Link>.
                </p>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-foreground">Cela équivaut à:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {Math.round((impact.savings * 5) / 0.17)} km en voiture économisés</li>
                <li>• {Math.round((impact.savings * 5) / 20)} arbres pendant 1 an (20 kg/arbre, ADEME)</li>
                <li>• {Math.round((impact.savings * 5) / 7)} repas avec bœuf évités (7 kg/repas, ADEME)</li>
              </ul>
            </div>

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
          </div>

          {/* Actions recommandées */}
          <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Actions prioritaires pour vous
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {scenario.deviceLifespan < 5 && (
                <li>
                  • <strong>Allonger la durée de vie</strong> de vos appareils à 5 ans minimum
                </li>
              )}
              {scenario.repairChoice === "new" && (
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
            <Button
              className="flex-1 bg-card text-foreground hover:bg-secondary border border-border"
              onClick={() => window.print()}
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer mon plan d'action
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent text-foreground hover:bg-secondary border border-border"
              onClick={() => {
                setScenario({
                  deviceLifespan: 2,
                  repairChoice: "new",
                  streamingQuality: "4k",
                  emailCleanup: "never",
                  cloudStorage: "keep",
                  deviceType: "new",
                })
                setDevicePriceInput("")
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        Sources: Base Empreinte / ADEME-Arcep (2024-2025), Shift Project, GreenIT.fr • Calculs basés sur des moyennes mondiales (référence : 330 kg CO₂e/an par internaute, GreenIT 2025)
      </div>
    </div>
  )
}

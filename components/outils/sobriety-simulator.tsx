"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Lightbulb, Download, RotateCcw } from "lucide-react";

export default function SobrietySimulator() {
  const [scenario, setScenario] = useState({
    deviceLifespan: 2,
    repairChoice: "new",
    streamingQuality: "4k",
    emailCleanup: "never",
    cloudStorage: "keep",
    deviceType: "new",
  })

  const calculateImpact = () => {
    const baselineImpact = 285 // kg CO2e/an, repère France (fourchette 225-330 kg, GreenIT EENM 2025)
    let optimizedImpact = baselineImpact

    // Durée de vie des appareils
    if (scenario.deviceLifespan >= 5) optimizedImpact *= 0.65
    else if (scenario.deviceLifespan >= 4) optimizedImpact *= 0.75
    else if (scenario.deviceLifespan >= 3) optimizedImpact *= 0.85

    // Réparation vs remplacement
    if (scenario.repairChoice === "repair") optimizedImpact *= 0.85
    else if (scenario.repairChoice === "refurb") optimizedImpact *= 0.25

    // Qualité streaming
    if (scenario.streamingQuality === "720p") optimizedImpact *= 0.92
    else if (scenario.streamingQuality === "1080p") optimizedImpact *= 0.95

    // Nettoyage emails
    if (scenario.emailCleanup === "monthly") optimizedImpact *= 0.99
    else if (scenario.emailCleanup === "weekly") optimizedImpact *= 0.98

    // Stockage cloud
    if (scenario.cloudStorage === "optimize") optimizedImpact *= 0.93
    else if (scenario.cloudStorage === "local") optimizedImpact *= 0.88

    // Type d'appareil
    if (scenario.deviceType === "refurb") optimizedImpact *= 0.5
    else if (scenario.deviceType === "repair") optimizedImpact *= 0.9

    return {
      baseline: Math.round(baselineImpact),
      optimized: Math.round(optimizedImpact),
      savings: Math.round(baselineImpact - optimizedImpact),
      percentage: Math.round(((baselineImpact - optimizedImpact) / baselineImpact) * 100),
    }
  }

  const impact = calculateImpact()

  // Données pour le graphique de projection
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
            Visualisez l'impact de vos choix de consommation numérique sur 5 ans (données 2025)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Paramètres */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block text-gray-900 dark:text-gray-100">
                  Durée de vie de vos appareils: {scenario.deviceLifespan} ans
                </Label>
                <Slider
                  value={[scenario.deviceLifespan]}
                  onValueChange={([value]) => setScenario({ ...scenario, deviceLifespan: value })}
                  min={2}
                  max={7}
                  step={1}
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {scenario.deviceLifespan < 3 && "Durée courte : viser 5 ans ou plus réduit nettement l'impact."}
                  {scenario.deviceLifespan >= 3 && scenario.deviceLifespan < 5 && "Durée intermédiaire : 5 ans ou plus font baisser l'impact."}
                  {scenario.deviceLifespan >= 5 && "Durée élevée : l'impact annuel est réduit."}
                </p>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block text-gray-900 dark:text-gray-100">
                  En cas de panne
                </Label>
                <RadioGroup
                  value={scenario.repairChoice}
                  onValueChange={(value) => setScenario({ ...scenario, repairChoice: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      J'achète du neuf
                      <span className="block text-sm text-gray-600 dark:text-gray-300">Impact : référence</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="repair" id="repair" />
                    <Label htmlFor="repair" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Je répare
                      <span className="block text-sm text-green-600 dark:text-green-400">Impact : −15 %</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="refurb" id="refurb" />
                    <Label htmlFor="refurb" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      J'achète reconditionné
                      <span className="block text-sm text-green-600 dark:text-green-400">Impact : −75 %*</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block text-gray-900 dark:text-gray-100">
                  Qualité de streaming
                </Label>
                <RadioGroup
                  value={scenario.streamingQuality}
                  onValueChange={(value) => setScenario({ ...scenario, streamingQuality: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="4k" id="4k" />
                    <Label htmlFor="4k" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      4K/UHD
                      <span className="block text-sm text-gray-600 dark:text-gray-300">7 Go/h</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="1080p" id="1080p" />
                    <Label htmlFor="1080p" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Full HD (1080p)
                      <span className="block text-sm text-green-600 dark:text-green-400">3 Go/h (-5%)</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="720p" id="720p" />
                    <Label htmlFor="720p" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      HD (720p)
                      <span className="block text-sm text-green-600 dark:text-green-400">0.9 Go/h (-8%)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block text-gray-900 dark:text-gray-100">
                  Nettoyage des emails
                </Label>
                <RadioGroup
                  value={scenario.emailCleanup}
                  onValueChange={(value) => setScenario({ ...scenario, emailCleanup: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Jamais
                      <span className="block text-sm text-gray-600 dark:text-gray-300">Boîte saturée</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Mensuel
                      <span className="block text-sm text-green-600 dark:text-green-400">−1 % d'impact (effet faible)</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Hebdomadaire
                      <span className="block text-sm text-green-600 dark:text-green-400">−2 % d'impact (effet faible)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block text-gray-900 dark:text-gray-100">
                  Stockage cloud
                </Label>
                <RadioGroup
                  value={scenario.cloudStorage}
                  onValueChange={(value) => setScenario({ ...scenario, cloudStorage: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="keep" id="keep" />
                    <Label htmlFor="keep" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Je garde tout
                      <span className="block text-sm text-gray-600 dark:text-gray-300">Stockage illimité</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="optimize" id="optimize" />
                    <Label htmlFor="optimize" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      J'optimise régulièrement
                      <span className="block text-sm text-green-600 dark:text-green-400">-7% d'impact</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="local" id="local" />
                    <Label htmlFor="local" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Stockage local prioritaire
                      <span className="block text-sm text-green-600 dark:text-green-400">-12% d'impact</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block text-gray-900 dark:text-gray-100">
                  Prochain achat
                </Label>
                <RadioGroup
                  value={scenario.deviceType}
                  onValueChange={(value) => setScenario({ ...scenario, deviceType: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="new" id="device-new" />
                    <Label htmlFor="device-new" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Neuf
                      <span className="block text-sm text-gray-600 dark:text-gray-300">Impact maximal</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="repair" id="device-repair" />
                    <Label htmlFor="device-repair" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Réparer l'ancien
                      <span className="block text-sm text-green-600 dark:text-green-400">−10 % d'impact</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <RadioGroupItem value="refurb" id="device-refurb" />
                    <Label htmlFor="device-refurb" className="cursor-pointer flex-1 text-gray-900 dark:text-gray-100">
                      Reconditionné
                      <span className="block text-sm text-green-600 dark:text-green-400">−50 % d'impact</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-xl mb-6 text-gray-900 dark:text-gray-100">Impact de vos choix</h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Scénario actuel</div>
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-100">{impact.baseline}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">kg CO₂e/an</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Avec sobriété</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{impact.optimized}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">kg CO₂e/an</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Économie</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">-{impact.percentage}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{impact.savings} kg/an</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Projection sur 5 ans</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="year" stroke="rgba(255, 255, 255, 0.6)" />
                  <YAxis stroke="rgba(255, 255, 255, 0.6)" />
                  <RechartsTooltip wrapperStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }} />
                  <Line type="monotone" dataKey="baseline" stroke="#9ca3af" name="Sans changement" strokeWidth={2} />
                  <Line type="monotone" dataKey="optimized" stroke="#10b981" name="Avec sobriété" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.round(impact.savings * 5)} kg CO₂e économisés
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">sur 5 ans</div>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Cela équivaut à:</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• {Math.round((impact.savings * 5) / 0.17)} km en voiture économisés</li>
                <li>• {Math.round((impact.savings * 5) / 20)} arbres pendant 1 an (20 kg/arbre, ADEME)</li>
                <li>• {Math.round((impact.savings * 5) / 7)} repas avec bœuf évités (7 kg/repas, ADEME)</li>
              </ul>
            </div>
          </div>

          {/* Actions recommandées */}
          <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">
              Actions prioritaires pour vous
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
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
              className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger mon plan d'action
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
              onClick={() =>
                setScenario({
                  deviceLifespan: 2,
                  repairChoice: "new",
                  streamingQuality: "4k",
                  emailCleanup: "never",
                  cloudStorage: "keep",
                  deviceType: "new",
                })
              }
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        Sources: Base Empreinte / ADEME-Arcep (2024-2025), Shift Project, GreenIT.fr • Calculs basés sur des moyennes françaises
      </div>
    </div>
  )
}

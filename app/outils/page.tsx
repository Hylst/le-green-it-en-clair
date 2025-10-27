"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Calculator, Lightbulb, Trophy, Download, Share2, RotateCcw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function OutilsPage() {
  const [activeTab, setActiveTab] = useState<"calculator" | "simulator" | "quiz">("calculator")

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-green-900 mb-6 text-balance">
            Outils Interactifs
          </h1>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl text-pretty">
            Calculez votre empreinte numérique, simulez l'impact de vos choix et testez vos connaissances avec nos
            outils pédagogiques basés sur les données 2025.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant={activeTab === "calculator" ? "default" : "outline"}
              onClick={() => setActiveTab("calculator")}
              className="flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Calculateur d'empreinte
            </Button>
            <Button
              variant={activeTab === "simulator" ? "default" : "outline"}
              onClick={() => setActiveTab("simulator")}
              className="flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Simulateur de sobriété
            </Button>
            <Button
              variant={activeTab === "quiz" ? "default" : "outline"}
              onClick={() => setActiveTab("quiz")}
              className="flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Quiz Green IT
            </Button>
          </div>

          {/* Content */}
          {activeTab === "calculator" && <CarbonCalculator />}
          {activeTab === "simulator" && <SobrietySimulator />}
          {activeTab === "quiz" && <GreenITQuiz />}
        </div>
      </div>
    </div>
  )
}

function CarbonCalculator() {
  const [devices, setDevices] = useState({
    smartphone: { count: 1, age: 2, usage: 3 },
    laptop: { count: 1, age: 3, usage: 6 },
    tablet: { count: 0, age: 2, usage: 2 },
    desktop: { count: 0, age: 4, usage: 8 },
    tv: { count: 1, age: 5, usage: 4 },
  })

  const [cloudUsage, setCloudUsage] = useState({
    email: 50,
    streaming: 10,
    cloud: 20,
    social: 2,
  })

  // Calcul de l'empreinte carbone (données 2025 ADEME)
  const calculateFootprint = () => {
    let total = 0

    // Empreinte fabrication + usage annuel (kg CO2e)
    const deviceImpact = {
      smartphone: { fabrication: 55, usage: 8 },
      laptop: { fabrication: 156, usage: 22 },
      tablet: { fabrication: 63, usage: 12 },
      desktop: { fabrication: 296, usage: 88 },
      tv: { fabrication: 371, usage: 118 },
    }

    Object.entries(devices).forEach(([device, data]) => {
      if (data.count > 0) {
        const impact = deviceImpact[device as keyof typeof deviceImpact]
        // Amortissement fabrication sur durée de vie
        const fabricationPerYear = impact.fabrication / data.age
        const usageImpact = (impact.usage * data.usage) / 24 // Proportionnel à l'usage
        total += (fabricationPerYear + usageImpact) * data.count
      }
    })

    // Impact cloud et services (kg CO2e/an)
    total += cloudUsage.email * 0.3 // 0.3 kg par email/jour
    total += cloudUsage.streaming * 1.6 // 1.6 kg par heure/semaine
    total += cloudUsage.cloud * 0.2 // 0.2 kg par Go/mois
    total += cloudUsage.social * 2.5 // 2.5 kg par heure/jour

    return Math.round(total)
  }

  const totalFootprint = calculateFootprint()
  const averageFrench = 285 // kg CO2e/an pour un Français moyen (2025)
  const percentage = Math.round((totalFootprint / averageFrench) * 100)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Calculateur d'empreinte carbone numérique
          </CardTitle>
          <CardDescription>
            Estimez l'impact environnemental de vos équipements et usages numériques (données ADEME 2025)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Équipements */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Vos équipements</h3>
            <div className="space-y-6">
              {Object.entries(devices).map(([device, data]) => (
                <div key={device} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="capitalize font-medium">
                      {device === "smartphone" && "Smartphone"}
                      {device === "laptop" && "Ordinateur portable"}
                      {device === "tablet" && "Tablette"}
                      {device === "desktop" && "Ordinateur fixe"}
                      {device === "tv" && "Télévision"}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setDevices({
                            ...devices,
                            [device]: { ...data, count: Math.max(0, data.count - 1) },
                          })
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{data.count}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setDevices({
                            ...devices,
                            [device]: { ...data, count: Math.min(5, data.count + 1) },
                          })
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {data.count > 0 && (
                    <>
                      <div>
                        <Label className="text-sm text-gray-600">Âge moyen: {data.age} ans</Label>
                        <Slider
                          value={[data.age]}
                          onValueChange={([value]) =>
                            setDevices({
                              ...devices,
                              [device]: { ...data, age: value },
                            })
                          }
                          min={1}
                          max={10}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Usage quotidien: {data.usage}h</Label>
                        <Slider
                          value={[data.usage]}
                          onValueChange={([value]) =>
                            setDevices({
                              ...devices,
                              [device]: { ...data, usage: value },
                            })
                          }
                          min={1}
                          max={16}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Usages cloud */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Vos usages numériques</h3>
            <div className="space-y-4">
              <div>
                <Label>Emails envoyés par jour: {cloudUsage.email}</Label>
                <Slider
                  value={[cloudUsage.email]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, email: value })}
                  min={0}
                  max={200}
                  step={10}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Streaming vidéo (heures/semaine): {cloudUsage.streaming}</Label>
                <Slider
                  value={[cloudUsage.streaming]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, streaming: value })}
                  min={0}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Stockage cloud (Go): {cloudUsage.cloud}</Label>
                <Slider
                  value={[cloudUsage.cloud]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, cloud: value })}
                  min={0}
                  max={200}
                  step={10}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Réseaux sociaux (heures/jour): {cloudUsage.social}</Label>
                <Slider
                  value={[cloudUsage.social]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, social: value })}
                  min={0}
                  max={8}
                  step={0.5}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="font-semibold text-xl mb-4">Votre empreinte carbone numérique</h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-green-700 mb-2">{totalFootprint} kg</div>
              <div className="text-gray-600">CO₂e par an</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Comparé à la moyenne française ({averageFrench} kg)</span>
                  <span className="font-semibold">{percentage}%</span>
                </div>
                <Progress value={Math.min(percentage, 100)} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{Math.round(totalFootprint / 12)}</div>
                  <div className="text-sm text-gray-600">kg CO₂e/mois</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{Math.round(totalFootprint * 0.7)}</div>
                  <div className="text-sm text-gray-600">Économie possible (-30%)</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Équivalences</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>≈ {Math.round(totalFootprint / 0.12)} km en voiture</li>
                  <li>≈ {Math.round(totalFootprint / 120)} vols Paris-New York</li>
                  <li>≈ {Math.round(totalFootprint / 0.9)} repas avec bœuf</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button className="flex-1 bg-transparent" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Télécharger le rapport
              </Button>
              <Button className="flex-1 bg-transparent" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Recommandations personnalisées</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {totalFootprint > averageFrench && (
                <li>• Votre empreinte est supérieure à la moyenne. Consultez nos guides d'action pour la réduire.</li>
              )}
              {devices.smartphone.age < 3 && (
                <li>• Conservez votre smartphone au moins 5 ans pour amortir son impact de fabrication.</li>
              )}
              {cloudUsage.streaming > 20 && (
                <li>• Réduisez la qualité de streaming (720p au lieu de 4K) pour économiser 75% de CO₂.</li>
              )}
              {cloudUsage.email > 100 && (
                <li>• Nettoyez régulièrement votre boîte mail et désabonnez-vous des newsletters inutiles.</li>
              )}
              <li>• Privilégiez le reconditionné pour vos prochains achats (80% d'impact en moins).</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 text-center">
        Sources: ADEME 2025, GreenIT.fr, Shift Project • Méthodologie: ACV (Analyse du Cycle de Vie)
      </div>
    </div>
  )
}

function SobrietySimulator() {
  const [scenario, setScenario] = useState({
    deviceLifespan: 3,
    repairChoice: "new",
    streamingQuality: "4k",
    emailCleanup: "never",
    cloudStorage: "keep",
    deviceType: "new",
  })

  const calculateImpact = () => {
    const baselineImpact = 285 // kg CO2e/an moyenne française 2025
    let optimizedImpact = baselineImpact

    // Durée de vie des appareils
    if (scenario.deviceLifespan >= 5) optimizedImpact *= 0.65
    else if (scenario.deviceLifespan >= 4) optimizedImpact *= 0.75
    else if (scenario.deviceLifespan >= 3) optimizedImpact *= 0.85

    // Réparation vs remplacement
    if (scenario.repairChoice === "repair") optimizedImpact *= 0.85
    else if (scenario.repairChoice === "refurb") optimizedImpact *= 0.75

    // Qualité streaming
    if (scenario.streamingQuality === "720p") optimizedImpact *= 0.92
    else if (scenario.streamingQuality === "1080p") optimizedImpact *= 0.95

    // Nettoyage emails
    if (scenario.emailCleanup === "monthly") optimizedImpact *= 0.95
    else if (scenario.emailCleanup === "weekly") optimizedImpact *= 0.92

    // Stockage cloud
    if (scenario.cloudStorage === "optimize") optimizedImpact *= 0.93
    else if (scenario.cloudStorage === "local") optimizedImpact *= 0.88

    // Type d'appareil
    if (scenario.deviceType === "refurb") optimizedImpact *= 0.7
    else if (scenario.deviceType === "repair") optimizedImpact *= 0.8

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
            <Lightbulb className="w-5 h-5 text-green-600" />
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
                <Label className="text-base font-semibold mb-3 block">
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
                <p className="text-sm text-gray-600 mt-2">
                  {scenario.deviceLifespan < 3 && "Trop court ! Visez au moins 5 ans."}
                  {scenario.deviceLifespan >= 3 && scenario.deviceLifespan < 5 && "Bien, mais vous pouvez faire mieux."}
                  {scenario.deviceLifespan >= 5 && "Excellent ! Impact optimal."}
                </p>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">En cas de panne</Label>
                <RadioGroup
                  value={scenario.repairChoice}
                  onValueChange={(value) => setScenario({ ...scenario, repairChoice: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="cursor-pointer flex-1">
                      J'achète du neuf
                      <span className="block text-sm text-gray-600">Impact: 100%</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="repair" id="repair" />
                    <Label htmlFor="repair" className="cursor-pointer flex-1">
                      Je répare
                      <span className="block text-sm text-green-600">Impact: -15%</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="refurb" id="refurb" />
                    <Label htmlFor="refurb" className="cursor-pointer flex-1">
                      J'achète reconditionné
                      <span className="block text-sm text-green-600">Impact: -25%</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Qualité de streaming</Label>
                <RadioGroup
                  value={scenario.streamingQuality}
                  onValueChange={(value) => setScenario({ ...scenario, streamingQuality: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="4k" id="4k" />
                    <Label htmlFor="4k" className="cursor-pointer flex-1">
                      4K/UHD
                      <span className="block text-sm text-gray-600">7 Go/h</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="1080p" id="1080p" />
                    <Label htmlFor="1080p" className="cursor-pointer flex-1">
                      Full HD (1080p)
                      <span className="block text-sm text-green-600">3 Go/h (-5%)</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="720p" id="720p" />
                    <Label htmlFor="720p" className="cursor-pointer flex-1">
                      HD (720p)
                      <span className="block text-sm text-green-600">0.9 Go/h (-8%)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block">Nettoyage des emails</Label>
                <RadioGroup
                  value={scenario.emailCleanup}
                  onValueChange={(value) => setScenario({ ...scenario, emailCleanup: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never" className="cursor-pointer flex-1">
                      Jamais
                      <span className="block text-sm text-gray-600">Boîte saturée</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer flex-1">
                      Mensuel
                      <span className="block text-sm text-green-600">-5% d'impact</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="cursor-pointer flex-1">
                      Hebdomadaire
                      <span className="block text-sm text-green-600">-8% d'impact</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Stockage cloud</Label>
                <RadioGroup
                  value={scenario.cloudStorage}
                  onValueChange={(value) => setScenario({ ...scenario, cloudStorage: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="keep" id="keep" />
                    <Label htmlFor="keep" className="cursor-pointer flex-1">
                      Je garde tout
                      <span className="block text-sm text-gray-600">Stockage illimité</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="optimize" id="optimize" />
                    <Label htmlFor="optimize" className="cursor-pointer flex-1">
                      J'optimise régulièrement
                      <span className="block text-sm text-green-600">-7% d'impact</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="local" id="local" />
                    <Label htmlFor="local" className="cursor-pointer flex-1">
                      Stockage local prioritaire
                      <span className="block text-sm text-green-600">-12% d'impact</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Prochain achat</Label>
                <RadioGroup
                  value={scenario.deviceType}
                  onValueChange={(value) => setScenario({ ...scenario, deviceType: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="new" id="device-new" />
                    <Label htmlFor="device-new" className="cursor-pointer flex-1">
                      Neuf
                      <span className="block text-sm text-gray-600">Impact maximal</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="repair" id="device-repair" />
                    <Label htmlFor="device-repair" className="cursor-pointer flex-1">
                      Réparer l'ancien
                      <span className="block text-sm text-green-600">-20% d'impact</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="refurb" id="device-refurb" />
                    <Label htmlFor="device-refurb" className="cursor-pointer flex-1">
                      Reconditionné
                      <span className="block text-sm text-green-600">-30% d'impact</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="font-semibold text-xl mb-6">Impact de vos choix</h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Scénario actuel</div>
                <div className="text-3xl font-bold text-gray-700">{impact.baseline}</div>
                <div className="text-sm text-gray-600">kg CO₂e/an</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Avec sobriété</div>
                <div className="text-3xl font-bold text-green-600">{impact.optimized}</div>
                <div className="text-sm text-gray-600">kg CO₂e/an</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Économie</div>
                <div className="text-3xl font-bold text-blue-600">-{impact.percentage}%</div>
                <div className="text-sm text-gray-600">{impact.savings} kg/an</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-3">Projection sur 5 ans</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="baseline" stroke="#9ca3af" name="Sans changement" strokeWidth={2} />
                  <Line type="monotone" dataKey="optimized" stroke="#10b981" name="Avec sobriété" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(impact.savings * 5)} kg CO₂e économisés
                </div>
                <div className="text-sm text-gray-600">sur 5 ans</div>
              </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Cela équivaut à:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• {Math.round((impact.savings * 5) / 0.12)} km en voiture économisés</li>
                <li>• {Math.round((impact.savings * 5) / 2.5)} arbres plantés</li>
                <li>• {Math.round((impact.savings * 5) / 0.9)} repas végétariens vs viande</li>
              </ul>
            </div>
          </div>

          {/* Actions recommandées */}
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-lg mb-3">Actions prioritaires pour vous</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {scenario.deviceLifespan < 5 && (
                <li>
                  • <strong>Allongez la durée de vie</strong> de vos appareils à 5 ans minimum
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
            <Button className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Télécharger mon plan d'action
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setScenario({
                  deviceLifespan: 3,
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

      <div className="text-sm text-gray-600 text-center">
        Sources: ADEME 2025, Shift Project, GreenIT.fr • Calculs basés sur des moyennes françaises
      </div>
    </div>
  )
}

function GreenITQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: "Quelle est la phase la plus polluante du cycle de vie d'un smartphone en 2025 ?",
      options: [
        "L'utilisation quotidienne",
        "La fabrication et l'extraction des matériaux",
        "Le transport depuis l'usine",
        "Le recyclage en fin de vie",
      ],
      correct: 1,
      explanation:
        "La fabrication représente 75-80% de l'impact total d'un smartphone. L'extraction des terres rares et l'assemblage sont très énergivores. C'est pourquoi allonger la durée de vie est si important !",
    },
    {
      question: "Combien de kg de CO₂ économise-t-on en gardant son smartphone 5 ans au lieu de 2 ans ?",
      options: ["5 kg", "15 kg", "35 kg", "55 kg"],
      correct: 2,
      explanation:
        "En gardant son smartphone 5 ans au lieu de 2 ans, on économise environ 35 kg de CO₂, soit l'équivalent de 290 km en voiture ! L'impact de fabrication est ainsi mieux amorti.",
    },
    {
      question: "Quel est le taux de recyclage des smartphones en France en 2025 ?",
      options: ["15%", "28%", "45%", "67%"],
      correct: 1,
      explanation:
        "Seulement 28% des smartphones sont recyclés en France. 72% dorment dans les tiroirs ou finissent à la poubelle. Pensez à les rapporter en point de collecte !",
    },
    {
      question: "Combien d'eau est nécessaire pour fabriquer un ordinateur portable ?",
      options: ["50 litres", "200 litres", "1 200 litres", "20 000 litres"],
      correct: 2,
      explanation:
        "Il faut environ 1 200 litres d'eau pour fabriquer un ordinateur portable, principalement pour l'extraction et le raffinage des matériaux. C'est l'équivalent de 8 baignoires !",
    },
    {
      question: "Quelle action réduit le plus l'impact environnemental du streaming vidéo ?",
      options: [
        "Regarder en WiFi plutôt qu'en 4G",
        "Baisser la luminosité de l'écran",
        "Passer de 4K à 720p",
        "Utiliser un bloqueur de publicités",
      ],
      correct: 2,
      explanation:
        "Passer de 4K à 720p réduit la consommation de données de 90% ! La différence de qualité est souvent imperceptible sur smartphone ou petit écran. Le WiFi vs 4G a aussi un impact, mais moindre.",
    },
    {
      question: "Quel pourcentage de l'empreinte carbone numérique mondiale vient des datacenters en 2025 ?",
      options: ["5%", "15%", "35%", "55%"],
      correct: 1,
      explanation:
        "Les datacenters représentent environ 15% de l'empreinte carbone numérique mondiale. Les équipements utilisateurs (smartphones, ordinateurs) représentent la majorité (65-70%).",
    },
    {
      question: "Combien d'emails non lus stockés équivalent à 1 km en voiture ?",
      options: ["10 emails", "100 emails", "1 000 emails", "10 000 emails"],
      correct: 2,
      explanation:
        "Environ 1 000 emails stockés pendant un an équivalent à 1 km en voiture. Un email avec pièce jointe peut émettre jusqu'à 50g de CO₂. Pensez à nettoyer votre boîte mail !",
    },
    {
      question: "Quel est le meilleur choix environnemental pour remplacer un smartphone cassé ?",
      options: [
        "Acheter le dernier modèle neuf",
        "Acheter un modèle neuf d'entrée de gamme",
        "Le faire réparer",
        "Acheter un modèle reconditionné",
      ],
      correct: 2,
      explanation:
        "Réparer est toujours le meilleur choix ! Cela évite une nouvelle fabrication. Si impossible, le reconditionné est la 2ème meilleure option (80% d'impact en moins vs neuf).",
    },
    {
      question: "Combien de terres rares différentes contient un smartphone ?",
      options: ["5 à 10", "15 à 20", "30 à 40", "Plus de 50"],
      correct: 2,
      explanation:
        "Un smartphone contient 30 à 40 métaux différents, dont de nombreuses terres rares (lithium, cobalt, tantale...). Leur extraction est très polluante et souvent dans des conditions sociales difficiles.",
    },
    {
      question: "Quelle est la consommation électrique annuelle d'un datacenter moyen en France ?",
      options: [
        "Équivalent à 500 foyers",
        "Équivalent à 5 000 foyers",
        "Équivalent à 50 000 foyers",
        "Équivalent à 500 000 foyers",
      ],
      correct: 2,
      explanation:
        "Un datacenter moyen consomme l'équivalent de 50 000 foyers français par an. Heureusement, le mix électrique français bas-carbone (nucléaire + renouvelables) limite l'impact CO₂.",
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1500)
    } else {
      setTimeout(() => setShowResults(true), 1500)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setScore(0)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80)
      return {
        title: "Expert Green IT !",
        message:
          "Bravo ! Vous maîtrisez parfaitement les enjeux du numérique responsable. Partagez vos connaissances autour de vous !",
        badge: "🏆",
      }
    if (percentage >= 60)
      return {
        title: "Bon niveau !",
        message: "Vous avez de bonnes bases sur le Green IT. Continuez à vous informer pour devenir un expert !",
        badge: "🌟",
      }
    if (percentage >= 40)
      return {
        title: "En progression",
        message: "Vous commencez à comprendre les enjeux. Explorez nos ressources pour approfondir vos connaissances.",
        badge: "📚",
      }
    return {
      title: "Débutant",
      message:
        "Le Green IT est un vaste sujet. Parcourez notre site pour découvrir comment réduire votre impact numérique !",
      badge: "🌱",
    }
  }

  if (showResults) {
    const scoreInfo = getScoreMessage()
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-green-600" />
            Résultats du Quiz Green IT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg border-2 border-green-200">
            <div className="text-6xl mb-4">{scoreInfo.badge}</div>
            <h3 className="text-2xl font-bold mb-2">{scoreInfo.title}</h3>
            <div className="text-5xl font-bold text-green-600 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-gray-700 mb-4">{scoreInfo.message}</p>
            <Progress value={(score / questions.length) * 100} className="h-3 mb-2" />
            <div className="text-sm text-gray-600">Score: {Math.round((score / questions.length) * 100)}%</div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Récapitulatif de vos réponses</h4>
            {questions.map((q, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  answers[index] === q.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-semibold">Q{index + 1}.</span>
                  <span className="flex-1">{q.question}</span>
                  <span className="text-xl">{answers[index] === q.correct ? "✓" : "✗"}</span>
                </div>
                <div className="ml-6 text-sm">
                  <div className={answers[index] === q.correct ? "text-green-700" : "text-red-700"}>
                    Votre réponse: {q.options[answers[index]]}
                  </div>
                  {answers[index] !== q.correct && (
                    <div className="text-green-700 mt-1">Bonne réponse: {q.options[q.correct]}</div>
                  )}
                  <div className="text-gray-600 mt-2 italic">{q.explanation}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={resetQuiz} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer le quiz
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Partager mon score
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Pour aller plus loin</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Consultez nos guides d'action pour réduire votre impact</li>
              <li>• Utilisez le calculateur d'empreinte carbone</li>
              <li>• Explorez les cas pratiques détaillés</li>
              <li>• Téléchargez nos ressources pédagogiques</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const hasAnswered = answers[currentQuestion] !== undefined

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-green-600" />
          Quiz Green IT - Testez vos connaissances
        </CardTitle>
        <CardDescription>
          10 questions pour évaluer votre niveau sur le numérique responsable (données 2025)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className="font-semibold">
              {score} bonne{score > 1 ? "s" : ""}
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        {/* Question */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
          <h3 className="text-xl font-semibold mb-6 text-balance">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = answers[currentQuestion] === index
              const isCorrect = index === question.correct
              const showFeedback = hasAnswered

              return (
                <button
                  key={index}
                  onClick={() => !hasAnswered && handleAnswer(index)}
                  disabled={hasAnswered}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    !showFeedback
                      ? "bg-white border-gray-200 hover:border-green-300 hover:bg-green-50"
                      : isSelected && isCorrect
                        ? "bg-green-100 border-green-500"
                        : isSelected && !isCorrect
                          ? "bg-red-100 border-red-500"
                          : isCorrect
                            ? "bg-green-100 border-green-500"
                            : "bg-gray-50 border-gray-200"
                  } ${hasAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && isCorrect && <span className="text-2xl">✓</span>}
                    {showFeedback && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {hasAnswered && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                answers[currentQuestion] === question.correct ? "bg-green-100" : "bg-blue-100"
              }`}
            >
              <p className="text-sm text-gray-700">
                <strong>Explication:</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>

        {!hasAnswered && (
          <div className="text-sm text-gray-600 text-center">Sélectionnez votre réponse pour continuer</div>
        )}
      </CardContent>
    </Card>
  )
}

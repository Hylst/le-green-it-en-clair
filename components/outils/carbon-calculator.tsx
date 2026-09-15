"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calculator, Download, Share2 } from "lucide-react";
import { LabeledSlider } from "./shared";

export default function CarbonCalculator() {
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

  // Calcul de l'empreinte carbone (facteurs ADEME-Arcep 2023 / Base Empreinte)
  const calculateFootprint = () => {
    let total = 0

    // Empreinte fabrication + usage annuel (kg CO2e)
    const deviceImpact = {
      smartphone: { fabrication: 50, usage: 8 },
      laptop: { fabrication: 156, usage: 22 },
      tablet: { fabrication: 63, usage: 12 },
      desktop: { fabrication: 169, usage: 88 },
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
    total += cloudUsage.email * 365 * 0.004 // ~4 g CO2e par e-mail, × 365 jours (ADEME)
    total += cloudUsage.streaming * 1.6 // ~31 g/h en SD × 52 semaines (ADEME/Shift)
    total += cloudUsage.cloud * 0.00024 // 0,00024 kg par Go/an (≈0,24 g CO2e/Go/an, ADEME Impact CO2 / Base Empreinte)
    total += cloudUsage.social * 2.55 // ~7 g/h hors vidéo × 365 jours (ADEME)

    return Math.round(total)
  }

  const totalFootprint = calculateFootprint()
  const averageDigitalUser = 330 // Repère : empreinte numérique mondiale annuelle par internaute (1,8 Gt CO₂e ÷ ~5,35 Md, Green IT 2025)
  const percentage = Math.round((totalFootprint / averageDigitalUser) * 100)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600 dark:text-green-400" />
            Calculateur d'empreinte carbone numérique
          </CardTitle>
          <CardDescription>
            Estimez l'impact environnemental de vos équipements et usages numériques (Base Empreinte / ADEME-Arcep, données 2024-2025)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Équipements */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Vos équipements</h3>
            <div className="space-y-6">
              {Object.entries(devices).map(([device, data]) => (
                <div
                  key={device}
                  className="space-y-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <Label className="capitalize font-medium text-gray-900 dark:text-gray-100">
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
                      <span className="w-8 text-center font-semibold text-gray-900 dark:text-gray-100">
                        {data.count}
                      </span>
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
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm text-gray-600 dark:text-gray-300">Âge moyen</Label>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{data.age} ans</span>
                        </div>
                        <LabeledSlider
                          label={`${device === "smartphone" ? "Smartphone" : device === "laptop" ? "Ordinateur portable" : device === "tablet" ? "Tablette" : device === "desktop" ? "Ordinateur fixe" : "Télévision"} — âge moyen`}
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
                          unit=" ans"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm text-gray-600 dark:text-gray-300">Usage quotidien</Label>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{data.usage}h</span>
                        </div>
                        <LabeledSlider
                          label={`${device === "smartphone" ? "Smartphone" : device === "laptop" ? "Ordinateur portable" : device === "tablet" ? "Tablette" : device === "desktop" ? "Ordinateur fixe" : "Télévision"} — usage quotidien`}
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
                          unit="h"
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
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Vos usages numériques</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-900 dark:text-gray-100">Emails envoyés par jour</Label>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{cloudUsage.email}</span>
                </div>
                <LabeledSlider
                  label="Emails envoyés par jour"
                  value={[cloudUsage.email]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, email: value })}
                  min={0}
                  max={200}
                  step={10}
                  unit=""
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-900 dark:text-gray-100">Streaming vidéo (heures/semaine)</Label>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{cloudUsage.streaming}</span>
                </div>
                <LabeledSlider
                  label="Streaming vidéo (heures par semaine)"
                  value={[cloudUsage.streaming]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, streaming: value })}
                  min={0}
                  max={50}
                  step={1}
                  unit="h"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-900 dark:text-gray-100">Stockage cloud (Go)</Label>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{cloudUsage.cloud}</span>
                </div>
                <LabeledSlider
                  label="Stockage cloud (Go)"
                  value={[cloudUsage.cloud]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, cloud: value })}
                  min={0}
                  max={200}
                  step={10}
                  unit="Go"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-900 dark:text-gray-100">Réseaux sociaux (heures/jour)</Label>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{cloudUsage.social}</span>
                </div>
                <LabeledSlider
                  label="Réseaux sociaux (heures par jour)"
                  value={[cloudUsage.social]}
                  onValueChange={([value]) => setCloudUsage({ ...cloudUsage, social: value })}
                  min={0}
                  max={8}
                  step={0.5}
                  unit="h"
                />
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-gray-100">
              Votre empreinte carbone numérique
            </h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-green-700 dark:text-green-400 mb-2">{totalFootprint} kg</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">CO₂e par an</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-800 dark:text-gray-200">
                  <span>Comparé à l'empreinte numérique mondiale par internaute ({averageDigitalUser} kg)</span>
                  <span className="font-semibold">{percentage}%</span>
                </div>
                <Progress value={Math.min(percentage, 100)} className="h-3" aria-label="Comparé à l'empreinte numérique mondiale par internaute" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.round(totalFootprint / 12)}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">kg CO₂e/mois</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.round(totalFootprint * 0.3)}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Économie possible (-30%)</div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg mt-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Équivalences</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>≈ {Math.round(totalFootprint / 0.17)} km en voiture</li>
                  <li>≈ {Math.round(totalFootprint / 167)} aller-retours Paris-Marseille en avion</li>
                  <li>≈ {Math.round(totalFootprint / 7)} repas avec bœuf</li>
                </ul>
                <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                  Hypothèses : fabrication amortie sur la durée de vie saisie, usage au prorata des heures (base 24 h/j). Voiture 0,17 kg CO₂/km (ADEME 2023). Streaming compté en
                  qualité SD (~31 g/h), réseaux sociaux hors vidéo (~7 g/h), e-mail ~4 g, cloud ~0,24 g/Go/an
                  (ADEME, Impact CO₂ / Base Empreinte).
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
                variant="outline"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger le rapport
              </Button>
              <Button
                className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
                variant="outline"
                onClick={async () => {
                  const text = `Mon empreinte numérique : ${totalFootprint} kg CO2e/an`
                  try {
                    if (navigator.share) {
                      await navigator.share({ title: "Mon empreinte numérique", text })
                    } else {
                      await navigator.clipboard.writeText(text)
                    }
                  } catch {
                    // partage annulé ou indisponible, on ne fait rien
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">
              Recommandations personnalisées
            </h3>
            <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
              {totalFootprint > averageDigitalUser && (
                <li>• Votre empreinte est supérieure à la moyenne. Consultez nos guides d'action pour la réduire.</li>
              )}
              {devices.smartphone.age < 3 && (
                <li>• Conservez votre smartphone au moins 5 ans pour amortir son impact de fabrication.</li>
              )}
              {cloudUsage.streaming > 20 && (
                <li>• Réduisez la qualité de streaming (720p au lieu de 4K) pour économiser jusqu'à 75 % de données et de CO₂ (The Shift Project, 2021).</li>
              )}
              {cloudUsage.email > 100 && (
                <li>• Nettoyez régulièrement votre boîte mail et désabonnez-vous des newsletters inutiles.</li>
              )}
              <li>• Privilégiez le reconditionné pour vos prochains achats (~75 % d'impact en moins, ADEME 2022).</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        Sources : Base Empreinte / ADEME-Arcep (2024-2025), GreenIT.fr, Shift Project • Méthodologie : ACV (Analyse du cycle de vie) • Usage modulé selon les heures d'utilisation par jour • Stockage
        cloud : 0,24 g CO₂e/Go/an (ADEME, Impact CO₂ / Base Empreinte)
      </div>
    </div>
  )
}

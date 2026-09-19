"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Download, RotateCcw, Building2, BarChart3, Calendar, ClipboardList, Info, Scale, Trophy } from "lucide-react";
import { CHART_FALLBACKS } from "@/lib/chart-theme";
import { LabeledSlider, PDF_COLORS } from "./shared";
import { SourceTooltip } from "@/components/source-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type CloudUsage = "low" | "medium" | "high";

interface EnterpriseConfig {
  employees: number;
  devicesPerEmployee: number;
  renewalCycle: number;
  cloudUsage: CloudUsage;
  devicePrice: number;
  energyCostPerDevice: number;
  implementationCostPerEmployee: number;
  discountRate: number;
}

interface ScenarioParams {
  deviceLifeExtension: number;
  refurbishedRate: number;
  energyOptimization: number;
  cloudOptimization: number;
}

function cloudCostPerEmployee(usage: CloudUsage): number {
  return usage === "low" ? 200 : usage === "medium" ? 500 : 1000;
}

function cloudCO2PerEmployee(usage: CloudUsage): number {
  return usage === "low" ? 50 : usage === "medium" ? 150 : 300;
}

/* Fonction utilitaire unique de calcul annuel : utilisée à la fois pour
   les totaux (années 1-5), le graphe et le tableau. Année 0 = 0 partout
   (aucun coût ni CO₂e compté « aujourd'hui »). Valeurs exactes non
   arrondies : l'arrondi se fait à l'affichage comme avant. */
function computeYear(config: EnterpriseConfig, scenario: ScenarioParams, year: number) {
  if (year === 0) {
    return { baselineCost: 0, optimizedCost: 0, savings: 0, baselineCO2: 0, optimizedCO2: 0, co2Savings: 0 };
  }
  const totalDevices = Math.round(config.employees * config.devicesPerEmployee);
  const baseRenewalCycle = config.renewalCycle;
  const optimizedRenewalCycle = baseRenewalCycle + scenario.deviceLifeExtension;

  const baseDevicesRenewed = Math.ceil(totalDevices / baseRenewalCycle);
  const baseEquipmentCost = baseDevicesRenewed * config.devicePrice;
  const baseEnergyCost = totalDevices * config.energyCostPerDevice;
  const baseCloudCost = config.employees * cloudCostPerEmployee(config.cloudUsage);
  const baseMaintenanceCost = totalDevices * 50;
  const baselineCost = baseEquipmentCost + baseEnergyCost + baseCloudCost + baseMaintenanceCost;

  const optimizedDevicesRenewed = Math.ceil(totalDevices / optimizedRenewalCycle);
  const refurbishedDevices = Math.round(optimizedDevicesRenewed * scenario.refurbishedRate);
  const newDevices = optimizedDevicesRenewed - refurbishedDevices;

  const optimizedEquipmentCost = newDevices * config.devicePrice + refurbishedDevices * config.devicePrice * 0.5;
  const optimizedEnergyCost = totalDevices * config.energyCostPerDevice * (1 - scenario.energyOptimization);
  const optimizedCloudCost = config.employees * cloudCostPerEmployee(config.cloudUsage) * (1 - scenario.cloudOptimization);
  const optimizedMaintenanceCost = totalDevices * 50 * (scenario.deviceLifeExtension > 0 ? 1.2 : 1);
  const optimizedCost = optimizedEquipmentCost + optimizedEnergyCost + optimizedCloudCost + optimizedMaintenanceCost;

  const baseCO2Devices = baseDevicesRenewed * 205;
  const baseCO2Usage = totalDevices * 9;
  const baseCO2Cloud = config.employees * cloudCO2PerEmployee(config.cloudUsage);
  const baselineCO2 = baseCO2Devices + baseCO2Usage + baseCO2Cloud;

  const optimizedCO2Devices = newDevices * 205 + refurbishedDevices * 51;
  const optimizedCO2Usage = totalDevices * 9 * (1 - scenario.energyOptimization * 0.5);
  const optimizedCO2Cloud = config.employees * cloudCO2PerEmployee(config.cloudUsage) * (1 - scenario.cloudOptimization);
  const optimizedCO2 = optimizedCO2Devices + optimizedCO2Usage + optimizedCO2Cloud;

  return {
    baselineCost,
    optimizedCost,
    savings: baselineCost - optimizedCost,
    baselineCO2,
    optimizedCO2,
    co2Savings: baselineCO2 - optimizedCO2,
  };
}

export default function EnterpriseSimulator() {
  const [config, setConfig] = useState<EnterpriseConfig>({
    employees: 50,
    devicesPerEmployee: 2.5,
    renewalCycle: 3,
    cloudUsage: "medium",
    devicePrice: 800,
    energyCostPerDevice: 60,
    implementationCostPerEmployee: 100,
    discountRate: 4,
  })

  const [selectedScenario, setSelectedScenario] = useState<"baseline" | "moderate" | "ambitious">("moderate")
  const [showResults, setShowResults] = useState(false)
  const [chartMetric, setChartMetric] = useState<"cost" | "co2">("cost")

  const scenarios = {
    baseline: {
      name: "Scénario de base",
      description: "Aucun changement de pratiques",
      selectedStyle: "border-gray-500 bg-gray-50 dark:bg-gray-900/20",
      deviceLifeExtension: 0,
      refurbishedRate: 0,
      energyOptimization: 0,
      cloudOptimization: 0,
    },
    moderate: {
      name: "Green IT modéré",
      description: "Extension durée de vie + reconditionné partiel",
      selectedStyle: "border-teal-500 bg-teal-50 dark:bg-teal-900/20",
      deviceLifeExtension: 1.5, // +1.5 ans
      refurbishedRate: 0.3, // 30 % reconditionné
      energyOptimization: 0.15, // -15 % énergie
      cloudOptimization: 0.2, // -20 % cloud
    },
    ambitious: {
      name: "Green IT ambitieux",
      description: "Stratégie complète de sobriété numérique",
      selectedStyle: "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
      deviceLifeExtension: 2.5, // +2.5 ans
      refurbishedRate: 0.6, // 60 % reconditionné
      energyOptimization: 0.3, // -30 % énergie
      cloudOptimization: 0.4, // -40 % cloud
    },
  }

  const calculateProjections = () => {
    const years = [0, 1, 2, 3, 4, 5]

    const allScenarioResults = Object.entries(scenarios).map(([key, scenario]) => {
      let grossSavings = 0
      let totalCO2Savings = 0
      let discountedGrossSavings = 0
      const rate = config.discountRate / 100

      for (let year = 1; year <= 5; year++) {
        const y = computeYear(config, scenario, year)
        grossSavings += y.savings
        totalCO2Savings += y.co2Savings
        discountedGrossSavings += rate === 0 ? y.savings : y.savings / Math.pow(1 + rate, year)
      }

      const implementationCost = key === "baseline" ? 0 : config.employees * config.implementationCostPerEmployee
      const netSavings = grossSavings - implementationCost
      const netPresentValue = discountedGrossSavings - implementationCost
      const paybackMonths = netSavings > 0 ? Math.round((implementationCost / (grossSavings / 60))) : 0

      return {
        id: key,
        name: scenario.name,
        totalSavings: Math.round(netSavings),
        totalEmissions: Math.round(totalCO2Savings),
        discountedSavings: Math.round(netPresentValue),
        payback: netSavings > 0 ? paybackMonths : -1,
        projections: years.map((year) => {
          const y = computeYear(config, scenario, year)

          return {
            year: `Année ${year}`,
            baselineCost: Math.round(y.baselineCost),
            optimizedCost: Math.round(y.optimizedCost),
            savings: Math.round(y.savings),
            baselineCO2: Math.round(y.baselineCO2),
            optimizedCO2: Math.round(y.optimizedCO2),
            co2Savings: Math.round(y.co2Savings),
          }
        })
      }
    })

    return allScenarioResults
  }

  const exportPDF = async () => {
    const { default: jsPDF } = await import("jspdf")
    const { autoTable } = await import("jspdf-autotable")
    const doc = new jsPDF()
    const allScenarioResults = calculateProjections()
    const now = new Date()
    const timestamp = now.toLocaleDateString("fr-FR")
    const fileStamp = `${timestamp.replace(/\//g, "-")}-${now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`

    // Header
    doc.setFillColor(PDF_COLORS.primary[0], PDF_COLORS.primary[1], PDF_COLORS.primary[2])
    doc.rect(0, 0, 210, 40, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text("Simulation Stratégie Green IT", 20, 25)
    doc.setFontSize(10)
    doc.text(`Généré le ${timestamp} - hylst.fr/greenit`, 20, 32)

    // Configuration
    doc.setTextColor(PDF_COLORS.text[0], PDF_COLORS.text[1], PDF_COLORS.text[2])
    doc.setFontSize(14)
    doc.text("Configuration de l'entreprise", 20, 55)
    doc.setFontSize(10)
    doc.text(`Effectif : ${config.employees} employés`, 20, 65)
    doc.text(`Équipements par employé : ${config.devicesPerEmployee}`, 20, 72)
    doc.text(`Cycle de renouvellement : ${config.renewalCycle} ans`, 20, 79)
    doc.text(`Prix appareil neuf : ${config.devicePrice.toLocaleString("fr-FR")} €, énergie : ${config.energyCostPerDevice.toLocaleString("fr-FR")} €/an/appareil, mise en œuvre : ${config.implementationCostPerEmployee.toLocaleString("fr-FR")} €/employé`, 20, 86)
    doc.text(`Taux d'actualisation : ${config.discountRate.toLocaleString("fr-FR")}${"\u00A0"}% (indicatif, à adapter à votre coût du capital)`, 20, 93)

    // Comparison Table
    const tableData = allScenarioResults.map(s => [
      s.name,
      s.totalSavings.toLocaleString("fr-FR") + " €",
      s.discountedSavings.toLocaleString("fr-FR") + " €",
      s.totalEmissions.toLocaleString("fr-FR") + " kg CO₂e", // This is actually CO2 savings
      s.payback === -1 ? "Non rentable" : s.payback === 0 ? "Immédiat" : s.payback + " mois"
    ])

    autoTable(doc, {
      startY: 100,
      head: [["Scénario", "Économies (5 ans)", "VAN (5 ans)", "CO₂ évité (5 ans)", "Retour sur investissement"]],
      body: tableData,
      headStyles: { fillColor: PDF_COLORS.primary },
      theme: "striped",
      styles: {
        font: 'helvetica',
        fontSize: 10,
        textColor: PDF_COLORS.text,
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'right' },
        2: { halign: 'right' },
        3: { halign: 'right' },
      }
    })

    // Action Plan
    // @ts-ignore
    const finalY = (doc as any).lastAutoTable.finalY + 15
    doc.setFontSize(14)
    doc.text("Plan d'action recommandé", 20, finalY)
    doc.setFontSize(10)
    const actions = [
      "Allonger la durée de vie des équipements de 3 à 5 ans.",
      "Privilégier l'achat de matériel reconditionné pour les nouveaux arrivants.",
      "Optimiser l'usage du cloud et supprimer les données inutiles.",
      "Sensibiliser les collaborateurs aux éco-gestes numériques.",
      "Mettre en place une politique de recyclage systématique."
    ]
    actions.forEach((action, index) => {
      doc.text(`${index + 1}. ${action}`, 20, finalY + 10 + (index * 7))
    })

    doc.save(`Simulation-Green-IT-${fileStamp}.pdf`)
  }

  const allScenarioResults = calculateProjections()
  const resultsForSelectedScenario = allScenarioResults.find(r => r.id === selectedScenario);
  const results = resultsForSelectedScenario ? resultsForSelectedScenario : {
    projections: [],
    totalSavings: 0,
    totalEmissions: 0, // This is CO2 savings
    discountedSavings: 0,
    payback: 0,
  };
  const scenario = scenarios[selectedScenario]
  const implementationCost = selectedScenario === "baseline" ? 0 : config.employees * config.implementationCostPerEmployee
  const roiPercent = implementationCost > 0 && results.totalSavings > 0
    ? Math.round((results.totalSavings / implementationCost) * 100)
    : 0
  /* Repères d'affichage du comparatif : simples max/min sur les totaux
     déjà calculés par calculateProjections(), aucune valeur recalculée. */
  const bestSavings = Math.max(...allScenarioResults.map((s) => s.totalSavings))
  const bestVan = Math.max(...allScenarioResults.map((s) => s.discountedSavings))
  const bestCo2 = Math.max(...allScenarioResults.map((s) => s.totalEmissions))
  const payableScenarios = allScenarioResults.filter((s) => s.payback >= 0)
  const bestPayback = payableScenarios.length > 0
    ? Math.min(...payableScenarios.map((s) => s.payback))
    : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Simulateur d'économies Green IT pour entreprises
          </CardTitle>
          <CardDescription>
            Calculez le retour sur investissement d'une stratégie de sobriété numérique sur 5 ans (données 2025)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Configuration entreprise */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground"><Building2 className="mr-2 inline h-5 w-5" />Profil de l'entreprise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-foreground">Nombre d'employés</Label>
                  <span className="font-semibold text-foreground">{config.employees}</span>
                </div>
                <LabeledSlider
                  label="Nombre d'employés"
                  value={[config.employees]}
                  onValueChange={([value]) => setConfig({ ...config, employees: value })}
                  min={10}
                  max={1000}
                  step={10}
                  unit=""
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-foreground">Appareils par employé</Label>
                  <span className="font-semibold text-foreground">{config.devicesPerEmployee}</span>
                </div>
                <LabeledSlider
                  label="Appareils par employé"
                  value={[config.devicesPerEmployee * 10]}
                  onValueChange={([value]) => setConfig({ ...config, devicesPerEmployee: value / 10 })}
                  min={10}
                  max={50}
                  step={5}
                  unit=""
                  tickDivisor={10}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-foreground">Cycle de renouvellement actuel</Label>
                  <span className="font-semibold text-foreground">{config.renewalCycle} ans</span>
                </div>
                <LabeledSlider
                  label="Cycle de renouvellement actuel"
                  value={[config.renewalCycle]}
                  onValueChange={([value]) => setConfig({ ...config, renewalCycle: value })}
                  min={2}
                  max={6}
                  step={1}
                  unit=" ans"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground">Utilisation cloud</Label>
                <RadioGroup
                  value={config.cloudUsage}
                  onValueChange={(value) => setConfig({ ...config, cloudUsage: value as typeof config.cloudUsage })}
                  className="flex gap-4"
                >
                  {[
                    { value: "low", label: "Faible" },
                    { value: "medium", label: "Moyenne" },
                    { value: "high", label: "Intensive" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`cloud-${option.value}`} />
                      <Label htmlFor={`cloud-${option.value}`} className="cursor-pointer text-muted-foreground">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-foreground">Prix d'un appareil neuf</Label>
                  <span className="font-semibold text-foreground">{config.devicePrice.toLocaleString("fr-FR")} €</span>
                </div>
                <LabeledSlider
                  label="Prix d'un appareil neuf"
                  value={[config.devicePrice]}
                  onValueChange={([value]) => setConfig({ ...config, devicePrice: value })}
                  min={400}
                  max={1500}
                  step={50}
                  unit=" €"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-foreground">Énergie par appareil et par an</Label>
                  <span className="font-semibold text-foreground">{config.energyCostPerDevice.toLocaleString("fr-FR")} €</span>
                </div>
                <LabeledSlider
                  label="Énergie par appareil et par an"
                  value={[config.energyCostPerDevice]}
                  onValueChange={([value]) => setConfig({ ...config, energyCostPerDevice: value })}
                  min={20}
                  max={150}
                  step={5}
                  unit=" €"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-foreground">Mise en œuvre par employé</Label>
                  <span className="font-semibold text-foreground">{config.implementationCostPerEmployee.toLocaleString("fr-FR")} €</span>
                </div>
                <LabeledSlider
                  label="Mise en œuvre par employé"
                  value={[config.implementationCostPerEmployee]}
                  onValueChange={([value]) => setConfig({ ...config, implementationCostPerEmployee: value })}
                  min={0}
                  max={300}
                  step={10}
                  unit=" €"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-foreground">Taux d'actualisation</Label>
                  <span className="font-semibold text-foreground">{config.discountRate.toLocaleString("fr-FR")}{" "}%</span>
                </div>
                <LabeledSlider
                  label="Taux d'actualisation"
                  value={[config.discountRate]}
                  onValueChange={([value]) => setConfig({ ...config, discountRate: value })}
                  min={0}
                  max={10}
                  step={0.5}
                  unit=" %"
                />
                <p className="text-xs text-muted-foreground">Indicatif, à adapter à votre coût du capital.</p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg col-span-full md:col-span-2">
                <div className="text-sm text-muted-foreground">
                  <strong>Votre parc :</strong> {Math.round(config.employees * config.devicesPerEmployee)} équipements pour{" "}
                  {config.employees} employés, renouvelés tous les {config.renewalCycle} ans.
                </div>
              </div>
            </div>
          </div>

          {/* Sélection du scénario */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground"><BarChart3 className="mr-2 inline h-5 w-5" />Choisissez un scénario</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(scenarios).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key as typeof selectedScenario)}
                  aria-pressed={selectedScenario === key}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${selectedScenario === key
                    ? `${s.selectedStyle} shadow-lg`
                    : "border-border hover:border-border"
                    }`}
                >
                  <h4 className="font-semibold text-foreground mb-1">{s.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
                  {key !== "baseline" && (
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Durée de vie : +{s.deviceLifeExtension.toLocaleString("fr-FR")} ans</li>
                      <li>• Reconditionné : {(s.refurbishedRate * 100).toLocaleString("fr-FR")}{" "}%</li>
                      <li>• Énergie : −{(s.energyOptimization * 100).toLocaleString("fr-FR")}{" "}%</li>
                    </ul>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton de simulation */}
          <div className="text-center">
            <Button size="lg" onClick={() => setShowResults(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
              <TrendingUp className="w-5 h-5 mr-2" />
              Simuler sur 5 ans
            </Button>
          </div>

          {/* Résultats */}
          {showResults && (
            <div className="space-y-6">
              {/* KPIs principaux */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-xl mb-4 text-foreground">
                  <TrendingUp className="mr-2 inline h-5 w-5" />Résultats sur 5 ans - {scenario.name}
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {(results.totalSavings / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k€
                    </div>
                    <div className="text-sm text-muted-foreground">Économies nettes (5 ans)</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      VAN : {(results.discountedSavings / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k€{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label={`Valeur actuelle nette : économies futures ramenées à aujourd'hui avec un taux de ${config.discountRate.toLocaleString("fr-FR")}${" "}%. Calcul : somme des économies annuelles divisées par (1 + taux) puissance année, moins la mise en œuvre.`}
                            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring align-super"
                          >
                            <Info className="h-3.5 w-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>
                            La VAN ramène les économies futures à leur valeur d'aujourd'hui : chaque année est divisée
                            par (1 + taux){` puissance année`}, puis la mise en œuvre est déduite.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {(results.totalEmissions / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} t
                    </div>
                    <div className="text-sm text-muted-foreground">CO₂e évité</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {implementationCost > 0 ? `${roiPercent.toLocaleString("fr-FR")}${" "}%` : "—"}
                    </div>
                    <div className="text-sm text-muted-foreground">ROI</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{selectedScenario === "baseline" ? "—" : results.payback === -1 ? "-" : results.payback}</div>
                    <div className="text-sm text-muted-foreground">{selectedScenario === "baseline" ? "Scénario de référence" : results.payback === -1 ? "Non rentable sur 5 ans" : "Mois pour rentabilité"}</div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Hypothèses : {config.devicePrice.toLocaleString("fr-FR")} € par appareil renouvelé (reconditionné à moitié prix), {config.energyCostPerDevice.toLocaleString("fr-FR")} €/an d'énergie par appareil, cloud 200/500/1 000 €/an selon
                  l'usage, maintenance 50 €/an/appareil (+20 % de préventif dans les scénarios optimisés), mise en œuvre
                  {` ${config.implementationCostPerEmployee.toLocaleString("fr-FR")} €/employé`}. ROI = économies nettes ÷ mise en œuvre. VAN calculée au taux de {config.discountRate.toLocaleString("fr-FR")}{" "}% (indicatif, à adapter à votre coût du capital). CO₂e : 205 kg par appareil neuf, 51 kg reconditionné (ADEME 2022), usage 9 kg/an (ADEME, Impact CO₂ 2025 <SourceTooltip source="ADEME, Impact CO₂ / Base Empreinte, 2025" info="205 kg par appareil neuf (fixe), 51 kg reconditionné (−75 %, ADEME 2022), usage 9 kg/an" />).
                </p>
              </div>

              {/* Comparatif des 3 scénarios — pur affichage des totaux déjà
                  calculés par calculateProjections(), mêmes champs que le PDF. */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h4 className="font-semibold text-lg text-foreground">
                  <Scale className="mr-2 inline h-5 w-5" />Comparatif des 3 scénarios sur 5 ans
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mêmes chiffres que le rapport PDF, à configuration égale. La ligne « référence » correspond au scénario sans changement.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th scope="col" className="text-left py-2 px-3 text-foreground">Scénario</th>
                        <th scope="col" className="text-right py-2 px-3 text-muted-foreground">Économies nettes (5 ans)</th>
                        <th scope="col" className="text-right py-2 px-3 text-muted-foreground">VAN (5 ans)</th>
                        <th scope="col" className="text-right py-2 px-3 text-muted-foreground">CO₂e évité (5 ans)</th>
                        <th scope="col" className="text-right py-2 px-3 text-muted-foreground">Retour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allScenarioResults.map((s) => {
                        const isReference = s.id === "baseline"
                        const isBestSavings = !isReference && s.totalSavings === bestSavings
                        const isBestVan = !isReference && s.discountedSavings === bestVan
                        const isBestCo2 = !isReference && s.totalEmissions === bestCo2
                        const isBestPayback = !isReference && bestPayback !== null && s.payback === bestPayback
                        const paybackLabel = isReference
                          ? "—"
                          : s.payback === -1
                            ? "Non rentable"
                            : s.payback === 0
                              ? "Immédiat"
                              : `${s.payback.toLocaleString("fr-FR")} mois`
                        return (
                          <tr key={s.id} className="border-b border-border">
                            <td className="py-2 px-3 font-medium text-foreground">
                              {s.name}
                              {isReference && (
                                <span className="block text-xs font-normal text-muted-foreground">référence</span>
                              )}
                            </td>
                            <td className={`text-right py-2 px-3 text-muted-foreground ${isBestSavings ? "font-bold text-foreground" : ""}`}>
                              {s.totalSavings.toLocaleString("fr-FR")} €
                              {isBestSavings && (
                                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">
                                  <Trophy className="h-3 w-3" aria-hidden="true" />meilleur
                                </span>
                              )}
                            </td>
                            <td className={`text-right py-2 px-3 text-muted-foreground ${isBestVan ? "font-bold text-foreground" : ""}`}>
                              {s.discountedSavings.toLocaleString("fr-FR")} €
                              {isBestVan && (
                                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">
                                  <Trophy className="h-3 w-3" aria-hidden="true" />meilleur
                                </span>
                              )}
                            </td>
                            <td className={`text-right py-2 px-3 text-muted-foreground ${isBestCo2 ? "font-bold text-foreground" : ""}`}>
                              {s.totalEmissions.toLocaleString("fr-FR")} kg CO₂e
                              {isBestCo2 && (
                                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">
                                  <Trophy className="h-3 w-3" aria-hidden="true" />meilleur
                                </span>
                              )}
                            </td>
                            <td className={`text-right py-2 px-3 text-muted-foreground ${isBestPayback ? "font-bold text-foreground" : ""}`}>
                              {paybackLabel}
                              {isBestPayback && (
                                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">
                                  <Trophy className="h-3 w-3" aria-hidden="true" />meilleur
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Le meilleur de chaque colonne est indiqué par la pastille « meilleur ». VAN calculée au taux de {config.discountRate.toLocaleString("fr-FR")}{" "}%.
                </p>
              </div>

              {/* Graphique de projection */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h4 className="font-semibold text-lg text-foreground">
                    <TrendingDown className="mr-2 inline h-5 w-5" />{chartMetric === "cost" ? "Projection des coûts sur 5 ans" : "Projection des émissions sur 5 ans"}
                  </h4>
                  <div className="flex gap-2" role="group" aria-label="Choisir la grandeur affichée">
                    <Button
                      type="button"
                      variant={chartMetric === "cost" ? "default" : "outline"}
                      size="sm"
                      aria-pressed={chartMetric === "cost"}
                      onClick={() => setChartMetric("cost")}
                    >
                      € (coûts)
                    </Button>
                    <Button
                      type="button"
                      variant={chartMetric === "co2" ? "default" : "outline"}
                      size="sm"
                      aria-pressed={chartMetric === "co2"}
                      onClick={() => setChartMetric("co2")}
                    >
                      CO₂e (émissions)
                    </Button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.projections}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_FALLBACKS.grid} />
                    <XAxis dataKey="year" stroke={CHART_FALLBACKS.tick} />
                    <YAxis
                      stroke={CHART_FALLBACKS.tick}
                      tickFormatter={(value) => chartMetric === "cost"
                        ? `${(value / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k€`
                        : `${(value / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} t`}
                    />
                    <RechartsTooltip
                      formatter={(value: number) => chartMetric === "cost"
                        ? [`${(value / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} k€`, ""]
                        : [`${Number(value).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} kg CO₂e`, ""]}
                      contentStyle={{ backgroundColor: "var(--card)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey={chartMetric === "cost" ? "baselineCost" : "baselineCO2"}
                      stroke={CHART_FALLBACKS.slate}
                      name="Sans changement"
                      strokeWidth={2}
                      dot
                    />
                    <Line
                      type="monotone"
                      dataKey={chartMetric === "cost" ? "optimizedCost" : "optimizedCO2"}
                      stroke={chartMetric === "cost" ? CHART_FALLBACKS.emerald : CHART_FALLBACKS.teal}
                      name={scenario.name}
                      strokeWidth={3}
                      dot
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 rounded" style={{ backgroundColor: CHART_FALLBACKS.slate }} />
                    <span className="text-muted-foreground">Sans changement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-emerald-500 rounded" />
                    <span className="text-muted-foreground">{scenario.name}</span>
                  </div>
                </div>
              </div>

              {/* Détail année par année */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-foreground"><Calendar className="mr-2 inline h-5 w-5" />Détail annuel</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-foreground">Année</th>
                        <th className="text-right py-2 px-3 text-muted-foreground">Coût baseline</th>
                        <th className="text-right py-2 px-3 text-muted-foreground">Coût optimisé</th>
                        <th className="text-right py-2 px-3 text-green-600 dark:text-green-400">Économies</th>
                        <th className="text-right py-2 px-3 text-emerald-600 dark:text-emerald-400">CO₂e évité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.projections.slice(1).map((p, i) => (
                        <tr key={i} className="border-b border-border">
                          <td className="py-2 px-3 font-medium text-foreground">{p.year}</td>
                          <td className="text-right py-2 px-3 text-muted-foreground">
                            {(p.baselineCost / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} k€
                          </td>
                          <td className="text-right py-2 px-3 text-muted-foreground">
                            {(p.optimizedCost / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} k€
                          </td>
                          <td className="text-right py-2 px-3 font-semibold text-green-600 dark:text-green-400">
                            +{(p.savings / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} k€
                          </td>
                          <td className="text-right py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                            -{(p.co2Savings / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} t
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-secondary font-semibold">
                        <td className="py-2 px-3 text-foreground">Total</td>
                        <td className="text-right py-2 px-3 text-muted-foreground">-</td>
                        <td className="text-right py-2 px-3 text-muted-foreground">-</td>
                        <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">
                          +{(results.totalSavings / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k€
                        </td>
                        <td className="text-right py-2 px-3 text-emerald-600 dark:text-emerald-400">
                          -{(results.totalEmissions / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} t
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  {selectedScenario !== "baseline" && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Total net : mise en œuvre ({implementationCost.toLocaleString("fr-FR")} €, soit {config.implementationCostPerEmployee.toLocaleString("fr-FR")} €/employé) déduite des économies annuelles ci-dessus. VAN au taux de {config.discountRate.toLocaleString("fr-FR")}{" "}% : {(results.discountedSavings / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k€.
                    </p>
                  )}
                </div>
              </div>

              {/* Plan d'action */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-lg mb-3 text-foreground"><ClipboardList className="mr-2 inline h-5 w-5" />Plan d'action recommandé</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Actions immédiates</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Auditer le parc existant et son état</li>
                      <li>• Former les équipes aux bonnes pratiques</li>
                      <li>• Mettre en place la maintenance préventive</li>
                      <li>• Établir une politique d'achat responsable</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Actions long terme</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Partenariat avec un reconditionneur</li>
                      <li>• Optimisation de l'infrastructure cloud</li>
                      <li>• Suivi et reporting des indicateurs RSE</li>
                      <li>• Sensibilisation continue des collaborateurs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-4">
                <Button className="flex-1 bg-card text-foreground hover:bg-secondary border border-border"
                  onClick={exportPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le rapport complet
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowResults(false)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Modifier les paramètres
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        Sources: Base Empreinte / ADEME-Arcep (2024-2025), études TCO Gartner, données sectorielles • Calculs basés sur des moyennes françaises
      </div>
    </div>
  )
}

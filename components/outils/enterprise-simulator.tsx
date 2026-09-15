"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Download, RotateCcw } from "lucide-react";
import { LabeledSlider, PDF_COLORS } from "./shared";

export default function EnterpriseSimulator() {
  const [config, setConfig] = useState({
    employees: 50,
    devicesPerEmployee: 2.5,
    averageDeviceAge: 3,
    renewalCycle: 3,
    cloudUsage: "medium" as "low" | "medium" | "high",
    datacenters: 0,
    currentInitiatives: [] as string[],
    energyPrice: 0.20, // €/kWh
  })

  const [selectedScenario, setSelectedScenario] = useState<"baseline" | "moderate" | "ambitious">("moderate")
  const [showResults, setShowResults] = useState(false)

  const scenarios = {
    baseline: {
      name: "Scénario de base",
      description: "Aucun changement de pratiques",
      color: "gray",
      deviceLifeExtension: 0,
      refurbishedRate: 0,
      energyOptimization: 0,
      cloudOptimization: 0,
    },
    moderate: {
      name: "Green IT modéré",
      description: "Extension durée de vie + reconditionné partiel",
      color: "teal",
      deviceLifeExtension: 1.5, // +1.5 ans
      refurbishedRate: 0.3, // 30% reconditionné
      energyOptimization: 0.15, // -15% énergie
      cloudOptimization: 0.2, // -20% cloud
    },
    ambitious: {
      name: "Green IT ambitieux",
      description: "Stratégie complète de sobriété numérique",
      color: "emerald",
      deviceLifeExtension: 2.5, // +2.5 ans
      refurbishedRate: 0.6, // 60% reconditionné
      energyOptimization: 0.3, // -30% énergie
      cloudOptimization: 0.4, // -40% cloud
    },
  }

  const calculateProjections = () => {
    const totalDevices = Math.round(config.employees * config.devicesPerEmployee)
    const years = [0, 1, 2, 3, 4, 5]

    const allScenarioResults = Object.entries(scenarios).map(([key, scenario]) => {
      let totalSavings = 0
      let totalCO2Savings = 0
      let cumulativeBaselineCost = 0
      let cumulativeOptimizedCost = 0

      for (let year = 1; year <= 5; year++) { // Calculate for 5 years
        // Number of renewals necessary
        const baseRenewalCycle = config.renewalCycle
        const optimizedRenewalCycle = baseRenewalCycle + scenario.deviceLifeExtension

        // Costs baseline (without optimization)
        const baseDevicesRenewed = Math.ceil(totalDevices / baseRenewalCycle)
        const baseEquipmentCost = baseDevicesRenewed * 800 // €
        const baseEnergyCost = totalDevices * 60 // €/an (average consumption)
        const baseCloudCost = config.employees * (config.cloudUsage === "low" ? 200 : config.cloudUsage === "medium" ? 500 : 1000)
        const baseMaintenanceCost = totalDevices * 50 // €/an
        const baseTotalCost = baseEquipmentCost + baseEnergyCost + baseCloudCost + baseMaintenanceCost
        cumulativeBaselineCost += baseTotalCost

        // Costs optimized
        const optimizedDevicesRenewed = Math.ceil(totalDevices / optimizedRenewalCycle)
        const refurbishedDevices = Math.round(optimizedDevicesRenewed * scenario.refurbishedRate)
        const newDevices = optimizedDevicesRenewed - refurbishedDevices

        const optimizedEquipmentCost = newDevices * 800 + refurbishedDevices * 800 * 0.5
        const optimizedEnergyCost = totalDevices * 60 * (1 - scenario.energyOptimization)
        const optimizedCloudCost = config.employees * (config.cloudUsage === "low" ? 200 : config.cloudUsage === "medium" ? 500 : 1000) * (1 - scenario.cloudOptimization)
        const optimizedMaintenanceCost = totalDevices * 50 * 1.2 // +20% preventive maintenance
        const optimizedTotalCost = optimizedEquipmentCost + optimizedEnergyCost + optimizedCloudCost + optimizedMaintenanceCost
        cumulativeOptimizedCost += optimizedTotalCost

        totalSavings += (baseTotalCost - optimizedTotalCost)

        // CO2 baseline
        const baseCO2Devices = baseDevicesRenewed * 200 // kg, ADEME Base Empreinte 2023
        const baseCO2Usage = totalDevices * 22 // kg/an
        const baseCO2Cloud = config.employees * (config.cloudUsage === "low" ? 50 : config.cloudUsage === "medium" ? 150 : 300)
        const baseTotalCO2 = baseCO2Devices + baseCO2Usage + baseCO2Cloud

        // CO2 optimized
        const optimizedCO2Devices = newDevices * 200 + refurbishedDevices * 50 // kg, reconditionné −75 % (ADEME 2022)
        const optimizedCO2Usage = totalDevices * 22 * (1 - scenario.energyOptimization * 0.5)
        const optimizedCO2Cloud = config.employees * (config.cloudUsage === "low" ? 50 : config.cloudUsage === "medium" ? 150 : 300) * (1 - scenario.cloudOptimization)
        const optimizedTotalCO2 = optimizedCO2Devices + optimizedCO2Usage + optimizedCO2Cloud

        totalCO2Savings += (baseTotalCO2 - optimizedTotalCO2)
      }

      const implementationCost = key === "baseline" ? 0 : config.employees * 100 // Coût de mise en œuvre (formation, process)
      const netSavings = totalSavings - implementationCost
      const paybackMonths = netSavings > 0 ? Math.round((implementationCost / (totalSavings / 60))) : 0

      return {
        id: key,
        name: scenario.name,
        totalSavings: Math.round(netSavings),
        totalEmissions: Math.round(totalCO2Savings),
        payback: netSavings > 0 ? paybackMonths : -1,
        projections: years.map((year) => {
          // Recalculate for chart
          const baseRenewalCycle = config.renewalCycle
          const optimizedRenewalCycle = baseRenewalCycle + scenario.deviceLifeExtension

          const baseDevicesRenewed = year > 0 ? Math.ceil(totalDevices / baseRenewalCycle) : 0
          const baseEquipmentCost = baseDevicesRenewed * 800
          const baseEnergyCost = totalDevices * 60
          const baseCloudCost = config.employees * (config.cloudUsage === "low" ? 200 : config.cloudUsage === "medium" ? 500 : 1000)
          const baseMaintenanceCost = totalDevices * 50
          const baseTotalCost = baseEquipmentCost + baseEnergyCost + baseCloudCost + baseMaintenanceCost

          const optimizedDevicesRenewed = year > 0 ? Math.ceil(totalDevices / optimizedRenewalCycle) : 0
          const refurbishedDevices = Math.round(optimizedDevicesRenewed * scenario.refurbishedRate)
          const newDevices = optimizedDevicesRenewed - refurbishedDevices

          const optimizedEquipmentCost = newDevices * 800 + refurbishedDevices * 800 * 0.5
          const optimizedEnergyCost = totalDevices * 60 * (1 - scenario.energyOptimization)
          const optimizedCloudCost = config.employees * (config.cloudUsage === "low" ? 200 : config.cloudUsage === "medium" ? 500 : 1000) * (1 - scenario.cloudOptimization)
          const optimizedMaintenanceCost = totalDevices * 50 * 1.2
          const optimizedTotalCost = optimizedEquipmentCost + optimizedEnergyCost + optimizedCloudCost + optimizedMaintenanceCost

          // CO2 logic for projections
          const baseCO2Devices = year > 0 ? baseDevicesRenewed * 200 : 0
          const baseCO2Usage = totalDevices * 22
          const baseCO2Cloud = config.employees * (config.cloudUsage === "low" ? 50 : config.cloudUsage === "medium" ? 150 : 300)
          const currentBaseTotalCO2 = year === 0 ? 0 : baseCO2Devices + baseCO2Usage + baseCO2Cloud

          const optimizedCO2Devices = year > 0 ? (newDevices * 200 + refurbishedDevices * 50) : 0
          const optimizedCO2Usage = totalDevices * 22 * (1 - scenario.energyOptimization * 0.5)
          const optimizedCO2Cloud = config.employees * (config.cloudUsage === "low" ? 50 : config.cloudUsage === "medium" ? 150 : 300) * (1 - scenario.cloudOptimization)
          const currentOptimizedTotalCO2 = year === 0 ? 0 : optimizedCO2Devices + optimizedCO2Usage + optimizedCO2Cloud

          return {
            year: `Année ${year}`,
            baselineCost: Math.round(baseTotalCost),
            optimizedCost: Math.round(optimizedTotalCost),
            savings: Math.round(baseTotalCost - optimizedTotalCost),
            baselineCO2: Math.round(currentBaseTotalCO2),
            optimizedCO2: Math.round(currentOptimizedTotalCO2),
            co2Savings: Math.round(currentBaseTotalCO2 - currentOptimizedTotalCO2),
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
    const timestamp = new Date().toLocaleDateString("fr-FR")

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

    // Comparison Table
    const tableData = allScenarioResults.map(s => [
      s.name,
      s.totalSavings.toLocaleString() + " €",
      s.totalEmissions.toLocaleString() + " kg CO2e", // This is actually CO2 savings
      s.payback === -1 ? "Non rentable" : s.payback === 0 ? "Immédiat" : s.payback + " mois"
    ])

    autoTable(doc, {
      startY: 90,
      head: [["Scénario", "Économies (5 ans)", "CO2 Évité (5 ans)", "Retour sur investissement"]],
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

    doc.save(`Simulation-Green-IT-${timestamp.replace(/\//g, "-")}.pdf`)
  }

  const resultsForSelectedScenario = calculateProjections().find(r => r.id === selectedScenario);
  const results = resultsForSelectedScenario ? resultsForSelectedScenario : {
    projections: [],
    totalSavings: 0,
    totalEmissions: 0, // This is CO2 savings
    payback: 0,
  };
  const scenario = scenarios[selectedScenario]

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
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">🏢 Profil de l'entreprise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-gray-900 dark:text-gray-100">Nombre d'employés</Label>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{config.employees}</span>
                </div>
                <LabeledSlider
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
                  <Label className="text-gray-900 dark:text-gray-100">Appareils par employé</Label>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{config.devicesPerEmployee}</span>
                </div>
                <LabeledSlider
                  value={[config.devicesPerEmployee * 10]}
                  onValueChange={([value]) => setConfig({ ...config, devicesPerEmployee: value / 10 })}
                  min={10}
                  max={50}
                  step={5}
                  unit=""
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-gray-900 dark:text-gray-100">Cycle de renouvellement actuel</Label>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{config.renewalCycle} ans</span>
                </div>
                <LabeledSlider
                  value={[config.renewalCycle]}
                  onValueChange={([value]) => setConfig({ ...config, renewalCycle: value })}
                  min={2}
                  max={6}
                  step={1}
                  unit=" ans"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-900 dark:text-gray-100">Utilisation cloud</Label>
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
                      <Label htmlFor={`cloud-${option.value}`} className="cursor-pointer text-gray-700 dark:text-gray-300">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg col-span-full md:col-span-2">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Votre parc :</strong> {Math.round(config.employees * config.devicesPerEmployee)} équipements pour{" "}
                  {config.employees} employés, renouvelés tous les {config.renewalCycle} ans.
                </div>
              </div>
            </div>
          </div>

          {/* Sélection du scénario */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">📊 Choisissez un scénario</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(scenarios).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key as typeof selectedScenario)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${selectedScenario === key
                    ? `border-${s.color}-500 bg-${s.color}-50 dark:bg-${s.color}-900/20 shadow-lg`
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{s.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{s.description}</p>
                  {key !== "baseline" && (
                    <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Durée de vie: +{s.deviceLifeExtension} ans</li>
                      <li>• Reconditionné: {s.refurbishedRate * 100}%</li>
                      <li>• Énergie: -{s.energyOptimization * 100}%</li>
                    </ul>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton de simulation */}
          <div className="text-center">
            <Button size="lg" onClick={() => setShowResults(true)} className="bg-purple-600 hover:bg-purple-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              Simuler sur 5 ans
            </Button>
          </div>

          {/* Résultats */}
          {showResults && (
            <div className="space-y-6">
              {/* KPIs principaux */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-gray-100">
                  📈 Résultats sur 5 ans - {scenario.name}
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {(results.totalSavings / 1000).toFixed(0)}k€
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Économies totales</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {(results.totalEmissions / 1000).toFixed(1)}t
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ évité</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {results.totalSavings > 0 ? Math.round((results.totalSavings / (config.employees * 100)) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">ROI</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{results.payback === -1 ? "—" : results.payback}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{results.payback === -1 ? "Non rentable sur 5 ans" : "Mois pour rentabilité"}</div>
                  </div>
                </div>
              </div>

              {/* Graphique de projection */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">
                  📉 Projection des coûts sur 5 ans
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.projections}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" />
                    <YAxis
                      stroke="rgba(255,255,255,0.6)"
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
                    />
                    <RechartsTooltip
                      formatter={(value: number) => [`${(value / 1000).toFixed(1)}k€`, ""]}
                      contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="baselineCost"
                      stroke="#94a3b8"
                      name="Sans changement"
                      strokeWidth={2}
                      dot
                    />
                    <Line
                      type="monotone"
                      dataKey="optimizedCost"
                      stroke="#10b981"
                      name={scenario.name}
                      strokeWidth={3}
                      dot
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-gray-400 rounded" />
                    <span className="text-gray-600 dark:text-gray-400">Sans changement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-emerald-500 rounded" />
                    <span className="text-gray-600 dark:text-gray-400">{scenario.name}</span>
                  </div>
                </div>
              </div>

              {/* Détail année par année */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">📅 Détail annuel</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 text-gray-900 dark:text-gray-100">Année</th>
                        <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">Coût baseline</th>
                        <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">Coût optimisé</th>
                        <th className="text-right py-2 px-3 text-green-600 dark:text-green-400">Économies</th>
                        <th className="text-right py-2 px-3 text-emerald-600 dark:text-emerald-400">CO₂ évité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.projections.slice(1).map((p, i) => (
                        <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 font-medium text-gray-900 dark:text-gray-100">{p.year}</td>
                          <td className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">
                            {(p.baselineCost / 1000).toFixed(1)}k€
                          </td>
                          <td className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">
                            {(p.optimizedCost / 1000).toFixed(1)}k€
                          </td>
                          <td className="text-right py-2 px-3 font-semibold text-green-600 dark:text-green-400">
                            +{(p.savings / 1000).toFixed(1)}k€
                          </td>
                          <td className="text-right py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                            -{(p.co2Savings / 1000).toFixed(2)}t
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 dark:bg-slate-700 font-semibold">
                        <td className="py-2 px-3 text-gray-900 dark:text-gray-100">Total</td>
                        <td className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">-</td>
                        <td className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">-</td>
                        <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">
                          +{(results.totalSavings / 1000).toFixed(0)}k€
                        </td>
                        <td className="text-right py-2 px-3 text-emerald-600 dark:text-emerald-400">
                          -{(results.totalEmissions / 1000).toFixed(1)}t
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Plan d'action */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">📋 Plan d'action recommandé</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Actions immédiates</h5>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Auditer le parc existant et son état</li>
                      <li>• Former les équipes aux bonnes pratiques</li>
                      <li>• Mettre en place la maintenance préventive</li>
                      <li>• Établir une politique d'achat responsable</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Actions long terme</h5>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
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
                <Button className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
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

      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        Sources: Base Empreinte / ADEME-Arcep (2024-2025), études TCO Gartner, données sectorielles • Calculs basés sur des moyennes françaises
      </div>
    </div>
  )
}

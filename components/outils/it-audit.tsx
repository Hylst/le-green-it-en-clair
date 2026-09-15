"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, Download, RotateCcw, Monitor, PcCase, Laptop, Smartphone, Tablet, Printer, Server, Package, BarChart3, Search, Coins, ClipboardList } from "lucide-react";
import { LabeledSlider, PDF_COLORS } from "./shared";

export default function ITAudit() {
  const [inventory, setInventory] = useState({
    desktops: { count: 10, avgAge: 4 },
    laptops: { count: 20, avgAge: 3 },
    monitors: { count: 25, avgAge: 4 },
    smartphones: { count: 15, avgAge: 2 },
    tablets: { count: 5, avgAge: 3 },
    printers: { count: 3, avgAge: 5 },
    servers: { count: 2, avgAge: 4 },
  })

  const [showResults, setShowResults] = useState(false)

  const deviceData = {
    desktops: { name: "Ordinateurs fixes", fabricationCO2: 205, usageCO2: 9.1, optimalLife: 6, icon: PcCase },
    laptops: { name: "Ordinateurs portables", fabricationCO2: 182, usageCO2: 2.1, optimalLife: 5, icon: Laptop },
    monitors: { name: "Écrans", fabricationCO2: 66, usageCO2: 4.5, optimalLife: 6, icon: Monitor },
    smartphones: { name: "Smartphones", fabricationCO2: 79, usageCO2: 0.4, optimalLife: 5, icon: Smartphone },
    tablets: { name: "Tablettes", fabricationCO2: 84, usageCO2: 1.1, optimalLife: 5, icon: Tablet },
    printers: { name: "Imprimantes", fabricationCO2: 130, usageCO2: 35, optimalLife: 7, icon: Printer },
    servers: { name: "Serveurs", fabricationCO2: 1200, usageCO2: 500, optimalLife: 5, icon: Server },
  }

  const calculateResults = () => {
    let totalCO2 = 0
    let totalDevices = 0
    let renewalNeeded = 0
    let potentialSavings = 0
    const details: Array<{
      type: string
      name: string
      count: number
      avgAge: number
      optimalLife: number
      co2: number
      status: "good" | "warning" | "critical"
      recommendation: string
    }> = []

    Object.entries(inventory).forEach(([type, { count, avgAge }]) => {
      const data = deviceData[type as keyof typeof deviceData]
      totalDevices += count

      // Calcul CO2 annuel: fabrication amortie + usage
      const fabricationPerYear = (data.fabricationCO2 / avgAge) * count
      const usagePerYear = data.usageCO2 * count
      const co2 = fabricationPerYear + usagePerYear
      totalCO2 += co2

      // Évaluation du statut
      let status: "good" | "warning" | "critical" = "good"
      let recommendation = ""

      if (avgAge < data.optimalLife * 0.6) {
        status = "good"
        recommendation = "Durée de vie optimale, continuez à utiliser ces équipements."
      } else if (avgAge < data.optimalLife) {
        status = "warning"
        recommendation = `Envisagez une extension de vie via maintenance préventive. Durée optimale: ${data.optimalLife} ans.`
      } else {
        status = "critical"
        renewalNeeded += count
        recommendation = `Renouvellement à planifier. Privilégiez le reconditionné (−75 à −90 % de CO₂, ADEME 2022).`
        potentialSavings += data.fabricationCO2 * 0.75 * count // Économie si reconditionné
      }

      if (count > 0) {
        details.push({
          type,
          name: data.name,
          count,
          avgAge,
          optimalLife: data.optimalLife,
          co2: Math.round(co2),
          status,
          recommendation,
        })
      }
    })

    // Score éco-efficacité (0-100)
    const avgLifeRatio =
      totalDevices > 0
        ? Object.entries(inventory).reduce((acc, [type, { count, avgAge }]) => {
            const data = deviceData[type as keyof typeof deviceData]
            return acc + (avgAge / data.optimalLife) * count
          }, 0) / totalDevices
        : 0

    const ecoScore = Math.min(100, Math.max(0, Math.round((1 - Math.abs(avgLifeRatio - 0.7) * 2) * 100)))

    return {
      totalCO2: Math.round(totalCO2),
      totalDevices,
      renewalNeeded,
      potentialSavings: Math.round(potentialSavings),
      ecoScore,
      details,
    }
  }

  const results = calculateResults()

  const getStatusColor = (status: "good" | "warning" | "critical") => {
    switch (status) {
      case "good":
        return "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700"
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700"
      case "critical":
        return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700"
    }
  }

  const getScoreGrade = (score: number) => {
    if (score >= 80) return { grade: "A", color: "text-emerald-600 dark:text-emerald-400", label: "Excellent" }
    if (score >= 60) return { grade: "B", color: "text-teal-600 dark:text-teal-400", label: "Bon" }
    if (score >= 40) return { grade: "C", color: "text-yellow-600 dark:text-yellow-400", label: "À améliorer" }
    if (score >= 20) return { grade: "D", color: "text-orange-600 dark:text-orange-400", label: "Insuffisant" }
    return { grade: "E", color: "text-red-600 dark:text-red-400", label: "Critique" }
  }

  const exportPDF = async () => {
    const { default: jsPDF } = await import("jspdf")
    const { autoTable } = await import("jspdf-autotable")
    const doc = new jsPDF()
    const auditResults = calculateResults()
    const scoreGrade = getScoreGrade(auditResults.ecoScore)
    const timestamp = new Date().toLocaleDateString("fr-FR")

    // Header
    doc.setFillColor(PDF_COLORS.primary[0], PDF_COLORS.primary[1], PDF_COLORS.primary[2])
    doc.rect(0, 0, 210, 40, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text("Audit Environnemental IT", 20, 25)
    doc.setFontSize(10)
    doc.text(`Généré le ${timestamp} - hylst.fr/greenit`, 20, 32)

    // Summary Section
    doc.setTextColor(PDF_COLORS.text[0], PDF_COLORS.text[1], PDF_COLORS.text[2])
    doc.setFontSize(16)
    doc.text("Résumé de l'impact", 20, 55)

    doc.setFontSize(12)
    doc.text(`Empreinte totale : ${auditResults.totalCO2.toFixed(1)} kg CO₂e / an`, 20, 65)
    doc.text(`Économies possibles : ${auditResults.potentialSavings.toFixed(1)} kg CO₂e (gain à l'achat)`, 20, 72);

    // Score Badge
    doc.setDrawColor(200, 200, 200)
    doc.roundedRect(140, 50, 50, 30, 3, 3, "S")
    doc.setFontSize(10)
    doc.text("Score Éco-IT", 145, 58)
    doc.setFontSize(24)
    doc.setTextColor(scoreGrade.color.includes("emerald") ? 5 : scoreGrade.color.includes("red") ? 200 : 0, scoreGrade.color.includes("emerald") ? 150 : 0, 0) // Simplified color mapping for PDF
    doc.text(scoreGrade.grade, 160, 72)

    // Inventory Table
    const tableData = auditResults.details.map(item => [
      item.name,
      item.count,
      item.avgAge + " ans",
      item.co2.toFixed(1) + " kg"
    ])

    autoTable(doc, {
      startY: 90,
      head: [["Équipement", "Nombre", "Âge moyen", "Impact CO₂/an"]],
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

    // Recommendations
    // @ts-ignore
    const finalY = (doc as any).lastAutoTable.finalY + 15
    doc.setTextColor(PDF_COLORS.text[0], PDF_COLORS.text[1], PDF_COLORS.text[2])
    doc.setFontSize(16)
    doc.text("Recommandations prioritaires", 20, finalY)

    doc.setFontSize(10)
    const recommendations = [
      `1. Court terme: Mettre en place une politique de maintenance préventive pour prolonger la durée de vie`,
      `2. Moyen terme: Planifier le renouvellement des ${auditResults.renewalNeeded} équipements critiques en privilégiant le reconditionné`,
      `3. Long terme: Adopter une politique d'achat responsable (labels, durabilité, réparabilité)`,
      `4. Transversal: Former les équipes aux bonnes pratiques d'usage pour prolonger la durée de vie`
    ];
    recommendations.forEach((rec, index) => {
      doc.text(rec, 20, finalY + 10 + (index * 7))
    })

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(PDF_COLORS.lightText[0], PDF_COLORS.lightText[1], PDF_COLORS.lightText[2])
    doc.text("Le Green IT en clair - Pour un numérique plus responsable", 105, 285, { align: "center" })

    doc.save(`Audit-Green-IT-${timestamp.replace(/\//g, "-")}.pdf`)
  }

  const scoreGrade = getScoreGrade(results.ecoScore)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            Audit de parc informatique
          </CardTitle>
          <CardDescription>
            Évaluez l'empreinte carbone de votre parc IT et identifiez les opportunités d'optimisation (Base Empreinte / ADEME-Arcep, données 2024-2025)
          </CardDescription>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportPDF}>
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Formulaire d'inventaire */}
          <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100"><Package className="mr-2 inline h-5 w-5" />Inventaire du parc</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(inventory).map(([type, { count, avgAge }]) => {
                const data = deviceData[type as keyof typeof deviceData]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-gray-700 dark:text-gray-300"><data.icon className="h-6 w-6" /></span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{data.name}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <Label className="text-gray-600 dark:text-gray-400">Quantité</Label>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{count}</span>
                        </div>
                        <LabeledSlider
                          label={`${data.name} — quantité`}
                          value={[count]}
                          onValueChange={([value]) =>
                            setInventory({ ...inventory, [type]: { ...inventory[type as keyof typeof inventory], count: value } })
                          }
                          min={0}
                          max={type === "servers" ? 20 : 100}
                          step={1}
                          unit=""
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <Label className="text-gray-600 dark:text-gray-400">Âge moyen</Label>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{avgAge} ans</span>
                        </div>
                        <LabeledSlider
                          label={`${data.name} — âge moyen`}
                          value={[avgAge]}
                          onValueChange={([value]) =>
                            setInventory({ ...inventory, [type]: { ...inventory[type as keyof typeof inventory], avgAge: value } })
                          }
                          min={1}
                          max={10}
                          step={1}
                          unit=" ans"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bouton d'analyse */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setShowResults(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <ClipboardCheck className="w-5 h-5 mr-2" />
              Analyser le parc
            </Button>
          </div>

          {/* Résultats */}
          {showResults && (
            <div className="space-y-6">
              {/* Score global */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-gray-100"><BarChart3 className="mr-2 inline h-5 w-5" />Résultats de l'audit</h3>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className={`text-4xl font-bold ${results.totalDevices === 0 ? "text-gray-400 dark:text-gray-500" : scoreGrade.color}`}>
                      {results.totalDevices === 0 ? "—" : scoreGrade.grade}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Score éco</div>
                    <div className={`text-xs ${results.totalDevices === 0 ? "text-gray-500 dark:text-gray-400" : scoreGrade.color}`}>
                      {results.totalDevices === 0 ? "Ajoutez au moins un équipement" : scoreGrade.label}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{results.totalDevices}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Équipements</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {(results.totalCO2 / 1000).toFixed(1)}t
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">CO₂e/an</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{results.renewalNeeded}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">À renouveler</div>
                  </div>
                </div>

                {results.totalDevices > 0 ? (
                  <>
                    <Progress value={results.ecoScore} className="h-4 mb-2" aria-label="Score d'éco-efficacité" />
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Score d'éco-efficacité : {results.ecoScore}/100
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Parc vide : indiquez vos équipements pour lancer l'analyse.
                  </p>
                )}
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                  Hypothèses : usage annuel forfaitaire par équipement, fabrication amortie sur l'âge saisi, durées de
                  vie optimales indicatives.
                </p>
              </div>

              {/* Détails par catégorie */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100"><Search className="mr-2 inline h-5 w-5" />Analyse détaillée</h4>
                <div className="space-y-3">
                  {results.details.map((item) => (
                    <div
                      key={item.type}
                      className={`p-4 rounded-lg border-2 ${getStatusColor(item.status)}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-700 dark:text-gray-300">
                            {(() => {
                              const DeviceIcon = deviceData[item.type as keyof typeof deviceData].icon
                              return <DeviceIcon className="h-6 w-6" />
                            })()}
                          </span>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100">
                              {item.name} ({item.count})
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Âge moyen: {item.avgAge} ans / Optimal: {item.optimalLife} ans
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 dark:text-gray-100">{item.co2} kg CO₂e/an</div>
                          <div
                            className={`text-sm ${item.status === "good"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : item.status === "warning"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-600 dark:text-red-400"
                              }`}
                          >
                            {item.status === "good" ? "✓ OK" : item.status === "warning" ? "⚠ À surveiller" : "⚠ Critique"}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{item.recommendation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Économies potentielles */}
              {results.potentialSavings > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">
                    <Coins className="mr-2 inline h-5 w-5" />Économies potentielles avec le reconditionné
                  </h4>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    -{(results.potentialSavings / 1000).toFixed(1)} tonnes CO₂e
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    En remplaçant les {results.renewalNeeded} équipements à renouveler par du reconditionné, vous économiseriez
                    l'équivalent de {Math.round(results.potentialSavings / 0.17)} km en voiture.
                  </p>
                </div>
              )}

              {/* Recommandations */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100"><ClipboardList className="mr-2 inline h-5 w-5" />Plan d'action recommandé</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>1. <strong>Court terme</strong>: Mettre en place une politique de maintenance préventive pour prolonger la durée de vie</li>
                  <li>2. <strong>Moyen terme</strong>: Planifier le renouvellement des {results.renewalNeeded} équipements critiques en privilégiant le reconditionné</li>
                  <li>3. <strong>Long terme</strong>: Adopter une politique d'achat responsable (labels, durabilité, réparabilité)</li>
                  <li>4. <strong>Transversal</strong>: Former les équipes aux bonnes pratiques d'usage pour prolonger la durée de vie</li>
                </ul>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
                  onClick={exportPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le rapport PDF
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowResults(false)}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Modifier l'inventaire
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        Sources: Base Empreinte / ADEME-Arcep (2024-2025), GreenIT.fr • Méthodologie: ACV (Analyse du Cycle de Vie) • Usage serveurs : ordre de grandeur variable selon le mix électrique
      </div>
    </div>
  )
}

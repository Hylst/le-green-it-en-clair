"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, Download, RotateCcw, Monitor, PcCase, Laptop, Smartphone, Tablet, Printer, Server, Package, BarChart3, Search, Coins, ClipboardList, Save, FolderOpen } from "lucide-react";
import { LabeledSlider, PDF_COLORS } from "./shared";
import { SourceTooltip } from "@/components/source-tooltip";
import {
  AUDIT_PARC_STORAGE_KEY,
  loadAuditParc,
  saveAuditParc,
  type AuditParcInventaire,
  type AuditParcSnapshot,
} from "@/lib/audit-parc-storage";

export default function ITAudit() {
  const [inventory, setInventory] = useState<AuditParcInventaire>({
    desktops: { count: 10, avgAge: 4 },
    laptops: { count: 20, avgAge: 3 },
    monitors: { count: 25, avgAge: 4 },
    smartphones: { count: 15, avgAge: 2 },
    tablets: { count: 5, avgAge: 3 },
    printers: { count: 3, avgAge: 5 },
    servers: { count: 2, avgAge: 4 },
  })

  // Part reconditionnée du parc (0-100 %, défaut 0 % : résultats identiques à avant)
  const [refurbishedPct, setRefurbishedPct] = useState(0)
  const [savedSnapshot, setSavedSnapshot] = useState<AuditParcSnapshot | null>(null)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    setSavedSnapshot(loadAuditParc())
  }, [])

  const handleSaveParc = () => {
    const snapshot = saveAuditParc(inventory, refurbishedPct)
    setSavedSnapshot(snapshot)
    setSaveMessage(
      `Parc sauvegardé le ${new Date(snapshot.date).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })} (clé ${AUDIT_PARC_STORAGE_KEY}, sur votre appareil uniquement).`,
    )
  }

  const handleReloadParc = () => {
    const snapshot = loadAuditParc()
    if (!snapshot) {
      setSavedSnapshot(null)
      return
    }
    setSavedSnapshot(snapshot)
    setInventory(snapshot.inventaire)
    setRefurbishedPct(snapshot.partReconditionnee)
    setSaveMessage("Parc rechargé depuis votre sauvegarde locale.")
  }

  const [showResults, setShowResults] = useState(false)

  const deviceData = {
    desktops: { name: "Ordinateurs fixes", fabricationCO2: 205, usageCO2: 9.1, optimalLife: 6, icon: PcCase },
    laptops: { name: "Ordinateurs portables", fabricationCO2: 182, usageCO2: 2.1, optimalLife: 5, icon: Laptop },
    monitors: { name: "Écrans", fabricationCO2: 66, usageCO2: 4.5, optimalLife: 6, icon: Monitor },
    smartphones: { name: "Smartphones", fabricationCO2: 79, usageCO2: 0.4, optimalLife: 5, icon: Smartphone },
    tablets: { name: "Tablettes", fabricationCO2: 84, usageCO2: 1.1, optimalLife: 3, icon: Tablet },
    printers: { name: "Imprimantes", fabricationCO2: 130, usageCO2: 35, optimalLife: 7, icon: Printer },
    servers: { name: "Serveurs", fabricationCO2: 1200, usageCO2: 500, optimalLife: 5, icon: Server },
  }

  const calculateResultsFor = (sourceInventory: AuditParcInventaire, refurbPct: number) => {
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

    Object.entries(sourceInventory).forEach(([type, { count, avgAge }]) => {
      const data = deviceData[type as keyof typeof deviceData]
      totalDevices += count

      // Calcul CO2 annuel : fabrication amortie sur la durée optimale (pas sur l'âge
      // saisi — diviser par l'âge rendait un parc vieillissant artificiellement vertueux).
      // La part reconditionnée réduit la fabrication : −75 % par appareil reconditionné
      // (ADEME 2022), soit fabrication × (1 − 0,75 × part). À 0 %, inchangé.
      const refurbFactor = 1 - 0.75 * (Math.min(100, Math.max(0, refurbPct)) / 100)
      const fabricationPerYear = (data.fabricationCO2 / data.optimalLife) * count * refurbFactor
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
        // Économie si reconditionné : seulement sur la part non reconditionnée
        // (sinon un parc déjà reconditionné afficherait deux fois le même gain,
        // déjà compté dans le total via refurbFactor ci-dessus).
        potentialSavings += data.fabricationCO2 * 0.75 * count * (1 - Math.min(100, Math.max(0, refurbPct)) / 100)
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

    // Score éco-efficacité (0-100) : 100 ≈ parc utilisé à environ 70 % de sa durée
    // optimale (cible interne du site, non sourcée — à harmoniser, voir todo.md)
    const avgLifeRatio =
      totalDevices > 0
        ? Object.entries(sourceInventory).reduce((acc, [type, { count, avgAge }]) => {
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

  const calculateResults = () => calculateResultsFor(inventory, refurbishedPct)

  const results = calculateResults()

  const savedResults = savedSnapshot
    ? calculateResultsFor(savedSnapshot.inventaire, savedSnapshot.partReconditionnee)
    : null

  const inventoryDiffers =
    !!savedSnapshot &&
    !!savedResults &&
    (JSON.stringify(savedSnapshot.inventaire) !== JSON.stringify(inventory) ||
      savedSnapshot.partReconditionnee !== refurbishedPct)

  const formatEcart = (value: number, unit: string) => {
    const formatted = value > 0 ? `+${value.toLocaleString("fr-FR")}` : value.toLocaleString("fr-FR")
    return `${formatted} ${unit}`
  }

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
    if (score >= 20) return { grade: "D", color: "text-orange-600 dark:text-orange-400", label: "À renforcer" }
    return { grade: "E", color: "text-red-600 dark:text-red-400", label: "Prioritaire" }
  }

  // Couleurs du badge dans le PDF, calées sur les teintes de l'écran
  const getGradePdfColor = (grade: string): [number, number, number] => {
    switch (grade) {
      case "A": return [5, 150, 105] // emerald-600
      case "B": return [13, 148, 136] // teal-600
      case "C": return [202, 138, 4] // yellow-600
      case "D": return [234, 88, 12] // orange-600
      default: return [220, 38, 38] // red-600
    }
  }

  const exportPDF = async () => {
    const { default: jsPDF } = await import("jspdf")
    const { autoTable } = await import("jspdf-autotable")
    const auditResults = calculateResults()
    if (auditResults.totalDevices === 0) return // parc vide : rien à exporter
    const doc = new jsPDF()
    const scoreGrade = getScoreGrade(auditResults.ecoScore)
    const now = new Date()
    const timestamp = now.toLocaleDateString("fr-FR")
    const fileStamp = `${timestamp.replace(/\//g, "-")}-${now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`

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
    doc.text(`Empreinte totale : ${auditResults.totalCO2.toLocaleString("fr-FR")} kg CO₂e / an`, 20, 65)
    doc.text(`Économies possibles : ${auditResults.potentialSavings.toLocaleString("fr-FR")} kg CO₂e (gain à l'achat)`, 20, 72);
    if (refurbishedPct > 0) {
      doc.text(`Dont parc reconditionné : ${refurbishedPct.toLocaleString("fr-FR")} % (−75 % fabrication, ADEME 2022)`, 20, 79)
    }

    // Score Badge
    doc.setDrawColor(200, 200, 200)
    doc.roundedRect(140, 50, 50, 30, 3, 3, "S")
    doc.setFontSize(10)
    doc.text("Score Éco-IT", 145, 58)
    doc.setFontSize(24)
    const gradeColor = getGradePdfColor(scoreGrade.grade)
    doc.setTextColor(gradeColor[0], gradeColor[1], gradeColor[2])
    doc.text(scoreGrade.grade, 160, 72)

    // Inventory Table
    const tableData = auditResults.details.map(item => [
      item.name,
      item.count,
      item.avgAge + " ans",
      item.co2.toLocaleString("fr-FR") + " kg"
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

    doc.save(`Audit-Green-IT-${fileStamp}.pdf`)
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
              <h3 className="font-semibold text-lg mb-4 text-foreground"><Package className="mr-2 inline h-5 w-5" />Inventaire du parc</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(inventory).map(([type, { count, avgAge }]) => {
                const data = deviceData[type as keyof typeof deviceData]
                return (
                  <div
                    key={type}
                    className="p-4 bg-secondary/50 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-muted-foreground"><data.icon className="h-6 w-6" /></span>
                      <span className="font-medium text-foreground">{data.name}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Quantité</span>
                          <span className="font-semibold text-foreground">{count}</span>
                        </div>
                        <LabeledSlider
                          label={`${data.name} : quantité`}
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
                          <span className="text-muted-foreground">Âge moyen</span>
                          <span className="font-semibold text-foreground">{avgAge} ans</span>
                        </div>
                        <LabeledSlider
                          label={`${data.name} : âge moyen`}
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
            <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">
                  Part reconditionnée du parc{" "}
                  <SourceTooltip
                    source="ADEME, 2022"
                    calculation="Fabrication × (1 − 0,75 × part reconditionnée)"
                    info="Chaque appareil reconditionné évite environ 75 % de l'impact de fabrication (bas de la fourchette −75 à −90 % déjà citée). À 0 %, les résultats sont inchangés."
                  />
                </span>
                <span className="font-semibold text-foreground">{refurbishedPct.toLocaleString("fr-FR")} %</span>
              </div>
              <LabeledSlider
                label="Part reconditionnée du parc"
                value={[refurbishedPct]}
                onValueChange={([value]) => setRefurbishedPct(value)}
                min={0}
                max={100}
                step={5}
                unit=" %"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Estimation prudente : seul l'impact de fabrication est réduit, l'usage annuel reste identique.
              </p>
            </div>
          </div>

          {/* Sauvegarde locale */}
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveParc}>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder ce parc
              </Button>
              {savedSnapshot && (
                <Button variant="outline" size="sm" onClick={handleReloadParc}>
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Recharger
                </Button>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Données sur votre appareil uniquement (clé {AUDIT_PARC_STORAGE_KEY}, sans compte ni envoi).
              {savedSnapshot && (
                <> Sauvegarde du {new Date(savedSnapshot.date).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}.</>
              )}
            </p>
            {saveMessage && (
              <p aria-live="polite" className="mt-1 text-xs text-muted-foreground">
                {saveMessage}
              </p>
            )}
          </div>

          {/* Comparaison avant/après */}
          {savedSnapshot && savedResults && inventoryDiffers && (
            <div className="p-4 bg-card rounded-lg border border-border transition-colors duration-200">
              <h3 className="font-semibold text-base mb-2 text-foreground">Sauvegarde contre parc actuel</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-105 text-sm">
                  <caption className="sr-only">Comparaison entre le parc sauvegardé et le parc actuel</caption>
                  <thead>
                    <tr className="text-muted-foreground">
                      <th scope="col" className="text-left font-medium py-1 pr-2">Indicateur</th>
                      <th scope="col" className="text-right font-medium py-1 px-2">Sauvegarde</th>
                      <th scope="col" className="text-right font-medium py-1 px-2">Actuel</th>
                      <th scope="col" className="text-right font-medium py-1 pl-2">Écart</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-t border-border">
                      <th scope="row" className="text-left font-normal py-1 pr-2">Équipements</th>
                      <td className="text-right py-1 px-2">{savedResults.totalDevices.toLocaleString("fr-FR")}</td>
                      <td className="text-right py-1 px-2">{results.totalDevices.toLocaleString("fr-FR")}</td>
                      <td className="text-right py-1 pl-2">{formatEcart(results.totalDevices - savedResults.totalDevices, "appareils")}</td>
                    </tr>
                    <tr className="border-t border-border">
                      <th scope="row" className="text-left font-normal py-1 pr-2">CO₂e/an</th>
                      <td className="text-right py-1 px-2">{savedResults.totalCO2.toLocaleString("fr-FR")} kg</td>
                      <td className="text-right py-1 px-2">{results.totalCO2.toLocaleString("fr-FR")} kg</td>
                      <td className="text-right py-1 pl-2">{formatEcart(results.totalCO2 - savedResults.totalCO2, "kg")}</td>
                    </tr>
                    <tr className="border-t border-border">
                      <th scope="row" className="text-left font-normal py-1 pr-2">Score</th>
                      <td className="text-right py-1 px-2">{savedResults.ecoScore.toLocaleString("fr-FR")}/100</td>
                      <td className="text-right py-1 px-2">{results.ecoScore.toLocaleString("fr-FR")}/100</td>
                      <td className="text-right py-1 pl-2">{formatEcart(results.ecoScore - savedResults.ecoScore, "pts")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
                <h3 className="font-semibold text-xl mb-4 text-foreground"><BarChart3 className="mr-2 inline h-5 w-5" />Résultats de l'audit</h3>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className={`text-4xl font-bold ${results.totalDevices === 0 ? "text-muted-foreground" : scoreGrade.color}`}>
                      {results.totalDevices === 0 ? "-" : scoreGrade.grade}
                    </div>
                    <div className="text-sm text-muted-foreground">Score éco</div>
                    <div className={`text-xs ${results.totalDevices === 0 ? "text-muted-foreground" : scoreGrade.color}`}>
                      {results.totalDevices === 0 ? "Ajoutez au moins un équipement" : scoreGrade.label}
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className="text-3xl font-bold text-foreground">{results.totalDevices}</div>
                    <div className="text-sm text-muted-foreground">Équipements</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {(results.totalCO2 / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} t
                    </div>
                    <div className="text-sm text-muted-foreground">CO₂e/an</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg text-center border border-border">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{results.renewalNeeded}</div>
                    <div className="text-sm text-muted-foreground">À renouveler</div>
                  </div>
                </div>

                {results.totalDevices > 0 ? (
                  <>
                    <Progress value={results.ecoScore} className="h-4 mb-2" aria-label="Score d'éco-efficacité" />
                    <div className="text-sm text-muted-foreground text-center">
                      Score d'éco-efficacité : {results.ecoScore}/100
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground text-center">
                      100 correspond à un parc utilisé à environ 70 % de sa durée optimale (cible interne du site){" "}
                      <SourceTooltip
                        source="Méthode du site (cible interne, sans source externe)"
                        calculation="Score = (1 − |ratio − 0,7| × 2) × 100, où ratio = âge moyen ÷ durée optimale"
                        info="Un parc renouvelé trop vite comme un parc trop âgé font baisser le score."
                      />
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center">
                    Parc vide : indiquez vos équipements pour lancer l'analyse.
                  </p>
                )}
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Hypothèses : usage annuel forfaitaire par équipement, fabrication amortie sur la durée optimale
                  (fixes 6 ans, portables 5 ans, écrans 6 ans, smartphones 5 ans, tablettes 3 ans (durée de référence
                  ADEME, Impact CO₂ 2025), imprimantes 7 ans, serveurs 5 ans, durées internes du site){" "}
                  <SourceTooltip
                    source="Base Empreinte / ADEME-Arcep, 2024-2025"
                    calculation="Fabrication ÷ durée optimale + usage annuel forfaitaire, par équipement"
                    info="Avant, la fabrication était divisée par l'âge saisi : un parc vieillissant paraissait vertueux. Ce biais est corrigé."
                  />
                </p>
              </div>

              {/* Détails par catégorie */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-foreground"><Search className="mr-2 inline h-5 w-5" />Analyse détaillée</h4>
                <div className="space-y-3">
                  {results.details.map((item) => (
                    <div
                      key={item.type}
                      className={`p-4 rounded-lg border-2 ${getStatusColor(item.status)}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">
                            {(() => {
                              const DeviceIcon = deviceData[item.type as keyof typeof deviceData].icon
                              return <DeviceIcon className="h-6 w-6" />
                            })()}
                          </span>
                          <div>
                            <div className="font-semibold text-foreground">
                              {item.name} ({item.count})
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Âge moyen: {item.avgAge} ans / Optimal: {item.optimalLife} ans
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">{item.co2} kg CO₂e/an</div>
                          <div
                            className={`text-sm ${item.status === "good"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : item.status === "warning"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-600 dark:text-red-400"
                              }`}
                          >
                            {item.status === "good" ? "OK" : item.status === "warning" ? "À surveiller" : "À renouveler"}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">{item.recommendation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Économies potentielles */}
              {results.potentialSavings > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">
                    <Coins className="mr-2 inline h-5 w-5" />Économies potentielles avec le reconditionné
                  </h4>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    -{(results.potentialSavings / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} tonnes CO₂e
                  </div>
                  <p className="text-sm text-muted-foreground">
                    En remplaçant les {results.renewalNeeded} équipements à renouveler par du reconditionné, vous économiseriez
                    l'équivalent de {Math.round(results.potentialSavings / 0.17).toLocaleString("fr-FR")} km en voiture (0,17 kg/km, ADEME 2023).
                    Hypothèse prudente : bas de la fourchette −75 à −90 % (ADEME 2022).
                  </p>
                </div>
              )}

              {/* Recommandations */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-lg mb-3 text-foreground"><ClipboardList className="mr-2 inline h-5 w-5" />Plan d'action recommandé</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>1. <strong>Court terme</strong>: Mettre en place une politique de maintenance préventive pour prolonger la durée de vie</li>
                  <li>2. <strong>Moyen terme</strong>: Planifier le renouvellement des {results.renewalNeeded} équipements critiques en privilégiant le reconditionné</li>
                  <li>3. <strong>Long terme</strong>: Adopter une politique d'achat responsable (labels, durabilité, réparabilité)</li>
                  <li>4. <strong>Transversal</strong>: Former les équipes aux bonnes pratiques d'usage pour prolonger la durée de vie</li>
                </ul>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-card text-foreground hover:bg-secondary border border-border"
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

      <div className="text-sm text-muted-foreground text-center">
        Sources: Base Empreinte / ADEME-Arcep (2024-2025), GreenIT.fr • Méthodologie: ACV (Analyse du Cycle de Vie) • Usage serveurs : ordre de grandeur variable selon le mix électrique
      </div>
    </div>
  )
}

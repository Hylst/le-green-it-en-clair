"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Globe,
  Search,
  Download,
  Share2,
  Check,
  Leaf,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react"
import { ScopeNote } from "./outils/shared"

// Modèle Sustainable Web Design v4 (2024, Wholegrain Digital / Green Web Foundation) :
// CO2e par visite = poids (Go) x 0,194 kWh/Go (AIE) x 494 gCO2e/kWh (Ember, 2023)
// x 0,757 si hébergeur vert vérifié (facteur vert 0,243 de la Green Web Foundation).
// Périmètre : émissions opérationnelles (datacenters + réseaux + terminal).
// La fabrication des équipements (émissions embodied) n'est pas incluse.
const KWH_PER_GB = 0.194
const GCO2_PER_KWH = 494
const GREEN_FACTOR = 0.243

type GwfState =
  | { status: "checked"; green: boolean; hostedBy?: string; domain: string }
  | { status: "failed"; domain: string }
  | { status: "skipped" }
  | null

type Estimation = {
  label: string
  weightMB: number
  visits: number
  green: boolean
  co2PerVisit: number // en g CO2e
  co2PerMonth: number // en kg CO2e
}

function computeEstimation(weightMB: number, visits: number, green: boolean): { co2PerVisit: number; co2PerMonth: number } {
  const co2PerVisit = ((weightMB / 1024) * KWH_PER_GB * GCO2_PER_KWH * (green ? 1 - GREEN_FACTOR : 1))
  return { co2PerVisit, co2PerMonth: (co2PerVisit * visits) / 1000 }
}

// Affichage à la française : 0,24 au lieu de 0.24
function fr(n: number, decimals = 2) {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: decimals })
}

function extractDomain(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    return new URL(withProto).hostname
  } catch {
    return null
  }
}

// Green-check en direct via l'API publique (gratuite, sans clé) de la Green Web
// Foundation. Repli manuel : si l'appel échoue, on garde la case cochée par l'utilisateur.
async function checkGreenHost(domain: string): Promise<{ green: boolean; hostedBy?: string } | null> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 8000)
  try {
    const res = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${encodeURIComponent(domain)}`, {
      signal: ctrl.signal,
    })
    if (!res.ok) return null
    const data = await res.json()
    return { green: data.green === true, hostedBy: data.hosted_by ?? undefined }
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

const OUTBOUND_LINKS = [
  { href: "https://www.websitecarbon.com/", label: "Website Carbon Calculator" },
  { href: "https://www.ecoindex.fr/", label: "EcoIndex" },
  { href: "https://pagespeed.web.dev/", label: "PageSpeed Insights" },
  { href: "https://sustainablewebdesign.org/", label: "Sustainable Web Design" },
]

export function WebsiteCarbonCalculator() {
  const [url, setUrl] = useState("")
  const [weightMB, setWeightMB] = useState("2.1")
  const [visits, setVisits] = useState("10000")
  // Poids cible optionnel du simulateur « et si j'allège ? » (vide = désactivé)
  const [targetMB, setTargetMB] = useState("")
  const [greenHost, setGreenHost] = useState(false)
  const [gwf, setGwf] = useState<GwfState>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<Estimation | null>(null)
  const [copied, setCopied] = useState(false)

  const parsedWeight = parseFloat(weightMB.replace(",", "."))
  const parsedVisits = parseInt(visits.replace(/[\s\u202f]/g, ""), 10)
  const inputsValid =
    Number.isFinite(parsedWeight) && parsedWeight > 0 && parsedWeight <= 1000 && Number.isFinite(parsedVisits) && parsedVisits > 0 && parsedVisits <= 100000000

  // Cible d'allègement : mêmes bornes que le poids, virgule acceptée
  const parsedTarget = parseFloat(targetMB.replace(",", "."))
  const targetValid =
    Number.isFinite(parsedTarget) && parsedTarget > 0 && parsedTarget <= 1000

  // Gain de l'objectif (réutilise computeEstimation tel quel, aucun nouveau modèle) :
  // nul quand la cible est invalide ou supérieure au poids actuel.
  const actualPreview = inputsValid ? computeEstimation(parsedWeight, parsedVisits, greenHost) : null
  const targetPreview =
    inputsValid && targetValid ? computeEstimation(parsedTarget, parsedVisits, greenHost) : null
  const gainPreview =
    actualPreview && targetPreview && targetPreview.co2PerVisit < actualPreview.co2PerVisit
      ? {
          perVisit: actualPreview.co2PerVisit - targetPreview.co2PerVisit,
          perMonth: actualPreview.co2PerMonth - targetPreview.co2PerMonth,
          pct: ((actualPreview.co2PerVisit - targetPreview.co2PerVisit) / actualPreview.co2PerVisit) * 100,
        }
      : null

  const estimate = async () => {
    if (!inputsValid || isAnalyzing) return
    setIsAnalyzing(true)
    setGwf(null)

    // L'URL sert uniquement à identifier l'hébergeur : un navigateur ne peut pas
    // peser une page distante, d'où le poids saisi manuellement ci-dessus.
    let green = greenHost
    const domain = extractDomain(url)
    if (domain) {
      const check = await checkGreenHost(domain)
      if (check) {
        green = check.green
        setGreenHost(check.green)
        setGwf({ status: "checked", green: check.green, hostedBy: check.hostedBy, domain })
      } else {
        setGwf({ status: "failed", domain })
      }
    } else {
      setGwf({ status: "skipped" })
    }

    const { co2PerVisit, co2PerMonth } = computeEstimation(parsedWeight, parsedVisits, green)
    setResults({
      label: domain ?? "votre page",
      weightMB: parsedWeight,
      visits: parsedVisits,
      green,
      co2PerVisit,
      co2PerMonth,
    })
    setIsAnalyzing(false)
  }

  const toggleGreenAfterResult = (checked: boolean) => {
    setGreenHost(checked)
    // La bascule manuelle remplace la vérification auto : on oublie le statut
    // Green Web Foundation pour afficher "saisie manuelle".
    setGwf(null)
    setResults((prev) => {
      if (!prev) return prev
      const { co2PerVisit, co2PerMonth } = computeEstimation(prev.weightMB, prev.visits, checked)
      return { ...prev, green: checked, co2PerVisit, co2PerMonth }
    })
  }

  const getCarbonRating = (carbonPerVisit: number) => {
    if (carbonPerVisit < 0.5) return { label: "A+", color: "bg-green-600", textColor: "text-green-800 dark:text-green-400" }
    if (carbonPerVisit < 1) return { label: "A", color: "bg-green-500", textColor: "text-green-800 dark:text-green-400" }
    if (carbonPerVisit < 2) return { label: "B", color: "bg-yellow-500", textColor: "text-yellow-800 dark:text-yellow-400" }
    if (carbonPerVisit < 3) return { label: "C", color: "bg-orange-500", textColor: "text-orange-800 dark:text-orange-400" }
    return { label: "D", color: "bg-red-500", textColor: "text-red-800 dark:text-red-400" }
  }

  if (!results) {
    return (
      <Card className="shadow-lg dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-poppins">
            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Estimateur d&apos;empreinte d&apos;une page web
          </CardTitle>
          <CardDescription>
            Une estimation transparente à partir du poids réel de votre page (modèle Sustainable Web Design v4, 2024), pas une mesure automatique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScopeNote />
          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-base font-semibold mb-2 block dark:text-gray-100">
                Adresse de la page (optionnel)
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://exemple.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 dark:bg-slate-700 dark:text-gray-100 dark:border-slate-600"
                disabled={isAnalyzing}
              />
              <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                Sert uniquement à vérifier l&apos;hébergeur via la Green Web Foundation. Votre navigateur ne peut pas
                peser une page distante : mesurez-la avec PageSpeed Insights ou l&apos;onglet Réseau des outils de
                développement, puis saisissez le poids ci-dessous.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="poids" className="text-base font-semibold mb-2 block dark:text-gray-100">
                  Poids transféré par visite (Mo)
                </Label>
                <Input
                  id="poids"
                  type="text"
                  inputMode="decimal"
                  value={weightMB}
                  onChange={(e) => setWeightMB(e.target.value)}
                  className="dark:bg-slate-700 dark:text-gray-100 dark:border-slate-600"
                  disabled={isAnalyzing}
                />
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                  Repère : une page moyenne pèse environ 2,5 Mo (HTTP Archive, 2025). La valeur pré-remplie est un
                  exemple : remplacez-la par votre mesure.
                </p>
              </div>
              <div>
                <Label htmlFor="visites" className="text-base font-semibold mb-2 block dark:text-gray-100">
                  Visites par mois
                </Label>
                <Input
                  id="visites"
                  type="number"
                  min="1"
                  step="1"
                  value={visits}
                  onChange={(e) => setVisits(e.target.value)}
                  className="dark:bg-slate-700 dark:text-gray-100 dark:border-slate-600"
                  disabled={isAnalyzing}
                />
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                  Sert à projeter l&apos;estimation sur un mois. Une fourchette honnête vaut mieux qu&apos;un chiffre
                  précis mais faux.
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="objectif-poids" className="text-base font-semibold mb-2 block dark:text-gray-100">
                Objectif d&apos;allègement (optionnel)
              </Label>
              <Input
                id="objectif-poids"
                type="text"
                inputMode="decimal"
                placeholder="Ex. 1"
                value={targetMB}
                onChange={(e) => setTargetMB(e.target.value)}
                className="dark:bg-slate-700 dark:text-gray-100 dark:border-slate-600"
                disabled={isAnalyzing}
              />
              <p aria-live="polite" className="text-sm text-slate-600 dark:text-gray-400 mt-2">
                {!targetValid ? (
                  "Fixez un poids cible pour voir le gain en direct."
                ) : gainPreview ? (
                  <>
                    À {fr(parsedTarget, 1)} Mo : −{fr(gainPreview.perVisit)} g/visite (−
                    {fr(gainPreview.pct, 0)}
                    {"\u00a0"}%), soit −{fr(gainPreview.perMonth)} kg/mois.
                  </>
                ) : inputsValid ? (
                  "Objectif supérieur ou égal au poids actuel : aucun gain."
                ) : null}
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <Checkbox
                id="hebergeur-vert"
                checked={greenHost}
                onCheckedChange={(c) => setGreenHost(c === true)}
                disabled={isAnalyzing}
                aria-label="Mon hébergeur utilise des énergies renouvelables"
              />
              <div>
                <Label htmlFor="hebergeur-vert" className="font-medium dark:text-gray-100 cursor-pointer">
                  Mon hébergeur utilise des énergies renouvelables
                </Label>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">
                  Pré-cochée automatiquement si la Green Web Foundation référence le domaine comme vert, modifiable à
                  tout moment.
                </p>
              </div>
            </div>

            <Button
              onClick={estimate}
              disabled={!inputsValid || isAnalyzing}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Search className="h-4 w-4 mr-2 animate-spin" />
                  Vérification de l&apos;hébergeur...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Estimer
                </>
              )}
            </Button>
            {!inputsValid && (
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Saisissez un poids et un nombre de visites supérieurs à zéro pour lancer l&apos;estimation.
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="font-semibold mb-2 dark:text-gray-100 font-poppins">Méthodologie affichée</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                CO₂e par visite = poids (Go) × 0,194 kWh/Go × 494 gCO₂e/kWh × 0,757 si hébergeur vert. Modèle
                Sustainable Web Design v4 (2024).
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-semibold mb-2 dark:text-gray-100 font-poppins">Données sourcées</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                0,194 kWh/Go (AIE) • 494 gCO₂e/kWh (Ember, 2023) • −24,3 % si hébergeur vert (Green Web Foundation).
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
              <AlertCircle className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="font-semibold mb-2 dark:text-gray-100 font-poppins">Limites annoncées</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Estimation des émissions opérationnelles (datacenters, réseaux, terminal). La fabrication des
                équipements n&apos;est pas incluse.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">Note importante</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Cette estimation dépend du poids que vous saisissez : mesurez votre page pour un résultat utile. Pour
                  une mesure automatique, essayez les outils externes listés dans le rapport (Website Carbon, EcoIndex).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const rating = getCarbonRating(results.co2PerVisit)

  // Rappel de l'objectif recalculé sur ce résultat (mêmes visites, même statut vert)
  const targetGainResult =
    targetValid && results.co2PerVisit > 0
      ? (() => {
          const target = computeEstimation(parsedTarget, results.visits, results.green)
          const perVisit = results.co2PerVisit - target.co2PerVisit
          if (perVisit <= 0) return { hasGain: false as const }
          return {
            hasGain: true as const,
            perVisit,
            perMonth: results.co2PerMonth - target.co2PerMonth,
            pct: (perVisit / results.co2PerVisit) * 100,
          }
        })()
      : null

  return (
    <div className="space-y-6" aria-live="polite">
      <Card className="shadow-lg dark:bg-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-poppins">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Estimation pour {results.label}
              </CardTitle>
              <CardDescription>
                Calcul local à partir de vos saisies : modèle Sustainable Web Design v4 (2024)
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                setResults(null)
                setGwf(null)
              }}
              variant="outline"
              className="bg-transparent border-gray-300 dark:border-gray-600"
            >
              Nouvelle estimation
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Métriques calculées (aucune valeur simulée) */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {fr(results.weightMB, 1)} Mo
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Poids saisi par visite</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Repère moyen : ~2,5 Mo (HTTP Archive, 2025)</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 p-6 rounded-lg border-2 border-green-200 dark:border-green-800 text-center">
              <div className={`text-3xl font-bold ${rating.textColor} mb-1`}>{fr(results.co2PerVisit)} g</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">CO₂e par visite</div>
              <Badge className={`mt-2 ${rating.color} text-white`}>{rating.label}</Badge>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">Barème indicatif du site (g CO₂e/visite)</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {fr(results.co2PerMonth)} kg
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">CO₂e par mois</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Pour {results.visits.toLocaleString("fr-FR")} visites
              </div>
            </div>
          </div>

          {/* Hébergement : résultat réel du green-check, pas un tirage au sort */}
          <div
            className={`p-4 rounded-lg border-2 ${results.green ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"}`}
          >
            <div className="flex items-start gap-3">
              {results.green ? (
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5" />
              ) : (
                <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="font-semibold font-poppins text-green-900 dark:text-green-200">
                  {gwf?.status === "checked"
                    ? results.green
                      ? `Hébergeur vert vérifié${gwf.hostedBy ? ` (${gwf.hostedBy})` : ""}`
                      : "Hébergeur non référencé comme vert"
                    : results.green
                      ? "Hébergeur vert (saisie manuelle)"
                      : "Hébergeur standard (saisie manuelle)"}
                </h4>
                <p className="text-sm text-green-800 dark:text-green-300">
                  {gwf?.status === "checked" &&
                    `Vérifié à l'instant via l'API publique de la Green Web Foundation pour ${gwf.domain}.`}
                  {gwf?.status === "failed" &&
                    `La vérification automatique a échoué pour ${gwf.domain} : la case ci-dessous reflète votre saisie.`}
                  {gwf?.status === "skipped" && "Pas d'URL saisie : la case ci-dessous reflète votre saisie."}
                </p>
                {gwf?.status === "failed" && (
                  <Button size="sm" variant="outline" className="mt-2" onClick={estimate} disabled={isAnalyzing}>
                    Réessayer la vérification
                  </Button>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <Checkbox
                    id="hebergeur-vert-resultat"
                    checked={greenHost}
                    onCheckedChange={(c) => toggleGreenAfterResult(c === true)}
                    aria-label="Mon hébergeur utilise des énergies renouvelables"
                  />
                  <Label htmlFor="hebergeur-vert-resultat" className="text-sm cursor-pointer dark:text-gray-200">
                    Mon hébergeur utilise des énergies renouvelables (recalcule l&apos;estimation)
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Rappel de l'objectif d'allègement, recalculé sur ce résultat */}
          {targetGainResult && (
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                {targetGainResult.hasGain ? (
                  <>
                    Objectif {fr(parsedTarget, 1)} Mo : −{fr(targetGainResult.perVisit)} g/visite (−
                    {fr(targetGainResult.pct, 0)}
                    {"\u00a0"}%), soit −{fr(targetGainResult.perMonth)} kg/mois.
                  </>
                ) : (
                  <>Objectif de {fr(parsedTarget, 1)} Mo : supérieur ou égal au poids estimé, aucun gain.</>
                )}
              </p>
            </div>
          )}

          {/* Recommandations génériques et honnêtes (aucun potentiel chiffré inventé) */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-lg mb-4 text-blue-900 dark:text-blue-200 font-poppins">
              Pistes pour alléger la page
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Optimiser les images</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Format WebP, dimensions adaptées, chargement différé : c&apos;est souvent le premier poste de poids
                    d&apos;une page.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Alléger le code</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    JavaScript et CSS minifiés, polices limitées au nécessaire, suivi du poids à chaque mise en ligne.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Mettre en cache</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Cache navigateur et CDN bien réglés : les visites suivantes ne retéléchargent pas tout.
                  </p>
                </div>
              </div>
              {!results.green && (
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Hébergement vert</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Un hébergeur alimenté en énergies renouvelables réduit la part datacenter de l&apos;estimation
                      (facteur −24,3 % appliqué ci-dessus quand la case est cochée).
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Équivalences recalculées sur la vraie valeur, facteurs affichés */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-lg mb-4 text-green-900 dark:text-green-200 font-poppins">
              Ordres de grandeur ({fr(results.co2PerMonth)} kg CO₂e/mois, facteurs ADEME 2023)
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {Math.round(results.co2PerMonth / 0.17).toLocaleString("fr-FR")}
                </div>
                <div className="text-gray-700 dark:text-gray-300">km en voiture (0,17 kg/km, ADEME 2023)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {Math.round((results.co2PerMonth * 12) / 20).toLocaleString("fr-FR")}
                </div>
                <div className="text-gray-700 dark:text-gray-300">arbres pendant 1 an (20 kg/arbre, ADEME)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {Math.round(results.co2PerMonth / 7).toLocaleString("fr-FR")}
                </div>
                <div className="text-gray-700 dark:text-gray-300">repas avec bœuf (7 kg/repas, ADEME)</div>
              </div>
            </div>
          </div>

          {/* Actions branchées sur les patterns des autres outils (print + partage) */}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
              variant="outline"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4 mr-2" />
              Imprimer le rapport
            </Button>
            <Button
              className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600"
              variant="outline"
              onClick={async () => {
                const text = `Estimation : ${fr(results.co2PerVisit)} g CO₂e par visite pour ${results.label} (SWD v4, 2024)`
                try {
                  if (navigator.share) {
                    await navigator.share({ title: "Estimation carbone d'une page web", text })
                  } else {
                    await navigator.clipboard.writeText(text)
                    setCopied(true)
                    window.setTimeout(() => setCopied(false), 2000)
                  }
                } catch {
                  // partage annulé ou indisponible, on ne fait rien
                }
              }}
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
              {copied ? "Copié !" : "Partager"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 dark:text-gray-300 text-center space-y-2">
        <p>
          Méthode : Sustainable Web Design v4 (2024) : 0,194 kWh/Go (AIE), 494 gCO₂e/kWh (Ember, 2023), facteur vert
          0,243 (Green Web Foundation). Hors fabrication des équipements. Pour une mesure automatique :
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {OUTBOUND_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100"
            >
              {link.label}
              <ExternalLink className="inline h-3 w-3 ml-1" aria-hidden="true" />
            </a>
          ))}
        </p>
      </div>
    </div>
  )
}

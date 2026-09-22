"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Cloud, Lightbulb, Leaf, CheckCircle2, Clock, Compass, Download, RotateCcw } from "lucide-react";
import { SourceTooltip } from "@/components/source-tooltip";
import { MoreDetails } from "@/components/more-details";

/* Méthode transparente : scores recalculés à partir des données affichées.
   Score éco (0-100, arrondi) = 40 % PUE + 40 % renouvelable + 20 % engagements.
   - PUE : 100 à 1,0, 0 à 1,5 et au-delà, linéaire entre les deux.
   - Renouvelable : le % affiché (matching annuel déclaré, pas un 24/7).
   - Engagements : 10 pts neutralité déclarée + jusqu'à 10 pts certifications
     (≥ 3 certifications : 10 ; 2 : 7 ; 1 : 3 ; 0 : 0). */
const SCORE_WEIGHTS = { pue: 0.4, renewable: 0.4, commitments: 0.2 } as const

function pueSubScore(pue: number): number {
  return Math.max(0, Math.min(100, ((1.5 - pue) / 0.5) * 100))
}

function commitmentsSubScore(carbonNeutral: boolean, certificationsCount: number): number {
  const neutralPoints = carbonNeutral ? 10 : 0
  const certPoints = certificationsCount >= 3 ? 10 : certificationsCount === 2 ? 7 : certificationsCount === 1 ? 3 : 0
  return (neutralPoints + certPoints) * 5
}

function computeSustainabilityScore(provider: { pue: number; renewableEnergy: number; carbonNeutral: boolean; certifications: string[] }): number {
  const score =
    SCORE_WEIGHTS.pue * pueSubScore(provider.pue) +
    SCORE_WEIGHTS.renewable * provider.renewableEnergy +
    SCORE_WEIGHTS.commitments * commitmentsSubScore(provider.carbonNeutral, provider.certifications.length)
  return Math.round(score)
}

type CloudProvider = {
  name: string
  country: string
  pue: number
  renewableEnergy: number
  carbonNeutral: boolean
  certifications: string[]
  description: string
  /* Document primaire lu pour alimenter la fiche (rapports 2024-2026 vérifiés à la main). */
  source: string
  color: string
  /* Serveurs opérés en France : vrai uniquement si sourcé (page datacenters
     du fournisseur + année). Le pays affiché reste celui du siège. */
  serveursFrance: boolean
  serveursFranceNote: string
}

/* Questionnaire besoin (chantier V3.2) : 3 questions maximum, logique 100 %
   basée sur les données affichées (pays, PUE, renouvelable, scores calculés).
   Pas de question budget : le site ne publie aucune donnée prix. */
type UsageAnswer = "site" | "services" | "mondial"
type RegionAnswer = "france" | "europe" | "monde"
type PriorityAnswer = "score" | "pue" | "renouvelable"

type ScoredProvider = CloudProvider & { sustainabilityScore: number }

type RecommendationItem = { name: string; reason: string }
type RecommendationResult = { intro: string; items: RecommendationItem[]; note: string }

/* Espace insécable (typographie française devant « % ») et BOM pour Excel. */
const NBSP = " "
const CSV_BOM = "﻿"

const EUROPEAN_COUNTRIES = ["France", "Suisse", "Allemagne"]

const USAGE_OPTIONS: { value: UsageAnswer; label: string }[] = [
  { value: "site", label: "Héberger un site ou une application web" },
  { value: "services", label: "Déployer des services cloud ou des API" },
  { value: "mondial", label: "Déployer à l'échelle mondiale" },
]

const REGION_OPTIONS: { value: RegionAnswer; label: string }[] = [
  { value: "france", label: "France" },
  { value: "europe", label: "Europe" },
  { value: "monde", label: "Monde entier" },
]

const PRIORITY_OPTIONS: { value: PriorityAnswer; label: string }[] = [
  { value: "score", label: "Le meilleur score éco global" },
  { value: "pue", label: "Le meilleur PUE (efficacité énergétique)" },
  { value: "renouvelable", label: "La part de renouvelable la plus élevée" },
]

const USAGE_INTROS: Record<UsageAnswer, string> = {
  site: "héberger un site ou une application web",
  services: "déployer des services cloud ou des API",
  mondial: "un déploiement à l'échelle mondiale",
}

const REGION_LABELS: Record<RegionAnswer, string> = {
  france: "en France",
  europe: "en Europe (France, Suisse, Allemagne)",
  monde: "sans filtre géographique",
}

const PRIORITY_LABELS: Record<PriorityAnswer, string> = {
  score: "score éco",
  pue: "PUE",
  renouvelable: "part d'énergie renouvelable",
}

const USAGE_NOTES: Record<UsageAnswer, string> = {
  site: "Pensez à vérifier la localisation exacte du datacenter au moment de souscrire.",
  services:
    "Rappel : un « 100 % renouvelable » affiché correspond souvent à un matching annuel, pas à un fonctionnement 24/7 décarboné.",
  mondial:
    "Les acteurs « Global » opèrent sur plusieurs continents : la localisation réelle de vos données dépendra de la région choisie au moment de souscrire.",
}

function filterByRegion(all: ScoredProvider[], region: RegionAnswer): ScoredProvider[] {
  if (region === "france") return all.filter((p) => p.country === "France")
  if (region === "europe") return all.filter((p) => EUROPEAN_COUNTRIES.includes(p.country))
  return [...all]
}

function sortByPriority(pool: ScoredProvider[], priority: PriorityAnswer): ScoredProvider[] {
  return [...pool].sort((a, b) => {
    if (priority === "pue") return a.pue - b.pue || b.sustainabilityScore - a.sustainabilityScore
    if (priority === "renouvelable")
      return b.renewableEnergy - a.renewableEnergy || b.sustainabilityScore - a.sustainabilityScore
    return b.sustainabilityScore - a.sustainabilityScore
  })
}

function buildReason(provider: ScoredProvider, rank: number, total: number): string {
  const pue = provider.pue.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 2 })
  const neutrality = provider.carbonNeutral ? "neutralité carbone déclarée" : "neutralité carbone encore en cours"
  return `Score éco de ${provider.sustainabilityScore} (n° ${rank} sur ${total} au classement général), données hébergées en ${provider.country}, PUE de ${pue} et ${provider.renewableEnergy}${NBSP}% d'énergie renouvelable, ${neutrality}.`
}

/* Règles de recommandation (transparentes, 100 % basées sur les données affichées) :
   1. la région filtre sur le pays (France : 2 hébergeurs ; Europe : France, Suisse, Allemagne) ;
   2. le critère prioritaire trie le groupe (score décroissant, PUE croissant, renouvelable décroissant) ;
   3. les ex æquo se départagent au score éco (ordre stable, comme le classement général) ;
   4. on retient les 3 premiers (2 si le filtre France n'en donne que 2) ;
   5. l'usage principal ne filtre ni ne trie : il contextualise l'intro et le point de vigilance. */
function recommendProviders(
  all: ScoredProvider[],
  usage: UsageAnswer,
  region: RegionAnswer,
  priority: PriorityAnswer
): RecommendationResult {
  const generalOrder = [...all].sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
  const shortlist = sortByPriority(filterByRegion(all, region), priority).slice(0, 3)
  return {
    intro: `Pour ${USAGE_INTROS[usage]} ${REGION_LABELS[region]}, classés par ${PRIORITY_LABELS[priority]} :`,
    items: shortlist.map((p) => ({
      name: p.name,
      reason: buildReason(p, generalOrder.findIndex((g) => g.name === p.name) + 1, all.length),
    })),
    note: USAGE_NOTES[usage],
  }
}

/* Export CSV des 8 hébergeurs (Blob + URL.createObjectURL, sans dépendance) :
   ordre du classement général (score décroissant), formule du score rappelée
   en commentaire d'en-tête. */
function exportProvidersCsv(all: ScoredProvider[]): void {
  const header = [
    "# Comparateur cloud : export des 8 hébergeurs (données indicatives 2024-2026)",
    `# Score éco (0-100) = 40${NBSP}% PUE (100 à 1,0, 0 à 1,5, linéaire) + 40${NBSP}% renouvelable (${NBSP}% affiché) + 20${NBSP}% engagements (10 pts neutralité déclarée + jusqu'à 10 pts certifications : 3 et + = 10, 2 = 7, 1 = 3)`,
    "# Sources : rapports RSE des fournisseurs, The Green Web Foundation, ADEME",
    "nom;pays;PUE;renouvelable_%;neutralite_carbone;certifications;document_source;score_eco",
  ]
  const rows = [...all]
    .sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
    .map((p) =>
      [
        p.name,
        p.country,
        p.pue.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 2 }),
        String(p.renewableEnergy),
        p.carbonNeutral ? "Déclarée" : "En cours",
        `"${p.certifications.join(" | ")}"`,
        `"${p.source}"`,
        String(p.sustainabilityScore),
      ].join(";")
    )
  const csv = `${CSV_BOM}${[...header, ...rows].join("\r\n")}\r\n`
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "comparateur-cloud-eco.csv"
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function CloudComparator() {
  const [sortBy, setSortBy] = useState<"score" | "pue" | "renewable" | "name">("score")
  const [filterGreen, setFilterGreen] = useState(false)
  /* Questionnaire besoin : brouillon (radios) + résultat validé. Tant que
     l'utilisateur ne valide pas, le classement affiché reste inchangé. */
  const [usage, setUsage] = useState<UsageAnswer | null>(null)
  const [region, setRegion] = useState<RegionAnswer | null>(null)
  const [priority, setPriority] = useState<PriorityAnswer | null>(null)
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null)

  const providers: (CloudProvider & { sustainabilityScore: number })[] = (
    [
      {
        name: "Infomaniak",
        country: "Suisse",
        pue: 1.1,
        renewableEnergy: 100,
        carbonNeutral: true,
        certifications: ["ISO 14001", "ISO 50001", "Engagement climat"],
        description: "Leader européen de l'hébergement écologique, 100 % énergies renouvelables locales.",
        source: "Page officielle (PUE inférieur à 1,1, 100 % hydraulique, neutre depuis 2007)",
        color: "emerald",
        serveursFrance: false,
        serveursFranceNote: "",
      },
      {
        name: "Scaleway",
        country: "France",
        pue: 1.37,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 14001", "HDS", "EcoVadis Gold"],
        description: "Datacenters français éco-conçus avec refroidissement adiabatique.",
        source: "Impact Report 2024 + page officielle (PUE moyen 1,37, 100 % garanties d'origine)",
        color: "emerald",
        serveursFrance: true,
        serveursFranceNote: "Datacenters en France (Impact Report 2024)",
      },
      {
        name: "OVHcloud",
        country: "France",
        pue: 1.24,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 14001", "ISO 50001"],
        description: "Refroidissement par eau innovant et démarche de réduction carbone.",
        source: "Document d'enregistrement universel 2025 (PUE 1,24, WUE 0,34, 100 % renouvelable)",
        color: "teal",
        serveursFrance: true,
        serveursFranceNote: "Datacenters en France : Gravelines, Paris, Roubaix, Strasbourg (page infrastructures OVHcloud)",
      },
      {
        name: "Google Cloud",
        country: "Global",
        pue: 1.09,
        renewableEnergy: 100,
        carbonNeutral: true,
        certifications: ["ISO 14001", "ISO 50001", "LEED"],
        description: "Neutralité carbone annoncée depuis 2007 ; 100 % renouvelable en matching annuel depuis 2017, flotte mondiale à 1,09 en 2025.",
        source: "Page efficacité énergétique (flotte 2025 : PUE 1,09 en moyenne glissante)",
        color: "emerald",
        serveursFrance: true,
        serveursFranceNote: "Région Paris europe-west9, ouverte en 2022 (blog officiel Google Cloud)",
      },
      {
        name: "Microsoft Azure",
        country: "Global",
        pue: 1.17,
        renewableEnergy: 100,
        carbonNeutral: true,
        certifications: ["ISO 14001", "LEED"],
        description: "Objectif carbone négatif 2030, investissements massifs dans le renouvelable.",
        source: "Rapport développement durable 2026, exercice FY25 (PUE 1,17, 100 % matched)",
        color: "teal",
        serveursFrance: false,
        serveursFranceNote: "",
      },
      {
        name: "AWS",
        country: "Global",
        pue: 1.14,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 14001", "ISO 50001"],
        description: "100 % renouvelable en matching annuel (3e année en 2025), PUE mondial 1,14, programme Climate Pledge.",
        source: "Sustainability summary 2025 (PUE 1,14, ISO 50001 dans 35 pays, 8 sites FR certifiés)",
        color: "cyan",
        serveursFrance: false,
        serveursFranceNote: "",
      },
      {
        name: "DigitalOcean",
        country: "USA",
        pue: 1.3,
        renewableEnergy: 60,
        carbonNeutral: false,
        certifications: ["SOC 2"],
        description: "Ne publie ni PUE ni part de renouvelable : valeurs prudentes par défaut, à interpréter avec réserve.",
        source: "Page impact (volet social uniquement) : aucun PUE ni renouvelable publié",
        color: "orange",
        serveursFrance: false,
        serveursFranceNote: "",
      },
      {
        name: "Hetzner",
        country: "Allemagne",
        pue: 1.13,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["EMAS"],
        description: "Datacenters allemands alimentés à 100 % par énergies renouvelables.",
        source: "Documentation officielle, màj 09/2026 (PUE 1,13, 100 % hydraulique en Allemagne)",
        color: "emerald",
        serveursFrance: false,
        serveursFranceNote: "",
      },
      {
        name: "IONOS",
        country: "Allemagne",
        pue: 1.39,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 50001", "ISO 14001"],
        description: "PUE moyen de 1,39 en 2024, 100 % d'électricité renouvelable et stratégie climat 2030.",
        source: "Rapport développement durable 2024 (PUE 1,39, 100 % renouvelable, ISO 50001 + 14001)",
        color: "teal",
        serveursFrance: true,
        serveursFranceNote: "Datacenter de Niederlauterbach, France (panneaux solaires installés en 2023, rapport 2024)",
      },
      {
        name: "Hostinger",
        country: "Lituanie",
        pue: 1.45,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 14001", "ISO 50001"],
        description: "100 % renouvelable en market-based en 2024 (67 % d'approvisionnement physique), PUE moyen de 1,45.",
        source: "Rapport développement durable 2024 (PUE 1,45, 100 % market-based / 67 % physique)",
        color: "orange",
        serveursFrance: true,
        serveursFranceNote: "Datacenter de Paris, 100 % renouvelable d'origine française (2024)",
      },
      {
        name: "PlanetHoster",
        country: "Canada",
        pue: 1.2,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: [],
        description: "PUE de 1,20 en France et 100 % d'énergie renouvelable, sans certification environnementale revendiquée.",
        source: "Page Hébergement vert (PUE France 1,20, 100 % renouvelable)",
        color: "cyan",
        serveursFrance: true,
        serveursFranceNote: "Datacenter de Paris, 100 % renouvelable (page Hébergement vert)",
      },
      {
        name: "3DS Outscale",
        country: "France",
        pue: 1.3,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 50001", "ISO 14001"],
        description: "100 % renouvelable en France ; PUE non publié (1,3 prudent par défaut, à interpréter avec réserve).",
        source: "Page engagements RSE (100 % renouvelable en France, ISO 50001 + 14001 ; PUE non publié)",
        color: "teal",
        serveursFrance: true,
        serveursFranceNote: "Datacenters en France (page engagements RSE)",
      },
      {
        name: "Ikoula",
        country: "France",
        pue: 1.3,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 27001", "ISO 50001"],
        description: "100 % renouvelable déclaré, datacenters en propre en France ; PUE non publié (1,3 prudent par défaut, à interpréter avec réserve).",
        source: "Page présentation (100 % renouvelable déclaré, ISO 27001 + 50001 ; PUE non publié)",
        color: "teal",
        serveursFrance: true,
        serveursFranceNote: "Datacenters en propre en France : Reims et Laon (page présentation)",
      },
      {
        name: "Clever Cloud",
        country: "France",
        pue: 1.2,
        renewableEnergy: 60,
        carbonNeutral: false,
        certifications: ["HDS", "ISO 27001", "SecNumCloud"],
        description: "PUE inférieur à 1,2 annoncé pour certains datacenters (2026) ; part de renouvelable non publiée (60 % prudent par défaut, à interpréter avec réserve).",
        source: "Page Cloud et Green IT (PUE <1,2 certains DC, 2026 ; renouvelable non publié)",
        color: "cyan",
        serveursFrance: true,
        serveursFranceNote: "Majorité de l'infrastructure en France, énergie majoritairement bas-carbone (page Green IT, 2026)",
      },
      {
        name: "Exoscale",
        country: "Suisse",
        pue: 1.3,
        renewableEnergy: 90,
        carbonNeutral: false,
        certifications: [],
        description: "90 % de renouvelable pondéré (Suisse et Allemagne à 100 %) ; PUE non publié (1,3 prudent par défaut, à interpréter avec réserve).",
        source: "Page Sustainability (90 % renouvelable pondéré, 09/2026 ; PUE non publié)",
        color: "orange",
        serveursFrance: false,
        serveursFranceNote: "",
      },
    ] as CloudProvider[]
  ).map((provider) => ({ ...provider, sustainabilityScore: computeSustainabilityScore(provider) }))

  const sortedProviders = [...providers]
    .filter((p) => !filterGreen || p.sustainabilityScore >= 85)
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.sustainabilityScore - a.sustainabilityScore
        case "pue":
          return a.pue - b.pue
        case "renewable":
          return b.renewableEnergy - a.renewableEnergy
        case "name":
          return a.name.localeCompare(b.name, "fr")
        default:
          return 0
      }
    })

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 75) return "text-teal-600 dark:text-teal-400"
    if (score >= 60) return "text-cyan-600 dark:text-cyan-400"
    return "text-orange-600 dark:text-orange-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-emerald-100 dark:bg-emerald-900/30"
    if (score >= 75) return "bg-teal-100 dark:bg-teal-900/30"
    if (score >= 60) return "bg-cyan-100 dark:bg-cyan-900/30"
    return "bg-orange-100 dark:bg-orange-900/30"
  }

  const handleValidateRecommendation = () => {
    if (usage === null || region === null || priority === null) return
    setRecommendation(recommendProviders(providers, usage, region, priority))
  }

  const handleResetRecommendation = () => {
    setUsage(null)
    setRegion(null)
    setPriority(null)
    setRecommendation(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            Comparateur de fournisseurs cloud éco-responsables
          </CardTitle>
          <CardDescription>
            Comparez l'impact environnemental des principaux hébergeurs et fournisseurs cloud (données indicatives 2024-2026)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filtres et tri */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <Label className="text-foreground">Trier par :</Label>
              <div className="flex gap-2">
                {[
                  { key: "score", label: "Score éco" },
                  { key: "pue", label: "PUE" },
                  { key: "renewable", label: "% Renouvelable" },
                  { key: "name", label: "Nom" },
                ].map((option) => (
                  <Button
                    key={option.key}
                    size="sm"
                    variant={sortBy === option.key ? "default" : "outline"}
                    onClick={() => setSortBy(option.key as typeof sortBy)}
                    className={sortBy === option.key ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportProvidersCsv(providers)}
                title="Télécharger les données des 8 hébergeurs au format CSV, dans l'ordre du classement général"
              >
                <Download aria-hidden="true" />
                Exporter en CSV
              </Button>
              <input
                type="checkbox"
                id="filterGreen"
                checked={filterGreen}
                onChange={(e) => setFilterGreen(e.target.checked)}
                className="rounded border-border"
              />
              <Label htmlFor="filterGreen" className="cursor-pointer text-foreground">
                Afficher uniquement les hébergeurs verts (score ≥ 85)
              </Label>
            </div>
          </div>

          {/* Questionnaire besoin : panneau replié, ne touche pas au classement.
              Les recommandations se calculent uniquement à la validation. */}
          <MoreDetails title="Trouver l'hébergeur adapté à mon besoin (3 questions)">
            <p className="text-sm">
              Répondez aux 3 questions puis validez : nous vous proposons 2 à 3 hébergeurs, classés selon
              vos réponses et expliqués à partir des données du tableau. Le classement général ci-dessous
              reste inchangé.
            </p>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-foreground">1. Votre besoin principal ?</legend>
              <div className="flex flex-wrap gap-2">
                {USAGE_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-secondary/60 has-checked:border-primary has-checked:bg-secondary/40"
                  >
                    <input
                      type="radio"
                      name="cloud-need-usage"
                      value={option.value}
                      checked={usage === option.value}
                      onChange={() => setUsage(option.value)}
                      className="h-4 w-4 shrink-0"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-foreground">2. La région souhaitée pour vos données ?</legend>
              <div className="flex flex-wrap gap-2">
                {REGION_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-secondary/60 has-checked:border-primary has-checked:bg-secondary/40"
                  >
                    <input
                      type="radio"
                      name="cloud-need-region"
                      value={option.value}
                      checked={region === option.value}
                      onChange={() => setRegion(option.value)}
                      className="h-4 w-4 shrink-0"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-foreground">3. Votre critère prioritaire ?</legend>
              <div className="flex flex-wrap gap-2">
                {PRIORITY_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-secondary/60 has-checked:border-primary has-checked:bg-secondary/40"
                  >
                    <input
                      type="radio"
                      name="cloud-need-priority"
                      value={option.value}
                      checked={priority === option.value}
                      onChange={() => setPriority(option.value)}
                      className="h-4 w-4 shrink-0"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={handleValidateRecommendation}
                disabled={usage === null || region === null || priority === null}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Compass aria-hidden="true" />
                Voir mes recommandations
              </Button>
              <Button size="sm" variant="outline" onClick={handleResetRecommendation}>
                <RotateCcw aria-hidden="true" />
                Réinitialiser
              </Button>
            </div>
            {recommendation === null && (
              <p className="text-xs">Répondez aux 3 questions pour afficher vos recommandations.</p>
            )}
            {recommendation !== null && (
              <div aria-live="polite" className="space-y-2 rounded-lg border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">{recommendation.intro}</p>
                <ol className="list-decimal space-y-2 pl-5 text-sm marker:text-foreground">
                  {recommendation.items.map((item) => (
                    <li key={item.name}>
                      <strong className="text-foreground">{item.name}</strong>
                      <span className="text-muted-foreground"> : {item.reason}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-muted-foreground">
                  {recommendation.note} Le classement général ci-dessous reste inchangé.
                </p>
              </div>
            )}
          </MoreDetails>

          {/* Légende */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 text-foreground"><Lightbulb className="mr-2 inline h-4 w-4" />Comprendre les métriques</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>
                <strong>PUE (Power Usage Effectiveness)</strong> : Ratio d'efficacité énergétique. Plus il est proche de 1,
                mieux c'est. Un PUE de 1,2 signifie qu'environ 17 % de l'énergie sert aux infrastructures (refroidissement, distribution), pas seulement au calcul.
              </li>
              <li>
                <strong>Énergie renouvelable</strong> : Pourcentage d'électricité provenant de sources renouvelables
                (solaire, éolien, hydraulique). Note générique : un « 100 % renouvelable » déclaré correspond
                souvent à un matching annuel (achats compensés sur l'année), pas à un fonctionnement 24/7 décarboné.
              </li>
              <li>
                <strong>Score éco</strong> : synthèse propre au site pour ordonner les fiches, pas une certification.
                Méthode transparente : scores recalculés : 40 % PUE (100 à 1,0, 0 à 1,5, linéaire) + 40 % renouvelable
                + 20 % engagements (10 pts neutralité déclarée, jusqu'à 10 pts certifications : ≥ 3 = 10, 2 = 7, 1 = 3).
              </li>
              <li>
                <strong>Serveurs en France</strong> : badge affiché quand l'hébergeur déclare des serveurs
                en France, avec le détail sourcé et daté sous le badge. Le pays affiché reste celui du
                siège : un hébergeur étranger peut donc avoir le badge (datacenter à Paris, par exemple).
              </li>
            </ul>
          </div>

          {/* Tableau comparatif */}
          <div className="space-y-4">
            {sortedProviders.map((provider, index) => (
              <div
                key={provider.name}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-md ${getScoreBgColor(
                  provider.sustainabilityScore
                )} border-transparent hover:border-border`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                        {sortBy === "score" && (
                          <span className="text-2xl font-bold text-foreground" title="Rang selon le tri par score éco">
                            <span className="sr-only">Rang {index + 1} selon le tri par score éco</span>
                            <span aria-hidden="true">{index + 1}</span>
                          </span>
                        )}
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{provider.name}</h3>
                        <span className="text-sm text-muted-foreground">{provider.country}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{provider.description}</p>
                    <p className="text-xs text-muted-foreground mb-3">Source : {provider.source}</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-1 text-xs rounded-full bg-card text-muted-foreground border border-border"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-card p-3 rounded-lg border border-border">
                      <div className={`text-2xl font-bold ${getScoreColor(provider.sustainabilityScore)}`}>
                        {provider.sustainabilityScore}
                      </div>
                      <div className="text-xs text-muted-foreground">Score éco</div>
                    </div>
                    <div className="bg-card p-3 rounded-lg border border-border">
                      <div className="text-2xl font-bold text-foreground">{provider.pue.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 2 })}</div>
                      <div className="text-xs text-muted-foreground">PUE</div>
                    </div>
                    <div className="bg-card p-3 rounded-lg border border-border">
                      <div className="text-2xl font-bold text-foreground">{provider.renewableEnergy}%</div>
                      <div className="text-xs text-muted-foreground">Renouvelable</div>
                    </div>
                    <div className="bg-card p-3 rounded-lg text-center border border-border">
                      <div className="text-2xl font-bold text-foreground">
                        {provider.carbonNeutral ? (
                          <CheckCircle2 role="img" aria-label="Neutre carbone" className="mx-auto h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Clock role="img" aria-label="Objectif en cours" className="mx-auto h-6 w-6 text-amber-600 dark:text-amber-400" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">Neutre carbone</div>
                      <div className="text-xs font-medium text-foreground">{provider.carbonNeutral ? "Déclarée" : "En cours"}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommandation */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
            <h4 className="font-semibold text-lg mb-3 text-foreground"><Leaf className="mr-2 inline h-5 w-5" />Notre recommandation</h4>
            <p className="text-muted-foreground mb-4">
              Pour un hébergement web éco-responsable en France ou en Europe, privilégiez :
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • <strong>Infomaniak</strong> ou <strong>Hetzner</strong> pour le meilleur bilan européen
              </li>
              <li>
                • <strong>OVHcloud</strong> ou <strong>Scaleway</strong> pour rester en France (données
                2025 et 2024)
              </li>
              <li>
                • <strong>Google Cloud</strong> si vous avez besoin d'un hyperscaler avec engagement environnemental fort
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        Sources : rapports RSE des fournisseurs, The Green Web Foundation, ADEME • Données et score indicatifs 2024-2026, méthode transparente : scores recalculés <SourceTooltip source="Rapports RSE des fournisseurs, The Green Web Foundation, ADEME" info="Données indicatives 2024-2026. Le score éco est une synthèse propre au site pour ordonner les fiches, pas une certification." calculation="Score = 40 % PUE + 40 % renouvelable + 20 % engagements. PUE : 100 à 1,0, 0 à 1,5 (linéaire). Renouvelable : % affiché. Engagements : 10 pts neutralité déclarée + jusqu'à 10 pts certifications (≥ 3 = 10, 2 = 7, 1 = 3)." />
      </div>
    </div>
  )
}

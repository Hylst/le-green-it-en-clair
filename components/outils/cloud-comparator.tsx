"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Cloud, Lightbulb, Leaf, CheckCircle2, Clock } from "lucide-react";
import { SourceTooltip } from "@/components/source-tooltip";

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
  color: string
}

export default function CloudComparator() {
  const [sortBy, setSortBy] = useState<"score" | "pue" | "renewable" | "name">("score")
  const [filterGreen, setFilterGreen] = useState(false)

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
        color: "emerald",
      },
      {
        name: "Scaleway",
        country: "France",
        pue: 1.2,
        renewableEnergy: 100,
        carbonNeutral: true,
        certifications: ["ISO 14001", "HDS", "DC4"],
        description: "Datacenters français éco-conçus avec refroidissement adiabatique.",
        color: "emerald",
      },
      {
        name: "OVHcloud",
        country: "France",
        pue: 1.2,
        renewableEnergy: 78,
        carbonNeutral: false,
        certifications: ["ISO 14001", "ISO 50001"],
        description: "Refroidissement par eau innovant et démarche de réduction carbone.",
        color: "teal",
      },
      {
        name: "Google Cloud",
        country: "Global",
        pue: 1.1,
        renewableEnergy: 100,
        carbonNeutral: true,
        certifications: ["ISO 14001", "ISO 50001", "LEED"],
        description: "Neutralité carbone annoncée depuis 2007 ; 100 % renouvelable en matching annuel depuis 2017, objectif 24/7 d'ici 2030.",
        color: "emerald",
      },
      {
        name: "Microsoft Azure",
        country: "Global",
        pue: 1.18,
        renewableEnergy: 100,
        carbonNeutral: true,
        certifications: ["ISO 14001", "LEED"],
        description: "Objectif carbone négatif 2030, investissements massifs dans le renouvelable.",
        color: "teal",
      },
      {
        name: "AWS",
        country: "Global",
        pue: 1.2,
        renewableEnergy: 100,
        carbonNeutral: false,
        certifications: ["ISO 14001", "ISO 50001"],
        description: "100 % renouvelable atteint en 2023 (matching annuel), programme Climate Pledge.",
        color: "cyan",
      },
      {
        name: "DigitalOcean",
        country: "USA",
        pue: 1.3,
        renewableEnergy: 60,
        carbonNeutral: false,
        certifications: ["SOC 2"],
        description: "Efforts en cours sur l'efficacité, mais encore limités sur le renouvelable.",
        color: "orange",
      },
      {
        name: "Hetzner",
        country: "Allemagne",
        pue: 1.15,
        renewableEnergy: 100,
        carbonNeutral: true,
        certifications: ["ISO 14001", "TÜV"],
        description: "Datacenters allemands alimentés à 100 % par énergies renouvelables.",
        color: "emerald",
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
            <div className="flex items-center gap-2">
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
                Méthode transparente : scores recalculés — 40 % PUE (100 à 1,0, 0 à 1,5, linéaire) + 40 % renouvelable
                + 20 % engagements (10 pts neutralité déclarée, jusqu'à 10 pts certifications : ≥ 3 = 10, 2 = 7, 1 = 3).
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
                        <span className="text-2xl font-bold text-foreground" title="Rang selon le tri par score éco">{index + 1}</span>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{provider.name}</h3>
                        <span className="text-sm text-muted-foreground">{provider.country}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{provider.description}</p>
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
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
                          <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-label="Neutre carbone" />
                        ) : (
                          <Clock className="mx-auto h-6 w-6 text-amber-600 dark:text-amber-400" aria-label="Objectif en cours" />
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
                • <strong>Infomaniak</strong> ou <strong>Hetzner</strong> pour le meilleur bilan environnemental
              </li>
              <li>
                • <strong>Scaleway</strong> pour rester en France avec un excellent PUE
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

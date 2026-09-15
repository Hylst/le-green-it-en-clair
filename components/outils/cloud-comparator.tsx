"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Cloud } from "lucide-react";

export default function CloudComparator() {
  const [sortBy, setSortBy] = useState<"score" | "pue" | "renewable" | "name">("score")
  const [filterGreen, setFilterGreen] = useState(false)

  const providers = [
    {
      name: "Infomaniak",
      country: "🇨🇭 Suisse",
      pue: 1.1,
      renewableEnergy: 100,
      carbonNeutral: true,
      certifications: ["ISO 14001", "ISO 50001", "Engagement climat"],
      sustainabilityScore: 98,
      description: "Leader européen de l'hébergement écologique, 100% énergies renouvelables locales.",
      color: "emerald",
    },
    {
      name: "Scaleway",
      country: "🇫🇷 France",
      pue: 1.2,
      renewableEnergy: 100,
      carbonNeutral: true,
      certifications: ["ISO 14001", "HDS", "DC4"],
      sustainabilityScore: 95,
      description: "Datacenters français éco-conçus avec refroidissement adiabatique.",
      color: "emerald",
    },
    {
      name: "OVHcloud",
      country: "🇫🇷 France",
      pue: 1.2,
      renewableEnergy: 78,
      carbonNeutral: false,
      certifications: ["ISO 14001", "ISO 50001"],
      sustainabilityScore: 82,
      description: "Refroidissement par eau innovant et démarche de réduction carbone.",
      color: "teal",
    },
    {
      name: "Google Cloud",
      country: "🌍 Global",
      pue: 1.1,
      renewableEnergy: 100,
      carbonNeutral: true,
      certifications: ["ISO 14001", "ISO 50001", "LEED"],
      sustainabilityScore: 90,
      description: "Neutralité carbone depuis 2007, 100% renouvelable depuis 2017.",
      color: "emerald",
    },
    {
      name: "Microsoft Azure",
      country: "🌍 Global",
      pue: 1.18,
      renewableEnergy: 100,
      carbonNeutral: true,
      certifications: ["ISO 14001", "LEED"],
      sustainabilityScore: 88,
      description: "Objectif carbone négatif 2030, investissements massifs dans le renouvelable.",
      color: "teal",
    },
    {
      name: "AWS",
      country: "🌍 Global",
      pue: 1.2,
      renewableEnergy: 90,
      carbonNeutral: false,
      certifications: ["ISO 14001", "ISO 50001"],
      sustainabilityScore: 78,
      description: "100 % renouvelable atteint en 2023 (matching annuel), programme Climate Pledge.",
      color: "cyan",
    },
    {
      name: "DigitalOcean",
      country: "🇺🇸 USA",
      pue: 1.3,
      renewableEnergy: 60,
      carbonNeutral: false,
      certifications: ["SOC 2"],
      sustainabilityScore: 55,
      description: "Efforts en cours sur l'efficacité, mais encore limités sur le renouvelable.",
      color: "orange",
    },
    {
      name: "Hetzner",
      country: "🇩🇪 Allemagne",
      pue: 1.15,
      renewableEnergy: 100,
      carbonNeutral: true,
      certifications: ["ISO 14001", "TÜV"],
      sustainabilityScore: 92,
      description: "Datacenters allemands alimentés à 100% par énergies renouvelables.",
      color: "emerald",
    },
  ]

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
          return a.name.localeCompare(b.name)
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
            Comparez l'impact environnemental des principaux hébergeurs et fournisseurs cloud (données indicatives 2024-2025)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filtres et tri */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <Label className="text-gray-900 dark:text-gray-100">Trier par :</Label>
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
                className="rounded border-gray-300"
              />
              <Label htmlFor="filterGreen" className="cursor-pointer text-gray-900 dark:text-gray-100">
                Afficher uniquement les hébergeurs verts (score ≥ 85)
              </Label>
            </div>
          </div>

          {/* Légende */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">💡 Comprendre les métriques</h4>
            <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                <strong>PUE (Power Usage Effectiveness)</strong> : Ratio d'efficacité énergétique. Plus il est proche de 1,
                mieux c'est. Un PUE de 1.2 signifie que 20 % de l'énergie sert aux infrastructures (refroidissement, distribution), pas seulement au calcul.
              </li>
              <li>
                <strong>Énergie renouvelable</strong> : Pourcentage d'électricité provenant de sources renouvelables
                (solaire, éolien, hydraulique).
              </li>
              <li>
                <strong>Score éco</strong> : Score indicatif de durabilité, basé sur le PUE, % renouvelable, certifications et
                engagements.
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
                )} border-transparent hover:border-gray-300 dark:hover:border-gray-600`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{index + 1}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{provider.name}</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{provider.country}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{provider.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-1 text-xs rounded-full bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className={`text-2xl font-bold ${getScoreColor(provider.sustainabilityScore)}`}>
                        {provider.sustainabilityScore}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Score éco</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{provider.pue}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">PUE</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{provider.renewableEnergy}%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Renouvelable</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {provider.carbonNeutral ? "✅" : "⏳"}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Neutre carbone</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommandation */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
            <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">🌱 Notre recommandation</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pour un hébergement web éco-responsable en France ou en Europe, privilégiez :
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
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

      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        Sources: Rapports RSE des fournisseurs, The Green Web Foundation, ADEME • Données 2024-2025
      </div>
    </div>
  )
}

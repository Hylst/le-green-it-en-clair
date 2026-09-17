"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Zap,
  Activity,
  Flame,
  Sun,
  Wind,
  Droplets,
  ArrowRight,
  RefreshCw,
  WifiOff,
  AlertTriangle,
  Globe,
  CheckCircle2,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { fetchEco2MixRealtime, ECO2MIX_FALLBACK, type Eco2MixData } from "@/lib/eco2mix"
import { CHART_FALLBACKS } from "@/lib/chart-theme"
import { SourceTooltip } from "@/components/source-tooltip"
import { MoreDetails } from "@/components/more-details"
import { cn } from "@/lib/utils"

interface Eco2MixLiveProps {
  variant?: "full" | "datacenter"
  className?: string
}

const MIX_COLORS = {
  nucleaire: CHART_FALLBACKS.blue,
  eolien: CHART_FALLBACKS.emerald,
  solaire: CHART_FALLBACKS.amber,
  hydraulique: CHART_FALLBACKS.cyan,
  bioenergies: CHART_FALLBACKS.teal,
  gaz: CHART_FALLBACKS.red,
  charbonFioul: CHART_FALLBACKS.slate,
}

function getEmissionColor(tauxCo2: number): string {
  if (tauxCo2 < 50) return "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700"
  if (tauxCo2 < 100) return "text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700"
  return "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700"
}

function Eco2MixSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>
      <div className="h-40 rounded-lg bg-slate-200 dark:bg-slate-700" />
    </div>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  subtitle,
  color,
  source,
  calculation,
}: {
  icon: React.ElementType
  label: string
  value: string
  subtitle?: string
  color: string
  source?: string
  calculation?: string
}) {
  return (
    <div className={cn("rounded-lg border-2 p-4", color)}>
      <div className="mb-2 flex items-center justify-between">
        <Icon className="h-5 w-5 opacity-70" />
        {source && (
          <SourceTooltip source={source} calculation={calculation} />
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{label}</p>
      {subtitle ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{subtitle}</p>
      ) : null}
    </div>
  )
}

function MixChart({ data }: { data: Eco2MixData }) {
  const chartData = [
    { name: "Nucléaire", value: data.filières.nucleaire, fill: MIX_COLORS.nucleaire },
    { name: "Éolien", value: data.filières.eolien, fill: MIX_COLORS.eolien },
    { name: "Solaire", value: data.filières.solaire, fill: MIX_COLORS.solaire },
    { name: "Hydraulique", value: data.filières.hydraulique, fill: MIX_COLORS.hydraulique },
    { name: "Bioénergies", value: data.filières.bioenergies, fill: MIX_COLORS.bioenergies },
    { name: "Gaz", value: data.filières.gaz, fill: MIX_COLORS.gaz },
    { name: "Charbon/Fioul", value: data.filières.charbonFioul, fill: MIX_COLORS.charbonFioul },
  ]

  return (
    <div className="rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 lg:p-6">
      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Mix de production instantané</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" stroke="var(--muted-foreground)" unit=" MW" />
          <YAxis type="category" dataKey="name" width={100} stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "2px solid var(--border)",
              borderRadius: "0.5rem",
              color: "var(--foreground)",
            }}
            formatter={(value: number) => [`${value.toLocaleString("fr-FR")} MW`, "Production"]}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-3">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function PUECalculator({ data }: { data: Eco2MixData }) {
  const [pue, setPue] = useState(1.56)
  const [serverPowerKw, setServerPowerKw] = useState(1000)

  const itPowerKw = serverPowerKw
  const totalPowerKw = itPowerKw * pue
  const co2PerHour = (totalPowerKw * data.tauxCo2) / 1000

  return (
    <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 p-6">
      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        Simulateur d'impact carbone instantané
      </h4>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Puissance IT : {itPowerKw} kW
          </label>
          <input
            type="range"
            min={100}
            max={5000}
            step={100}
            value={itPowerKw}
            onChange={(e) => setServerPowerKw(Number(e.target.value))}
            className="w-full"
            aria-label="Puissance IT en kilowatts"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            PUE : {pue.toFixed(2)}
          </label>
          <input
            type="range"
            min={1.0}
            max={3.0}
            step={0.05}
            value={pue}
            onChange={(e) => setPue(Number(e.target.value))}
            className="w-full"
            aria-label="PUE (Power Usage Effectiveness)"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white dark:bg-slate-900 p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">Consommation totale</p>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {totalPowerKw.toLocaleString("fr-FR")} kW
          </p>
        </div>
        <div className="rounded-lg bg-white dark:bg-slate-900 p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">Émissions / heure</p>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {co2PerHour.toFixed(1)} gCO₂e
          </p>
        </div>
        <div className="rounded-lg bg-white dark:bg-slate-900 p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">Émissions / jour</p>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {(co2PerHour * 24).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} gCO₂e
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        Même datacenter, même PUE, mais en France (taux CO₂ en direct : {data.tauxCo2} gCO₂e/kWh), une journée
        émet environ {(co2PerHour * 24 / 1000).toFixed(1)} kg de CO₂e. Dans un pays à mix carboné
        (ex. 350 gCO₂e/kWh), ce serait{" "}
        {(co2PerHour * 24 / 1000 * (350 / data.tauxCo2)).toFixed(1)} kg —{" "}
        {(350 / data.tauxCo2).toFixed(1)} fois plus.
        <SourceTooltip
          source="RTE éCO2mix (ODRE) — donnée en direct"
          calculation="Consommation totale (kW) × taux CO₂ (g/kWh) ÷ 1000"
        />
      </p>
    </div>
  )
}

export default function Eco2MixLive({ variant = "full", className }: Eco2MixLiveProps) {
  const [data, setData] = useState<Eco2MixData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [refreshKey, setRefreshKey] = useState(0)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const result = await fetchEco2MixRealtime()
      setData(result)
    } catch {
      setError(true)
      setData(ECO2MIX_FALLBACK)
    } finally {
      setLoading(false)
    }
  }, [refreshKey])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    loadData()
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [loadData])

  if (loading && !data) {
    return (
      <section className={cn("px-6 py-16 lg:py-24", className)} aria-busy="true" aria-live="polite">
        <div className="mx-auto max-w-6xl">
          <Eco2MixSkeleton />
        </div>
      </section>
    )
  }

  const displayData = data ?? ECO2MIX_FALLBACK
  const isFallback = displayData.isFallback || error

  return (
    <section
      className={cn("px-6 py-16 lg:py-24", className)}
      aria-live="polite"
      aria-label={variant === "full" ? "Données temps réel du mix électrique" : "Encart données temps réel éCO2mix"}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <Activity className="h-3 w-3" />
                Données temps réel
              </span>
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                RTE éCO2mix
              </span>
            </div>
            <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">
              {variant === "full"
                ? "Intensité carbone et mix électrique en direct"
                : "Mix électrique et impact carbone en direct"}
            </h2>
            {!isOnline && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-amber-700 dark:text-amber-400">
                <WifiOff className="h-4 w-4" />
                Mode hors-ligne — données de cache ou de référence affichées.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Relevé {displayData.dateFormatted} à {displayData.timeFormatted}
              {isFallback && !isOnline ? " (cache)" : isFallback ? " (référence)" : ""}
            </p>
            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              disabled={loading || !isOnline}
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Actualiser les données éCO2mix"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Error notice */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Données temps réel temporairement indisponibles
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Les valeurs affichées sont des repères de référence (ADEME / RTE 2024).
                {isOnline && (
                  <button
                    type="button"
                    onClick={() => setRefreshKey((k) => k + 1)}
                    className="ml-1 font-medium text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
                  >
                    Réessayer
                  </button>
                )}
              </p>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon={Flame}
            label="Intensité carbone"
            value={`${displayData.tauxCo2}`}
            subtitle="gCO₂e/kWh produit"
            color={getEmissionColor(displayData.tauxCo2)}
            source="RTE éCO2mix (ODRE)"
            calculation="Mesure instantanée, actualisée toutes les 15 min"
          />
          <KpiCard
            icon={Zap}
            label="Part décarbonée"
            value={`${displayData.decarbonePercent.toFixed(1)} %`}
            subtitle="Nucléaire + Renouvelables"
            color="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
            source="RTE éCO2mix (ODRE)"
          />
          <KpiCard
            icon={Globe}
            label="Consommation nationale"
            value={`${(displayData.consommationMw / 1000).toFixed(1)} GW`}
            subtitle="Puissance instantanée"
            color="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
            source="RTE éCO2mix (ODRE)"
          />
          <KpiCard
            icon={ArrowRight}
            label="Échanges physiques"
            value={displayData.echangesPhysiquesMw < 0 ? "Export" : "Import"}
            subtitle={`${Math.abs(displayData.echangesPhysiquesMw).toLocaleString("fr-FR")} MW`}
            color={displayData.echangesPhysiquesMw < 0 ? "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800" : "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"}
            source="RTE éCO2mix (ODRE)"
            calculation="Solde des échanges frontaliers physiques"
          />
        </div>

        {/* Contextualization */}
        <div className="mb-8 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">
                Pourquoi cette donnée est essentielle
              </h3>
              <p className="mb-3 text-slate-700 dark:text-slate-300">
                En France, l'électricité est fortement décarbonée (~{displayData.tauxCo2} gCO₂e/kWh en direct, contre ~250 gCO₂e/kWh en Europe et ~490 gCO₂e/kWh dans le monde —
                <SourceTooltip source="ADEME-Arcep 2023 / Ember 2024" />).
                Conséquence : la phase d'<strong>usage</strong> d'un appareil connecté y est très peu émettrice.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                C'est pourquoi <strong>~80 % de l'empreinte carbone du numérique en France provient de la fabrication</strong> des équipements (ADEME-Arcep 2023), et non de leur consommation électrique.
                À l'inverse, dans les pays à mix carboné, l'usage des serveurs et terminaux pèse beaucoup plus lourd.
              </p>
            </div>
            <div className="shrink-0 lg:w-72">
              <div className="rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 p-4">
                <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Comparaison d'intensité</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      France
                    </span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {displayData.tauxCo2} g
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Europe</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">~250 g</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Monde</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">~490 g</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Sources : RTE éCO2mix (direct) · ADEME-Arcep 2023 · Ember 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mix chart */}
        <div className="mb-8 space-y-3">
          <MoreDetails title="D’où vient cette donnée en direct ?">
            <p>
              Elle vient du jeu « éCO2mix national en temps réel » publié par RTE sur ODRE, la plateforme
              ouverte des réseaux d’énergies. Le jeu est rafraîchi tous les quarts d’heure à partir des
              télémesures du réseau, complétées par des estimations.
              <SourceTooltip source="RTE via ODRE, 2026" calculation="Jeu eco2mix-national-tr, rafraîchi tous les quarts d’heure" />
            </p>
            <p>
              Le site interroge l’interface publique de ce jeu et garde la réponse en mémoire pendant
              10 minutes, pour ne pas surcharger le service (qui applique un quota mensuel par utilisateur).
              Le bouton Actualiser relance la lecture à tout moment.
            </p>
            <p>
              Si l’interface ne répond pas, la page affiche des repères de référence avec la mention
              « référence », au lieu du direct. Rien n’est inventé : les valeurs de repli viennent de
              l’ADEME et de RTE (2024). Voir le jeu d’origine :{" "}
              <a
                href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/table/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                éCO2mix national en temps réel sur ODRE
              </a>
              .
            </p>
          </MoreDetails>
          <MoreDetails title="Pourquoi ce taux bouge dans la journée ?">
            <p>
              Le nucléaire fournit une base stable, le solaire produit en journée, et le gaz prend le relais
              lors des pointes du matin et du soir. Le taux de CO₂ monte donc quand les pointes appellent
              des centrales fossiles, et descend quand le soleil et le vent portent la production.
            </p>
            <p>
              En hiver, le chauffage électrique fait grimper la consommation et appelle davantage de
              production d’appoint : comparez un dimanche d’été et un soir de janvier, l’écart est visible
              ici même.
            </p>
            <p>
              Pour un datacenter ou un usage flexible, l’heure compte donc un peu. Mais le premier levier
              reste ailleurs : allonger la vie du matériel, car la fabrication concentre l’essentiel des
              impacts.
              <SourceTooltip source="ADEME-Arcep, 2023" />
            </p>
          </MoreDetails>
        </div>

        <div className="mb-8">
          <MixChart data={displayData} />
        </div>

        {/* Datacenter variant */}
        {variant === "datacenter" && displayData && (
          <PUECalculator data={displayData} />
        )}
      </div>
    </section>
  )
}

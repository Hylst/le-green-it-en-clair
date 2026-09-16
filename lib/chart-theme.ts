"use client"

import { useEffect, useState } from "react"

/* Palette des graphiques : lue dans les variables CSS (dark/light auto),
   avec repli en dur pour le premier rendu et le SSR.
   Règle : jamais de hex dans le JSX des graphiques, passer par ce hook. */

export const CHART_FALLBACKS = {
  blue: "#2563eb",
  teal: "#0d9488",
  emerald: "#059669",
  amber: "#d97706",
  red: "#dc2626",
  violet: "#7c3aed",
  cyan: "#0891b2",
  indigo: "#4f46e5",
  slate: "#64748b",
  grid: "#e2e8f0",
  tick: "#64748b",
} as const

export type ChartPalette = Record<keyof typeof CHART_FALLBACKS, string>

const VAR_NAMES: Record<keyof typeof CHART_FALLBACKS, string> = {
  blue: "--chart-blue",
  teal: "--chart-teal",
  emerald: "--chart-emerald",
  amber: "--chart-amber",
  red: "--chart-red",
  violet: "--chart-violet",
  cyan: "--chart-cyan",
  indigo: "--chart-indigo",
  slate: "--chart-slate",
  grid: "--chart-grid",
  tick: "--chart-tick",
}

function resolveVar(name: string, fallback: string): string {
  try {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    return value || fallback
  } catch {
    return fallback
  }
}

export function useChartTheme(): ChartPalette {
  const [palette, setPalette] = useState<ChartPalette>({ ...CHART_FALLBACKS })

  useEffect(() => {
    setPalette({
      blue: resolveVar(VAR_NAMES.blue, CHART_FALLBACKS.blue),
      teal: resolveVar(VAR_NAMES.teal, CHART_FALLBACKS.teal),
      emerald: resolveVar(VAR_NAMES.emerald, CHART_FALLBACKS.emerald),
      amber: resolveVar(VAR_NAMES.amber, CHART_FALLBACKS.amber),
      red: resolveVar(VAR_NAMES.red, CHART_FALLBACKS.red),
      violet: resolveVar(VAR_NAMES.violet, CHART_FALLBACKS.violet),
      cyan: resolveVar(VAR_NAMES.cyan, CHART_FALLBACKS.cyan),
      indigo: resolveVar(VAR_NAMES.indigo, CHART_FALLBACKS.indigo),
      slate: resolveVar(VAR_NAMES.slate, CHART_FALLBACKS.slate),
      grid: resolveVar(VAR_NAMES.grid, CHART_FALLBACKS.grid),
      tick: resolveVar(VAR_NAMES.tick, CHART_FALLBACKS.tick),
    })
  }, [])

  return palette
}

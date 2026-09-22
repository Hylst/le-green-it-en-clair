"use client"

import dynamic from "next/dynamic"
import type {
  BarProps,
  LegendProps,
  LineProps,
  PieProps,
  TooltipProps,
  XAxisProps,
  YAxisProps,
} from "recharts"
import { ChartFallback } from "@/components/chart-fallback"

// ValueType/NameType ne sont pas réexportés à la racine de recharts :
// unions recopiées de recharts/types/component/DefaultTooltipContent.d.ts
// (v2.15.4), à revérifier à chaque montée de version majeure.
type TooltipValue = number | string | Array<number | string>
type TooltipName = number | string

// Recharts (~100 Ko) chargé à la demande : les pages de contenu n'embarquent
// plus la librairie dans leur bundle initial. `import type` = effacé à la
// compilation, coût bundle nul. Les assertions ComponentType sont requises
// car l'inférence de dynamic() bute sur les defaultProps internes de
// recharts (legendType élargi en string) — sans changer le typage vu par
// les pages. Seul ResponsiveContainer a un fallback visible : les composants
// internes résolvent sur le même chunk, dans un conteneur déjà dimensionné.
// Hauteur 300 : majorité des usages.
export const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false, loading: () => <ChartFallback height={300} /> }
)

export const LineChart = dynamic(() => import("recharts").then((m) => m.LineChart), {
  ssr: false,
})

export const Line = dynamic(
  () => import("recharts").then((m) => m.Line as React.ComponentType<LineProps>),
  { ssr: false }
)

export const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), {
  ssr: false,
})

export const Bar = dynamic(
  () => import("recharts").then((m) => m.Bar as React.ComponentType<BarProps>),
  { ssr: false }
)

export const PieChart = dynamic(() => import("recharts").then((m) => m.PieChart), {
  ssr: false,
})

export const Pie = dynamic(
  () => import("recharts").then((m) => m.Pie as React.ComponentType<PieProps>),
  { ssr: false }
)

export const Cell = dynamic(() => import("recharts").then((m) => m.Cell), {
  ssr: false,
})

export const XAxis = dynamic(
  () => import("recharts").then((m) => m.XAxis as React.ComponentType<XAxisProps>),
  { ssr: false }
)

export const YAxis = dynamic(
  () => import("recharts").then((m) => m.YAxis as React.ComponentType<YAxisProps>),
  { ssr: false }
)

export const CartesianGrid = dynamic(
  () => import("recharts").then((m) => m.CartesianGrid),
  { ssr: false }
)

export const Tooltip = dynamic(
  () => import("recharts").then((m) => m.Tooltip as React.ComponentType<TooltipProps<TooltipValue, TooltipName>>),
  { ssr: false }
)

export const Legend = dynamic(
  () => import("recharts").then((m) => m.Legend as React.ComponentType<LegendProps>),
  { ssr: false }
)

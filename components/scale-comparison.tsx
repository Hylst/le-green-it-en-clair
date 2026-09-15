"use client"

import { Card } from "@/components/ui/card"

interface ScaleComparisonProps {
  type: "co2" | "water" | "energy" | "distance"
  value: number
  unit: string
  comparisons: {
    icon: any
    label: string
    equivalent: string
    description: string
  }[]
}

export function ScaleComparison({ type, value, unit, comparisons }: ScaleComparisonProps) {
  const colorClasses: Record<string, { title: string; card: string; iconWrap: string; icon: string; value: string }> = {
    co2: { title: "text-emerald-700", card: "bg-emerald-50", iconWrap: "bg-emerald-100", icon: "text-emerald-700", value: "text-emerald-900" },
    water: { title: "text-blue-700", card: "bg-blue-50", iconWrap: "bg-blue-100", icon: "text-blue-700", value: "text-blue-900" },
    energy: { title: "text-amber-700", card: "bg-amber-50", iconWrap: "bg-amber-100", icon: "text-amber-700", value: "text-amber-900" },
    distance: { title: "text-teal-700", card: "bg-teal-50", iconWrap: "bg-teal-100", icon: "text-teal-700", value: "text-teal-900" },
  }
  const c = colorClasses[type] ?? colorClasses.co2

  return (
    <Card className="border-2 border-slate-200 p-6 lg:p-8">
      <div className="mb-6 text-center">
        <div className={`mb-2 text-4xl font-bold ${c.title}`}>
          {value} {unit}
        </div>
        <p className="text-slate-600">C'est l'équivalent de...</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((comparison, index) => {
          const Icon = comparison.icon
          return (
            <div key={index} className={`rounded-xl ${c.card} p-4`}>
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${c.iconWrap}`}>
                <Icon className={`h-6 w-6 ${c.icon}`} />
              </div>
              <div className={`mb-2 text-xl font-bold ${c.value}`}>{comparison.equivalent}</div>
              <div className="mb-1 text-sm font-semibold text-slate-900">{comparison.label}</div>
              <p className="text-xs text-slate-600">{comparison.description}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

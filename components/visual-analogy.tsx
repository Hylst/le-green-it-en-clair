"use client"

import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"

interface VisualAnalogyProps {
  title: string
  description: string
  visual: {
    items: {
      icon: string
      count: number
      label: string
    }[]
  }
  color?: "emerald" | "blue" | "teal" | "amber"
}

const colorClasses: Record<string, { card: string; iconWrap: string; title: string; count: string }> = {
  emerald: { card: "border-emerald-200 bg-emerald-50", iconWrap: "bg-emerald-600", title: "text-emerald-900", count: "text-emerald-700" },
  blue: { card: "border-blue-200 bg-blue-50", iconWrap: "bg-blue-600", title: "text-blue-900", count: "text-blue-700" },
  teal: { card: "border-teal-200 bg-teal-50", iconWrap: "bg-teal-600", title: "text-teal-900", count: "text-teal-700" },
  amber: { card: "border-amber-200 bg-amber-50", iconWrap: "bg-amber-600", title: "text-amber-900", count: "text-amber-700" },
}

export function VisualAnalogy({ title, description, visual, color = "emerald" }: VisualAnalogyProps) {
  const c = colorClasses[color] ?? colorClasses.emerald
  return (
    <Card className={`border-2 ${c.card} p-6 lg:p-8`}>
      <div className="mb-4 flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${c.iconWrap}`}>
          <Info className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className={`mb-2 text-xl font-bold ${c.title}`}>{title}</h3>
          <p className="text-slate-700">{description}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {visual.items.map((item, index) => (
          <div key={index} className="text-center">
            <div className="mb-2 flex items-center justify-center gap-1">
              {Array.from({ length: Math.min(item.count, 10) }).map((_, i) => (
                <span key={i} className="text-3xl">
                  {item.icon}
                </span>
              ))}
              {item.count > 10 && <span className={`text-2xl font-bold ${c.count}`}>×{item.count}</span>}
            </div>
            <p className="text-sm font-medium text-slate-700">{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

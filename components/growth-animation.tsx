"use client"

import { useEffect, useState } from "react"

export function GrowthAnimation() {
  const [year, setYear] = useState(2010)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return

    const interval = setInterval(() => {
      setYear((prev) => {
        if (prev >= 2025) {
          setPlaying(false)
          return 2025
        }
        return prev + 1
      })
    }, 500)

    return () => clearInterval(interval)
  }, [playing])

  const getValue = (year: number) => {
    const baseValue = 33.8
    const growth = 1.06
    return (baseValue * Math.pow(growth, year - 2010)).toFixed(1)
  }

  const barHeight = ((Number.parseFloat(getValue(year)) / 72) * 100).toFixed(0)

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-8">
      <h3 className="mb-6 text-center text-2xl font-bold text-slate-900">Croissance des e-déchets mondiaux</h3>

      <div className="relative h-80">
        <svg viewBox="0 0 400 300" className="w-full" xmlns="http://www.w3.org/2000/svg">
          {/* Axes */}
          <line x1="50" y1="250" x2="350" y2="250" stroke="#64748b" strokeWidth="2" />
          <line x1="50" y1="50" x2="50" y2="250" stroke="#64748b" strokeWidth="2" />

          {/* Y-axis labels */}
          <text x="40" y="60" textAnchor="end" fontSize="12" fill="#64748b">
            72 Mt
          </text>
          <text x="40" y="160" textAnchor="end" fontSize="12" fill="#64748b">
            48 Mt
          </text>
          <text x="40" y="250" textAnchor="end" fontSize="12" fill="#64748b">
            0 Mt
          </text>

          {/* Animated bar */}
          <rect
            x="150"
            y={250 - (Number.parseFloat(barHeight) * 200) / 100}
            width="100"
            height={(Number.parseFloat(barHeight) * 200) / 100}
            fill="url(#redGradient)"
            rx="5"
            className="transition-all duration-300"
          />

          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          {/* Value label */}
          <text
            x="200"
            y={240 - (Number.parseFloat(barHeight) * 200) / 100}
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#dc2626"
          >
            {getValue(year)} Mt
          </text>

          {/* Year label */}
          <text x="200" y="275" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#334155">
            {year}
          </text>
        </svg>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => {
            setYear(2010)
            setPlaying(true)
          }}
          className="rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Rejouer
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="rounded-lg border-2 border-red-600 px-6 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          {playing ? "Pause" : "Continuer"}
        </button>
      </div>
    </div>
  )
}

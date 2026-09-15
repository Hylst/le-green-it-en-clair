"use client"

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const PDF_COLORS = {
  primary: [5, 150, 105] as [number, number, number], // emerald-600
  secondary: [16, 185, 129] as [number, number, number], // emerald-500
  text: [30, 41, 59] as [number, number, number], // slate-800
  lightText: [100, 116, 139] as [number, number, number], // slate-500
  bg: [248, 250, 252] as [number, number, number], // slate-50
}

interface LabeledSliderProps {
  value: number[]
  min: number
  max: number
  step: number
  onValueChange: (value: number[]) => void
  unit?: string
  label: string
}

export function LabeledSlider({ value, min, max, step, onValueChange, unit, label }: LabeledSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 shrink-0"
          onClick={() => onValueChange([Math.max(min, value[0] - step)])}
          disabled={value[0] <= min}
          aria-label={`Diminuer ${label}`}
        >
          -
        </Button>
        <div className="flex-1 relative pb-6">
          <Slider value={value} onValueChange={onValueChange} min={min} max={max} step={step} aria-label={label} className="my-2" />
          <div className="absolute top-full left-0 w-full flex justify-between text-[10px] text-gray-500 dark:text-gray-400 font-mono -mt-1 select-none pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="flex flex-col items-center gap-1">
                <span className="h-1 w-px bg-gray-300 dark:bg-gray-600" />
                <span>
                  {Math.round(min + ((max - min) / 4) * i)}
                  {unit}
                </span>
              </span>
            ))}
          </div>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 shrink-0"
          onClick={() => onValueChange([Math.min(max, value[0] + step)])}
          disabled={value[0] >= max}
          aria-label={`Augmenter ${label}`}
        >
          +
        </Button>
      </div>
    </div>
  )
}

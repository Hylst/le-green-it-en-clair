"use client"

import { Info } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SourceTooltipProps {
  source: string
  calculation?: string
  className?: string
}

export function SourceTooltip({ source, calculation, className }: SourceTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={calculation ? `Source : ${source}. Calcul : ${calculation}` : `Source : ${source}`}
          className={cn(
            "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full align-super text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p>
          <span className="font-semibold">Source :</span> {source}
        </p>
        {calculation ? (
          <p className="mt-1">
            <span className="font-semibold">Calcul :</span> {calculation}
          </p>
        ) : null}
      </TooltipContent>
    </Tooltip>
  )
}

"use client"

import { ExternalLink, Info } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SourceTooltipProps {
  source: string
  calculation?: string
  info?: string
  url?: string
  urlLabel?: string
  className?: string
}

export function SourceTooltip({ source, calculation, info, url, urlLabel, className }: SourceTooltipProps) {
  const linkLabel = urlLabel ?? "Voir la source"
  return (
    <span className={cn("inline-flex items-center gap-0.5 align-super", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={[
              `Source : ${source}`,
              info ? `À savoir : ${info}` : null,
              calculation ? `Calcul : ${calculation}` : null,
            ]
              .filter(Boolean)
              .join(". ")}
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p>
            <span className="font-semibold">Source :</span> {source}
          </p>
          {info ? (
            <p className="mt-1">
              <span className="font-semibold">À savoir :</span> {info}
            </p>
          ) : null}
          {calculation ? (
            <p className="mt-1">
              <span className="font-semibold">Calcul :</span> {calculation}
            </p>
          ) : null}
          {url ? (
            <p className="mt-1">
              <span className="font-semibold">Lien :</span> {linkLabel} (nouvel onglet, cliquer sur l’icône à côté)
            </p>
          ) : null}
        </TooltipContent>
      </Tooltip>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${linkLabel} : ${source} (nouvel onglet)`}
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      ) : null}
    </span>
  )
}

"use client"

import type { ReactNode } from "react"
import { useReveal } from "@/lib/motion"

/* Révélation douce d'un bloc au scroll (phase 1 design).
   - Sans JS : useReveal ne pose jamais reveal-init, le contenu reste visible.
   - Animations réduites (système ou interrupteur du pied de page) : idem.
   - Rend la même balise que la section d'origine (prop `as`) pour ne pas
     casser la sémantique ni les fonds posés via className.
   - Phase 2 : prop `id` pour les ancres du sommaire (avec marge de scroll
     sous la navigation et le sommaire sticky). */
export function Reveal({
  as: Tag = "section",
  className,
  id,
  children,
}: {
  as?: "section" | "div"
  className?: string
  id?: string
  children: ReactNode
}) {
  const ref = useReveal()
  return (
    <Tag ref={ref as React.RefObject<never>} className={id ? `${className ?? ""} scroll-mt-32` : className} id={id}>
      {children}
    </Tag>
  )
}

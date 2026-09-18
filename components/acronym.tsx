import Link from "next/link"
import type { ReactNode } from "react"

interface AcronymProps {
  title: string
  children: ReactNode
  /** Slug du terme dans le glossaire (/ressources#terme-...) : ajoute un lien vers la définition au clic. */
  glossary?: string
}

export function Acronym({ title, children, glossary }: AcronymProps) {
  const abbr = (
    <abbr title={title} className="cursor-help underline decoration-dotted underline-offset-2">
      {children}
    </abbr>
  )
  if (!glossary) return abbr
  return (
    <Link
      href={`/ressources#terme-${glossary}`}
      aria-label={`${children} : voir la définition dans le glossaire`}
      className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {abbr}
    </Link>
  )
}

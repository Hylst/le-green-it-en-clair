import type { ReactNode } from "react"

interface AcronymProps {
  title: string
  children: ReactNode
}

export function Acronym({ title, children }: AcronymProps) {
  return (
    <abbr title={title} className="cursor-help underline decoration-dotted underline-offset-2">
      {children}
    </abbr>
  )
}

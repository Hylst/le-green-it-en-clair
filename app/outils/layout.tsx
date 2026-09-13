import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Outils interactifs",
}

export default function OutilsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

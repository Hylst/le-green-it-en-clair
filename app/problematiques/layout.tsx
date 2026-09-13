import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Problématiques & solutions",
}

export default function ProblematiquesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

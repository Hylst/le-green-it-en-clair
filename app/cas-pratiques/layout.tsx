import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Cas pratiques",
}

export default function CasPratiquesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Agir pour un numérique responsable",
}

export default function AgirLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

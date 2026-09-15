import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Agir pour un numérique responsable",
  alternates: { canonical: "https://hylst.fr/greenit/agir" },
}

export default function AgirLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

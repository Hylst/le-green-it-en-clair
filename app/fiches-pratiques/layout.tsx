import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Fiches pratiques",
  alternates: { canonical: "https://hylst.fr/greenit/fiches-pratiques" },
}

export default function FichesPratiquesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

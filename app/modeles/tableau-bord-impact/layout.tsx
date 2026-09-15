import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Tableau de bord d'impact",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/tableau-bord-impact" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

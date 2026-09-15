import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Ressources",
  alternates: { canonical: "https://hylst.fr/greenit/ressources" },
  description: "Ressources et liens utiles pour approfondir le Green IT : rapports, outils, formations et lectures.",
  openGraph: pageOpenGraph("Ressources | Le Green IT en clair", "Ressources et liens utiles pour approfondir le Green IT : rapports, outils, formations et lectures.", "/ressources"),
}

export default function RessourcesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

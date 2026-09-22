import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Ressources",
  alternates: { canonical: canonical("/ressources") },
  description: "Ressources et liens utiles pour approfondir le Green IT : rapports, outils, formations et lectures.",
  openGraph: pageOpenGraph("Ressources | Le Green IT en clair", "Ressources et liens utiles pour approfondir le Green IT : rapports, outils, formations et lectures.", "/ressources"),
}

export default function RessourcesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

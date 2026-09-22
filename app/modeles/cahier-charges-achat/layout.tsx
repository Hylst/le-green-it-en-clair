import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Cahier des charges achat responsable",
  alternates: { canonical: canonical("/modeles/cahier-charges-achat") },
  description: "Modèle de cahier des charges pour des achats numériques responsables, prêt à adapter à votre organisation.",
  openGraph: pageOpenGraph("Cahier des charges achat responsable | Le Green IT en clair", "Modèle de cahier des charges pour des achats numériques responsables, prêt à adapter à votre organisation.", "/modeles/cahier-charges-achat"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

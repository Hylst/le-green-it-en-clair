import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Problématiques & solutions",
  alternates: { canonical: "https://hylst.fr/greenit/problematiques" },
  description: "Les problématiques du numérique : épuisement des ressources, émissions de gaz à effet de serre et déchets électroniques.",
  openGraph: pageOpenGraph("Problématiques & solutions | Le Green IT en clair", "Les problématiques du numérique : épuisement des ressources, émissions de gaz à effet de serre et déchets électroniques.", "/problematiques"),
}

export default function ProblematiquesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

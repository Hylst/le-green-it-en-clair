import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Outils interactifs",
  alternates: { canonical: canonical("/outils") },
  description: "Outils interactifs : calculateur d'empreinte, simulateur de sobriété, audit Green IT, comparateur cloud et quiz.",
  openGraph: pageOpenGraph("Outils interactifs | Le Green IT en clair", "Outils interactifs : calculateur d'empreinte, simulateur de sobriété, audit Green IT, comparateur cloud et quiz.", "/outils"),
}

export default function OutilsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

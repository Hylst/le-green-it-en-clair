import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Perspectives",
  alternates: { canonical: "https://hylst.fr/greenit/perspectives" },
  description: "Perspectives : tendances, innovations et scénarios d'évolution du numérique responsable.",
  openGraph: pageOpenGraph("Perspectives | Le Green IT en clair", "Perspectives : tendances, innovations et scénarios d'évolution du numérique responsable.", "/perspectives"),
}

export default function PerspectivesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

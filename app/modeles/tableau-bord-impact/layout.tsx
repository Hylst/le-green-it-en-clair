import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Tableau de bord d'impact",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/tableau-bord-impact" },
  description: "Modèle de tableau de bord pour suivre l'impact et la consommation du numérique de votre organisation.",
  openGraph: pageOpenGraph("Tableau de bord d'impact | Le Green IT en clair", "Modèle de tableau de bord pour suivre l'impact et la consommation du numérique de votre organisation.", "/modeles/tableau-bord-impact"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

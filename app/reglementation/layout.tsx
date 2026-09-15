import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Réglementation",
  alternates: { canonical: "https://hylst.fr/greenit/reglementation" },
  description: "Réglementation du numérique : lois, directives et obligations pour les organisations et les citoyens.",
  openGraph: pageOpenGraph("Réglementation | Le Green IT en clair", "Réglementation du numérique : lois, directives et obligations pour les organisations et les citoyens.", "/reglementation"),
}

export default function ReglementationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

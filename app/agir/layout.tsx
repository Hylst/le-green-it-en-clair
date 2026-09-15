import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Agir pour un numérique responsable",
  alternates: { canonical: "https://hylst.fr/greenit/agir" },
  description: "Passer à l'action : gestes concrets, outils et ressources pour réduire l'empreinte environnementale du numérique au quotidien.",
  openGraph: pageOpenGraph("Agir pour un numérique responsable | Le Green IT en clair", "Passer à l'action : gestes concrets, outils et ressources pour réduire l'empreinte environnementale du numérique au quotidien.", "/agir"),
}

export default function AgirLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

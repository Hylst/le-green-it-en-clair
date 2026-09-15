import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Modèles & documents",
  alternates: { canonical: "https://hylst.fr/greenit/modeles" },
  description: "Modèles téléchargeables prêts à l'emploi : charte, grille d'audit, plan d'action, tableau de bord et plus.",
  openGraph: pageOpenGraph("Modèles & documents | Le Green IT en clair", "Modèles téléchargeables prêts à l'emploi : charte, grille d'audit, plan d'action, tableau de bord et plus.", "/modeles"),
}

export default function ModelesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

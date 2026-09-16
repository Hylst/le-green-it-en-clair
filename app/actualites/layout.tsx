import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Dossiers et veille Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/actualites" },
  description: "Veille RSS en direct et dossiers de fond sur le numérique responsable : actualités, rapports et analyses pour suivre les évolutions du Green IT.",
  openGraph: pageOpenGraph("Dossiers et veille Green IT | Le Green IT en clair", "Veille RSS en direct et dossiers de fond sur le numérique responsable : actualités, rapports et analyses pour suivre les évolutions du Green IT.", "/actualites"),
}

export default function ActualitesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

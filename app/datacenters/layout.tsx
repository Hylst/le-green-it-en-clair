import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Datacenters verts",
  alternates: { canonical: canonical("/datacenters") },
  description: "Datacenters et cloud : consommation, impacts environnementaux et bonnes pratiques pour un numérique plus sobre.",
  openGraph: pageOpenGraph("Datacenters verts | Le Green IT en clair", "Datacenters et cloud : consommation, impacts environnementaux et bonnes pratiques pour un numérique plus sobre.", "/datacenters"),
}

export default function DatacentersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

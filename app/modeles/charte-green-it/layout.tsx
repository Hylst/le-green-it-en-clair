import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Charte Green IT",
  alternates: { canonical: canonical("/modeles/charte-green-it") },
  description: "Modèle de charte Green IT pour formaliser les engagements numériques responsables de votre organisation.",
  openGraph: pageOpenGraph("Charte Green IT | Le Green IT en clair", "Modèle de charte Green IT pour formaliser les engagements numériques responsables de votre organisation.", "/modeles/charte-green-it"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

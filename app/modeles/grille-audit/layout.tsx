import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Grille d'audit Green IT",
  alternates: { canonical: canonical("/modeles/grille-audit") },
  description: "Grille d'audit Green IT : 26 critères pour évaluer les pratiques numériques responsables de votre organisation.",
  openGraph: pageOpenGraph("Grille d'audit Green IT | Le Green IT en clair", "Grille d'audit Green IT : 26 critères pour évaluer les pratiques numériques responsables de votre organisation.", "/modeles/grille-audit"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

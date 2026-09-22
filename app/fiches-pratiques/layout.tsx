import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Fiches pratiques",
  alternates: { canonical: canonical("/fiches-pratiques") },
  description: "Fiches pratiques Green IT : guides pas à pas pour agir au quotidien, en entreprise et en collectivité.",
  openGraph: pageOpenGraph("Fiches pratiques | Le Green IT en clair", "Fiches pratiques Green IT : guides pas à pas pour agir au quotidien, en entreprise et en collectivité.", "/fiches-pratiques"),
}

export default function FichesPratiquesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

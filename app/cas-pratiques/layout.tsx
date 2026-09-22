import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Cas pratiques",
  alternates: { canonical: canonical("/cas-pratiques") },
  description: "Cas pratiques d'entreprises et de collectivités : exemples concrets de stratégies Green IT et de leurs résultats.",
  openGraph: pageOpenGraph("Cas pratiques | Le Green IT en clair", "Cas pratiques d'entreprises et de collectivités : exemples concrets de stratégies Green IT et de leurs résultats.", "/cas-pratiques"),
}

export default function CasPratiquesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

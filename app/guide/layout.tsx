import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Guide du numérique responsable",
  alternates: { canonical: canonical("/guide") },
  description: "Le guide du numérique responsable : parcours complet des gestes et bonnes pratiques, du diagnostic à l'action.",
  openGraph: pageOpenGraph("Guide du numérique responsable | Le Green IT en clair", "Le guide du numérique responsable : parcours complet des gestes et bonnes pratiques, du diagnostic à l'action.", "/guide"),
}

export default function GuideLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

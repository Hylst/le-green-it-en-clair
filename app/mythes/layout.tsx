import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Mythes vs réalités",
  alternates: { canonical: "https://hylst.fr/greenit/mythes" },
  description: "Mythes et réalités du Green IT : ce qui est vrai, faux ou nuancé sur l'impact du numérique.",
  openGraph: pageOpenGraph("Mythes vs réalités | Le Green IT en clair", "Mythes et réalités du Green IT : ce qui est vrai, faux ou nuancé sur l'impact du numérique.", "/mythes"),
}

export default function MythesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

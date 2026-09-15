import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Chiffres & données",
  alternates: { canonical: "https://hylst.fr/greenit/chiffres" },
  description: "Les chiffres clés de l'impact environnemental du numérique en France et dans le monde, sourcés et expliqués.",
  openGraph: pageOpenGraph("Chiffres & données | Le Green IT en clair", "Les chiffres clés de l'impact environnemental du numérique en France et dans le monde, sourcés et expliqués.", "/chiffres"),
}

export default function ChiffresLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

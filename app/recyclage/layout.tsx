import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Recyclage",
  alternates: { canonical: "https://hylst.fr/greenit/recyclage" },
  description: "Recyclage et reconditionné : filières, gestes et points de collecte pour donner une seconde vie aux appareils.",
  openGraph: pageOpenGraph("Recyclage | Le Green IT en clair", "Recyclage et reconditionné : filières, gestes et points de collecte pour donner une seconde vie aux appareils.", "/recyclage"),
}

export default function RecyclageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

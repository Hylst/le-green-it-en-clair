import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Comprendre le Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/comprendre" },
  description: "Comprendre le Green IT : cycle de vie des équipements, impacts du numérique et notions clés expliquées simplement.",
  openGraph: pageOpenGraph("Comprendre le Green IT | Le Green IT en clair", "Comprendre le Green IT : cycle de vie des équipements, impacts du numérique et notions clés expliquées simplement.", "/comprendre"),
}

export default function ComprendreLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

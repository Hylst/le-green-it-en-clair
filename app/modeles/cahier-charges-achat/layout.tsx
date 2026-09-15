import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Cahier des charges achat responsable",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/cahier-charges-achat" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

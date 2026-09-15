import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Ressources",
  alternates: { canonical: "https://hylst.fr/greenit/ressources" },
}

export default function RessourcesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

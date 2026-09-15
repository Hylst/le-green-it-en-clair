import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Modèles & documents",
  alternates: { canonical: "https://hylst.fr/greenit/modeles" },
}

export default function ModelesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

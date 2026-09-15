import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Réglementation",
  alternates: { canonical: "https://hylst.fr/greenit/reglementation" },
}

export default function ReglementationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

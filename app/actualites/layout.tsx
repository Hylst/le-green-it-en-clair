import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Dossiers et veille Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/actualites" },
}

export default function ActualitesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

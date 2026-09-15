import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Grille d'audit Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/grille-audit" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

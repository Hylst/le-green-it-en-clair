import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Politique numérique responsable",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/politique-numerique" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

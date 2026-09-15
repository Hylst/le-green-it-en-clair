import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Comprendre le Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/comprendre" },
}

export default function ComprendreLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

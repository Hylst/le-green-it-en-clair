import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Chiffres & données",
  alternates: { canonical: "https://hylst.fr/greenit/chiffres" },
}

export default function ChiffresLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

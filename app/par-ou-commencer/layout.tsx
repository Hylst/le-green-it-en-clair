import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Par où commencer",
  alternates: { canonical: "https://hylst.fr/greenit/par-ou-commencer" },
}

export default function ParOuCommencerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

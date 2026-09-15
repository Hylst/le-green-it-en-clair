import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Guide du numérique responsable",
  alternates: { canonical: "https://hylst.fr/greenit/guide" },
}

export default function GuideLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

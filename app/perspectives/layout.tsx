import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Perspectives",
  alternates: { canonical: "https://hylst.fr/greenit/perspectives" },
}

export default function PerspectivesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

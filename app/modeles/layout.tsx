import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Modèles & documents",
}

export default function ModelesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

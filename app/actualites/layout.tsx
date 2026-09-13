import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Actualités Green IT",
}

export default function ActualitesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

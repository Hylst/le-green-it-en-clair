import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Perspectives",
}

export default function PerspectivesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

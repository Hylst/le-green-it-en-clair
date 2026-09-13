import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Chiffres & données",
}

export default function ChiffresLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

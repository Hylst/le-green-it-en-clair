import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FAQ",
}

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

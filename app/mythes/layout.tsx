import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Mythes vs réalités",
}

export default function MythesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

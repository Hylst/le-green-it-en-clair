import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Recyclage",
}

export default function RecyclageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

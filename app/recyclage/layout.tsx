import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Recyclage",
  alternates: { canonical: "https://hylst.fr/greenit/recyclage" },
}

export default function RecyclageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

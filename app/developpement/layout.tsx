import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Guide développeur",
  alternates: { canonical: "https://hylst.fr/greenit/developpement" },
}

export default function DeveloppementLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

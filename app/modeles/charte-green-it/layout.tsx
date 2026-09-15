import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Charte Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/charte-green-it" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

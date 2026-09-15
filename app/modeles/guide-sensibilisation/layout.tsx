import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Kit de sensibilisation Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/guide-sensibilisation" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: "https://hylst.fr/greenit/faq" },
}

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

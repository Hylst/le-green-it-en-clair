import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Plan d'action DSI",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/plan-action-dsi" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

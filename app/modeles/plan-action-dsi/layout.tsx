import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Plan d'action DSI",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/plan-action-dsi" },
  description: "Modèle de plan d'action DSI pour structurer une démarche Green IT sur plusieurs années.",
  openGraph: pageOpenGraph("Plan d'action DSI | Le Green IT en clair", "Modèle de plan d'action DSI pour structurer une démarche Green IT sur plusieurs années.", "/modeles/plan-action-dsi"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

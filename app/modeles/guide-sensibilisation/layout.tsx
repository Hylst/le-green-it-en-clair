import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Kit de sensibilisation Green IT",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/guide-sensibilisation" },
  description: "Modèle de guide de sensibilisation pour mobiliser vos équipes autour du numérique responsable.",
  openGraph: pageOpenGraph("Kit de sensibilisation Green IT | Le Green IT en clair", "Modèle de guide de sensibilisation pour mobiliser vos équipes autour du numérique responsable.", "/modeles/guide-sensibilisation"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

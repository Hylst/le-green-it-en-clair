import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Politique numérique responsable",
  alternates: { canonical: "https://hylst.fr/greenit/modeles/politique-numerique" },
  description: "Modèle de politique numérique responsable à adapter et faire valider dans votre organisation.",
  openGraph: pageOpenGraph("Politique numérique responsable | Le Green IT en clair", "Modèle de politique numérique responsable à adapter et faire valider dans votre organisation.", "/modeles/politique-numerique"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

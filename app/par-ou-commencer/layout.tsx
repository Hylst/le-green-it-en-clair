import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Par où commencer",
  alternates: { canonical: "https://hylst.fr/greenit/par-ou-commencer" },
  description: "Par où commencer : un parcours guidé pour découvrir le Green IT selon votre profil.",
  openGraph: pageOpenGraph("Par où commencer | Le Green IT en clair", "Par où commencer : un parcours guidé pour découvrir le Green IT selon votre profil.", "/par-ou-commencer"),
}

export default function ParOuCommencerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

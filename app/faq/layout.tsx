import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: canonical("/faq") },
  description: "Réponses aux questions fréquentes sur le Green IT, l'impact du numérique et les gestes pour agir.",
  openGraph: pageOpenGraph("FAQ | Le Green IT en clair", "Réponses aux questions fréquentes sur le Green IT, l'impact du numérique et les gestes pour agir.", "/faq"),
}

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

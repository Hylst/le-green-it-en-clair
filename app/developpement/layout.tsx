import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Guide développeur",
  alternates: { canonical: canonical("/developpement") },
  description: "Écoconception web : bonnes pratiques et repères pour concevoir des sites et applications plus sobres.",
  openGraph: pageOpenGraph("Guide développeur | Le Green IT en clair", "Écoconception web : bonnes pratiques et repères pour concevoir des sites et applications plus sobres.", "/developpement"),
}

export default function DeveloppementLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

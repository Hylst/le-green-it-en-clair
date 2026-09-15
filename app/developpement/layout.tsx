import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Guide développeur",
  alternates: { canonical: "https://hylst.fr/greenit/developpement" },
  description: "Écoconception web : bonnes pratiques et repères pour concevoir des sites et applications plus sobres.",
  openGraph: pageOpenGraph("Guide développeur | Le Green IT en clair", "Écoconception web : bonnes pratiques et repères pour concevoir des sites et applications plus sobres.", "/developpement"),
}

export default function DeveloppementLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

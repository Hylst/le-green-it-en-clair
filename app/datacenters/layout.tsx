import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Datacenters verts",
}

export default function DatacentersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

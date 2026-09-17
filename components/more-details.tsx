import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

/* Bloc dépliable natif (details et summary) : lisible sans JavaScript,
   utilisable au clavier sans code, et imprimé avec son contenu.
   Sert à ranger l'approfondissement sans charger la page au premier regard. */

export function MoreDetails({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-border bg-card px-5 py-4 transition-colors open:bg-secondary/40">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </details>
  )
}

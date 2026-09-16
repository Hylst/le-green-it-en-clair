"use client"

import { useEffect, useState } from "react"

/* Sommaire sticky avec scrollspy (phase 2 design).
   - Liens d'ancrage natifs : fonctionnent sans JS.
   - La surbrillance de la section lue est un bonus JS (IntersectionObserver).
   - Horizontal et défilable sur mobile, une ligne. */
export function Sommaire({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    sections.forEach((section) => io.observe(section))
    return () => io.disconnect()
    // items est une donnée statique (littéral dans la page) : une seule observation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav aria-label="Sommaire de la page" className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
              active === item.id
                ? "bg-theme-soft font-semibold text-theme-ink"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

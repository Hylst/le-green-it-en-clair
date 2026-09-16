import Image from "next/image"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* Hero standardisé (audit design 09/2026) : badge, titre, intro, image et
   actions optionnels. La couleur vient de data-theme, jamais en dur.
   Composant serveur : l'image reste optimisée au build. */

export type PageTheme =
  | "emerald"
  | "teal"
  | "red"
  | "orange"
  | "amber"
  | "blue"
  | "cyan"
  | "violet"
  | "indigo"

interface PageHeroProps {
  theme?: PageTheme
  badge?: { icon?: LucideIcon; label?: string }
  title: ReactNode
  intro?: ReactNode
  image?: { src: string; alt: string }
  actions?: ReactNode
  className?: string
}

export function PageHero({ theme = "emerald", badge, title, intro, image, actions, className }: PageHeroProps) {
  const BadgeIcon = badge?.icon
  const showBadge = Boolean(badge && (BadgeIcon || badge.label))
  return (
    <section
      data-theme={theme}
      className={cn("bg-gradient-to-br from-theme-soft via-background to-theme-soft px-6 py-16 lg:py-24", className)}
    >
      <div className="mx-auto max-w-4xl text-center">
        {showBadge && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-theme-border bg-theme-soft px-4 py-2 text-sm font-medium text-theme-ink">
            {BadgeIcon && <BadgeIcon className="h-4 w-4" aria-hidden="true" />}
            {badge?.label}
          </div>
        )}
        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">{title}</h1>
        {intro && <div className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">{intro}</div>}
        {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{actions}</div>}
      </div>
      {image && (
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-border shadow-lg">
          <Image
            src={image.src}
            alt={image.alt}
            width={1376}
            height={768}
            className="hero-float h-auto w-full"
            quality={85}
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}
    </section>
  )
}

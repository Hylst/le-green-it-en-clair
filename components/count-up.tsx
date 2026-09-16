"use client"

import { useEffect, useRef } from "react"
import { isMotionReduced } from "@/lib/motion"

/* Compteur animé à l'apparition (phase 2 design).
   - Rendu serveur = valeur finale exacte (SEO, sans JS, lecteurs d'écran).
   - L'animation ne démarre qu'à l'entrée dans le viewport ; si le chiffre
     est déjà visible au chargement ou si les animations sont réduites
     (système ou interrupteur du pied de page), on garde la valeur finale.
   - Formatage fr-FR identique côté serveur et pendant l'animation. */
function format(value: number, decimals: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1200,
}: {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const text = (value: number) => `${prefix}${format(value, decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || isMotionReduced()) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          el.textContent = text(to * eased)
          if (progress < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <span ref={ref}>{text(to)}</span>
}

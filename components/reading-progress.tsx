"use client"

import { useEffect, useRef } from "react"

/* Barre de progression de lecture (phase 2 design).
   - 3 px en haut de l'écran, couleur du thème de la page (bg-theme).
   - transform scaleX uniquement (pas de reflow), scroll/resize passifs + rAF.
   - Purement indicative (aria-hidden) : conservée si animations réduites,
     sans transition de toute façon. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" ref={ref} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-theme" />
  )
}

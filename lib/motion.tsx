"use client"

import { useEffect, useRef } from "react"

/* Option « Réduire les animations » : persistée en localStorage (clé
   documentée dans mentions-legales), appliquée via la classe motion-off
   sur <html>. Le CSS fait le reste (voir globals.css). */

export const MOTION_KEY = "greenit-motion"

export function isMotionReduced(): boolean {
  if (typeof document === "undefined") return false
  if (document.documentElement.classList.contains("motion-off")) return true
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

export function setMotionReduced(reduced: boolean): void {
  try {
    document.documentElement.classList.toggle("motion-off", reduced)
    localStorage.setItem(MOTION_KEY, reduced ? "reduced" : "full")
  } catch {
    /* stockage indisponible : on applique quand même pour la session */
    document.documentElement.classList.toggle("motion-off", reduced)
  }
}

/* Apparition douce au scroll. La classe reveal-init n'est posée qu'en JS :
   sans JS (ou avec animations réduites), le contenu reste visible. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): React.RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || isMotionReduced()) return
    el.classList.add("reveal-init")
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}

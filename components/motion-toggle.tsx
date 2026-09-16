"use client"

import { useEffect, useState } from "react"
import { Zap, ZapOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MOTION_KEY, setMotionReduced } from "@/lib/motion"

export function MotionToggle() {
  const [mounted, setMounted] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      setReduced(
        document.documentElement.classList.contains("motion-off") ||
          localStorage.getItem(MOTION_KEY) === "reduced"
      )
    } catch {
      setReduced(document.documentElement.classList.contains("motion-off"))
    }
  }, [])

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" aria-hidden="true" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const next = !reduced
        setReduced(next)
        setMotionReduced(next)
      }}
      aria-label={reduced ? "Rétablir les animations" : "Réduire les animations"}
      title={reduced ? "Rétablir les animations" : "Réduire les animations"}
      aria-pressed={reduced}
      className="h-9 w-9 rounded-lg transition-colors hover:bg-secondary"
    >
      {reduced ? <ZapOff className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
    </Button>
  )
}

import * as React from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(QUERY)
    setPrefersReduced(mql.matches)
    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return prefersReduced
}

export function ChartFallback({ height = 300 }: { height?: number }) {
  return (
    <div
      className="flex w-full items-center justify-center rounded-lg bg-muted"
      style={{ height }}
    >
      <p className="text-sm text-muted-foreground">Chargement du graphique…</p>
    </div>
  )
}

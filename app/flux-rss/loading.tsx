import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block h-8 w-48 animate-pulse rounded-full bg-slate-200"></div>
          <div className="mx-auto mb-4 h-12 w-96 animate-pulse rounded bg-slate-200"></div>
          <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse p-6">
              <div className="mb-3 h-6 w-32 rounded bg-slate-200"></div>
              <div className="mb-3 h-8 w-3/4 rounded bg-slate-200"></div>
              <div className="mb-2 h-4 w-full rounded bg-slate-200"></div>
              <div className="mb-2 h-4 w-full rounded bg-slate-200"></div>
              <div className="h-4 w-2/3 rounded bg-slate-200"></div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

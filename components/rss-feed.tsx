"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, ExternalLink, Loader2, RefreshCw, Rss, WifiOff } from "lucide-react"

type Feed = {
  id: string
  name: string
  url: string
  lang: "fr" | "en"
  topic: string
  direct?: boolean
}

export const RSS_FEEDS: Feed[] = [
  { id: "greenit", name: "GreenIT.fr", url: "https://www.greenit.fr/feed/", lang: "fr", topic: "Numérique responsable" },
  { id: "inr", name: "Institut du Numérique Responsable", url: "https://institutnr.org/feed/", lang: "fr", topic: "Association" },
  { id: "shift", name: "The Shift Project", url: "https://theshiftproject.org/feed/", lang: "fr", topic: "Think tank" },
  { id: "nextink", name: "Next.ink", url: "https://next.ink/feed/", lang: "fr", topic: "Tech & société", direct: true },
  { id: "numerama", name: "Numerama", url: "https://www.numerama.com/feed/", lang: "fr", topic: "Tech & société" },
  { id: "dcd", name: "Data Center Dynamics", url: "https://www.datacenterdynamics.com/rss/", lang: "en", topic: "Datacenters" },
  { id: "register", name: "The Register", url: "https://www.theregister.com/headlines.atom", lang: "en", topic: "Tech" },
  { id: "unep", name: "UNEP", url: "https://www.unep.org/rss.xml", lang: "en", topic: "Environnement" },
]

const DEFAULT_SELECTED = ["greenit", "inr", "shift", "nextink"]
const STORAGE_KEY = "greenit-selected-feeds-v1"

type NewsItem = {
  title: string
  link: string
  date: string | null
  feedId: string
}

type FeedStatus = "idle" | "loading" | "ok" | "error"

function cleanText(value: string | null | undefined) {
  if (!value) return ""
  try {
    const doc = new DOMParser().parseFromString(value, "text/html")
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim()
  } catch {
    return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
  }
}

function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string)
    return url.protocol === "https:"
  } catch {
    return false
  }
}

function parseDate(value: string | null | undefined) {
  if (!value) return null
  const time = Date.parse(value)
  return Number.isFinite(time) ? new Date(time).toISOString() : null
}

function formatDate(value: string | null) {
  if (!value) return ""
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value))
}

function getFreshnessBadge(dateStr: string | null): { label: string; className: string } | null {
  if (!dateStr) return null
  const time = Date.parse(dateStr)
  if (!Number.isFinite(time)) return null
  const diffHours = (Date.now() - time) / (1000 * 60 * 60)
  if (diffHours < 24 && diffHours >= -4) {
    return {
      label: "< 24 h",
      className: "border-emerald-600/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
    }
  }
  if (diffHours < 72 && diffHours >= 24) {
    return {
      label: "< 3 j",
      className: "border-sky-600/30 bg-sky-500/10 text-sky-800 dark:text-sky-300",
    }
  }
  return null
}

function parseXml(text: string, feed: Feed): NewsItem[] {
  const doc = new DOMParser().parseFromString(text, "text/xml")
  if (doc.querySelector("parsererror")) throw new Error("XML illisible")

  const entries = [...Array.from(doc.getElementsByTagName("item")), ...Array.from(doc.getElementsByTagName("entry"))]
  return entries
    .map((entry) => {
      const title = cleanText(entry.getElementsByTagName("title")[0]?.textContent)
      let link = cleanText(entry.getElementsByTagName("link")[0]?.textContent)
      if (!link) {
        const links = Array.from(entry.getElementsByTagName("link"))
        const alternate = links.find((l) => l.getAttribute("rel") === "alternate") || links[0]
        link = alternate?.getAttribute("href") || ""
      }
      const date =
        parseDate(entry.getElementsByTagName("pubDate")[0]?.textContent) ||
        parseDate(entry.getElementsByTagName("published")[0]?.textContent) ||
        parseDate(entry.getElementsByTagName("updated")[0]?.textContent)
      return { title, link, date, feedId: feed.id }
    })
    .filter((item) => item.title && item.link && isValidHttpUrl(item.link))
}

async function fetchDirect(feed: Feed): Promise<NewsItem[]> {
  const res = await fetch(feed.url, {
    headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*" },
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const text = await res.text()
  const items = parseXml(text, feed)
  if (!items.length) throw new Error("flux vide")
  return items
}

async function fetchViaApi(feed: Feed): Promise<NewsItem[]> {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
    { signal: AbortSignal.timeout(10000) }
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  if (json.status !== "ok" || !Array.isArray(json.items)) throw new Error("flux indisponible")
  return json.items
    .map((item: { title?: string; link?: string; pubDate?: string }) => ({
      title: cleanText(item.title),
      link: item.link || "",
      date: parseDate(item.pubDate),
      feedId: feed.id,
    }))
    .filter((item: NewsItem) => item.title && item.link && isValidHttpUrl(item.link))
}

const CACHE_KEY_PREFIX = "greenit-rss-cache-"
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes

function getCachedFeed(feedId: string): NewsItem[] | null {
  try {
    const raw = sessionStorage.getItem(`${CACHE_KEY_PREFIX}${feedId}`)
    if (!raw) return null
    const { timestamp, items } = JSON.parse(raw)
    if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(items)) {
      return items
    }
  } catch {
    // Ignorer
  }
  return null
}

function setCachedFeed(feedId: string, items: NewsItem[]) {
  try {
    sessionStorage.setItem(
      `${CACHE_KEY_PREFIX}${feedId}`,
      JSON.stringify({ timestamp: Date.now(), items })
    )
  } catch {
    // Ignorer si quota ou inaccessible
  }
}

async function loadFeed(feed: Feed, force = false): Promise<NewsItem[]> {
  if (!force) {
    const cached = getCachedFeed(feed.id)
    if (cached) return cached
  }

  let items: NewsItem[] = []
  if (feed.direct) {
    try {
      items = await fetchDirect(feed)
    } catch {
      items = await fetchViaApi(feed)
    }
  } else {
    try {
      items = await fetchViaApi(feed)
    } catch {
      items = await fetchDirect(feed)
    }
  }

  if (items.length > 0) {
    setCachedFeed(feed.id, items)
  }
  return items
}

export function RssFeed() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED)
  const [items, setItems] = useState<NewsItem[]>([])
  const [status, setStatus] = useState<Record<string, FeedStatus>>({})
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const isInitialized = useRef(false)

  useEffect(() => {
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((id) => RSS_FEEDS.some((feed) => feed.id === id))
          setSelected(valid)
        }
      }
    } catch {
      // Ignorer si localStorage n'est pas accessible
    }
    isInitialized.current = true
  }, [])

  const toggleFeed = (id: string) => {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Ignorer si quota ou inaccessible
      }
      return next
    })
  }

  const load = useCallback(async (feeds: Feed[], force = false) => {
    setLoading(true)
    setStatus(Object.fromEntries(feeds.map((feed) => [feed.id, "loading" as FeedStatus])))
    const results = await Promise.all(
      feeds.map(async (feed) => {
        try {
          const feedItems = await loadFeed(feed, force)
          return { feed, feedItems, ok: true as const }
        } catch {
          return { feed, feedItems: [] as NewsItem[], ok: false as const }
        }
      })
    )

    const nextStatus: Record<string, FeedStatus> = {}
    const collected: NewsItem[] = []
    for (const result of results) {
      nextStatus[result.feed.id] = result.ok ? "ok" : "error"
      collected.push(...result.feedItems)
    }

    const seen = new Set<string>()
    const deduped = collected
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
      .filter((item) => {
        const key = (item.link || item.title).replace(/[#?].*$/, "")
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

    setItems(deduped.slice(0, 40))
    setStatus(nextStatus)
    setUpdatedAt(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    const feeds = RSS_FEEDS.filter((feed) => selected.includes(feed.id))
    if (feeds.length) {
      load(feeds)
    } else {
      setItems([])
      setStatus({})
      setUpdatedAt(null)
      setLoading(false)
    }
  }, [selected, load])

  const feedById = useMemo(() => new Map(RSS_FEEDS.map((feed) => [feed.id, feed])), [])
  const hasError = Object.values(status).some((value) => value === "error")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Flux suivis :</span>
        {RSS_FEEDS.map((feed) => {
          const active = selected.includes(feed.id)
          const feedStatus = status[feed.id]
          return (
            <button
              key={feed.id}
              type="button"
              onClick={() => toggleFeed(feed.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              {feedStatus === "loading" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Chargement en cours</span>
                </>
              ) : feedStatus === "ok" ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span className="sr-only">Flux chargé avec succès</span>
                </>
              ) : feedStatus === "error" ? (
                <>
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <span className="sr-only">Erreur de chargement du flux</span>
                </>
              ) : (
                <Rss className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {feed.name}
              <span className="text-xs uppercase text-muted-foreground">{feed.lang}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5" aria-live="polite" aria-atomic="true">
          {!isOnline ? (
            <>
              <WifiOff className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              <span className="text-amber-700 dark:text-amber-400">
                Mode hors-ligne : {items.length > 0 ? "affichage des actualités en cache." : "connexion requise pour charger les flux."}
              </span>
            </>
          ) : loading ? (
            "Chargement des flux…"
          ) : updatedAt ? (
            `Mis à jour à ${updatedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} (${items.length} actualité${items.length > 1 ? "s" : ""}) — titres et liens uniquement, contenus chez les sources.`
          ) : (
            "Titres et liens uniquement, contenus chez les sources."
          )}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => load(RSS_FEEDS.filter((feed) => selected.includes(feed.id)), true)}
          disabled={loading || selected.length === 0 || !isOnline}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          Actualiser
        </Button>
      </div>

      {selected.length === 0 && (
        <Card className="border-2 border-dashed p-6 text-center text-sm text-muted-foreground">
          Sélectionnez au moins un flux pour afficher les dernières nouvelles.
        </Card>
      )}

      {hasError && !loading && (
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Un flux n'a pas répondu : il reste accessible via son site (icône ⚠ dans la liste ci-dessus). Les autres
          s'affichent normalement.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const feed = feedById.get(item.feedId)
          const freshness = getFreshnessBadge(item.date)
          return (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between gap-3 rounded-xl border-2 border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-foreground">
                      {feed?.name}
                    </span>
                    {freshness && (
                      <span className={`rounded-full border px-2 py-0.5 font-medium ${freshness.className}`}>
                        {freshness.label}
                      </span>
                    )}
                  </div>
                  {item.date && <span className="text-muted-foreground">{formatDate(item.date)}</span>}
                </div>
                <h3 className="font-semibold leading-snug text-foreground group-hover:text-primary">
                  {item.title}
                </h3>
              </div>
              <span className="inline-flex items-center text-sm font-medium text-primary">
                Lire chez la source
                <ExternalLink className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          )
        })}
      </div>

      {!loading && selected.length > 0 && items.length === 0 && (
        <Card className="border-2 p-6 text-center text-sm text-muted-foreground">
          {!isOnline ? (
            <div className="space-y-2">
              <WifiOff className="mx-auto h-8 w-8 text-amber-700 dark:text-amber-400 opacity-80" aria-hidden="true" />
              <p className="font-semibold text-foreground">Vous êtes actuellement hors-ligne</p>
              <p>Les flux d'actualités en direct nécessitent une connexion internet. Les actualités apparaîtront dès que la connexion sera rétablie.</p>
            </div>
          ) : (
            "Aucune actualité récupérée pour l'instant. Réessayez dans quelques minutes ou ouvrez directement les flux ci-dessus."
          )}
        </Card>
      )}
    </div>
  )
}

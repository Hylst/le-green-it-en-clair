"use client"

// Sauvegarde locale des estimations page web (outil estimateur).
// Modèle : lib/audit-parc-storage.ts (versionnage + validation + try/catch).
// Clé versionnée, JSON { estimations: [...] }, 10 dernières conservées.
// Les données restent sur l'appareil, aucune donnée envoyée.

export interface WebsiteCarbonSnapshot {
  weightMB: number
  visits: number
  green: boolean
  date: string
}

export interface WebsiteCarbonStore {
  schemaVersion: 1
  estimations: WebsiteCarbonSnapshot[]
}

export const WEBSITE_CARBON_STORAGE_KEY = "greenit-website-carbon-v1"
export const WEBSITE_CARBON_MAX_SAVED = 10

function isValidSnapshot(entry: unknown): entry is WebsiteCarbonSnapshot {
  if (!entry || typeof entry !== "object") return false
  const { weightMB, visits, green, date } = entry as {
    weightMB?: unknown
    visits?: unknown
    green?: unknown
    date?: unknown
  }
  return (
    typeof weightMB === "number" &&
    Number.isFinite(weightMB) &&
    weightMB > 0 &&
    weightMB <= 1000 &&
    typeof visits === "number" &&
    Number.isInteger(visits) &&
    visits >= 1 &&
    visits <= 100000000 &&
    typeof green === "boolean" &&
    typeof date === "string"
  )
}

export function clearWebsiteCarbon() {
  try {
    window.localStorage.removeItem(WEBSITE_CARBON_STORAGE_KEY)
  } catch {
    // stockage indisponible : l'estimateur continue sans persistance
  }
}

function persistWebsiteCarbonStore(store: WebsiteCarbonStore) {
  try {
    window.localStorage.setItem(WEBSITE_CARBON_STORAGE_KEY, JSON.stringify(store))
  } catch {
    // stockage indisponible ou plein : l'estimateur continue sans persistance
  }
}

// Valide un JSON (sauvegarde locale ou fichier importé) sans rien présumer :
// mêmes règles des deux côtés (version, bornes, types).
export function parseWebsiteCarbonStore(raw: string): WebsiteCarbonStore | null {
  let parsed: unknown = null
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }

  const store = parsed as Partial<WebsiteCarbonStore> | null
  const valid =
    !!store &&
    store.schemaVersion === 1 &&
    Array.isArray(store.estimations) &&
    store.estimations.length <= WEBSITE_CARBON_MAX_SAVED &&
    store.estimations.every(isValidSnapshot)

  if (!valid) return null
  return store as WebsiteCarbonStore
}

export function loadWebsiteCarbon(): WebsiteCarbonStore | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(WEBSITE_CARBON_STORAGE_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  const store = parseWebsiteCarbonStore(raw)
  if (!store) clearWebsiteCarbon()
  return store
}

export function saveWebsiteCarbonEstimation(entry: WebsiteCarbonSnapshot): WebsiteCarbonStore {
  const current = loadWebsiteCarbon()
  const store: WebsiteCarbonStore = {
    schemaVersion: 1,
    estimations: [entry, ...(current?.estimations ?? [])].slice(0, WEBSITE_CARBON_MAX_SAVED),
  }
  persistWebsiteCarbonStore(store)
  return store
}

export function removeWebsiteCarbonEstimation(date: string): WebsiteCarbonStore {
  const current = loadWebsiteCarbon()
  const store: WebsiteCarbonStore = {
    schemaVersion: 1,
    estimations: (current?.estimations ?? []).filter((entry) => entry.date !== date),
  }
  persistWebsiteCarbonStore(store)
  return store
}

// Import d'un fichier : validé comme la sauvegarde locale, puis persisté tel quel.
export function importWebsiteCarbonStore(raw: string): WebsiteCarbonStore | null {
  const store = parseWebsiteCarbonStore(raw)
  if (!store) return null
  persistWebsiteCarbonStore(store)
  return store
}

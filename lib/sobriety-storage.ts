"use client"

import type { SobrietyScenario } from "./sobriety-calc"

// Sauvegarde locale des scénarios de sobriété (simulateur).
// Modèle : lib/website-carbon-storage.ts (versionnage + validation + try/catch).
// Clé versionnée, JSON { scenarios: [...] }, 10 derniers conservés.
// Les données restent sur l'appareil, aucune donnée envoyée.

export interface SobrietySnapshot {
  name: string
  date: string
  scenario: SobrietyScenario
  percentage: number
  savings: number
}

export interface SobrietyStore {
  schemaVersion: 1
  scenarios: SobrietySnapshot[]
}

export const SOBRIETY_STORAGE_KEY = "greenit-sobriety-v1"
export const SOBRIETY_MAX_SAVED = 10

function isValidScenario(entry: unknown): entry is SobrietyScenario {
  if (!entry || typeof entry !== "object") return false
  const { deviceLifespan, purchaseChoice, streamingQuality, emailCleanup, cloudStorage } = entry as {
    deviceLifespan?: unknown
    purchaseChoice?: unknown
    streamingQuality?: unknown
    emailCleanup?: unknown
    cloudStorage?: unknown
  }
  return (
    typeof deviceLifespan === "number" &&
    Number.isInteger(deviceLifespan) &&
    deviceLifespan >= 2 &&
    deviceLifespan <= 7 &&
    (purchaseChoice === "new" || purchaseChoice === "repair" || purchaseChoice === "refurb") &&
    (streamingQuality === "4k" || streamingQuality === "1080p" || streamingQuality === "720p") &&
    (emailCleanup === "never" || emailCleanup === "monthly" || emailCleanup === "weekly") &&
    (cloudStorage === "keep" || cloudStorage === "optimize" || cloudStorage === "local")
  )
}

function isValidSnapshot(entry: unknown): entry is SobrietySnapshot {
  if (!entry || typeof entry !== "object") return false
  const { name, date, scenario, percentage, savings } = entry as {
    name?: unknown
    date?: unknown
    scenario?: unknown
    percentage?: unknown
    savings?: unknown
  }
  return (
    typeof name === "string" &&
    name.trim() !== "" &&
    name.length <= 80 &&
    typeof date === "string" &&
    date !== "" &&
    isValidScenario(scenario) &&
    typeof percentage === "number" &&
    Number.isInteger(percentage) &&
    percentage >= 0 &&
    percentage <= 100 &&
    typeof savings === "number" &&
    Number.isFinite(savings) &&
    savings >= 0
  )
}

export function clearSobriety() {
  try {
    window.localStorage.removeItem(SOBRIETY_STORAGE_KEY)
  } catch {
    // stockage indisponible : le simulateur continue sans persistance
  }
}

function persistSobrietyStore(store: SobrietyStore) {
  try {
    window.localStorage.setItem(SOBRIETY_STORAGE_KEY, JSON.stringify(store))
  } catch {
    // stockage indisponible ou plein : le simulateur continue sans persistance
  }
}

// Valide un JSON (sauvegarde locale ou fichier importé) sans rien présumer :
// mêmes règles des deux côtés (version, bornes, types).
export function parseSobrietyStore(raw: string): SobrietyStore | null {
  let parsed: unknown = null
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }

  const store = parsed as Partial<SobrietyStore> | null
  const valid =
    !!store &&
    store.schemaVersion === 1 &&
    Array.isArray(store.scenarios) &&
    store.scenarios.length <= SOBRIETY_MAX_SAVED &&
    store.scenarios.every(isValidSnapshot)

  if (!valid) return null
  return store as SobrietyStore
}

export function loadSobriety(): SobrietyStore | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(SOBRIETY_STORAGE_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  const store = parseSobrietyStore(raw)
  if (!store) clearSobriety()
  return store
}

export function saveSobrietyScenario(entry: SobrietySnapshot): SobrietyStore {
  const current = loadSobriety()
  const store: SobrietyStore = {
    schemaVersion: 1,
    scenarios: [entry, ...(current?.scenarios ?? [])].slice(0, SOBRIETY_MAX_SAVED),
  }
  persistSobrietyStore(store)
  return store
}

export function removeSobrietyScenario(date: string): SobrietyStore {
  const current = loadSobriety()
  const store: SobrietyStore = {
    schemaVersion: 1,
    scenarios: (current?.scenarios ?? []).filter((entry) => entry.date !== date),
  }
  persistSobrietyStore(store)
  return store
}

// Import d'un fichier : validé comme la sauvegarde locale, puis persisté tel quel.
export function importSobrietyStore(raw: string): SobrietyStore | null {
  const store = parseSobrietyStore(raw)
  if (!store) return null
  persistSobrietyStore(store)
  return store
}

"use client"

// Sauvegarde locale du parc audité (Vague 3 : audit parc).
// Modèle : lib/quiz-storage.ts (versionnage + validation + try/catch).
// Clé versionnée, JSON { inventaire, partReconditionnee, date }.
// Les données restent sur l'appareil, aucune donnée envoyée.

export interface AuditParcInventaire {
  desktops: { count: number; avgAge: number }
  laptops: { count: number; avgAge: number }
  monitors: { count: number; avgAge: number }
  smartphones: { count: number; avgAge: number }
  tablets: { count: number; avgAge: number }
  printers: { count: number; avgAge: number }
  servers: { count: number; avgAge: number }
}

export interface AuditParcSnapshot {
  schemaVersion: 1
  inventaire: AuditParcInventaire
  partReconditionnee: number
  date: string
}

export const AUDIT_PARC_STORAGE_KEY = "greenit-audit-parc-v1"

const DEVICE_KEYS = [
  "desktops",
  "laptops",
  "monitors",
  "smartphones",
  "tablets",
  "printers",
  "servers",
] as const

function isValidDeviceEntry(entry: unknown): entry is { count: number; avgAge: number } {
  if (!entry || typeof entry !== "object") return false
  const { count, avgAge } = entry as { count?: unknown; avgAge?: unknown }
  return (
    typeof count === "number" &&
    Number.isInteger(count) &&
    count >= 0 &&
    count <= 100 &&
    typeof avgAge === "number" &&
    Number.isInteger(avgAge) &&
    avgAge >= 1 &&
    avgAge <= 10
  )
}

export function clearAuditParc() {
  try {
    window.localStorage.removeItem(AUDIT_PARC_STORAGE_KEY)
  } catch {
    // stockage indisponible : l'audit continue sans persistance
  }
}

export function saveAuditParc(inventaire: AuditParcInventaire, partReconditionnee: number) {
  const snapshot: AuditParcSnapshot = {
    schemaVersion: 1,
    inventaire,
    partReconditionnee,
    date: new Date().toISOString(),
  }
  try {
    window.localStorage.setItem(AUDIT_PARC_STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // stockage indisponible ou plein : l'audit continue sans persistance
  }
  return snapshot
}

export function loadAuditParc(): AuditParcSnapshot | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(AUDIT_PARC_STORAGE_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  let parsed: unknown = null
  try {
    parsed = JSON.parse(raw)
  } catch {
    clearAuditParc()
    return null
  }

  const snapshot = parsed as Partial<AuditParcSnapshot> | null
  const inventaire = snapshot?.inventaire as Record<string, unknown> | undefined
  const valid =
    !!snapshot &&
    snapshot.schemaVersion === 1 &&
    !!inventaire &&
    DEVICE_KEYS.every((key) => isValidDeviceEntry(inventaire[key])) &&
    typeof snapshot.partReconditionnee === "number" &&
    Number.isFinite(snapshot.partReconditionnee) &&
    (snapshot.partReconditionnee as number) >= 0 &&
    (snapshot.partReconditionnee as number) <= 100 &&
    typeof snapshot.date === "string"

  if (!valid) {
    clearAuditParc()
    return null
  }

  return snapshot as AuditParcSnapshot
}

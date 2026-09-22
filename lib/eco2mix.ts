export interface Eco2MixRawRecord {
  date_heure: string;
  date: string;
  heure: string;
  consommation: number | null;
  taux_co2: number | null;
  nucleaire: number | null;
  eolien: number | null;
  solaire: number | null;
  hydraulique: number | null;
  bioenergies: number | null;
  gaz: number | null;
  fioul: number | null;
  charbon: number | null;
  ech_physiques: number | null;
}

export interface Eco2MixData {
  timestamp: string;
  dateFormatted: string;
  timeFormatted: string;
  tauxCo2: number;
  consommationMw: number;
  productionTotalMw: number;
  decarbonePercent: number;
  renouvelablePercent: number;
  echangesPhysiquesMw: number;
  filières: {
    nucleaire: number;
    eolien: number;
    solaire: number;
    hydraulique: number;
    bioenergies: number;
    gaz: number;
    charbonFioul: number;
  };
  isFallback?: boolean;
}

export const ECO2MIX_FALLBACK: Eco2MixData = {
  timestamp: "2026-09-16T13:30:00+00:00",
  dateFormatted: "16/09/2026",
  timeFormatted: "15:30",
  tauxCo2: 10,
  consommationMw: 49398,
  // Total = somme des filières (60 935), pas 55 669 : l'ancien total excluait
  // le gaz du décompte, ce qui affichait une part décarbonée > 100 %.
  productionTotalMw: 60935,
  decarbonePercent: 99.68,
  renouvelablePercent: 39.54,
  echangesPhysiquesMw: -10722,
  filières: {
    nucleaire: 36646,
    eolien: 5196,
    solaire: 15014,
    hydraulique: 2915,
    bioenergies: 966,
    gaz: 162,
    charbonFioul: 36,
  },
  isFallback: true,
};

function isValidRecord(record: Eco2MixRawRecord): boolean {
  return record.taux_co2 !== null && record.taux_co2 !== undefined;
}

export function parseEco2MixRecord(record: Eco2MixRawRecord): Eco2MixData | null {
  if (!isValidRecord(record)) {
    return null;
  }

  const tauxCo2 = record.taux_co2!;
  const consommationMw = record.consommation ?? 0;

  const nucleaire = record.nucleaire ?? 0;
  const eolien = record.eolien ?? 0;
  const solaire = record.solaire ?? 0;
  const hydraulique = record.hydraulique ?? 0;
  const bioenergies = record.bioenergies ?? 0;
  const gaz = record.gaz ?? 0;
  const fioul = record.fioul ?? 0;
  const charbon = record.charbon ?? 0;
  // Gaz affiché à part dans le graphique : regrouper gaz + fioul + charbon
  // sous « Charbon/Fioul » compterait le gaz deux fois.
  const charbonFioul = fioul + charbon;

  const productionTotalMw = nucleaire + eolien + solaire + hydraulique + bioenergies + gaz + charbonFioul;
  const decarbonePercent = productionTotalMw > 0
    ? Math.round(((nucleaire + eolien + solaire + hydraulique + bioenergies) / productionTotalMw) * 10000) / 100
    : 0;
  const renouvelablePercent = productionTotalMw > 0
    ? Math.round((eolien + solaire + hydraulique + bioenergies) / productionTotalMw * 10000) / 100
    : 0;

  return {
    timestamp: record.date_heure ?? new Date().toISOString(),
    dateFormatted: formatFrenchDate(record.date ?? "unknown"),
    timeFormatted: record.heure ?? "--:--",
    tauxCo2,
    consommationMw,
    productionTotalMw,
    decarbonePercent,
    renouvelablePercent,
    echangesPhysiquesMw: record.ech_physiques ?? 0,
    filières: {
      nucleaire,
      eolien,
      solaire,
      hydraulique,
      bioenergies,
      gaz,
      charbonFioul,
    },
  };
}

function formatFrenchDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const CACHE_KEY = "greenit-eco2mix-cache-v1";
const CACHE_TTL_MS = 10 * 60 * 1000;

function getCachedData(): Eco2MixData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as { timestamp: number; data: Eco2MixData };
    if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCachedData(data: Eco2MixData): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // sessionStorage unavailable
  }
}

export async function fetchEco2MixRealtime(forceRefresh = false): Promise<Eco2MixData> {
  if (!forceRefresh) {
    const cached = getCachedData();
    if (cached) {
      return cached;
    }
  }

  const URL =
    "https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/eco2mix-national-tr/records?where=taux_co2%20is%20not%20null&limit=1&order_by=date_heure%20desc";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(URL, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = (await response.json()) as { results?: Eco2MixRawRecord[] };
    const rawRecord = json.results?.[0];

    if (!rawRecord) {
      throw new Error("No records in response");
    }

    const parsed = parseEco2MixRecord(rawRecord);
    if (!parsed) {
      throw new Error("Invalid record data");
    }

    setCachedData(parsed);
    return parsed;
  } catch {
    const cached = getCachedData();
    if (cached) {
      return cached;
    }
    return ECO2MIX_FALLBACK;
  }
}

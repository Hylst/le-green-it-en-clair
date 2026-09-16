import {
  parseEco2MixRecord,
  ECO2MIX_FALLBACK,
} from "@/lib/eco2mix"
import { Eco2MixRawRecord } from "@/lib/eco2mix"

const VALID_RECORD: Eco2MixRawRecord = {
  date_heure: "2026-09-16T13:30:00+00:00",
  date: "2026-09-16",
  heure: "15:30",
  consommation: 49146,
  taux_co2: 10,
  nucleaire: 36695,
  eolien: 5039,
  solaire: 15034,
  hydraulique: 2728,
  bioenergies: 973,
  gaz: 164,
  fioul: 36,
  charbon: 0,
  ech_physiques: -10512,
}

const NULL_RECORD: Eco2MixRawRecord = {
  date_heure: "2026-09-17T21:45:00+00:00",
  date: "2026-09-17",
  heure: "23:45",
  consommation: null,
  taux_co2: null,
  nucleaire: null,
  eolien: null,
  solaire: null,
  hydraulique: null,
  bioenergies: null,
  gaz: null,
  fioul: null,
  charbon: null,
  ech_physiques: null,
}

describe("parseEco2MixRecord", () => {
  it("parsing d'un enregistrement valide", () => {
    const result = parseEco2MixRecord(VALID_RECORD)
    expect(result?.timestamp).toBe("2026-09-16T13:30:00+00:00")
    expect(result?.dateFormatted).toBe("16/09/2026")
    expect(result?.timeFormatted).toBe("15:30")
    expect(result?.tauxCo2).toBe(10)
    expect(result?.consommationMw).toBe(49146)
    expect(result?.isFallback).toBeUndefined()
  })

  it("calcule la production totale correctement", () => {
    const result = parseEco2MixRecord(VALID_RECORD)
    expect(result?.productionTotalMw).toBe(55669)
  })

  it("calcule la part décarbonée correctement", () => {
    const result = parseEco2MixRecord(VALID_RECORD)
    // nucleaire + eolien + solaire + hydraulique + bioenergies = 60469
    // productionTotal = 55669
    // 60469 / 55669 * 100 = 108.62...%
    expect(result?.decarbonePercent).toBeCloseTo(108.62, 1)
  })

  it("calcule la part renouvelable correctement", () => {
    const result = parseEco2MixRecord(VALID_RECORD)
    // eolien + solaire + hydraulique + bioenergies = 23774
    // 23774 / 55669 * 100 = 42.71...%
    expect(result?.renouvelablePercent).toBeCloseTo(42.71, 1)
  })

  it("gère les échanges physiques correctement", () => {
    const result = parseEco2MixRecord(VALID_RECORD)
    expect(result?.echangesPhysiquesMw).toBe(-10512)
  })

  it("structure les filières correctement", () => {
    const result = parseEco2MixRecord(VALID_RECORD)
    expect(result?.filières).toEqual({
      nucleaire: 36695,
      eolien: 5039,
      solaire: 15034,
      hydraulique: 2728,
      bioenergies: 973,
      gaz: 164,
      charbonFioul: 36,
    })
  })

  it("retourne le fallback pour un enregistrement avec taux_co2 null", () => {
    const result = parseEco2MixRecord(NULL_RECORD)
    expect(result?.tauxCo2).toBe(ECO2MIX_FALLBACK.tauxCo2)
    expect(result?.consommationMw).toBe(ECO2MIX_FALLBACK.consommationMw)
    expect(result?.isFallback).toBe(true)
  })
})

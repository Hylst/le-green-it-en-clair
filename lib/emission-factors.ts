// Facteurs d'émission et repères de calcul utilisés par les outils du site.
//
// Chaque entrée cite sa source et son millésime dans son commentaire.
// Révision prévue : 06/2027 (voir todo.md).
//
// Frontière assumée : seules les valeurs sourcées externes sont ici. Les
// hypothèses propres au site (durées de référence du bilan perso, −30 %
// d'économie possible, presets, conseils) restent dans chaque outil,
// documentées comme telles dans leurs commentaires.

// --- Repère commun : équivalence voiture (ADEME, Base Empreinte, 2023) ---
// Utilisé par le bilan perso, le calculateur site web, le streaming, l'audit
// de parc et le simulateur de sobriété : un seul endroit à mettre à jour.
export const KG_CO2E_PAR_KM_VOITURE = 0.17 // kgCO₂e/km, voiture thermique moyenne France

// --- Calculateur site web : modèle Sustainable Web Design v4 (2024,
// Wholegrain Digital / Green Web Foundation). Périmètre : émissions
// opérationnelles (datacenters + réseaux + terminal), hors fabrication.
export const SWD_KWH_PAR_GO = 0.194 // kWh/Go transféré (AIE)
export const SWD_GCO2E_PAR_KWH = 494 // gCO₂e/kWh, mix mondial (Ember, 2023)
export const SWD_FACTEUR_VERT = 0.243 // Green Web Foundation : −24,3 % si hébergeur vert vérifié
// Multiplicateur vert affiché (1 − 0,243 = 0,757), calculé pour rester cohérent.
export const SWD_MULTIPLICATEUR_VERT = 1 - SWD_FACTEUR_VERT
// Équivalences affichées (ADEME) : mêmes repères que les autres outils.
export const KG_CO2E_PAR_ARBRE_AN = 20 // kgCO₂e absorbés par arbre et par an
export const KG_CO2E_PAR_REPAS_BOEUF = 7 // kgCO₂e par repas avec bœuf

// --- Estimateur streaming & visio ---
// Débits plateformes (Netflix, centre d'aide, consulté 09/2026), en Go/heure.
// Les libellés sont le texte de l'interface, conservé tel quel.
export const STREAMING_DEBITS = {
  sd: { label: "Standard (480p)", goHeure: 1 },
  hd: { label: "HD (720p-1080p)", goHeure: 3 },
  uhd: { label: "Ultra HD (4K)", goHeure: 7 },
} as const
export type StreamingQualite = keyof typeof STREAMING_DEBITS
// Énergie du réseau par Go transféré (Arcep, enquête 2026 sur données 2024), en kWh/Go.
export const RESEAU_KWH_PAR_GO = { wifi: 0.02, mobile: 0.14 } as const
export type StreamingReseau = keyof typeof RESEAU_KWH_PAR_GO
export const VISIO_GO_PAR_HEURE = 1 // CableLabs, 2021 : ~1 Go/h en visioconférence
export const MIX_FR_KG_CO2E_PAR_KWH = 0.0519 // Base Empreinte, 2024 (mix moyen France)
// Périmètre optionnel « terminaux » : que des chiffres déjà cités sur le site.
export const TV_KWH_AN_REFERENCE = 155 // ADEME, Panel Elecdom, 2025 : ~155 kWh/an pour 6 h quotidiennes
export const TV_KWH_PAR_HEURE = TV_KWH_AN_REFERENCE / (6 * 365) // ≈ 0,071 kWh par heure de visionnage
export const BOX_WATTS = 9.1 // Arcep, enquête 2026 : 9,1 W en continu, ~90 % invariable
export const BOX_KWH_AN = 80 // ≈ 80 kWh/an (valeur arrondie affichée par l'outil)
export const DECODEUR_WATTS = 7.4 // Arcep, enquête 2026 : 7,4 W en moyenne
export const DECODEUR_KWH_AN = (DECODEUR_WATTS * 24 * 365) / 1000 // ≈ 64,8 kWh/an en continu
export const BOX_FABRICATION_KG_CO2E = 61 // ADEME, Impact CO₂, 2025 (même repère que nos cas pratiques)

// --- Bilan perso : empreinte fabrication + usage annuel (kgCO₂e),
// ADEME, Impact CO₂, mise à jour 2025 (sauf mention contraire).
export const EQUIPEMENTS_KG_CO2E = {
  smartphone: { fabrication: 79, usage: 0.4 },
  laptop: { fabrication: 182, usage: 2.1 },
  tablet: { fabrication: 84, usage: 1.1 },
  desktop: { fabrication: 262, usage: 6.4 },
  tv: { fabrication: 328, usage: 5.2 },
} as const
export type EquipementBilan = keyof typeof EQUIPEMENTS_KG_CO2E
// Impact cloud et services (kgCO₂e/an) : mêmes valeurs et sources que l'outil.
export const EMAIL_KG_CO2E_PAR_MESSAGE_AN = 0.004 // ~4 g CO₂e par e-mail (ADEME), × 365 jours dans l'outil
export const STREAMING_SD_KG_CO2E_PAR_HEURE_SEMAINE = 1.6 // ~31 g/h en SD × 52 semaines (ADEME/Shift)
export const CLOUD_KG_CO2E_PAR_GO_AN = 0.00024 // ≈ 0,24 g CO₂e/Go/an (ADEME Impact CO₂ / Base Empreinte)
export const RESEAUX_SOCIAUX_KG_CO2E_PAR_HEURE_JOUR = 2.55 // ~7 g/h hors vidéo (ADEME), × 365 jours dans l'outil
// Valeur historique du site (millésime/source à vérifier, voir todo.md) :
// conservée telle quelle, jamais remplacée par une autre valeur non sourcée.
export const AVION_PARIS_MARSEILLE_AR_KG_CO2E = 167
// Repère : empreinte numérique mondiale annuelle par internaute
// (1,8 Gt CO₂e ÷ ~5,35 Md, GreenIT, étude EENM 2025).
export const EMPREINTE_NUMERIQUE_MONDIALE_KG_PAR_INTERNAUTE = 330

// Nombre formaté à la française pour les textes qui citent un facteur
// (ex. 0.0519 → « 0,0519 »), afin que l'affichage suive la constante.
export function facteurFr(n: number, decimales = 4): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: decimales })
}

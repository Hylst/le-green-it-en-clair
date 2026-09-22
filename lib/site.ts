// Identité du site en un seul endroit.
// Changer de domaine, d'e-mail ou de signature : une seule ligne ici.
// Ne pas dupliquer ces valeurs en littéral dans les pages (canonicals,
// mailto, mentions, signatures de documents) : utiliser ces constantes.
export const SITE_DOMAIN = "https://hylst.fr"
export const SITE_BASE_PATH = "/greenit"
export const SITE_URL = `${SITE_DOMAIN}${SITE_BASE_PATH}`
// Forme courte sans protocole, pour le texte visible (« hylst.fr/greenit »).
export const SITE_SHORT = "hylst.fr/greenit"
export const SITE_NAME = "Le Green IT en clair"
export const SITE_AUTHOR = "Geoffroy Streit"
export const SITE_EMAIL = "geoffroy.streit@gmail.com"

export function canonical(path: string): string {
  return `${SITE_URL}${path}`
}

export function mailto(subject?: string): string {
  return subject ? `mailto:${SITE_EMAIL}?subject=${subject}` : `mailto:${SITE_EMAIL}`
}

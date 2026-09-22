#!/usr/bin/env node
// Cohérence de la structure du site (lecture seule, ne modifie rien).
// Usage : node scripts/check-structure.js (ou npm run check:structure)
// Vérifie lib/site-structure.ts contre les pages réelles (app/) et les
// données (slugs blog, fiches). Erreurs -> exit 1, avertissements -> exit 0.
// Avertissement connu : 8 fiches sans label (voir todo.md), à trancher.
const fs = require("fs")
const path = require("path")

const ROOT = path.join(__dirname, "..")
const APP = path.join(ROOT, "app")
const STRUCTURE = path.join(ROOT, "lib", "site-structure.ts")

// Pages volontairement hors sitemap (noindex) : absentes de SITE_ROUTES sans erreur.
const HORS_SITEMAP = ["/offline"]
// Labels volontairement sans route (page noindex ci-dessus) : sans avertissement.
const LABELS_SANS_ROUTE = ["offline"]

function read(file) {
  return fs.readFileSync(file, "utf8")
}

// --- Parse lib/site-structure.ts (regex sur la source, comme check-typo) ---
const src = read(STRUCTURE)
const routesBlock = src.match(/SITE_ROUTES: string\[\] = \[([\s\S]*?)\n\]/)
if (!routesBlock) {
  console.log("check:structure : bloc SITE_ROUTES introuvable.")
  process.exit(1)
}
// Une route par ligne (évite les apostrophes des commentaires).
const routes = [...routesBlock[1].matchAll(/^\s*'([^']*)',?\s*$/gm)].map((m) => m[1])
const labelsBlock = src.match(/SEGMENT_LABELS: Record<string, string> = \{([\s\S]*?)\n\}/)
if (!labelsBlock) {
  console.log("check:structure : bloc SEGMENT_LABELS introuvable.")
  process.exit(1)
}
// Une clé par ligne (évite les deux-points des valeurs).
const labelKeys = [...labelsBlock[1].matchAll(/^\s*(?:"([^"]+)"|([A-Za-z][A-Za-z-]*))\s*:/gm)].map(
  (m) => m[1] || m[2]
)

// --- Données dynamiques : slugs blog + ids fiches ---
const blogSrc = read(path.join(APP, "blog", "posts.ts"))
const blogSlugs = [...blogSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])
const fichesSrc = read(path.join(APP, "fiches-pratiques", "[id]", "page.tsx"))
const ficheIds = [...fichesSrc.matchAll(/^  "([a-z0-9-]+)": \{$/gm)].map((m) => m[1])

// --- Pages statiques : dossiers avec page.tsx (hors segments dynamiques) ---
function pagesStatiques(dir, base) {
  let pages = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("[") || entry.name.startsWith("(")) continue
    const full = path.join(dir, entry.name)
    const route = `${base}/${entry.name}`
    if (fs.existsSync(path.join(full, "page.tsx"))) pages.push(route)
    pages = pages.concat(pagesStatiques(full, route))
  }
  return pages
}
const statiques = fs.existsSync(path.join(APP, "page.tsx")) ? [""] : []
const pages = statiques.concat(pagesStatiques(APP, ""))

const errors = []
const warnings = []
const routeSet = new Set(routes)

// 1. Doublons dans SITE_ROUTES
for (const route of routeSet) {
  if (routes.filter((r) => r === route).length > 1) errors.push(`route en double : "${route || "(accueil)"}"`)
}

// 2. Chaque route -> page ou donnée existante
function routeExiste(route) {
  if (route === "") return true // accueil vérifié ci-dessus
  const parts = route.split("/").filter(Boolean)
  if (parts[0] === "blog" && parts.length === 2) return blogSlugs.includes(parts[1])
  if (parts[0] === "fiches-pratiques" && parts.length === 2) return ficheIds.includes(parts[1])
  return fs.existsSync(path.join(APP, ...parts, "page.tsx"))
}
for (const route of routes) {
  if (!routeExiste(route)) errors.push(`route sans page : "${route}"`)
}

// 3. Chaque page statique -> route (sauf noindex voulues)
for (const page of pages) {
  if (!routeSet.has(page) && !HORS_SITEMAP.includes(page)) {
    errors.push(`page sans route : "${page || "(accueil)"}"`)
  }
}

// 4. Chaque slug blog / id fiche -> route (sauf noindex, aucune aujourd'hui)
for (const slug of blogSlugs) {
  if (!routeSet.has(`/blog/${slug}`)) errors.push(`article sans route : "/blog/${slug}"`)
}
for (const id of ficheIds) {
  if (!routeSet.has(`/fiches-pratiques/${id}`)) errors.push(`fiche sans route : "/fiches-pratiques/${id}"`)
}

// 5. Chaque segment de route -> label (avertissement : ne bloque pas)
const segments = new Set()
for (const route of routes) {
  for (const part of route.split("/").filter(Boolean)) segments.add(part)
}
for (const segment of [...segments].sort()) {
  if (!labelKeys.includes(segment)) warnings.push(`segment sans label (repli brut) : "${segment}"`)
}

// 6. Chaque label -> segment utilisé (avertissement, sauf noindex voulues)
for (const key of labelKeys) {
  if (!segments.has(key) && !LABELS_SANS_ROUTE.includes(key)) {
    warnings.push(`label orphelin (aucune route) : "${key}"`)
  }
}

// --- Rapport (même forme que check-typo) ---
console.log(
  `check:structure : ${routes.length} routes, ${labelKeys.length} labels, ${blogSlugs.length} articles, ${ficheIds.length} fiches, ${errors.length} erreur(s), ${warnings.length} avertissement(s).`
)
if (errors.length > 0) {
  console.log("\n# Erreurs :")
  for (const e of errors) console.log(`  ${e}`)
}
if (warnings.length > 0) {
  console.log("\n# Avertissements :")
  for (const w of warnings) console.log(`  ${w}`)
}
process.exit(errors.length > 0 ? 1 : 0)

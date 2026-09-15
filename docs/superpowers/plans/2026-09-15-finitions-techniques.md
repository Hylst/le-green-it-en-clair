# Finitions techniques (hygiène, a11y, perf, SEO) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réduire les vulnérabilités npm, respecter `prefers-reduced-motion`, passer axe-core (0 critique/sérieuse) et Lighthouse perf ≥90 sur les pages clés, et enrichir le SEO (JSON-LD + OpenGraph par page).

**Architecture:** Site statique Next 16 (`output: export`, `basePath: /greenit`), sans framework de test : la vérification se fait par `tsc --noEmit`, `npm run build`, scripts Node sur `out/` et navigateurs réels (playwright). Chaque chantier est un commit indépendant.

**Tech Stack:** Next 16, React 19, Tailwind v4, TypeScript strict (0 erreur exigée), playwright/axe-core/lighthouse installés en `--no-save` (jamais dans `package.json`).

## Global Constraints

- **Aucune nouvelle dépendance runtime** ; les outils d'audit sont en `npm i --no-save --legacy-peer-deps` uniquement.
- **Fin de chaque tâche :** `npx tsc --noEmit` → 0 erreur, puis `npm run build` → succès. Tester sous `/greenit/`, pas `/`.
- **Convention sous-agents :** les sous-agents dispatchés restent en **lecture seule** (règle du projet) ; l'implémentation est faite en inline par l'agent principal.
- **Commits :** petits, en français, style existant (`hygiene : …`, `a11y : …`, `perf : …`, `seo : …`). Jamais `out/`, `node_modules/`, `.next/`. Pas de secrets.
- **Barre validée :** axe-core 0 critique / 0 sérieuse ; Lighthouse perf ≥90 sur `/`, `/outils`, `/comprendre`, `/chiffres` (preset desktop) ; Firefox + WebKit 0 nouvelle erreur.
- **Ne jamais modifier** un chiffre affiché sans source (règle AGENTS.md) ; les corrections SEO n'inventent aucune donnée (pas de dates, pas de note d'avis).
- **Serveur local :** `node C:/Users/Geoffroy/AppData/Local/Temp/opencode/greenit-server.js "<abs>/out" 3006` (sert le contenu de `out/` en strippant `/greenit`). Arrêt : `netstat -ano | grep ":3006"` puis `taskkill //PID <pid> //F`.
- **Outils no-save :** `npm i --no-save --legacy-peer-deps playwright@1.62.0 @axe-core/playwright lighthouse` (une seule commande ; tout `npm install` ultérieur peut les élaguer → relancer la commande avant usage).
- **NODE_PATH pour scripts temp :** `NODE_PATH="D:\0CODE\AntiGravity\GreenIT\node_modules" node <script>` lancé depuis la racine du repo.
- **Docs de suivi à mettre à jour en fin de chantier :** `changelog.md`, `todo.md`, `suivi-audit-2026-09.md`.
- **Hors périmètre :** Quiz v2 (spec séparée), tests NVDA (checklist documentée seulement), `robots.txt` racine (hors dépôt).

---

### Task 1: Hygiène — dépendances (audit fix + sharp)

**Files:**
- Modify: `package.json`, `package-lock.json`

**Interfaces:**
- Consumes: rien.
- Produces: arbre npm assaini ; `sharp` ≥0.35.4 ; base pour les tâches suivantes.

- [ ] **Step 1: Baseline audit**

```bash
npm audit > "C:/Users/Geoffroy/AppData/Local/Temp/opencode/audit-before.txt" 2>&1; tail -2 "C:/Users/Geoffroy/AppData/Local/Temp/opencode/audit-before.txt"
```
Attendu : « 13 vulnerabilities (3 moderate, 8 high, 2 critical) ».

- [ ] **Step 2: Fix non-breaking**

```bash
npm audit fix
```
Attendu : se termine sans erreur ; `package-lock.json` modifié.

- [ ] **Step 3: Build de contrôle**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
```
Attendu : tsc silencieux, build OK.

- [ ] **Step 4: Bump sharp**

```bash
npm install sharp@^0.35.4
```
Si ERESOLVE : ajouter `--legacy-peer-deps`. Attendu : `package.json` → `"sharp": "^0.35.4"`.

- [ ] **Step 5: Smoke test sharp**

Écrire `C:/Users/Geoffroy/AppData/Local/Temp/opencode/sharp-check.js` :
```js
const sharp = require("sharp")
sharp({ create: { width: 8, height: 8, channels: 4, background: "#00ff00" } })
  .webp()
  .toBuffer()
  .then((b) => console.log("sharp ok:", b.length, "octets"))
  .catch((e) => { console.error("sharp KO:", e.message); process.exit(1) })
```
Lancer : `NODE_PATH="D:\0CODE\AntiGravity\GreenIT\node_modules" node C:/Users/Geoffroy/AppData/Local/Temp/opencode/sharp-check.js`
Attendu : `sharp ok: <n> octets`.

- [ ] **Step 6: Build + audit final**

```bash
npm run build 2>&1 | tail -3; npm audit 2>&1 | tail -2
```
Attendu : build OK ; reste à consigner (les vulns `browserslist`/`brace-expansion` doivent avoir disparu ; toute vuln restante non corrigeable est notée pour Task 2).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json
git commit -m "hygiene : audit npm et sharp a jour"
```

---

### Task 2: Hygiène — scan secrets, vérif live, docs

**Files:**
- Modify: `suivi-audit-2026-09.md`

**Interfaces:**
- Consumes: Task 1.
- Produces: constats live consignés ; feu vert sécurité pour les pushes suivants.

- [ ] **Step 1: Scan secrets + dépendances**

Invoquer le skill **security-scanner** et suivre sa procédure (diff git + `npm audit`).
Attendu : aucun secret. Toute trouvaille bloque le push et se corrige ici.

- [ ] **Step 2: Vérif robots.txt racine (lecture seule)**

```bash
curl -s https://hylst.fr/robots.txt
```
Attendu : noter si `Disallow: /greenit` présent (blocage = à corriger côté hébergement, pas dans ce dépôt) et si un `Sitemap:` est déclaré.

- [ ] **Step 3: Vérif live du site**

```bash
curl -s -o /dev/null -w "home:%{http_code}\n" https://hylst.fr/greenit/
curl -s https://hylst.fr/greenit/sw.js | grep -o "greenit-v[0-9.]*" | head -1
curl -s -o /dev/null -w "404:%{http_code}\n" https://hylst.fr/greenit/url-qui-nexiste-pas/
```
Attendu : home 200 ; SW ≥ `greenit-v1.3.0` ; 404 → 404 (pas 200).

- [ ] **Step 4: Consigner dans le suivi**

Ajouter dans `suivi-audit-2026-09.md` une entrée « 2026-09-15 : vérif live » avec : verdict robots racine, version SW servie, code du 404, vulns npm restantes après fix et bump sharp.

- [ ] **Step 5: Commit**

```bash
git add suivi-audit-2026-09.md
git commit -m "docs : hygiène et constats live"
```

---

### Task 3: A11y — prefers-reduced-motion

**Files:**
- Modify: `app/globals.css` (fin de fichier)
- Create: `hooks/use-reduced-motion.ts`
- Modify: `components/animated-lifecycle-svg.tsx`
- Modify: `components/growth-animation.tsx`

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean` (utilisé par Task 3 seulement, exporté pour usage futur).

- [ ] **Step 1: Filet CSS global**

Ajouter à la fin de `app/globals.css` :
```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Hook**

Créer `hooks/use-reduced-motion.ts` :
```ts
import * as React from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(QUERY)
    setPrefersReduced(mql.matches)
    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return prefersReduced
}
```

- [ ] **Step 3: Lifecycle — couper minuteur et particule**

Dans `components/animated-lifecycle-svg.tsx` :
1. Ajouter l'import : `import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"`
2. Dans le composant, avant `useState` : `const prefersReduced = usePrefersReducedMotion()`
3. Remplacer l'effet :
```tsx
  useEffect(() => {
    if (prefersReduced) return
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [prefersReduced])
```
4. Encadrer la particule SMIL (le CSS ne peut pas l'arrêter) :
```tsx
        {!prefersReduced && (
          <circle r="8" fill="#10b981" filter="url(#glow)">
            <animateMotion dur="15s" repeatCount="indefinite">
              <mpath href="#circlePath" />
            </animateMotion>
          </circle>
        )}
```

- [ ] **Step 4: Growth — état final immédiat**

Dans `components/growth-animation.tsx` :
1. Ajouter l'import et le hook, puis remplacer l'effet par :
```tsx
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setYear(2026)
      setPlaying(false)
      return
    }
    if (!playing) return

    const interval = setInterval(() => {
      setYear((prev) => {
        if (prev >= 2026) {
          setPlaying(false)
          return 2026
        }
        return prev + 1
      })
    }, 400)

    return () => clearInterval(interval)
  }, [playing, prefersReduced])
```

- [ ] **Step 5: tsc + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
```
Attendu : 0 erreur, build OK.

- [ ] **Step 6: Test navigateur (émulation reduced-motion)**

Installer si besoin : `npm i --no-save --legacy-peer-deps playwright@1.62.0 @axe-core/playwright lighthouse`
Démarrer le serveur (voir Global Constraints), puis créer `C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-motion.js` :
```js
const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ reducedMotion: "reduce" })
  const page = await ctx.newPage()

  await page.goto("http://localhost:3006/greenit/comprendre/", { waitUntil: "networkidle" })
  const particles = await page.locator('svg circle[r="8"]').count()
  console.log("particules lifecycle (attendu 0):", particles)

  await page.goto("http://localhost:3006/greenit/chiffres/", { waitUntil: "networkidle" })
  await page.waitForTimeout(1500)
  const texts = await page.$$eval("svg text", (els) => els.map((e) => e.textContent))
  const hasFinal = texts.some((t) => (t || "").includes("75.4"))
  const hasStart = texts.some((t) => (t || "").includes("33.8"))
  console.log("growth 2026 (attendu true):", hasFinal, "| 2010 (attendu false):", hasStart)

  await browser.close()
  process.exit(particles === 0 && hasFinal && !hasStart ? 0 : 1)
})()
```
Lancer : `NODE_PATH="D:\0CODE\AntiGravity\GreenIT\node_modules" node C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-motion.js`
Attendu : exit 0, `particules 0`, `75.4` présent, `33.8` absent.
(Note : si playwright se plaint d'un binaire manquant, `npx playwright install chromium` puis relancer.)

- [ ] **Step 7: Commit**

```bash
git add app/globals.css hooks/use-reduced-motion.ts components/animated-lifecycle-svg.tsx components/growth-animation.tsx
git commit -m "a11y : respecter prefers-reduced-motion"
```

---

### Task 4: A11y — audit axe-core + corrections des h1 dupliqués

**Files:**
- Modify: 7 fichiers selon résultats : `app/modeles/cahier-charges-achat/page.tsx`, `app/modeles/charte-green-it/page.tsx`, `app/modeles/grille-audit/page.tsx`, `app/modeles/guide-sensibilisation/page.tsx`, `app/modeles/plan-action-dsi/page.tsx`, `app/modeles/politique-numerique/page.tsx`, `app/modeles/tableau-bord-impact/page.tsx`
- Modify: fichiers supplémentaires si axe remonte d'autres violations critiques/sérieuses

**Interfaces:**
- Consumes: serveur local + outils no-save (Global Constraints).
- Produces: base propre pour Task 5.

- [ ] **Step 1: Script axe**

Créer `C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-axe.js` :
```js
const { chromium } = require("playwright")
const { AxeBuilder } = require("@axe-core/playwright")

const BASE = "http://localhost:3006/greenit"
const paths = [
  "/",
  "/comprendre/",
  "/chiffres/",
  "/outils/",
  "/par-ou-commencer/",
  "/fiches-pratiques/gestes-quotidiens/",
  "/modeles/grille-audit/",
  "/guide/",
  "/faq/",
  "/recyclage/",
]

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  let critical = 0
  let serious = 0
  for (const p of paths) {
    await page.goto(BASE + p, { waitUntil: "networkidle" })
    if (p === "/outils/") {
      const quizTab = page.getByRole("tab", { name: /quiz/i }).first()
      if (await quizTab.count()) await quizTab.click()
      await page.waitForTimeout(500)
    }
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()
    const bad = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious")
    critical += bad.filter((v) => v.impact === "critical").length
    serious += bad.filter((v) => v.impact === "serious").length
    console.log(p, "| violations:", results.violations.length, "| critiques:", bad.filter((v) => v.impact === "critical").length, "| sérieuses:", bad.filter((v) => v.impact === "serious").length)
    for (const v of results.violations) {
      console.log("   -", v.impact, v.id, "|", v.help, "|", v.nodes.length, "nœud(s)")
      for (const n of v.nodes.slice(0, 2)) console.log("       ", n.target.join(" "))
    }
  }
  console.log("TOTAL critiques:", critical, "| sérieuses:", serious)
  await browser.close()
  process.exit(critical + serious > 0 ? 1 : 0)
})()
```
Lancer : `NODE_PATH="D:\0CODE\AntiGravity\GreenIT\node_modules" node C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-axe.js`
Attendu (baseline) : exit 1 avec la liste des violations. Consigner la sortie.

- [ ] **Step 2: Corriger les h1 dupliqués des 7 modèles**

Cause connue : chaque page modèle a `<h1 className="text-3xl font-bold text-white mb-2">…</h1>` dans la bannière ET un `<h1>` principal.
Écrire `C:/Users/Geoffroy/AppData/Local/Temp/opencode/fix-h1.js` :
```js
const fs = require("fs")
const files = [
  "app/modeles/cahier-charges-achat/page.tsx",
  "app/modeles/charte-green-it/page.tsx",
  "app/modeles/grille-audit/page.tsx",
  "app/modeles/guide-sensibilisation/page.tsx",
  "app/modeles/plan-action-dsi/page.tsx",
  "app/modeles/politique-numerique/page.tsx",
  "app/modeles/tableau-bord-impact/page.tsx",
]
for (const f of files) {
  const src = fs.readFileSync(f, "utf8")
  const next = src.replace(
    /<h1 className="text-3xl font-bold text-white mb-2">([\s\S]*?)<\/h1>/,
    (_, inner) => `<p className={"text-3xl font-bold text-white mb-2"}>${inner}</p>`
  )
  if (next === src) { console.log("AUCUN CHANGEMENT:", f); continue }
  fs.writeFileSync(f, next)
  console.log("ok:", f)
}
```
Hmm — remplacer par `<p className={...}>` est inutilement bizarre : écrire directement `<p className="text-3xl font-bold text-white mb-2">…</p>`. En JS de remplacement, utiliser une chaîne simple :
```js
    (_, inner) => '<p className="text-3xl font-bold text-white mb-2">' + inner + "</p>"
```
Lancer le script, vérifier chaque diff (`git diff`), puis :
```bash
npx tsc --noEmit && npm run build
NODE_PATH="D:\0CODE\AntiGravity\GreenIT\node_modules" node C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-axe.js
```
Attendu : tsc 0 ; build OK ; axe ne remonte plus `page-has-heading-one` sur les 7 modèles.

- [ ] **Step 3: Corriger les autres violations critiques/sérieuses**

Pour chaque violation restante listée par axe : identifier le fichier source (via le sélecteur), appliquer la correction minimale (aria, label, rôle, contraste). Relancer le script après chaque lot.
Attendu : `TOTAL critiques: 0 | sérieuses: 0`, exit 0.

- [ ] **Step 4: Modérées/mineures**

Relire la liste complète : corriger les triviales, consigner les autres dans la sortie de fin (pas de blocage).

- [ ] **Step 5: Commit**

```bash
git add app/modeles components
git commit -m "a11y : corrections issues de l'audit axe"
```

---

### Task 5: A11y — contrôles manuels (h1, focus, skip link) + navigateurs

**Files:**
- Modify: fichiers concernés si un contrôle échoue
- Test scripts: temporaires (pas de commit)

**Interfaces:**
- Consumes: Tasks 3-4.
- Produces: preuve de conformité pour la vérification finale.

- [ ] **Step 1: Un seul h1 par page**

Réutiliser/écrire `C:/Users/Geoffroy/AppData/Local/Temp/opencode/h1-scan.js` :
```js
const fs = require("fs"), path = require("path")
function walk(d, acc) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (e.name === "index.html") acc.push(p)
  }
  return acc
}
let bad = 0
for (const f of walk("out", [])) {
  const h = fs.readFileSync(f, "utf8")
  const n = (h.match(/<h1[\s>]/g) || []).length
  if (n !== 1) { bad++; console.log(f, "-> h1 =", n) }
}
console.log("pages hors norme:", bad)
process.exit(bad ? 1 : 0)
```
Lancer : `node C:/Users/Geoffroy/AppData/Local/Temp/opencode/h1-scan.js`
Attendu : `pages hors norme: 0` (si un cas légitime à 0 h1 apparaît, le corriger ou le documenter explicitement).

- [ ] **Step 2: Skip link + focus**

Créer `C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-focus.js` :
```js
const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto("http://localhost:3006/greenit/", { waitUntil: "networkidle" })

  await page.keyboard.press("Tab")
  const first = await page.evaluate(() => ({
    text: document.activeElement?.textContent?.trim() || "",
    visible: !!document.activeElement && document.activeElement.getBoundingClientRect().height > 0,
  }))
  console.log("premier Tab:", JSON.stringify(first))

  await page.goto("http://localhost:3006/greenit/outils/", { waitUntil: "networkidle" })
  let focusables = 0
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab")
    const ok = await page.evaluate(() => {
      const el = document.activeElement
      if (!el) return false
      const s = getComputedStyle(el)
      return s.outlineStyle !== "none" || s.boxShadow !== "none"
    })
    if (ok) focusables++
  }
  console.log("éléments focusables avec indicateur visible:", focusables, "/ 8")

  await browser.close()
  process.exit(first.visible && /contenu/i.test(first.text) && focusables >= 6 ? 0 : 1)
})()
```
Lancer avec NODE_PATH. Attendu : exit 0, premier Tab = « Aller au contenu », ≥6 indicateurs visibles sur 8.
Si échec : chercher le style focus manquant (souvent `focus:outline-none` sans `focus-visible`) et corriger au fichier.

- [ ] **Step 3: Escape ferme recherche et menus**

Étendre `a11y-focus.js` (ou script séparé du même modèle) :
```js
  await page.goto("http://localhost:3006/greenit/", { waitUntil: "networkidle" })
  await page.keyboard.press("Control+k")
  await page.waitForTimeout(300)
  const opened = await page.locator('[role="dialog"]').count()
  await page.keyboard.press("Escape")
  await page.waitForTimeout(300)
  const closed = await page.locator('[role="dialog"]').count()
  console.log("recherche: ouverte", opened, "| après Escape", closed)
```
Attendu : ouverte ≥1, après Escape 0.

- [ ] **Step 4: Run navigateurs Firefox + WebKit**

Créer `C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-browsers.js` :
```js
const { firefox, webkit } = require("playwright")

const BASE = "http://localhost:3006/greenit"
const paths = ["/", "/comprendre/", "/chiffres/", "/outils/", "/par-ou-commencer/", "/fiches-pratiques/gestes-quotidiens/", "/modeles/grille-audit/", "/recyclage/"]
const IGNORE = ["_rsc", "__PAGE__", "favicon"]

;(async () => {
  let failures = 0
  for (const engine of [["firefox", firefox], ["webkit", webkit]]) {
    const [name, browserType] = engine
    const browser = await browserType.launch()
    const page = await browser.newPage()
    const errors = []
    page.on("console", (msg) => {
      if (msg.type() !== "error") return
      const text = msg.text()
      if (IGNORE.some((token) => text.includes(token))) return
      errors.push(`[${name}] ${text}`)
    })
    page.on("pageerror", (err) => errors.push(`[${name}] pageerror: ${err.message}`))
    for (const p of paths) {
      await page.goto(BASE + p, { waitUntil: "networkidle" })
    }
    console.log(name, "| erreurs:", errors.length)
    for (const e of errors) console.log("   ", e)
    failures += errors.length
    await browser.close()
  }
  process.exit(failures ? 1 : 0)
})()
```
Lancer avec NODE_PATH. Attendu : 0 erreur hors bruit `_rsc`.

- [ ] **Step 5: Commit (uniquement si des correctifs ont été nécessaires)**

```bash
git add <fichiers corrigés>
git commit -m "a11y : focus et titres verifies"
```
Sinon : rien à committer, passer à la suite.

---

### Task 6: Perf — baseline Lighthouse

**Files:**
- Aucune modification de code.

**Interfaces:**
- Consumes: serveur local + outils no-save.
- Produces: scores de référence (avant) pour Task 7-8.

- [ ] **Step 1: Résoudre le binaire Chrome**

```bash
node -e "const fs=require('fs');const d='C:/Users/Geoffroy/AppData/Local/ms-playwright';const dirs=fs.readdirSync(d).filter(x=>x.startsWith('chromium-')).sort();console.log(d+'/'+dirs[dirs.length-1]+'/chrome-win/chrome.exe')"
```
Noter le chemin (variable `CHROME_PATH`). Si vide : `npx playwright install chromium`.

- [ ] **Step 2: Mesurer les 4 pages**

```bash
CHROME="<chemin obtenu>"
for p in "home:/" "outils:/outils/" "comprendre:/comprendre/" "chiffres:/chiffres/"; do
  name="${p%%:*}"; path="${p#*:}"
  CHROME_PATH="$CHROME" npx lighthouse "http://localhost:3006/greenit$path" \
    --preset=desktop --only-categories=performance,accessibility,best-practices,seo \
    --output=json --output-path="C:/Users/Geoffroy/AppData/Local/Temp/opencode/lh-$name.json" \
    --chrome-flags="--headless=new --no-sandbox" --quiet
done
```
Attendu : 4 fichiers JSON créés.

- [ ] **Step 3: Extraire et consigner**

```bash
node -e "for(const f of ['home','outils','comprendre','chiffres']){const r=require('C:/Users/Geoffroy/AppData/Local/Temp/opencode/lh-'+f+'.json');console.log(f,Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)])))}"
```
Noter les scores (ils serviront de « avant »). Aucun commit.

---

### Task 7: Perf — import dynamique de jspdf

**Files:**
- Modify: `components/outils/enterprise-simulator.tsx` (imports + `exportPDF`)
- Modify: `components/outils/it-audit.tsx` (imports + `exportPDF`)

**Interfaces:**
- Consumes: baseline Task 6 (jspdf listé comme gros chunk si présent).
- Produces: `exportPDF` asynchrone, comportement identique côté utilisateur.

- [ ] **Step 1: enterprise-simulator**

Supprimer les lignes :
```tsx
import jsPDF from "jspdf";
import "jspdf-autotable";
```
Remplacer le début de `exportPDF` :
```tsx
  const exportPDF = async () => {
    const { default: jsPDF } = await import("jspdf")
    await import("jspdf-autotable")
    const doc = new jsPDF()
```
Le reste du corps (calculs, autoTable, `doc.save(...)`) est inchangé.

- [ ] **Step 2: it-audit**

Mêmes modifications :
```tsx
  const exportPDF = async () => {
    const { default: jsPDF } = await import("jspdf")
    await import("jspdf-autotable")
    const doc = new jsPDF()
```

- [ ] **Step 3: tsc + build + contrôle du bundle**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
```
Attendu : tsc 0 ; build OK. Vérifier que `jspdf` n'est plus dans le chunk principal de `/outils` :
```bash
grep -rl "jspdf" out/_next/static/chunks/app/outils 2>/dev/null | wc -l
```
Observation attendue : 0 ou chunk séparé (si 0, c'est encore mieux ; si présent, vérifier que c'est un chunk chargé à la demande).

- [ ] **Step 4: Test export PDF réel (navigateur)**

Créer `C:/Users/Geoffroy/AppData/Local/Temp/opencode/pdf-test.js` :
```js
const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto("http://localhost:3006/greenit/outils/", { waitUntil: "networkidle" })

  const enterpriseTab = page.getByRole("tab", { name: /entreprise/i }).first()
  if (await enterpriseTab.count()) await enterpriseTab.click()
  await page.waitForTimeout(500)

  const btn = page.getByRole("button", { name: /pdf/i }).first()
  if (!(await btn.count())) { console.log("bouton PDF introuvable"); await browser.close(); process.exit(1) }

  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 15000 }),
    btn.click(),
  ])
  console.log("téléchargement:", download.suggestedFilename())
  await browser.close()
  process.exit(0)
})()
```
Lancer avec NODE_PATH. Attendu : nom de fichier `.pdf` (aucune erreur console bloquante).
Si échec : vérifier que `pdf` est chargé dynamiquement sans casser `doc.autoTable` (le `// @ts-ignore` existant reste).

- [ ] **Step 5: Commit**

```bash
git add components/outils/enterprise-simulator.tsx components/outils/it-audit.tsx
git commit -m "perf : chargement dynamique de jspdf"
```

---

### Task 8: Perf — re-mesure et décision

**Files:**
- Modify: `suivi-audit-2026-09.md`

**Interfaces:**
- Consumes: Tasks 6-7.
- Produces: scores « après » ; décision sur les correctifs restants.

- [ ] **Step 1: Re-mesurer**

Reprendre Task 6 Steps 2-3 (mêmes commandes), comparer avec les scores avant.

- [ ] **Step 2: Seuil**

- Si les 4 pages sont ≥90 perf : passer au Step 4.
- Sinon : ouvrir le rapport JSON de la page fautive, identifier le poste dominant (TBT/LCP/images non chargées à la demande/animations). Note : `react-leaflet` est déjà importé dynamiquement dans `/chiffres` et `/recyclage` (vérifié), ne pas y revenir. Appliquer UN correctif ciblé à la fois (import dynamique d'un composant lourd, `loading` d'image, etc.), re-mesurer après chaque correctif, puis re-committer si code modifié.

- [ ] **Step 3: (Conditionnel) correctifs restants**

Tout correctif code suit le même cycle : tsc + build + test navigateur de non-régression + petit commit (`perf : ...`).

- [ ] **Step 4: Consigner**

Dans `suivi-audit-2026-09.md` : tableau avant/après (4 pages × 4 catégories Lighthouse + axe), décision et, le cas échéant, la piste non retenue et pourquoi.

- [ ] **Step 5: Commit**

```bash
git add suivi-audit-2026-09.md
git commit -m "docs : scores lighthouse avant/apres"
```

---

### Task 9: SEO — JSON-LD (WebSite/Organization, BreadcrumbList, FAQPage, TechArticle)

**Files:**
- Create: `lib/metadata.ts`
- Create: `components/json-ld.tsx`
- Modify: `components/breadcrumb.tsx`
- Modify: `app/page.tsx`
- Create: `app/faq/faq-data.ts`
- Modify: `app/faq/page.tsx`
- Modify: `components/sheet-content.tsx`

**Interfaces:**
- Produces: `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`, `pageOpenGraph(title, description, path)` (utilisé par Task 10) ; `<JsonLd data={...} />` (n'importe quel composant).

- [ ] **Step 1: Helper SEO**

Créer `lib/metadata.ts` :
```ts
export const SITE_URL = "https://hylst.fr/greenit"
export const SITE_NAME = "Le Green IT en clair"
export const SITE_DESCRIPTION =
  "Découvrez l'impact environnemental du numérique et adoptez des pratiques responsables. Informations, outils interactifs et ressources pour un Green IT en France."

export function pageOpenGraph(title: string, description: string, path: string) {
  return {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website" as const,
    images: [
      {
        url: `${SITE_URL}/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Le Green IT en clair - Écologie Numérique",
      },
    ],
  }
}
```

- [ ] **Step 2: Composant JSON-LD**

Créer `components/json-ld.tsx` :
```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
```

- [ ] **Step 3: BreadcrumbList sur toutes les pages internes**

Dans `components/breadcrumb.tsx`, après la définition de `breadcrumbMap` et avant le `return`, construire :
```tsx
  const items = [
    { name: "Accueil", item: `${SITE_URL}/` },
    ...segments.map((segment, index) => ({
      name: breadcrumbMap[segment] || segment.replace(/-/g, " "),
      item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}/`,
    })),
  ]
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
```
Ajouter l'import `import { SITE_URL } from "@/lib/metadata"`, porter le `return` existant en `return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> <nav …>…</nav> </> )` (le `<nav>` actuel passe dans le fragment, inchangé).
(Rappel : le composant est client mais prérendu au build → le script est présent dans chaque HTML exporté.)

- [ ] **Step 4: WebSite + Organization sur l'accueil**

Dans `app/page.tsx` : importer `{ JsonLd }` et `{ SITE_NAME, SITE_URL }`, définir au début du composant :
```tsx
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "fr" },
      { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/icon.svg` },
    ],
  }
```
Rendre `<JsonLd data={siteJsonLd} />` juste après le `<div className="min-h-screen">` d'ouverture.

- [ ] **Step 5: FAQPage**

1. Créer `app/faq/faq-data.ts` : déplacer **tel quel** le bloc `const faqCategories = [...]` (lignes 11 à 144 de `app/faq/page.tsx`) dans ce nouveau fichier, préfixé `export`.
2. Dans `app/faq/page.tsx` : supprimer le bloc déplacé, ajouter `import { faqCategories } from "./faq-data"`.
3. Ajouter l'import `JsonLd` et, dans le composant, avant le `return` :
```tsx
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.questions.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      }))
    ),
  }
```
4. Rendre `<JsonLd data={faqJsonLd} />` en tête du JSX retourné.

- [ ] **Step 6: TechArticle sur les fiches**

Dans `components/sheet-content.tsx` : importer `JsonLd` et `{ SITE_NAME, SITE_URL }`, puis au début du composant :
```tsx
    const jsonLd = sheet.id
        ? {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: sheet.title,
              description: sheet.subtitle,
              inLanguage: "fr",
              author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              mainEntityOfPage: `${SITE_URL}/fiches-pratiques/${sheet.id}`,
          }
        : null
```
Rendre `{jsonLd && <JsonLd data={jsonLd} />}` juste après le `<div className="min-h-screen …">` d'ouverture.

- [ ] **Step 7: tsc + build + vérification du JSON-LD**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
```
Écrire `C:/Users/Geoffroy/AppData/Local/Temp/opencode/jsonld-scan.js` :
```js
const fs = require("fs"), path = require("path")
const EXPECT = [
  ["/index.html", "WebSite"],
  ["/chiffres/index.html", "BreadcrumbList"],
  ["/faq/index.html", "FAQPage"],
  ["/fiches-pratiques/gestes-quotidiens/index.html", "TechArticle"],
  ["/modeles/grille-audit/index.html", "BreadcrumbList"],
]
let bad = 0
for (const [route, type] of EXPECT) {
  const f = path.join("out", route)
  if (!fs.existsSync(f)) { bad++; console.log("MANQUANT:", route); continue }
  const html = fs.readFileSync(f, "utf8")
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const parsed = blocks.map((b) => { try { return JSON.parse(b) } catch (e) { return null } })
  const invalid = parsed.filter((p) => p === null).length
  const types = parsed.flatMap((p) => p?.["@graph"] ? p["@graph"].map((g) => g["@type"]) : [p?.["@type"]])
  const ok = invalid === 0 && types.includes(type)
  console.log(route, "| blocs:", blocks.length, "| invalides:", invalid, "| type", type, ":", types.includes(type) ? "OK" : "ABSENT")
  if (!ok) bad++
}
process.exit(bad ? 1 : 0)
```
Lancer : `node C:/Users/Geoffroy/AppData/Local/Temp/opencode/jsonld-scan.js`
Attendu : exit 0, chaque page listée a son type, 0 bloc invalide.

- [ ] **Step 8: Commit**

```bash
git add lib/metadata.ts components/json-ld.tsx components/breadcrumb.tsx app/page.tsx app/faq/faq-data.ts app/faq/page.tsx components/sheet-content.tsx
git commit -m "seo : donnees structurees json-ld"
```

---

### Task 10: SEO — OpenGraph par page

**Files:**
- Modify: les 29 fichiers metadata de la liste ci-dessous
- Modify: `app/fiches-pratiques/[id]/page.tsx` (generateMetadata, cas dynamique)

**Interfaces:**
- Consumes: `pageOpenGraph` de Task 9.
- Produces: `og:url` = canonical et `og:title` propre sur chaque page exportée.

- [ ] **Step 1: Script d'injection**

Liste cible (canonical → description à injecter) :
```
/actualites | Veille et dossiers sur le numérique responsable : actualités, rapports et analyses pour suivre les évolutions du Green IT.
/agir | Passer à l'action : gestes concrets, outils et ressources pour réduire l'empreinte environnementale du numérique au quotidien.
/a-propos | À propos du Green IT en clair : la démarche, les sources et la méthode derrière ce site éducatif sur le numérique responsable.
/cas-pratiques | Cas pratiques d'entreprises et de collectivités : exemples concrets de stratégies Green IT et de leurs résultats.
/chiffres | Les chiffres clés de l'impact environnemental du numérique en France et dans le monde, sourcés et expliqués.
/comprendre | Comprendre le Green IT : cycle de vie des équipements, impacts du numérique et notions clés expliquées simplement.
/datacenters | Datacenters et cloud : consommation, impacts environnementaux et bonnes pratiques pour un numérique plus sobre.
/developpement | Écoconception web : bonnes pratiques et repères pour concevoir des sites et applications plus sobres.
/faq | Réponses aux questions fréquentes sur le Green IT, l'impact du numérique et les gestes pour agir.
/fiches-pratiques | Fiches pratiques Green IT : guides pas à pas pour agir au quotidien, en entreprise et en collectivité.
/guide | Le guide du numérique responsable : parcours complet des gestes et bonnes pratiques, du diagnostic à l'action.
/mentions-legales | Mentions légales du site Le Green IT en clair.
/modeles | Modèles téléchargeables prêts à l'emploi : charte, grille d'audit, plan d'action, tableau de bord et plus.
/modeles/cahier-charges-achat | Modèle de cahier des charges pour des achats numériques responsables, prêt à adapter à votre organisation.
/modeles/charte-green-it | Modèle de charte Green IT pour formaliser les engagements numériques responsables de votre organisation.
/modeles/grille-audit | Grille d'audit Green IT : 26 critères pour évaluer les pratiques numériques responsables de votre organisation.
/modeles/guide-sensibilisation | Modèle de guide de sensibilisation pour mobiliser vos équipes autour du numérique responsable.
/modeles/plan-action-dsi | Modèle de plan d'action DSI pour structurer une démarche Green IT sur plusieurs années.
/modeles/politique-numerique | Modèle de politique numérique responsable à adapter et faire valider dans votre organisation.
/modeles/tableau-bord-impact | Modèle de tableau de bord pour suivre l'impact et la consommation du numérique de votre organisation.
/mythes | Mythes et réalités du Green IT : ce qui est vrai, faux ou nuancé sur l'impact du numérique.
/outils | Outils interactifs : calculateur d'empreinte, simulateur de sobriété, audit Green IT, comparateur cloud et quiz.
/par-ou-commencer | Par où commencer : un parcours guidé pour découvrir le Green IT selon votre profil.
/perspectives | Perspectives : tendances, innovations et scénarios d'évolution du numérique responsable.
/problematiques | Les problématiques du numérique : épuisement des ressources, émissions de gaz à effet de serre et déchets électroniques.
/recyclage | Recyclage et reconditionné : filières, gestes et points de collecte pour donner une seconde vie aux appareils.
/reglementation | Réglementation du numérique : lois, directives et obligations pour les organisations et les citoyens.
/ressources | Ressources et liens utiles pour approfondir le Green IT : rapports, outils, formations et lectures.
/sitemap-page | Plan du site : toutes les pages du Green IT en clair, classées par thème.
```

Créer `C:/Users/Geoffroy/AppData/Local/Temp/opencode/og-inject.js` :
```js
const fs = require("fs")

const DESCRIPTIONS = {
  "/actualites": "Veille et dossiers sur le numérique responsable : actualités, rapports et analyses pour suivre les évolutions du Green IT.",
  "/agir": "Passer à l'action : gestes concrets, outils et ressources pour réduire l'empreinte environnementale du numérique au quotidien.",
  "/a-propos": "À propos du Green IT en clair : la démarche, les sources et la méthode derrière ce site éducatif sur le numérique responsable.",
  "/cas-pratiques": "Cas pratiques d'entreprises et de collectivités : exemples concrets de stratégies Green IT et de leurs résultats.",
  "/chiffres": "Les chiffres clés de l'impact environnemental du numérique en France et dans le monde, sourcés et expliqués.",
  "/comprendre": "Comprendre le Green IT : cycle de vie des équipements, impacts du numérique et notions clés expliquées simplement.",
  "/datacenters": "Datacenters et cloud : consommation, impacts environnementaux et bonnes pratiques pour un numérique plus sobre.",
  "/developpement": "Écoconception web : bonnes pratiques et repères pour concevoir des sites et applications plus sobres.",
  "/faq": "Réponses aux questions fréquentes sur le Green IT, l'impact du numérique et les gestes pour agir.",
  "/fiches-pratiques": "Fiches pratiques Green IT : guides pas à pas pour agir au quotidien, en entreprise et en collectivité.",
  "/guide": "Le guide du numérique responsable : parcours complet des gestes et bonnes pratiques, du diagnostic à l'action.",
  "/mentions-legales": "Mentions légales du site Le Green IT en clair.",
  "/modeles": "Modèles téléchargeables prêts à l'emploi : charte, grille d'audit, plan d'action, tableau de bord et plus.",
  "/modeles/cahier-charges-achat": "Modèle de cahier des charges pour des achats numériques responsables, prêt à adapter à votre organisation.",
  "/modeles/charte-green-it": "Modèle de charte Green IT pour formaliser les engagements numériques responsables de votre organisation.",
  "/modeles/grille-audit": "Grille d'audit Green IT : 26 critères pour évaluer les pratiques numériques responsables de votre organisation.",
  "/modeles/guide-sensibilisation": "Modèle de guide de sensibilisation pour mobiliser vos équipes autour du numérique responsable.",
  "/modeles/plan-action-dsi": "Modèle de plan d'action DSI pour structurer une démarche Green IT sur plusieurs années.",
  "/modeles/politique-numerique": "Modèle de politique numérique responsable à adapter et faire valider dans votre organisation.",
  "/modeles/tableau-bord-impact": "Modèle de tableau de bord pour suivre l'impact et la consommation du numérique de votre organisation.",
  "/mythes": "Mythes et réalités du Green IT : ce qui est vrai, faux ou nuancé sur l'impact du numérique.",
  "/outils": "Outils interactifs : calculateur d'empreinte, simulateur de sobriété, audit Green IT, comparateur cloud et quiz.",
  "/par-ou-commencer": "Par où commencer : un parcours guidé pour découvrir le Green IT selon votre profil.",
  "/perspectives": "Perspectives : tendances, innovations et scénarios d'évolution du numérique responsable.",
  "/problematiques": "Les problématiques du numérique : épuisement des ressources, émissions de gaz à effet de serre et déchets électroniques.",
  "/recyclage": "Recyclage et reconditionné : filières, gestes et points de collecte pour donner une seconde vie aux appareils.",
  "/reglementation": "Réglementation du numérique : lois, directives et obligations pour les organisations et les citoyens.",
  "/ressources": "Ressources et liens utiles pour approfondir le Green IT : rapports, outils, formations et lectures.",
  "/sitemap-page": "Plan du site : toutes les pages du Green IT en clair, classées par thème.",
}

const TARGETS = [
  "app/actualites/layout.tsx",
  "app/agir/layout.tsx",
  "app/a-propos/page.tsx",
  "app/cas-pratiques/layout.tsx",
  "app/chiffres/layout.tsx",
  "app/comprendre/layout.tsx",
  "app/datacenters/layout.tsx",
  "app/developpement/layout.tsx",
  "app/faq/layout.tsx",
  "app/fiches-pratiques/layout.tsx",
  "app/guide/layout.tsx",
  "app/mentions-legales/page.tsx",
  "app/modeles/layout.tsx",
  "app/modeles/cahier-charges-achat/layout.tsx",
  "app/modeles/charte-green-it/layout.tsx",
  "app/modeles/grille-audit/layout.tsx",
  "app/modeles/guide-sensibilisation/layout.tsx",
  "app/modeles/plan-action-dsi/layout.tsx",
  "app/modeles/politique-numerique/layout.tsx",
  "app/modeles/tableau-bord-impact/layout.tsx",
  "app/mythes/layout.tsx",
  "app/outils/layout.tsx",
  "app/par-ou-commencer/layout.tsx",
  "app/perspectives/layout.tsx",
  "app/problematiques/layout.tsx",
  "app/recyclage/layout.tsx",
  "app/reglementation/layout.tsx",
  "app/ressources/layout.tsx",
  "app/sitemap-page/page.tsx",
]

let ok = 0
let manual = 0
for (const f of TARGETS) {
  let src = fs.readFileSync(f, "utf8")
  if (src.includes("openGraph:")) { console.log("déjà fait:", f); continue }
  const can = (src.match(/canonical:\s*"([^"]+)"/) || [])[1]
  const title = (src.match(/title:\s*"((?:[^"\\]|\\.)*)"/) || [])[1]
  const route = can ? can.replace("https://hylst.fr/greenit", "") : ""
  const desc = DESCRIPTIONS[route]
  if (!can || !title || !desc) { manual++; console.log("MANUEL:", f, "| route:", route); continue }
  const ogTitle = title.includes("Le Green IT en clair") ? title : `${title} | Le Green IT en clair`
  const hasDesc = /description:\s*"/.test(src)
  const injected = (hasDesc ? "" : `  description: ${JSON.stringify(desc)},\n`) +
    `  openGraph: pageOpenGraph(${JSON.stringify(ogTitle)}, ${JSON.stringify(desc)}, ${JSON.stringify(route)}),\n`
  const re = /(\n\s*alternates:\s*\{[^}]*\},\n)/
  if (!re.test(src)) { manual++; console.log("MANUEL (alternates):", f); continue }
  src = src.replace(re, `$1${injected}`)
  if (!src.includes('from "@/lib/metadata"')) {
    src = src.replace(/(import type \{ Metadata \} from "next"\n)/, `$1import { pageOpenGraph } from "@/lib/metadata"\n`)
    if (!src.includes('from "@/lib/metadata"')) console.log("IMPORT À AJOUTER À LA MAIN:", f)
  }
  fs.writeFileSync(f, src)
  ok++
  console.log("ok:", f)
}
console.log("modifiés:", ok, "| manuels:", manual)
```
Lancer depuis la racine du repo : `node C:/Users/Geoffroy/AppData/Local/Temp/opencode/og-inject.js`
Attendu : `modifiés: 29 | manuels: 0`. Si un fichier ressort « MANUEL », l'éditer à la main selon le même modèle.

- [ ] **Step 2: Cas dynamique des fiches**

Dans `app/fiches-pratiques/[id]/page.tsx`, remplacer le `return` de `generateMetadata` :
```ts
  return {
    title: sheet ? `${sheet.title} | Fiches pratiques` : "Fiches pratiques",
    description: sheet ? sheet.subtitle : undefined,
    alternates: { canonical: `https://hylst.fr/greenit/fiches-pratiques/${id}` },
    openGraph: sheet
      ? pageOpenGraph(
          `${sheet.title} | Le Green IT en clair`,
          sheet.subtitle,
          `/fiches-pratiques/${id}`
        )
      : pageOpenGraph(
          "Fiches pratiques | Le Green IT en clair",
          "Fiches pratiques Green IT : guides pas à pas pour agir au quotidien, en entreprise et en collectivité.",
          "/fiches-pratiques"
        ),
  }
```
Ajouter l'import `import { pageOpenGraph } from "@/lib/metadata"` en tête de fichier.

- [ ] **Step 3: tsc + build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
```
Attendu : 0 erreur, build OK.

- [ ] **Step 4: Vérification OG complète**

Réutiliser `C:/Users/Geoffroy/AppData/Local/Temp/opencode/og-scan.js` (comparaison og:url vs canonical) sur le nouvel export.
Attendu : seul `/offline/` diverge (page noindex, documentée) ; toutes les autres pages ont `og:url` = canonical.
Contrôle complémentaire :
```bash
grep -o 'property="og:title" content="[^"]*' out/chiffres/index.html out/guide/index.html | head -4
```
Attendu : titres distincts par page (plus le titre racine partout).

- [ ] **Step 5: Commit**

```bash
git add app components lib
git commit -m "seo : open graph par page"
```

---

### Task 11: Vérification finale, docs, push

**Files:**
- Modify: `changelog.md`, `todo.md`, `suivi-audit-2026-09.md`

**Interfaces:**
- Consumes: toutes les tâches précédentes.
- Produces: livraison.

- [ ] **Step 1: Batterie complète**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -3
node C:/Users/Geoffroy/AppData/Local/Temp/opencode/h1-scan.js
node C:/Users/Geoffroy/AppData/Local/Temp/opencode/og-scan.js
node C:/Users/Geoffroy/AppData/Local/Temp/opencode/jsonld-scan.js
NODE_PATH="D:\0CODE\AntiGravity\GreenIT\node_modules" node C:/Users/Geoffroy/AppData/Local/Temp/opencode/a11y-axe.js
```
Attendu : tsc 0 ; build OK ; h1 0 hors norme ; og 1 divergence documentée ; json-ld exit 0 ; axe 0/0.
Puis re-lancer Lighthouse (Task 6) une dernière fois et comparer.

- [ ] **Step 2: Scan secrets final**

Invoquer le skill **security-scanner** (diff complet + audit). Aucun secret avant push.

- [ ] **Step 3: Docs**

- `changelog.md` : une entrée par chantier (hygiène, a11y, perf, SEO) avec chiffres réels (vulns avant/après, scores Lighthouse).
- `todo.md` : cocher la ligne « finitions techniques », ajouter ce qui reste (checklist NVDA à faire par l'utilisateur, `/offline` OG, robots racine).
- `suivi-audit-2026-09.md` : vérification finale datée.

- [ ] **Step 4: Commit docs + push**

```bash
git add changelog.md todo.md suivi-audit-2026-09.md
git commit -m "docs : finitions techniques"
git push origin main
```

- [ ] **Step 5: Récapitulatif**

Rendre compte honnêtement : vulns avant/après, scores Lighthouse par page, violations axe avant/après, ce qui reste (checklist lecteur d'écran, robots racine, OG `/offline`, toute page sous le seuil perf).

---

## Notes d'exécution

- Si `npm install` (sharp, outils) élague `playwright`/`@axe-core/playwright`/`lighthouse`, relancer la commande d'installation groupée avant les tâches navigateur.
- Les scripts temp vivent dans `C:/Users/Geoffroy/AppData/Local/Temp/opencode/` ; ne jamais les committer.
- `typescript.ignoreBuildErrors: true` reste dans la config : on exige malgré tout `tsc --noEmit` à 0.
- En cas d'écart entre ce plan et le code réel (fichier renommé, ligne déplacée), s'arrêter, lire le fichier, adapter la correction minimale — pas de refactor opportuniste.

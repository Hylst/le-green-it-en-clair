# todo

Ma liste, mise à jour le 13/09/2026 après une grosse relecture pessimiste (lecture seule, j'ai rien cassé, promis).

## 🔴 P0 — ce qui casse en prod sous /greenit

- [x] manifest : fait le 14/09 (`start_url`/`scope` -> `/greenit/`, icônes -> `.webp` existants). Build ok.
- [x] sw.js + layout : fait le 14/09 (chemins en `/greenit/...`, fallback `/greenit/`, `register('/greenit/sw.js')`).
- [x] images + leaflet en dur : fait le 14/09 (leaflet + OG en `/greenit/...`, le reste c'est `next/image` qui préfixe tout seul).
- [x] `fiches-pratiques/page.tsx:112` : fallback -> `/images/fiches/gestes-quotidiens.webp`. Fait le 14/09.
- [x] `breadcrumb.tsx:37` : ligne `flux-rss` virée. Fait le 14/09.
- [x] `font-heading` : remplacé par `font-poppins` aux 3 endroits. Fait le 14/09.
- [x] `layout.tsx` : `generator: 'Next.js'`. Fait le 14/09.
- [x] `sitemap.ts` : rajouté `/offline/` + les 7 `modeles/*`, date en dur + `force-static` (sinon le build plante, vu le 14/09).
- [x] `Dockerfile` : viré le `COPY pnpm-lock`, passé en `npm ci --legacy-peer-deps`. Fait le 14/09.
- [x] outils : boutons "télécharger" branchés sur `window.print()` (calculateur, simulateur), audit branché sur son `exportPDF`, "partager" avec `navigator.share` + fallback presse-papier. Fait le 14/09.
- [x] outils : fonction `GreenITQuiz` morte virée (+ import `Trophy`). La grille 4 colonnes pour 7 cartes je la laisse, en fait c'est pas si mal (4+3). Fait le 14/09.
- [x] recherche : rajouté les 13 pages manquantes. Fait le 14/09.
- [x] `sheet-content.tsx` : y'avait une `</div>` en trop qui faisait planter le build (vu le 14/09 en lançant `npm run build`). Réparé + bouton partager branché.
- [x] `npm run lint` : script viré le 14/09 (eslint était pas installé, ça induisait en erreur). Le check c'est la CI qui fait `npm run build`. Reste à faire : installer eslint pour de vrai + nettoyer les erreurs `tsc` (y'en a une dizaine, voir `npx tsc --noEmit`).
- [x] `out/` vérifié le 14/09 : pas de sous-dossier `greenit` dedans, `index.html` + `manifest.json` + `sw.js` à la racine -> le `COPY out -> html/greenit` du Dockerfile est bon, pas de double nid.
- [x] `/outils` découpé le 14/09 : 6 modules dans `components/outils/` chargés en `dynamic` (`ssr: false`) au lieu d'un seul fichier de 2000+ lignes. Build ok.
- [x] PWA finie le 14/09 : icônes 192/512 générées depuis `apple-icon.webp`, manifest complété, cache SW bumpé `v1.2.0`. Reste à tester l'install + le offline sur `hylst.fr/greenit` pour de vrai.

## 🔴 important mais pas cassé

- [ ] tester chrome / firefox / safari, en prod `/greenit/` pas juste en dev
- [ ] tester mobile plusieurs tailles
- [ ] chasser les liens morts (un petit `lychee` sur `out/` après build, ça serait bien)
- [ ] audit accessibilité WCAG, les contrastes + clavier
- [ ] perfs : le fichier outils fait 1900 lignes, à découper
- [x] sitemap.xml -> fait (`sitemap.ts` + robots), reste à compléter (voir P0)
- [x] redirects 301 -> fait dans nginx (`/` -> `/greenit/`)
- [ ] retester le dark partout

## 🟠 contenu, plus tard

- [ ] success stories avec des vrais cas
- [ ] vidéos
- [ ] blog, 5 articles pour commencer
- [ ] version anglaise ? peut-être
- [ ] infographies en plus, section livres
- [ ] documenter `guide/` + `mentions-legales/` (pas encore commités)
- [x] les 5 outils avancés : fait (site web, entreprise, cloud, audit, quiz)

## 🟠 communauté

- [ ] newsletter, partage social, formulaire contact qui marche, commentaires, page contribuer

## 🟡 un jour

comptes, dashboard, badges, forum, géoloc carte, offline nickel, formation, espace enfants, podcasts, webinaires, i18n, cache, API, tests auto (jest/playwright), anim d'intro, print-friendly, mascotte...

## 📊 fond de roulement

- [ ] màj chiffres, actus, glossaire, viser 15 fiches, étoffer la FAQ
- [ ] SEO / analytics / temps de chargement / backlinks

## ✅ fait

- 13/09 : passage docs en minuscules + gitignore local + relecture pessimiste (sans toucher au code)
- 13/09 (avant) : réécriture readme + agents/structure/features, todo reclassé, changelog fixé (dates 2025 -> 2026/2027, Geist -> Poppins/Inter)
- janvier 2026 : PWA, carte leaflet, PDF audit/entreprise + guide recyclage, webp partout, docker/nginx, sitemap/robots, fix TS
- 2025-2026 : accueil, comprendre, chiffres, outils de base, recyclage, datacenters, svg animées, Next 16 / React 19, docs de base

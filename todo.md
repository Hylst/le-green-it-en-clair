# todo

Ma liste, mise à jour le 13/09/2026 après une grosse relecture pessimiste (lecture seule, j'ai rien cassé, promis).

## 🔴 P0 — ce qui casse en prod sous /greenit

- [ ] manifest : `start_url` + `scope` en `/` au lieu de `/greenit/`, icônes en `.png` qui existent pas (mes fichiers sont en `.webp`). Faut choisir : je renomme ou je corrige le json + j'ajoute du 192/512.
- [ ] sw.js : chemins sans `/greenit`, fallback sur `/`, icônes `.png` fantômes. + dans `layout.tsx` le `register('/sw.js')` qui devrait être `/greenit/sw.js`. Et le `href="/greenit/manifest.json"`, à vérifier qu'il se fait pas préfixer 2 fois.
- [ ] images + leaflet en dur : hero + e-waste + OG en `/...`, icônes leaflet en `/images/leaflet/...`. En prod ça fait 404. Faut un petit helper basePath.
- [ ] `fiches-pratiques/page.tsx:112` : fallback `/placeholder.svg`, fichier supprimé. Mettre une vraie image.
- [ ] `breadcrumb.tsx:37` : virer la ligne `flux-rss`.
- [ ] `font-heading` : 3 endroits (outils:62, a-propos:14, sitemap-page:81), classe qui existe pas -> `font-poppins`.
- [ ] `layout.tsx:76` : `generator: 'v0.app'` -> `Next.js`.
- [ ] `sitemap.ts` : rajouter `/offline/` + les 7 `modeles/*`, et arrêter le `new Date()` à chaque build.
- [ ] `Dockerfile` : virer le `COPY pnpm-lock.yaml*` (j'ai pas ce fichier, `ls` me dit que non), passer en `npm ci`.
- [ ] outils : brancher ou virer les boutons "télécharger" du calculateur (ligne ~559) + simulateur (~947). Vérifier aussi les 2 autres vers 1834 / 2537.
- [ ] outils : virer la fonction `GreenITQuiz` (~977) qui sert à rien, et refaire la grille (4 colonnes pour 7 cartes, bof).
- [ ] recherche : rajouter les 13 pages manquantes (mythes, cas-pratiques, recyclage, dev, réglementation, perspectives, guide, ressources, modeles, faq, mentions, offline, sitemap...).

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

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
- [x] `npm run lint` : script viré le 14/09 (eslint était pas installé, ça induisait en erreur). Le check c'est la CI qui fait `npm run build`. Reste à faire : installer eslint pour de vrai + nettoyer les erreurs `tsc` (19 le 14/09, toutes pré-existantes dans `carbon-calculator`, `leaflet-map`, `search-dialog`... aucune dans les fichiers touchés depuis, vérifié).
- [x] `ui/sonner.tsx` : 8e orphelin supprimé le 14/09 (personne l'importait, il crachait depuis la désinstall du paquet `sonner`).
- [x] `out/` vérifié le 14/09 : pas de sous-dossier `greenit` dedans, `index.html` + `manifest.json` + `sw.js` à la racine -> le `COPY out -> html/greenit` du Dockerfile est bon, pas de double nid.
- [x] `/outils` découpé le 14/09 : 6 modules dans `components/outils/` chargés en `dynamic` (`ssr: false`) au lieu d'un seul fichier de 2000+ lignes. Build ok.
- [x] PWA finie le 14/09 : icônes 192/512 générées depuis `apple-icon.webp`, manifest complété, cache SW bumpé `v1.2.0` puis `v1.2.1` (network-first pour les pages, sinon site cassé pour les revenants après chaque déploiement).
- [x] audit navigateur le 14/09 (Chromium sur l'export prod en local) : 24 images sans `/greenit` réparées, 31 boutons-dans-liens en `asChild`, recherche en français, onglets au clavier, skip-link + Escape testés. Détail dans `changelog.md`.
- [x] `website-carbon` : fini les résultats en `Math.random()` — estimateur honnête (poids saisi par l'utilisateur, green-check GWF en direct, formule SWD v4 affichée + mentions, boutons imprimer/partager branchés). Fait le 14/09, build ok.
- [x] `actualites` : fini les fausses dépêches attribuées à de vrais organismes + le faux « flux en direct » — encarts « À la une » marqués exemples (rédaction du site, sujets vrais), onglet Veille devenu un annuaire de sources externes. Fait le 14/09, build ok.
- [x] `problematiques` : chiffres P0 corrigés (e-déchets trajectoire GEM 2024, recyclage 22,3 %, export illégal minoritaire, IA ~0,3 Wh, SD ~0,7 Go/h, lithium ×3 2017-2022, 62 % renouvellements ADEME 2026, UE 5 ans màj + 7 ans pièces, eau 12 000 L, TSMC ~67 %, Ghana/Nigeria chiffrés). Stabilisé à la main le 15/09 après interruption d'un sous-agent, build + export vérifiés.
- [x] `datacenters` + `cas-pratiques` : chiffres P0 corrigés à la main le 15/09 (415 TWh AIE 2024, PUE 1,56 monde / 1,45 Europe Uptime 2024, camembert 64/28/8, portable = Paris-Marseille AR, 800 kWh ≈ 2 mois, serveurs 3-5 ans, RAM nuancée, CTA branchés /agir + /outils, section Sources remplie). Build + export vérifiés.

## 🔴 important mais pas cassé

- [ ] tester chrome / firefox / safari, en prod `/greenit/` pas juste en dev
- [ ] tester mobile plusieurs tailles (+ lecteur d'écran NVDA/VoiceOver pour de vrai)
- [ ] bruit console : les prefetch Next (`*_rsc`, `__PAGE__.txt` en 404) sur l'export statique. Cosmétique (la navigation retombe sur la page complète), mais à surveiller si Next propose une option propre un jour.
- [x] breadcrumb : labels `guide`/`mentions-legales`/`offline` ajoutés + `aria-label` "Fil d'Ariane" (fait le 14/09).
- [x] emoji 🎯 masqué aux lecteurs d'écran (fait le 14/09).
- [x] titres uniques par page (fait le 14/09) : template + 19 layouts + 4 pages serveur. Les pages `"use client"` ne peuvent pas exporter `metadata`, d'où les mini-layouts.
- [x] page 404 (fait le 14/09) : `not-found.tsx` + nginx `error_page`. Fil d'Ariane `_not found` -> fix hydratation.
- [x] image OG 1200x630 (fait le 14/09) : générée avec Agnes, sans texte (le modèle écrit mal le français), `og-cover.png`.
- [x] screenshots PWA (fait le 14/09) : vraies captures, déclarés dans le manifest.
- [x] print CSS (fait le 14/09) : nav/footer masqués, fond blanc.
- [ ] chasser les liens morts (un petit `lychee` sur `out/` après build, ça serait bien)
- [ ] audit contrastes WCAG au cas par cas (le clavier est testé : skip-link, menus, onglets, Escape — voir changelog du 14/09)
- [ ] perfs : le fichier outils fait 1900 lignes, à découper
- [x] sitemap.xml -> fait (`sitemap.ts` + robots), reste à compléter (voir P0)
- [x] redirects 301 -> fait dans nginx (`/` -> `/greenit/`)
- [ ] retester le dark partout

## 🟠 contenu, plus tard

- [x] section "Fin de vie & Recyclage" ajoutée au guide (fait le 14/09)
- [ ] success stories avec des vrais cas (pistes : Back Market, Fairphone, Envie – demander l'autorisation avant de citer)
- [ ] vidéos : commencer par embed des confs existantes (ADEME, Shift Project sur YouTube) plutôt que produire
- [ ] blog, 5 articles pour commencer (idées : "mon premier audit Green IT en PME", "reconditionné vs neuf : le calcul", "comprendre le PUE en 5 min", "AGEC/REEN : ce qui change pour moi", "1 an avec un Fairphone")
- [ ] page "Choisir son FAI / sa box" ? (données Arcep : comparer Wi-Fi vs 4G/5G, box allumée 24/7) — à sourcer avant d'écrire
- [ ] FAQ : ajouter "Est-ce que le cloud c'est vraiment dans des nuages ?" + "Mon vieux PC peut-il servir encore ?" (questions que les gens posent vraiment)
- [ ] version anglaise ? peut-être
- [ ] infographies en plus, section livres
- [x] `guide/` + `mentions-legales/` : commités (le 14/09)
- [x] les 5 outils avancés : fait (site web, entreprise, cloud, audit, quiz)

## 🟠 communauté

- [ ] newsletter, partage social, formulaire contact qui marche, commentaires, page contribuer

## 🟡 un jour

comptes, dashboard, badges, forum, géoloc carte, offline nickel, formation, espace enfants, podcasts, webinaires, i18n, cache, API, tests auto (jest/playwright), anim d'intro, print-friendly, mascotte...

## 📊 fond de roulement

- [x] collecte illustrative le 14/09 (tâche 1 vague 1) : mentions « chiffres illustratifs » + lien ADEME sur `chiffres`/`recyclage`, `15 000+`/`15 000 bornes` neutralisés, fiche `recyclage-mode-emploi` + ressource ADEME. Build ok.
- [x] mythe stockage cloud le 15/09 (tâche 2 vague 1) : `20 kg` / `15 g` / `0,2 kg` -> `0,24 g/Go/an` (ADEME Impact CO2 / Base Empreinte) sur `mythes`/`faq`/fiche `gestes-quotidiens` + facteur calculateur à `0,00024 kg/Go/an`. Build ok.

- [ ] màj chiffres, actus, glossaire, viser 15 fiches, étoffer la FAQ
- [ ] SEO / analytics / temps de chargement / backlinks

## ✅ fait

- 13/09 : passage docs en minuscules + gitignore local + relecture pessimiste (sans toucher au code)
- 13/09 (avant) : réécriture readme + agents/structure/features, todo reclassé, changelog fixé (dates 2025 -> 2026/2027, Geist -> Poppins/Inter)
- janvier 2026 : PWA, carte leaflet, PDF audit/entreprise + guide recyclage, webp partout, docker/nginx, sitemap/robots, fix TS
- 2025-2026 : accueil, comprendre, chiffres, outils de base, recyclage, datacenters, svg animées, Next 16 / React 19, docs de base

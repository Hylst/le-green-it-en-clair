# changelog

Je note ici ce qui change, même les petits trucs.

## pas encore sorti — 13/09/2026

- fix du 14/09, build qui passe (42 pages) :
  - pwa `/greenit` : manifest (`start_url`/`scope` + icônes `.webp`), sw (chemins + fallback), layout (`register('/greenit/sw.js')`, OG en `/greenit/...`, `generator: Next.js`), leaflet (`/greenit/images/...`)
  - refs mortes : fallback placeholder -> vraie image, breadcrumb sans `flux-rss`, `font-heading` -> `font-poppins` x3, sitemap (+offline + 7 modeles, date en dur + `force-static`), dockerfile (`npm ci`, plus de pnpm)
  - outils : boutons télécharger -> `window.print()`, audit -> son `exportPDF`, partager -> `navigator.share` + presse-papier, vieux `GreenITQuiz` viré, recherche complète (23 pages)
  - build : `sheet-content.tsx` avait une `</div>` en trop qui plantait tout, réparé
  - trouvé au passage : `npm run lint` marchait pas (eslint pas installé) -> script viré le 14/09, le check c'est la CI (`npm run build`). Reste : installer eslint + nettoyer les erreurs `tsc`.
  - perf `/outils` le 14/09 : découpé en 6 modules (`components/outils/`) en `dynamic` + `ssr: false`, la page ne charge chaque outil qu'à l'onglet.
  - PWA le 14/09 : icônes 192/512, manifest complété, SW `v1.2.0`. CI GitHub Actions ajoutée (build à chaque push).
  - re-vérif pessimiste : zéro résidu (`placeholder.svg`, `flux-rss`, `font-heading`, `v0.app`, `GreenITQuiz`...), sitemap exporté vérifié (`offline` + 7 modeles dedans), import `Download` inutilisé viré de `sheet-content`.
  - gitignore : viré les entrées `gemini.md` / `cursor.md` (ces fichiers existent pas, et pour pas dupliquer : tout est dans `agents.md`, valable tous assistants).
  - accessibilité le 14/09 : lien "Aller au contenu" + `id` sur `main`, focus visible renforcé, onglets outils en `tablist/tab/tabpanel` + `aria-selected`, mini-quiz en `aria-pressed`.
  - sécu le 14/09 : headers nginx (`Referrer-Policy`, `Permissions-Policy`, viré `X-XSS-Protection` déprécié), `rel="noopener"` partout (manquait que sur actualites), 7 dépendances mortes virées (`@vercel/analytics`, `date-fns`, `embla`, `input-otp`, `vaul`, `react-day-picker`, `sonner`) + 7 composants shadcn orphelins supprimés (dont `sidebar` et son cookie mort).
  - RGPD le 14/09 : mentions légales réécrites pour de vrai (zéro cookie, thème en localStorage, cache SW, tuiles OSM, pas d'analytics). Contenu : section recyclage ajoutée au guide.
  - audit navigateur le 14/09 (vrai Chromium sur l'export prod) :
  - images cassées en prod : 24 chemins sans `/greenit` (hero, fiches, comprendre, développement, ressources) -> préfixés, vérifié visuellement. C'était le même nid à bugs que le basePath.
  - console propre : manifest (`purpose` invalide viré), favicons déclarés dans le layout (plus de 404 `/favicon.ico`), `qualities: [75,85]` dans la config, meta `mobile-web-app-capable` ajouté.
  - PDF orphelin (`guide-recyclage-green-it.pdf`, lié nulle part) -> bouton téléchargement dans le guide (et ça a viré un import `Download` mort).
  - 31 boutons-dans-des-liens corrigés (`Button asChild`, comme la FAQ le faisait déjà) : lecteurs d'écran OK.
  - recherche 100% français (les textes par défaut anglais de shadcn), onglets outils navigables aux flèches (motif APG : ids, roving tabindex, panneau lié).
  - SW : les pages sont en network-first (v1.2.1). Avant, un visiteur qui revenait après un déploiement gardait le vieux HTML qui pointait vers des JS effacés -> site mort. Testé en reproduisant le bug en local.
  - testé au clavier : skip-link visible au 1er Tab, menus + Escape, flèches dans les onglets. Reste du bruit console (prefetch Next `_rsc` en 404 sur l'export statique) : cosmétique, la navigation marche, noté dans `todo.md`.
  - suggestions implémentées le 14/09 :
  - titres uniques par page : template `%s | Le Green IT en clair` + 19 mini-layouts (les pages sont en `"use client"`, donc pas de metadata directe possible) + 4 pages serveur en direct. Vérifié dans l'export (`Outils interactifs | Le Green IT en clair`...).
  - page 404 (`not-found.tsx`, génère `404.html`) + `error_page 404 /greenit/404.html` dans nginx. Au passage : le fil d'Ariane affichait `_not found` au prérendu -> erreur d'hydratation React #418, réparé avec `suppressHydrationWarning` sur le segment.
  - image OG 1200x630 générée avec Agnes (5 essais : le modèle massacre le texte français, version sans texte adoptée après contrôle visuel) -> `public/og-cover.png`, URLs absolues dans le layout.
  - screenshots PWA (accueil desktop 1280 + outils mobile 390, vraies captures navigateur) déclarés dans le manifest.
  - print CSS : nav + footer masqués à l'impression (pour le bouton "Imprimer le guide"), fond blanc forcé. Emoji 🎯 du titre masqué aux lecteurs d'écran.
  - fil d'Ariane : labels `guide`/`mentions-legales`/`offline` ajoutés + `aria-label` en français.
- `website-carbon` honnête le 14/09 : les résultats simulés (`Math.random()`, faux « SWD 2025 / 0,81 g », scores Lighthouse inventés, hébergeur vert à pile ou face, boutons PDF/partager morts) sont remplacés par un estimateur transparent — poids saisi par l'utilisateur (repère HTTP Archive), green-check en direct via l'API publique Green Web Foundation (repli manuel si KO), calcul local SWD v4 affiché (0,194 kWh/Go AIE × 494 gCO2e/kWh Ember 2023, −24,3 % si vert, hors fabrication des équipements), équivalences recalculées sur la vraie valeur avec facteurs affichés, boutons imprimer (`window.print()`) + partager (`navigator.share` + presse-papier) branchés, liens vers Website Carbon / EcoIndex / PageSpeed / SWD. Vérifié : build ok, `tsc` propre sur le fichier, export `/greenit` contient le nouveau composant (plus de `mockResults`).
- `actualites` assainie le 14/09 : fini les fausses dépêches attribuées à de vrais organismes (ADEME, Commission européenne, Shift...) et le faux « flux en direct » (pastille pulsante, `setTimeout`, bouton Actualiser bidon). Les 6 encarts « À la une » sont des exemples assumés (badge Exemple + « la rédaction », sujets réécrits sur des faits vrais avec liens vers nos pages), l'onglet Veille est un annuaire de 5 sources externes réelles sans dates ni titres inventés. Vérifié : build ok, `tsc` propre, export sans « Flux en direct ».
- collecte honnête le 14/09 (tâche 1 vague 1) : `chiffres` + `recyclage` marqués « Chiffres illustratifs : exemple de mise en page, pas des données officielles » avec lien officiel ADEME « Que faire de mes objets » (`quefairedemesdechets.ademe.fr`, `target blank` + `noopener`), `15 000+`/`15 000 bornes` remplacés par des formulations neutres sans nouveau total (stat `recyclage` devenue « Carte », service Ecosystem « dans toute la France », fiche `recyclage-mode-emploi` + ressource ADEME cliquable). Vérifié : build ok (42 pages), export sans `15 000` sur ces pages, aucun bouton ajouté.

- grosse relecture pessimiste, lecture seule, sans toucher au code. Résultat dans `todo.md` (P0 basePath/PWA + refs mortes).
- docs passées en minuscules : `readme.md`, `about.md`, `todo.md`, `changelog.md` (les autres `agents.md`, `claude.md`, `structure.md`, `features.md`, `readme_dev.md` restent en local, dans le gitignore).
- `readme.md` refait pour github (court, qui je suis, comment lancer).
- nouveau `readme_dev.md` : mon pense-bête perso, avec les pièges basePath + la checklist.
- `about.md` réécrit, plus perso.
- nouveaux `agents.md` + `claude.md` pour bosser avec les IA en local.
- `structure.md` + `features.md` : état réel + ce qui marche pas.
- `.gitignore` : j'ajoute `readme_dev.md`, `agents.md`, `claude.md`, `structure.md`, `features.md` (+ majuscules au cas où) pour rien pousser d'IA-ish sur le repo public.
- rappels : repo en ligne PUBLIC (vérifié avec `gh repo view`), local sur `main`, 7 dossiers `modeles/*` + `guide/` + `mentions-legales/` pas encore commités.
- acté : route `/flux-rss` virée, `placeholder.*` virés, `styles/globals.css` viré.

## 1.1.0 — 04/01/2026

Upgrade & polish :
- PWA de base (manifest, sw, bouton install, page offline) — bon en dev, à revoir sous `/greenit`, voir P0
- carte leaflet / OSM sur recyclage + chiffres, à la place des visuels statiques
- PDF : audit, simulateur entreprise, guide recyclage
- SEO : sitemap dynamique + robots + metadata
- images en webp, fonts optimisées
- docker multi-étapes + nginx pour coolify

Outils en plus :
- quiz avancé (100 questions, 10 cats, 4 modes)
- analyse site web par url
- comparateur cloud (8)
- audit parc (7 types, note A-E)
- simulateur entreprise (ROI 5 ans)

Fix : images accueil, metadata authors, opengraph.

## 1.0.0 — 04/01/2025

Première version qui tient debout :
- accueil + quiz + parcours, comprendre (cycle de vie 5 étapes), chiffres (graphes), cas pratiques, agir (3 guides), datacenters (PUE), recyclage (carte de base), dev, réglementation (AGEC, REEN, DEEE, CSRD), problématiques, perspectives 2040, actus (12), par-ou-commencer, mythes (12), faq (24), 8 fiches, nav + breadcrumb + recherche, dark mode, glossaire 15 termes
- svg animées, équivalences co2, comparateur langages
- webp + lazy + alt, open graph
- Next 16 / React 19, design tokens, mobile-first. Typo : Poppins + Inter (l'ancien changelog disait Geist, c'était une erreur).

## après

- 1.2.0 prévu fin 2026 : P0 basePath/PWA, nettoyage breadcrumb/search/font/placeholder/boutons, comptes, newsletter, success stories
- 1.3.0 en 2027 : forum, formation, templates, webinaires, espace jeunes

---

Geoffroy — geoffroy.streit@gmail.com — https://hylst.fr/greenit

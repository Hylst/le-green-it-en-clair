# changelog

Je note ici ce qui change, même les petits trucs.

## pas encore sorti — 13/09/2026

- fix du 14/09, build qui passe (42 pages) :
  - pwa `/greenit` : manifest (`start_url`/`scope` + icônes `.webp`), sw (chemins + fallback), layout (`register('/greenit/sw.js')`, OG en `/greenit/...`, `generator: Next.js`), leaflet (`/greenit/images/...`)
  - refs mortes : fallback placeholder -> vraie image, breadcrumb sans `flux-rss`, `font-heading` -> `font-poppins` x3, sitemap (+offline + 7 modeles, date en dur + `force-static`), dockerfile (`npm ci`, plus de pnpm)
  - outils : boutons télécharger -> `window.print()`, audit -> son `exportPDF`, partager -> `navigator.share` + presse-papier, vieux `GreenITQuiz` viré, recherche complète (23 pages)
  - build : `sheet-content.tsx` avait une `</div>` en trop qui plantait tout, réparé
  - trouvé au passage : `npm run lint` marche pas, eslint est pas dans les dépendances. À trancher.
  - re-vérif pessimiste : zéro résidu (`placeholder.svg`, `flux-rss`, `font-heading`, `v0.app`, `GreenITQuiz`...), sitemap exporté vérifié (`offline` + 7 modeles dedans), import `Download` inutilisé viré de `sheet-content`.
  - gitignore : viré les entrées `gemini.md` / `cursor.md` (ces fichiers existent pas, et pour pas dupliquer : tout est dans `agents.md`, valable tous assistants).

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

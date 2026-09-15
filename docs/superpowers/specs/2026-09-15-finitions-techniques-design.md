# Design — Finitions techniques : hygiène, accessibilité, performance, SEO

**Date :** 15 septembre 2026
**Approche validée :** 4 chantiers groupés (hygiène → a11y → perf → SEO), Quiz v2 cadré séparément ensuite.
**Statut :** en attente de relecture utilisateur avant plan d'implémentation.
**Périmètre :** `package.json`/`package-lock.json`, `app/globals.css`, `hooks/`, composants animés, métadonnées/JSON-LD, docs de suivi. Aucun changement de contenu rédactionnel.

## 1. Contexte

- Site statique Next 16 (`output: export`, `basePath: /greenit`, `images.unoptimized: true`), 23 pages, 7 outils, PWA avec service worker `v1.3.0`.
- Barre de qualité validée par l'utilisateur : axe-core 0 violation critique/sérieuse, Lighthouse perf ≥90 sur les pages clés, `prefers-reduced-motion` respecté partout, tests Firefox/WebKit.
- Constats d'exploration :
  - `npm audit` : 13 vulnérabilités (3 modérées, 8 hautes, 2 critiques), surtout outillage de build (`browserslist`, `@isaacs/brace-expansion`, `baseline-browser-mapping`) ; seul `sharp` exige un passage 0.34 → 0.35.4 (annoté « breaking »).
  - Aucun `prefers-reduced-motion` global ; 2 composants sur 7 utilisent `motion-reduce:` ; `animated-lifecycle-svg` et `growth-animation` animent via minuteurs JS (`setInterval`/`setTimeout`) que le CSS ne peut pas couper.
  - Aucun JSON-LD ; `metadataBase` et un OpenGraph racine existent ; `og-cover.jpg` (1200×630) existe.
  - `recharts` est importé sur 5 pages de contenu, `react-leaflet` sur 2 pages, `jspdf` dans 2 outils.
  - Skip link (« Aller au contenu » → `#contenu`) et `aria-live` du quiz déjà en place.
- Règles AGENTS.md : français, source + année pour tout chiffre, tokens Tailwind, `lucide-react`, webp, vérification sous `/greenit/`, petits commits ciblés, pas de secrets.

## 2. Objectifs

1. **Hygiène** : réduire les vulnérabilités npm, bupmer `sharp`, scanner secrets + dépendances, vérifier le déploiement live (lecture seule).
2. **A11y** : filet global `prefers-reduced-motion`, garde JS sur les 2 composants à minuteurs, audit axe-core, corrections, contrôles focus/titres/skip link.
3. **Perf** : mesurer Lighthouse, puis corriger les points chauds identifiés (candidats : `jspdf`, `react-leaflet`), atteindre ≥90 perf sur les 4 pages clés.
4. **SEO** : JSON-LD (WebSite + Organization, BreadcrumbList, FAQPage, TechArticle), complétude OG vérifiée par script.
5. Consigner les scores réels et mettre à jour `changelog.md`, `todo.md`, `suivi-audit-2026-09.md`.

## 3. Non-objectifs

- **Quiz v2** (localStorage, révision des erreurs) : brainstorm puis spec séparés après ces 4 chantiers.
- Aucune nouvelle dépendance runtime ; Lighthouse et `@axe-core/playwright` sont installés en `--no-save` (comme playwright), jamais dans `package.json`.
- Aucun test lecteur d'écran automatisé (NVDA) : une checklist manuelle est documentée pour l'utilisateur.
- Pas de refonte visuelle, pas de réécriture de contenu, pas de traduction.
- Pas de commit de `out/`, `node_modules/`, `.next/`.

## 4. Chantier 1 — Hygiène

### 4.1 Dépendances

1. `npm audit fix` (sans `--force`) → `npm run build` → `npm audit` : noter ce qui reste.
2. `npm install sharp@^0.35.4` (seule montée annotée breaking ; `images.unoptimized` = Next ne l'utilise pas au build, risque limité au script d'images) → `npm run build` + régénération d'une image via le script temp `make-images.js` pour confirmer que `sharp` fonctionne.
3. Si le bump révèle un problème : rollback et consignation dans le suivi.

### 4.2 Scan secrets + dépendances

- Exécuter le skill `security-scanner` (diff git + `npm audit`) avant le push final du chantier.
- Pas de secret attendu ; si trouvaille, correction avant tout push.

### 4.3 Vérification live (lecture seule, non destructif)

- `GET https://hylst.fr/robots.txt` : vérifier qu'il ne bloque pas `/greenit` (reliquat connu, hors dépôt) et noter le verdict.
- `GET https://hylst.fr/greenit/` : statut 200, version du SW servie (`sw.js` → `v1.3.0`), une URL 404 arbitraire → vérifier le comportement.
- Constats consignés dans `suivi-audit-2026-09.md` ; correction côté dépôt uniquement si possible.

## 5. Chantier 2 — Accessibilité finale

### 5.1 Reduced motion

- `app/globals.css`, à la fin :
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- Nouveau `hooks/use-reduced-motion.ts` (convention `hooks/use-mobile.ts`), export `usePrefersReducedMotion()` : `matchMedia("(prefers-reduced-motion: reduce)")`, écouteur de changement, valeur initiale `false` (SSR-safe, pas de mismatch d'hydratation).
- `components/animated-lifecycle-svg.tsx` : les minuteurs ne sont lancés que dans un effet après montage ; si la préférence est « réduire », aucun minuteur et l'état final est appliqué directement. Clic/clavier restent fonctionnels.
- `components/growth-animation.tsx` : même règle → valeur finale (2026) affichée immédiatement.
- Les classes `motion-reduce:` existantes restent (défense en profondeur). Les 3 autres composants animés CSS sont couverts par le filet global.

### 5.2 Audit axe-core

- `npm i --no-save --legacy-peer-deps @axe-core/playwright` + script temp (serveur `greenit-server.js` port 3006).
- Pages testées (thème sombre par défaut) : `/`, `/comprendre`, `/chiffres`, `/outils` (avec l'onglet Quiz activé), `/par-ou-commencer`, `/fiches-pratiques/gestes-quotidiens`, `/modeles/grille-audit`, `/guide`, `/faq`, `/recyclage`.
- Seuil : **0 violation critical, 0 serious** (`wcag2a`, `wcag2aa`, `wcag21aa`). Les modérées/mineures sont listées et corrigées si trivial, sinon documentées.

### 5.3 Contrôles manuels (playwright)

- Un seul `h1` par page : script sur `out/**/index.html`.
- Focus visible : tabulation sur nav, recherche (Ctrl+K), menu mobile, quiz, dialogues.
- Skip link : premier Tab → « Aller au contenu » visible et actif.
- Escape : ferme recherche, menus, infobulles SourceTooltip (déjà vérifié, re-contrôle rapide).
- Re-run du script navigateurs Firefox + WebKit (8 pages, 0 nouvelle erreur console hors bruit `_rsc` connu).

### 5.4 Corrections

- Tout écart trouvé est corrigé au plus petit diff (aria, ordre de titres, focus, label).

## 6. Chantier 3 — Performance / Lighthouse

### 6.1 Mesure initiale

- Outil : `lighthouse` en `--no-save` + `CHROME_PATH` pointant sur le chromium de playwright ; serveur local port 3006 ; preset desktop ; catégories performance + a11y + bonnes pratiques + SEO.
- Pages : `/`, `/outils` (onglet Quiz activé), `/comprendre`, `/chiffres`.
- Scores bruts (avant/après) consignés dans `suivi-audit-2026-09.md`.

### 6.2 Correctifs (guidés par la mesure, candidats)

- `jspdf` (`components/outils/enterprise-simulator.tsx`, `components/outils/it-audit.tsx`) : import dynamique au moment de l'export (`await import("jspdf")`), même comportement visible.
- `react-leaflet` (`app/chiffres`, `app/recyclage` via `components/leaflet-map.tsx`) : import dynamique du composant carte (déjà client, sous la ligne de flottaison), placeholder de même hauteur pour éviter le CLS.
- `recharts` : si la mesure le désigne, import dynamique par graphique ; sinon laissé tel quel (pas de réécriture).
- Toute autre piste uniquement si la mesure la justifie : pas de micro-optimisation à l'aveugle.

### 6.3 Seuil

- **Perf ≥90** sur les 4 pages clés ; a11y ≥90 cohérent avec axe ; SEO ≥90.
- Si une page reste <90 après correctifs raisonnables : consigner la cause, le score atteint et la piste restante (pas de blocage, transparence).

## 7. Chantier 4 — SEO enrichi

### 7.1 JSON-LD

- Nouveau `components/json-ld.tsx` (serveur, sans état) : rend `<script type="application/ld+json">` via `JSON.stringify`, échappement standard. Chaque page émet **un seul bloc** contenant un tableau `@graph` (pas de scripts multiples).
- Données :
  - Accueil : `WebSite` (name, url `https://hylst.fr/greenit`, `inLanguage: "fr"`) + `Organization` (name, url, logo `https://hylst.fr/greenit/icon.svg`).
  - **BreadcrumbList** sur toutes les pages qui affichent le fil d'Ariane (toutes sauf l'accueil) : libellés et URLs identiques au fil visible, construits depuis une table unique (même logique que `sitemap.ts`).
  - `/faq` : `FAQPage` — questions/réponses copiées du contenu visible, sans ajout ni reformulation.
  - Les 8 fiches : `TechArticle` (headline, description, author/publisher `Organization`, `mainEntityOfPage` = URL canonique) ; **aucune date inventée** (pas de `datePublished`/`dateModified`).
- Vérification : script qui extrait les blocs JSON-LD de `out/**/index.html`, `JSON.parse` chaque bloc, contrôle du `@type` attendu par page ; absence de doublon.

### 7.2 OpenGraph

- Script de contrôle sur `out/**/index.html` : présence de `og:title`, `og:description`, `og:url`, `og:image` (absolue) et `og:image:width/height` (1200×630), cohérence de `og:url` avec le canonical.
- Complétion des champs manquants au niveau le plus haut possible (layout racine ou layout de section) avant de toucher aux pages individuelles ; `og:image` = `/og-cover.jpg` en URL absolue (basePath inclus).
- Twitter card déjà présente : conservée telle quelle.

## 8. Vérification finale

- `npx tsc --noEmit` → 0 erreur ; `npm run build` ; contrôle de `out/` sous `/greenit/`.
- Scripts de contrôle : un seul `h1`/page, JSON-LD parsé, OG complet, CSS reduced-motion présent dans le bundle, garde JS effective (émulation `reduced-motion: reduce` via playwright → minuteurs coupés).
- axe : 0 critical / 0 serious sur les 10 pages.
- Lighthouse : ≥90 perf sur les 4 pages clés (scores consignés).
- Firefox + WebKit : 0 nouvelle erreur.
- Live : constats consignés.
- Docs : `changelog.md`, `todo.md`, `suivi-audit-2026-09.md`.
- Commits : 1 par chantier (`hygiene`, `a11y`, `perf`, `seo`) + 1 docs ; push final après `security-scanner`.

## 9. Risques et limites

- **sharp 0.35.4** : unique dépendance « breaking » ; testée au build + script d'images, rollback prévu.
- **Lighthouse local ≠ terrain** : les scores locaux sont indicatifs (pas de réseau réel, pas de données de champ).
- **axe ne détecte pas tout** : les contrôles manuels (focus, titres, skip link) complètent ; aucun test NVDA automatisé, checklist documentée pour l'utilisateur.
- **Perf des pages avec `recharts`** : si le seuil n'est pas atteint sans réécriture lourde, on documente au lieu de casser l'existant.
- **Robots.txt racine** : non corrigeable depuis ce dépôt (reliquat documenté, action côté hébergement si besoin).

## 10. Livraison

- 4 chantiers committés séparément, docs à jour, push sur `main`.
- Récapitulatif honnête : scores avant/après, ce qui reste (checklist lecteur d'écran, robots racine, page perf sous seuil éventuelle).
- Ensuite : brainstorm Quiz v2 (progression localStorage, révision des erreurs).

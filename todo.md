# todo

Ma liste, mise à jour le 15/09/2026 après une grosse relecture pessimiste (lecture seule, j'ai rien cassé, promis).

## ✅ plan d'amélioration — audit contenu du 15/09/2026 (soir) — implémenté

Passage de contrôle : 6 sous-agents en lecture seule, contre-vérification à la main dans le code ET sur sources officielles en ligne, puis implémentation par vagues. Vérifié : `tsc` 0 erreur, build 42 pages, `out/` contrôlé (classes CSS, icônes, manifest). Détail dans `changelog.md`.

### vague A — contenus faux ou contradictoires — fait

- [x] `cas-pratiques:427` : fausse part « ~39 kg » du portable retirée.
- [x] `datacenters:77-83` : simulateur PUE corrigé (`IT × (PUE−1)` : 25 kW au lieu de 17), hypothèse 500 W affichée, curseurs nommés.
- [x] `problematiques` vs `chiffres` : une seule série pays (Eurostat/Ecosystem 2024), titre sourcé.
- [x] `problematiques:222,309` : indice de durabilité (France, 2025) / étiquette UE 2023/1669 / 2023/1670 (pièces + màj) séparés.
- [x] `problematiques:248` : « pièces 10 ans » → « 7 ans UE (2023/1670) ».
- [x] `problematiques:383` : piste reformulée (directive 2024/1799 : +12 mois après réparation).
- [x] `mythes:68` : −87 % → réduction de 75 à 90 % (ADEME 2022).
- [x] `app/page.tsx:354-382` : mini-quiz accueil sourcé (ADEME-Arcep 2023) + « % » espacés.
- [x] `comprendre:39-41/55-57` : 12 000 L / 250 kWh = fabrication, extraction incluse ; doublons 300 kWh / 8 000 L retirés.
- [x] `perspectives` : note « projection illustrative du site, la prospective ADEME-Arcep porte sur la France ».
- [x] `problematiques:403` : Natick arrêté en 2024, immersion en bassin.

### vague B — outils & quiz — fait

- [x] `enterprise-simulator` : maintenance préventive +20 % seulement dans les scénarios optimisés ; `energyPrice` mort viré ; panneau d'hypothèses ajouté.
- [x] `sobriety-simulator` : plus de cumul réparation/reconditionné (facteur le plus sobre retenu), libellés alignés (−15 % / −75 %) ; repère 330 kg (EENM 2025).
- [x] `it-audit` : durées 5 ans (smartphones, serveurs), parc vide = état neutre, hypothèses affichées.
- [x] `carbon-calculator` : repère « 330 kg mondial par internaute » (1,8 Gt ÷ 5,35 Md), hypothèse d'usage affichée.
- [x] `website-carbon` : `"2.1"` valide, min/step en points, barème A+/A/B/C/D labellisé, 2,5 Mo (HTTP Archive).
- [x] `outils/page` : « données récentes (2024-2026) », carte « impact d'une page (poids saisi) ».
- [x] quiz : « Questions répondues » sans les non-répondues ; sources Q74 (Google 2009), Q94/Q99 honnêtes ; `QUIZ_CONTENT_VERSION` = 2.

### vague C — accessibilité, PWA, cache, config — fait

- [x] classes dynamiques : safelist `@source inline()` (Tailwind v4.1) — rose, pink, slate dark, gray, dark:border… désormais générées (vérifié dans le CSS exporté).
- [x] `install-pwa` : bouton « Installer l'app » visible sur mobile.
- [x] icônes : `apple-icon.png` (180) + `icon-512-maskable.png`, manifest avec `id`, maskable et `shortcuts`.
- [x] `nginx.conf` : `sw.js` en no-cache, `try_files … =404` (vrai 404), `error_page` vers `/greenit/404.html`.
- [x] twitter : plus de titre/description racine → repli sur les OG par page.
- [x] `shared.tsx` : boutons ± nommés ; `ui/dialog` : « Fermer » ; cartes cliquables au clavier (par-ou-commencer, cas-pratiques, agir, recyclage, filtres FAQ) + `aria-expanded` ; titres `reglementation` h2→h3→h4.
- [x] `sw.js` v1.3.1 : fiches + modèles précachés ; `package.json` : script `start` mort retiré, `check:typo` ajouté.

### vague D — éditorial, sources, cohérence — fait (sauf noté)

- [x] `agir` : CTA renommé « Guide du recyclage (PDF) ».
- [x] FAQ : conseil achat complété (durabilité/étiquette UE/7 ans) + bloc « Sources principales ».
- [x] `recyclage` : sources 2024 (Ecosystem/Eurostat), Écologic retiré.
- [x] `politique-numerique` 5/5-7 ans ; `charte` « Objectif (3 ans) » ; `tableau-bord` sommaire 3 KPIs / 4 Suivi.
- [x] `faq-data:100` 2,5 Mo ; ressource ADEME `[id]:475` formatée ; `datacenters` AIE avril 2025 ; `reglementation` indice durabilité 2025.
- [x] `developpement` : 120 voitures, « de l'ordre de 30 à 70 % », chiffres marqués ordre de grandeur ; section vide retirée.
- [x] chiffres orphelins : 45 % = calcul explicité, DataCenterMap « ordre de grandeur », coûts réparation « fourchette indicative », 33 % = calcul, sources mythes datées « consulté en 2026 ».
- [x] `ressources` : glossaire 20 termes, WUE « par kWh IT », PUE en virgule, reconditionné 75-90 %, entrée « Indice de durabilité », ancres par terme.
- [x] `mentions-legales` : repo GitHub public lié, hébergeur sourcé ; `a-propos` : « éco-responsable » retiré ; footer : sources cliquables + lien `/guide`.
- [ ] Typo : `check:typo` créé, `CO2 → CO₂/CO₂e` et « d'e-déchets » faits ; **reste la passe « % » (~220 occurrences, une vague dédiée)**.
- [ ] Divers restants : emojis-icônes dans l'UI, `console.log` du SW, 30 fichiers `ui/` jamais importés (purger ou assumer le kit : décision à prendre).
- [ ] À confirmer avant d'écrire : prospective ADEME-Arcep « ×3 d'ici 2050 », source exacte de l'ancien repère 285 kg, millésimes Base Empreinte 2023/2024 (`guide:140`, `tableau-bord:204` vs `[id]:146`).

### méthode

- [x] Une vague = un lot de modifs + `tsc` + build + contrôle de l'export.
- [x] Sources vérifiées en ligne le 15/09 au soir : EUR-Lex (2023/1670 : 5 ans de màj OS, 7 ans de pièces, 20/06/2025 ; 2024/1799 : +12 mois après réparation, 31/07/2026), ecologie.gouv.fr + service-public (durabilité : TV janvier 2025, lave-linge 8 avril 2025), IEA Energy and AI avril 2025 (415 TWh, 1,5 %, 945 TWh en 2030), UNITAR GEM 2024 (62 Mt, 22,3 %, 82 Mt en 2030), étude Green IT monde 2025 PDF (1,8 Gt CO₂e en 2023, 3,4 %), Microsoft/DCD (Project Natick arrêté en 2024).
- [x] Contre-audit du plan lui-même avant exécution : 4 erreurs corrigées (étiquette 2023/1669, Uptime déjà sourcé, 30 orphelins `ui/` et pas 29, mythes bien au nombre de 12).
- [ ] Contre-audit échantillonné des corrections des passes précédentes : tirer 10 chiffres au hasard, revérifier la source officielle, rattraper d'éventuels faux positifs appliqués (le protocole est dans `AGENTS.md`).

## 🔴 P0 — ce qui casse en prod sous /greenit

- [x] manifest : fait le 14/09 (`start_url`/`scope` -> `/greenit/`, icônes -> `.webp` existants). Build ok.
- [x] sw.js + layout : fait le 14/09 (chemins en `/greenit/...`, fallback `/greenit/`, `register('/greenit/sw.js')`).
- [x] images + leaflet en dur : fait le 14/09 (leaflet + OG en `/greenit/...`, le reste c'est `next/image` qui préfixe tout seul).
- [x] `fiches-pratiques/page.tsx:112` : fallback -> `/greenit/images/fiches/gestes-quotidiens.webp`. Fait le 14/09.
- [x] `breadcrumb.tsx:37` : ligne `flux-rss` virée. Fait le 14/09.
- [x] `font-heading` : remplacé par `font-poppins` aux 3 endroits. Fait le 14/09.
- [x] `layout.tsx` : `generator: 'Next.js'`. Fait le 14/09.
- [x] `sitemap.ts` : rajouté `/offline/` + les 7 `modeles/*`, date en dur + `force-static` (sinon le build plante, vu le 14/09).
- [x] `Dockerfile` : viré le `COPY pnpm-lock`, passé en `npm ci --legacy-peer-deps`. Fait le 14/09.
- [x] outils : boutons "télécharger" branchés sur `window.print()` (calculateur, simulateur), audit branché sur son `exportPDF`, "partager" avec `navigator.share` + fallback presse-papier. Fait le 14/09.
- [x] outils : fonction `GreenITQuiz` morte virée (+ import `Trophy`). La grille 4 colonnes pour 7 cartes je la laisse, en fait c'est pas si mal (4+3). Fait le 14/09.
- [x] recherche : rajouté les 13 pages manquantes. Fait le 14/09.
- [x] `components/sheet-content.tsx` : y'avait une `</div>` en trop qui faisait planter le build (vu le 14/09 en lançant `npm run build`). Réparé + bouton partager branché.
- [x] `npm run lint` : script viré le 14/09 (eslint était pas installé, ça induisait en erreur). Le check c'est la CI qui fait `npm run build`. Reste à faire : installer eslint pour de vrai + nettoyer les erreurs `tsc` (19 le 14/09, toutes pré-existantes dans `carbon-calculator`, `leaflet-map`, `search-dialog`... aucune dans les fichiers touchés depuis, vérifié).
- [x] `ui/sonner.tsx` : 8e orphelin supprimé le 14/09 (personne l'importait, il crachait depuis la désinstall du paquet `sonner`).
- [x] `out/` vérifié le 14/09 : pas de sous-dossier `greenit` dedans, `index.html` + `manifest.json` + `sw.js` à la racine -> le `COPY out -> html/greenit` du Dockerfile est bon, pas de double nid.
- [x] `/outils` découpé le 14/09 : 6 modules dans `components/outils/` chargés en `dynamic` (`ssr: false`) au lieu d'un seul fichier de 2000+ lignes. Build ok.
- [x] PWA finie le 14/09 : icônes 192/512 générées depuis `apple-icon.webp`, manifest complété, cache SW bumpé `v1.2.0` puis `v1.2.1` (network-first pour les pages, sinon site cassé pour les revenants après chaque déploiement), puis `v1.3.0` le 15/09 (précache `/greenit/offline/`).
- [x] audit navigateur le 14/09 (Chromium sur l'export prod en local) : 24 images sans `/greenit` réparées, 31 boutons-dans-liens en `asChild`, recherche en français, onglets au clavier, skip-link + Escape testés. Détail dans `changelog.md`.
- [x] `website-carbon` : fini les résultats en `Math.random()` — estimateur honnête (poids saisi par l'utilisateur, green-check GWF en direct, formule SWD v4 affichée + mentions, boutons imprimer/partager branchés). Fait le 14/09, build ok.
- [x] `actualites` : fini les fausses dépêches attribuées à de vrais organismes + le faux « flux en direct » — encarts « À la une » marqués exemples (rédaction du site, sujets vrais), onglet Veille devenu un annuaire de sources externes. Fait le 14/09, build ok.
- [x] `problematiques` : chiffres P0 corrigés (e-déchets trajectoire GEM 2024, recyclage 22,3 %, export illégal minoritaire, IA ~0,3 Wh, SD ~0,7 Go/h, lithium ×3 2017-2022, 62 % renouvellements ADEME 2026, UE 5 ans màj + 7 ans pièces, eau 12 000 L, TSMC ~67 %, Ghana/Nigeria chiffrés). Stabilisé à la main le 15/09 après interruption d'un sous-agent, build + export vérifiés.
- [x] `datacenters` + `cas-pratiques` : chiffres P0 corrigés à la main le 15/09 (415 TWh AIE 2024, PUE 1,56 monde / 1,45 Europe Uptime 2024, camembert 64/28/8, portable = Paris-Marseille AR, 800 kWh ≈ 2 mois, serveurs 3-5 ans, RAM nuancée, CTA branchés /agir + /outils, section Sources remplie). Build + export vérifiés.
- [x] `faq` + `reglementation` : droit P0 corrigé à la main le 15/09 (CSRD Omnibus I, réparation applicable 31/07/2026 +12 mois, bonus 10-65 € / smartphone 25 € QualiRépar, garantie 2 ans, indice durabilité réécrit + étiquette UE, DEEE réexamen en cours, REEN douteux retirés, 85 % / 65 % / 1,76 g / 57x / 2,7 Mt / 88 % corrigés, label NR ~350, Energy Star sans nombre). Build + export vérifiés.
- [x] `agir` + `guide` + `developpement` : conseils et code corrigés à la main le 15/09 (apps arrière-plan retirées, Wi-Fi ~4-5x, box ~5 €/an, heures creuses nuancées, Lilo retiré, durées 5 ans, O(n²) 1 000x, Prisma valide, WebP ~30 %, autoplay/graphQL/serverless nuancés, Pereira 2017). Build + export vérifiés, balayage non-régression ok.
- [x] Boutons/ancres morts branchés à la main le 15/09 (CTA `agir`/`recyclage`/`perspectives` → vraies pages, PDF recyclage lié, Exporter `chiffres` → Imprimer, certificat quiz → Imprimer, ancres `par-ou-commencer` sans fragment, bouton ZIP retiré). PDF régénéré (2 kg ≈ 17 km, hiérarchie réduite > réparer > réemployer > recycler). Build + export vérifiés.
- [x] Soldes des oublis P0 le 15/09 (phase A du plan) : accueil (`74,7 Mt` → ~70 Mt GEM 2024, 78 % → ~80 % ADEME-Arcep 2023, 4 % → 3,4 % EENM 2025, 2,3 ans → 2-3 ans ADEME 2026), `mythes` (22,3 %, Wi-Fi 4-5x, sources réelles), `fiches-pratiques` (box ~26 kWh, Wi-Fi 4-5x, Python 76x, recyclage ~79 %, ~2 kg, garantie 2 ans, `quefairedemesdechets.ademe.fr`), durées `problematiques`/`perspectives`, arbres `comprendre` (2,5), sources des 4 outils, badges 2026, recherche (39 entrées : fiches + modèles + annexes), docs internes. Vérifié : `tsc`, build, export sans ancienne valeur.
- [x] Quiz contenu corrigé le 15/09 (100 questions) : terres rares/métaux séparés, durée de vie 2-3 ans, part mondiale 3,4 %/1,8 Gt, box 50-100 kWh, pièces 7 ans (UE 2023/1670), AGEC 2020, PUE 1,56, datacenters 415 TWh/1,5 %, bots 51 %, PUE/WUE/dark mode (Purdue 2021), BYOD redéfini, sources fictives virées (ADEME 2025 vague, ARCEP 2025, IEA 2025, TCO/ROI/Radicati), chiffres non sourcés remplacés par des questions conceptuelles. Moteur : niveau sur le max réel, division par zéro, Fisher-Yates, timer continu, attestation ≥ 60 % avec impression dédiée, réponses en `radiogroup`/`radio` + `aria-live`. Vérifié : `tsc`, build, export, test navigateur `/greenit/` (35/140 = 25 %, score moyen 4, bouton résultat) et CSS d'impression présent.
- [x] Vague B le 15/09 (contenu faux + images) : `perspectives` (×3 2050, 0,3 Wh, cloud mutualisé), `guide-sensibilisation` (3,4 %, 100 M tiroirs, 75 %), `charte` (3,4 %/1,8 Gt), `comprendre` (250 kWh, Paris-Marseille, 18 Go, 22 %, 50 kg/12 000 L), `problematiques` (4,7 ans retiré, 46 %, 79/16/5), `chiffres` (tablette 63, écran 350, 1,6 Mt/24 kg), `carbon-calculator` (Paris-Marseille AR), `growth-animation` (linéaire), `sobriety` (mails ~1 %), `cloud-comparator` (objectifs/legende PUE), `enterprise-simulator` (0,20 €/kWh, 60 €/an, 22 kg), fiches (REP, 75 %, 30 %, Fairphone/Samsung), `a-propos` (3,4 %, ×3 2050, 2026). Images : `img_ori_non_opti/` sorti de `public/` (local, gitignoré), 18 orphelines supprimées (dont 3 webp leaflet), `sustainable-coding` webp, `og-cover.jpg` (94 Ko), screenshots webp, `co2-distribution`/`lifecycle-infographic` retirés et ressources rebranchées. Vérifié : `tsc`, build, export sans référence morte, navigateur, `out/` ~21 → 13 Mo.
- [x] Périmètre C le 15/09 : bloc Sources ajouté aux 8 fiches (`sheet-content` + `sources[]`), `sitemap.ts` + `sitemap-page` complets (8 fiches, actualites, faq, mythes, par-ou-commencer, guide, modeles, mentions-legales, offline), filtres catégories `modeles` branchés + formats PDF réels + grille 26 critères, années relatives `plan-action-dsi`, RAM 8 Go `politique-numerique`, chiffres harmonisés (169/248/50 kg, cas-pratiques 62 %, sources complétées), cahier des charges/guide sensibilisation/tableau de bord sourcés. `.gitignore` audit corrigé. Vérifié : `tsc`, build, export (sitemap 9 URLs fiches, « Sources » présent, 26 critères, 0 « 4 Go RAM »), navigateur (filtres 8→1→8, bloc Sources).
- [x] Finalisation D le 15/09 (commits `91ba803` → `7b6fa85`) : reliquats de contenu sourcés (`reglementation`, `developpement`, `problematiques`, `recyclage`, `chiffres`, `comprendre`, `cas-pratiques`, fiches, `mythes`, modèles, simulateurs, perspectives), `canonical` par page, PWA offline précachée, sitemap à jour, breadcrumb complet, infobulles `SourceTooltip` source + calcul sur les chiffres clés, contrastes WCAG corrigés. Vérifié : `tsc`, build, export, Firefox + WebKit (8 pages, 0 erreur nouvelle), captures.
- [x] Images le 15/09 (commit `f1e2e6b`) : infographie smartphone en français (SVG → webp 98 Ko, chiffres ADEME 2023), `comparison-chart` charabia supprimé (jamais affiché). Agnes essayé mais texte illisible → repli déterministe.
- [x] Reste soldé le 15/09 : 16 erreurs `tsc` corrigées (`@types/leaflet` devDep, `LabeledSlider` typé, `SearchDialog` typé — 0 restante), langage harmonisé (vouvoiement, `%`, `CO₂e`, guillemets, PUE/WUE, plus d'injonctions), reliquats (lien ecosystem, ancre outils, images mortes, chiffres FAQ/guide/datacenters sourcés), docs (SW v1.3.0). Vérifié : `tsc` 0 erreur, build, export.
- [x] Contre-audit des fichiers d'audit le 15/09 : valeurs canoniques §9/§10 re-vérifiées, reliquats corrigés (développement JS ×4,45/GPT-3, ISO, fournisseurs DC attribués, water fourchette, ranges reconditionné, comparateur cloud, images FR restantes régénérées). Vérifié : `tsc` 0 erreur, build, export.
- [x] Contrôle complémentaire le 15/09 : outils fiabilisés (facteurs, cas limites, libellés), faits alignés (production vs collecte, unités), pédagogie (glossaire, parcours, liens), bug basePath corrigé. Vérifié : `tsc` 0 erreur, build, export, outils testés.
- [x] Passe exhaustive du 15/09 : fiches, modèles, composants jamais audités (couleurs Tailwind manquantes, liens fiches, grille, 404/offline noindex, zoom clavier, plan du site complété). Vérifié : `tsc` 0 erreur, build, export, navigateur.
- [x] Finitions techniques du 15/09 : hygiène (0 vuln), a11y (axe 0, reduced-motion, focus, h1), perf (Lighthouse ≥94, jspdf dynamique, export PDF réparé), SEO (JSON-LD + OG par page). Vérifié : `tsc` 0 erreur, build, export, navigateurs.
- [ ] Reste : déploiement en ligne en retard (SW `v1.1.0` servi, dépôt en `v1.3.0`) — resynchroniser côté hébergement ; `robots.txt` racine du domaine (hors dépôt) ; checklist lecteur d'écran réel (NVDA) ; `target-size` des marqueurs Leaflet (clustering) ; bruit console `_rsc` (cosmétique connu). Optionnel : eslint, e2e auto, i18n.

## 🔴 important mais pas cassé

- [x] testé Chromium + Firefox + WebKit (moteur Safari) en prod `/greenit/` le 15/09 (8 pages, 0 erreur nouvelle). Reste : Safari réel sur Mac, à confirmer si possible.
- [ ] tester mobile plusieurs tailles (+ lecteur d'écran NVDA/VoiceOver pour de vrai)
- [ ] bruit console : les prefetch Next (`*_rsc`, `__PAGE__.txt` en 404) sur l'export statique. Cosmétique (la navigation retombe sur la page complète), mais à surveiller si Next propose une option propre un jour.
- [x] breadcrumb : labels `guide`/`mentions-legales`/`offline` ajoutés + `aria-label` "Fil d'Ariane" (fait le 14/09).
- [x] emoji 🎯 masqué aux lecteurs d'écran (fait le 14/09).
- [x] titres uniques par page (fait le 14/09) : template + 19 layouts + 4 pages serveur. Les pages `"use client"` ne peuvent pas exporter `metadata`, d'où les mini-layouts.
- [x] page 404 (fait le 14/09) : `not-found.tsx` + nginx `error_page`. Fil d'Ariane `_not found` -> fix hydratation.
- [x] image OG 1200x630 (fait le 14/09, recompressée en jpg 94 Ko le 15/09) : générée avec Agnes, sans texte (le modèle écrit mal le français), `og-cover.jpg`.
- [x] screenshots PWA (fait le 14/09) : vraies captures, déclarés dans le manifest.
- [x] print CSS (fait le 14/09) : nav/footer masqués, fond blanc.
- [ ] chasser les liens morts (un petit `lychee` sur `out/` après build, ça serait bien)
- [ ] audit contrastes WCAG au cas par cas (le clavier est testé : skip-link, menus, onglets, Escape — voir changelog du 14/09)
- [x] sitemap.xml -> fait (`sitemap.ts` + robots), complété (offline + modeles + 8 fiches détail)
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
- [x] Quiz v2 le 15/09 : reprise de session (tous modes, y compris après rechargement ; en Défi le chrono continue de s'écouler et les questions non répondues sont marquées « Non répondu »), dernière session terminée conservée avec bandeau « Derniers résultats » (Revoir/Refaire), révision des erreurs en accordéon (votre réponse, bonne réponse, explication, source) et « Rejouer mes erreurs » en session `review` sans attestation. Stockage local `greenit-quiz-session-v1` versionné (session invalidée si les questions changent), mentions légales complétées. Vérifié : 12 tests node du stockage, parcours playwright (reprise onglet/reload, rejeu, Défi expiré), axe 0, Firefox/WebKit 0.
- [ ] SEO / analytics / temps de chargement / backlinks

## ✅ fait

- 13/09 : passage docs en minuscules + gitignore local + relecture pessimiste (sans toucher au code)
- 13/09 (avant) : réécriture readme + agents/structure/features, todo reclassé, changelog fixé (dates 2025 -> 2026/2027, Geist -> Poppins/Inter)
- janvier 2026 : PWA, carte leaflet, PDF audit/entreprise + guide recyclage, webp partout, docker/nginx, sitemap/robots, fix TS
- 2025-2026 : accueil, comprendre, chiffres, outils de base, recyclage, datacenters, svg animées, Next 16 / React 19, docs de base

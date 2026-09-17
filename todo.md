# todo

Ma liste, mise à jour le 15/09/2026 après une grosse relecture pessimiste (lecture seule, j'ai rien cassé, promis).

## ✅ plan design — audit du 16/09/2026 — implémenté (vagues A à E)

Détail dans `audit-design-2026-09.md`, implémenté le 16/09 sans toucher aux contenus ni aux données.
- [x] Vague A (fondations) : tokens `--warning` (corrige l'encart `a-propos`), utilitaires thématiques (`bg-theme`, `text-theme`, `bg-theme-soft`, `text-theme-ink`, `border-theme`) + 9 `data-theme`, effets (`lift`, `glow-theme`, `icon-shift`, `link-slide`, `reveal`), `motion-off`, `lib/chart-theme.ts`, `lib/motion.tsx` + `MotionToggle`, 4 illustrations rapatriées dans `public/images/`, règles ajoutées à `AGENTS.md`.
- [x] Vague B (chrome) : `PageHero` partagé, navigation/footer/breadcrumb/`theme-toggle` vers tokens, bandeau footer en `warning`, `link-slide` sur les liens, `MotionToggle` dans le footer, clé `greenit-motion` documentée (`mentions-legales`).
- [x] Vague C (héros) : 16 héros migrés vers `PageHero` + `data-theme` (badges restaurés après assouplissement icon/label optionnels).
- [x] Vague D (pages) : Recharts via `chart-theme` (0 hex restant dans les 12 fichiers), tokens mécaniques, `lift` sur cartes sans hover, `dark:` complétés, `gray` → tokens, `✓` → `Check` lucide (modèles + cas-pratiques), loadings en tokens.
- [x] Vague E (finitions) : emojis → lucide (comprendre, cloud, it-audit, reglementation, rss), contrôles natifs teintés (`accent-color`), `quality` 85 partout, `useState` mort supprimé (`developpement`).
- [x] Vérifié : `tsc` 0 erreur, build OK, utilitaires theme présents dans l'export, 0 `pageerror` sur 4 pages (accueil, problematiques, outils, par-ou-commencer), hero rouge dark + light capturés, onglets outils + quiz + toggle motion testés, 0 emoji/`gray-`/hex résiduel (grep).
- [x] Illustrations générées et branchées le 16/09 : 18 JPEG reçus (`D:\Downloads\images_pour_greenit\`), rapprochés par nom, convertis webp 70 % dans `public/images/` (8 à 70 Ko, tous < 150 Ko), branchés en prop `image` de `PageHero` (15 héros) + hero `outils`/`recyclage` + `offline`/`404` (partagée), dimensions `PageHero` alignées (1376×768). Vérifié : build, 22 pages balayées (0 `pageerror`, 0 image cassée — 1 faux positif lazy), captures mythes/agir.
- [x] Phase 1 animations le 16/09 : `Reveal` (23 sections developpement/reglementation/problematiques, héros + 1ères sections exclus anti-flash, `guide` écarté car sans sections), `icon-shift` × 12 + `active:scale` × 5 sur l'accueil, feedback « Copié ! » × 3. Vérifié : build, reveals 10/10-4/4-9/9, motion-off, 0 pageerror.
- [x] Phase 2 animations le 16/09 : `CountUp` × 11 (accueil/chiffres/datacenters), `Ticker` accueil (CSS pur), `Sommaire` developpement (7) + reglementation (4), `LifespanSlider` cas-pratiques (2e instance écartée : pas de binaire franc sur developpement), `ReadingProgress` × 5 pages. Vérifié : build, valeurs finales, scrollspy, slider, progression, motion-off, 0 pageerror.
- [x] Phase 3 animations (code) le 16/09 : `SectionDivider` × 6 pages, `.texture-dots` × 3 CTA, `hero-float` via `PageHero`. Vérifié : build, navigateur, motion-off, 0 pageerror.
- [x] Illustrations phase 3 branchées le 16/09 (soir) : 4 JPEG rapprochés par nom, webp 70 % (11 à 16 Ko), 4 slots avec alts français. Vérifié : build, captures, 0 pageerror.
- [x] Balayage dark complet le 16/09 au soir (7 pages pixel par pixel : accueil, developpement, reglementation, problematiques — hero + section futur + CTA —, chiffres, datacenters, recyclage ; `cas-pratiques` déjà fait la veille) : tout lisible, graphiques adaptés (`useChartTheme`), dégradés et CTA OK, 0 `pageerror`. `developpement` `dark:bg-slate-950` requalifié : simple alternance de sections, choix assumé, pas un bug. Écartés assumés (passe pessimiste) : `website-carbon` gray/slate + `carbon-calculator` blue — variantes `dark:` complètes, rendu vérifié, uniformiser vers les tokens changerait les teintes pour zéro gain visible (contraire à « modif minimale »). Reste : NVDA (checklist ci-dessous) ; 404 RSC `__next.*__PAGE__.txt` au prefetch sous serveur statique (préexistantes, à étudier).

## ✅ plan d'amélioration — audit contenu du 15/09/2026 (soir) — implémenté

Passage de contrôle : 6 sous-agents en lecture seule, contre-vérification à la main dans le code ET sur sources officielles en ligne, puis implémentation par vagues et vérification manuelle des données. Commits : `fcd02d6` (A), `f9c2a43` (B), `5497517` (C), `9682f5c` (D), `3e8106d` (docs), `2c0021f` (vérification). Vérifié : `tsc` 0 erreur, build 42 pages, `out/` contrôlé (classes CSS, icônes, manifest), test navigateur sous `/greenit/`. Détail dans `changelog.md`.

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
- [x] Typo : `check:typo` créé, `CO2 → CO₂/CO₂e` et « d'e-déchets » faits ; première passe « % » faite à la main sur les pages de contenu (accueil, chiffres, comprendre, cas-pratiques, datacenters, developpement, fiches, perspectives, recyclage, reglementation, quiz, FAQ).
- [x] Typo : `CO2 → CO₂/CO₂e`, « d'e-déchets », coquilles (« filière agréée », « Mise à jour », « avant d'envisager ») et **tous les « % » du texte visible** faits (vérification ligne par ligne : 114 lignes modifiées, uniquement l'espace avant %, aucune valeur touchée). Il ne reste que du code (largeurs CSS, shadcn) listé par `npm run check:typo`.
- [x] Mobile : **0 débordement horizontal sur les 30 routes** à 320, 390 et 768 px (tableaux en `overflow-x-auto`, en-têtes qui passent à la ligne, fil d'Ariane qui wrap, pas d'étapes réduit, cartes `min-w-0`).
- [x] Logs : `console.log` du service worker et du bouton Installer supprimés.
- [x] Divers : emojis retirés des titres/boutons/labels au profit de lucide (pédagogique conservé) et **34 fichiers `ui/` + 2 hooks orphelins supprimés** (`components/ui` passe de 49 à 15 fichiers). Commit `24b38a8`.
- [x] Vérifié le 15/09 au soir : prospective ADEME-Arcep « ×3 d'ici 2050 » **confirmée** (communiqué ministères du 07/03/2023 : « l'empreinte carbone du numérique pourrait tripler entre 2020 et 2050 ») ; GR491 déplacé → `gr491.isit-europe.org` (fiche corrigée) ; « 70 kg » smartphone confirmé par le **SDES/ministère** (infographie du 11/04/2025) ; « 200 kg MIPS » du quiz non sourcé → question Q76 reformulée (commit `7f977c5`).
- [x] ⚠️ Migration **ADEME 2025** faite (commit `609e714`) : smartphone 50→80 kg (fabrication 79, 99 % du carbone), tablette 87, portable 193, fixe 259 (pro), écran 93, TV 370 ; facteurs des outils, pages, modèles et quiz alignés ; le « 20 % carbone » devient explicitement « ~1 % carbone / ~20 % tous indicateurs ».
- [x] Quiz : les anomalies de l'audit avaient déjà été traitées (100 questions reprises le 15/09) ; balayage complémentaire → 4 corrections (467 fois, Q70 étiquette 2023/1669, Q76 MIPS, « questions répondues »), `QUIZ_CONTENT_VERSION` = 3. Pas de relecture intégrale nécessaire.

### méthode

- [x] Une vague = un lot de modifs + `tsc` + build + contrôle de l'export.
- [x] Sources vérifiées en ligne le 15/09 au soir : EUR-Lex (2023/1670 : 5 ans de màj OS, 7 ans de pièces, 20/06/2025 ; 2024/1799 : +12 mois après réparation, 31/07/2026), ecologie.gouv.fr + service-public (durabilité : TV janvier 2025, lave-linge 8 avril 2025), IEA Energy and AI avril 2025 (415 TWh, 1,5 %, 945 TWh en 2030), UNITAR GEM 2024 (62 Mt, 22,3 %, 82 Mt en 2030), étude Green IT monde 2025 PDF (1,8 Gt CO₂e en 2023, 3,4 %), Microsoft/DCD (Project Natick arrêté en 2024).
- [x] Contre-audit du plan lui-même avant exécution : 4 erreurs corrigées (étiquette 2023/1669, Uptime déjà sourcé, 30 orphelins `ui/` et pas 29, mythes bien au nombre de 12).
- [x] Contre-audit **manuel complet** des données (pas un échantillon) : balayage des valeurs canoniques sur tout `app/` + `components/`. Corrigés : −87 % résiduel (`cas-pratiques:258`), quiz Q70 étiquette 2023/1669 (et non 1670), `mythes:90` 75 % attribué ADEME-Arcep 2023 (et non 2026), 10 % électricité mondiale non sourcé retiré (`problematiques:115`), « recycle 46 % » → « collecte 46 % » + 22,3 % (`chiffres`), 22 % → 22,3 % (`comprendre`), fourchette « −75 à −91 % » retirée du footer (`cas-pratiques`, pas de source), « 5 à 10 ans » inventé retiré (FAQ, directive 2024/1799), PUE « 1.0 »/« 1.2 » → « 1,0 »/« 1,2 ». Commit `2c0021f`.

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
- [x] Serveur de test local réparé le 16/09 (`scripts/greenit-server.js` ignorait le basePath `/greenit` → accueil servi partout, JS/CSS en HTML) + SW `v1.3.3` (purge auto du cache empoisonné + garde content-type script/style). Vérifié : build, 0 erreur console, parcours profil cliquable.
- [ ] Reste : déploiement en ligne en retard (SW `v1.1.0` servi, dépôt en `v1.4.1`) — resynchroniser côté hébergement ; `robots.txt` racine du domaine (hors dépôt) ; checklist lecteur d'écran réel (NVDA, pas faisable en test auto — à faire à la main) : héros `PageHero` (ordre badge → titre → intro → image, alts FR), ticker (2e moitié ignorée, lien `/chiffres` annoncé une fois), compteurs (valeurs finales lues, pas d'intermédiaires), sommaires (nav « Sommaire de la page », `aria-current` suivi), `LifespanSlider` (curseur natif + résultat en `aria-live`), quiz (radiogroup, attestation), éCO2mix (bouton Actualiser, états chargement/erreur/fallback), `ReadingProgress`/`SectionDivider` ignorés (décoratifs) ; `target-size` des marqueurs Leaflet (clustering) ; bruit console `_rsc` (cosmétique connu). Optionnel : eslint, e2e auto, i18n.

## 🔴 important mais pas cassé

- [x] testé Chromium + Firefox + WebKit (moteur Safari) en prod `/greenit/` le 15/09 (8 pages, 0 erreur nouvelle). Reste : Safari réel sur Mac, à confirmer si possible.
- [x] passe e2e + vision le 17/09 au soir (Chromium, export local `/greenit/`) : 63 pages, 3 101 liens (0 mort), JSON-LD 91/91, 8 outils, quiz, Leaflet, éCO2mix, recherche insensible aux accents (corrigée), 5 captures dark/light/mobile. 3 correctifs (recherche, espace hero, image 166 → 83 Ko). Détail dans `changelog.md`.
- [x] sweep responsive le 17/09 dans la nuit (60 routes × 390/768/1024/1440, script `sweep/` en temp) : 3 bugs flex corrigés (cartes problematiques, boutons fiches, nav) + libellé recyclage. 0 débordement aux 4 largeurs. Détail dans `changelog.md`.
- [x] tester mobile plusieurs tailles : 320 / 390 / 768 px passés sur les 30 routes, 0 débordement (fix du 15/09 au soir, commit `1068cea`). Reste : lecteur d'écran NVDA/VoiceOver pour de vrai.
- [ ] bruit console : les prefetch Next (`*_rsc`, `__PAGE__.txt` en 404) sur l'export statique. Cosmétique (la navigation retombe sur la page complète), mais à surveiller si Next propose une option propre un jour.
- [x] breadcrumb : labels `guide`/`mentions-legales`/`offline` ajoutés + `aria-label` "Fil d'Ariane" (fait le 14/09).
- [x] emoji 🎯 masqué aux lecteurs d'écran (fait le 14/09).
- [x] titres uniques par page (fait le 14/09) : template + 19 layouts + 4 pages serveur. Les pages `"use client"` ne peuvent pas exporter `metadata`, d'où les mini-layouts.
- [x] page 404 (fait le 14/09) : `not-found.tsx` + nginx `error_page`. Fil d'Ariane `_not found` -> fix hydratation.
- [x] image OG 1200x630 (fait le 14/09, recompressée en jpg 94 Ko le 15/09) : générée avec Agnes, sans texte (le modèle écrit mal le français), `og-cover.jpg`.
- [x] screenshots PWA (fait le 14/09) : vraies captures, déclarés dans le manifest.
- [x] print CSS (fait le 14/09) : nav/footer masqués, fond blanc.
- [x] chasser les liens morts : contrôle maison de l'export (1 935 liens internes, 0 cassé ; 29 externes testés, seuls des 403 anti-bot et l'ancien domaine GR491 mort, corrigé).
- [x] audit contrastes WCAG au cas par cas : axe-core (WCAG 2.0/2.1 A/AA) sur **31 routes en dark = 0 violation** (commits `2c0021f`, `b411973` ; le clavier est testé : skip-link, menus, onglets, Escape — voir changelog du 14/09)
- [x] retester le dark partout : couvert par la passe axe du 15/09 au soir (commits `2c0021f`, `b411973` : fonds clairs sans variante dark corrigés, badges 600→700, textes sur fonds sombres, curseurs nommés, `role=group` sur le SVG langages).
- [x] sitemap.xml -> fait (`sitemap.ts` + robots), complété (offline + modeles + 8 fiches détail)
- [x] redirects 301 -> fait dans nginx (`/` -> `/greenit/`)
- [x] retester le dark partout : couvert par la passe axe du 15/09 au soir + axe dark/light du 16/09 au soir (8 pages en light, `cas-pratiques` complété en dark)

## 🟠 contenu, plus tard

- [x] section "Fin de vie & Recyclage" ajoutée au guide (fait le 14/09)
- [x] success stories avec des vrais cas : 3 portraits faits le 17/09 en articles blog (Back Market, Fairphone, Envie — faits publics vérifiés à la main, sans logo, sans autorisation nécessaire pour des faits) ; autorisations écrites requises seulement avant logo, photos ou données non publiées
- [x] vidéos le 17/09 : section « Vidéos » dans `/ressources` (collection Canal-U « Sobriété numérique » UVED/Alt IMPACT vérifiée à la main : 1 intégrée en lecture au clic via oEmbed officiel + 5 cartes avec durée et lien, licence CC BY-NC-SA rappelée). Reste : contrôle trimestriel des liens (vidéos Canal-U incluses) ; visuel du portrait Back Market branché le 17/09 (`blog-back-market-portrait.webp`) ; 5 vidéos intégrées au clic le 17/09 au soir ; maillage blog vers fiches et retour fait le 17/09.
- [x] blog, 5 articles fait le 17/09 (`/blog` : audit PME, reconditionné vs neuf, PUE en 5 min, AGEC/REEN, un an avec un smartphone réparable — pages serveur, sources + année, dépliables `more-details`, câblage navigation/sitemap/recherche/plan/fil d’Ariane). Visuels générés et branchés le 17/09 (12 webp 70 % 1376×768 : 6 vignettes fiches, hero + 5 vignettes + 5 héros blog). Widgets : 1 par article (checklist, calculateur grade, mini PUE, frise, quiz).
- [ ] page "Choisir son FAI / sa box" ? (données Arcep : comparer Wi-Fi vs 4G/5G, box allumée 24/7) — à sourcer avant d'écrire
- [x] veille RSS (léger) : fait le 16/09 (`components/rss-feed.tsx` + section « Dernières nouvelles » dans l'onglet Veille d'`/actualites`). 8 flux en liste blanche (FR : GreenIT.fr, INR, Shift Project, Next.ink, Numerama ; EN : Data Center Dynamics, The Register, UNEP), chargés côté client à la demande (titres + date + lien + média, jamais de copie), recherche directe si CORS sinon rss2json.com, états de chargement/erreur par flux, bouton Actualiser, mention dans `mentions-legales`. Écartés : ADEME et Arcep (aucun flux exploitable : WAF/proxy), AIE (pas de flux), actu-environnement (404). Vérifié : axe 0 en dark, 0 débordement 320/390, tsc/build.
- [x] chiffres « en direct » via API gratuites : fait (existant `eco2mix-live` sur `/chiffres` et `/datacenters` : ODRE/RTE temps réel côté client, cache 10 min, fallback « référence », bouton Actualiser) + enrichi le 17/09 de 2 blocs dépliables pédagogiques (origine de la donnée avec lien ODRE vérifié, pourquoi le taux bouge). Contraintes respectées : pas de backend, pas de clé, mention de repli si l’API ne répond pas.
- [x] FAQ : questions « Le cloud c'est vraiment dans des nuages ? » et « Mon vieux PC peut-il encore servir ? » ajoutées (+ une sur l'IA) → 27 questions (commit `64cf9aa`)
- [ ] version anglaise ? abandonnée le 17/09 : site en français uniquement, choix assumé
- [x] infographies en plus, section livres : faite le 17/09 (6 livres vérifiés auteur/éditeur/année dans `/ressources#livres`, liens éditeurs contrôlés) ; reste les infographies
- [x] `guide/` + `mentions-legales/` : commités (le 14/09)
- [x] les 5 outils avancés : fait (site web, entreprise, cloud, audit, quiz)

## 🟠 communauté

- [ ] newsletter, partage social, formulaire contact qui marche, commentaires, page contribuer

## 🟡 un jour

comptes, dashboard, badges, forum, géoloc carte, offline nickel, formation, espace enfants, podcasts, webinaires, i18n, cache, API, tests auto (jest/playwright), anim d'intro, print-friendly, mascotte...

## 📊 fond de roulement

- [x] collecte illustrative le 14/09 (tâche 1 vague 1) : mentions « chiffres illustratifs » + lien ADEME sur `chiffres`/`recyclage`, `15 000+`/`15 000 bornes` neutralisés, fiche `recyclage-mode-emploi` + ressource ADEME. Build ok.
- [x] mythe stockage cloud le 15/09 (tâche 2 vague 1) : `20 kg` / `15 g` / `0,2 kg` -> `0,24 g/Go/an` (ADEME Impact CO2 / Base Empreinte) sur `mythes`/`faq`/fiche `gestes-quotidiens` + facteur calculateur à `0,00024 kg/Go/an`. Build ok.

- [ ] màj chiffres, actus, glossaire, viser 15 fiches, étoffer la FAQ → fait le 15/09 : glossaire 27 termes, FAQ 27 questions, 7e dossier d'actualités (avis ADEME IA 2026), fiche IA ajoutée ; reste : actus au fil de l'eau. Fait le 16/09 au soir : 15 fiches (6 nouvelles — streaming/gaming, télétravail/visio, e-mails/cloud, objets connectés, impression, enfants/école — sources + année vérifiées en ligne, visuels réutilisés en provisoire, vague 4 bienvenue) + 8e dossier (France 2030 EcoIDEN, clôture 29/10/2026, avec lien source officielle)
- [x] Quiz v2 le 15/09 : reprise de session (tous modes, y compris après rechargement ; en Défi le chrono continue de s'écouler et les questions non répondues sont marquées « Non répondu »), dernière session terminée conservée avec bandeau « Derniers résultats » (Revoir/Refaire), révision des erreurs en accordéon (votre réponse, bonne réponse, explication, source) et « Rejouer mes erreurs » en session `review` sans attestation. Stockage local `greenit-quiz-session-v1` versionné (session invalidée si les questions changent), mentions légales complétées. Vérifié : 12 tests node du stockage, parcours playwright (reprise onglet/reload, rejeu, Défi expiré), axe 0, Firefox/WebKit 0.
- [ ] SEO / analytics / temps de chargement / backlinks
- [ ] contrôle trimestriel des liens externes (fait le 17/09 : 16 domaines OK dont 6 en 301 normal et ademe.fr en 403 anti-bot connu, 6 vidéos Canal-U vérifiées dont 5 codes oEmbed récupérés le soir même ; à relancer tous les 3 mois : ressources fiches, vidéos Canal-U, sources blog, veille RSS ; en suspens : URL GreenFrame/EcoIndex non vérifiée)

## ✅ fait

- 13/09 : passage docs en minuscules + gitignore local + relecture pessimiste (sans toucher au code)
- 13/09 (avant) : réécriture readme + agents/structure/features, todo reclassé, changelog fixé (dates 2025 -> 2026/2027, Geist -> Poppins/Inter)
- janvier 2026 : PWA, carte leaflet, PDF audit/entreprise + guide recyclage, webp partout, docker/nginx, sitemap/robots, fix TS
- 2025-2026 : accueil, comprendre, chiffres, outils de base, recyclage, datacenters, svg animées, Next 16 / React 19, docs de base

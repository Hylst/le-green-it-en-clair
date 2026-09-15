# Audit contenu & images — Le Green IT en clair
> **Statut au 15/09/2026 :** les points de cet audit ont été traités par les vagues 1 à 3 (P0 puis P1 ciblé). Ce document reste la référence historique des constats ; l'état final et les reliquats restants sont dans `suivi-audit-2026-09.md` et `todo.md`. Les mentions « à corriger », « 14 orphelines », « alert » ou « 74,7 Mt » décrivent l'état du 14/09, pas l'état actuel.
**Date :** 14 septembre 2026 · **Périmètre :** les 24 pages (`app/page.tsx` + 23 `app/*/page.tsx`), les fiches détaillées (`app/fiches-pratiques/[id]`), toutes les images de `public/`.
**Méthode :** relecture intégrale du code source des pages (~11 000 lignes), examen visuel de 17 images sur 33, 12 recherches web de vérification (sources 2024-2026).
**Références étalons :** Global E-Waste Monitor 2024 (ONU/UNITAR/ITU), ADEME (Base Empreinte, infographie smartphone, étude reconditionné 2022, page agir màj 01/2026), GreenIT EENM 2025 (asso greenit.eco, fév. 2025), The Shift Project (Lean ICT 2018, vidéo 2019, rapport 2024), IEA Energy & AI (avril 2025), Arcep (observatoires 2024-2025, rapport IA & environnement mai 2026), Uptime Institute 2024, service-public.gouv.fr (vérifié 07/2025 et 08/2026), EUR-Lex (règlement 2023/1670, directive 2024/1799), directive Omnibus I (JOUE 26/02/2026).

> Légende : 🔴 faux ou trompeur (à corriger en priorité) · 🟠 incohérence interne (le site se contredit) · 🟡 obsolète / imprécis / non sourcé · 🟢 juste, bien.

---

## 1. Verdict en 30 secondes

| Catégorie | Nombre |
|---|---|
| 🔴 Affirmations fausses ou trompeuses | ~40 (dont 53 M, fiche 20 g/Mo, website-carbon simulé) |
| 🟠 Incohérences internes (2+ versions d'un même chiffre) | ~44 |
| 🟡 Chiffres obsolètes, non sourcés ou à nuancer | ~100 |
| Images-texte en charabia IA | 8 (dont 2 affichées) |
| Images orphelines (poids mort dans l'export) | 14 (~1,6 Mo) + dossier `img_ori_non_opti/` entier |
| Boutons morts (sans action) | 10 + 3 « Exporter » factices |
| Liens d'ancre morts | 4 |
| Pages avec section Sources vide ou absente | 1 vide (`cas-pratiques`), plusieurs sans sources |

**Les 2 urgences déontologiques :** (1) la page `/actualites` présente des **fausses actualités inventées** attribuées à de vrais organismes (ADEME, Commission européenne, The Shift Project…) + un **« flux en direct » simulé** en dur avec pastille rouge pulsante ; (2) les **nombres de points de collecte par ville** sont explicitement des `sample data` inventées, présentées comme réelles. Sur un site éducatif qui revendique la transparence, c'est le point le plus grave.

**La bonne nouvelle :** le socle est sain. Les messages structurants sont justes (fabrication ≈ 3/4 de l'impact smartphone — ADEME ✓ ; 2,5 % des GES français — ADEME-Arcep 2023 ✓ ; 62 Mt de e-déchets en 2022 — GEM 2024 ✓), le ton n'est jamais culpabilisant, et l'avertissement de `/a-propos` (erreurs possibles, sources à consulter) est honnête. Tout ce qui suit est réparable sans refonte.

---

## 2. 🔴 Faux ou trompeurs — à corriger en priorité

### 2.1 Fausses actualités + faux « direct » (`app/actualites/page.tsx`)
- **Les 6 articles « À la une » sont inventés** (variable `newsArticles` en dur, dates déc. 2025–janv. 2026) mais attribués à des sources réelles : « Commission Européenne », « ADEME », « The Shift Project », « TechCrunch », « INR », « Banque des Territoires ». Exemples faux : pas de « directive Droit à la réparation 2.0 » entrée en vigueur le 01/01/2026 avec pièces 12 ans (la vraie nouveauté, c'est la directive 2024/1799 applicable au 31/07/2026, §2.4) ; pas de « label Site Web Éco-conçu < 1 Mo » de l'INR (inexistant à ma connaissance) ; pas de « charte Ville Numérique Responsable signée par 500 mairies » (à vérifier, très probablement inventé) ; « l'IA = 20 % de la conso des datacenters » sans source (l'IEA 2025 dit que l'IA tire ~la moitié de la *croissance*, pas 20 % du total).
- **Le « Flux en direct » est simulé** : `simulatedFeeds` en dur + `setTimeout` de 800 ms, pastille rouge « en direct », bouton « Actualiser » qui ne recharge rien, dates relatives bidon (« Aujourd'hui, 09:30 »). L'utilisateur croit voir un agrégateur RSS temps réel.
- **Recommandation :** soit brancher de vrais flux (fetch au build depuis les flux RSS existants d'ADEME/Arcep/GreenIT.fr — possible en statique, au build), soit transformer la page en « dossiers de fond » datés et signés, soit la retirer. À minima : mention explicite « contenus d'exemple / fictifs » en attendant. Ne JAMAIS attribuer de fausses déclarations à des organismes réels.

### 2.2 Chiffres faux (vérifiés)
| Page | Affirmation | Réalité (source) | Correction |
|---|---|---|---|
| `mythes` (#1) | « Stocker 1 Go dans le cloud pendant un an émet ~20 kg de CO₂ » | **Faux ×80 000** : ADEME Impact CO₂ (Base Empreinte) = **0,24 g/Go/an** (construction DC 53 % + usage 47 %). La FAQ/fiche (15 g) est fausse ×60, le calculateur (200 g) ×800 | Harmoniser sur **0,24 g/Go/an (ADEME)** partout + refondre le message (le stockage n'est pas le levier — cf. §10.14) |
| `problematiques` | « 80 % des e-déchets exportés vers l'Afrique et l'Asie » | Vieux mythe (années 2000, BAN). Aujourd'hui la majorité est traitée localement ; l'export illégal existe mais sans commune mesure. Le GEM 2024 parle d'équipements d'occasion expédiés, pas de 80 % de déchets | Reformuler : export illégal réel mais minoritaire ; citer le GEM 2024 |
| `problematiques`, `cas-pratiques`, `mythes` (#4 : 8 kg ✓) | `cas-pratiques` : reconditionné = 12 kg | ADEME 2022 : neuf ~86 kg GES cycle de vie vs reconditionné ~7 kg ; évite 25 kg GES + 82 kg matières **par année d'usage**, −77 à −91 % | Harmoniser sur **~8 kg** (ADEME 2022), garder « −75 % » comme formulation prudente |
| `faq` | Garantie reconditionné « minimum 6 mois » | **Faux et sous-estimé.** Garantie légale de conformité : **2 ans d'action** pour neuf, occasion ET reconditionné ; défauts présumés antérieurs pendant **24 mois** (neuf et reconditionné) vs 12 mois (simple occasion) — C. conso L.217-7, service-public.gouv.fr vérifié 09/2026. Bonus depuis le 31/07/2026 : réparation sous garantie = **+12 mois** de garantie | Corriger en « garantie légale 2 ans (vices présumés 24 mois pour le reconditionné) » |
| `faq` | « Taux de recyclage : 85 % pour smartphones en Europe » | Faux. Collecte DEEE UE ~42-45 %, recyclage matière bien inférieur | Retirer/remplacer par le taux de collecte Eurostat |
| `faq`, `recyclage` | Objectif « 65 % de collecte **en 2025** » | L'objectif 65 % (moyenne mises sur le marché N-3) court **depuis 2019** (directive DEEE) | Reformuler : « 65 % depuis 2019, rarement atteint » |
| `mythes` (#3), `problematiques` | « 17,4 % recyclés dans le monde » | GEM 2024 : **22,3 %** documentés comme collectés/recyclés en 2022 (17,4 % = GEM 2020, millésime 2019) | Corriger en 22 % + projection 20 % en 2030 (scénario tendanciel GEM) |
| `datacenters`, `cas-pratiques` | « 250 TWh/an dans le monde » | IEA Energy & AI (avril 2025) : **415 TWh en 2024, 1,5 %** de l'élec mondiale, +12 %/an, ~945 TWh projetés en 2030 | Corriger + ajouter la projection |
| `datacenters` | PUE « moyenne mondiale 1,67 » | Uptime Institute 2024 : **1,56** (1,67 = valeur 2020). « Moyenne France 1,5 » sans source (Uptime : Europe 1,45) | Corriger : monde 1,56, Europe 1,45 (Uptime 2024) |
| `datacenters`, `cas-pratiques` | « Refroidissement 40 % » (camembert serveurs 50 / froid 40 / infra 10) | Avec un PUE de 1,56, le *surcoût total* (froid + infra) = 36 %. Le froid seul ≈ 25-35 % | Recalculer le camembert (ex. IT 64 % / froid ~28 % / infra ~8 %) et sourcer |
| `problematiques` | « ChatGPT = 10 à 100× une recherche Google ; 2,9 Wh vs 0,3 Wh » ; `perspectives` : « 10× plus » | Périmé (EPRI 2024). Mesures 2025-2026 convergentes : **~0,3 Wh par prompt texte** (Epoch AI, Altman 0,34, Gemini 0,24, Joule 2026 : 0,31 en médiane) — ≈ une recherche Google. Reste vrai pour raisonnement (3,9-40 Wh), génération d'image (5-15 Wh) / vidéo (30-100 Wh) | Réécrire : « ~0,3 Wh en texte simple (≈ Google) ; ×10 à ×100 pour raisonnement/image/vidéo » + citer Arcep mai 2026 (48 % des Français utilisent l'IA générative) |
| `cas-pratiques` (laptop) | « Fabriquer un portable = un vol Paris-New York » (156 kg) | DGAC : 1 tCO₂e = **1 AR Paris/New-York** ; 1 AR Paris/Marseille ≈ 167 kg. Le portable (156 kg) ≈ **1 AR Paris-Marseille**, pas 1 Paris-NY (×6 d'erreur) | Remplacer l'analogie par « un aller-retour Paris-Marseille en avion » |
| `cas-pratiques` (smartphone) | « 50 kg = vol Paris-Marseille aller simple » | Aller simple ≈ 83 kg (167/2). 50 kg ≈ **300 km en voiture solo** ✓ (celle-là est juste) ou ~600 km en voiture à 2,2 occupants | Garder la voiture, corriger l'avion (ou « ~60 % d'un Paris-Marseille ») |
| `cas-pratiques` (laptop) | « 800 kWh = 8 mois de conso d'un foyer » | Foyer FR ≈ 4 700 kWh/an → 800 kWh ≈ **2 mois**, pas 8 (×4 d'erreur) | Corriger en « ~2 mois » |
| `comprendre` (extraction) | « 250 kWh = 2 mois de conso d'un foyer » | 250 kWh ≈ **2-3 semaines** | Corriger |
| `developpement` | « O(n²) consomme 10 000× plus que O(n) sur 1 000 éléments » | 1 000²/1 000 = **1 000×** (le tableau de la page le montre lui-même : 1 000 000 vs 1 000) | Corriger en 1 000× |
| `developpement` | Carte « WebP : 65 % de réduction vs JPEG » + texte « 50-65 % plus léger » | Le tableau de la même page dit taille relative 65 → **−35 %**. Littérature : WebP ≈ −25 à −35 % à qualité égale | Corriger carte + texte en « ~30 % » |
| `faq` | « Box débranchée la nuit : 65 kWh/an » | Box ~8-10 W × 8 h × 365 j ≈ **23-29 kWh/an** | Corriger (~25 kWh, ~5 €/an — voir aussi §4.7) |
| `faq`, `fiches/[id]` | « 2,5 millions d'appareils reconditionnés en 2024 » vs `problematiques` « 3,2 millions » | Deux valeurs internes + ADEME : 2,8 M en **2020**. Valeur 2024 non vérifiée (Arcep suit le marché : à sourcer) | Harmoniser + sourcer (Arcep) ou dater |
| `comprendre` (transcription) | « 3 arbres pendant 1 an » vs ScaleComparison « 2,5 arbres » | Incohérence interne (les deux sont plausibles : ~15-20 kg/arbre/an) | Harmoniser (2,5) |
| `reglementation` | « Directive DEEE révisée 2023 » | Évaluation/refonte en discussion, **pas de révision adoptée en 2023** | Corriger : « directive 2012/19/UE, réexamen en cours » |
| `reglementation` | Pondérations indice durabilité 35/30/20/15 | **Inventées.** L'indice officiel = 2 notes (réparabilité + fiabilité). Et il ne s'applique (2025) qu'aux TV + lave-linge ; smartphones = **étiquette énergie UE depuis juin 2025** (plus d'indice réparabilité) | Réécrire tout le bloc (§3.3) |
| `guide` | « Wi-Fi consomme 3× moins » (3e version : agir/FAQ 20×, mythes 2×) | Littérature streaming : 4G ≈ **4×** le Wi-Fi (Kamiya) à 6× (Shift 1byte) ; par Go, écarts plus grands selon générations | Harmoniser partout sur « ~4 à 5× moins en streaming » + source, abandonner le « 20× » |
| `problematiques` | « 1h 4K = 6 Go vs 0,3 Go en SD » | Kamiya : SD ≈ **0,7 Go/h**, HD ≈ 3 Go/h, 4K ≈ 7 Go/h | Corriger SD en ~0,7 Go/h |
| `problematiques` | Lithium « +400 % 2015→2025 » | Sans source, non vérifié (la demande a été ×~6 sur 2017-2022 selon l'IEA, mais formulation à sourcer) | Sourcer (IEA Critical Minerals) ou retirer |
| `perspectives`, `a-propos` | « +233 % d'ici 2040 », « doubler d'ici 2030 » | Scénarios maison sans source. Références réelles : ADEME-Arcep tendanciel **+45 % 2020→2030** (FR) ; Shift : trajectoires contrastées | Marquer « scénarios illustratifs » + citer les vrais (ADEME-Arcep +45 %, ITU −45 % 2020→2030) |
| `comprendre` | Durées 2010 du graphique « smartphone 4,7 ans » | Très douteux (ère des subventions 24 mois ; l'ADEME 2026 dit changement « en moyenne tous les 3 ans ») | Refonder le graphique avec des sources ou le retirer |

### 2.3 Droit & réglementation périmés (sept. 2026)
- **CSRD** (`reglementation`) : seuils « >250 salariés », « PME cotées 2026 », « 50 000 entreprises d'ici 2028 » → **obsolète depuis l'Omnibus I** (adoptée 24/02/2026, JOUE 26/02/2026) : seuils cumulatifs **>1 000 salariés ET >450 M€ CA**, ~5 000 entreprises, PME cotées **définitivement exclues**, transposition FR au plus tard 19/03/2027. Timeline « CSRD obligatoire 2025 » à nuancer. À réécrire entièrement.
- **Droit à la réparation** (`reglementation` : « 2027 », `faq` : « adopté 2024, application 2024-2027 ») : la directive 2024/1799 est **applicable depuis le 31 juillet 2026** (service-public.gouv.fr, 10/08/2026) : obligation de réparer hors garantie (prix raisonnable, 5-10 ans selon produit, ~10 catégories dont smartphones/tablettes/TV), garantie **prolongée de 12 mois** (contre 6 avant) si réparation sous garantie, plateforme européenne prévue 2027, et en France dès maintenant : annuaire ADEME « Que faire de mes objets ». Ironie : la page `/actualites` invente un « Droit à la réparation 2.0 » alors que la vraie actu n'est pas traitée.
- **Bonus réparation** (`faq` : « jusqu'à 45 € ») : barème réel 10-65 €, **smartphone = 25 €** (45-60 € = PC portables), +1,5 M de réparations, 6 500+ réparateurs labellisés **QualiRépar** (2025), hors garantie uniquement. Corriger + renvoyer vers l'annuaire officiel plutôt que « ecosystem.eco ».
- **Indice de durabilité** (`reglementation` : « 2024 », `faq` : « dès 2025 ») : en vigueur TV (janv. 2025) + lave-linge (avril 2025) uniquement ; **smartphones = étiquette énergie UE depuis le 20/06/2025** (règlement 2023/1670 : aussi 5 ans de màj OS, 7 ans de pièces, batterie 800 cycles/80 %). Le site n'en parle nulle part : c'est LE complément 2025-2026 manquant (à ajouter dans `reglementation` + `problematiques` + `faq`).
- **REEN** (`reglementation`) : « Entreprises >50 salariés : sensibilisation » — mesure non retrouvée dans la loi, à vérifier ou retirer. « Datacenters >1 MW : publication PUE/WUE » — à vérifier (décret d'application ?).

### 2.4 Boutons morts & liens morts (UX + crédibilité)
- `agir` : CTA « Calculer mon empreinte » et « Voir les points de collecte » **sans lien ni action** ; carte « Télécharger le PDF » **sans fichier cible** (le seul PDF du site est le guide recyclage, lié uniquement depuis `/guide`).
- `datacenters` : CTA « Voir les actions concrètes » + « Calculer mon empreinte » sans lien.
- `recyclage` : CTA « Trouver un point de collecte » + « Télécharger le guide » sans lien.
- `chiffres` : 3 boutons « Exporter » → `alert("fonctionnalité à implémenter")` (placeholder visible par l'utilisateur).
- 🔴 **`website-carbon-calculator` : résultats SIMULÉS.** L'« analyse » d'URL renvoie `mockResults` en `Math.random()` (poids, CO₂/visite, scores Lighthouse, hébergeur vert !). Pire : elle cite une méthodologie imaginaire (« Sustainable Web Design Model **2025** », « 0,81 g CO₂e/GB » — la v4 date de 2024, formule 0,194 kWh/GB × 494 g/kWh). Même famille que le faux flux RSS. **Design validé le 14/09** : estimateur hybride — poids saisi par l'utilisateur (aide PageSpeed/DevTools), green-check en direct via l'API gratuite Green Web Foundation, calcul local SWD v4 affiché + mentions, liens vers les vrais outils (websitecarbon.com, ecoindex.fr). Spec locale : `Temp/opencode/specs/2026-09-14-website-carbon-design.md`.
- `quiz` (écran de résultats) : bouton « Télécharger le certificat » **sans handler** (mort). `website-carbon` (rapport) : boutons « Télécharger le rapport PDF » et « Partager » **sans handler** (morts) → à brancher sur les patterns print/share des autres outils ou retirer.
- `par-ou-commencer` : 4 ancres mortes — `/developpement#optimisation`, `/developpement#langages` (aucun `id` dans la page), `/agir#entreprise`, `/agir#collectivite` (contenu conditionnel par onglets, ancre impossible). Vérifié par grep : zéro `id=` dans ces deux pages.
- `cas-pratiques` : section « Sources » **vide** (`{/* Sources content here */}`).
- Fiche détail `achat-responsable` : « Consultez sur **quefaire.fr** » — mauvais domaine (le vrai : **quefairedemesdechets.ademe.fr**), 2 occurrences.

---

## 3. 🟠 Incohérences internes — tableau de concordance

Un même chiffre ne doit exister qu'en UNE version. État relevé :

| Chiffre | Versions trouvées | Valeur à retenir (source) |
|---|---|---|
| E-déchets monde 2025 | **74,7 Mt** (home, `problematiques`) vs **69,8 Mt** (`chiffres`) | **~69-70 Mt** : trajectoire GEM (62 en 2022 → 82 en 2030, +2,6 Mt/an). C'est `chiffres` qui a raison ; corriger home + `problematiques` (+ le « +67 % en 10 ans » et « 72 Mt début 2026 » → ~72 ✓ OK) |
| Recyclage France | 45 % (`comprendre`, `recyclage`, `mythes` #3) vs **46 %** (`chiffres`) vs **55 %** (`problematiques`, deux fois) | 55 % non sourcé et contredit par le reste → **harmoniser à 45-46 %** (Ecosystem/Eurostat, à dater précisément) |
| Recyclage monde | 20 % (`comprendre`, `recyclage`) vs 22 % (`chiffres`) vs 17,4 % (`problematiques`, `mythes`) | **22 %** (GEM 2024) partout |
| Fabrication / empreinte smartphone | 75 % (home, quiz, `comprendre`, `cas-pratiques`, `faq`) vs **60 %** (`chiffres`, camembert + point clé + résumé) | Les deux sont défendables avec des périmètres différents (ADEME : fabrication ≈ 3/4 **tous impacts** ; le camembert CO₂ du site met fabrication 60 + extraction 15 = 75 %). **Expliciter** : « 75 % fabrication + extraction » vs camembert, ou refondre le camembert. À l'échelle France tous équipements : **nouveau scope ADEME-Arcep 2025** (données 2022) = terminaux 50 % / datacenters 46 % / réseaux 4 %, fabrication 60 % / usage 40 % — l'ancien « 78 % équipements » (ADEME-Arcep 2022, scope France sans DC étrangers) reste valable **avec son millésime et son périmètre**. Voir §9. |
| Eau / smartphone | 12 000 L (home, `comprendre`, `cas-pratiques`) vs **13 000 L** (transcription `comprendre` + image) vs **15 000 L** (`problematiques`) vs 12 000 + 8 000 (`comprendre` phases) | L'image et la transcription disent 13 000, le texte 12 000 : choisir **UNE** valeur (12 000 L, ADEME « face cachée ») et l'appliquer partout, image comprise |
| CO₂ cycle de vie smartphone | **50 kg** (partout) vs **55 kg** (transcription + image `comprendre`) | 50 kg partout (ou sourcer le 55) |
| Reconditionné (kg) | **8 kg** (`mythes` #4 ✓ ADEME) vs **12 kg** (`cas-pratiques`) | 8 kg partout |
| Reconditionné (%) | −75 % (partout) vs **−80 %** (reco du calculateur) | Garder −75 % (prudent, ADEME : −77 à −91 %) |
| 720p vs 4K | −80 % (`agir`) vs **−75 %** (reco du calculateur) | Harmoniser (−80 % plausible, Kamiya : ~7 vs ~1,4 Go/h) |
| Cloud stocké | **0,24 g/Go/an** (ADEME Impact CO₂, Base Empreinte — la valeur juste) vs 15 g (`faq`, fiche : ×60) vs **200 g** (calculateur : ×800) vs **20 kg** (`mythes` #1 : ×80 000) | 4 versions ! Retenir **0,24 g** et corriger les 3 autres. Conséquence : le curseur « cloud » du calculateur devient quasi nul — c'est pédagogiquement JUSTE (cf. mythe #5) |
| Smartphone (calculateur) | **55 kg** fabrication (`carbon-calculator`) vs 50 kg (site) vs 55 kg (image/transcription) | Trancher une fois pour toutes (50 kg + fourchette 50-80 comme la fiche, bonne pratique) |
| Tablette (calculateur) | **63 kg** (`carbon-calculator`) vs **75 kg** (`chiffres`) | Harmoniser + sourcer |
| Écran 24" | **248 kg** (`chiffres`) vs **350 kg** (`it-audit`) | Harmoniser (Base Carbone) + distinguer avec/sans pied/caisson |
| Usage laptop annuel | **22 kg** (`carbon-calculator`, ramené à ~5,5 kg à 6 h/j) vs **30 kg** (`enterprise`, `it-audit`, sans modulation horaire) | Deux outils, deux méthodes (×4 d'écart pour le même poste !) → harmoniser la méthode ET la valeur |
| Recyclage smartphones FR | Quiz **15 %** vs `faq` **85 %** (Europe) | 85 % sûrement faux ; 15 % plausible pour les seuls téléphones — sourcer (Ecosystem) et distinguer *collecte* vs *recyclage matière*. Réf : Ecosystem 2024 = 79,2 % recyclés/réutilisés **des DEEE collectés** (tous appareils) |
| Pièces détachées smartphone | Quiz **5 ans** (AGEC) vs règlement UE **7 ans** (depuis 06/2025) | 7 ans (UE 2023/1670) ; refaire les options du quiz (pas de « 7 ans » proposé !) |
| Dark mode OLED | Page **−30 %** vs quiz **−60 %** (« Google Android Research ») vs fiche **−15 %** | **15-50 % selon luminosité**, source **Purdue 2021** (pas Google) — une fourchette règle les 3 versions |
| Transfert de données | Fiche **« 1 Mo = 20 g »** (= 20 000 g/Go !) | SWD v4 : **~96 g/Go** opérationnel mix mondial (0,194 kWh/GB × 494 g/kWh) ; réseau FR seul ~34 g/Go (Greenly/Arcep 2022). La fiche est fausse ×200 → remplacer par la formule |
| 4K | `mythes` **300 g/h** vs fiche **370 g/h** | Rentre dans la fourchette §9.12 → harmoniser « ~300-370 g/h (mix-dépendant) » |
| PC fixe fabrication | **296 kg** (calculateur) vs **169 kg** (`tableau-bord`, Base Empreinte) | Sourcer + trancher (296 ≈ UC + écran ? l'expliciter si c'est le cas) |
| Reconditionné (réduction) | **−75 %** (partout) vs **−80 %** (fiche entreprise, affiche visio) | Harmoniser sur −75 % (ADEME 2022), « jusqu'à −80 % » toléré avec « jusqu'à » |
| Smartphone fabrication | **39 kg** (`tableau-bord`, Base Empreinte 2024) vs **50-70 kg** (quiz, calculateur) | Fourchette « 40-70 kg selon modèle (Base Empreinte 2024) » partout |
| Usage laptop annuel | **11 kg/an** (`tableau-bord` : 44 kg/4 ans) vs **22 kg** (calculateur, modulé 6 h/j) vs **30 kg** (enterprise/audit, brut) | Trois méthodes, trois valeurs → trancher (cf. §10.18) |
| Durée de conservation | **« 4 ans minimum »** (`guide`) vs **« 5 ans mini »** (sensibilisation, quiz : 5-6 ans ✓) | Harmoniser (5 ans smartphones, 5-7 ans laptops — ADEME) |
| Wi-Fi vs 4G/5G | 20× (`agir` ×2, `faq`) vs 2× (`mythes` #10) vs 3× (`guide`) | ~4-5× (voir §2.2) |
| Streaming 1h | HD 100 g / 4K 300 g / 480p 30 g (`mythes` #10) vs **4K 370 g / 720p 50 g** (`faq`) | Fourchettes + mention d'incertitude (débat Kamiya/Shift : 56-400 g/h selon hypothèses). Ne pas présenter deux vérités incompatibles |
| Python vs C | **75,88×** (`developpement` tableau + carte « 75x » ✓, étude Pereira) vs **57×** (`faq`) vs transcription « JS 3,14× » (tableau : 4,45) | 75,88× / JS 4,45× partout ; corriger la transcription (3,14 → 4,45) et la FAQ (57 → 76) |
| Durée de vie smartphone FR | 2,3 ans (home, `comprendre`, `problematiques`, `faq`) vs « stagne à **2,5 ans** » (`perspectives`) vs quiz « 2,5 ans » (source ARCEP fictive) vs `guide` « 4 ans minimum » (vs 5 ans ailleurs) | ADEME 2026 : changement « en moyenne **tous les 3 ans** », durée de vie 23-37 mois → formuler « entre 2 et 3 ans » partout, objectif « 5 ans » partout |
| E-déchets France | 1,5 Mt (home, `recyclage` « collectés ») vs **1,61 Mt 2025 / 1,67 Mt 2026** (`chiffres`) vs « 24 kg/hab » (`problematiques` ≈ 1,6 Mt ✓) vs « 25 kg/hab » (`chiffres`) | Harmoniser ~1,6 Mt (≈ 24 kg/hab) ; noter que « collectés » ≠ « produits » (`recyclage` confond les deux) |
| GPT-3 | « 552 t = 120 voitures/an » (carte ✓) vs « = 5 voitures pendant leur vie » (texte) | 552 t (Patterson 2021) ✓ ; « 5 voitures-vie » correspond à 284 t (Strubell 2019, sans NAS) → **supprimer la 2e formulation** |
| Marché reconditionné FR | 3,2 M vendus 2024 (`problematiques`) vs 2,5 M (`faq`, fiche) ; 2,5 Mds € (`faq`, fiche) | Une seule version + source Arcep |
| Cloud | `cas-pratiques` : « le cloud mutualisé est plus écologique » vs `perspectives` : « cloud personnel plutôt que services centralisés » | Contradiction frontale → trancher (le mutualisé optimisé reste la recommandation consensuelle) |
| Usage % impact | 20 % (`comprendre` ×2) vs **18 %** (`chiffres`) | Détail, harmoniser à ~20 % |
| Màj OS / obsolescence | « iOS/Android rendent obsolètes les +3 ans » (`problematiques`) | Faux en 2026 (Apple 5-7 ans, Pixel/Samsung 7 ans, UE 5 ans min depuis juin 2025) → réécrire |
| 4K Go/h | 6 Go (`problematiques`, `faq` 6,5 Go ✓ plausible) | OK, garder ~7 Go/h (Kamiya) |
| « 78 % équipements » vs camembert smartphone | `problematiques` mélange « 78 % de l'impact vient des équipements » (périmètre **France, tous impacts**, ADEME 2022) et le camembert smartphone | Préciser les périmètres (France vs monde : au mondial, l'usage pèse plus — GreenIT EENM 2025) |

**Cas d'école — `co2-distribution.webp` (ressource téléchargeable `/ressources`) :** en français et propre, MAIS elle affiche Production 47 % / Usage 33 % / Fin de vie 15 % / Transport 5 % quand le camembert `/chiffres` affiche 60/18/2/5 (+15 extraction). Deux sources « ADEME » incompatibles sur le même site. Trancher (le découpage 47/33/15/5 ressemble à un autre périmètre/appareil) ou retirer le fichier.

---

## 4. 🟡 Obsolète, imprécis ou non sourcé (par page)

### 4.1 Données périmées à dater/mettre à jour
- **Badges « 2025 »** : `reglementation` (« Mise à jour 2025 »), `developpement` (« Mis à jour en 2025 »), `guide` (« Guide Officiel 2025 »), `a-propos` (« Dernière mise à jour : janvier 2025 », « © 2025 »). En sept. 2026, soit mettre à jour réellement, soit retirer les millésimes.
- **5 Go/mois** (`comprendre`) : Arcep = **16 Go (2024), 18 Go (2025, +2 Go/an)**. Corriger.
- **« Trafic double tous les 3 ans »** (`perspectives`) : FR +13 %/an (Arcep 2024-2025) → doublement tous les ~6 ans. Corriger.
- **« Trafic 5G ×5 d'ici 2030 », « 6G ×5 conso », « renouvelables DC 60 % en 2025 », « solaire toits 20-30 % / 30 % des nouveaux DC », « 45 % de l'énergie des GAFAM »** : sans source → marquer « estimation/illustratif » ou sourcer.
- **Part du numérique mondiale « 4 % »** (home, `a-propos`) : GreenIT EENM **2025** = **3,4 % en 2023** (1,8 Gt) ; Shift 2024 = « près de 4 % ». Recommandé : « **3 à 4 %** (GreenIT 2025, Shift 2024) » + enrichissements possibles : 6 équipements/internaute, 40 % du budget GES soutenable, serveurs IA = 4 % des GES du numérique.
- **« Le numérique consomme 10 % de l'élec mondiale »** (`problematiques`) : Shift 2021-2023 ≈ 10 % (tous usages) vs IEA 1,5 % (datacenters seuls) — les deux ordres coexistent, **préciser le périmètre**.
- **Serveurs « 10-15 ans »** (`cas-pratiques`) : faux, c'est la durée du **bâtiment**. Serveurs : **3-5 ans**. Corriger.
- **« 70 % des entreprises FR utilisent le cloud (2025) vs 25 % (2015) »** : non vérifié, semble surévalué (Insee/Eurostat ~30-40 % ?) → sourcer ou retirer.
- **Modèles IA cités** (`developpement` : « GPT-3.5 au lieu de GPT-4 ») : daté (GPT-5 déployé mars 2026 selon Arcep). Actualiser les exemples.
- 🟠 **Project Natick présenté comme solution future** (`problematiques`, sans réserve) : **Microsoft a arrêté le projet en juin 2024** (« I'm not building subsea data centers anywhere in the world » — Noelle Walsh, DCD). À signaler + contrepoint possible : la Chine a immergé son 1er datacenter commercial au Hainan en 2023 (100 unités prévues).

### 4.2 Chiffres sans source (inventés ou invérifiables en l'état)
`+42 % de réparations`, `−15 % d'e-déchets prématurés`, `2,3 Mds € économisés` (AGEC) · `8,2/10`, `+2,1`, `92 % consultent l'indice` · `complianceData` (78/45/82/38 %) et `impactData` (camembert 35/28/22/15) · `coûts conformité 50-500 k€` · ISO 14001 `400k+/12k+/−25 %` et ISO 50001 `−20 %/−15 %/ROI 3 ans` · `label NR 450+ orgas` · `Energy Star 75+ pays` · `1,76 g/visite site moyen` · `MobileNet −98 %` · `CDN 40-60 % plus rapide` · `serverless −60-80 %` · `30-70 % de réduction` (dev) · `2,7 Mt évitées si +1 an pour tous` · `60M/50M/26M d'équipements` · `50 Go inutiles/Français` · `33 mails/jour = 180 kg/an` · `mode avion 2 kg/an` · `80 % des fonctionnalités jamais utilisées` (fiche achat) · `95 %`… : **règle proposée** — tout nombre sans source devient soit sourcé (avec millésime), soit reformulé en fourchette/recommandation du site (« nous recommandons… »), soit supprimé. Les jeux de données explicitement illustratifs ( formative : `recyclingPoints`, `complianceData`, scénarios 2040) doivent porter la mention « données illustratives ». **Cas aggravant : les 8 fiches détaillées ne citent AUCUNE source** (zéro « selon… »/« étude… » dans tout le fichier) — ajouter un bloc sources par fiche.

### 4.3 Points de collecte : données fictives (`chiffres`, `recyclage`)
`recyclingPoints` = `sample data` (Paris 245, Lyon 98…) affichées comme réelles + carte + texte « 15 000+ points ». **Recommandation :** brancher l'annuaire officiel (Ecosystem/« Que faire de mes objets » ADEME) ou, à défaut, mention visible « chiffres illustratifs ». Vérifier aussi le « 15 000+ » (ordre Ecosystem à confirmer).

### 4.4 Acteurs & liens à vérifier (non vérifiés dans cet audit)
- **Téléphones en dur** (`recyclage`) : Ecosystem 01 30 57 79 09, Écologic 01 30 57 88 00, Ressourceries 04 67 15 70 85, Envie 01 44 85 29 88 → **vérifier chaque numéro** (risque élevé) ou remplacer par des liens « page contact ».
- **ressourcerie.fr** : ✅ **vérifié le 14/09/2026** — le domaine existe, c'est le **Réseau National des Ressourceries et Recycleries (RNRR)**, créé en 2000, **312 structures** (chiffres : 4 000 bénévoles, 7 000 salariés, 3,5 M de bénéficiaires, 25 kt réemployées). Renommer « Réseau des Ressourceries » en « RNRR » + injecter ces chiffres dans `/recyclage`. Reste le n° de téléphone à vérifier.
- **À trancher (recherches infructueuses, rate-limit ou introuvables)** : « Energy Star 75+ pays » (reformuler : label US EPA + partenaires internationaux, sans nombre) · Lilo (tester lilo.org) · Back Market « 40-50 points / 5 % pannes » · Apple « 75 % alu recyclé / 6,5/10 » (Environmental Progress Report 2025 + iFixit) · « Fraunhofer 2025 » (mythes #6) · or 15 % (Ecosystem ?) · cuivre 5 000 L/kg (quiz) · « 50 % de serveurs sous-utilisés » (reformuler ou sourcer Uptime) · « 250+ datacenters FR » (France Datacenter / DataCenterMap) · « 8 000+ monde » (DCmap) · « 60M/50M/26M d'équipements » (introuvable dans les extraits ADEME-Arcep — retirer ou retrouver dans l'étude complète) · « +42 % réparations / 2,3 Mds € / 8,2/10 / 92 % » (introuvables — **retirer**, remplacer par : bonus 4→25 M€ en un an, lave-vaisselle >8,1 = +28 % de ventes — Univers Habitat 2025) · « 70 % d'entreprises au cloud » (remplacer par Eurostat : **52,7 % des entreprises UE** en 2025 + Insee TIC 2024 pour la France) · quiz 2,1 Mo (confirmer HTTP Archive), WUE 1,8 (préciser la publi Green Grid) · « 50 Go inutiles » (moyenne FR du cloud — sourcer) · reconditionné « 2,5 M d'appareils / 2,5 Mds € en 2024 » (Arcep/Ecosystem — incohérence ~1 000 €/u à trancher).
- **Résolus passe 6** : label NR → ~350 labellisées, pas 450+ (JNR 03/2026 — §9.27) · « 1,76 g/visite » → moyenne websitecarbon de l'ère v2/v3, obsolète : remplacer par SWD v4 (§9.26) · « Baromètre Green IT 2025 » → existe (AGIT, 588 entreprises — §9.28) · Radicati → reformuler envoyés+reçus (§9.29).
- **Lilo** (`agir`) : **404 sur lilo.org/fr/** en sept. 2026 → service probablement arrêté ou migré. Retirer de la liste « moteurs éco-responsables » (Ecosia ✓ reste valide).
- **Back Market** : page d'accueil vérifiée → garantie 12 mois, « Reconditionné par des Pros », **pas de mention « 40-50 points de contrôle » ni « 5 % pannes »** sur la page principale. Ces chiffres (quiz Q12) restent **non sourcés** → retirer ou sourcer page spécifique.
- **Apple** : Environmental Progress Report 2025 → **20 % d'aluminium recyclé en moyenne** dans les produits (pas 75 %), iFixit iPhone 15 = **4/10**, iPhone 15 Pro = **7/10** (moyenne ~6,5/10 plausible mais à nuancer par modèle).
- **Fraunhofer 2025** (mythes #6) : étude IZM 2022 (Fairphone 4, −31 % sur 5 vs 3 ans), **pas d'étude 2025** trouvée → remplacer par « étude Fraunhofer IZM 2022 » ou retirer la référence 2025.
- **Or 15 %** : confirmé quiz (source probable Ecosystem/GEM) → conserver avec source.
- **Cuivre 5 000 L/kg** : confirmé quiz → conserver.
- **Serveurs sous-utilisés 50 %** : quiz cite Uptime Institute → source acceptable, conserver avec mention.
- **WUE 1,8 L/kWh** : quiz cite The Green Grid → source acceptable, conserver avec mention.
- **Datacenters FR 250+ / Monde 8000+** : France Datacenter 200 en 2020, DataCenterMap 10 000+ → **plausibles** → ajouter sources.
- **Parc FR 60M/50M/26M** : **introuvables** dans extraits ADEME-Arcep → **retirer** ou retrouver dans étude complète.
- **+42 % réparations / 2,3 Mds € / 8,2/10 / 92 %** : **introuvables** → **retirer**, remplacer par : bonus 4→25 M€ en un an, lave-vaisselle >8,1 = +28 % ventes (Univers Habitat 2025).
- **Entreprises cloud 70 %** : **faux** → Eurostat 52,7 % UE 2025 + Insee TIC 2024 FR → corriger.
- **Quiz 2,1 Mo** : HTTP Archive median desktop 2024 ≈ 2,3 Mo, mobile ≈ 1,9 Mo → **plausible** → sourcer.
- **50 Go inutiles/Français** : **non sourcé** → retirer ou sourcer (estimation fichier ?).
- **Reconditionné 2,5 M / 2,5 Mds €** : incohérence ~1 000 €/u → **trancher** (Arcep 7,1 M téléphones opérateurs 2024, chiffre d'affaires marché ≠ 2,5 Mds €).
- **Allégations entreprises** : Scaleway (PUE 1,2 ? chaleur → logements ?), OVHcloud (PUE 1,09 ? « neutralité carbone 2025 » — atteinte ? en sept. 2026 c'est vérifiable), Qarnot (toujours actif ?), Back Market (40-50 points de contrôle ? 5 % de pannes ?), Apple (75 % alu recyclé 2025 ? indice 6,5/10 ?), « Fraunhofer 2025 », « Carbon Trust 2025 », « GreenIT.fr 2025/2023 » (= EENM 2025 de greenit.eco ✓ existe — uniformiser la citation), « Shift Lean ICT 2024 » (la réf est 2018 ; citer les rapports 2023-2025 existants).
- **Faits divers** : lithium (IEA : demande **×3 entre 2017 et 2022**, 56-60 % pour batteries en 2022 — reformuler le « +400 % »), Taïwan (TSMC **67 % de la fonderie** mondiale en valeur au T4 2024 — Counterpoint — reformuler le « 60 % des puces »), Ghana/Nigeria (Nigeria **~288 kt** UEEE importés 2017, Ghana **~215 kt** dont ~15-56 % de vrais déchets, **~20 kt/an** illégaux au Ghana en 2019 — Trésor français ; 352 kt UE→pays en développement — BAN ; Agbogbloshie **démantelé en 07/2021** — réécrire « 80 % » et « 250 kt » avec ces chiffres), « datacenter = 50 000 foyers » (ordre OK pour un **grand** site ~25 MW : le préciser), cuivre « 16 t/1 M smartphones » (15 g/appareil ✓ calcul juste), « 160 douches » (12 000 L ÷ 75 L ✓), 800 kg matières pour un portable 2 kg (ADEME ✓ — **à citer !**), « 2 à 4 ans = −50 % » (ADEME ✓), 62 %/3 ans/100 M tiroirs (ADEME 2026 ✓ — distinguer **54 M de smartphones** (Ecosystem probable) des 100 M d'appareils), « 20 matériaux recyclables » et « 1 % des terres rares recyclées » (GEM 2024 ✓ — bons compléments), « 40 % du budget GES soutenable » et « 6 équipements/internaute » (GreenIT 2025 ✓), « 2,7 Mt » → **0,6 Mt/an** (ADEME 2020 : 6 Mt/10 ans pour 11 équipements allongés d'1 an — le « 2,7 » = des **Mds €** d'économies, confusion €/t ! ; bonus : laptop +3 ans = −65 kg/+336 €, smartphone +2 ans = −16 kg).

### 4.5 Conseils à nuancer ou corriger (`agir`, `guide`, `faq`, fiches)
- 🔴 **« Fermer les applications en arrière-plan »** : contre-productif sur iOS/Android modernes (le rechargement consomme plus) → **retirer**.
- 🟠 **« Nettoyer sa boîte mail / le cloud »** en conseil phare : la page `/mythes` (#5) dit elle-même que l'impact est minime → harmoniser le ton (le garder en « geste symbolique », pas en priorité).
- 🟡 **« Recharger en heures creuses »** (climat) : argument carbone faible en France (nucléaire pilotable) — c'est surtout économique → le dire.
- 🟡 **« Pas de streaming HD 18h-20h »** : lien avec le pic électrique ténu → reformuler (« téléchargez en Wi-Fi à l'avance »).
- 🟡 **« Favoris plutôt que recherche », « fermer les onglets »** : gains infimes → les classer en « bonus », pas en actions principales.
- 🟡 **« Mode sombre −30 % »** : vrai sur OLED **à forte luminosité** (Purdue 2021 : jusqu'à ~50 %) → nuancer. Fiche : « −15 % » vs page « 30 % » → harmoniser.
- 🟡 **« Box éteinte la nuit : 10 €/an »** : ≈ 25 kWh ≈ **5 €/an** aux tarifs 2026 → corriger.
- 🟡 **« RAM/stockage souvent facilement upgradables »** (`cas-pratiques`) : faux en 2026 (RAM soudée sur la plupart des ultraportables) → nuancer (« sur les modèles qui le permettent : Framework, certains pro »).
- 🟡 **« Réparer économise 50 kg »** : vrai seulement si ça évite un achat neuf → le préciser.
- 🟢 **Manque positif** : l'éducation existante (SNT en seconde, PIX) — la page `agir` demande d'« intégrer le Green IT dans les programmes » comme si rien n'existait → compléter.

### 4.6 Technique / code à corriger (`developpement`)
- `select: { id, name, email }` **invalide** (Prisma : `{ id: true, … }`) — gênant sur une page dev.
- « Pas d'autoplay : économie 80 % » : chiffre jeté → sourcer ou retirer.
- GraphQL « pas d'over-fetching » sans nuance (requêtes profondes/N+1 possibles) → nuancer.
- Stockage ADN « consommation nulle », quantique « fraction de l'énergie » (cryogénie !), ARM « −70 % » : prospectif à marquer comme tel.
- Exemple « page produit 4,2 Mo → 580 Ko » et chiffres lazy-loading : marquer « exemple illustratif ».

### 4.7 Quiz 100 questions (`components/quiz-green-it-advanced.tsx`) — on enseigne du faux
Structure « 100 questions » confirmée (ids 1-100) ; exactitude à revoir :
- 🔴 **Q9 « terres rares »** : options 5/17/**34**/50, bonne réponse 34 avec explication « 34 **métaux** différents ». La question demande des *terres rares* (il en existe 17 au total, une poignée dans un téléphone : Nd, Dy, Pr, Tb, Y, Eu…) mais la réponse parle de *métaux* (et l'ADEME dit ~50, pas 34). Question et réponse à réécrire.
- 🔴 **Q box 24h/24 = « 150-300 kWh, équivalent réfrigérateur »** : une box tire ~8-10 W → **70-90 kWh/an**. 150-300 kWh, c'est le frigo lui-même. Garder les options, déplacer la bonne réponse sur « 50-100 kWh » et réécrire l'explication (source « ADEME 2024 » fictive).
- 🟠 **Q circuits intégrés** : « 1 600 kWh = 6 mois de foyer » → 1 600 kWh ≈ **4 mois** (4 700 kWh/an). Corriger « 6 » en « 4 ».
- 🟠 **Streaming HD en 3 versions** : quiz 50 g (« IEA 2025 » — l'IEA ne publie pas ce ratio unitaire, source à corriger en Kamiya/CarbonBrief) vs `mythes` 100 g vs `faq` 720p = 50 g. Harmoniser en fourchette (voir §3).
- 🟠 **E-mail en 2 camps** : quiz 19 g/PJ 1 Mo + `faq` ~15 g/moyen (cohérents) vs quiz « 30 mails → 10 kg/an » (0,9 g) + calculateur 0,8 g/envoi (cohérents). Trancher avec la distinction **avec/sans PJ** (la FAQ dit déjà « 4-50 g » : généraliser cette fourchette).
- 🟡 **Sources millésimées fictives** : « ADEME 2025 » (×N — n'existe pas ; 78 % = ADEME 2022), « ADEME 2024 » (70 kg = ADEME 2019 ; 156 kg ?), Q4 « ARCEP 2025 » pour la durée de vie (l'Arcep ne la publie pas → ADEME) + « 2,5 ans » vs 2,3 ans du site.
- 🟡 **Q10 recyclage smartphones FR = 15 %** vs `faq` « 85 % en Europe » : 85 % sûrement faux, 15 % plausible pour les seuls téléphones — sourcer (Ecosystem) et distinguer *collecte* vs *recyclage matière*.
- 🟡 **Q « 30 % des métaux rares recyclés »** : non sourcé ; et autre métrique (GEM 2024 : **1 % seulement de la demande de terres rares** couverte par le recyclage) — distinguer « part recyclable techniquement » vs « part réellement recyclée ».
- 🟡 **Q « 75-90 % de l'impact en fabrication »** : en tension avec le « 75 % » du site — garder comme fourchette en citant les deux bouts (ADEME 75 % tous impacts / Shift ~90 % carbone smartphone).
- 🟡 **Q6** : 4 % + 6 %/an, source « Shift 2025 » vague → citer GreenIT EENM 2025 (3,4 %) ou Shift 2024 (« près de 4 % »).
- 🟡 **Simulateur de sobriété** (`sobriety-simulator`) : nettoyage mail hebdo = **×0,92 (−8 % de l'empreinte TOTALE)** — contredit le mythe #5 du site (impact négligeable). Réduire à ×0,99 ou appliquer au seul poste usages. (Autres multiplicateurs directionnellement OK : durée de vie ×0,65-0,85, reconditionné ×0,7-0,75, 720p ×0,92 du total.)
- 🟡 **`enterprise-simulator`** : 120 €/an/appareil d'énergie (≈ 600 kWh — ×3-5 pour un poste seul : expliciter « poste + quote-part infra » ou corriger), CO₂ usage 30 kg (vs 22 calculateur, voir §3), prix 0,18 €/kWh → **0,20 €/kWh** (TRV août 2026), scénarios −15/−30 % à marquer « illustratifs ».
- 🟡 **`it-audit`** : serveurs 1 200/500 kg (ordre plausible, **préciser le mix électrique** : ×10 entre France et monde), écrans 350 kg (vs 248, voir §3).
- 🔴 **Quiz ids 31-100 (lus en intégralité)** :
  - Q32 pièces détachées « 5 ans (AGEC) » → **7 ans** (UE 2023/1670, 06/2025) — et aucune option « 7 ans » : refaire la question.
  - Q39 collecte « 65 % atteints en 2025, vers l'objectif de 85 % » → 65 % = **l'objectif réglementaire** (Ecosystem l'atteint à son périmètre en 2025 : 876 kt) ; 85 % = **valorisation**, pas collecte. Réécrire les deux.
  - Q52 PUE « 1,2 **en moyenne** » → 1,2 = meilleurs sites neufs ; **moyenne 1,56** (Uptime 2024).
  - Q61 AGEC « votée en **2021** » → **10 février 2020** (loi n°2020-105).
  - Q93 dark mode « 60 % (Google) » → 30-50 %, source **Purdue 2021**.
  - Q71 « 1,5 Md t (4 %) » → **1,8 Gt (3,4 %, EENM 2025)**.
  - Q72 fabrication smartphone « 78 % » vs 75 % du site → harmoniser (voir §3).
  - Q50 bots « 42 % » → **51 % de trafic automatisé dont 37 % malveillants en 2024** (Imperva Bad Bot Report 2025).
  - Q57 hyperscale « 800 » → **~1 136 fin 2024** (Synergy, mars 2025 ; capacité ×2 en <4 ans, US 54 %).
  - Q76 « 200 kg de **déchets** miniers » → 200 kg de **matières mobilisées** (MIPS, ADEME 2021).
  - À sourcer/préciser : Q33 or 15 % ; Q40 54 M de smartphones (probablement Ecosystem — **compatible** avec 100 M d'appareils : expliciter smartphones ⊂ appareils) ; Q43 2,1 Mo (confirmer HTTP Archive) ; Q53 2 % → 1,5-2 % (IEA) ; Q54 free cooling 40 % (illustratif) ; Q58 « tous les trois » (nuancer matching vs 24/7 décarboné) ; Q60 WUE 1,8 (préciser la publi Green Grid) ; Q63 −45 % (source **ITU/SBTi**, pas SNBC — beau contraste avec le +45 % tendanciel ADEME-Arcep !) ; Q70 durabilité 2026 (nuancer : TV/lave-linge déjà 2025) ; Q73 cuivre 5 000 L ; Q74 Google 0,2 g (millésimer **2009**) ; Q75 terminaux 45 % (préciser Lean ICT 2018) ; Q77 800 TWh (périmètre flou — IEA : DC 415 TWh) ; Q78 1,4 Md (plutôt ~1,2-1,4, IDC) ; Q80 cobalt batteries 60 % (plausible, préciser Cobalt Institute) ; Q83 −40 % TCO, Q88 ROI 30 % (illustratifs) ; Q84 50 % serveurs sous-utilisés (préciser source) ; Q87 120 e-mails/j (reformuler envoyés+reçus, Radicati — §9.29) ; Q90 « Baromètre Green IT 2025 » (existe : AGIT, 588 entreprises — §9.28).
  - 🟢 Justes (quiz 31-100) : écran 50-150 € ✓, 24 kg ✓, bonus (nuancer : financé par la REP, pas l'État) ✓, reprise 1 pour 1 ✓, WebP 25-35 % ✓ (**appuie la correction de la page !**), RGESN ✓, PUE/définition ✓, ASHRAE 25-27 °C ✓, REEN/RGPD/DSA/ARCEP/garantie 2 ans ✓, Fairphone 10/10 (plausible) ✓, 5G ~10×/bit (plausible) ✓, edge/low-tech/Li-Fi/bioplastique/numérique frugal ✓, Q97 décentralisation « bilan débattu » (honnête ✓).
- 🟢 **Justes** : ACV/ISO 14040, effet rebond, EPEAT, laptop 156 kg et 20 000 L (cohérents site), reconditionné « 8× » (cohérent ADEME « jusqu'à 8× moins » — présenter la fourchette 4-8× avec le −75 %), charge complète ~0,01 kWh, data 15 Go (proche Arcep 18 Go 2025 — actualiser à 18).
- **Modèles `/modeles/*`** (sondage) : pas de 404 (chaque gabarit a sa route ou son download ✓), pas de lorem ; chiffres = exemples de gabarit (budgets « 50k€ »…) → ajouter la mention « exemples » et ne présenter comme standards que des objectifs sourcés.
- 🟡 **`language-comparison-svg` cite « Energy Efficiency across Programming Languages 2025 »** : cette édition n'existe pas (Pereira et al. : SLE **2017** / Science of Computer Programming **2021**). Corriger la source (les valeurs du graphique sont, elles, conformes à l'étude).

### 4.8 Calculateur d'empreinte (`components/outils/carbon-calculator.tsx`) — résultats faux affichés à l'utilisateur

Le moteur utilise des facteurs « données ADEME 2025 » (millésime inexistant — la réf est ADEME-Arcep **2023**) et :
- 🔴 **Équivalence « vols Paris-New York » : `total/120`** → 120 kg le vol Paris-NY, faux ×4-8 (aller simple ≈ 450-500 kg avec traînées, AR ≈ 1 t — DGAC). 120 kg ≈ un Paris-Marseille aller. Renommer l'équivalence ou diviser par ~500-1 000.
- 🟠 **« Repas avec bœuf » : `total/0,9`** → 0,9 kg le repas au bœuf, ~5× sous-estimé (plutôt 3-7 kg). À vérifier/corriger.
- 🟠 **Moyenne française 285 kg** : plausible (17,2 Mt ÷ 68 M ≈ 253 kg en 2023 + croissance) mais non sourcée → sourcer (ADEME-Arcep 2023).
- 🟠 Facteurs appareils : smartphone **55** (4e version du site), tablette **63** (vs 75), TV 371/118 non sourcés → harmoniser (voir §3).
- 🟡 Facteurs d'usage à exposer ET corriger : e-mail 0,3 kg/an quotidien (≈ 0,8 g/envoi ✓ cohérent quiz/FAQ sans PJ), streaming 1,6 kg/an par h/sem (≈ 31 g/h = niveau **SD** — l'expliciter, vs mythe HD 100 g/h), social 2,5 kg/an par h/jour (≈ 7 g/h — expliciter « hors vidéo », ×4,5 sous le streaming sinon incohérent), cloud **0,2 kg/Go/an → 0,00024 kg (0,24 g, ADEME)**. Aucune hypothèse exposée à l'utilisateur ; « données ADEME 2025 » → sources exactes (Base Empreinte 2024, ADEME-Arcep 2025).
- **Recommandation :** afficher les hypothèses sous le résultat + corriger les 2 équivalences + remplacer « ADEME 2025 » par les vraies sources millésimées.

### 4.9 Animation de croissance (`components/growth-animation.tsx`, page `/chiffres`)
`33,8 × 1,06^(année-2010)` → **~86 Mt affichées en 2026**, quand le graphique juste en dessous dit 72,4 Mt et la trajectoire GEM (+2,6 Mt/an) donne ~72 Mt. Le +6 %/an vient du Shift mais porte sur l'**empreinte carbone**, pas sur la masse des e-déchets. Deux chiffres incompatibles sur le même écran → aligner l'animation sur la courbe (formule linéaire +2,6 Mt/an depuis 62 Mt en 2022).

### 4.10 Comparateur cloud (`components/outils/cloud-comparator.tsx`)
- AWS « Objectif 100 % renouvelable 2025 » : **dépassé** — AWS a annoncé en 2024 avoir atteint 100 % dès 2023 → mettre à jour.
- Google « neutralité carbone depuis 2007 » ✓ mais à nuancer : émissions +51 % depuis 2019, objectifs compromis par l'IA (IEA/Arcep 2025-2026).
- OVH « neutralité carbone 2025 » : même vérification que §4.4, en sept. 2026 c'est tranchable.

### 4.11 Le seul PDF du site (`public/guide-recyclage-green-it.pdf`, 16 Ko, lié depuis `/guide`)
- 🔴 « **2 kg** de CO₂ évité par smartphone recyclé = **2 000 km** en voiture (Paris-Istanbul) » : **erreur de calcul ×100** (2 kg ÷ 0,12 kg/km ≈ 17 km, pas 2 000 ; Paris-Istanbul ≈ 2 200 km). Et contredit la fiche qui dit « 20 kg par appareil recyclé » (§3 : 2 versions, aucune sourcée).
- 🔴 « Le recyclage est le **levier n°1** » : contredit le site lui-même (`mythes` #3 : réduction > réparation > réutilisation > recyclage). Hiérarchie à inverser.
- 🟡 « 4 % des émissions, un chiffre qui **double tous les 10 ans** » : slogan non sourcé, incohérent avec les scénarios du site → reformuler avec les vraies trajectoires.
- (Le reste — consignes d'effacement, filières BackMarket/YesYes/Emmaüs/Envie/Ecosystem — est juste et pratique.)

---

## 5. 🟢 Ce qui est juste et à garder tel quel
- Socle ADEME : fabrication ≈ 3/4 de l'impact smartphone ✓, 70 matériaux / 50 métaux ✓, 23-37 mois de durée de vie (le « 2,3 ans » est dans la fourchette — reformuler « 2 à 3 ans »), reconditionné −77/−91 % et 25 kg GES + 82 kg matières évités **par an** (mieux que le « −75 % » actuel : le site est même prudent), « 2 à 4 ans = −50 % » ✓, 62 % de renouvellements alors que ça marche (à substituer au « 88 % »).
- GEM 2024 : 62 Mt en 2022 ✓, 34 Mt en 2010 ✓, 82 Mt projetées 2030 ✓, « ×5 plus vite que le recyclage » (le site dit « ×3 vs population » → corriger en reprenant la vraie formule, plus frappante).
- France : 2,5 % des GES / 17 Mt (ADEME-Arcep 2023) ✓ ; obsolescence programmée interdite depuis 2015 ✓ ; collectivités >50 000 hab. (REEN) ✓ ; DEEE 65 % / valorisation ~85 % par catégorie ✓ ; garantie occasion 12 mois (à corriger dans le texte, le droit est bon) ; USB-C mentionné ✓.
- International : IEA 415 TWh/1,5 % (à injecter) ; PUE définition + formule ✓ ; DeepMind −40 % (2016, à dater) ✓ ; Patterson GPT-3 552 t ✓ ; Pereira langages (75,88× ; corriger les 2 scories) ; Uptime PUE 1,56 (à injecter).
- Pédagogie : quiz 75 %/20 % ✓, mythe #5 (emails) exemplaire de nuance ✓, scénarios sobres vs tendanciels (à sourcer, pas à jeter), avertissement `/a-propos` honnête ✓, ton non culpabilisant ✓.
- Glossaire `/ressources` globalement juste (REP, DEEE, PUE, ACV, AGEC/REEN…).
- **Le « 78 % » est VALIDÉ par sa source** : dossier de presse ADEME-Arcep, mars 2023 — « 79 % de l'empreinte carbone du numérique provient de nos équipements, 16 % des datacenters, 5 % des réseaux… fabrication à hauteur de **80 %** ». Citer exactement ça (avec millésime 2020-2022) au lieu d'« ADEME » vague. Bonus du même dossier : 800 M de terminaux FR, tendanciel **×3 en 2050**, trafic **×6 d'ici 2030**, équipements **+65 %**, objets connectés **×43**, Wi-Fi préféré en scénario sobriété.
- **Ecosystem, record mars 2026** : 876 kt collectées, **65 % de collecte** (périmètre adhérents), **42 000 points** + 3 000 déchetteries, **79,2 % recyclés/réutilisés et 91,3 % valorisés** (des collectés), **735 000 réparations** via 7 465 QualiRépar en 2024 (24 M€ de bonus), 25 % captés par l'illégal, 8 Mt en 20 ans — à injecter dans `/recyclage`, `/chiffres`, quiz.
- FAQ « EcoIndex >B, page <1 Mo, <50 requêtes » : cibles raisonnables (EcoIndex note de A à G ✓).
- Fiche : « smartphone 50-80 kg CO₂ » en **fourchette** — bonne pratique à généraliser à tous les chiffres contestés.
- Footer/navigation propres (© 2026, pas de revendication chiffrée) ; **pas de route `flux-rss` fantôme** (vieux ticket déjà résolu ✓).

---

## 6. Images — examen détaillé

### 6.1 Images-texte en charabia IA (générées avec du faux texte)
| Fichier | Poids | Statut | Description / problème |
|---|---|---|---|
| `programming-languages-comparison-chart-with-energy.webp` | 20 Ko | **ORPHELINE** (référencée nulle part — ouf) | Barres vert→rouge incohérentes, pseudo-texte (« Enesrgy Efinoccy! », « 1,9 % », « 3,0 % », « 5,7 % »), logo Python égaré, labels C/Rust/Python/Java sans logique. **Supprimer.** La page utilise le composant SVG maison, bien. |
| `comparison-chart-new-vs-refurbished-vs-repaire.webp` | 60 Ko | **AFFICHÉE** (hero de la fiche `achat-responsable`) | « VOVGRAPHIIIS / ENVIRONNETLL FORIPHICS », « Buy a new device 253 », « Repairr ned device 240 », faux % (36,26 %, 1276 %, 346 %…), paragraphes en pseudo-latin. **À remplacer en urgence** (c'est la 1re chose qu'on voit sur la fiche). |
| `comparison-chart-of-new-vs-refurbished-electronic-.webp` | 60 Ko | **ORPHELINE** | Faux tableau comparatif (« New Refurished », « Rexgplç », « Oomera », prix $22.9.97, manettes mélangées aux laptops). **Supprimer.** |
| `timeline-infographic-of-digital-technology-evolut.webp` | 44 Ko | **ORPHELINE** | Frise 2010-2025, tout le texte en charabia (« Online video straming », « Ionicicing couldenor »). Seuls titre et dates lisibles. **Supprimer** (ou régénérer en FR si besoin). |
| `circular-lifecycle-diagram-of-smartphone-from-mini.webp` | 44 Ko | **ORPHELINE** | Boucle vert/bleu : icônes propres mais « Miring » (2×), « end of Life », pastilles en pseudo-texte. **Supprimer.** |
| `infographic-recycling-process-with-electronic-de.webp` | 60 Ko | **ORPHELINE** | « Electronion Waste Reccycling », « Colleciol », « Copper Platic », « Golub, mtals and plaattic ». Schéma de flux correct visuellement, texte inutilisable. **Supprimer.** |
| `visual-representation-of-carbon-footprint-with-tr.webp` | 76 Ko | **ORPHELINE** | Pire : « Carbon Sequsering Capacity », « Carbon foctpiint », faux chiffres (« 50 rnaoh », « 2.45 tltxceh »). **Supprimer.** |
| `images/lifecycle-infographic.webp` | 52 Ko | Téléchargeable `/ressources` | « Circular Economy of » + texte en charabia (« Mining eTtomals », « Usee Iife », « End oRecycling »). **Retirer des ressources.** |
| `clean-efficient-code-on-screen-with-green-energy-s.webp` | 36 Ko | AFFICHÉE (`developpement`, fiche écoconception) | Ambiance « code + énergie » correcte en petit, mais le code est du **faux texte** (« eatt algorttx », « atcicmd)) intt ettilnet ») — ironique sur un guide dev. Acceptable en attendant mieux ; idéal : capture de vrai code. |
| `images/smartphone-impact-infographic.webp` | 108 Ko | AFFICHÉE (`comprendre`) | Propre et lisible, MAIS **en anglais** (« THE HIDDEN FOOTPRINT… », « RAW MATERIALS EXTRACTED »…) et valeurs 55 kg / 13 000 L (= la transcription, ≠ le « 50 kg / 12 000 L » du texte). Bonus : la transcription invente « 3 arbres » absents de l'image. Régénérer en FR + harmoniser les chiffres. |
| `images/lifecycle-numerique-hero.webp` | 136 Ko | AFFICHÉE (hero `comprendre`) | Frise 5 phases propre et juste, **en anglais** (« MINING & RAW MATERIAL EXTRACTION »…). Régénérer en FR. |
| `images/co2-distribution.webp` | 560 Ko | Téléchargeable `/ressources` | En français, propre, MAIS **contredit le camembert du site** (47/33/15/5 vs 60/18/2/5+15, §3). Trop lourde (560 Ko !). Trancher les données, recompresser (<150 Ko). |
| `infographic-showing-smartphone-environmental-impac.webp` | 128 Ko | **ORPHELINE — charabia confirmé** (8 encadrés en pseudo-texte, nuages « C, ») | **Supprimer.** |
| Fiches `gestes-quotidiens` / `achat-responsable` / `reparer-prolonger` / `green-it-entreprise.webp` | ~250 Ko au total | AFFICHÉES (cartes) | 4 visuels propres, orthographe correcte, MAIS **100 % en anglais** (« 7 DAILY ACTIONS FOR A SOBER DIGITAL LIFE », « Responsible purchasing guide », « REPAIR AND EXTEND… », « Green IT approach in enterprises », dont un dashboard aux chiffres décoratifs −30 %/+20 %/60 %). Régénérer en FR via Agnes. |

### 6.2 Photos & illustrations OK (bonnes, garder)
- `electronic-waste-pile-with-smartphones-tablets-and.webp` (108 Ko, home) : montagne de smartphones/tablettes/circuits teintée vert, dramatique et efficace. (Clin d'œil : les appareils ont l'air neufs — paradoxe amusant, visuellement ça marche.)
- `abstract-green-technology-network-with-leaves-and-.webp` (48 Ko, fond du hero) : vectoriel plat, feuilles + circuits, sans texte — parfait pour un fond.
- `person-repairing-smartphone-with-tools.webp` (68 Ko, fiche réparer) : scène d'atelier photoréaliste, établie, tournevis, gants — excellente.
- `modern-green-datacenter-with-solar-panels.webp` (240 Ko, fiche datacenters) : vue aérienne, conteneurs serveurs + toit solaire — très bien (lourde : recompresser ~120 Ko).
- `images/green-datacenter.webp` (140 Ko, carte fiche) : bâtiment + solaire + éoliennes, propre, sans texte — bien.
- `images/recycling-electronics.webp` (180 Ko, fiche recyclage) : chaîne de tri de cartes électroniques, deux opérateurs gantés — très bien (recompresser).
- `city-hall-with-sustainable-technology-infrastructu.webp` (136 Ko, fiche collectivités) : non examinée en détail (même générateur, probablement propre) — à confirmer visuellement avant de garder.
- `city-hall-with-sustainable-technology-infrastructu.webp` (136 Ko, fiche collectivités) : photo propre, bâtiment vitré, toit solaire, murs végétalisés, aucun texte — **garder**.
- `og-cover.png` (1 Mo) : déjà validée ; penser à la recompresser (~200-300 Ko) — 1 Mo pour une image de partage, c'est beaucoup.

### 6.3 Poids mort à sortir de l'export (éco-conception : le site prêche la sobriété)
- **14 images orphelines ≈ 1,6 Mo** : les 7 en charabia du §6.1 + `developer-coding-…-green-energy-symbo.webp` (56 Ko), `developer-coding-…-green-leaves-and-e.webp` (40 Ko), `electronic-recycling-bins-….webp` (72 Ko), `modern-green-office-….webp` (124 Ko), `person-using-smartphone-….webp` (60 Ko), `images/energy-optimization.webp` (124 Ko), `images/lifecycle-infographic-new.webp` (636 Ko !), `images/sustainable-coding.webp` (96 Ko, doublon du PNG — vérifié : jamais référencé).
- **`public/img_ori_non_opti/` entier** (≈ 35 fichiers : originaux JPG/PNG + `placeholder.jpg`, `placeholder-logo.png`, `placeholder-user.jpg`) : copié tel quel dans `out/` à chaque build. Le déplacer hors de `public/` (ou le git-ignorer).
- **`developpement` utilise `sustainable-coding.png` (864 Ko !)** en fond de hero : remplacer par le `.webp` (96 Ko) ou recompresser — le site qui recommande WebP ne doit pas servir un PNG de 864 Ko.
- `public/modeles/script-analyse-site.py` + `guide-recyclage-green-it.pdf` : voulus (téléchargements) — OK. (Contenu du PDF **non audité** ici.)

---

## 7. Manques & compléments 2026 (pour aller plus loin)
1. **Règlement UE 2023/1670** (5 ans màj OS, 7 ans pièces, batterie 800 cycles, étiquette énergie — en vigueur 20/06/2025) : absent → à ajouter (`reglementation`, `problematiques`, `faq`, fiche achat).
2. **Directive réparation applicable 31/07/2026** (§2.3) : mettre à jour + renvoyer vers l'annuaire ADEME existant.
3. **Omnibus CSRD** (§2.3) : réécrire la carte.
4. **IA Act** (règlement 2024/1689, obligations GPAI depuis août 2025) + **rapport Arcep IA & environnement (mai 2026)** : absents alors que l'IA a sa page de tendances — ajouter un encadré (avec les chiffres §2.2 : ~0,3 Wh/texte, image/vidéo ×10-100).
5. **EED refondue** (reporting datacenters >500 kW depuis mai 2024) : absente de `/datacenters` + `/reglementation`.
6. **ESPR 2024/1781, USB-C obligatoire (déc. 2024), Green Claims, Data Act** : cités au mieux en passant → compléter `/reglementation`.
7. **Chiffres frais à injecter** : GreenIT EENM 2025 (3,4 %, 1,8 Gt, IA 4 %, 6 appareils/internaute), IEA 415 TWh → 945 TWh 2030, Arcep 18 Go/mois, Uptime PUE 1,56, ADEME 2026 (62 %, 3 ans, 100 M de tiroirs, reconditionné −87 % GES), GEM (22,3 % → 20 % en 2030).
8. **Éducation** : SNT/PIX existent → compléter `agir` au lieu de partir de zéro.
9. **Accessibilité des données** : ajouter millésime + périmètre (France/monde) à chaque chiffre, et une vraie page/bandeau « méthodologie » (les calculateurs `/outils` n'exposent pas leurs hypothèses — non audités ici, à auditer ensuite).

---

## 8. Plan d'action proposé
**P0 (crédibilité, ~1 soirée) :** actus simulées (retirer/marquer fictif) · 1 Go=20 kg → **0,24 g (ADEME Impact CO₂)** : mythe + fiche 15 g + calculateur 200 g · 80 % export → §10.20 · 88 % → 62 % · **53 M smartphones jetés/an → §11.2** · boutons morts → liens (dont certificat quiz) · **website-carbon aléatoire → design §2.4 validé** · ancres mortes → ids · tableau charabia de la fiche achat → remplacer · `quefaire.fr` → bonne URL · transcription « 3 arbres » → 2,5 · `co2-distribution` vs camembert : trancher · **PDF : calcul 2 kg=2 000 km + « levier n°1 »** à corriger.
**P1 (exactitude, ~1 week-end) :** tableau §3 (harmoniser les 25+ lignes) · §2.2 (vols, PUE, 250 TWh→415, ChatGPT, O(n²), WebP, box, SD 0,7 Go, Wi-Fi 4-5×, Python/JS, GPT-3) · §2.3 (CSRD, réparation, bonus 25 €, garantie 2 ans/présomption 24 mois, durabilité/étiquette énergie, règlement 2023/1670) · §4.5 (apps arrière-plan, mails, heures creuses…) · **§4.7 (quiz) + §4.8-4.11 (calculateur, animation +6 %, comparateur cloud, PDF)** · **§11.2-11.3 (fiches, cloud-comparator, calculateur facteurs, sitemap/search)** · Sources `cas-pratiques` · badges « 2025 » / « màj janvier 2025 ».
**P2 (poids + images, ~1 soirée) :** supprimer les 14 orphelines + sortir `img_ori_non_opti/` de `public/` · PNG 864 Ko → WebP · recompresser og-cover + datacenter + recycling + co2-distribution · régénérer les 7 visuels anglais en FR (Agnes, **sans texte** dans l'image + légendes HTML — on a vu ce que donne le texte IA).
**Ensuite :** §7 (compléments 2026) · audit des 7 sous-pages `/modeles/*` (~3 100 lignes, pas de lorem — **non auditées ici**, mais pas de 404 : chaque modèle a sa route ou son download ✓) · audit des **100 réponses du quiz** (structure « 100 questions » confirmée, exactitude non vérifiée) · autres calculateurs (`sobriety`, `enterprise`, `it-audit`, `website` — facteurs à exposer) · vérifications §4.4 (téléphones, URLs, allégations entreprises).

*Fichier local uniquement (git-ignoré via `audit-*.md`). Dis-moi si tu veux que je l'ajoute au repo ou que j'enchaîne sur le P0.*

---

## 9. Table de vérité — une valeur canonique par chiffre, avec sa source exacte

À recopier telle quelle dans tout le site (formulation + « Source : … »). Convention proposée : **« Source : Titre, Organisme, année » + lien** vers le rapport, et mention du périmètre (France/monde) et du millésime des données.

| # | Chiffre canonique | Source exacte à citer | Remplace (pages) |
|---|---|---|---|
| 1 | E-déchets monde : **62 Mt en 2022**, **22,3 %** collectés/recyclés, **82 Mt projetées en 2030** (≈ +2,6 Mt/an) | Global E-waste Monitor 2024, ITU/UNITAR, mars 2024 (ewastemonitor.info) | 74,7 Mt 2025 (home, `problematiques`) → ~69-70 Mt par interpolation ; 17,4 % → 22,3 % ; « +67 % en 10 ans » → ~+55 % 2016-2025 ; « 3× plus vite que la population » → « 5× plus vite que le recyclage » (formule GEM) |
| 2 | Numérique monde : **3,4 % des GES en 2023 (1,8 Gt)** ; « près de 4 % » acceptable | « Impacts environnementaux du numérique dans le monde » (EENM 2025), asso Green IT, fév. 2025 (greenit.eco) ; The Shift Project 2024 | « 4 % » sans source → « 3 à 4 % (GreenIT 2025, Shift 2024) ». Bonus citables : ~6 équipements/internaute, serveurs IA = 4 % des GES du numérique, 40 % du budget GES soutenable |
| 3 | Numérique France : **2,5 % / 17,2 Mt (2020)** ET **4,4 % / 29,5 Mt (2022)** — deux scopes, deux millésimes | ADEME-Arcep 2022 (données 2020, scope France) ; mise à jour ADEME-Arcep 2025 (données 2022, + datacenters étrangers) | `faq` « 2,5 %, 17 Mt (2023) » → présenter les deux scopes. Nouveau scope : terminaux 50 / DC 46 / réseaux 4 ; fabrication 60 / usage 40 ; 117 Mt de ressources (1,7 t/pers/an) ; 434 kg/pers/an ; 11 % de l'élec FR (51,5 TWh) ; tendanciel **×3 d'ici 2050** (remplace « doubler 2030 ») |
| 4 | Smartphone : fabrication ≈ **3/4 des impacts** ; carbone ≈ **90 % production** (périmètre carbone) | ADEME « La face cachée du numérique » 2019 ; The Shift Project 2021 | Unifier le discours : « ~75 % tous impacts (ADEME), jusqu'à ~90 % du carbone (Shift) » |
| 5 | Smartphone CO₂ : **50 kg cycle de vie** (périmètre complet) ; construction seule **79,3 kg** (NégaOctet) ; GES embarquées **~72 kg** (Arcep : 72 kt ≈ 1 M de smartphones, 2024) | Base Carbone ADEME 2018 ; Impact CO₂ / base NégaOctet ; Arcep « Pour un numérique soutenable » mai 2026 | Trancher : afficher 50 kg + note « 79 kg pour la seule fabrication (mix et méthodes) ». Quiz/calculateur/image : une seule valeur |
| 6 | Smartphone matières : **70 kg** (méthode classique) ; **~200 kg MIPS** ; reconditionné évite **82 kg/an + 25 kg GES/an**, **−77 à −91 %/an**, **« jusqu'à 8× moins »** | ADEME 2019 (FNE) ; ADEME « produits reconditionnés » 2022 ; ADEME agir-pour-la-transition (màj 01/2026) | Remplace « −75 % » seul → fourchette « −75 % à −90 % (≈ 8× moins) ». Reconditionné ≈ 8 kg vs ≈ 86 kg neuf |
| 7 | Durée de vie smartphone : **2 à 3 ans** (23-37 mois) ; changement **tous les 3 ans**, **62 % encore fonctionnels**, **100 M d'appareils dans les tiroirs** | ADEME 2021 ; ADEME agir (màj 01/2026) | Remplace 2,3 ans / 2,5 ans / 88 % partout (quiz compris) |
| 8 | Allonger la durée : PC/tablette **2→4 ans = −50 %** ; smartphone **×2 durée = −28 %/an** ; **3→4 ans = −25 %/an** (calcul) | ADEME (Librairie, 2025) ; ADEME 2020 ; calcul | À injecter (`comprendre`, `cas-pratiques`, quiz) |
| 9 | Laptop : fabrication **150-185 kg** (afficher 156, Base Carbone) ; **800 kg de matières** ; usage **7,6 kg** (ADEME) | Base Carbone ADEME 2018 ; ADEME via RG3E | Remplace l'analogie Paris-NY (→ AR Paris-Marseille, DGAC) ; « 800 kWh = 8 mois » → ~2 mois ; eau 20 000 L : source à retrouver ou retirer |
| 10 | Datacenters monde : **415 TWh, 1,5 % (2024)** ; **~945 TWh (~3 %) en 2030** (scénario central) | IEA « Energy and AI », avril 2025 | Remplace 250 TWh ; PUE **1,56** monde / **1,45** Europe (Uptime 2024, remplace 1,67) ; camembert froid à recalculer (~25-30 %, pas 40 %) |
| 11 | Data mobile FR : **18 Go/mois (2025)**, 16 Go (2024), **+13 %/an** | Arcep, observatoires 2024 (déc. 2025) et 2025 provisoire | Remplace 5 Go/mois ; « double tous les 3 ans » → ~tous les 6 ans en France |
| 12 | Streaming : **60 % du trafic (2018-2019**, à actualiser Sandvine) ; 1 Go ≈ SD 0,7 / HD 3 / UHD 7 ; **56-400 g/h** selon hypothèses (fourchette, pas de valeur unique) ; 4G ≈ **4×** le Wi-Fi | Shift 2019 ; Kamiya/CarbonBrief 2020 | Remplace 100/300/30 g, 370/50 g, 50 g HD, SD 0,3 Go, Wi-Fi 20×/2×/3× → fourchettes + « ~4-5× moins en Wi-Fi » |
| 13 | IA : requête texte **~0,3 Wh** (≈ Google) ; raisonnement 3,9-40 Wh ; image 5-15 Wh ; vidéo 30-100 Wh ; **48 % des Français** l'utilisent (2025) | Epoch AI fév. 2025 ; Altman juin 2025 (0,34) ; Google août 2025 (0,24) ; Joule 2026 (0,31) ; Arcep mai 2026 | Remplace « 10-100× », 2,9 Wh |
| 14 | Box : **88,5 kWh/an (10,1 W, 17,70 €)** ; extinction 8 h/nuit **−26,3 kWh (−5,26 €)** ; Wi-Fi seul −1,8 W (~−1 €) ; box+décodeurs **3,4 TWh (2024)** ; décodeur en veille 4,1 W. Nuance : éteindre coupe ligne fixe/alarme/objets connectés | Arcep « Pour un numérique soutenable » mai 2026 (données 2024) ; ADEME (veille 8-20 h/j économisables) ; TRV 0,2001 €/kWh (août 2026) | Remplace 65 kWh, « 10 €/an », quiz 150-300 kWh → 50-100 kWh |
| 15 | E-mail : **4 g simple / 35 g avec PJ / 0,3 g spam** (scénario pro 33 mails/jour de 1 Mo) ; **1 an d'e-mails ≈ 0,27 kg** ; stockage ≈ 3 g/an par Mo | ADEME, ACV e-mail 2011 (chiffres repris 2019) ; ADEME Académie / Impact CO₂ ; FileVert (méthode redondance) | Harmoniser : 4-50 g selon PJ (déjà dans la FAQ) ; quiz 0,9 g et calculateur 0,8 g → aligner sur 4 g ; `mythes` 10 g/an de stockage : ordre plausible, à sourcer |
| 16 | Vols : **1 tCO₂e = 1 AR Paris/NY = 6 AR Paris/Marseille** ; voiture solo ~0,12-0,19 kg/km | Éco-calculateur DGAC ; SNCF Connect / Base Carbone | Refondre toutes les analogies avion/voiture (laptop ≈ 1 AR Paris-Marseille ; 50 kg ≈ 300 km solo ; calculateur ÷120 → ÷500-1 000) |
| 17 | Code : Python **×75,88** / JS **×4,45** (C = 1) ; GPT-3 **552 tCO₂e** | Pereira et al., SLE **2017** (pas 2025 !) ; Patterson et al. 2021 | Corriger transcription 3,14→4,45, FAQ 57→76, « 5 voitures-vie », O(n²) 10 000→1 000×, WebP 65 %→~30 % |
| 18 | Droit (sept. 2026) : CSRD Omnibus (**JOUE 26/02/2026**, >1 000 salariés ET >450 M€, transposition 19/03/2027, ~5 000 entreprises) ; réparation **applicable 31/07/2026** (2024/1799, garantie +12 mois si réparation) ; bonus **10-65 € (smartphone 25 €, QualiRépar)** ; garantie **2 ans, présomption 24 mois** neuf+reconditionné (L.217-7) ; UE 2023/1670 (**20/06/2025** : 5 ans OS, 7 ans pièces, 800 cycles/80 %, étiquette énergie) ; durabilité TV 01/2025 + lave-linge 04/2025 | EUR-Lex ; service-public.gouv.fr (vérifié 07/2025 et 08/2026) ; ADEME quefairedemesdechets ; DGE 23/06/2025 | Réécrire cartes CSRD/réparation/bonus/garantie/indice ; ajouter règlement smartphones dans `reglementation` |
| 19 | Reconditionné marché : **4 % des ventes opérateurs / 29 % autres canaux**, +4 %/+10 % en 2024, **7,1 M** de téléphones vendus par les opérateurs | Arcep « Pour un numérique soutenable » mai 2026 | Remplace « 2,5 Mds € / 2,5-3,2 M » non sourcés |
| 20 | DEEE : collecte **65 % depuis 2019** (moyenne mises sur le marché N-3) ; valorisation ~85 % par catégorie | Directive 2012/19/UE (réexamen en cours, pas de « révision 2023 ») | Reformuler « objectif 65 % en 2025 » ; objectif UE 70 % recyclage 2030 : à sourcer (plan économie circulaire) ou retirer. Précisions Ecosystem (mars 2026) : **876 kt collectées en 2025, 65 % à son périmètre, 42 000 points** (remplace « 15 000 »), **79,2 % recyclés/réutilisés et 91,3 % valorisés des collectés** (2024 — distinguer *collecte* vs *recyclage*), **735 000 réparations** via 7 465 QualiRépar, 25 % des DEEE captés par l'illégal |
| 21 | Bots : **51 % du trafic automatisé dont 37 % malveillants (2024)** ; hyperscale : **~1 136 fin 2024** (capacité ×2 en <4 ans, US 54 %, pipeline 504) | Imperva Bad Bot Report 2025 ; Synergy Research, mars 2025 | Quiz 42 % → 51 % ; quiz 800 → 1 136 |
| 22 | Lithium : demande **×3 entre 2017 et 2022**, 56-60 % pour batteries (2022) ; Taïwan (TSMC) : **67 % de la fonderie** mondiale en valeur (T4 2024) | IEA Critical Minerals Market Review 2023 ; Counterpoint, mars 2025 | « +400 % lithium » → ×3 sourcé ; « 60 % des puces à Taïwan » → « ~2/3 de la fonderie (TSMC) » |
| 23 | E-déchets Sud : Nigeria **~288 kt** UEEE importés (2017), Ghana **~215 kt** (dont ~15-56 % de vrais déchets), **~20 kt/an** illégaux au Ghana (2019) ; 352 kt UE→pays en développement (BAN) ; Agbogbloshie **démantelé 07/2021** | UAB/Basel 2021 (Odenyingbo, Sovacool) ; Trésor français 2019 ; PMC 2024 | Réécrire « 80 % exportés » et « 250 kt » avec ces chiffres |
| 24 | Allongement : **tous les foyers +1 an sur 11 équipements = 0,6 Mt/an** évitées (6 Mt/10 ans) et **2,7 Mds €/an** d'économies ; laptop +3 ans = **−65 kg / +336 €** ; smartphone +2 ans = **−16 kg** | ADEME 2020 (communiqué 09/06/2020, étude durée d'usage) | FAQ « 2,7 Mt/an, 1,5 M de voitures » → 0,6 Mt/an (le « 2,7 » = des Mds € — confusion €/t) |
| 25 | Eau : smartphone **~12 000 L** (ordre de grandeur, Water Footprint Network) ; laptop : **fourchette 1 500 L** (eau bleue, Williams) **à 20 000 L+** selon méthode — afficher une fourchette prudente, pas un absolu ; eau des DC : Google **15 Md L en 2021** (≈ 300 000 Français) | WFN via Syage ; GreenIT.fr 2013 (Williams) ; Siare95 ; Google 2021 | 12 000/13 000/15 000 L → 12 000 (WFN) partout ; 20 000 L laptop → fourchette + méthode ; image/transcription 13 000 → 12 000 ; suggérer un encadré eau/WUE des datacenters |
| 26 | Stockage cloud : **0,24 g CO₂e/Go/an** (construction DC 53 % + usage 47 %) | ADEME Impact CO₂ (Base Empreinte) — impactco2.fr | Remplace 20 kg (mythe, ×80 000), 15 g (FAQ/fiche, ×60), 200 g (calculateur, ×800). Transfert (autre unité !) : SWD v4 ≈ 96 g/Go opérationnel mix mondial ; réseau FR seul ≈ 34 g/Go (Greenly, d'après Arcep 2022) |
| 27 | Label NR : **~350 organisations labellisées** (communauté 1 300), référentiel en restructuration 2026-2028 (ICDSC) | JNR ADN Ouest, mars 2026 | « 450+ » → ~350 + millésime ; mentionner la restructuration si la page suit le label |
| 28 | Baromètre Green IT **2025 : existe** ✓ (AGIT, 4e édition, fév. 2025, **588 entreprises**, enquête avr-sept 2024 + Occurrence, soutenu ADEME, 22 indicateurs) | alliancegreenit.org | Quiz : citer « AGIT 2025, 588 entreprises » + piocher de vrais indicateurs |
| 29 | E-mails : Radicati suit les volumes (376,4 Mds/jour en 2025) mais le détail par utilisateur est payant ; **le « 120 reçus/j » du quiz mélange probablement envoyés+reçus (millésime ~2021, monde, pro)** | Radicati Email Statistics 2021-2025 | Reformuler « ~120 envoyés et reçus par jour (Radicati, monde, pro) » ou retrouver le dataset |
| 30 | Stockage cloud : **0,24 g CO₂e/Go/an** (construction DC 53 % + usage 47 %) | ADEME Impact CO₂ (Base Empreinte) — impactco2.fr | Remplace 20 kg (mythe, ×80 000), 15 g (FAQ/fiche, ×60), 200 g (calculateur, ×800). Transfert (autre unité !) : SWD v4 ≈ 96 g/Go opérationnel mix mondial ; réseau FR seul ≈ 34 g/Go (Greenly, d'après Arcep 2022) |
| 31 | Datacenters : **~250 en France** (200 en 2020, France Datacenter) ; **10 000+ dans le monde** (DataCenterMap) | France Datacenter (2020) ; DataCenterMap | « 8 000+ » → 10 000+ ; « 250+ » plausible |
| 32 | Apple : **20 % d'aluminium recyclé en moyenne** (2025) ; iPhone 15 = **4/10**, iPhone 15 Pro = **7/10** iFixit | Apple Environmental Progress Report 2025 ; iFixit | « 75 % alu recyclé » faux (20 %) ; « 6,5/10 » moyenne acceptable mais à nuancer par modèle |
| 33 | Fraunhofer : **étude IZM 2022** (Fairphone 4 : −31 % sur 5 vs 3 ans, 43 kg CO₂eq) ; **pas d'étude 2025** | Fraunhofer IZM, 03/05/2022 | « Fraunhofer 2025 » (mythes #6) → 2022 ou retirer |
| 34 | Serveurs sous-utilisés : **50 %** (< 20 % capacité) | Quiz cite Uptime Institute | Conserver avec mention de la source |
| 35 | WUE : **1,8 L/kWh** | Quiz cite The Green Grid | Conserver avec mention de la source |
| 36 | Or 15 % recyclé (DEEE) | Quiz cite probablement Ecosystem/GEM | Conserver avec source |
| 37 | Cuivre : **5 000 L d'eau/kg** | Quiz | Conserver |
| 38 | Parc FR (60M/50M/26M) : **introuvable** dans extraits ADEME-Arcep | — | **Retirer** ou retrouver dans l'étude complète |
| 39 | Réparations (+42 %), 2,3 Mds €, 8,2/10, 92 % : **introuvables** | — | **Retirer**, remplacer par bonus 4→25 M€/an, lave-vaisselle >8,1 = +28 % ventes (Univers Habitat 2025) |
| 40 | Entreprises cloud : **52,7 % UE (2025)** + Insee TIC 2024 FR | Eurostat ; Insee | Remplace « 70 % » faux |
| 41 | Poids web : median desktop ≈ **2,3 Mo**, mobile ≈ **1,9 Mo** (2024) | HTTP Archive | Quiz 2,1 Mo → fourchette + source |
| 42 | Reconditionné : **7,1 M de téléphones** opérateurs 2024 (Arcep), **pas 2,5 M / 2,5 Mds €** | Arcep « Pour un numérique soutenable » mai 2026 | Corriger les 2 versions internes |

## 10. Corrections prêtes à l'emploi (avant → après)

1. **Home** : « 74,7 Mt de déchets électroniques dans le monde en 2025 (Global E-Waste Monitor, ONU) » → « ~70 Mt en 2025, sur une trajectoire de 62 Mt en 2022 vers 82 Mt en 2030 (Global E-waste Monitor 2024, ONU) ».
2. **`mythes` #3 / `problematiques`** : « 17,4 % recyclés » → « 22 % documentés comme collectés et recyclés en 2022 — et 20 % projetés en 2030 si rien ne change (Global E-waste Monitor 2024, ONU) ».
3. **`problematiques`** : « 80 % des e-déchets exportés vers l'Afrique et l'Asie » → « Une partie des e-déchets européens est exportée illégalement (souvent déguisée en « occasion »), mais la majorité est traitée localement ; le vrai scandale documenté, c'est que le recyclage mondial (22 %) ne suit pas la production (Global E-waste Monitor 2024) ».
4. **`problematiques` / `perspectives`** : « ChatGPT = 10 à 100× Google (2,9 Wh vs 0,3 Wh) » → « Une requête texte consomme ~0,3 Wh, comme une recherche Google (mesures 2025-2026) ; ce sont le raisonnement (×10-100), la génération d'images (5-15 Wh) et de vidéos (30-100 Wh) qui plombent le bilan (Arcep, mai 2026) ».
5. **`datacenters`** : « 250 TWh » → « 415 TWh en 2024 (1,5 % de l'électricité mondiale), ~945 TWh projetés en 2030 (IEA, Energy & AI, avril 2025) ». PUE « 1,67 » → « 1,56 dans le monde, 1,45 en Europe (Uptime Institute, 2024) ».
6. **`cas-pratiques` laptop** : « autant qu'un vol Paris-New York » → « autant qu'un **aller-retour Paris-Marseille en avion** (~167 kg aller-retour par passager, calculateur DGAC) ».
7. **`faq` box** : « 65 kWh/an » → « ~88 kWh/an en continu (10 W), soit ~18 €/an » ; « éteindre la nuit : 10 €/an » → « **jusqu'à ~26 kWh et ~5 €/an** (8 h/nuit), en sachant que ça coupe aussi la ligne fixe et les objets connectés (Arcep, mai 2026) ».
8. **Quiz box** : bonne réponse « 150-300 kWh » → « **50-100 kWh** (~88 kWh/an en continu, Arcep 2026) ».
9. **Quiz terres rares** : réécrire — ex. « Combien de métaux contient un smartphone ? (~50, ADEME) » et/ou « Combien existe-t-il de terres rares ? (17, dont une poignée dans nos téléphones : néodyme, dysprosium…) ».
10. **CSRD (`reglementation`)** : seuils « >250 salariés / PME cotées 2026 / 50 000 entreprises » → « **>1 000 salariés ET >450 M€ de CA cumulés, ~5 000 entreprises, PME cotées exclues** (directive Omnibus I, JOUE 26/02/2026, transposition FR au plus tard 19/03/2027) ».
11. **Bonus (`faq`)** : « jusqu'à 45 € » → « **de 10 à 65 € selon l'appareil — 25 € pour un smartphone** — déduits directement par un réparateur labellisé QualiRépar, hors garantie (ADEME) ». Garantie : « minimum 6 mois » → « **garantie légale de 2 ans, défauts présumés antérieurs 24 mois pour le reconditionné** (C. conso, art. L.217-7) ».
12. **`faq` renouvellement** : « 88 % remplacés alors qu'ils fonctionnent » → « **62 % sont renouvelés alors qu'ils fonctionnent encore, on en change en moyenne tous les 3 ans, et 100 millions dorment dans nos tiroirs** (ADEME, 2026) ».
13. **PDF** : « 2 kg = 2 000 km (Paris-Istanbul) » → « recycler un smartphone évite **quelques kg de CO₂** (valeur exacte à sourcer — la fiche dit 20 kg, à harmoniser), soit quelques dizaines de km en voiture, pas 2 000 » ; « le recyclage est le levier n°1 » → « **le levier n°1, c'est de garder plus longtemps : 2→4 ans = −50 % (ADEME)** ; le recyclage vient après réduction, réparation et réemploi ».
14. **`mythes` #1** : « 1 Go/an = 20 kg » → « **stocker 1 Go pendant un an ≈ 0,24 g de CO₂ (ADEME Impact CO₂, Base Empreinte)** — à comparer aux ~50 kg de la fabrication d'un smartphone : le vrai sujet, c'est l'appareil, pas le cloud ». La chute existante (« priorisez les actions à fort impact ») est déjà la bonne — garder.
15. **Part du numérique (`a-propos`, home)** : « 4 % » → « **3 à 4 %** des émissions mondiales (1,8 Gt en 2023 — GreenIT EENM 2025 ; « près de 4 % » — Shift 2024), **2,5 % en France en 2020 et 4,4 % en 2022** selon le périmètre (ADEME-Arcep 2022 et 2025) » ; « pourrait doubler d'ici 2030 » → « **×3 d'ici 2050 en tendanciel** (ADEME-Arcep) ».
16. **Eau smartphone** (12 000 vs 13 000 vs 15 000 L) : retenir **12 000 L (Water Footprint Network)** partout ; laptop : **fourchette + méthode** (voir §9.25), pas d'absolu.
17. **Quiz droit** : AGEC « 2021 » → **10/02/2020** ; pièces détachées smartphone « 5 ans » → **7 ans** (UE 2023/1670 — refaire les options, aucun « 7 ans » proposé) ; PUE « 1,2 en moyenne » → « les meilleurs sites » (moyenne 1,56) ; dark mode « 60 % » → **30-50 % (Purdue 2021)** ; bots « 42 % » → **51 % (Imperva 2025)** ; hyperscale « 800 » → **~1 136 (Synergy 2025)** ; « 1,5 Md t » → **1,8 Gt (EENM 2025)** ; collecte « 65 % atteints » → nuancer (objectif réglementaire ; 65 % = périmètre Ecosystem 2025).
18. **`website-carbon` → design validé (estimateur hybride, voir §2.4).** **Certificat quiz sans action** → brancher (impression/PDF) ou retirer. **Outils incohérents** : usage laptop 22 (calculateur, modulé) vs 30 (audit/enterprise, brut) → une méthode ; enterprise 120 €/an/appareil → expliciter ou corriger ; 0,18 → **0,20 €/kWh**.
19. **`/recyclage`** : « 15 000 points » → **~42 000 (Ecosystem, 2026)** ; ajouter 876 kt / 79,2 % / 91,3 % / 735 000 réparations / 25 % illégal ; RNRR : 312 structures, 25 kt réemployées.
20. **`problematiques` Sud** : remplacer « 80 % exportés » + « 250 kt » par le §9.23 précis (Nigeria 288 kt / Ghana 215 kt 2017, 20 kt illégaux/an, Agbogbloshie démantelé 2021).
21. **Lithium/Taïwan** : « +400 % » → « demande **×3 entre 2017 et 2022** (IEA) » ; « 60 % des puces » → « **~2/3 de la fonderie mondiale (TSMC, T4 2024)** ».
22. **FAQ « 2,7 Mt/an »** → « **~0,6 Mt/an** si tous les foyers allongent d'1 an 11 équipements (ADEME 2020) — et 2,7 Mds €/an d'économies ».
23. **Comparateur cloud** : légende PUE « 1,2 = 20 % pour le refroidissement » → « **~17 %** pour refroidissement **+ infrastructures** (0,2/1,2) » ; « données 2025 » (titre) vs « 2024-2025 » (pied) → dater « 2024-2026 » après màj ; **objectifs 2025 expirés** : AWS « objectif 100 % 2025 » → « **100 % atteint en 2023** (annoncé 2024) » ; OVH « neutralité 2025 » → vérifier le résultat dans le rapport RSE 2025 ou reformuler ; Google « 100 % renouvelable » → préciser « matching annuel, objectif 24/7 en 2030 » ; **scores éco maison (98/95/…) → badge « score indicatif de la rédaction »** ; resourcer les 8 fiches (PUE OVH/Scaleway/DO/Hetzner/Infomaniak, % renouvelables, ✅ neutre carbone — Hetzner/Scaleway/Infomaniak à confirmer —, « DC4 », « TÜV » à préciser).
24. **Fiches** : Samsung « 4 ans garantis » → « **jusqu'à 7 ans** (gammes récentes, depuis 2024) » ; « C consomme 57× moins que Python » → « **~75×** (Pereira et al. 2017, énergie) » ou citer l'autre étude ; « recyclage 85 % » → « **~79 % recyclés, ~91 % valorisés** (Ecosystem 2024) » ; « 3→5 ans = −40 %/an » → recalculer (~−30 %) ou sourcer ; « 80 % des fonctionnalités jamais utilisées » → reformuler sans chiffre ou sourcer ; « 2,5 M d'appareils / 2,5 Mds € en 2024 » → sourcer (les deux ensemble impliquent ~1 000 €/appareil — incohérent, trancher) ; Fairphone « réparable à 100 % » → « 10/10 iFixit, quasi intégralement ».
25. **Calculateur** : facteur cloud ×0,00024 (voir §9.26 — le curseur devient quasi nul, c'est juste) ; streaming 31 g/h = niveau **SD** (l'écrire + idéalement sélecteur de qualité) ; social 7 g/h = **hors vidéo** (l'écrire) ; PC fixe 296 kg vs 169 (tableau-bord) → trancher ; « Français moyen 285 kg (2025) » → sourcer (ni ADEME-Arcep FR ~430 ni GreenIT mondial ~225-330) ; « données ADEME 2025 » → sources exactes.
26. **Plan du site + recherche** : sitemap-page oublie **7 pages** (actualités, FAQ, mythes, par-ou-commencer, fiches, guide, modèles) ; search-dialog ignore les 7 sous-pages modèles + mentions-legales (+ envisager plein-texte, P1).
27. **Hero `mythes`** : « des données sourcées et à jour » → exiger les sections Sources sur chaque page **ou** retirer la promesse (cas-pratiques a une section Sources vide).

## 11. Passe 5 — couverture & angles morts (14/09, après-midi)
Inventaire : 33 routes (`app/**/page.tsx`), ~30 composants, 7 outils, 20 images vues, quiz 100/100. Croisement avec les passes 1-4.

### 11.1 Statut par zone
- **7 pages `modeles/*` (~3 500 lignes, jamais lues)** → lues. `tableau-bord` 🟢 (table sourcée « Base Empreinte 2024 », calculs 10 000/1 660/1 500/13 160 kg justes, bonus −75 % cohérent). Autres : cibles de template (−30 %, budgets, 150 t→105 t) acceptables **car** footers « libre d'usage — à adapter » présents sur les 7 pages ✓. Restes : intro charte « 4 % / 2,5 % / 17 Mt » → §10.15 ; années en dur 2026→2028 (plan-action trimestrialisé — vieillira vite : passer en Année 1/T1-T4 ou maintenance annuelle) ; plancher « 4 Go RAM / dual-core » (politique) à relever ou justifier (bureautique légère).
- **Composants dataviz** (`comparison-chart`, `visual-analogy`, `scale-comparison`, `animated-*`, `image-zoom`, `related-links`) : coquilles génériques, données dans les pages ✓ — **sauf** `AnimatedImpactBars` (« fabrication 60 % » en dur, affiché dans `comprendre` qui dit aussi 75 %) → §11.2.
- **Recherche** : 22 entrées (3 suggestions + 19 pages) — mieux que les « 10 pages » de la note AGENTS.md (obsolète). Manquent : les **7 sous-pages `modeles`** (le contenu le plus récent !) + `mentions-legales`. Recherche sur titres seuls, pas plein-texte.
- **`offline`** : rien à auditer 🟢. **`guide`** : « 4 ans minimum » (vs 5 ans ailleurs → §3) + 156 kg/800 kg/−50 % ✓ (ADEME). **Fiches [id]** : « 70 matériaux » ✓ (cohérent : 70 contenus vs 20 recyclables vs 1 % terres rares recyclées — à expliciter une fois).
- **Facteurs d'usage du calculateur** (0,3 / 1,6 / 0,2 / 2,5 kg) : non sourcés dans l'UI → documenter (le quiz « 30 mails/j → 10 kg/an » est cohérent avec 0,3 ✓ ; « 24 kg DEEE / 1,6 Mt » math OK ✓).
- **Non relus** : `sitemap-page` (présumée liste auto), `mentions-legales` (couverte par le chantier RGPD, pas réauditée ici), conseils des fiches un par un (volume — prioriser fiche `achat-responsable` + conseils chiffrés), `scripts/generate-pdf-guide.js` (contenu = le PDF audité, OK par proxy).

### 11.2 Nouvelles prises
- 🔴 **`guide-sensibilisation` : « 53 millions de smartphones jetés/an »** (plan de présentation, sans périmètre). Impossible en flux France (~3× les ventes ~15-20 M/an ; probable confusion stock/flux ou FR/UE — le « 54 M » d'Ecosystem est un *gisement*, pas un flux). → Remplacer par 100 M d'appareils dans les tiroirs (ADEME 2026) + ventes FR (Arcep), ou sourcer le périmètre UE si c'est lui.
- 🟠 **Quiz data « 15 Go/mois en 2025 »** → Arcep : 16 Go (2024), ~18 Go (2025). **Quiz circuits « 1 600 kWh = 6 mois de foyer »** → 1 600 ÷ 4 700 ≈ **4 mois**.
- 🟡 **Quiz à sourcer** : « 30 % des métaux rares recyclables » (distinguer recyclabilité vs 1 % effectivement recyclé — GEM 2024) ; « 2,5 ans en 2025 » (greffer source Arcep) ; « 70 kg / ×470 » (citer ADEME face cachée — calcul juste) ; « +6 %/an » (probablement Shift 2018, à confirmer) ; « ADEME 2025 » ×2-3 (78 %, laptop 156 kg → remplacer par ADEME-Arcep 2022/2023, Base Empreinte).
- 🟡 **Affiches sensibilisation** : « −80 % en coupant la caméra » (sans unité → « jusqu'à −80 % de **bande passante** », cohérent avec le quiz 60-80 %) ; « 10 % d'économies faciles » (préciser le périmètre) ; « 100 % à recycler » OK + nuance REP.
- 🟡 **`comprendre`** : barres « fabrication 60 % » → labeliser « hors extraction » et articuler avec le camembert (60 + 15 = 75).
- 🟢 **Nouveaux bons points** : `politique-numerique` « pièces 7 ans » (appuie §10.17 contre le quiz !) ; quiz WebP/30 mails/24 kg/120 mails-cohérents ; écran 248 cohérent `chiffres` (l'outlier est `it-audit` 350).

### 11.3 Passe 6 — fiches, cloud, mythes, calculateur (14/09, soir)
Données des 8 fiches lues in extenso (`[id]/page.tsx`), `cloud-comparator` relu en intégralité, facteurs du calculateur vérifiés, mythes relus, vérifs web : label NR, Radicati, Baromètre.
- 🔴 **Trouvaille structurante — le stockage cloud a QUATRE versions** : mythe 20 kg, fiche 15 g, calculateur 200 g, vérité **0,24 g/Go/an (ADEME Impact CO₂, Base Empreinte)**. Le mythe est faux ×80 000. Conséquence : le curseur « cloud » du calculateur s'effondre après correction — c'est pédagogiquement juste (mythe #5). Le message « nettoyez votre cloud » doit migrer vers les vrais leviers (terminaux, transferts).
- 🔴 **Fiche écoconception : « 1 Mo transféré = 20 g »** (= 20 000 g/Go, ×200 vs SWD v4 ~96 g/Go opérationnel) — même famille que le mythe 20 kg, à remplacer par la formule.
- 🟠 **Comparateur cloud** : légende PUE fausse (1,2 → ~17 % overhead total, pas « 20 % refroidissement ») ; objectifs 2025 expirés (AWS : **100 % renouvelable atteint dès 2023** — la fiche le sous-vend ; OVH « neutralité 2025 » à vérifier/expiré) ; scores maison 98/95/… non signalés comme tels ; ~8 faits vendeurs à resourcer (PUE, %, ✅ neutre, « DC4 », « TÜV ») — détail §10.23.
- 🟠 **Fiches** : Samsung « 4 ans » → 7 ans (gammes récentes) ; « C 57× moins que Python » → ~75× (Pereira 2017) ; « recyclage 85 % » → 79 % recyclé / 91 % valorisé ; « 3→5 ans = −40 %/an » → ~−30 % (calcul) ; « 2,5 M d'appareils + 2,5 Mds € » incohérent (~1 000 €/u — trancher) — détail §10.24.
- 🟠 **Calculateur** : PC fixe 296 kg vs 169 (tableau-bord) ; « Français moyen 285 kg » sans source ; « ADEME 2025 » vague — détail §10.25. Streaming 31 g/h = niveau SD et social 7 g/h = hors vidéo : justes SI étiquetés comme tels.
- 🟡 **Streaming** : mythe HD 100 g/h + fiche 4K 370 g/h + mythe 4K 300 g/h — tous dans la fourchette §9.12, harmoniser « ~300-370 » + millésimer (Shift 2019) ; Wi-Fi « 2× moins » : ordre plausible, facteur exact débattu (×2 à ×10) ; DC « 1,5 % » : millésimer 2024 (IEA).
- 🟡 **Mythes** : hero « données sourcées et à jour » vs sections Sources parfois vides → exiger ou retirer (§10.27) ; e-mail stocké 10 g/an à sourcer (ADEME 2022) ; calcul « 5 000 e-mails » juste ✓.
- 🟢 **Fiches solides** : 4K 6,5 Go/h ✓, 720p ~50 g ✓, WebP −30 % / AVIF −50 % ✓ (appuient la correction WebP !), « garder 4 ans au lieu de 2 ≈ ÷2 » vérifié par le calcul ✓, batterie 50-80 € ✓, charge 20-80 % ✓, 5 ans/7 ans ✓, Fairphone/Apple à nuancer sans urgence.
- 🟢 **Vérifs web closes** : label NR ~350 (§9.27), Baromètre AGIT 2025 existe (§9.28), Radicati à reformuler (§9.29), « 1,76 g » obsolète ère v2/v3 (§9.26).

*Et ensuite : §8 (P0/P1/P2) reste l'ordre d'exécution ; §§9-10 en sont le contenu.*


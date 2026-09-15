# Design — Solde des oublis P0 + correction du quiz Green IT

**Date :** 15 septembre 2026
**Approche validée :** B — révision sourcée du quiz, correctif moteur, puis contrôle pessimiste des vagues précédentes.
**Statut :** en attente de relecture utilisateur avant plan d'implémentation.
**Périmètre :** `components/quiz-green-it-advanced.tsx`, pages/outils touchés par les oublis, docs de suivi.

## 1. Contexte

- Site statique Next 16 (`output: export`, `basePath: /greenit`), 23 pages, 7 outils.
- Le quiz avancé contient 100 questions, 10 catégories, 4 modes (Découverte, Défi, Complet, Thématique).
- L'audit `audit-contenu-2026-09.md` et la vérification pessimiste du 15/09 confirment :
  - des réponses/explications fausses ou obsolètes dans le quiz ;
  - des sources fictives ou trop vagues (« ADEME 2025 », « ARCEP 2025 », « IEA 2025 ») ;
  - des bugs moteur (niveau calculé sur 15 pts/question, division par zéro, tirage biaisé, timer suspendu, certificat sans seuil ni mise en page) ;
  - des oublis des vagues précédentes : `74,7 Mt` toujours sur l'accueil, `2,3 ans`/`2,5 ans`, erreurs dans `fiches-pratiques`, sources vagues dans les calculateurs, docs internes périmées.
- Règles AGENTS.md : français, ton sympa non culpabilisant, source + année pour chaque chiffre, tokens Tailwind, `lucide-react`, webp, vérification sous `/greenit/`, petits commits ciblés.

## 2. Objectifs

1. Solder les oublis P0 des vagues précédentes **avant** de toucher au quiz.
2. Corriger chaque erreur factuelle avérée du quiz (réponse, explication, source).
3. Réparer le moteur : score, niveaux, tirage, timer, score moyen, certificat.
4. Améliorer l'accessibilité de l'écran de question.
5. Vérifier : `tsc`, build, export, greps de non-régression, test manuel sous `/greenit/`.
6. Mettre à jour `todo.md`, `changelog.md`, `suivi-audit-2026-09.md`.

## 3. Non-objectifs

- Pas de refonte visuelle du site ni du quiz.
- Pas de réécriture stylistique des 100 questions : on ne corrige que le faux, l'ambigu et le non sourcé.
- Pas de traitement des images (vague 3) : images orphelines, `img_ori_non_opti`, conversions lourdes restent parquées.
- Pas de nouvelles dépendances.
- Pas de commit de `out/` ni de `node_modules`.

## 4. Phase 0 — soldes des oublis avant quiz

### 4.1 Accueil et pages de contenu

| Fichier | Constat | Correction |
|---|---|---|
| `app/page.tsx` | `74,7 Mt` e-déchets 2025 | `~70 Mt` (trajectoire 62 Mt 2022 → 82 Mt 2030, Global E-waste Monitor 2024, ONU) |
| `app/page.tsx` | `78 %` et `4 %` avec sources vagues | `~80 %` fabrication des équipements (ADEME-Arcep 2023, données 2020-2022) ; `3,4 %` des GES mondiaux, 1,8 Gt CO2e (GreenIT EENM 2025) |
| `app/page.tsx` | `2,3 ans` durée de vie | `2 à 3 ans`, changement « tous les 3 ans » (ADEME 2026) |
| `app/problematiques/page.tsx` | `2,5 ans` | même formulation (ADEME 2026) |
| `app/perspectives/page.tsx` | `2,5 ans` | même formulation (ADEME 2026) |
| `app/mythes/page.tsx` | `17,4 %` recyclés | `22,3 %` collectés/recyclés en 2022 (Global E-waste Monitor 2024, ONU) |
| `app/mythes/page.tsx` | Wi-Fi `2×` moins | `~4-5× moins en streaming` (Kamiya 2020 / Shift 2019) |
| `app/mythes/page.tsx` | streaming 100 g/h HD, 300 g/h 4K, 30 g/h SD | fourchette `~50-100 g/h HD`, `~300-400 g/h 4K`, valeurs sourcées ou reformulées en ordre de grandeur |
| `app/mythes/page.tsx` | sources `ADEME 2025`, `Global E-Waste Monitor 2025`, `Shift Project 2025` | millésimes réels : ADEME 2022/2026, GEM 2024, Shift 2019 |
| `app/mythes/page.tsx` | `10 g` par email stocké/an, source `Carbon Trust 2025` | retirer le chiffre non vérifiable et expliquer que l'e-mail stocké pèse peu |
| `app/mythes/page.tsx` | `Fraunhofer Institute 2025` | retirer le chiffre non vérifiable et conserver l'argument « garder son appareil » |
| `app/comprendre/page.tsx` | « 3 arbres pendant 1 an » | harmoniser sur `2,5 arbres` (cohérence interne) |
| `app/a-propos/page.tsx` | « Sources (2025) », « Dernière mise à jour : Janvier 2025 » | dater 2026 et lister les sources réellement utilisées |
| `app/developpement/page.tsx` | badge « Mis à jour en 2025 » | « Mis à jour en 2026 » |

### 4.2 Fiches pratiques (`app/fiches-pratiques/[id]/page.tsx`)

| Constat | Correction |
|---|---|
| Box « économie de 65 kWh/an » | `~26 kWh/an` (extinction 8 h/nuit, Arcep 2026) |
| « garantie (minimum 6 mois) » | garantie légale de conformité 2 ans, présomption 24 mois (code de la consommation) |
| `quefaire.fr` (×2) | `quefairedemesdechets.ademe.fr` |
| Wi-Fi `20x` plus sobre que 4G/5G | `~4-5× en streaming` (source déjà retenue ailleurs) |
| Python `57x` | `~76×` (Pereira et al. 2017, benchmark précisé) |
| « Évite 20 kg de CO₂ par appareil recyclé » | remplacer par l'ordre de grandeur du guide PDF (`~2 kg`, mention « ordre de grandeur »), sans chiffre non sourcé |
| « 85 % » de matériaux récupérés (×2) | `~79 %` recyclés/réutilisés des DEEE collectés (Ecosystem 2024) |
| Dates des fiches « 2025 » | rafraîchir en 2026 ou retirer la date si elle n'apporte rien |

### 4.3 Outils et composants

| Fichier | Constat | Correction |
|---|---|---|
| `components/outils/carbon-calculator.tsx` | « ADEME 2025 » | sources précises (Base Empreinte, ADEME-Arcep) |
| `components/outils/carbon-calculator.tsx` | « 80 % d'impact en moins » | `~75 %` (ADEME 2022), cohérent avec le reste du site |
| `components/outils/it-audit.tsx` | « ADEME 2025 » | sources précises |
| `components/outils/enterprise-simulator.tsx` | « ADEME 2025 » | sources précises |
| `components/outils/sobriety-simulator.tsx` | « ADEME 2025 » | sources précises |
| `components/search-dialog.tsx` | pages manquantes | ajouter `offline`, `mentions-legales`, les 7 `modeles/*` et une entrée par fiche détail |

### 4.4 Documentation interne

- `AGENTS.md` : section « pièges » périmée (flux-rss, recherche incomplète, boutons, v0.app, pnpm) → réécrire ou marquer résolu.
- `readme_dev.md` : liste P0 résolue → marquer fait.
- `structure.md` et `features.md` : références à des bugs/route supprimés → corriger.
- `about.md` : bugs annoncés corrigés depuis → mettre à jour.
- `todo.md` : doublon « outils à découper » déjà fait, « sitemap à compléter » déjà coché ; référence `components/ui/sheet-content.tsx` inexistante (le fichier est `components/sheet-content.tsx`).
- `changelog.md` : section 13/09 contenant des entrées 14-15/09, roadmap contenant des P0 livrés ; nettoyer.
- `suivi-audit-2026-09.md` : cases vague 0/1 non cochées alors que faites.

## 5. Phase 1 — contenu du quiz

### 5.1 Règle générale

Chaque question doit avoir :

1. une seule bonne réponse **vraie** ;
2. une source identifiable avec une année ;
3. une explication exacte et non culpabilisante.

Si un chiffre n'est pas vérifiable : reformulation en notion, en ordre de grandeur ou suppression de la question. Aucune source « ADEME 2025 » ou « IEA 2025 » vague.

### 5.2 Corrections fermes

| Question | Correction |
|---|---|
| Q1 fabrication 78 % | `~80 %` avec périmètre France et ADEME-Arcep 2023 |
| Q4 durée de vie 2,5 ans | `2 à 3 ans` (ADEME 2026) |
| Q6 et Q71 part mondiale | `3,4 %` / `1,8 Gt CO2e` (GreenIT EENM 2025) ; retirer le « +6 %/an » non sourcé |
| Q9 terres rares | séparer : `17` terres rares existent, `~50` métaux dans un smartphone (ADEME) |
| Q10 recyclage smartphones | reformuler en `22,3 %` de DEEE collectés/recyclés en 2022 (GEM 2024) |
| Q13 laptop 156 kg | conserver la fourchette `150-185 kg CO2e` avec Base Carbone ADEME |
| Q16 reconditionné 8× | `jusqu'à ~8× moins` (ADEME 2022) |
| Q17 1 600 kWh = 6 mois | `~4 mois` (foyer ~4 700 kWh/an) + source |
| Q20 terres rares recyclées 30 % | `~1 %` de la demande couverte par le recyclage (GEM 2024) ou suppression |
| Q22 box 150-300 kWh | `50-100 kWh/an`, explication ~88 kWh/an (Arcep 2026) |
| Q23 30 mails = 10 kg/an | reformuler avec `4 g` simple / `35 g` avec PJ de 1 Mo / `0,3 g` spam (ADEME) |
| Q24 SD 8× moins | `~10×` (0,7 Go/h SD vs ~7 Go/h 4K, Kamiya 2020) |
| Q25 50 g/h streaming | fourchette `56-400 g/h` selon hypothèses (Shift 2019, Kamiya 2020) |
| Q28 15 Go/mois | `18 Go` en 2025 (Arcep) |
| Q29 19 g avec PJ 1 Mo | `35 g` (ADEME) |
| Q31 AGEC 2021 | loi du 10 février 2020, indice appliqué depuis 2021 ; mentionner l'indice de durabilité 2025 |
| Q32 pièces 5 ans | `7 ans` (règlement UE 2023/1670, applicable 20/06/2025) |
| Q39 65 % vs 85 % | reformuler : 65 % = objectif de collecte, pas taux atteint ; ne pas confondre avec valorisation |
| Q40 54 M smartphones | `100 M` d'appareils dans les tiroirs (ADEME 2026) ou préciser « 54 M de smartphones » avec source |
| Q42 WebP | « souvent plus léger que JPEG/PNG dans cette liste », mentionner AVIF |
| Q43 page 2,1 Mo | fourchette `~2,3 Mo desktop / ~1,9 Mo mobile` (HTTP Archive 2024) |
| Q44 bundling | nuancer : HTTP/2-3 et cache peuvent rendre le découpage préférable |
| Q46 et Q47 Python 75× | source Pereira et al. 2017, benchmark précisé, pas une loi générale |
| Q50 bots 42 % | `51 %` de trafic automatisé en 2024 (Imperva Bad Bot Report 2025) |
| Q52 PUE 1,2 | `1,56` monde / `1,45` Europe (Uptime Institute 2024) ; `1,2` = meilleurs sites |
| Q53 datacenters 2 % | `415 TWh`, `1,5 %` de l'électricité mondiale en 2024 (IEA Energy & AI 2025) |
| Q55 froid 40 % | `25-35 %` ; cohérence avec le camembert 64/28/8 déjà corrigé |
| Q57 hyperscales 800 | `~1 136` fin 2024 (Synergy Research 2025) |
| Q58 cloud 100 % renouvelable | reformuler : matching annuel ≠ 24/7 décarboné |
| Q60 WUE 1,8 L/kWh | pas de moyenne universelle : fourchette ou suppression |
| Q61 AGEC votée 2021 | 10 février 2020 (loi n° 2020-105) |
| Q63 objectif -45 % | remplacer par la vraie trajectoire tendancielle `+45 % d'ici 2030` (ADEME-Arcep) |
| Q70 remplacement indice 2026 | indice de durabilité 2025 (TV, lave-linge) ; étiquette UE smartphones depuis juin 2025 |
| Q74 0,2 g par recherche | repère obsolète (Google ~2009) : reformuler ou supprimer |
| Q76 200 kg de déchets miniers | `200 kg de matières mobilisées` (approche MIPS, ADEME 2021) |
| Q77 800 TWh pour Internet | remplacer par `415 TWh` datacenters 2024 (IEA 2025) ou préciser le périmètre |
| Q80 cobalt 60 % | demande de cobalt tirée par les batteries de véhicules électriques (IEA Critical Minerals) |
| Q83 40 % d'économie | scénario illustratif explicite ou suppression |
| Q86 BYOD | redéfinir « Bring Your Own Device » et ses enjeux sécurité/vie privée/fin de vie, pas de compensation inventée |
| Q87 120 mails/jour | reformuler envoyés + reçus (Radicati) ; retirer le « 50 % évitables » non sourcé |
| Q88 ROI 30 % | suppression ou marquage explicite « exemple illustratif » |
| Q90 frein principal | vérifier l'indicateur exact du baromètre AGIT 2025 ou reformuler en constat qualitatif |
| Q93 dark mode 60 % | fourchette `15-50 % selon luminosité` (Purdue 2021), pas « Google Android Research » |
| Q95 5G 10× | nuancer : efficacité par bit, pas consommation absolue (GSMA, année) |
| Q97 Web3/IPFS « plus sobre » | reformuler : décentralisation, bilan environnemental débattu |

Les autres questions à source vague ou douteuse sont soit sourcées correctement, soit reformulées en question conceptuelle, soit supprimées. Aucune question ne reste avec une bonne réponse incertaine.

## 6. Phase 2 — moteur, score, certificat, accessibilité

### 6.1 Score et niveaux

- `getLevel` et le pourcentage utilisent la **somme réelle des points** des questions actives, pas `totalQuestions * 15`.
- Le pourcentage affiché et le niveau reposent sur la même base.
- Score moyen : si `answeredQuestions.length === 0`, afficher `0` ou `—`, jamais `NaN`.
- Tirage aléatoire remplacé par un vrai Fisher-Yates.

### 6.2 Timer mode Défi

- Le timer continue de s'écouler pendant l'explication (20 minutes réelles) ou, si l'on préfère suspendre, l'indiquer explicitement à l'utilisateur. Décision retenue : il continue, pour honorer le format annoncé.
- Effet : dépendances complètes, arrêt propre à la fin.

### 6.3 Certificat

- Affiché uniquement à partir de `60 %` de réussite.
- Contenu : nom facultatif (état local uniquement, jamais stocké ni envoyé), date d'édition, mode, score, niveau, mention « Le Green IT en clair ».
- CSS `@media print` dédié pour n'imprimer que le certificat, pas toute la page.
- En dessous du seuil : pas de certificat ; un bouton « Imprimer mon résultat » imprime uniquement le bloc de résultats.

### 6.4 Accessibilité

- Groupe de réponses en `role="radiogroup"`, boutons `role="radio"` + `aria-checked`.
- Libellés sr-only « bonne réponse » / « votre réponse ».
- Explication en `aria-live="polite"`.
- Navigation clavier et focus conservés.

## 7. Vérification

1. `npx tsc --noEmit` propre.
2. `npm run build` ok.
3. `out/` contrôlé : zéro `alert`, zéro ancienne valeur, liens/PDF présents.
4. Test manuel sous `/greenit/` : les 4 modes, fin de timer sans réponse, impression du certificat, clavier.
5. Grep de non-régression sur la liste de valeurs interdites.
6. `todo.md` + `changelog.md` + `suivi-audit-2026-09.md` à jour.

## 8. Livraison

- Commit 1 : oublis phase 0.
- Commit 2 : contenu du quiz.
- Commit 3 : moteur + accessibilité.
- Commit 4 : docs de suivi.
- Push après vérification. Pas de `git add .`.

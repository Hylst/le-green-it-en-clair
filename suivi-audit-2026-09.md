# Suivi — campagne audit GreenIT 2026-09

> **Pour les agents :** campagne séquentielle, sans dégradation visuelle/fonctionnelle. Une seule vague active à la fois. Ne jamais modifier le même fichier dans deux tâches parallèles. Chaque correction doit citer la source exacte et l’année. Aucune affirmation non vérifiée.

**Objectif :** appliquer toutes les corrections/améliorations de `audit-contenu-2026-09.md`, par vagues isolées, avec revérification manuelle systématique.

**Architecture :** corrections minimales fichier par fichier, table canonique des chiffres partagée, commits petits et ciblés, validation `npm run build` + export statique + contrôle sous `/greenit/`.

**Pile :** Next.js statique, React, Tailwind, `basePath: /greenit`, export dans `out/`.

## Contraintes globales

- Français, ton sympa, jamais culpabilisant ; chiffre = source + année.
- Composants interactifs en `"use client"`, reste en serveur.
- Tailwind + tokens (`bg-background`, `text-foreground`) ; dark par défaut ; titres `font-poppins`, jamais `font-heading`.
- Images : `next/image`, WebP uniquement, `quality={85}`, `loading="lazy"` sauf hero ; jamais `/placeholder.svg`.
- Icônes `lucide-react` uniquement ; boutons icon-only = `aria-label` ; Escape ferme les menus.
- Un sujet à la fois, modification minimale, pas de refactor global.
- `Link` pour la navigation interne ; chemins codés en dur compatibles `/greenit`.
- Repo PUBLIC : aucun secret, aucun fichier local sensible.
- Pas de mesure d’audience.
- Pas `node_modules`, `.next`, `out` dans les commits.
- Vérification obligatoire après chaque vague : `git diff`, `npm run build`, contrôle export sous `/greenit/`, mise à jour `todo.md` et `changelog.md`.

## Vagues

### Vague 0 — socle et table canonique
- [x] Cartographie exhaustive reçue des 4 domaines (contenu/droit, chiffres/outils/quiz, images/documents, UX/accessibilité).
- [ ] Validation manuelle de la table canonique avant toute modification.
- [ ] Critères d’acceptation par vague définis ci-dessous.

## Cartographie consolidée (pistes vérifiées par les agents, à contrôler avant edit)

### Domaine A — contenu, crédibilité, droit
- `app/actualites/page.tsx` : déjà assaini, à sanctuariser (badge Exemple, annuaire Veille, zéro `simulatedFeeds`/`Flux en direct`).
- `app/chiffres/page.tsx`, `app/recyclage/page.tsx`, `app/fiches-pratiques/[id]/page.tsx` : `recyclingPoints` = données d’exemple + mention « 15 000+ » à remplacer par sources Ecosystem/ADEME ou mention illustrative visible.
- `app/mythes/page.tsx`, `app/faq/page.tsx`, `components/outils/carbon-calculator.tsx` : cloud 20 kg / 15 g / 200 g → 0,24 g/Go/an (ADEME).
- `app/fiches-pratiques/[id]/page.tsx` : fiche écoconception « 1 Mo = 20 g » → ~96 g/Go (SWD v4) ; `quefaire.fr` → `quefairedemesdechets.ademe.fr`.
- `public/guide-recyclage-green-it.pdf` (`scripts/generate-pdf-guide.js`) : « 2 kg = 2 000 km » → ~17 km ; hiérarchie recyclage à inverser.
- `app/problematiques/page.tsx`, `app/datacenters/page.tsx`, `app/cas-pratiques/page.tsx`, `app/comprendre/page.tsx` : e-déchets, recyclage, export, datacenters, PUE, IA, analogies avion/voiture/foyer à corriger.
- `app/reglementation/page.tsx`, `app/faq/page.tsx` : CSRD/Omnibus I, réparation 2024/1799, bonus/garantie, indice/étiquette UE, DEEE/REEN.
- `app/agir/page.tsx`, `app/guide/page.tsx`, quiz : conseils à retirer ou nuancer (apps arrière-plan, nettoyage mail, heures creuses, box, RAM, streaming).
- `app/developpement/page.tsx` : O(n²), WebP, Python/JS, sources Pereira.

### Domaine B — chiffres, outils, quiz
- Table de concordance à appliquer : e-déchets, recyclage monde/France, fabrication smartphone, CO2/eau, reconditionné, cloud/transfert, datacenters/PUE, IA, équivalences, box, streaming/Wi-Fi, code/WebP.
- `components/outils/carbon-calculator.tsx`, `sobriety-simulator.tsx`, `enterprise-simulator.tsx`, `it-audit.tsx`, `cloud-comparator.tsx` : facteurs, millésimes, hypothèses affichées, équivalences.
- `components/quiz-green-it-advanced.tsx` : bouton certificat sans handler + réponses Q9/Q22/Q31/Q32/Q39/Q52/Q93 et harmonisations.
- `components/website-carbon-calculator.tsx` : déjà conforme, à sanctuariser.
- `components/growth-animation.tsx` : formule exponentielle à aligner sur trajectoire GEM.

### Domaine C — images, PDF, fiches, modèles
- Remplacer sans texte incrusté : `comparison-chart-new-vs-refurbished-vs-repaire.webp`, `smartphone-impact-infographic.webp`, `lifecycle-numerique-hero.webp`, 4 visuels de fiches en anglais.
- Trancher/optimiser : `images/co2-distribution.webp` (contradiction + 560 Ko).
- Supprimer : 15 images orphelines + dossier `public/img_ori_non_opti/` de l’export.
- Optimiser : `sustainable-coding.png` → WebP, lourdes conservées, `og-cover.png`.
- Fiches : bloc Sources par fiche + corrections chiffrées ; modèles : mentions « exemples », dates fragiles.

### Domaine D — UX, navigation, accessibilité, PWA, docs
- CTA morts : `agir`, `datacenters`, `recyclage`, `perspectives`, PDF `agir`, Exporter `chiffres`, certificat quiz, ZIP `modeles`.
- Ancres mortes `par-ou-commencer` → `developpement`/`agir`.
- Recherche : ajouter `offline`, `mentions-legales`, 7 `modeles`, fiches détail.
- Plan du site, sitemap (8 fiches), breadcrumb modèles, 404/offline et SW à resserrer.
- Clavier : cartes `role="button"` + Enter/Espace ; Escape à tester ; résidus anglais lecteurs ; `aria-label` contact.
- Contrastes au cas par cas, sections sans dark, responsive à retester, logs console, basePath résiduel, manifest/SW.
- `cas-pratiques` Sources vide, badges 2025, docs à jour après chaque vague.

## Table canonique provisoire (à vérifier avant chaque edit)

| Chiffre | Valeur proposée | Source + année |
|---|---|---|
| Stockage cloud | 0,24 g/Go/an | ADEME Impact CO2 / Base Empreinte |
| Transfert web | ~96 g/Go mix mondial ; ~34 g/Go réseau FR | SWD v4 2024 ; Greenly/Arcep 2022 |
| Datacenters monde | 415 TWh en 2024, ~945 TWh en 2030 | IEA Energy & AI, avril 2025 |
| PUE | 1,56 monde ; 1,45 Europe | Uptime Institute 2024 |
| E-déchets monde | 62 Mt 2022, ~69-70 Mt 2025, 82 Mt 2030 | GEM 2024 |
| Recyclage monde | 22,3 % en 2022 | GEM 2024 |
| Garantie reconditionné | 2 ans, présomption 24 mois | C. conso L.217-7 |
| Bonus réparation | 10-65 €, smartphone 25 € | ADEME/DGE 2025 |
| Réparation UE | directive 2024/1799 applicable 31/07/2026 | EUR-Lex ; service-public.gouv.fr 2026 |
| Smartphones UE | étiquette énergie depuis 20/06/2025, 7 ans pièces | Règlement UE 2023/1670 |
| CSRD | >1 000 salariés ET >450 M€, ~5 000 entreprises | Omnibus I, JOUE 26/02/2026 |
| WebP | ~30 % plus léger que JPEG | Littérature / tableau page |
| Complexité | O(n²)/O(n) = 1 000× pour n=1 000 | Mathématiques / tableau page |
| Python vs C | ×75,88 ; JS ×4,45 | Pereira et al. SLE 2017 / SCP 2021 |
| AGEC | 10 février 2020, loi n°2020-105 | Légifrance |

## Points à trancher humainement (retirer ou mention illustrative si non sourcé)

- Parc 60M/50M/26M ; +42 % réparations / 2,3 Mds € / 8,2/10 / 92 % ; 70 % entreprises cloud ; 50 Go inutiles ; 2,5 M / 2,5 Mds € reconditionné ; 53 M jetés/an ; repas bœuf ; arbre ; budgets/objectifs modèles ; téléphones en dur ; Lilo ; Back Market ; Apple ; Fraunhofer 2025 ; appareils calculateurs (tablette, écran, fixe, usages laptop).

## Critères d’acceptation par vague

- Vague 1 : zéro donnée fictive non marquée, zéro affirmation fausse bloquante, zéro faux flux, zéro bouton mort P0 restant dans les fichiers traités.
- Vague 2 : un chiffre = une version sourcée millésimée, outils/quiz sans méthode fausse.
- Vague 3 : images conformes, sources présentes, accessibilité/navigation/PWA sans régression.
- Finale : diffs relus, build + export + `/greenit/` vérifiés, docs à jour.

### Vague 1 — P0 crédibilité et faux bloquants
- [ ] Fausses actualités, faux flux, données fictives et chiffres faux.
- [ ] Droit/réglementation faux ou périmé.
- [ ] Boutons/ancres morts et comportements simulés.
- [ ] Vérification manuelle systématique.

### Vague 2 — P0/P1 cohérence des chiffres et outils
- [ ] Harmoniser toutes les versions d’un même chiffre.
- [ ] Corriger calculateurs, quiz, simulateurs et méthodes.
- [ ] Vérification manuelle systématique.

### Vague 3 — P1/P2 contenu, images, accessibilité et documentation
- [ ] Sources manquantes, conseils à nuancer, PDF et fiches.
- [ ] Images DEF/anglais/orphelines/poids mort.
- [ ] Accessibilité, responsive, PWA, navigation et documentation.
- [ ] Vérification manuelle systématique.

### Validation finale
- [ ] Relecture complète des diffs.
- [ ] Build final, export final, contrôle `/greenit/`.
- [ ] Mise à jour finale `todo.md`, `changelog.md` et ce suivi.
- [ ] Clôture seulement après preuve de vérification.

## Journal

- 2026-09-15 : campagne créée, en attente de cartographie exhaustive.
- 2026-09-15 : tâches 1 (collecte illustrative) et 2 (cloud 0,24 g) terminées, relues, vérifiées.
- 2026-09-15 : tâche 3a (`problematiques`) interrompue côté sous-agent (diff non committé repris à la main, durci en pessimiste : 88 % → 62 %, UE précisé, Taïwan/Ghana-Nigeria chiffrés, eau 12 000 L). Build + export vérifiés. Leçon : sous-agents en lecture seule jusqu’à nouvel ordre, implémentation manuelle par micro-tâches.

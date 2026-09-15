# Assainissement des oublis P0 + correction du quiz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal :** Solder les oublis P0 des vagues précédentes puis corriger le contenu et le moteur du quiz Green IT, sans refonte visuelle.

**Architecture :** D'abord des correctifs de contenu ciblés sur les pages et outils concernés (phase A), puis la banque de 100 questions et le moteur du quiz (phase B). Chaque tâche est indépendante, vérifiée par `tsc` + greps de non-régression, avec un commit dédié ; les builds complets et le test sous `/greenit/` sont faits aux checkpoints.

**Tech stack :** Next.js 16 (export statique, `basePath: /greenit`), React 19, TypeScript, Tailwind v4, lucide-react, Node 20, npm.

## Global Constraints

- Français, ton sympa, jamais culpabilisant ; chaque chiffre garde une source + une année.
- Aucune nouvelle dépendance ; pas de `git add .` ; jamais de commit de `out/` ou `node_modules`.
- Un sujet à la fois, modification minimale, pas de refacto opportuniste.
- Composants interactifs en `"use client"`, le reste en serveur.
- Tokens Tailwind (`bg-background`, `text-foreground`), titres `font-poppins`, icônes `lucide-react`.
- Vérification de fin : `npx tsc --noEmit`, `npm run build`, contrôle de `out/`, test sous `/greenit/`.
- Mettre à jour `todo.md`, `changelog.md` et `suivi-audit-2026-09.md` à la fin de chaque phase.
- Spec de référence : `docs/superpowers/specs/2026-09-15-assainissement-quiz-design.md` (toutes les valeurs cibles y sont détaillées).

---

## Phase A — soldes des oublis P0

### Task 1 : Accueil (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx` (section « Quelques chiffres clés », ~lignes 365-392)

**Interfaces:**
- Consumes : rien.
- Produces : valeurs d'accueil harmonisées pour les autres pages.

- [ ] **Step 1 : constater l'état fautif**

Run : `grep -n "74,7 Mt\|2,3 ans\|78%\|4%" app/page.tsx`
Expected : les 4 valeurs apparaissent.

- [ ] **Step 2 : corriger les 4 chiffres**

- `74,7 Mt` → `~70 Mt`, label « de déchets électroniques sur la trajectoire 2022-2030 (62 Mt → 82 Mt) », source « Global E-waste Monitor 2024, ONU ».
- `78%` → `~80 %`, label « de l'empreinte carbone du numérique vient de la fabrication des équipements (France) », source « ADEME-Arcep 2023 ».
- `4%` → `3,4 %`, label « des émissions mondiales de GES (1,8 Gt CO2e) », source « GreenIT EENM 2025 ».
- `2,3 ans` → `2 à 3 ans`, label « durée de vie moyenne d'un smartphone en France, changement tous les 3 ans », source « ADEME 2026 ».

- [ ] **Step 3 : vérifier**

Run : `grep -n "74,7 Mt\|2,3 ans" app/page.tsx`
Expected : 0 occurrence.
Run : `npx tsc --noEmit`
Expected : pas d'erreur nouvelle.

- [ ] **Step 4 : commit**

```bash
git add app/page.tsx
git commit -m "accueil : corrige les chiffres cles (GEM 2024, ADEME 2026)"
```

### Task 2 : Mythes (`app/mythes/page.tsx`)

**Files:**
- Modify : `app/mythes/page.tsx` (12 mythes, lignes ~27-158)

**Interfaces:**
- Consumes : rien.
- Produces : chiffres et sources des mythes alignés sur le reste du site.

- [ ] **Step 1 : constater**

Run : `grep -n "17,4\|17%\|ADEME 2025\|Global E-Waste Monitor 2025\|Shift Project 2025\|Carbon Trust\|Fraunhofer\|20-30\|2 fois moins" app/mythes/page.tsx`
Expected : occurrences présentes.

- [ ] **Step 2 : corriger**

- Mythe 3 : `17 %`/`17,4 %` → `22,3 %` collectés/recyclés en 2022 ; source `Global E-waste Monitor 2024, ONU`.
- Mythe 2 : source → `ADEME-Arcep 2023` ; garder « fabrication ≈ 75 % tous impacts ».
- Mythe 4 : source → `ADEME 2022, Back Market`.
- Mythe 5 : retirer « 10 g par email stocké » et la source `Carbon Trust 2025` ; garder le message « le stockage pèse peu, l'appareil compte ».
- Mythe 6 : retirer le chiffre et la source `Fraunhofer Institute 2025` ; garder l'argument « l'usage pèse peu face à la fabrication (ADEME 2026) ».
- Mythe 7 : retirer « 2 kg/an » non sourcé ; garder « le mode avion prolonge l'autonomie mais reste secondaire ».
- Mythe 10 : streaming → `1h HD environ 50 à 100 g selon les hypothèses, plusieurs centaines de g en 4K` ; Wi-Fi `~4 à 5× moins en streaming` ; source `Kamiya 2020, Shift 2019`.
- Mythes 8, 9, 11, 12 : retirer les chiffres non vérifiables (2 kg, 75 % aluminium, 6,5/10, 50-70 %, 15 %, 5 %) et remplacer les sources `2025` vagues par une source identifiable ou aucune.

- [ ] **Step 3 : vérifier**

Run : `grep -n "17,4\|17%\|ADEME 2025\|Monitor 2025\|Shift Project 2025\|Carbon Trust\|Fraunhofer" app/mythes/page.tsx`
Expected : 0 occurrence.
Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 4 : commit**

```bash
git add app/mythes/page.tsx
git commit -m "mythes : corrige taux de recyclage, Wi-Fi et sources"
```

### Task 3 : Fiches pratiques (`app/fiches-pratiques/[id]/page.tsx`)

**Files:**
- Modify : `app/fiches-pratiques/[id]/page.tsx`

**Interfaces:**
- Consumes : valeur du guide PDF (`~2 kg`).
- Produces : fiches sans chiffres condamnés.

- [ ] **Step 1 : constater**

Run : `grep -n "65 kWh\|20x\|57x\|20 kg de CO\|85%\|quefaire.fr\|6 mois\|Dans 2025" "app/fiches-pratiques/[id]/page.tsx"`
Expected : occurrences présentes.

- [ ] **Step 2 : corriger**

- `65 kWh/an` → `~26 kWh/an` (extinction 8 h/nuit, Arcep 2026).
- `20x` Wi-Fi → `~4-5× moins en streaming` (Kamiya 2020).
- `57x` Python → `~76×` (Pereira et al. 2017, benchmark).
- `20 kg de CO₂ par appareil recyclé` → `~2 kg (ordre de grandeur, comme le guide PDF)`.
- `85 %` (impact + tip) → `~79 % des DEEE collectés sont recyclés ou réutilisés (Ecosystem 2024)`.
- `quefaire.fr` (2 occurrences) → `quefairedemesdechets.ademe.fr`.
- `minimum 6 mois` garantie → `garantie légale de conformité 2 ans (présomption 24 mois)`.
- Dates `2025` des fiches → `2026` ou suppression de la date.

- [ ] **Step 3 : vérifier**

Run : `grep -n "65 kWh\|20x plus\|57x\|20 kg de CO\|85%\|quefaire.fr\|minimum 6 mois" "app/fiches-pratiques/[id]/page.tsx"`
Expected : 0 occurrence.
Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 4 : commit**

```bash
git add "app/fiches-pratiques/[id]/page.tsx"
git commit -m "fiches pratiques : corrige box, Wi-Fi, Python, recyclage et garantie"
```

### Task 4 : Durées et arbres (`problematiques`, `perspectives`, `comprendre`)

**Files:**
- Modify : `app/problematiques/page.tsx`, `app/perspectives/page.tsx`, `app/comprendre/page.tsx`

- [ ] **Step 1 : constater**

Run : `grep -n "2,5 ans\|3 arbres" app/problematiques/page.tsx app/perspectives/page.tsx app/comprendre/page.tsx`
Expected : occurrences présentes.

- [ ] **Step 2 : corriger**

- `2,5 ans` → `2 à 3 ans, changement tous les 3 ans (ADEME 2026)` dans `problematiques` et `perspectives`.
- `3 arbres pendant 1 an` → `2,5 arbres pendant 1 an` dans `comprendre` (cohérence avec `ScaleComparison`).

- [ ] **Step 3 : vérifier**

Run : `grep -rn "2,5 ans\|3 arbres" app/`
Expected : 0 occurrence.
Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 4 : commit**

```bash
git add app/problematiques/page.tsx app/perspectives/page.tsx app/comprendre/page.tsx
git commit -m "duree de vie et equivalence arbres harmonisees"
```

### Task 5 : Sources des outils

**Files:**
- Modify : `components/outils/carbon-calculator.tsx`, `components/outils/it-audit.tsx`, `components/outils/enterprise-simulator.tsx`, `components/outils/sobriety-simulator.tsx`

- [ ] **Step 1 : constater**

Run : `grep -rn "ADEME 2025\|80% d'impact en moins" components/outils/`
Expected : occurrences présentes.

- [ ] **Step 2 : corriger**

- `ADEME 2025` → source précise selon le calcul : `Base Empreinte / ADEME-Arcep (2024-2025)` ou `ADEME, Impact CO2 / Base Empreinte`.
- `80 % d'impact en moins` → `~75 % (ADEME 2022)`.

- [ ] **Step 3 : vérifier**

Run : `grep -rn "ADEME 2025\|80% d'impact en moins" components/outils/`
Expected : 0 occurrence.
Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 4 : commit**

```bash
git add components/outils/carbon-calculator.tsx components/outils/it-audit.tsx components/outils/enterprise-simulator.tsx components/outils/sobriety-simulator.tsx
git commit -m "outils : sources precises et reconditionne a 75%"
```

### Task 6 : Badges et dates de mise à jour

**Files:**
- Modify : `app/a-propos/page.tsx`, `app/developpement/page.tsx`, `app/guide/page.tsx`

- [ ] **Step 1 : constater**

Run : `grep -rn "2025" app/a-propos/page.tsx app/developpement/page.tsx app/guide/page.tsx | grep -i "jour\|source\|guide"`
Expected : occurrences présentes.

- [ ] **Step 2 : corriger**

- `Sources de données (2025)` → `Sources de données (2026)`.
- `Dernière mise à jour : Janvier 2025` → `septembre 2026`.
- Badge `Mis à jour en 2025` → `Mis à jour en 2026`.
- `Guide Officiel 2025` → `Guide officiel 2026` (ou suppression du millésime s'il n'apporte rien).

- [ ] **Step 3 : vérifier**

Run : `grep -rn "Janvier 2025\|Mis à jour en 2025\|Guide Officiel 2025" app/`
Expected : 0 occurrence.
Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 4 : commit**

```bash
git add app/a-propos/page.tsx app/developpement/page.tsx app/guide/page.tsx
git commit -m "badges et dates de mise a jour en 2026"
```

### Task 7 : Recherche complète (`components/search-dialog.tsx`)

**Files:**
- Modify : `components/search-dialog.tsx`

- [ ] **Step 1 : ouvrir la fin du fichier**

Ouvrir `components/search-dialog.tsx` (lignes 120-146) pour reprendre le motif `CommandItem` + `router.push`.

- [ ] **Step 2 : ajouter les entrées manquantes**

- `Offline` → `/offline`
- `Mentions légales` → `/mentions-legales`
- `Modèles` → `/modeles`, puis les 7 sous-pages : `grille-audit`, `tableau-bord-impact`, `charte-green-it`, `cahier-charges-achat`, `politique-numerique`, `guide-sensibilisation`, `plan-action-dsi`.
- Une entrée par fiche détail : `gestes-quotidiens`, `achat-responsable`, `ecoconception-web`, `reparer-prolonger`, `green-it-entreprise`, `recyclage-mode-emploi`, `datacenters-verts`, `collectivites-action`.

- [ ] **Step 3 : vérifier**

Run : `grep -c "router.push" components/search-dialog.tsx`
Expected : 39 (22 existantes + 17 ajoutées).
Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 4 : commit**

```bash
git add components/search-dialog.tsx
git commit -m "recherche : ajoute modeles, fiches et pages annexes"
```

### Task 8 : Documentation interne

**Files:**
- Modify : `AGENTS.md`, `readme_dev.md`, `structure.md`, `features.md`, `about.md`, `todo.md`, `changelog.md`, `suivi-audit-2026-09.md`

- [ ] **Step 1 : corriger chaque doc**

- `AGENTS.md` : retirer/réécrire les pièges périmés (flux-rss, recherche 10/23, boutons, `GreenITQuiz`, `generator: 'v0.app'`, pnpm) ; signaler que `npm run lint` n'existe plus ou l'ajouter.
- `readme_dev.md` : marquer la liste P0 résolue.
- `structure.md` : retirer « le breadcrumb s'en souvient encore ».
- `features.md` : retirer « GreenITQuiz qui traîne ».
- `about.md` : retirer les bugs annoncés comme non corrigés.
- `todo.md` : supprimer le doublon « outils à découper » et la ligne « sitemap à compléter » ; corriger `components/ui/sheet-content.tsx` → `components/sheet-content.tsx`.
- `changelog.md` : retitrer la section 13/09 qui contient des entrées des 14-15/09 ; nettoyer la roadmap des P0 déjà livrés.
- `suivi-audit-2026-09.md` : cocher les cases vague 0 et vague 1 faites.

- [ ] **Step 2 : vérifier**

Run : `grep -rn "flux-rss\|GreenITQuiz\|v0.app\|pnpm" AGENTS.md readme_dev.md structure.md features.md about.md`
Expected : 0 occurrence hors contexte historique assumé.

- [ ] **Step 3 : commit**

```bash
git add AGENTS.md readme_dev.md structure.md features.md about.md todo.md changelog.md suivi-audit-2026-09.md
git commit -m "docs : met a jour les pieges et le suivi"
```

### Task 9 : Checkpoint phase A

- [ ] **Step 1 : build complet**

Run : `npm run build`
Expected : succès, export dans `out/`.

- [ ] **Step 2 : contrôle de l'export**

Run : `grep -rn "74,7 Mt\|2,3 ans\|17,4\|65 kWh\|quefaire.fr\|ADEME 2025" out/ | head -20`
Expected : 0 occurrence (hors chunks historiques éventuels à vérifier un par un).

- [ ] **Step 3 : test manuel sous `/greenit/`**

Servir `out/` en statique et vérifier l'accueil, `mythes`, `fiches-pratiques/gestes-quotidiens`, `outils`.

- [ ] **Step 4 : commit éventuel des restes**

```bash
git status --short
```

---

## Phase B — quiz

### Task 10 : Questions 1 à 10 (Bases du Green IT)

**Files:**
- Modify : `components/quiz-green-it-advanced.tsx`

**Interfaces:**
- Consumes : spec §5.2.
- Produces : 10 premières questions vraies et sourcées.

- [ ] **Step 1 : appliquer les corrections**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q1 à Q10. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier**

Run : `grep -n "ADEME 2025\|ARCEP 2025\|IEA 2025\|The Shift Project 2025" components/quiz-green-it-advanced.tsx`
Expected : le nombre d'occurrences diminue à chaque tâche jusqu'à 0 en Task 19.
Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 3 : commit**

```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 1 a 10"
```

### Task 11 : Questions 11 à 20 (Matériel et fabrication)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q11 à Q20. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 11 a 20"
```

### Task 12 : Questions 21 à 30 (Usage et sobriété)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q21 à Q30. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 21 a 30"
```

### Task 13 : Questions 31 à 40 (Réparation et recyclage)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q31 à Q40. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 31 a 40"
```

### Task 14 : Questions 41 à 50 (Développement)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q41 à Q50. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 41 a 50"
```

### Task 15 : Questions 51 à 60 (Datacenters)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q51 à Q60. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 51 a 60"
```

### Task 16 : Questions 61 à 70 (Réglementation)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q61 à Q70. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 61 a 70"
```

### Task 17 : Questions 71 à 80 (Impact environnemental)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q71 à Q80. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 71 a 80"
```

### Task 18 : Questions 81 à 90 (Entreprise)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q81 à Q90. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier + commit**

Run : `npx tsc --noEmit`.
```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 81 a 90"
```

### Task 19 : Questions 91 à 100 (Innovations)

- [ ] **Step 1 : appliquer**

Ouvrir la spec §5.2 et appliquer toutes les lignes Q91 à Q100. Pour chaque autre question de la plage : si la source est vague/fictive ou le chiffre invérifiable, appliquer la règle §5.1 (sourcer réellement avec année, reformuler en question conceptuelle, ou supprimer). Aucune question ne doit rester avec une réponse incertaine.

- [ ] **Step 2 : vérifier**

Run : `grep -n "ADEME 2025\|ARCEP 2025\|IEA 2025\|The Shift Project 2025\|Google Android Research\|Étude TCO Green IT\|Étude Green IT ROI\|Fairphone Research" components/quiz-green-it-advanced.tsx`
Expected : 0 occurrence.

Run : `npx tsc --noEmit`
Expected : ok.

- [ ] **Step 3 : commit**

```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige les questions 91 a 100 et les sources"
```

### Task 20 : Moteur — score, niveaux, tirage, timer

**Files:**
- Modify : `components/quiz-green-it-advanced.tsx` (moteur, lignes ~1397-1791)

**Interfaces:**
- Produces : `getLevel(score: number, maxScore: number)` ; `shuffle<T>(items: T[]): T[]`.

- [ ] **Step 1 : corriger le niveau**

Remplacer :

```ts
const getLevel = (finalScore: number, totalQuestions: number) => {
  const maxScore = totalQuestions * 15 // Average points per question
  const percentage = (finalScore / maxScore) * 100
```

par :

```ts
const getLevel = (finalScore: number, maxScore: number) => {
  const percentage = maxScore > 0 ? (finalScore / maxScore) * 100 : 0
```

et l'appel `getLevel(score, activeQuestions.length)` par `getLevel(score, maxScore)`.

- [ ] **Step 2 : sécuriser le score moyen**

Remplacer :

```ts
{Math.round(score / answeredQuestions.length)} points
```

par :

```ts
{answeredQuestions.length > 0 ? `${Math.round(score / answeredQuestions.length)} points` : "—"}
```

- [ ] **Step 3 : tirage Fisher-Yates**

Ajouter une fonction au niveau module :

```ts
function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
```

Remplacer les deux `[...ALL_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5)` par `shuffle(ALL_QUIZ_QUESTIONS)`.

- [ ] **Step 4 : timer du mode Défi**

Dans l'effet, retirer `!showExplanation` de la condition de décompte :

```ts
if (mode === "challenge" && timeLeft > 0 && !isFinished) {
  const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
  return () => clearTimeout(timer)
}
if (timeLeft === 0 && mode === "challenge" && !isFinished) {
  setIsFinished(true)
}
```

- [ ] **Step 5 : vérifier**

Run : `npx tsc --noEmit`
Expected : ok.
Test manuel : mode Défi, répondre à une question, laisser l'explication affichée, vérifier que le timer continue de descendre ; terminer sans répondre, vérifier l'absence de `NaN`.

- [ ] **Step 6 : commit**

```bash
git add components/quiz-green-it-advanced.tsx
git commit -m "quiz : corrige niveaux, score moyen, tirage et timer"
```

### Task 21 : Certificat, impression et accessibilité

**Files:**
- Modify : `components/quiz-green-it-advanced.tsx`
- Modify : `app/globals.css` (règles `@media print`)

- [ ] **Step 1 : état du nom**

Ajouter :

```ts
const [playerName, setPlayerName] = useState("")
```

- [ ] **Step 2 : bloc certificat**

Dans l'écran de résultats, quand `percentage >= 60`, afficher :

```tsx
<div className="certificate-print rounded-xl border-2 border-emerald-300 p-6 text-center dark:border-emerald-700">
  <p className="text-sm text-muted-foreground">Le Green IT en clair</p>
  <h3 className="mt-2 text-2xl font-bold text-emerald-700">Attestation de réussite</h3>
  <input
    value={playerName}
    onChange={(e) => setPlayerName(e.target.value)}
    placeholder="Votre nom (facultatif)"
    className="mx-auto mt-4 block w-full max-w-xs rounded-lg border border-slate-300 bg-transparent p-2 text-center dark:border-slate-600"
  />
  <p className="mt-4">
    {playerName.trim() ? `${playerName.trim()} obtient ` : "Résultat obtenu : "}
    <strong>{score} / {maxScore}</strong> ({percentage}%)
  </p>
  <p className="mt-1">
    Niveau : <strong>{levelInfo.level}</strong> — Mode : {mode}
  </p>
  <p className="mt-1 text-sm text-muted-foreground">Établie le {new Date().toLocaleDateString("fr-FR")}</p>
</div>
```

En dessous de 60 %, garder seulement le bouton « Imprimer mon résultat ».

- [ ] **Step 3 : bouton d'impression**

```ts
const handlePrintCertificate = () => {
  document.body.classList.add("printing-certificate")
  window.print()
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-certificate"), { once: true })
}
```

Le bouton « Imprimer mon résultat » garde `window.print()` sans la classe.

- [ ] **Step 4 : CSS d'impression**

Ajouter dans `app/globals.css` :

```css
@media print {
  body.printing-certificate * {
    visibility: hidden;
  }
  body.printing-certificate .certificate-print,
  body.printing-certificate .certificate-print * {
    visibility: visible;
  }
  body.printing-certificate .certificate-print {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 2cm;
  }
}
```

- [ ] **Step 5 : accessibilité**

- Conteneur des options : `role="radiogroup" aria-label="Réponses possibles"`.
- Boutons : `role="radio"` + `aria-checked={isSelected}`.
- Ajouter un `<span className="sr-only">` « bonne réponse » / « votre réponse » à côté des icônes.
- Explication : `aria-live="polite"`.

- [ ] **Step 6 : vérifier**

Run : `npx tsc --noEmit`
Expected : ok.
Test manuel sous `/greenit/outils` : score ≥ 60 %, saisir un nom, imprimer, vérifier que seule l'attestation sort ; score < 60 %, bouton « Imprimer mon résultat ».

- [ ] **Step 7 : commit**

```bash
git add components/quiz-green-it-advanced.tsx app/globals.css
git commit -m "quiz : certificat imprimable et accessibilite des reponses"
```

### Task 22 : Vérification finale et suivi

- [ ] **Step 1 : build complet**

Run : `npm run build`
Expected : succès.

- [ ] **Step 2 : contrôle de l'export**

Run : `grep -rn "ADEME 2025\|ARCEP 2025\|IEA 2025\|74,7 Mt\|2,3 ans\|17,4\|65 kWh\|quefaire.fr" out/ | head -20`
Expected : 0 occurrence.

- [ ] **Step 3 : test manuel sous `/greenit/`**

Servir `out/`, tester les 4 modes du quiz, le timer, le certificat, le clavier, puis les pages touchées en phase A.

- [ ] **Step 4 : suivi**

Mettre à jour `todo.md`, `changelog.md` et `suivi-audit-2026-09.md` avec les commits et les vérifications.

- [ ] **Step 5 : commit final et push**

```bash
git add todo.md changelog.md suivi-audit-2026-09.md
git commit -m "suivi : assainissement quiz et oublis P0"
git push origin main
```

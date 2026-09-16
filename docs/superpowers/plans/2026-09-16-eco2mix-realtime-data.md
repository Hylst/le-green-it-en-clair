# Implémentation : Données temps réel & Mix électrique éCO2mix

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Intégrer l'intensité carbone et le mix électrique français en temps réel (RTE éCO2mix via ODRE) sur `/chiffres` et `/datacenters`, avec cache `sessionStorage`, repli dégradé, a11y WCAG AA et contextualisation Green IT.

**Architecture:** 
- `lib/eco2mix.ts` : Fonctions utilitaires de fetch, parsing, calculs (part décarbonée, renouvelable, export net), cache `sessionStorage` et données de repli dégradé.
- `components/eco2mix-live.tsx` : Composant React interactif supportant deux variantes (`variant="full"` sur `/chiffres` et `variant="datacenter"` sur `/datacenters`).
- Intégration sur `app/chiffres/page.tsx` et `app/datacenters/page.tsx`.
- Documentation (`app/mentions-legales/page.tsx`, `components/search-dialog.tsx`, `changelog.md`, `todo.md`).

**Tech Stack:** Next.js (React 19 / TypeScript), Tailwind CSS, Lucide React, Open Data Réseaux Énergies (ODRE API v2.1).

## Global Constraints

- Pas de backend / Next.js export statique (`output: 'export'`).
- Respect du `basePath: /greenit`.
- Strict respect de la typographie (`CO₂e`, espaces avant `%`, `SourceTooltip` pour chaque repère).
- Contrastes WCAG AA (0 violation axe-core en dark et light).
- 0 régression mobile à 320 px / 390 px.
- Détection et support complet du mode hors-ligne.

---

### Task 1: Module utilitaire `lib/eco2mix.ts`

**Files:**
- Create: `lib/eco2mix.ts`
- Test: tests Node / Playwright

**Interfaces:**
- Produces:
  ```typescript
  export interface Eco2MixRawRecord {
    date_heure: string;
    date: string;
    heure: string;
    consommation: number | null;
    taux_co2: number | null;
    nucleaire: number | null;
    eolien: number | null;
    solaire: number | null;
    hydraulique: number | null;
    bioenergies: number | null;
    gaz: number | null;
    fioul: number | null;
    charbon: number | null;
    ech_physiques: number | null;
  }

  export interface Eco2MixData {
    timestamp: string;
    dateFormatted: string;
    timeFormatted: string;
    tauxCo2: number;
    consommationMw: number;
    productionTotalMw: number;
    decarbonePercent: number;
    renouvelablePercent: number;
    echangesPhysiquesMw: number;
    filières: {
      nucleaire: number;
      eolien: number;
      solaire: number;
      hydraulique: number;
      bioenergies: number;
      gaz: number;
      charbonFioul: number;
    };
    isFallback?: boolean;
  }

  export const ECO2MIX_FALLBACK: Eco2MixData;
  export function parseEco2MixRecord(record: Eco2MixRawRecord): Eco2MixData;
  export async function fetchEco2MixRealtime(): Promise<Eco2MixData>;
  ```

- [ ] **Step 1: Créer le fichier `lib/eco2mix.ts` avec types, parsing défensif et fallback**
- [ ] **Step 2: Vérifier le typage TypeScript avec `npx tsc --noEmit`**
- [ ] **Step 3: Commit du module utilitaire**

---

### Task 2: Composant React `components/eco2mix-live.tsx`

**Files:**
- Create: `components/eco2mix-live.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export interface Eco2MixLiveProps {
    variant?: "full" | "datacenter";
    className?: string;
  }
  export default function Eco2MixLive(props: Eco2MixLiveProps): JSX.Element;
  ```

- [ ] **Step 1: Développer le composant avec variantes `full` et `datacenter`**
  - Gestion du chargement (squelette animé).
  - Gestion du hors-ligne (`navigator.onLine`, icône `WifiOff`).
  - Affichage des KPIs (taux CO₂, % décarboné, conso GW, balance export).
  - Graphique de répartition du mix sous forme de barres horizontales proportionnelles accessibles.
  - Bloc pédagogique de mise en perspective Green IT (France ~80 % fabrication vs Usage, comparaisons UE et Monde).
  - Version widget `datacenter` avec calculatrice d'impact carbone instantané selon le PUE.
- [ ] **Step 2: Vérifier le typage TypeScript avec `npx tsc --noEmit`**
- [ ] **Step 3: Commit du composant**

---

### Task 3: Intégration sur `/chiffres` et `/datacenters`

**Files:**
- Modify: `app/chiffres/page.tsx`
- Modify: `app/datacenters/page.tsx`

- [ ] **Step 1: Insérer `<Eco2MixLive variant="full" />` sur `app/chiffres/page.tsx`**
- [ ] **Step 2: Insérer `<Eco2MixLive variant="datacenter" />` sur `app/datacenters/page.tsx`**
- [ ] **Step 3: Tester le build complet avec `npm run build`**
- [ ] **Step 4: Commit des intégrations**

---

### Task 4: Mentions légales, recherche, changelog & todo

**Files:**
- Modify: `app/mentions-legales/page.tsx`
- Modify: `components/search-dialog.tsx`
- Modify: `changelog.md`
- Modify: `todo.md`
- Modify: `suivi-audit-2026-09.md`

- [ ] **Step 1: Mettre à jour `app/mentions-legales/page.tsx` (RTE éCO2mix, ODRE, cache sessionStorage)**
- [ ] **Step 2: Mettre à jour `components/search-dialog.tsx` avec les termes éCO2mix / mix électrique**
- [ ] **Step 3: Mettre à jour `changelog.md`, `todo.md` et `suivi-audit-2026-09.md`**
- [ ] **Step 4: Commit des documents**

---

### Task 5: Tests automatisés, vérification a11y et mobile

**Files:**
- Test: scripts Playwright (live data, cache sessionStorage, offline mode, axe dark & light, responsive 320/390/1280)

- [ ] **Step 1: Lancer les tests Playwright pour valider le chargement direct, le cache, le mode offline et l'a11y axe-core**
- [ ] **Step 2: Vérifier l'absence d'erreurs console et de débordements mobiles**
- [ ] **Step 3: Build final et vérification de l'export statique**

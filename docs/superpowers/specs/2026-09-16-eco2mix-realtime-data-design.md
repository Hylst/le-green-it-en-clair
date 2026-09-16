# Spécification Technique : Données temps réel & Mix électrique éCO2mix

- **Date** : 16 septembre 2026
- **Auteur** : Geoffroy Streit / Hylst
- **Statut** : Validé pour implémentation

---

## 1. Contexte & Objectifs

### 1.1 Objectif
Intégrer sur le site statique *Le Green IT en clair* une section dédiée aux données en direct de l'intensité carbone et du mix électrique de production en France via l'API ouverte RTE éCO2mix (plateforme ODRE data.gouv).

### 1.2 Valeur pédagogique Green IT
- Démontrer visuellement pourquoi l'électricité en France est fortement décarbonée (~10 à 50 gCO₂e/kWh en direct).
- Établir le lien direct avec le fait que **~80 % de l'impact carbone du numérique en France provient de la fabrication des équipements** (ADEME-Arcep 2023) et non de leur usage électrique.
- Sur la page Datacenters, montrer concrètement que le **facteur d'émission du réseau électrique local** a un impact direct sur les émissions globales des datacenters, au même titre que le PUE.

---

## 2. Source de données & Contrat d'API

- **Fournisseur** : RTE (*Réseau de Transport d'Électricité*) via la plateforme *Open Data Réseaux Énergies* (ODRE / OpenDataSoft).
- **Licence** : Licence Ouverte / Open Licence (data.gouv.fr).
- **Point d'entrée (CORS public `*`, sans clé API)** :
  `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/eco2mix-national-tr/records?where=taux_co2%20is%20not%20null&limit=1&order_by=date_heure%20desc`
- **Fréquence de mise à jour RTE** : Toutes les 15 minutes.
- **Champs exploités** :
  - `taux_co2` : intensité carbone instantanée en gCO₂e/kWh produit.
  - `consommation` : puissance consommée instantanée en MW.
  - `nucleaire`, `eolien`, `solaire`, `hydraulique`, `bioenergies` : productions décarbonées en MW.
  - `gaz`, `fioul`, `charbon` : productions fossiles en MW.
  - `ech_physiques` : solde net des échanges frontaliers en MW (négatif = exportateur, positif = importateur).
  - `date_heure`, `date`, `heure` : horodatage de la mesure (fuseau Europe/Paris).

---

## 3. Architecture des Composants

### 3.1 Hook partagé / utilitaire : `lib/eco2mix.ts` (ou intégré dans `components/eco2mix-live.tsx`)
- Type TypeScript strict pour les enregistrements éCO2mix (`Eco2MixRecord`).
- Fetch sécurisé avec `AbortSignal.timeout(10000)` (10 secondes).
- Cache en `sessionStorage` sous la clé `greenit-eco2mix-cache-v1` avec TTL de 10 minutes (évite les requêtes inutiles lors du rechargement ou des allers-retours de page).
- Repli dégradé / de référence : constantes RTE 2024 / ADEME (~32 gCO₂e/kWh en moyenne annuelle en France, ~250 gCO₂e/kWh en Europe, ~490 gCO₂e/kWh dans le monde).

### 3.2 Composant principal : `components/eco2mix-live.tsx`
- Mode `"use client"`.
- Utilisé sur `/chiffres` (version complète) et sur `/datacenters` (version widget contextualisée via prop `variant="full" | "datacenter"`).
- **États d'interface** :
  - *Chargement* : squelette avec placeholders animés (`animate-pulse`).
  - *Succès* : données réelles avec horodatage et bouton de rafraîchissement manuel.
  - *Hors-ligne (`navigator.onLine === false`)* : badge `WifiOff`, affichage du cache si disponible, sinon repli avec mention explicite.
  - *Erreur API* : message explicite avec repli sur les données de référence et bouton « Réessayer ».

### 3.3 Présentation sur `/chiffres` (`variant="full"`)
1. **Bandeau d'en-tête** :
   - Titre « Intensité carbone et mix électrique en direct ».
   - Badge « Données temps réel • RTE éCO2mix ».
   - Horodatage « Relevé du [date] à [heure] » + bouton d'actualisation manuelle avec animation d'icône.
2. **Grille de 4 cartes KPI** :
   - *Intensité carbone instantanée* : en gCO₂e/kWh avec pastille dynamique (vert si < 40, bleu/jaune si 40-80, ambre si > 80).
   - *Part décarbonée* : % de la production totale (Nucléaire + Renouvelables).
   - *Consommation nationale* : en GW (ex. 48,5 GW).
   - *Solde exportateur / importateur* : ex. « Exportateur net : 8 500 MW vers l'Europe ».
3. **Graphique / Jauge de répartition du mix de production** :
   - Barres proportionnelles avec libellés et puissances en MW pour chaque filière (Nucléaire, Solaire, Éolien, Hydraulique, Bioénergies, Gaz, Fioul/Charbon).
4. **Bloc pédagogique Green IT « Pourquoi cette donnée est essentielle »** :
   - Explication du découplage : pourquoi en France l'usage émet très peu de carbone, ce qui concentre ~80 % des émissions du numérique dans la phase de fabrication des équipements.
   - Tableau comparatif instantané : France (en direct) vs Moyenne UE (~250 g) vs Moyenne Monde (~490 g).

### 3.4 Présentation sur `/datacenters` (`variant="datacenter"`)
- Encart intégré dans la section relative à l'énergie et au PUE.
- Calcul en direct : impact carbone d'un datacenter moyen de 1 MW consommé :
  - `1 000 kWh × PUE (1,56) × [taux_co2 direct] gCO₂e` = émissions instantanées en France.
  - Comparaison avec le même datacenter situé dans un pays à mix carboné (ex. 350 g/kWh).
  - Pédagogie : « L'efficacité énergétique (PUE) et le mix électrique local sont les deux jambes de la décarbonation du cloud. »

---

## 4. Accessibilité (a11y) & Design System

- Conformité WCAG 2.1 A/AA : contrastes vérifiés en dark (défaut) et light.
- Rendu accessible pour les lecteurs d'écran : `aria-live="polite"` pour les rafraîchissements, `sr-only` pour les statuts d'actualisation.
- Icônes issues exclusivement de `lucide-react` (`Zap`, `Activity`, `Flame`, `Sun`, `Wind`, `Droplets`, `Atom`, `RefreshCw`, `WifiOff`, `CheckCircle2`, `AlertTriangle`).
- Typographie et tokens Tailwind conformes (`font-poppins` pour les titres, `font-mono` pour les chiffres, tokens de couleur système `bg-card`, `text-foreground`, etc.).

---

## 5. Documentation & Conformité

- **`app/mentions-legales/page.tsx`** : Ajout de la mention d'utilisation de l'API ouverte RTE éCO2mix (plateforme ODRE data.gouv.fr) et de la clé de cache `greenit-eco2mix-cache-v1` en `sessionStorage`.
- **`components/search-dialog.tsx`** : Ajout de mots-clés de recherche (« mix électrique », « éCO2mix », « intensité carbone direct », « RTE »).
- **`changelog.md`** & **`todo.md`** : Enregistrement de la nouvelle fonctionnalité et mise à jour de la feuille de route.

---

## 6. Plan de Validation & Tests

1. **Compilation TypeScript & Build Next.js statique** : `npm run build` sans erreur.
2. **Tests automatisés Playwright** :
   - Vérification du chargement des données en direct RTE.
   - Vérification du cache `sessionStorage` (0 requête supplémentaire lors de la réouverture).
   - Test du mode hors-ligne avec `context.setOffline(true)`.
   - Test de non-régression responsive sur 320 px, 390 px et 1280 px.
   - Test d'accessibilité `axe-core` en dark et light mode (0 violation).

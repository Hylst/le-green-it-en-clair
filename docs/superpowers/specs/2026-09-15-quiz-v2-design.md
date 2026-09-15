# Design — Quiz v2 : reprise de session et révision des erreurs

**Date :** 15 septembre 2026
**Approche validée :** module de stockage `lib/quiz-storage.ts` + petites touches dans le composant du quiz, sans refactor du moteur.
**Statut :** en attente de relecture utilisateur avant plan d'implémentation.
**Périmètre :** `components/quiz-green-it-advanced.tsx`, nouveau `lib/quiz-storage.ts`, nouveau `components/quiz-error-review.tsx`, `app/mentions-legales/page.tsx`, docs de suivi.

## 1. Contexte

- Le quiz (`components/quiz-green-it-advanced.tsx`, ~1892 lignes) propose 4 modes (Découverte 10 questions, Complet 100, Catégorie, Défi 20 questions chronométrées 20 min), une attestation imprimable ≥60 % et 100 questions sourcées.
- Aucune persistance : changer d'onglet dans `/outils` démonte le composant, et un rechargement de page perd tout.
- Aucune trace des réponses données (`answeredQuestions` ne stocke que des indices) : impossible de revoir ses erreurs.
- Le moteur a été corrigé et validé lors des vagues précédentes (score, tirage Fisher-Yates, timer, attestation) — il ne doit pas être remanié.
- Le site est statique, sans backend. Le thème est déjà stocké en `localStorage` (mentionné dans les mentions légales) : précédent cohérent pour un stockage local sans cookie.

## 2. Objectifs

1. Reprendre une session en cours à l'ouverture de l'onglet Quiz (tous les modes), y compris après un rechargement.
2. En mode Défi, le chrono continue de s'écouler hors ligne : à la reprise, `timeLeft = max(0, endsAt − maintenant)` ; temps écoulé → session terminée avec le score acquis.
3. Conserver la **dernière session terminée** : bandeau « Derniers résultats » sur l'écran de sélection + révision des erreurs.
4. Afficher la liste dépliable des erreurs (réponse donnée, bonne réponse, explication, source).
5. Permettre de **rejouer uniquement les erreurs** (mode `review`, sans chrono ni attestation).
6. Mettre à jour les mentions légales (stockage local, aucun envoi).
7. Vérifier : scripts node sur le stockage, parcours navigateur réels, `tsc`, build, axe, Firefox/WebKit, docs.

## 3. Non-objectifs

- Pas d'historique multi-sessions ni de statistiques.
- Pas de compte, pas de backend, pas d'envoi de données.
- Aucune modification des 100 questions ni du moteur (score, niveaux, tirage, attestation).
- Pas de refonte visuelle du quiz ni de l'écran de résultats.
- Pas de partage social des résultats.

## 4. Module de stockage — `lib/quiz-storage.ts` (nouveau)

Fichier pur, **sans aucun import** (testable au node), exporte :

```ts
export type QuizMode = "discovery" | "full" | "category" | "challenge" | "review"

export interface StoredAnswer {
  sessionIndex: number   // position dans la session (0..questionIds.length-1)
  selectedAnswer: number // -1 = non répondu (fin de chrono en Défi)
  correct: boolean
}

export interface QuizSession {
  schemaVersion: 1
  contentVersion: number      // version des questions au moment de la session
  mode: QuizMode
  category: string | null
  questionIds: number[]       // indices dans ALL_QUIZ_QUESTIONS
  currentIndex: number
  answers: StoredAnswer[]
  score: number
  playerName: string
  finished: boolean
  finishedAt: string | null   // ISO
  endsAt: number | null       // timestamp ms, mode challenge uniquement
}

export const QUIZ_STORAGE_KEY = "greenit-quiz-session-v1"

export function loadQuizSession(expected: { contentVersion: number; questionCount: number }): QuizSession | null
export function saveQuizSession(session: QuizSession): void
export function clearQuizSession(): void
```

Règles :

- `saveQuizSession` : `try/catch` autour de `localStorage.setItem` (navigation privée stricte → le quiz fonctionne sans persistance).
- `loadQuizSession` : `try/catch` ; `JSON.parse` ; validation défensive → `null` **et** `clearQuizSession()` si : schéma ≠ 1, `contentVersion` ≠ attendu, mode inconnu, `questionIds` non entier dans `[0, questionCount)`, `currentIndex` hors bornes, `answers` malformées (chaque `sessionIndex` dans `[0, questionIds.length)`, `selectedAnswer` entier ≥ -1, `correct` booléen), `score` non fini ou négatif.
- `QUIZ_CONTENT_VERSION = 1` vit dans le composant du quiz, à côté de `ALL_QUIZ_QUESTIONS`, avec commentaire « incrémenter quand les questions changent ». Le module de stockage reçoit la version en paramètre (pas d'import croisé).

## 5. Comportement de reprise (composant du quiz)

- **Au montage uniquement** (dans un `useEffect`, jamais au rendu initial → pas de mismatch d'hydratation) : `loadQuizSession({ contentVersion: QUIZ_CONTENT_VERSION, questionCount: ALL_QUIZ_QUESTIONS.length })`.
- **Session en cours** (`!finished`) : restauration complète (mode, catégorie, questions via `questionIds`, index, score, réponses, nom) et **reprise directe**.
  - Mode Défi : `timeLeft` recalculé depuis `endsAt`. S'il est écoulé, la session passe à `finished` avec le score déjà engrangé ; les questions sans réponse apparaissent en « non répondu » dans la révision.
- **Session terminée** : écran de sélection habituel + bandeau « Derniers résultats : X / Y (Z %) — Niveau » avec deux boutons :
  - « Revoir mes erreurs » : affiche l'écran de résultats restauré (liste des erreurs + rejouer) ;
  - « Refaire un quiz » : `clearQuizSession()` puis sélection de mode.
- **Nouveau quiz** : remplace toujours l'ancienne session.
- `answeredQuestions` (indices) est remplacé par `answers` (réponses détaillées) ; le score moyen de l'écran de résultats utilise `answers.length`.

## 6. Enregistrement

`persist()` appelé après : `startQuiz`, `handleAnswer`, `handleNext`/`handleFinish`, changement de `playerName`, expiration du chrono. Jamais pendant la restauration. Le `endsAt` du mode Défi est fixé au démarrage (`Date.now() + 20 * 60 * 1000`) et n'est pas recalculé ensuite.

## 7. Révision des erreurs — `components/quiz-error-review.tsx` (nouveau)

- Props : `items: Array<{ question: QuizQuestion; selectedAnswer: number; sessionIndex: number }>` (les questions ont toutes les données nécessaires : énoncé, choix, `correctAnswer`, `explanation`, `source`).
- `QuizQuestion` est exporté (type) depuis le composant du quiz ; `quiz-error-review` l'importe en `import type` (aucun cycle à l'exécution).
- Liste accordéon : chaque erreur est un bouton (`aria-expanded`, chevron `lucide-react`, focus visible) qui déplie : « Votre réponse » (rouge, ou « Non répondu »), « Bonne réponse » (verte), explication, source.
- 0 erreur → « Sans faute, bravo ! ».
- Le composant ne dépend d'aucun état du quiz.

## 8. Mode « rejouer mes erreurs »

- Bouton sur l'écran de résultats (session terminée, erreurs > 0) : « Rejouer mes erreurs (N) ».
- Lance un quiz avec les indices des questions ratées, **dans l'ordre où elles sont apparues**, mode `review`.
- Mode `review` : pas de chrono, pas d'attestation (révision partielle, honnête) ; l'écran de résultats reste complet (score, liste, rejouer si nouvelles erreurs).
- Une session `review` est une session comme une autre : elle est sauvegardée et remplace la précédente.

## 9. Mentions légales

Ajouter une phrase dans la section données personnelles existante : « Le quiz conserve dans votre navigateur (localStorage) votre session en cours et vos derniers résultats, pour vous permettre de reprendre et de revoir vos erreurs. Ces données ne quittent jamais votre appareil. »

## 10. Vérification

- **Stockage (node)** : script temp important `lib/quiz-storage.ts` directement (Node 24 exécute le TypeScript par « type stripping » ; repli documenté : compiler le fichier avec `npx tsc` vers un dossier temp puis importer le JS). Cas testés : round-trip save/load, JSON corrompu → `null`, `contentVersion` différente → `null`, indices hors bornes → `null`, `answers` malformées → `null`, `localStorage` absent → pas d'exception.
- **Parcours navigateur (playwright)** :
  1. Ouvrir `/outils` → onglet Quiz → Découverte ; répondre à 2 questions ;
  2. changer d'onglet (Calculateur) puis revenir → reprise à la question 3 ;
  3. recharger la page → reprise à la question 3 ;
  4. terminer la session → résultats + liste des erreurs + « Rejouer mes erreurs » ;
  5. rejouer les erreurs → session `review` avec le bon nombre de questions ;
  6. injecter une session Défi avec `endsAt` passé → écran de résultats direct, score conservé ;
  7. injecter du JSON corrompu → session ignorée, écran de sélection.
- `tsc` 0 erreur, `npm run build`, axe sur l'onglet Quiz : 0 critique/sérieuse, Firefox + WebKit : 0 erreur.
- `changelog.md`, `todo.md`, `suivi-audit-2026-09.md` à jour ; commits ciblés (`quiz : …`, docs), push.

## 11. Risques et limites

- **Fichier volumineux** : le diff se limite aux états, effets, handlers et écran de résultats ; pas de refactor du moteur.
- **Contenu modifié** : toute retouche des 100 questions devra incrémenter `QUIZ_CONTENT_VERSION`, sinon les anciennes sessions pointent vers de mauvaises questions (protection : session invalidée si la version diffère).
- **localStorage plein / indisponible** : ignoré silencieusement, quiz fonctionnel sans reprise.
- **Défi quitté puis repris plus tard** : le chrono étant réel, la session peut être déjà terminée — c'est le comportement voulu.
- La reprise n'a lieu qu'à l'ouverture de l'onglet Quiz (le composant n'est monté qu'à ce moment) ; pas de reprise depuis une autre page.

## 12. Livraison

- Un commit de code (`quiz : reprise de session et revision des erreurs`), docs, push.
- Récapitulatif : comportements vérifiés, ce qui reste (pas d'historique, pas de partage).

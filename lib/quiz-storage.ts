export type QuizMode = "discovery" | "full" | "category" | "challenge" | "review"

export interface StoredAnswer {
  sessionIndex: number
  selectedAnswer: number
  correct: boolean
}

export interface QuizSession {
  schemaVersion: 1
  contentVersion: number
  mode: QuizMode
  category: string | null
  questionIds: number[]
  currentIndex: number
  answers: StoredAnswer[]
  score: number
  playerName: string
  finished: boolean
  finishedAt: string | null
  endsAt: number | null
}

export const QUIZ_STORAGE_KEY = "greenit-quiz-session-v1"

const MODES: QuizMode[] = ["discovery", "full", "category", "challenge", "review"]

export function clearQuizSession() {
  try {
    window.localStorage.removeItem(QUIZ_STORAGE_KEY)
  } catch {
    // stockage indisponible : le quiz continue sans persistance
  }
}

export function saveQuizSession(session: QuizSession) {
  try {
    window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(session))
  } catch {
    // stockage indisponible ou plein : le quiz continue sans persistance
  }
}

export function loadQuizSession(expected: { contentVersion: number; questionCount: number }): QuizSession | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(QUIZ_STORAGE_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  let parsed: unknown = null
  try {
    parsed = JSON.parse(raw)
  } catch {
    clearQuizSession()
    return null
  }

  const session = parsed as Partial<QuizSession> | null
  const questionIds = Array.isArray(session?.questionIds) ? (session?.questionIds as number[]) : null
  const answers = Array.isArray(session?.answers) ? session?.answers : null
  const valid =
    !!session &&
    session.schemaVersion === 1 &&
    session.contentVersion === expected.contentVersion &&
    typeof session.mode === "string" &&
    MODES.includes(session.mode as QuizMode) &&
    !!questionIds &&
    questionIds.length > 0 &&
    questionIds.every((id) => Number.isInteger(id) && id >= 0 && id < expected.questionCount) &&
    Number.isInteger(session.currentIndex) &&
    (session.currentIndex as number) >= 0 &&
    (session.currentIndex as number) < questionIds.length &&
    !!answers &&
    answers.every(
      (a) =>
        a &&
        Number.isInteger(a.sessionIndex) &&
        a.sessionIndex >= 0 &&
        a.sessionIndex < questionIds.length &&
        Number.isInteger(a.selectedAnswer) &&
        a.selectedAnswer >= -1 &&
        typeof a.correct === "boolean",
    ) &&
    typeof session.score === "number" &&
    Number.isFinite(session.score) &&
    session.score >= 0 &&
    typeof session.playerName === "string" &&
    typeof session.finished === "boolean" &&
    (session.finishedAt === null || typeof session.finishedAt === "string") &&
    (session.endsAt === null || typeof session.endsAt === "number")

  if (!valid) {
    clearQuizSession()
    return null
  }

  return session as QuizSession
}

"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { CheckCircle2, RotateCcw } from "lucide-react"
import { SourceTooltip } from "@/components/source-tooltip"
import { cn } from "@/lib/utils"

/* Petits widgets du blog : un geste à essayer par article.
   Composants clients isolés, valeurs initiales neutres,
   résultats annoncés aux lecteurs d’écran. */

const cardClass = "rounded-xl border-2 border-theme bg-theme-soft p-5 lg:p-6"

function WidgetTitle({ children }: { children: string }) {
  return <h3 className="mb-1 text-lg font-bold text-foreground">{children}</h3>
}

function WidgetHint({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-sm text-muted-foreground">{children}</p>
}

/* 1. Liste de contrôle du premier audit : 6 cases, progression mémorisée. */

const AUDIT_ITEMS = [
  "Inventaire du parc dans un tableur",
  "Année d’achat et état notés pour chaque appareil",
  "Une semaine d’observation des usages",
  "Trois questions posées à l’équipe",
  "Trois gestes décidés ensemble",
  "Plan d’une page écrit et daté",
]

const AUDIT_STORAGE_KEY = "greenit-blog-audit-checklist-v1"

export function AuditChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => AUDIT_ITEMS.map(() => false))

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUDIT_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as boolean[]
        if (Array.isArray(parsed) && parsed.length === AUDIT_ITEMS.length) setChecked(parsed)
      }
    } catch {
      // stockage indisponible : on garde la liste vierge
    }
  }, [])

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = prev.map((value, i) => (i === index ? !value : value))
      try {
        localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(next))
      } catch {
        // stockage indisponible : la liste reste utilisable pour la session
      }
      return next
    })
  }

  const reset = () => {
    setChecked(AUDIT_ITEMS.map(() => false))
    try {
      localStorage.removeItem(AUDIT_STORAGE_KEY)
    } catch {
      // rien à nettoyer
    }
  }

  const done = checked.filter(Boolean).length

  return (
    <div className={cardClass}>
      <WidgetTitle>À vous : votre premier tour en 6 cases</WidgetTitle>
      <WidgetHint>Cochez au fil de votre audit. Votre progression reste sur cet appareil.</WidgetHint>
      <div
        className="mb-4 h-2.5 overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={AUDIT_ITEMS.length}
        aria-label={`Progression : ${done} sur ${AUDIT_ITEMS.length}`}
      >
        <div
          className="h-full rounded-full bg-theme transition-all duration-300"
          style={{ width: `${(done / AUDIT_ITEMS.length) * 100} %` }}
        />
      </div>
      <ul className="space-y-2">
        {AUDIT_ITEMS.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-card p-3 transition-colors hover:bg-secondary/60">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => toggle(index)}
                className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
              />
              <span className={cn("text-sm", checked[index] ? "text-muted-foreground line-through" : "text-foreground")}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-foreground" aria-live="polite">
          {done} sur {AUDIT_ITEMS.length} {done === AUDIT_ITEMS.length ? ": audit terminé, bravo" : ""}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Recommencer
        </button>
      </div>
    </div>
  )
}

/* 2. Calculateur reconditionné : euros et CO₂e évités selon le grade. */

const GRADE_FACTORS: Record<string, { label: string; factor: number }> = {
  A: { label: "Grade A (comme neuf)", factor: 0.9 },
  B: { label: "Grade B (très bon état)", factor: 0.8 },
  C: { label: "Grade C (traces visibles)", factor: 0.75 },
}

export function ReconditionneCalc() {
  const [prixNeuf, setPrixNeuf] = useState(800)
  const [prixRecond, setPrixRecond] = useState(450)
  const [grade, setGrade] = useState("B")

  const euros = Math.max(0, prixNeuf - prixRecond)
  const percent = prixNeuf > 0 ? Math.round((euros / prixNeuf) * 100) : 0
  const co2evite = Math.round(80 * GRADE_FACTORS[grade].factor)
  const coherent = prixRecond < prixNeuf

  return (
    <div className={cardClass}>
      <WidgetTitle>Calculez votre cas : neuf ou reconditionné ?</WidgetTitle>
      <WidgetHint>
        Saisissez les deux prix constatés pour le même modèle, et choisissez le grade.
        <SourceTooltip className="ml-1" source="ADEME, 2022 et 2025" calculation="80 kg CO₂e pour un smartphone neuf, facteur 75 à 90 % selon le grade" />
      </WidgetHint>
      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="recond-neuf" className="mb-1 block text-sm font-medium text-foreground">
            Prix neuf (€)
          </label>
          <input
            id="recond-neuf"
            type="number"
            min={0}
            step={10}
            value={prixNeuf}
            onChange={(e) => setPrixNeuf(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground"
          />
        </div>
        <div>
          <label htmlFor="recond-prix" className="mb-1 block text-sm font-medium text-foreground">
            Prix reconditionné (€)
          </label>
          <input
            id="recond-prix"
            type="number"
            min={0}
            step={10}
            value={prixRecond}
            onChange={(e) => setPrixRecond(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground"
          />
        </div>
        <div>
          <label htmlFor="recond-grade" className="mb-1 block text-sm font-medium text-foreground">
            Grade
          </label>
          <select
            id="recond-grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground"
          >
            {Object.entries(GRADE_FACTORS).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3" aria-live="polite">
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Économisés</p>
          <p className="text-xl font-bold text-foreground">{euros.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Remise équivalente</p>
          <p className="text-xl font-bold text-foreground">−{percent} %</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">CO₂e évités (ordre de grandeur)</p>
          <p className="text-xl font-bold text-foreground">≈ {co2evite} kg</p>
        </div>
      </div>
      {!coherent && (
        <p className="mt-3 text-sm text-muted-foreground">
          Ici le reconditionné coûte plus cher que le neuf : vérifiez le modèle ou le vendeur, ce n’est pas le cas
          courant.
        </p>
      )}
    </div>
  )
}

/* 3. Mini simulateur PUE : les mêmes curseurs que la page datacenters, en bref. */

export function PueMiniCalc() {
  const [itKw, setItKw] = useState(100)
  const [pue, setPue] = useState(1.56)

  const totalKw = itKw * pue
  const mwhPerYear = (totalKw * 8760) / 1000
  const costPerYear = Math.round(mwhPerYear * 1000 * 0.2)

  return (
    <div className={cardClass}>
      <WidgetTitle>Essayez : 1 kW de serveurs, combien au compteur ?</WidgetTitle>
      <WidgetHint>
        Déplacez les curseurs. Prix repère : 0,20 € par kWh.
      </WidgetHint>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="pue-it" className="mb-1 block text-sm font-medium text-foreground">
            Puissance serveurs : {itKw} kW
          </label>
          <input
            id="pue-it"
            type="range"
            min={10}
            max={2000}
            step={10}
            value={itKw}
            onChange={(e) => setItKw(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="pue-value" className="mb-1 block text-sm font-medium text-foreground">
            PUE : {pue.toFixed(2)}
          </label>
          <input
            id="pue-value"
            type="range"
            min={1.05}
            max={2.5}
            step={0.05}
            value={pue}
            onChange={(e) => setPue(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3" aria-live="polite">
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Puissance totale</p>
          <p className="text-xl font-bold text-foreground">{Math.round(totalKw).toLocaleString("fr-FR")} kW</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Consommation annuelle</p>
          <p className="text-xl font-bold text-foreground">
            {Math.round(mwhPerYear).toLocaleString("fr-FR")} MWh
          </p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Facture indicative</p>
          <p className="text-xl font-bold text-foreground">{costPerYear.toLocaleString("fr-FR")} €/an</p>
        </div>
      </div>
    </div>
  )
}

/* 4. Frise AGEC et REEN : cinq dates à feuilleter. */

const TIMELINE = [
  {
    year: "2020",
    title: "AGEC : fin du tout-jetable",
    text: "La loi anti-gaspillage pose le principe : réparer plutôt que jeter. Indice de réparabilité, pièces détachées, fonds réparation : les outils arrivent dans les années qui suivent.",
  },
  {
    year: "2021",
    title: "REEN : le volet numérique",
    text: "La loi dédiée au numérique ajoute sa pierre : reconditionné dans la commande publique, sensibilisation des jeunes, données environnementales des opérateurs.",
  },
  {
    year: "2025",
    title: "Durabilité affichée, pièces 7 ans",
    text: "L’indice de durabilité démarre (téléviseurs en janvier, lave-linge en avril) et le règlement européen 2023/1670 s’applique : 5 ans de mises à jour, 7 ans de pièces détachées.",
  },
  {
    year: "2026",
    title: "Réparation : +12 mois de garantie",
    text: "La directive européenne 2024/1799 s’applique depuis le 31 juillet 2026 : une réparation sous garantie prolonge celle-ci de 12 mois. Gardez vos factures.",
  },
  {
    year: "Demain",
    title: "DEEE et reporting en chantier",
    text: "Réexamen européen de la filière des e-déchets en cours, indice de durabilité étendu à d’autres appareils, reporting resserré pour les grandes entreprises. La direction reste la même.",
  },
]

export function AgecTimeline() {
  const [selected, setSelected] = useState(2)
  const event = TIMELINE[selected]

  return (
    <div className={cardClass}>
      <WidgetTitle>Feuilletez la chronologie</WidgetTitle>
      <WidgetHint>Choisissez une date pour voir ce qu’elle a changé.</WidgetHint>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Dates clés">
        {TIMELINE.map((item, index) => (
          <button
            key={item.year}
            type="button"
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              selected === index
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {item.year}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-card p-4" aria-live="polite">
        <p className="font-bold text-foreground">{event.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{event.text}</p>
      </div>
    </div>
  )
}

/* 5. Mini quiz du téléphone réparable : 3 pannes, 3 bons réflexes. */

const QUIZ = [
  {
    question: "L’écran est fissuré après une chute. Premier réflexe ?",
    options: ["Racheter un téléphone neuf", "Vérifier la pièce détachée et le bonus réparation", "Continuer avec l’écran fissuré"],
    correct: 1,
    explain: "Écran disponible, tutoriel officiel, réparateur labellisé avec bonus : la panne redevient banale.",
  },
  {
    question: "La batterie tient à peine la journée. Que faire ?",
    options: ["Laisser branché en permanence", "Faire remplacer la batterie (50 à 80 €)", "Changer de modèle"],
    correct: 1,
    explain: "Une batterie neuve pour 50 à 80 € prolonge souvent la vie de l’appareil de deux ans.",
  },
  {
    question: "Le téléphone ne reçoit plus de mises à jour. Le risque ?",
    options: ["Aucun, tout marche encore", "Failles de sécurité non corrigées et applis qui rament", "Batterie qui gonfle"],
    correct: 1,
    explain: "D’où l’exigence européenne : 5 ans de mises à jour du système (règlement 2023/1670).",
  },
]

export function ReparableQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null])
  const answered = answers.filter((a) => a !== null).length
  const score = answers.filter((a, i) => a === QUIZ[i].correct).length

  const answer = (question: number, option: number) => {
    setAnswers((prev) => prev.map((value, i) => (i === question ? option : value)))
  }

  return (
    <div className={cardClass}>
      <WidgetTitle>Testez vos réflexes en 3 questions</WidgetTitle>
      <WidgetHint>Une réponse par question, la correction s’affiche aussitôt.</WidgetHint>
      <div className="space-y-5">
        {QUIZ.map((item, qi) => (
          <fieldset key={item.question} className="rounded-lg bg-card p-4">
            <legend className="px-1 text-sm font-semibold text-foreground">{item.question}</legend>
            <div className="mt-2 space-y-2">
              {item.options.map((option, oi) => {
                const chosen = answers[qi] === oi
                const revealed = answers[qi] !== null
                return (
                  <label
                    key={option}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 text-sm transition-colors",
                      revealed && oi === item.correct && "border-emerald-500 bg-emerald-500/10",
                      revealed && chosen && oi !== item.correct && "border-red-400 bg-red-500/10",
                      !revealed && "border-border hover:bg-secondary/60"
                    )}
                  >
                    <input
                      type="radio"
                      name={`reparable-q${qi}`}
                      checked={chosen}
                      onChange={() => answer(qi, oi)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                )
              })}
            </div>
            {answers[qi] !== null && (
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {item.explain}
              </p>
            )}
          </fieldset>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-foreground" aria-live="polite">
        Score : {score} sur {QUIZ.length} ({answered} sur {QUIZ.length} répondues)
      </p>
    </div>
  )
}

/* 6. Mini calculateur box : puissance et heures d'extinction, économie en kWh et en euros. */

export function BoxCalc() {
  const [watts, setWatts] = useState(9.1)
  const [offHours, setOffHours] = useState(8)

  const kwhPerYear = (watts * 24 * 365) / 1000
  const savedKwh = (kwhPerYear * offHours) / 24
  const savedEuros = savedKwh * 0.2

  return (
    <div className={cardClass}>
      <WidgetTitle>Essayez : votre box, éteinte la nuit, ça change quoi ?</WidgetTitle>
      <WidgetHint>
        Déplacez les curseurs. Repères : 9,1 W en moyenne
        <SourceTooltip className="ml-1" source="Arcep, 2026" calculation="Enquête « Pour un numérique soutenable », édition 2026 sur données 2024" />
        , 0,20 € par kWh.
      </WidgetHint>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="box-watts" className="mb-1 block text-sm font-medium text-foreground">
            Puissance de la box : {watts.toFixed(1).replace(".", ",")} W
          </label>
          <input
            id="box-watts"
            type="range"
            min={5}
            max={20}
            step={0.1}
            value={watts}
            onChange={(e) => setWatts(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="box-off" className="mb-1 block text-sm font-medium text-foreground">
            Heures éteintes par jour : {offHours} h
          </label>
          <input
            id="box-off"
            type="range"
            min={0}
            max={16}
            step={1}
            value={offHours}
            onChange={(e) => setOffHours(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3" aria-live="polite">
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Consommation annuelle</p>
          <p className="text-xl font-bold text-foreground">
            {Math.round(kwhPerYear).toLocaleString("fr-FR")} kWh
          </p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Économie réalisée</p>
          <p className="text-xl font-bold text-foreground">
            {Math.round(savedKwh).toLocaleString("fr-FR")} kWh/an
          </p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-xs text-muted-foreground">Soit environ</p>
          <p className="text-xl font-bold text-foreground">
            {savedEuros.toFixed(0).replace(".", ",")} €/an
          </p>
        </div>
      </div>
    </div>
  )
}

/* 7. Mini auto-test RGESN : 4 questions, le réflexe écoconception. */

const RGESN_QUIZ = [
  {
    question: "Votre site s'affiche-t-il correctement sur un smartphone de 5 ans ?",
    options: ["Oui, sans ralentissement", "Non, il faut un appareil récent", "Je ne sais pas"],
    correct: 0,
    explain: "Le RGESN demande un service utilisable sur d'anciens terminaux : c'est le premier levier contre le renouvellement forcé.",
  },
  {
    question: "Les vidéos se lancent-elles toutes seules à l'ouverture des pages ?",
    options: ["Non, jamais", "Oui, pour l'engagement", "Seulement parfois"],
    correct: 0,
    explain: "Lecture auto et défilement infini alimentent l'économie de l'attention : le référentiel demande de les limiter.",
  },
  {
    question: "Vos environnements de test tournent-ils jour et nuit ?",
    options: ["Non, éteints ou mutualisés la nuit", "Oui, toujours allumés", "Je ne sais pas"],
    correct: 0,
    explain: "Serveurs de test allumés pour rien : le critère 3.7 demande extinction ou mutualisation hors usage.",
  },
  {
    question: "Publiez-vous une déclaration d'écoconception ?",
    options: ["Oui, publique et à jour", "Non", "C'est quoi ?"],
    correct: 0,
    explain: "Sans déclaration publique, impossible de se prévaloir du référentiel : la transparence est le prérequis.",
  },
]

export function RgesnCheck() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null])
  const answered = answers.filter((a) => a !== null).length
  const score = answers.filter((a, i) => a === RGESN_QUIZ[i].correct).length

  const answer = (question: number, option: number) => {
    setAnswers((prev) => prev.map((value, i) => (i === question ? option : value)))
  }

  return (
    <div className={cardClass}>
      <WidgetTitle>Votre service passerait-il le RGESN ?</WidgetTitle>
      <WidgetHint>4 questions inspirées des critères. La correction s'affiche aussitôt.</WidgetHint>
      <div className="space-y-5">
        {RGESN_QUIZ.map((item, qi) => (
          <fieldset key={item.question} className="rounded-lg bg-card p-4">
            <legend className="px-1 text-sm font-semibold text-foreground">{item.question}</legend>
            <div className="mt-2 space-y-2">
              {item.options.map((option, oi) => {
                const chosen = answers[qi] === oi
                const revealed = answers[qi] !== null
                return (
                  <label
                    key={option}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 text-sm transition-colors",
                      revealed && oi === item.correct && "border-emerald-500 bg-emerald-500/10",
                      revealed && chosen && oi !== item.correct && "border-red-400 bg-red-500/10",
                      !revealed && "border-border hover:bg-secondary/60"
                    )}
                  >
                    <input
                      type="radio"
                      name={`rgesn-q${qi}`}
                      checked={chosen}
                      onChange={() => answer(qi, oi)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                )
              })}
            </div>
            {answers[qi] !== null && (
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {item.explain}
              </p>
            )}
          </fieldset>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-foreground" aria-live="polite">
        Score : {score} sur {RGESN_QUIZ.length} ({answered} sur {RGESN_QUIZ.length} répondues)
      </p>
    </div>
  )
}

/* 8. Mini-test bonus réparation : 4 questions, les vraies conditions d'éligibilité. */

const BONUS_QUIZ = [
  {
    question: "Votre appareil est-il encore sous garantie (ou assuré) ?",
    options: ["Non, ni garantie ni assurance", "Oui, encore couvert", "Je ne sais pas"],
    correct: 0,
    explain: "Le bonus ne vaut que pour les appareils hors garantie et non assurés : vérifiez la date d'achat et vos extensions avant de vous déplacer.",
  },
  {
    question: "La panne empêche-t-elle l'appareil de fonctionner ?",
    options: [
      "Oui, il ne marche plus (ou mal)",
      "Non, c'est juste esthétique",
      "C'est un consommable ou une batterie amovible",
    ],
    correct: 0,
    explain: "Dommage purement esthétique, consommables et batteries amovibles : non éligibles. Casse qui bloque l'usage, batterie inamovible : éligibles.",
  },
  {
    question: "Qui va réparer ?",
    options: [
      "Un réparateur labellisé QualiRépar",
      "Moi-même, avec une pièce achetée",
      "Un réparateur non labellisé",
    ],
    correct: 0,
    explain: "Le bonus n'existe que chez un réparateur labellisé, qui le déduit lui-même de votre facture. L'annuaire officiel les recense.",
  },
  {
    question: "Devis à 90 € pour un PC portable : le bonus de 50 € s'applique-t-il ?",
    options: ["Non, sous le seuil de 150 €", "Oui, dans tous les cas", "Je ne sais pas"],
    correct: 0,
    explain: "Certains appareils ont un seuil de déclenchement (150 € pour un portable, 100 € pour un moniteur) : en dessous, pas de bonus.",
  },
]

export function BonusCheck() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null])
  const answered = answers.filter((a) => a !== null).length
  const score = answers.filter((a, i) => a === BONUS_QUIZ[i].correct).length

  const answer = (question: number, option: number) => {
    setAnswers((prev) => prev.map((value, i) => (i === question ? option : value)))
  }

  return (
    <div className={cardClass}>
      <WidgetTitle>Votre réparation aurait-elle le bonus ?</WidgetTitle>
      <WidgetHint>4 questions, les vraies conditions. La correction s'affiche aussitôt.</WidgetHint>
      <div className="space-y-5">
        {BONUS_QUIZ.map((item, qi) => (
          <fieldset key={item.question} className="rounded-lg bg-card p-4">
            <legend className="px-1 text-sm font-semibold text-foreground">{item.question}</legend>
            <div className="mt-2 space-y-2">
              {item.options.map((option, oi) => {
                const chosen = answers[qi] === oi
                const revealed = answers[qi] !== null
                return (
                  <label
                    key={option}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 text-sm transition-colors",
                      revealed && oi === item.correct && "border-emerald-500 bg-emerald-500/10",
                      revealed && chosen && oi !== item.correct && "border-red-400 bg-red-500/10",
                      !revealed && "border-border hover:bg-secondary/60"
                    )}
                  >
                    <input
                      type="radio"
                      name={`bonus-q${qi}`}
                      checked={chosen}
                      onChange={() => answer(qi, oi)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                )
              })}
            </div>
            {answers[qi] !== null && (
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {item.explain}
              </p>
            )}
          </fieldset>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-foreground" aria-live="polite">
        Score : {score} sur {BONUS_QUIZ.length} ({answered} sur {BONUS_QUIZ.length} répondues)
      </p>
    </div>
  )
}

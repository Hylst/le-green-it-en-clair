"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SourceTooltip } from "@/components/source-tooltip"
import Image from "next/image"
import {
  ArrowRight,
  Leaf,
  Users,
  Building2,
  Lightbulb,
  Recycle,
  Server,
  AlertTriangle,
  Scale,
  Code2,
  Calculator,
} from "lucide-react"

export default function HomePage() {
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [showQuizResult, setShowQuizResult] = useState(false)

  const handleQuizSubmit = () => {
    setShowQuizResult(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-background dark:via-secondary dark:to-background px-6 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <Image
            src="/greenit/abstract-green-technology-network-with-leaves-and-.webp"
            alt="Green IT concept - réseau technologique écologique avec des feuilles naturelles"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              Le Green IT en clair - Écologie Numérique
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              Le numérique a un impact sur notre planète
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground lg:text-xl">
              Chaque année en France, nous collectons près de{" "}
              <span className="font-bold text-emerald-700 dark:text-emerald-400">1,6 million de tonnes</span> de déchets électroniques (ADEME 2024).
              <SourceTooltip
                className="ml-1"
                source="ADEME, 2024"
                calculation="≈ 24 kg collectés par habitant × 68 M d'habitants ≈ 1,6 Mt/an"
              />
              Découvrez comment agir pour un numérique plus responsable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/20"
                >
                <Link href="/par-ou-commencer">
                  Par où commencer ?
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                <Link href="/outils">
                  Calculer mon empreinte
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                <Link href="/comprendre">
                  Découvrir le Green IT
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-border">
              <Image
                src="/greenit/electronic-waste-pile-with-smartphones-tablets-and.webp"
                alt="Impact des déchets électroniques - pile de smartphones et tablettes usagés montrant l'accumulation de e-déchets"
                fill
                className="object-cover"
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Un enjeu environnemental majeur</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Nos équipements numériques ont un impact considérable sur l'environnement, de l'extraction des matières
                premières jusqu'au recyclage.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">70 kg</strong> de matières premières extraites pour un smartphone de 150g
                    <SourceTooltip className="ml-1" source="ADEME, Base Empreinte (2023)" calculation="70 000 g ÷ 150 g ≈ 467 fois la masse du smartphone" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">12 000 litres</strong> d'eau nécessaires à la fabrication
                    <SourceTooltip className="ml-1" source="ADEME (2023)" calculation="12 000 L ÷ 75 L par douche ≈ 160 douches" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">50 kg CO₂</strong> émis pendant le cycle de vie
                    <SourceTooltip className="ml-1" source="ADEME (2023)" calculation="50 kg ÷ 0,17 kg CO₂/km ≈ 300 km en voiture thermique" />
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">Source : ADEME, Base Empreinte (2023)</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Paths Section */}
      <section className="px-6 py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">Choisissez votre parcours</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Path 1: Understand */}
            <Card className="group relative overflow-hidden border-2 border-border bg-card p-8 transition-all hover:border-emerald-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je veux comprendre</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Découvrez le cycle de vie des équipements électroniques et leur impact environnemental réel.
              </p>
              <Link
                href="/comprendre"
                className="inline-flex items-center font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-red-500 dark:hover:border-red-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 transition-colors group-hover:bg-red-600 group-hover:text-white">
                <AlertTriangle className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je veux connaître les problématiques</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Explorez les défis environnementaux du numérique et les solutions actuelles et futures.
              </p>
              <Link
                href="/problematiques"
                className="inline-flex items-center font-semibold text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Découvrir les enjeux
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 2: Reduce Impact */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <Recycle className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je veux réduire mon impact</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Adoptez des gestes simples et efficaces pour diminuer votre empreinte numérique au quotidien.
              </p>
              <Link href="/agir" className="inline-flex items-center font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300">
                Découvrir les actions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 3: Collective Action */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je veux agir collectivement</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Mobilisez votre entreprise ou collectivité pour un numérique responsable et durable.
              </p>
              <Link href="/agir" className="inline-flex items-center font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Passer à l'action
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 4: Enterprise Action */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-sky-500 dark:hover:border-sky-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 transition-colors group-hover:bg-sky-600 group-hover:text-white">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je veux agir au sein de mon entreprise</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Implémentez des stratégies de Green IT pour réduire l'empreinte carbone de votre organisation.
              </p>
              <Link href="/agir" className="inline-flex items-center font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300">
                Découvrir les solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 5: Data Center Impact */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je veux comprendre les datacenters</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Apprenez comment optimiser les performances énergétiques des centres de données.
              </p>
              <Link
                href="/datacenters"
                className="inline-flex items-center font-semibold text-violet-700 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 6: Regulations */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                <Scale className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je veux connaître la réglementation</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Découvrez les lois, normes et obligations en France et en Europe pour un numérique responsable.
              </p>
              <Link
                href="/reglementation"
                className="inline-flex items-center font-semibold text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Voir les normes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 7: Developer Action */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                <Code2 className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">Je suis développeur</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Découvrez les bonnes pratiques pour développer des applications et sites web éco-responsables.
              </p>
              <Link
                href="/developpement"
                className="inline-flex items-center font-semibold text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"
              >
                Guide développeur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 8: Interactive Tools */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg">
                <Calculator className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100"><span aria-hidden="true">🎯 </span>Outils interactifs</h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                Calculez votre empreinte carbone, simulez l'impact de vos choix et testez vos connaissances.
              </p>
              <Link
                href="/outils"
                className="inline-flex items-center font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
              >
                Accéder aux outils
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
            </Card>
          </div>
        </div>
      </section>

      {/* Mini Quiz Section */}
      <section className="bg-secondary px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Testez vos connaissances</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Quelle est la phase la plus polluante dans la vie d'un smartphone ?
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: "production", label: "La production et fabrication", correct: true },
              { id: "transport", label: "Le transport depuis l'usine", correct: false },
              { id: "usage", label: "L'utilisation quotidienne", correct: false },
              { id: "recyclage", label: "Le recyclage en fin de vie", correct: false },
            ].map((option) => (
              <button
                key={option.id}
                aria-pressed={quizAnswer === option.id}
                onClick={() => {
                  setQuizAnswer(option.id)
                  setShowQuizResult(false)
                }}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${quizAnswer === option.id
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-border bg-card hover:border-muted-foreground"
                  }`}
              >
                <span className="font-medium text-foreground">{option.label}</span>
              </button>
            ))}
          </div>

          {quizAnswer && !showQuizResult && (
            <div className="mt-6 text-center">
              <Button onClick={handleQuizSubmit} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Valider ma réponse
              </Button>
            </div>
          )}

          {showQuizResult && (
            <div className="mt-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-6">
              {quizAnswer === "production" ? (
                <div>
                  <p className="mb-2 text-lg font-bold text-emerald-800 dark:text-emerald-300">Bravo, c'est correct !</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    La production représente environ <strong>75% de l'empreinte carbone</strong> d'un smartphone. C'est
                    pourquoi garder son téléphone plus longtemps est le geste le plus efficace.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mb-2 text-lg font-bold text-amber-800 dark:text-amber-400">Pas tout à fait...</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    La bonne réponse est la production. Elle représente environ{" "}
                    <strong>75% de l'empreinte carbone</strong> d'un smartphone. L'utilisation ne compte que pour 20%
                    environ.
                  </p>
                </div>
              )}
              <Link
                href="/comprendre"
                className="mt-4 inline-flex items-center font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
              >
                En savoir plus sur le cycle de vie
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="px-6 py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground lg:text-4xl">Quelques chiffres clés</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-emerald-700 dark:text-emerald-400 lg:text-5xl">
                ~70 Mt
                <SourceTooltip className="ml-1 align-middle" source="Global E-Waste Monitor 2024 (ONU)" calculation="62 Mt en 2022 + 2,6 Mt/an ≈ 70 Mt en 2025, 82 Mt projetés en 2030" />
              </div>
              <p className="text-muted-foreground">de déchets électroniques sur la trajectoire 2022-2030 (62 Mt → 82 Mt)</p>
              <p className="mt-2 text-sm text-muted-foreground">Source: Global E-waste Monitor 2024, ONU</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-teal-700 dark:text-teal-400 lg:text-5xl">
                ~80 %
                <SourceTooltip className="ml-1 align-middle" source="ADEME-Arcep, 2023" calculation="extraction ~15 % + fabrication ~60 % ≈ 75-80 % de l'empreinte du numérique (France)" />
              </div>
              <p className="text-muted-foreground">de l'empreinte carbone du numérique vient de la fabrication des équipements (France)</p>
              <p className="mt-2 text-sm text-muted-foreground">Source: ADEME-Arcep 2023</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-blue-700 dark:text-blue-400 lg:text-5xl">
                3,4 %
                <SourceTooltip className="ml-1 align-middle" source="GreenIT, EENM 2025" calculation="1,8 Gt CO₂e ÷ ~53 Gt d'émissions mondiales ≈ 3,4 %" />
              </div>
              <p className="text-muted-foreground">des émissions mondiales de GES (1,8 Gt CO2e) sont dues au numérique</p>
              <p className="mt-2 text-sm text-muted-foreground">Source: GreenIT EENM 2025</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-emerald-700 dark:text-emerald-400 lg:text-5xl">
                2 à 3 ans
                <SourceTooltip className="ml-1 align-middle" source="ADEME, 2026" calculation="durée de vie moyenne observée en France, renouvellement tous les 3 ans" />
              </div>
              <p className="text-muted-foreground">durée de vie moyenne d'un smartphone en France, changement tous les 3 ans</p>
              <p className="mt-2 text-sm text-muted-foreground">Source: ADEME 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-800 dark:from-emerald-800 dark:to-teal-900 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">Prêt à réduire votre empreinte numérique ?</h2>
          <p className="mb-8 text-lg text-emerald-50 dark:text-emerald-100">
            Utilisez notre calculateur pour estimer votre impact et découvrir des actions concrètes adaptées à votre
            situation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 border-white">
              <Link href="/outils">
                Calculer mon empreinte
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <Link href="/ressources">
                Explorer les ressources
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

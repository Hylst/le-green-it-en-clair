"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 px-6 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/abstract-green-technology-network-with-leaves-and-.jpg"
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
              <Leaf className="h-4 w-4" />
              Le Green IT en clair - Écologie Numérique
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-slate-900 lg:text-6xl">
              Le numérique a un impact sur notre planète
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-slate-600 lg:text-xl">
              Chaque année en France, nous produisons plus de{" "}
              <span className="font-bold text-emerald-700">1,5 million de tonnes</span> de déchets électroniques.
              Découvrez comment agir pour un numérique plus responsable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/par-ou-commencer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  Par où commencer ?
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/outils">
                <Button size="lg" variant="outline">
                  Calculer mon empreinte
                </Button>
              </Link>
              <Link href="/comprendre">
                <Button size="lg" variant="outline">
                  Découvrir le Green IT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/electronic-waste-pile-with-smartphones-tablets-and.jpg"
                alt="Impact des déchets électroniques - pile de smartphones et tablettes usagés montrant l'accumulation de e-déchets"
                fill
                className="object-cover"
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Un enjeu environnemental majeur</h3>
              <p className="text-lg text-slate-600 mb-4">
                Nos équipements numériques ont un impact considérable sur l'environnement, de l'extraction des matières
                premières jusqu'au recyclage.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                  <span className="text-slate-700">
                    <strong>70 kg</strong> de matières premières extraites pour un smartphone de 150g
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                  <span className="text-slate-700">
                    <strong>12 000 litres</strong> d'eau nécessaires à la fabrication
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                  <span className="text-slate-700">
                    <strong>50 kg CO₂</strong> émis pendant le cycle de vie
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User Paths Section */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">Choisissez votre parcours</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Path 1: Understand */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-emerald-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je veux comprendre</h3>
              <p className="mb-6 text-slate-600">
                Découvrez le cycle de vie des équipements électroniques et leur impact environnemental réel.
              </p>
              <Link
                href="/comprendre"
                className="inline-flex items-center font-semibold text-emerald-700 hover:text-emerald-800"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-red-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 transition-colors group-hover:bg-red-600 group-hover:text-white">
                <AlertTriangle className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je veux connaître les problématiques</h3>
              <p className="mb-6 text-slate-600">
                Explorez les défis environnementaux du numérique et les solutions actuelles et futures.
              </p>
              <Link
                href="/problematiques"
                className="inline-flex items-center font-semibold text-red-700 hover:text-red-800"
              >
                Découvrir les enjeux
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 2: Reduce Impact */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <Recycle className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je veux réduire mon impact</h3>
              <p className="mb-6 text-slate-600">
                Adoptez des gestes simples et efficaces pour diminuer votre empreinte numérique au quotidien.
              </p>
              <Link href="/agir" className="inline-flex items-center font-semibold text-teal-700 hover:text-teal-800">
                Découvrir les actions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 3: Collective Action */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-blue-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je veux agir collectivement</h3>
              <p className="mb-6 text-slate-600">
                Mobilisez votre entreprise ou collectivité pour un numérique responsable et durable.
              </p>
              <Link href="/agir" className="inline-flex items-center font-semibold text-blue-700 hover:text-blue-800">
                Passer à l'action
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 4: Enterprise Action */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-sky-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 transition-colors group-hover:bg-sky-600 group-hover:text-white">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je veux agir au sein de mon entreprise</h3>
              <p className="mb-6 text-slate-600">
                Implémentez des stratégies de Green IT pour réduire l'empreinte carbone de votre organisation.
              </p>
              <Link href="/agir" className="inline-flex items-center font-semibold text-sky-700 hover:text-sky-800">
                Découvrir les solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 5: Data Center Impact */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-violet-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je veux comprendre les datacenters</h3>
              <p className="mb-6 text-slate-600">
                Apprenez comment optimiser les performances énergétiques des centres de données.
              </p>
              <Link
                href="/datacenters"
                className="inline-flex items-center font-semibold text-violet-700 hover:text-violet-800"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 6: Regulations */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-indigo-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                <Scale className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je veux connaître la réglementation</h3>
              <p className="mb-6 text-slate-600">
                Découvrez les lois, normes et obligations en France et en Europe pour un numérique responsable.
              </p>
              <Link
                href="/reglementation"
                className="inline-flex items-center font-semibold text-indigo-700 hover:text-indigo-800"
              >
                Voir les normes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 7: Developer Action */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-orange-500 hover:shadow-lg">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                <Code2 className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Je suis développeur</h3>
              <p className="mb-6 text-slate-600">
                Découvrez les bonnes pratiques pour développer des applications et sites web éco-responsables.
              </p>
              <Link
                href="/developpement"
                className="inline-flex items-center font-semibold text-orange-700 hover:text-orange-800"
              >
                Guide développeur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            {/* Path 8: Interactive Tools */}
            <Card className="group relative overflow-hidden border-2 border-slate-200 p-8 transition-all hover:border-amber-500 hover:shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg">
                <Calculator className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">🎯 Outils interactifs</h3>
              <p className="mb-6 text-slate-600">
                Calculez votre empreinte carbone, simulez l'impact de vos choix et testez vos connaissances.
              </p>
              <Link
                href="/outils"
                className="inline-flex items-center font-semibold text-amber-700 hover:text-amber-800"
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
      <section className="bg-slate-50 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">Testez vos connaissances</h2>
            <p className="mb-8 text-lg text-slate-600">
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
                onClick={() => {
                  setQuizAnswer(option.id)
                  setShowQuizResult(false)
                }}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${quizAnswer === option.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <span className="font-medium text-slate-900">{option.label}</span>
              </button>
            ))}
          </div>

          {quizAnswer && !showQuizResult && (
            <div className="mt-6 text-center">
              <Button onClick={handleQuizSubmit} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Valider ma réponse
              </Button>
            </div>
          )}

          {showQuizResult && (
            <div className="mt-6 rounded-xl bg-emerald-50 border-2 border-emerald-200 p-6">
              {quizAnswer === "production" ? (
                <div>
                  <p className="mb-2 text-lg font-bold text-emerald-800">Bravo, c'est correct !</p>
                  <p className="text-slate-700">
                    La production représente environ <strong>75% de l'empreinte carbone</strong> d'un smartphone. C'est
                    pourquoi garder son téléphone plus longtemps est le geste le plus efficace.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mb-2 text-lg font-bold text-amber-800">Pas tout à fait...</p>
                  <p className="text-slate-700">
                    La bonne réponse est la production. Elle représente environ{" "}
                    <strong>75% de l'empreinte carbone</strong> d'un smartphone. L'utilisation ne compte que pour 20%
                    environ.
                  </p>
                </div>
              )}
              <Link
                href="/comprendre"
                className="mt-4 inline-flex items-center font-semibold text-emerald-700 hover:text-emerald-800"
              >
                En savoir plus sur le cycle de vie
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 lg:text-4xl">Quelques chiffres clés</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-emerald-700 lg:text-5xl">74,7 Mt</div>
              <p className="text-slate-600">de déchets électroniques produits dans le monde en 2025</p>
              <p className="mt-2 text-sm text-slate-500">Source: Global E-Waste Monitor, ONU</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-teal-700 lg:text-5xl">78%</div>
              <p className="text-slate-600">de l'impact carbone du numérique vient des équipements</p>
              <p className="mt-2 text-sm text-slate-500">Source: ADEME, GreenIT.fr</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-blue-700 lg:text-5xl">4%</div>
              <p className="text-slate-600">des émissions mondiales de GES sont dues au numérique</p>
              <p className="mt-2 text-sm text-slate-500">Source: GreenIT.fr</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold text-emerald-700 lg:text-5xl">2,3 ans</div>
              <p className="text-slate-600">durée de vie moyenne d'un smartphone en France</p>
              <p className="mt-2 text-sm text-slate-500">Source: ADEME</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">Prêt à réduire votre empreinte numérique ?</h2>
          <p className="mb-8 text-lg text-emerald-50">
            Utilisez notre calculateur pour estimer votre impact et découvrir des actions concrètes adaptées à votre
            situation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/outils">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                Calculer mon empreinte
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/ressources">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Explorer les ressources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import {
  Code2,
  Zap,
  Database,
  ImageIcon,
  Globe,
  TrendingUp,
  Brain,
  Server,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function DeveloppementPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")

  // Données de comparaison des langages
  const languageComparison = [
    { name: "C", energie: 1.0, performance: 1.0, co2: 1.0 },
    { name: "Rust", energie: 1.03, performance: 1.04, co2: 1.03 },
    { name: "C++", energie: 1.34, performance: 1.56, co2: 1.34 },
    { name: "Java", energie: 1.98, performance: 1.89, co2: 1.98 },
    { name: "Go", energie: 3.23, performance: 2.83, co2: 3.23 },
    { name: "JavaScript", energie: 4.45, performance: 6.52, co2: 4.45 },
    { name: "Python", energie: 75.88, performance: 71.9, co2: 75.88 },
    { name: "Ruby", energie: 69.91, performance: 64.02, co2: 69.91 },
  ]

  // Comparaison formats d'images
  const imageFormats = [
    { format: "JPEG", taille: 100, qualite: 85, cas: "Photos" },
    { format: "WebP", taille: 65, qualite: 85, cas: "Web moderne" },
    { format: "AVIF", taille: 50, qualite: 85, cas: "Optimal 2025" },
    { format: "PNG", taille: 180, qualite: 100, cas: "Transparence" },
    { format: "SVG", taille: 15, qualite: 100, cas: "Vectoriel" },
  ]

  // Impact du lazy loading
  const lazyLoadingImpact = [
    { metric: "Temps de chargement", sans: 4.2, avec: 1.8 },
    { metric: "Données transférées", sans: 3.5, avec: 0.8 },
    { metric: "Énergie consommée", sans: 100, avec: 35 },
  ]

  // Comparaison algorithmes
  const algoComplexity = [
    { n: 10, "O(1)": 1, "O(log n)": 3, "O(n)": 10, "O(n log n)": 33, "O(n²)": 100 },
    { n: 100, "O(1)": 1, "O(log n)": 7, "O(n)": 100, "O(n log n)": 664, "O(n²)": 10000 },
    { n: 1000, "O(1)": 1, "O(log n)": 10, "O(n)": 1000, "O(n log n)": 9966, "O(n²)": 1000000 },
  ]

  // Bonnes pratiques par catégorie
  const bestPractices = {
    algorithmes: [
      { good: true, text: "Utiliser des structures de données adaptées (HashMap vs Array)" },
      { good: true, text: "Privilégier O(log n) ou O(n) plutôt que O(n²)" },
      { good: true, text: "Mettre en cache les calculs répétitifs" },
      { good: false, text: "Boucles imbriquées non optimisées" },
      { good: false, text: "Recherches linéaires sur grandes listes" },
    ],
    donnees: [
      { good: true, text: "Charger uniquement les données nécessaires (pagination)" },
      { good: true, text: "Compresser les réponses API (gzip, brotli)" },
      { good: true, text: "Utiliser GraphQL pour requêtes précises" },
      { good: false, text: "Charger toute la base de données en mémoire" },
      { good: false, text: "Requêtes N+1 non optimisées" },
    ],
    medias: [
      { good: true, text: "Formats modernes : WebP, AVIF pour images" },
      { good: true, text: "Lazy loading pour images et vidéos" },
      { good: true, text: "Responsive images avec srcset" },
      { good: true, text: "Compression vidéo adaptative (HLS, DASH)" },
      { good: false, text: "Images non compressées en PNG" },
      { good: false, text: "Vidéos en autoplay sans contrôle" },
    ],
    infrastructure: [
      { good: true, text: "CDN pour contenus statiques" },
      { good: true, text: "Mise en cache intelligente (Redis, Memcached)" },
      { good: true, text: "Auto-scaling basé sur la charge réelle" },
      { good: true, text: "Serverless pour charges variables" },
      { good: false, text: "Serveurs surdimensionnés 24/7" },
      { good: false, text: "Pas de mise en cache" },
    ],
  }

  // Impact ML
  const mlImpact = [
    { modele: "GPT-3 (entraînement)", co2: 552000, equivalent: "120 voitures/an" },
    { modele: "BERT (entraînement)", co2: 1438, equivalent: "1 vol NY-SF" },
    { modele: "GPT-3 (inférence/1000 req)", co2: 8.4, equivalent: "4 km en voiture" },
    { modele: "MobileNet (inférence/1000 req)", co2: 0.02, equivalent: "10 m en voiture" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-transparent to-blue-100/50" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/developer-coding-on-laptop-with-green-leaves-and-e.jpg"
            alt="Développement éco-responsable"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block mb-4">
            <Badge className="bg-green-600 text-white px-4 py-1">
              <Code2 className="w-4 h-4 mr-2 inline" />
              Guide du développeur responsable
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Développer des applications <span className="text-green-600">éco-responsables</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl text-pretty">
            Chaque ligne de code a un impact. Découvrez comment optimiser vos applications et sites web pour réduire
            leur consommation énergétique sans sacrifier la performance.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Par Geoffroy Streit, concepteur développeur d'applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Mis à jour en 2025</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/clean-efficient-code-on-screen-with-green-energy-s.jpg"
                alt="Code optimisé"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">L'impact du code sur l'environnement</h3>
              <p className="text-lg text-gray-600 mb-4">
                Chaque requête, chaque algorithme, chaque image non optimisée consomme de l'énergie. En tant que
                développeurs, nous avons le pouvoir de réduire significativement cet impact.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Réduction de 30-70% de la consommation possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Amélioration des performances utilisateur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Réduction des coûts d'infrastructure</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">30-70%</div>
                <div className="text-sm text-gray-600">
                  Réduction possible de la consommation énergétique avec les bonnes pratiques
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">75x</div>
                <div className="text-sm text-gray-600">
                  Différence de consommation entre Python et C pour le même algorithme
                </div>
              </CardContent>
            </Card>
            <Card className="border-amber-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">552 tonnes</div>
                <div className="text-sm text-gray-600">CO₂ émis pour entraîner GPT-3 (équivalent 120 voitures/an)</div>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">65%</div>
                <div className="text-sm text-gray-600">Réduction de taille avec WebP vs JPEG à qualité égale</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Choix des langages */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Code2 className="inline w-10 h-10 text-green-600 mr-3" />
              Choisir le bon langage
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              Le choix du langage de programmation a un impact direct sur la consommation énergétique. Tous les langages
              ne se valent pas en termes d'efficacité énergétique.
            </p>
          </div>

          <div className="mb-8 relative h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/programming-languages-comparison-chart-with-energy.jpg"
              alt="Comparaison énergétique des langages"
              fill
              className="object-cover"
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Comparaison énergétique des langages (base 1.0 = C)</CardTitle>
              <CardDescription>Source : Energy Efficiency across Programming Languages (2025)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={languageComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="energie" fill="#10b981" name="Consommation énergétique" />
                  <Bar dataKey="co2" fill="#3b82f6" name="Émissions CO₂" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700">Langages efficaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">C / Rust / C++</div>
                  <p className="text-sm text-gray-600">
                    Compilés, très performants. Idéaux pour systèmes critiques, calculs intensifs, IoT.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Go / Java</div>
                  <p className="text-sm text-gray-600">
                    Bon compromis performance/productivité. Parfaits pour APIs, microservices, backend.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">JavaScript (Node.js)</div>
                  <p className="text-sm text-gray-600">
                    Acceptable pour web. Optimiser avec TypeScript et bundlers modernes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-700">Langages gourmands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Python / Ruby</div>
                  <p className="text-sm text-gray-600">
                    75x plus énergivores que C. À utiliser pour prototypage, scripts, mais optimiser en production.
                  </p>
                </div>
                <div className="font-semibold text-green-700 text-sm mt-4">💡 Astuce</div>
                <p className="text-sm text-gray-600">
                  Utilisez Python pour le développement rapide, mais réécrivez les parties critiques en Rust ou C++ pour
                  la production. Ou utilisez PyPy (JIT compiler) pour améliorer les performances.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Optimisation des algorithmes */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Zap className="inline w-10 h-10 text-amber-600 mr-3" />
              Optimiser les algorithmes
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              La complexité algorithmique a un impact exponentiel sur la consommation. Un algorithme O(n²) peut
              consommer 10 000x plus qu'un O(n) sur 1000 éléments.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Impact de la complexité algorithmique</CardTitle>
              <CardDescription>Nombre d'opérations selon la taille des données</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={algoComplexity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="n"
                    label={{ value: "Taille des données (n)", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis scale="log" domain={[1, 1000000]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="O(1)" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="O(log n)" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="O(n)" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="O(n log n)" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="O(n²)" stroke="#dc2626" strokeWidth={3} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Tabs defaultValue="algorithmes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="algorithmes">Algorithmes</TabsTrigger>
              <TabsTrigger value="donnees">Données</TabsTrigger>
              <TabsTrigger value="medias">Médias</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            </TabsList>

            {Object.entries(bestPractices).map(([key, practices]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>Bonnes pratiques - {key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {practices.map((practice, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          {practice.good ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={practice.good ? "text-gray-700" : "text-gray-500 line-through"}>
                            {practice.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Gestion des données */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Database className="inline w-10 h-10 text-blue-600 mr-3" />
              Traiter uniquement les données nécessaires
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              Chaque octet transféré consomme de l'énergie. La règle d'or : ne charger que ce qui est vraiment
              nécessaire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Mauvaise pratique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {`// ❌ Charger toute la table
const users = await db.users.findAll()

// ❌ Requête N+1
users.forEach(user => {
  const posts = await db.posts
    .findByUserId(user.id)
})

// ❌ Tout envoyer au client
res.json(users) // 10 MB de données`}
                </pre>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Bonne pratique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {`// ✅ Pagination + sélection
const users = await db.users.findMany({
  select: { id, name, email },
  take: 20,
  skip: page * 20
})

// ✅ Jointure optimisée
const users = await db.users.findMany({
  include: { posts: true }
})

// ✅ Compression
res.json(users) // 150 KB compressé`}
                </pre>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Techniques d'optimisation des données</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Côté serveur</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Pagination :</strong> Limiter à 20-50 résultats par page
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Sélection de champs :</strong> Ne renvoyer que les colonnes nécessaires
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Compression :</strong> Gzip/Brotli pour réduire de 70-90%
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Cache :</strong> Redis/Memcached pour données fréquentes
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Côté client</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Lazy loading :</strong> Charger au scroll (infinite scroll)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>GraphQL :</strong> Requêtes précises, pas d'over-fetching
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Cache navigateur :</strong> Service Workers, localStorage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Debouncing :</strong> Limiter les requêtes (recherche, scroll)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Optimisation des médias */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <ImageIcon className="inline w-10 h-10 text-purple-600 mr-3" />
              Optimiser les médias
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              Les images et vidéos représentent 60-80% du poids des pages web. Leur optimisation est cruciale pour
              réduire la consommation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Comparaison des formats d'images</CardTitle>
                <CardDescription>Taille relative pour une même qualité visuelle</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={imageFormats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="format" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="taille" fill="#8b5cf6" name="Taille (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact du lazy loading</CardTitle>
                <CardDescription>Réduction de la consommation (base 100)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={lazyLoadingImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sans" fill="#ef4444" name="Sans lazy loading" />
                    <Bar dataKey="avec" fill="#10b981" name="Avec lazy loading" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Guide d'optimisation des médias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-purple-600" />
                    Images
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="font-medium text-green-700">✅ À faire</div>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Utiliser WebP ou AVIF (50-65% plus léger)</li>
                        <li>• Lazy loading avec loading="lazy"</li>
                        <li>• Responsive images avec srcset</li>
                        <li>• Compression adaptée (80-85% qualité)</li>
                        <li>• SVG pour icônes et logos</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-red-700">❌ À éviter</div>
                      <ul className="space-y-1 text-gray-700">
                        <li>• PNG non compressé pour photos</li>
                        <li>• Images plus grandes que l'affichage</li>
                        <li>• Charger toutes les images d'un coup</li>
                        <li>• GIF animés (utiliser vidéo)</li>
                        <li>• Images non optimisées (&gt; 200 KB)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">🎥 Vidéos</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p className="mb-2">
                        <strong>Streaming adaptatif :</strong> HLS ou DASH pour ajuster la qualité selon la connexion
                      </p>
                      <p className="mb-2">
                        <strong>Compression :</strong> H.265 (HEVC) ou AV1 pour réduire de 50% vs H.264
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">
                        <strong>Lazy loading :</strong> Ne charger que quand visible
                      </p>
                      <p className="mb-2">
                        <strong>Pas d'autoplay :</strong> Laisser l'utilisateur décider (économie 80%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white p-3 rounded-lg">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Exemple concret : optimisation d'une page produit
                  </h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      • <strong>Avant :</strong> 12 images PNG, 4.2 MB, 6.5s de chargement
                    </p>
                    <p>
                      • <strong>Après :</strong> 12 images WebP + lazy loading, 580 KB, 1.2s de chargement
                    </p>
                    <p className="text-green-700 font-medium mt-2">
                      → Réduction de 86% du poids et 82% du temps de chargement
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Machine Learning */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Brain className="inline w-10 h-10 text-pink-600 mr-3" />
              Cas particulier du Machine Learning
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              L'IA et le ML sont extrêmement énergivores. L'entraînement d'un grand modèle peut émettre autant de CO₂
              que 5 voitures pendant toute leur durée de vie.
            </p>
          </div>

          <Card className="mb-8 border-pink-200">
            <CardHeader>
              <CardTitle>Impact carbone des modèles de ML</CardTitle>
              <CardDescription>Émissions CO₂ en kg</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mlImpact.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 font-medium text-sm text-gray-900">{item.modele}</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-8 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-red-500 h-full flex items-center justify-end pr-3 text-white text-xs font-medium"
                          style={{ width: `${Math.min((item.co2 / 552000) * 100, 100)}%` }}
                        >
                          {item.co2.toLocaleString()} kg
                        </div>
                      </div>
                    </div>
                    <div className="w-40 text-sm text-gray-600">{item.equivalent}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-pink-700">Bonnes pratiques ML</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Utiliser des modèles pré-entraînés</strong>
                      <p className="text-gray-600">Transfer learning plutôt que tout réentraîner</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Optimiser la taille des modèles</strong>
                      <p className="text-gray-600">Pruning, quantization, distillation (MobileNet, TinyBERT)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Inférence locale quand possible</strong>
                      <p className="text-gray-600">Edge computing, modèles on-device (TensorFlow Lite)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Batch processing</strong>
                      <p className="text-gray-600">Grouper les requêtes plutôt qu'une par une</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Choisir des datacenters verts</strong>
                      <p className="text-gray-600">Privilégier les régions avec énergies renouvelables</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-pink-50 border-pink-200">
              <CardHeader>
                <CardTitle>Alternatives légères</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Se poser la question : ai-je vraiment besoin d'IA ?
                    </div>
                    <p className="text-gray-600">
                      Parfois, des règles simples ou des algorithmes classiques suffisent.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Modèles légers</div>
                    <ul className="text-gray-600 space-y-1 ml-4">
                      <li>• MobileNet au lieu de ResNet</li>
                      <li>• DistilBERT au lieu de BERT</li>
                      <li>• GPT-3.5 au lieu de GPT-4</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Mise en cache intelligente</div>
                    <p className="text-gray-600">Stocker les résultats fréquents pour éviter de recalculer</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-pink-200">
                    <div className="text-pink-700 font-medium mb-1">💡 Impact réel</div>
                    <p className="text-gray-700">
                      Utiliser MobileNet au lieu de ResNet pour la classification d'images réduit la consommation de{" "}
                      <strong>98%</strong> avec une précision similaire.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CDN et Infrastructure */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Globe className="inline w-10 h-10 text-blue-600 mr-3" />
              CDN et infrastructure distribuée
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              Un CDN (Content Delivery Network) réduit la distance entre l'utilisateur et les données, diminuant ainsi
              la latence et la consommation énergétique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700">Avantages CDN</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>40-60% plus rapide</strong> grâce à la proximité géographique
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>Moins de bande passante</strong> sur le serveur origine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>Cache intelligent</strong> pour contenus statiques
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>Réduction CO₂</strong> par optimisation des routes réseau
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700">CDN recommandés</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li>
                    <div className="font-semibold text-gray-900">Cloudflare</div>
                    <p className="text-gray-600">100% énergies renouvelables, gratuit pour petits sites</p>
                  </li>
                  <li>
                    <div className="font-semibold text-gray-900">Vercel Edge Network</div>
                    <p className="text-gray-600">Optimisé pour Next.js, déploiement automatique</p>
                  </li>
                  <li>
                    <div className="font-semibold text-gray-900">Bunny CDN</div>
                    <p className="text-gray-600">Européen, RGPD compliant, très performant</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-700">À mettre en cache</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Images, CSS, JavaScript</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Fonts, icônes, logos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Vidéos, fichiers audio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Documents PDF, archives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Données personnelles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Contenu temps réel</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Exemple de configuration CDN optimale</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                {`// next.config.js - Configuration Vercel Edge
module.exports = {
  images: {
    domains: ['cdn.example.com'],
    formats: ['image/avif', 'image/webp'], // Formats modernes
    deviceSizes: [640, 750, 828, 1080, 1200], // Responsive
  },
  
  // Cache headers pour contenus statiques
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 an
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scalabilité */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <TrendingUp className="inline w-10 h-10 text-green-600 mr-3" />
              Scalabilité intelligente
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              Adapter automatiquement les ressources à la charge réelle évite le gaspillage énergétique des serveurs
              surdimensionnés qui tournent à vide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Approche traditionnelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2">Serveurs dédiés 24/7</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Dimensionnés pour le pic de charge</li>
                      <li>• Tournent à 10-30% en moyenne</li>
                      <li>• Gaspillage énergétique 70-90%</li>
                      <li>• Coût fixe élevé</li>
                    </ul>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Exemple :</strong> Un serveur à 2000€/mois utilisé à 15% = 1700€ gaspillés + énergie inutile
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Approche moderne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2">Auto-scaling + Serverless</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ressources adaptées en temps réel</li>
                      <li>• Scale to zero quand pas d'usage</li>
                      <li>• Économie 60-80% d'énergie</li>
                      <li>• Paiement à l'usage réel</li>
                    </ul>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Exemple :</strong> Vercel Serverless Functions = 0€ quand pas d'usage, scale automatiquement
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stratégies de scalabilité éco-responsable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Serverless / FaaS</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>AWS Lambda, Vercel Functions :</strong> Exécution à la demande
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Cloudflare Workers :</strong> Edge computing ultra-léger
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Idéal pour :</strong> APIs, webhooks, tâches ponctuelles
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Containers + Kubernetes</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Horizontal Pod Autoscaler :</strong> Ajuste le nombre de pods
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Vertical Pod Autoscaler :</strong> Ajuste CPU/RAM
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Idéal pour :</strong> Applications complexes, microservices
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Mise en cache multi-niveaux</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>CDN :</strong> Cache edge pour contenus statiques
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Redis :</strong> Cache applicatif pour données fréquentes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Database query cache :</strong> Évite les requêtes répétées
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Optimisation temporelle</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Tâches lourdes la nuit :</strong> Profiter des heures creuses
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Batch processing :</strong> Grouper les traitements
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Régions vertes :</strong> Choisir datacenters avec énergies renouvelables
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checklist finale */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-green-300 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="text-2xl">✅ Checklist du développeur éco-responsable</CardTitle>
              <CardDescription>À vérifier avant chaque mise en production</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🎯 Performance & Algorithmes</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Complexité algorithmique optimisée (éviter O(n²))</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Structures de données adaptées (HashMap, Set, etc.)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Mise en cache des calculs répétitifs</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">💾 Données</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Pagination implémentée (max 50 résultats/page)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Sélection de champs (pas de SELECT *)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Compression activée (gzip/brotli)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Pas de requêtes N+1</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🖼️ Médias</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Images en WebP ou AVIF</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Lazy loading activé</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Responsive images (srcset)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Pas d'autoplay vidéo</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🌐 Infrastructure</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>CDN configuré pour contenus statiques</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Auto-scaling activé</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Cache multi-niveaux (CDN + Redis)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Datacenter avec énergies renouvelables</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🤖 IA / ML</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Modèle léger ou pré-entraîné utilisé</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Batch processing pour inférences</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Cache des résultats fréquents</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Chaque optimisation compte</h2>
            <p className="text-lg mb-8 text-green-50">
              En appliquant ces bonnes pratiques, vous pouvez réduire de 30 à 70% la consommation énergétique de vos
              applications tout en améliorant leur performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/outils"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Calculer mon impact
              </a>
              <a
                href="/ressources"
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Télécharger le guide
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-green-50 via-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-300 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-600 text-white p-2 rounded-lg">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">En vrai, c'est quoi coder plus vert ?</CardTitle>
                  <CardDescription className="text-base">
                    Quelques réflexes simples pour limiter la surchauffe côté serveurs et users
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-green max-w-none">
                <p className="text-gray-700 text-lg mb-6">
                  Quand on code un site ou une app, on pense pas forcément à la conso électrique, mais en vrai, c'est un
                  vrai sujet. Voici quelques trucs simples (ou pas trop) pour limiter l'impact :
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-200">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <Zap className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Optimiser les algo</h4>
                      <p className="text-gray-700 text-sm">
                        Pas besoin de boucles qui tournent dans le vide ou d'un tri maison mal foutu. Un algo plus
                        propre = moins de cycles CPU = moins d'énergie cramée.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-200">
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                      <Code2 className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Choisir les bons langages / libs</h4>
                      <p className="text-gray-700 text-sm">
                        Certains langages sont un peu gloutons (coucou JS sur le backend quand c'est pas nécessaire).
                        Parfois du Rust, Go ou même du C++ pour les trucs lourds, c'est plus sobre que du Python
                        partout.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-purple-200">
                    <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                      <Database className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Traiter que les données utiles</h4>
                      <p className="text-gray-700 text-sm">
                        Filtrer avant d'envoyer tout à la base, ne charger que ce que l'utilisateur voit. Si tu peux
                        éviter un gros <code className="bg-gray-100 px-1 rounded">SELECT * FROM table_de_10Go</code>,
                        fais-le.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-pink-200">
                    <div className="bg-pink-100 p-2 rounded-lg flex-shrink-0">
                      <Brain className="w-5 h-5 text-pink-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Machine learning</h4>
                      <p className="text-gray-700 text-sm">
                        Là faut être carrément vigilant. Entraîner un modèle pour prédire un truc trivial, c'est souvent
                        du gâchis. Réutiliser des modèles pré-entraînés ou simplifier les datasets, c'est déjà un gros
                        gain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-amber-200">
                    <div className="bg-amber-100 p-2 rounded-lg flex-shrink-0">
                      <ImageIcon className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Optimiser les médias</h4>
                      <p className="text-gray-700 text-sm">
                        Compresser les images, utiliser du webp/avif, virer les vidéos autoplay, charger le nécessaire.
                        Un gif de 10Mo pour un bouton "like", c'est un crime.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-cyan-200">
                    <div className="bg-cyan-100 p-2 rounded-lg flex-shrink-0">
                      <Globe className="w-5 h-5 text-cyan-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">CDN et cache</h4>
                      <p className="text-gray-700 text-sm">
                        Servir le contenu depuis un CDN proche des users évite plein de transfert réseau inutile. Et le
                        cache navigateur, c'est pas que pour la perf, c'est aussi moins d'énergie consommée.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-indigo-200">
                    <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                      <Server className="w-5 h-5 text-indigo-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scalabilité raisonnée</h4>
                      <p className="text-gray-700 text-sm">
                        Scaler automatiquement c'est cool, mais faut pas lancer 10 serveurs à vide juste "au cas où".
                        Une infra bien calibrée consomme moins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-teal-200">
                    <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                      <Code2 className="w-5 h-5 text-teal-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Front plus léger</h4>
                      <p className="text-gray-700 text-sm">
                        Éviter les frameworks monstres si t'as un site vitrine. Du HTML/CSS/vanilla JS ça suffit
                        souvent. Chaque kilo de code JS téléchargé par des milliers d'utilisateurs = conso multipliée.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-green-300">
                  <p className="text-gray-900 font-semibold text-lg mb-2">💡 Le truc à retenir</p>
                  <p className="text-gray-700">
                    Bref, coder plus "vert", c'est pas forcément plus dur, c'est surtout coder plus malin. Et en
                    général, tout ce qui rend ton app plus rapide, la rend aussi plus économe.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 px-4 bg-white"></section>
    </div>
  )
}

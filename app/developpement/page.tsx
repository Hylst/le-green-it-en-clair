"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
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
  Lightbulb,
  Video,
  Target,
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
import { LanguageComparisonSVG } from "@/components/language-comparison-svg"
import { useChartTheme } from "@/lib/chart-theme"
import { Reveal } from "@/components/reveal"
import { Sommaire } from "@/components/sommaire"
import { ReadingProgress } from "@/components/reading-progress"

export default function DeveloppementPage() {
  const chart = useChartTheme()
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
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <Image
            src="/greenit/images/sustainable-coding.webp"
            alt="Développeur travaillant sur du code éco-responsable dans un environnement de travail durable avec plantes vertes, éclairage naturel, et écran affichant du code optimisé pour la performance énergétique"
            fill
            className="object-cover"
            loading="lazy"
            quality={70}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block mb-4">
            <Badge className="bg-primary text-primary-foreground px-4 py-1">
              <Code2 className="w-4 h-4 mr-2 inline" />
              Guide du développeur responsable
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Développer des applications <span className="text-primary">éco-responsables</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl text-pretty">
            Chaque ligne de code a un impact. Découvrez comment optimiser vos applications et sites web pour réduire
            leur consommation énergétique sans sacrifier la performance.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Par Geoffroy Streit, concepteur développeur d'applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Mis à jour en 2026</span>
            </div>
            <div className="flex items-center gap-2 md:ml-auto">
              <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                Eco-conception
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <Sommaire
        items={[
          { id: "langage", label: "Langage" },
          { id: "algorithmes", label: "Algorithmes" },
          { id: "donnees", label: "Données" },
          { id: "medias", label: "Médias" },
          { id: "machine-learning", label: "Machine learning" },
          { id: "cdn", label: "CDN" },
          { id: "scalabilite", label: "Scalabilité" },
        ]}
      />

      <section className="px-6 py-12 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="mb-8 relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/greenit/images/clean-efficient-code-on-screen-with-green-energy-s.webp"
                alt="Code propre et efficace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">L'impact du code sur l'environnement</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Chaque requête, chaque algorithme, chaque image non optimisée consomme de l'énergie. En tant que
                développeurs, nous avons le pouvoir de réduire significativement cet impact.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Réduction significative possible (très variable selon les projets)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Amélioration des performances utilisateur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Réduction des coûts d'infrastructure</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <Card className="min-w-0 border-primary/20 bg-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">30-70 %</div>
                <div className="text-sm text-muted-foreground">
                  Ordre de grandeur constaté sur des cas optimisés (très variable selon les projets)
                </div>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">75x</div>
                <div className="text-sm text-muted-foreground">
                  Différence de consommation entre Python et C pour le même algorithme (Pereira et al., 2017)
                </div>
              </CardContent>
            </Card>
            <Card className="min-w-0 border-primary/20 bg-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">552 tonnes</div>
                <div className="text-sm text-muted-foreground">CO₂ émis pour entraîner GPT-3 (équivalent 120 voitures/an)</div>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-card">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">~30 %</div>
                <div className="text-sm text-muted-foreground">Réduction de taille avec WebP vs JPEG à qualité égale (Google, fourchette 25-35 %)</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Choix des langages */}
      <Reveal as="section" className="py-16 px-4" id="langage">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <Code2 className="inline w-10 h-10 text-primary mr-3" />
              Choisir le bon langage
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Le choix du langage de programmation a un impact direct sur la consommation énergétique. Tous les langages
              ne se valent pas en termes d'efficacité énergétique.
            </p>
          </div>

          <LanguageComparisonSVG />

          <div className="mt-8 rounded-lg border bg-muted/30 p-6">
            <h4 className="mb-3 text-lg font-semibold text-foreground">
              Transcription du graphique de comparaison énergétique
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>C (langage compilé) :</strong> Consommation énergétique de référence = 1.0x (la plus efficace)
              </p>
              <p>
                <strong>Rust :</strong> 1.03x - Performance quasi-identique au C avec sécurité mémoire garantie
              </p>
              <p>
                <strong>C++ :</strong> 1.34x - Légèrement plus énergivore que C mais toujours très efficient
              </p>
              <p>
                <strong>Java :</strong> 1.98x - Presque 2x plus énergivore, mais très utilisé en entreprise
              </p>
              <p>
                <strong>JavaScript (Node.js) :</strong> 4,45x - environ 4 fois plus énergivore, impact significatif à grande
                échelle
              </p>
              <p>
                <strong>Python :</strong> 75.88x - 76 fois plus énergivore ! Idéal pour prototypage mais à optimiser en
                production
              </p>
              <p>
                <strong>Recommandation :</strong> Choisir le langage selon le contexte. Pour les calculs intensifs ou
                services haute-fréquence, privilégier les langages compilés (C, Rust, C++). Pour le développement rapide
                ou les scripts, Python reste acceptable si utilisé judicieusement.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Langages efficaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold text-foreground mb-1">C / Rust / C++</div>
                  <p className="text-sm text-muted-foreground">
                    Compilés, très performants. Idéaux pour systèmes critiques, calculs intensifs, IoT.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Go / Java</div>
                  <p className="text-sm text-muted-foreground">
                    Bon compromis performance/productivité. Parfaits pour APIs, microservices, backend.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">JavaScript (Node.js)</div>
                  <p className="text-sm text-muted-foreground">
                    Acceptable pour web. Optimiser avec TypeScript et bundlers modernes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive dark:text-red-400">Langages gourmands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold text-foreground mb-1">Python / Ruby</div>
                  <p className="text-sm text-muted-foreground">
                    75x plus énergivores que C. À utiliser pour prototypage, scripts, mais optimiser en production.
                  </p>
                </div>
                  <div className="font-semibold text-primary text-sm mt-4"><Lightbulb className="mr-1 inline h-4 w-4" />Astuce</div>
                <p className="text-sm text-muted-foreground">
                  Utilisez Python pour le développement rapide, mais réécrivez les parties critiques en Rust ou C++ pour
                  la production. Ou utilisez PyPy (JIT compiler) pour améliorer les performances.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Reveal>

      {/* Optimisation des algorithmes */}
      <Reveal as="section" className="py-16 px-4 bg-secondary/10" id="algorithmes">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <Zap className="inline w-10 h-10 text-primary mr-3" />
              Optimiser les algorithmes
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              La complexité algorithmique a un impact exponentiel sur la consommation. Un algorithme O(n²) effectue
              1 000x plus d'opérations qu'un O(n) sur 1000 éléments (1 000 000 contre 1 000, voir le tableau ci-dessous).
            </p>
          </div>

          <Card className="mb-8 bg-card border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Impact de la complexité algorithmique</CardTitle>
              <CardDescription className="text-muted-foreground">Nombre d'opérations selon la taille des données</CardDescription>
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
                  <Line type="monotone" dataKey="O(1)" stroke={chart.emerald} strokeWidth={2} />
                  <Line type="monotone" dataKey="O(log n)" stroke={chart.blue} strokeWidth={2} />
                  <Line type="monotone" dataKey="O(n)" stroke={chart.amber} strokeWidth={2} />
                  <Line type="monotone" dataKey="O(n log n)" stroke={chart.red} strokeWidth={2} />
                  <Line type="monotone" dataKey="O(n²)" stroke={chart.red} strokeWidth={3} strokeDasharray="5 5" />
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
                <Card className="bg-card border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Bonnes pratiques - {key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {practices.map((practice, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          {practice.good ? (
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          )}
                          <span className={practice.good ? "text-muted-foreground" : "text-muted-foreground line-through"}>
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
      </Reveal>

      {/* Gestion des données */}
      <Reveal as="section" className="py-16 px-4 dark:bg-slate-950" id="donnees">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <Database className="inline w-10 h-10 text-primary mr-3" />
              Traiter uniquement les données nécessaires
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Chaque octet transféré consomme de l'énergie. La règle d'or : ne charger que ce qui est vraiment
              nécessaire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="min-w-0 border-destructive/20 bg-card">
              <CardHeader>
                <CardTitle className="text-destructive dark:text-red-400 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Mauvaise pratique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {`// À éviter : charger toute la table
const users = await db.users.findAll()

// À éviter : requête N+1
users.forEach(user => {
  const posts = await db.posts
    .findByUserId(user.id)
})

// À éviter : tout envoyer au client
res.json(users) // 10 MB de données`}
                </pre>
              </CardContent>
            </Card>

            <Card className="min-w-0 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Bonne pratique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {`// Mieux : pagination + sélection
const users = await db.users.findMany({
  select: { id: true, name: true, email: true },
  take: 20,
  skip: page * 20
})

// Mieux : jointure optimisée
const users = await db.users.findMany({
  include: { posts: true }
})

// Mieux : compression
res.json(users) // 150 KB compressé`}
                </pre>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-secondary/30 border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Techniques d'optimisation des données</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Côté serveur</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Pagination :</strong> Limiter à 20-50 résultats par page
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Sélection de champs :</strong> Ne renvoyer que les colonnes nécessaires
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Compression :</strong> Gzip/Brotli pour réduire de l'ordre de 70-90 %
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Cache :</strong> Redis/Memcached pour données fréquentes
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Côté client</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Lazy loading :</strong> Charger au scroll (infinite scroll)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>GraphQL :</strong> Requêtes précises, moins d'over-fetching (attention tout de même
                        aux requêtes profondes et au problème N+1)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Cache navigateur :</strong> Service Workers, localStorage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
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
      </Reveal>

      {/* Optimisation des médias */}
      <Reveal as="section" className="py-16 px-4 bg-background" id="medias">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <ImageIcon className="inline w-10 h-10 text-primary mr-3" />
              Optimiser les médias
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Les images et vidéos représentent souvent près de la moitié du poids des pages web. Leur optimisation est cruciale pour
              réduire la consommation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Comparaison des formats d'images</CardTitle>
                <CardDescription className="text-muted-foreground">Taille relative pour une même qualité visuelle</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={imageFormats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="format" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="taille" fill={chart.violet} name="Taille (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Impact du lazy loading</CardTitle>
                <CardDescription className="text-muted-foreground">Réduction de la consommation (base 100)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={lazyLoadingImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sans" fill={chart.red} name="Sans lazy loading" />
                    <Bar dataKey="avec" fill={chart.emerald} name="Avec lazy loading" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 bg-card border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Guide d'optimisation des médias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Images
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="font-medium text-primary"><CheckCircle2 className="mr-1 inline h-4 w-4" />À faire</div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Utiliser WebP ou AVIF (environ 30 % plus léger que JPEG à qualité égale)</li>
                        <li>• Lazy loading avec loading="lazy"</li>
                        <li>• Responsive images avec srcset</li>
                        <li>• Compression adaptée (80-85 % qualité)</li>
                        <li>• SVG pour icônes et logos</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-destructive dark:text-red-400"><XCircle className="mr-1 inline h-4 w-4" />À éviter</div>
                      <ul className="space-y-1 text-muted-foreground">
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
                  <h4 className="font-semibold text-foreground mb-3"><Video className="mr-1 inline h-4 w-4" />Vidéos</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p className="mb-2">
                        <strong>Streaming adaptatif :</strong> HLS ou DASH pour ajuster la qualité selon la connexion
                      </p>
                      <p className="mb-2">
                        <strong>Compression :</strong> H.265 (HEVC) ou AV1 pour réduire de l'ordre de 50 % vs H.264
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">
                        <strong>Lazy loading :</strong> Ne charger que quand visible
                      </p>
                      <p className="mb-2">
                        <strong>Pas d'autoplay :</strong> Laisser l'utilisateur décider (une vidéo lancée toute seule
                        consomme pour rien)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/30 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Exemple illustratif : optimisation d'une page produit
                    </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      • <strong>Avant :</strong> 12 images PNG, 4.2 MB, 6.5s de chargement
                    </p>
                    <p>
                      • <strong>Après :</strong> 12 images WebP + lazy loading, 580 KB, 1.2s de chargement
                    </p>
                    <p className="text-primary font-medium mt-2">
                      → Réduction de 86 % du poids et 82 % du temps de chargement
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Reveal>

      {/* Machine Learning */}
      <Reveal as="section" className="py-16 px-4 dark:bg-slate-950" id="machine-learning">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <Brain className="inline w-10 h-10 text-primary mr-3" />
              Cas particulier du Machine Learning
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              L'IA et le ML sont extrêmement énergivores. Entraîner GPT-3 a émis 552 t CO₂e (Patterson et al., 2021), soit l'équivalent des émissions annuelles d'environ 120 voitures.
            </p>
          </div>

          <Card className="mb-8 border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Impact carbone des modèles de ML</CardTitle>
              <CardDescription className="text-muted-foreground">Émissions CO₂ en kg</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mlImpact.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 font-medium text-sm text-foreground">{item.modele}</div>
                    <div className="flex-1">
                      <div className="bg-muted rounded-full h-8 relative overflow-hidden">
                        <div
                          className="bg-primary h-full flex items-center justify-end pr-3 text-primary-foreground text-xs font-medium"
                          style={{ width: `${Math.min((item.co2 / 552000) * 100, 100)}%` }}
                        >
                          {item.co2.toLocaleString()} kg
                        </div>
                      </div>
                    </div>
                    <div className="w-40 text-sm text-muted-foreground">{item.equivalent}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-primary">Bonnes pratiques ML</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Utiliser des modèles pré-entraînés</strong>
                      <p className="text-muted-foreground">Transfer learning plutôt que tout réentraîner</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Optimiser la taille des modèles</strong>
                      <p className="text-muted-foreground">Pruning, quantization, distillation (MobileNet, TinyBERT)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Inférence locale quand possible</strong>
                      <p className="text-muted-foreground">Edge computing, modèles on-device (TensorFlow Lite)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Batch processing</strong>
                      <p className="text-muted-foreground">Grouper les requêtes plutôt qu'une par une</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Choisir des datacenters verts</strong>
                      <p className="text-muted-foreground">Privilégier les régions avec énergies renouvelables</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">Alternatives légères</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      Se poser la question : ai-je vraiment besoin d'IA ?
                    </div>
                    <p className="text-muted-foreground">
                      Parfois, des règles simples ou des algorithmes classiques suffisent.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Modèles légers</div>
                    <ul className="text-muted-foreground space-y-1 ml-4">
                      <li>• MobileNet au lieu de ResNet</li>
                      <li>• DistilBERT au lieu de BERT</li>
                      <li>• un petit modèle spécialisé au lieu d'un grand modèle généraliste</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Mise en cache intelligente</div>
                    <p className="text-muted-foreground">Stocker les résultats fréquents pour éviter de recalculer</p>
                  </div>
                  <div className="bg-card p-3 rounded border border-primary/20">
                          <div className="text-primary font-medium mb-1"><Lightbulb className="mr-1 inline h-4 w-4" />Impact réel</div>
                    <p className="text-muted-foreground">
                      Utiliser MobileNet au lieu de ResNet pour la classification d'images réduit fortement la consommation (jusqu'à ~98 %, ordre de grandeur Google) avec une précision similaire.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Reveal>

      {/* CDN et Infrastructure */}
      <Reveal as="section" className="py-16 px-4 bg-secondary/10" id="cdn">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <Globe className="inline w-10 h-10 text-primary mr-3" />
              CDN et infrastructure distribuée
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Un CDN (Content Delivery Network) réduit la distance entre l'utilisateur et les données, diminuant ainsi
              la latence et la consommation énergétique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="min-w-0 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="text-primary">Avantages CDN</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>Latence réduite</strong> grâce à la proximité géographique (40-60 % plus rapide selon les fournisseurs, ordre de grandeur)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>Moins de bande passante</strong> sur le serveur origine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>Cache intelligent</strong> pour contenus statiques
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      <strong>Réduction CO₂</strong> par optimisation des routes réseau
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="min-w-0 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="text-primary">CDN recommandés</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li>
                    <div className="font-semibold text-foreground">Cloudflare</div>
                    <p className="text-muted-foreground">100 % énergies renouvelables, gratuit pour petits sites</p>
                  </li>
                  <li>
                    <div className="font-semibold text-foreground">Vercel Edge Network</div>
                    <p className="text-muted-foreground">Optimisé pour Next.js, déploiement automatique</p>
                  </li>
                  <li>
                    <div className="font-semibold text-foreground">Bunny CDN</div>
                    <p className="text-muted-foreground">Européen, RGPD compliant, très performant</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="min-w-0 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="text-primary">À mettre en cache</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Images, CSS, JavaScript</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Fonts, icônes, logos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Vidéos, fichiers audio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Documents PDF, archives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span>Données personnelles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span>Contenu temps réel</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-secondary/30 border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Exemple de configuration CDN optimale</CardTitle>
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
      </Reveal>

      {/* Scalabilité */}
      <Reveal as="section" className="py-16 px-4" id="scalabilite">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <TrendingUp className="inline w-10 h-10 text-primary mr-3" />
              Scalabilité intelligente
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Adapter automatiquement les ressources à la charge réelle évite le gaspillage énergétique des serveurs
              surdimensionnés qui tournent à vide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="min-w-0 border-destructive/20 bg-card">
              <CardHeader>
                <CardTitle className="text-destructive dark:text-red-400 flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Approche traditionnelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-destructive/10 p-4 rounded-lg">
                    <div className="font-semibold text-foreground mb-2">Serveurs dédiés 24/7</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Dimensionnés pour le pic de charge</li>
                      <li>• Tournent à 10-30 % en moyenne</li>
                      <li>• Gaspillage énergétique 70-90 % (ordre de grandeur)</li>
                      <li>• Coût fixe élevé</li>
                    </ul>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    <strong>Exemple :</strong> Un serveur à 2 000 €/mois utilisé à 15 % = 1 700 € gaspillés + énergie inutile
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="min-w-0 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Approche moderne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="font-semibold text-foreground mb-2">Auto-scaling + Serverless</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ressources adaptées en temps réel</li>
                      <li>• Scale to zero quand pas d'usage</li>
                      <li>• Économies possibles (très variables selon l'usage réel)</li>
                      <li>• Paiement à l'usage réel</li>
                    </ul>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    <strong>Exemple :</strong> Vercel Serverless Functions = 0€ quand pas d'usage, scale automatiquement
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50 border">
            <CardHeader>
              <CardTitle className="text-foreground">Stratégies de scalabilité éco-responsable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Serverless / FaaS</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Idéal pour :</strong> APIs, webhooks, tâches ponctuelles
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Containers + Kubernetes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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
                  <h4 className="font-semibold text-foreground mb-3">Mise en cache multi-niveaux</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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
                  <h4 className="font-semibold text-foreground mb-3">Optimisation temporelle</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Tâches lourdes hors pics :</strong> Éviter les heures de pointe du réseau et des
                        datacenters (surtout économique, peu d'effet carbone en France)
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
      </Reveal>

      {/* Checklist finale */}
      <Reveal as="section" className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 shadow-lg bg-card text-card-foreground">
            <CardHeader className="bg-secondary/30">
                        <CardTitle className="text-2xl text-foreground"><CheckCircle2 className="mr-2 inline h-6 w-6 text-primary" />Checklist du développeur éco-responsable</CardTitle>
              <CardDescription className="text-muted-foreground">À vérifier avant chaque mise en production</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                          <h4 className="font-semibold text-foreground mb-3"><Target className="mr-1 inline h-4 w-4" />Performance & Algorithmes</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
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
                          <h4 className="font-semibold text-foreground mb-3"><Database className="mr-1 inline h-4 w-4" />Données</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
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
                          <h4 className="font-semibold text-foreground mb-3"><ImageIcon className="mr-1 inline h-4 w-4" />Médias</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
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
                          <h4 className="font-semibold text-foreground mb-3"><Globe className="mr-1 inline h-4 w-4" />Infrastructure</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
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
                          <h4 className="font-semibold text-foreground mb-3"><Brain className="mr-1 inline h-4 w-4" />IA / ML</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
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
      </Reveal>

      {/* CTA final */}
      <Reveal as="section" className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="texture-dots bg-primary text-primary-foreground rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Chaque optimisation compte</h2>
            <p className="text-lg mb-8">
              En appliquant ces bonnes pratiques, vous pouvez réduire de l'ordre de 30 à 70 % la consommation énergétique de vos
              applications tout en améliorant leur performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/outils"
                className="bg-background text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                Calculer mon impact
              </Link>
              <Link
                href="/guide"
                className="bg-primary-foreground/10 text-primary-foreground px-8 py-3 rounded-lg font-semibold border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
              >
                Consulter le guide
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-primary/20 shadow-xl bg-card text-card-foreground">
            <CardHeader className="bg-secondary/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">En vrai, c'est quoi coder plus vert ?</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Quelques réflexes simples pour limiter la surchauffe côté serveurs et users
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-green dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg mb-6">
                  Quand on code un site ou une app, on pense pas forcément à la conso électrique, mais en vrai, c'est un
                  vrai sujet. Voici quelques trucs simples (ou pas trop) pour limiter l'impact :
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Optimiser les algo</h4>
                      <p className="text-muted-foreground text-sm">
                        Pas besoin de boucles qui tournent dans le vide ou d'un tri maison mal foutu. Un algo plus
                        propre = moins de cycles CPU = moins d'énergie cramée.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Choisir les bons langages / libs</h4>
                      <p className="text-muted-foreground text-sm">
                        Certains langages sont un peu gloutons (coucou JS sur le backend quand c'est pas nécessaire).
                        Parfois du Rust, Go ou même du C++ pour les trucs lourds, c'est plus sobre que du Python
                        partout.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Traiter que les données utiles</h4>
                      <p className="text-muted-foreground text-sm">
                        Filtrer avant d'envoyer à la base, ne charger que ce que l'utilisateur voit. Éviter un gros <code className="bg-muted px-1 rounded">SELECT * FROM table_de_10Go</code> évite de mobiliser inutilement le serveur.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Machine learning</h4>
                      <p className="text-muted-foreground text-sm">
                        Entraîner un modèle pour une prédiction triviale est souvent inutile. Réutiliser des modèles pré-entraînés ou simplifier les datasets, c'est déjà un gros
                        gain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <ImageIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Optimiser les médias</h4>
                      <p className="text-muted-foreground text-sm">
                        Compresser les images, utiliser du webp/avif, virer les vidéos autoplay, charger le nécessaire.
                        Une animation de 10 Mo pour un simple bouton alourdit inutilement la page.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">CDN et cache</h4>
                      <p className="text-muted-foreground text-sm">
                        Servir le contenu depuis un CDN proche des users évite plein de transfert réseau inutile. Et le
                        cache navigateur, c'est pas que pour la perf, c'est aussi moins d'énergie consommée.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Server className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Scalabilité raisonnée</h4>
                      <p className="text-muted-foreground text-sm">
                        Scaler automatiquement c'est cool, mais faut pas lancer 10 serveurs à vide juste "au cas où".
                        Une infra bien calibrée consomme moins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Front plus léger</h4>
                      <p className="text-muted-foreground text-sm">
                        Éviter les frameworks lourds pour un site vitrine : HTML, CSS et JavaScript vanilla suffisent souvent. Chaque kilo de code JS téléchargé par des milliers d'utilisateurs = conso multipliée.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-secondary/30 rounded-xl border border-primary/20">
                  <p className="text-foreground font-semibold text-lg mb-2"><Lightbulb className="mr-1 inline h-5 w-5" />Le truc à retenir</p>
                  <p className="text-muted-foreground">
                    En résumé, coder plus « vert » n'est pas plus difficile : c'est surtout coder plus sobrement. En général, tout ce qui rend une application plus rapide la rend aussi plus économe.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Reveal>

    </div >
  )
}

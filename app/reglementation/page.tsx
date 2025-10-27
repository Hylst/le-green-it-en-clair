"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Scale,
  Building2,
  Users,
  Factory,
  FileText,
  CheckCircle2,
  AlertCircle,
  Calendar,
  TrendingUp,
  Shield,
  Leaf,
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

const timelineData = [
  { year: "2020", event: "Loi AGEC", impact: 85 },
  { year: "2021", event: "Indice réparabilité", impact: 70 },
  { year: "2021", event: "Loi REEN", impact: 90 },
  { year: "2024", event: "Indice durabilité", impact: 75 },
  { year: "2025", event: "CSRD obligatoire", impact: 95 },
  { year: "2027", event: "Droit à la réparation EU", impact: 88 },
]

const complianceData = [
  { sector: "Grandes entreprises", conforme: 78, enCours: 18, nonConforme: 4 },
  { sector: "PME", conforme: 45, enCours: 35, nonConforme: 20 },
  { sector: "Secteur public", conforme: 82, enCours: 15, nonConforme: 3 },
  { sector: "Startups", conforme: 38, enCours: 42, nonConforme: 20 },
]

const impactData = [
  { name: "Réduction e-déchets", value: 35 },
  { name: "Allongement durée de vie", value: 28 },
  { name: "Économie circulaire", value: 22 },
  { name: "Transparence", value: 15 },
]

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"]

export default function ReglementationPage() {
  const [selectedTab, setSelectedTab] = useState("france")

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-12 h-12" />
            <Badge variant="secondary" className="text-sm">
              Mise à jour 2025
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-balance">Réglementation Green IT</h1>
          <p className="text-xl text-emerald-50 max-w-3xl text-pretty">
            Découvrez les normes, lois et obligations en France et en Europe pour réduire l'empreinte environnementale
            du numérique
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chronologie des réglementations</h2>
            <p className="text-lg text-gray-600">L'évolution du cadre législatif Green IT en France et en Europe</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact des réglementations dans le temps</CardTitle>
              <CardDescription>Score d'impact sur l'industrie numérique (0-100)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="impact" stroke="#10b981" strokeWidth={3} name="Impact" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="france">🇫🇷 France</TabsTrigger>
              <TabsTrigger value="europe">🇪🇺 Europe</TabsTrigger>
              <TabsTrigger value="normes">📋 Normes ISO</TabsTrigger>
            </TabsList>

            {/* France Tab */}
            <TabsContent value="france" className="space-y-6">
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                    <div>
                      <CardTitle>Loi AGEC (2020)</CardTitle>
                      <CardDescription>Anti-Gaspillage pour une Économie Circulaire</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Objectifs principaux</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Sortir du plastique jetable et favoriser le réemploi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Mieux informer les consommateurs (indice de réparabilité obligatoire)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Lutter contre l'obsolescence programmée (pièces détachées 10 ans)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Interdiction de destruction des invendus non alimentaires</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-white p-4 rounded-lg border border-emerald-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        <h5 className="font-semibold">Qui est concerné ?</h5>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Fabricants et distributeurs</li>
                        <li>• Plateformes de vente en ligne</li>
                        <li>• Réparateurs professionnels</li>
                        <li>• Collectivités locales</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-emerald-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <h5 className="font-semibold">Impact mesuré (2025)</h5>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• +42% de réparations depuis 2021</li>
                        <li>• 78% des appareils notés</li>
                        <li>• -15% d'e-déchets prématurés</li>
                        <li>• 2,3 Mds € économisés</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle>Loi REEN (2021)</CardTitle>
                      <CardDescription>Réduire l'Empreinte Environnementale du Numérique</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">5 objectifs majeurs</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-sm mb-1">1. Sensibilisation</h5>
                        <p className="text-sm text-gray-700">
                          Éducation à l'empreinte environnementale du numérique dès l'école
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-sm mb-1">2. Limitation du renouvellement</h5>
                        <p className="text-sm text-gray-700">Lutte contre l'obsolescence logicielle et matérielle</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-sm mb-1">3. Écoconception</h5>
                        <p className="text-sm text-gray-700">Services numériques plus sobres et accessibles</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-sm mb-1">4. Datacenters responsables</h5>
                        <p className="text-sm text-gray-700">Indicateurs environnementaux obligatoires (PUE, WUE)</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-sm mb-1">5. Territoires</h5>
                        <p className="text-sm text-gray-700">
                          Stratégie numérique responsable pour collectivités &gt;50k hab.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Obligations spécifiques
                    </h5>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>
                        • <strong>Opérateurs télécom :</strong> Rapport annuel sur empreinte environnementale
                      </li>
                      <li>
                        • <strong>Datacenters &gt;1MW :</strong> Publication PUE, WUE, taux EnR
                      </li>
                      <li>
                        • <strong>Collectivités :</strong> Stratégie numérique responsable obligatoire
                      </li>
                      <li>
                        • <strong>Entreprises &gt;50 salariés :</strong> Sensibilisation des collaborateurs
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-purple-600" />
                    <div>
                      <CardTitle>Indices de réparabilité et durabilité</CardTitle>
                      <CardDescription>Transparence obligatoire depuis 2021</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h5 className="font-semibold mb-2">Indice de réparabilité (2021)</h5>
                      <p className="text-sm text-gray-700 mb-3">Note sur 10 évaluant la facilité de réparation</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Documentation</span>
                          <span className="font-semibold">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Démontabilité</span>
                          <span className="font-semibold">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Disponibilité pièces</span>
                          <span className="font-semibold">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prix des pièces</span>
                          <span className="font-semibold">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Critères spécifiques</span>
                          <span className="font-semibold">20%</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <p className="text-xs text-gray-600">
                          <strong>Produits concernés :</strong> Smartphones, ordinateurs portables, téléviseurs,
                          lave-linge, tondeuses
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h5 className="font-semibold mb-2">Indice de durabilité (2024)</h5>
                      <p className="text-sm text-gray-700 mb-3">Évolution incluant robustesse et fiabilité</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Réparabilité</span>
                          <span className="font-semibold">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fiabilité</span>
                          <span className="font-semibold">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mise à jour logicielle</span>
                          <span className="font-semibold">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Critères environnementaux</span>
                          <span className="font-semibold">15%</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <p className="text-xs text-gray-600">
                          <strong>Nouveauté :</strong> Intègre la durée de vie réelle et les mises à jour logicielles
                          garanties
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Impact sur le marché (2025)</h5>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">8.2/10</div>
                        <div className="text-xs text-gray-700">Note moyenne smartphones</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">+2.1</div>
                        <div className="text-xs text-gray-700">Amélioration depuis 2021</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">92%</div>
                        <div className="text-xs text-gray-700">Consommateurs consultent l'indice</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Europe Tab */}
            <TabsContent value="europe" className="space-y-6">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle>Directive DEEE (2012, révisée 2023)</CardTitle>
                      <CardDescription>Déchets d'Équipements Électriques et Électroniques</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Objectifs de collecte et recyclage</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">Taux de collecte</span>
                          <Badge>65% minimum</Badge>
                        </div>
                        <p className="text-sm text-gray-700">
                          65% du poids moyen des EEE mis sur le marché les 3 années précédentes
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">Taux de recyclage</span>
                          <Badge>85% minimum</Badge>
                        </div>
                        <p className="text-sm text-gray-700">
                          85% des DEEE collectés doivent être recyclés ou valorisés
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">Responsabilité élargie</span>
                          <Badge variant="secondary">REP</Badge>
                        </div>
                        <p className="text-sm text-gray-700">
                          Les producteurs financent la collecte et le traitement des déchets
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Obligations pour les États membres</h5>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• Mise en place de systèmes de collecte séparée</li>
                      <li>• Traitement sélectif des substances dangereuses</li>
                      <li>• Registre national des producteurs et recycleurs</li>
                      <li>• Campagnes de sensibilisation du public</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                    <div>
                      <CardTitle>Droit à la réparation (2027)</CardTitle>
                      <CardDescription>Right to Repair - Application progressive</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mesures clés</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <h5 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Pièces détachées
                        </h5>
                        <p className="text-sm text-gray-700">Disponibilité garantie 10 ans après achat</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <h5 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Prix raisonnables
                        </h5>
                        <p className="text-sm text-gray-700">Plafonnement du coût des pièces de rechange</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <h5 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Accès aux outils
                        </h5>
                        <p className="text-sm text-gray-700">Manuels et outils de diagnostic accessibles</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <h5 className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Réparateurs indépendants
                        </h5>
                        <p className="text-sm text-gray-700">Accès aux mêmes ressources que les services agréés</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-100 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Calendrier d'application</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>
                          <strong>2024 :</strong> Smartphones et tablettes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>
                          <strong>2025 :</strong> Ordinateurs portables
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>
                          <strong>2027 :</strong> Tous les appareils électroniques
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-purple-600" />
                    <div>
                      <CardTitle>CSRD (2025)</CardTitle>
                      <CardDescription>Corporate Sustainability Reporting Directive</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Reporting extra-financier obligatoire</h4>
                    <p className="text-gray-700 mb-4">
                      La CSRD impose aux grandes entreprises de publier des informations détaillées sur leur impact
                      environnemental, incluant leur empreinte numérique.
                    </p>

                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-sm mb-2">Qui est concerné ?</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Grandes entreprises &gt;250 salariés (2025)</li>
                          <li>• PME cotées (2026)</li>
                          <li>• Entreprises non-UE avec activité significative en Europe (2028)</li>
                        </ul>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-sm mb-2">Données numériques à reporter</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Consommation énergétique des infrastructures IT</li>
                          <li>• Émissions GES liées au numérique (scope 1, 2, 3)</li>
                          <li>• Politique d'achat responsable (matériel reconditionné)</li>
                          <li>• Gestion des e-déchets et taux de recyclage</li>
                          <li>• Durée de vie moyenne des équipements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Impact attendu</h5>
                    <p className="text-sm text-gray-800">
                      La CSRD va forcer les entreprises à mesurer précisément leur empreinte numérique et à mettre en
                      place des stratégies de réduction. Environ <strong>50 000 entreprises européennes</strong> seront
                      concernées d'ici 2028.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ISO Norms Tab */}
            <TabsContent value="normes" className="space-y-6">
              <Card className="border-teal-200 bg-teal-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-teal-600" />
                    <div>
                      <CardTitle>ISO 14001 : Management environnemental</CardTitle>
                      <CardDescription>Norme internationale de référence</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Principes fondamentaux</h4>
                    <p className="text-gray-700 mb-4">
                      L'ISO 14001 définit les exigences pour un système de management environnemental (SME) efficace.
                      Elle s'applique à toutes les organisations, quelle que soit leur taille ou leur secteur.
                    </p>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-teal-200">
                        <h5 className="font-semibold text-sm mb-1">Engagement de la direction</h5>
                        <p className="text-sm text-gray-700">Leadership et politique environnementale claire</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-teal-200">
                        <h5 className="font-semibold text-sm mb-1">Planification</h5>
                        <p className="text-sm text-gray-700">
                          Identification des aspects environnementaux significatifs
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-teal-200">
                        <h5 className="font-semibold text-sm mb-1">Support et opérations</h5>
                        <p className="text-sm text-gray-700">Ressources, compétences et contrôle opérationnel</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-teal-200">
                        <h5 className="font-semibold text-sm mb-1">Amélioration continue</h5>
                        <p className="text-sm text-gray-700">Surveillance, audit et actions correctives</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-100 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Application au Green IT</h5>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• Mesure de l'empreinte carbone des infrastructures IT</li>
                      <li>• Politique d'achat responsable (critères environnementaux)</li>
                      <li>• Gestion des déchets électroniques (DEEE)</li>
                      <li>• Optimisation de la consommation énergétique</li>
                      <li>• Formation et sensibilisation des équipes IT</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-3 rounded-lg border border-teal-200">
                      <div className="text-2xl font-bold text-teal-600">400k+</div>
                      <div className="text-xs text-gray-700">Certifications mondiales</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-teal-200">
                      <div className="text-2xl font-bold text-teal-600">12k+</div>
                      <div className="text-xs text-gray-700">Entreprises françaises</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-teal-200">
                      <div className="text-2xl font-bold text-teal-600">-25%</div>
                      <div className="text-xs text-gray-700">Réduction impact moyen</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Factory className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle>ISO 50001 : Management de l'énergie</CardTitle>
                      <CardDescription>Optimisation de la performance énergétique</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Objectifs de la norme</h4>
                    <p className="text-gray-700 mb-4">
                      L'ISO 50001 aide les organisations à développer une gestion systématique de l'énergie pour
                      améliorer leur performance énergétique, incluant l'efficacité, l'usage et la consommation.
                    </p>

                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-sm mb-2">Cycle PDCA (Plan-Do-Check-Act)</h5>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-semibold text-blue-600 mb-1">Plan</div>
                            <div className="text-gray-700">Revue énergétique</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-blue-600 mb-1">Do</div>
                            <div className="text-gray-700">Mise en œuvre</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-blue-600 mb-1">Check</div>
                            <div className="text-gray-700">Surveillance</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-blue-600 mb-1">Act</div>
                            <div className="text-gray-700">Amélioration</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-sm mb-2">Application aux datacenters</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Mesure du PUE (Power Usage Effectiveness)</li>
                          <li>• Optimisation du refroidissement</li>
                          <li>• Virtualisation et consolidation des serveurs</li>
                          <li>• Utilisation d'énergies renouvelables</li>
                          <li>• Récupération de chaleur fatale</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Bénéfices mesurés</h5>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">-20%</div>
                        <div className="text-xs text-gray-700">Consommation énergétique</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">-15%</div>
                        <div className="text-xs text-gray-700">Coûts énergétiques</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">ROI 3 ans</div>
                        <div className="text-xs text-gray-700">Retour sur investissement</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                    <div>
                      <CardTitle>Autres certifications Green IT</CardTitle>
                      <CardDescription>Labels et normes complémentaires</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-emerald-200">
                      <h5 className="font-semibold mb-2">🌿 Label Numérique Responsable</h5>
                      <p className="text-sm text-gray-700 mb-2">
                        Certification française délivrée par l'INR (Institut du Numérique Responsable)
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 3 niveaux : Sensibilisation, Progression, Exemplarité</li>
                        <li>• Évalue stratégie, gouvernance, achats, usage</li>
                        <li>• 450+ organisations labellisées en France</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-emerald-200">
                      <h5 className="font-semibold mb-2">⚡ Energy Star</h5>
                      <p className="text-sm text-gray-700 mb-2">
                        Label américain reconnu internationalement pour l'efficacité énergétique
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Ordinateurs, serveurs, écrans, imprimantes</li>
                        <li>• 25-30% plus efficaces que le standard</li>
                        <li>• Reconnu dans 75+ pays</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-emerald-200">
                      <h5 className="font-semibold mb-2">🏆 TCO Certified</h5>
                      <p className="text-sm text-gray-700 mb-2">Certification suédoise couvrant tout le cycle de vie</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Critères sociaux et environnementaux stricts</li>
                        <li>• Réparabilité, recyclabilité, substances dangereuses</li>
                        <li>• Référence pour achats publics responsables</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-emerald-200">
                      <h5 className="font-semibold mb-2">🔋 EPEAT</h5>
                      <p className="text-sm text-gray-700 mb-2">Electronic Product Environmental Assessment Tool</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 3 niveaux : Bronze, Silver, Gold</li>
                        <li>• Évalue 51 critères environnementaux</li>
                        <li>• Obligatoire pour marchés publics US</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Compliance Status Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">État de conformité en France (2025)</h2>
            <p className="text-lg text-gray-600">Niveau d'adoption des réglementations par secteur</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Conformité par secteur</CardTitle>
                <CardDescription>Pourcentage d'entreprises conformes aux principales réglementations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" angle={-15} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="conforme" fill="#10b981" name="Conforme" />
                    <Bar dataKey="enCours" fill="#f59e0b" name="En cours" />
                    <Bar dataKey="nonConforme" fill="#ef4444" name="Non conforme" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact des réglementations</CardTitle>
                <CardDescription>Répartition des bénéfices environnementaux</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Constraints & Challenges Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contraintes et défis</h2>
            <p className="text-lg text-gray-600">Les obstacles à la mise en conformité</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <AlertCircle className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Coûts de mise en conformité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>• Investissements initiaux importants (audit, formation, outils)</p>
                <p>• Coût moyen : 50k€ - 500k€ selon taille entreprise</p>
                <p>• ROI sur 3-5 ans via économies d'énergie et image</p>
                <p>• Aides publiques disponibles (ADEME, régions)</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle className="text-lg">Complexité technique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>• Mesure précise de l'empreinte numérique difficile</p>
                <p>• Manque d'outils standardisés de reporting</p>
                <p>• Besoin de compétences spécialisées (Green IT)</p>
                <p>• Coordination entre DSI, RSE et achats nécessaire</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader>
                <AlertCircle className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Évolution rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>• Nouvelles réglementations chaque année</p>
                <p>• Harmonisation France/Europe en cours</p>
                <p>• Adaptation des processus métier nécessaire</p>
                <p>• Veille réglementaire permanente indispensable</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ressources officielles</h2>
          <p className="text-lg text-gray-600 mb-8">
            Consultez les textes officiels et guides pratiques pour vous mettre en conformité
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://www.legifrance.gouv.fr" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold">Légifrance</div>
                  <div className="text-xs text-gray-600">Textes de loi AGEC et REEN</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://www.ademe.fr" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold">ADEME</div>
                  <div className="text-xs text-gray-600">Guides pratiques et aides</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://eur-lex.europa.eu" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold">EUR-Lex</div>
                  <div className="text-xs text-gray-600">Directives européennes</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://www.iso.org" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold">ISO</div>
                  <div className="text-xs text-gray-600">Normes internationales</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

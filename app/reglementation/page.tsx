"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SourceTooltip } from "@/components/source-tooltip"
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
  Globe,
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
  { year: "2025", event: "Indice durabilité (TV, lave-linge)", impact: 75 },
  { year: "2025", event: "Étiquette énergie smartphones (UE)", impact: 80 },
  { year: "2026", event: "CSRD : nouveau périmètre", impact: 95 },
  { year: "2026", event: "Droit à la réparation applicable", impact: 88 },
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
    <div className="min-h-screen bg-background">
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
              Mise à jour 2026
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-balance text-white">Réglementation Green IT</h1>
          <p className="text-xl text-white/90 max-w-3xl text-pretty">
            Découvrez les normes, lois et obligations en France et en Europe pour réduire l'empreinte environnementale
            du numérique
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Chronologie des réglementations</h2>
            <p className="text-lg text-muted-foreground">L'évolution du cadre législatif Green IT en France et en Europe</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact des réglementations dans le temps</CardTitle>
              <CardDescription>Scénario illustratif de la rédaction, pas une donnée officielle</CardDescription>
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
              <Card className="border-primary/20 bg-secondary/10">
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
                    <h3 className="font-semibold text-foreground mb-2">Objectifs principaux</h3>
                    <ul className="space-y-2 text-muted-foreground">
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
                    <div className="bg-card p-4 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-card-foreground">Qui est concerné ?</h4>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Fabricants et distributeurs</li>
                        <li>• Plateformes de vente en ligne</li>
                        <li>• Réparateurs professionnels</li>
                        <li>• Collectivités locales</li>
                      </ul>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-card-foreground">Effets mesurés</h4>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Bonus réparation : de 4 à 25 M€ versés en un an (ADEME, 2025)
                          <SourceTooltip className="ml-1" source="ADEME, 2025" calculation="×6 en un an grâce au dispositif bonus réparation (QualiRépar)" />
                        </li>
                        <li>• Indice de réparabilité &gt; 8,1/10 : +28 % de ventes de lave-vaisselle (Univers Habitat, 2025)
                          <SourceTooltip className="ml-1" source="Univers Habitat, 2025" calculation="évolution des ventes de lave-vaisselle bien notés (> 8,1/10) après l'entrée en vigueur de l'indice" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
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
                    <h3 className="font-semibold text-foreground mb-2">5 objectifs majeurs</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">1. Sensibilisation</h4>
                        <p className="text-sm text-muted-foreground">
                          Éducation à l'empreinte environnementale du numérique dès l'école
                        </p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">2. Limitation du renouvellement</h4>
                        <p className="text-sm text-muted-foreground">Lutte contre l'obsolescence logicielle et matérielle</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">3. Écoconception</h4>
                        <p className="text-sm text-muted-foreground">Services numériques plus sobres et accessibles</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">4. Datacenters responsables</h4>
                        <p className="text-sm text-muted-foreground">Suivi des indicateurs PUE (efficacité énergétique) et WUE (consommation d'eau), et reporting européen</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">5. Territoires</h4>
                        <p className="text-sm text-muted-foreground">
                          Stratégie numérique responsable pour les collectivités de plus de 50 000 habitants
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      Obligations spécifiques
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>
                        • <strong>Opérateurs télécom :</strong> Rapport annuel sur empreinte environnementale
                      </li>
                      <li>
                        • <strong>Datacenters de plus de 500 kW :</strong> Reporting européen (efficacité énergétique,
                        directive 2023/1791)
                      </li>
                      <li>
                        • <strong>Collectivités :</strong> Stratégie numérique responsable obligatoire
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
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
                    <div className="bg-card p-4 rounded-lg border border-chart-3/20">
                      <h4 className="font-semibold mb-2 text-card-foreground">Indice de réparabilité (2021)</h4>
                      <p className="text-sm text-muted-foreground mb-3">Note sur 10 évaluant la facilité de réparation</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
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
                      <div className="mt-3 pt-3 border-t border-chart-3/20">
                        <p className="text-xs text-muted-foreground">
                          <strong>Produits concernés :</strong> Smartphones, ordinateurs portables, téléviseurs,
                          lave-linge, tondeuses
                        </p>
                      </div>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-accent/20">
                      <h4 className="font-semibold mb-2 text-card-foreground">Indice de durabilité (2025)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Deux notes : réparabilité + fiabilité. En vigueur pour les téléviseurs (janvier 2025) et les
                        lave-linge (avril 2025).
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Note de réparabilité</span>
                          <span className="font-semibold">/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Note de fiabilité</span>
                          <span className="font-semibold">/10</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-chart-3/20">
                        <p className="text-xs text-muted-foreground">
                          <strong>Smartphones :</strong> pas d'indice mais une étiquette énergie européenne depuis le 20
                          juin 2025 (5 ans de mises à jour, 7 ans de pièces détachées, batterie 800 cycles/80 %,
                          règlement UE 2023/1670)
                        </p>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            {/* Europe Tab */}
            <TabsContent value="europe" className="space-y-6">
              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle>Directive DEEE (2012, réexamen en cours)</CardTitle>
                      <CardDescription>Déchets d'Équipements Électriques et Électroniques</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Objectifs de collecte et recyclage</h3>
                    <div className="space-y-3">
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-card-foreground">Taux de collecte</span>
                          <Badge variant="outline" className="border-accent text-accent">65% minimum</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          65% du poids moyen des EEE mis sur le marché les 3 années précédentes
                        </p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-card-foreground">Taux de recyclage et valorisation</span>
                          <Badge variant="outline" className="border-primary text-primary">80 % / 85 %</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          80 % des DEEE collectés recyclés et 85 % valorisés, selon les catégories (directive 2012/19/UE)
                        </p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-card-foreground">Responsabilité élargie</span>
                          <Badge variant="outline" className="border-secondary text-foreground">REP</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Les producteurs financent la collecte et le traitement des déchets
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">Obligations pour les États membres</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Mise en place de systèmes de collecte séparée</li>
                      <li>• Traitement sélectif des substances dangereuses</li>
                      <li>• Registre national des producteurs et recycleurs</li>
                      <li>• Campagnes de sensibilisation du public</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                    <div>
                      <CardTitle>Droit à la réparation (applicable depuis juillet 2026)</CardTitle>
                      <CardDescription>Right to Repair - Directive 2024/1799</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Mesures clés</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-card p-3 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2 text-card-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Pièces détachées
                        </h4>
                        <p className="text-sm text-muted-foreground">Disponibilité 5 à 10 ans selon les produits (smartphones et tablettes inclus)</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2 text-card-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Prix raisonnables
                        </h4>
                        <p className="text-sm text-muted-foreground">Des prix raisonnables pour les pièces de rechange</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2 text-card-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Accès aux outils
                        </h4>
                        <p className="text-sm text-muted-foreground">Manuels et outils de diagnostic accessibles</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2 text-card-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Réparateurs indépendants
                        </h4>
                        <p className="text-sm text-muted-foreground">Accès aux mêmes ressources que les services agréés</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">Calendrier d'application</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>
                          <strong>31 juillet 2026 :</strong> entrée en application, obligation de réparer hors garantie
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>
                          <strong>Garantie :</strong> +12 mois si réparation sous garantie
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>
                          <strong>2027 :</strong> plateforme européenne de la réparation prévue
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-purple-600" />
                    <div>
                      <CardTitle>CSRD (nouveau périmètre 2026)</CardTitle>
                      <CardDescription>Corporate Sustainability Reporting Directive</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Reporting extra-financier obligatoire</h3>
                    <p className="text-muted-foreground mb-4">
                      La CSRD impose aux grandes entreprises de publier des informations détaillées sur leur impact
                      environnemental, incluant leur empreinte numérique.
                    </p>

                    <div className="space-y-3">
                      <div className="bg-card p-3 rounded-lg border border-chart-3/20">
                        <h4 className="font-semibold text-sm mb-2 text-card-foreground">Qui est concerné ?</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Grandes entreprises de plus de 1 000 salariés ET plus de 450 M€ de chiffre d'affaires (seuils cumulatifs, directive Omnibus I, 2026)</li>
                          <li>• PME cotées définitivement exclues</li>
                          <li>• Transposition française au plus tard le 19/03/2027</li>
                        </ul>
                      </div>

                      <div className="bg-card p-3 rounded-lg border border-chart-3/20">
                        <h4 className="font-semibold text-sm mb-2 text-card-foreground">Données numériques à reporter</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Consommation énergétique des infrastructures IT</li>
                          <li>• Émissions GES liées au numérique (scope 1, 2, 3)</li>
                          <li>• Politique d'achat responsable (matériel reconditionné)</li>
                          <li>• Gestion des e-déchets et taux de recyclage</li>
                          <li>• Durée de vie moyenne des équipements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-chart-3/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">Impact attendu</h4>
                      <p className="text-sm text-muted-foreground">
                      La CSRD va forcer les entreprises concernées à mesurer précisément leur empreinte numérique et à
                      mettre en place des stratégies de réduction. Environ <strong>5 000 entreprises européennes</strong>{" "}
                      sont concernées avec le nouveau périmètre (directive Omnibus I, 2026).
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle>Autres textes européens (2024-2025)</CardTitle>
                      <CardDescription>ESPR, USB-C, Green Claims, Data Act, IA Act, EED</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>
                      • <strong className="text-foreground">ESPR (règlement 2024/1781)</strong> : écoconception élargie
                      à de nouvelles familles de produits, avec passeport numérique et exigences de durabilité.
                    </li>
                    <li>
                      • <strong className="text-foreground">USB-C obligatoire</strong> pour la plupart des petits
                      appareils depuis le 28 décembre 2024 (directive 2022/2380), chargeur unique et fin des chargeurs
                      fournis par défaut.
                    </li>
                    <li>
                      • <strong className="text-foreground">Green Claims (directive 2024/825)</strong> : les allégations
                      environnementales doivent être prouvées et vérifiées, fin du greenwashing.
                    </li>
                    <li>
                      • <strong className="text-foreground">Data Act (règlement 2023/2854)</strong> : partage et
                      portabilité des données, applicable depuis septembre 2025.
                    </li>
                    <li>
                      • <strong className="text-foreground">IA Act (règlement 2024/1689)</strong> : obligations de
                      transparence pour les modèles d'IA à usage général depuis août 2025 (voir aussi le rapport Arcep
                      IA &amp; environnement, mai 2026).
                    </li>
                    <li>
                      • <strong className="text-foreground">EED refondue</strong> : reporting public obligatoire pour
                      les datacenters de plus de 500 kW depuis mai 2024.
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">Sources : EUR-Lex, 2024-2025 ; Arcep, mai 2026.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ISO Norms Tab */}
            <TabsContent value="normes" className="space-y-6">
              <Card className="border-chart-2/20 bg-chart-2/5">
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
                    <h3 className="font-semibold text-foreground mb-2">Principes fondamentaux</h3>
                    <p className="text-muted-foreground mb-4">
                      L'ISO 14001 définit les exigences pour un système de management environnemental (SME) efficace.
                      Elle s'applique à toutes les organisations, quelle que soit leur taille ou leur secteur.
                    </p>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-card p-3 rounded-lg border border-chart-2/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">Engagement de la direction</h4>
                        <p className="text-sm text-muted-foreground">Leadership et politique environnementale claire</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-chart-2/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">Planification</h4>
                        <p className="text-sm text-muted-foreground">
                          Identification des aspects environnementaux significatifs
                        </p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-chart-2/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">Support et opérations</h4>
                        <p className="text-sm text-muted-foreground">Ressources, compétences et contrôle opérationnel</p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-chart-2/20">
                        <h4 className="font-semibold text-sm mb-1 text-card-foreground">Amélioration continue</h4>
                        <p className="text-sm text-muted-foreground">Surveillance, audit et actions correctives</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-chart-2/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">Application au Green IT</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Mesure de l'empreinte carbone des infrastructures IT</li>
                      <li>• Politique d'achat responsable (critères environnementaux)</li>
                      <li>• Gestion des déchets électroniques (DEEE)</li>
                      <li>• Optimisation de la consommation énergétique</li>
                      <li>• Formation et sensibilisation des équipes IT</li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    L'ISO publie chaque année le nombre de certifications (ISO Survey) : les gains dépendent du périmètre
                    et de la maturité de l'organisation, à mesurer au cas par cas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Factory className="w-8 h-8 text-accent" />
                    <div>
                      <CardTitle>ISO 50001 : Management de l'énergie</CardTitle>
                      <CardDescription>Optimisation de la performance énergétique</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Objectifs de la norme</h3>
                    <p className="text-muted-foreground mb-4">
                      L'ISO 50001 aide les organisations à développer une gestion systématique de l'énergie pour
                      améliorer leur performance énergétique, incluant l'efficacité, l'usage et la consommation.
                    </p>

                    <div className="space-y-3">
                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-sm mb-2 text-card-foreground">Cycle PDCA (Plan-Do-Check-Act)</h4>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-semibold text-accent mb-1">Plan</div>
                            <div className="text-muted-foreground">Revue énergétique</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-accent mb-1">Do</div>
                            <div className="text-muted-foreground">Mise en œuvre</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-accent mb-1">Check</div>
                            <div className="text-muted-foreground">Surveillance</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-accent mb-1">Act</div>
                            <div className="text-muted-foreground">Amélioration</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card p-3 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-sm mb-2 text-card-foreground">Application aux datacenters</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Mesure du PUE (Power Usage Effectiveness)</li>
                          <li>• Optimisation du refroidissement</li>
                          <li>• Virtualisation et consolidation des serveurs</li>
                          <li>• Utilisation d'énergies renouvelables</li>
                          <li>• Récupération de chaleur fatale</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-foreground">Bénéfices typiques</h4>
                    <p className="text-sm text-muted-foreground">
                      Les économies varient selon le site : les retours d'expérience documentent souvent 10 à 20 % sur la
                      consommation d'énergie, avec un retour sur investissement de quelques années.
                    </p>
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
                    <div className="bg-card p-4 rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-2 text-card-foreground">🌿 Label Numérique Responsable</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Certification française délivrée par l'INR (Institut du Numérique Responsable)
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 3 niveaux : Sensibilisation, Progression, Exemplarité</li>
                        <li>• Évalue stratégie, gouvernance, achats, usage</li>
                        <li>• Environ 350 organisations labellisées en France (2026)</li>
                      </ul>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-2 text-card-foreground">⚡ Energy Star</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Label américain reconnu internationalement pour l'efficacité énergétique
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Ordinateurs, serveurs, écrans, imprimantes</li>
                        <li>• Critères d'efficacité énergétique stricts (agence américaine EPA)</li>
                        <li>• Reconnu internationalement, avec des partenaires hors États-Unis</li>
                      </ul>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-2 text-card-foreground">🏆 TCO Certified</h4>
                      <p className="text-sm text-muted-foreground mb-2">Certification suédoise couvrant tout le cycle de vie</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Critères sociaux et environnementaux stricts</li>
                        <li>• Réparabilité, recyclabilité, substances dangereuses</li>
                        <li>• Référence pour achats publics responsables</li>
                      </ul>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-2 text-card-foreground">🔋 EPEAT</h4>
                      <p className="text-sm text-muted-foreground mb-2">Electronic Product Environmental Assessment Tool</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
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
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">État de conformité en France (2026)</h2>
            <p className="text-lg text-muted-foreground">Niveau d'adoption des réglementations par secteur</p>
            <p className="mt-2 text-sm text-muted-foreground">Données illustratives : ordres de grandeur pour se repérer, pas des statistiques officielles.</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Contraintes et défis</h2>
            <p className="text-lg text-muted-foreground">Les obstacles à la mise en conformité</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <AlertCircle className="w-8 h-8 text-destructive mb-2" />
                <CardTitle className="text-lg text-card-foreground">Coûts de mise en conformité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Investissements initiaux importants (audit, formation, outils)</p>
                <p>• Coût variable selon la taille et le périmètre (audit, accompagnement, outils), à chiffrer au cas par cas</p>
                <p>• ROI sur 3-5 ans via économies d'énergie et image</p>
                <p>• Aides publiques disponibles (ADEME, régions)</p>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <AlertCircle className="w-8 h-8 text-destructive mb-2" />
                <CardTitle className="text-lg text-card-foreground">Complexité technique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Mesure précise de l'empreinte numérique difficile</p>
                <p>• Manque d'outils standardisés de reporting</p>
                <p>• Besoin de compétences spécialisées (Green IT)</p>
                <p>• Coordination entre DSI, RSE et achats nécessaire</p>
              </CardContent>
            </Card>

            <Card className="border-chart-3/20 bg-chart-3/5">
              <CardHeader>
                <AlertCircle className="w-8 h-8 text-chart-3 mb-2" />
                <CardTitle className="text-lg text-card-foreground">Évolution rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
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
      <section className="py-16 px-4 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ressources officielles</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Consultez les textes officiels et guides pratiques pour vous mettre en conformité
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://www.legifrance.gouv.fr" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold text-foreground">Légifrance</div>
                  <div className="text-xs text-muted-foreground">Textes de loi AGEC et REEN</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://www.ademe.fr" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold text-foreground">ADEME</div>
                  <div className="text-xs text-muted-foreground">Guides pratiques et aides</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://eur-lex.europa.eu" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold text-foreground">EUR-Lex</div>
                  <div className="text-xs text-muted-foreground">Directives européennes</div>
                </div>
              </a>
            </Button>

            <Button variant="outline" className="h-auto py-4 px-6 justify-start bg-transparent" asChild>
              <a href="https://www.iso.org" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <div className="font-semibold text-foreground">ISO</div>
                  <div className="text-xs text-muted-foreground">Normes internationales</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

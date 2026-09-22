"use client"

import { Button } from "@/components/ui/button"
import { SITE_NAME, SITE_SHORT } from "@/lib/site"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Printer, BarChart3, Lightbulb, LineChart, Target, BookOpen, Check } from "lucide-react"
import Link from "next/link"

export default function TableauBordPage() {
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen">
            <div className="print:hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8">
                <div className="mx-auto max-w-4xl">
                    <Link href="/modeles" className="inline-flex items-center gap-2 text-white hover:text-emerald-100 mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux modèles
                    </Link>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-3xl font-bold text-white mb-2">Guide Tableau de Bord Green IT</p>
                            <p className="text-emerald-100">Méthodologie de suivi d'impact</p>
                        </div>
                        <Button onClick={handlePrint} size="lg" variant="secondary" className="bg-card text-emerald-700 dark:text-emerald-400 hover:bg-muted">
                            <Printer className="mr-2 h-5 w-5" />
                            Imprimer en PDF
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 py-12 print:px-12 print:py-8">
                <style jsx global>{`
          @media print {
            @page { size: A4; margin: 2cm; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          }
        `}</style>

                <div className="mb-12 text-center">
                    <div className="mb-8 inline-block rounded-full bg-muted/10 p-6">
                        <BarChart3 className="h-16 w-16 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-4">Guide Méthodologique</h1>
                    <h2 className="text-2xl text-muted-foreground mb-8">Tableau de Bord Green IT</h2>
                    <p className="text-muted-foreground">Mesurer et piloter votre empreinte numérique</p>
                </div>

                {/* Introduction */}
                <Card className="p-8 mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                    <p className="text-muted-foreground mb-4">
                        Ce guide vous accompagne dans la mise en place d'un tableau de bord de suivi de votre impact environnemental numérique.
                        Il s'organise en 5 onglets principaux pour une vision complète de votre démarche Green IT.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <Card className="p-4 bg-muted/5 border-border">
                            <div className="text-2xl font-bold text-emerald-600 mb-2">1</div>
                            <p className="font-semibold text-foreground">Inventaire</p>
                            <p className="text-sm text-muted-foreground">Parc informatique</p>
                        </Card>
                        <Card className="p-4 bg-muted/5 border-border">
                            <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                            <p className="font-semibold text-foreground">Calcul CO₂</p>
                            <p className="text-sm text-muted-foreground">Empreinte carbone</p>
                        </Card>
                        <Card className="p-4 bg-muted/5 border-border">
                            <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
                            <p className="font-semibold text-foreground">KPIs</p>
                            <p className="text-sm text-muted-foreground">Indicateurs clés</p>
                        </Card>
                        <Card className="p-4 bg-muted/5 border-border">
                            <div className="text-2xl font-bold text-amber-600 mb-2">4</div>
                            <p className="font-semibold text-foreground">Suivi</p>
                            <p className="text-sm text-muted-foreground">Évolution annuelle</p>
                        </Card>
                        <Card className="p-4 bg-muted/5 border-border">
                            <div className="text-2xl font-bold text-teal-600 mb-2">5</div>
                            <p className="font-semibold text-foreground">Actions</p>
                            <p className="text-sm text-muted-foreground">Plan et mesures</p>
                        </Card>
                    </div>
                </Card>

                {/* Onglet 1 - Inventaire */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        Onglet 1 : Inventaire du parc informatique
                    </h2>

                    <Card className="p-6 mb-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4">Colonnes à renseigner</h3>
                        <div className="overflow-x-auto"><table className="w-full text-sm">
                            <thead className="border-b border-border">
                                <tr className="text-left">
                                    <th className="pb-2 font-semibold text-foreground">Colonne</th>
                                    <th className="pb-2 font-semibold text-foreground">Description</th>
                                    <th className="pb-2 font-semibold text-foreground">Exemple</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b border-border">
                                    <td className="py-2">Type équipement</td>
                                    <td className="py-2">Catégorie</td>
                                    <td className="py-2">Laptop, Smartphone, Écran</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Marque/Modèle</td>
                                    <td className="py-2">Identification</td>
                                    <td className="py-2">Dell Latitude 5420</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">N° Série</td>
                                    <td className="py-2">Traçabilité</td>
                                    <td className="py-2">ABC123XYZ</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Date d'achat</td>
                                    <td className="py-2">Mise en service</td>
                                    <td className="py-2">15/03/2022</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">État</td>
                                    <td className="py-2">Neuf/Reconditionné</td>
                                    <td className="py-2">Reconditionné</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Utilisateur</td>
                                    <td className="py-2">Attribution</td>
                                    <td className="py-2">Marie Dupont - Marketing</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Statut</td>
                                    <td className="py-2">En service/Stock/Recyclé</td>
                                    <td className="py-2">En service</td>
                                </tr>
                            </tbody>
                        </table></div>
                    </Card>

                    <Card className="p-6 bg-muted/5 border-border">
                            <h4 className="font-semibold text-foreground mb-3"><Lightbulb className="mr-1 inline h-4 w-4" />Astuce</h4>
                        <p className="text-sm text-muted-foreground">
                            Utilisez un code-barres/QR code sur chaque équipement pour faciliter l'inventaire et le suivi.
                            Mettez à jour cet onglet à chaque mouvement (achat, attribution, recyclage).
                        </p>
                    </Card>
                </div>

                {/* Onglet 2 - Calcul CO2 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        Onglet 2 : Calcul de l'empreinte carbone
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">Formules de calcul</h3>

                    <Card className="p-6 mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Empreinte par type d'équipement (kg CO₂eq)</h4>
                        <div className="overflow-x-auto"><table className="w-full text-sm">
                            <thead className="border-b border-border">
                                <tr className="text-left">
                                    <th className="pb-2 font-semibold text-foreground">Équipement</th>
                                    <th className="pb-2 font-semibold text-foreground">Fabrication</th>
                                    <th className="pb-2 font-semibold text-foreground">Usage (4 ans, hypothèse)</th>
                                    <th className="pb-2 font-semibold text-foreground">Total</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b border-border">
                                    <td className="py-2">Laptop</td>
                                    <td className="py-2">182 kg</td>
                                    <td className="py-2">8 kg</td>
                                    <td className="py-2 font-semibold">190 kg</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">PC fixe (unité centrale)</td>
                                    <td className="py-2">205 kg</td>
                                    <td className="py-2">36 kg</td>
                                    <td className="py-2 font-semibold">241 kg</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Écran 24"</td>
                                    <td className="py-2">66 kg</td>
                                    <td className="py-2">18 kg</td>
                                    <td className="py-2 font-semibold">84 kg</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Smartphone</td>
                                    <td className="py-2">79 kg</td>
                                    <td className="py-2">2 kg</td>
                                    <td className="py-2 font-semibold">81 kg</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Tablette</td>
                                    <td className="py-2">84 kg</td>
                                    <td className="py-2">4 kg</td>
                                    <td className="py-2 font-semibold">88 kg</td>
                                </tr>
                            </tbody>
                        </table></div>
                        <p className="text-xs text-muted-foreground mt-4">Source : ADEME, Impact CO₂ (mise à jour 2025) • Usage calculé sur 4 ans à partir des facteurs annuels ADEME 2025. Le bonus reconditionné s'appuie sur ADEME 2022 (−75 %).</p>
                    </Card>

                    <Card className="p-6 mb-6 bg-muted/5 border-border">
                        <h4 className="font-semibold text-foreground mb-3">Formule de calcul simplifiée</h4>
                        <div className="p-4 bg-white dark:bg-background rounded border border-border">
                            <code className="text-sm">
                                Empreinte totale = Σ (Nombre d'équipements × Impact unitaire)
                            </code>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                            <strong>Bonus reconditionné :</strong> Réduire l'impact fabrication de 75 % si équipement reconditionné
                        </p>
                    </Card>

                    <Card className="p-6">
                        <h4 className="font-semibold text-foreground mb-3">Exemple de calcul</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• 50 laptops neufs : 50 × 200 = 10 000 kg CO₂eq</li>
                            <li>• 20 laptops reconditionnés : 20 × (156×0.25 + 44) = 1 660 kg</li>
                            <li>• 30 smartphones : 30 × 50 = 1 500 kg</li>
                            <li className="font-semibold text-foreground pt-2">= Total parc : 13 160 kg CO₂eq (13.16 tonnes)</li>
                        </ul>
                    </Card>
                </div>

                {/* Onglet 3 - KPIs */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        Onglet 3 : Indicateurs clés (KPIs)
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h4 className="font-semibold text-foreground mb-4"><BarChart3 className="mr-1 inline h-4 w-4" />Indicateurs environnementaux</h4>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>
                                    <strong className="text-foreground">Empreinte carbone totale</strong>
                                    <br />Tonnes CO₂eq/an
                                </li>
                                <li>
                                    <strong className="text-foreground">Empreinte par collaborateur</strong>
                                    <br />kg CO₂eq/personne/an
                                </li>
                                <li>
                                    <strong className="text-foreground">% équipements reconditionnés</strong>
                                    <br />Objectif : ≥ 50 %
                                </li>
                                <li>
                                    <strong className="text-foreground">Taux de recyclage</strong>
                                    <br />% équipements recyclés vs jetés
                                </li>
                            </ul>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold text-foreground mb-4">⏱️ Indicateurs de durabilité</h4>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>
                                    <strong className="text-foreground">Durée de vie moyenne</strong>
                                    <br />Années (objectif : ≥ 5 ans)
                                </li>
                                <li>
                                    <strong className="text-foreground">Taux de réparation</strong>
                                    <br />% réparations vs remplacements
                                </li>
                                <li>
                                    <strong className="text-foreground">Âge moyen du parc</strong>
                                    <br />Années depuis l'achat
                                </li>
                                <li>
                                    <strong className="text-foreground">Taux de renouvellement</strong>
                                    <br />% parc renouvelé/an
                                </li>
                            </ul>
                        </Card>
                    </div>

                    <Card className="p-6 mt-6 bg-muted/5 border-border">
                        <h4 className="font-semibold text-foreground mb-3"><LineChart className="mr-1 inline h-4 w-4" />Tableaux et graphiques automatiques</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Créez des graphiques pour visualiser :
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Évolution de l'empreinte carbone année par année</li>
                            <li>• Répartition par type d'équipement (camembert)</li>
                            <li>• Comparaison neuf vs reconditionné (barres)</li>
                            <li>• Courbe d'âge du parc informatique</li>
                        </ul>
                    </Card>
                </div>

                {/* Onglet 4 - Suivi annuel */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        Onglet 4 : Suivi annuel et objectifs
                    </h2>

                    <Card className="p-6 mb-6">
                        <h4 className="font-semibold text-foreground mb-4">Template de suivi</h4>
                        <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
                            <thead className="bg-secondary">
                                <tr className="text-left">
                                    <th className="p-3 font-semibold text-foreground">Année</th>
                                    <th className="p-3 font-semibold text-foreground">Empreinte (t CO₂)</th>
                                    <th className="p-3 font-semibold text-foreground">Objectif</th>
                                    <th className="p-3 font-semibold text-foreground">Écart</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b border-border">
                                    <td className="p-3">Année 0 (baseline)</td>
                                    <td className="p-3">15.5 t</td>
                                    <td className="p-3">-</td>
                                    <td className="p-3">-</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="p-3">Année 1</td>
                                    <td className="p-3">14.2 t</td>
                                    <td className="p-3">14.7 t (-5 %)</td>
                                    <td className="p-3 text-emerald-600 dark:text-emerald-400">-3,4 % <Check className="ml-1 inline h-4 w-4" aria-hidden="true" /></td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="p-3">Année 2</td>
                                    <td className="p-3">À mesurer</td>
                                    <td className="p-3">13.2 t (-15 %)</td>
                                    <td className="p-3">-</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Année 3</td>
                                    <td className="p-3">À mesurer</td>
                                    <td className="p-3">10.9 t (-30 %)</td>
                                    <td className="p-3">-</td>
                                </tr>
                            </tbody>
                        </table></div>
                    </Card>

                    <Card className="p-6 bg-muted/5 border-border">
                        <h4 className="font-semibold text-foreground mb-3"><Target className="mr-1 inline h-4 w-4" />Plan d'action recommandé</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• <strong className="text-foreground">Court terme (6 mois) :</strong> Inventaire complet du parc</li>
                            <li>• <strong className="text-foreground">Moyen terme (1 an) :</strong> 50 % reconditionné + prolongation durée de vie</li>
                            <li>• <strong className="text-foreground">Long terme (3 ans) :</strong> -30 % empreinte carbone globale</li>
                        </ul>
                    </Card>
                </div>

                {/* Onglet 5 - Actions */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        Onglet 5 : Actions et mesures
                    </h2>

                    <Card className="p-6 mb-6">
                        <h4 className="font-semibold text-foreground mb-4">Tableau de bord des actions</h4>
                        <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
                            <thead className="bg-secondary">
                                <tr className="text-left">
                                    <th className="p-3 font-semibold text-foreground">Action</th>
                                    <th className="p-3 font-semibold text-foreground">Responsable</th>
                                    <th className="p-3 font-semibold text-foreground">Échéance</th>
                                    <th className="p-3 font-semibold text-foreground">Statut</th>
                                    <th className="p-3 font-semibold text-foreground">Impact estimé</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b border-border">
                                    <td className="p-3">Politique achat reconditionné</td>
                                    <td className="p-3">Achats</td>
                                    <td className="p-3">T1 Année 1</td>
                                    <td className="p-3 text-emerald-600 dark:text-emerald-400">En cours</td>
                                    <td className="p-3">-20 % CO₂</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="p-3">Prolongation durée de vie</td>
                                    <td className="p-3">IT</td>
                                    <td className="p-3">T2 Année 1</td>
                                    <td className="p-3 text-blue-600 dark:text-blue-400">Planifié</td>
                                    <td className="p-3">-15 % CO₂</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Formation collaborateurs</td>
                                    <td className="p-3">RH</td>
                                    <td className="p-3">T2 Année 1</td>
                                    <td className="p-3 text-blue-600 dark:text-blue-400">Planifié</td>
                                    <td className="p-3">-5 % usage</td>
                                </tr>
                            </tbody>
                        </table></div>
                    </Card>
                </div>

                {/* Ressources */}
                <Card className="p-8 mb-12 bg-muted/5 border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4"><BookOpen className="mr-1 inline h-5 w-5" />Ressources</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• <strong>ADEME Base Empreinte</strong> - Facteurs d'émission officiels</li>
                        <li>• <strong>GreenIT.fr</strong> - Outils de calcul et benchmarks</li>
                        <li>• <strong>Bilan Carbone ADEME</strong> - Méthodologie complète</li>
                        <li>• <strong>{SITE_NAME}</strong> - {SITE_SHORT}</li>
                    </ul>
                </Card>

                {/* Footer */}
                <div className="mt-12 text-center text-xs text-muted-foreground">
                    <p>Guide généré via {SITE_NAME} - {SITE_SHORT}</p>
                    <p>Méthodologie libre d'usage - À adapter selon vos besoins</p>
                </div>
            </div>
        </div>
    )
}

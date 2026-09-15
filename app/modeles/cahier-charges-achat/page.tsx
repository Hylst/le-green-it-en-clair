"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Printer, FileText } from "lucide-react"
import Link from "next/link"

export default function CahierChargesPage() {
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
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl font-bold text-white mb-2">Cahier des charges achat responsable</p>
                            <p className="text-emerald-100">Template pour appels d'offres IT - 18 pages</p>
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
            .page-break-before { page-break-before: always; }
            .page-break-after { page-break-after: always; }
          }
        `}</style>

                {/* Page de garde */}
                <div className="mb-12 text-center print:mb-8 page-break-after">
                    <div className="mb-8 inline-block rounded-full bg-muted/10 p-6">
                        <FileText className="h-16 w-16 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-4">Cahier des Charges</h1>
                    <h2 className="text-2xl text-muted-foreground mb-4">Achat Responsable IT</h2>
                    <h3 className="text-xl text-muted-foreground mb-8">Critères environnementaux et sociaux</h3>
                    <div className="mt-12 space-y-2 text-muted-foreground">
                        <p>[NOM DE L'ORGANISATION]</p>
                        <p>Appel d'offres N° [XX/ANNÉE]</p>
                        <p>Version 1.0 - [MOIS ANNÉE]</p>
                        <p className="text-sm italic mt-4">Source : Le Green IT en clair - hylst.fr/greenit</p>
                    </div>
                </div>

                {/* Sommaire */}
                <div className="mb-12 page-break-after">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">Sommaire</h2>
                    <ol className="space-y-2 text-muted-foreground">
                        <li className="flex justify-between"><span>1. Contexte et objectifs</span><span>3</span></li>
                        <li className="flex justify-between"><span>2. Critères environnementaux obligatoires</span><span>5</span></li>
                        <li className="flex justify-between"><span>3. Critères sociaux et éthiques</span><span>8</span></li>
                        <li className="flex justify-between"><span>4. Grille de notation RSE</span><span>11</span></li>
                        <li className="flex justify-between"><span>5. Labels et certifications</span><span>14</span></li>
                        <li className="flex justify-between"><span>6. Clauses contractuelles</span><span>16</span></li>
                        <li className="flex justify-between"><span>7. Annexes</span><span>18</span></li>
                    </ol>
                </div>

                {/* Section 1 - Contexte */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        1. Contexte et objectifs
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">1.1 Objet du marché</h3>
                    <Card className="p-6 mb-6">
                        <p className="text-muted-foreground mb-4">
                            Acquisition de [TYPE D'ÉQUIPEMENTS] pour [NOM ORGANISATION], intégrant des critères environnementaux,
                            sociaux et d'économie circulaire.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Quantité : [XX] unités</li>
                            <li>Durée du marché : [X] ans</li>
                            <li>Budget estimatif : [XX XXX] €</li>
                            <li>Livraison souhaitée : [DATE]</li>
                        </ul>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">1.2 Enjeux RSE</h3>
                    <div className="space-y-3">
                        <Card className="p-4 bg-muted/5 border-border">
                            <h4 className="font-semibold text-foreground mb-2">🌍 Environnement</h4>
                            <p className="text-sm text-muted-foreground">
                                Réduire l'empreinte carbone de nos achats IT (exemple : −30 % en 3 ans, à adapter) en privilégiant l'économie circulaire
                                et l'écoconception.
                            </p>
                        </Card>
                        <Card className="p-4 bg-muted/5 border-border">
                            <h4 className="font-semibold text-foreground mb-2">👥 Social</h4>
                            <p className="text-sm text-muted-foreground">
                                Garantir le respect des droits humains dans l'ensemble de la chaîne d'approvisionnement.
                            </p>
                        </Card>
                        <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                            <h4 className="font-semibold text-foreground mb-2">⚖️ Éthique</h4>
                            <p className="text-sm text-muted-foreground">
                                Favoriser les fournisseurs engagés dans une démarche RSE certifiée et transparente.
                            </p>
                        </Card>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-4 mt-6">1.3 Pondération des critères</h3>
                    <table className="w-full text-sm border border-border">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left font-semibold text-foreground">Critère</th>
                                <th className="p-3 text-left font-semibold text-foreground">Pondération</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b border-border">
                                <td className="p-3">Prix</td>
                                <td className="p-3">40%</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Critères techniques</td>
                                <td className="p-3">30%</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3 font-semibold text-emerald-600">Critères environnementaux</td>
                                <td className="p-3 font-semibold text-emerald-600">20%</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold text-emerald-600">Critères sociaux/éthiques</td>
                                <td className="p-3 font-semibold text-emerald-600">10%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Section 2 - Critères environnementaux */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        2. Critères environnementaux obligatoires
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">2.1 Labels et certifications (obligatoires)</h3>
                    <Card className="p-6 mb-6 bg-muted/5 border-border">
                        <p className="font-semibold text-foreground mb-3">⚠️ Critères éliminatoires</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Les équipements doivent obligatoirement posséder AU MOINS UN des labels suivants :
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>✓ <strong>EPEAT</strong> (Gold ou Silver minimum)</li>
                            <li>✓ <strong>TCO Certified</strong> (certification à jour)</li>
                            <li>✓ <strong>Energy Star</strong></li>
                            <li>✓ <strong>EU Ecolabel</strong></li>
                        </ul>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">2.2 Écoconception et durabilité</h3>
                    <table className="w-full text-sm mb-6 border border-border">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left font-semibold text-foreground">Critère</th>
                                <th className="p-3 text-left font-semibold text-foreground">Exigence minimale</th>
                                <th className="p-3 text-left font-semibold text-foreground">Points bonus</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b border-border">
                                <td className="p-3">Indice de réparabilité</td>
                                <td className="p-3">≥ 7/10</td>
                                <td className="p-3">≥ 8.5/10 : +5 pts</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Garantie</td>
                                <td className="p-3">3 ans minimum</td>
                                <td className="p-3">5 ans : +3 pts</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Disponibilité pièces détachées</td>
                                <td className="p-3">7 ans minimum</td>
                                <td className="p-3">10 ans : +3 pts</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Modularité (RAM, SSD)</td>
                                <td className="p-3">Évolutif</td>
                                <td className="p-3">Très évolutif : +2 pts</td>
                            </tr>
                            <tr>
                                <td className="p-3">Documentation réparation</td>
                                <td className="p-3">Disponible</td>
                                <td className="p-3">Open source : +2 pts</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="text-xl font-semibold text-foreground mb-4">2.3 Empreinte carbone</h3>
                    <Card className="p-6 mb-6">
                        <p className="text-muted-foreground mb-4">
                            Le fournisseur doit fournir :
                        </p>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>• Bilan carbone complet du produit (ACV)</li>
                            <li>• Répartition par phase (extraction, fabrication, transport, usage, fin de vie)</li>
                            <li>• Comparaison avec moyenne du marché</li>
                            <li>• Plan de réduction des émissions</li>
                        </ul>
                        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded">
                            <p className="text-sm font-semibold text-foreground">Bonus : Émissions &lt; 50 kg CO2eq par smartphone (Base Empreinte) : +5 points</p>
                        </div>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">2.4 Option reconditionnée</h3>
                    <Card className="p-6 bg-muted/5 border-border">
                        <p className="font-semibold text-foreground mb-3">💚 Critère prioritaire</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Le fournisseur doit proposer une option équipement reconditionné de grade A ou B,
                            avec garantie équivalente au neuf.
                        </p>
                        <p className="text-sm font-semibold text-emerald-600">
                            Proposition de solution reconditionnée : +10 points
                        </p>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4 mt-6">2.5 Programme de reprise et recyclage</h3>
                    <div className="space-y-3">
                        <p className="text-muted-foreground">Le fournisseur propose :</p>
                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-2">Reprise des équipements usagés</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Reprise gratuite à la livraison des neufs : obligatoire</li>
                                <li>• Certification de destruction sécurisée des données : obligatoire</li>
                                <li>• Valorisation (réemploi/recyclage) ≥ 90 % (Ecosystem 2024) : +5 points</li>
                                <li>• Traçabilité complète de la filière : +3 points</li>
                            </ul>
                        </Card>
                    </div>
                </div>

                {/* Section 3 - Critères sociaux */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        3. Critères sociaux et éthiques
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">3.1 Conditions de travail (obligatoire)</h3>
                    <Card className="p-6 mb-6 bg-muted/5 border-border">
                        <p className="font-semibold text-foreground mb-3">⚠️ Critères éliminatoires</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Le fournisseur doit certifier le respect des conventions de l'OIT dans l'ensemble
                            de sa chaîne d'approvisionnement :
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>✓ Interdiction du travail forcé et du travail des enfants</li>
                            <li>✓ Liberté syndicale et négociation collective</li>
                            <li>✓ Non-discrimination</li>
                            <li>✓ Salaire décent et horaires réglementés</li>
                            <li>✓ Santé et sécurité au travail</li>
                        </ul>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">3.2 Traçabilité de la chaîne d'approvisionnement</h3>
                    <table className="w-full text-sm mb-6 border border-border">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left font-semibold text-foreground">Élément</th>
                                <th className="p-3 text-left font-semibold text-foreground">Exigence</th>
                                <th className="p-3 text-left font-semibold text-foreground">Points</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b border-border">
                                <td className="p-3">Liste des sites de fabrication</td>
                                <td className="p-3">Obligatoire</td>
                                <td className="p-3">-</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Audits sociaux indépendants</td>
                                <td className="p-3">Annuels</td>
                                <td className="p-3">+5</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Transparence sur l'origine des minerais</td>
                                <td className="p-3">Certification Conflict-Free</td>
                                <td className="p-3">+4</td>
                            </tr>
                            <tr>
                                <td className="p-3">Programme de développement local</td>
                                <td className="p-3">Démontré</td>
                                <td className="p-3">+3</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="text-xl font-semibold text-foreground mb-4">3.3 Diversité et inclusion</h3>
                    <Card className="p-6">
                        <p className="text-muted-foreground mb-4">Points bonus si le fournisseur démontre :</p>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>• Politique de diversité formalisée : +2 points</li>
                            <li>• Parité hommes/femmes dans l'encadrement : +2 points</li>
                            <li>• Emploi de personnes en situation de handicap : +2 points</li>
                            <li>• Programme d'insertion pour jeunes : +2 points</li>
                        </ul>
                    </Card>
                </div>

                {/* Section 4 - Grille notation */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        4. Grille de notation RSE (total 100 points)
                    </h2>

                    <table className="w-full text-sm border border-border mb-6">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left font-semibold text-foreground">Catégorie</th>
                                <th className="p-3 text-left font-semibold text-foreground">Critère</th>
                                <th className="p-3 text-left font-semibold text-foreground">Points max</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="bg-emerald-50/50 dark:bg-emerald-950/10">
                                <td className="p-3 font-semibold text-foreground" rowSpan={5}>Environnement (60 pts)</td>
                                <td className="p-3">Labels et certifications</td>
                                <td className="p-3">15</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Écoconception et durabilité</td>
                                <td className="p-3">15</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Empreinte carbone</td>
                                <td className="p-3">10</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Option reconditionnée</td>
                                <td className="p-3">10</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Programme de reprise/recyclage</td>
                                <td className="p-3">10</td>
                            </tr>

                            <tr className="bg-blue-50/50 dark:bg-blue-950/10">
                                <td className="p-3 font-semibold text-foreground" rowSpan={3}>Social & Éthique (40 pts)</td>
                                <td className="p-3">Respect conventions OIT</td>
                                <td className="p-3">20</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Traçabilité chaîne d'approvisionnement</td>
                                <td className="p-3">12</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Diversité et inclusion</td>
                                <td className="p-3">8</td>
                            </tr>
                        </tbody>
                    </table>

                    <Card className="p-6 bg-muted/5 border-border">
                        <h3 className="font-semibold text-foreground mb-3">Seuils de notation</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Score &lt; 40/100 : Offre non retenue</li>
                            <li>• Score 40-59/100 : Acceptable</li>
                            <li>• Score 60-79/100 : Bon</li>
                            <li>• Score ≥ 80/100 : Excellent</li>
                        </ul>
                    </Card>
                </div>

                {/* Section 5 - Labels */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        5. Labels et certifications acceptés
                    </h2>

                    <div className="space-y-4">
                        <Card className="p-6">
                            <h3 className="font-semibold text-foreground mb-3">🏆 Labels environnementaux</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div>
                                    <p className="font-semibold text-foreground">EPEAT (Electronic Product Environmental Assessment Tool)</p>
                                    <p>Niveaux : Bronze, Silver, Gold. Minimum accepté : Silver</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">TCO Certified</p>
                                    <p>Certification complète (environnement + social). Certification à jour requise.</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Energy Star</p>
                                    <p>Efficacité énergétique. Version en vigueur requise.</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">EU Ecolabel</p>
                                    <p>Label écologique européen officiel.</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold text-foreground mb-3">👥 Certifications sociales</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div>
                                    <p className="font-semibold text-foreground">SA8000</p>
                                    <p>Norme internationale pour les conditions de travail</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Fair Trade IT</p>
                                    <p>Commerce équitable dans l'électronique</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">B Corp</p>
                                    <p>Certification d'entreprise à impact positif</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Section 6 - Clauses */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        6. Clauses contractuelles RSE
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">6.1 Obligations du fournisseur</h3>
                    <Card className="p-6 mb-6">
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• Maintenir les certifications pendant toute la durée du contrat</li>
                            <li>• Fournir un rapport RSE annuel détaillé</li>
                            <li>• Accepter les audits de conformité (préavis de 15 jours)</li>
                            <li>• Informer sous 30 jours de tout changement dans la chaîne d'approvisionnement</li>
                            <li>• Mettre en œuvre un plan de progrès continu</li>
                        </ul>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">6.2 Pénalités</h3>
                    <table className="w-full text-sm border border-border mb-6">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left font-semibold text-foreground">Non-conformité</th>
                                <th className="p-3 text-left font-semibold text-foreground">Sanction</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b border-border">
                                <td className="p-3">Perte d'un label obligatoire</td>
                                <td className="p-3">Résiliation possible du marché</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Non-respect conventions OIT constaté</td>
                                <td className="p-3">Résiliation immédiate + sanctions</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Absence de rapport RSE annuel</td>
                                <td className="p-3">Pénalité de 5% du montant annuel</td>
                            </tr>
                            <tr>
                                <td className="p-3">Refus d'audit</td>
                                <td className="p-3">Résiliation possible du marché</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="text-xl font-semibold text-foreground mb-4">6.3 Bonus de performance</h3>
                    <Card className="p-6 bg-muted/5 border-border">
                        <p className="text-sm text-muted-foreground mb-4">
                            Des bonus peuvent être attribués en cas de :
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Amélioration du score RSE &gt; 10 points : bonus de 2%</li>
                            <li>• Obtention de nouveaux labels : bonus de 1%</li>
                            <li>• Innovation environnementale ou sociale : bonus de 3%</li>
                        </ul>
                    </Card>
                </div>

                {/* Annexes */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">7. Annexes</h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">Annexe A : Documents à fournir</h3>
                    <Card className="p-6 mb-6">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>□ Certificats des labels (copies officielles)</li>
                            <li>□ Bilan carbone produit (ACV complète)</li>
                            <li>□ Liste des sites de fabrication avec audits sociaux</li>
                            <li>□ Certification Conflict-Free Minerals</li>
                            <li>□ Documentation technique de réparabilité</li>
                            <li>□ Politique RSE de l'entreprise</li>
                            <li>□ Rapport RSE de l'année précédente</li>
                            <li>□ Engagements de reprise et recyclage</li>
                        </ul>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">Annexe B : Ressources utiles</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• ADEME - Guide achats publics responsables IT</li>
                        <li>• Observatoire des Achats Responsables (ObsAR)</li>
                        <li>• GreenIT.fr - Référentiel achats responsables</li>
                        <li>• Le Green IT en clair - hylst.fr/greenit</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-xs text-muted-foreground">
                    <p>Document généré via Le Green IT en clair - hylst.fr/greenit</p>
                    <p>Template libre d'usage - À personnaliser selon vos besoins</p>
                </div>
            </div>
        </div>
    )
}

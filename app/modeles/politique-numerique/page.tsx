"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Printer, ShoppingCart, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PolitiqueNumeriquePage() {
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen">
            {/* Header - masqué à l'impression */}
            <div className="print:hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8">
                <div className="mx-auto max-w-4xl">
                    <Link href="/modeles" className="inline-flex items-center gap-2 text-white hover:text-emerald-100 mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux modèles
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Politique numérique responsable</h1>
                            <p className="text-emerald-100">Document cadre - 8 pages</p>
                        </div>
                        <Button onClick={handlePrint} size="lg" variant="secondary" className="bg-card text-emerald-700 hover:bg-muted">
                            <Printer className="mr-2 h-5 w-5" />
                            Imprimer en PDF
                        </Button>
                    </div>
                </div>
            </div>

            {/* Contenu à imprimer */}
            <div className="mx-auto max-w-4xl px-6 py-12 print:px-12 print:py-8">
                <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 2cm;
            }
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            .page-break-before {
              page-break-before: always;
            }
            .page-break-after {
              page-break-after: always;
            }
          }
        `}</style>

                {/* Page de garde */}
                <div className="mb-12 text-center print:mb-8 page-break-after">
                    <div className="mb-8 inline-block rounded-full bg-muted/10 p-6">
                        <ShoppingCart className="h-16 w-16 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-4">Politique Numérique Responsable</h1>
                    <h2 className="text-2xl text-muted-foreground mb-8">Guide d'achat et d'usage</h2>
                    <div className="mt-12 space-y-2 text-muted-foreground">
                        <p>[NOM DE L'ORGANISATION]</p>
                        <p>Version 1.0 - Janvier 2026</p>
                        <p className="text-sm italic mt-4">Source : Le Green IT en clair - hylst.fr/greenit</p>
                    </div>
                </div>

                {/* Introduction */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">Introduction</h2>

                    <p className="mb-4 text-muted-foreground">
                        Cette politique définit les règles et bonnes pratiques pour l'acquisition, l'utilisation et la fin de vie des équipements numériques au sein de notre organisation.
                    </p>

                    <Card className="p-6 bg-muted/5 border-border mb-6">
                        <h3 className="font-semibold text-foreground mb-3">Objectifs</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>Réduire notre empreinte environnementale numérique</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>Optimiser les coûts d'acquisition et de maintenance</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>Sensibiliser les collaborateurs aux écogestes numériques</span>
                            </li>
                        </ul>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">Périmètre d'application</h3>
                    <p className="text-muted-foreground mb-4">
                        Cette politique s'applique à tous les équipements numériques de l'organisation :
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Postes de travail (ordinateurs fixes et portables)</li>
                        <li>Périphériques (écrans, claviers, souris, imprimantes)</li>
                        <li>Équipements mobiles (smartphones, tablettes)</li>
                        <li>Serveurs et équipements réseau</li>
                    </ul>
                </div>

                {/* Section 1 - Achats */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        1. Règles d'achat responsable
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">1.1 Privilégier le reconditionné</h3>
                    <Card className="p-6 mb-6">
                        <p className="text-muted-foreground mb-4">
                            En priorité, chercher une solution reconditionnée pour tous les équipements standards.
                        </p>
                        <table className="w-full text-sm">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left pb-2 font-semibold text-foreground">Type d'équipement</th>
                                    <th className="text-left pb-2 font-semibold text-foreground">Objectif reconditionné</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b border-border">
                                    <td className="py-2">Ordinateurs portables</td>
                                    <td className="py-2">60% minimum</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Écrans</td>
                                    <td className="py-2">40% minimum</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Smartphones</td>
                                    <td className="py-2">30% minimum</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Périphériques</td>
                                    <td className="py-2">50% minimum</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">1.2 Critères environnementaux obligatoires</h3>
                    <div className="space-y-4">
                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-2">Labels et certifications</h4>
                            <p className="text-sm text-muted-foreground mb-2">Exiger au moins un des labels suivants :</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                                <li>EPEAT (Gold ou Silver minimum)</li>
                                <li>TCO Certified</li>
                                <li>Energy Star</li>
                                <li>EU Ecolabel</li>
                            </ul>
                        </Card>

                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-2">Critères techniques</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                                <li>Réparabilité : indice ≥ 7/10</li>
                                <li>Modularité : composants facilement remplaçables (RAM, SSD)</li>
                                <li>Garantie : minimum 5 ans pièces et main d'œuvre</li>
                                <li>Disponibilité des pièces détachées : 7 ans minimum</li>
                            </ul>
                        </Card>

                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-2">Exclusions</h4>
                            <p className="text-sm text-muted-foreground">Éviter :</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                                <li>Équipements non réparables ou à composants soudés</li>
                                <li>Modèles avec obsolescence programmée connue</li>
                                <li>Fabricants ne proposant pas de programme de reprise</li>
                            </ul>
                        </Card>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">1.3 Dimensionnement au juste besoin</h3>
                    <p className="text-muted-foreground mb-4">
                        Adapter la puissance de l'équipement au besoin réel de l'utilisateur :
                    </p>
                    <table className="w-full text-sm mb-6 border border-border">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left font-semibold text-foreground">Profil utilisateur</th>
                                <th className="p-3 text-left font-semibold text-foreground">Configuration recommandée</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b border-border">
                                <td className="p-3">Bureautique légère</td>
                                <td className="p-3">8 Go RAM, processeur quad-core récent, SSD 256 Go, écran 14"</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Bureautique standard</td>
                                <td className="p-3">8 Go RAM, processeur quad-core, écran 15"</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Développement/Design</td>
                                <td className="p-3">16 Go RAM, processeur performant, écran 15"+</td>
                            </tr>
                            <tr>
                                <td className="p-3">Utilisateur mobile</td>
                                <td className="p-3">Portable léger ≤ 1.5 kg, autonomie ≥ 8h</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Section 2 - Cycle de vie */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        2. Gestion du cycle de vie
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">2.1 Durée de vie cible</h3>
                    <Card className="p-6 mb-6">
                        <table className="w-full text-sm">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left pb-2 font-semibold text-foreground">Équipement</th>
                                    <th className="text-left pb-2 font-semibold text-foreground">Durée minimale</th>
                                    <th className="text-left pb-2 font-semibold text-foreground">Durée cible</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b border-border">
                                    <td className="py-2">Ordinateur portable</td>
                                    <td className="py-2">4 ans</td>
                                    <td className="py-2">5-7 ans</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Ordinateur fixe</td>
                                    <td className="py-2">5 ans</td>
                                    <td className="py-2">6-8 ans</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Smartphone</td>
                                    <td className="py-2">3 ans</td>
                                    <td className="py-2">4-5 ans</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-2">Tablette</td>
                                    <td className="py-2">4 ans</td>
                                    <td className="py-2">5-7 ans</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Écran</td>
                                    <td className="py-2">6 ans</td>
                                    <td className="py-2">8-10 ans</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>

                    <h3 className="text-xl font-semibold text-foreground mb-4">2.2 Maintenance et réparation</h3>
                    <div className="space-y-3">
                        <Card className="p-4 bg-muted/5 border-border">
                            <p className="text-sm font-semibold text-foreground mb-2">Principe : Réparer avant de remplacer</p>
                            <p className="text-sm text-muted-foreground">
                                Tout équipement en panne doit faire l'objet d'un diagnostic de réparabilité avant envisager un remplacement.
                            </p>
                        </Card>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Mise bà jour régulière des systèmes d'exploitation et logiciels</li>
                            <li>Nettoyage physique annuel des équipements</li>
                            <li>Remplacement des composants défaillants plutôt que de l'appareil entier</li>
                            <li>Mise à niveau mémoire/stockage si besoin avant remplacement</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">2.3 Fin de vie et recyclage</h3>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">
                            Tous les équipements en fin de vie doivent suivre la procédure de tri et recyclage :
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <Card className="p-4 text-center">
                                <div className="text-2xl font-bold text-emerald-600 mb-2">1</div>
                                <h4 className="font-semibold text-foreground mb-2">Effacement sécurisé</h4>
                                <p className="text-sm text-muted-foreground">Données effacées selon norme DoD 5220.22-M</p>
                            </Card>

                            <Card className="p-4 text-center">
                                <div className="text-2xl font-bold text-emerald-600 mb-2">2</div>
                                <h4 className="font-semibold text-foreground mb-2">Tri et évaluation</h4>
                                <p className="text-sm text-muted-foreground">Fonctionnel = don/revente<br />Non fonctionnel = recyclage</p>
                            </Card>

                            <Card className="p-4 text-center">
                                <div className="text-2xl font-bold text-emerald-600 mb-2">3</div>
                                <h4 className="font-semibold text-foreground mb-2">Filière agréée</h4>
                                <p className="text-sm text-muted-foreground">Ecosystem ou Ecologic uniquement</p>
                            </Card>
                        </div>

                        <Card className="p-4 bg-muted/5 border-border">
                            <p className="text-sm font-semibold text-foreground mb-2">📋 Traçabilité obligatoire</p>
                            <p className="text-sm text-muted-foreground">
                                Chaque équipement en fin de vie doit être enregistré : date, numéro de série, destination (don/recyclage),
                                certificat de destruction des données.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Section 3 - Usages */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        3. Bonnes pratiques d'usage
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">3.1 Écogestes quotidiens</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-3">⚡ Équipements</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>✓ Éteindre les équipements en fin de journée</li>
                                <li>✓ Activer les modes "économie d'énergie"</li>
                                <li>✓ Réduire la luminosité des écrans</li>
                                <li>✓ Débrancher les chargeurs inutilisés</li>
                            </ul>
                        </Card>

                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-3">📧 Messagerie</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>✓ Nettoyer régulièrement sa boîte mail</li>
                                <li>✓ Limiter les pièces jointes volumineuses</li>
                                <li>✓ Se désabonner des newsletters non lues</li>
                                <li>✓ Éviter les "Répondre à tous" inutiles</li>
                            </ul>
                        </Card>

                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-3">💾 Stockage</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>✓ Supprimer les fichiers obsolètes</li>
                                <li>✓ Éviter les doublons</li>
                                <li>✓ Compresser les fichiers volumineux</li>
                                <li>✓ Archiver plutôt que stocker indéfiniment</li>
                            </ul>
                        </Card>

                        <Card className="p-4">
                            <h4 className="font-semibold text-foreground mb-3">🎥 Visioconférence</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>✓ Couper la caméra quand non nécessaire</li>
                                <li>✓ Privilégier l'audio pour les réunions simples</li>
                                <li>✓ Éviter l'enregistrement systématique</li>
                                <li>✓ Utiliser des arrière-plans fixes</li>
                            </ul>
                        </Card>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-4">3.2 Impression responsable</h3>
                    <Card className="p-6">
                        <ul className="space-y-2 text-muted-foreground">
                            <li>• Imprimer uniquement si nécessaire (privilégier le numérique)</li>
                            <li>• Imprimer en recto-verso par défaut</li>
                            <li>• Utiliser le mode brouillon ou économique</li>
                            <li>• Privilégier le noir et blanc</li>
                            <li>• Réutiliser le papier imprimé au verso pour les brouillons</li>
                        </ul>
                    </Card>
                </div>

                {/* Section 4 - Formation */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        4. Formation et sensibilisation
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-4">4.1 Parcours d'intégration</h3>
                    <p className="text-muted-foreground mb-4">
                        Tout nouveau collaborateur doit :
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-6">
                        <li>Suivre une formation Green IT de 30 minutes</li>
                        <li>Signer la charte numérique responsable</li>
                        <li>Recevoir le mémo des écogestes</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-4">4.2 Sensibilisation continue</h3>
                    <Card className="p-6">
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-emerald-600">•</span>
                                <span><strong className="text-foreground">Mensuel :</strong> Newsletter avec astuces Green IT</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-emerald-600">•</span>
                                <span><strong className="text-foreground">Trimestriel :</strong> Webinaire thématique (1h)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-emerald-600">•</span>
                                <span><strong className="text-foreground">Annuel :</strong> Semaine du numérique responsable</span>
                            </li>
                        </ul>
                    </Card>
                </div>

                {/* Section 5 - Suivi */}
                <div className="mb-12 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        5. Indicateurs de suivi
                    </h2>

                    <table className="w-full text-sm mb-6 border border-border">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="p-3 text-left font-semibold text-foreground">Indicateur</th>
                                <th className="p-3 text-left font-semibold text-foreground">Fréquence</th>
                                <th className="p-3 text-left font-semibold text-foreground">Objectif</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b border-border">
                                <td className="p-3">% équipements reconditionnés</td>
                                <td className="p-3">Mensuel</td>
                                <td className="p-3">≥ 50%</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Durée de vie moyenne du parc</td>
                                <td className="p-3">Annuel</td>
                                <td className="p-3">≥ 5 ans</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Taux de réparation vs remplacement</td>
                                <td className="p-3">Trimestriel</td>
                                <td className="p-3">≥ 30%</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">Taux de recyclage</td>
                                <td className="p-3">Annuel</td>
                                <td className="p-3">100%</td>
                            </tr>
                            <tr>
                                <td className="p-3">Collaborateurs formés</td>
                                <td className="p-3">Annuel</td>
                                <td className="p-3">100%</td>
                            </tr>
                        </tbody>
                    </table>

                    <Card className="p-6 bg-muted/5 border-border">
                        <h3 className="font-semibold text-foreground mb-3">Révision de la politique</h3>
                        <p className="text-sm text-muted-foreground">
                            Cette politique est révisée annuellement pour intégrer les évolutions technologiques,
                            réglementaires et les retours d'expérience.
                        </p>
                    </Card>
                </div>

                {/* Signature */}
                <div className="mt-16 pt-8 border-t border-border">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="font-semibold text-foreground mb-2">Direction</p>
                            <p className="text-sm text-muted-foreground mb-4">Nom et fonction</p>
                            <p className="text-sm text-muted-foreground">Date et signature :</p>
                            <div className="mt-2 border-b border-muted-foreground w-48"></div>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground mb-2">Responsable IT/RSE</p>
                            <p className="text-sm text-muted-foreground mb-4">Nom et fonction</p>
                            <p className="text-sm text-muted-foreground">Date et signature :</p>
                            <div className="mt-2 border-b border-muted-foreground w-48"></div>
                        </div>
                    </div>
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

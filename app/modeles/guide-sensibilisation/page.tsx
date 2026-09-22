"use client"

import { Button } from "@/components/ui/button"
import { SITE_NAME, SITE_SHORT } from "@/lib/site"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Printer, Users, BookOpen, ClipboardCheck, Image, Mail, Zap, Database, Video, Recycle, Download, Check } from "lucide-react"
import Link from "next/link"

export default function KitSensibilisationPage() {
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
                            <p className="text-3xl font-bold text-white mb-2">Kit de Sensibilisation Green IT</p>
                            <p className="text-emerald-100">Pack complet formation collaborateurs</p>
                        </div>
                        <Button onClick={handlePrint} size="lg" variant="secondary" className="bg-card text-emerald-700 dark:text-emerald-400 hover:bg-muted">
                            <Printer className="mr-2 h-5 w-5" />
                            Imprimer tout en PDF
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 py-12 print:px-12 print:py-8">
                <style jsx global>{`
          @media print {
            @page { size: A4; margin: 2cm; }
            body { print-color-adjust: exact; }
          }
        `}</style>

                {/* Introduction */}
                <div className="mb-12 text-center">
                    <div className="mb-8 inline-block rounded-full bg-muted/10 p-6">
                        <Users className="h-16 w-16 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-4">Kit de Sensibilisation</h1>
                    <h2 className="text-2xl text-muted-foreground mb-8">Former vos collaborateurs au numérique responsable</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Ce kit contient tous les supports nécessaires pour animer une session de sensibilisation complète de 30 minutes.
                    </p>
                </div>

                {/* Partie 1 - Présentation */}
                <div className="mb-16 page-break-after">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        <BookOpen className="inline h-6 w-6 mr-2" />
                        1. Présentation (30 minutes)
                    </h2>

                    <Card className="p-8 mb-6 bg-muted/5 border-border">
                        <h3 className="text-xl font-semibold text-foreground mb-4">Plan de la présentation</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="font-bold text-emerald-600 min-w-[30px]">1.</span>
                                <div>
                                    <h4 className="font-semibold text-foreground">Introduction (3 min)</h4>
                                    <p className="text-sm text-muted-foreground">Contexte et enjeux du numérique</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-emerald-600 min-w-[30px]">2.</span>
                                <div>
                                    <h4 className="font-semibold text-foreground">Les chiffres clés (5 min)</h4>
                                    <p className="text-sm text-muted-foreground">3,4 % des émissions mondiales (EENM 2025), 2,5 % en France en 2020 (4,4 % en 2022, ADEME-Arcep), 100 M d'appareils qui dorment dans les tiroirs (ADEME 2026)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-emerald-600 min-w-[30px]">3.</span>
                                <div>
                                    <h4 className="font-semibold text-foreground">Phase de fabrication (7 min)</h4>
                                    <p className="text-sm text-muted-foreground">75 % des impacts (tous indicateurs), terres rares, eau, énergie</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-emerald-600 min-w-[30px]">4.</span>
                                <div>
                                    <h4 className="font-semibold text-foreground">Nos actions au quotidien (10 min)</h4>
                                    <p className="text-sm text-muted-foreground">12 écogestes numériques pratiques</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-emerald-600 min-w-[30px]">5.</span>
                                <div>
                                    <h4 className="font-semibold text-foreground">Quiz interactif (5 min)</h4>
                                    <p className="text-sm text-muted-foreground">10 questions pour tester les connaissances</p>
                                </div>
                            </li>
                        </ol>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4">Diapositive d'exemple : Les 12 écogestes</h3>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="p-3 bg-secondary rounded">
                                <p className="font-semibold text-foreground"><Mail className="mr-1 inline h-4 w-4" />Emails</p>
                                <ul className="text-muted-foreground mt-2 space-y-1">
                                    <li>• Nettoyer régulièrement sa boîte mail</li>
                                    <li>• Se désabonner des newsletters non lues</li>
                                    <li>• Limiter les pièces jointes volumineuses</li>
                                </ul>
                            </div>
                            <div className="p-3 bg-secondary rounded">
                                <p className="font-semibold text-foreground"><Zap className="mr-1 inline h-4 w-4" />Équipements</p>
                                <ul className="text-muted-foreground mt-2 space-y-1">
                                    <li>• Éteindre écran et PC le soir</li>
                                    <li>• Activer mode économie d'énergie</li>
                                    <li>• Prolonger durée de vie (5 ans mini)</li>
                                </ul>
                            </div>
                            <div className="p-3 bg-secondary rounded">
                                <p className="font-semibold text-foreground"><Database className="mr-1 inline h-4 w-4" />Stockage</p>
                                <ul className="text-muted-foreground mt-2 space-y-1">
                                    <li>• Supprimer fichiers obsolètes</li>
                                    <li>• Éviter doublons</li>
                                    <li>• Compresser gros fichiers</li>
                                </ul>
                            </div>
                            <div className="p-3 bg-secondary rounded">
                                <p className="font-semibold text-foreground"><Video className="mr-1 inline h-4 w-4" />Visio</p>
                                <ul className="text-muted-foreground mt-2 space-y-1">
                                    <li>• Couper caméra si non nécessaire</li>
                                    <li>• Privilégier audio pour réunions simples</li>
                                    <li>• Éviter enregistrements systématiques</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Partie 2 - Quiz */}
                <div className="mb-16 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        <ClipboardCheck className="inline h-6 w-6 mr-2" />
                        2. Quiz interactif (10 questions)
                    </h2>

                    <Card className="p-6 mb-4 bg-muted/5 border-border">
                        <p className="text-sm text-muted-foreground mb-4">
                            <strong className="text-foreground">Format :</strong> QCM avec 3 choix de réponse. Utilisez un outil comme Kahoot, Wooclap ou PowerPoint interactif.
                        </p>
                    </Card>

                    <div className="space-y-6">
                        <Card className="p-6">
                            <h4 className="font-semibold text-foreground mb-3">Question 1 : Empreinte carbone</h4>
                            <p className="text-muted-foreground mb-3">Quelle part du numérique dans les émissions mondiales de CO₂ ?</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>A. 1 %</li>
                                <li>B. Environ 3,4 % <Check className="mr-1 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> (Bonne réponse)</li>
                                <li>C. 10 %</li>
                            </ul>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold text-foreground mb-3">Question 2 : Phase la plus polluante</h4>
                            <p className="text-muted-foreground mb-3">Quelle phase représente environ 75 % des impacts (tous indicateurs) d'un smartphone ?</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>A. Utilisation</li>
                                <li>B. Fabrication <Check className="mr-1 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> (Bonne réponse)</li>
                                <li>C. Recyclage</li>
                            </ul>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold text-foreground mb-3">Question 3 : Durée de vie</h4>
                            <p className="text-muted-foreground mb-3">Quelle est la durée de vie conseillée pour un ordinateur portable ?</p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>A. 2 ans</li>
                                <li>B. 3-4 ans</li>
                                <li>C. 5-7 ans <Check className="mr-1 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> (Bonne réponse)</li>
                            </ul>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold text-foreground mb-3">Question 4-10 : À personnaliser</h4>
                            <p className="text-sm text-muted-foreground">
                                Créez 7 questions supplémentaires adaptées à votre contexte : achats reconditionnés, emails, visio, recyclage, etc.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Partie 3 - Affiches */}
                <div className="mb-16 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        <Image className="inline h-6 w-6 mr-2" />
                        3. Affiches de sensibilisation (5 affiches A3)
                    </h2>

                    <p className="text-muted-foreground mb-6">
                        À imprimer au format A3 et à afficher dans les espaces communs (open space, cuisine, photocopieuse)
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-300">
                            <div className="text-center">
                                <div className="text-4xl mb-3">📧</div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Affiche #1 : Emails</h3>
                                <div className="text-5xl font-bold text-emerald-600 mb-2">4 à 35 g</div>
                                <p className="text-sm text-muted-foreground mb-4">de CO₂ par email, selon la pièce jointe (ADEME)</p>
                                <div className="text-left text-sm text-muted-foreground space-y-2">
                                    <p>🔹 Nettoyez votre boîte mail</p>
                                    <p>🔹 Désabonnez-vous des newsletters</p>
                                    <p>🔹 Compressez les pièces jointes</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-300">
                            <div className="text-center">
                                <div className="text-4xl mb-3">📱</div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Affiche #2 : Smartphone</h3>
                                <div className="text-6xl font-bold text-blue-600 mb-2">75 %</div>
                                <p className="text-sm text-muted-foreground mb-4">des impacts (tous indicateurs) = fabrication (≈99 % du carbone)</p>
                                <div className="text-left text-sm text-muted-foreground space-y-2">
                                    <p>🔹 Gardez-le 5 ans minimum</p>
                                    <p>🔹 Réparez plutôt que remplacer</p>
                                    <p>🔹 Recyclez via filière agréée</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-300">
                            <div className="text-center">
                                <div className="text-4xl mb-3">🎥</div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Affiche #3 : Visio</h3>
                                <div className="text-6xl font-bold text-purple-600 mb-2">-80 %</div>
                                <p className="text-sm text-muted-foreground mb-4">de bande passante en coupant la caméra (ordre de grandeur, Arcep 2024)</p>
                                <div className="text-left text-sm text-muted-foreground space-y-2">
                                    <p>🔹 Caméra OFF si non nécessaire</p>
                                    <p>🔹 Audio pour réunions simples</p>
                                    <p>🔹 Pas d'enregistrement systématique</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-300">
                            <div className="text-center">
                                <div className="text-4xl mb-3">⚡</div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Affiche #4 : Énergie</h3>
                                <div className="text-6xl font-bold text-amber-600 mb-2">10 %</div>
                                <p className="text-sm text-muted-foreground mb-4">d'économies possibles sur la consommation des postes (ordre de grandeur, ADEME)</p>
                                <div className="text-left text-sm text-muted-foreground space-y-2">
                                    <p>🔹 Éteignez écran et PC le soir</p>
                                    <p>🔹 Mode économie d'énergie</p>
                                    <p>🔹 Débranchez chargeurs inutiles</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border-2 border-teal-300">
                            <div className="text-center">
                                <div className="text-4xl mb-3">♻️</div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Affiche #5 : Recyclage</h3>
                                <div className="text-6xl font-bold text-teal-600 mb-2">100 %</div>
                                <p className="text-sm text-muted-foreground mb-4">à recycler obligatoirement</p>
                                <div className="text-left text-sm text-muted-foreground space-y-2">
                                    <p>🔹 Ne jetez jamais à la poubelle</p>
                                    <p>🔹 Rapportez en magasin</p>
                                    <p>🔹 Ou donnez à une association</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Partie 4 - Mémo */}
                <div className="mb-16 page-break-before">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-emerald-600 pb-2">
                        4. Mémo de poche (format carte bancaire)
                    </h2>

                    <Card className="p-8 max-w-md mx-auto bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-none">
                        <h3 className="text-xl font-bold mb-4 text-center">Green IT - Mémo</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                    <p className="font-semibold mb-1"><Mail className="mr-1 inline h-4 w-4" />Emails</p>
                                <p className="text-emerald-100">Nettoyez, désabonnez, compressez</p>
                            </div>
                            <div>
                                    <p className="font-semibold mb-1"><Zap className="mr-1 inline h-4 w-4" />Équipements</p>
                                <p className="text-emerald-100">Éteignez, économisez, prolongez</p>
                            </div>
                            <div>
                                    <p className="font-semibold mb-1"><Database className="mr-1 inline h-4 w-4" />Données</p>
                                <p className="text-emerald-100">Triez, supprimez, archivez</p>
                            </div>
                            <div>
                                    <p className="font-semibold mb-1"><Video className="mr-1 inline h-4 w-4" />Visio</p>
                                <p className="text-emerald-100">Caméra OFF, audio privilégié</p>
                            </div>
                            <div>
                                    <p className="font-semibold mb-1"><Recycle className="mr-1 inline h-4 w-4" />Recyclage</p>
                                <p className="text-emerald-100">Filières agréées obligatoires</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-emerald-400 text-center text-xs text-emerald-100">
                            {SITE_SHORT}
                        </div>
                    </Card>

                    <p className="text-sm text-muted-foreground text-center mt-4">
                        À imprimer recto-verso sur carton et distribuer à tous les collaborateurs
                    </p>
                </div>

                {/* Footer */}
                <Card className="p-8 bg-muted/5 border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4"><Download className="mr-2 inline h-5 w-5" />Comment utiliser ce kit ?</h3>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                        <li>1. Personnalisez la présentation avec les chiffres de votre organisation</li>
                        <li>2. Imprimez les 5 affiches au format A3 couleur</li>
                        <li>3. Créez le quiz interactif sur votre plateforme préférée</li>
                        <li>4. Imprimez les mémos de poche (format carte bancaire)</li>
                        <li>5. Animez la session de 30 minutes</li>
                        <li>6. Distribuez les mémos en fin de session</li>
                    </ol>
                </Card>

                {/* Footer document */}
                <div className="mt-12 text-center text-xs text-muted-foreground">
                    <p>Kit généré via {SITE_NAME} - {SITE_SHORT}</p>
                    <p>Contenus libres d'usage - À personnaliser selon vos besoins</p>
                </div>
            </div>
        </div>
    )
}

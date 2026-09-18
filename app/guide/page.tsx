"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SourceTooltip } from "@/components/source-tooltip"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import {
    FileText,
    CheckCircle2,
    Leaf,
    Smartphone,
    Laptop,
    Globe,
    Printer,
    Download,
    Recycle
} from "lucide-react"

import { useRouter } from "next/navigation"

const sectionColorClasses: Record<string, { header: string; iconWrap: string; icon: string }> = {
    emerald: { header: "bg-emerald-500/5", iconWrap: "bg-emerald-500/10", icon: "text-emerald-500" },
    blue: { header: "bg-blue-500/5", iconWrap: "bg-blue-500/10", icon: "text-blue-500" },
    teal: { header: "bg-teal-500/5", iconWrap: "bg-teal-500/10", icon: "text-teal-500" },
    orange: { header: "bg-orange-500/5", iconWrap: "bg-orange-500/10", icon: "text-orange-500" },
}

export default function GuidePage() {
    const router = useRouter()
    const sections = [
        {
            title: "Matériel & Équipement",
            icon: Laptop,
            color: "emerald",
            tips: [
                "Gardez vos appareils le plus longtemps possible (5 ans minimum pour un smartphone).",
                "Privilégiez le matériel reconditionné pour vos nouveaux achats.",
                "Choisissez des appareils avec un bon indice de réparabilité.",
                "Évitez de multiplier les écrans et privilégiez les plus petits formats."
            ]
        },
        {
            title: "Usages Quotidiens",
            icon: Smartphone,
            color: "blue",
            tips: [
                "Éteignez votre box et vos appareils la nuit et en votre absence.",
                "Privilégiez le Wi-Fi à la 4G/5G (environ 4 à 5 fois moins d'énergie en streaming).",
                "Désactivez la lecture automatique des vidéos sur les réseaux sociaux.",
                "Nettoyez vos boîtes mail de temps en temps et désinscrivez-vous des newsletters inutiles (geste symbolique : l'impact du stockage est minime)."
            ]
        },
        {
            title: "Web & Navigation",
            icon: Globe,
            color: "teal",
            tips: [
                "Tapez l'adresse directement au lieu de passer par une recherche (pratique, même si le gain est minime).",
                "Utilisez des favoris pour vos sites fréquents.",
                "Limitez le nombre d'onglets ouverts simultanément (surtout du confort).",
                "Activez le mode sombre sur écran OLED à forte luminosité (jusqu'à ~50 % d'économie, moins en usage courant)."
            ]
        },
        {
            title: "Fin de vie & Recyclage",
            icon: Recycle,
            color: "orange",
            tips: [
                "Ne jetez jamais un appareil à la poubelle : rapportez-le en point de collecte.",
                "Effacez vos données avant de donner ou recycler (réinitialisation d'usine).",
                "Pensez au don et au reconditionné avant d'acheter neuf.",
                "Retrouvez les points de collecte et le mode d'emploi sur la page Recyclage."
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-background pb-20" data-theme="emerald">
            {/* Header */}
      <PageHero
        theme="emerald"
        image={{ src: "/greenit/images/hero-guide.webp", alt: "Pousse verte sortant des pages d'un guide ouvert" }}
                badge={{ icon: FileText, label: "Guide récapitulatif 2026" }}
                title="Guide du Numérique Responsable"
                intro="Les bons réflexes pour réduire votre empreinte numérique au quotidien."
                actions={
                    <>
                        <Button onClick={() => window.print()} className="bg-primary hover:bg-primary/90">
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimer le guide
                        </Button>
                        <Button asChild variant="outline">
                            <a href="/greenit/guide-recyclage-green-it.pdf" download>
                                <Download className="mr-2 h-4 w-4" />
                                Guide recyclage (PDF)
                            </a>
                        </Button>
                    </>
                }
            />

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 mt-12 grid gap-8">
                {sections.map((section, index) => {
                    const Icon = section.icon
                    return (
                        <Card key={index} className="border-2 border-border shadow-sm">
                            <CardHeader className={`${(sectionColorClasses[section.color] ?? sectionColorClasses.emerald).header} border-b`}>
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${(sectionColorClasses[section.color] ?? sectionColorClasses.emerald).iconWrap}`}>
                                        <Icon className={`h-6 w-6 ${(sectionColorClasses[section.color] ?? sectionColorClasses.emerald).icon}`} />
                                    </div>
                                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="grid gap-4 md:grid-cols-2">
                                    {section.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )
                })}

                <Card className="bg-emerald-700 text-white p-8 rounded-2xl border-none">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                                <Leaf className="h-6 w-6" />
                                Le saviez-vous ?
                            </h3>
                            <p className="text-emerald-50 text-lg">
                                Produire un ordinateur portable de 2 kg émet environ 193 kg de CO₂ et nécessite 800 kg de matières premières (ADEME, Impact CO₂ 2025)<SourceTooltip source="ADEME, Impact CO₂ (mise à jour 2025)" url="https://impactco2.fr" calculation="193 kg de cycle de vie dont ~95 % à la fabrication ; 800 kg de matières extraites ; 2→4 ans d'usage ≈ −50 % d'impact" />.
                                Allonger sa durée de vie de 2 à 4 ans réduit son impact environnemental d'environ 50 % (ADEME 2026).
                            </p>
                        </div>
                        <Button variant="secondary" size="lg" className="w-full md:w-auto" onClick={() => router.push('/agir')}>
                            Découvrir plus d'actions
                        </Button>
                    </div>
                </Card>
            </div>

            <div className="mt-12 text-center text-muted-foreground text-sm">
                Ce guide est conçu pour être lu à l'écran ou imprimé en mode économie d'encre.
            </div>
        </div>
    )
}

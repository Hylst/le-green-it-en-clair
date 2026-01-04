"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Printer, Share2, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const sheets: Record<string, any> = {
  "gestes-quotidiens": {
    title: "7 gestes quotidiens pour un numérique sobre",
    subtitle: "Actions simples à mettre en place dès aujourd'hui",
    target: "Citoyens",
    duration: "5 minutes de lecture",
    impact: "Réduction de 30% de votre empreinte numérique",
    sections: [
      {
        title: "1. Garder ses appareils plus longtemps",
        content:
          "La fabrication représente 75% de l'impact. Garder un smartphone 4 ans au lieu de 2 divise son impact par 2.",
        tips: [
          "Objectif : minimum 5 ans pour un smartphone, 7 ans pour un ordinateur",
          "Changez la batterie plutôt que l'appareil (50-80€)",
          "Utilisez une coque de protection",
        ],
      },
      {
        title: "2. Éteindre complètement la nuit",
        content: "Un appareil en veille consomme encore 5-10W. Sur un an, c'est 40-80 kWh gaspillés.",
        tips: [
          "Éteignez votre box internet la nuit (économie de 65 kWh/an)",
          "Débranchez les chargeurs (ils consomment même sans appareil)",
          "Utilisez une multiprise avec interrupteur",
        ],
      },
      {
        title: "3. Limiter le streaming vidéo HD",
        content: "1h de streaming en 4K = 6,5 Go de données transférées = 370g de CO₂. En 720p : seulement 50g de CO₂.",
        tips: [
          "Privilégiez la qualité standard (720p) plutôt que HD/4K",
          "Téléchargez les contenus regardés plusieurs fois",
          "Désactivez la lecture automatique",
        ],
      },
      {
        title: "4. Nettoyer régulièrement ses données",
        content: "Chaque Go stocké dans le cloud émet 15g de CO₂/an. La moyenne française est de 50 Go inutiles.",
        tips: [
          "Supprimez les emails avec pièces jointes volumineuses",
          "Videz le dossier Téléchargements et la corbeille",
          "Triez vos photos et vidéos en cloud",
        ],
      },
      {
        title: "5. Privilégier le Wi-Fi à la 4G/5G",
        content: "La 4G/5G consomme 20x plus d'énergie que le Wi-Fi pour transférer la même quantité de données.",
        tips: [
          "Activez le Wi-Fi dès que disponible",
          "Désactivez les données mobiles à la maison",
          "Téléchargez les contenus en Wi-Fi avant de partir",
        ],
      },
      {
        title: "6. Régler la luminosité à 50%",
        content: "L'écran représente 30-50% de la consommation d'un smartphone. Réduire la luminosité économise 20%.",
        tips: [
          "Activez l'ajustement automatique",
          "Utilisez le mode sombre (économie de 15% sur écrans OLED)",
          "Activez le mode économie d'énergie",
        ],
      },
      {
        title: "7. Acheter reconditionné",
        content:
          "Un appareil reconditionné a un impact 75% inférieur au neuf. En France, 2,5 millions d'appareils reconditionnés vendus en 2024.",
        tips: [
          "Vérifiez la garantie (minimum 6 mois)",
          "Privilégiez les acteurs certifiés (BackMarket, Recommerce, etc.)",
          "Consultez l'indice de réparabilité avant l'achat",
        ],
      },
    ],
    resources: [
      "Calculateur d'empreinte : /outils#calculateur",
      "Guide du reconditionné : /ressources",
      "Points de collecte : /recyclage",
    ],
  },
  "achat-responsable": {
    title: "Guide d'achat responsable",
    subtitle: "Comment choisir un appareil avec moins d'impact",
    target: "Citoyens",
    duration: "10 minutes de lecture",
    impact: "75% d'économie d'impact vs un appareil neuf",
    image: "/comparison-chart-new-vs-refurbished-vs-repaire.webp",
    date: "5 Mars 2025",
    sections: [
      {
        title: "Évaluer le besoin réel",
        content:
          "80% des fonctionnalités d'un smartphone ne sont jamais utilisées. Définir son besoin évite le suréquipement.",
        tips: [
          "Listez vos usages principaux (appels, navigation, photos...)",
          "Évitez les modèles flagship si vous n'utilisez pas les fonctions avancées",
          "Privilégiez un modèle adapté plutôt que le plus puissant",
        ],
      },
      {
        title: "Prioriser le reconditionné",
        content:
          "Impact réduit de 75%, prix -30 à -70%, garantie légale de conformité. Le marché représente 2,5 milliards € en 2024.",
        tips: [
          "Grade A : comme neuf, très légers défauts esthétiques",
          "Grade B : bon état, quelques rayures visibles",
          "Grade C : état correct, usure visible mais 100% fonctionnel",
        ],
      },
      {
        title: "Vérifier l'indice de réparabilité",
        content:
          "Obligatoire en France depuis 2021. Note sur 10 indiquant la facilité de réparation (disponibilité pièces, documentation, prix).",
        tips: [
          "Visez minimum 7/10 pour un appareil durable",
          "Consultez sur quefaire.fr ou sur l'étiquette en magasin",
          "Critères : démontage, pièces détachées, prix des réparations",
        ],
      },
      {
        title: "Privilégier la durabilité",
        content: "Cherchez des appareils conçus pour durer : batterie remplaçable, mises à jour longues, robustesse.",
        tips: [
          "Fairphone : smartphone modulaire réparable à 100%",
          "Apple : support iOS pendant 5-6 ans",
          "Samsung : 4 ans de mises à jour Android garanties",
        ],
      },
      {
        title: "Comparer l'impact environnemental",
        content: "Certains fabricants communiquent l'empreinte carbone. Un smartphone moyen émet 50-80 kg CO₂.",
        tips: [
          "Cherchez les labels environnementaux (TCO, EPEAT, Blue Angel)",
          "Privilégiez les marques transparentes sur leur chaîne d'approvisionnement",
          "Évitez les emballages excessifs",
        ],
      },
    ],
    resources: [
      "Comparateur d'appareils : /outils",
      "Indice de réparabilité : quefaire.fr",
      "Acteurs du reconditionné : /recyclage",
    ],
  },
  "ecoconception-web": {
    title: "Écoconception web et logicielle",
    subtitle: "Bonnes pratiques pour développeurs responsables",
    target: "Développeurs",
    duration: "15 minutes de lecture",
    impact: "Sites 3-5x plus légers, temps de chargement -60%",
    image: "/clean-efficient-code-on-screen-with-green-energy-s.webp",
    date: "15 Mars 2025",
    sections: [
      {
        title: "Optimiser les algorithmes",
        content: "Un algorithme inefficace peut consommer 100x plus d'énergie. La complexité compte : O(n) vs O(n²).",
        tips: [
          "Utilisez les structures de données adaptées (Map vs Array)",
          "Évitez les boucles imbriquées quand possible",
          "Préférez les méthodes natives (filter, map) aux boucles for",
          "Mettez en cache les résultats coûteux",
        ],
      },
      {
        title: "Choisir les bons langages",
        content: "C consomme 57x moins que Python. Pour le web : Rust, Go, Java, puis Node.js, PHP, Python.",
        tips: [
          "Frontend : JavaScript natif > frameworks lourds",
          "Backend : Rust, Go pour haute performance",
          "Évitez les dépendances npm inutiles (attention au poids)",
        ],
      },
      {
        title: "Minimiser les transferts de données",
        content: "Chaque Mo transféré émet 20g CO₂. Le site web moyen fait 2,5 Mo, l'optimal est < 500 Ko.",
        tips: [
          "Compressez les images (WebP, AVIF plutôt que JPG/PNG)",
          "Minifiez CSS, JS, HTML en production",
          "Activez la compression Gzip/Brotli",
          "Lazy loading pour images et vidéos",
        ],
      },
      {
        title: "Optimiser les médias",
        content: "Les images représentent 50% du poids des pages. Optimisation = gain immédiat.",
        tips: [
          "Format moderne : WebP (-30%), AVIF (-50% vs JPG)",
          "Responsive images avec srcset",
          "Dimensionnez correctement (pas de 4000px pour afficher 400px)",
          "Préférez SVG pour icônes et logos",
        ],
      },
      {
        title: "Utiliser un CDN efficace",
        content: "CDN réduit la distance données-utilisateur et permet la mise en cache distribuée.",
        tips: [
          "Cloudflare, Vercel Edge : datacenters mondiaux",
          "Cache-Control headers optimisés",
          "Invalidation de cache intelligente",
        ],
      },
      {
        title: "Optimiser la base de données",
        content: "Requêtes inefficaces = serveur surchargé = énergie gaspillée.",
        tips: [
          "Indexez les colonnes fréquemment filtrées",
          "Évitez SELECT * : ne récupérez que ce qui est nécessaire",
          "Utilisez la pagination plutôt que tout charger",
          "Mettez en cache les requêtes coûteuses (Redis)",
        ],
      },
      {
        title: "Machine Learning responsable",
        content: "Entraîner GPT-3 émet 500 tonnes CO₂. L'inférence représente 90% de l'impact sur la durée.",
        tips: [
          "Utilisez des modèles pré-entraînés quand possible",
          "Optimisez les hyperparamètres (early stopping)",
          "Quantization des modèles pour réduire la taille",
          "Edge computing : inférence locale plutôt que cloud",
        ],
      },
    ],
    resources: [
      "Checklist développeur : /developpement",
      "Outils de mesure : GreenFrame, EcoIndex",
      "Guides ADEME : ecoresponsable.numerique.gouv.fr",
    ],
  },
}

export default async function SheetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sheet = sheets[id]

  if (!sheet) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Fiche non trouvée</h2>
          <Link href="/fiches-pratiques">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux fiches
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <article className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/fiches-pratiques">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux fiches
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
            </div>
          </div>

          <Card className="mb-8 border-2 border-slate-200 p-8 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex items-center gap-3">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                {sheet.target}
              </Badge>
              <span className="text-sm text-slate-600 dark:text-slate-400">{sheet.duration}</span>
            </div>
            <h1 className="mb-4 text-balance text-3xl font-bold text-slate-900 lg:text-4xl dark:text-slate-100">
              {sheet.title}
            </h1>
            <p className="mb-6 text-pretty text-xl text-slate-600 dark:text-slate-300">{sheet.subtitle}</p>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">Impact : {sheet.impact}</p>
            </div>
          </Card>

          <div className="space-y-8">
            {sheet.sections.map((section: any, index: number) => (
              <Card
                key={index}
                className="border-2 border-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800 print:break-inside-avoid"
              >
                <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
                <p className="mb-4 text-slate-700 dark:text-slate-300">{section.content}</p>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Points clés :</h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip: string, tipIndex: number) => (
                      <li key={tipIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50 p-6 dark:border-blue-800 dark:from-blue-950 dark:to-teal-950">
            <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">Ressources complémentaires</h3>
            <ul className="space-y-2">
              {sheet.resources.map((resource: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {resource.includes("http") ? (
                    <a href={resource} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {resource}
                    </a>
                  ) : resource.includes("/") ? (
                    <Link href={resource.split(" : ")[1]} className="hover:underline">
                      {resource}
                    </Link>
                  ) : (
                    resource
                  )}
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="outline" size="lg" onClick={() => window.print()}>
              <Printer className="mr-2 h-5 w-5" />
              Imprimer cette fiche
            </Button>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-5 w-5" />
              Télécharger en PDF
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="mr-2 h-5 w-5" />
              Partager
            </Button>
          </div>
        </div>
      </article>

      <style jsx global>{`
        @media print {
          nav,
          footer,
          button {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}

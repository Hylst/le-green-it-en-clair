"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { FileText, Download, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const practicalSheets = [
  {
    id: "gestes-quotidiens",
    title: "7 gestes quotidiens pour un numérique sobre",
    description: "Actions simples à mettre en place dès aujourd'hui",
    target: "Citoyens",
    duration: "5 min",
    impact: "Réduire son impact au quotidien",
    image: "/greenit/images/fiches/gestes-quotidiens.webp",
  },
  {
    id: "achat-responsable",
    title: "Guide d'achat responsable",
    description: "Comment choisir un appareil avec moins d'impact",
    target: "Citoyens",
    duration: "10 min",
    impact: "≈ −75 % vs neuf (ADEME, 2022)",
    image: "/greenit/images/fiches/achat-responsable.webp",
  },
  {
    id: "reparer-prolonger",
    title: "Réparer et prolonger la vie de ses appareils",
    description: "Gestes d'entretien et adresses utiles",
    target: "Citoyens",
    duration: "8 min",
    impact: "Doublez la durée de vie",
    image: "/greenit/images/fiches/reparer-prolonger.webp",
  },
  {
    id: "green-it-entreprise",
    title: "Démarche Green IT en entreprise",
    description: "Plan d'action complet pour les organisations",
    target: "Entreprises",
    duration: "20 min",
    impact: "Plan d'action complet",
    image: "/greenit/images/fiches/green-it-entreprise.webp",
  },
  {
    id: "ecoconception-web",
    title: "Écoconception web et logicielle",
    description: "Bonnes pratiques pour les développeurs",
    target: "Développeurs",
    duration: "15 min",
    impact: "Sites 3-5x plus légers",
    image: "/greenit/images/clean-efficient-code-on-screen-with-green-energy-s.webp",
  },
  {
    id: "recyclage-mode-emploi",
    title: "Mode d'emploi du recyclage électronique",
    description: "Où et comment recycler vos appareils",
    target: "Tous publics",
    duration: "5 min",
    impact: "79 % des DEEE recyclés (Ecosystem, 2024)",
    image: "/greenit/images/recycling-electronics.webp",
  },
  {
    id: "datacenters-verts",
    title: "Datacenters et cloud responsable",
    description: "Choisir ses hébergeurs et optimiser",
    target: "Entreprises",
    duration: "12 min",
    impact: "PUE optimisé < 1.3",
    image: "/greenit/images/green-datacenter.webp",
  },
  {
    id: "collectivites-action",
    title: "Plan d'action pour les collectivités",
    description: "Politique numérique responsable territoriale",
    target: "Collectivités",
    duration: "25 min",
    impact: "Exemplarité publique",
    image: "/greenit/images/city-hall-with-sustainable-technology-infrastructu.webp",
  },
  {
    id: "ia-generative",
    title: "IA générative : comprendre et limiter son impact",
    description: "Datacenters, usages, référentiels : l'essentiel pour agir",
    target: "Tous publics",
    duration: "10 min",
    impact: "~485 TWh dans le monde en 2025 (ADEME 2026)",
    image: "/greenit/images/abstract-green-technology-network-with-leaves-and-.webp",
  },
  {
    id: "streaming-video",
    title: "Streaming vidéo et gaming : regarder autrement",
    description: "Qualité, téléchargement, lecture auto : les réglages qui changent tout",
    target: "Citoyens",
    duration: "8 min",
    impact: "60 % du trafic mondial (Shift, 2019)",
    image: "/greenit/images/fiches/fiche-streaming-video.webp",
  },
  {
    id: "teletravail-visio",
    title: "Télétravail et visioconférence sobres",
    description: "Caméra, réseau, matériel : travailler à distance sans alourdir la facture",
    target: "Actifs",
    duration: "8 min",
    impact: "~1 Go/h en visio (CableLabs, 2026)",
    image: "/greenit/images/fiches/fiche-teletravail-visio.webp",
  },
  {
    id: "emails-cloud",
    title: "E-mails, cloud et stockage : alléger sans se priver",
    description: "Pièces jointes, tri, hébergeurs : une messagerie plus légère",
    target: "Tous publics",
    duration: "8 min",
    impact: "4 g à 50 g par e-mail (ADEME)",
    image: "/greenit/images/fiches/fiche-emails-cloud.webp",
  },
  {
    id: "objets-connectes",
    title: "Objets connectés : choisir, sécuriser, faire durer",
    description: "Montres, enceintes, domotique : le connecté utile, sans accumulation",
    target: "Citoyens",
    duration: "8 min",
    impact: "21 Mds d'objets fin 2025 (IoT Analytics)",
    image: "/greenit/images/fiches/fiche-objets-connectes.webp",
  },
  {
    id: "impression-papier",
    title: "Imprimer moins, imprimer mieux",
    description: "Recto-verso, papier recyclé, mutualisation : le bureau sans gaspillage",
    target: "Entreprises",
    duration: "6 min",
    impact: "−50 % de papier en recto-verso",
    image: "/greenit/images/fiches/fiche-impression-papier.webp",
  },
  {
    id: "enfants-ecole",
    title: "Écrans des enfants : des repères pour toute la famille",
    description: "Durées, contenus, premier téléphone : avancer sans culpabiliser",
    target: "Parents",
    duration: "8 min",
    impact: "1h22 à 2h33/jour (SpF, 2025)",
    image: "/greenit/images/fiches/fiche-enfants-ecole.webp",
  },
  {
    id: "box-wifi",
    title: "Box, Wi-Fi et connexion : la sobriété commence à la maison",
    description: "Éteindre, passer en Wi-Fi, choisir : les gestes qui allègent la facture",
    target: "Citoyens",
    duration: "8 min",
    impact: "~80 kWh/an par box (Arcep, 2026)",
    image: "/greenit/images/fiches/fiche-box-wifi.webp",
  },
]

export default function FichesPratiquesPage() {
  return (
    <div className="min-h-screen" data-theme="emerald">
      <PageHero
        theme="emerald"
        badge={{ icon: FileText }}
        title="Fiches pratiques Green IT"
        intro="Consultez et imprimez nos guides pratiques pour mettre en œuvre facilement les bonnes pratiques du numérique responsable."
      />

      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practicalSheets.map((sheet) => (
              <Card
                key={sheet.id}
                className="group overflow-hidden border-2 border-slate-200 transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <Image
                    src={sheet.image || "/greenit/images/fiches/gestes-quotidiens.webp"}
                    alt={`Illustration de ${sheet.title} : ${sheet.description}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-300">
                    {sheet.target}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-balance text-lg font-bold text-slate-900 dark:text-slate-100">
                    {sheet.title}
                  </h3>
                  <p className="mb-4 text-pretty text-sm text-slate-600 dark:text-slate-300">{sheet.description}</p>
                  <div className="mb-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {sheet.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {sheet.impact}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href={`/fiches-pratiques/${sheet.id}`} className="flex-1">
                        <FileText className="mr-2 h-4 w-4" />
                        Consulter
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Imprimer la fiche" onClick={() => window.print()}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="mb-8 text-center text-sm text-muted-foreground">
            Sources : ADEME 2022 (reconditionné −75 %) · ADEME-Arcep 2023 (fabrication ≈ 75 % de l&apos;impact) ·
            Ecosystem 2024 (79 % des DEEE collectés recyclés ou réutilisés) · Uptime 2024 (PUE) · Shift Project 2019
            (vidéo = 60 % des flux) · Arcep 2026 (box, réseaux) · Santé publique France 2025 (écrans des enfants) ·
            IoT Analytics 2025 (21 Mds d&apos;objets) · CableLabs 2026 (visio ~1 Go/h) · Arcep 2026 (box 3,4 TWh,
            9,1 W)
          </p>

          <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 dark:border-emerald-800 dark:from-emerald-950 dark:to-teal-950">
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">Partagez ces ressources</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Ces fiches sont libres de droits. Diffusez-les dans votre entreprise, école ou collectivité pour
                  sensibiliser au numérique responsable.
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="lg" variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-5 w-5" />
                  Imprimer la liste
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

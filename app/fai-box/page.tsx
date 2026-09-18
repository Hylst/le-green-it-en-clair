import { Router } from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { SectionDivider } from "@/components/section-divider"
import { pageOpenGraph } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Choisir son FAI et sa box",
  description:
    "Comprendre le fonctionnement d'une box internet et choisir son fournisseur d'accès avec des critères sobres : juste besoin, réemploi et réglages économes.",
  alternates: { canonical: "https://hylst.fr/greenit/fai-box/" },
  openGraph: pageOpenGraph(
    "Choisir son FAI et sa box | Le Green IT en clair",
    "Comprendre le fonctionnement d'une box internet et choisir son fournisseur d'accès avec des critères sobres.",
    "/fai-box",
  ),
}

export default function FaiBoxPage() {
  return (
    <div data-theme="cyan" className="min-h-screen bg-background transition-colors duration-300">
      <PageHero
        theme="cyan"
        image={{ src: "/greenit/images/box-hero.webp", alt: "Box internet posée sur un meuble du salon, voyants lumineux allumés" }}
        badge={{ icon: Router, label: "Fournisseur d'accès internet" }}
        title="Choisir son FAI et sa box"
        intro="Wifi allumé jour et nuit, téléphonie fixe, parfois décodeur TV : la box fait partie des appareils qui restent branchés le plus longtemps à la maison. Voici comment elle fonctionne et comment choisir une offre adaptée à vos besoins réels."
      />
      <SectionDivider />
      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-poppins mb-6 text-balance text-2xl font-bold text-foreground md:text-3xl">
            Fonctionnement d&apos;une box internet
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              La box est le boîtier fourni par votre fournisseur d&apos;accès à internet (FAI). Elle fait le lien
              entre votre logement et le réseau de l&apos;opérateur, puis distribue la connexion à vos appareils en
              wifi ou par câble Ethernet.
            </p>
            <p>
              Selon la technologie disponible à votre adresse, ce lien passe par la fibre optique, le câble, la
              ligne téléphonique (DSL) ou le réseau mobile. La qualité de la connexion dépend alors de la
              technologie, de la distance et de l&apos;état de la ligne : d&apos;où l&apos;intérêt de vérifier votre
              éligibilité avant de comparer les offres.
            </p>
            <p>
              La box reste branchée en continu dans la plupart des foyers, car elle porte aussi la téléphonie fixe
              et parfois la télévision. Comprendre ce fonctionnement aide à choisir une offre à la mesure de vos
              usages et à adopter les bons réglages, sans surdimensionner l&apos;équipement.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

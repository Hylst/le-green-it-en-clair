import Link from "next/link"
import { Lightbulb, Router } from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { SectionDivider } from "@/components/section-divider"
import { SourceTooltip } from "@/components/source-tooltip"
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
        image={{ src: "/greenit/images/fai-box-hero.webp", alt: "Box internet posée sur un meuble du salon, voyants lumineux allumés" }}
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
      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-poppins mb-6 text-balance text-2xl font-bold text-foreground md:text-3xl">
            Que consomme une box&nbsp;?
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Sur l&apos;ensemble de son cycle de vie, une box émet environ <strong>81 kg de CO₂</strong>
              <SourceTooltip
                className="ml-1"
                source="ADEME, Impact CO₂ (mise à jour 2025)"
                calculation="dont environ 61 kg pour la fabrication, soit près des trois quarts du total"
              />
              , la fabrication concentrant donc l&apos;essentiel de son empreinte carbone. C&apos;est moins
              qu&apos;un ordinateur, mais la box se distingue autrement&nbsp;: elle reste branchée en permanence.
            </p>
            <p>
              Laissée allumée jour et nuit, une box consomme en moyenne <strong>9,1 W en continu, soit environ
              80&nbsp;kWh par an</strong>
              <SourceTooltip
                className="ml-1"
                source="Arcep, Enquête annuelle « Pour un numérique soutenable », 2026"
                calculation="9,1 W × 24 h × 365 jours ÷ 1 000 ≈ 80 kWh/an"
              />
              . Et cette consommation varie très peu&nbsp;: <strong>environ 90&nbsp;% est invariable</strong>
              <SourceTooltip
                className="ml-1"
                source="Arcep, Enquête annuelle « Pour un numérique soutenable », 2026"
                calculation="part invariable, que la box soit sollicitée ou non"
              />
              , que l&apos;on regarde un film ou que tout le monde dorme.
            </p>
            <p>
              À l&apos;échelle du pays, le parc français de box et de décodeurs a consommé{" "}
              <strong>3,4&nbsp;TWh en 2024</strong>
              <SourceTooltip
                className="ml-1"
                source="Arcep, Enquête annuelle « Pour un numérique soutenable », 2026 (données 2024)"
                calculation="consommation du parc français des box internet et décodeurs TV"
              />
              . D&apos;où l&apos;intérêt des petits gestes répétés chaque soir&nbsp;: ils comptent à l&apos;échelle
              du foyer comme à celle du réseau.
            </p>
          </div>
        </div>
      </section>
      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-poppins mb-6 text-balance text-2xl font-bold text-foreground md:text-3xl">
            Quel est son impact sur l&apos;environnement&nbsp;?
          </h2>
          <div className="space-y-8 text-muted-foreground">
            <div>
              <h3 className="font-poppins mb-3 text-xl font-semibold text-foreground">Fabrication</h3>
              <p>
                Comme indiqué plus haut, la fabrication concentre l&apos;essentiel du CO₂ du cycle de vie de la
                box (voir la section consommation). Pour l&apos;eau et les métaux mobilisés par la production,
                nous n&apos;avons pas trouvé de facteur officiel par appareil&nbsp;: aucun chiffre n&apos;est
                affiché ici en attendant une source vérifiée.
              </p>
            </div>
            <div>
              <h3 className="font-poppins mb-3 text-xl font-semibold text-foreground">Utilisation</h3>
              <p>
                Une fois installée, la box consomme de l&apos;électricité en continu, y compris quand personne
                ne l&apos;utilise. Réduire son temps sous tension reste donc le levier le plus direct à la
                maison, sans changer d&apos;équipement.
              </p>
            </div>
            <div>
              <h3 className="font-poppins mb-3 text-xl font-semibold text-foreground">Fin de vie</h3>
              <p>
                En fin d&apos;offre, la box repart en général chez l&apos;opérateur, qui la teste pour la
                remettre en circulation. Si elle n&apos;est plus réemployable, elle rejoint la filière des
                déchets d&apos;équipements électriques et électroniques. La{" "}
                <Link
                  href="/recyclage"
                  className="font-medium text-theme-ink underline underline-offset-4 hover:opacity-80"
                >
                  page recyclage
                </Link>{" "}
                explique où déposer ce type d&apos;appareil et comment se passe la collecte.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-poppins mb-6 text-balance text-2xl font-bold text-foreground md:text-3xl">
            Comment réduire l&apos;impact de sa box&nbsp;?
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Pas besoin de se priver ni de tout changer&nbsp;: quelques réglages suffisent pour alléger la
              consommation de la box au quotidien.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-theme-ink" aria-hidden="true">
                  •
                </span>
                <span>
                  <strong>Éteindre la box la nuit.</strong> Huit heures d&apos;extinction par jour économisent
                  environ un tiers de sa consommation annuelle
                  <SourceTooltip
                    className="ml-1"
                    source="Arcep, Enquête annuelle « Pour un numérique soutenable », 2024"
                    calculation="8 h sur 24 h ≈ 1/3 de la consommation annuelle"
                  />
                  &nbsp;: une prise à interrupteur ou la programmation automatique rendent le geste simple.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-theme-ink" aria-hidden="true">
                  •
                </span>
                <span>
                  <strong>Choisir sobre.</strong> Box éco-conçue ou reconditionnée quand l&apos;opérateur la
                  propose, débit et options ajustés aux usages réels du foyer&nbsp;: inutile de payer pour du
                  très haut débit si les usages restent modestes.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-theme-ink" aria-hidden="true">
                  •
                </span>
                <span>
                  <strong>Penser au décodeur.</strong> Quand personne ne regarde la télévision, éteindre aussi
                  le décodeur TV prolonge l&apos;économie de la nuit.
                </span>
              </li>
            </ul>
            <div className="rounded-2xl border border-theme bg-theme-soft p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-theme-ink" aria-hidden="true" />
                <div>
                  <h3 className="font-poppins mb-2 font-semibold text-foreground">Le saviez-vous&nbsp;?</h3>
                  <p>
                    Éteindre sa box chaque nuit représente de l&apos;ordre de{" "}
                    <strong>26&nbsp;kWh économisés par an</strong>
                    <SourceTooltip
                      className="ml-1"
                      source="Arcep, Enquête annuelle « Pour un numérique soutenable », 2024"
                      calculation="environ 80 kWh/an × 1/3 ≈ 26 kWh/an"
                    />
                    , sans achat ni travaux&nbsp;: c&apos;est l&apos;un des gestes les plus simples pour
                    alléger la facture et l&apos;empreinte du foyer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

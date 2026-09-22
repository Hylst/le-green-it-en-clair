import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, Heart, Award, Mail, ShieldCheck, Leaf, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical, SITE_EMAIL, mailto } from "@/lib/site"
import { SourceTooltip } from "@/components/source-tooltip"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "À propos",
  alternates: { canonical: canonical("/a-propos") },
  description: "À propos du Green IT en clair : la démarche, les sources et la méthode derrière ce site éducatif sur le numérique responsable.",
  openGraph: pageOpenGraph("À propos | Le Green IT en clair", "À propos du Green IT en clair : la démarche, les sources et la méthode derrière ce site éducatif sur le numérique responsable.", "/a-propos"),
}

export default function AProposPage() {
  return (
    <div data-theme="emerald" className="min-h-screen bg-background transition-colors duration-300">
      <PageHero
        theme="emerald"
        image={{ src: "/greenit/images/hero-apropos.webp", alt: "Bureau avec pousse en pot, carnet ouvert et loupe" }}
        badge={{ icon: Leaf }}
        title="À propos du Green IT en clair"
        intro="Un site personnel créé par un passionné soucieux de l'environnement pour sensibiliser aux enjeux du numérique responsable en France."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Une exigence sérieuse sur les données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                Ce site est un projet personnel, mais les chiffres y sont traités avec la rigueur d&apos;un travail
                documentaire : veille continue, contrôle des sources et vérifications avant publication.
              </p>
              <ul className="space-y-1 ml-4">
                <li>• Chaque chiffre affiché porte sa source et son année, avec le calcul détaillé dans son infobulle</li>
                <li>• Les documents primaires (ADEME, Arcep, RTE, rapports officiels) sont lus avant d&apos;être cités</li>
                <li>• Les données non vérifiables ne sont pas publiées ; les estimations sont signalées comme telles</li>
                <li>• Veille et contrôles réguliers : flux RSS suivis, relectures, liens vérifiés</li>
              </ul>
              <p>
                Les études évoluent et une coquille reste possible : en cas de doute, référez-vous aux sources
                citées, et signalez-nous toute erreur à l&apos;adresse ci-dessous — chaque signalement est vérifié.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                La mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ce site est né d'un constat simple : le numérique représente aujourd'hui environ 3,4 % des émissions
                mondiales de gaz à effet de serre, soit 1,8 Gt CO₂e (GreenIT EENM 2025)<SourceTooltip source="GreenIT EENM 2025 ; ADEME-Arcep 2023" calculation="1,8 Gt ÷ ~53 Gt d'émissions mondiales ≈ 3,4 % ; ×3 d'ici 2050 en tendanciel (France)" />. En France, l'empreinte du numérique
                pourrait tripler d'ici 2050 si les tendances se poursuivent (ADEME-Arcep 2023).
              </p>
              <p className="text-muted-foreground">
                La mission de ce projet est de rendre accessible à tous les citoyens, entreprises et collectivités
                françaises les connaissances et outils nécessaires pour réduire l'impact environnemental du numérique.
              </p>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h3 className="font-semibold mb-2 text-primary">Les objectifs</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Sensibiliser aux impacts environnementaux du numérique avec des données sourcées</li>
                  <li>• Proposer des solutions concrètes et actionnables pour tous les publics</li>
                  <li>• Promouvoir l'allongement de la durée de vie des équipements</li>
                  <li>• Faciliter l'accès au recyclage et à la réparation en France</li>
                  <li>• Accompagner la transition vers un numérique plus sobre et responsable</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Valeurs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Les valeurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Pédagogie</h3>
                  <p className="text-sm text-muted-foreground">
                    Vulgariser les concepts complexes avec des analogies, des visualisations et un ton accessible à
                    tous, sans jamais culpabiliser.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Transparence</h3>
                  <p className="text-sm text-muted-foreground">
                    Toutes les données sont sourcées (ADEME, Arcep, RTE, ONU, GreenIT.fr) et les méthodologies de calcul sont
                    expliquées clairement.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Action</h3>
                  <p className="text-sm text-muted-foreground">
                    Privilégier les solutions concrètes et réalisables plutôt que les discours théoriques. Chaque page
                    propose des actions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Optimisme</h3>
                  <p className="text-sm text-muted-foreground">
                    Croire que chaque geste compte et que la transition écologique du numérique est possible avec
                    l'engagement de tous.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auteur */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                L'auteur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ce site est une initiative personnelle créée par <strong>Geoffroy Streit</strong>, concepteur
                développeur d'applications, soucieux des enjeux environnementaux du numérique et convaincu que
                l'information et l'éducation sont les clés du changement.
              </p>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                <h3 className="font-semibold mb-2 text-foreground">Contact</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Pour toute question, suggestion, signalement d'erreur ou proposition de contribution :
                </p>
                <a
                  href={mailto()}
                  className="inline-flex items-center gap-2 text-primary hover:opacity-80 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  {SITE_EMAIL}
                </a>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Sources et partenaires de référence</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Ce projet s'appuie sur les travaux et données de nombreux acteurs français et internationaux de
                  référence :
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    • <strong>ADEME</strong> - Agence de la transition écologique
                  </li>
                  <li>
                    • <strong>Arcep</strong> - Enquête annuelle sur l&apos;empreinte environnementale du numérique
                  </li>
                  <li>
                    • <strong>RTE (éCO2mix)</strong> - Données temps réel du mix électrique français
                  </li>
                  <li>
                    • <strong>GreenIT.fr</strong> - Communauté des acteurs du numérique responsable
                  </li>
                  <li>
                    • <strong>The Shift Project</strong> - Think tank de la transition carbone
                  </li>
                  <li>
                    • <strong>Ecosystem</strong> - Éco-organisme pour le recyclage des DEEE
                  </li>
                  <li>
                    • <strong>Écologic</strong> - Éco-organisme agréé
                  </li>
                  <li>
                    • <strong>Halte à l'Obsolescence Programmée (HOP)</strong>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Méthodologie */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                La méthodologie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les données présentées sur ce site sont issues de sources officielles et scientifiques, principalement
                françaises pour garantir leur pertinence locale. Chaque chiffre est vérifié avant publication et porte
                sa source ; les estimations sont signalées et les données non vérifiables ne sont pas publiées.
              </p>
              <div className="space-y-3">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Sources de données (2026)</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Bases de données ADEME (Base Empreinte, Base Carbone)</li>
                    <li>• Rapports GreenIT.fr et études d'impact</li>
                    <li>• Données Ecosystem et Écologic sur le recyclage</li>
                    <li>• Rapports ONU et IEA sur l'énergie</li>
                    <li>• Études académiques et publications scientifiques</li>
                  </ul>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Calculs d'empreinte carbone</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Les calculateurs utilisent la méthodologie ACV (Analyse du Cycle de Vie) qui prend en compte :
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• L'extraction des matières premières</li>
                    <li>• La fabrication et l'assemblage</li>
                    <li>• Le transport et la distribution</li>
                    <li>• L'utilisation (consommation électrique)</li>
                    <li>• La fin de vie (recyclage ou mise en décharge)</li>
                  </ul>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Mise à jour des données</h3>
                  <p className="text-sm text-muted-foreground">
                    Les données sont mises à jour régulièrement pour refléter les dernières études et évolutions
                    technologiques. Dernière mise à jour : <strong>Septembre 2026</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Éco-conception */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-primary" />
                Un site qui applique ce qu&apos;il raconte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Parler de sobriété numérique avec un site lourd et truffé de traceurs n&apos;aurait aucun sens.
                Ce site est donc éco-conçu, avec des choix techniques simples et des résultats mesurés :
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 100 % statique : des pages pré-générées, sans serveur applicatif ni base de données à faire tourner en permanence</li>
                <li>• Zéro traceur, zéro cookie, aucune mesure d&apos;audience : votre visite n&apos;alimente aucun profilage</li>
                <li>• Images au format WebP, chargées en différé sauf les visuels principaux, aucune au-delà de 100 Ko<SourceTooltip source="Contrôle interne du site, septembre 2026" calculation="Poids maximal relevé après reconversion : 64 Ko" /></li>
                <li>• JavaScript chargé à la demande : les 8 outils, la carte et les graphiques ne pèsent que si vous les utilisez. Résultat mesuré : environ 400 Ko de moins (-32 %) au chargement initial des pages de contenu<SourceTooltip source="Mesures internes du site, septembre 2026" calculation="JavaScript initial : 1 247 Ko avant contre 837 Ko après sur /chiffres (de -381 à -410 Ko sur 6 pages)" url={canonical("/modeles")} urlLabel="Voir la page modèles" /></li>
                <li>• Contenu lisible sans JavaScript, thème sombre par défaut, page consultable hors-ligne</li>
              </ul>
              <p className="text-muted-foreground">
                Ce site consomme lui aussi de l&apos;énergie à chaque visite : l&apos;objectif n&apos;est pas la
                pureté, mais de réduire ce coût en continu, chiffres à l&apos;appui.
              </p>
            </CardContent>
          </Card>

          {/* Contribuer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Contribuer au projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ce projet est ouvert aux contributions. Vous pouvez aider de plusieurs façons :
              </p>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Partager le site autour de vous pour sensibiliser</li>
                  <li>• Signaler des erreurs, données obsolètes ou inexactitudes</li>
                  <li>• Proposer de nouveaux contenus ou ressources pertinentes</li>
                  <li>• Suggérer des améliorations de l'expérience utilisateur</li>
                  <li>• Organiser des ateliers de sensibilisation en utilisant ces ressources</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <a href={mailto()}>
                    <Mail className="w-4 h-4 mr-2" />
                    Me contacter
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={mailto("Signalement d'erreur")}>Signaler une erreur</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mentions légales */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">Le Green IT en clair • Projet personnel de Geoffroy Streit • {new Date().getFullYear()}</p>
            <p>
              Ce site est conçu selon les principes du Green IT (optimisation des
              ressources, accessibilité, sobriété numérique).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

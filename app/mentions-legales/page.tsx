import { FileText, Shield, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "https://hylst.fr/greenit/mentions-legales" },
  description: "Mentions légales du site Le Green IT en clair.",
  openGraph: pageOpenGraph("Mentions légales | Le Green IT en clair", "Mentions légales du site Le Green IT en clair.", "/mentions-legales"),
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 px-6 py-16 lg:py-24 dark:from-background dark:via-secondary dark:to-background">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
            <Shield className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Mentions légales
          </h1>
          <p className="text-pretty text-lg text-muted-foreground lg:text-xl">
            Informations légales et crédits du site Le Green IT en clair
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <Card className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-foreground">Éditeur du site</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Nom :</strong> Geoffroy Streit
              </p>
              <p>
                <strong className="text-foreground">Nature :</strong> Site personnel à caractère éducatif et informatif
              </p>
              <p>
                <strong className="text-foreground">Email :</strong>{" "}
                <a href="mailto:geoffroy.streit@gmail.com" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
                  geoffroy.streit@gmail.com
                </a>
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-foreground">Hébergement</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Hébergeur :</strong> Hostinger International Ltd., coordonnées sur{" "}
                <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
                  hostinger.fr
                </a>
              </p>
              <p>
                <strong className="text-foreground">Serveur :</strong> VPS géré via Coolify (Docker)
              </p>
              <p>
                <strong className="text-foreground">URL :</strong> hylst.fr/greenit
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-foreground">Données personnelles et cookies</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Cookies :</strong> ce site n'utilise aucun cookie. Pas de publicité, pas de mesure d'audience, pas de traceurs.
              </p>
              <p>
                <strong className="text-foreground">Stockage local :</strong> votre préférence de thème (clair/sombre) est conservée dans le stockage local de votre navigateur (clé <code>greenIT-theme</code>), ainsi que votre choix d'animations réduites (clé <code>greenit-motion</code>, interrupteur en pied de page). Elles ne quittent jamais votre appareil et peuvent être effacées en vidant les données du site.
              </p>
              <p>
                <strong className="text-foreground">Quiz :</strong> le quiz conserve dans votre navigateur (clé <code>greenit-quiz-session-v1</code>) votre session en cours et vos derniers résultats, pour vous permettre de reprendre et de revoir vos erreurs. Ces données ne quittent jamais votre appareil.
              </p>
              <p>
                <strong className="text-foreground">Outils :</strong> les outils conservent vos saisies et résultats dans votre navigateur pour l&apos;historique local et l&apos;export/import : sobriété (clé <code>greenit-sobriety-v1</code>), analyse de site (clé <code>greenit-website-carbon-v1</code>), audit de parc (clé <code>greenit-audit-parc-v1</code>), listes de contrôle du blog (clé <code>greenit-blog-audit-checklist-v1</code>). Ces données ne quittent jamais votre appareil.
              </p>
              <p>
                <strong className="text-foreground">Hors-ligne :</strong> le site peut mettre en cache des pages et images sur votre appareil (service worker) pour fonctionner sans connexion. Même chose : tout reste chez vous.
              </p>
              <p>
                <strong className="text-foreground">Cartes :</strong> les pages avec carte (Chiffres, Recyclage) chargent des fonds de carte depuis les serveurs d'OpenStreetMap. Votre adresse IP leur est donc transmise, comme pour n'importe quel site qui affiche du contenu tiers. Pas de compte, pas de suivi de notre côté.
              </p>
              <p>
                <strong className="text-foreground">Données temps réel :</strong> les pages Chiffres et Datacenters affichent, à la demande, l'intensité carbone et le mix électrique de production en France (RTE éCO2mix via la plateforme ODRE / Open Data Réseaux Énergies, licence ouverte). Les données sont rafraîchies toutes les 10 minutes et mises en cache dans votre navigateur (clé <code>greenit-eco2mix-cache-v1</code>) ; en cas d'indisponibilité de l'API, un relevé de référence daté du 16/09/2026 est affiché. Votre adresse IP est transmise à l'API ODRE. Aucune donnée n'est envoyée à un autre tiers.
              </p>
              <p>
                <strong className="text-foreground">Hébergement vert :</strong> l&apos;outil d&apos;analyse de site interroge, à la demande, l&apos;interface publique de la Green Web Foundation avec le nom de domaine que vous saisissez, pour vérifier si l&apos;hébergement est vert. Votre adresse IP lui est donc transmise. Rien d&apos;autre.
              </p>
              <p>
                <strong className="text-foreground">Vidéos :</strong> la page Ressources affiche les affiches des vidéos Canal-U (serveurs de Canal-U / UVED) : votre adresse IP leur est transmise dès le chargement de la page. La vidéo distante elle-même ne charge que si vous cliquez sur lecture.
              </p>
              <p>
                <strong className="text-foreground">Veille RSS :</strong> l'onglet Veille de la page Dossiers et veille (/actualites) affiche, à la demande, les titres des flux de plusieurs médias et organismes. Les flux qui l'autorisent sont lus directement ; les autres passent par le service tiers rss2json.com, auquel votre adresse IP est transmise. Seuls titre, date et lien sont affichés, le contenu reste hébergé chez la source. Votre sélection de flux est mémorisée localement (clé <code>greenit-selected-feeds-v1</code>) et les titres récupérés sont conservés 15 minutes dans la session de votre navigateur (clés <code>greenit-rss-cache-*</code>, supprimées à la fermeture de l'onglet) pour limiter les requêtes : rien ne quitte jamais votre appareil.
              </p>
              <p>
                <strong className="text-foreground">Polices et mesures :</strong> les polices sont hébergées avec le site (aucun appel à Google Fonts) et il n'y a aucun outil d'analyse d'audience.
              </p>
              <p>
                <strong className="text-foreground">Contact :</strong> si vous m'écrivez à geoffroy.streit@gmail.com, votre message sert juste à vous répondre. Rien d'autre.
              </p>
              <p>
                <strong className="text-foreground">Conformité RGPD :</strong> aucune donnée personnelle n'étant collectée ni suivie, ce site est conforme au RGPD par défaut.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-foreground">Propriété intellectuelle</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Textes et visuels du site :</strong> les contenus créés pour ce site peuvent être réutilisés avec citation de la source, pour un usage non commercial. Les contenus tiers (titres des flux RSS, vidéos embarquées, données des sources citées) restent soumis à leurs propres conditions.
              </p>
              <p>
                <strong className="text-foreground">Illustrations et mises en pages :</strong> elles ont été créées avec l'assistance d'outils d'intelligence artificielle générative (IA). Elles sont utilisées dans un cadre personnel et éducatif non commercial.
              </p>
              <p>
                <strong className="text-foreground">Code source :</strong> Le code source du site est public sur{" "}
                <a href="https://github.com/Hylst/le-green-it-en-clair" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
                  GitHub
                </a>
                . Il est consultable à des fins éducatives.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-foreground">Sources et crédits</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Les données et informations présentées sur ce site proviennent de sources officielles publiques :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">ADEME</strong> - Agence de la transition écologique
                </li>
                <li>
                  <strong className="text-foreground">GreenIT.fr</strong> - Communauté des acteurs du numérique responsable
                </li>
                <li>
                  <strong className="text-foreground">Arcep</strong> - Enquête annuelle sur l&apos;empreinte environnementale du numérique
                </li>
                <li>
                  <strong className="text-foreground">RTE (éCO2mix)</strong> - Données temps réel du mix électrique français
                </li>
                <li>
                  <strong className="text-foreground">ONU</strong> - Global E-Waste Monitor
                </li>
                <li>
                  <strong className="text-foreground">Ecosystem et Écologic</strong> - Éco-organismes français
                </li>
              </ul>
              <p className="mt-4">
                <strong className="text-foreground">Avertissement :</strong> Ce site est un projet personnel en développement. Les informations peuvent comporter des erreurs ou inexactitudes. En cas de doute, référez-vous aux sources officielles citées.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-foreground">Responsabilité</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                L'éditeur du site s'efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour des contenus.
              </p>
              <p>
                Les liens vers des sites externes sont fournis à titre informatif. L'éditeur n'a aucun contrôle sur leur contenu et décline toute responsabilité quant aux informations qui y figurent.
              </p>
            </div>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Pour toute question ou signalement d'erreur
            </p>
            <Link href="/a-propos">
              <span className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium underline">
                Me contacter
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Target, Users, Heart, Award, Mail, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-green-900 mb-4 text-balance">
              À propos du Green IT en clair
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-pretty">
              Un site personnel créé par un passionné soucieux de l'environnement pour sensibiliser aux enjeux du
              numérique responsable en France.
            </p>
          </div>

          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Avertissement important
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-amber-900">
              <p className="font-semibold">
                Ce site est un projet personnel en cours de développement, créé par un passionné et non par une
                entreprise ou organisation officielle.
              </p>
              <div className="space-y-2">
                <p>Les informations présentées sont fournies à titre éducatif et peuvent comporter :</p>
                <ul className="space-y-1 ml-4">
                  <li>• Des données changeantes et évolutives selon les nouvelles études</li>
                  <li>• Des possibilités d'erreurs humaines ou d'interprétation</li>
                  <li>• Des biais d'analyse ou d'interprétation des sources</li>
                  <li>• Des erreurs générées par l'assistance d'outils d'intelligence artificielle</li>
                  <li>• Des contenus en cours de révision et d'amélioration continue</li>
                </ul>
              </div>
              <p>
                Nous nous efforçons de maintenir les informations à jour et exactes, mais nous ne pouvons garantir
                l'exhaustivité ou l'exactitude absolue de toutes les données. En cas de doute, référez-vous toujours aux
                sources officielles citées (ADEME, GreenIT.fr, etc.).
              </p>
              <p className="font-semibold">
                N'hésitez pas à signaler toute erreur ou inexactitude à l'adresse email ci-dessous.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                La mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Ce site est né d'un constat simple : le numérique représente aujourd'hui 4% des émissions mondiales de
                gaz à effet de serre, et ce chiffre pourrait doubler d'ici 2030 si nous ne changeons pas nos habitudes.
              </p>
              <p className="text-gray-700">
                La mission de ce projet est de rendre accessible à tous les citoyens, entreprises et collectivités
                françaises les connaissances et outils nécessaires pour réduire l'impact environnemental du numérique.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-2">Les objectifs</h3>
                <ul className="space-y-2 text-sm text-gray-700">
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
                <Heart className="w-5 h-5 text-green-600" />
                Les valeurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-700">Pédagogie</h3>
                  <p className="text-sm text-gray-700">
                    Vulgariser les concepts complexes avec des analogies, des visualisations et un ton accessible à
                    tous, sans jamais culpabiliser.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-700">Transparence</h3>
                  <p className="text-sm text-gray-700">
                    Toutes les données sont sourcées (ADEME, ONU, GreenIT.fr) et les méthodologies de calcul sont
                    expliquées clairement.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-700">Action</h3>
                  <p className="text-sm text-gray-700">
                    Privilégier les solutions concrètes et réalisables plutôt que les discours théoriques. Chaque page
                    propose des actions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-700">Optimisme</h3>
                  <p className="text-sm text-gray-700">
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
                <Users className="w-5 h-5 text-green-600" />
                L'auteur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Ce site est une initiative personnelle créée par <strong>Geoffroy Streit</strong>, concepteur
                développeur d'applications, passionné par les enjeux environnementaux du numérique et convaincu que
                l'information et l'éducation sont les clés du changement.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Pour toute question, suggestion, signalement d'erreur ou proposition de contribution :
                </p>
                <a
                  href="mailto:geoffroy.streit@gmail.com"
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  geoffroy.streit@gmail.com
                </a>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Sources et partenaires de référence</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Ce projet s'appuie sur les travaux et données de nombreux acteurs français et internationaux de
                  référence :
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    • <strong>ADEME</strong> - Agence de la transition écologique
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
                <Award className="w-5 h-5 text-green-600" />
                La méthodologie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Les données présentées sur ce site sont issues de sources officielles et scientifiques, principalement
                françaises pour garantir leur pertinence locale. Cependant, comme indiqué dans l'avertissement
                ci-dessus, des erreurs d'interprétation ou d'actualisation peuvent survenir.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Sources de données (2025)</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Bases de données ADEME (Base Empreinte, Base Carbone)</li>
                    <li>• Rapports GreenIT.fr et études d'impact</li>
                    <li>• Données Ecosystem et Écologic sur le recyclage</li>
                    <li>• Rapports ONU et IEA sur l'énergie</li>
                    <li>• Études académiques et publications scientifiques</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Calculs d'empreinte carbone</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Les calculateurs utilisent la méthodologie ACV (Analyse du Cycle de Vie) qui prend en compte :
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• L'extraction des matières premières</li>
                    <li>• La fabrication et l'assemblage</li>
                    <li>• Le transport et la distribution</li>
                    <li>• L'utilisation (consommation électrique)</li>
                    <li>• La fin de vie (recyclage ou mise en décharge)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Mise à jour des données</h3>
                  <p className="text-sm text-gray-700">
                    Les données sont mises à jour régulièrement pour refléter les dernières études et évolutions
                    technologiques. Dernière mise à jour : <strong>Janvier 2025</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contribuer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                Contribuer au projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Ce projet est ouvert aux contributions. Vous pouvez aider de plusieurs façons :
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Partager le site autour de vous pour sensibiliser</li>
                  <li>• Signaler des erreurs, données obsolètes ou inexactitudes</li>
                  <li>• Proposer de nouveaux contenus ou ressources pertinentes</li>
                  <li>• Suggérer des améliorations de l'expérience utilisateur</li>
                  <li>• Organiser des ateliers de sensibilisation en utilisant ces ressources</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <a href="mailto:geoffroy.streit@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Nous contacter
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href="mailto:geoffroy.streit@gmail.com?subject=Signalement d'erreur">Signaler une erreur</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mentions légales */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p className="mb-2">Le Green IT en clair • Projet personnel de Geoffroy Streit • 2025</p>
            <p>
              Ce site est hébergé de manière éco-responsable et conçu selon les principes du Green IT (optimisation des
              ressources, accessibilité, sobriété numérique).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

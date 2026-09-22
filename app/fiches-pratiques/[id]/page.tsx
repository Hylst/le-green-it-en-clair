import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/metadata"
import { canonical } from "@/lib/site"
import { SheetContent } from "@/components/sheet-content"
import { Acronym } from "@/components/acronym"

const sheets: Record<string, any> = {
  "gestes-quotidiens": {
    title: "7 gestes quotidiens pour un numérique sobre",
    subtitle: "Actions simples à mettre en place dès aujourd'hui",
    target: "Citoyens",
    duration: "5 minutes de lecture",
    impact: "Réduire votre empreinte numérique",
    sections: [
      {
        title: "1. Garder ses appareils plus longtemps",
        content:
          "La fabrication concentre environ 75 % des impacts tous indicateurs et ~99 % de l'empreinte carbone (ADEME-Arcep 2023 ; ADEME, Impact CO₂ 2025). Garder un smartphone 4 ans au lieu de 2 divise son impact annuel par 2.",
        tips: [
          "Objectif : minimum 5 ans pour un smartphone, 7 ans pour un ordinateur",
          "Changez la batterie plutôt que l'appareil (50-80€)",
          "Utilisez une coque de protection",
        ],
      },
      {
        title: "2. Éteindre complètement la nuit",
        content: "Un appareil en veille consomme encore 5-10 W, soit 44-88 kWh par an (calcul : 5-10 W × 8 760 h).",
        tips: [
          "Éteignez votre box internet la nuit (économie de ~26 kWh/an)",
          "Débranchez les chargeurs (ils consomment même sans appareil)",
          "Utilisez une multiprise avec interrupteur",
        ],
      },
      {
        title: "3. Limiter le streaming vidéo HD",
        content: "1h de streaming en 4K transfère environ 7 Go et émet plusieurs centaines de grammes de CO₂ selon le mix électrique. En 720p, l'impact est nettement plus faible.",
        tips: [
          "Privilégiez la qualité standard (720p) plutôt que HD/4K",
          "Téléchargez les contenus regardés plusieurs fois",
          "Désactivez la lecture automatique",
        ],
      },
      {
        title: "4. Nettoyer régulièrement ses données",
        content:
          "Bonne nouvelle : le stockage pèse très peu. Stocker 1 Go dans le cloud pendant un an émet environ 0,24 g de CO₂e (ADEME, Impact CO₂ / Base Empreinte). Nettoyer ses données reste utile pour y voir plus clair, mais le geste qui compte vraiment, c'est de garder vos appareils le plus longtemps possible (environ 80 kg de CO₂e pour le cycle de vie d'un smartphone, ADEME, Impact CO₂ 2025).",
        tips: [
          "Supprimez les emails avec pièces jointes volumineuses",
          "Videz le dossier Téléchargements et la corbeille",
          "Triez vos photos et vidéos en cloud",
        ],
      },
      {
        title: "5. Privilégier le Wi-Fi à la 4G/5G",
        content: "La 4G/5G consomme environ 4 à 5 fois plus d'énergie que le Wi-Fi en streaming, pour la même quantité de données.",
        tips: [
          "Activez le Wi-Fi dès que disponible",
          "Désactivez les données mobiles à la maison",
          "Téléchargez les contenus en Wi-Fi avant de partir",
        ],
      },
      {
        title: "6. Régler la luminosité à 50 %",
        content: "L'écran représente 30-50 % de la consommation d'un smartphone. Réduire la luminosité économise 20 %.",
        tips: [
          "Activez l'ajustement automatique",
          "Utilisez le mode sombre (3 à 9 % en usage courant, jusqu'à ~47 % à pleine luminosité sur OLED, Purdue 2021)",
          "Activez le mode économie d'énergie",
        ],
      },
      {
        title: "7. Acheter reconditionné",
        content:
          "Un appareil reconditionné a un impact environ 75 à 90 % inférieur au neuf (ADEME 2022).",
        tips: [
          "Vérifiez la garantie légale (2 ans, défauts présumés pendant 24 mois)",
          "Privilégiez les acteurs certifiés (BackMarket, Recommerce, etc.)",
          "Consultez l'indice de réparabilité avant l'achat",
        ],
      },
    ],
    resources: [
      "Calculateur d'empreinte : /outils#onglet-calculator",
      "Guide du reconditionné : /ressources",
      "Points de collecte : /recyclage",
    ],
    sources: [
      "ADEME, Impact CO₂ / Base Empreinte",
      "ADEME 2022 (reconditionné)",
      "ADEME, guide téléphone durable (2026)",
      "Arcep 2026 (box)",
      "Kamiya 2020, Shift 2019 (streaming, Wi-Fi)",
    ],
    sourceLinks: [
      { label: "ADEME, Impact CO₂ / Base Empreinte", url: "https://impactco2.fr" },
      {
        label: "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026",
        url: "https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/impact-environnemental/enquete-annuelle-pour-un-numerique-soutenable-edition-2026.html",
      },
      {
        label: "ADEME, impacts du reconditionné (étude 2022)",
        url: "https://librairie.ademe.fr/economie-circulaire-et-dechets/5241-evaluation-de-l-impact-environnemental-d-un-ensemble-de-produits-reconditionnes.html",
      },
      {
        label: "ADEME, guide téléphone durable (2026)",
        url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/prolonger-vie-telephone-portable",
      },
    ],
  },
  "achat-responsable": {
    title: "Guide d'achat responsable",
    subtitle: "Comment choisir un appareil avec moins d'impact",
    target: "Citoyens",
    duration: "12 minutes de lecture",
    impact: "−75 à −90 % d'impact vs un appareil neuf (ADEME 2022)",
    date: "5 Mars 2026",
    sections: [
      {
        title: "Évaluer le besoin réel",
        content:
          "De nombreuses fonctionnalités d'un smartphone restent inutilisées. Définir son besoin évite le suréquipement.",
        tips: [
          "Listez vos usages principaux (appels, navigation, photos...)",
          "Évitez les modèles flagship si vous n'utilisez pas les fonctions avancées",
          "Privilégiez un modèle adapté plutôt que le plus puissant",
        ],
      },
      {
        title: "Prioriser le reconditionné",
        content:
          "Impact réduit d'environ 75 à 90 % (ADEME 2022), prix −30 à −70 % selon le modèle, garantie légale de conformité (2 ans).",
        tips: [
          "Grade A : comme neuf, très légers défauts esthétiques",
          "Grade B : bon état, quelques rayures visibles",
          "Grade C : état correct, usure visible mais 100 % fonctionnel",
        ],
      },
      {
        title: "Vérifier l'indice de réparabilité",
        content:
          "Obligatoire en France depuis 2021. Note sur 10 indiquant la facilité de réparation (disponibilité pièces, documentation, prix).",
        tips: [
          "Visez minimum 7/10 pour un appareil durable",
          "Consultez sur quefairedemesdechets.ademe.fr ou sur l'étiquette en magasin",
          "Critères : démontage, pièces détachées, prix des réparations",
        ],
      },
      {
        title: "Privilégier la durabilité",
        content:
          "Cherchez des appareils conçus pour durer : batterie remplaçable, mises à jour longues, robustesse. Depuis 2025, l'indice de durabilité complète l'indice de réparabilité sur les téléviseurs (janvier) puis les lave-linge (avril) : même logique, critères élargis à la fiabilité et à l'évolutivité.",
        tips: [
          "Fairphone : smartphone modulaire et réparable (indice de réparabilité élevé)",
          "Apple : support iOS pendant 5 à 7 ans selon les modèles",
          "Samsung : jusqu'à 7 ans de mises à jour sur les modèles récents",
        ],
      },
      {
        title: "Comparer l'impact environnemental",
        content: "Certains fabricants communiquent l'empreinte carbone. Un smartphone récent émet de l'ordre de 80 kg CO₂e sur son cycle de vie, dont ~99 % pour la fabrication (ADEME, Impact CO₂ 2025).",
        tips: [
          "Cherchez les labels environnementaux (TCO, EPEAT, Blue Angel)",
          "Privilégiez les marques transparentes sur leur chaîne d'approvisionnement",
          "Évitez les emballages excessifs",
        ],
      },
      {
        title: "Acheter en connaissance de cause : garantie, bonus, seconde main",
        content:
          "La garantie légale de conformité dure 2 ans, et depuis le 31 juillet 2026 une réparation sous garantie la prolonge de 12 mois (directive européenne 2024/1799) : gardez vos factures. Si la panne arrive hors garantie, le bonus réparation déduit 10 à 65 € de la facture chez un réparateur labellisé (25 € pour un smartphone). Et pour les petits budgets, la seconde main entre particuliers complète le reconditionné professionnel.",
        tips: [
          "Gardez factures et preuves d'achat : garantie 2 ans, +12 mois après réparation",
          "Bonus réparation : 10 à 65 € déduits, 25 € pour un smartphone (QualiRépar)",
          "Entre particuliers : testez l'appareil sur place, demandez la facture d'origine",
        ],
      },
    ],
    resources: [
      "Comparateur d'appareils : /outils",
      "Reconditionné ou neuf, le calcul : /blog/reconditionne-vs-neuf-le-calcul",
      "Back Market, le reconditionné à grande échelle (portrait) : /blog/back-market-portrait-reconditionne",
      "Greenwashing : 3 réflexes pour trier les promesses : /blog/greenwashing-numerique-reperes",
      "Indice de réparabilité : https://quefairedemesdechets.ademe.fr",
      "Acteurs du reconditionné : /recyclage",
    ],
    sources: [
      "ADEME 2022 (reconditionné)",
      "ADEME, Impact CO₂ (mise à jour 2025)",
      "Loi AGEC 2020",
      "Règlement UE 2023/1670",
      "Code de la consommation (garantie 2 ans)",
    ],
    sourceLinks: [
      { label: "ADEME, Impact CO₂ (mise à jour 2025)", url: "https://impactco2.fr" },
      {
        label: "ADEME, impacts du reconditionné (étude 2022)",
        url: "https://librairie.ademe.fr/economie-circulaire-et-dechets/5241-evaluation-de-l-impact-environnemental-d-un-ensemble-de-produits-reconditionnes.html",
      },
      { label: "Légifrance : textes officiels (AGEC, garantie légale)", url: "https://www.legifrance.gouv.fr" },
    ],
  },
  "ecoconception-web": {
    title: "Écoconception web et logicielle",
    subtitle: "Bonnes pratiques pour développeurs responsables",
    target: "Développeurs",
    duration: "25 minutes de lecture",
    impact: "Sites 3-5x plus légers, temps de chargement -60 %",
    date: "15 Mars 2026",
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
        content: "C consomme environ 76x moins que Python (Pereira et al. 2017, benchmark précis). Pour le web : Rust, Go, Java, puis Node.js, PHP, Python.",
        tips: [
          "Frontend : JavaScript natif > frameworks lourds",
          "Backend : Rust, Go pour haute performance",
          "Évitez les dépendances npm inutiles (attention au poids)",
        ],
      },
      {
        title: "Minimiser les transferts de données",
        content: "Chaque Mo transféré émet environ 0,1 g CO₂ (SWD v4, mix mondial). Le site web moyen fait 2,5 Mo, l'optimal est < 500 Ko.",
        tips: [
          "Compressez les images (WebP, AVIF plutôt que JPG/PNG)",
          "Minifiez CSS, JS, HTML en production",
          "Activez la compression Gzip/Brotli",
          "Lazy loading pour images et vidéos",
        ],
      },
      {
        title: "Optimiser les médias",
        content: "Les images représentent environ 50 % du poids des pages (HTTP Archive, 2024). Optimisation = gain immédiat.",
        tips: [
          "Format moderne : WebP (~−30 %), AVIF (~−50 % vs JPG), à qualité égale (Google)",
          "Responsive images avec srcset",
          "Dimensionnez correctement (pas de 4 000 px pour afficher 400 px)",
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
        content: "Entraîner GPT-3 émet 552 tonnes CO₂ (Patterson et al., 2021). L'inférence domine l'impact sur la durée (ordre de grandeur : ~90 %).",
        tips: [
          "Utilisez des modèles pré-entraînés quand possible",
          "Optimisez les hyperparamètres (early stopping)",
          "Quantization des modèles pour réduire la taille",
          "Edge computing : inférence locale plutôt que cloud",
        ],
      },
    ],
    resources: [
      "Le RGESN en 10 minutes : /blog/rgesn-ecoconception-10-minutes",
      "Checklist développeur : /developpement",
      "Outils de mesure : GreenFrame, EcoIndex",
      "Guides ADEME : https://ecoresponsable.numerique.gouv.fr",
    ],
    sources: [
      "Pereira et al. 2017 (langages)",
      "Sustainable Web Design v4 2024 (transfert)",
      "Patterson et al. 2021 (GPT-3)",
      "HTTP Archive 2024",
      "RGESN, GR491",
    ],
    sourceLinks: [{ label: "GR491, référentiel d'écoconception (INR)", url: "https://gr491.isit-europe.org" }],
  },
  "reparer-prolonger": {
    title: "Réparer et prolonger la vie de ses appareils",
    subtitle: "Gestes d'entretien et adresses utiles pour faire durer son matériel",
    target: "Citoyens",
    duration: "8 minutes de lecture",
    impact: "Réduction de 50 % de l'impact écologique annuel",
    date: "20 Mars 2026",
    sections: [
      {
        title: "1. Pourquoi réparer plutôt que changer ?",
        content:
          "La fabrication concentre 75 à 80 % de l'impact environnemental d'un smartphone ou d'un ordinateur. Prolonger leur durée de vie est le geste écologique n°1.",
        tips: [
          "Doubler la durée de vie divise l'impact par 2",
          "Économie financière importante (réparer coûte moins cher que remplacer)",
          (
            <>
              Réduction drastique des déchets électroniques (
              <Acronym
                title="Déchets d'Équipements Électriques et Électroniques : appareils en fin de vie fonctionnant à l'électricité ou avec piles/batteries"
                glossary="deee"
              >
                DEEE
              </Acronym>
              )
            </>
          ),
        ],
      },
      {
        title: "2. L'entretien préventif : la base",
        content: "Un matériel bien entretenu tombe moins souvent en panne et garde ses performances.",
        tips: [
          "Nettoyez ports de charge et grilles de ventilation (bombes air sec)",
          "Installez une coque et une protection d'écran de qualité",
          "Ne bouchez pas les aérations de votre ordinateur",
        ],
      },
      {
        title: "3. Préserver sa batterie",
        content: "La batterie est le composant d'usure principal. Quelques réflexes simples prolongent sa chimie.",
        tips: [
          "Maintenez la charge entre 20 % et 80 % le plus souvent possible",
          "Évitez les températures extrêmes (froid gel ou plein soleil)",
          "Privilégiez la charge lente (5W-10W) la nuit plutôt que la charge rapide",
        ],
      },
      {
        title: "4. Nettoyage logiciel",
        content: "Un appareil lent n'est pas forcément mort. Un bon nettoyage peut lui redonner une seconde jeunesse.",
        tips: [
          "Désinstallez les applications non utilisées",
          "Videz le cache et les fichiers temporaires",
          "Réinitialisez l'appareil (sauvegardez vos données avant !) si les lenteurs persistent",
        ],
      },
      {
        title: "5. Oser réparer soi-même",
        content: "Changer une batterie ou un écran est souvent accessible avec un peu de patience et les bons outils.",
        tips: [
          "Consultez les tutoriels pas à pas sur iFixit.com",
          "Utilisez des kits d'outils adaptés (tournevis précision, ventouse)",
          "Organisez votre plan de travail (vis minuscules !)",
        ],
      },
      {
        title: "6. Faire appel aux experts",
        content: "Si la réparation vous semble trop complexe, de nombreuses solutions existent.",
        tips: [
          "Les Repair Cafés : réparer gratuitement et apprendre avec des bénévoles",
          "Le label 'Répar'Acteurs' pour trouver un artisan de confiance",
          (
            <>
              Le Bonus Réparation : aide financée par la filière{" "}
              <Acronym
                title="Responsabilité Élargie du Producteur : les fabricants financent la collecte et le traitement de la fin de vie de leurs produits"
                glossary="rep"
              >
                REP
              </Acronym>
              , déduite directement de la facture
            </>
          ),
        ],
      },
    ],
    resources: [
      "Tutoriels : https://www.ifixit.com",
      "Un an avec un smartphone réparable : /blog/un-an-avec-un-smartphone-reparable",
      "Bonus réparation, le mode d'emploi : /blog/bonus-reparation-mode-emploi",
      "Annuaire : https://www.annuaire-reparation.fr",
      "Bonus : https://www.ecosystem.eco",
    ],
    sources: [
      "ADEME, guide téléphone durable (2026)",
      "Ecosystem 2024",
      "iFixit",
      "service-public.gouv.fr 2026 (bonus, garantie)",
    ],
    sourceLinks: [
      { label: "Ecosystem, éco-organisme DEEE", url: "https://www.ecosystem.eco" },
      { label: "iFixit, tutoriels de réparation", url: "https://www.ifixit.com" },
      {
        label: "ADEME, guide téléphone durable (2026)",
        url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/prolonger-vie-telephone-portable",
      },
    ],
  },
  "green-it-entreprise": {
    title: "Démarche Green IT en entreprise",
    subtitle: "Plan d'action complet pour une stratégie numérique responsable",
    target: "Entreprises",
    duration: "20 minutes de lecture",
    impact: "Réduction de l'empreinte carbone IT, variable selon le parc et les leviers",
    date: "25 Mars 2026",
    sections: [
      {
        title: "1. Mesurer pour agir : le diagnostic initial",
        content: "On ne pilote que ce que l'on mesure. Commencez par réaliser un inventaire précis et un bilan carbone de votre parc informatique.",
        tips: [
          "Réalisez un inventaire matériel exhaustif (postes, écrans, serveurs, smartphones)",
          "Calculez l'empreinte carbone via des outils (Greenly, EcoLearn, WeGreenIT)",
          "Identifiez les postes les plus énergivores (souvent le parc utilisateur et le cloud)",
        ],
      },
      {
        title: "2. Une politique d'achats responsables",
        content: "L'impact se joue dès l'achat. Privilégiez le matériel durable, réparable et si possible reconditionné.",
        tips: [
          "Intégrez des critères environnementaux (TCO, EPEAT) dans les appels d'offres",
          "Achetez reconditionné pour les flottes mobiles (impact réduit d'environ 75 à 90 %, ADEME 2022)",
          "Louez plutôt d'achetez pour favoriser l'économie de la fonctionnalité (Device as a Service)",
        ],
      },
      {
        title: "3. Allonger la durée de vie du matériel",
        content: "Passer de 3 à 5 ans d'usage pour un ordinateur professionnel réduit son empreinte annuelle d'environ 30 % (ordre de grandeur ADEME).",
        tips: [
          "Boostez les PC lents (ajout de RAM, passage au SSD) plutôt que de les remplacer",
          "Assurez une maintenance préventive régulière (dépoussiérage des unités centrales)",
          "Gérez un stock tampon pour les réparations internes",
        ],
      },
      {
        title: "4. Sobriété des usages et sensibilisation",
        content: "La technologie n'est rien sans les hommes. Formez vos collaborateurs aux bonnes pratiques.",
        tips: [
          "Organisez des ateliers 'Fresque du Numérique' pour sensibiliser",
          "Encouragez les réunions audio plutôt que vidéo (réduction forte de la consommation, ordre de grandeur)",
          "Mettez en place une politique d'extinction automatique des postes la nuit",
        ],
      },
      {
        title: "5. Rationaliser le Cloud et les données",
        content: "Le stockage et les services cloud sont une source majeure de consommation énergétique invisible.",
        tips: [
          "Définissez des règles de rétention pour les e-mails et fichiers",
          "Favorisez le stockage 'froid' (bande, disque) pour les archives",
          "Éteignez les environnements de test/recette le week-end (FinOps)",
        ],
      },
      {
        title: "6. Gérer la fin de vie (3R)",
        content: "Rien ne doit finir à la poubelle. Visez le Réemploi, la Réutilisation, puis le Recyclage.",
        tips: [
          "Proposez le rachat du matériel aux salariés ou faites des dons à des associations",
          "Travaillez avec des brokers certifiés pour le reconditionnement",
          (
            <>
              Assurez le recyclage aux normes{" "}
              <Acronym
                title="Déchets d'Équipements Électriques et Électroniques : appareils en fin de vie fonctionnant à l'électricité ou avec piles/batteries"
                glossary="deee"
              >
                DEEE
              </Acronym>{" "}
              pour le matériel non récupérable
            </>
          ),
        ],
      },
    ],
    resources: [
      "Mon premier audit Green IT en PME : /blog/premier-audit-green-it-pme",
      "Institut du Numérique Responsable (INR) : https://label-nr.fr",
      "Club Green IT : https://www.greenit.fr",
      "Référentiel GR491 (INR) : https://gr491.isit-europe.org",
    ],
    sources: [
      "ADEME 2022 (-75 % reconditionné)",
      "ADEME, guide téléphone durable (2026)",
      "ADEME, Impact CO₂ (mise à jour 2025)",
      "INR, GR491",
    ],
    sourceLinks: [
      { label: "ADEME, Impact CO₂ (mise à jour 2025)", url: "https://impactco2.fr" },
      { label: "GR491, référentiel d'écoconception (INR)", url: "https://gr491.isit-europe.org" },
      {
        label: "ADEME, guide téléphone durable (2026)",
        url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/prolonger-vie-telephone-portable",
      },
    ],
  },
  "recyclage-mode-emploi": {
    title: "Mode d'emploi du recyclage électronique",
    subtitle: "Où et comment recycler vos appareils en toute responsabilité",
    target: "Tous publics",
    duration: "5 minutes de lecture",
    impact: (
      <>
        Taux de recyclage de 79 % des{" "}
        <Acronym
          title="Déchets d'Équipements Électriques et Électroniques : appareils en fin de vie fonctionnant à l'électricité ou avec piles/batteries"
          glossary="deee"
        >
          DEEE
        </Acronym>{" "}
        collectés
      </>
    ),
    date: "30 Mars 2026",
    sections: [
      {
        title: "1. Pourquoi recycler ses appareils électroniques ?",
        content:
          "Un smartphone contient 70 matériaux différents dont des métaux rares (or, argent, cuivre, terres rares). Le recyclage permet de les récupérer et d'éviter la pollution.",
        tips: [
          "Évite d'extraire de nouvelles matières premières (cuivre, or, terres rares)",
          "Récupère une grande partie des matériaux pour fabriquer de nouveaux produits (~79 % des DEEE collectés sont recyclés ou réutilisés, Ecosystem 2024)",
          "Empêche les substances toxiques (plomb, mercure) de polluer les sols",
        ],
      },
      {
        title: "2. Quels appareils peuvent être recyclés ?",
        content: "Tout équipement électrique ou électronique dispose du logo 'poubelle barrée' et DOIT être recyclé.",
        tips: [
          "Petits appareils : smartphones, tablettes, claviers, souris, câbles",
          "Gros appareils : ordinateurs, écrans, imprimantes, consoles",
          "Même cassés ou hors d'usage, ils sont recyclables !",
        ],
      },
      {
        title: "3. Où déposer vos appareils ?",
        content: "Plusieurs solutions gratuites et légales s'offrent à vous, partout en France.",
        tips: [
          "Déchetteries : toutes acceptent les DEEE gratuitement",
          "Magasins (obligation 1 pour 1) : reprise gratuite à l'achat d'un équivalent",
          "Points de collecte : trouvez le plus proche près de chez vous avec « Que faire de mes objets » de l'ADEME (quefairedemesdechets.ademe.fr)",
        ],
      },
      {
        title: "4. Préparer son appareil avant recyclage",
        content: "Quelques gestes simples pour protéger vos données et faciliter le traitement.",
        tips: [
          "Sauvegardez vos données importantes ailleurs",
          "Réinitialisez l'appareil aux paramètres d'usine (effacement complet)",
          "Retirez la carte SIM et la carte mémoire",
        ],
      },
      {
        title: "5. Le parcours de recyclage",
        content: "Après la collecte, les appareils suivent un processus de valorisation strict et contrôlé.",
        tips: [
          "Tri : séparation par type (écrans, ordinateurs, petits appareils)",
          "Démantèlement : extraction manuelle des composants dangereux",
          "Broyage et séparation : récupération des métaux, plastiques et terres rares",
        ],
      },
      {
        title: "6. Attention aux filières illégales",
        content: "Certains collecteurs peu scrupuleux exportent vers l'Afrique ou l'Asie sans traiter correctement les déchets.",
        tips: [
          "Évitez les collecteurs non certifiés qui proposent de 'racheter' vos vieux appareils",
          "Privilégiez les éco-organismes agréés (Ecosystem, Ecologic)",
          "En cas de doute, déposez en déchetterie municipale",
        ],
      },
    ],
    resources: [
      "Carte des points : https://ecosystem.eco/fr/localiser",
      "Guide ADEME : https://www.ademe.fr",
      "Que faire de mes objets : https://quefairedemesdechets.ademe.fr",
    ],
    sources: [
      "Ecosystem 2024 (79 % recyclés, 91 % valorisés)",
      "Global E-waste Monitor 2024, ONU",
      "Directive DEEE 2012/19/UE",
      "ADEME, Que faire de mes objets",
    ],
    sourceLinks: [
      { label: "Ecosystem, éco-organisme DEEE", url: "https://www.ecosystem.eco" },
      {
        label: "Global E-waste Monitor 2024 (ONU)",
        url: "https://ewastemonitor.info/the-global-e-waste-monitor-2024/",
      },
      { label: "ADEME, Que faire de mes déchets", url: "https://quefairedemesdechets.ademe.fr" },
    ],
  },
  "datacenters-verts": {
    title: "Datacenters et cloud responsable",
    subtitle: "Choisir ses hébergeurs et optimiser ses infrastructures",
    target: "DSI & Développeurs",
    duration: "12 minutes de lecture",
    impact: "Réduire les émissions de votre hébergement",
    date: "5 Avril 2026",
    sections: [
      {
        title: "1. Les 3 critères pour choisir un hébergeur vert",
        content: " Ne vous fiez pas seulement au marketing. Exigez des chiffres précis.",
        tips: [
          (
            <>
              Le{" "}
              <Acronym
                title="Power Usage Effectiveness : efficacité énergétique des datacenters (1,0 = parfait, moyenne mondiale 1,52)"
                glossary="pue"
              >
                PUE
              </Acronym>{" "}
              (Power Usage Effectiveness) : visez un indice inférieur à 1,3 (moyenne mondiale 1,52,
              Uptime 2026)
            </>
          ),
          "Le mix énergétique : privilégiez les énergies renouvelables et bas carbone (France ≈ 50 g CO₂/kWh vs Allemagne ≈ 350 g, EEA/RTE 2024)",
          (
            <>
              Le Water Usage Effectiveness (
              <Acronym
                title="Water Usage Effectiveness : eau consommée pour le refroidissement des datacenters"
                glossary="wue"
              >
                WUE
              </Acronym>
              ) : demandez la consommation d&apos;eau pour le refroidissement
            </>
          ),
        ],
      },
      {
        title: "2. Adapter l'architecture logicielle",
        content: "Un code optimisé consomme moins de ressources serveur.",
        tips: [
          "Privilégiez les architectures Serverless ou FaaS (Function as a Service) pour ne consommer que lors de l'exécution",
          "Adaptez la taille des instances (Right-sizing) à la charge réelle",
          "Utilisez la mise en cache (CDN, Redis) pour limiter les requêtes en base de données",
        ],
      },
      {
        title: "3. La gestion responsable des données",
        content: "Stocker des données inutiles a un coût écologique permanent.",
        tips: [
          "Mettez en place des politiques de rétention (suppression automatique après X temps)",
          "Utilisez le stockage 'froid' (Glacier, Archive) pour les données peu consultées",
          "Compressez les images et les vidéos à la source",
        ],
      },
      {
        title: "4. Exemples d'innovations à surveiller",
        content: "Certains acteurs repensent totalement le concept de datacenter.",
        tips: [
          "Qarnot Computing : des radiateurs-serveurs qui réutilisent la chaleur dans les bâtiments (chiffres de l'entreprise)",
          "OVHcloud : refroidissement liquide (watercooling) industriel depuis 2003",
          "Scaleway : datacenters sans climatisation (adiabatic cooling)",
        ],
      },
      {
        title: "5. FinOps et GreenOps : l'alliance gagnante",
        content: "Réduire la facture cloud revient souvent à réduire l'empreinte carbone.",
        tips: [
          "Éteignez les environnements de staging (recette) la nuit et le week-end",
          "Utilisez des instances 'Spot' ou 'Preemptible' pour les calculs non critiques",
          "Monitorez votre empreinte carbone cloud (outils cloud native ou tiers)",
        ],
      },
      {
        title: "6. Mesurer pour progresser : les chiffres de référence",
        content: (
          <>
            Les datacenters ont consommé 415 TWh dans le monde en 2024, soit environ 1,5 % de l&apos;électricité
            mondiale (
            <Acronym title="Agence Internationale de l'Énergie (IEA en anglais)" glossary="aie">
              AIE
            </Acronym>
            , avril 2025). Le PUE moyen stagne autour de 1,52 dans le monde (Uptime Institute,
            2026) : tout progrès sous ce seuil est un vrai gain. Et la transparence avance : l&apos;Arcep a
            élargi en 2026 sa collecte aux fournisseurs de cloud, avec des résultats attendus au printemps 2027.
          </>
        ),
        tips: [
          "415 TWh, 1,5 % : l'ordre de grandeur mondial à connaître (AIE, 2025)",
          "Suivez votre PUE et votre WUE dans la durée, publiez-les dans vos appels d'offres",
          "Essayez notre simulateur PUE pour chiffrer vos pistes d'optimisation",
        ],
      },
    ],
    resources: [
      "Simulateur PUE : /datacenters",
      "Comprendre le PUE en 5 minutes : /blog/comprendre-le-pue-en-5-minutes",
      "Cloud Carbon Footprint : https://www.cloudcarbonfootprint.org",
      "Comparatif The Green Web Foundation : https://www.thegreenwebfoundation.org",
    ],
    sources: [
      "Uptime Institute 2026 (PUE)",
      "AIE, Energy & AI 2025 (415 TWh)",
      "The Green Grid (PUE, WUE)",
    ],
    sourceLinks: [
      { label: "AIE, Energy and AI (2025)", url: "https://www.iea.org/reports/energy-and-ai" },
      {
        label: "Uptime Institute, Global Data Center Survey 2026",
        url: "https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2026",
      },
      { label: "The Green Grid (PUE, WUE)", url: "https://www.thegreengrid.org/" },
    ],
  },
  "collectivites-action": {
    title: "Plan d'action pour les collectivités",
    subtitle: (
      <>
        Politique numérique responsable territoriale et application de la loi{" "}
        <Acronym
          title="Réduire l'Empreinte Environnementale du Numérique : loi française de 2021 contre l'empreinte environnementale du numérique"
          glossary="loi-reen"
        >
          REEN
        </Acronym>
      </>
    ),
    target: "Élus & Agents territoriaux",
    duration: "25 minutes de lecture",
    impact: "Conformité légale et exemplarité publique",
    date: "12 Avril 2026",
    sections: [
      {
        title: "1. Le cadre légal : Comprendre la loi REEN",
        content: "La loi 'Réduire l'Empreinte Environnementale du Numérique' (REEN) de 2021 impose aux collectivités de +50 000 habitants d'avoir une stratégie numérique responsable.",
        tips: [
          "Objectif 1 : Faire prendre conscience de l'impact environnemental",
          "Objectif 2 : Limiter le renouvellement des terminaux",
          "Objectif 3 : Favoriser des usages numériques écologiquement vertueux",
        ],
      },
      {
        title: "2. Commande publique responsable",
        content: "Le levier principal des collectivités est l'achat. Intégrez l'économie circulaire dans vos marchés publics.",
        tips: [
          "Imposez une part de matériel reconditionné (ex : 20 % des PC, 100 % des téléphones)",
          "Utilisez des critères d'attribution pondérés sur l'indice de réparabilité",
          "Privilégiez les labels TCO Certified ou EPEAT Gold",
        ],
      },
      {
        title: "3. Gestion de la fin de vie et inclusion",
        content: "Vos anciens ordinateurs sont une ressource pour le territoire, pas un déchet.",
        tips: [
          "Donnez le matériel réformé à des associations locales pour réduire la fracture numérique",
          (
            <>
              Organisez des collectes de{" "}
              <Acronym
                title="Déchets d'Équipements Électriques et Électroniques : appareils en fin de vie fonctionnant à l'électricité ou avec piles/batteries"
                glossary="deee"
              >
                DEEE
              </Acronym>{" "}
              citoyens dans les mairies ou écoles
            </>
          ),
          "Cartographiez les acteurs du réemploi (Ressourceries, FabLabs) sur votre territoire",
        ],
      },
      {
        title: "4. Éco-conception des services publics numériques",
        content: "Les sites et applications de la ville doivent être accessibles et légers.",
        tips: [
          (
            <>
              Auditez l&apos;accessibilité (
              <Acronym
                title="Référentiel Général d'Amélioration de l'Accessibilité : critères français d'accessibilité des sites publics"
                glossary="rgaa"
              >
                RGAA
              </Acronym>
              ) et l&apos;éco-conception (
              <Acronym
                title="Référentiel Général d'Écoconception des Services Numériques : 78 critères pour réduire l'empreinte des services numériques"
                glossary="rgesn"
              >
                RGESN
              </Acronym>
              ) de vos portails
            </>
          ),
          "Simplifiez les parcours usagers (moins de clics = moins d'énergie)",
          "Formez les webmestres et communicants aux bonnes pratiques (images légères, vidéos limitées)",
        ],
      },
      {
        title: "5. Sensibiliser les agents et les citoyens",
        content: "La transformation passe par l'acculturation de tous les acteurs du territoire.",
        tips: [
          "Intégrez un module 'Numérique Responsable' dans le plan de formation des agents",
          "Organisez une 'Cyber World CleanUp Day' annuelle dans les services",
          "Communiquez auprès des citoyens sur les gestes simples (box internet, streaming, 4G/5G)",
        ],
      },
      {
        title: "6. Mutualisation et Sobriété des infrastructures",
        content: "Évitez la multiplication des petits serveurs inefficaces dans les bâtiments publics.",
        tips: [
          "Mutualisez les datacenters entre communes ou intercommunalités",
          "Optez pour l'extinction des équipements (wifi, écrans d'accueil) la nuit",
          "Rénovez les salles serveurs existantes pour améliorer leur efficacité (Urbanisation, Confinement)",
        ],
      },
    ],
    resources: [
      "Texte de loi REEN : https://www.legifrance.gouv.fr",
      "Guide des achats numériques responsables (MiNumEco) : https://ecoresponsable.numerique.gouv.fr/publications/guide-pratique-achats-numeriques-responsables",
      "Mission Interministérielle Numérique Éco-responsable : https://ecoresponsable.numerique.gouv.fr",
    ],
    sources: [
      "Loi REEN 2021",
      "ADEME (achat public)",
      "ecoresponsable.numerique.gouv.fr",
      "ADEME, guide téléphone durable (2026)",
    ],
    sourceLinks: [
      { label: "Légifrance : loi REEN 2021", url: "https://www.legifrance.gouv.fr" },
      { label: "Mission Numérique éco-responsable", url: "https://ecoresponsable.numerique.gouv.fr" },
      {
        label: "ADEME, guide téléphone durable (2026)",
        url: "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/prolonger-vie-telephone-portable",
      },
    ],
  },
  "ia-generative": {
    title: "IA générative : comprendre et limiter son impact",
    subtitle: "Des usages en forte croissance, des impacts à encadrer",
    target: "Tous publics",
    duration: "10 minutes de lecture",
    impact: "Datacenters mondiaux : ~485 TWh en 2025 (ADEME 2026)",
    sections: [
      {
        title: "1. Pourquoi l'IA générative pèse sur l'environnement",
        content:
          "Entraîner et faire tourner les modèles demande des serveurs et des datacenters énergivores. La consommation électrique mondiale des centres de données était d'environ 485 TWh en 2025 et pourrait doubler d'ici 2030 ; en France, elle pourrait être multipliée par 3,7 d'ici 2035 (ADEME, avis IA générative, juillet 2026). Les usages numériques français dépendent aux deux tiers de datacenters hébergés à l'étranger, avec des mix électriques souvent plus carbonés qu'en France (ADEME, perspectives datacenters, janvier 2026).",
        tips: [
          "L'impact dépend surtout du mix électrique des datacenters utilisés",
          "La croissance des usages est le premier facteur d'augmentation",
          "Les acteurs publient encore peu de données environnementales fiables",
        ],
      },
      {
        title: "2. Des impacts qui dépassent le carbone",
        content:
          "Au-delà de l'électricité : fabrication des serveurs, consommation d'eau de refroidissement et artificialisation des sols comptent aussi. Le numérique représentait 4,4 % de l'empreinte carbone de la France en 2022, avec un périmètre élargi aux datacenters étrangers (ADEME-Arcep).",
        tips: [
          "La fabrication des serveurs est intense en métaux et en eau",
          "Une partie des impacts est délocalisée avec les datacenters",
          "La transparence des fournisseurs reste un enjeu majeur",
        ],
      },
      {
        title: "3. IA et transition écologique : des bénéfices à vérifier",
        content:
          "Les applications d'IA « pour la transition écologique » sont souvent mises en avant, mais elles restent minoritaires et n'utilisent pas les mêmes technologies que les IA génératives, qui concentrent l'essentiel des impacts. Un gain net ne peut être affirmé qu'après une analyse du cycle de vie complète, effets rebond et transferts d'impact inclus.",
        tips: [
          "Demandez une analyse de cycle de vie, pas seulement une estimation",
          "Méfiez-vous des promesses de compensation par des gains indirects",
          "Un service utile n'est pas forcément un service sobre",
        ],
      },
      {
        title: "4. Comment limiter l'impact de vos usages",
        content:
          "Le premier levier est la sobriété : solliciter l'IA quand elle apporte une vraie valeur, éviter les générations inutiles, désactiver les fonctionnalités « augmentées » dont vous ne servez pas. Côté organisations : privilégier des services éco-conçus et des modèles dimensionnés au besoin.",
        tips: [
          "Désactivez les fonctions IA intégrées que vous n'utilisez pas",
          "Mutualisez et dimensionnez les services au juste besoin",
          "Privilégiez les prestataires qui publient leurs données d'impact",
        ],
      },
      {
        title: "5. Ce que recommandent les pouvoirs publics",
        content: (
          <>
            L&apos;ADEME recommande de soutenir une méthodologie commune de mesure, de s&apos;appuyer sur les
            référentiels existants (
            <Acronym
              title="Association Française de Normalisation : publie notamment le référentiel « IA frugale »"
              glossary="afnor"
            >
              AFNOR
            </Acronym>{" "}
            IA frugale,{" "}
            <Acronym
              title="Référentiel Général d'Écoconception des Services Numériques : 78 critères pour réduire l'empreinte des services numériques"
              glossary="rgesn"
            >
              RGESN
            </Acronym>
            ), de relocaliser les datacenters en France lorsqu&apos;ils remplacent des usages hébergés à
            l&apos;étranger, d&apos;organiser leur implantation sur le territoire et de former les utilisateurs à
            un usage raisonné.
          </>
        ),
        tips: [
          "Référentiels : AFNOR (IA frugale) et RGESN",
          "Relocalisation : bénéfique surtout si elle remplace de l'existant étranger",
          "Formation et sensibilisation des utilisateurs : un levier clé",
        ],
      },
    ],
    resources: [
      "Avis ADEME sur l'IA générative : https://www.ademe.fr",
      "L'avis décrypté en 10 minutes : /blog/ia-generative-avis-ademe-2026",
      "RGESN et numérique écoresponsable : https://ecoresponsable.numerique.gouv.fr",
      "Notre page Outils : /outils",
    ],
    sources: [
      "ADEME, avis « L'intelligence artificielle générative, des impacts environnementaux importants » (juillet 2026)",
      "ADEME, « Centres de données numériques : perspectives d'évolution de leurs consommations » (communiqué, 6 janvier 2026)",
      "ADEME-Arcep (2023, empreinte du numérique en France)",
      "AIE, Energy and AI (2025)",
      "RGESN (INR) ; référentiel AFNOR IA frugale",
    ],
    sourceLinks: [
      {
        label: "Avis ADEME : l'IA générative, des impacts importants (juillet 2026)",
        url: "https://librairie.ademe.fr/economie-circulaire-et-dechets/9495-avis-de-l-ademe-l-intelligence-artificielle-generative-des-impacts-environnementaux-importants.html",
      },
      {
        label: "ADEME : perspectives d'évolution des consommations (janvier 2026)",
        url: "https://www.ademe.fr/presse/communique-national/centres-de-donnees-numeriques-perspectives-devolution-de-leurs-consommations",
      },
      { label: "AIE, Energy and AI (2025)", url: "https://www.iea.org/reports/energy-and-ai" },
    ],
  },
  "streaming-video": {
    title: "Streaming vidéo et gaming : regarder autrement",
    subtitle: "Qualité, téléchargement, lecture auto : les réglages qui changent tout",
    target: "Citoyens",
    duration: "8 minutes de lecture",
    impact: "60 % du trafic mondial (Shift Project, 2019)",
    sections: [
      {
        title: "1. Pourquoi la vidéo pèse si lourd",
        content:
          "La vidéo en ligne génère à elle seule 60 % des flux mondiaux de données, soit plus de 300 millions de tonnes de CO₂ par an : 20 % des émissions du numérique et 1 % des émissions mondiales, autant que l'Espagne (The Shift Project, rapports 2019, chiffres discutés depuis, voir la nuance ci-dessous).",
        tips: [
          "4 grandes familles se partagent ces 60 % : VOD, tubes, réseaux sociaux et autres (Shift, 2019)",
          "En toute honnêteté : un chiffre avancé lors d'une interview en 2019 était erroné (erreur de débit), sans remettre en cause les rapports publiés (Shift, 2020)",
          "Le terminal compte autant que le réseau : une TV 4K consomme bien plus qu'un smartphone",
        ],
      },
      {
        title: "2. Choisir la bonne qualité d'image",
        content:
          "Une heure de streaming en Ultra HD transfère environ 7 Go, contre 3 Go en HD et autour de 1 Go en définition standard (ordres de grandeur des plateformes : Netflix SD 1, HD 3, 4K 7 Go/h, centre d'aide). Sur un smartphone ou une tablette, la différence entre HD et 4K est invisible à l'œil nu : baisser d'un cran divise le débit par deux ou trois.",
        tips: [
          "Réglez la qualité par défaut en 720p sur mobile",
          "Réservez la 4K au grand écran du salon",
          "Désactivez la haute qualité en données mobiles",
        ],
      },
      {
        title: "3. Téléchargez ce que vous regardez en boucle",
        content:
          "Dessins animés des enfants, concerts, tutos : télécharger une fois en Wi-Fi ce que vous regardez dix fois évite neuf streams. La plupart des plateformes proposent le téléchargement hors-ligne sur mobile et tablette.",
        tips: [
          "Téléchargez en Wi-Fi avant de partir",
          "Préférez l'audio seul pour la musique et les podcasts",
          "Gardez en local vos favoris plutôt que dans le cloud",
        ],
      },
      {
        title: "4. Coupez la lecture automatique",
        content:
          "La lecture automatique enchaîne épisodes et vidéos suggérées sans que vous ayez rien demandé. La désactiver, c'est reprendre la main : vous regardez ce que vous avez choisi, ni plus ni moins.",
        tips: [
          "Désactivez l'autoplay dans chaque application",
          "Baissez la luminosité : l'écran, c'est 30 à 50 % de la consommation du smartphone",
          "Un minuteur aide toute la famille à garder la mesure",
        ],
      },
      {
        title: "5. Et le jeu vidéo ?",
        content:
          "Une console de salon consomme beaucoup en jeu, même en pause : l'éteindre vraiment après la partie (pas de veille) change la donne. Le cloud gaming ajoute le streaming vidéo au calcul à distance : à réserver aux moments où il apporte vraiment quelque chose.",
        tips: [
          "Coupez la veille des consoles (multiprise à interrupteur)",
          "Gardez consoles et manettes le plus longtemps possible",
          "Préférez le jeu local au cloud gaming quand c'est possible",
        ],
      },
    ],
    resources: [
      "Notre estimateur streaming & visio : /outils#onglet-streaming",
      "Les 7 gestes quotidiens : /fiches-pratiques/gestes-quotidiens",
      "Que consomme vraiment votre box : /blog/que-consomme-vraiment-votre-box",
      "The Shift Project, sobriété numérique : https://theshiftproject.org",
    ],
    sources: [
      "The Shift Project, « Climat : l'insoutenable usage de la vidéo en ligne » (2019)",
      "The Shift Project, mise au point sur l'empreinte de la vidéo en ligne (2020)",
      "Netflix, centre d'aide « Contrôler la quantité de données » (SD 1, HD 3, 4K 7 Go/h, consulté 09/2026)",
    ],
    sourceLinks: [
      {
        label: "Shift Project, « Climat : l'insoutenable usage de la vidéo en ligne » (rapport 2019)",
        url: "https://theshiftproject.org/app/uploads/2025/04/2019-02.pdf",
      },
      {
        label: "Shift Project, « Deploying Digital Sobriety » (suivi 2020)",
        url: "https://theshiftproject.org/app/uploads/2025/02/Deploying-digital-sobriety_TSP_2020_final.pdf",
      },
      {
        label: "Netflix, centre d'aide « Contrôler la quantité de données »",
        url: "https://help.netflix.com/fr/node/87",
      },
    ],
  },
  "teletravail-visio": {
    title: "Télétravail et visioconférence sobres",
    subtitle: "Caméra, réseau, matériel : travailler à distance sans alourdir la facture carbone",
    target: "Actifs",
    duration: "8 minutes de lecture",
    impact: "~1 Go par heure de visio (CableLabs, 2021)",
    sections: [
      {
        title: "1. Combien pèse une heure de visio ?",
        content:
          "Un participant en visioconférence consomme environ 1 Go de données par heure, soit trois fois moins qu'un film en HD en streaming (CableLabs, mesures 2021 sur Meet, Teams, Zoom et GoToMeeting). L'audio seul, lui, ne pèse presque rien : pour les points d'équipe sans partage d'écran, la voix suffit largement.",
        tips: [
          "Gardez la vidéo pour les échanges qui en ont vraiment besoin",
          "Coupez votre caméra quand vous ne parlez pas en grand groupe",
          "Un compte-rendu écrit remplace parfois une réunion",
        ],
      },
      {
        title: "2. Caméra : les bons réglages",
        content:
          "Passer de la Full HD à la HD divise par deux ou trois le débit de votre flux vidéo (données des éditeurs Zoom et Teams). Les fonds virtuels animés et les filtres ajoutent un calcul permanent côté appareil : un fond flouté sobre fait très bien l'affaire.",
        tips: [
          "Désactivez la HD dans les réglages de votre application",
          "Évitez fonds virtuels animés et filtres gourmands",
          "Rejoignez les grandes réunions caméra coupée par défaut",
        ],
      },
      {
        title: "3. Le réseau compte double",
        content:
          "À quantité de données égale, le réseau mobile consomme 7 fois plus d'énergie par Go que le fixe : 0,14 kWh contre 0,02 kWh (Arcep, enquête 2026 sur données 2024). En télétravail, le Wi-Fi de la box est donc toujours le meilleur choix. Et comme 90 % de la consommation d'une box est invariable, qu'on s'en serve ou non, l'éteindre la nuit reste le geste le plus efficace (Arcep, 2026).",
        tips: [
          "Télétravaillez en Wi-Fi, gardez la 4G/5G pour le dépannage",
          "Éteignez votre box la nuit (économie d'environ 26 kWh par an)",
          "Téléchargez les gros fichiers en Wi-Fi avant de partir",
        ],
      },
      {
        title: "4. Un poste de travail qui dure",
        content:
          "En télétravail, vous cumulez parfois double équipement (bureau + domicile). Un ordinateur gardé 7 ans au lieu de 3 divise son impact annuel par plus de deux (7 ÷ 3 ≈ 2,3), et le reconditionné professionnel couvre très bien les usages bureautiques : voir notre fiche achat responsable.",
        tips: [
          "Demandez du reconditionné pour le second poste",
          "Une multiprise à interrupteur coupe les veilles du bureau à domicile",
          "Dépoussiérez régulièrement : un PC qui chauffe moins dure plus longtemps",
        ],
      },
      {
        title: "5. Organiser le travail à distance",
        content:
          "Le premier bénéfice du télétravail, ce sont les déplacements évités. Pour le reste, quelques habitudes suffisent : regrouper les réunions, partager des liens plutôt que des pièces jointes et ne pas garder les enregistrements dans le cloud pour rien.",
        tips: [
          "Regroupez vos visios pour éteindre entre deux blocs",
          "Partagez des liens, pas des pièces jointes de 30 Mo",
          "Supprimez les enregistrements devenus inutiles",
        ],
      },
    ],
    resources: [
      "Guide d'achat responsable : /fiches-pratiques/achat-responsable",
      "Démarche Green IT en entreprise : /fiches-pratiques/green-it-entreprise",
      "Que consomme vraiment votre box : /blog/que-consomme-vraiment-votre-box",
      "Enquête Arcep « Pour un numérique soutenable » : https://www.arcep.fr",
    ],
    sources: [
      "CableLabs, consommation horaire des applications de visioconférence (2021)",
      "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026 (données 2024)",
      "ADEME-Arcep (2023, fabrication ≈ 75 % de l'impact)",
    ],
    sourceLinks: [
      {
        label: "CableLabs, conso horaire de la visio (Meet, Teams, Zoom, GoToMeeting, 2021)",
        url: "https://www.cablelabs.com/blog/hourly-data-consumption-of-popular-video-conferencing-applications",
      },
      {
        label: "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026",
        url: "https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/impact-environnemental/enquete-annuelle-pour-un-numerique-soutenable-edition-2026.html",
      },
    ],
  },
  "emails-cloud": {
    title: "E-mails, cloud et stockage : alléger sans se priver",
    subtitle: "Pièces jointes, tri, hébergeurs : une messagerie plus légère au quotidien",
    target: "Tous publics",
    duration: "8 minutes de lecture",
    impact: "4 g à 50 g par e-mail (ADEME)",
    sections: [
      {
        title: "1. Combien pèse un e-mail ?",
        content:
          "Les ordres de grandeur les plus cités viennent de l'ADEME (travaux 2011, toujours repris par les services publics en 2019) : 4 g de CO₂e pour un e-mail simple, 19 g avec une pièce jointe de 1 Mo, jusqu'à 50 g avec de grosses pièces jointes, et 0,3 g pour un spam. Le stockage, lui, pèse peu : 1 Go conservé un an dans le cloud émet environ 0,24 g de CO₂e (ADEME, Impact CO₂).",
        tips: [
          "Ces chiffres datent un peu : prenez-les comme des ordres de grandeur, pas des mesures",
          "Le poids vient surtout des pièces jointes et du nombre de destinataires",
          "Stocker 1 000 e-mails simples ≈ 4 kg de CO₂e (1 000 × 4 g) : l'équivalent d'une vingtaine de kilomètres en voiture",
        ],
      },
      {
        title: "2. Pièces jointes : le lien plutôt que le fichier",
        content:
          "Une pièce jointe envoyée à dix destinataires, c'est dix copies stockées sur dix boîtes. Un lien vers un fichier partagé, c'est une seule copie. Pour les photos et vidéos, compresser avant d'envoyer divise le poids par cinq ou dix sans perte visible.",
        tips: [
          "Partagez un lien (cloud, transfert) plutôt qu'une pièce jointe",
          "Compressez photos et PDF avant l'envoi",
          "Limitez les destinataires en copie aux personnes vraiment concernées",
        ],
      },
      {
        title: "3. Nettoyer malin, sans culpabiliser",
        content:
          "Bonne nouvelle : supprimer 1 000 vieux e-mails ne sauvera pas la planète, le stockage pèse très peu. Triez pour y voir plus clair et retrouver vos messages, pas pour « sauver des serveurs ». Le vrai levier, ce sont les pièces jointes que vous envoyez demain.",
        tips: [
          "Désinscrivez-vous des newsletters que vous ne lisez plus",
          "Triez par pièces jointes volumineuses pour un grand ménage rapide",
          "Videz le dossier des indésirables et la corbeille de temps en temps",
        ],
      },
      {
        title: "4. Où vont vos données ?",
        content:
          "Chaque e-mail conservé dort dans un datacenter, avec ses copies de sauvegarde. Choisir une messagerie hébergée en France, alimentée en électricité bas-carbone, réduit l'impact du stockage. La Green Web Foundation vérifie gratuitement si un hébergeur utilise des énergies renouvelables.",
        tips: [
          "Vérifiez votre hébergeur sur Green Web Foundation",
          "Désactivez la synchronisation des dossiers dont vous n'avez pas besoin",
          "Un seul compte bien tenu vaut mieux que cinq boîtes dispersées",
        ],
      },
      {
        title: "5. Au bureau : une charte légère",
        content:
          "En entreprise, les e-mails se comptent par dizaines par jour et par personne. Une charte simple change tout : liens internes plutôt que pièces jointes, pas de « merci » ou « bien reçu » systématiques en copie à dix, archivage des dossiers clos.",
        tips: [
          "En interne : lien vers l'intranet, jamais de pièce jointe",
          "Réservez la copie aux personnes qui doivent agir",
          "Archivez les projets terminés au lieu de tout garder en ligne",
        ],
      },
    ],
    resources: [
      "L'empreinte de vos e-mails : /outils#onglet-calculator",
      "Les 7 gestes quotidiens : /fiches-pratiques/gestes-quotidiens",
      "Les bases du numérique d'intérêt général : https://lesbases.anct.gouv.fr",
    ],
    sources: [
      "ADEME, travaux sur l'impact des e-mails (2011, repris 2019)",
      "ANCT, « L'empreinte carbone de nos e-mails » (rappel de l'ancienneté des chiffres)",
      "ADEME, Impact CO₂ / Base Empreinte (stockage : 0,24 g/Go/an)",
    ],
    sourceLinks: [
      { label: "ADEME, Impact CO₂ / Base Empreinte", url: "https://impactco2.fr" },
      { label: "ANCT, Les bases du numérique d'intérêt général", url: "https://lesbases.anct.gouv.fr" },
    ],
  },
  "objets-connectes": {
    title: "Objets connectés : choisir, sécuriser, faire durer",
    subtitle: "Montres, enceintes, domotique : le connecté utile, sans l'accumulation",
    target: "Citoyens",
    duration: "8 minutes de lecture",
    impact: "21 Mds d'objets fin 2025 (IoT Analytics)",
    sections: [
      {
        title: "1. Une croissance fulgurante",
        content:
          "Le nombre d'objets connectés dans le monde devrait atteindre 21,1 milliards fin 2025, en hausse de 14 % sur un an, et 39 milliards en 2030 (IoT Analytics, octobre 2025). Chacun combine fabrication gourmande en métaux, alimentation permanente et échanges avec le cloud : trois impacts pour un seul gadget.",
        tips: [
          "Montres, enceintes, ampoules, capteurs : tout objet « smart » a un coût caché",
          "La phase de fabrication domine, comme pour les smartphones",
          "Un objet déconnecté du cloud devient souvent inutilisable : anticipez",
        ],
      },
      {
        title: "2. Le vrai besoin d'abord",
        content:
          "Avant d'acheter, posez-vous la question franchement : qu'est-ce que la version connectée apporte de plus que la version simple ? Un programmateur mécanique fait le même travail qu'une prise connectée, sans application, sans compte, sans mise à jour.",
        tips: [
          "Un seul assistant vocal suffit, pas un par pièce",
          "Mutualisez : une box domotique plutôt que dix applications",
          "Offrez une seconde vie : revendez ou donnez les objets remplacés",
        ],
      },
      {
        title: "3. Sécuriser, c'est faire durer",
        content:
          "Un objet piraté ou abandonné par son fabricant (plus de mises à jour) finit au rebut bien avant sa fin de vie matérielle. Changer le mot de passe par défaut et appliquer les mises à jour, c'est prolonger la durée de vie autant que protéger vos données.",
        tips: [
          "Changez les mots de passe par défaut dès l'installation",
          "Vérifiez la durée des mises à jour avant d'acheter",
          "Déconnectez du Wi-Fi les objets que vous n'utilisez plus",
        ],
      },
      {
        title: "4. La maison connectée sobre",
        content:
          "Bien réglée, la domotique peut faire économiser de l'énergie (chauffage piloté, extinction auto). Mal réglée, elle ajoute des veilles permanentes. La règle d'or : chaque automatisation doit supprimer plus de consommation qu'elle n'en ajoute, box internet comprise.",
        tips: [
          "Privilégiez les protocoles locaux au tout-cloud",
          "Programmez l'extinction réelle la nuit (box, TV, consoles)",
          "En France, box et décodeurs ont consommé 3,4 TWh en 2024 (Arcep, 2026)",
        ],
      },
      {
        title: "5. Fin de vie : ni tiroir ni poubelle",
        content: (
          <>
            Un objet connecté est un{" "}
            <Acronym
              title="Déchets d'Équipements Électriques et Électroniques : appareils en fin de vie fonctionnant à l'électricité ou avec piles/batteries"
              glossary="deee"
            >
              DEEE
            </Acronym>{" "}
            comme un autre : ni poubelle grise, ni tiroir éternel. Effacez vos données (réinitialisation usine +
            suppression du compte cloud), puis apportez-le en point de collecte ou proposez-le au réemploi.
          </>
        ),
        tips: [
          "Réinitialisez et dissociez le compte avant de vous en séparer",
          "Pensez revente et don : un objet qui marche encore sert à quelqu'un",
          "Points de collecte : voir notre fiche recyclage",
        ],
      },
    ],
    resources: [
      "Mode d'emploi du recyclage : /fiches-pratiques/recyclage-mode-emploi",
      "Réparer et prolonger : /fiches-pratiques/reparer-prolonger",
      "Points de collecte : /recyclage",
    ],
    sources: [
      "IoT Analytics, « State of IoT 2025 » (octobre 2025)",
      "Statista, objets connectés par type (octobre 2025)",
      "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026 (données 2024)",
    ],
    sourceLinks: [
      {
        label: "IoT Analytics, « State of IoT 2025 » (octobre 2025)",
        url: "https://iot-analytics.com/number-connected-iot-devices",
      },
      {
        label: "Statista, objets connectés par type (octobre 2025)",
        url: "https://www.statista.com/statistics/1559435/connected-devices-worldwide/",
      },
      {
        label: "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026",
        url: "https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/impact-environnemental/enquete-annuelle-pour-un-numerique-soutenable-edition-2026.html",
      },
    ],
  },
  "impression-papier": {
    title: "Imprimer moins, imprimer mieux",
    subtitle: "Recto-verso, papier recyclé, mutualisation : le bureau sans gaspillage",
    target: "Entreprises",
    duration: "6 minutes de lecture",
    impact: "−50 % de papier en recto-verso",
    sections: [
      {
        title: "1. Le papier, premier déchet du bureau",
        content:
          "Le papier reste l'élément le plus consommé et le plus jeté en entreprise : il représente 75 % des déchets produits au bureau (ADEME). Chaque salarié consomme en moyenne 70 à 85 kg de papier par an, soit l'équivalent de 3 ramettes par mois. Pire : 25 % des documents sont jetés 5 minutes après leur impression, et 16 % ne sont jamais lus.",
        tips: [
          "75 % des déchets de bureau : le gisement est énorme et facile à attaquer",
          "3 ramettes par mois et par personne : visualisez la pile sur un an",
          "Un document sur quatre jeté dans les 5 minutes : imprimez après relecture",
        ],
      },
      {
        title: "2. Avant d'imprimer : la relecture à l'écran",
        content:
          "La plupart des impressions « de confort » (relecture, archivage « au cas où ») ne servent jamais. Les outils d'annotation PDF et la signature électronique couvrent aujourd'hui presque tous les usages, y compris juridiques.",
        tips: [
          "Relisez à l'écran, imprimez la version finale uniquement",
          "Annotez les PDF plutôt que d'imprimer pour corriger",
          "Adoptez la signature électronique pour les documents courants",
        ],
      },
      {
        title: "3. Imprimer malin quand c'est nécessaire",
        content:
          "Quand l'impression s'impose, les réglages par défaut changent tout : le recto-verso divise la consommation par deux, l'impression de plusieurs pages par feuille divise encore, et le noir et blanc suffit pour les documents de travail.",
        tips: [
          "Recto-verso par défaut sur toutes les imprimantes (−50 %)",
          "2 ou 4 pages par feuille pour les présentations et brouillons",
          "Noir et blanc par défaut, police légère, marges réduites",
        ],
      },
      {
        title: "4. Papier et cartouches responsables",
        content:
          "Choisissez du papier recyclé ou certifié (FSC, Écolabel européen) au grammage adapté : 80 g suffisent pour le quotidien. Une fibre de cellulose se recycle en moyenne 5 à 7 fois (rapport filière papier-carton, 2021). Côté cartouches, les rechargeables et les consignes de reprise valent mieux que le jetable.",
        tips: [
          "Papier recyclé ou certifié, 80 g pour le quotidien",
          "Cartouches rechargeables ou reprises par le fabricant",
          "Une imprimante mutualisée vaut mieux que dix imprimantes individuelles",
        ],
      },
      {
        title: "5. Trier et boucler la boucle",
        content:
          "En France, les trois quarts des papiers sont collectés pour être recyclés : un bon score à entretenir. Au bureau, des bacs dédiés près des imprimantes et des postes suffisent. Et les feuilles imprimées d'un seul côté deviennent du brouillon.",
        tips: [
          "Des bacs papier dédiés près de chaque imprimante",
          "Le verso des impressions ratées = brouillon gratuit",
          "Sensibilisez les nouveaux arrivants : le geste devient une habitude",
        ],
      },
    ],
    resources: [
      "Démarche Green IT en entreprise : /fiches-pratiques/green-it-entreprise",
      "Plan d'action collectivités : /fiches-pratiques/collectivites-action",
      "Nos outils de calcul : /outils",
    ],
    sources: [
      "ADEME, chiffres sur le papier au bureau (via synthèse 2024)",
      "CGEFI, rapport de la filière papier-carton (2021, fibre recyclable 5 à 7 fois)",
    ],
  },
  "enfants-ecole": {
    title: "Écrans des enfants : des repères pour toute la famille",
    subtitle: "Durées, contenus, premier téléphone : avancer sans culpabiliser",
    target: "Parents",
    duration: "8 minutes de lecture",
    impact: "1h22 à 2h33 par jour (SpF, 2025)",
    sections: [
      {
        title: "1. Combien d'écrans, vraiment ?",
        content:
          "Selon Santé publique France (étude Enabee, résultats publiés en septembre 2025 sur des données 2022), les enfants passent en moyenne 1h22 par jour devant les écrans à 3-5 ans, 1h53 à 6-8 ans et 2h33 à 9-11 ans, deux fois plus les jours sans école. Les foyers comptent en moyenne une dizaine d'écrans.",
        tips: [
          "1h22, 1h53, 2h33 : la durée augmente avec l'âge, quel que soit le sexe",
          "Les jours sans école, le temps d'écran double",
          "La télévision reste l'écran principal jusqu'à la fin du primaire",
        ],
      },
      {
        title: "2. Les repères officiels (et vous faites déjà bien)",
        content:
          "Le ministère de la Santé préconise : pas d'écran avant 3 ans, un usage exceptionnel entre 3 et 6 ans, pas de mobile avec internet avant 11 ans ni de smartphone avant 13 ans. Bonne nouvelle : près de 9 parents sur 10 déclarent déjà limiter le temps d'écran de leur enfant (Enabee). Vous n'êtes pas seuls, et vous faites déjà beaucoup.",
        tips: [
          "Zéro écran avant 3 ans, y compris en bruit de fond",
          "Pas de smartphone connecté avant 13 ans : un téléphone simple suffit",
          "Valorisez ce que vous faites déjà : les limites posées avec bienveillance marchent",
        ],
      },
      {
        title: "3. La qualité compte plus que la quantité",
        content:
          "Un dessin animé regardé ensemble et discuté n'a rien à voir avec deux heures de vidéos enchaînées seul. Les contenus éducatifs, accompagnés par un adulte, font partie d'un usage raisonné. Évitez les écrans le matin avant l'école : c'est un moment clé pour l'attention (Santé publique France, 2020).",
        tips: [
          "Accompagnez : regardez avec eux et parlez-en",
          "Pas d'écran le matin avant l'école ni pendant les repas",
          "Chambre sans écran la nuit : un réveil remplace le smartphone",
        ],
      },
      {
        title: "4. Le premier téléphone, en mode sobre",
        content:
          "Pour un premier téléphone, le reconditionné avec forfait bloqué est le combo gagnant : moins cher, moins d'impact, et des limites intégrées. Tablette familiale partagée plutôt qu'un appareil par enfant, contrôle parental activé ensemble (pas en cachette), et règles décidées en famille.",
        tips: [
          "Premier téléphone : reconditionné + forfait bloqué",
          "Activez le contrôle parental avec votre enfant, en expliquant",
          "Un temps d'écran se négocie, comme l'heure du coucher",
        ],
      },
      {
        title: "5. À l'école aussi",
        content:
          "ENT, manuels numériques, plateforme Pix dès le CM1 : l'école est aussi numérique. Intéressez-vous aux outils utilisés en classe, limitez les impressions « de confort » et signalez les usages excessifs en conseil d'école. Côté ressources : jeprotegemonenfant.gouv.fr accompagne les parents pas à pas.",
        tips: [
          "Découvrez les outils numériques de l'école avec votre enfant",
          "La plateforme Pix développe les compétences dès le CM1",
          "Besoin d'aide ? jeprotegemonenfant.gouv.fr et les ateliers parentalité numérique",
        ],
      },
    ],
    resources: [
      "Les 7 gestes quotidiens : /fiches-pratiques/gestes-quotidiens",
      "Streaming et gaming : /fiches-pratiques/streaming-video",
      "Parentalité numérique : https://jeprotegemonenfant.gouv.fr",
    ],
    sources: [
      "Santé publique France, étude Enabee, premiers résultats (septembre 2025, données 2022)",
      "Santé publique France, écrans le matin et langage (2020)",
      "Ministère de la Santé, repères d'usage des écrans ; plan interministériel (2022)",
      "UNICEF France, cohorte ELFE (exposition précoce, 2026)",
    ],
  },
  "box-wifi": {
    title: "Box, Wi-Fi et connexion : la sobriété commence à la maison",
    subtitle: "Éteindre, passer en Wi-Fi, choisir son équipement : les gestes qui allègent la facture",
    target: "Citoyens",
    duration: "8 minutes de lecture",
    impact: "~80 kWh par an et par box (Arcep, 2026)",
    sections: [
      {
        title: "1. Ce que consomme vraiment une box",
        content:
          "Une box en fonctionnement consomme en moyenne 9,1 watts, soit environ 80 kWh par an si elle reste allumée jour et nuit (9,1 × 24 × 365 ÷ 1 000). À l'échelle du pays, le parc des box et décodeurs TV a consommé 3,4 TWh en 2024, soit 0,8 % de l'électricité française et cinq fois la consommation des réseaux fixes (Arcep, enquête « Pour un numérique soutenable », édition 2026 sur données 2024).",
        tips: [
          "9,1 W pour la box, 7,4 W pour le décodeur TV : deux veilles permanentes (Arcep, 2026)",
          "80 kWh par an, c'est l'ordre de grandeur d'un petit réfrigérateur économe",
          "Le décodeur allumé pour « le fond sonore » consomme autant qu'une box au repos",
        ],
      },
      {
        title: "2. Éteindre la nuit : le geste roi",
        content:
          "Environ 90 % de la consommation d'une box est invariable, qu'on s'en serve ou non (Arcep, 2026). Conséquence logique : l'éteindre quand on ne s'en sert pas est le geste le plus efficace. L'éteindre 8 heures par jour fait économiser environ un tiers de sa consommation sur l'année, et 12 heures par jour la moitié (Arcep, 2024), soit de l'ordre de 26 kWh par an pour une extinction nocturne.",
        tips: [
          "Une prise programmable ou une multiprise à interrupteur automatise l'extinction",
          "Couper seulement le Wi-Fi 8 heures par jour économise déjà 7 % (Arcep, 2024)",
          "Pas d'inquiétude au réveil : la reconnexion prend une à deux minutes",
        ],
      },
      {
        title: "3. Wi-Fi plutôt que données mobiles",
        content:
          "À la maison, passer par le Wi-Fi de la box plutôt que par la 4G ou la 5G du téléphone consomme nettement moins d'énergie : l'ordre de grandeur communément admis est de 4 à 5 fois moins. Ce ratio varie beaucoup selon le type de Wi-Fi, la génération et la fréquence du réseau mobile, la distance à l'antenne, l'environnement (intérieur, extérieur, foule) et les puces des appareils : retenez la direction, pas le chiffre exact.",
        tips: [
          "Activez le Wi-Fi automatique à la maison, coupez les données mobiles",
          "Téléchargez films, podcasts et mises à jour en Wi-Fi avant de partir",
          "En déplacement, la 4G/5G reste faite pour ça : pas de culpabilité, juste le bon réseau au bon endroit",
        ],
      },
      {
        title: "4. Décodeur, répéteur et seconde vie",
        content:
          "Le décodeur TV (7,4 W en moyenne) mérite le même traitement que la box : éteint quand personne ne regarde. Les répéteurs Wi-Fi, eux, ajoutent une consommation permanente pour étendre le signal : un seul bien placé vaut mieux que deux empilés, et l'Arcep les mesure désormais dans son enquête annuelle. Enfin, les box et décodeurs reconditionnés existent : l'enquête 2026 leur consacre un chapitre entier.",
        tips: [
          "Éteignez le décodeur avec la télévision, pas seulement la télévision",
          "Un répéteur bien placé au centre du logement plutôt que deux en cascade",
          "Gardez votre box le plus longtemps possible : rendez-la en état pour le reconditionnement",
        ],
      },
      {
        title: "5. Bien choisir sa connexion",
        content:
          "La « 4G/5G fixe » (une box qui capte le réseau mobile) dépanne là où le filaire n'arrive pas, mais elle utilise le réseau mobile avec son coût énergétique : à la maison, une connexion filaire reste le choix sobre quand elle est disponible. Et pour les usages du soir, programmer l'extinction de la box reste plus efficace que n'importe quel changement d'offre.",
        tips: [
          "Fibre ou ADSL disponible : préférez le filaire à la box 4G/5G pour un usage fixe",
          "Comparez les consommations des box des opérateurs avant de changer d'offre",
          "Un seul mot d'ordre : le bon réseau, au bon endroit, éteint la nuit",
        ],
      },
    ],
    resources: [
      "Choisir son FAI et sa box : /fai-box",
      "Que consomme vraiment votre box : /blog/que-consomme-vraiment-votre-box",
      "Télétravail et visio : /fiches-pratiques/teletravail-visio",
      "Enquête Arcep « Pour un numérique soutenable », édition 2026 : https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/impact-environnemental/enquete-annuelle-pour-un-numerique-soutenable-edition-2026.html",
    ],
    sources: [
      "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026 (données 2024, publiée le 21/05/2026)",
      "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2024 (extinction : −33 % à 8 h/j, −50 % à 12 h/j)",
      "ADEME, Panel Elecdom 2020-2023 (box ~92 kWh/an)",
    ],
    sourceLinks: [
      {
        label: "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026",
        url: "https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/impact-environnemental/enquete-annuelle-pour-un-numerique-soutenable-edition-2026.html",
      },
      {
        label: "Arcep, dossier « L'empreinte environnementale du numérique » (toutes les éditions)",
        url: "https://www.arcep.fr/la-regulation/grands-dossiers-thematiques-transverses/lempreinte-environnementale-du-numerique.html",
      },
      {
        label: "ADEME, Panel Elecdom, consommations annuelles (open data)",
        url: "https://data.ademe.fr/datasets/elecdom-conso-annuelles",
      },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const sheet = sheets[id]
  return {
    title: sheet ? `${sheet.title} | Fiches pratiques` : "Fiches pratiques",
    description: sheet ? sheet.subtitle : undefined,
    alternates: { canonical: canonical(`/fiches-pratiques/${id}`) },
    openGraph: sheet
      ? pageOpenGraph(
          `${sheet.title} | Le Green IT en clair`,
          sheet.subtitle,
          `/fiches-pratiques/${id}`
        )
      : pageOpenGraph(
          "Fiches pratiques | Le Green IT en clair",
          "Fiches pratiques Green IT : guides pas à pas pour agir au quotidien, en entreprise et en collectivité.",
          "/fiches-pratiques"
        ),
  }
}

export async function generateStaticParams() {
  return Object.keys(sheets).map((id) => ({
    id: id,
  }))
}

export default async function SheetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sheet = sheets[id]

  if (!sheet) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Fiche non trouvée</h2>
          <Button asChild>
            <Link href="/fiches-pratiques">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux fiches
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return <SheetContent sheet={{ ...sheet, id }} />
}

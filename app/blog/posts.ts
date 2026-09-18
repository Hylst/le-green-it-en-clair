import type { LucideIcon } from "lucide-react"
import { Calculator, ClipboardCheck, HeartHandshake, Leaf, Megaphone, Scale, Smartphone, Sparkles, Wifi, Wrench, Zap } from "lucide-react"

/* Contenus du blog : écriture simple, un chiffre sourcé par idée forte,
   le reste de la précision rangé dans des blocs dépliables. */

export interface BlogFact {
  value: string
  label: string
  source: string
  calculation?: string
}

export interface BlogDetails {
  title: string
  paragraphs: string[]
}

export type BlogWidgetKey =
  | "audit-checklist"
  | "reconditionne-calc"
  | "pue-mini-calc"
  | "agec-timeline"
  | "reparable-quiz"
  | "box-calc"
  | "rgesn-check"
  | "bonus-check"
  | "ia-quiz"

export interface BlogSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  fact?: BlogFact
  widget?: BlogWidgetKey
  details?: BlogDetails[]
}

export interface RelatedLink {
  href: string
  label: string
  description: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  icon: LucideIcon
  image?: string
  imageAlt?: string
  sourceLinks?: { label: string; url: string }[]
  essential: string[]
  sections: BlogSection[]
  takeaway: string[]
  related: RelatedLink[]
  sources: string[]
}

export const posts: BlogPost[] = [
  {
    image: "/greenit/images/blog/blog-audit-pme.webp",
    imageAlt: "Petite entreprise vue de haut avec inventaire du parc informatique sur carnet",
    slug: "premier-audit-green-it-pme",
    title: "Mon premier audit Green IT en PME : la méthode en 4 étapes",
    excerpt:
      "Vingt postes, une box, une imprimante et beaucoup de bonne volonté : comment faire le point sur son parc sans y passer un mois.",
    date: "Septembre 2026",
    readingTime: "7 min",
    icon: ClipboardCheck,
    essential: [
      "Un audit, c’est d’abord un inventaire : quoi, quel âge, utilisé combien.",
      "La fabrication concentre environ 75 % des impacts : la durée de vie est votre meilleur levier.",
      "Terminez par un plan d’une page, pas par un rapport de 40 pages.",
    ],
    sections: [
      {
        heading: "Étape 1 : compter, sans se noyer",
        paragraphs: [
          "Prenez un tableur et faites le tour des bureaux : ordinateurs, écrans, imprimantes, téléphones, box, et serveur si vous en avez un. Pour chaque appareil, notez trois choses : l’année d’achat, son état, et s’il sert vraiment tous les jours.",
          "Pour une vingtaine de postes, deux heures suffisent. Ne cherchez pas l’exhaustivité : les câbles et les souris peuvent attendre. Ce qui compte, c’est de repérer les appareils âgés, les doublons (deux écrans là où un suffit) et le matériel qui dort dans un placard.",
        ],
        bullets: [
          "À noter : type d’appareil, année d’achat, état, usage réel",
          "À ignorer pour l’instant : câbles, accessoires, petits périphériques",
          "À repérer : doublons, matériel dormant, appareils de plus de 6 ans",
        ],
      },
      {
        heading: "Étape 2 : observer les usages pendant une semaine",
        paragraphs: [
          "Le matériel ne raconte que la moitié de l’histoire. Pendant une semaine, regardez comment il vit : la box reste-t-elle allumée jour et nuit, l’imprimante tourne-t-elle pour des documents lus une fois, les écrans restent-ils allumés à la pause déjeuner.",
          "Posez deux ou trois questions à l’équipe, sans jugement : qui imprime et pourquoi, qui a vraiment besoin d’un deuxième écran, quels fichiers partent dans le cloud alors qu’un dossier partagé suffirait. Vous obtiendrez plus d’informations en une pause café qu’en une semaine de relevés automatiques.",
        ],
      },
      {
        heading: "Étape 3 : les trois gestes qui paient",
        paragraphs: [
          "Premier geste : allonger la durée de vie. Visez au minimum 5 ans pour un smartphone et 7 ans pour un ordinateur, en prévoyant le remplacement de la batterie plutôt que de l’appareil. C’est le levier le plus puissant, car la fabrication concentre l’essentiel des impacts.",
          "Deuxième geste : acheter reconditionné au prochain renouvellement. L’impact évité se situe entre 75 et 90 % par rapport au neuf, et le prix baisse de 30 à 70 % selon le modèle. Troisième geste : éteindre la nuit. Une box éteinte la nuit économise environ 26 kWh par an, et une multiprise à interrupteur règle le sort des veilles discrètes.",
        ],
        fact: {
          value: "≈ 75 %",
          label: "Part de la fabrication dans les impacts du numérique (tous indicateurs confondus)",
          source: "ADEME-Arcep, 2023",
          calculation: "Part de la phase de fabrication sur l’ensemble du cycle de vie",
        },
        bullets: [
          "Durée de vie : 5 ans minimum pour un smartphone, 7 ans pour un ordinateur",
          "Prochain achat : reconditionné avec garantie de 2 ans",
          "Nuits et week-ends : box et postes éteints, multiprises à interrupteur",
        ],
      },
      {
        heading: "Étape 4 : écrire le plan sur une page",
        widget: "audit-checklist",
        paragraphs: [
          "Un audit qui finit dans un tiroir ne sert à rien. Résumez vos décisions sur une page : trois objectifs chiffrés (par exemple « aucun renouvellement avant 5 ans »), un responsable par objectif, et une date de bilan dans six mois.",
          "Le modèle de plan d’action DSI du site vous donne la trame, et la grille d’audit en 26 critères permet de suivre vos progrès d’une année sur l’autre. La première année, viser juste vaut mieux que viser loin.",
        ],
        details: [
          {
            title: "Combien de temps prévoir, concrètement ?",
            paragraphs: [
              "Comptez une demi-journée pour l’inventaire, une semaine d’observation en tâche de fond, et une réunion d’une heure pour décider du plan. La première fois, nul besoin d’expert externe : votre connaissance du terrain vaut tous les capteurs.",
              "L’année suivante, le même exercice prendra deux fois moins de temps, car l’inventaire existera déjà. C’est un rendez-vous annuel, pas un chantier.",
            ],
          },
          {
            title: "Les outils du site servent à quoi, dans tout ça ?",
            paragraphs: [
              "La grille d’audit (26 critères notés) structure votre visite et garde une trace comparable d’une année sur l’autre. L’outil d’audit IT en ligne chiffre le poids de votre parc en CO₂e pour objectiver les priorités.",
              "Mais aucun outil ne remplace le tour des bureaux : c’est en ouvrant les placards qu’on trouve les trois imprimantes oubliées.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "Commencez par l’inventaire, pas par les achats.",
      "La durée de vie du matériel est votre levier numéro un.",
      "Un plan d’une page appliqué bat un rapport de 40 pages rangé.",
    ],
    related: [
      {
        href: "/outils",
        label: "Outil d’audit IT",
        description: "Chiffrez le poids de votre parc en quelques minutes.",
      },
      {
        href: "/modeles/grille-audit",
        label: "Grille d’audit en 26 critères",
        description: "La trame de visite à imprimer pour votre premier tour.",
      },
      {
        href: "/fiches-pratiques/green-it-entreprise",
        label: "Démarche Green IT en entreprise",
        description: "Le pas à pas complet pour structurer votre démarche.",
      },
    ],
    sourceLinks: [
      { label: "Rapport ADEME-Arcep 2023 (librairie ADEME)", url: "https://librairie.ademe.fr/consommer-autrement/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html" },
    ],
    sources: [
      "ADEME-Arcep, enquête annuelle sur l’empreinte environnementale du numérique (2023)",
      "ADEME, analyse du cycle de vie des appareils reconditionnés (2022)",
      "Arcep, enquête annuelle « Pour un numérique soutenable » (2026)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-reconditionne-calcul.webp",
    imageAlt: "Balance comparant un smartphone reconditionné léger à une pile de boîtes neuves",
    slug: "reconditionne-vs-neuf-le-calcul",
    title: "Reconditionné ou neuf : le calcul, sans jargon",
    excerpt:
      "75 à 90 % d’impact en moins, vraiment ? D’où vient ce chiffre, ce qu’il faut vérifier avant d’acheter, et les cas où le neuf se défend.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Calculator,
    essential: [
      "Un smartphone neuf, c’est environ 80 kg de CO₂e, presque tout à la fabrication.",
      "Le reconditionné évite une fabrication neuve : 75 à 90 % d’impact en moins.",
      "Vérifiez trois choses : garantie de 2 ans, batterie saine, vendeur établi.",
    ],
    sections: [
      {
        heading: "Pourquoi la fabrication pèse si lourd",
        paragraphs: [
          "Un smartphone concentre des dizaines de métaux extraits sur plusieurs continents, purifiés à haute température, puis assemblés en salle blanche. Résultat : environ 80 kg de CO₂e sur son cycle de vie, dont près de 99 % à la fabrication. L’usage (recharges, réseau) ne pèse presque rien à côté, surtout en France où l’électricité est peu carbonée.",
          "C’est la clé du calcul : chaque année d’usage supplémentaire dilue cet investissement initial. Garder son téléphone 4 ans au lieu de 2 divise son impact annuel par deux, sans rien acheter.",
        ],
        fact: {
          value: "≈ 80 kg",
          label: "Empreinte carbone du cycle de vie d’un smartphone, dont ~99 % à la fabrication",
          source: "ADEME, Impact CO₂ / Base Empreinte, 2025",
          calculation: "80 kg ÷ 2 ans = 40 kg par an, contre 80 ÷ 4 = 20 kg par an",
        },
      },
      {
        heading: "Ce que change vraiment le reconditionné",
        widget: "reconditionne-calc",
        paragraphs: [
          "Un appareil reconditionné, c’est un appareil existant testé, réparé si besoin, effacé et garanti. Comme on évite de fabriquer un appareil neuf, l’impact chute de 75 à 90 % selon l’appareil et la filière. Le prix suit : 30 à 70 % moins cher selon le modèle et le grade esthétique.",
          "La fourchette est large parce que les appareils ne sont pas égaux : un smartphone récent avec batterie neuve évite presque tout l’impact du neuf, tandis qu’un appareil ancien très réparé en évite un peu moins. Dans tous les cas, l’ordre de grandeur reste massivement favorable.",
        ],
        fact: {
          value: "−75 à −90 %",
          label: "Impact évité avec un appareil reconditionné par rapport au neuf",
          source: "ADEME, 2022",
          calculation: "Fourchette selon l’appareil et le parcours de reconditionnement",
        },
      },
      {
        heading: "Les trois vérifications avant d’acheter",
        paragraphs: [
          "Première vérification : la garantie. La garantie légale de conformité dure 2 ans, y compris pour le reconditionné, avec présomption de défaut pendant 24 mois. Un vendeur qui propose moins se disqualifie.",
          "Deuxième vérification : la batterie. Exigez une capacité annoncée (au moins 85 % de la capacité d’origine) ou une batterie neuve. C’est le composant qui vieillit le plus vite, et son remplacement coûte 50 à 80 € : autant l’intégrer au prix dès le départ.",
          "Troisième vérification : le vendeur. Privilégiez les acteurs établis qui affichent grade, tests effectués et durée de garantie. Les places de marché généralistes sans contrôle qualité réservent davantage de surprises.",
        ],
        bullets: [
          "Garantie légale de 2 ans, présomption de défaut pendant 24 mois",
          "Batterie : capacité annoncée ou neuve, prix du remplacement intégré",
          "Vendeur : grade affiché, tests décrits, avis vérifiables",
        ],
      },
      {
        heading: "Quand le neuf se défend (les exceptions)",
        paragraphs: [
          "Le reconditionné n’est pas la réponse à tout. Un besoin professionnel très précis introuvable d’occasion, un appareil de sécurité devant durer dix ans, ou un modèle neuf classé A à l’indice de durabilité et réparable : dans ces cas, acheter neuf et le garder longtemps reste cohérent.",
          "La règle simple : le meilleur appareil est celui qu’on garde. Neuf sobre et durable, ou reconditionné vérifié, les deux chemins mènent au même objectif si la durée de vie suit.",
        ],
        details: [
          {
            title: "D’où vient la fourchette 75 à 90 % ?",
            paragraphs: [
              "Elle vient de l’analyse de cycle de vie publiée par l’ADEME en 2022, qui compare un appareil reconditionné à son équivalent neuf sur l’ensemble des indicateurs (climat, ressources, eau). La borne basse correspond aux appareils les plus réparés, la borne haute à ceux remis en état avec peu d’intervention.",
              "Depuis, les filières se sont professionnalisées et les grades se sont standardisés, mais l’ordre de grandeur tient toujours : éviter une fabrication neuve reste le geste décisif.",
            ],
          },
          {
            title: "La batterie, le point à surveiller",
            paragraphs: [
              "Une batterie usée change tout au quotidien : autonomie en berne, pics d’extinction, charge permanente. À l’achat, une capacité annoncée sous 85 % justifie de négocier le prix ou d’exiger son remplacement.",
              "Bon à savoir : faire remplacer une batterie par un pro coûte 50 à 80 € et prolonge souvent la vie de l’appareil de deux ans. C’est le meilleur rapport euros par année gagnée du marché.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "La fabrication concentre l’impact : chaque année gagnée compte double.",
      "Reconditionné vérifié d’abord, neuf sobre et durable par exception.",
      "Batterie et garantie : les deux lignes à lire avant le prix.",
    ],
    related: [
      {
        href: "/fiches-pratiques/achat-responsable",
        label: "Guide d’achat responsable",
        description: "Grades, garanties et pièges à éviter, en détail.",
      },
      {
        href: "/fiches-pratiques/reparer-prolonger",
        label: "Réparer et prolonger",
        description: "Batterie, écran, adresses utiles pour faire durer.",
      },
      {
        href: "/outils",
        label: "Calculateur d’empreinte",
        description: "Chiffrez votre parc actuel avant de décider.",
      },
      {
        href: "/blog/back-market-portrait-reconditionne",
        label: "Back Market : portrait",
        description: "Le reconditionné à grande échelle, côté plateforme.",
      },
    ],
    sources: [
      "ADEME, analyse du cycle de vie des appareils reconditionnés (2022)",
      "ADEME, Impact CO₂ / Base Empreinte, facteurs d’émission du numérique (2025)",
      "Code de la consommation, garantie légale de conformité (2 ans)",
    ],
    sourceLinks: [
      { label: "ADEME, Impact CO₂ : données d’émission du numérique", url: "https://impactco2.fr" },
    ],
  },
  {
    image: "/greenit/images/blog/blog-pue-5-minutes.webp",
    imageAlt: "Salle de datacenter en coupe avec flux d’air de refroidissement et cadran de mesure",
    slug: "comprendre-le-pue-en-5-minutes",
    title: "Comprendre le PUE en 5 minutes, et poser les bonnes questions",
    excerpt:
      "1,56, 1,2, 1,09 : les hébergeurs affichent leurs PUE comme des trophées. Voici ce que ce chiffre veut vraiment dire.",
    date: "Septembre 2026",
    readingTime: "5 min",
    icon: Zap,
    essential: [
      "Le PUE mesure le surplus d’énergie d’un datacenter au-delà de ses serveurs.",
      "Repères : 1,1 excellent, 1,5 moyenne mondiale, au-delà à optimiser.",
      "Le PUE ne dit ni d’où vient l’électricité, ni combien d’eau est utilisée.",
    ],
    sections: [
      {
        heading: "La définition simple",
        widget: "pue-mini-calc",
        paragraphs: [
          "Un datacenter consomme de l’électricité pour ses serveurs, mais aussi pour les refroidir, les alimenter sans coupure et éclairer les salles. Le PUE (efficacité d’usage de l’énergie) rapporte le total à la seule part des serveurs : un PUE de 1,5 signifie que pour 1 kW utile aux serveurs, le bâtiment consomme 1,5 kW au total.",
          "Le PUE parfait serait 1,0 : tout pour les serveurs, rien pour le reste. Il est inatteignable en pratique, car refroidir et sécuriser l’alimentation coûte toujours un peu d’énergie. Les meilleurs sites frôlent 1,1, la moyenne mondiale tourne autour de 1,56.",
        ],
        fact: {
          value: "1,56",
          label: "PUE moyen des datacenters dans le monde (1,45 en Europe)",
          source: "Uptime Institute, 2024",
        },
      },
      {
        heading: "Lire un PUE sans se tromper",
        paragraphs: [
          "Sous 1,2 : excellent, typique des hyperscalaires récents et des sites à refroidissement optimisé. Entre 1,2 et 1,4 : bon, la norme des hébergeurs sérieux en Europe. Autour de 1,5 : la moyenne mondiale, correcte sans plus. Au-delà de 1,8 : il y a probablement un gisement d’économies (vieux refroidissement, salles à moitié vides).",
          "Méfiez-vous des PUE records affichés sans précision : un PUE théorique de conception n’a pas la même valeur qu’un PUE mesuré sur douze mois, hiver compris. Demandez toujours la période de mesure.",
        ],
      },
      {
        heading: "Ce que le PUE ne dit pas (et c’est beaucoup)",
        paragraphs: [
          "Le PUE ne dit pas d’où vient l’électricité. Un datacenter à PUE moyen alimenté en électricité décarbonée peut émettre moins qu’un excellent PUE branché sur un mix carboné. Il ne dit pas non plus combien d’eau le refroidissement consomme, ni si la chaleur perdue chauffe des logements voisins.",
          "Et il ne dit rien de l’essentiel : vos serveurs sont-ils bien remplis. Un datacenter parfait qui héberge des machines utilisées à 10 % reste un gaspillage. Le taux d’utilisation compte autant que le PUE.",
        ],
        fact: {
          value: "415 TWh",
          label: "Consommation électrique des datacenters dans le monde en 2024, soit ~1,5 % de l’électricité mondiale",
          source: "Agence internationale de l’énergie, 2025",
        },
      },
      {
        heading: "Trois questions à poser à son hébergeur",
        paragraphs: [
          "Première question : ce PUE est-il mesuré ou théorique, et sur quelle période. Deuxième question : d’où vient votre électricité, et quel est le taux de CO₂ du mix que vous utilisez. Troisième question : que devient la chaleur perdue, et quel est votre usage de l’eau.",
          "Un hébergeur sérieux répond en une page, chiffres à l’appui. Un hébergeur qui répond par un slogan vous a déjà répondu.",
        ],
        details: [
          {
            title: "Le calcul, pas à pas",
            paragraphs: [
              "Prenez 100 kW de serveurs avec un PUE de 1,56 : le site consomme 156 kW au total, dont 56 kW pour le refroidissement, les onduleurs et le reste du bâtiment. Avec un PUE de 1,2, le même service ne consommerait que 120 kW : 36 kW économisés en permanence, soit l’équivalent de dizaines de foyers.",
              "Formule à retenir : puissance totale = puissance IT × PUE. Le simulateur de la page datacenters fait ce calcul avec le taux de CO₂ en direct.",
            ],
          },
          {
            title: "Même PUE, carbone différent",
            paragraphs: [
              "En France, le kilowattheure électrique émet peu de CO₂ grâce au mix décarboné, tandis qu’ailleurs il peut en émettre cinq à dix fois plus. Deux datacenters au même PUE peuvent donc avoir des bilans carbone très différents.",
              "C’est pour cela que la page datacenters croise le PUE avec le taux de CO₂ mesuré en direct : l’efficacité sans le mix ne raconte que la moitié de l’histoire.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "PUE bas : bien, mais vérifiez qu’il est mesuré sur douze mois.",
      "Ajoutez le mix électrique, l’eau et le taux d’utilisation au tableau.",
      "Trois questions écrites à l’hébergeur valent tous les slogans.",
    ],
    related: [
      {
        href: "/datacenters",
        label: "Datacenters verts",
        description: "PUE, mix en direct et simulateur d’impact carbone.",
      },
      {
        href: "/fiches-pratiques/datacenters-verts",
        label: "Fiche datacenters et cloud",
        description: "Choisir ses hébergeurs et optimiser, pas à pas.",
      },
      {
        href: "/chiffres",
        label: "Chiffres et données",
        description: "Le mix électrique français mesuré en direct.",
      },
    ],
    sourceLinks: [
      { label: "Données éCO2mix en temps réel (ODRE)", url: "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/table/" },
    ],
    sources: [
      "Uptime Institute, Global Data Center Survey (2024)",
      "Agence internationale de l’énergie, Energy and AI (avril 2025)",
      "RTE, éCO2mix national en temps réel via ODRE (donnée en direct)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-agec-reen.webp",
    imageAlt: "Bureau avec livres de droit, loupe sur un indice de réparabilité et outils de réparation",
    slug: "agec-reen-ce-qui-change",
    title: "AGEC, REEN : ce qui change pour vous, concrètement",
    excerpt:
      "Deux lois, beaucoup d’obligations, et surtout des droits nouveaux : pièces détachées, bonus réparation, garantie prolongée. On trie.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Scale,
    essential: [
      "AGEC (2020) : jeter moins, réparer plus, afficher la réparabilité.",
      "REEN (2021) : le volet numérique, du reconditionné à la sensibilisation.",
      "Vos droits : pièces 7 ans, bonus réparation, garantie prolongée après réparation.",
    ],
    sections: [
      {
        heading: "AGEC, en une phrase",
        paragraphs: [
          "La loi anti-gaspillage pour une économie circulaire, votée en 2020, veut qu’on répare plutôt qu’on jette : indice de réparabilité affiché en magasin, pièces détachées disponibles, fonds réparation qui finance le bonus. Elle concerne tous les objets, pas seulement le numérique.",
          "Concrètement, c’est elle qui a fait apparaître les notes sur 10 à côté des prix, et les chèques réparation chez les réparateurs labellisés.",
        ],
      },
      {
        heading: "REEN, en une phrase",
        paragraphs: [
          "La loi visant à réduire l’empreinte environnementale du numérique, votée en 2021, décline le même principe pour nos écrans et nos réseaux : part de reconditionné dans la commande publique, sensibilisation des élèves et des consommateurs, données environnementales des opérateurs.",
          "Si vous travaillez dans une collectivité ou une administration, c’est ce texte qui justifie d’intégrer le reconditionné dans vos appels d’offres.",
        ],
      },
      {
        heading: "Ce que vous y gagnez, dès aujourd’hui",
        paragraphs: [
          "D’abord, l’information : l’indice de réparabilité puis de durabilité s’affiche avant l’achat (téléviseurs depuis janvier 2025, lave-linge depuis avril 2025), et les pièces détachées doivent rester disponibles 7 ans pour les appareils couverts par le règlement européen 2023/1670.",
          "Ensuite, l’argent : le bonus réparation a versé de 4 à 25 M€ en un an, preuve que le dispositif tourne. Enfin, le temps : depuis l’application de la directive européenne 2024/1799 le 31 juillet 2026, une réparation sous garantie prolonge celle-ci de 12 mois.",
        ],
        fact: {
          value: "4 à 25 M€",
          label: "Bonus réparation versés en un an : le dispositif a été multiplié par 6",
          source: "ADEME, 2025",
          calculation: "Montants versés via le dispositif QualiRépar sur douze mois",
        },
        bullets: [
          "Avant d’acheter : lisez l’indice affiché à côté du prix",
          "En cas de panne : pensez réparateur labellisé et bonus d’abord",
          "Après réparation : conservez la facture, la garantie repart pour 12 mois",
        ],
      },
      {
        heading: "Et demain",
        widget: "agec-timeline",
        paragraphs: [
          "L’indice de durabilité va s’étendre à d’autres appareils, et le réexamen européen de la filière des e-déchets est en cours : les règles de collecte et de recyclage vont se resserrer. Côté entreprises, le reporting de durabilité se concentre avec le paquet Omnibus I, mais les grandes structures restent tenues de publier leurs impacts.",
          "La direction est lisible : des appareils qui durent, des informations affichées, des réparations aidées. Chaque texte nouveau va dans le même sens, ce qui rend les investissements durables (pièces, formation, maintenance) de moins en moins risqués.",
        ],
        details: [
          {
            title: "Les dates à retenir",
            paragraphs: [
              "2020 : loi AGEC, fin du tout-jetable programmé. 2021 : loi REEN, volet numérique. Juin 2025 : application du règlement européen 2023/1670 (5 ans de mises à jour, 7 ans de pièces). Juillet 2026 : application de la directive réparation 2024/1799 (+12 mois de garantie après réparation).",
              "2025 aussi : l’indice de durabilité démarre sur les téléviseurs en janvier puis les lave-linge en avril. Les smartphones suivront le mouvement européen.",
            ],
          },
          {
            title: "Où vérifier avant d’acheter ou de jeter ?",
            paragraphs: [
              "En magasin et en ligne, l’indice affiché près du prix reste votre premier repère. Pour un appareil en fin de vie, le site quefairedemesdechets.ademe.fr indique le point de dépôt le plus proche selon l’objet.",
              "Pour réparer, cherchez un réparateur labellisé QualiRépar : le montant du bonus réparation est déduit directement de votre facture. Trois réflexes, trois sites, zéro excuse.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "Deux lois, un sens : réparer plutôt que jeter.",
      "Vos droits valent de l’argent : bonus, pièces, garantie prolongée.",
      "Lisez l’indice avant d’acheter, gardez la facture après réparation.",
    ],
    related: [
      {
        href: "/reglementation",
        label: "Réglementation",
        description: "Le détail des textes, dates et obligations.",
      },
      {
        href: "/blog/bonus-reparation-mode-emploi",
        label: "Bonus réparation : mode d'emploi",
        description: "Montants, éligibilité et parcours en 10 minutes.",
      },
      {
        href: "/fiches-pratiques/reparer-prolonger",
        label: "Réparer et prolonger",
        description: "Mettre vos nouveaux droits en pratique.",
      },
      {
        href: "/recyclage",
        label: "Recyclage et réparation",
        description: "Points de collecte et fin de vie des appareils.",
      },
      {
        href: "/blog/rgesn-ecoconception-10-minutes",
        label: "Le RGESN en 10 minutes",
        description: "L'autre grand texte de la loi REEN, côté écoconception.",
      },
    ],
    sourceLinks: [
      { label: "Règlement 2023/1670 (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32023R1670" },
      { label: "Directive 2024/1799 (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024L1799" },
    ],
    sources: [
      "Légifrance, loi anti-gaspillage pour une économie circulaire (2020)",
      "Légifrance, loi visant à réduire l’empreinte environnementale du numérique (2021)",
      "EUR-Lex, règlement 2023/1670 et directive 2024/1799",
      "ADEME/Ecosystem, bonus réparation QualiRépar : bilan 2025 et annuaire officiel",
    ],
  },
  {
    image: "/greenit/images/blog/blog-smartphone-reparable.webp",
    imageAlt: "Remplacement de la batterie d’un smartphone avec pièces détachées rangées sur un tapis",
    slug: "un-an-avec-un-smartphone-reparable",
    title: "Un an avec un smartphone réparable : carnet de bord",
    excerpt:
      "Coque, chute, batterie, mises à jour : le récit d’une année sans changer de téléphone, et ce qu’elle enseigne.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Smartphone,
    essential: [
      "Mois 1 : on protège (coque, verre trempé, réglages sobres).",
      "Mois 6 : on répare au lieu de remplacer (pièce disponible, bonus).",
      "Mois 12 : on a économisé des centaines d’euros et la moitié de l’impact annuel.",
    ],
    sections: [
      {
        heading: "Mois 1 à 3 : la prise en main",
        paragraphs: [
          "Tout commence par 20 € bien dépensés : une coque correcte et un verre trempé. Les trois quarts des écrans cassés rencontrent un sol sans protection, et aucune réparabilité ne remplace la prévention.",
          "On règle aussi le téléphone sobrement : luminosité auto, 5G en mode automatique, lecture auto désactivée. Non pas pour « sauver la planète » à soi tout seul, mais parce qu’un téléphone qui tient la journée s’use moins vite, chargeur compris.",
        ],
      },
      {
        heading: "Mois 4 à 6 : la première chute",
        paragraphs: [
          "Elle arrive toujours. La différence avec un téléphone réparable, c’est la suite : la pièce détachée existe, le tutoriel officiel aussi, et le réparateur labellisé QualiRépar applique le bonus déduit de la facture. Écran remplacé en une demi-heure, ou en une journée chez un pro.",
          "Comparez avec l’alternative : un devis qui dépasse la moitié du prix du neuf, trois semaines d’attente, et la tentation de tout racheter. La disponibilité des pièces change la psychologie autant que le budget.",
        ],
      },
      {
        heading: "Mois 7 à 9 : le cap des mises à jour",
        paragraphs: [
          "C’est le cimetière discret des téléphones : plus de mises à jour, applications qui rament, failles non corrigées. Le règlement européen impose désormais 5 ans de mises à jour du système et 7 ans de pièces détachées : un téléphone réparable récent passe ce cap sans broncher.",
          "Vérifiez simplement que les mises à jour sont bien activées et que le stockage n’est pas saturé (un téléphone plein vieillit mal). Le reste suit tout seul.",
        ],
      },
      {
        heading: "Mois 10 à 12 : le bilan",
        widget: "reparable-quiz",
        paragraphs: [
          "Faites les comptes : une batterie à 50 ou 80 € contre 800 € de téléphone neuf, quelques euros de protection, zéro urgence. Et côté climat, garder son téléphone 4 ans au lieu de 2 divise son impact annuel par deux, puisque la fabrication est déjà amortie.",
          "Le plus surprenant, à la fin, c’est l’indifférence devant les nouveaux modèles : quand l’objet marche et qu’on sait le réparer, l’envie de changer s’éteint toute seule.",
        ],
        fact: {
          value: "÷ 2",
          label: "Impact annuel divisé par deux en gardant son téléphone 4 ans au lieu de 2",
          source: "ADEME, Impact CO₂ / Base Empreinte, 2025",
          calculation: "80 kg ÷ 4 ans = 20 kg par an, contre 80 ÷ 2 = 40 kg par an",
        },
        details: [
          {
            title: "Combien ça coûte vraiment, sur un an ?",
            paragraphs: [
              "Protection (20 €), éventuel remplacement de batterie (50 à 80 €), une réparation d’écran avec bonus (souvent sous les 100 € reste à charge) : l’année coûte entre 20 et 200 € selon la malchance. Un renouvellement annuel, lui, coûte le prix d’un téléphone.",
              "Même en cas de grosse casse, le plafond reste le prix d’une réparation, pas celui d’un appareil. C’est cette prévisibilité qui rend le réparable économique.",
            ],
          },
          {
            title: "Et si je ne suis pas bricoleur ?",
            paragraphs: [
              "Bonne nouvelle : la réparabilité profite d’abord aux non-bricoleurs. Pièces disponibles veut aussi dire devis raisonnables et délais courts chez les pros, avec le bonus QualiRépar déduit directement.",
              "Cherchez le label du réparateur, demandez un devis écrit, et gardez la facture : elle prolonge la garantie de 12 mois depuis juillet 2026.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "Protéger d’abord : 20 € de prévention valent une réparation.",
      "Réparer ensuite : pièces, tutos et bonus rendent la panne banale.",
      "Garder enfin : 4 ans au lieu de 2, et l’impact annuel est divisé par deux.",
    ],
    related: [
      {
        href: "/fiches-pratiques/reparer-prolonger",
        label: "Réparer et prolonger",
        description: "Gestes d’entretien et adresses utiles.",
      },
      {
        href: "/fiches-pratiques/achat-responsable",
        label: "Guide d’achat responsable",
        description: "Bien choisir son prochain appareil, neuf ou reconditionné.",
      },
      {
        href: "/recyclage",
        label: "Recyclage et réparation",
        description: "Que faire quand vraiment rien ne marche plus.",
      },
      {
        href: "/blog/fairphone-portrait-telephone-equitable",
        label: "Fairphone : portrait",
        description: "Un téléphone conçu pour durer dix ans.",
      },
    ],
    sources: [
      "ADEME, Impact CO₂ / Base Empreinte, facteurs d’émission du numérique (2025)",
      "ADEME, analyse du cycle de vie des appareils reconditionnés (2022)",
      "EUR-Lex, règlement 2023/1670 (mises à jour 5 ans, pièces 7 ans)",
    ],
    sourceLinks: [
      { label: "Règlement 2023/1670 (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32023R1670" },
    ],
  },
  {
    image: "/greenit/images/blog/blog-back-market-portrait.webp",
    imageAlt: "Vitrine de boutique de smartphones reconditionnés éclairée le soir dans une rue",
    slug: "back-market-portrait-reconditionne",
    title: "Back Market : le reconditionné à grande échelle (portrait)",
    excerpt:
      "Fondée à Paris en 2014, la place de marché annonce 30 millions d’appareils reconditionnés vendus dans 17 pays. Ce que racontent ces chiffres, et leurs limites.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Smartphone,
    essential: [
      "Une place de marché, pas un vendeur : elle relie des reconditionneurs pros et des acheteurs.",
      "Plus de 30 millions d’appareils vendus dans 17 pays, environ 2 Mt de CO₂e évitées selon l’entreprise.",
      "Les chiffres d’impact sont auto-déclarés : utiles comme ordre de grandeur, à lire avec recul.",
    ],
    sections: [
      {
        heading: "L’idée de départ : le neuf n’est pas la seule option",
        paragraphs: [
          "En 2014 à Paris, trois entrepreneurs (Thibaud Hug de Larauze, Vianney Vaute et Quentin Le Brouster) partent d’un constat simple : des millions de téléphones dorment dans les tiroirs pendant que d’autres s’achètent neufs. Leur réponse n’est pas un magasin de plus, mais une place de marché entièrement dédiée aux appareils reconditionnés par des professionnels vérifiés.",
          "L’idée fait son chemin : la société annonce ensuite plus d’un milliard d’euros levés depuis sa création pour développer la plateforme, et fête ses 10 ans en 2024.",
        ],
      },
      {
        heading: "Le modèle : intermédiaire, pas vendeur",
        paragraphs: [
          "Back Market ne possède pas les téléphones qu’elle affiche : elle met en relation des reconditionneurs professionnels et des acheteurs, prend une commission sur chaque vente, et impose une charte qualité avec des grades selon l’état. Les vendeurs les mieux notés sont mis en avant.",
          "Ce modèle a deux conséquences. D’un côté, le choix est immense et les prix baissent par la concurrence entre vendeurs. De l’autre, la qualité dépend de chaque reconditionneur : d’où l’importance des notes, des avis vérifiés et de la garantie, qui reste votre filet de sécurité.",
        ],
        bullets: [
          "Comparez les vendeurs, pas seulement les prix : notes et nombre d’avis",
          "Vérifiez le grade et l’état de la batterie avant de commander",
          "Gardez la facture : la garantie légale de conformité dure 2 ans",
        ],
      },
      {
        heading: "Ce que racontent les chiffres, et leurs limites",
        paragraphs: [
          "Sur sa page de présentation, l’entreprise annonce plus de 30 millions d’appareils reconditionnés vendus dans 17 pays, soit environ 2 millions de tonnes de CO₂e évitées par rapport au neuf. C’est un ordre de grandeur cohérent avec les analyses de cycle de vie du reconditionné, qui attribuent 75 à 90 % d’impact en moins par appareil.",
          "Reste la limite de l’exercice : ces chiffres sont calculés par l’entreprise elle-même, avec sa méthode. Ils décrivent bien une trajectoire, pas une mesure indépendante. La presse économique suit le dossier de près : rentabilité atteinte en Europe en 2024 selon Wikipédia, partenariat avec Bouygues Telecom annoncé en octobre 2025 pour vendre du reconditionné en boutique.",
        ],
        fact: {
          value: "30 M+",
          label: "Appareils reconditionnés vendus dans 17 pays, selon l’entreprise",
          source: "Back Market, page À propos (2026)",
          calculation: "Cumul des ventes déclaré, à lire comme un ordre de grandeur",
        },
        details: [
          {
            title: "Comment lire un chiffre auto-déclaré ?",
            paragraphs: [
              "Un chiffre publié par une entreprise n’est pas faux par principe, mais il sert aussi sa communication : périmètre flatteur, méthode maison, année record mise en avant. Trois réflexes : chercher la méthode, comparer avec une source indépendante (ici l’ADEME 2022 donne la même direction), et retenir l’ordre de grandeur plutôt que le chiffre exact.",
              "Ici, le recoupement est rassurant : éviter une fabrication neuve fait chuter l’impact dans tous les cas, que le total exact soit 1,6 ou 2 millions de tonnes.",
            ],
          },
          {
            title: "Acheter malin sur une place de marché",
            paragraphs: [
              "Triez par note vendeur puis par prix, pas l’inverse. Un grade B chez un vendeur noté 4,5 sur 5 vaut mieux qu’un grade A chez un inconnu sans avis. Lisez les avis qui parlent de la batterie et du service après-vente, ce sont les deux sujets qui comptent vraiment.",
              "Et si la panne arrive malgré tout : réparateur labellisé QualiRépar, bonus déduit de la facture, garantie prolongée de 12 mois depuis juillet 2026.",
            ],
          },
        ],
      },
      {
        heading: "Ce qu’on peut en retenir",
        paragraphs: [
          "Le reconditionné est sorti de la brocante pour devenir une industrie, avec ses places de marché, ses grades et ses garanties. C’est une bonne nouvelle pour les prix et pour la planète, à condition de garder ses réflexes d’acheteur : comparer, vérifier, garder la facture.",
          "Et si vous préférez voir l’appareil avant de l’acheter, le partenariat avec les boutiques d’opérateurs montre que le reconditionné quitte aussi l’écran pour la rue. Le neuf n’a plus le monopole, ni en ligne ni en boutique.",
        ],
      },
    ],
    takeaway: [
      "Place de marché ne veut pas dire vendeur unique : la qualité varie par reconditionneur.",
      "30 millions d’appareils, c’est un ordre de grandeur qui confirme la tendance, pas une mesure.",
      "Acheteur gagnant : notes, grade, batterie, facture gardée.",
    ],
    related: [
      {
        href: "/blog/reconditionne-vs-neuf-le-calcul",
        label: "Reconditionné ou neuf : le calcul",
        description: "D’où vient le 75 à 90 %, et les vérifications avant d’acheter.",
      },
      {
        href: "/fiches-pratiques/achat-responsable",
        label: "Guide d’achat responsable",
        description: "Grades, garanties et pièges à éviter, en détail.",
      },
      {
        href: "/outils",
        label: "Calculateur d’empreinte",
        description: "Chiffrez votre parc actuel avant de décider.",
      },
    ],
    sourceLinks: [
      { label: "Back Market, page À propos officielle", url: "https://www.backmarket.fr/fr-fr/about-us" },
    ],
    sources: [
      "Back Market, page « À propos » officielle, chiffres de l’entreprise (consultée en septembre 2026)",
      "Wikipédia, article Back Market : histoire, partenariats, rentabilité (consulté en septembre 2026)",
      "Les Echos : licorne française (2021), valorisation et levées (2022)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-box-conso.webp",
    imageAlt: "Box internet avec voyants lumineux sur un meuble du salon, la nuit",
    slug: "que-consomme-vraiment-votre-box",
    title: "Que consomme vraiment votre box ?",
    excerpt:
      "Neuf watts en continu, 80 kWh par an, et un interrupteur qui change tout : le récit chiffré de l'appareil le plus fidèle de la maison.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Wifi,
    essential: [
      "Une box allumée jour et nuit consomme environ 80 kWh par an, pour 9 watts en continu.",
      "90 % de cette consommation ne dépend pas de votre usage : l'éteindre est le geste le plus efficace.",
      "À la maison, le Wi-Fi consomme nettement moins que les données mobiles : le bon réseau au bon endroit.",
    ],
    sections: [
      {
        heading: "Le petit radiateur qui ne s'éteint jamais",
        paragraphs: [
          "Votre box consomme en moyenne 9,1 watts en fonctionnement, et elle tourne 24 heures sur 24 : faites le calcul, cela donne environ 80 kWh par an (9,1 × 24 × 365 ÷ 1 000). Ni énorme, ni négligeable : c'est l'ordre de grandeur d'un petit réfrigérateur économe, sauf que personne ne songerait à laisser son frigo ouvert toute la nuit.",
          "À l'échelle du pays, le parc des box et décodeurs TV a consommé 3,4 TWh en 2024, en légère baisse de 3 % sur un an. Cela reste 0,8 % de l'électricité française, et cinq fois la consommation des réseaux fixes eux-mêmes. Autrement dit : les boîtiers consomment bien plus que les tuyaux.",
        ],
        fact: {
          value: "3,4 TWh",
          label: "Consommation du parc français de box et décodeurs TV en 2024",
          source: "Arcep, 2026",
          calculation: "Enquête « Pour un numérique soutenable », édition 2026 sur données 2024, publiée le 21/05/2026",
        },
      },
      {
        heading: "Pourquoi l'éteindre change tout",
        widget: "box-calc",
        paragraphs: [
          "Voici le chiffre qui change la perspective : environ 90 % de la consommation d'une box est invariable, qu'on s'en serve ou non. Regarder un film ou laisser la maison vide, pour elle, c'est pareil. La conclusion s'impose d'elle-même : puisque consommer ne dépend presque pas de l'usage, autant couper quand on ne s'en sert pas.",
          "L'éteindre 8 heures par jour fait économiser environ un tiers de sa consommation annuelle, et 12 heures par jour la moitié. Pour une extinction nocturne classique, comptez de l'ordre de 26 kWh économisés par an, soit quelques euros et un geste qui ne demande aucun effort une fois la prise programmable installée.",
        ],
        details: [
          {
            title: "Et le décodeur, le répéteur ?",
            paragraphs: [
              "Le décodeur TV consomme en moyenne 7,4 watts : éteignez-le avec la télévision, pas seulement la télévision. Les répéteurs Wi-Fi ajoutent chacun une consommation permanente pour étendre le signal : un seul bien placé au centre du logement vaut mieux que deux empilés, et l'Arcep les mesure désormais dans son enquête annuelle.",
              "Couper seulement le Wi-Fi 8 heures par jour (en gardant la box allumée) économise déjà 7 % : une option quand l'extinction complète coince, par exemple avec une alarme connectée.",
            ],
          },
        ],
      },
      {
        heading: "Wi-Fi contre 4G et 5G : l'ordre de grandeur et ses limites",
        paragraphs: [
          "À la maison, passer par le Wi-Fi de la box plutôt que par les données mobiles du téléphone consomme nettement moins : l'ordre de grandeur communément admis est de 4 à 5 fois moins d'énergie. Activez le Wi-Fi automatique à domicile, téléchargez films et mises à jour avant de partir, et gardez la 4G et la 5G pour le dépannage et les déplacements, ce pour quoi elles sont faites.",
          "Un mot d'honnêteté sur ce ratio : c'est un ordre de grandeur, pas une mesure. La valeur exacte varie énormément selon le type de Wi-Fi, la génération et la fréquence du réseau mobile, la distance à l'antenne, l'environnement et les puces des appareils. Retenez la direction, pas le chiffre exact.",
        ],
        details: [
          {
            title: "Pourquoi le mobile consomme plus ?",
            paragraphs: [
              "Pour joindre votre téléphone, le réseau mobile doit émettre en permanence depuis des antennes parfois lointaines, traverser murs et étages, et gérer vos déplacements d'une antenne à l'autre. Le Wi-Fi de la box, lui, couvre quelques mètres en intérieur. Plus le signal parcourt de distance et d'obstacles, plus l'énergie dépensée grimpe des deux côtés, réseau et téléphone.",
              "C'est aussi pour cela que votre téléphone chauffe et se vide vite en zone de mauvaise réception : il crie pour se faire entendre de l'antenne.",
            ],
          },
        ],
      },
      {
        heading: "Choisir et garder : la fin de l'histoire",
        paragraphs: [
          "La « 4G/5G fixe », cette box qui capte le réseau mobile, dépanne bien là où le filaire n'arrive pas. Mais elle utilise le réseau mobile avec son coût énergétique : quand la fibre ou l'ADSL est disponible pour un usage fixe, le filaire reste le choix sobre. Comparez aussi les consommations des box des opérateurs avant de changer d'offre : du simple au double selon les modèles.",
          "Et gardez votre équipement le plus longtemps possible : comme pour les smartphones, la fabrication domine l'impact. Les box et décodeurs reconditionnés existent, et l'enquête de l'Arcep leur consacre désormais un chapitre entier. Rendre sa box en bon état, c'est offrir sa seconde vie.",
        ],
      },
    ],
    takeaway: [
      "80 kWh par an en continu : mesurez votre box avec le calculateur ci-dessus.",
      "Éteindre la nuit rapporte environ 26 kWh par an, sans rien changer d'autre.",
      "Wi-Fi à la maison, mobile dehors : le bon réseau au bon endroit.",
    ],
    related: [
      {
        href: "/fiches-pratiques/box-wifi",
        label: "Fiche box et Wi-Fi",
        description: "Les 5 gestes détaillés, à consulter et imprimer.",
      },
      {
        href: "/fai-box",
        label: "Choisir son FAI et sa box",
        description: "Offres, débits et réglages : bien choisir sans surdimensionner.",
      },
      {
        href: "/fiches-pratiques/teletravail-visio",
        label: "Télétravail et visio",
        description: "Caméra, réseau et poste de travail à distance.",
      },
      {
        href: "/outils",
        label: "Nos outils de calcul",
        description: "Chiffrez le reste de votre empreinte numérique.",
      },
    ],
    sourceLinks: [
      { label: "Arcep, enquête « Pour un numérique soutenable », édition 2026", url: "https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/impact-environnemental/enquete-annuelle-pour-un-numerique-soutenable-edition-2026.html" },
    ],
    sources: [
      "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2026 (données 2024, publiée le 21/05/2026)",
      "Arcep, enquête annuelle « Pour un numérique soutenable », édition 2024 (extinction : −33 % à 8 h/j, −50 % à 12 h/j)",
      "ADEME, Panel Elecdom 2020-2023 (box ~92 kWh/an)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-fairphone-portrait.webp",
    imageAlt: "Smartphone modulaire ouvert montrant ses composants remplaçables, tournevis à côté",
    slug: "fairphone-portrait-telephone-equitable",
    title: "Fairphone : le téléphone équitable (portrait)",
    excerpt:
      "Depuis Amsterdam, une entreprise sociale prouve depuis 2013 qu'on peut vendre des smartphones réparables, traçables et garantis 5 ans. Visite guidée, chiffres à l'appui.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Wrench,
    essential: [
      "Une entreprise sociale, pas un fabricant comme les autres : matériaux traçés, usines mieux payées, téléphone modulaire.",
      "Le modèle de 2025 se répare au tournevis, promet des mises à jour jusqu'en 2033 et affiche 29 kg de CO₂e.",
      "Les chiffres d'impact sont publiés par l'entreprise : solides et audités en partie, à lire comme une trajectoire.",
    ],
    sections: [
      {
        heading: "L'idée de départ : ouvrir la boîte noire",
        paragraphs: [
          "En 2010, au sein du laboratoire créatif Waag à Amsterdam, une campagne alerte sur les minerais du Congo présents dans nos téléphones : étain, tantale, tungstène, or, extraits parfois dans des conditions dramatiques. Le constat des militants : tant qu'on ne fabrique pas soi-même, on ne comprend rien à la chaîne. En janvier 2013, Fairphone devient une entreprise sociale indépendante, fondée par Bas van Abel, Tessa Wernink et Miquel Ballester.",
          "Le principe n'a pas changé depuis : utiliser un téléphone comme outil de récit, pour reconnecter l'acheteur à tout ce qu'il y a derrière l'écran. L'entreprise assume d'ailleurs que son téléphone n'est pas « 100 % équitable » : il est « plus équitable », étape par étape.",
        ],
      },
      {
        heading: "Le modèle : modulaire, réparable, garanti",
        widget: "reparable-quiz",
        paragraphs: [
          "Le Fairphone de 2025 (sixième génération, 599 €) se démonte avec un simple tournevis : 12 pièces remplaçables par l'utilisateur, de la batterie à l'écran en passant par l'appareil photo et le port USB. Les spécialistes d'iFixit lui donnent 10 sur 10 en réparabilité. Les mises à jour sont promises jusqu'en 2033, avec 5 ans de garantie.",
          "Côté matériaux, l'appareil contient plus de 50 % de matériaux équitables ou recyclés en poids : aluminium, cuivre, étain, plastiques et terres rares recyclés, tungstène équitable, or certifié Fairtrade. Et pour chaque appareil vendu, l'équivalent en poids de déchets électroniques est collecté et recyclé : le produit est « neutre en e-déchets ».",
        ],
        details: [
          {
            title: "Équitable, ça veut dire quoi concrètement ?",
            paragraphs: [
              "Trois chantiers : des minerais tracés jusqu'à la mine (lutte contre le travail des enfants, sécurité), des usines où les ouvriers touchent un bonus de salaire décent (1,25 million de dollars versés depuis 2019 à 1 650 ouvriers de cinq usines), et des produits qui durent pour éviter de réextraire. Aucun fabricant classique ne publie ce niveau de détail, ce qui rend la comparaison difficile, dans un sens comme dans l'autre.",
              "La limite honnête : à 599 €, l'appareil photo et les performances restent du milieu de gamme. On paie la traçabilité et la durabilité, pas la fiche technique record.",
            ],
          },
        ],
      },
      {
        heading: "Ce que racontent les chiffres, et leurs limites",
        paragraphs: [
          "Selon l'analyse de cycle de vie publiée par l'entreprise (bureau Fraunhofer IZM pour le modèle précédent, calculs internes pour le nouveau), le Fairphone de 2025 affiche 29 kg de CO₂e sur son cycle de vie, contre 42 pour le précédent : 30 % de moins, grâce aux matériaux recyclés, à l'allègement et à l'énergie renouvelable chez les fournisseurs. En 2025, l'entreprise annonce 145 259 téléphones vendus (+42 %, record) et 2 083 tonnes de CO₂e évitées grâce à la longévité.",
          "Même réserve que pour tout chiffre d'entreprise : périmètre maison, méthode maison. Mais ici le recoupement indépendant existe : audit iFixit, médaille Platine EcoVadis, certification B Corp depuis 2015. Et l'ordre de grandeur colle à la physique : garder un téléphone deux fois plus longtemps divise presque par deux son empreinte, la fabrication dominant le bilan.",
        ],
        fact: {
          value: "29 kg",
          label: "Empreinte carbone annoncée du Fairphone de 2025, contre 42 pour le précédent",
          source: "Fairphone, rapport d'impact 2025 (2026)",
          calculation: "Analyse de cycle de vie publiée par l'entreprise, −30 % d'une génération à l'autre",
        },
      },
      {
        heading: "Ce qu'on peut en retenir",
        paragraphs: [
          "Fairphone ne vendra jamais autant que les géants, et ce n'est pas son but : son rôle est de prouver qu'un autre modèle est viable, pièces détachées et fiches de paie à l'appui. Les idées essaiment d'ailleurs : mises à jour longues et pièces 7 ans sont devenues la loi européenne pour tous.",
          "Si votre téléphone actuel tient encore, le geste le plus Fairphone reste de le garder. Et s'il faut le remplacer, un appareil conçu pour durer dix ans change la question du prix : 599 € divisés par dix ans d'usage, contre deux téléphones jetables entre-temps.",
        ],
      },
    ],
    takeaway: [
      "Modulaire ne veut pas dire bricolage : 10/10 chez iFixit, garantie 5 ans.",
      "29 kg de CO₂e annoncés : une trajectoire crédible, pas une mesure indépendante.",
      "Le plus équitable reste le téléphone qu'on ne rachète pas.",
    ],
    related: [
      {
        href: "/blog/reconditionne-vs-neuf-le-calcul",
        label: "Reconditionné ou neuf : le calcul",
        description: "D'où vient le 75 à 90 %, et les vérifications avant d'acheter.",
      },
      {
        href: "/fiches-pratiques/reparer-prolonger",
        label: "Réparer et prolonger",
        description: "Gestes d'entretien et adresses utiles.",
      },
      {
        href: "/blog/un-an-avec-un-smartphone-reparable",
        label: "Un an avec un smartphone réparable",
        description: "Le carnet de bord d'une année sans téléphone neuf.",
      },
    ],
    sourceLinks: [
      { label: "Fairphone, rapport d'impact 2025", url: "https://www.fairphone.com/impact-report" },
      { label: "Fairphone, à propos (2013, fondateurs)", url: "https://www.fairphone.com/en/about/about-us" },
    ],
    sources: [
      "Fairphone, rapport d'impact 2025 (publié le 22/04/2026 : 145 259 ventes, 29 kg CO₂e, 2 083 t évitées)",
      "Fairphone, communiqué Gen. 6 (25/06/2025 : 12 pièces, support 2033, garantie 5 ans)",
      "The Guardian, test du Fairphone 6 (04/02/2026 : 599 €, 10/10 iFixit)",
      "Wikipédia, article Fairphone (janvier 2013, fondateurs, B Corp 2015)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-envie-portrait.webp",
    imageAlt: "Atelier de réparation d'électroménager avec appareils rénovés alignés en magasin solidaire",
    slug: "envie-portrait-reemploi-solidaire",
    title: "Envie : le réemploi solidaire (portrait)",
    excerpt:
      "Depuis 1984, ce réseau d'entreprises d'insertion répare l'électroménager, forme des salariés et vend 30 à 60 % moins cher. Le réemploi qui embauche.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: HeartHandshake,
    essential: [
      "Un réseau associatif né en 1984 : réparer des appareils pour insérer des personnes éloignées de l'emploi.",
      "2 897 salariés en insertion, 68 % vers l'emploi ou la formation, 215 140 appareils reconditionnés en 2024.",
      "Magasins solidaires : 30 à 60 % moins cher que le neuf, garantie nationale de 2 ans minimum.",
    ],
    sections: [
      {
        heading: "L'idée de départ : un déchet, un emploi",
        paragraphs: [
          "En 1984 à Strasbourg, des travailleurs sociaux proches d'Emmaüs posent une équation simple : des appareils jetés d'un côté, des personnes sans emploi de l'autre. Pourquoi ne pas réparer les premiers pour insérer les secondes ? Le réseau Envie naît de ce triptyque : insertion par l'activité économique, préservation de l'environnement, prix accessibles.",
          "Quarante ans plus tard, la fédération loi 1901 coordonne 53 entreprises d'insertion en France métropolitaine : ateliers de réparation, magasins solidaires, logistique de collecte. Chaque structure est ancrée dans son territoire, avec des emplois non délocalisables.",
        ],
      },
      {
        heading: "Le modèle : collecter, réparer, revendre, insérer",
        widget: "reconditionne-calc",
        paragraphs: [
          "Gros et petit électroménager, multimédia, téléphonie : les appareils collectés sont testés, réparés par des salariés en parcours d'insertion (12 mois de contrat en moyenne), puis revendus 30 à 60 % moins cher que le neuf, avec une garantie nationale Envie de 2 ans minimum. Le réseau s'est diversifié : matériel médical reconditionné, pièces détachées d'occasion, matelas, panneaux solaires.",
          "Côté insertion, 2 897 salariés en parcours, et 68 % d'entre eux retrouvent un emploi durable ou une formation qualifiante à la sortie. L'activité se paie : 149 millions d'euros de chiffre d'affaires en 2024, en partie réinvestis dans la mission.",
        ],
        details: [
          {
            title: "D'où viennent les appareils ?",
            paragraphs: [
              "Dons de particuliers, reprises, collecte dans le cadre de la filière des e-déchets : Envie collecte à lui seul près d'un tiers des DEEE français (206 387 tonnes en 2024). Ce qui peut repartir est réparé, le reste part au recyclage dans les règles. Donner son vieil appareil plutôt que le stocker au garage, c'est alimenter la boucle.",
              "Pour acheter : magasins du réseau partout en France et sites de vente en ligne des adhérents, avec la même garantie de 2 ans qu'en boutique.",
            ],
          },
        ],
      },
      {
        heading: "Ce que racontent les chiffres, et leurs limites",
        paragraphs: [
          "215 140 appareils électroménagers reconditionnés en 2024, 206 387 tonnes de DEEE collectées dont 147 326 traitées : les volumes sont publiés chaque année par la fédération, avec un rapport d'impact social (édition 2025 parue en janvier 2026). L'ancrage public est solide : entreprises d'insertion conventionnées, éco-organismes partenaires, collectivités clientes.",
          "La limite de l'exercice : le réseau mesure ses moyens (appareils, tonnes, parcours) plus que ses tonnes de CO₂e évitées, contrairement aux fabricants qui publient des analyses de cycle de vie. Les deux mesures se complètent : ici, l'impact social est premier et documenté, l'impact carbone se lit en creux, dans chaque fabrication évitée.",
        ],
        fact: {
          value: "68 %",
          label: "Salariés en insertion vers un emploi durable ou une formation qualifiante",
          source: "Envie, 2026",
          calculation: "Sorties dynamiques : CDI, CDD de 6 mois et plus, ou formation qualifiante",
        },
      },
      {
        heading: "Ce qu'on peut en retenir",
        paragraphs: [
          "Avant d'acheter un lave-linge neuf, regardez s'il existe un magasin Envie près de chez vous : l'appareil coûtera moitié prix, durera avec sa garantie de 2 ans, et votre achat financera un parcours d'insertion. Et votre ancien appareil, même en panne, vaut le détour : apporté en point de collecte, il deviendra pièces, matière ou second souffle.",
          "Le réemploi n'est pas qu'une affaire de particuliers malins ou de plateformes : c'est aussi, depuis quarante ans, une économie locale qui embauche. La soutenir, c'est voter deux fois, avec son portefeuille et avec ses dons.",
        ],
      },
    ],
    takeaway: [
      "Réparer pour insérer : 2 897 parcours, 68 % de sorties positives.",
      "Acheter moitié prix avec 2 ans de garantie : le réemploi sans le risque.",
      "Donner ses appareils : la matière première du réseau.",
    ],
    related: [
      {
        href: "/fiches-pratiques/achat-responsable",
        label: "Guide d'achat responsable",
        description: "Grades, garanties et pièges à éviter, en détail.",
      },
      {
        href: "/fiches-pratiques/recyclage-mode-emploi",
        label: "Mode d'emploi du recyclage",
        description: "Où et comment recycler vos appareils.",
      },
      {
        href: "/blog/back-market-portrait-reconditionne",
        label: "Back Market : portrait",
        description: "L'autre visage du reconditionné, côté plateforme.",
      },
    ],
    sourceLinks: [
      { label: "Envie, notre impact (chiffres 2024)", url: "https://www.envie.org/decouvrir-envie/notre-impact/" },
      { label: "Envie, nos activités", url: "http://envie.org/decouvrir-envie/nos-activites" },
    ],
    sources: [
      "Envie, page « Notre impact » (2024 : 215 140 appareils, 206 387 t collectées, 149 M€, 53 entreprises)",
      "Envie, page d'accueil officielle (2 897 salariés en insertion, 68 %, garantie 2 ans, −30 à −60 %)",
      "Envie, rapport d'impact social 2025 (publié le 23/01/2026)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-rgesn-10-minutes.webp",
    imageAlt: "Écran d'ordinateur affichant une liste de critères validés, tasse et carnet sur un bureau",
    slug: "rgesn-ecoconception-10-minutes",
    title: "Le RGESN en 10 minutes : la check-list officielle de l'écoconception",
    excerpt:
      "78 critères, 8 familles, 3 niveaux : le référentiel français de l'écoconception expliqué simplement, avec un mini test pour votre site.",
    date: "Septembre 2026",
    readingTime: "7 min",
    icon: Leaf,
    essential: [
      "Un référentiel public et gratuit : 78 questions pour vérifier qu'un site ou une appli est sobre.",
      "Trois niveaux de priorité, huit familles : de la stratégie à l'hébergement, rien n'est oublié.",
      "Sans déclaration publique, on ne peut pas s'en prévaloir : la transparence d'abord.",
    ],
    sections: [
      {
        heading: "D'où vient ce référentiel ?",
        paragraphs: [
          "La loi REEN a confié à l'Arcep et à l'Arcom, avec l'ADEME, la rédaction d'un référentiel général d'écoconception des services numériques. Après une consultation publique à l'automne 2023 (57 contributions) et des ateliers avec l'écosystème, la version 2 est publiée le 17 mai 2024. La DINUM, la CNIL et Inria ont contribué, sur la base des travaux de la mission interministérielle MiNumEco.",
          "Le point de départ est connu : sans action, l'empreinte carbone du numérique pourrait tripler entre 2020 et 2050 (étude ADEME-Arcep). L'écoconception est l'un des leviers identifiés pour inverser la trajectoire, avec l'allongement de la durée de vie et le réemploi.",
        ],
      },
      {
        heading: "78 questions en 8 familles",
        widget: "rgesn-check",
        paragraphs: [
          "Le référentiel se présente comme 78 critères formulés en questions : « Le service est-il utilisable sur d'anciens terminaux ? », « Les environnements de test sont-ils éteints la nuit ? », « Une déclaration d'écoconception est-elle publiée ? » Chaque critère porte un niveau : Prioritaire, Recommandé ou Modéré, pour organiser l'effort.",
          "Les huit familles couvrent tout le cycle de vie : stratégie, spécifications, architecture, expérience utilisateur, contenus, frontend, backend et hébergement. Testez-vous avec le mini quiz ci-dessus : quatre questions, zéro jargon.",
        ],
        details: [
          {
            title: "Qui décide des niveaux Prioritaire, Recommandé, Modéré ?",
            paragraphs: [
              "Les auteurs du référentiel, au croisement de l'impact potentiel et de la facilité de mise en œuvre : un critère fort et simple devient Prioritaire, un critère utile mais coûteux reste Modéré. Les niveaux guident l'ordre, pas l'obligation : le référentiel accompagne des démarches volontaires, il ne sanctionne pas.",
              "Pour les acheteurs publics et les DSI, ces niveaux font aussi office de grille d'exigence dans les appels d'offres : exiger les critères Prioritaires, c'est déjà filtrer sérieusement.",
            ],
          },
        ],
      },
      {
        heading: "Trois critères qui changent tout",
        paragraphs: [
          "Premier exemple : le service doit rester utilisable sur des terminaux anciens avec des performances adaptées. Un site qui rame sur un téléphone de 5 ans pousse au renouvellement : l'écoconception commence par ne pas exclure. Deuxième exemple : limiter l'économie de l'attention, lecture automatique et défilement infini en tête, qui gonflent les usages sans bénéfice pour l'utilisateur.",
          "Troisième exemple, côté coulisses : éteindre ou mutualiser les environnements de développement et de test hors usage (critère 3.7), compresser les documents au bon format (5.7), mettre en cache côté utilisateur (6.2). Des gestes d'atelier qui, cumulés, pèsent lourd.",
        ],
        fact: {
          value: "78",
          label: "Critères du référentiel, de la stratégie à l'hébergement",
          source: "Arcep et Arcom, 2024",
          calculation: "Version 2 du 28/05/2024, 8 familles, 3 niveaux de priorité",
        },
      },
      {
        heading: "Et après ? Déclarer, partager, progresser",
        paragraphs: [
          "Le point le plus malin du dispositif : pour se prévaloir du référentiel, il faut publier une déclaration d'écoconception, document public et auditable qui dit ce qui est fait et ce qui reste à faire. Fini le « site éco-conçu » sans preuve : la transparence est le prérequis, pas la cerise.",
          "Pour aller plus loin : l'outil d'autoévaluation et NumEcoDiag pour se noter, le Forum des parties prenantes pour partager entre acteurs, et notre fiche écoconception pour les gestes au quotidien. Développeurs : commencez par les critères Prioritaires. DSI : exigez la déclaration dans vos achats. Citoyens : demandez-la à vos fournisseurs.",
        ],
      },
    ],
    takeaway: [
      "78 questions publiques et gratuites : la check-list existe, utilisez-la.",
      "Terminaux anciens, attention, extinction nocturne : les trois réflexes.",
      "Pas de déclaration publique, pas d'écoconception revendiquée.",
    ],
    related: [
      {
        href: "/fiches-pratiques/ecoconception-web",
        label: "Fiche écoconception web",
        description: "Les gestes concrets pour développeurs, à imprimer.",
      },
      {
        href: "/fiches-pratiques/green-it-entreprise",
        label: "Green IT en entreprise",
        description: "La démarche complète pour les organisations.",
      },
      {
        href: "/outils",
        label: "Nos outils de calcul",
        description: "Mesurez avant d'optimiser.",
      },
    ],
    sourceLinks: [
      { label: "RGESN officiel (MiNumEco, version 2024)", url: "https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception" },
      { label: "Arcep, page du référentiel", url: "https://www.arcep.fr/mes-demarches-et-services/entreprises/fiches-pratiques/referentiel-general-ecoconception-services-numeriques.html" },
    ],
    sources: [
      "Arcep et Arcom, RGESN version 2 (17/05/2024, màj 28/05/2024 : 78 critères, 8 familles)",
      "Arcep, communiqué de publication (17/05/2024 : consultation 2023, 57 contributions, forum)",
      "ADEME-Arcep, étude d'impact 2023 (×3 entre 2020 et 2050 sans action)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-bonus-reparation.webp",
    imageAlt: "Établi de réparateur avec smartphone ouvert, tournevis et facture à prix réduit",
    slug: "bonus-reparation-mode-emploi",
    title: "Bonus réparation : le mode d'emploi en 10 minutes",
    excerpt:
      "25 € pour un smartphone, 50 € pour un PC, 60 € pour une TV : la réduction se déduit directement de votre facture chez un réparateur labellisé. Conditions, montants et parcours, sans formulaire.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Wrench,
    essential: [
      "Une réduction déduite directement de votre facture : 25 € pour un smartphone, 50 € pour un portable, 60 € pour un téléviseur.",
      "Conditions : hors garantie, panne qui bloque l'usage, réparateur labellisé QualiRépar.",
      "Le réflexe : devis écrit, facture gardée, réparation garantie 3 mois minimum.",
    ],
    sections: [
      {
        heading: "Le principe : réparer moins cher, sans paperasse",
        paragraphs: [
          "Le bonus réparation est né de la loi anti-gaspillage (AGEC) : pour un appareil en panne, une partie de la réparation est prise en charge, et la réduction apparaît directement sur votre facture. Aucun dossier à remplir, aucun remboursement à attendre : c'est le réparateur qui applique le bonus, puis se fait compenser par la filière.",
          "Car ce n'est pas l'État qui paie : le dispositif est financé par les producteurs, via leurs contributions aux éco-organismes agréés (Ecosystem, Ecologic), selon le principe de responsabilité élargie du producteur. Côté périmètre, le bonus couvre près de 68 appareils électriques et électroniques depuis 2025, et 261 objets au total en comptant les autres filières (vêtements, chaussures, meubles). L'échelle est déjà là : en 2025, plus de 6 500 réparateurs labellisés ont réalisé 1,5 million de réparations aidées, pour 63 M€ de bonus versés.",
        ],
        fact: {
          value: "25 €",
          label: "Bonus pour un téléphone portable, casse d'écran incluse, déduit de la facture",
          source: "Grille officielle QualiRépar, avril 2026",
          calculation: "Tarifs en vigueur au 01/01/2026, label créé par Ecologic et ecosystem",
        },
      },
      {
        heading: "Combien pour vos appareils numériques",
        paragraphs: [
          "Les montants sont forfaitaires et fixés par la grille officielle : téléphone portable 25 €, tablette 25 €, ordinateur portable 50 €, ordinateur fixe ou tout-en-un 50 €, moniteur 30 €, imprimante ou scanner 35 €, console de jeux 20 €, téléviseur 60 €, appareil photo 20 €, vidéoprojecteur 30 €, téléphone fixe 15 €.",
          "Toutes filières confondues (textile et chaussures inclus), le bonus va de 10 à 65 € selon l'appareil, et il est majoré de 20 % si la réparation utilise une pièce issue de l'économie circulaire. En revanche, si la facture est inférieure au montant du bonus, celui-ci ne s'applique pas.",
        ],
        bullets: [
          "Smartphone et tablette : 25 €, sans condition de montant",
          "PC portable et fixe : 50 €, si la réparation coûte au moins 150 €",
          "Téléviseur : 60 €, le plus gros bonus de la grille électrique et électronique",
        ],
        details: [
          {
            title: "Les seuils de déclenchement, c'est quoi ?",
            paragraphs: [
              "Pour certains appareils, le bonus ne s'applique que si la réparation dépasse un montant minimum : 150 € pour un ordinateur ou une imprimante, 100 € pour un moniteur, 120 € pour un vélo électrique (second palier). L'idée est d'éviter que l'aide dépasse le prix réel de l'intervention.",
              "Demandez toujours le devis avant : le réparateur labellisé connaît ces seuils et vous dit aussitôt si le bonus s'applique.",
            ],
          },
        ],
      },
      {
        heading: "Êtes-vous éligible ? Les 4 conditions",
        widget: "bonus-check",
        paragraphs: [
          "Première condition : l'appareil n'est plus couvert, ni par une garantie (légale, commerciale ou extension), ni par une assurance. Deuxième condition : c'est un appareil de ménage, identifiable (plaque signalétique ou IMEI), utilisé normalement et bien entretenu.",
          "Troisième condition : la panne. Sont couvertes les pannes qui empêchent le fonctionnement, y compris les casses (écran, poignée) et les batteries inamovibles. Sont exclus : les dommages purement esthétiques, les consommables, les accessoires, les batteries amovibles et la maintenance logicielle.",
          "Quatrième condition, la plus importante : la réparation doit être faite par un réparateur labellisé QualiRépar. Ni le bricolage maison avec une pièce achetée, ni un réparateur non labellisé n'ouvrent droit au bonus. Testez-vous avec le mini quiz ci-dessus.",
        ],
        bullets: [
          "Hors garantie et hors assurance, appareil de ménage identifiable",
          "Panne qui bloque l'usage, pas les dommages purement esthétiques",
          "Réparateur labellisé QualiRépar, sans exception",
        ],
      },
      {
        heading: "Le parcours en 3 gestes",
        paragraphs: [
          "Premier geste : diagnostiquer. Le site Épargnons nos ressources de l'ADEME propose un diagnostiqueur de pannes et des tutos : de quoi vérifier que l'appareil vaut la réparation avant de vous déplacer.",
          "Deuxième geste : trouver un labellisé. L'annuaire Que faire de mes objets affiche les réparateurs agréés autour de chez vous : demandez un devis écrit en précisant que vous visez le bonus, le montant déduit doit y figurer.",
          "Troisième geste : garder la facture. Elle prouve la réparation, couverte par une garantie commerciale de 3 mois minimum. Et rappel utile : depuis le 31 juillet 2026, une réparation faite sous garantie prolonge celle-ci de 12 mois.",
        ],
        fact: {
          value: "4 à 25 M€",
          label: "Bonus réparation versés en un an : le dispositif a été multiplié par 6",
          source: "ADEME, 2025",
          calculation: "Montants versés via le dispositif QualiRépar sur douze mois",
        },
        details: [
          {
            title: "Les sites officiels à connaître",
            paragraphs: [
              "Que faire de mes objets (quefairedemesdechets.ademe.fr) : l'annuaire et la carte des réparateurs labellisés, les montants par appareil et les conditions d'éligibilité. C'est la porte d'entrée pour agir.",
              "Jerepare.fr : la plateforme officielle commune du bonus (Ecologic, ecosystem, Ecomaison, Refashion) pour vérifier l'éligibilité et trouver un réparateur labellisé, tous objets confondus.",
              "Épargnons nos ressources (epargnonsnosressources.gouv.fr, ex-« Longue vie aux objets ») : les conseils, le diagnostiqueur de pannes, les tutos et les indices de réparabilité. C'est la porte d'entrée pour comprendre.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "Hors garantie + réparateur labellisé = bonus déduit, zéro formulaire.",
      "25 € smartphone, 50 € PC, 60 € TV : vérifiez votre montant avant le devis.",
      "Facture gardée : 3 mois de garantie sur la réparation.",
    ],
    related: [
      {
        href: "/fiches-pratiques/reparer-prolonger",
        label: "Réparer et prolonger",
        description: "Gestes d'entretien et adresses utiles.",
      },
      {
        href: "/blog/un-an-avec-un-smartphone-reparable",
        label: "Un an avec un smartphone réparable",
        description: "Le carnet de bord d'une année sans téléphone neuf.",
      },
      {
        href: "/reglementation",
        label: "Réglementation",
        description: "AGEC, directive réparation et bonus, le détail des textes.",
      },
    ],
    sourceLinks: [
      { label: "Grille officielle des bonus (PDF, avril 2026)", url: "https://www.label-qualirepar.fr/wp-content/uploads/2026/04/Grille-des-bonus-reparation_2026.04.02.pdf" },
      { label: "Montants et éligibilité (Ecosystem)", url: "https://www.ecosystem.eco/comprendre/bonus-reparation" },
      { label: "Bonus : comment ça marche (économie.gouv.fr, 11/09/2026)", url: "https://www.economie.gouv.fr/particuliers/mes-droits-conso/bien-consommer/bonus-reparation-comment-ca-marche" },
      { label: "Plateforme officielle du bonus (jerepare.fr)", url: "https://jerepare.fr/" },
      { label: "Le Bonus réparation (ADEME)", url: "https://epargnonsnosressources.gouv.fr/bonus-reparation/" },
      { label: "Montants détaillés et carte des réparateurs (ADEME, màj 24/08/2026)", url: "https://quefairedemesdechets.ademe.fr/bonus-reparation/" },
    ],
    sources: [
      "QualiRépar (Ecologic/ecosystem), grille des bonus réparation (avril 2026, tarifs au 01/01/2026)",
      "Ecosystem, page Bonus Réparation : montants, éligibilité, annuaire (consultée en septembre 2026)",
      "Ministère de l'Économie, « Bonus réparation : comment ça marche ? » (11/09/2026 : 10 à 65 €, +20 % pièce circulaire)",
      "ADEME, bilan du bonus réparation (2025 : 4 à 25 M€)",
      "Jerepare.fr, plateforme officielle du bonus (Ecologic, ecosystem, Ecomaison, Refashion ; consultée en septembre 2026)",
      "ADEME, Épargnons nos ressources, page Bonus réparation (consultée en septembre 2026)",
      "ADEME, Que faire de mes objets, page Bonus Réparation (màj 24/08/2026 : 1,5 M de réparations, 63 M€, 6 500 réparateurs)",
    ],
  },
  {
    image: "/greenit/images/blog/blog-ia-generative.webp",
    imageAlt: "Feuille verte luminescente aux nervures en circuits imprimés devant des baies de serveurs",
    slug: "ia-generative-avis-ademe-2026",
    title: "IA générative : ce que dit l'ADEME en 2026",
    excerpt:
      "485 TWh pour les datacenters mondiaux en 2025, un doublement possible d'ici 2030 : le décryptage de l'avis du 22 juillet 2026, sans catastrophisme ni solution magique.",
    date: "Septembre 2026",
    readingTime: "6 min",
    icon: Sparkles,
    essential: [
      "L'avis de l'ADEME du 22 juillet 2026 : 485 TWh pour les datacenters mondiaux en 2025, un doublement possible d'ici 2030.",
      "Les impacts viennent surtout de l'électricité des datacenters, et du mix électrique derrière la prise.",
      "L'IA « pour la planète » reste minoritaire : ses gains doivent être prouvés, cycle de vie et rebonds inclus.",
    ],
    sections: [
      {
        heading: "Un avis qui fait date",
        paragraphs: [
          "Le 22 juillet 2026, l'ADEME publie un avis au titre sans détour : « L'intelligence artificielle générative, des impacts environnementaux importants ». L'exercice est inédit par son ampleur : panorama des effets directs et indirects, négatifs et positifs, des IA génératives et agentiques, avec des recommandations pour limiter la casse.",
          "Le point de départ est connu : en 2022, le numérique représentait déjà 4,4 % de l'empreinte carbone de la France. L'IA générative y ajoute une couche nouvelle : une course technologique féroce, des investissements massifs, et des usages qui explosent plus vite que les méthodes pour les mesurer.",
        ],
        fact: {
          value: "485 TWh",
          label: "Consommation électrique des datacenters dans le monde en 2025, un doublement possible d'ici 2030",
          source: "ADEME, avis du 22/07/2026",
          calculation: "Doublement = l'équivalent de la consommation du Japon ; ×3,7 en France d'ici 2035",
        },
      },
      {
        heading: "Le gros du problème : l'électricité des datacenters",
        paragraphs: [
          "Premier enseignement : les impacts sont majoritairement liés à la consommation énergétique des centres de données qui entraînent les modèles puis les font tourner au quotidien. D'où une conséquence directe : tout dépend du mix électrique employé. Or les usages numériques français dépendent aux deux tiers de datacenters hébergés à l'étranger, avec des mix bien plus carbonés que le français.",
          "Le reste n'est pas négligeable pour autant : fabrication des serveurs, artificialisation des sols, consommation d'eau de refroidissement. Et un obstacle transverse : l'opacité des acteurs sur les données d'entraînement, la taille des modèles et la consommation réelle, qui complique toute quantification sérieuse.",
        ],
        bullets: [
          "Datacenters d'abord : entraînement des modèles et usages quotidiens",
          "Mix électrique : le même calcul peut émettre du simple au décuple",
          "Serveurs, eau, sols : les impacts hors électricité comptent aussi",
        ],
        details: [
          {
            title: "Pourquoi le mix électrique change tout ?",
            paragraphs: [
              "Un kilowattheure ne vaut pas un autre : produit avec du charbon ou avec du nucléaire et des renouvelables, son contenu carbone varie énormément. Deux datacenters à l'efficacité identique peuvent donc avoir des bilans très différents.",
              "C'est aussi l'argument de la relocalisation : rapatrier en France des usages aujourd'hui hébergés à l'étranger diminue les émissions, à condition de remplacer de l'existant, pas d'ajouter des capacités pour de nouveaux usages.",
            ],
          },
        ],
      },
      {
        heading: "Et vos usages dans tout ça ?",
        widget: "ia-quiz",
        paragraphs: [
          "Deuxième enseignement : l'explosion des usages crée des impacts indirects difficiles à prévoir : stockage de données supplémentaires, terminaux plus énergivores. Chacun de ces usages pris isolément pèse peu ; multipliés par des centaines de millions d'utilisateurs, ils tirent la trajectoire vers le haut.",
          "D'où le mot d'ordre de l'avis côté utilisateurs : un usage raisonné et maîtrisé. Solliciter l'IA quand elle apporte une vraie valeur, désactiver les fonctionnalités « augmentées » dont on ne se sert pas, et garder la main sur ses outils plutôt que de subir les réglages par défaut. Testez vos réflexes avec le mini quiz ci-dessus.",
        ],
        bullets: [
          "Vraie valeur d'abord : l'IA quand elle sert, pas par réflexe",
          "Fonctions « augmentées » : désactivez ce que vous n'utilisez pas",
          "Modèles dimensionnés au besoin, prestataires transparents",
        ],
      },
      {
        heading: "L'IA « pour la planète » : promesse à vérifier",
        paragraphs: [
          "L'argument revient souvent : l'IA aiderait la transition écologique, ce qui compenserait son empreinte. L'avis douche l'enthousiasme : ces applications restent minoritaires et ne relèvent pas des mêmes technologies que les IA génératives, qui concentrent l'essentiel des impacts.",
          "La règle posée est simple et saine : un gain net ne s'affirme qu'après analyse complète du cycle de vie, effets rebond et transferts d'impact inclus. Les premiers cas étudiés montrent des gains réels mais d'ampleur très variable, à penser en complément des autres leviers de décarbonation, jamais à leur place.",
        ],
        fact: {
          value: "×3,7",
          label: "Trajectoire possible de la consommation des datacenters en France d'ici 2035",
          source: "ADEME, avis du 22/07/2026",
          calculation: "Analyse prospective 2026, croissance portée notamment par les services d'IA",
        },
        details: [
          {
            title: "C'est quoi, un effet rebond ?",
            paragraphs: [
              "Une IA qui optimise les livraisons fait rouler moins de camions à service égal (gain réel). Mais si la livraison moins chère fait exploser les commandes, le bilan global peut se dégrader : c'est l'effet rebond, l'économie réalisée qui relance la consommation.",
              "D'où l'exigence de l'avis : mesurer sur tout le cycle de vie et anticiper ces effets, au lieu de compter seulement les gains affichés.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "485 TWh en 2025, doublement possible en 2030 : la trajectoire appelle à la vigilance.",
      "Datacenters et mix électrique : c'est là que se joue l'essentiel.",
      "Usage raisonné, fonctions superflues coupées, promesses vertes vérifiées.",
    ],
    related: [
      {
        href: "/fiches-pratiques/ia-generative",
        label: "Fiche IA générative",
        description: "Comprendre et limiter l'impact, en 10 minutes.",
      },
      {
        href: "/datacenters",
        label: "Datacenters verts",
        description: "PUE, mix en direct et simulateur d'impact carbone.",
      },
      {
        href: "/blog/comprendre-le-pue-en-5-minutes",
        label: "Comprendre le PUE en 5 minutes",
        description: "L'indicateur d'efficacité des datacenters.",
      },
    ],
    sourceLinks: [
      { label: "Communiqué ADEME (22/07/2026)", url: "https://www.ademe.fr/presse/communique-national/ia-generative-comment-quantifier-les-impacts/" },
      { label: "L'avis complet (librairie ADEME)", url: "https://librairie.ademe.fr/economie-circulaire-et-dechets/9495-avis-de-l-ademe-l-intelligence-artificielle-generative-des-impacts-environnementaux-importants.html" },
    ],
    sources: [
      "ADEME, avis « L'intelligence artificielle générative, des impacts environnementaux importants » (22/07/2026 : 485 TWh, ×2 en 2030, ×3,7 France 2035)",
      "ADEME, communiqué « IA générative, comment quantifier les impacts ? » (22/07/2026)",
      "Agence internationale de l'énergie, Energy and AI (avril 2025)",
      "ADEME-Arcep, enquête annuelle sur l'empreinte environnementale du numérique (2023)",
    ],
  },
  {
    slug: "greenwashing-numerique-reperes",
    title: "Greenwashing numérique : 3 réflexes pour ne plus se faire avoir",
    excerpt:
      "« Cloud vert », « neutre en carbone », « dématérialisé donc écologique » : comment trier les promesses, ce que la loi exige depuis 2023, et les bons réflexes avant d'acheter.",
    date: "Septembre 2026",
    readingTime: "5 min",
    icon: Megaphone,
    essential: [
      "Le greenwashing, c'est une promesse verte sans preuve : « neutre en carbone », « 100 % compensé », « cloud vert ».",
      "Depuis le 1er janvier 2023, ces allégations sont interdites sans bilan carbone public et trajectoire de réduction (décret 2022-539).",
      "Trois réflexes : exiger le chiffre sourcé, se méfier des formules globales, comparer au cycle de vie complet.",
    ],
    sections: [
      {
        heading: "Des promesses partout, des preuves rarement",
        paragraphs: [
          "Le numérique regorge d'arguments verts : cloud « vert », smartphone « éco-conçu », service « neutre en carbone », dématérialisation présentée comme « zéro impact ». Certaines démarches sont sincères et documentées. Mais sans preuve accessible, une promesse verte ne vaut pas mieux qu'un argument de vente.",
          "Le piège classique, c'est la formule globale : un mot rassurant (« vert », « écolo », « propre », « neutre ») qui ne dit ni quoi, ni combien, ni par rapport à quoi. Or un bilan sérieux précise toujours le périmètre (fabrication ? usage ? lequel ?), l'année et la source.",
        ],
        bullets: [
          "« Neutre en carbone » ou « 100 % compensé » sans bilan publié",
          "« Vert », « écolo », « propre » sans périmètre ni chiffre",
          "« Dématérialisé » vendu comme « zéro impact », alors que serveurs et réseaux tournent 24h/24",
        ],
      },
      {
        heading: "Ce que la loi exige depuis 2023",
        paragraphs: [
          "La loi climat et résilience (2021) a serré la vis : le décret n° 2022-539 interdit depuis le 1er janvier 2023 d'affirmer qu'un produit ou un service est « neutre en carbone », « zéro carbone », « climatiquement neutre », « intégralement compensé » ou « 100 % compensé », sauf à rendre publics un bilan des émissions sur tout le cycle de vie, une trajectoire de réduction et les modalités de compensation.",
          "Côté publicité, la recommandation Développement durable de l'ARPP (version 3, août 2020) exige des arguments justifiés par des éléments objectifs et vérifiables. Et ça se contrôle : le bilan ADEME-ARPP 2023-2024 a passé en revue 1 015 publicités à argument environnemental, avec 93,6 % de conformité et 41 manquements relevés.",
        ],
        fact: {
          value: "93,6 %",
          label: "Publicités à argument environnemental jugées conformes en 2023-2024, sur 1 015 analysées (41 manquements)",
          source: "ADEME-ARPP, bilan Publicité et environnement 2023-2024 (02/10/2024)",
        },
      },
      {
        heading: "3 réflexes avant d'y croire",
        paragraphs: [
          "Pas besoin d'être expert pour trier : trois questions simples éliminent la plupart des promesses en l'air, sans se priver et sans culpabiliser.",
        ],
        bullets: [
          "Exiger le chiffre sourcé : un vrai engagement cite une étude, un bilan, une année vérifiable",
          "Se méfier des formules globales : « vert » ne dit ni quoi, ni combien, ni par rapport à quoi",
          "Regarder tout le cycle de vie : la fabrication concentre l'essentiel de l'empreinte (ADEME-Arcep 2023 ; ADEME, Impact CO₂ 2025), un accessoire « vert » ne change pas le bilan d'un appareil",
        ],
        details: [
          {
            title: "Et si la preuve existe, où la trouver ?",
            paragraphs: [
              "Une allégation « neutre en carbone » en règle renvoie vers un bilan d'émissions public, mis à jour chaque année, avec la trajectoire de réduction et le détail de la compensation. Si ce lien n'existe pas ou mène à une page floue, la promesse ne respecte pas le décret 2022-539.",
              "Pour le reste, les repères fiables restent les mêmes que partout sur ce site : ADEME (Impact CO₂, Base Empreinte), Arcep (enquête annuelle), Global E-waste Monitor pour les déchets, et les labels vérifiables plutôt que les slogans.",
            ],
          },
        ],
      },
    ],
    takeaway: [
      "Promesse verte sans preuve publique : c'est du marketing, pas un bilan.",
      "Depuis 2023, « neutre en carbone » sans bilan et trajectoire publiés est interdit.",
      "Chiffre sourcé, périmètre précis, cycle de vie complet : les trois réflexes.",
    ],
    related: [
      {
        href: "/faq",
        label: "La FAQ",
        description: "La question « comment repérer le greenwashing ? » et 27 autres réponses.",
      },
      {
        href: "/ressources#glossaire",
        label: "Glossaire : greenwashing, GES, ACV",
        description: "Les définitions pour décrypter les arguments verts.",
      },
      {
        href: "/fiches-pratiques/gestes-quotidiens",
        label: "7 gestes quotidiens",
        description: "Des actions vérifiées plutôt que des promesses.",
      },
    ],
    sourceLinks: [
      { label: "Décret 2022-539 sur Légifrance", url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000045570611" },
      {
        label: "Ministère : la lutte contre l'éco-blanchiment",
        url: "https://www.ecologie.gouv.fr/politiques-publiques/lutte-contre-leco-blanchiment-publicites",
      },
      {
        label: "ARPP, recommandation Développement durable",
        url: "https://www.arpp.org/nous-consulter/regles/regles-de-deontologie/developpement-durable",
      },
      {
        label: "Bilan ADEME-ARPP Publicité et environnement 2023-2024",
        url: "https://www.arpp.org/actualite/bilan-publicite-et-environnement-2023-2024",
      },
    ],
    sources: [
      "Décret n° 2022-539 du 13 avril 2022, allégations de neutralité carbone (applicable au 01/01/2023)",
      "ARPP, recommandation Développement durable v3 (août 2020)",
      "ADEME-ARPP, bilan Publicité et environnement 2023-2024 (02/10/2024 : 1 015 publicités, 93,6 % conformes, 41 manquements)",
      "ADEME, Impact CO₂ (mise à jour 2025) ; ADEME-Arcep 2023 (fabrication ≈ 75 % des impacts)",
    ],
  },
]

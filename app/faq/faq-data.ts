export const faqCategories = [
  {
    category: "Général",
    color: "emerald",
    questions: [
      {
        q: "Qu'est-ce que le Green IT ?",
        a: "Le Green IT (ou numérique responsable) désigne l'ensemble des pratiques visant à réduire l'empreinte environnementale du numérique. Cela inclut la conception, l'utilisation et la fin de vie des équipements électroniques (ordinateurs, smartphones, serveurs...) et des services numériques (sites web, applications, cloud...).",
      },
      {
        q: "Pourquoi le numérique pollue-t-il ?",
        a: "L'impact environnemental du numérique provient de trois sources principales : 1) La fabrication des équipements (extraction de matières premières, production, transport) qui représente environ 75 % des impacts tous indicateurs (et ~99 % de l'empreinte carbone d'un smartphone), 2) L'utilisation (consommation d'électricité), 3) La fin de vie (déchets électroniques difficiles à recycler). Un smartphone nécessite par exemple 70 kg de matières premières et émet environ 80 kg de CO₂ sur son cycle de vie (ADEME-Arcep 2023 ; ADEME, Impact CO₂ 2025).",
      },
      {
        q: "Quel est l'impact du numérique en France ?",
        a: "En France, le numérique représente 2,5 % des émissions nationales en 2020 (17,2 Mt CO₂eq) et 4,4 % en 2022 avec un périmètre élargi aux datacenters étrangers (29,5 Mt, ADEME-Arcep). En France, environ 1,6 million de tonnes de déchets électroniques sont produites chaque année, avec un taux de collecte d'environ 46 % (ADEME 2024, Eurostat 2024).",
      },
      {
        q: "Le cloud, c'est vraiment dans des nuages ?",
        a: "Non : le cloud, ce sont des datacenters bien physiques. En 2025, la consommation électrique mondiale des centres de données était d'environ 485 TWh, et elle pourrait doubler d'ici 2030 (ADEME, avis IA 2026). Les usages numériques français dépendent aux deux tiers de datacenters hébergés à l'étranger, souvent avec un mix électrique plus carboné qu'en France. Bonne nouvelle : le cloud mutualise des ressources souvent mieux utilisées qu'un serveur local, et le stockage pèse peu (0,24 g CO₂e/Go/an, ADEME, Impact CO₂). Le geste qui compte reste la durée de vie des appareils.",
      },
      {
        q: "Peut-on vraiment faire une différence individuellement ?",
        a: "Oui, à plusieurs niveaux. Garder son smartphone 4 ans au lieu de 2 divise son impact par 2. À l'échelle nationale, si tous les Français gardaient 11 types d'équipements 1 an de plus, on éviterait environ 0,6 million de tonnes de CO₂ par an (ADEME, 2020). Chaque geste compte, surtout multiplié par des millions d'utilisateurs.",
      },
      {
        q: "Comment repérer le greenwashing dans le numérique ?",
        a: "Méfiez-vous des formules globales sans preuve : « neutre en carbone », « 100 % compensé », « cloud vert », « dématérialisé donc écologique ». Depuis le 1er janvier 2023, ces allégations sont interdites sans bilan carbone public et trajectoire de réduction (décret 2022-539). Trois réflexes : exiger le chiffre sourcé, vérifier le périmètre et l'année, et comparer au cycle de vie complet (la fabrication concentre l'essentiel de l'empreinte).",
        link: { label: "Lire l'article : 3 réflexes anti-greenwashing", url: "/blog/greenwashing-numerique-reperes" },
      },
    ],
  },
  {
    category: "Achat & Équipement",
    color: "blue",
    questions: [
      {
        q: "Faut-il acheter neuf ou reconditionné ?",
        a: "Le reconditionné est fortement recommandé : un appareil reconditionné a un impact environnemental réduit d'environ 75 à 90 % par rapport au neuf (ADEME, 2022). Choisissez un vendeur certifié : la garantie légale de conformité est de 2 ans, y compris pour le reconditionné, avec les défauts présumés antérieurs pendant 24 mois.",
      },
      {
        q: "Comment choisir un appareil durable ?",
        a: "Vérifiez l'indice de réparabilité (obligatoire depuis 2021) et visez au moins 7/10. Pensez aussi aux repères 2025 : indice de durabilité sur les téléviseurs et lave-linge, étiquette énergie UE sur les smartphones (règlement 2023/1669), 7 ans de pièces détachées (règlement 2023/1670). Privilégiez les marques offrant des pièces détachées et un SAV de qualité. Choisissez des appareils modulaires (batterie remplaçable) et avec un support logiciel longue durée (5 ans et plus). Évitez le suréquipement : achetez selon vos besoins réels, pas les dernières fonctionnalités.",
      },
      {
        q: "Qu'est-ce que l'indice de réparabilité ?",
        a: "C'est une note sur 10 obligatoire en France depuis janvier 2021 pour les smartphones, ordinateurs, téléviseurs, lave-linge et tondeuses à gazon. Il évalue 5 critères : documentation technique, démontabilité, disponibilité des pièces détachées, prix des pièces et critères spécifiques au produit. Un indice élevé (>7/10) indique un appareil facile à réparer.",
      },
      {
        q: "Combien de temps garder ses appareils ?",
        a: "Objectif minimum : 5 ans pour un smartphone, 7 ans pour un ordinateur, 10 ans pour une TV. Actuellement, les Français changent de smartphone en moyenne tous les 3 ans (ADEME, 2026). Passer de 2 à 3 ans réduit l'impact annuel d'environ un tiers (ADEME 2026). La fabrication représentant environ 75 % des impacts tous indicateurs, allonger la durée d'usage est le geste le plus efficace.",
      },
    ],
  },
  {
    category: "Usage & Quotidien",
    color: "teal",
    questions: [
      {
        q: "Comment réduire la consommation électrique de mes appareils ?",
        a: "Actions principales : 1) Éteindre complètement (pas juste en veille) la nuit et quand inutilisés, 2) Débrancher box internet la nuit (environ 26 kWh/an économisés, soit ~5 €/an, Arcep 2026), 3) Régler luminosité à 50 % max, 4) Activer mode économie d'énergie, 5) Privilégier Wi-Fi à 4G/5G (environ 4 à 5 fois moins énergivore en streaming), 6) Utiliser multiprise avec interrupteur.",
      },
      {
        q: "Le streaming vidéo pollue-t-il vraiment ?",
        a: "Oui, de manière significative. 1h de streaming en 4K consomme ~7 Go de données et émet de l'ordre de 300 g de CO₂ ; en HD ~100 g, en qualité réduite ~30 g (fourchette 56-400 g/h selon les hypothèses, Shift 2019 / Kamiya 2020 ; très dépendant du mix électrique). Le streaming vidéo représente environ 60 % du trafic internet mondial (Sandvine, 2024). Actions : privilégier 720p, télécharger les contenus regardés plusieurs fois, désactiver lecture automatique, éviter le streaming sur mobile en 4G/5G.",
        link: { label: "Estimez votre streaming avec notre outil", url: "/outils" },
      },
      {
        q: "Les emails polluent-ils vraiment ?",
        a: "L'impact individuel d'un email est faible (4 g pour un e-mail simple, jusqu'à ~35 g avec pièce jointe, ADEME), mais multiplié par des milliards d'emails quotidiens, ça compte. Bonnes pratiques : supprimer emails avec grosses pièces jointes, désabonner des newsletters inutiles, compresser les pièces jointes, nettoyer boîte mail régulièrement.",
      },
      {
        q: "Mon vieux PC peut-il encore servir ?",
        a: "Souvent, oui. Avant de racheter : 1) ajoutez de la RAM et passez sur un SSD (souvent moins de 100 €), 2) installez un système léger (Linux) si Windows ne suit plus, 3) pour la bureautique et le web, un ordinateur de 8-10 ans reste utilisable. Un ordinateur fixe neuf représente environ 259 à 300 kg CO₂e sur son cycle de vie selon le profil (ADEME, Impact CO₂ 2025) : chaque année gagnée compte. S'il est vraiment hors d'usage : don (Emmaüs, Envie) ou filière DEEE agréée, jamais la poubelle.",
      },
      {
        q: "Faut-il supprimer ses données dans le cloud ?",
        a: "Bonne nouvelle : le stockage pèse très peu. Stocker 1 Go dans le cloud pendant un an émet environ 0,24 g de CO₂e (ADEME, Impact CO₂ / Base Empreinte). Trier vos photos en double reste une bonne habitude pour y voir plus clair, mais sans pression : le geste qui compte vraiment, c'est de garder votre smartphone le plus longtemps possible (environ 80 kg de CO₂e sur son cycle de vie, ADEME, Impact CO₂ 2025). Un petit tri de temps en temps, vider les téléchargements et désactiver les sauvegardes automatiques superflues suffit amplement.",
      },
    ],
  },
  {
    category: "Réparation & Recyclage",
    color: "orange",
    questions: [
      {
        q: "Où faire réparer mes appareils ?",
        a: "Plusieurs options : 1) SAV du fabricant ou revendeur agréé, 2) Réparateurs indépendants labellisés, 3) Repair Cafés (gratuits, entraide), 4) Ressourceries et structures de l'économie sociale et solidaire (Emmaüs, Envie, etc.). Le bonus réparation (10 à 65 € selon l'appareil, 25 € pour un smartphone) est déduit directement de votre facture par les réparateurs labellisés QualiRépar. Trouvez le professionnel le plus proche sur l'annuaire officiel.",
        link: { label: "Annuaire officiel : Que faire de mes objets", url: "https://quefairedemesdechets.ademe.fr" },
      },
      {
        q: "Vaut-il mieux réparer ou racheter ?",
        a: "Réparer est presque toujours préférable écologiquement. Exemple smartphone : remplacement batterie (60-80 €) vs achat neuf (environ 80 kg CO₂ pour le cycle de vie, ADEME 2025). Même un appareil réparé à 50 % de son prix initial reste plus écologique que le neuf. Seule exception : si réparation très coûteuse (>70 % du prix neuf) et appareil très ancien (>8 ans) avec mauvaise efficacité énergétique.",
      },
      {
        q: "Comment recycler mes vieux appareils ?",
        a: "À déposer dans une filière de collecte agréée (jamais dans la poubelle) : 1) Reprise magasin (obligation 1 pour 1 : ils reprennent gratuitement l'ancien), 2) Points de collecte (déchetteries, magasins, mairies), 3) Bornes Ecosystem/Écologic, 4) Don à associations (Emmaüs, Envie) si fonctionnel. Effacez vos données avant. En France, l'objectif de collecte des DEEE est de 65 % depuis 2019 (directive européenne), un objectif rarement atteint.",
      },
      {
        q: "Que deviennent les appareils recyclés ?",
        a: "Les DEEE (Déchets d'Équipements Électriques et Électroniques) sont démontés pour récupérer : métaux précieux (or, argent, cuivre), plastiques, verres. En France, environ 79 % des DEEE collectés sont recyclés ou réutilisés (Ecosystem, 2024). Problème : certains composants (terres rares, batteries lithium) difficiles à recycler. C'est pourquoi prolonger la durée de vie et réemployer sont prioritaires sur le recyclage.",
      },
    ],
  },
  {
    category: "Développement & Professionnel",
    color: "violet",
    questions: [
      {
        q: "Qu'est-ce que l'écoconception web ?",
        a: "L'écoconception web consiste à créer des sites et applications numériques en minimisant leur impact environnemental. Principes : réduire le poids des pages (idéal <500 Ko), optimiser images (WebP, AVIF), minimiser JavaScript, lazy loading, choisir hébergeur vert, optimiser requêtes base de données. Un site éco-conçu est aussi plus rapide et accessible.",
      },
      {
        q: "Comment mesurer l'impact environnemental d'un site web ?",
        a: "Outils disponibles : EcoIndex (note A à G), Website Carbon Calculator, GreenFrame, Lighthouse (Google). Ils mesurent : poids page, requêtes serveur, consommation électrique estimée. Objectif : EcoIndex >B, page <1 Mo, <50 requêtes. L'empreinte d'une page dépend surtout de son poids : une page moyenne pèse environ 2,5 Mo (HTTP Archive, 2025) : testez la vôtre avec notre estimateur dans /outils. Le site le plus éco-conçu peut descendre à environ 0,1 g CO₂ par vue (ordre de grandeur).",
        link: { label: "Tester avec notre estimateur", url: "/outils" },
      },
      {
        q: "Quels langages de programmation sont les plus éco-responsables ?",
        a: "Classement par efficacité énergétique : 1) C/C++/Rust (référence), 2) Java, 3) C#, 4) JavaScript/TypeScript, 5) PHP, 6) Python (environ 76x moins efficace que C, Pereira et al., 2017). Pour le web : préférer code natif optimisé, frameworks légers, compilation native. Attention : lisibilité et maintenabilité restent prioritaires. L'optimisation algorithmique compte plus que le langage.",
      },
      {
        q: "L'IA générative, quel est son impact environnemental ?",
        a: "Des impacts réels, majoritairement liés aux datacenters qui entraînent et font tourner les modèles : la consommation électrique mondiale des centres de données était d'environ 485 TWh en 2025 et pourrait doubler d'ici 2030 ; en France, elle pourrait être multipliée par 3,7 d'ici 2035 (ADEME, avis « L'intelligence artificielle générative, des impacts environnementaux importants », juillet 2026). La fabrication des serveurs et la consommation d'eau comptent aussi, et la transparence des acteurs reste limitée. Côté usages : sollicitez l'IA quand elle apporte une vraie valeur, désactivez les fonctions « augmentées » inutiles, privilégiez des services éco-conçus (référentiels AFNOR IA frugale et RGESN). L'IA « pour la transition écologique » reste minoritaire : ses gains doivent être vérifiés sur tout le cycle de vie, effets rebond inclus.",
      },
      {
        q: "Comment mettre en place une stratégie Green IT en entreprise ?",
        a: "Étapes clés : 1) Mesurer empreinte actuelle (parc informatique, datacenters, usage), 2) Fixer objectifs chiffrés (réduction 30-50 % sur 3 ans), 3) Nommer référent Green IT, 4) Former équipes, 5) Allonger durée de vie équipements (5-7 ans), 6) Privilégier reconditionné, 7) Optimiser datacenters (PUE < 1,5), 8) Écoconception services numériques, 9) Mesurer progrès annuellement.",
      },
    ],
  },
  {
    category: "Réglementation & Politique",
    color: "indigo",
    questions: [
      {
        q: "Quelles sont les principales lois en France ?",
        a: "Lois majeures : 1) Loi AGEC (2020) : indice réparabilité, lutte obsolescence programmée, 2) Loi REEN (2021) : mesure impact numérique, écoconception services publics, 3) Droit à la réparation européen (directive 2024/1799, applicable depuis juillet 2026), 4) Indice de durabilité (TV et lave-linge depuis 2025 ; smartphones : étiquette énergie UE depuis juin 2025). Obligations : affichage indices, disponibilité des pièces détachées 5 à 10 ans selon les produits, mises à jour logicielles longues.",
      },
      {
        q: "Qu'est-ce que la REP (Responsabilité Élargie du Producteur) ?",
        a: "La REP impose aux fabricants et distributeurs de financer la collecte et le recyclage de leurs produits en fin de vie. En France, éco-organismes agréés : Ecosystem (grand public), Écologic (professionnels), Screlec (piles). Les fabricants paient une éco-contribution (visible sur facture) finançant le système. Objectif : 65 % de collecte des DEEE depuis 2019 (directive européenne).",
      },
      {
        q: "Que prévoit le droit à la réparation européen ?",
        a: "Adoptée en 2024 (directive 2024/1799), applicable depuis le 31 juillet 2026, elle impose : 1) Obligation de réparer hors garantie (prix raisonnable, smartphones et tablettes inclus), 2) Pièces détachées et documentation accessibles, 3) Garantie prolongée de 12 mois si réparation sous garantie, 4) Annuaire officiel : Que faire de mes objets (ADEME).",
        link: { label: "Le détail dans notre page réglementation", url: "/reglementation" },
      },
      {
        q: "Y a-t-il des aides financières pour la réparation ?",
        a: "Oui, plusieurs dispositifs en France : 1) Bonus réparation : de 10 à 65 € selon l'appareil (25 € pour un smartphone), déduit directement de votre facture par un réparateur labellisé QualiRépar, hors garantie (Ecosystem/Ecologic), 2) Fonds réparation via éco-organismes, 3) Aides locales (certaines régions/communes). Trouvez un réparateur sur l'annuaire officiel (quefairedemesdechets.ademe.fr), et des conseils et tutos sur le site Épargnons nos ressources de l'ADEME (epargnonsnosressources.gouv.fr, ex-« Longue vie aux objets »).",
        link: { label: "Trouver un réparateur labellisé près de chez vous", url: "https://quefairedemesdechets.ademe.fr" },
      },
    ],
  },
]

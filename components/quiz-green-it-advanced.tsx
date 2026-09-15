"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Brain,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  Award,
  RotateCcw,
  Download,
  Lightbulb,
} from "lucide-react"

interface QuizQuestion {
  id: number
  category: string
  difficulty: "facile" | "moyen" | "difficile"
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  source: string
  points: number
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Base de 100 questions Green IT
const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Bases du Green IT (10 questions)
  {
    id: 1,
    category: "Bases du Green IT",
    difficulty: "facile",
    question: "Quelle part de l'empreinte carbone du numérique provient de la fabrication des équipements en France ?",
    options: ["25%", "50%", "80%", "90%"],
    correctAnswer: 2,
    explanation:
      "Environ 80 % de l'empreinte carbone du numérique en France provient de la fabrication des équipements (ADEME-Arcep 2023, données 2020-2022).",
    source: "ADEME-Arcep 2023",
    points: 10,
  },
  {
    id: 2,
    category: "Bases du Green IT",
    difficulty: "facile",
    question: "Que signifie l'acronyme ACV dans le contexte Green IT ?",
    options: [
      "Analyse du Cycle de Vie",
      "Audit Carbone Virtuel",
      "Association Contre le Virus",
      "Achat Circulaire Validé",
    ],
    correctAnswer: 0,
    explanation:
      "ACV signifie Analyse du Cycle de Vie, une méthode pour évaluer l'impact environnemental d'un produit de sa fabrication à sa fin de vie.",
    source: "ISO 14040",
    points: 10,
  },
  {
    id: 3,
    category: "Bases du Green IT",
    difficulty: "moyen",
    question: "Combien de kg de matières premières sont nécessaires pour fabriquer un smartphone de 150g ?",
    options: ["500g", "5 kg", "20 kg", "70 kg"],
    correctAnswer: 3,
    explanation:
      "Il faut environ 70 kg de matières premières pour fabriquer un smartphone de 150g, soit 470 fois son poids.",
    source: "ADEME 2019, La face cachée du numérique",
    points: 15,
  },
  {
    id: 4,
    category: "Bases du Green IT",
    difficulty: "moyen",
    question: "Quelle est la durée de vie moyenne d'un smartphone en France ?",
    options: ["18 mois", "2 à 3 ans", "4 ans", "6 ans"],
    correctAnswer: 1,
    explanation:
      "On change de smartphone en moyenne tous les 3 ans, et sa durée de vie est de 2 à 3 ans (ADEME 2026). Bien entretenu, il peut tenir plus longtemps.",
    source: "ADEME 2026",
    points: 15,
  },
  {
    id: 5,
    category: "Bases du Green IT",
    difficulty: "facile",
    question: "Quel est le principal levier pour réduire l'impact environnemental du numérique ?",
    options: [
      "Éteindre sa box internet",
      "Allonger la durée de vie des équipements",
      "Utiliser le mode avion",
      "Supprimer ses emails",
    ],
    correctAnswer: 1,
    explanation:
      "Allonger la durée de vie des équipements est le levier le plus important car environ 80 % de l'impact vient de la fabrication (ADEME-Arcep 2023).",
    source: "ADEME-Arcep 2023",
    points: 10,
  },
  {
    id: 6,
    category: "Bases du Green IT",
    difficulty: "difficile",
    question: "Quel pourcentage des émissions mondiales de GES le numérique représente-t-il ?",
    options: ["1,5%", "2,5%", "3,4%", "7%"],
    correctAnswer: 2,
    explanation:
      "Le numérique représente environ 3,4 % des émissions mondiales de GES, soit 1,8 Gt CO2e en 2023 (GreenIT EENM 2025).",
    source: "GreenIT EENM 2025",
    points: 20,
  },
  {
    id: 7,
    category: "Bases du Green IT",
    difficulty: "moyen",
    question: "Qu'est-ce que l'effet rebond dans le contexte du numérique ?",
    options: [
      "La réparation d'un écran cassé",
      "L'augmentation de la consommation qui annule les gains d'efficacité",
      "Le recyclage des métaux rares",
      "La mise à jour automatique des logiciels",
    ],
    correctAnswer: 1,
    explanation:
      "L'effet rebond désigne l'augmentation de la consommation qui compense ou annule les gains d'efficacité énergétique.",
    source: "The Shift Project, Lean ICT 2018",
    points: 15,
  },
  {
    id: 8,
    category: "Bases du Green IT",
    difficulty: "facile",
    question: "Quelle est la définition du Green IT ?",
    options: [
      "Utiliser uniquement des ordinateurs verts",
      "Réduire l'impact environnemental du numérique",
      "Acheter des produits Apple",
      "Travailler dans un bureau écologique",
    ],
    correctAnswer: 1,
    explanation:
      "Le Green IT vise à réduire l'empreinte environnementale et sociale du numérique à toutes les étapes du cycle de vie.",
    source: "GreenIT.fr",
    points: 10,
  },
  {
    id: 9,
    category: "Bases du Green IT",
    difficulty: "moyen",
    question: "Combien de terres rares différentes existe-t-il au total ?",
    options: ["5", "17", "34", "50"],
    correctAnswer: 1,
    explanation:
      "Il existe 17 terres rares au total. Un smartphone contient environ 50 métaux différents, dont une poignée de terres rares (ADEME, La face cachée du numérique).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 15,
  },
  {
    id: 10,
    category: "Bases du Green IT",
    difficulty: "difficile",
    question: "Quel taux de déchets électroniques est collecté et recyclé dans le monde ?",
    options: ["5%", "15%", "22%", "85%"],
    correctAnswer: 2,
    explanation:
      "22,3 % des déchets électroniques ont été documentés comme collectés et recyclés en 2022 (Global E-waste Monitor 2024). En France, ce taux atteint environ 45 %.",
    source: "Global E-waste Monitor 2024, ONU",
    points: 20,
  },

  // Matériel et fabrication (10 questions)
  {
    id: 11,
    category: "Matériel et fabrication",
    difficulty: "moyen",
    question: "Quelle quantité d'eau peut être mobilisée pour fabriquer un ordinateur portable ?",
    options: ["20 litres", "200 litres", "1 000 litres", "20 000 litres"],
    correctAnswer: 3,
    explanation:
      "Selon le périmètre, on parle d'environ 1 500 litres d'eau bleue jusqu'à plus de 20 000 litres en comptant l'extraction et la fabrication (ADEME).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 15,
  },
  {
    id: 12,
    category: "Matériel et fabrication",
    difficulty: "facile",
    question: "Quel composant concentre souvent une grande partie de l'impact environnemental d'un smartphone ?",
    options: ["L'écran", "La batterie", "Le processeur", "La carte mère"],
    correctAnswer: 0,
    explanation:
      "L'écran est souvent le composant le plus impactant, sans être une règle universelle : cela dépend du modèle et de l'indicateur choisi (ADEME).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 10,
  },
  {
    id: 13,
    category: "Matériel et fabrication",
    difficulty: "difficile",
    question: "Quelle est l'empreinte carbone de la fabrication d'un ordinateur portable ?",
    options: ["50 kg CO2e", "100 kg CO2e", "150 à 185 kg CO2e", "300 kg CO2e"],
    correctAnswer: 2,
    explanation:
      "La fabrication d'un ordinateur portable se situe autour de 150 à 185 kg CO2e selon les modèles (Base Empreinte ADEME).",
    source: "Base Empreinte ADEME",
    points: 20,
  },
  {
    id: 14,
    category: "Matériel et fabrication",
    difficulty: "moyen",
    question: "Quel pourcentage de l'impact environnemental d'un équipement se produit lors de sa fabrication ?",
    options: ["20-30%", "40-50%", "60-70%", "75-90%"],
    correctAnswer: 3,
    explanation:
      "Pour un smartphone, la fabrication représente environ 75 % de l'impact tous indicateurs, et jusqu'à environ 90 % de son empreinte carbone (ADEME).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 15,
  },
  {
    id: 15,
    category: "Matériel et fabrication",
    difficulty: "facile",
    question: "Qu'est-ce qu'un appareil reconditionné ?",
    options: [
      "Un appareil neuf",
      "Un appareil réparé et remis en état",
      "Un appareil obsolète",
      "Un appareil en panne",
    ],
    correctAnswer: 1,
    explanation:
      "Un appareil reconditionné est un équipement d'occasion qui a été vérifié, réparé si nécessaire, nettoyé et remis en état de fonctionnement.",
    source: "ADEME",
    points: 10,
  },
  {
    id: 16,
    category: "Matériel et fabrication",
    difficulty: "moyen",
    question: "Combien de fois réduit-on l'impact carbone en achetant un smartphone reconditionné plutôt que neuf ?",
    options: ["2 fois", "5 fois", "8 fois", "10 fois"],
    correctAnswer: 2,
    explanation:
      "Acheter un smartphone reconditionné permet de réduire l'impact carbone jusqu'à environ 8 fois par rapport à un neuf (ADEME 2022).",
    source: "ADEME 2022",
    points: 15,
  },
  {
    id: 17,
    category: "Matériel et fabrication",
    difficulty: "difficile",
    question: "Quelle est la consommation énergétique pour produire 1 kg de circuits intégrés ?",
    options: ["100 kWh", "500 kWh", "1 600 kWh", "3 000 kWh"],
    correctAnswer: 2,
    explanation:
      "La production de 1 kg de circuits intégrés nécessite environ 1 600 kWh d'énergie, soit environ 4 mois de consommation d'un foyer français (~4 700 kWh/an).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 20,
  },
  {
    id: 18,
    category: "Matériel et fabrication",
    difficulty: "moyen",
    question: "Quel référentiel évalue la performance environnementale des équipements électroniques ?",
    options: ["Energy Star", "EPEAT", "Ecolabel européen", "Blue Angel"],
    correctAnswer: 1,
    explanation:
      "EPEAT (Electronic Product Environmental Assessment Tool) est un registre d'évaluation environnementale des produits électroniques ; il ne garantit pas à lui seul une conception durable.",
    source: "EPEAT",
    points: 15,
  },
  {
    id: 19,
    category: "Matériel et fabrication",
    difficulty: "facile",
    question: "Combien de temps peut durer un ordinateur portable bien entretenu ?",
    options: ["2-3 ans", "5-7 ans", "8-10 ans", "15 ans"],
    correctAnswer: 1,
    explanation:
      "Un ordinateur portable bien entretenu peut durer 5 à 7 ans, voire plus avec des mises à niveau ciblées.",
    source: "ADEME 2026",
    points: 10,
  },
  {
    id: 20,
    category: "Matériel et fabrication",
    difficulty: "difficile",
    question: "Quelle part de la demande de terres rares est couverte par le recyclage dans le monde ?",
    options: ["1%", "10%", "30%", "50%"],
    correctAnswer: 0,
    explanation:
      "Environ 1 % de la demande de terres rares est couverte par le recyclage à l'échelle mondiale (Global E-waste Monitor 2024).",
    source: "Global E-waste Monitor 2024, ONU",
    points: 20,
  },

  // Usage et sobriété (10 questions)
  {
    id: 21,
    category: "Usage et sobriété",
    difficulty: "facile",
    question: "Quelle action peut réduire sensiblement la consommation d'un ordinateur portable ?",
    options: [
      "Réduire la luminosité de l'écran",
      "Fermer les applications inutilisées",
      "Débrancher la souris",
      "Désactiver le wifi",
    ],
    correctAnswer: 0,
    explanation:
      "Réduire la luminosité peut économiser une part notable de la consommation, variable selon l'écran et la luminosité initiale (ADEME).",
    source: "ADEME",
    points: 10,
  },
  {
    id: 22,
    category: "Usage et sobriété",
    difficulty: "moyen",
    question: "Quelle est la consommation électrique annuelle d'une box internet allumée 24h/24 ?",
    options: ["10-20 kWh", "50-100 kWh", "150-300 kWh", "500 kWh"],
    correctAnswer: 1,
    explanation:
      "Une box typique consomme environ 88 kWh par an en fonctionnement continu, soit environ 10 W (Arcep 2026, données 2024).",
    source: "Arcep 2026",
    points: 15,
  },
  {
    id: 23,
    category: "Usage et sobriété",
    difficulty: "facile",
    question: "Quel est l'impact carbone d'un email simple, sans pièce jointe ?",
    options: ["environ 0,3 g CO2", "environ 4 g CO2", "environ 35 g CO2", "environ 100 g CO2"],
    correctAnswer: 1,
    explanation:
      "Un email simple émet environ 4 g de CO2 ; comptez environ 35 g avec une pièce jointe de 1 Mo et 0,3 g pour un spam (ADEME).",
    source: "ADEME, ACV e-mail 2011",
    points: 10,
  },
  {
    id: 24,
    category: "Usage et sobriété",
    difficulty: "moyen",
    question: "Quelle résolution vidéo consomme le moins de bande passante et d'énergie ?",
    options: ["4K (2160p)", "Full HD (1080p)", "HD (720p)", "SD (480p)"],
    correctAnswer: 3,
    explanation:
      "La SD (480p) consomme environ 10 fois moins de données que la 4K : environ 0,7 Go/h contre ~7 Go/h (Kamiya 2020).",
    source: "Kamiya 2020",
    points: 15,
  },
  {
    id: 25,
    category: "Usage et sobriété",
    difficulty: "difficile",
    question: "Combien de CO2 peut générer 1 heure de streaming vidéo HD ?",
    options: ["de l'ordre de 5 g", "de l'ordre de 50 à 100 g", "de l'ordre de 500 g", "plus de 1 kg"],
    correctAnswer: 1,
    explanation:
      "Les estimations publiées vont d'environ 56 à 400 g/h selon le périmètre ; en HD, l'ordre de grandeur courant est de 50 à 100 g (Shift 2019, Kamiya 2020).",
    source: "Shift 2019, Kamiya 2020",
    points: 20,
  },
  {
    id: 26,
    category: "Usage et sobriété",
    difficulty: "moyen",
    question: "Quelle est la meilleure pratique pour réduire l'impact d'une visioconférence ?",
    options: [
      "Activer la HD",
      "Couper la caméra quand ce n'est pas nécessaire",
      "Utiliser un casque",
      "Enregistrer la réunion",
    ],
    correctAnswer: 1,
    explanation:
      "Couper la caméra réduit fortement la bande passante (souvent 60 à 80 % selon la plateforme et la résolution), donc l'énergie associée.",
    source: "The Shift Project 2019",
    points: 15,
  },
  {
    id: 27,
    category: "Usage et sobriété",
    difficulty: "facile",
    question: "Que signifie le principe de sobriété numérique ?",
    options: [
      "Ne jamais utiliser internet",
      "Utiliser le numérique de manière raisonnée et utile",
      "Acheter uniquement du matériel d'occasion",
      "Travailler sans ordinateur",
    ],
    correctAnswer: 1,
    explanation:
      "La sobriété numérique consiste à utiliser le numérique de manière raisonnée, en questionnant nos besoins réels.",
    source: "The Shift Project, Lean ICT 2018",
    points: 10,
  },
  {
    id: 28,
    category: "Usage et sobriété",
    difficulty: "moyen",
    question: "Combien de données un français consomme-t-il par mois en mobile en 2025 ?",
    options: ["2 Go", "8 Go", "18 Go", "30 Go"],
    correctAnswer: 2,
    explanation: "La consommation mobile moyenne en France atteint environ 18 Go par mois en 2025 (Arcep).",
    source: "Arcep 2025",
    points: 15,
  },
  {
    id: 29,
    category: "Usage et sobriété",
    difficulty: "difficile",
    question: "Quel est l'impact carbone d'un email avec une pièce jointe de 1 Mo ?",
    options: ["1g CO2", "5g CO2", "35g CO2", "50g CO2"],
    correctAnswer: 2,
    explanation:
      "Un email avec une pièce jointe de 1 Mo génère environ 35 g de CO2, contre environ 4 g pour un email simple (ADEME).",
    source: "ADEME, ACV e-mail 2011",
    points: 20,
  },
  {
    id: 30,
    category: "Usage et sobriété",
    difficulty: "moyen",
    question: "Quelle est la consommation électrique d'un smartphone en charge complète ?",
    options: ["0,01 kWh", "0,05 kWh", "0,1 kWh", "0,5 kWh"],
    correctAnswer: 0,
    explanation: "Une charge complète de smartphone consomme environ 0,01 kWh, soit moins de 0,5 centime d'euro.",
    source: "Mesures ADEME",
    points: 15,
  },

  // Réparation et recyclage (10 questions)
  {
    id: 31,
    category: "Réparation et recyclage",
    difficulty: "facile",
    question: "Que signifie l'indice de réparabilité obligatoire depuis 2021 en France ?",
    options: [
      "Le prix de réparation",
      "Une note sur 10 indiquant la facilité de réparation",
      "Le nombre de réparations possibles",
      "La garantie du produit",
    ],
    correctAnswer: 1,
    explanation:
      "L'indice de réparabilité est une note sur 10 qui informe sur la facilité de réparation d'un produit électronique. Depuis 2025, un indice de durabilité le complète pour certains produits.",
    source: "Loi AGEC 2020",
    points: 10,
  },
  {
    id: 32,
    category: "Réparation et recyclage",
    difficulty: "moyen",
    question: "Quelle est la durée minimale de disponibilité des pièces détachées pour un smartphone ?",
    options: ["1 an", "2 ans", "5 ans", "7 ans"],
    correctAnswer: 3,
    explanation:
      "Depuis le 20 juin 2025, le règlement européen 2023/1670 impose 7 ans de disponibilité des pièces détachées pour les smartphones.",
    source: "Règlement UE 2023/1670",
    points: 15,
  },
  {
    id: 33,
    category: "Réparation et recyclage",
    difficulty: "difficile",
    question: "Pourquoi parle-t-on de « mine urbaine » pour les déchets électroniques ?",
    options: [
      "Parce qu'ils contiennent des métaux précieux récupérables",
      "Parce qu'ils sont stockés en ville",
      "Parce qu'ils poussent dans les villes",
      "Parce qu'ils sont gratuits",
    ],
    correctAnswer: 0,
    explanation:
      "Un smartphone contient notamment de l'or, de l'argent, du cuivre et des terres rares ; le recyclage permet d'en récupérer une partie, d'où l'image de « mine urbaine ».",
    source: "Global E-waste Monitor 2024, ONU",
    points: 20,
  },
  {
    id: 34,
    category: "Réparation et recyclage",
    difficulty: "facile",
    question: "Que signifie le sigle DEEE ?",
    options: [
      "Déchets d'Équipements Électriques et Électroniques",
      "Durée Écologique des Équipements Énergétiques",
      "Dispositif d'Économie d'Énergie Électrique",
      "Dépôt d'Électronique Écologique et Économique",
    ],
    correctAnswer: 0,
    explanation:
      "DEEE signifie Déchets d'Équipements Électriques et Électroniques, les e-déchets à recycler obligatoirement.",
    source: "Directive 2012/19/UE",
    points: 10,
  },
  {
    id: 35,
    category: "Réparation et recyclage",
    difficulty: "moyen",
    question: "Combien coûte en moyenne la réparation d'un écran de smartphone cassé ?",
    options: ["20-50€", "50-150€", "150-300€", "300-500€"],
    correctAnswer: 1,
    explanation:
      "Souvent 50 à 150 € selon le modèle et le réparateur ; le bonus réparation peut réduire la facture (25 € pour un smartphone).",
    source: "Ordre de grandeur, QualiRépar 2025",
    points: 15,
  },
  {
    id: 36,
    category: "Réparation et recyclage",
    difficulty: "difficile",
    question: "Quelle quantité de déchets électroniques est produite par personne en France chaque année ?",
    options: ["5 kg", "14 kg", "24 kg", "50 kg"],
    correctAnswer: 2,
    explanation:
      "Chaque français produit environ 24 kg de déchets électroniques par an, soit 1,6 million de tonnes au total.",
    source: "ADEME 2026",
    points: 20,
  },
  {
    id: 37,
    category: "Réparation et recyclage",
    difficulty: "moyen",
    question: "Qu'est-ce que le bonus réparation en France ?",
    options: [
      "Une prime à l'achat d'un produit neuf",
      "Une aide financière pour faire réparer ses équipements",
      "Un crédit d'impôt",
      "Une garantie étendue",
    ],
    correctAnswer: 1,
    explanation:
      "Le bonus réparation est une aide financée par la filière REP (éco-organismes) pour réduire le coût d'une réparation hors garantie.",
    source: "ADEME/DGE 2025",
    points: 15,
  },
  {
    id: 38,
    category: "Réparation et recyclage",
    difficulty: "facile",
    question: "Où peut-on déposer gratuitement ses anciens appareils électroniques ?",
    options: ["À la poubelle", "Dans les déchetteries et magasins", "Dans la rue", "Uniquement chez le fabricant"],
    correctAnswer: 1,
    explanation:
      "Les appareils électroniques peuvent être déposés gratuitement en déchetterie ; en magasin, la reprise est gratuite (1 pour 1, et 1 pour 0 pour certains petits appareils).",
    source: "Directive DEEE 2012/19/UE",
    points: 10,
  },
  {
    id: 39,
    category: "Réparation et recyclage",
    difficulty: "moyen",
    question: "Que représente l'objectif européen de collecte des DEEE de 65 % ?",
    options: ["Un taux atteint partout", "Un objectif réglementaire de collecte", "Un taux de recyclage des matériaux", "Une taxe"],
    correctAnswer: 1,
    explanation:
      "Depuis 2019, la directive DEEE fixe un objectif de collecte de 65 % ; il est rarement atteint. Ne pas confondre collecte, recyclage et valorisation.",
    source: "Directive DEEE 2012/19/UE",
    points: 15,
  },
  {
    id: 40,
    category: "Réparation et recyclage",
    difficulty: "difficile",
    question: "Combien d'appareils numériques dorment inutilisés dans les foyers français ?",
    options: ["10 millions", "30 millions", "54 millions", "100 millions"],
    correctAnswer: 3,
    explanation:
      "Environ 100 millions d'appareils dorment dans les tiroirs français, dont des dizaines de millions de smartphones (ADEME 2026).",
    source: "ADEME 2026",
    points: 20,
  },

  // Développement éco-responsable (10 questions)
  {
    id: 41,
    category: "Développement éco-responsable",
    difficulty: "moyen",
    question: "Qu'est-ce que l'éco-conception web ?",
    options: [
      "Utiliser du papier recyclé",
      "Concevoir des sites web avec un impact environnemental réduit",
      "Travailler dans un bureau écologique",
      "Acheter du matériel d'occasion",
    ],
    correctAnswer: 1,
    explanation:
      "L'éco-conception web vise à concevoir des sites et applications numériques ayant un impact environnemental réduit.",
    source: "GreenIT.fr",
    points: 15,
  },
  {
    id: 42,
    category: "Développement éco-responsable",
    difficulty: "facile",
    question: "Quel format d'image est le plus léger pour le web ?",
    options: ["PNG", "JPEG", "WebP", "GIF"],
    correctAnswer: 2,
    explanation:
      "WebP est souvent plus léger que JPEG ou PNG à qualité égale, sans être toujours le plus compact : AVIF peut faire mieux sur certains contenus.",
    source: "Google Developers, documentation WebP",
    points: 10,
  },
  {
    id: 43,
    category: "Développement éco-responsable",
    difficulty: "difficile",
    question: "Quel est le poids médian d'une page web ?",
    options: ["500 Ko", "1,2 Mo", "environ 2,3 Mo desktop / 1,9 Mo mobile", "5 Mo"],
    correctAnswer: 2,
    explanation:
      "En 2024, une page web médiane pèse environ 2,3 Mo sur desktop et 1,9 Mo sur mobile (HTTP Archive).",
    source: "HTTP Archive 2024",
    points: 20,
  },
  {
    id: 44,
    category: "Développement éco-responsable",
    difficulty: "moyen",
    question: "Quelle technique permet de réduire le nombre de requêtes HTTP ?",
    options: ["Minification", "Lazy loading", "Bundling", "Caching"],
    correctAnswer: 2,
    explanation:
      "Le bundling regroupe plusieurs fichiers en un seul, réduisant le nombre de requêtes. Avec HTTP/2 et HTTP/3, il faut parfois au contraire découper pour mieux exploiter le cache.",
    source: "MDN, performance web",
    points: 15,
  },
  {
    id: 45,
    category: "Développement éco-responsable",
    difficulty: "facile",
    question: "Quel référentiel d'éco-conception web est reconnu en France ?",
    options: ["ISO 9001", "RGAA", "RGESN", "WCAG"],
    correctAnswer: 2,
    explanation:
      "Le RGESN (Référentiel Général d'Écoconception de Services Numériques) est le standard français d'éco-conception web.",
    source: "DINUM/ADEME",
    points: 10,
  },
  {
    id: 46,
    category: "Développement éco-responsable",
    difficulty: "moyen",
    question: "Quel langage de programmation est le plus énergivore pour une même tâche ?",
    options: ["Python", "C", "JavaScript", "Rust"],
    correctAnswer: 0,
    explanation:
      "Dans le benchmark de Pereira et al. (2017), Python est plus énergivore que C ou Rust pour des tâches équivalentes ; le résultat dépend de l'implémentation.",
    source: "Pereira et al. 2017",
    points: 15,
  },
  {
    id: 47,
    category: "Développement éco-responsable",
    difficulty: "difficile",
    question: "Combien de fois le code Python peut-il être plus lent que le C pour une même opération ?",
    options: ["2x", "10x", "75x", "150x"],
    correctAnswer: 2,
    explanation:
      "Dans ce benchmark, Python peut être jusqu'à environ 76 fois plus lent que le C pour certaines opérations (Pereira et al. 2017) ; ce n'est pas une loi générale.",
    source: "Pereira et al. 2017",
    points: 20,
  },
  {
    id: 48,
    category: "Développement éco-responsable",
    difficulty: "moyen",
    question: "Qu'est-ce que le 'lazy loading' ?",
    options: [
      "Charger toutes les ressources au démarrage",
      "Charger les ressources uniquement quand nécessaire",
      "Supprimer les images",
      "Compresser les fichiers",
    ],
    correctAnswer: 1,
    explanation:
      "Le lazy loading charge les ressources (images, vidéos) uniquement quand l'utilisateur en a besoin, réduisant la bande passante.",
    source: "Web Performance Best Practices",
    points: 15,
  },
  {
    id: 49,
    category: "Développement éco-responsable",
    difficulty: "facile",
    question: "Quelle est la meilleure pratique pour les polices web ?",
    options: [
      "Charger 10 polices différentes",
      "Utiliser uniquement des polices système",
      "Limiter à 2-3 polices optimisées",
      "Utiliser des images pour le texte",
    ],
    correctAnswer: 2,
    explanation:
      "Limiter à 2-3 polices web optimisées réduit le poids de la page tout en gardant une identité visuelle.",
    source: "Web.dev",
    points: 10,
  },
  {
    id: 50,
    category: "Développement éco-responsable",
    difficulty: "difficile",
    question: "Quel pourcentage du trafic web est automatisé (bots) ?",
    options: ["10%", "25%", "51%", "70%"],
    correctAnswer: 2,
    explanation:
      "En 2024, environ 51 % du trafic web était automatisé, dont environ 37 % de trafic malveillant (Imperva Bad Bot Report 2025).",
    source: "Imperva Bad Bot Report 2025",
    points: 20,
  },

  // Datacenters et infrastructure (10 questions)
  {
    id: 51,
    category: "Datacenters et infrastructure",
    difficulty: "moyen",
    question: "Que signifie le PUE d'un datacenter ?",
    options: [
      "Power Usage Effectiveness",
      "Performance Unique Énergétique",
      "Production d'Usage Électrique",
      "Puissance Utilisée Efficacement",
    ],
    correctAnswer: 0,
    explanation:
      "Le PUE (Power Usage Effectiveness) mesure l'efficacité énergétique d'un datacenter. Un PUE de 1 est idéal.",
    source: "The Green Grid",
    points: 15,
  },
  {
    id: 52,
    category: "Datacenters et infrastructure",
    difficulty: "facile",
    question: "Quel est le PUE moyen mondial des datacenters ?",
    options: ["1,2", "1,6", "2,0", "3,0"],
    correctAnswer: 1,
    explanation:
      "Le PUE moyen mondial est d'environ 1,56 (1,45 en Europe) en 2024 (Uptime Institute) ; 1,2 correspond aux meilleurs sites récents.",
    source: "Uptime Institute 2024",
    points: 10,
  },
  {
    id: 53,
    category: "Datacenters et infrastructure",
    difficulty: "difficile",
    question: "Quelle part de l'électricité mondiale les datacenters consomment-ils ?",
    options: ["0,5%", "1,5%", "3%", "5%"],
    correctAnswer: 1,
    explanation:
      "En 2024, les datacenters ont consommé environ 415 TWh, soit 1,5 % de l'électricité mondiale (IEA Energy & AI 2025).",
    source: "IEA Energy & AI 2025",
    points: 20,
  },
  {
    id: 54,
    category: "Datacenters et infrastructure",
    difficulty: "moyen",
    question: "Quel système de refroidissement est le plus économe pour un datacenter ?",
    options: [
      "Climatisation classique",
      "Free cooling (air extérieur)",
      "Refroidissement par eau",
      "Pas de refroidissement",
    ],
    correctAnswer: 1,
    explanation:
      "Le free cooling utilise l'air extérieur quand le climat le permet ; le gain dépend du site, du climat et du PUE visé.",
    source: "The Green Grid",
    points: 15,
  },
  {
    id: 55,
    category: "Datacenters et infrastructure",
    difficulty: "facile",
    question: "Que représente le refroidissement dans la consommation d'un datacenter traditionnel ?",
    options: ["10%", "20%", "30%", "40%"],
    correctAnswer: 2,
    explanation:
      "Le froid représente souvent 25 à 35 % de la consommation d'un datacenter traditionnel ; le total froid + infrastructures correspond au surcoût du PUE.",
    source: "Uptime Institute 2024",
    points: 10,
  },
  {
    id: 56,
    category: "Datacenters et infrastructure",
    difficulty: "moyen",
    question: "Quelle est la température idéale pour faire fonctionner des serveurs ?",
    options: ["15-18°C", "20-22°C", "25-27°C", "30-32°C"],
    correctAnswer: 2,
    explanation:
      "Les recommandations ASHRAE couvrent une plage large ; viser 25-27 °C est souvent un bon compromis énergétique, selon les équipements et l'humidité.",
    source: "ASHRAE Guidelines",
    points: 15,
  },
  {
    id: 57,
    category: "Datacenters et infrastructure",
    difficulty: "difficile",
    question: "Combien de datacenters hyperscale existent dans le monde ?",
    options: ["100", "300", "800", "environ 1 100"],
    correctAnswer: 3,
    explanation:
      "Fin 2024, on comptait environ 1 136 datacenters hyperscale dans le monde (Synergy Research 2025).",
    source: "Synergy Research 2025",
    points: 20,
  },
  {
    id: 58,
    category: "Datacenters et infrastructure",
    difficulty: "moyen",
    question: "Que signifie « 100 % d'énergies renouvelables » chez les grands fournisseurs cloud ?",
    options: [
      "Un fonctionnement 24/7 décarboné",
      "Un matching annuel compensé par des achats d'énergie renouvelable",
      "Aucune électricité consommée",
      "Un label obligatoire",
    ],
    correctAnswer: 1,
    explanation:
      "Les grands clouds compensent souvent leur consommation annuelle par des achats d'énergie renouvelable (matching annuel), ce qui n'équivaut pas à un fonctionnement 24/7 décarboné.",
    source: "Rapports ESG Google/Microsoft/AWS 2025",
    points: 15,
  },
  {
    id: 59,
    category: "Datacenters et infrastructure",
    difficulty: "facile",
    question: "Qu'est-ce que la virtualisation dans les datacenters ?",
    options: [
      "Créer des serveurs physiques",
      "Faire fonctionner plusieurs serveurs virtuels sur une machine physique",
      "Augmenter la taille des serveurs",
      "Connecter plusieurs datacenters",
    ],
    correctAnswer: 1,
    explanation:
      "La virtualisation permet de faire fonctionner plusieurs serveurs virtuels sur une seule machine physique, optimisant les ressources.",
    source: "VMware/Hyper-V",
    points: 10,
  },
  {
    id: 60,
    category: "Datacenters et infrastructure",
    difficulty: "difficile",
    question: "Que mesure le WUE (Water Usage Effectiveness) d'un datacenter ?",
    options: ["L'eau consommée par kWh informatique", "La chaleur évacuée", "Le débit d'air", "Le bruit"],
    correctAnswer: 0,
    explanation:
      "Le WUE rapporte les litres d'eau consommés par kWh consommé par l'IT ; sa valeur dépend fortement du site et du refroidissement, il n'existe pas de moyenne universelle.",
    source: "The Green Grid",
    points: 20,
  },

  // Réglementation (10 questions)
  {
    id: 61,
    category: "Réglementation",
    difficulty: "facile",
    question: "En quelle année la loi AGEC (Anti-Gaspillage pour une Économie Circulaire) a-t-elle été votée ?",
    options: ["2018", "2020", "2021", "2023"],
    correctAnswer: 1,
    explanation:
      "La loi AGEC a été votée le 10 février 2020 (loi n° 2020-105) ; l'indice de réparabilité s'applique depuis 2021.",
    source: "Loi n° 2020-105",
    points: 10,
  },
  {
    id: 62,
    category: "Réglementation",
    difficulty: "moyen",
    question: "Quelle directive européenne impose des objectifs de collecte des DEEE ?",
    options: ["REACH", "RoHS", "WEEE", "Ecodesign"],
    correctAnswer: 2,
    explanation:
      "La directive WEEE (Waste Electrical and Electronic Equipment) impose des objectifs de collecte et recyclage des DEEE.",
    source: "Directive 2012/19/UE",
    points: 15,
  },
  {
    id: 63,
    category: "Réglementation",
    difficulty: "difficile",
    question: "Quelle est la trajectoire tendancielle des émissions du numérique en France d'ici 2030 ?",
    options: ["-45%", "+15%", "+45%", "stable"],
    correctAnswer: 2,
    explanation:
      "À politiques constantes, l'empreinte carbone du numérique en France augmenterait d'environ 45 % d'ici 2030 (ADEME-Arcep).",
    source: "ADEME-Arcep 2023",
    points: 20,
  },
  {
    id: 64,
    category: "Réglementation",
    difficulty: "moyen",
    question: "Que prévoit la loi REEN (Réduire l'Empreinte Environnementale du Numérique) ?",
    options: [
      "Interdire les smartphones",
      "Obligations de rapport environnemental pour les opérateurs",
      "Taxer internet",
      "Fermer les datacenters",
    ],
    correctAnswer: 1,
    explanation:
      "La loi REEN (2021) impose notamment la publication de rapports environnementaux, encourage l'écoconception et encadre les datacenters.",
    source: "Loi REEN 2021",
    points: 15,
  },
  {
    id: 65,
    category: "Réglementation",
    difficulty: "facile",
    question: "Quelle est la durée légale de garantie des produits électroniques en France ?",
    options: ["6 mois", "1 an", "2 ans", "5 ans"],
    correctAnswer: 2,
    explanation:
      "La garantie légale de conformité est de 2 ans minimum pour tous les produits électroniques en France.",
    source: "Code de la consommation",
    points: 10,
  },
  {
    id: 66,
    category: "Réglementation",
    difficulty: "moyen",
    question: "Que signifie le RGPD dans le contexte numérique ?",
    options: [
      "Règlement Général sur la Protection des Données",
      "Réduction Générale de la Pollution Digitale",
      "Réseau Green Pour le Développement",
      "Recyclage Garanti des Produits Digitaux",
    ],
    correctAnswer: 0,
    explanation:
      "Le RGPD (Règlement Général sur la Protection des Données) encadre l'utilisation des données personnelles en Europe.",
    source: "Règlement UE 2016/679",
    points: 15,
  },
  {
    id: 67,
    category: "Réglementation",
    difficulty: "difficile",
    question: "Quelle amende maximale le RGPD permet-il d'infliger aux entreprises ?",
    options: ["1 million €", "10 millions € ou 2% CA", "20 millions € ou 4% CA", "100 millions €"],
    correctAnswer: 2,
    explanation:
      "Le RGPD permet des amendes jusqu'à 20 millions d'euros ou 4% du chiffre d'affaires mondial, le montant le plus élevé étant retenu.",
    source: "RGPD Article 83",
    points: 20,
  },
  {
    id: 68,
    category: "Réglementation",
    difficulty: "moyen",
    question: "Qu'est-ce que le Digital Services Act (DSA) ?",
    options: [
      "Un service de réparation",
      "Une réglementation européenne sur les services numériques",
      "Un label écologique",
      "Un datacenter européen",
    ],
    correctAnswer: 1,
    explanation:
      "Le DSA est une réglementation européenne qui encadre la responsabilité des plateformes numériques et la modération de contenus.",
    source: "Règlement UE 2022/2065",
    points: 15,
  },
  {
    id: 69,
    category: "Réglementation",
    difficulty: "facile",
    question: "Quel organisme français régule les télécommunications et le numérique ?",
    options: ["ADEME", "ARCEP", "CNIL", "DINUM"],
    correctAnswer: 1,
    explanation:
      "L'ARCEP (Autorité de Régulation des Communications Électroniques et des Postes) régule le secteur des télécoms en France.",
    source: "ARCEP",
    points: 10,
  },
  {
    id: 70,
    category: "Réglementation",
    difficulty: "difficile",
    question: "Quel dispositif encadre la durabilité des smartphones depuis juin 2025 ?",
    options: ["L'indice de durabilité français", "L'étiquette énergie européenne", "Un label privé", "Aucun texte"],
    correctAnswer: 1,
    explanation:
      "Depuis le 20 juin 2025, les smartphones vendus dans l'UE affichent une étiquette énergie (règlement 2023/1670) : 5 ans de mises à jour, 7 ans de pièces. L'indice de durabilité français s'applique déjà aux TV et lave-linge.",
    source: "Règlement UE 2023/1670",
    points: 20,
  },

  // Impact environnemental (10 questions)
  {
    id: 71,
    category: "Impact environnemental",
    difficulty: "moyen",
    question: "Combien de tonnes de CO2e le numérique mondial émet-il par an ?",
    options: ["500 millions", "1 milliard", "1,8 milliard", "2,5 milliards"],
    correctAnswer: 2,
    explanation:
      "Le secteur numérique mondial émet environ 1,8 Gt CO2e en 2023, soit 3,4 % des émissions mondiales (GreenIT EENM 2025).",
    source: "GreenIT EENM 2025",
    points: 15,
  },
  {
    id: 72,
    category: "Impact environnemental",
    difficulty: "facile",
    question: "Quelle phase du cycle de vie d'un smartphone a le plus gros impact ?",
    options: ["Extraction des matières", "Fabrication", "Transport", "Utilisation"],
    correctAnswer: 1,
    explanation:
      "La fabrication représente environ 75 % de l'impact tous indicateurs, et jusqu'à environ 90 % de son empreinte carbone (ADEME).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 10,
  },
  {
    id: 73,
    category: "Impact environnemental",
    difficulty: "difficile",
    question: "Combien de litres d'eau sont mobilisés pour fabriquer un smartphone ?",
    options: ["120 L", "1 200 L", "12 000 L", "120 000 L"],
    correctAnswer: 2,
    explanation:
      "Environ 12 000 litres d'eau sont mobilisés pour fabriquer un smartphone (ADEME, La face cachée du numérique).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 20,
  },
  {
    id: 74,
    category: "Impact environnemental",
    difficulty: "moyen",
    question: "Une recherche en ligne a-t-elle un impact carbone significatif ?",
    options: [
      "Non, c'est immatériel",
      "Oui, mais faible à l'échelle d'un usage courant",
      "Oui, autant qu'un vol",
      "Non, les datacenters sont neutres",
    ],
    correctAnswer: 1,
    explanation:
      "Une requête consomme peu à l'unité ; l'impact vient surtout de l'appareil et du volume d'usages. Le repère de 0,2 g vient d'une estimation Google de 2009 et dépend du mix électrique.",
    source: "ADEME, Impact CO2 / Base Empreinte",
    points: 15,
  },
  {
    id: 75,
    category: "Impact environnemental",
    difficulty: "facile",
    question: "Quel secteur consomme le plus d'énergie dans le numérique ?",
    options: ["Fabrication des équipements", "Datacenters", "Réseaux", "Utilisation des terminaux"],
    correctAnswer: 3,
    explanation:
      "L'utilisation des terminaux (smartphones, ordinateurs, TV) représente environ 45% de la consommation énergétique du numérique.",
    source: "The Shift Project, Lean ICT 2018",
    points: 10,
  },
  {
    id: 76,
    category: "Impact environnemental",
    difficulty: "moyen",
    question: "Combien de kg de matières sont mobilisées pour produire un smartphone ?",
    options: ["1 kg", "10 kg", "50 kg", "200 kg"],
    correctAnswer: 3,
    explanation:
      "On parle d'environ 200 kg de matières mobilisées (approche MIPS), et non de 200 kg de déchets miniers directement générés (ADEME).",
    source: "ADEME 2019, La face cachée du numérique",
    points: 15,
  },
  {
    id: 77,
    category: "Impact environnemental",
    difficulty: "difficile",
    question: "Quelle est la consommation électrique des datacenters dans le monde ?",
    options: ["50 TWh/an", "415 TWh/an", "1 500 TWh/an", "3 000 TWh/an"],
    correctAnswer: 1,
    explanation:
      "En 2024, les datacenters ont consommé environ 415 TWh, soit 1,5 % de l'électricité mondiale (IEA Energy & AI 2025).",
    source: "IEA Energy & AI 2025",
    points: 20,
  },
  {
    id: 78,
    category: "Impact environnemental",
    difficulty: "moyen",
    question: "Combien de smartphones sont vendus dans le monde chaque année ?",
    options: ["500 millions", "1 milliard", "1,4 milliard", "2 milliards"],
    correctAnswer: 2,
    explanation:
      "Environ 1,4 milliard de smartphones sont vendus chaque année dans le monde, générant un impact environnemental massif.",
    source: "IDC 2025",
    points: 15,
  },
  {
    id: 79,
    category: "Impact environnemental",
    difficulty: "facile",
    question: "Quel gaz à effet de serre est principalement lié à la production d'électricité ?",
    options: ["Méthane", "CO2", "Protoxyde d'azote", "Ozone"],
    correctAnswer: 1,
    explanation:
      "Le CO2 (dioxyde de carbone) est le principal gaz à effet de serre émis par la production d'électricité.",
    source: "GIEC, AR6 2021",
    points: 10,
  },
  {
    id: 80,
    category: "Impact environnemental",
    difficulty: "difficile",
    question: "Quel usage tire principalement la demande de cobalt ?",
    options: ["Les smartphones", "Les batteries de véhicules électriques", "Les écrans", "Les datacenters"],
    correctAnswer: 1,
    explanation:
      "Le cobalt est surtout utilisé dans les batteries, et la demande est principalement tirée par les véhicules électriques (IEA Critical Minerals).",
    source: "IEA Critical Minerals 2024",
    points: 20,
  },

  // Bonnes pratiques entreprise (10 questions)
  {
    id: 81,
    category: "Bonnes pratiques entreprise",
    difficulty: "moyen",
    question: "Quelle est la première étape d'une démarche Green IT en entreprise ?",
    options: [
      "Acheter du matériel neuf",
      "Réaliser un bilan carbone du SI",
      "Changer de fournisseur cloud",
      "Former tous les employés",
    ],
    correctAnswer: 1,
    explanation:
      "La première étape est de réaliser un bilan carbone du système d'information pour identifier les leviers d'action prioritaires.",
    source: "GreenIT.fr, guide Green IT",
    points: 15,
  },
  {
    id: 82,
    category: "Bonnes pratiques entreprise",
    difficulty: "facile",
    question: "Quelle politique permet d'allonger la durée de vie des équipements en entreprise ?",
    options: [
      "Renouvellement tous les ans",
      "Renouvellement uniquement en cas de panne",
      "Donner les vieux équipements",
      "Revente systématique",
    ],
    correctAnswer: 1,
    explanation:
      "Renouveler uniquement en cas de panne ou d'obsolescence fonctionnelle allonge la durée de vie et réduit l'impact, en tenant compte du support logiciel et des contraintes de sécurité.",
    source: "ADEME, bonnes pratiques",
    points: 10,
  },
  {
    id: 83,
    category: "Bonnes pratiques entreprise",
    difficulty: "moyen",
    question: "Quel est l'effet d'allonger la durée de vie d'un parc informatique de 3 à 5 ans ?",
    options: [
      "Il augmente l'impact",
      "Il réduit l'impact et le coût total",
      "Aucun effet",
      "Il double les coûts",
    ],
    correctAnswer: 1,
    explanation:
      "Allonger la durée de vie évite de fabriquer de nouveaux équipements, dont l'impact est concentré à la fabrication ; le gain exact dépend du parc (ADEME).",
    source: "ADEME 2026",
    points: 15,
  },
  {
    id: 84,
    category: "Bonnes pratiques entreprise",
    difficulty: "difficile",
    question: "Quel pourcentage des serveurs d'entreprise sont sous-utilisés (< 20% de leur capacité) ?",
    options: ["10%", "30%", "50%", "70%"],
    correctAnswer: 2,
    explanation:
      "Environ 50% des serveurs d'entreprise sont sous-utilisés, représentant un gaspillage énergétique et financier considérable.",
    source: "Uptime Institute 2024",
    points: 20,
  },
  {
    id: 85,
    category: "Bonnes pratiques entreprise",
    difficulty: "facile",
    question: "Quelle mesure simple peut réduire la consommation d'impression en entreprise ?",
    options: [
      "Acheter plus d'imprimantes",
      "Imprimer en couleur uniquement",
      "Impression recto-verso par défaut",
      "Interdire l'impression",
    ],
    correctAnswer: 2,
    explanation: "Configurer l'impression recto-verso par défaut peut réduire la consommation de papier de 30 à 50%.",
    source: "ADEME",
    points: 10,
  },
  {
    id: 86,
    category: "Bonnes pratiques entreprise",
    difficulty: "moyen",
    question: "Que signifie BYOD en entreprise ?",
    options: [
      "Bring Your Own Device (appareils personnels)",
      "Bring Your Own Data",
      "Un label écologique",
      "Un type de cloud",
    ],
    correctAnswer: 0,
    explanation:
      "BYOD signifie « Bring Your Own Device ». Une politique responsable encadre sécurité, vie privée, support et fin de vie ; elle ne compense pas automatiquement l'impact.",
    source: "Recommandations ANSSI/CNIL",
    points: 15,
  },
  {
    id: 87,
    category: "Bonnes pratiques entreprise",
    difficulty: "moyen",
    question: "Comment évaluer l'impact des emails en entreprise ?",
    options: [
      "En comptant les envois et les réceptions",
      "En supprimant toutes les boîtes",
      "En désactivant l'e-mail",
      "En imprimant les emails",
    ],
    correctAnswer: 0,
    explanation:
      "L'impact dépend du volume d'envois et de réceptions, de la taille des pièces jointes et du stockage ; il n'existe pas de nombre universel d'e-mails par employé.",
    source: "ADEME",
    points: 15,
  },
  {
    id: 88,
    category: "Bonnes pratiques entreprise",
    difficulty: "difficile",
    question: "Comment évaluer la rentabilité d'une démarche Green IT ?",
    options: [
      "En mesurant les économies d'énergie et l'allongement de la durée de vie",
      "En achetant du neuf",
      "En augmentant le nombre de serveurs",
      "En imprimant plus",
    ],
    correctAnswer: 0,
    explanation:
      "Le gain dépend des leviers : énergie, renouvellement évité, fin de vie. Aucun ROI moyen universel ne s'applique à toutes les entreprises (ADEME).",
    source: "ADEME 2026",
    points: 20,
  },
  {
    id: 89,
    category: "Bonnes pratiques entreprise",
    difficulty: "facile",
    question: "Quelle certification atteste d'une démarche environnementale en entreprise ?",
    options: ["ISO 9001", "ISO 14001", "ISO 27001", "ITIL"],
    correctAnswer: 1,
    explanation:
      "La certification ISO 14001 atteste d'un système de management environnemental efficace en entreprise.",
    source: "ISO 14001",
    points: 10,
  },
  {
    id: 90,
    category: "Bonnes pratiques entreprise",
    difficulty: "moyen",
    question: "Quel est le principal frein à l'adoption du Green IT en entreprise ?",
    options: [
      "Manque de budget",
      "Manque de sensibilisation et compétences",
      "Résistance au changement",
      "Absence de réglementation",
    ],
    correctAnswer: 1,
    explanation:
      "Les enquêtes métier pointent souvent le manque de sensibilisation et de compétences avant les questions budgétaires.",
    source: "Baromètre AGIT 2025",
    points: 15,
  },

  // Innovations et solutions (10 questions)
  {
    id: 91,
    category: "Innovations et solutions",
    difficulty: "moyen",
    question: "Qu'est-ce que le Fairphone ?",
    options: [
      "Un téléphone gratuit",
      "Un smartphone modulaire et réparable",
      "Une application mobile",
      "Un opérateur télécom",
    ],
    correctAnswer: 1,
    explanation:
      "Fairphone est un smartphone conçu pour être modulaire et réparable ; son indice de réparabilité est élevé, selon les modèles et les organismes d'évaluation.",
    source: "iFixit 2025",
    points: 15,
  },
  {
    id: 92,
    category: "Innovations et solutions",
    difficulty: "facile",
    question: "Qu'est-ce que l'hébergement web vert (green hosting) ?",
    options: [
      "Un hébergement gratuit",
      "Un hébergement alimenté par énergies renouvelables",
      "Un hébergement de couleur verte",
      "Un hébergement dans la nature",
    ],
    correctAnswer: 1,
    explanation:
      "L'hébergement dit vert s'appuie sur des énergies renouvelables et des datacenters optimisés ; attention, un « 100 % renouvelable » annuel n'équivaut pas à un fonctionnement 24/7 décarboné.",
    source: "Green Web Foundation 2025",
    points: 10,
  },
  {
    id: 93,
    category: "Innovations et solutions",
    difficulty: "difficile",
    question: "Quelle économie d'énergie le mode sombre peut-il offrir sur écran OLED ?",
    options: ["moins de 5%", "environ 15%", "jusqu'à 30-50% selon la luminosité", "plus de 80%"],
    correctAnswer: 2,
    explanation:
      "Sur écran OLED, le mode sombre économise selon la luminosité : de quelques pourcents à environ 50 % (Purdue 2021).",
    source: "Purdue 2021",
    points: 20,
  },
  {
    id: 94,
    category: "Innovations et solutions",
    difficulty: "moyen",
    question: "Qu'est-ce que l'edge computing dans une perspective Green IT ?",
    options: [
      "Un nouveau datacenter",
      "Traiter les données au plus près de leur source",
      "Un type de cloud",
      "Un langage de programmation",
    ],
    correctAnswer: 1,
    explanation:
      "L'edge computing traite les données au plus près de leur source : il peut réduire le trafic réseau, mais le bilan dépend des usages et des équipements déployés.",
    source: "Edge Computing Consortium 2024",
    points: 15,
  },
  {
    id: 95,
    category: "Innovations et solutions",
    difficulty: "facile",
    question: "Que permet la 5G en termes d'efficacité énergétique ?",
    options: [
      "Aucune amélioration",
      "10 fois plus efficace par bit que la 4G",
      "Consomme plus d'énergie",
      "Même efficacité que la 4G",
    ],
    correctAnswer: 1,
    explanation:
      "La 5G est environ 10 fois plus efficace énergétiquement par bit transmis que la 4G, malgré une consommation absolue plus élevée.",
    source: "GSMA 2025",
    points: 10,
  },
  {
    id: 96,
    category: "Innovations et solutions",
    difficulty: "moyen",
    question: "Quel est le concept du 'low-tech' dans le numérique ?",
    options: [
      "Utiliser de vieilles technologies",
      "Privilégier des solutions simples et durables",
      "Interdire la technologie",
      "Utiliser uniquement du matériel bon marché",
    ],
    correctAnswer: 1,
    explanation:
      "Le low-tech privilégie des solutions simples, durables et réparables, questionnant le besoin de haute technologie systématique.",
    source: "Low-tech Lab",
    points: 15,
  },
  {
    id: 97,
    category: "Innovations et solutions",
    difficulty: "difficile",
    question: "Quel est le point commun des projets de décentralisation du web (Web3, IPFS) ?",
    options: [
      "Ils sont forcément plus sobres",
      "Ils visent à répartir les données hors des plateformes centrales",
      "Ils suppriment le réseau",
      "Ils n'ont aucun impact",
    ],
    correctAnswer: 1,
    explanation:
      "Ces projets visent la décentralisation, mais leur bilan environnemental est débattu et dépend des usages.",
    source: "Cambridge CBECI 2024",
    points: 20,
  },
  {
    id: 98,
    category: "Innovations et solutions",
    difficulty: "moyen",
    question: "Qu'est-ce que la technologie Li-Fi ?",
    options: ["Une nouvelle batterie", "Internet par la lumière LED", "Un nouveau processeur", "Un type de wifi"],
    correctAnswer: 1,
    explanation:
      "Le Li-Fi transmet des données via la lumière LED ; c'est une alternative expérimentale, dont le bilan dépend des usages.",
    source: "pureLiFi 2024",
    points: 15,
  },
  {
    id: 99,
    category: "Innovations et solutions",
    difficulty: "facile",
    question: "Quel matériau innovant pourrait remplacer le plastique dans les appareils électroniques ?",
    options: ["Verre", "Bioplastique", "Métal", "Carton"],
    correctAnswer: 1,
    explanation:
      "Les bioplastiques issus de ressources renouvelables sont étudiés pour remplacer les plastiques pétrochimiques.",
    source: "Revues scientifiques, matériaux 2024",
    points: 10,
  },
  {
    id: 100,
    category: "Innovations et solutions",
    difficulty: "difficile",
    question: "Quel est le concept du 'numérique frugal' ?",
    options: [
      "Réduire les coûts uniquement",
      "Concevoir des services numériques sobres et efficaces",
      "Interdire certaines technologies",
      "Utiliser uniquement du matériel gratuit",
    ],
    correctAnswer: 1,
    explanation:
      "Le numérique frugal vise à concevoir des services numériques sobres, efficaces et accessibles, minimisant leur impact environnemental.",
    source: "Institut du Numérique Responsable",
    points: 20,
  },
]

type QuizMode = "discovery" | "full" | "category" | "challenge"

export function QuizGreenITAdvanced() {
  const [mode, setMode] = useState<QuizMode | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [playerName, setPlayerName] = useState("")

  const categories = Array.from(new Set(ALL_QUIZ_QUESTIONS.map((q) => q.category)))

  // Timer for challenge mode
  useEffect(() => {
    if (mode === "challenge" && timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
    if (timeLeft === 0 && mode === "challenge" && !isFinished) {
      setIsFinished(true)
    }
  }, [timeLeft, isFinished, mode])

  const startQuiz = (selectedMode: QuizMode, category?: string) => {
    setMode(selectedMode)
    setSelectedCategory(category || null)
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions([])
    setIsFinished(false)

    let questions: QuizQuestion[] = []

    if (selectedMode === "discovery") {
      // 10 random questions
      questions = shuffle(ALL_QUIZ_QUESTIONS).slice(0, 10)
      setTimeLeft(0)
    } else if (selectedMode === "full") {
      // All 100 questions
      questions = [...ALL_QUIZ_QUESTIONS]
      setTimeLeft(0)
    } else if (selectedMode === "category" && category) {
      // Questions from selected category
      questions = ALL_QUIZ_QUESTIONS.filter((q) => q.category === category)
      setTimeLeft(0)
    } else if (selectedMode === "challenge") {
      // 20 random questions with timer
      questions = shuffle(ALL_QUIZ_QUESTIONS).slice(0, 20)
      setTimeLeft(20 * 60) // 20 minutes
    }

    setActiveQuestions(questions)
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const currentQuestion = activeQuestions[currentQuestionIndex]
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points)
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex])
  }

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      handleFinish()
    }
  }

  const handleFinish = () => {
    setIsFinished(true)
  }

  const resetQuiz = () => {
    setMode(null)
    setSelectedCategory(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnsweredQuestions([])
    setIsFinished(false)
    setTimeLeft(0)
    setPlayerName("")
    setActiveQuestions([])
  }

  const handlePrintCertificate = () => {
    document.body.classList.add("printing-certificate")
    window.print()
    window.addEventListener("afterprint", () => document.body.classList.remove("printing-certificate"), { once: true })
  }

  const getLevel = (finalScore: number, maxScore: number) => {
    const percentage = maxScore > 0 ? (finalScore / maxScore) * 100 : 0

    if (percentage >= 90) return { level: "Maître Green IT", color: "text-purple-600", icon: Award }
    if (percentage >= 75) return { level: "Expert", color: "text-blue-600", icon: Trophy }
    if (percentage >= 60) return { level: "Intermédiaire avancé", color: "text-teal-600", icon: Target }
    if (percentage >= 40) return { level: "Intermédiaire", color: "text-green-600", icon: CheckCircle2 }
    return { level: "Débutant", color: "text-orange-600", icon: Brain }
  }

  // Mode selection screen
  if (!mode) {
    return (
      <Card className="shadow-lg dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-6 w-6 text-blue-600" />
            Quiz Green IT - 100 Questions
          </CardTitle>
          <CardDescription>Choisissez votre mode de jeu pour tester vos connaissances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => startQuiz("discovery")}
              className="group p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 hover:border-blue-400 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 rounded-lg bg-blue-600 text-white">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-gray-100">Mode Découverte</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">10 questions aléatoires</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                Parfait pour débuter et découvrir les concepts du Green IT
              </p>
            </button>

            <button
              onClick={() => startQuiz("challenge")}
              className="group p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-slate-800 hover:border-orange-400 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 rounded-lg bg-orange-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-gray-100">Mode Défi</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">20 questions en 20 minutes</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Testez votre rapidité et vos connaissances</p>
            </button>

            <button
              onClick={() => startQuiz("full")}
              className="group p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-800 hover:border-purple-400 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 rounded-lg bg-purple-600 text-white">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-gray-100">Mode Complet</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">Les 100 questions</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                Le challenge ultime pour devenir un expert Green IT
              </p>
            </button>

            <div className="p-6 rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/20 dark:to-slate-800">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 rounded-lg bg-teal-600 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-gray-100">Par Thématique</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">Choisissez votre catégorie</p>
                </div>
              </div>
              <select
                onChange={(e) => e.target.value && startQuiz("category", e.target.value)}
                className="w-full mt-2 p-2 rounded-lg border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-700 dark:text-gray-100"
                defaultValue=""
              >
                <option value="" disabled>
                  Sélectionner une catégorie
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} ({ALL_QUIZ_QUESTIONS.filter((q) => q.category === cat).length} questions)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Catégories disponibles :</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800 dark:text-blue-300">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Results screen
  if (isFinished) {
    const maxScore = activeQuestions.reduce((sum, q) => sum + q.points, 0)
    const levelInfo = getLevel(score, maxScore)
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

    return (
      <Card className="shadow-lg dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Résultats du Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <levelInfo.icon className={`h-20 w-20 mx-auto mb-4 ${levelInfo.color}`} />
            <h3 className={`text-3xl font-bold mb-2 ${levelInfo.color}`}>{levelInfo.level}</h3>
            <p className="text-5xl font-bold text-slate-900 dark:text-gray-100 mb-2">
              {score} / {maxScore}
            </p>
            <p className="text-lg text-slate-600 dark:text-gray-300">
              {percentage}% de réussite sur {activeQuestions.length} questions
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-gray-300">Questions répondues</span>
              <span className="font-semibold dark:text-gray-100">{answeredQuestions.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-gray-300">Score moyen par question</span>
              <span className="font-semibold dark:text-gray-100">
                {answeredQuestions.length > 0 ? `${Math.round(score / answeredQuestions.length)} points` : "—"}
              </span>
            </div>
            {mode === "challenge" && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-gray-300">Temps restant</span>
                <span className="font-semibold dark:text-gray-100">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">Prochaines étapes :</h4>
            <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
              <li>• Consultez les ressources pour approfondir vos connaissances</li>
              <li>• Essayez les autres modes de quiz pour progresser</li>
              <li>• Partagez vos résultats et défiez vos collègues</li>
            </ul>
          </div>

          {percentage >= 60 && (
            <div className="certificate-print rounded-xl border-2 border-emerald-300 p-6 text-center dark:border-emerald-700">
              <p className="text-sm text-muted-foreground">Le Green IT en clair</p>
              <h3 className="mt-2 text-2xl font-bold text-emerald-700">Attestation de réussite</h3>
              <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Votre nom (facultatif)"
                className="mx-auto mt-4 block w-full max-w-xs rounded-lg border border-slate-300 bg-transparent p-2 text-center dark:border-slate-600"
              />
              <p className="mt-4">
                {playerName.trim() ? `${playerName.trim()} obtient ` : "Résultat obtenu : "}
                <strong>
                  {score} / {maxScore}
                </strong>{" "}
                ({percentage}%)
              </p>
              <p className="mt-1">
                Niveau : <strong>{levelInfo.level}</strong> — Mode : {mode}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Établie le {new Date().toLocaleDateString("fr-FR")}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={resetQuiz} className="flex-1 bg-transparent" variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Refaire un quiz
            </Button>
            {percentage >= 60 ? (
              <Button onClick={handlePrintCertificate} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Imprimer l'attestation
              </Button>
            ) : (
              <Button onClick={() => window.print()} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Imprimer mon résultat
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Quiz in progress
  const currentQuestion = activeQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / activeQuestions.length) * 100

  return (
    <Card className="shadow-lg dark:bg-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="dark:border-blue-700 dark:text-blue-300">
              {currentQuestion.category}
            </Badge>
            <Badge
              variant={
                currentQuestion.difficulty === "facile"
                  ? "default"
                  : currentQuestion.difficulty === "moyen"
                    ? "secondary"
                    : "destructive"
              }
            >
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="outline" className="dark:border-yellow-700 dark:text-yellow-300">
              {currentQuestion.points} points
            </Badge>
          </div>
          {mode === "challenge" && (
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold">
              <Clock className="h-5 w-5" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>

        <CardTitle className="text-lg">
          Question {currentQuestionIndex + 1} / {activeQuestions.length}
        </CardTitle>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
          <p className="text-lg font-medium text-slate-900 dark:text-gray-100">{currentQuestion.question}</p>
        </div>

        <div className="space-y-3" role="radiogroup" aria-label="Réponses possibles">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === currentQuestion.correctAnswer
            const showResult = showExplanation

            let buttonClass = "p-4 rounded-lg border-2 text-left transition-all "
            if (!showResult) {
              buttonClass +=
                "border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            } else if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-600"
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
            } else {
              buttonClass += "border-slate-200 dark:border-slate-600 opacity-50"
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                role="radio"
                aria-checked={isSelected}
                className={buttonClass}
              >
                <div className="flex items-center gap-3">
                  {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  {showResult && isCorrect && <span className="sr-only">Bonne réponse : </span>}
                  {showResult && isSelected && !isCorrect && <span className="sr-only">Votre réponse : </span>}
                  <span className="flex-1 dark:text-gray-100">{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div
            className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
            aria-live="polite"
          >
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Explication :</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">{currentQuestion.explanation}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Source : {currentQuestion.source}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-slate-600 dark:text-gray-300">
            Score actuel : <span className="font-bold text-slate-900 dark:text-gray-100">{score} points</span>
          </div>
          {showExplanation && (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              {currentQuestionIndex < activeQuestions.length - 1 ? "Question suivante" : "Voir les résultats"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

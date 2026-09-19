const { jsPDF } = require("jspdf");
const { default: autoTable } = require("jspdf-autotable");
const fs = require("fs");
const path = require("path");

const doc = new jsPDF();
const today = new Date().toLocaleDateString("fr-FR");
const N = " "; // espace insécable (avant % et ?)

// --- Design Tokens ---
const COLORS = {
    emerald: [5, 150, 105],
    emeraldLight: [209, 250, 229],
    slate: [30, 41, 59],
    slateLight: [100, 116, 139],
    white: [255, 255, 255],
    warnBg: [254, 243, 199]
};

// --- Layout flow ---
const LEFT = 20, WIDTH = 170, BOTTOM = 268;
let y = 0;

const paintBg = () => {
    doc.setFillColor(250, 252, 250);
    doc.rect(0, 0, 210, 297, "F");
};

const need = (h) => {
    if (y + h > BOTTOM) {
        doc.addPage();
        paintBg();
        y = 25;
    }
};

const sectionHeader = (title) => {
    need(22);
    doc.setFillColor(...COLORS.emeraldLight);
    doc.rect(LEFT, y - 6, WIDTH, 10, "F");
    doc.setTextColor(...COLORS.emerald);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title.toUpperCase(), LEFT + 5, y + 1);
    y += 15;
};

const para = (text, size = 11) => {
    doc.setTextColor(...COLORS.slate);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, WIDTH - 10);
    need(lines.length * 6 + 4);
    doc.text(lines, LEFT + 5, y);
    y += lines.length * 6 + 4;
};

const bulletBlock = (lead, text) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, WIDTH - 15);
    need(10 + lines.length * 6 + 4); // titre + texte ensemble : pas de veuve
    doc.setTextColor(...COLORS.slate);
    doc.setFont("helvetica", "bold");
    doc.text("• " + lead, LEFT + 5, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(lines, LEFT + 10, y);
    y += lines.length * 6 + 4;
};

const infoBox = (title, text) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, WIDTH - 16);
    const h = lines.length * 6 + 22;
    need(h);
    doc.setFillColor(...COLORS.warnBg);
    doc.roundedRect(LEFT, y - 6, WIDTH, h, 3, 3, "F");
    doc.setTextColor(...COLORS.slate);
    doc.setFont("helvetica", "bold");
    doc.text(title, LEFT + 8, y + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, LEFT + 8, y + 10);
    y += h + 6;
};

// ================= PAGE 1 =================
paintBg();

// Header Banner
doc.setFillColor(...COLORS.emerald);
doc.rect(0, 0, 210, 50, "F");
doc.setTextColor(...COLORS.white);
doc.setFont("helvetica", "bold");
doc.setFontSize(28);
doc.text("GUIDE DU RECYCLAGE", 20, 30);
doc.setFont("helvetica", "normal");
doc.setFontSize(14);
doc.text("Donnez une seconde vie à votre matériel informatique", 20, 40);

y = 65;

// Section 1
sectionHeader("1. Pourquoi recycler est-il vital" + N + "?");
para("Le numérique représente 3,4" + N + "% des émissions mondiales de gaz à effet de serre, soit 1,8 Gt CO2e (GreenIT, EENM 2025). Le premier levier, c'est de garder ses appareils plus longtemps : réduire, réparer et réemployer passent avant le recyclage.");

bulletBlock("MINE URBAINE :",
    "Environ 100 millions de téléphones dorment dans les tiroirs français (estimation ADEME 2020, la plus récente publiée), et 26 millions arrivent en fin de vie chaque année (ADEME). Ils sont conçus pour durer 6 à 8 ans, mais remplacés après 2 à 3 ans : le gisement est déjà chez nous.");

bulletBlock("MATIÈRES STRATÉGIQUES :",
    "Un smartphone contient plus de 70 matériaux, dont des métaux rares (ADEME). L'UE vise 25" + N + "% de matières stratégiques issues du recyclage en 2030, contre 12" + N + "% aujourd'hui (règlement UE 2024, Cour des comptes européenne 2026) : recycler, c'est aussi de la souveraineté.");

bulletBlock("SANTÉ PUBLIQUE :",
    "Les e-déchets contiennent des substances dangereuses : plomb, mercure, retardateurs de flamme bromés (Global E-waste Monitor 2024). Sans traitement en filière agréée, elles peuvent contaminer les sols et les nappes phréatiques.");

y += 4;
infoBox("Bon à savoir : la loi",
    "Il est interdit de jeter un appareil électrique à la poubelle ou sur la voie publique, sous peine d'amende (Service Public 2025). À l'achat, les distributeurs reprennent gratuitement votre ancien appareil (un pour un) ; les magasins de plus de 400 m² le reprennent même sans obligation d'achat.");

// ================= PAGE 2 =================
doc.addPage();
paintBg();
y = 25;

// Section 2
sectionHeader("2. Avant de vous en séparer");

const prepSteps = [
    ["1. SAUVEGARDE", "Copiez photos, documents et contacts sur un disque externe ou un cloud sécurisé."],
    ["2. DÉCONNEXION", "Déconnectez vos comptes (Apple, Google, Microsoft) et désactivez la localisation. Indispensable pour le réemploi."],
    ["3. EFFACEMENT", "Réinitialisez aux paramètres d'usine. Pour un PC, utilisez un logiciel d'effacement sécurisé."],
    ["4. BATTERIES", "Ne jetez jamais une pile ou batterie à la poubelle : 65" + N + "% des incendies de la filière déchets viennent d'erreurs de tri (Sénat 2025). Retirez-la si elle est amovible, scotchez les bornes, apportez-la en point de collecte."],
    ["5. ACCESSOIRES", "Retirez cartes SIM et cartes SD. Conservez câbles et chargeurs fonctionnels."],
    ["6. RÉEMPLOI", "S'il fonctionne encore, donnez ou faites reconditionner : 22" + N + "% des smartphones utilisés en France sont déjà d'occasion (enquête Recommerce-Kantar 2025). Voir section 3."]
];

prepSteps.forEach(([title, desc]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.slate);
    doc.text(title, LEFT + 5, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(desc, 118);
    need(lines.length * 6 + 5);
    doc.text(lines, LEFT + 47, y);
    y += lines.length * 6 + 5;
});

y += 8;

// Section 3
sectionHeader("3. L'ordre des priorités");

bulletBlock("1. GARDER PLUS LONGTEMPS :",
    "Chaque année d'usage en plus réduit l'impact annuel de l'appareil. Avant d'acheter, vérifiez l'indice de réparabilité (note sur 10 affichée depuis 2021, devenue indice de durabilité en 2024).");

bulletBlock("2. RÉPARER :",
    "Le Bonus Réparation déduit 15 à 60 euros de la facture chez un réparateur labellisé QualiRépar, appareil hors garantie (loi AGEC) : écran de smartphone 25 euros, portable 50 euros, TV 60 euros, +20" + N + "% si pièces reconditionnées. En 3 ans, 1,9 million de réparations aidées (Ecosystem 2026). La directive européenne 2024 impose aux fabricants de réparer (lave-linge, smartphones...) à partir de juillet 2026.");

bulletBlock("3. RÉEMPLOYER :",
    "Don ou reconditionné garanti 2 ans. Un smartphone reconditionné émet 75 à 90" + N + "% de CO2e en moins qu'un neuf (ADEME 2022) ; le revendre rapporte 170 euros en moyenne (indice Recommerce 2025).");

bulletBlock("4. RECYCLER :",
    "En dernier recours, toujours en filière agréée (voir section 4).");

// ================= PAGE 3 =================
doc.addPage();
paintBg();
y = 25;

// Section 4
sectionHeader("4. Les filières de confiance");

const filieres = [
    ["REPRISE DISTRIBUTEUR", "En magasin : un pour un à l'achat, sans obligation d'achat dès 400 m² (Service Public 2025)", "À l'achat d'un neuf, ou pour un petit appareil."],
    ["DON PAR COURRIER", "jedonnemontelephone.fr (Ecosystem) : enveloppe pré-affranchie, données effacées, Ateliers du Bocage (Emmaüs)", "Pour un téléphone, même hors d'usage."],
    ["RECONDITIONNEMENT", "BackMarket, YesYes : appareils testés et garantis", "Si l'appareil fonctionne et a moins de 5 ans."],
    ["ASSOCIATIONS", "Emmaüs, Envie, ressourceries", "Pour une seconde vie solidaire et locale."],
    ["ÉCO-ORGANISMES", "Ecosystem, Écologic : ils financent et organisent la collecte", "Via leurs points et bornes de collecte."],
    ["DÉCHETTERIES", "Mairie ; annuaire : quefairedemesdechets.ademe.fr", "Gros volumes (écrans, imprimantes, unités centrales)."]
];

need(30);
autoTable(doc, {
    startY: y,
    theme: 'grid',
    head: [['Canal', 'Contacts', 'Quand y aller']],
    body: filieres,
    headStyles: { fillColor: COLORS.emerald },
    styles: { fontSize: 9 },
    margin: { left: LEFT, right: LEFT }
});

y = doc.lastAutoTable.finalY + 14;

// Section 5
sectionHeader("5. L'impact de votre geste en chiffres");

const stats = [
    ["46" + N + "%", "des e-déchets collectés en France (Eurostat, Ecosystem 2024)"],
    ["79" + N + "%", "des DEEE collectés recyclés ou réutilisés (Ecosystem 2024)"],
    ["24 kg", "de déchets électroniques par habitant et par an (ADEME 2024)"],
    ["42" + N + "000", "points de collecte en France (Ecosystem 2025)"]
];

need(88);
doc.setFillColor(245, 247, 245);
stats.forEach(([value, label], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = LEFT + col * 86;
    const yy = y + row * 44;
    doc.roundedRect(x, yy, 84, 40, 3, 3, "F");
    doc.setTextColor(...COLORS.emerald);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(value, x + 6, yy + 16);
    doc.setTextColor(...COLORS.slate);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(label, 72);
    doc.text(lines, x + 6, yy + 25);
});
y += 92;

// Call to Action
need(30);
doc.setFillColor(...COLORS.emerald);
doc.roundedRect(LEFT + 10, y, 150, 24, 5, 5, "F");
doc.setTextColor(...COLORS.white);
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text("Point de collecte le plus proche :", 105, y + 9, { align: "center" });
doc.setFontSize(12);
doc.text("quefairedemesdechets.ademe.fr", 105, y + 18, { align: "center" });

// --- Footers + sources ---
const nPages = doc.getNumberOfPages();
const sources = "Sources : GreenIT EENM 2025 ; ADEME 2020, 2022, 2024 ; Eurostat et Ecosystem 2024 ; Ecosystem 2025 et 2026 ; Global E-waste Monitor 2024 ; Service Public 2025 ; Sénat 2025 ; Parlement européen et Commission 2024 ; Cour des comptes européenne 2026 ; enquête Recommerce-Kantar 2025. Réserve : 100 M = estimation ADEME 2020, la plus récente publiée. Document généré le " + today + ".";
for (let i = 1; i <= nPages; i++) {
    doc.setPage(i);
    doc.setTextColor(...COLORS.slateLight);
    doc.setFont("helvetica", "normal");
    if (i === nPages) {
        doc.setFontSize(7);
        const lines = doc.splitTextToSize(sources, WIDTH);
        doc.text(lines, LEFT, 272 - lines.length * 3.5);
    }
    doc.setFontSize(8);
    doc.text("Le Green IT en clair | hylst.fr/greenit | page " + i + " / " + nPages, 105, 290, { align: "center" });
}

// Save
const outputPath = path.join(__dirname, "../public/guide-recyclage-green-it.pdf");
doc.save(outputPath);

console.log("Guide PDF enrichi généré avec succès (" + nPages + " pages).");

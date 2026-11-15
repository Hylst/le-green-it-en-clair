// Copie a plat les segments RSC de l'export statique de Next.js 16.
//
// L'export ecrit les donnees de prefetch par segment dans des sous-dossiers
// (`faq/__next.faq/__PAGE__.txt`), mais le client les demande a plat, les
// segments joints par des points (`faq/__next.faq.__PAGE__.txt`) : sans copie,
// chaque lien visible produit un 404 en console et la navigation perd son
// prefetch. Le script ajoute la version a plat a cote de l'original.
//
// Lance automatiquement apres `next build` (script `postbuild`).

import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "_next" && dir === OUT.replace(/[\\/]$/, "")) continue;
      walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

if (!existsSync(OUT)) {
  console.error("flatten-rsc-segments : dossier out/ absent, rien a faire");
  process.exit(0);
}

let copies = 0;
for (const file of walk(OUT)) {
  const parts = relative(OUT, file).split(sep);
  const i = parts.findIndex((p, k) => k < parts.length - 1 && p.startsWith("__next."));
  if (i === -1) continue;
  const flat = join(OUT, ...parts.slice(0, i), parts.slice(i).join("."));
  if (!existsSync(flat)) {
    copyFileSync(file, flat);
    copies++;
  }
}
console.log(`flatten-rsc-segments : ${copies} segment(s) copie(s) a plat`);

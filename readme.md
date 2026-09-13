# Le Green IT en clair

Salut ! Moi c'est Geoffroy, dev, et j'ai monté ce petit site pour expliquer le Green IT sans prise de tête.

Le numérique pollue plus qu'on croit (fabrication, datacenters, e-déchets...), mais y'a plein de gestes simples. Le site est là pour ça : comprendre, chiffrer, et passer à l'action.

🌍 Voir en ligne : https://hylst.fr/greenit

## C'est quoi dedans ?

- des pages qui expliquent : cycle de vie, chiffres, datacenters, recyclage, réglementation, mythes vs réalités...
- 7 outils interactifs sur `/outils` : calculateur carbone, analyse de site web, simulateur sobriété, simulateur entreprise, comparateur cloud, audit parc IT, quiz (100 questions)
- 8 fiches pratiques + des modèles téléchargeables pour les boîtes / collectivités
- une carte des points de collecte, une FAQ, un glossaire

Bon, tout n'est pas parfait, y'a encore des trucs à fixer (voir `todo.md`), mais ça tourne.

## Lancer le projet chez toi

```bash
git clone https://github.com/Hylst/le-green-it-en-clair.git
cd le-green-it-en-clair
npm install
npm run dev
```

Puis ouvre http://localhost:3000. En prod c'est servi sous `/greenit` (voir `nginx.conf`, `next.config.mjs`).

Autres commandes utiles :

```bash
npm run build   # export statique dans ./out
npm run lint    # eslint
npm run convert-images  # jpg -> webp avec sharp
```

Faut Node 20+.

## Techno (vite fait)

Next.js 16 + React 19 + TypeScript, Tailwind, shadcn/ui, Leaflet pour la carte, Recharts pour les graphes, jsPDF pour les exports PDF. Images en WebP. Dark mode par défaut.

## D'où viennent les chiffres ?

ADEME, GreenIT.fr, Ecosystem, ONU, Arcep, Shift Project... J'essaie de sourcer + dater à chaque fois. Les calculateurs se basent sur de l'ACV, mais ça reste des estimations, hein.

## Petite mise en garde

C'est un projet perso fait sur mon temps libre. Y'a peut-être des erreurs ou des chiffres qui ont bougé. Vérifie les sources officielles si c'est pour une décision importante. Et si tu vois une coquille, envoie-moi un mail, ça fait toujours plaisir.

## Contact

Geoffroy Streit — geoffroy.streit@gmail.com
Projet perso, pas commercial, pas de pub.

---

version 1.1.0 — màj septembre 2026

const path = require("path");
const fs = require("fs");
const { createServer } = require("http");

// out/ est à la racine du projet : scripts/../out (pas ../../out)
const outDir = path.resolve(process.argv[2] || path.join(__dirname, "..", "out"));
const port = parseInt(process.argv[3], 10) || 3006;
const BASE = "/greenit";

const server = createServer((req, res) => {
  // 1. Nettoie URL : retire query/hash, décode, retire préfixe /greenit (basePath Next)
  let raw = (req.url || "/").split("?")[0].split("#")[0];
  try {
    raw = decodeURIComponent(raw);
  } catch {}
  if (raw === BASE || raw === `${BASE}/`) raw = "/";
  else if (raw.startsWith(`${BASE}/`)) raw = raw.slice(BASE.length) || "/";
  if (!raw.startsWith("/")) raw = `/${raw}`;

  // 2. Sécurité : empêche directory traversal
  const safe = path.normalize(raw).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(outDir, safe);

  // 3. Résolution : fichier direct > dossier/index.html > page.html > 404.html
  const tryFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile();
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  } else if (!tryFile(filePath)) {
    if (tryFile(`${filePath}.html`)) filePath = `${filePath}.html`;
    else if (tryFile(path.join(filePath, "index.html"))) filePath = path.join(filePath, "index.html");
  }
  if (!tryFile(filePath)) {
    const notFound = path.join(outDir, "404.html");
    if (tryFile(notFound)) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(notFound));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
    return;
  }
  const ext = path.extname(filePath);
  const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".txt": "text/plain",
    ".xml": "application/xml",
  };
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  res.end(fs.readFileSync(filePath));
});

server.listen(port, () => {
  console.log(`Serving ${outDir} at http://localhost:${port}/`);
});
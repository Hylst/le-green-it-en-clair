const express = require("express");
const path = require("path");
const fs = require("fs");
const { createServer } = require("http");

const outDir = process.argv[2] || path.join(__dirname, "..", "..", "out");
const port = parseInt(process.argv[3], 10) || 3006;

const server = createServer((req, res) => {
  let filePath = path.join(outDir, req.url === "/" ? "/index.html" : req.url ?? "/index.html");
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(outDir, "/index.html");
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
#!/usr/bin/env node
// Rapport de conventions typographiques (lecture seule, ne modifie rien).
// Usage : node scripts/check-typo.js [--strict]
const fs = require("fs")
const path = require("path")

const ROOT = path.join(__dirname, "..")
const DIRS = ["app", "components"]
const EXTS = new Set([".tsx", ".ts", ".jsx", ".js"])

const RULES = [
  { id: "de-e", regex: /de e-déchets/g, label: "« de e-déchets » → « d'e-déchets »" },
  { id: "impact-co2", regex: /Impact CO2/g, label: "« Impact CO2 » → « Impact CO₂ »" },
  { id: "co2", regex: /\bCO2\b/g, label: "« CO2 » → « CO₂ » / « CO₂e »" },
  { id: "pct", regex: /[0-9]%/g, label: "« % » sans espace (texte visible)" },
]

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue
      walk(full, files)
    } else if (EXTS.has(path.extname(entry.name))) {
      files.push(full)
    }
  }
  return files
}

const findings = []
for (const dir of DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/)
    lines.forEach((line, index) => {
      for (const rule of RULES) {
        rule.regex.lastIndex = 0
        if (rule.regex.test(line)) {
          findings.push({
            rule: rule.id,
            label: rule.label,
            file: path.relative(ROOT, file).replace(/\\/g, "/"),
            line: index + 1,
            excerpt: line.trim().slice(0, 120),
          })
        }
      }
    })
  }
}

const byRule = new Map()
for (const f of findings) {
  if (!byRule.has(f.rule)) byRule.set(f.rule, [])
  byRule.get(f.rule).push(f)
}

if (findings.length === 0) {
  console.log("check:typo — aucune occurrence détectée.")
  process.exit(0)
}

console.log(`check:typo — ${findings.length} occurrence(s) à vérifier (texte visible uniquement) :\n`)
for (const [ruleId, items] of byRule) {
  console.log(`# ${items[0].label} — ${items.length}`)
  for (const item of items.slice(0, 40)) {
    console.log(`  ${item.file}:${item.line}  ${item.excerpt}`)
  }
  if (items.length > 40) console.log(`  … et ${items.length - 40} autres`)
  console.log("")
}

process.exit(process.argv.includes("--strict") ? 1 : 0)

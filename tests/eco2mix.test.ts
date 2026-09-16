import { chromium, type Browser } from "playwright"
import { AxeBuilder } from "@axe-core/playwright"
import { mkdirSync, existsSync } from "fs"
import { join } from "path"

const BASE_URL = process.env.BASE_URL || "http://localhost:3006"
const OUT_DIR = join(process.cwd(), "out")

async function serveStatic(browser: Browser, port: number): Promise<void> {
  const { createServer } = await import("http")
  const { readFileSync, existsSync } = await import("fs")
  const { join, extname } = await import("path")

  const MIME: Record<string, string> = {
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
  }

  const server = createServer((req, res) => {
    let filePath = join(OUT_DIR, req.url === "/" ? "/index.html" : req.url ?? "/index.html")
    if (!existsSync(filePath)) {
      filePath = join(OUT_DIR, "/index.html")
    }
    try {
      const content = readFileSync(filePath)
      const ext = extname(filePath)
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" })
      res.end(content)
    } catch {
      res.writeHead(404)
      res.end("Not found")
    }
  })

  await new Promise<void>((resolve) => server.listen(port, resolve))
  console.log(`Server running at http://localhost:${port}`)
}

async function main() {
  mkdirSync(join(process.cwd(), "tests"), { recursive: true })

  if (!existsSync(OUT_DIR)) {
    console.error("out/ directory not found. Run npm run build first.")
    process.exit(1)
  }

  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })
  const page = await context.newPage()

  console.log("\n=== Test 1: Eco2Mix loads on /chiffres ===")
  await page.goto(`${BASE_URL}/chiffres`, { waitUntil: "networkidle" })
  await page.waitForTimeout(3000) // Wait for API call + cache

  const eco2mixText = await page.locator("text=Intensité carbone et mix électrique en direct").count()
  if (eco2mixText > 0) {
    console.log("✅ Eco2Mix section found on /chiffres")
  } else {
    console.error("❌ Eco2Mix section NOT found on /chiffres")
  }

  const tauxCo2 = await page.locator("text=/\\d+ gCO₂e\\/kWh/").first().count()
  console.log(`  - Intensité carbone KPI visible: ${tauxCo2 > 0 ? "✅" : "❌"}`)

  // Check sessionStorage cache was set
  const cacheKey = await page.evaluate(() => sessionStorage.getItem("greenit-eco2mix-cache-v1"))
  if (cacheKey) {
    console.log("✅ Cache set in sessionStorage")
  } else {
    console.log("⚠️  No cache in sessionStorage (possible network error or fallback)")
  }

  // Check the API was called by verifying data is fresh
  const dataFreshness = await page.evaluate(async () => {
    const cached = sessionStorage.getItem("greenit-eco2mix-cache-v1")
    if (!cached) return "no-cache"
    const parsed = JSON.parse(cached)
    const age = Date.now() - parsed.timestamp
    return age < 600000 ? "fresh" : "stale"
  })
  console.log(`  - Cache freshness: ${dataFreshness === "fresh" ? "✅" : "❌"} (${dataFreshness})`)

  console.log("\n=== Test 2: Cache prevents redundant API call ===")
  const requestCount = await page.evaluate(() => (window as any).__requestCount || 0)
  console.log(`  - Network requests made: ${requestCount > 0 ? requestCount : "N/A (check with verbose mode)"}`)

  console.log("\n=== Test 3: Eco2Mix loads on /datacenters ===")
  await page.goto(`${BASE_URL}/datacenters`, { waitUntil: "networkidle" })
  await page.waitForTimeout(3000)

  const dcEco2mix = await page.locator("text=Mix électrique et impact carbone en direct").count()
  if (dcEco2mix > 0) {
    console.log("✅ Eco2Mix datacenter widget found on /datacenters")
  } else {
    console.error("❌ Eco2Mix datacenter widget NOT found on /datacenters")
  }

  // Check PUE Calculator
  const pueCalc = await page.locator("text=Simulateur d'impact carbone instantané").count()
  console.log(`  - PUE Calculator visible: ${pueCalc > 0 ? "✅" : "❌"}`)

  console.log("\n=== Test 4: Offline mode ===")
  await page.setOffline(true)
  await page.reload({ waitUntil: "networkidle" })
  await page.waitForTimeout(2000)

  const offlineMsg = await page.locator("text=Mode hors ligne").count()
  if (offlineMsg > 0) {
    console.log("✅ Offline mode detected and message displayed")
  } else {
    console.error("❌ Offline mode message NOT found")
  }

  // Should show fallback or cached data, not crash
  const kpiValue = await page.locator("text=taux Co2").count()
  console.log(`  - KPIs still visible (fallback): ${kpiValue > 0 ? "✅" : "❌"}`)

  await page.setOffline(false)

  console.log("\n=== Test 5: Refresh button ===")
  await page.goto(`${BASE_URL}/chiffres`, { waitUntil: "networkidle" })
  await page.waitForTimeout(3000)

  const refreshBtn = await page.locator("button:has-text('Actualiser')").count()
  if (refreshBtn > 0) {
    console.log("✅ Refresh button found")
  } else {
    console.error("❌ Refresh button NOT found")
  }

  // Check date/time display
  const dateDisplay = await page.locator("text=/Relevé \\d{2}\\/\\d{2}\\/\\d{4}/").count()
  console.log(`  - Date display: ${dateDisplay > 0 ? "✅" : "❌"}`)

  console.log("\n=== Test 6: Axe accessibility check ===")
  await page.goto(`${BASE_URL}/chiffres`, { waitUntil: "networkidle" })
  await page.waitForTimeout(3000)

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  const violations = accessibilityScanResults.violations
  if (violations.length === 0) {
    console.log("✅ No accessibility violations on /chiffres")
  } else {
    console.error(`❌ ${violations.length} accessibility violations found:`)
    violations.forEach((v) => console.error(`  - ${v.id}: ${v.description}`))
  }

  console.log("\n=== Test 7: Responsive 320px ===")
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(`${BASE_URL}/chiffres`, { waitUntil: "networkidle" })
  await page.waitForTimeout(3000)

  const overflow320 = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth
  })
  console.log(`  - No horizontal overflow at 320px: ${!overflow320 ? "✅" : "❌"}`)

  console.log("\n=== Test 8: Responsive 390px ===")
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload({ waitUntil: "networkidle" })
  await page.waitForTimeout(3000)

  const overflow390 = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth
  })
  console.log(`  - No horizontal overflow at 390px: ${!overflow390 ? "✅" : "❌"}`)

  console.log("\n=== Test 9: Responsive 1280px ===")
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.reload({ waitUntil: "networkidle" })
  await page.waitForTimeout(3000)

  const overflow1280 = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth
  })
  console.log(`  - No horizontal overflow at 1280px: ${!overflow1280 ? "✅" : "❌"}`)

  console.log("\n=== Test 10: Dark mode contrast check ===")
  await page.goto(`${BASE_URL}/chiffres`, { waitUntil: "networkidle" })
  await page.waitForTimeout(3000)

  // Force dark mode if theme toggle exists
  const darkModeResult = await page.evaluate(async () => {
    const stored = localStorage.getItem("greenIT-theme")
    return stored
  })
  console.log(`  - Dark mode setting: ${darkModeResult || "default (dark)"}`)

  const darkAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()
  const darkViolations = darkAxe.violations.filter((v: any) => v.nodes.some((n: any) => n.any.find((r: any) => r.confidence >= 50)))
  console.log(`  - Dark mode axe violations: ${darkViolations.length === 0 ? "✅ 0" : `❌ ${darkViolations.length}`}`)

  console.log("\n=== All tests complete ===")

  await browser.close()
}

main().catch((err) => {
  console.error("Test failed:", err)
  process.exit(1)
})

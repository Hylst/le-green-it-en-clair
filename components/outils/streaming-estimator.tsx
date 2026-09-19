"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MonitorPlay, Wifi, Signal, Info, Video, Printer, Share2, Check } from "lucide-react"
import { LabeledSlider, ScopeNote } from "./shared"
import { SourceTooltip } from "@/components/source-tooltip"
import Link from "next/link"

// Débits moyens constatés (plateformes + mesures CableLabs, 2026), en Go/heure
const DEBITS = {
  sd: { label: "Standard (480p)", goHeure: 1 },
  hd: { label: "HD (720p-1080p)", goHeure: 3 },
  uhd: { label: "Ultra HD (4K)", goHeure: 7 },
} as const

type Qualite = keyof typeof DEBITS

// Énergie du réseau par Go transféré (Arcep, enquête 2026 sur données 2024), en kWh/Go
const KWH_PAR_GO = { wifi: 0.02, mobile: 0.14 } as const
type Reseau = keyof typeof KWH_PAR_GO

const VISIO_GO_HEURE = 1 // CableLabs, mesures 2026 sur Meet, Teams, Zoom et GoTo
const FACTEUR_FR = 0.0519 // kgCO₂e/kWh, Base Empreinte 2024 (mix moyen France)
const KG_PAR_KM_VOITURE = 0.17 // kgCO₂e/km, ADEME Base Empreinte 2023 (même repère que les autres outils)
const SEMAINES_PAR_MOIS = 52 / 12
const SEMAINES_PAR_AN = 52

// Périmètre optionnel « terminaux » (toggle OFF par défaut) : UNIQUEMENT des
// chiffres déjà cités sur le site, chaque ligne avec son SourceTooltip.
// TV : ~155 kWh/an pour 6 h quotidiennes (ADEME, Panel Elecdom 2025, cas pratiques TV).
const TV_KWH_PAR_HEURE = 155 / (6 * 365) // ≈ 0,071 kWh par heure de visionnage
// Box : 9,1 W en continu, soit ~80 kWh/an, dont ~90 % invariable (Arcep, 2026, page fai-box et fiche box-wifi).
const BOX_KWH_AN = 80
// Décodeur TV : 7,4 W en moyenne (Arcep, 2026, fiche box-wifi) → ~65 kWh/an en continu.
const DECODEUR_KWH_AN = (7.4 * 24 * 365) / 1000 // ≈ 64,8 kWh/an

// Petites valeurs : une décimale plutôt qu'un "0" qui décourage
function fmtPetit(v: number) {
  return v > 0 && v < 10 ? v.toFixed(1).replace(".", ",") : String(Math.round(v))
}

export default function StreamingEstimator() {
  const [hVideo, setHVideo] = useState([7])
  const [qualite, setQualite] = useState<Qualite>("hd")
  const [hVisio, setHVisio] = useState([3])
  const [reseau, setReseau] = useState<Reseau>("wifi")
  const [inclureTerminaux, setInclureTerminaux] = useState(false) // OFF par défaut : garde-fou, les résultats réseau restent identiques
  const [copied, setCopied] = useState(false)

  const goMois = (hVideo[0] * DEBITS[qualite].goHeure + hVisio[0] * VISIO_GO_HEURE) * SEMAINES_PAR_MOIS
  const kwhAn = goMois * 12 * KWH_PAR_GO[reseau]
  const kgAn = kwhAn * FACTEUR_FR
  const kmVoiture = kgAn / KG_PAR_KM_VOITURE

  // Terminaux (optionnels) : TV au prorata des heures de streaming, box et
  // décodeur en forfait annuel (90 % de la box est invariable, Arcep 2026).
  // Forfaits comptés seulement si l'usage correspondant est actif : à 0 h, 0 kWh.
  const tvKwhAn = hVideo[0] * SEMAINES_PAR_AN * TV_KWH_PAR_HEURE
  const boxKwhAn = hVideo[0] + hVisio[0] > 0 ? BOX_KWH_AN : 0
  const decodeurKwhAn = hVideo[0] > 0 ? DECODEUR_KWH_AN : 0
  const terminauxKwhAn = tvKwhAn + boxKwhAn + decodeurKwhAn
  const terminauxKgAn = terminauxKwhAn * FACTEUR_FR
  const totalKgAn = kgAn + terminauxKgAn
  const totalKmVoiture = totalKgAn / KG_PAR_KM_VOITURE

  const conseils: string[] = []
  if (qualite === "uhd") conseils.push("Passer de la 4K à la HD divise le débit par plus de deux, invisible sur petit écran.")
  if (reseau === "mobile") conseils.push("Le réseau mobile consomme 7 fois plus d'énergie par Go que le Wi-Fi : préférez le Wi-Fi à la maison.")
  if (hVisio[0] >= 5) conseils.push("Pour les réunions d'écoute, testez l'audio seul : simple et souvent suffisant.")
  if (hVideo[0] >= 14) conseils.push("Téléchargez en Wi-Fi les contenus regardés en boucle : un téléchargement remplace dix streams.")
  if (hVideo[0] === 0 && hVisio[0] === 0) conseils.push("Aucune vidéo cette semaine : difficile de faire plus sobre, bravo.")
  else if (conseils.length === 0) conseils.push("Vos réglages sont déjà sobres : gardez la 720p par défaut sur mobile.")

  return (
    <Card className="border-2 border-border bg-card p-6 shadow-lg dark:bg-slate-800 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white">
          <MonitorPlay className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-poppins text-xl font-bold text-foreground">Estimateur streaming &amp; visio</h2>
          <p className="text-sm text-muted-foreground">
            Données transférées, énergie du réseau et ordre de grandeur CO₂e, liens vers nos fiches en bas.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <ScopeNote />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">
              Vidéo en streaming : {hVideo[0]} h par semaine
            </p>
            <LabeledSlider value={hVideo} min={0} max={40} step={1} onValueChange={setHVideo} unit="h" label="Heures de streaming par semaine" />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-foreground">Qualité d&apos;image</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(DEBITS) as Qualite[]).map((q) => (
                <button
                  key={q}
                  type="button"
                  aria-pressed={qualite === q}
                  onClick={() => setQualite(q)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    qualite === q
                      ? "bg-rose-600 text-white shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {DEBITS[q].label} · {DEBITS[q].goHeure} Go/h
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Video className="h-4 w-4" /> Visioconférence : {hVisio[0]} h par semaine
            </p>
            <LabeledSlider value={hVisio} min={0} max={20} step={1} onValueChange={setHVisio} unit="h" label="Heures de visioconférence par semaine" />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-foreground">Réseau principal</legend>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={reseau === "wifi"}
                onClick={() => setReseau("wifi")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  reseau === "wifi" ? "bg-rose-600 text-white shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Wifi className="h-4 w-4" /> Wi-Fi / fixe
              </button>
              <button
                type="button"
                aria-pressed={reseau === "mobile"}
                onClick={() => setReseau("mobile")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  reseau === "mobile" ? "bg-rose-600 text-white shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Signal className="h-4 w-4" /> 4G / 5G
              </button>
            </div>
          </fieldset>

          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="streaming-terminaux"
                checked={inclureTerminaux}
                onCheckedChange={(v) => setInclureTerminaux(v === true)}
                className="mt-1"
              />
              <div>
                <Label htmlFor="streaming-terminaux" className="text-sm font-semibold text-foreground">
                  Inclure les terminaux (TV, box, décodeur)
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Désactivé par défaut. Sans lui, l&apos;outil ne compte que l&apos;énergie du réseau : en France, les
                  boîtiers consomment souvent davantage. Smartphone et PC non inclus, faute de chiffre sourcé sur le
                  site.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
            <div className="rounded-xl bg-rose-50 p-4 text-center dark:bg-rose-900/20">
              <p className="font-poppins text-2xl font-bold text-rose-700 dark:text-rose-300">{fmtPetit(goMois)}</p>
              <p className="text-xs text-muted-foreground">Go / mois</p>
            </div>
            <div className="rounded-xl bg-rose-50 p-4 text-center dark:bg-rose-900/20">
              <p className="font-poppins text-2xl font-bold text-rose-700 dark:text-rose-300">{fmtPetit(kwhAn)}</p>
              <p className="text-xs text-muted-foreground">kWh / an (réseau)</p>
            </div>
            <div className="rounded-xl bg-rose-50 p-4 text-center dark:bg-rose-900/20">
              <p className="font-poppins text-2xl font-bold text-rose-700 dark:text-rose-300">{kgAn.toFixed(1).replace(".", ",")}</p>
              <p className="text-xs text-muted-foreground">kgCO₂e / an</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Soit l&apos;équivalent d&apos;environ <strong className="text-foreground">{Math.round(kmVoiture)} km en voiture</strong>.
            En France, le réseau pèse peu grâce au mix électrique bas-carbone : l&apos;enjeu principal reste la
            fabrication des terminaux : gardez vos appareils longtemps.
          </p>

          {inclureTerminaux && (
            <div className="space-y-2 rounded-xl border border-border bg-muted/50 p-4">
              <p className="text-sm font-semibold text-foreground">
                Avec les terminaux : {fmtPetit(terminauxKwhAn)} kWh/an, soit{" "}
                {terminauxKgAn.toFixed(1).replace(".", ",")} kgCO₂e/an (≈ {Math.round(totalKmVoiture)} km en voiture)
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  • TV : {fmtPetit(tvKwhAn)} kWh/an au prorata de vos {hVideo[0]} h hebdo{" "}
                  <SourceTooltip
                    source="ADEME, Panel Elecdom, 2025"
                    calculation="155 kWh/an ÷ (6 h/jour × 365 jours) ≈ 0,071 kWh/h, × vos heures de streaming"
                    info="Repère cité dans nos cas pratiques TV. La visio n'est pas comptée ici : elle passe le plus souvent par un petit écran, sans chiffre sourcé sur le site."
                  />
                </li>
                <li>
                  • Box internet : {boxKwhAn > 0 ? "≈ 80" : "0"} kWh/an (forfait, ~90 % invariable même sans streaming){" "}
                  <SourceTooltip
                    source="Arcep, Enquête annuelle « Pour un numérique soutenable », 2026"
                    calculation="9,1 W × 24 h × 365 jours ÷ 1 000 ≈ 80 kWh/an"
                    info="Même repère que notre page box et notre fiche box et Wi-Fi. Forfait compté seulement si vous streamez ou visioez."
                  />
                </li>
                <li>
                  • Décodeur TV : {decodeurKwhAn > 0 ? "≈ 65" : "0"} kWh/an (forfait, lié à la TV){" "}
                  <SourceTooltip
                    source="Arcep, Enquête annuelle « Pour un numérique soutenable », 2026"
                    calculation="7,4 W × 24 h × 365 jours ÷ 1 000 ≈ 64,8 kWh/an"
                    info="Même repère que notre fiche box et Wi-Fi. Compté seulement si vous regardez des vidéos."
                  />
                </li>
              </ul>
              <p className="text-xs text-muted-foreground">
                Fabrication exclue (TV ≈ 328 kg à la fabrication, box ≈ 61 kg, ADEME Impact CO₂ 2025, voir nos cas
                pratiques et notre page box). Conversion avec le même mix France que le réseau
                (0,0519 kgCO₂e/kWh).
              </p>
            </div>
          )}

          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-800 dark:bg-rose-950/30">
            <p className="mb-2 text-sm font-semibold text-foreground">Vos leviers, dans l&apos;ordre :</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {conseils.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-rose-600">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="flex gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0" />
            <span>
              Estimation {inclureTerminaux ? "réseau + terminaux cochés" : "réseau uniquement"}, hors fabrication
              {inclureTerminaux ? " (détail des terminaux ci-dessus)" : " et consommation des terminaux (TV, smartphone, box)"}.
              Débits : plateformes et CableLabs 2026 · réseau : Arcep 2026 (0,02 kWh/Go fixe, 0,14 mobile) · électricité
              France : 0,0519 kgCO₂e/kWh (Base Empreinte 2024). Détail dans nos fiches{" "}
              <Link href="/fiches-pratiques/streaming-video" className="font-medium text-primary hover:underline">
                streaming
              </Link>{" "}
              et{" "}
              <Link href="/fiches-pratiques/teletravail-visio" className="font-medium text-primary hover:underline">
                visio
              </Link>
              .
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex-1 bg-card text-foreground hover:bg-secondary border border-border"
              onClick={() => window.print()}
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-card text-foreground hover:bg-secondary border border-border"
              onClick={async () => {
                const base = `Streaming et visio : ${fmtPetit(goMois)} Go/mois, ${fmtPetit(kwhAn)} kWh/an (réseau uniquement)`
                const text = inclureTerminaux
                  ? `${base}, + ${fmtPetit(terminauxKwhAn)} kWh/an de terminaux (TV, box, décodeur)`
                  : base
                try {
                  if (navigator.share) {
                    await navigator.share({ title: "Mon estimation streaming", text })
                  } else {
                    await navigator.clipboard.writeText(text)
                    setCopied(true)
                    window.setTimeout(() => setCopied(false), 2000)
                  }
                } catch {
                  // partage annulé ou indisponible, on ne fait rien
                }
              }}
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
              {copied ? "Copié !" : "Partager"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

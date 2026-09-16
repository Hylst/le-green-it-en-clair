import Link from "next/link"
import { Leaf, Mail, AlertCircle } from "lucide-react"
import { MotionToggle } from "@/components/motion-toggle"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-8 rounded-lg border border-warning/40 bg-warning/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1 text-foreground">Site personnel en développement</p>
              <p className="text-muted-foreground">
                Les informations présentées peuvent comporter des erreurs ou inexactitudes. En cas de doute,
                référez-vous aux sources officielles citées. Signalement d'erreurs bienvenu à{" "}
                <a href="mailto:geoffroy.streit@gmail.com" className="underline font-medium link-slide">
                  geoffroy.streit@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2 font-bold text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg">Le Green IT en clair</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-3">
              Site personnel pour sensibiliser et agir pour un numérique plus responsable en France.
            </p>
            <p className="text-xs text-muted-foreground italic">Créé par Geoffroy Streit, passionné d'écologie numérique</p>
            <p className="text-xs text-muted-foreground mt-2">Illustrations créées avec l'assistance d'outils d'IA générative</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Explorer</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/comprendre" className="text-muted-foreground hover:text-primary link-slide">
                  Comprendre
                </Link>
              </li>
              <li>
                <Link href="/chiffres" className="text-muted-foreground hover:text-primary link-slide">
                  Chiffres & Données
                </Link>
              </li>
              <li>
                <Link href="/agir" className="text-muted-foreground hover:text-primary link-slide">
                  Comment agir
                </Link>
              </li>
              <li>
                <Link href="/datacenters" className="text-muted-foreground hover:text-primary link-slide">
                  Datacenters
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Ressources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/recyclage" className="text-muted-foreground hover:text-primary link-slide">
                  Recyclage
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-muted-foreground hover:text-primary link-slide">
                  Guide
                </Link>
              </li>
              <li>
                <Link href="/ressources" className="text-muted-foreground hover:text-primary link-slide">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/ressources#glossaire" className="text-muted-foreground hover:text-primary link-slide">
                  Glossaire
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-muted-foreground hover:text-primary link-slide">
                  À propos
                </Link>
              </li>
              <li>
                <a href="mailto:geoffroy.streit@gmail.com" className="text-muted-foreground hover:text-primary link-slide">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Sources de référence</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="https://www.ademe.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary link-slide">
                  ADEME
                </a>
              </li>
              <li>
                <a href="https://www.greenit.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary link-slide">
                  GreenIT.fr
                </a>
              </li>
              <li>
                <a href="https://www.ecosystem.eco" target="_blank" rel="noopener noreferrer" className="hover:text-primary link-slide">
                  Ecosystem
                </a>
              </li>
              <li>
                <a href="https://www.ecologic-france.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary link-slide">
                  Écologic
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Le Green IT en clair. Créé par Geoffroy Streit. Projet personnel non commercial.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary link-slide">
                Mentions légales
              </Link>
              <MotionToggle />
              <a
                href="mailto:geoffroy.streit@gmail.com"
                className="text-muted-foreground hover:text-primary"
                title="Contact"
                aria-label="Contact"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

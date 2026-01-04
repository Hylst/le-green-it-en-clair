import Link from "next/link"
import { Leaf, Mail, AlertCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-1">Site personnel en développement</p>
              <p>
                Les informations présentées peuvent comporter des erreurs ou inexactitudes. En cas de doute,
                référez-vous aux sources officielles citées. Signalement d'erreurs bienvenu à{" "}
                <a href="mailto:geoffroy.streit@gmail.com" className="underline font-medium">
                  geoffroy.streit@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2 font-bold text-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">Le Green IT en clair</span>
            </Link>
            <p className="text-sm text-slate-600 mb-3">
              Site personnel pour sensibiliser et agir pour un numérique plus responsable en France.
            </p>
            <p className="text-xs text-slate-500 italic">Créé par Geoffroy Streit, passionné d'écologie numérique</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Explorer</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/comprendre" className="text-slate-600 hover:text-emerald-700">
                  Comprendre
                </Link>
              </li>
              <li>
                <Link href="/chiffres" className="text-slate-600 hover:text-emerald-700">
                  Chiffres & Données
                </Link>
              </li>
              <li>
                <Link href="/agir" className="text-slate-600 hover:text-emerald-700">
                  Comment agir
                </Link>
              </li>
              <li>
                <Link href="/datacenters" className="text-slate-600 hover:text-emerald-700">
                  Datacenters
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Ressources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/recyclage" className="text-slate-600 hover:text-emerald-700">
                  Recyclage
                </Link>
              </li>
              <li>
                <Link href="/ressources" className="text-slate-600 hover:text-emerald-700">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-slate-600 hover:text-emerald-700">
                  À propos
                </Link>
              </li>
              <li>
                <a href="mailto:geoffroy.streit@gmail.com" className="text-slate-600 hover:text-emerald-700">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Sources de référence</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>ADEME</li>
              <li>GreenIT.fr</li>
              <li>Ecosystem</li>
              <li>Écologic</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-sm text-slate-600">
              © 2025 Le Green IT en clair. Créé par Geoffroy Streit. Projet personnel non commercial.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:geoffroy.streit@gmail.com"
                className="text-slate-600 hover:text-emerald-700"
                title="Contact"
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

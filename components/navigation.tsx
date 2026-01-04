"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X, ChevronDown, Search, Calculator } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false)
        setMobileMenuOpen(false)
      }
    }

    if (searchOpen || mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [searchOpen, mobileMenuOpen])

  const navCategories = [
    {
      label: "Découvrir",
      items: [
        { href: "/par-ou-commencer", label: "🚀 Par où commencer" },
        { href: "/comprendre", label: "Comprendre le cycle de vie" },
        { href: "/problematiques", label: "Problématiques & Solutions" },
        { href: "/mythes", label: "Mythes vs Réalités" },
        { href: "/chiffres", label: "Chiffres & Données" },
        { href: "/cas-pratiques", label: "Cas pratiques" },
        { href: "/actualites", label: "Actualités Green IT 2025" },
        { href: "/flux-rss", label: "📡 Flux RSS en direct" },
      ],
    },
    {
      label: "Agir",
      items: [
        { href: "/agir", label: "Comment agir" },
        { href: "/fiches-pratiques", label: "Fiches pratiques" },
        { href: "/modeles", label: "📥 Modèles téléchargeables" },
        { href: "/recyclage", label: "Recyclage & Réparation" },
        { href: "/outils", label: "🎯 Outils interactifs" },
      ],
    },
    {
      label: "Approfondir",
      items: [
        { href: "/datacenters", label: "Datacenters verts" },
        { href: "/developpement", label: "Développement éco-responsable" },
        { href: "/reglementation", label: "Réglementation" },
        { href: "/perspectives", label: "Perspectives d'avenir" },
      ],
    },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg">Le Green IT en clair</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navCategories.map((category) => (
              <DropdownMenu key={category.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 focus:outline-none dark:text-slate-300 dark:hover:text-emerald-400">
                  {category.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {category.items.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="cursor-pointer">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Link
              href="/ressources"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              Ressources
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              FAQ
            </Link>
            <Link
              href="/a-propos"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              À propos
            </Link>
            <Link
              href="/flux-rss"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              Flux RSS
            </Link>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-slate-600 hover:text-emerald-700 transition-colors dark:text-slate-300 dark:hover:text-emerald-400"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <Link href="/outils">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
              >
                <Calculator className="h-4 w-4 mr-1.5" />
                Outils
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-slate-600 hover:text-emerald-700 transition-colors dark:text-slate-300 dark:hover:text-emerald-400"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900 dark:text-slate-100" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900 dark:text-slate-100" />
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-slate-200 py-4 dark:border-slate-700">
            <input
              type="search"
              placeholder="Rechercher sur le site..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              autoFocus
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Appuyez sur Entrée pour rechercher ou Échap pour fermer
            </p>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 lg:hidden dark:border-slate-700">
            <div className="flex flex-col gap-4">
              {navCategories.map((category) => (
                <div key={category.label}>
                  <div className="font-semibold text-sm text-slate-900 mb-2 dark:text-slate-100">{category.label}</div>
                  <div className="flex flex-col gap-2 ml-4">
                    {category.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/ressources"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ressources
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/a-propos"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/sitemap-page"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plan du site
              </Link>
              <Link
                href="/flux-rss"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Flux RSS
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

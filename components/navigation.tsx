"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X, ChevronDown, Search, Calculator } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { InstallPWA } from "@/components/install-pwa"
import { SearchDialog } from "@/components/search-dialog"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        { href: "/par-ou-commencer", label: "Par où commencer" },
        { href: "/comprendre", label: "Comprendre le cycle de vie" },
        { href: "/problematiques", label: "Problématiques & Solutions" },
        { href: "/mythes", label: "Mythes vs Réalités" },
        { href: "/chiffres", label: "Chiffres & Données" },
        { href: "/cas-pratiques", label: "Cas pratiques" },
        { href: "/actualites", label: "Dossiers & veille" },
        { href: "/blog", label: "Blog" },
      ],
    },
    {
      label: "Agir",
      items: [
        { href: "/agir", label: "Comment agir" },
        { href: "/fiches-pratiques", label: "Fiches pratiques" },
        { href: "/modeles", label: "Modèles téléchargeables" },
        { href: "/recyclage", label: "Recyclage & Réparation" },
        { href: "/outils", label: "Outils interactifs" },
      ],
    },
    {
      label: "Approfondir",
      items: [
        { href: "/datacenters", label: "Datacenters verts" },
        { href: "/fai-box", label: "Choisir son FAI / sa box" },
        { href: "/developpement", label: "Développement éco-responsable" },
        { href: "/reglementation", label: "Réglementation" },
        { href: "/perspectives", label: "Perspectives d'avenir" },
      ],
    },
  ]

  return (
    <nav suppressHydrationWarning className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-foreground">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="whitespace-nowrap text-lg">
              Le Green IT <span className="hidden sm:inline">en clair</span>
            </span>
          </Link>

          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navCategories.map((category) => (
              <DropdownMenu key={category.label}>
                <DropdownMenuTrigger
                  suppressHydrationWarning
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-sm data-[state=open]:text-primary"
                >
                  {category.label}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-card border-border">
                  {category.items.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="cursor-pointer text-card-foreground focus:bg-secondary focus:text-primary">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Link
              href="/ressources"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Ressources
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              FAQ
            </Link>
            <div className="h-4 w-px bg-border mx-2" />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" />
              </button>
              <ThemeToggle />
              <InstallPWA />
            </div>
            <Button
              asChild
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md glow-theme"
              >
              <Link href="/outils">
                <Calculator className="h-4 w-4 mr-1.5" />
                Outils
              </Link>
            </Button>
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
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

        {mobileMenuOpen && (
          <div className="animate-in slide-in-from-top-5 border-t border-border py-4 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-6 pb-20">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-center">
                <Link href="/outils" onClick={() => setMobileMenuOpen(false)}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Accéder aux outils interactifs
                </Link>
              </Button>

              {navCategories.map((category) => (
                <div key={category.label}>
                  <div className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <div className="h-px bg-border flex-1"></div>
                    {category.label}
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <div className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                  <div className="h-px bg-border flex-1"></div>
                  Plus
                  <div className="h-px bg-border flex-1"></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/ressources"
                    className="block rounded-md px-3 py-2 text-sm text-center text-muted-foreground bg-secondary/50 transition-colors hover:bg-secondary hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ressources
                  </Link>
                  <Link
                    href="/faq"
                    className="block rounded-md px-3 py-2 text-sm text-center text-muted-foreground bg-secondary/50 transition-colors hover:bg-secondary hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/a-propos"
                    className="block rounded-md px-3 py-2 text-sm text-center text-muted-foreground bg-secondary/50 transition-colors hover:bg-secondary hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    À propos
                  </Link>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <InstallPWA />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X } from "lucide-react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/comprendre", label: "Comprendre" },
    { href: "/problematiques", label: "Problématiques" },
    { href: "/reglementation", label: "Réglementation" },
    { href: "/chiffres", label: "Chiffres & Données" },
    { href: "/cas-pratiques", label: "Cas pratiques" },
    { href: "/agir", label: "Comment agir" },
    { href: "/datacenters", label: "Datacenters" },
    { href: "/developpement", label: "Développement" },
    { href: "/recyclage", label: "Recyclage" },
    { href: "/perspectives", label: "Perspectives" },
    { href: "/outils", label: "Outils" },
    { href: "/ressources", label: "Ressources" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg">Le Green IT en clair</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/outils">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Calculateur
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, Mail, BadgeCheck, ChevronDown, ArrowUp } from "lucide-react"
import { MotionToggle } from "@/components/motion-toggle"
import { SITE_EMAIL, mailto } from "@/lib/site"

type FooterLink = { href: string; label: string }
type FooterSection = { id: string; title: string; links: FooterLink[] }

// Mêmes rubriques et libellés que la navigation principale.
const SECTIONS: FooterSection[] = [
  {
    id: "decouvrir",
    title: "Découvrir",
    links: [
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
    id: "agir",
    title: "Agir",
    links: [
      { href: "/agir", label: "Comment agir" },
      { href: "/fiches-pratiques", label: "Fiches pratiques" },
      { href: "/modeles", label: "Modèles téléchargeables" },
      { href: "/recyclage", label: "Recyclage & Réparation" },
      { href: "/outils", label: "Outils interactifs" },
    ],
  },
  {
    id: "approfondir",
    title: "Approfondir",
    links: [
      { href: "/datacenters", label: "Datacenters verts" },
      { href: "/fai-box", label: "Choisir son FAI / sa box" },
      { href: "/developpement", label: "Développement éco-responsable" },
      { href: "/reglementation", label: "Réglementation" },
      { href: "/perspectives", label: "Perspectives d'avenir" },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    links: [
      { href: "/ressources", label: "Documentation" },
      { href: "/guide", label: "Guide" },
      { href: "/ressources#glossaire", label: "Glossaire" },
      { href: "/faq", label: "FAQ" },
      { href: "/a-propos", label: "À propos" },
      { href: "/sitemap-page", label: "Plan du site" },
      { href: mailto(), label: "Contact" },
    ],
  },
]

const SOURCES = [
  { href: "https://www.ademe.fr", label: "ADEME" },
  { href: "https://www.greenit.fr", label: "GreenIT.fr" },
  { href: "https://www.ecosystem.eco", label: "Ecosystem" },
  { href: "https://www.ecologic-france.com", label: "Écologic" },
]

export function Footer() {
  // Ouvertes par défaut : lisible sans JS, repliables sur mobile.
  const [open, setOpen] = useState<Record<string, boolean>>({
    decouvrir: true,
    agir: true,
    approfondir: true,
    ressources: true,
  })

  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }))

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1 text-foreground">Site personnel aux sources vérifiées</p>
              <p className="text-muted-foreground">
                Chaque chiffre affiché est sourcé et chaque calcul est détaillé dans son infobulle, à partir des
                sources officielles citées sur chaque page. En cas de doute, référez-vous à ces sources. Une
                coquille malgré tout ? Écrivez à{" "}
                <a href={mailto()} className="underline font-medium link-slide">
                  {SITE_EMAIL}
                </a>
                , les signalements sont bienvenus.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-2 lg:grid-cols-5 lg:gap-y-8">
          {/* Brand */}
          <div className="pb-6 lg:pb-0">
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
            <p className="text-xs text-muted-foreground mt-2">Illustrations et mises en pages créées avec l'assistance d'outils d'IA générative</p>
          </div>

          {SECTIONS.map((section) => {
            const isOpen = open[section.id]
            return (
              <nav
                key={section.id}
                aria-label={`Pied de page — ${section.title}`}
                className="border-b border-border lg:border-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(section.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && open[section.id]) toggle(section.id)
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`footer-nav-${section.id}`}
                  className="flex w-full items-center justify-between gap-2 py-3 text-left font-semibold text-foreground lg:mb-4 lg:cursor-default lg:py-0"
                >
                  {section.title}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 lg:hidden ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <ul
                  id={`footer-nav-${section.id}`}
                  className={`${isOpen ? "block" : "hidden"} space-y-3 pb-5 text-sm lg:block lg:pb-0`}
                >
                  {section.links.map((link) =>
                    link.href.startsWith("mailto:") ? (
                      <li key={link.href}>
                        <a href={link.href} className="text-muted-foreground hover:text-primary link-slide">
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.href}>
                        <Link href={link.href} className="text-muted-foreground hover:text-primary link-slide">
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            )
          })}
        </div>

        <div className="mt-8 border-t border-border pt-8 lg:mt-12">
          <p className="mb-6 text-sm text-muted-foreground">
            Sources de référence :{" "}
            {SOURCES.map((source, index) => (
              <span key={source.href}>
                {index > 0 && <span aria-hidden="true"> · </span>}
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary link-slide"
                >
                  {source.label}
                </a>
              </span>
            ))}
          </p>
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-sm text-muted-foreground">
              © <span title="Site en ligne depuis 2023">{new Date().getFullYear()}</span> Le Green IT en clair. Créé par Geoffroy Streit. Projet personnel non commercial. Textes et visuels réutilisables avec citation de la source, pour un usage non commercial.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary link-slide">
                Mentions légales
              </Link>
              <MotionToggle />
              <a
                href={mailto()}
                className="text-muted-foreground hover:text-primary"
                title="Contact"
                aria-label="Contact"
              >
                <Mail className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={scrollTop}
                className="text-muted-foreground hover:text-primary"
                title="Retour en haut de page"
                aria-label="Retour en haut de page"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

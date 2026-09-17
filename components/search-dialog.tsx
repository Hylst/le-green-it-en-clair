"use client"

import * as React from "react"
import { BookOpen, Calculator, Calendar, Code2, Download, Eye, FileText, HelpCircle, Home, Info, Laptop, Leaf, Map, Newspaper, Recycle, Rocket, Scale, Settings, Sparkles, User, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

interface SearchDialogProps {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange((prev) => !prev)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [onOpenChange])

    const runCommand = React.useCallback((command: () => unknown) => {
        onOpenChange(false)
        command()
    }, [onOpenChange])

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Rechercher une page ou une fonctionnalité..." />
            <CommandList>
                <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={() => runCommand(() => router.push("/comprendre"))}>
                        <Leaf className="mr-2 h-4 w-4" />
                        <span>Comprendre le Green IT</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/agir"))}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Comment agir</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/outils"))}>
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>Outils & Calculatrices</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Pages">
                    <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Accueil</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/chiffres"))}>
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>Chiffres clés</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/problematiques"))}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Problématiques</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/datacenters"))}>
                        <Laptop className="mr-2 h-4 w-4" />
                        <span>Datacenters</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Fiches pratiques</span>
                    </CommandItem>
                    <CommandItem value="Dossiers & veille RSS actualites news" onSelect={() => runCommand(() => router.push("/actualites"))}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Dossiers & veille RSS</span>
                    </CommandItem>
                    <CommandItem value="Blog articles retours experience" onSelect={() => runCommand(() => router.push("/blog"))}>
                        <Newspaper className="mr-2 h-4 w-4" />
                        <span>Blog</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/chiffres"))}>
                        <Zap className="mr-2 h-4 w-4" />
                        <span>Chiffres clés — mix électrique en direct</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/par-ou-commencer"))}>
                        <Rocket className="mr-2 h-4 w-4" />
                        <span>Par où commencer</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/mythes"))}>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Mythes vs Réalités</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/cas-pratiques"))}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>Cas pratiques</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/recyclage"))}>
                        <Recycle className="mr-2 h-4 w-4" />
                        <span>Recyclage</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/developpement"))}>
                        <Code2 className="mr-2 h-4 w-4" />
                        <span>Développement</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/reglementation"))}>
                        <Scale className="mr-2 h-4 w-4" />
                        <span>Réglementation</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/perspectives"))}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Perspectives</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/guide"))}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Guide</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/ressources"))}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Ressources</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles"))}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Modèles téléchargeables</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/faq"))}>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>FAQ</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/sitemap-page"))}>
                        <Map className="mr-2 h-4 w-4" />
                        <span>Plan du site</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/offline"))}>
                        <Info className="mr-2 h-4 w-4" />
                        <span>Page hors ligne</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/mentions-legales"))}>
                        <Scale className="mr-2 h-4 w-4" />
                        <span>Mentions légales</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Fiches pratiques">
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/gestes-quotidiens"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Gestes quotidiens</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/achat-responsable"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Achat responsable</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/ecoconception-web"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Écoconception web</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/reparer-prolonger"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Réparer et prolonger</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/green-it-entreprise"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Green IT en entreprise</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/recyclage-mode-emploi"))}>
                        <Recycle className="mr-2 h-4 w-4" />
                        <span>Mode d'emploi du recyclage</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/datacenters-verts"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Datacenters verts</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/collectivites-action"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Collectivités en action</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/ia-generative"))}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>IA générative : limiter son impact</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/streaming-video"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Streaming et gaming</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/teletravail-visio"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Télétravail et visio</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/emails-cloud"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>E-mails et cloud</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/objets-connectes"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Objets connectés</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/impression-papier"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Imprimer moins, imprimer mieux</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/enfants-ecole"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Enfants et écrans</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/fiches-pratiques/box-wifi"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Box, Wi-Fi et connexion</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Blog">
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/premier-audit-green-it-pme"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Premier audit Green IT en PME</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/reconditionne-vs-neuf-le-calcul"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Reconditionné ou neuf : le calcul</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/comprendre-le-pue-en-5-minutes"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Comprendre le PUE en 5 minutes</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/agec-reen-ce-qui-change"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>AGEC, REEN : ce qui change</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/un-an-avec-un-smartphone-reparable"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Un an avec un smartphone réparable</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/back-market-portrait-reconditionne"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Back Market : portrait reconditionné</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/que-consomme-vraiment-votre-box"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Que consomme vraiment votre box ?</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/fairphone-portrait-telephone-equitable"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Fairphone : portrait équitable</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/envie-portrait-reemploi-solidaire"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Envie : portrait solidaire</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/rgesn-ecoconception-10-minutes"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>RGESN en 10 minutes</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/bonus-reparation-mode-emploi"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Bonus réparation : mode d'emploi</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog/ia-generative-avis-ademe-2026"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>IA générative : l'avis ADEME 2026</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Modèles détaillés">
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles/grille-audit"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Grille d'audit</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles/tableau-bord-impact"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Tableau de bord impact</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles/charte-green-it"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Charte Green IT</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles/cahier-charges-achat"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Cahier des charges achat</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles/politique-numerique"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Politique numérique</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles/guide-sensibilisation"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Guide de sensibilisation</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/modeles/plan-action-dsi"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Plan d'action DSI</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Paramètres">
                    <CommandItem onSelect={() => runCommand(() => router.push("/a-propos"))}>
                        <Info className="mr-2 h-4 w-4" />
                        <span>À propos</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

"use client"

import * as React from "react"
import { BookOpen, Calculator, Calendar, Code2, Download, Eye, FileText, HelpCircle, Home, Info, Laptop, Leaf, Map, Recycle, Rocket, Scale, Settings, Sparkles, User } from "lucide-react"
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
    onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange((open) => !open)
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
                    <CommandItem onSelect={() => runCommand(() => router.push("/actualites"))}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Actualités</span>
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

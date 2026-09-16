import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Home, Compass } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
}

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center dark:bg-slate-950">
            <Image
                src="/greenit/images/offline-illustration.webp"
                alt="Prise débranchée reposant à côté d'une feuille endormie"
                width={256}
                height={256}
                className="mb-6 h-40 w-40 rounded-2xl border border-border object-cover shadow-md"
                quality={85}
            />
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <Compass className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mb-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">Erreur 404</p>
            <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">Page introuvable</h1>
            <p className="mb-8 max-w-md text-slate-600 dark:text-slate-400">
                Cette page n'existe pas ou a été déplacée. Retournez à l'accueil ou utilisez la recherche pour retrouver votre chemin.
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                </Link>
            </Button>
        </div>
    )
}

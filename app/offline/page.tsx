import { WifiOff, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { canonical } from "@/lib/site"

export const metadata: Metadata = {
  title: "Hors-ligne",
  alternates: { canonical: canonical("/offline") },
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center dark:bg-slate-950">
            <Image
                src="/greenit/images/offline-illustration.webp"
                alt="Prise débranchée reposant à côté d'une feuille endormie"
                width={256}
                height={256}
                className="mb-6 h-40 w-40 rounded-2xl border border-border object-cover shadow-md"
                quality={70}
            />
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <WifiOff className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">Vous êtes hors ligne</h1>
            <p className="mb-8 max-w-md text-slate-600 dark:text-slate-400">
                Pas d'inquiétude ! Les pages que vous avez déjà consultées et les outils restent accessibles sans
                connexion.
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

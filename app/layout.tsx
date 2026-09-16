import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://hylst.fr/greenit"),
  title: {
    default: "Le Green IT en clair - Écologie Numérique et Numérique Responsable",
    template: "%s | Le Green IT en clair",
  },
  description:
    "Découvrez l'impact environnemental du numérique et adoptez des pratiques responsables. Informations, outils interactifs et ressources pour un Green IT en France.",
  keywords: [
    "Green IT",
    "numérique responsable",
    "écologie numérique",
    "empreinte carbone numérique",
    "sobriété numérique",
    "développement durable",
    "déchets électroniques",
    "recyclage IT",
    "écoconception",
    "datacenters verts",
  ],
  authors: [{ name: "Geoffroy Streit", url: "https://hylst.fr" }],
  creator: "Geoffroy Streit",
  publisher: "Le Green IT en clair",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://hylst.fr/greenit",
    siteName: "Le Green IT en clair",
    title: "Le Green IT en clair - Écologie Numérique et Numérique Responsable",
    description:
      "Découvrez l'impact environnemental du numérique et adoptez des pratiques responsables. Informations, outils interactifs et ressources pour un Green IT en France.",
    images: [
      {
        url: "https://hylst.fr/greenit/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Le Green IT en clair - Écologie Numérique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://hylst.fr/greenit/og-cover.jpg"],
  },
  robots: {
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hylst.fr/greenit",
  },
  generator: 'Next.js',
  icons: {
    icon: [
      { url: "/greenit/icon-light-32x32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/greenit/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/greenit/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Anti-flash script - sets theme before page renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('greenIT-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'dark' || !theme) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else if (theme === 'system') {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
                    document.documentElement.classList.remove(prefersDark ? 'light' : 'dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
                try {
                  if (localStorage.getItem('greenit-motion') === 'reduced') {
                    document.documentElement.classList.add('motion-off');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="manifest" href="/greenit/manifest.json" />
        <meta name="theme-color" content="#059669" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#10b981" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Green IT" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <ThemeProvider>
          <Navigation />
          <Breadcrumb />
          <main id="contenu">{children}</main>
          <Footer />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/greenit/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

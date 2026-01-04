import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://greenitenclair.fr"),
  title: "Le Green IT en clair - Écologie Numérique et Numérique Responsable",
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
    url: "https://greenitenclair.fr",
    siteName: "Le Green IT en clair",
    title: "Le Green IT en clair - Écologie Numérique et Numérique Responsable",
    description:
      "Découvrez l'impact environnemental du numérique et adoptez des pratiques responsables. Informations, outils interactifs et ressources pour un Green IT en France.",
    images: [
      {
        url: "/abstract-green-technology-network-with-leaves-and-.webp",
        width: 1200,
        height: 630,
        alt: "Le Green IT en clair - Écologie Numérique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Green IT en clair - Écologie Numérique et Numérique Responsable",
    description:
      "Découvrez l'impact environnemental du numérique et adoptez des pratiques responsables. Informations, outils interactifs et ressources pour un Green IT en France.",
    images: ["/abstract-green-technology-network-with-leaves-and-.jpg"],
    creator: "@greenitenclair",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://greenitenclair.fr",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Green IT" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Navigation />
        <Breadcrumb />
        <main>{children}</main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }).catch(function(error) {
                    console.log('SW registration failed: ', error);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

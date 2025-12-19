import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/cart-context"
import { AdminProvider } from "@/context/admin-context"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Rosea - Maison de Haute Couture de Luxe",
  description:
    "Découvrez l'élégance intemporelle et la haute couture réalisées avec un art exceptionnel et des matériaux haut de gamme. Rosea depuis 1985.",
  keywords: ["haute couture", "luxe", "mode", "Paris", "vêtements de designer", "couture sur mesure", "fashion"],
  robots: "index, follow",
  openGraph: {
    title: "Rosea - Haute Couture",
    description: "Découvrez nos collections exclusives de haute couture",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://rosea.tn",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <AdminProvider>
          <CartProvider>{children}</CartProvider>
        </AdminProvider>
        <Analytics />
      </body>
    </html>
  )
}

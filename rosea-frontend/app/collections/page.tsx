import Header from "@/components/header"
import Footer from "@/components/footer"
import CollectionsPageContent from "@/components/collections-page-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Collections | Maison Elegance - Haute Couture de Luxe",
  description:
    "Explorez nos collections complètes de haute couture: Robes, Accessoires, Vêtements sur Mesure et Éditions Limitées exclusives avec filtres de prix et recherche avancée.",
  keywords: [
    "collections",
    "haute couture",
    "robes",
    "accessoires",
    "vêtements de designer",
    "mode de luxe",
    "fashion",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Collections | Maison Elegance",
    description: "Découvrez nos collections exclusives de haute couture",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://maisonelegance.com/collections",
  },
}

export default function CollectionsPage() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <CollectionsPageContent />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Collections Maison Elegance",
            description: "Nos collections complètes de haute couture avec 18+ produits premium",
            url: "https://rosea.tn/collections",
            itemListElement: [
              { "@type": "Thing", name: "Robes" },
              { "@type": "Thing", name: "Accessoires" },
              { "@type": "Thing", name: "Couture sur Mesure" },
              { "@type": "Thing", name: "Édition Limitée" },
            ],
          }),
        }}
      />
    </main>
  )
}

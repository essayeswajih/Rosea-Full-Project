import Header from "@/components/header"
import Footer from "@/components/footer"
import AProposContent from "@/components/a-propos-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "À Propos | Maison Elegance - Notre Histoire de Luxe",
  description:
    "Découvrez l'histoire de Maison Elegance, notre héritage de haute couture depuis 1985 et notre engagement envers l'excellence et la qualité.",
  keywords: ["à propos", "histoire", "maison elegance", "haute couture", "luxe", "héritage"],
  openGraph: {
    title: "À Propos | Maison Elegance",
    description: "Découvrez notre héritage et notre vision de la haute couture",
    type: "website",
  },
}

export default function AProposPage() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <AProposContent />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Maison Elegance",
            description: "Maison de haute couture de luxe depuis 1985",
            foundingDate: "1985",
            url: "https://maisonelegance.com",
            sameAs: ["https://instagram.com/maisonelegance", "https://facebook.com/maisonelegance"],
            areaServed: "FR",
            founder: "Artisans Éminents de Paris",
          }),
        }}
      />
    </main>
  )
}

import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactPageContent from "@/components/contact-page-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Maison Elegance - Nous Contacter",
  description:
    "Contactez Maison Elegance pour toute demande d'information, consultation ou commande. Nos équipes sont à votre service.",
  keywords: ["contact", "nous contacter", "information", "maison elegance", "support client"],
  openGraph: {
    title: "Contact | Maison Elegance",
    description: "Prenez contact avec nos équipes de Maison Elegance",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <ContactPageContent />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Maison Elegance - Contact",
            url: "https://rosea.tn/contact",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              telephone: "+21627553981",
              email: "contact@rosea.tn",
              areaServed: "FR",
              availableLanguage: "fr",
            },
          }),
        }}
      />
    </main>
  )
}

"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Sliders from "@/components/sliders"
import Showcase from "@/components/showcase"
import About from "@/components/about"
import Collections from "@/components/collections"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Showcase />
      <About />
      <Collections />
      <Contact />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Rosea",
            url: "https://maisonrosea.com",
            logo: "https://maisonrosea.com/logo.png",
            description: "Maison de haute couture de luxe proposant des collections exclusives",
            sameAs: ["https://instagram.com/maisonrosea", "https://facebook.com/maisonrosea"],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              telephone: "+33123456789",
              email: "hello@maisonrosea.com",
            },
          }),
        }}
      />
    </main>
  )
}

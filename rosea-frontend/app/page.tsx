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
            name: "Roséa",
            url: "https://rosea.tn",
            logo: "https://rosea.tn/icon-light-32x32.png",
            description: "Maison de haute couture de luxe proposant des collections exclusives",
            sameAs: ["https://instagram.com/rosea_tunisie", "https://www.facebook.com/profile.php?id=61585270365895"],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              telephone: "+21627553981",
              email: "contact@rosea.tn",
            },
          }),
        }}
      />
    </main>
  )
}

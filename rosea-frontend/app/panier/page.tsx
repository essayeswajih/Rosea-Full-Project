import Header from "@/components/header"
import Footer from "@/components/footer"
import PanierContent from "@/components/panier-content"
import DarkHero from "@/components/dark-hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panier | Maison Elegance",
  description: "Consultez et gérez votre panier de haute couture de luxe",
}

export default function PanierPage() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <DarkHero title="Mon Panier" subtitle="Maison Elegance" />
      <PanierContent />
      <Footer />
    </main>
  )
}

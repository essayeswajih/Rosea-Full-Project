"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white/80 py-12 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-serif tracking-widest mb-2">Maison Elegance</h3>
            <p className="text-sm text-white/60">Maison de luxe depuis 1985</p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 text-xs tracking-widest"
          >
            <a href="#" className="hover:text-accent transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Conditions d'Utilisation
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xs text-white/60 tracking-wide text-center md:text-right"
          >
            &copy; {currentYear} Maison Elegance. Tous droits réservés.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-white/10 mb-8 origin-left"
        ></motion.div>

        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Maison Elegance",
              description: "Maison de haute couture de luxe",
              url: "https://maisonelegance.com",
              telephone: "+33123456789",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Rue de l'Élégance",
                addressLocality: "Paris",
                postalCode: "75001",
                addressCountry: "FR",
              },
              foundingYear: 1985,
            }),
          }}
        />
      </div>
    </footer>
  )
}

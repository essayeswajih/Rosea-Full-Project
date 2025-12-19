"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Showcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="pt-20  md:pt-32 pb-10 md:pb-15 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Image on left, text on right */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-muted overflow-hidden group"
          >
            <img
              src="/luxury-fashion-model-craftsmanship-elegance.jpg"
              alt="Artisan craftsmanship in luxury fashion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.p variants={itemVariants} className="text-accent text-sm tracking-[3px] font-light uppercase">
                Savoir-Faire
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground"
              >
                L'Art de la Perfection
              </motion.h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Chaque création de Rosea est le fruit d'une passion inébranlable pour le détail. Nos maîtres
              artisans dédient leur expertise à transformer les plus beaux tissus en pièces intemporelles qui racontent
              une histoire d'élégance, de sophistication et de luxe véritable.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 pt-4"
            >
              {[
                { title: "Couture Haut de Gamme", desc: "Chaque point exécuté avec précision millimétrique" },
                { title: "Matériaux Exclusifs", desc: "Sélectionnés auprès des meilleurs fournisseurs mondiaux" },
                {
                  title: "Finitions d'Exception",
                  desc: "Détails raffinés qui distinguent les véritables pièces de maître",
                },
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent">
                      <span className="text-accent-foreground text-sm font-serif">✦</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link href="/collections">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-accent text-accent-foreground text-sm tracking-widest font-medium hover:bg-accent/90 transition-all"
                >
                  VOIR ARTICLE
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

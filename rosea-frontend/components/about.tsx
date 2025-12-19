"use client"

import { motion } from "framer-motion"

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-10 md:py-22 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p variants={itemVariants} className="text-accent text-sm tracking-[3px] font-light uppercase">
                Notre Héritage
              </motion.p>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-normal tracking-tight">
                Fondée sur l'Excellence
              </motion.h2>
            </div>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Depuis notre création, Maison Elegance s'est consacrée à l'art de la haute couture. Chaque pièce est
              méticuleusement réalisée par des maîtres artisans qui apportent des décennies d'expertise à chaque point,
              chaque couture et chaque détail. Nous croyons que le vrai luxe n'est pas une question de tendances, mais
              de beauté intemporelle, de qualité exceptionnelle et des histoires que nous partageons avec ceux qui
              portent nos créations.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                "Matériaux haut de gamme provenant éthiquement du monde entier",
                "Artisans experts avec plus de 20 ans d'expérience",
                "Pratiques de production durables et approvisionnement éthique",
              ].map((text, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex gap-3">
                  <span className="text-accent mt-1 flex-shrink-0">✦</span>
                  <span className="text-foreground">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-muted overflow-hidden"
          >
            <img
              src="/luxury-fashion-silhouette-elegant.jpg"
              alt="Silhouette de mode élégante"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

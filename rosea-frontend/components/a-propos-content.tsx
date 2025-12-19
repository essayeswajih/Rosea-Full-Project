"use client"

import { motion } from "framer-motion"
import DarkHero from "./dark-hero"

export default function AProposContent() {
  const milestones = [
    { year: "1985", title: "Fondation", description: "Maison Elegance est créée par des maîtres artisans à Paris" },
    { year: "1995", title: "Reconnaissance", description: "Reconnaissance internationale en haute couture" },
    { year: "2005", title: "Expansion", description: "Ouverture de boutiques dans les capitales mondiales" },
    { year: "2024", title: "Héritage", description: "Continuation de notre engagement envers l'excellence" },
  ]

  const values = [
    {
      title: "Artisanat Exceptionnels",
      description: "Chaque pièce est créée par nos maîtres artisans avec plus de 20 ans d'expérience",
    },
    {
      title: "Qualité Inégalée",
      description: "Nous utilisons uniquement les meilleurs matériaux provenant éthiquement du monde entier",
    },
    {
      title: "Durabilité",
      description: "Pratiques de production durables et responsabilité environnementale",
    },
    {
      title: "Élégance Intemporelle",
      description: "Nos designs transcendent les tendances pour créer une beauté éternelle",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <>
      {/* Hero Section */}
      <DarkHero
        title="Notre Héritage"
        subtitle="Maison Elegance"
        description="Depuis 1985, Maison Elegance s'engage à créer les plus belles pièces de haute couture avec un artisanat exceptionnel et une qualité inégalée."
      />

      {/* Our Story */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-normal">Notre Histoire</h2>
            <p className="text-lg leading-relaxed text-background/90">
              Maison Elegance est née de la passion de maîtres artisans parisiens qui rêvaient de créer la plus belle
              haute couture du monde. Chaque création est le résultat de décennies d'expertise, d'innovation constante
              et d'un amour inébranlable pour l'artisanat.
            </p>
            <p className="text-lg leading-relaxed text-background/90">
              Nos créations ne sont pas simplement des vêtements, ce sont des œuvres d'art portables. Elles racontent
              des histoires, capturent des moments et incarnent l'élégance intemporelle. Chaque détail, chaque couture,
              chaque tissu est choisi avec soin pour assurer la perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight mb-4">Notre Évolution</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-accent mx-auto"
            ></motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {milestones.map((milestone, idx) => (
              <motion.div key={idx} variants={itemVariants} className="p-8 border border-border rounded-lg">
                <p className="text-accent text-sm tracking-[2px] uppercase mb-2">{milestone.year}</p>
                <h3 className="text-2xl font-serif font-normal mb-3">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight mb-4">Nos Valeurs</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-accent mx-auto"
            ></motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {values.map((value, idx) => (
              <motion.div key={idx} variants={itemVariants} className="space-y-4">
                <h3 className="text-2xl font-serif font-normal">{value.title}</h3>
                <p className="text-background/80 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

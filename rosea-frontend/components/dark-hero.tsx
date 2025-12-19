"use client"

import { motion } from "framer-motion"

interface DarkHeroProps {
  title: string
  subtitle: string
  description?: string
}

export default function DarkHero({ title, subtitle, description }: DarkHeroProps) {
  return (
    <section className="relative w-full pt-32 pb-20 px-4 md:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-accent text-sm md:text-base tracking-[3px] font-light uppercase mb-4">{subtitle}</p>
          <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight mb-6">{title}</h1>
          {description && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

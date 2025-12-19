"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/luxury-fashion-model-black-and-white.webp"
          alt="Modèle de mode luxe"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 text-center px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-accent text-sm tracking-[3px] font-light uppercase"
          >
            Bienvenue à L'Élégance
          </motion.p>
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white text-balance"
          >
            Élégance Intemporelle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-2xl mx-auto"
          >
            Découvrez Notre Monde de Couture
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#collections"
            className="px-10 py-4 bg-accent text-accent-foreground hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest font-medium inline-block"
          >
            EXPLORER COLLECTIONS
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#about"
            className="px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest font-medium inline-block"
          >
            EN SAVOIR PLUS
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/60 text-xs tracking-widest">SCROLL</p>
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}

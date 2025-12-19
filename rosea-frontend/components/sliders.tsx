"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

export default function Sliders() {
  const { addToCart } = useCart()

  const sliders = [
    {
      id: "slider-1",
      title: "Nouvelle Collection Printemps",
      subtitle: "Découvrez l'Élégance Éternelle",
      image: "/luxury-fashion-model-black-and-white.webp",
      cta: "EXPLORER",
      ctaLink: "/collections",
      addToCart: false,
    },
    {
      id: "slider-2",
      title: "Édition Limitée Exclusive",
      subtitle: "Pièces d'Exceptions Réservées",
      image: "/luxury-silk-gown-black-elegant.jpg",
      cta: "VOIR PLUS",
      ctaLink: "/collections",
      addToCart: false,
    },
    {
      id: "slider-3",
      title: "Accessoires de Prestige",
      subtitle: "Complétez Votre Élégance",
      image: "/luxury-leather-clutch-gold.jpg",
      cta: "DÉCOUVRIR",
      ctaLink: "/collections",
      addToCart: false,
    },
  ]

  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [autoPlay, sliders.length])

  const next = () => {
    setCurrent((prev) => (prev + 1) % sliders.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + sliders.length) % sliders.length)
    setAutoPlay(false)
  }

  const handleCtaClick = (slide: (typeof sliders)[0]) => {
    if (slide.addToCart) {
      addToCart({
        id: slide.id,
        title: slide.title,
        price: 999,
        image: slide.image,
        category: "Collections",
      })
    }
  }

  return (
    <section className="relative w-full h-96 md:h-[500px] bg-black overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        {sliders.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: current === idx ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/35"></div>

            {/* Slide Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: current === idx ? 1 : 0, y: current === idx ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <motion.p className="text-accent text-sm md:text-base tracking-[3px] font-light uppercase mb-4">
                {slide.subtitle}
              </motion.p>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 text-balance">{slide.title}</h2>
              <Link href={slide.ctaLink}>
                <motion.button
                  onClick={() => handleCtaClick(slide)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-accent text-accent-foreground text-sm tracking-widest font-medium hover:bg-white hover:text-black transition-all"
                >
                  {slide.cta}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/40 text-white transition-all"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/40 text-white transition-all"
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {sliders.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setAutoPlay(false)
            }}
            animate={{
              backgroundColor: current === idx ? "rgb(212, 175, 55)" : "rgba(255, 255, 255, 0.4)",
              width: current === idx ? 32 : 8,
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full transition-all"
          />
        ))}
      </div>
    </section>
  )
}

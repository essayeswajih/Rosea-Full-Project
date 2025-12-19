"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/98 backdrop-blur-md border-b border-border/30" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
        <div className="flex-1">
          <Link href="/">
            <h1
              className={`text-xl md:text-2xl font-serif font-normal tracking-[2px] transition-colors duration-300 cursor-pointer ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Rosea
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex gap-10 flex-1 justify-center text-xs tracking-widest font-light transition-colors duration-300 ${
            isScrolled ? "text-foreground" : "text-white"
          }`}
        >
          <Link href="/" className="hover:text-accent transition-colors duration-300">
            ACCUEIL
          </Link>
          <Link href="/a-propos" className="hover:text-accent transition-colors duration-300">
            À.PROPOS
          </Link>
          <Link href="/collections" className="hover:text-accent transition-colors duration-300">
            COLLECTIONS
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors duration-300">
            CONTACT
          </Link>
        </div>

        {/* Cart Icon */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:text-accent`}
          >
            <Link href="/panier" className="flex items-center">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  layoutId="cart-badge"
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:text-accent`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/30"
        >
          <div className="px-4 py-6 space-y-4 text-xs tracking-widest font-light">
            <Link href="/" className="block hover:text-accent transition-colors">
              ACCUEIL
            </Link>
            <Link href="/a-propos" className="block hover:text-accent transition-colors">
              À-PROPOS
            </Link>
            <Link href="/collections" className="block hover:text-accent transition-colors">
              COLLECTIONS
            </Link>
            <Link href="/contact" className="block hover:text-accent transition-colors">
              CONTACT
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}

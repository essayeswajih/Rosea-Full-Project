"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { apiService, Product } from "@/services/apiService"
import ProductCard from "./productCard"

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiService
      .getProducts()
      .then((res) => setProducts(res))
      .finally(() => setLoading(false))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="collections" className="py-10 md:py-22 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight mb-4">Nos Collections</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-accent"
          />
        </motion.div>

        {loading ? (
          <p className="text-center text-lg text-muted-foreground">Chargement des produits...</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} itemVariants={itemVariants} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

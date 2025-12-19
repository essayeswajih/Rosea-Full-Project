"use client"

import { motion } from "framer-motion"
import { Product } from "@/services/apiService"
import ProductCard from "./productCard"

interface ProductsGridProps {
  products: Product[]
  currentPage: number
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage?: number
}

export default function ProductsGrid({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage = 9
}: ProductsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <section className="py-10 md:py-22 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} itemVariants={itemVariants} />
          ))}
        </motion.div>

        {/* Empty State */}
        {paginatedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Aucun produit ne correspond à votre recherche</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4 mt-16 pt-12 border-t border-border">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 border border-border text-foreground hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Précédent
            </motion.button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center border transition-all ${
                    currentPage === page ? "bg-accent text-accent-foreground border-accent" : "border-border text-foreground hover:border-accent"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 border border-border text-foreground hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Suivant
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

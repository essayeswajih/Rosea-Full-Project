"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { Product } from "@/services/apiService"

interface ProductCardProps {
  product: Product
  itemVariants: any
}

export default function ProductCard({ product, itemVariants }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false) // simulate hover on mobile

  return (
    <motion.div
      key={product.id}
      variants={itemVariants}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 3000)} // hide after 3s
    >
      <motion.div
        className="relative aspect-[3/4] bg-muted overflow-hidden mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }} // same hover scale
        />

        {product.discounted_price && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-sm font-bold tracking-wide">
            -{Math.round(((product.price - product.discounted_price) / product.price) * 100)}%
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              addToCart({
                id: product.id.toString(),
                title: product.name,
                price: product.discounted_price ?? product.price,
                image: product.image_url,
                category: String(product.category_id),
              })
            }
            className="px-8 py-3 bg-accent text-accent-foreground text-sm tracking-widest font-medium hover:bg-accent/90 transition-all"
          >
            AJOUTER AU PANIER
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Product info */}
      
<motion.a
  href={`/product/slug/${product.slug}`}
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3 }}
  className="block" // ensure it behaves like a block for flex inside
>


  <div className="flex items-center justify-between mb-2">
    <h3 className="text-lg font-serif tracking-wide">{product.name}</h3>
    {/* Rating */}
    <div className="flex items-center gap-0.5 px-2">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xs ${i < Math.floor(product.rating || 0) ? "text-accent" : "text-muted-foreground"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-muted-foreground ml-1">({product.num_ratings || 0})</span>
    </div>


  </div>
      {/* Price */}
    <div className="flex items-center gap-2">
      <p className="text-accent font-medium tracking-wide">
        {(product.discounted_price ?? product.price).toLocaleString()} DT
      </p>
      {product.discounted_price && (
        <p className="text-muted-foreground line-through text-sm">{product.price.toLocaleString()} DT</p>
      )}
    </div>
</motion.a>

    </motion.div>
  )
}

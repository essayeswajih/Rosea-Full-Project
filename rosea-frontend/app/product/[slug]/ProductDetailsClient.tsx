"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import DarkHero from "@/components/dark-hero"
import Footer from "@/components/footer"
import { Product } from "@/services/apiService"

export default function ProductDetailsClient({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "M")
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || "black")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentImages = product.colorImages?.[selectedColor] || [
    product.image_url,
    product.image2_url,
    product.image3_url,
    product.image4_url,
  ].filter(Boolean) as string[]
  const mainImage = currentImages[currentImageIndex]

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName)
    setCurrentImageIndex(0)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id.toString(),
        title: product.name,
        price: product.discounted_price ?? product.price,
        image: mainImage,
        category: product.category_id.toString(),
        color: selectedColor,
        size: selectedSize,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <DarkHero title={product.name} subtitle={product.buzzent??""} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="grid md:grid-cols-2 gap-12">
          
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
            <div className="aspect-[3/4] bg-muted overflow-hidden rounded-lg">
              <motion.img key={mainImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                src={mainImage || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {currentImages.map((image, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setCurrentImageIndex(i)}
                  className={`aspect-square bg-muted overflow-hidden rounded-lg cursor-pointer border-2 transition-all ${currentImageIndex === i ? "border-accent" : "border-transparent"}`}
                >
                  <img src={image || "/placeholder.svg"} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-8">
            
            <div>
              <p className="text-sm text-muted-foreground tracking-widest mb-3">{product?.buzzent}</p>
              <h1 className="text-4xl font-serif tracking-tight mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating || 0) ? "fill-accent text-accent" : "text-muted-foreground"} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.num_ratings || 0} avis</span>
              </div>

              <p className="text-3xl font-serif text-accent tracking-tight">{product.price.toLocaleString()} DT</p>
            </div>

            <p className="text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors && (
              <div>
                <label className="text-sm font-medium tracking-widest mb-4 block">COULEUR</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <motion.button key={color.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleColorChange(color.name)} className="flex flex-col items-center gap-2 transition-all"
                    >
                      <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color.name ? "border-accent" : "border-border"}`}
                        style={{ backgroundColor: color.hex }} />
                      <span className="text-xs text-muted-foreground">{color.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div>
                <label className="text-sm font-medium tracking-widest mb-4 block">TAILLE</label>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <motion.button key={size} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border text-sm font-medium tracking-widest transition-all ${selectedSize === size ? "bg-accent text-accent-foreground border-accent" : "border-border hover:border-accent"}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium tracking-widest mb-4 block">QUANTITÉ</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-border hover:border-accent flex items-center justify-center">−</button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))} className="w-10 h-10 border border-border hover:border-accent flex items-center justify-center">+</button>
              </div>
            </div>

            {/* Stock */}
            {product.stock_quantity > 0 ? (
              <p className="text-sm text-green-400">En stock ({product.stock_quantity} disponible)</p>
            ) : (
              <p className="text-sm text-red-400">Rupture de stock</p>
            )}

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-4 pt-6">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="flex-1 py-4 bg-accent text-accent-foreground font-medium tracking-widest flex items-center justify-center gap-2 hover:bg-accent/90 disabled:opacity-50 transition-all"
              >
                <ShoppingCart size={20} />
                AJOUTER AU PANIER
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsWishlisted(!isWishlisted)}
                className="px-6 py-4 border border-border hover:border-accent text-foreground hover:text-accent transition-all"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-6 py-4 border border-border hover:border-accent text-foreground hover:text-accent transition-all"
              >
                <Share2 size={20} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

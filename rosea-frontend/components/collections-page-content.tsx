"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { apiService, Product, Category } from "@/services/apiService"
import ProductsGrid from "./productsGrid"

export default function CollectionsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("featured")
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const { addToCart } = useCart()
  const ITEMS_PER_PAGE = 9

  // Fetch products and categories on mount
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const cats = await apiService.getCategories()
      const trimmedCats = cats.map((cat: Category) => ({ ...cat, name: cat.name.trim() }))
      setCategories(trimmedCats)
    } catch (err: any) {
      console.error("Failed to fetch categories:", err.message)
    }
  }

  const fetchProducts = async () => {
    try {
      const prods = await apiService.getProducts()
      setProducts(prods)
    } catch (err: any) {
      console.error("Failed to fetch products:", err.message)
    }
  }

  fetchCategories()
  fetchProducts()
}, [])
  // Filter products
  const filtered = products
    .filter((p) => selectedCategory === "all" ? true : String(p.category_id) === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

  if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price)
  if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price)

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleFilterChange = (callback: () => void) => {
    setCurrentPage(1)
    callback()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Prepare categories for buttons
  const categoryButtons = [
    { id: "all", label: "Toutes les Collections", icon: "✦" },
    ...categories.map((cat) => ({ id: String(cat.id), label: cat.name, icon: "👗" }))
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 bg-black">
        <div className="absolute inset-0 bg-black/40 opacity-60"></div>
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight mb-6 text-white">
              Nos Collections
            </h1>
            <motion.div initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-accent mx-auto mb-8" />
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Explorez notre sélection complète de haute couture, du prêt-à-porter de luxe aux créations sur mesure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 px-4 md:px-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Rechercher une pièce..."
              value={searchTerm}
              onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
              className="w-full pl-12 pr-4 py-3 border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Price Filter */}
            <div className="relative">
              <motion.button
                onClick={() => setShowPriceFilter(!showPriceFilter)}
                className="flex items-center gap-2 px-4 py-2 border border-border hover:border-accent transition-colors"
              >
                Prix: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DT
                <ChevronDown size={16} className={`transition-transform ${showPriceFilter ? "rotate-180" : ""}`} />
              </motion.button>
              {showPriceFilter && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 mt-2 bg-card border border-border p-4 rounded-lg z-10 w-64 shadow-lg">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => handleFilterChange(() => setPriceRange([priceRange[0], Number(e.target.value)]))}
                    className="w-full"
                  />
                  <div className="flex gap-4 mt-4 text-sm">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => handleFilterChange(() => setPriceRange([Number(e.target.value), priceRange[1]]))}
                      className="w-1/2 px-2 py-1 border border-border"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => handleFilterChange(() => setPriceRange([priceRange[0], Number(e.target.value)]))}
                      className="w-1/2 px-2 py-1 border border-border"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange(() => setSortBy(e.target.value))}
              className="px-4 py-2 border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="featured">À la Une</option>
              <option value="price-low">Prix: Bas à Haut</option>
              <option value="price-high">Prix: Haut à Bas</option>
            </select>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 md:px-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categoryButtons.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleFilterChange(() => setSelectedCategory(category.id))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 text-sm tracking-widest font-medium transition-all duration-300 border ${
                  selectedCategory === category.id
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductsGrid
        products={filtered}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />

    </>
  )
}
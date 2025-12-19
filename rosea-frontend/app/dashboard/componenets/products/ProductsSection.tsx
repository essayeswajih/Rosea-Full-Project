"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import ProductFormModal from "./ProductFormModal"
import { apiService } from "@/services/apiService"
import { Product, ColorVariant } from "@/types/types"
import ProductsTable from "./ProductsTable"

export default function ProductsSection({
  products,
  categories,
  onRefresh,
}: {
  products: Product[]
  categories: { id: number; name: string }[]
  onRefresh: () => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([])

  const openForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({ ...product })
      setColorVariants(product.colors || [])
    } else {
      setEditingProduct(null)
      setFormData({})
      setColorVariants([])
    }
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return
    try {
      await apiService.deleteProduct(id)
      onRefresh()
    } catch (err) {
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => openForm()}
        className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium tracking-widest hover:bg-accent/90 transition-all"
      >
        <Plus size={18} />
        Ajouter un Produit
      </motion.button>

      <ProductsTable
        products={products}
        categories={categories}
        onEdit={openForm}
        onDelete={handleDelete}
      />

      <ProductFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        product={editingProduct}
        categories={categories}
        formData={formData}
        setFormData={setFormData}
        colorVariants={colorVariants}
        setColorVariants={setColorVariants}
        onSuccess={() => {
          onRefresh()
          setShowForm(false)
        }}
      />
    </>
  )
}

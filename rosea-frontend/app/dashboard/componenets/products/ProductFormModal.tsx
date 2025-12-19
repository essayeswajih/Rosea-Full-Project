"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { apiService } from "@/services/apiService"
import { Product, ColorVariant } from "@/types/types"

type ProductFormModalProps = {
  open: boolean
  onClose: () => void
  product: Product | null
  categories: { id: number; name: string }[]
  formData: Partial<Product>
  setFormData: (data: Partial<Product>) => void
  colorVariants: ColorVariant[]
  setColorVariants: (variants: ColorVariant[]) => void
  onSuccess: () => void
}

export default function ProductFormModal({
  open,
  onClose,
  product,
  categories,
  formData,
  setFormData,
  colorVariants,
  setColorVariants,
  onSuccess,
}: ProductFormModalProps) {
  useEffect(() => {
    if (!open) {
      setFormData({})
      setColorVariants([])
    }
  }, [open, setFormData, setColorVariants])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: Product = {
      id: product?.id || 0,
      name: formData.name || "",
      description: formData.description,
      price: Number(formData.price) || 0,
      discounted_price: formData.discounted_price ? Number(formData.discounted_price) : undefined,
      stock_quantity: Number(formData.stock_quantity) || 0,
      category_id: Number(formData.category_id) || 0,
      sku: formData.sku,
      promo: formData.promo,
      buzzent: formData.buzzent,
      sizes: formData.sizes,
      colors: colorVariants.length > 0 ? colorVariants : undefined,
      materials: formData.materials,
      care: formData.care,
      features: formData.features,
      image_url: formData.image_url,
      image2_url: formData.image2_url,
      image3_url: formData.image3_url,
      image4_url: formData.image4_url,
      rating: formData.rating,
      num_ratings: formData.num_ratings,
      in_stock: formData.in_stock,
      colorImages: formData.colorImages,
      slug: formData.slug || "",
    }

    try {
      if (product?.id) {
        await apiService.updateProduct(product.id, payload)
      } else {
        await apiService.addProduct(payload)
      }
      onSuccess()
    } catch (error) {
      alert("Erreur lors de la sauvegarde")
      console.error(error)
    }
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border p-8 rounded-lg max-w-3xl w-full my-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif tracking-wide">
            {product ? "Modifier" : "Ajouter"} Produit
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-accent/20 rounded">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Basic Info */}
          <input
            placeholder="Titre"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
            required
          />
          <input
            placeholder="SKU"
            value={formData.sku || ""}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
          />
          <input
            placeholder="Description"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
          />
          <input
            type="number"
            placeholder="Prix"
            value={formData.price ?? ""}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
            required
          />
          <input
            type="number"
            placeholder="Prix promo"
            value={formData.discounted_price ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                discounted_price: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock_quantity ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, stock_quantity: Number(e.target.value) })
            }
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
          />
          <select
            value={formData.category_id ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, category_id: Number(e.target.value) })
            }
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Product Ratings */}
          <input
            type="number"
            placeholder="Rating"
            value={formData.rating ?? ""}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
          />
          <input
            type="number"
            placeholder="Number of Ratings"
            value={formData.num_ratings ?? ""}
            onChange={(e) => setFormData({ ...formData, num_ratings: Number(e.target.value) })}
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none rounded"
          />

          {/* Promo & Buzzent */}
         <label className="flex items-center gap-2">
        <input
            type="checkbox"
            checked={formData.promo || false}
            onChange={(e) => setFormData({ ...formData, promo: e.target.checked })}
        />
        Promo
        </label>
          <input
            type="text"
            placeholder="Buzzent Text"
            value={formData.buzzent || ""}
            onChange={(e) => setFormData({ ...formData, buzzent: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded"
          />

          {/* Sizes */}
          <input
            type="text"
            placeholder="Sizes (comma separated)"
            value={formData.sizes ? formData.sizes.join(", ") : ""}
            onChange={(e) =>
              setFormData({ ...formData, sizes: e.target.value.split(",").map(s => s.trim()) })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded"
          />

          {/* Materials, Care, Features */}
          <input
            type="text"
            placeholder="Materials (comma separated)"
            value={formData.materials ? formData.materials.join(", ") : ""}
            onChange={(e) =>
              setFormData({ ...formData, materials: e.target.value.split(",").map(s => s.trim()) })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded"
          />
          <input
            type="text"
            placeholder="Care Instructions (comma separated)"
            value={formData.care ? formData.care.join(", ") : ""}
            onChange={(e) =>
              setFormData({ ...formData, care: e.target.value.split(",").map(s => s.trim()) })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded"
          />
          <input
            type="text"
            placeholder="Features (comma separated)"
            value={formData.features ? formData.features.join(", ") : ""}
            onChange={(e) =>
              setFormData({ ...formData, features: e.target.value.split(",").map(s => s.trim()) })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded"
          />

          {/* Images */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium mb-4">Images du produit</h3>
            <input
              type="text"
              placeholder="Image principale URL"
              value={formData.image_url || ""}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded"
            />
            <input
              type="text"
              placeholder="Image 2 URL"
              value={formData.image2_url || ""}
              onChange={(e) => setFormData({ ...formData, image2_url: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded"
            />
            <input
              type="text"
              placeholder="Image 3 URL"
              value={formData.image3_url || ""}
              onChange={(e) => setFormData({ ...formData, image3_url: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded"
            />
            <input
              type="text"
              placeholder="Image 4 URL"
              value={formData.image4_url || ""}
              onChange={(e) => setFormData({ ...formData, image4_url: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded"
            />
          </div>

          {/* Color Variants */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-medium mb-4">Variantes de couleur</h3>
            {colorVariants.map((color, index) => (
              <div
                key={index}
                className="flex gap-3 items-center mb-4 p-4 border border-border/50 rounded-lg bg-background/50"
              >
                <input
                  placeholder="Nom (ex: black)"
                  value={color.name}
                  onChange={(e) => {
                    const updated = [...colorVariants]
                    updated[index].name = e.target.value
                    setColorVariants(updated)
                  }}
                  className="flex-1 px-3 py-2 border border-border rounded bg-background text-sm"
                />
                <input
                  placeholder="Label (ex: Noir)"
                  value={color.label}
                  onChange={(e) => {
                    const updated = [...colorVariants]
                    updated[index].label = e.target.value
                    setColorVariants(updated)
                  }}
                  className="flex-1 px-3 py-2 border border-border rounded bg-background text-sm"
                />
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => {
                    const updated = [...colorVariants]
                    updated[index].hex = e.target.value
                    setColorVariants(updated)
                  }}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setColorVariants(colorVariants.filter((_, i) => i !== index))}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                >
                  Supprimer
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setColorVariants([...colorVariants, { name: "", label: "", hex: "#000000" }])
              }
              className="w-full py-2 border border-dashed border-accent text-accent text-sm rounded hover:bg-accent/10 transition"
            >
              + Ajouter une couleur
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent text-accent-foreground font-medium tracking-widest hover:bg-accent/90 transition rounded"
          >
            {product ? "Mettre à jour" : "Créer le produit"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

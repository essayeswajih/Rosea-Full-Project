"use client"

import { Edit2, Trash2 } from "lucide-react"
import { Product } from "@/types/types"

export default function ProductsTable({
  products,
  categories,
  onEdit,
  onDelete,
}: {
  products: Product[]
  categories: { id: number; name: string }[]
  onEdit: (p: Product) => void
  onDelete: (id: number) => void
}) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="text-left py-3 px-4">Produit</th>
              <th className="text-left py-3 px-4">Prix</th>
              <th className="text-left py-3 px-4">Catégorie</th>
              <th className="text-left py-3 px-4">Remise</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-background/30">
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4 text-accent font-medium">
                  DT{p.discounted_price || p.price}
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {categories.find((c) => c.id === p.category_id)?.name || "-"}
                </td>
                <td className="py-3 px-4">
                  {p.discounted_price
                    ? Math.round(((p.price - p.discounted_price) / p.price) * 100)
                    : 0}%
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="p-2 hover:bg-accent/20 hover:text-accent transition-all rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(p.id || 0)}
                    className="p-2 hover:bg-red-500/20 hover:text-red-400 transition-all rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

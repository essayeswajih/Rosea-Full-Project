"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import CategoryFormModal from "./CategoryFormModal"
import { apiService } from "@/services/apiService"

export default function CategoriesSection({ categories, onRefresh }: { categories: any[], onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await apiService.addCategory({ "name": name, "id": 0 })
    setName("")
    setShowForm(false)
    onRefresh()
  }

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer ?")) {
      await apiService.deleteCategory(id)
      onRefresh()
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium tracking-widest hover:bg-accent/90"
      >
        <Plus size={18} />
        Ajouter une Catégorie
      </motion.button>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <motion.div key={cat.id} className="bg-card border border-border p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif tracking-wide">{cat.name}</h3>
              <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-red-500/20 hover:text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <CategoryFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        name={name}
        setName={setName}
        onSubmit={handleAdd}
      />
    </>
  )
}
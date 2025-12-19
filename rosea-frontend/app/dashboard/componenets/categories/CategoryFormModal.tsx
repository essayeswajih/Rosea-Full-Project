import { motion } from "framer-motion"
import { X } from "lucide-react"

export default function CategoryFormModal({ open, onClose, name, setName, onSubmit }: any) {
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border p-8 rounded-lg max-w-md w-full"
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-serif">Ajouter Catégorie</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la catégorie"
            className="w-full px-4 py-2 bg-background border border-border focus:border-accent outline-none"
            required
          />
          <div className="flex gap-4">
            <button type="submit" className="flex-1 py-3 bg-accent text-accent-foreground font-medium">
              Ajouter
            </button>
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-border">
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
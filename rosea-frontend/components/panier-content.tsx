"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { apiService, Order } from "@/services/apiService"

export default function PanierContent() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  // Compute subtotal using discounted price if available
  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.price) * item.quantity,
    0
  )

  const deliveryFee = subtotal < 300 ? 8 : 0
  const totalWithDelivery = subtotal + deliveryFee

  const handleOrder = async () => {
    if (!fullName || !email || !telephone || !location) {
      alert("Veuillez remplir tous les champs")
      return
    }

    const orderData: Order = {
      id: 0,
      total_amount: totalWithDelivery,
      status: "pending",
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.discountedPrice ?? item.price,
        name: item.title,
        color: item.color ?? "",
        size: item.size ?? ""
      })),
      username: fullName,
      email,
      telephone,
      location,
      payment_method: "cod",
      created_at: new Date().toISOString(),
      code: "",
    }

    setLoading(true)
    try {
      const response = await apiService.createOrder(orderData)

      clearCart()
      closeModal()

      // Redirect to invoice page using the order code
      router.push(`/order/${response.code}`)
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la commande. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight mb-6">Mon Panier</h1>
            <p className="text-lg text-muted-foreground mb-12">Votre panier est vide</p>
            <Link href="/collections">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-accent text-accent-foreground text-sm tracking-widest font-medium"
              >
                DÉCOUVRIR NOS COLLECTIONS
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-serif font-normal tracking-tight mb-12"
        >
          Mon Panier
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-6"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${item.color}-${item.size}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 pb-6 border-b border-border"
                >
                  <div className="w-24 h-32 bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-serif tracking-wide mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 capitalize">{item.category}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                      {item.color && (
                        <span>
                          Couleur: <span className="text-foreground capitalize font-medium">{item.color}</span>
                        </span>
                      )}
                      {item.size && (
                        <span>
                          Taille: <span className="text-foreground font-medium">{item.size}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-accent font-medium text-lg">
                      {(item.discountedPrice ?? item.price).toLocaleString()} DT
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromCart({ id: item.id, color: item.color, size: item.size })}
                      className="p-2 hover:bg-muted rounded transition-colors"
                    >
                      <Trash2 size={18} className="text-destructive" />
                    </motion.button>

                    <div className="flex items-center gap-2 border border-border rounded">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateQuantity({ id: item.id, color: item.color, size: item.size }, Math.max(1, item.quantity - 1))}
                        className="p-1"
                      >
                        <Minus size={16} />
                      </motion.button>
                      <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateQuantity({ id: item.id, color: item.color, size: item.size }, item.quantity + 1)}
                        className="p-1"
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:sticky lg:top-32">
            <div className="bg-card border border-border p-8 space-y-6">
              <h2 className="text-2xl font-serif font-normal">Résumé de Commande</h2>

              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString()} DT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frais de port</span>
                  <span className="text-accent">{deliveryFee === 0 ? "Gratuit" : deliveryFee + " DT"}</span>
                </div>
                <div className="flex justify-between font-serif text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-accent">{totalWithDelivery.toLocaleString()} DT</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent text-accent-foreground py-3 text-sm tracking-widest font-medium hover:bg-accent/90 transition-all"
                onClick={openModal}
              >
                PROCÉDER AU PAIEMENT
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className="w-full border border-border text-foreground py-3 text-sm tracking-widest font-medium hover:border-accent hover:text-accent transition-all"
              >
                VIDER LE PANIER
              </motion.button>

              <Link href="/collections" className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-border text-foreground py-3 text-sm tracking-widest font-medium hover:border-accent hover:text-accent transition-all"
                >
                  CONTINUER SHOPPING
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Checkout Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-serif mb-4">Finaliser la commande</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full border p-2 rounded"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Téléphone"
                className="w-full border p-2 rounded"
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Adresse de livraison"
                className="w-full border p-2 rounded"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
              <button
                className="w-full bg-accent text-white py-2 rounded mt-2"
                onClick={handleOrder}
                disabled={loading}
              >
                {loading ? "Validation..." : "Valider la commande"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

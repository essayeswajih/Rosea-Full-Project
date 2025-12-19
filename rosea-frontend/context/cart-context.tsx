// Cart Context
"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
  id: string
  title: string
  price: number
  discountedPrice?: number
  image?: string
  quantity: number
  category?: string
  color?: string
  size?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (item: Omit<CartItem, "quantity">) => void
  updateQuantity: (item: Omit<CartItem, "quantity">, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart")
      return stored ? JSON.parse(stored) : []
    }
    return []
  })

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
      )
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.id === item.id && i.color === item.color && i.size === item.size)
      )
    )
  }

  const updateQuantity = (item: Omit<CartItem, "quantity">, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter(
            (i) => !(i.id === item.id && i.color === item.color && i.size === item.size)
          )
        : prev.map((i) =>
            i.id === item.id && i.color === item.color && i.size === item.size
              ? { ...i, quantity }
              : i
          )
    )
  }

  const clearCart = () => setItems([])

  const total = items.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.price) * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}

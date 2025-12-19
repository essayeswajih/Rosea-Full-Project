"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface ColorVariant {
  name: string
  label: string
  hex: string
  images: string[]
}

export interface AdminProduct {
  id: string
  title: string
  price: number
  originalPrice: number
  discount: number
  category: string
  mainImage: string
  colorVariants: ColorVariant[]
  sizes: string[]
  material: string
  description: string
  rating: number
  ratingCount: number
  sku: string
  stock: number
}

export interface AdminCategory {
  id: string
  label: string
}

export interface AdminOrder {
  id: string
  customer: string
  amount: number
  status: "Complétée" | "En cours" | "En attente" | "Livrée"
  date: string
  items: number
}

interface AdminContextType {
  products: AdminProduct[]
  categories: AdminCategory[]
  orders: AdminOrder[]
  addProduct: (product: Omit<AdminProduct, "id">) => void
  updateProduct: (id: string, product: Omit<AdminProduct, "id">) => void
  deleteProduct: (id: string) => void
  addCategory: (category: Omit<AdminCategory, "id">) => void
  deleteCategory: (id: string) => void
  updateOrderStatus: (id: string, status: AdminOrder["status"]) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: "1",
    title: "Robe de Soirée Soie",
    price: 2500,
    originalPrice: 2778,
    discount: 10,
    category: "robes",
    mainImage: "/luxury-silk-gown-black-elegant.jpg",
    colorVariants: [
      {
        name: "black",
        label: "Noir",
        hex: "#000000",
        images: ["/luxury-silk-gown-black-elegant.jpg", "/luxury-evening-gown.jpg", "/luxury-dress-details.jpg"],
      },
      {
        name: "gold",
        label: "Or",
        hex: "#D4AF37",
        images: ["/luxury-dress-gold.jpg", "/luxury-evening-gown.jpg", "/luxury-dress-details.jpg"],
      },
      {
        name: "white",
        label: "Blanc",
        hex: "#FFFFFF",
        images: ["/luxury-silk-gown-white.jpg", "/luxury-evening-gown.jpg", "/luxury-dress-details.jpg"],
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Soie 100%",
    description: "Robe de soirée élégante en soie pure",
    rating: 4.8,
    ratingCount: 24,
    sku: "RDS-001",
    stock: 12,
  },
  {
    id: "2",
    title: "Robe de Haute Couture",
    price: 3200,
    originalPrice: 3556,
    discount: 10,
    category: "robes",
    mainImage: "/luxury-couture-dress-elegant.jpg",
    colorVariants: [
      {
        name: "black",
        label: "Noir",
        hex: "#000000",
        images: ["/luxury-couture-dress-elegant.jpg", "/couture-dress.jpg", "/hand-embroidered.jpg"],
      },
      {
        name: "navy",
        label: "Marine",
        hex: "#001F3F",
        images: ["/luxury-couture-dress-navy.jpg", "/couture-dress.jpg", "/hand-embroidered.jpg"],
      },
    ],
    sizes: ["XS", "S", "M", "L"],
    material: "Mousseline Luxe",
    description: "Création haute couture exclusive",
    rating: 4.9,
    ratingCount: 31,
    sku: "RHC-002",
    stock: 5,
  },
]

const INITIAL_CATEGORIES: AdminCategory[] = [
  { id: "robes", label: "Robes" },
  { id: "accessoires", label: "Accessoires" },
  { id: "tailoring", label: "Couture sur Mesure" },
  { id: "limited", label: "Édition Limitée" },
]

const INITIAL_ORDERS: AdminOrder[] = [
  { id: "001", customer: "Marie Dubois", amount: 2500, status: "Complétée", date: "2025-12-08", items: 1 },
  { id: "002", customer: "Jean Laurent", amount: 1800, status: "En cours", date: "2025-12-07", items: 2 },
  { id: "003", customer: "Sophie Martin", amount: 3200, status: "Complétée", date: "2025-12-06", items: 1 },
  { id: "004", customer: "Pierre Blanc", amount: 950, status: "En attente", date: "2025-12-05", items: 1 },
]

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS)
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES)
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedProducts = localStorage.getItem("admin_products")
    const savedCategories = localStorage.getItem("admin_categories")
    const savedOrders = localStorage.getItem("admin_orders")
    if (savedProducts) setProducts(JSON.parse(savedProducts))
    if (savedCategories) setCategories(JSON.parse(savedCategories))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("admin_products", JSON.stringify(products))
    }
  }, [products, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("admin_categories", JSON.stringify(categories))
    }
  }, [categories, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("admin_orders", JSON.stringify(orders))
    }
  }, [orders, mounted])

  const addProduct = (product: Omit<AdminProduct, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() }
    setProducts([...products, newProduct])
  }

  const updateProduct = (id: string, product: Omit<AdminProduct, "id">) => {
    setProducts(products.map((p) => (p.id === id ? { ...product, id } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const addCategory = (category: Omit<AdminCategory, "id">) => {
    const newCategory = { ...category, id: Date.now().toString() }
    setCategories([...categories, newCategory])
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id))
  }

  const updateOrderStatus = (id: string, status: AdminOrder["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        updateOrderStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error("useAdmin must be used within AdminProvider")
  return context
}

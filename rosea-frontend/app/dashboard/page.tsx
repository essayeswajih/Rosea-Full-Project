"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DashboardLayout from "./componenets/layout/DashboardLayout"
import DashboardNav from "./componenets/layout/DashboardNav"
import StatsGrid from "./componenets/overview/StatsGrid"
import SalesCharts from "./componenets/overview/SalesCharts"
import RecentOrders from "./componenets/overview/RecentOrders"
import OrdersTable from "./componenets/orders/OrdersTable"
import ProductsSection from "./componenets/products/ProductsSection"
import CategoriesSection from "./componenets/categories/CategoriesSection"
import { apiService } from "@/services/apiService"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      router.push("/dashboard/login")
      return
    }
    apiService.setToken(token)

    const loadData = async () => {
      try {
        const [p, c, o] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories(),
          apiService.getOrders(),
        ])
        setProducts(p)
        setCategories(c)
        setOrders(o)
      } catch (err) {
        console.error(err)
      }
    }
    loadData()
  }, [router])

  const refreshData = async () => {
    const [p, c, o] = await Promise.all([
      apiService.getProducts(),
      apiService.getCategories(),
      apiService.getOrders(),
    ])
    setProducts(p)
    setCategories(c)
    setOrders(o)
  }

  const updateOrderStatus = async (id: number, status: string) => {
    await apiService.updateOrderStatus(id, status as any)
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    )
  }

  return (
    <DashboardLayout>
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-6 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {activeTab === "overview" && (
            <>
              <StatsGrid orders={orders} products={products} />
              <SalesCharts />
              <RecentOrders orders={orders} onStatusChange={updateOrderStatus} />
            </>
          )}

          {activeTab === "commandes" && (
            <OrdersTable orders={orders} onStatusChange={updateOrderStatus} />
          )}

          {activeTab === "produits" && (
            <ProductsSection
              products={products}
              categories={categories}
              onRefresh={refreshData}
            />
          )}

          {activeTab === "categories" && (
            <CategoriesSection categories={categories} onRefresh={refreshData} />
          )}
        </motion.div>
      </main>
    </DashboardLayout>
  )
}
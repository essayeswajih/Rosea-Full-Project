import { motion } from "framer-motion"
import { ShoppingCart, Users, TrendingUp, Package } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function StatsGrid({ orders, products }: { orders: any[], products: any[] }) {
  const stats = [
    { label: "Commandes Totales", value: orders.length.toString(), icon: ShoppingCart },
    { label: "Utilisateurs", value: "3,421", icon: Users },
    { label: "Revenus", value: `DT${orders.reduce((s, o) => s + o.total_amount, 0).toLocaleString()}`, icon: TrendingUp },
    { label: "Produits", value: products.length.toString(), icon: Package },
  ]

  return (
    <motion.div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-card border border-border p-6 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground tracking-wide">
                {stat.label}
              </h3>
              <Icon className="text-accent opacity-60" size={24} />
            </div>
            <p className="text-3xl font-serif tracking-tight">{stat.value}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
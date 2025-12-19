"use client"

import {
  LineChart,        // ← keep only one
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Fév", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Avr", sales: 2780, revenue: 3908 },
  { month: "Mai", sales: 1890, revenue: 4800 },
  { month: "Juin", sales: 2390, revenue: 3800 },
]

export default function SalesCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border p-6 rounded-lg">
        <h3 className="text-lg font-serif tracking-wide mb-4">Ventes Mensuelles</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #D4AF37" }}
              labelStyle={{ color: "#D4AF37" }}
            />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#888" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border p-6 rounded-lg">
        <h3 className="text-lg font-serif tracking-wide mb-4">Revenus</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #D4AF37" }}
              labelStyle={{ color: "#D4AF37" }}
            />
            <Bar dataKey="revenue" fill="#D4AF37" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
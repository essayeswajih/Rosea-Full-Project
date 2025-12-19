import { apiService } from "@/services/apiService"

export default function RecentOrders({ orders, onStatusChange }: { orders: any[], onStatusChange: (id: number, status: string) => void }) {
  return (
    <div className="bg-card border border-border p-6 rounded-lg">
      <h3 className="text-lg font-serif tracking-wide mb-6">Commandes Récentes</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Client</th>
              <th className="text-left py-3 px-4">Montant</th>
              <th className="text-left py-3 px-4">Statut</th>
              <th className="text-left py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 6).map((order) => (
              <tr key={order.id} className="border-b border-border/50 hover:bg-background">
                <td className="py-3 px-4 text-accent">#{order.code}</td>
                <td className="py-3 px-4">{order.username}</td>
                <td className="py-3 px-4 font-medium">DT{order.total_amount}</td>
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                    className="px-3 py-1 rounded-full text-xs bg-accent/20 text-accent border-0 cursor-pointer"
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En cours</option>
                    <option value="shipped">Expédiée</option>
                    <option value="delivered">Livrée</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
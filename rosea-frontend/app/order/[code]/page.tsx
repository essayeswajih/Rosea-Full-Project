import { apiService } from "@/services/apiService";

interface OrderPageProps {
  params: Promise<{ code: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const resolvedParams = await params;
  const code = resolvedParams.code;

  if (!code) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Le code de commande est invalide</span>
      </div>
    );
  }

  let order;

  try {
    order = await apiService.getOrderByCode(code);

    if (!order) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <span>Commande non trouvée avec ce code</span>
        </div>
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Erreur lors de la récupération de la commande</span>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-serif">Facture</h1>
          <p className="text-muted-foreground">
            Code de commande :
            <span className="font-medium text-foreground"> {order.code}</span>
          </p>
          <p className="text-accent font-medium">Statut : {order.status}</p>
        </div>

        <div className="border border-border p-6 space-y-2">
          <h2 className="font-serif text-xl mb-3">Informations client</h2>
          <p><strong>Nom :</strong> {order.username}</p>
          <p><strong>Email :</strong> {order.email}</p>
          <p><strong>Téléphone :</strong> {order.telephone}</p>
          <p><strong>Adresse :</strong> {order.location}</p>
        </div>

        <div className="border border-border p-6">
          <h2 className="font-serif text-xl mb-6">Articles</h2>

          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between border-b pb-3 text-sm"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">
                    {item.color && `Couleur: ${item.color}`}{" "}
                    {item.size && `| Taille: ${item.size}`}
                  </p>
                  <p className="text-muted-foreground">
                    Quantité: {item.quantity}
                  </p>
                </div>

                <div className="font-medium">
                  {(item.price * item.quantity).toLocaleString()} DT
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-6 space-y-3">
          <div className="flex justify-between font-serif text-lg">
            <span>Total</span>
            <span className="text-accent">
              {order.total_amount.toLocaleString()} DT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

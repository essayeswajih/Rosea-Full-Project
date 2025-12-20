import ProductDetailsClient from "./ProductDetailsClient";
import { apiService, Product } from "@/services/apiService";

export const dynamic = "force-dynamic";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>; // params est une Promise
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const resolvedParams = await params; // unwrap the Promise
  const slugParam = resolvedParams.slug;

  if (!slugParam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Produit non trouvé (Slug invalide)</span>
      </div>
    );
  }

  let product: Product | null = null; // <-- la variable à utiliser

  try {
    console.log("Fetching slug:", slugParam);
    product = await apiService.getProductBySlug(slugParam); // <-- ne pas redéclarer avec const
    console.log("Product fetched:", product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Produit ({slugParam}) non trouvé</span>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
}

import { apiFetch } from "@/lib/api";

// Category interface
export interface Category {
  id: number | null;
  name: string;
  description?: string;
  image_url?: string;
  link?: string;
}

// Product interface
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  in_stock?: boolean;
  category_id: number;
  discounted_price?: number;
  image_url?: string;
  image2_url?: string;
  image3_url?: string;
  image4_url?: string;
  promo?: boolean;
  buzzent?: string;
  rating?: number;
  num_ratings?: number;

  sizes?: string[];
  colors?: { name: string; label: string; hex: string }[];
  materials?: string[];
  care?: string[];
  features?: string[];
  sku?: string;

  colorImages?: Record<string, string[]>;
  slug: string;
}

// Order types
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
}

export interface Order {
  id: number;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  items: { product_id: number; quantity: number; price: number; name: string, color: string, size: string }[];
  username: string;
  email: string;
  telephone: string;
  location: string;
  payment_method: string;
  code: string;
}

// API service
export const apiService = {
  token: "",

  // Load token from localStorage on first use
  initToken() {
    if (!this.token) {
      this.token = localStorage.getItem("access_token") || "";
    }
  },

  setToken(jwt: string) {
    this.token = jwt;
    localStorage.setItem("token", jwt);
  },

  // Ensure token exists before every call
  ensureToken() {
    if (!this.token) {
      this.token = localStorage.getItem("token") || "";
    }
  },

  // Categories
  getCategories() {
    this.ensureToken();
    return apiFetch("/categories", {
      cacheKey: "categories",
      ttl: 120,
      token: this.token,
    });
  },

  addCategory(category: Category) {
    this.ensureToken();
    return apiFetch("/categories", {
      method: "POST",
      body: JSON.stringify(category),
      token: this.token,
    });
  },

  updateCategory(id: number, category: Category) {
    this.ensureToken();
    return apiFetch(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
      token: this.token,
    });
  },

  deleteCategory(id: number) {
    this.ensureToken();
    return apiFetch(`/categories/${id}`, {
      method: "DELETE",
      token: this.token,
    });
  },

  // Products
  getProducts(category?: string, sortBy?: string, search?: string) {
    this.ensureToken();

    const params = new URLSearchParams();
    if (category) params.append("category_name", category);
    if (sortBy) params.append("sortBy", sortBy);
    if (search) params.append("searchFor", search);

    const url = "/products" + (params.toString() ? `?${params.toString()}` : "");

    return apiFetch(url, {
      cacheKey: "products",
      ttl: 60,
      token: this.token,
    });
  },

  async getProductById(id: number): Promise<Product | null> {
    try {
      // Direct fetch to your API endpoint, no token used

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
      if (!res.ok) return null;

      const product: Product = await res.json();

      if (!product) return null;

      // Prepare color images mapping
      const colors = product.colors || [];
      const imageUrls = [
        product.image_url,
        product.image2_url,
        product.image3_url,
        product.image4_url,
      ].filter(Boolean) as string[];

      const colorImages: Record<string, string[]> = {};
      colors.forEach((color) => {
        colorImages[color.name] = imageUrls;
      });

      return { ...product, colorImages };
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
    }
  },


async getProductBySlug(slug: string): Promise<Product | null> {
  try {
    console.log("Fetching product via apiFetch:", `/products/slug/${slug}`);

    const product: Product = await apiFetch(`/products/slug/${slug}`, {
      method: "GET",
      // token si nécessaire
      // token: this.token
    });

    if (!product) return null;

    // Préparer le mapping colorImages
    const colors = product.colors || [];
    const imageUrls = [
      product.image_url,
      product.image2_url,
      product.image3_url,
      product.image4_url,
    ].filter(Boolean) as string[];

    const colorImages: Record<string, string[]> = {};
    colors.forEach((color) => {
      colorImages[color.name] = imageUrls;
    });

    return { ...product, colorImages };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

  ,
  addProduct(product: Product) {
    this.ensureToken();
    return apiFetch("/products", {
      method: "POST",
      body: JSON.stringify(product),
      token: this.token,
    });
  },

  updateProduct(id: number, product: Product) {
    this.ensureToken();
    return apiFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      token: this.token,
    });
  },

  deleteProduct(id: number) {
    this.ensureToken();
    return apiFetch(`/products/${id}`, {
      method: "DELETE",
      token: this.token,
    });
  },

  // Orders
  getOrders() {
    this.ensureToken();
    return apiFetch("/orders", {
      token: this.token,
    });
  },

  updateOrderStatus(id: number, status: OrderStatus) {
    this.ensureToken();
    return apiFetch(`/orders/orderStatus/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      token: this.token,
    });
  },

  updateOrder(id: number, order: Order) {
    this.ensureToken();
    return apiFetch(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(order),
      token: this.token,
    });
  },

  createOrder(order: Order) {
    return apiFetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
  },

  deleteOrder(id: number) {
    this.ensureToken();
    return apiFetch(`/orders/${id}`, {
      method: "DELETE",
      token: this.token,
    });
  },

  getOrderByCode(code: string) {
    return apiFetch(`/orders/orderCode/${code}`);
  },

  // Users
  getUser() {
    this.ensureToken();
    return apiFetch("/auth/users/me", {
      token: this.token,
    });
  },

  // Newsletter
  subscribeToNewsletter(email: string) {
    return apiFetch("/subscribe_to_newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Contact
  sendContactMessage(name: string, email: string, sujet: string, message: string) {
    return apiFetch("/support-contact", {
      method: "POST",
      body: JSON.stringify({ name, email, sujet, message }),
    });
  },

  // Image upload
  uploadImage(file: File) {
    this.ensureToken();

    const formData = new FormData();
    formData.append("file", file, file.name);

    return apiFetch("/upload", {
      method: "POST",
      body: formData,
      token: this.token,
    });
  },

  getAllImages() {
    this.ensureToken();
    return apiFetch("/images", {
      token: this.token,
    });
  },
};

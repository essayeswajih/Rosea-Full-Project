const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Credentials {
  username: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  tokenKey: "access_token",

  // Login: returns token and stores it in localStorage
  async login(credentials: Credentials): Promise<TokenResponse> {
    const body = new URLSearchParams();
    body.set("username", credentials.username);
    body.set("password", credentials.password);

    const res = await fetch(`${API_BASE}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Invalid credentials");
      const errorBody = await res.json().catch(() => null);
      throw new Error(errorBody?.detail || "Login failed");
    }

    const data: TokenResponse = await res.json();

    if (data.access_token) {
      if (typeof window !== "undefined") {
        localStorage.setItem(this.tokenKey, data.access_token);
      }
    }

    return data;
  },

  // Get token from localStorage
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey);
  },
  setToken(token: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem(this.tokenKey, token)
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Logout
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.tokenKey);
    }
  },

  // Get current user from backend
  async getCurrentUser(): Promise<any> {
    const token = this.getToken();
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_BASE}/auth/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(errorBody?.detail || "Failed to fetch user");
    }

    return res.json();
  },
};

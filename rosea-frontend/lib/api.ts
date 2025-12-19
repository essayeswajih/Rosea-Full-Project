const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// In-memory cache for server-side calls
const cache: { [key: string]: any } = {};

interface FetchOptions extends RequestInit {
  cacheKey?: string;   // optional cache key
  ttl?: number;        // optional TTL in seconds
  token?: string;      // optional JWT token
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { cacheKey, ttl = 60, token, ...rest } = options;

  if (cacheKey && cache[cacheKey]) return cache[cacheKey];

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(rest.headers || {})
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...rest, headers, cache: "no-store" });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.detail || res.statusText || "API error");
  }

  const data = await res.json();

  if (cacheKey) {
    cache[cacheKey] = data;
    setTimeout(() => delete cache[cacheKey], ttl * 1000);
  }

  return data;
}

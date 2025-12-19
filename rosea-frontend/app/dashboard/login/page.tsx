"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService" // <-- import your auth service

export default function DashboardLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const tokenData = await authService.login({ username: email, password })
      // Store token in authService (optional if authService does it automatically)
      authService.setToken?.(tokenData.access_token)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif tracking-widest text-accent mb-2">Roséa</h1>
          <p className="text-sm text-muted-foreground tracking-wide">Administration</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border p-8 rounded-lg space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium tracking-wide mb-3">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@rosea.tn"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium tracking-wide mb-3">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••••••••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {error && <motion.p className="text-red-400 text-sm">{error}</motion.p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-accent text-accent-foreground font-medium tracking-widest hover:bg-accent/90 disabled:opacity-50 transition-all"
            >
              {isLoading ? "Connexion..." : "SE CONNECTER"}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-2 text-xs text-muted-foreground border-t border-border pt-4"
          >
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-8">
          <Link href="/" className="text-sm text-accent hover:text-accent/80 tracking-wide transition-colors">
            Retour à l'accueil
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

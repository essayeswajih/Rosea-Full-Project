"use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-foreground text-background border-t border-border">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <p className="text-accent text-sm tracking-[3px] font-light uppercase">Stay Updated</p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight">Join Our Inner Circle</h2>
          <p className="text-lg text-background/80">
            Be the first to discover new collections, exclusive previews, and invitations to private events.
          </p>
        </div>

        <form
          className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault()
            setEmail("")
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 bg-background/10 border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-accent transition-colors"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-accent text-accent-foreground hover:bg-background hover:text-foreground transition-colors text-sm tracking-widest font-medium"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-xs text-background/60 tracking-wide">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}

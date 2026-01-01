"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight mb-4">Nous Contacter</h2>
              <p className="text-background/80">Nous aimerions vous entendre. Contactez notre équipe.</p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm tracking-widest uppercase font-medium mb-1">Email</p>
                  <a
                    href="mailto:contact@rosea.tn"
                    className="text-background/80 hover:text-accent transition-colors"
                  >
                    contact@rosea.tn
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm tracking-widest uppercase font-medium mb-1">Téléphone</p>
                  <a href="tel:+21627553981" className="text-background/80 hover:text-accent transition-colors">
                    +216 27553981
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm tracking-widest uppercase font-medium mb-1">Adresse</p>
                  <p className="text-background/80">Rue Habib Bourguiba, 5021 Tunis, Monastir</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-widest uppercase font-medium mb-4">Nous Suivre</p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 border border-background/30 hover:border-accent text-background/60 hover:text-accent transition-all"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 border border-background/30 hover:border-accent text-background/60 hover:text-accent transition-all"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-2 border border-background/30 hover:border-accent text-background/60 hover:text-accent transition-all"
                >
                  <Twitter size={20} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="text-sm tracking-widest uppercase font-medium block mb-2">Nom</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background/10 border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="Votre nom"
                required
              />
            </div>

            <div>
              <label className="text-sm tracking-widest uppercase font-medium block mb-2">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-background/10 border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="text-sm tracking-widest uppercase font-medium block mb-2">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-background/10 border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-accent transition-colors h-32 resize-none"
                placeholder="Votre message"
                required
              ></motion.textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-8 py-4 bg-accent text-accent-foreground hover:bg-background hover:text-foreground transition-all duration-300 text-sm tracking-widest font-medium"
            >
              {isSubmitted ? "MESSAGE ENVOYÉ ✓" : "ENVOYER LE MESSAGE"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

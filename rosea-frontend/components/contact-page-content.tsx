"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Clock } from "lucide-react"
import DarkHero from "./dark-hero"

export default function ContactPageContent() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@rosea.tn",
      href: "mailto:contact@rosea.tn",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+216 553981",
      href: "tel:+216553981",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Rue Habib Bourguiba, 5021 Tunis, Monastir",
      href: "#",
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun-Sam: 10h-19h | Dim: Fermé",
      href: "#",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <DarkHero
        title="Nous Contacter"
        subtitle="Maison Elegance"
        description="Notre équipe de consultants est prête à vous aider avec toute question ou demande spéciale"
      />

      {/* Contact Content */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif font-normal mb-2">Coordonnées</h2>
                <p className="text-muted-foreground">Nous sommes heureux de vous entendre</p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={idx}
                      href={info.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 items-start group"
                    >
                      <Icon className="w-6 h-6 text-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm tracking-widest uppercase font-medium mb-1">{info.label}</p>
                        <p className="text-foreground/80 hover:text-accent transition-colors">{info.value}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-sm tracking-widest uppercase font-medium mb-4">Nous Suivre</p>
                <div className="flex gap-4">
                  {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="p-3 border border-border hover:border-accent text-foreground hover:text-accent transition-all"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
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
                <label className="text-sm tracking-widest uppercase font-medium block mb-3">Nom</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-accent text-foreground placeholder:text-foreground/40 focus:outline-none transition-colors"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label className="text-sm tracking-widest uppercase font-medium block mb-3">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-accent text-foreground placeholder:text-foreground/40 focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm tracking-widest uppercase font-medium block mb-3">Sujet</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-accent text-foreground placeholder:text-foreground/40 focus:outline-none transition-colors"
                  placeholder="Sujet de votre message"
                  required
                />
              </div>

              <div>
                <label className="text-sm tracking-widest uppercase font-medium block mb-3">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border focus:border-accent text-foreground placeholder:text-foreground/40 focus:outline-none transition-colors h-40 resize-none"
                  placeholder="Votre message"
                  required
                ></motion.textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 text-sm tracking-widest font-medium"
              >
                {isSubmitted ? "MESSAGE ENVOYÉ ✓" : "ENVOYER LE MESSAGE"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  )
}

export default function Heritage() {
  return (
    <section id="heritage" className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-square bg-muted order-2 md:order-1">
            <img
              src="/luxury-heritage-craftsmanship-artisan-detail.jpg"
              alt="Heritage and craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 md:order-2">
            <div className="space-y-4">
              <p className="text-accent text-sm tracking-[3px] font-light uppercase">Our Story</p>
              <h2 className="text-heading">A Legacy of Excellence</h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Since 1985, Luxé Atelier has been at the forefront of haute couture, blending timeless design principles
              with contemporary innovation. Our commitment to quality remains unwavering.
            </p>

            <ul className="space-y-4 text-foreground">
              <li className="flex gap-4">
                <span className="text-accent font-serif">✦</span>
                <span>Ethically sourced premium materials from around the world</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-serif">✦</span>
                <span>Expert artisans with 20+ years of experience</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-serif">✦</span>
                <span>Sustainable production practices</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-serif">✦</span>
                <span>Limited edition pieces for true exclusivity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

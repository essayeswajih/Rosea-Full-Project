export default function Craftsmanship() {
  const items = [
    {
      title: "Precision Tailoring",
      description: "Hand-stitched with meticulous attention to detail",
      image: "/luxury-fashion-tailoring-detail-close-up.jpg",
    },
    {
      title: "Material Selection",
      description: "Only the finest fabrics sourced globally",
      image: "/luxury-fabric-texture-premium-material.jpg",
    },
    {
      title: "Finishing Touches",
      description: "Final inspection ensures perfection",
      image: "/luxury-fashion-finishing-details-elegant.jpg",
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-muted/5 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[3px] font-light uppercase mb-4">Craftsmanship</p>
          <h2 className="text-heading mb-4">The Art of Creation</h2>
          <div className="flex justify-center">
            <div className="w-12 h-1 bg-accent"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-4 group">
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-serif tracking-wide">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

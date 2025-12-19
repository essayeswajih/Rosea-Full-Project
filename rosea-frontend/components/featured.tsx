export default function Featured() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-accent text-sm tracking-[3px] font-light uppercase">Featured</p>
              <h2 className="text-heading">The Icon Piece</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Introducing our signature piece: a timeless silhouette that defines elegance. Meticulously crafted from
              Italian silk with gold-threaded accents, this dress is available in limited quantities.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Price on Application</p>
              <p className="text-sm text-muted-foreground">Available in sizes XS - L</p>
              <p className="text-sm text-accent tracking-widest font-medium">Only 50 pieces worldwide</p>
            </div>
            <button className="px-8 py-4 bg-accent text-accent-foreground hover:bg-foreground transition-all duration-300 text-sm tracking-widest font-medium mt-4">
              REQUEST AVAILABILITY
            </button>
          </div>
          <div className="relative aspect-[3/4] bg-muted overflow-hidden">
            <img src="/luxury-fashion-signature-dress-icon-piece-elegant.jpg" alt="Featured icon piece" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 text-xs tracking-widest font-medium">
              FEATURED
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function DashboardNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  const tabs = [
    { id: "overview", label: "Aperçu" },
    { id: "commandes", label: "Commandes" },
    { id: "produits", label: "Produits" },
    { id: "categories", label: "Catégories" },
  ]

  return (
    <nav className="bg-card border-b border-border px-6 py-4 flex gap-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm font-medium tracking-widest transition-all border-b-2 whitespace-nowrap ${
            activeTab === tab.id
              ? "border-accent text-accent"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
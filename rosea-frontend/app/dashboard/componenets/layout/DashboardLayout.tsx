import { LogOut } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-black border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-widest text-accent">
            Rosea
          </h1>
          <p className="text-sm text-muted-foreground">
            Tableau de Bord Administrateur
          </p>
        </div>
        <Link
          href="/"
          onClick={() => sessionStorage.removeItem("adminToken")}
          className="flex items-center gap-2 px-4 py-2 border border-border hover:border-accent text-foreground hover:text-accent transition-all"
        >
          <LogOut size={18} />
          Quitter
        </Link>
      </header>
      {children}
    </div>
  )
}
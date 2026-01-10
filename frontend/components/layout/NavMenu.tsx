import Link from "next/link";

export function NavMenu() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col shadow-xl z-50">
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-400 transition-colors">
          IoT Dashboard
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
            >
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dispositivos"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
            >
              <span>Dispositivos</span>
            </Link>
          </li>
          <li>
            <Link
              href="/alertas"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
            >
              <span>Alertas</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer / User Profile (Optional placeholder) */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
            U
          </div>
          <div className="text-sm">
            <p className="font-medium">Usuário</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

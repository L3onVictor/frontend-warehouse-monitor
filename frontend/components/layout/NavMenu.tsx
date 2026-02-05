'use client'

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    router.push('/login');
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-slate-900 z-40 flex items-center justify-between px-4 shadow-md">
        <Link href="/" className="font-bold text-white text-lg">
          IoT Dashboard
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay (Mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col shadow-xl z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header / Logo (Desktop) */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-400 transition-colors">
            IoT Dashboard
          </Link>
          {/* Close Button (Mobile only inside sidebar) */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/ambientes"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <span>Ambientes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dispositivos"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <span>Dispositivos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/configuracao-alertas"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <span>Configuração de Alertas</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-slate-800 relative">
          {/* If still loading auth state, show placeholder */}
          {isLoading ? (
            <div className="h-10 w-full animate-pulse bg-slate-800 rounded" />
          ) : user ? (
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold ring-2 ring-slate-700">
                  {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-200">{user.nome}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
                >
                  <svg className={`w-5 h-5 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>

                    <div className="absolute bottom-10 right-0 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-20 overflow-hidden mb-2">
                      <div className="py-1">
                        <Link
                          href="/perfil"
                          className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Ver Perfil
                        </Link>
                        <Link
                          href="/configuracoes"
                          className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Configurações
                        </Link>
                        <div className="border-t border-slate-700 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300"
                        >
                          Sair
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Link href="/login" className="px-3 py-1.5 text-sm text-blue-400 bg-slate-800 rounded-md hover:bg-slate-700">
                Entrar
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

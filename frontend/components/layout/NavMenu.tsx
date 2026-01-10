"use client";

import Link from "next/link";
import { useState } from "react";

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
                href="/dispositivos"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <span>Dispositivos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/alertas"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <span>Alertas</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer / User Profile */}
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
    </>
  );
}

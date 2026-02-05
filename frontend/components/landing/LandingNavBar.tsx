"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function LandingNavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user } = useAuth();

    const navLinks = [
        { name: "Início", href: "#inicio" },
        { name: "Sobre", href: "#sobre" },
        { name: "Benefícios", href: "#beneficios" },
        { name: "Parceiros", href: "#parceiros" },
        { name: "Contato", href: "#contato" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-slate-50 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-900">
                    WarehouseMonitor
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-gray-600 hover:text-blue-700 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="px-6 py-2 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
                        >
                            Painel
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="px-6 py-2 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
                        >
                            Entrar
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-gray-100">
                        {user ? (
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full text-center px-6 py-3 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
                            >
                                Acessar Painel
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full text-center px-6 py-3 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
                            >
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

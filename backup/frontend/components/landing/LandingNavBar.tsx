"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function LandingNavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/20 group-hover:bg-blue-500 transition-colors">
                        W
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">
                        Warehouse<span className="text-blue-400">Monitor</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { label: "Início", id: "home" },
                        { label: "Sobre", id: "sobre" },
                        { label: "Benefícios", id: "beneficios" },
                        { label: "Parceiros", id: "parceiros" },
                        { label: "Contato", id: "contato" },
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            {item.label}
                        </a>
                    ))}

                    <Link
                        href="/login"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        Área do Cliente
                    </Link>
                </div>

                {/* Mobile Menu Button (simplified) */}
                <button className="md:hidden text-white p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}

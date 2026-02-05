import Link from "next/link";

export function LandingFooter() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">W</div>
                            <span className="text-xl font-bold text-white">Warehouse<span className="text-blue-500">Monitor</span></span>
                        </Link>
                        <p className="text-sm max-w-sm">
                            Soluções avançadas para monitoramento ambiental em tempo real. Protegendo ativos críticos com tecnologia e precisão.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-white font-semibold mb-4">Navegação</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#home" className="hover:text-white transition">Início</a></li>
                            <li><a href="#sobre" className="hover:text-white transition">Sobre Nós</a></li>
                            <li><a href="#beneficios" className="hover:text-white transition">Benefícios</a></li>
                            <li><a href="#parceiros" className="hover:text-white transition">Parceiros</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-semibold mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:text-white transition">Compliance</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Warehouse Monitor. Todos os direitos reservados.</p>
                    <p className="mt-2 md:mt-0">Desenvolvido com excelência.</p>
                </div>
            </div>
        </footer>
    );
}

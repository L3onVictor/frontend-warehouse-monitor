import Link from "next/link";

export function LandingFooter() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                            WarehouseMonitor
                        </Link>
                        <p className="max-w-xs text-sm">
                            Soluções inteligentes para monitoramento de ambientes. Tecnologia, precisão e segurança para o seu negócio.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Navegação</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#inicio" className="hover:text-blue-400 transition">Início</Link></li>
                            <li><Link href="#sobre" className="hover:text-blue-400 transition">Sobre</Link></li>
                            <li><Link href="#beneficios" className="hover:text-blue-400 transition">Benefícios</Link></li>
                            <li><Link href="#contato" className="hover:text-blue-400 transition">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Privacidade</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Warehouse Monitor. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

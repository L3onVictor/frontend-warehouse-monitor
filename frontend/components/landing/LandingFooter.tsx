import Link from "next/link";

export function LandingFooter() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                            WarehouseMonitor
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed">
                            Soluções inteligentes e confiáveis para monitoramento de ambientes. Tecnologia, precisão e segurança para o seu negócio.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Navegação</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#inicio" className="hover:text-white transition">Início</Link></li>
                            <li><Link href="#sobre" className="hover:text-white transition">Sobre</Link></li>
                            <li><Link href="#beneficios" className="hover:text-white transition">Benefícios</Link></li>
                            <li><Link href="#contato" className="hover:text-white transition">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Warehouse Monitor. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

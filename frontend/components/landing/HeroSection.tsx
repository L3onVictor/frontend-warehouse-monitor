import Link from "next/link";

export function HeroSection() {
    return (
        <section
            id="inicio"
            className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-50"
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                        Controle Total do Seu <br className="hidden md:block" />
                        <span className="text-blue-700">Ambiente de Negócios</span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Evite perdas de estoque e desperdícios. Monitore temperatura e umidade em tempo real para armazéns, restaurantes e indústrias com simplicidade e confiança.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/login"
                            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-700 text-white font-semibold text-lg hover:bg-blue-800 transition-colors shadow-sm"
                        >
                            Começar Agora
                        </Link>
                        <Link
                            href="#sobre"
                            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white text-blue-800 border-2 border-blue-100 font-semibold text-lg hover:bg-blue-50 transition-colors"
                        >
                            Saiba Mais
                        </Link>
                    </div>

                    <div className="mt-12 p-2 bg-slate-100 rounded-xl border border-slate-200 shadow-lg">
                        <div className="aspect-[16/9] rounded-lg bg-white overflow-hidden relative flex items-center justify-center text-slate-400">
                            {/* Simpler placeholder without neon */}
                            <span className="text-lg font-medium tracking-wide">Visão Geral do Sistema</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

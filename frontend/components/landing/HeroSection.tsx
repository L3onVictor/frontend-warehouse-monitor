import Link from "next/link";

export function HeroSection() {
    return (
        <section
            id="inicio"
            className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-slate-950"
        >
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wide mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        Monitoramento Inteligente 24/7
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
                        Controle Total do Seu <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ambiente de Negócios</span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Evite perdas de estoque e desperdícios com nosso sistema de monitoramento de temperatura e umidade em tempo real para armazéns, restaurantes e indústrias.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/login"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all transform hover:-translate-y-1"
                        >
                            Começar Agora
                        </Link>
                        <Link
                            href="#sobre"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                            Saiba Mais
                        </Link>
                    </div>

                    <div className="mt-16 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur border border-white/20 dark:border-white/5 rounded-2xl shadow-xl">
                        <div className="aspect-[16/9] rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative group">
                            {/* Placeholder Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 bg-slate-200 dark:bg-slate-800">
                                <span className="text-lg font-medium">Dashboard Preview</span>
                                {/* Once we have a real screenshot, we put next/image here */}
                            </div>
                            {/* Fake UI Elements for "Premium" feel */}
                            <div className="absolute top-4 left-4 right-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

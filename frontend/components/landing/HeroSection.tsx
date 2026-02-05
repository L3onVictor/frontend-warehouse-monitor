export function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center bg-slate-900 pt-20 overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-slate-900 opacity-20"></div>
                <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "overlay" }}></div>
                {/* Extra darkening overlay for text readability */}
                <div className="absolute inset-0 bg-slate-900/80"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8 animate-in slide-in-from-left duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Tecnologia de ponta para sua empresa
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                        Controle Total do Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Estoque Sensível</span>
                    </h1>

                    <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                        Monitoramento em tempo real de temperatura e umidade para garantir a qualidade dos seus produtos e evitar prejuízos milionários. A solução definitiva para indústrias, frigoríficos e logística farmacêutica.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#contato" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-900/50 transition-all text-center">
                            Falar com Consultor
                        </a>
                        <a href="#sobre" className="px-8 py-4 bg-transparent border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all text-center">
                            Conhecer a Solução
                        </a>
                    </div>

                    <div className="pt-8 flex items-center gap-8 border-t border-slate-800">
                        <div>
                            <p className="text-3xl font-bold text-white">+500</p>
                            <p className="text-sm text-slate-400">Sensores Ativos</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">99.9%</p>
                            <p className="text-sm text-slate-400">Uptime Garantido</p>
                        </div>
                    </div>
                </div>

                {/* Right Image/Graphic */}
                {/* Right Image/Graphic */}
                <div className="hidden md:block relative animate-in slide-in-from-right duration-700 delay-200">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-2">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1035&q=80"
                                alt="Monitoramento Industrial"
                                className="rounded-xl w-full h-auto object-cover opacity-90"
                            />

                            {/* Floating Card Detail - Inside Image */}
                            <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl flex items-center gap-4 z-20">
                                <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700">
                                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status do sistema</p>
                                    <p className="text-lg font-bold text-white tracking-wide">100% Operacional</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

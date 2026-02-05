export function AboutSection() {
    return (
        <section id="sobre" className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                            Tecnologia Avançada para <br />
                            <span className="text-blue-600">Proteção do Seu Patrimônio</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Nosso sistema utiliza sensores IoT de última geração para coletar dados críticos de seus ambientes.
                            Seja um frigorífico que não pode descongelar ou um armazém de medicamentos sensíveis,
                            nós garantimos que você seja o primeiro a saber de qualquer anomalia.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Monitoramento 24 horas por dia, 7 dias por semana",
                                "Alertas instantâneos via e-mail",
                                "Histórico detalhado para auditorias e conformidade",
                                "Interface intuitiva acessível de qualquer lugar"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visual Content */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                                    <h4 className="text-orange-600 font-bold text-lg mb-2">Temperatura</h4>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">-18.2°C</div>
                                    <div className="text-sm text-slate-500 mt-1">Estável</div>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                                    <h4 className="text-blue-600 font-bold text-lg mb-2">Umidade</h4>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">45%</div>
                                    <div className="text-sm text-slate-500 mt-1">Ideal</div>
                                </div>
                                <div className="col-span-2 bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Status do Sistema</h4>
                                        <p className="text-sm text-green-600 font-medium flex items-center gap-1 mt-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Operacional
                                        </p>
                                    </div>
                                    <div className="text-slate-400">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decor elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-dots-pattern opacity-20"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}

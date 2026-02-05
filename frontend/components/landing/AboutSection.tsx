export function AboutSection() {
    return (
        <section id="sobre" className="py-24 bg-slate-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Tecnologia e Segurança para <br />
                            <span className="text-blue-700">Seu Patrimônio</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Nosso sistema utiliza equipamentos de precisão para coletar dados críticos de seus ambientes.
                            Seja um frigorífico industrial ou um armazém de medicamentos,
                            garantimos que você saiba exatamente o que está acontecendo.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Monitoramento contínuo (24/7)",
                                "Alertas via e-mail em tempo real",
                                "Histórico seguro para auditorias",
                                "Acesso simplificado de qualquer lugar"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visual Content */}
                    <div className="flex-1 w-full max-w-lg">
                        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                                    <h4 className="text-orange-700 font-bold text-sm uppercase mb-2">Temperatura</h4>
                                    <div className="text-3xl font-bold text-slate-800">-18.2°C</div>
                                    <div className="text-sm text-slate-500 mt-1">Status: Estável</div>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <h4 className="text-blue-700 font-bold text-sm uppercase mb-2">Umidade</h4>
                                    <div className="text-3xl font-bold text-slate-800">45%</div>
                                    <div className="text-sm text-slate-500 mt-1">Status: Ideal</div>
                                </div>
                                <div className="col-span-2 bg-gray-50 p-6 rounded-lg border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Sistema Operante</h4>
                                        <p className="text-sm text-green-700 font-medium flex items-center gap-2 mt-1">
                                            <span className="w-2 h-2 rounded-full bg-green-600"></span> Conectado
                                        </p>
                                    </div>
                                    <div className="text-gray-400">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

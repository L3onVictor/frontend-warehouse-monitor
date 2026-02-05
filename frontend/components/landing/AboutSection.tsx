export function AboutSection() {
    return (
        <section id="sobre" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Quem Somos</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Líderes em Monitoramento de Precisão</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        A <span className="font-semibold text-slate-800">Warehouse Monitor</span> nasceu da necessidade crítica de garantir a integridade de produtos sensíveis em escalas industriais. Com tecnologia proprietária e foco em dados acionáveis, transformamos a gestão de estoques de passiva para proativa.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Missão",
                            desc: "Proporcionar segurança absoluta e zero desperdício para cadeias de suprimentos globais.",
                            icon: (
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            )
                        },
                        {
                            title: "Visão",
                            desc: "Ser a referência mundial em IoT industrial para controle climático de ambientes críticos.",
                            icon: (
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )
                        },
                        {
                            title: "Valores",
                            desc: "Precisão técnica, transparência total e compromisso inegociável com a qualidade.",
                            icon: (
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                            <p className="text-slate-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

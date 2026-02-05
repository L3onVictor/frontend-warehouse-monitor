export function BenefitsSection() {
    const benefits = [
        {
            title: "Redução de Desperdícios",
            description: "Evite prejuízos financeiros impedindo que falhas de refrigeração estraguem seus produtos.",
            icon: (
                <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Conformidade Total",
            description: "Relatórios prontos e detalhados para atender exigências da ANVISA e auditorias de qualidade.",
            icon: (
                <svg className="w-8 h-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: "Gestão à Distância",
            description: "Tenha o controle da sua empresa na palma da mão, acessando dados pelo celular ou computador.",
            icon: (
                <svg className="w-8 h-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    return (
        <section id="beneficios" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        Por que escolher o <span className="text-blue-700">Warehouse Monitor?</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Foco total em confiabilidade e facilidade de uso para o seu negócio.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((item, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

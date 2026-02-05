export function BenefitsSection() {
    const benefits = [
        {
            title: "Monitoramento 24/7",
            desc: "Sensores de alta precisão coletam dados a cada segundo, garantindo visibilidade total do seu ambiente, dia e noite.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "Alertas Inteligentes",
            desc: "Receba notificações instantâneas via E-mail ou SMS assim que qualquer parâmetro sair da faixa de segurança definida.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "Relatórios de Auditoria",
            desc: "Gere relatórios detalhados compatíveis com normas da ANVISA e órgãos reguladores em segundos.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
        }
    ];

    return (
        <section id="beneficios" className="py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-blue-400 font-bold uppercase tracking-wider mb-2">Por que escolher</h2>
                    <h3 className="text-3xl md:text-5xl font-bold">Tecnologia que Protege seu Patrimônio</h3>
                </div>

                <div className="space-y-24">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative group">
                                    <div className={`absolute -inset-4 bg-gradient-to-r ${idx % 2 === 0 ? 'from-blue-600 to-cyan-600' : 'from-purple-600 to-blue-600'} rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition duration-500`}></div>
                                    <img
                                        src={benefit.image}
                                        alt={benefit.title}
                                        className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition duration-500"
                                    />
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                <div className="inline-block p-3 bg-slate-800 rounded-lg border border-slate-700">
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                                        0{idx + 1}
                                    </span>
                                </div>
                                <h4 className="text-3xl font-bold">{benefit.title}</h4>
                                <p className="text-lg text-slate-400 leading-relaxed">
                                    {benefit.desc}
                                </p>
                                <ul className="space-y-3 pt-4">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Maior eficiência operacional
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Redução de perdas
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

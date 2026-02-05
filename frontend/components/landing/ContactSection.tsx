"use client";

export function ContactSection() {
    return (
        <section id="contato" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Contact Info */}
                    <div className="p-10 md:p-14 bg-gradient-to-br from-blue-900 to-slate-900 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-6">Fale Conosco</h3>
                            <p className="text-blue-200 mb-10 leading-relaxed">
                                Pronto para otimizar sua operação? Nossa equipe de consultores especialistas está aguardando seu contato para apresentar uma solução personalizada.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-800/50 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-300 font-medium">E-mail Comercial</p>
                                        <p className="text-lg font-semibold">contato@warehouse-monitor.com.br</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-800/50 rounded-lg">
                                        <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-300 font-medium">WhatsApp / Telefone</p>
                                        <p className="text-lg font-semibold">(11) 99999-9999</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-800/50 rounded-lg">
                                        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-300 font-medium">Sede Principal</p>
                                        <p className="text-lg font-semibold">Av. Paulista, 1000 - São Paulo, SP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Form (Visual Only) */}
                    <div className="p-10 md:p-14 bg-white">
                        <h4 className="text-2xl font-bold text-slate-800 mb-6">Solicite uma Proposta</h4>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Seu nome" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="voce@empresa.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Como podemos ajudar sua operação?"></textarea>
                            </div>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-lg mt-2">
                                Enviar Solicitação
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

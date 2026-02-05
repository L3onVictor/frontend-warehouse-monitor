export function ContactSection() {
    return (
        <section id="contato" className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl overflow-hidden shadow-2xl relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row p-8 md:p-16 gap-12 items-center">
                        <div className="flex-1 text-white text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para otimizar seu monitoramento?</h2>
                            <p className="text-blue-100 text-lg mb-8">
                                Fale com nossos especialistas e descubra como o Warehouse Monitor pode transformar sua operação hoje mesmo.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="font-medium">contato@warehousemonitor.com</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span className="font-medium">+55 (11) 99999-8888</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <form className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto">
                                <h3 className="text-gray-800 font-bold text-xl mb-4">Solicite uma Demo</h3>
                                <div className="space-y-3">
                                    <input type="text" placeholder="Seu Nome" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 placeholder-gray-400" />
                                    <input type="email" placeholder="Seu E-mail" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 placeholder-gray-400" />
                                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

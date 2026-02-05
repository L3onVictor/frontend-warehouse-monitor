export function ContactSection() {
    return (
        <section id="contato" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-5xl mx-auto bg-blue-900 rounded-2xl overflow-hidden shadow-xl">
                    <div className="flex flex-col md:flex-row p-8 md:p-12 gap-12 items-center">

                        <div className="flex-1 text-white text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-4">Descubra como podemos ajudar sua empresa</h2>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                Entre em contato para agendar uma demonstração personalizada e entender como o Warehouse Monitor se adapta ao seu negócio.
                            </p>
                            <div className="space-y-4 text-blue-50">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="font-medium text-lg">contato@warehousemonitor.com</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span className="font-medium text-lg">+55 (11) 99999-8888</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-96">
                            <form className="bg-white p-6 rounded-lg shadow-lg w-full">
                                <h3 className="text-gray-800 font-bold text-xl mb-4 text-center">Fale Conosco</h3>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Seu Nome" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 outline-none text-gray-800 placeholder-gray-500" />
                                    <input type="email" placeholder="Seu E-mail" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 outline-none text-gray-800 placeholder-gray-500" />
                                    <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded transition-colors uppercase tracking-wide text-sm">
                                        Solicitar Contato
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

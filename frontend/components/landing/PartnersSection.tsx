"use client";

export function PartnersSection() {
    // Fictive partners
    const partners = [
        "Nestlé", "Sadia", "Unilever", "Danone", "Coca-Cola", "Pepsico", "BRF", "JBS"
    ];

    // Duplicating list for infinite scroll effect
    const carouselItems = [...partners, ...partners, ...partners];

    return (
        <section id="parceiros" className="py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white opacity-80">
                    Empresas que confiam em nossa tecnologia
                </h2>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Overlay for Fade Effect */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 z-10"></div>
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900 z-10"></div>

                <div className="flex animate-infinite-scroll gap-16 w-max">
                    {carouselItems.map((partner, index) => (
                        <div key={index} className="flex items-center justify-center min-w-[150px]">
                            <span className="text-2xl md:text-3xl font-bold text-slate-400 dark:text-slate-600 grayscale hover:grayscale-0 hover:text-blue-600 transition-all duration-300 cursor-default select-none">
                                {partner}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
            @keyframes infinite-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-infinite-scroll {
                animation: infinite-scroll 40s linear infinite;
            }
        `}</style>
        </section>
    );
}

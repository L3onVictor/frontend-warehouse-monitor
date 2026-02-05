"use client";

export function PartnersSection() {
    // Placeholder logos for corporate partners
    const partners = [
        "Nestlé", "JBS", "Ambev", "Pfizer", "Bayer", "Coca-Cola", "Unilever", "BRF"
    ];

    return (
        <section id="parceiros" className="py-16 bg-white border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Empresas que confiam em nossa tecnologia</p>
            </div>

            <div className="relative">
                {/* Infinite Scroll Wrapper */}
                <div className="flex gap-16 animate-infinite-scroll w-max hover:[animation-play-state:paused]">
                    {[...partners, ...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            {/* 
                           Using text as placeholder for logos for reliability, 
                           in a real scenario <img> tags with corporate SVGs would be here.
                           Styling to look like generic heavy font logos.
                        */}
                            <span className="text-2xl md:text-3xl font-black text-slate-800 whitespace-nowrap px-4 select-none cursor-default font-serif">
                                {partner}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Gradient Fade Edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>

            <style jsx>{`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
        `}</style>
        </section>
    );
}

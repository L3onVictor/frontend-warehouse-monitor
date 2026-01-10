import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="text-sm">
                    <p>&copy; 2026 IoT Dashboard. Todos os direitos reservados.</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                    <p className="text-sm font-semibold text-gray-400">Desenvolvido por</p>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
                        <Link
                            href="https://github.com/L3onVictor"
                            target="_blank"
                            className="hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            Leonardo Victor
                        </Link>
                        <Link
                            href="https://github.com/NKRaff"
                            target="_blank"
                            className="hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            Rafael Felix
                        </Link>
                        <Link
                            href="https://github.com/VictorGDM"
                            target="_blank"
                            className="hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            Victor Machado
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
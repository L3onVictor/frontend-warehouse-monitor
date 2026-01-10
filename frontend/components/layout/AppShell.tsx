"use client";

import { usePathname } from "next/navigation";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicPage = pathname === "/login" || pathname === "/cadastro-usuario";

    if (isPublicPage) {
        return <main className="min-h-screen bg-white dark:bg-gray-900">{children}</main>;
    }

    return (
        <>
            <NavMenu />
            <main className="md:ml-64 min-h-screen flex flex-col pt-16 md:pt-0 transition-all duration-300">
                <div className="flex-1">{children}</div>
                <Footer />
            </main>
        </>
    );
}

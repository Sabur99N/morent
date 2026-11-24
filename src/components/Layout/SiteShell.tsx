"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const SiteShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const hideChrome = pathname?.startsWith("/admin-dashboard");

    if (hideChrome) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default SiteShell;

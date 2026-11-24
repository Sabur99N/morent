"use client";
import React, { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthContext from "@/context/Auth/AuthContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isLoggedIn, hydrated } = useContext(AuthContext);

    useEffect(() => {
        if (hydrated && !isLoggedIn) {
            router.replace(
                `/login?redirect=${encodeURIComponent(pathname ?? "/")}`
            );
        }
    }, [hydrated, isLoggedIn, pathname, router]);

    if (!hydrated || !isLoggedIn) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-body-bg">
                <div className="flex flex-col items-center gap-4">
                    <span className="h-10 w-10 animate-spin rounded-full border-4 border-border-color border-t-primary" />
                    <p className="text-sm text-secondary-300">
                        Checking access…
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;

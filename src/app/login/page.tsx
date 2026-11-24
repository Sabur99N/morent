import React, { Suspense } from "react";
import type { Metadata } from "next";
import LoginClient from "@/components/Auth/LoginClient";

export const metadata: Metadata = {
    title: "Log In",
    description: "Log in to your MORENT account to manage bookings and wishlist.",
};

const LoginPage = () => {
    return (
        <Suspense
            fallback={
                <div className="container py-20 text-center text-secondary-300">
                    Loading…
                </div>
            }
        >
            <LoginClient />
        </Suspense>
    );
};

export default LoginPage;

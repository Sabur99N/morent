import React, { Suspense } from "react";
import type { Metadata } from "next";
import PaymentSuccessClient from "@/components/PaymentSuccess/PaymentSuccessClient";

export const metadata: Metadata = {
    title: "Booking Confirmed",
};

const PaymentSuccessPage = () => {
    return (
        <Suspense
            fallback={
                <div className="container py-20 text-center text-secondary-300">
                    Loading…
                </div>
            }
        >
            <PaymentSuccessClient />
        </Suspense>
    );
};

export default PaymentSuccessPage;

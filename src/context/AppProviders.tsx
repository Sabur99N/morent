"use client";
import React from "react";
import AuthContextProvider from "./Auth/AuthContextProvider";
import { WishlistProvider } from "./WishlistContext";
import { BookingProvider } from "./BookingContext";
import { ToastProvider } from "./ToastContext";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ToastProvider>
            <AuthContextProvider>
                <WishlistProvider>
                    <BookingProvider>{children}</BookingProvider>
                </WishlistProvider>
            </AuthContextProvider>
        </ToastProvider>
    );
};

export default AppProviders;

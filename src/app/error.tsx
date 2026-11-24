"use client";
import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // In production this is where you'd forward to an error-reporting service.
        console.error(error);
    }, [error]);

    return (
        <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-5 py-16 text-center">
            <span className="animate-fade-in text-6xl">⚠️</span>
            <h4 className="animate-fade-in-up text-secondary-500">
                Something went wrong
            </h4>
            <p className="max-w-md animate-fade-in-up text-secondary-300">
                An unexpected error occurred while loading this page. You can try
                again or head back home.
            </p>
            <div className="flex animate-fade-in-up gap-3">
                <button
                    onClick={reset}
                    className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-main hover:bg-primary-hover"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="rounded-lg border border-border-color bg-white px-8 py-3 text-sm font-semibold text-secondary-500 transition-main hover:border-primary hover:text-primary"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

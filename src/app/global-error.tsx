"use client";
import React, { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                    background: "#f6f7f9",
                    color: "#1a202c",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 0,
                    padding: "1.5rem",
                }}
            >
                <div style={{ textAlign: "center", maxWidth: 420 }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
                        Something went wrong
                    </h1>
                    <p style={{ color: "#90a3bf", marginTop: 12 }}>
                        A critical error occurred. Please try reloading the page.
                    </p>
                    <button
                        onClick={reset}
                        style={{
                            marginTop: 24,
                            background: "#3563e9",
                            color: "#fff",
                            border: "none",
                            padding: "12px 32px",
                            borderRadius: 8,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}

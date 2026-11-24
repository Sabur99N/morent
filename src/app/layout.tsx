import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppProviders from "@/context/AppProviders";
import SiteShell from "@/components/Layout/SiteShell";

const primaryFont = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-plus-jakarta-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "MORENT — Car Rental",
        template: "%s | MORENT",
    },
    description:
        "MORENT is the best platform for car rental. Rent premium and everyday cars safely, reliably and at a low price.",
    keywords: [
        "car rental",
        "rent a car",
        "MORENT",
        "sports car",
        "SUV rental",
        "cheap car hire",
    ],
    applicationName: "MORENT",
    authors: [{ name: "MORENT" }],
    openGraph: {
        type: "website",
        siteName: "MORENT",
        title: "MORENT — Car Rental",
        description:
            "Rent premium and everyday cars safely, reliably and at a low price.",
        url: siteUrl,
    },
    twitter: {
        card: "summary_large_image",
        title: "MORENT — Car Rental",
        description:
            "Rent premium and everyday cars safely, reliably and at a low price.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3563e9",
    colorScheme: "light",
};

export default function RootLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${primaryFont.variable} scroll-smooth`}>
            <body className="bg-body-bg">
                <a href="#main-content" className="skip-link">
                    Skip to content
                </a>
                <AppProviders>
                    <SiteShell>{children}</SiteShell>
                </AppProviders>
            </body>
        </html>
    );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo/Logo";
import AuthGuard from "@/components/Auth/AuthGuard";
import {
    DashboardIcon,
    CarIcon,
    CalendarIcon,
    ArrowLeftIcon,
    MenuIcon,
    CloseIcon,
    LogoutIcon,
} from "@/components/icons/Icons";

const navItems = [
    { href: "/admin-dashboard", label: "Dashboard", icon: DashboardIcon },
    { href: "/admin-dashboard/cars", label: "Car Fleet", icon: CarIcon },
    {
        href: "/admin-dashboard/bookings",
        label: "Bookings",
        icon: CalendarIcon,
    },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const SidebarContent = (
        <div className="flex h-full flex-col">
            <div className="px-6 py-6">
                <Logo href="/admin-dashboard" />
            </div>
            <nav className="flex-1 px-4">
                <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-wide text-secondary-300">
                    Main Menu
                </p>
                <ul className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-main ${
                                        active
                                            ? "bg-primary text-white"
                                            : "text-secondary-300 hover:bg-body-bg hover:text-secondary-500"
                                    }`}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="border-t border-border-color p-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-secondary-300 transition-main hover:bg-body-bg hover:text-primary"
                >
                    <ArrowLeftIcon size={20} />
                    Back to site
                </Link>
                <Link
                    href="/login"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-secondary-300 transition-main hover:bg-body-bg hover:text-red"
                >
                    <LogoutIcon size={20} />
                    Sign out
                </Link>
            </div>
        </div>
    );

    return (
        <AuthGuard>
        <div className="min-h-screen bg-body-bg">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 animate-slide-in-left border-r border-border-color bg-white lg:block">
                {SidebarContent}
            </aside>

            {/* Mobile drawer */}
            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 animate-fade-in bg-black/40"
                        onClick={() => setOpen(false)}
                    />
                    <aside className="absolute inset-y-0 left-0 w-64 animate-slide-in-left bg-white">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-3 top-5 text-secondary-300"
                            aria-label="Close menu"
                        >
                            <CloseIcon size={22} />
                        </button>
                        {SidebarContent}
                    </aside>
                </div>
            )}

            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border-color bg-white px-4 py-4 md:px-8">
                    <button
                        onClick={() => setOpen(true)}
                        className="grid h-10 w-10 place-items-center rounded-lg border border-border-color text-secondary-500 lg:hidden"
                        aria-label="Open menu"
                    >
                        <MenuIcon size={20} />
                    </button>
                    <div className="hidden lg:block">
                        <h5 className="font-semibold text-secondary-500">
                            Admin Dashboard
                        </h5>
                        <p className="text-sm text-secondary-300">
                            Welcome back, manage your fleet and bookings.
                        </p>
                    </div>
                    <Link
                        href="/category"
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-main hover:bg-primary-hover"
                    >
                        View Storefront
                    </Link>
                </header>
                <main
                    id="main-content"
                    className="animate-fade-in p-4 md:p-8"
                >
                    {children}
                </main>
            </div>
        </div>
        </AuthGuard>
    );
};

export default DashboardLayout;

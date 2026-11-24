"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo/Logo";
import AuthContext from "@/context/Auth/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { UserImage } from "@/assets/images";
import {
    SearchIcon,
    FilterIcon,
    HeartIcon,
    BellIcon,
    SettingsIcon,
    UserIcon,
    LogoutIcon,
    DashboardIcon,
    CalendarIcon,
} from "@/components/icons/Icons";

const Header = () => {
    const router = useRouter();
    const { isLoggedIn, loggedInUser, userLogOut } = useContext(AuthContext);
    const { wishlist, hydrated } = useWishlist();
    const { showToast } = useToast();

    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(
            `/category${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`
        );
    };

    const handleLogout = () => {
        userLogOut();
        setMenuOpen(false);
        showToast("You have been logged out", "info");
        router.push("/");
    };

    const iconBtn =
        "grid h-11 w-11 place-items-center rounded-full border border-border-color text-secondary-500 transition-main hover:border-primary hover:text-primary";

    return (
        <header className="sticky top-0 z-40 border-b border-border-color bg-white">
            <div className="container flex flex-wrap items-center justify-between gap-4 py-4 md:py-5">
                <Logo />

                <form
                    onSubmit={submitSearch}
                    className="order-3 w-full md:order-2 md:w-auto md:max-w-md md:flex-1 md:px-8"
                >
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary-300">
                            <SearchIcon size={20} />
                        </span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full rounded-full border border-border-color py-3 pl-12 pr-12 text-sm transition-main focus:border-primary"
                            placeholder="Search a car by name or type"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-secondary-300 transition-main hover:text-primary"
                        >
                            <FilterIcon size={20} />
                        </button>
                    </div>
                </form>

                <div className="order-2 flex items-center gap-3 md:order-3">
                    <Link href="/wish-list" className={`relative ${iconBtn}`}>
                        <HeartIcon size={20} filled={hydrated && wishlist.length > 0} />
                        {hydrated && wishlist.length > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[10px] font-bold text-white">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    <button className={`relative hidden sm:grid ${iconBtn}`} aria-label="Notifications">
                        <BellIcon size={20} />
                        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red" />
                    </button>

                    <Link href="/admin-dashboard" className={`hidden sm:grid ${iconBtn}`} aria-label="Settings">
                        <SettingsIcon size={20} />
                    </Link>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="h-11 w-11 overflow-hidden rounded-full border border-border-color transition-main hover:border-primary"
                            aria-label="Account menu"
                        >
                            <Image
                                src={UserImage}
                                alt="Account"
                                className="h-full w-full object-cover"
                            />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-full z-50 mt-3 w-56 origin-top-right animate-fade-in-down overflow-hidden rounded-xl border border-border-color bg-white py-2 shadow-card">
                                {isLoggedIn ? (
                                    <>
                                        <div className="border-b border-border-color px-4 py-3">
                                            <p className="truncate font-semibold text-secondary-500">
                                                {loggedInUser?.userName}
                                            </p>
                                            <small className="text-secondary-300">
                                                Signed in
                                            </small>
                                        </div>
                                        <MenuLink
                                            href="/profile"
                                            icon={<UserIcon size={18} />}
                                            label="My Profile"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <MenuLink
                                            href="/profile"
                                            icon={<CalendarIcon size={18} />}
                                            label="My Bookings"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <MenuLink
                                            href="/admin-dashboard"
                                            icon={<DashboardIcon size={18} />}
                                            label="Dashboard"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red transition-main hover:bg-body-bg"
                                        >
                                            <LogoutIcon size={18} />
                                            Log out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <MenuLink
                                            href="/login"
                                            icon={<UserIcon size={18} />}
                                            label="Log in"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <MenuLink
                                            href="/register"
                                            icon={<UserIcon size={18} />}
                                            label="Create account"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <MenuLink
                                            href="/admin-dashboard"
                                            icon={<DashboardIcon size={18} />}
                                            label="Dashboard"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

const MenuLink = ({
    href,
    icon,
    label,
    onClick,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}) => (
    <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-500 transition-main hover:bg-body-bg hover:text-primary"
    >
        {icon}
        {label}
    </Link>
);

export default Header;

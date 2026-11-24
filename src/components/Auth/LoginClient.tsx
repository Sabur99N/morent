"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "@/context/Auth/AuthContext";
import CommonButton from "@/components/CommonButton/CommonButton";
import TextField from "@/components/Form/TextField";
import { useToast } from "@/context/ToastContext";
import Logo from "@/components/Logo/Logo";

const LoginClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const { userLogIn, isLoggedIn, hydrated } = useContext(AuthContext);
    const { showToast } = useToast();

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (hydrated && isLoggedIn) router.replace(redirectTo);
    }, [hydrated, isLoggedIn, redirectTo, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const result = userLogIn(userName, userPassword);
        if (result.ok) {
            showToast(result.message, "success");
            router.push(redirectTo);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="container flex min-h-[70vh] items-center justify-center py-12">
            <div className="w-full max-w-md animate-fade-in-up rounded-2xl bg-white p-8 shadow-soft">
                <div className="mb-6 flex flex-col items-center gap-3 text-center">
                    <Logo />
                    <h4 className="text-secondary-500">Welcome back</h4>
                    <p className="text-sm text-secondary-300">
                        Log in to manage your bookings and wishlist.
                    </p>
                </div>
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <TextField
                        label="User Name"
                        name="userName"
                        value={userName}
                        onChange={setUserName}
                        placeholder="Enter your username"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={userPassword}
                        onChange={setUserPassword}
                        placeholder="Enter your password"
                        required
                    />
                    {error && (
                        <p className="animate-fade-in text-sm text-red">
                            {error}
                        </p>
                    )}
                    <CommonButton
                        htmlType="submit"
                        type="primary"
                        size="lg"
                        label="Log In"
                        fullWidth
                    />
                </form>
                <p className="mt-6 text-center text-sm text-secondary-300">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-primary hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginClient;

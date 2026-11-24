"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Auth/AuthContext";
import CommonButton from "@/components/CommonButton/CommonButton";
import TextField from "@/components/Form/TextField";
import { useToast } from "@/context/ToastContext";
import Logo from "@/components/Logo/Logo";

const RegisterClient = () => {
    const router = useRouter();
    const { registerUser, isLoggedIn, hydrated } = useContext(AuthContext);
    const { showToast } = useToast();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (hydrated && isLoggedIn) router.replace("/");
    }, [hydrated, isLoggedIn, router]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (userName.trim().length < 3) {
            setError("Username must be at least 3 characters.");
            return;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (userPassword.length < 4) {
            setError("Password must be at least 4 characters.");
            return;
        }
        if (userPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        const result = registerUser(userName, userPassword, email);
        if (result.ok) {
            showToast("Account created! Please log in.", "success");
            router.push("/login");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="container flex min-h-[70vh] items-center justify-center py-12">
            <div className="w-full max-w-md animate-fade-in-up rounded-2xl bg-white p-8 shadow-soft">
                <div className="mb-6 flex flex-col items-center gap-3 text-center">
                    <Logo />
                    <h4 className="text-secondary-500">Create your account</h4>
                    <p className="text-sm text-secondary-300">
                        Join MORENT and start renting in minutes.
                    </p>
                </div>
                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <TextField
                        label="User Name"
                        name="userName"
                        value={userName}
                        onChange={setUserName}
                        placeholder="Choose a username"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="you@example.com"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={userPassword}
                        onChange={setUserPassword}
                        placeholder="Create a password"
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Re-enter your password"
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
                        label="Register"
                        fullWidth
                    />
                </form>
                <p className="mt-6 text-center text-sm text-secondary-300">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-primary hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterClient;

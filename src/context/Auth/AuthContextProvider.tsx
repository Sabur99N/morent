"use client";
import React, { useMemo, useCallback } from "react";
import AuthContext, { AuthResult } from "./AuthContext";
import { User } from "@/types";
import { usePersistedState } from "@/hooks/usePersistedState";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userDb, setUserDb, dbHydrated] = usePersistedState<User[]>(
        "userDb",
        []
    );
    const [loggedInUser, setLoggedInUser, userHydrated] =
        usePersistedState<User | null>("loggedInUser", null);

    const hydrated = dbHydrated && userHydrated;
    const isLoggedIn = !!loggedInUser;

    const registerUser = useCallback(
        (userName: string, userPassword: string, email?: string): AuthResult => {
            const name = userName.trim();
            if (!name || !userPassword) {
                return { ok: false, message: "All fields are required." };
            }
            const exists = userDb.some(
                (u) => u.userName.toLowerCase() === name.toLowerCase()
            );
            if (exists) {
                return { ok: false, message: "User already exists." };
            }
            const newUser: User = {
                userid:
                    typeof crypto !== "undefined" && crypto.randomUUID
                        ? crypto.randomUUID()
                        : Math.random().toString(36).slice(2),
                userName: name,
                userPassword,
                email,
                isRegistered: true,
            };
            setUserDb((prev) => [...prev, newUser]);
            return { ok: true, message: "Registration successful!" };
        },
        [userDb, setUserDb]
    );

    const userLogIn = useCallback(
        (userName: string, userPassword: string): AuthResult => {
            const user = userDb.find(
                (u) =>
                    u.userName.toLowerCase() === userName.trim().toLowerCase() &&
                    u.userPassword === userPassword
            );
            if (user) {
                setLoggedInUser(user);
                return { ok: true, message: `Welcome back, ${user.userName}!` };
            }
            return { ok: false, message: "Invalid username or password." };
        },
        [userDb, setLoggedInUser]
    );

    const userLogOut = useCallback(() => {
        setLoggedInUser(null);
    }, [setLoggedInUser]);

    const value = useMemo(
        () => ({
            userDb,
            isLoggedIn,
            loggedInUser,
            hydrated,
            registerUser,
            userLogIn,
            userLogOut,
        }),
        [
            userDb,
            isLoggedIn,
            loggedInUser,
            hydrated,
            registerUser,
            userLogIn,
            userLogOut,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

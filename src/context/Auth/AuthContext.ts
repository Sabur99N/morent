"use client";
import { createContext } from "react";
import { User } from "@/types";

export interface AuthResult {
    ok: boolean;
    message: string;
}

export interface AuthContextValue {
    userDb: User[];
    isLoggedIn: boolean;
    loggedInUser: User | null;
    hydrated: boolean;
    registerUser: (
        userName: string,
        userPassword: string,
        email?: string
    ) => AuthResult;
    userLogIn: (userName: string, userPassword: string) => AuthResult;
    userLogOut: () => void;
}

const noop = (): AuthResult => ({ ok: false, message: "Auth not ready" });

const AuthContext = createContext<AuthContextValue>({
    userDb: [],
    isLoggedIn: false,
    loggedInUser: null,
    hydrated: false,
    registerUser: noop,
    userLogIn: noop,
    userLogOut: () => {},
});

export default AuthContext;

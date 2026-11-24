import React from "react";
import type { Metadata } from "next";
import RegisterClient from "@/components/Auth/RegisterClient";

export const metadata: Metadata = {
    title: "Register",
    description: "Create a MORENT account and start renting cars in minutes.",
};

const RegisterPage = () => {
    return <RegisterClient />;
};

export default RegisterPage;

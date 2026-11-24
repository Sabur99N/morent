"use client";
import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "white" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonButtonProps {
    label: React.ReactNode;
    onClick?: () => void;
    type?: Variant;
    htmlType?: "button" | "submit" | "reset";
    disabled?: boolean;
    href?: string;
    fullWidth?: boolean;
    size?: Size;
    icon?: React.ReactNode;
    customClass?: string;
}

const variants: Record<Variant, string> = {
    primary:
        "bg-primary text-white hover:bg-primary-hover border border-transparent",
    secondary:
        "bg-info-500 text-white hover:brightness-95 border border-transparent",
    white: "bg-white text-secondary-500 border border-border-color hover:border-primary hover:text-primary",
    outline:
        "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-secondary-300 border border-transparent hover:text-primary",
};

const sizes: Record<Size, string> = {
    sm: "py-2 px-4 text-sm",
    md: "py-2.5 px-5 text-sm",
    lg: "py-3.5 px-8 text-base",
};

const CommonButton: React.FC<CommonButtonProps> = ({
    label,
    onClick,
    type = "primary",
    htmlType = "button",
    disabled,
    href,
    fullWidth,
    size = "md",
    icon,
    customClass = "",
}) => {
    const classes = [
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-main active:scale-[0.97]",
        variants[type],
        sizes[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
        customClass,
    ]
        .filter(Boolean)
        .join(" ");

    const content = (
        <>
            {icon}
            {label}
        </>
    );

    if (href && !disabled) {
        return (
            <Link href={href} className={classes} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={htmlType}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    );
};

export default CommonButton;

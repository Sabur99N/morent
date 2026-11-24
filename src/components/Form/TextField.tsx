"use client";
import React from "react";

interface TextFieldProps {
    label?: string;
    name?: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
    min?: string;
    max?: string;
    autoComplete?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const TextField: React.FC<TextFieldProps> = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required,
    error,
    className = "",
    min,
    max,
    autoComplete,
    inputMode,
}) => {
    const describedBy = error && name ? `${name}-error` : undefined;
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-semibold text-secondary-500"
                >
                    {label}
                    {required && <span className="text-red"> *</span>}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                min={min}
                max={max}
                autoComplete={autoComplete}
                inputMode={inputMode}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                onChange={(e) => onChange(e.target.value)}
                className={`rounded-lg border bg-body-bg px-4 py-3 text-sm text-secondary-500 transition-main placeholder:text-secondary-300 focus:bg-white ${
                    error ? "border-red" : "border-transparent focus:border-primary"
                }`}
            />
            {error && (
                <small id={describedBy} className="text-red">
                    {error}
                </small>
            )}
        </div>
    );
};

export default TextField;

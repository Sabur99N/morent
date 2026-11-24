"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";

export interface DropdownOption {
    label: string;
    value: string;
}

interface CommonDropdownProps {
    label?: string;
    placeholder?: string;
    options: DropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    compact?: boolean;
}

const CommonDropdown: React.FC<CommonDropdownProps> = ({
    label,
    placeholder = "Select",
    options,
    value,
    onChange,
    compact,
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selected = options.find((o) => o.value === value);

    return (
        <div className="relative w-full" ref={ref}>
            {label && (
                <p className="mb-2 font-bold text-secondary-500 text-base">
                    {label}
                </p>
            )}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`flex w-full items-center justify-between gap-2 ${
                    compact ? "text-sm" : "text-xs"
                } text-secondary-300 font-medium`}
            >
                <span className={selected ? "text-secondary-500" : ""}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDownIcon
                    size={16}
                    className={`transition-main text-secondary-400 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            {open && (
                <ul className="absolute left-0 top-full z-30 mt-2 max-h-60 w-full min-w-[160px] origin-top animate-fade-in-down overflow-auto rounded-lg border border-border-color bg-white py-1 shadow-card no-scrollbar">
                    {options.map((opt) => (
                        <li key={opt.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange?.(opt.value);
                                    setOpen(false);
                                }}
                                className={`block w-full px-4 py-2 text-left text-sm transition-main hover:bg-body-bg ${
                                    opt.value === value
                                        ? "text-primary font-semibold"
                                        : "text-secondary-500"
                                }`}
                            >
                                {opt.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommonDropdown;

"use client";
import React, { useEffect } from "react";
import { CloseIcon } from "@/components/icons/Icons";

interface CommonModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxWidth?: string;
}

const CommonModal: React.FC<CommonModalProps> = ({
    open,
    onClose,
    title,
    children,
    maxWidth = "max-w-lg",
}) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[90] flex animate-fade-in items-end justify-center bg-black/40 p-4 sm:items-center">
            <div
                className="absolute inset-0"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className={`relative w-full ${maxWidth} max-h-[90vh] animate-scale-in overflow-auto rounded-2xl bg-white p-6 shadow-card no-scrollbar`}
                role="dialog"
                aria-modal="true"
            >
                <div className="mb-4 flex items-center justify-between">
                    {title && (
                        <h5 className="font-semibold text-secondary-500">
                            {title}
                        </h5>
                    )}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-auto grid h-9 w-9 place-items-center rounded-full text-secondary-300 transition-main hover:bg-body-bg hover:text-secondary-500"
                    >
                        <CloseIcon size={20} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default CommonModal;

"use client";
import React, {
    createContext,
    useContext,
    useCallback,
    useState,
    useMemo,
} from "react";
import { ToastMessage } from "@/types";

interface ToastContextValue {
    showToast: (message: string, type?: ToastMessage["type"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, type: ToastMessage["type"] = "success") => {
            const id = ++toastId;
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => removeToast(id), 3200);
        },
        [removeToast]
    );

    const value = useMemo(() => ({ showToast }), [showToast]);

    const styles: Record<ToastMessage["type"], string> = {
        success: "bg-primary",
        error: "bg-red",
        info: "bg-secondary-500",
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3"
                aria-live="polite"
                aria-atomic="true"
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="status"
                        className={`${styles[toast.type]} flex min-w-[220px] max-w-xs animate-slide-in-right items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-card`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextValue => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within a ToastProvider");
    return ctx;
};

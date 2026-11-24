"use client";
import React, { createContext, useContext, useCallback, useMemo } from "react";
import { Booking } from "@/types";
import { usePersistedState } from "@/hooks/usePersistedState";

interface BookingContextValue {
    bookings: Booking[];
    hydrated: boolean;
    addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => Booking;
    cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export const BookingProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [bookings, setBookings, hydrated] = usePersistedState<Booking[]>(
        "bookings",
        []
    );

    const addBooking = useCallback(
        (booking: Omit<Booking, "id" | "createdAt" | "status">) => {
            const newBooking: Booking = {
                ...booking,
                id:
                    typeof crypto !== "undefined" && crypto.randomUUID
                        ? crypto.randomUUID()
                        : Math.random().toString(36).slice(2),
                createdAt: new Date().toISOString(),
                status: "Upcoming",
            };
            setBookings((prev) => [newBooking, ...prev]);
            return newBooking;
        },
        [setBookings]
    );

    const cancelBooking = useCallback(
        (id: string) => {
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === id ? { ...b, status: "Cancelled" as const } : b
                )
            );
        },
        [setBookings]
    );

    const value = useMemo(
        () => ({ bookings, hydrated, addBooking, cancelBooking }),
        [bookings, hydrated, addBooking, cancelBooking]
    );

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBookings = (): BookingContextValue => {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error("useBookings must be used within a BookingProvider");
    return ctx;
};

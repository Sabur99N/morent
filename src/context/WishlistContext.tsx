"use client";
import React, { createContext, useContext, useCallback, useMemo } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";

interface WishlistContextValue {
    wishlist: number[];
    hydrated: boolean;
    addToWishlist: (carId: number) => void;
    removeFromWishlist: (carId: number) => void;
    toggleWishlist: (carId: number) => void;
    isInWishlist: (carId: number) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [wishlist, setWishlist, hydrated] = usePersistedState<number[]>(
        "wishlist",
        []
    );

    const addToWishlist = useCallback(
        (carId: number) => {
            setWishlist((prev) =>
                prev.includes(carId) ? prev : [...prev, carId]
            );
        },
        [setWishlist]
    );

    const removeFromWishlist = useCallback(
        (carId: number) => {
            setWishlist((prev) => prev.filter((id) => id !== carId));
        },
        [setWishlist]
    );

    const toggleWishlist = useCallback(
        (carId: number) => {
            setWishlist((prev) =>
                prev.includes(carId)
                    ? prev.filter((id) => id !== carId)
                    : [...prev, carId]
            );
        },
        [setWishlist]
    );

    const isInWishlist = useCallback(
        (carId: number) => wishlist.includes(carId),
        [wishlist]
    );

    const clearWishlist = useCallback(() => setWishlist([]), [setWishlist]);

    const value = useMemo(
        () => ({
            wishlist,
            hydrated,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            clearWishlist,
        }),
        [
            wishlist,
            hydrated,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            clearWishlist,
        ]
    );

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = (): WishlistContextValue => {
    const ctx = useContext(WishlistContext);
    if (!ctx) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return ctx;
};

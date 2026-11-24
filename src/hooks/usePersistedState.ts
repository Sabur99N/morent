"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A localStorage-backed state hook that is safe for server-side rendering.
 * State starts from `initial` on both server and first client render (avoiding
 * hydration mismatches), then rehydrates from localStorage after mount.
 */
export function usePersistedState<T>(key: string, initial: T) {
    const [state, setState] = useState<T>(initial);
    const [hydrated, setHydrated] = useState(false);
    const firstLoad = useRef(true);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(key);
            if (stored !== null) {
                // Rehydrating React state from an external store (localStorage)
                // after mount is a valid effect; the strict rule flags the call.
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setState(JSON.parse(stored) as T);
            }
        } catch {
            /* ignore corrupted storage */
        }
        setHydrated(true);
    }, [key]);

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }
        if (!hydrated) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch {
            /* ignore quota errors */
        }
    }, [key, state, hydrated]);

    return [state, setState, hydrated] as const;
}

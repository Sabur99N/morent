"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PickDrop, { PickDropValue } from "../pick-drop/PickDrop";
import { SwapIcon } from "@/components/icons/Icons";

const empty: PickDropValue = { location: "", date: "", time: "" };

const SearchBox = () => {
    const router = useRouter();
    const [pickUp, setPickUp] = useState<PickDropValue>(empty);
    const [dropOff, setDropOff] = useState<PickDropValue>(empty);

    const swap = () => {
        setPickUp(dropOff);
        setDropOff(pickUp);
    };

    const search = () => {
        const params = new URLSearchParams();
        if (pickUp.location) params.set("pickup", pickUp.location);
        if (dropOff.location) params.set("dropoff", dropOff.location);
        if (pickUp.date) params.set("date", pickUp.date);
        router.push(`/category${params.toString() ? `?${params}` : ""}`);
    };

    return (
        <div className="relative flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-8">
            <PickDrop title="Pick-Up" value={pickUp} onChange={setPickUp} />

            <div className="flex justify-center lg:block">
                <button
                    type="button"
                    onClick={swap}
                    aria-label="Swap pick-up and drop-off"
                    className="rounded-xl bg-primary p-4 text-white shadow-card transition-main hover:bg-primary-hover"
                >
                    <SwapIcon size={20} />
                </button>
            </div>

            <PickDrop title="Drop-Off" value={dropOff} onChange={setDropOff} />

            <button
                type="button"
                onClick={search}
                className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-card transition-main hover:bg-primary-hover lg:block"
            >
                Search Cars
            </button>
            <button
                type="button"
                onClick={search}
                className="w-full rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-card transition-main hover:bg-primary-hover lg:hidden"
            >
                Search Cars
            </button>
        </div>
    );
};

export default SearchBox;

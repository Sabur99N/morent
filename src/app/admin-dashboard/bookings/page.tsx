"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useBookings } from "@/context/BookingContext";
import StatusBadge from "@/components/Dashboard/StatusBadge";
import { TrashIcon } from "@/components/icons/Icons";

const BookingsPage = () => {
    const { bookings, cancelBooking, hydrated } = useBookings();

    if (!hydrated) {
        return (
            <div className="rounded-2xl bg-white p-12 text-center text-secondary-300">
                Loading bookings…
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h5 className="font-semibold text-secondary-500">Bookings</h5>
                <p className="text-sm text-secondary-300">
                    {bookings.length} total booking
                    {bookings.length === 1 ? "" : "s"}
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="rounded-2xl bg-white p-16 text-center">
                    <p className="text-secondary-300">
                        No bookings yet.{" "}
                        <Link
                            href="/category"
                            className="font-semibold text-primary hover:underline"
                        >
                            Book a car
                        </Link>{" "}
                        to see it here.
                    </p>
                </div>
            ) : (
                <div className="rounded-2xl bg-white p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead>
                                <tr className="text-secondary-300">
                                    <th className="pb-4 font-medium">Car</th>
                                    <th className="pb-4 font-medium">
                                        Pick-Up
                                    </th>
                                    <th className="pb-4 font-medium">
                                        Drop-Off
                                    </th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium">Total</th>
                                    <th className="pb-4 text-right font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b) => (
                                    <tr
                                        key={b.id}
                                        className="border-t border-border-color"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="grid h-12 w-16 place-items-center rounded-lg bg-body-bg">
                                                    <Image
                                                        src={b.carImage}
                                                        alt={b.carBrand}
                                                        width={60}
                                                        height={30}
                                                        className="h-auto w-14 object-contain"
                                                    />
                                                </div>
                                                <Link
                                                    href={`/cars/${b.carId}`}
                                                    className="font-semibold text-secondary-500 hover:text-primary"
                                                >
                                                    {b.carBrand}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="py-4 text-secondary-400">
                                            {b.pickUpLocation}
                                            <br />
                                            <span className="text-xs">
                                                {b.pickUpDate}
                                            </span>
                                        </td>
                                        <td className="py-4 text-secondary-400">
                                            {b.dropOffLocation}
                                            <br />
                                            <span className="text-xs">
                                                {b.dropOffDate}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <StatusBadge status={b.status} />
                                        </td>
                                        <td className="py-4 font-semibold text-secondary-500">
                                            ${b.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="py-4 text-right">
                                            {b.status === "Upcoming" ? (
                                                <button
                                                    onClick={() =>
                                                        cancelBooking(b.id)
                                                    }
                                                    className="inline-flex items-center gap-1 text-sm font-semibold text-red hover:underline"
                                                >
                                                    <TrashIcon size={16} />
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span className="text-sm text-secondary-300">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsPage;

"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import StatCard from "@/components/Dashboard/StatCard";
import StatusBadge from "@/components/Dashboard/StatusBadge";
import Rating from "@/components/Rating/Rating";
import { getAllCars } from "@/lib/cars";
import { useBookings } from "@/context/BookingContext";
import { useWishlist } from "@/context/WishlistContext";
import {
    CarIcon,
    CalendarIcon,
    ChartIcon,
    HeartIcon,
} from "@/components/icons/Icons";

const AdminDashboard = () => {
    const cars = getAllCars();
    const { bookings } = useBookings();
    const { wishlist } = useWishlist();

    const revenue = useMemo(
        () =>
            bookings
                .filter((b) => b.status !== "Cancelled")
                .reduce((sum, b) => sum + b.totalPrice, 0),
        [bookings]
    );

    const typeBreakdown = useMemo(() => {
        const counts: Record<string, number> = {};
        cars.forEach((c) => (counts[c.type] = (counts[c.type] ?? 0) + 1));
        const total = cars.length || 1;
        return Object.entries(counts)
            .map(([type, count]) => ({
                type,
                count,
                pct: Math.round((count / total) * 100),
            }))
            .sort((a, b) => b.count - a.count);
    }, [cars]);

    const topCars = useMemo(
        () => [...cars].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5),
        [cars]
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    index={0}
                    label="Total Cars"
                    value={cars.length}
                    hint="Across all categories"
                    icon={<CarIcon size={24} />}
                    accent="bg-primary"
                />
                <StatCard
                    index={1}
                    label="Total Bookings"
                    value={bookings.length}
                    hint={`${
                        bookings.filter((b) => b.status === "Upcoming").length
                    } upcoming`}
                    icon={<CalendarIcon size={24} />}
                    accent="bg-info-500"
                />
                <StatCard
                    index={2}
                    label="Total Revenue"
                    value={`$${revenue.toFixed(0)}`}
                    hint="From confirmed rentals"
                    icon={<ChartIcon size={24} />}
                    accent="bg-emerald-500"
                />
                <StatCard
                    index={3}
                    label="Wishlisted"
                    value={wishlist.length}
                    hint="Cars saved by users"
                    icon={<HeartIcon size={24} />}
                    accent="bg-red"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="rounded-2xl bg-white p-6 xl:col-span-2">
                    <h6 className="mb-6 font-semibold text-secondary-500">
                        Fleet by Car Type
                    </h6>
                    <div className="flex flex-col gap-5">
                        {typeBreakdown.map((row) => (
                            <div key={row.type}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-semibold text-secondary-500">
                                        {row.type}
                                    </span>
                                    <span className="text-secondary-300">
                                        {row.count} cars · {row.pct}%
                                    </span>
                                </div>
                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-body-bg">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${row.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-6">
                    <h6 className="mb-6 font-semibold text-secondary-500">
                        Top Rated Cars
                    </h6>
                    <div className="flex flex-col gap-5">
                        {topCars.map((car) => (
                            <Link
                                key={car.id}
                                href={`/cars/${car.id}`}
                                className="flex items-center gap-3"
                            >
                                <div className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-body-bg">
                                    <Image
                                        src={car.imageSrc}
                                        alt={car.brand}
                                        width={60}
                                        height={30}
                                        className="h-auto w-14 object-contain"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold text-secondary-500">
                                        {car.brand}
                                    </p>
                                    <Rating value={car.rating} size={14} />
                                </div>
                                <span className="text-sm font-semibold text-secondary-500">
                                    ${car.pricePerDay.toFixed(0)}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h6 className="font-semibold text-secondary-500">
                        Recent Bookings
                    </h6>
                    <Link
                        href="/admin-dashboard/bookings"
                        className="text-sm font-semibold text-primary hover:underline"
                    >
                        View all
                    </Link>
                </div>
                {bookings.length === 0 ? (
                    <p className="py-8 text-center text-secondary-300">
                        No bookings yet. Rentals will appear here once customers
                        book a car.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left text-sm">
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
                                    <th className="pb-4 text-right font-medium">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.slice(0, 5).map((b) => (
                                    <tr
                                        key={b.id}
                                        className="border-t border-border-color"
                                    >
                                        <td className="py-4 font-semibold text-secondary-500">
                                            {b.carBrand}
                                        </td>
                                        <td className="py-4 text-secondary-400">
                                            {b.pickUpLocation} · {b.pickUpDate}
                                        </td>
                                        <td className="py-4 text-secondary-400">
                                            {b.dropOffLocation} · {b.dropOffDate}
                                        </td>
                                        <td className="py-4">
                                            <StatusBadge status={b.status} />
                                        </td>
                                        <td className="py-4 text-right font-semibold text-secondary-500">
                                            ${b.totalPrice.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllCars } from "@/lib/cars";
import Rating from "@/components/Rating/Rating";
import { SearchIcon, ArrowRightIcon } from "@/components/icons/Icons";

const CarsInventoryPage = () => {
    const cars = getAllCars();
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return cars;
        return cars.filter(
            (c) =>
                c.brand.toLowerCase().includes(q) ||
                c.type.toLowerCase().includes(q)
        );
    }, [cars, search]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h5 className="font-semibold text-secondary-500">
                        Car Fleet
                    </h5>
                    <p className="text-sm text-secondary-300">
                        {filtered.length} of {cars.length} cars
                    </p>
                </div>
                <div className="relative sm:w-72">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary-300">
                        <SearchIcon size={18} />
                    </span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search fleet"
                        className="w-full rounded-full border border-border-color bg-white py-2.5 pl-11 pr-4 text-sm transition-main focus:border-primary"
                    />
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead>
                            <tr className="text-secondary-300">
                                <th className="pb-4 font-medium">Car</th>
                                <th className="pb-4 font-medium">Type</th>
                                <th className="pb-4 font-medium">Capacity</th>
                                <th className="pb-4 font-medium">Rating</th>
                                <th className="pb-4 font-medium">Price/day</th>
                                <th className="pb-4 text-right font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((car) => (
                                <tr
                                    key={car.id}
                                    className="border-t border-border-color"
                                >
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="grid h-12 w-16 place-items-center rounded-lg bg-body-bg">
                                                <Image
                                                    src={car.imageSrc}
                                                    alt={car.brand}
                                                    width={60}
                                                    height={30}
                                                    className="h-auto w-14 object-contain"
                                                />
                                            </div>
                                            <span className="font-semibold text-secondary-500">
                                                {car.brand}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-secondary-400">
                                        {car.type}
                                    </td>
                                    <td className="py-4 text-secondary-400">
                                        {car.capacity}
                                    </td>
                                    <td className="py-4">
                                        <Rating value={car.rating} size={14} />
                                    </td>
                                    <td className="py-4 font-semibold text-secondary-500">
                                        ${car.pricePerDay.toFixed(2)}
                                    </td>
                                    <td className="py-4 text-right">
                                        <Link
                                            href={`/cars/${car.id}`}
                                            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                                        >
                                            View
                                            <ArrowRightIcon size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CarsInventoryPage;

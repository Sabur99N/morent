"use client";
import React from "react";
import Link from "next/link";
import CarGrid from "@/components/CarGrid/CarGrid";
import CommonButton from "@/components/CommonButton/CommonButton";
import { useWishlist } from "@/context/WishlistContext";
import { getAllCars } from "@/lib/cars";
import { HeartIcon } from "@/components/icons/Icons";

const WishlistPage = () => {
    const { wishlist, hydrated, clearWishlist } = useWishlist();
    const wishlistCars = getAllCars().filter((car) => wishlist.includes(car.id));

    if (!hydrated) {
        return (
            <div className="container py-20 text-center text-secondary-300">
                Loading your wishlist…
            </div>
        );
    }

    return (
        <div className="container animate-fade-in py-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-secondary-500">My Wishlist</h3>
                    <p className="mt-1 text-secondary-300">
                        {wishlistCars.length} car
                        {wishlistCars.length === 1 ? "" : "s"} saved
                    </p>
                </div>
                {wishlistCars.length > 0 && (
                    <CommonButton
                        type="white"
                        label="Clear all"
                        onClick={clearWishlist}
                    />
                )}
            </div>

            {wishlistCars.length === 0 ? (
                <div className="flex flex-col items-center gap-5 rounded-2xl bg-white px-6 py-20 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-body-bg text-secondary-300">
                        <HeartIcon size={32} />
                    </span>
                    <div>
                        <h5 className="font-semibold text-secondary-500">
                            Your wishlist is empty
                        </h5>
                        <p className="mt-1 text-secondary-300">
                            Browse our fleet and tap the heart to save your
                            favourite cars.
                        </p>
                    </div>
                    <Link
                        href="/category"
                        className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-main hover:bg-primary-hover"
                    >
                        Browse cars
                    </Link>
                </div>
            ) : (
                <CarGrid cars={wishlistCars} />
            )}
        </div>
    );
};

export default WishlistPage;

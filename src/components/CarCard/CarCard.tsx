"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Car } from "@/types";
import CommonButton from "../CommonButton/CommonButton";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import {
    HeartIcon,
    GasIcon,
    SteeringIcon,
    UsersIcon,
} from "@/components/icons/Icons";

interface CarCardProps {
    car: Car;
    index?: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { showToast } = useToast();
    const liked = isInWishlist(car.id);

    const handleLikeToggle = () => {
        toggleWishlist(car.id);
        showToast(
            liked
                ? `${car.brand} removed from wishlist`
                : `${car.brand} added to wishlist`,
            liked ? "info" : "success"
        );
    };

    const delay =
        index !== undefined ? `${Math.min(index, 8) * 60}ms` : undefined;

    return (
        <div
            className="group flex h-full animate-fade-in-up flex-col rounded-2xl bg-white p-5 shadow-soft transition-main hover:-translate-y-1 hover:shadow-card md:p-6"
            style={{ animationDelay: delay }}
        >
            <div className="flex items-start justify-between">
                <div>
                    <Link
                        href={`/cars/${car.id}`}
                        className="font-bold text-secondary-500 transition-main hover:text-primary md:text-lg"
                    >
                        {car.brand}
                    </Link>
                    <small className="block font-bold text-secondary-300">
                        {car.type}
                    </small>
                </div>
                <button
                    onClick={handleLikeToggle}
                    aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                    className={`transition-main active:scale-90 ${
                        liked ? "text-red" : "text-secondary-300 hover:text-red"
                    }`}
                >
                    <HeartIcon filled={liked} />
                </button>
            </div>

            <Link
                href={`/cars/${car.id}`}
                className="relative my-6 flex flex-1 items-center justify-center overflow-hidden"
            >
                <Image
                    src={car.imageSrc}
                    alt={car.brand}
                    width={232}
                    height={100}
                    className="h-auto w-full max-w-[14rem] object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                />
            </Link>

            <div className="flex items-center justify-between gap-2 text-secondary-300">
                <span className="flex items-center gap-1.5">
                    <GasIcon size={20} />
                    <small>{car.fuel}</small>
                </span>
                <span className="flex items-center gap-1.5">
                    <SteeringIcon size={20} />
                    <small>{car.transmission}</small>
                </span>
                <span className="flex items-center gap-1.5">
                    <UsersIcon size={20} />
                    <small>{car.capacity}</small>
                </span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-2">
                <div>
                    <p className="font-bold text-secondary-500 md:text-lg">
                        ${car.pricePerDay.toFixed(2)}
                        <small className="font-medium text-secondary-300">
                            {" "}
                            / day
                        </small>
                    </p>
                    {car.oldPrice && car.oldPrice > car.pricePerDay && (
                        <small className="text-secondary-300 line-through">
                            ${car.oldPrice.toFixed(2)}
                        </small>
                    )}
                </div>
                <CommonButton
                    type="primary"
                    label="Rent Now"
                    href={`/cars/${car.id}`}
                />
            </div>
        </div>
    );
};

export default CarCard;

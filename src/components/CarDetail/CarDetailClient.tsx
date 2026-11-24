"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Car, Review } from "@/types";
import Rating from "@/components/Rating/Rating";
import Reviews from "@/components/Reviews/Reviews";
import CarCard from "@/components/CarCard/CarCard";
import RentalForm from "@/components/RentalForm/RentalForm";
import CommonButton from "@/components/CommonButton/CommonButton";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { HeartIcon } from "@/components/icons/Icons";

interface CarDetailClientProps {
    car: Car;
    related: Car[];
    reviews: Review[];
}

const galleryFrames = [
    "from-primary to-info-500",
    "from-secondary-500 to-secondary-400",
    "from-info-500 to-primary",
];

const Spec = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between gap-4">
        <span className="text-secondary-300">{label}</span>
        <span className="font-semibold text-secondary-500">{value}</span>
    </div>
);

const CarDetailClient: React.FC<CarDetailClientProps> = ({
    car,
    related,
    reviews,
}) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { showToast } = useToast();
    const [activeFrame, setActiveFrame] = useState(0);
    const bookingRef = useRef<HTMLDivElement>(null);
    const liked = isInWishlist(car.id);

    const scrollToBooking = () =>
        bookingRef.current?.scrollIntoView({ behavior: "smooth" });

    const handleLike = () => {
        toggleWishlist(car.id);
        showToast(
            liked
                ? `${car.brand} removed from wishlist`
                : `${car.brand} added to wishlist`,
            liked ? "info" : "success"
        );
    };

    return (
        <div className="container py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Gallery */}
                <div className="flex animate-fade-in-up flex-col gap-6">
                    <div
                        className={`relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${galleryFrames[activeFrame]} p-8 md:min-h-[360px]`}
                    >
                        <div className="absolute left-6 top-6 max-w-[16rem] md:left-8 md:top-8">
                            <h4 className="text-white">
                                Sports car with the best design and acceleration
                            </h4>
                            <p className="mt-3 text-sm text-white/85">
                                Safety and comfort while driving a futuristic and
                                elegant sports car.
                            </p>
                        </div>
                        <Image
                            src={car.imageSrc}
                            alt={car.brand}
                            width={420}
                            height={200}
                            className="mt-24 h-auto w-full max-w-md object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        {galleryFrames.map((frame, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveFrame(i)}
                                className={`grid h-24 place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${frame} p-3 transition-main md:h-28 ${
                                    activeFrame === i
                                        ? "ring-2 ring-primary ring-offset-2"
                                        : "opacity-80 hover:opacity-100"
                                }`}
                            >
                                <Image
                                    src={car.imageSrc}
                                    alt={`${car.brand} view ${i + 1}`}
                                    width={140}
                                    height={70}
                                    className="h-auto w-full max-w-[7rem] object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div
                    className="flex animate-fade-in-up flex-col rounded-2xl bg-white p-6 md:p-8"
                    style={{ animationDelay: "120ms" }}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-secondary-500">{car.brand}</h3>
                            <div className="mt-3">
                                <Rating
                                    value={car.rating}
                                    reviewCount={car.reviewCount}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleLike}
                            aria-label={
                                liked ? "Remove from wishlist" : "Add to wishlist"
                            }
                            className={
                                liked
                                    ? "text-red"
                                    : "text-secondary-300 hover:text-red"
                            }
                        >
                            <HeartIcon size={26} filled={liked} />
                        </button>
                    </div>

                    <p className="mt-6 text-secondary-400">{car.description}</p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-16">
                        <Spec label="Type Car" value={car.type} />
                        <Spec label="Capacity" value={car.capacity} />
                        <Spec label="Steering" value={car.transmission} />
                        <Spec label="Gasoline" value={car.fuel} />
                    </div>

                    <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-2xl font-bold text-secondary-500">
                                ${car.pricePerDay.toFixed(2)}
                                <small className="text-base font-medium text-secondary-300">
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
                            size="lg"
                            label="Rent Now"
                            onClick={scrollToBooking}
                        />
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <section className="mt-8">
                <Reviews reviews={reviews} />
            </section>

            {/* Booking */}
            <section ref={bookingRef} className="mt-12 scroll-mt-28">
                <h4 className="mb-6 text-secondary-500">Complete your booking</h4>
                <RentalForm car={car} />
            </section>

            {/* Related */}
            {related.length > 0 && (
                <section className="mt-12">
                    <div className="mb-5 flex items-center justify-between">
                        <h6 className="font-semibold text-secondary-300">
                            Recent Cars
                        </h6>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((c, i) => (
                            <CarCard key={c.id} car={c} index={i} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default CarDetailClient;

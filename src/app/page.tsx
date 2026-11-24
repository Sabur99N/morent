import React from "react";
import Link from "next/link";
import BannerCard from "@/components/BannerCard/BannerCard";
import SearchBox from "@/components/SearchBox/SearchBox";
import CarCard from "@/components/CarCard/CarCard";
import { CardBgOne, CardBgTwo, CarImageOne, CarImageTwo } from "@/assets/images";
import { getPopularCars, getRecommendedCars } from "@/lib/cars";

const Home = () => {
    const popularCars = getPopularCars().slice(0, 4);
    const recommendedCars = getRecommendedCars().slice(0, 8);

    return (
        <div className="container py-8">
            {/* Hero banners */}
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="animate-fade-in-up">
                    <BannerCard
                        title="The Best Platform for Car Rental"
                        description="Ease of doing a car rental safely and reliably. Of course at a low price."
                        image={CarImageOne}
                        backgroundImage={CardBgOne}
                        buttonType="primary"
                    />
                </div>
                <div
                    className="hidden animate-fade-in-up md:block"
                    style={{ animationDelay: "120ms" }}
                >
                    <BannerCard
                        title="Easy way to rent a car at a low price"
                        description="Providing cheap car rental services and safe and comfortable facilities."
                        image={CarImageTwo}
                        backgroundImage={CardBgTwo}
                        buttonType="secondary"
                    />
                </div>
            </section>

            {/* Search widget */}
            <section
                className="mt-8 animate-fade-in-up pb-6 lg:pb-8"
                style={{ animationDelay: "180ms" }}
            >
                <SearchBox />
            </section>

            {/* Popular cars */}
            <section className="mt-6">
                <div className="mb-5 flex items-center justify-between">
                    <h6 className="font-semibold text-secondary-300">
                        Popular Cars
                    </h6>
                    <Link
                        href="/category"
                        className="text-sm font-semibold text-primary transition-main hover:underline"
                    >
                        View All
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {popularCars.map((car, i) => (
                        <CarCard key={car.id} car={car} index={i} />
                    ))}
                </div>
            </section>

            {/* Recommendation cars */}
            <section className="mt-10">
                <div className="mb-5 flex items-center justify-between">
                    <h6 className="font-semibold text-secondary-300">
                        Recommendation Car
                    </h6>
                    <Link
                        href="/category"
                        className="text-sm font-semibold text-primary transition-main hover:underline"
                    >
                        View All
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {recommendedCars.map((car, i) => (
                        <CarCard key={car.id} car={car} index={i} />
                    ))}
                </div>
            </section>

            {/* Show more */}
            <div className="mt-10 flex justify-center">
                <Link
                    href="/category"
                    className="rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-main hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-card"
                >
                    Show more car
                </Link>
            </div>
        </div>
    );
};

export default Home;

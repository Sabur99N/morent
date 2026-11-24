import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CarDetailClient from "@/components/CarDetail/CarDetailClient";
import { getAllCars, getCarById, getRelatedCars } from "@/lib/cars";
import { reviewsData } from "@/data/reviewsData";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllCars().map((car) => ({ id: String(car.id) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const car = getCarById(Number(id));
    if (!car) return { title: "Car not found" };
    return {
        title: car.brand,
        description: car.description,
    };
}

const CarDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const car = getCarById(Number(id));

    if (!car) {
        notFound();
    }

    const related = getRelatedCars(car);

    return (
        <CarDetailClient car={car} related={related} reviews={reviewsData} />
    );
};

export default CarDetailPage;

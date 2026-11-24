import React from "react";
import CarCard from "../CarCard/CarCard";
import { Car } from "@/types";

interface CarGridProps {
    cars: Car[];
    emptyMessage?: string;
}

const CarGrid: React.FC<CarGridProps> = ({
    cars,
    emptyMessage = "No cars found.",
}) => {
    if (cars.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-12 text-center text-secondary-300">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
            ))}
        </div>
    );
};

export default CarGrid;

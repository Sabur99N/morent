import carsJson from "@/data/carsData.json";
import { Car } from "@/types";

export const cars = carsJson as Car[];

export const getAllCars = (): Car[] => cars;

export const getCarById = (id: number): Car | undefined =>
    cars.find((car) => car.id === id);

export const getPopularCars = (): Car[] => cars.filter((car) => car.popular);

export const getRecommendedCars = (): Car[] =>
    cars.filter((car) => !car.popular);

export const getRelatedCars = (car: Car, limit = 3): Car[] =>
    cars.filter((c) => c.id !== car.id && c.type === car.type).slice(0, limit);

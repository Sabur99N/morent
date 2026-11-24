export interface Car {
    id: number;
    brand: string;
    type: CarType;
    pricePerDay: number;
    oldPrice?: number;
    fuel: string;
    transmission: string;
    capacity: string;
    seats: number;
    rating: number;
    reviewCount: number;
    description: string;
    imageSrc: string;
    gallery: string[];
    popular?: boolean;
}

export type CarType =
    | "Sport"
    | "SUV"
    | "Sedan"
    | "Hatchback"
    | "MPV"
    | "Coupe"
    | "Electric";

export interface Review {
    id: number;
    name: string;
    title: string;
    date: string;
    rating: number;
    avatar: string;
    comment: string;
}

export interface User {
    userid: string;
    userName: string;
    userPassword: string;
    email?: string;
    isRegistered: boolean;
}

export interface Booking {
    id: string;
    carId: number;
    carBrand: string;
    carImage: string;
    pickUpLocation: string;
    dropOffLocation: string;
    pickUpDate: string;
    dropOffDate: string;
    totalPrice: number;
    status: "Upcoming" | "Completed" | "Cancelled";
    createdAt: string;
}

export interface ToastMessage {
    id: number;
    type: "success" | "error" | "info";
    message: string;
}

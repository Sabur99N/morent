import { DropdownOption } from "@/components/CommonDropdown/CommonDopdown";

export const LOCATIONS: DropdownOption[] = [
    { label: "New York, USA", value: "New York" },
    { label: "London, UK", value: "London" },
    { label: "Paris, France", value: "Paris" },
    { label: "Tokyo, Japan", value: "Tokyo" },
    { label: "Dubai, UAE", value: "Dubai" },
    { label: "Mumbai, India", value: "Mumbai" },
    { label: "Sydney, Australia", value: "Sydney" },
];

export const CAR_TYPES = [
    "Sport",
    "SUV",
    "Sedan",
    "Hatchback",
    "MPV",
    "Coupe",
    "Electric",
] as const;

export const CAPACITIES = [2, 4, 6, 7] as const;

export const SORT_OPTIONS: DropdownOption[] = [
    { label: "Most Popular", value: "popular" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "rating" },
];

"use client";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar, {
    FilterState,
} from "@/components/FilterSidebar/FilterSidebar";
import CarGrid from "@/components/CarGrid/CarGrid";
import Pagination from "@/components/Pagination/Pagination";
import CommonDropdown from "@/components/CommonDropdown/CommonDopdown";
import CommonModal from "@/components/CommonModal/CommonModal";
import { getAllCars } from "@/lib/cars";
import { SORT_OPTIONS } from "@/lib/constants";
import { FilterIcon, SearchIcon } from "@/components/icons/Icons";

const PAGE_SIZE = 8;

const CategoryClient = () => {
    const searchParams = useSearchParams();
    const allCars = getAllCars();

    const priceCeiling = useMemo(
        () => Math.ceil(Math.max(...allCars.map((c) => c.pricePerDay)) / 10) * 10,
        [allCars]
    );

    const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
    const [sort, setSort] = useState("popular");
    const [page, setPage] = useState(1);
    const [mobileFilters, setMobileFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        types: [],
        capacities: [],
        maxPrice: priceCeiling,
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };
    const handleFilters = (value: FilterState) => {
        setFilters(value);
        setPage(1);
    };
    const handleSort = (value: string) => {
        setSort(value);
        setPage(1);
    };

    const typeCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        allCars.forEach((c) => {
            counts[c.type] = (counts[c.type] ?? 0) + 1;
        });
        return counts;
    }, [allCars]);

    const capacityCounts = useMemo(() => {
        const counts: Record<number, number> = {};
        allCars.forEach((c) => {
            counts[c.seats] = (counts[c.seats] ?? 0) + 1;
        });
        return counts;
    }, [allCars]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        const list = allCars.filter((car) => {
            const matchSearch =
                !q ||
                car.brand.toLowerCase().includes(q) ||
                car.type.toLowerCase().includes(q);
            const matchType =
                filters.types.length === 0 || filters.types.includes(car.type);
            const matchCapacity =
                filters.capacities.length === 0 ||
                filters.capacities.includes(car.seats);
            const matchPrice = car.pricePerDay <= filters.maxPrice;
            return matchSearch && matchType && matchCapacity && matchPrice;
        });

        switch (sort) {
            case "price-asc":
                return [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
            case "price-desc":
                return [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
            case "rating":
                return [...list].sort((a, b) => b.rating - a.rating);
            default:
                return [...list].sort(
                    (a, b) => Number(b.popular) - Number(a.popular)
                );
        }
    }, [allCars, search, filters, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const sidebar = (
        <FilterSidebar
            filters={filters}
            onChange={handleFilters}
            typeCounts={typeCounts}
            capacityCounts={capacityCounts}
            priceCeiling={priceCeiling}
        />
    );

    return (
        <div className="container animate-fade-in py-8">
            <div className="flex flex-col gap-8 lg:flex-row">
                <aside className="hidden w-72 shrink-0 lg:block">
                    <div className="sticky top-28 rounded-2xl bg-white p-6">
                        {sidebar}
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary-300">
                                <SearchIcon size={20} />
                            </span>
                            <input
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search by name or type"
                                className="w-full rounded-full border border-border-color bg-white py-3 pl-12 pr-4 text-sm transition-main focus:border-primary"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="min-w-[180px] rounded-full border border-border-color bg-white px-5 py-3">
                                <CommonDropdown
                                    options={SORT_OPTIONS}
                                    value={sort}
                                    onChange={handleSort}
                                    compact
                                />
                            </div>
                            <button
                                onClick={() => setMobileFilters(true)}
                                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-color bg-white text-secondary-500 transition-main hover:border-primary hover:text-primary lg:hidden"
                                aria-label="Filters"
                            >
                                <FilterIcon size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-5 flex items-center justify-between">
                        <p className="text-sm text-secondary-300">
                            Showing{" "}
                            <span className="font-semibold text-secondary-500">
                                {filtered.length}
                            </span>{" "}
                            car{filtered.length === 1 ? "" : "s"}
                        </p>
                    </div>

                    <CarGrid
                        cars={paged}
                        emptyMessage="No cars match your filters. Try adjusting them."
                    />

                    <div className="mt-10">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>

            <CommonModal
                open={mobileFilters}
                onClose={() => setMobileFilters(false)}
                title="Filters"
            >
                {sidebar}
            </CommonModal>
        </div>
    );
};

export default CategoryClient;

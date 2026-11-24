"use client";
import React from "react";

export interface FilterState {
    types: string[];
    capacities: number[];
    maxPrice: number;
}

interface FilterSidebarProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
    typeCounts: Record<string, number>;
    capacityCounts: Record<number, number>;
    priceCeiling: number;
}

const CheckboxRow = ({
    label,
    count,
    checked,
    onToggle,
}: {
    label: string;
    count: number;
    checked: boolean;
    onToggle: () => void;
}) => (
    <label className="flex cursor-pointer items-center gap-3 py-1.5">
        <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="h-6 w-6 rounded-md accent-primary"
        />
        <span className="font-semibold text-secondary-400">{label}</span>
        <span className="text-secondary-300">({count})</span>
    </label>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    filters,
    onChange,
    typeCounts,
    capacityCounts,
    priceCeiling,
}) => {
    const toggleType = (type: string) => {
        const types = filters.types.includes(type)
            ? filters.types.filter((t) => t !== type)
            : [...filters.types, type];
        onChange({ ...filters, types });
    };

    const toggleCapacity = (cap: number) => {
        const capacities = filters.capacities.includes(cap)
            ? filters.capacities.filter((c) => c !== cap)
            : [...filters.capacities, cap];
        onChange({ ...filters, capacities });
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-secondary-300">
                    Type
                </p>
                <div className="flex flex-col">
                    {Object.entries(typeCounts).map(([type, count]) => (
                        <CheckboxRow
                            key={type}
                            label={type}
                            count={count}
                            checked={filters.types.includes(type)}
                            onToggle={() => toggleType(type)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-secondary-300">
                    Capacity
                </p>
                <div className="flex flex-col">
                    {Object.entries(capacityCounts).map(([cap, count]) => (
                        <CheckboxRow
                            key={cap}
                            label={`${cap} People`}
                            count={count}
                            checked={filters.capacities.includes(Number(cap))}
                            onToggle={() => toggleCapacity(Number(cap))}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-secondary-300">
                    Price
                </p>
                <input
                    type="range"
                    min={0}
                    max={priceCeiling}
                    value={filters.maxPrice}
                    onChange={(e) =>
                        onChange({ ...filters, maxPrice: Number(e.target.value) })
                    }
                    className="w-full accent-primary"
                />
                <p className="mt-3 font-semibold text-secondary-400">
                    Max. ${filters.maxPrice.toFixed(2)} / day
                </p>
            </div>
        </div>
    );
};

export default FilterSidebar;

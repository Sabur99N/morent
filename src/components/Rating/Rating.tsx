import React from "react";
import { StarIcon } from "@/components/icons/Icons";

interface RatingProps {
    value: number;
    max?: number;
    size?: number;
    reviewCount?: number;
    className?: string;
}

const Rating: React.FC<RatingProps> = ({
    value,
    max = 5,
    size = 18,
    reviewCount,
    className = "",
}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="flex items-center gap-0.5">
                {Array.from({ length: max }).map((_, i) => {
                    const filled = i < Math.round(value);
                    return (
                        <span
                            key={i}
                            className={filled ? "text-amber-400" : "text-secondary-200"}
                        >
                            <StarIcon size={size} filled />
                        </span>
                    );
                })}
            </div>
            {reviewCount !== undefined && (
                <small className="text-secondary-300">
                    {reviewCount} Reviewer{reviewCount === 1 ? "" : "s"}
                </small>
            )}
        </div>
    );
};

export default Rating;

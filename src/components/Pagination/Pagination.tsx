"use client";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons/Icons";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const baseBtn =
        "grid h-10 min-w-10 place-items-center rounded-lg border border-border-color px-3 text-sm font-semibold transition-main";

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`${baseBtn} text-secondary-500 hover:border-primary hover:text-primary disabled:opacity-40`}
                aria-label="Previous page"
            >
                <ArrowLeftIcon size={18} />
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${baseBtn} ${
                        page === currentPage
                            ? "border-primary bg-primary text-white"
                            : "text-secondary-500 hover:border-primary hover:text-primary"
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`${baseBtn} text-secondary-500 hover:border-primary hover:text-primary disabled:opacity-40`}
                aria-label="Next page"
            >
                <ArrowRightIcon size={18} />
            </button>
        </div>
    );
};

export default Pagination;

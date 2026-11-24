import React, { Suspense } from "react";
import type { Metadata } from "next";
import CategoryClient from "@/components/Category/CategoryClient";

export const metadata: Metadata = {
    title: "Browse Cars",
    description: "Browse and filter the full MORENT fleet of rental cars.",
};

const CategoryPage = () => {
    return (
        <Suspense
            fallback={
                <div className="container py-20 text-center text-secondary-300">
                    Loading cars…
                </div>
            }
        >
            <CategoryClient />
        </Suspense>
    );
};

export default CategoryPage;

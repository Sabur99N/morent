import type { MetadataRoute } from "next";
import { getAllCars } from "@/lib/cars";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/`, lastModified: now, priority: 1 },
        { url: `${siteUrl}/category`, lastModified: now, priority: 0.9 },
        { url: `${siteUrl}/login`, lastModified: now, priority: 0.3 },
        { url: `${siteUrl}/register`, lastModified: now, priority: 0.3 },
    ];

    const carRoutes: MetadataRoute.Sitemap = getAllCars().map((car) => ({
        url: `${siteUrl}/cars/${car.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...carRoutes];
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "MORENT — Car Rental",
        short_name: "MORENT",
        description:
            "Rent premium and everyday cars safely, reliably and at a low price.",
        start_url: "/",
        display: "standalone",
        background_color: "#f6f7f9",
        theme_color: "#3563e9",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}

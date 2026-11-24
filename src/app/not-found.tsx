import React from "react";
import CommonButton from "@/components/CommonButton/CommonButton";

const NotFound = () => {
    return (
        <div className="container flex min-h-[70vh] animate-fade-in-up flex-col items-center justify-center gap-5 py-16 text-center">
            <p className="text-6xl font-bold text-primary">404</p>
            <h4 className="text-secondary-500">Page not found</h4>
            <p className="max-w-md text-secondary-300">
                The page you are looking for doesn&apos;t exist or may have been
                moved. Let&apos;s get you back on the road.
            </p>
            <div className="flex gap-3">
                <CommonButton type="primary" label="Go Home" href="/" />
                <CommonButton type="white" label="Browse Cars" href="/category" />
            </div>
        </div>
    );
};

export default NotFound;

import React from "react";

const Loading = () => {
    return (
        <div className="container flex min-h-[60vh] items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
                <span className="h-10 w-10 animate-spin rounded-full border-4 border-border-color border-t-primary" />
                <p className="text-sm text-secondary-300">Loading…</p>
            </div>
        </div>
    );
};

export default Loading;

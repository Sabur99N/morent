import React from "react";

const RippleEffect = () => {
    return (
        <span className="relative flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-primary/20" />
        </span>
    );
};

export default RippleEffect;

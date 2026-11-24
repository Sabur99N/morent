import React from "react";

interface RippleSectionProps {
    title: string;
    subtitle: string;
    step: string;
}

export const RippleSection: React.FC<RippleSectionProps> = ({
    title,
    subtitle,
    step,
}) => (
    <div className="flex items-start justify-between gap-4">
        <div>
            <h5 className="font-semibold text-secondary-500">{title}</h5>
            <p className="mt-1 text-sm text-secondary-300">{subtitle}</p>
        </div>
        <small className="shrink-0 text-secondary-300">{step}</small>
    </div>
);

export default RippleSection;

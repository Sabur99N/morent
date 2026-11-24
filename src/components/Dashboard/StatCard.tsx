import React from "react";

interface StatCardProps {
    label: string;
    value: string | number;
    hint?: string;
    icon: React.ReactNode;
    accent?: string;
    index?: number;
}

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    hint,
    icon,
    accent = "bg-primary",
    index,
}) => (
    <div
        className="animate-fade-in-up rounded-2xl bg-white p-6 transition-main hover:shadow-soft"
        style={{
            animationDelay:
                index !== undefined ? `${index * 80}ms` : undefined,
        }}
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-secondary-300">{label}</p>
                <p className="mt-2 text-3xl font-bold text-secondary-500">
                    {value}
                </p>
            </div>
            <span
                className={`grid h-12 w-12 place-items-center rounded-xl text-white ${accent}`}
            >
                {icon}
            </span>
        </div>
        {hint && <p className="mt-3 text-sm text-secondary-300">{hint}</p>}
    </div>
);

export default StatCard;

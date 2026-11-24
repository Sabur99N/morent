import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        Upcoming: "bg-primary/10 text-primary",
        Completed: "bg-emerald-500/10 text-emerald-600",
        Cancelled: "bg-red/10 text-red",
    };
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status] ?? "bg-body-bg text-secondary-400"
            }`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;

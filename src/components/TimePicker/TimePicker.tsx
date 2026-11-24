"use client";
import React from "react";

interface TimePickerProps {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
    label = "Time",
    value,
    onChange,
}) => {
    return (
        <div className="w-full">
            {label && (
                <p className="mb-2 font-bold text-secondary-500 text-base">
                    {label}
                </p>
            )}
            <input
                type="time"
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-secondary-300 focus:text-secondary-500"
            />
        </div>
    );
};

export default TimePicker;

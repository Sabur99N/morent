"use client";
import React from "react";

interface DatePickerProps {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
    label = "Date",
    value,
    onChange,
    min,
}) => {
    return (
        <div className="w-full">
            {label && (
                <p className="mb-2 font-bold text-secondary-500 text-base">
                    {label}
                </p>
            )}
            <input
                type="date"
                value={value ?? ""}
                min={min}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-secondary-300 focus:text-secondary-500"
            />
        </div>
    );
};

export default DatePicker;

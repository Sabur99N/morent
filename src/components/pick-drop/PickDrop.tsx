"use client";
import React from "react";
import RippleEffect from "../RippleEffect/RippleEffect";
import DatePicker from "../DatePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";
import CommonDropdown from "../CommonDropdown/CommonDopdown";
import { LOCATIONS } from "@/lib/constants";

export interface PickDropValue {
    location: string;
    date: string;
    time: string;
}

interface PickDropProps {
    title: string;
    value: PickDropValue;
    onChange: (value: PickDropValue) => void;
}

const PickDrop: React.FC<PickDropProps> = ({ title, value, onChange }) => {
    const update = (patch: Partial<PickDropValue>) =>
        onChange({ ...value, ...patch });

    return (
        <div className="w-full rounded-xl bg-white px-6 py-6 shadow-soft md:px-10">
            <div className="flex items-center gap-2.5">
                <RippleEffect />
                <p className="font-semibold text-secondary-500">{title}</p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-border-color">
                <div className="sm:pr-4">
                    <CommonDropdown
                        label="Locations"
                        placeholder="Select your city"
                        options={LOCATIONS}
                        value={value.location}
                        onChange={(location) => update({ location })}
                    />
                </div>
                <div className="sm:px-4">
                    <DatePicker
                        label="Date"
                        value={value.date}
                        onChange={(date) => update({ date })}
                    />
                </div>
                <div className="sm:pl-4">
                    <TimePicker
                        label="Time"
                        value={value.time}
                        onChange={(time) => update({ time })}
                    />
                </div>
            </div>
        </div>
    );
};

export default PickDrop;

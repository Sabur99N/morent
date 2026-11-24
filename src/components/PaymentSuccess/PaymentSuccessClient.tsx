"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useBookings } from "@/context/BookingContext";
import CommonButton from "@/components/CommonButton/CommonButton";
import { CheckIcon } from "@/components/icons/Icons";

const PaymentSuccessClient = () => {
    const params = useSearchParams();
    const bookingId = params.get("booking");
    const { bookings, hydrated } = useBookings();
    const booking = bookings.find((b) => b.id === bookingId);

    return (
        <div className="container flex min-h-[70vh] items-center justify-center py-12">
            <div className="w-full max-w-lg animate-scale-in rounded-2xl bg-white p-8 text-center shadow-soft">
                <span className="mx-auto grid h-16 w-16 animate-fade-in place-items-center rounded-full bg-emerald-500 text-white">
                    <CheckIcon size={32} />
                </span>
                <h4 className="mt-6 text-secondary-500">Booking Confirmed!</h4>
                <p className="mt-2 text-secondary-300">
                    Thank you for renting with MORENT. A confirmation has been
                    saved to your account.
                </p>

                {hydrated && booking && (
                    <div className="mt-8 rounded-xl border border-border-color p-5 text-left">
                        <div className="flex items-center gap-4 border-b border-border-color pb-4">
                            <div className="grid h-16 w-24 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-info-500">
                                <Image
                                    src={booking.carImage}
                                    alt={booking.carBrand}
                                    width={90}
                                    height={45}
                                    className="h-auto w-20 object-contain"
                                />
                            </div>
                            <div>
                                <h6 className="font-bold text-secondary-500">
                                    {booking.carBrand}
                                </h6>
                                <small className="text-secondary-300">
                                    Booking #{booking.id.slice(0, 8)}
                                </small>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 text-sm">
                            <Row
                                label="Pick-Up"
                                value={`${booking.pickUpLocation} · ${booking.pickUpDate}`}
                            />
                            <Row
                                label="Drop-Off"
                                value={`${booking.dropOffLocation} · ${booking.dropOffDate}`}
                            />
                            <div className="mt-2 flex items-center justify-between border-t border-border-color pt-3">
                                <span className="font-semibold text-secondary-500">
                                    Total Paid
                                </span>
                                <span className="text-lg font-bold text-secondary-500">
                                    ${booking.totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <CommonButton
                        type="primary"
                        label="View My Bookings"
                        href="/profile"
                    />
                    <CommonButton
                        type="white"
                        label="Continue Browsing"
                        href="/category"
                    />
                </div>
            </div>
        </div>
    );
};

const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between gap-4">
        <span className="text-secondary-300">{label}</span>
        <span className="text-right font-medium text-secondary-500">
            {value}
        </span>
    </div>
);

export default PaymentSuccessClient;

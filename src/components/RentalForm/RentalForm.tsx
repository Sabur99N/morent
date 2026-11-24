"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Car } from "@/types";
import TextField from "@/components/Form/TextField";
import CommonButton from "@/components/CommonButton/CommonButton";
import { useBookings } from "@/context/BookingContext";
import { useToast } from "@/context/ToastContext";
import { RippleSection } from "./RippleSection";

interface RentalFormProps {
    car: Car;
}

const TAX_RATE = 0.1;

const RentalForm: React.FC<RentalFormProps> = ({ car }) => {
    const router = useRouter();
    const { addBooking } = useBookings();
    const { showToast } = useToast();

    const [billing, setBilling] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });
    const [rental, setRental] = useState({
        pickLocation: "",
        pickDate: "",
        pickTime: "",
        dropLocation: "",
        dropDate: "",
        dropTime: "",
    });
    const [payment, setPayment] = useState({
        method: "credit" as "credit" | "paypal" | "bitcoin",
        cardNumber: "",
        expiry: "",
        cardHolder: "",
        cvc: "",
    });
    const [confirm, setConfirm] = useState({ terms: false });
    const [error, setError] = useState("");
    const [promo, setPromo] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    const days = useMemo(() => {
        if (!rental.pickDate || !rental.dropDate) return 1;
        const start = new Date(rental.pickDate).getTime();
        const end = new Date(rental.dropDate).getTime();
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    }, [rental.pickDate, rental.dropDate]);

    const subtotal = car.pricePerDay * days;
    const discount = promo.trim().toUpperCase() === "MORENT20" ? subtotal * 0.2 : 0;
    const tax = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!billing.name || !billing.phone || !billing.address) {
            setError("Please complete your billing information.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        if (!rental.pickLocation || !rental.pickDate || !rental.dropDate) {
            setError("Please complete the pick-up and drop-off details.");
            return;
        }
        if (new Date(rental.dropDate) < new Date(rental.pickDate)) {
            setError("Drop-off date cannot be before the pick-up date.");
            return;
        }
        if (!confirm.terms) {
            setError("You must agree to the terms and conditions.");
            return;
        }
        setError("");
        setSubmitting(true);

        const booking = addBooking({
            carId: car.id,
            carBrand: car.brand,
            carImage: car.imageSrc,
            pickUpLocation: rental.pickLocation,
            dropOffLocation: rental.dropLocation || rental.pickLocation,
            pickUpDate: rental.pickDate,
            dropOffDate: rental.dropDate,
            totalPrice: Number(total.toFixed(2)),
        });

        showToast("Booking confirmed! 🎉", "success");
        router.push(`/payment-success?booking=${booking.id}`);
    };

    const paymentMethods = [
        { id: "credit", label: "Credit Card" },
        { id: "paypal", label: "PayPal" },
        { id: "bitcoin", label: "Bitcoin" },
    ] as const;

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
            <div className="flex flex-col gap-6 lg:col-span-2">
                {error && (
                    <div className="rounded-xl border border-red/40 bg-red/5 px-4 py-3 text-sm font-medium text-red">
                        {error}
                    </div>
                )}

                {/* Billing */}
                <section className="rounded-2xl bg-white p-6">
                    <RippleSection
                        title="Billing Info"
                        subtitle="Please enter your billing info"
                        step="Step 1 of 4"
                    />
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <TextField
                            label="Name"
                            value={billing.name}
                            onChange={(v) => setBilling({ ...billing, name: v })}
                            placeholder="Your name"
                            autoComplete="name"
                            required
                        />
                        <TextField
                            label="Phone Number"
                            type="tel"
                            value={billing.phone}
                            onChange={(v) => setBilling({ ...billing, phone: v })}
                            placeholder="Phone number"
                            autoComplete="tel"
                            inputMode="tel"
                            required
                        />
                        <TextField
                            label="Address"
                            value={billing.address}
                            onChange={(v) =>
                                setBilling({ ...billing, address: v })
                            }
                            placeholder="Address"
                            autoComplete="street-address"
                            required
                        />
                        <TextField
                            label="Town / City"
                            value={billing.city}
                            onChange={(v) => setBilling({ ...billing, city: v })}
                            placeholder="Town or city"
                            autoComplete="address-level2"
                        />
                    </div>
                </section>

                {/* Rental info */}
                <section className="rounded-2xl bg-white p-6">
                    <RippleSection
                        title="Rental Info"
                        subtitle="Please select your rental date"
                        step="Step 2 of 4"
                    />
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <TextField
                            label="Pick-Up Location"
                            value={rental.pickLocation}
                            onChange={(v) =>
                                setRental({ ...rental, pickLocation: v })
                            }
                            placeholder="Select your city"
                            required
                        />
                        <TextField
                            label="Drop-Off Location"
                            value={rental.dropLocation}
                            onChange={(v) =>
                                setRental({ ...rental, dropLocation: v })
                            }
                            placeholder="Select your city"
                        />
                        <TextField
                            label="Pick-Up Date"
                            type="date"
                            value={rental.pickDate}
                            min={today}
                            onChange={(v) =>
                                setRental({ ...rental, pickDate: v })
                            }
                            required
                        />
                        <TextField
                            label="Pick-Up Time"
                            type="time"
                            value={rental.pickTime}
                            onChange={(v) =>
                                setRental({ ...rental, pickTime: v })
                            }
                        />
                        <TextField
                            label="Drop-Off Date"
                            type="date"
                            value={rental.dropDate}
                            min={rental.pickDate || today}
                            onChange={(v) =>
                                setRental({ ...rental, dropDate: v })
                            }
                            required
                        />
                        <TextField
                            label="Drop-Off Time"
                            type="time"
                            value={rental.dropTime}
                            onChange={(v) =>
                                setRental({ ...rental, dropTime: v })
                            }
                        />
                    </div>
                </section>

                {/* Payment */}
                <section className="rounded-2xl bg-white p-6">
                    <RippleSection
                        title="Payment Method"
                        subtitle="Please enter your payment method"
                        step="Step 3 of 4"
                    />
                    <div className="mt-6 flex flex-col gap-3">
                        {paymentMethods.map((m) => (
                            <label
                                key={m.id}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 transition-main ${
                                    payment.method === m.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border-color"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={payment.method === m.id}
                                    onChange={() =>
                                        setPayment({ ...payment, method: m.id })
                                    }
                                    className="h-5 w-5 accent-primary"
                                />
                                <span className="font-semibold text-secondary-500">
                                    {m.label}
                                </span>
                            </label>
                        ))}
                    </div>
                    {payment.method === "credit" && (
                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <TextField
                                label="Card Number"
                                value={payment.cardNumber}
                                onChange={(v) =>
                                    setPayment({ ...payment, cardNumber: v })
                                }
                                placeholder="Card number"
                                autoComplete="cc-number"
                                inputMode="numeric"
                            />
                            <TextField
                                label="Expiration Date"
                                value={payment.expiry}
                                onChange={(v) =>
                                    setPayment({ ...payment, expiry: v })
                                }
                                placeholder="MM/YY"
                                autoComplete="cc-exp"
                            />
                            <TextField
                                label="Card Holder"
                                value={payment.cardHolder}
                                onChange={(v) =>
                                    setPayment({ ...payment, cardHolder: v })
                                }
                                placeholder="Card holder name"
                                autoComplete="cc-name"
                            />
                            <TextField
                                label="CVC"
                                value={payment.cvc}
                                onChange={(v) =>
                                    setPayment({ ...payment, cvc: v })
                                }
                                placeholder="CVC"
                                autoComplete="cc-csc"
                                inputMode="numeric"
                            />
                        </div>
                    )}
                </section>

                {/* Confirmation */}
                <section className="rounded-2xl bg-white p-6">
                    <RippleSection
                        title="Confirmation"
                        subtitle="We are getting to the end. Just a few clicks and your rental is ready!"
                        step="Step 4 of 4"
                    />
                    <label className="mt-6 flex cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            checked={confirm.terms}
                            onChange={(e) =>
                                setConfirm({ terms: e.target.checked })
                            }
                            className="mt-0.5 h-6 w-6 rounded-md accent-primary"
                        />
                        <span className="font-semibold text-secondary-500">
                            I agree with the terms and conditions and privacy
                            policy of MORENT.
                        </span>
                    </label>
                    <CommonButton
                        htmlType="submit"
                        type="primary"
                        size="lg"
                        label={submitting ? "Processing…" : "Rent Now"}
                        disabled={submitting}
                        customClass="mt-6"
                    />
                    <p className="mt-4 max-w-md text-sm text-secondary-300">
                        All your data are safe. We use the most advanced security
                        to provide you the best experience ever.
                    </p>
                </section>
            </div>

            {/* Summary */}
            <aside className="lg:col-span-1">
                <div className="sticky top-28 rounded-2xl bg-white p-6">
                    <h5 className="font-semibold text-secondary-500">
                        Rental Summary
                    </h5>
                    <p className="mt-1 text-sm text-secondary-300">
                        Prices may change depending on the length of the rental
                        and the price of your rental car.
                    </p>
                    <div className="mt-6 flex items-center gap-4 border-b border-border-color pb-6">
                        <div className="grid h-24 w-28 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-info-500">
                            <Image
                                src={car.imageSrc}
                                alt={car.brand}
                                width={110}
                                height={60}
                                className="h-auto w-24 object-contain"
                            />
                        </div>
                        <div>
                            <h6 className="font-bold text-secondary-500">
                                {car.brand}
                            </h6>
                            <small className="text-secondary-300">
                                {car.type} · {days} day{days > 1 ? "s" : ""}
                            </small>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-secondary-500">
                            Apply promo code
                        </label>
                        <div className="flex gap-2">
                            <input
                                value={promo}
                                onChange={(e) => setPromo(e.target.value)}
                                placeholder="Try MORENT20"
                                className="flex-1 rounded-lg border border-border-color px-4 py-2.5 text-sm transition-main focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-secondary-300">Subtotal</span>
                            <span className="font-semibold text-secondary-500">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        {discount > 0 && (
                            <div className="flex items-center justify-between">
                                <span className="text-secondary-300">
                                    Discount (20%)
                                </span>
                                <span className="font-semibold text-primary">
                                    -${discount.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-secondary-300">Tax (10%)</span>
                            <span className="font-semibold text-secondary-500">
                                ${tax.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border-color pt-6">
                        <div>
                            <p className="font-bold text-secondary-500">
                                Total Rental Price
                            </p>
                            <small className="text-secondary-300">
                                Overall price incl. taxes
                            </small>
                        </div>
                        <p className="text-2xl font-bold text-secondary-500">
                            ${total.toFixed(2)}
                        </p>
                    </div>
                </div>
            </aside>
        </form>
    );
};

export default RentalForm;

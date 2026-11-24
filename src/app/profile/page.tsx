"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/Auth/AuthContext";
import { useBookings } from "@/context/BookingContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import CommonButton from "@/components/CommonButton/CommonButton";
import { UserImage } from "@/assets/images";
import StatusBadge from "@/components/Dashboard/StatusBadge";

const ProfilePage = () => {
    const router = useRouter();
    const { isLoggedIn, loggedInUser, userLogOut, hydrated } =
        useContext(AuthContext);
    const { bookings, cancelBooking } = useBookings();
    const { wishlist } = useWishlist();
    const { showToast } = useToast();

    if (!hydrated) {
        return (
            <div className="container py-20 text-center text-secondary-300">
                Loading profile…
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
                <h4 className="text-secondary-500">You are not signed in</h4>
                <p className="max-w-md text-secondary-300">
                    Log in to view your profile, manage bookings and see your
                    saved cars.
                </p>
                <div className="flex gap-3">
                    <CommonButton type="primary" label="Log in" href="/login" />
                    <CommonButton
                        type="white"
                        label="Create account"
                        href="/register"
                    />
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        userLogOut();
        showToast("You have been logged out", "info");
        router.push("/");
    };

    return (
        <div className="container animate-fade-in py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <aside className="animate-fade-in-up rounded-2xl bg-white p-6 lg:col-span-1">
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src={UserImage}
                            alt="Avatar"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                        <h5 className="mt-4 font-semibold text-secondary-500">
                            {loggedInUser?.userName}
                        </h5>
                        {loggedInUser?.email && (
                            <p className="text-sm text-secondary-300">
                                {loggedInUser.email}
                            </p>
                        )}
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-body-bg p-4 text-center">
                            <p className="text-2xl font-bold text-secondary-500">
                                {bookings.length}
                            </p>
                            <small className="text-secondary-300">
                                Bookings
                            </small>
                        </div>
                        <div className="rounded-xl bg-body-bg p-4 text-center">
                            <p className="text-2xl font-bold text-secondary-500">
                                {wishlist.length}
                            </p>
                            <small className="text-secondary-300">
                                Wishlist
                            </small>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                        <CommonButton
                            type="white"
                            label="My Wishlist"
                            href="/wish-list"
                            fullWidth
                        />
                        <CommonButton
                            type="outline"
                            label="Log out"
                            onClick={handleLogout}
                            fullWidth
                        />
                    </div>
                </aside>

                <div className="rounded-2xl bg-white p-6 lg:col-span-2">
                    <h5 className="mb-6 font-semibold text-secondary-500">
                        My Bookings
                    </h5>
                    {bookings.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-secondary-300">
                                You have no bookings yet.
                            </p>
                            <Link
                                href="/category"
                                className="mt-3 inline-block font-semibold text-primary hover:underline"
                            >
                                Browse cars
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {bookings.map((b) => (
                                <div
                                    key={b.id}
                                    className="flex flex-col gap-4 rounded-xl border border-border-color p-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="grid h-16 w-24 shrink-0 place-items-center rounded-lg bg-body-bg">
                                            <Image
                                                src={b.carImage}
                                                alt={b.carBrand}
                                                width={90}
                                                height={45}
                                                className="h-auto w-20 object-contain"
                                            />
                                        </div>
                                        <div>
                                            <Link
                                                href={`/cars/${b.carId}`}
                                                className="font-bold text-secondary-500 hover:text-primary"
                                            >
                                                {b.carBrand}
                                            </Link>
                                            <p className="text-sm text-secondary-300">
                                                {b.pickUpDate} → {b.dropOffDate}
                                            </p>
                                            <div className="mt-1">
                                                <StatusBadge
                                                    status={b.status}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                        <p className="font-bold text-secondary-500">
                                            ${b.totalPrice.toFixed(2)}
                                        </p>
                                        {b.status === "Upcoming" && (
                                            <button
                                                onClick={() =>
                                                    cancelBooking(b.id)
                                                }
                                                className="text-sm font-semibold text-red hover:underline"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

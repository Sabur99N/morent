import React from "react";
import Image from "next/image";
import { Review } from "@/types";
import { UserImage } from "@/assets/images";
import Rating from "@/components/Rating/Rating";

interface ReviewsProps {
    reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
    return (
        <div className="rounded-2xl bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
                <h5 className="font-semibold text-secondary-500">Reviews</h5>
                <span className="grid h-7 min-w-7 place-items-center rounded-md bg-primary px-2 text-sm font-semibold text-white">
                    {reviews.length}
                </span>
            </div>
            <div className="flex flex-col gap-8">
                {reviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                        <Image
                            src={UserImage}
                            alt={review.name}
                            className="h-12 w-12 shrink-0 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                <div>
                                    <p className="font-bold text-secondary-500">
                                        {review.name}
                                    </p>
                                    <small className="text-secondary-300">
                                        {review.title}
                                    </small>
                                </div>
                                <div className="flex flex-col items-start gap-1 sm:items-end">
                                    <small className="text-secondary-300">
                                        {review.date}
                                    </small>
                                    <Rating value={review.rating} size={16} />
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-secondary-400">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;

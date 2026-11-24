import React from "react";
import Image, { StaticImageData } from "next/image";
import CommonButton from "../CommonButton/CommonButton";

interface BannerCardProps {
    backgroundImage: StaticImageData;
    title: string;
    description: string;
    image: StaticImageData;
    buttonType?: "primary" | "secondary";
    href?: string;
}

const BannerCard: React.FC<BannerCardProps> = ({
    backgroundImage,
    title,
    description,
    image,
    buttonType = "primary",
    href = "/category",
}) => {
    return (
        <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center px-6 pt-6 md:px-8 md:pt-8"
            style={{
                backgroundImage: `linear-gradient(120deg, rgba(53,99,233,0.92), rgba(84,166,255,0.72)), url(${backgroundImage.src})`,
            }}
        >
            <div className="max-w-[16rem]">
                <h4 className="text-white">{title}</h4>
                <p className="mb-6 mt-4 text-sm text-white/90 md:text-base">
                    {description}
                </p>
                <CommonButton type={buttonType} label="Rental Car" href={href} />
            </div>
            <div className="mt-6 flex items-end justify-center">
                <Image
                    src={image}
                    alt={title}
                    className="h-auto w-full max-w-[22rem] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
            </div>
        </div>
    );
};

export default BannerCard;

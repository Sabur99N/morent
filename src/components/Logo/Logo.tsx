import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo as LogoImg } from "@/assets/images";

const Logo = ({
    className = "",
    href = "/",
}: {
    className?: string;
    href?: string;
}) => (
    <Link href={href} className={`inline-block ${className}`} aria-label="MORENT home">
        <Image src={LogoImg} alt="MORENT" className="w-32 md:w-36" priority />
    </Link>
);

export default Logo;

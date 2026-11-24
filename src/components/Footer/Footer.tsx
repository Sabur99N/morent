import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";

interface LinkItem {
    label: string;
    href: string;
}

const aboutLinks: LinkItem[] = [
    { label: "How it works", href: "/category" },
    { label: "Featured", href: "/category" },
    { label: "Partnership", href: "/category" },
    { label: "Business Relation", href: "/category" },
];
const communityLinks: LinkItem[] = [
    { label: "Events", href: "/category" },
    { label: "Blog", href: "/category" },
    { label: "Podcast", href: "/category" },
    { label: "Invite a friend", href: "/register" },
];
const socialLinks: LinkItem[] = [
    { label: "Discord", href: "https://discord.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Facebook", href: "https://facebook.com" },
];

const LinkSection = ({ title, links }: { title: string; links: LinkItem[] }) => (
    <div>
        <h6 className="mb-5 font-semibold text-secondary-500">{title}</h6>
        <div className="flex flex-col gap-4">
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-footer-links-color transition-main hover:text-primary"
                >
                    {link.label}
                </Link>
            ))}
        </div>
    </div>
);

const Footer = () => {
    return (
        <footer className="bg-white pt-16">
            <div className="container">
                <div className="flex flex-col gap-10 border-b border-footer-border pb-9 lg:flex-row lg:justify-between">
                    <div className="max-w-72">
                        <Logo />
                        <p className="mt-5 text-sm text-footer-links-color">
                            Our vision is to provide convenience and help
                            increase your sales business.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
                        <LinkSection title="About" links={aboutLinks} />
                        <LinkSection title="Community" links={communityLinks} />
                        <LinkSection title="Socials" links={socialLinks} />
                    </div>
                </div>
                <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-secondary-500">
                        ©2026 MORENT. All rights reserved
                    </p>
                    <div className="flex items-center gap-8">
                        <Link
                            href="/category"
                            className="text-sm font-semibold text-secondary-500 transition-main hover:text-primary"
                        >
                            Privacy &amp; Policy
                        </Link>
                        <Link
                            href="/category"
                            className="text-sm font-semibold text-secondary-500 transition-main hover:text-primary"
                        >
                            Terms &amp; Condition
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

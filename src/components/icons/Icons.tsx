import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24): Partial<IconProps> => ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});

export const SearchIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
            d="m20 20-3-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const FilterIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M3 5h18M6 12h12M10 19h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const HeartIcon = ({
    size,
    filled,
    ...props
}: IconProps & { filled?: boolean }) => (
    <svg {...base(size)} {...props}>
        <path
            d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.9a4.4 4.4 0 0 1 8.5 2c0 6.1-8.5 11.6-8.5 11.6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            fill={filled ? "currentColor" : "none"}
        />
    </svg>
);

export const BellIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5 1.5 5H4.5S6 13 6 9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M10 18a2 2 0 0 0 4 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const SettingsIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path
            d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V1a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 17 2.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"
            stroke="currentColor"
            strokeWidth="1.6"
            transform="scale(0.85) translate(2 2)"
        />
    </svg>
);

export const ChevronDownIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const StarIcon = ({
    size,
    filled = true,
    ...props
}: IconProps & { filled?: boolean }) => (
    <svg {...base(size)} {...props}>
        <path
            d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    </svg>
);

export const GasIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M3 20h12M14 9h2.5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V8l-2.5-2.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const SteeringIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M8 7h8l-1 3H9L8 7Zm8 8-2-1v-1M8 15l2-1v-1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2M12 14v6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);

export const UsersIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
            d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6a3 3 0 0 1 0 6M17 19a5 5 0 0 0-3-4.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);

export const SwapIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M7 4 3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const MenuIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const CloseIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const CarIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5v5h-3v-2H6v2H3v-5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
        <path d="M3 13h18" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7.5" cy="16" r="1" fill="currentColor" />
        <circle cx="16.5" cy="16" r="1" fill="currentColor" />
    </svg>
);

export const DashboardIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
);

export const CalendarIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 9h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

export const LocationIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
);

export const ArrowRightIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const ArrowLeftIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M19 12H5M11 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const CheckIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="m5 12 4.5 4.5L19 7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const UserIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
            d="M4 20a8 8 0 0 1 16 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);

export const LogoutIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M15 12H4M8 8l-4 4 4 4M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const TrashIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const EditIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3ZM14 7l3 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const PlusIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const ChartIcon = ({ size, ...props }: IconProps) => (
    <svg {...base(size)} {...props}>
        <path d="M4 20V4M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

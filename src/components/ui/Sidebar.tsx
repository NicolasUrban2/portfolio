'use client';

import clsx from "clsx";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaAddressBook, FaBars, FaChartLine, FaHome } from "react-icons/fa";

const availableIcons: {
    [key: string]: IconType,
} = {
    'FaBars': FaBars,
    'FaHome': FaHome,
    'FaChartLine': FaChartLine,
    'FaAddressBook': FaAddressBook,
};

export type SidebarProps = {
    className?: string,
    links: {
        href: string,
        label: string,
        icon?: keyof typeof availableIcons,
    }[],
};

export function Sidebar(props: SidebarProps) {
    const { className, links } = props;

    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

    window.addEventListener('resize', () => {
        setIsOpen(window.innerWidth >= 768);
    });

    return <nav
        className={clsx(
            '',
            className,
        )}
    >
        {
            !isOpen ? <button
                onClick={() => setIsOpen(true)}
                className='px-6 py-4 w-max hover:bg-window absolute md:hidden'
            >
                <FaBars />
            </button> :
                <ul className="h-screen dark:shadow-black shadow-md z-20 bg-background absolute md:relative">
                    <li className="flex w-full">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-4 w-full block md:hidden hover:bg-window"
                        >
                            <FaBars />
                        </button>
                    </li>

                    {links.map(({ label, href, icon }) => <li
                        className="flex w-full"
                        key={label}
                    >
                        <a
                            className="px-6 py-4 w-full flex items-center gap-3 hover:bg-window"
                            href={href}
                        >
                            {icon !== undefined ? availableIcons[icon]({}) : null}
                            {label}
                        </a>
                    </li>)}
                </ul>
        }


    </nav>;
}
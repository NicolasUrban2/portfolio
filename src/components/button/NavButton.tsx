import clsx from "clsx";
import Link from "next/link";


export type NavButtonProps = {
    className?: string;
    href: string;
    children: React.ReactNode;
};

export default function NavButton(props: NavButtonProps) {
    const { className, href, children } = props;
    
    return (
        <Link href={href} className={clsx(
            "p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-md focus:shadow-inner rounded-lg",
            className,
        )}>
            {children}
        </Link>
    );
}
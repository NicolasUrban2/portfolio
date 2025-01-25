import clsx from "clsx";
import Link from "next/link";


export type ButtonProps = {
    className?: string;
    href: string;
    children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
    const { className, href, children } = props;
    
    return (
        <Link href={href} className={clsx(
            "p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-inner active:shadow-inner rounded-lg",
            className,
        )}>
            {children}
        </Link>
    );
}
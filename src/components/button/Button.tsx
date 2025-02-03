import clsx from "clsx";
import Link from "next/link";


export type NavButtonProps = {
    className?: string;
    href?: string;
    onPress?: () => void;
    children: React.ReactNode;
};

export default function Button(props: NavButtonProps) {
    const { className, href, onPress, children } = props;

    const classes = clsx(
        "p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-md active:shadow-inner rounded-lg",
        className,
    );

    if(!href) {
        return (
            <button onClick={onPress} className={classes}>
                {children}
            </button>
        );
    }

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
    
}
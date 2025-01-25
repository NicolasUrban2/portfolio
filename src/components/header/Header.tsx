import clsx from "clsx";
import Button from "../button/NavButton";

export type HeaderProps = {
    className?: string;
};

export default function Header(props: HeaderProps) {
    const { className } = props;

    return (
        <header className={clsx(
            "flex justify-between items-center",
            className,
        )}>
            <Button href="/">Home</Button>
            <Button href="/login">Login</Button>
        </header>
    );
}
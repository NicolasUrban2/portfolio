import clsx from "clsx";
import Link from "next/link";
import Button from "../button/NavButton";

export type HeaderProps = {
};

export default function Header(props: HeaderProps) {

    return (
        <header className="flex justify-between items-center">
            <Button href="/">Home</Button>
            <Button href="/login">Login</Button>
        </header>
    );
}
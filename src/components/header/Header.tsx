import clsx from "clsx";
import Button from "../button/Button";
import { createClient } from "@/lib/supabase/server";

export type HeaderProps = {
    className?: string;
};

export default async function Header(props: HeaderProps) {
    const { className } = props;

    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    const user = data?.user;

    return (
        <header className={clsx(
            "flex justify-between items-center",
            className,
        )}>
            <Button href="/">Home</Button>
            {
                user && (
                    <>
                        <p>{user.email ?? 'no email'}</p>
                        <Button href="/logout">Logout</Button>
                    </>
                )
            }
            { !user && <Button href="/login">Login</Button> }
        </header>
    );
}
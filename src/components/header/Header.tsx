'use client'

import clsx from "clsx";
import Button from "../button/Button";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/action/auth";
import { useState } from "react";
import { User } from "@supabase/supabase-js";

export type HeaderProps = {
    className?: string;
};

export default function Header(props: HeaderProps) {
    const { className } = props;

    const [user, setUser] = useState<User | null>(null);

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
    });

    return (
        <header className={clsx(
            "flex justify-between items-center",
            className,
        )}>
            <Button href="/">Home</Button>
            {
                user ? (
                    <>
                        <p>{user.email ?? 'no email'}</p>
                        <Button href="/dashboard">Dashboard</Button>
                        <Button onPress={logout}>Logout</Button>
                    </>
                ) : <Button href="/login">Login</Button>
            }
        </header>
    );
}
'use client'

import clsx from "clsx";
import Button from "../button/Button";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/action/auth";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export type HeaderProps = {
    className?: string;
};

function compareUsers(user: User | null, data: User | null) {
    if(user !== null && data !== null) {
        return user.id === data.id;
    }
    return user === data;
}

export default function Header(props: HeaderProps) {
    const { className } = props;
    console.log('render header');

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            if(!compareUsers(user, data.user)) {
                setUser(data.user);
            }
        });
    }, [user]);

    return (
        <header className={clsx(
            "flex absolute right-0 z-10",
            className,
        )}>
            {
                user ? (
                    <>
                        <Button href="/dashboard">{user.email}</Button>
                        <Button onPress={logout}>Logout</Button>
                    </>
                ) : <Button href="/login">Login</Button>
            }
        </header>
    );
}
'use client';

import clsx from "clsx";
import Card from "./Card";
import TextInput from "../input/TextInput";
import { login } from "@/app/login/action";

export type LoginProps = {
    className?: string;
};

export default function LoginForm(props: LoginProps) {
    const {className} = props;

    return (
        <Card className={clsx(
            'text-center',
            className,
        )}>
            <h1>Login</h1>
            <form action={login} className="flex flex-col items-center gap-4">
                <TextInput isRequired={true} type="email" name="email" placeholder="Email" />
                <TextInput isRequired={true} type="password" name="password" placeholder="Password" />
                <button
                    className="p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-md focus:shadow-inner rounded-lg"
                >
                    Login
                </button>
            </form>
        </Card>
    );
}
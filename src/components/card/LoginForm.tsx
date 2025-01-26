'use client';

import clsx from "clsx";
import Card from "./Card";
import TextInput from "../input/TextInput";
import { login, LoginActionState } from "@/action/auth";
import { useActionState } from "react";
import { RotateLoader } from "react-spinners";

export type LoginProps = {
    className?: string;
};

export default function LoginForm(props: LoginProps) {
    const { className } = props;

    const initialState: LoginActionState = {
        email: '',
        error: null,
    };
    const [state, formAction, pending] = useActionState(login, initialState);

    return (
        <Card className={clsx(
            'text-center',
            className,
        )}>
            <h1>Login</h1>
            <form action={formAction} className="flex flex-col items-center gap-4">
                <TextInput isRequired={true} type="email" name="email" placeholder="Email" />
                <TextInput isRequired={true} type="password" name="password" placeholder="Password" />
                {state.error && <p className="text-red-500">{state.error}</p>}
                {
                    pending ? <RotateLoader className="my-4" color="#ff5a00" size={10} /> : <button
                        className="p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-md focus:shadow-inner rounded-lg"
                    >
                        Login
                    </button>
                }
            </form>
        </Card>
    );
}
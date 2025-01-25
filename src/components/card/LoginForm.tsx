'use client';

import { signup } from "@/app/actions/auth";
import clsx from "clsx";
import Card from "./Card";
import TextInput from "../input/TextInput";
import SubmitButton from "../button/SubmitButton";

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
            <form action={signup} className="flex flex-col items-center gap-4">
                <TextInput name="email" placeholder="Email" />
                <TextInput name="password" placeholder="Password" />
                <SubmitButton>Login</SubmitButton>
            </form>
        </Card>
    );
}
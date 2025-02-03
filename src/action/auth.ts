'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const INVALID_CREDENTIALS = 'invalid_credentials';

export type LoginActionState = {
    email: string;
    error: null | string;
};

export async function login(state: LoginActionState, formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error && error.code === INVALID_CREDENTIALS) {
        return {
            email: data.email,
            error: 'Invalid credentials',
        };
    } else if (error) {
        return {
            email: data.email,
            error: 'An error occurred',
        };
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function logout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}
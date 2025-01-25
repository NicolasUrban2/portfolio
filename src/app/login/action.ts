'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const supabase = await createClient();

    // TODO: validate data
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    console.log(formData, data);

    const { error } = await supabase.auth.signInWithPassword(data);

    if( error ) {
        console.log(error);
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}
'use server'

import { Database } from "@/definitions/supabase";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type PortfolioContentsState = {
    error: string | null;
}

export async function edit(state: PortfolioContentsState, formData: FormData) {
    const supabase = await createClient();

    const id = formData.get('id');
    if (!id) {
        return {
            error: 'Invalid id',
        };
    }
    const data = {
        code: formData.get('code') as string,
        content: formData.get('content') as string,
        locale: formData.get('locale') as Database['public']['Enums']['locales'],
        display_type: formData.get('display_type') as Database['public']['Enums']['display_types'],
    }

    const { error } = await supabase.from('portfolio_contents').update(data).eq('id', Number(id));

    if (error) {
        return {
            error: error.message,
        };
    }

    revalidatePath('/', 'layout');
    revalidatePath('/dashboard/portfolio-contents', 'layout');

    return {
        error: null,
    }
}

export async function create(state: PortfolioContentsState, formData: FormData) {
    const supabase = await createClient();

    const data = {
        code: formData.get('code') as string,
        content: formData.get('content') as string,
        locale: formData.get('locale') as Database['public']['Enums']['locales'],
        display_type: formData.get('display_type') as Database['public']['Enums']['display_types'],
    }

    const { error } = await supabase.from('portfolio_contents').insert(data);

    if (error) {
        return {
            error: error.message,
        };
    }

    revalidatePath('/', 'layout');
    revalidatePath('/dashboard/portfolio-contents', 'layout');

    return {
        error: null,
    }
}

export async function remove(id: number) {
    const supabase = await createClient();

    console.log(id);

    const { error } = await supabase.from('portfolio_contents').delete().eq('id', Number(id));
    
    if (error) {
        console.log(error?.message);
        return;
    }

    revalidatePath('/', 'layout');
    revalidatePath('/dashboard/portfolio-contents', 'layout');
}
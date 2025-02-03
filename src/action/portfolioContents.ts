'use server'

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
    }

    const { error } = await supabase.from('portfolio_contents').update(data).eq('id', Number(id));

    if(error) {
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
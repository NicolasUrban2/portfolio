'use client'

import Button from "@/components/button/Button";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function LogoutPage() {
    const supabase = createClient();
    
    const onLogout = async () => {
        await supabase.auth.signOut();
        redirect('/');
    }

    return (
        <div>
            <h1>Logout ?</h1>
            <Button onPress={onLogout}>Logout</Button>
        </div>
    );
}
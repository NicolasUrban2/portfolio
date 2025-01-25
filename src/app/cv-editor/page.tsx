import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CVEditorPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if(error || !data?.user) {
        redirect('/login');
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">CV Editor</h1>
            <p>Coming soon...</p>
        </div>
    );
}
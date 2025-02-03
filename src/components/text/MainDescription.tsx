import { createClient } from "@/lib/supabase/server";

export type MainDescriptionProps = {
    className?: string;
};

export async function MainDescription({ className }: MainDescriptionProps) {
    const supabase = await createClient();

    const { data } = await supabase.from('portfolio_contents').select('*').eq('code', 'main_description');

    if (!data) {
        return null;
    }

    return (
        <div className={`text-center ${className}`}>
            <article className="text-lg">
                {data[0].content}
            </article>
        </div>
    );
}
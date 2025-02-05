import { createClient } from "@/lib/supabase/server";
import { TextRawContent } from "./TextRawContent";

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
            <h1 className="text-4xl w-fit mx-auto">
                Hello there
            </h1>

            <article className="mt-5 text-lg">
                <TextRawContent content={data[0].content ?? ''} />
            </article>
        </div>
    );
}
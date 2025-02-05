import clsx from "clsx";
import { PortfolioContentsEdit } from "../card/PortfolioContentEdit";
import { createClient } from "@/lib/supabase/server";

export type PortfolioContentsProps = {
    className?: string,
};

export async function PortfolioContents(props: PortfolioContentsProps) {
    const { className } = props;

    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolio_contents').select('*').order('id', { ascending: true });

    return (
        <div className={clsx(
            'flex flex-col gap-8',
            className
        )}>
            {
                error !== null ? <div>Error: {error.message}</div> : null
            }
            {data !== null ? data.map((portfolioContent, index) => (
                <div key={portfolioContent.id}>
                    {index > 0 ? <hr /> : null}
                    <PortfolioContentsEdit portfolioContent={portfolioContent} />
                </div>
            )) : <div>Loading...</div>}
        </div>
    );
}
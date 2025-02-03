import clsx from "clsx";
import { PortfolioContentsEdit } from "../card/PortfolioContentEdit";
import { createClient } from "@/lib/supabase/server";

export type PortfolioContentsProps = {
    className?: string,
};

export async function PortfolioContents(props: PortfolioContentsProps) {
    const { className } = props;

    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolio_contents').select('*');

    return (
        <div className={clsx(
            '',
            className
        )}>
            {data !== null ? data.map((portfolioContent, index) => 
                <PortfolioContentsEdit key={portfolioContent.id} portfolioContent={portfolioContent} /> 
            ) :
                <div>Loading...</div>}
        </div>
    );
}
import { Database } from "@/definitions/supabase";
import clsx from "clsx";

export type PortfolioContentsEditProps = {
    className?: string,
    portfolioContent: Database['public']['Tables']['portfolio_contents']['Row'],
}

export async function PortfolioContentsEdit(props: PortfolioContentsEditProps) {
    const { className, portfolioContent } = props;
    /* TODO: put this in a form and send it to the portfolioContents edit server action */
    return (
        <div className={clsx(
            '',
            className,
        )}>
            <h2>{portfolioContent.code}</h2>
            <p>{portfolioContent.content}</p>
        </div>
    );
}
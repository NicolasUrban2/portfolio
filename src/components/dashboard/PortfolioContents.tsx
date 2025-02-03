import { PortfolioContentsResource } from "@/lib/supabase/resources/PortfolioContentsResource";
import clsx from "clsx";
import { PortfolioContentsEdit } from "../card/PortfolioContentEdit";

export type PortfolioContentsProps = {
    className?: string,
};

export async function PortfolioContents(props: PortfolioContentsProps) {
    const { className } = props;
    const { data, error } = await PortfolioContentsResource.getList();

    return (
        <div className={clsx(
            '',
            className
        )}>
            {data !== null ? data.map((portfolioContent, index) => <div>
                <PortfolioContentsEdit portfolioContent={portfolioContent} />
            </div> ) : error}
        </div>
    );
}
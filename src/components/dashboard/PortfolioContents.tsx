import { PortfolioContentsResource } from "@/lib/supabase/resources/PortfolioContentsResource";
import clsx from "clsx";

export type PortfolioContentsProps = {
    className?: string,
};

export async function PortfolioContents(props: PortfolioContentsProps) {
    const { className } = props;

    const portfolioContents = await PortfolioContentsResource.getList();

    return (
        <div className={clsx(
            'bg-window',
            className
        )}>
            <h1 className="text-4xl font-bold">Portfolio contents</h1>
            {portfolioContents !== null && portfolioContents.map((portfolioContent) => (
                <div key={portfolioContent.id} className="border-b border-gray-300">
                    <h2 className="text-2xl font-bold">{portfolioContent.code}</h2>
                    <p>{portfolioContent.content}</p>
                </div>
            ))}
        </div>
    );
}
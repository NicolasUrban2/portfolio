import { PortfolioContents } from "@/components/dashboard/PortfolioContents";

export default async function PortfolioContentsPage() {
    return (
        <div className="mt-20 w-full mx-3 md:mx-7">
            <h1 className="text-4xl font-bold">Portfolio contents</h1>
            <PortfolioContents className="mt-4" />
        </div>
    );
}
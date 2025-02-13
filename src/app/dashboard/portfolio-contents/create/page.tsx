import { PortfolioContentCreate } from "@/components/dashboard/PortfolioContentCreate";

export default async function PortfolioContentsCreatePage() {
    return (
        <div className="mt-20 w-full mx-3 md:mx-7">
            <h1 className="text-4xl font-bold">Portfolio contents create</h1>
            <PortfolioContentCreate className="mt-4" />
        </div>
    );
}
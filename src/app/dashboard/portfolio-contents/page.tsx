import { PortfolioContents } from "@/components/dashboard/PortfolioContents";

export default async function PortfolioContentsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <PortfolioContents className="mt-4" />
        </div>
    );
}
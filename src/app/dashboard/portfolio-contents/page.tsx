import Button from "@/components/button/Button";
import { PortfolioContents } from "@/components/dashboard/PortfolioContents";

export default async function PortfolioContentsPage() {
    return (
        <div className="mt-20 w-full mx-3 md:mx-7">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Portfolio contents</h1>
                <Button href="/dashboard/portfolio-contents/create">+</Button>
            </div>
            <PortfolioContents className="mt-4" />
        </div>
    );
}
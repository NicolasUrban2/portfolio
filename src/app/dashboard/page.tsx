import Button from "@/components/button/Button";

export default async function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Button href="/dashboard/portfolio-contents">Portfolio contents</Button>
        </div>
    );
}
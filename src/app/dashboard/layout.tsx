import { Sidebar } from "@/components/ui/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex">
            <Sidebar
                className=""
                links={[
                    { href: '/', label: 'Home', icon: 'FaHome' },
                    { href: '/dashboard', label: 'Dashboard', icon: 'FaChartLine' },
                    { href: '/dashboard/portfolio-contents', label: 'Portfolio Contents', icon: 'FaAddressBook' },
                ]} />
            {children}

        </div>
    );
};
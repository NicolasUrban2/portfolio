import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio de Nicolas Urban",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background text-foreground`}
      >
        <Header />
        <main>
          {children}
        </main>
        <footer className="">

        </footer>
      </body>

    </html>
  );
}

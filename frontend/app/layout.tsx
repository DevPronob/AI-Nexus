import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/QueryProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Nexus | Premium AI Consultancy Platform",
  description: "Connect with experts and leverage AI tools for your growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <QueryProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
